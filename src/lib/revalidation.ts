import { revalidatePath } from "next/cache";

/**
 * Revalidates the frontend pages by calling Next.js revalidatePath directly.
 * Called by PayloadCMS hooks after content changes.
 *
 * Note: revalidatePath is synchronous and doesn't return a promise.
 * The function is marked async to maintain consistency with hook expectations.
 */
export async function revalidateFrontend(): Promise<void> {
  revalidatePath("/", "layout");
}