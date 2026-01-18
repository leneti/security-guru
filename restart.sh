#!/usr/bin/env bash
set -e

# Security Guru Restart Script
# This script manages Security Guru deployments in different modes:
# - Local Development (--local): runs MongoDB locally and starts Next.js dev server (skips building images) (default)
# - Development Docker (--dev): deploys to development/staging Docker environment (builds local images)
# - Production Docker (--prod): deploys to production Docker environment (builds local images)
# Note: Uses docker compose up's intelligent restart logic - containers are only recreated when necessary
# On failure, automatically cleans up any partially deployed containers to avoid ghost containers

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Default to local mode
MODE="local"
# Default to building images
SKIP_BUILD=false
# Default action
STOP_CONTAINERS=false
DOCKER_COMPOSE_FILE="${PROJECT_DIR}/docker-compose.dev.yaml"
ENV_FILE="${PROJECT_DIR}/.env"
ENV_OVERRIDE_FILE="${PROJECT_DIR}/.env.development"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Cleanup trap for unexpected failures
trap 'cleanup_containers' ERR

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Set configuration based on mode
set_mode_config() {
    if [ "$MODE" = "prod" ]; then
        DOCKER_COMPOSE_FILE="${PROJECT_DIR}/docker-compose.yaml"
        ENV_OVERRIDE_FILE=""
        log_info "Using production configuration"
    elif [ "$MODE" = "dev" ]; then
        DOCKER_COMPOSE_FILE="${PROJECT_DIR}/docker-compose.dev.yaml"
        ENV_OVERRIDE_FILE="${PROJECT_DIR}/.env.development"
        log_info "Using development Docker configuration"
    else # local mode (default)
        DOCKER_COMPOSE_FILE="${PROJECT_DIR}/docker-compose.local.yaml"
        ENV_OVERRIDE_FILE="${PROJECT_DIR}/.env.development"
        log_info "Using local development configuration"
    fi
}

# Check if required files exist
check_requirements() {
    log_info "Checking requirements for $MODE mode..."

    if [ ! -f "$ENV_FILE" ]; then
        log_error ".env file not found at: $ENV_FILE"
        exit 1
    fi

    if [ "$MODE" != "prod" ] && [ ! -f "$ENV_OVERRIDE_FILE" ]; then
        log_error ".env.development file not found at: $ENV_OVERRIDE_FILE"
        exit 1
    fi

    if [ ! -f "$DOCKER_COMPOSE_FILE" ]; then
        log_error "Docker Compose file not found at: $DOCKER_COMPOSE_FILE"
        exit 1
    fi

    # Check if RESEND_API_KEY is set
    if ! grep -q "^RESEND_API_KEY=" "$ENV_FILE" 2>/dev/null && [ -z "$RESEND_API_KEY" ]; then
        log_warning "RESEND_API_KEY not found in .env file. Contact form may not work."
        log_warning "Add RESEND_API_KEY to your .env file if you want email functionality."
    fi

    log_success "All required files found"
}

# Check if mediastack network exists
check_mediastack_network() {
    log_info "Checking mediastack network..."

    if ! docker network ls --format "{{.Name}}" | grep -q "^mediastack$"; then
        log_error "mediastack network not found. Make sure your mediastack is running."
        exit 1
    fi

    log_success "mediastack network found"
}

# Validate Docker Compose configuration
validate_compose_config() {
    log_info "Validating Docker Compose configuration..."

    cd "$PROJECT_DIR"
    local compose_cmd="docker compose --env-file \"$ENV_FILE\" -f \"$DOCKER_COMPOSE_FILE\""
    if [ -n "$ENV_OVERRIDE_FILE" ]; then
        compose_cmd="$compose_cmd --env-file \"$ENV_OVERRIDE_FILE\""
    fi

    if ! eval "$compose_cmd config" > /dev/null; then
        log_error "Docker Compose configuration is invalid"
        exit 1
    fi

    log_success "Docker Compose configuration is valid"
}

# Build Docker image (called for both build-only and build+deploy modes)
build_image() {
    local should_build="${BUILD_IMAGE:-false}"

    if [ "$should_build" = "true" ] || [ -f "${PROJECT_DIR}/Dockerfile" ]; then
        log_info "Building Docker image locally..."
        cd "$PROJECT_DIR"
        docker build -t security-guru:latest .
        log_success "Docker image built successfully (local: security-guru:latest)"
    fi
}

# Pull latest images
pull_images() {
    log_info "Pulling latest Docker images..."

    cd "$PROJECT_DIR"
    local compose_cmd="docker compose --env-file \"$ENV_FILE\" -f \"$DOCKER_COMPOSE_FILE\""
    if [ -n "$ENV_OVERRIDE_FILE" ]; then
        compose_cmd="$compose_cmd --env-file \"$ENV_OVERRIDE_FILE\""
    fi

    # Get list of services and collect external ones (not our locally built ones)
    local services external_services
    services=$(eval "$compose_cmd config --services")
    external_services=""

    for service in $services; do
        # Skip our locally built security-guru services
        if [[ "$service" == security-guru* ]]; then
            log_info "Skipping locally built service $service"
        else
            external_services="$external_services $service"
            log_info "Will pull $service..."
        fi
    done

    # Pull all external services in parallel
    if [ -n "$external_services" ]; then
        log_info "Pulling external images in parallel..."
        eval "$compose_cmd pull $external_services" 2>/dev/null || log_warning "Some images failed to pull, continuing..."
    fi

    log_success "Images pulled successfully"
}

# Stop running containers (cleanup function)
cleanup_containers() {
    log_warning "Cleaning up security-guru containers..."

    cd "$PROJECT_DIR"
    local compose_cmd="docker compose --env-file \"$ENV_FILE\" -f \"$DOCKER_COMPOSE_FILE\""
    if [ -n "$ENV_OVERRIDE_FILE" ]; then
        compose_cmd="$compose_cmd --env-file \"$ENV_OVERRIDE_FILE\""
    fi

    local running_services
    running_services=$(eval "$compose_cmd ps --services --filter status=running" 2>/dev/null || echo "")
    if [ -n "$running_services" ]; then
        log_info "Stopping containers: $running_services"
    fi

    eval "$compose_cmd down" 2>/dev/null || true
    log_info "Containers cleaned up"
}

# Stop and remove all containers for the current mode
stop_and_remove_containers() {
    log_info "Stopping and removing security-guru containers for $MODE mode..."

    cd "$PROJECT_DIR"
    local compose_cmd="docker compose --env-file \"$ENV_FILE\" -f \"$DOCKER_COMPOSE_FILE\""
    if [ -n "$ENV_OVERRIDE_FILE" ]; then
        compose_cmd="$compose_cmd --env-file \"$ENV_OVERRIDE_FILE\""
    fi

    if eval "$compose_cmd down --volumes --remove-orphans" 2>/dev/null; then
        log_success "Containers stopped and removed successfully for $MODE mode"
    else
        log_error "Failed to stop and remove containers for $MODE mode"
        exit 1
    fi
}

# Deploy/restart containers intelligently
start_containers() {
    log_info "Deploying security-guru containers (docker compose will restart only what's changed)..."

    cd "$PROJECT_DIR"
    local compose_cmd="docker compose --env-file \"$ENV_FILE\" -f \"$DOCKER_COMPOSE_FILE\""
    if [ -n "$ENV_OVERRIDE_FILE" ]; then
        compose_cmd="$compose_cmd --env-file \"$ENV_OVERRIDE_FILE\""
    fi

    if ! eval "$compose_cmd up --remove-orphans -d"; then
        log_error "Failed to deploy containers"
        cleanup_containers
        exit 1
    fi

    log_success "Containers deployed successfully"
}

# Check container health
check_containers() {
    log_info "Checking container health..."

    cd "$PROJECT_DIR"

    # Get list of services from compose file
    local compose_cmd="docker compose --env-file \"$ENV_FILE\" -f \"$DOCKER_COMPOSE_FILE\""
    if [ -n "$ENV_OVERRIDE_FILE" ]; then
        compose_cmd="$compose_cmd --env-file \"$ENV_OVERRIDE_FILE\""
    fi

    local services
    services=$(eval "$compose_cmd config --services")

    local failed=0

    for service in $services; do
        local container_status
        container_status=$(docker inspect --format='{{.State.Running}}' "$(eval "$compose_cmd ps -q \"$service\"")" 2>/dev/null || echo "false")

        if [ "$container_status" != "true" ]; then
            log_error "Container $service is not running"
            failed=1
        else
            log_success "Container $service is running"
        fi
    done

    if [ $failed -eq 1 ]; then
        log_error "Some containers failed to start"
        cleanup_containers
        exit 1
    fi
}

# Clean up unused images
cleanup_images() {
    log_info "Cleaning up unused Docker images..."

    # Only remove dangling images, not all unused ones (to be safe)
    docker image prune -f

    log_success "Cleanup completed"
}

# Run Next.js development server
run_dev_server() {
    log_info "Starting Next.js development server..."

    cd "$PROJECT_DIR"
    yarn next dev
}

# Display access information
show_access_info() {
    cd "$PROJECT_DIR"

    log_success "Security Guru is running!"
    echo ""

    if [ "$MODE" = "prod" ]; then
        # Get the production domain from env file
        local prod_domain
        prod_domain=$(grep "^CLOUDFLARE_DNS_ZONE_PROD=" "$ENV_FILE" | cut -d '=' -f2)

        echo "Access URLs:"
        echo "  - Web App: https://${prod_domain}"
        echo "  - Admin/CMS: https://${prod_domain}/admin"
    else # dev mode
        # Get the dev domain from env file
        local dev_domain
        dev_domain=$(grep "^CLOUDFLARE_DNS_ZONE_DEV=" "$ENV_FILE" | cut -d '=' -f2)

        echo "Access URLs:"
        echo "  - Web App: https://securityguru-dev.${dev_domain}"
        echo "  - Admin/CMS: https://securityguru-dev.${dev_domain}/admin"
    fi
    echo ""
}

# Main execution
main() {
    echo ""
    if [ "${STOP_CONTAINERS:-false}" = "true" ]; then
        log_info "🛑 Stopping Security Guru $MODE Containers"
    elif [ "${BUILD_IMAGE:-false}" = "true" ]; then
        log_info "🔨 Building Security Guru $MODE Image"
    else
        log_info "🚀 Starting Security Guru $MODE Deployment"
    fi
    echo ""

    set_mode_config

    if [ "${STOP_CONTAINERS:-false}" = "true" ]; then
        check_requirements
        validate_compose_config
        stop_and_remove_containers
        exit 0
    fi

    if [ "$MODE" = "local" ]; then
        check_requirements
        validate_compose_config
        start_containers
        trap 'cleanup_containers' INT TERM
        run_dev_server
    else
        check_requirements
        check_mediastack_network
        validate_compose_config

        if [ "${SKIP_BUILD:-false}" != "true" ]; then
            build_image
        else
            log_info "Skipping image build (--skip-build flag used)"
        fi

        if [ "${BUILD_IMAGE:-false}" = "true" ]; then
            # Build-only mode - exit after building
            echo ""
            log_success "✅ Image built successfully! Run without --build-only flag to deploy."
            echo ""
            exit 0
        else
            # Full deployment mode
            pull_images
            start_containers
            check_containers

            if [ "${SKIP_CLEANUP:-false}" != "true" ]; then
                cleanup_images
            fi
            show_access_info

            echo ""
            log_success "✅ Deployment completed successfully!"
            echo ""
        fi
    fi
}

# Handle script arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --dev)
            MODE="dev"
            shift
            ;;
        --prod)
            MODE="prod"
            shift
            ;;
        --local)
            MODE="local"
            shift
            ;;
        --stop)
            STOP_CONTAINERS=true
            shift
            ;;
        --build-only)
            export BUILD_IMAGE=true
            shift
            ;;
        --no-cleanup)
            export SKIP_CLEANUP=true
            shift
            ;;
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [MODE] [OPTIONS]"
            echo ""
            echo "Modes:"
            echo "  --local        Run local development with MongoDB and Next.js dev server (default)"
            echo "  --dev          Deploy to development/staging Docker environment"
            echo "  --prod         Deploy to production Docker environment"
            echo ""
            echo "Options:"
            echo "  --stop         Stop and remove all containers for the specified mode"
            echo "  --build-only   Build Docker image locally and exit (no deployment)"
            echo "  --skip-build   Skip building Docker image during deployment"
            echo "  --no-cleanup   Skip Docker image cleanup"
            echo "  -h, --help     Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0                          # Start local development with MongoDB and Next.js dev server"
            echo "  $0 --local                  # Start local development with MongoDB and Next.js dev server (explicit)"
            echo "  $0 --dev                    # Deploy to dev Docker environment (builds + deploys)"
            echo "  $0 --dev --build-only       # Build image for dev environment only"
            echo "  $0 --dev --skip-build       # Deploy to dev without rebuilding image"
            echo "  $0 --prod --build-only      # Build image for production environment only"
            echo "  $0 --dev --stop             # Stop and remove all containers for dev mode"
            echo "  $0 --prod --stop            # Stop and remove all containers for prod mode"
            echo "  $0 --local --stop           # Stop and remove local MongoDB container"
            echo ""
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            echo "Use -h or --help for usage information"
            exit 1
            ;;
    esac
done

main