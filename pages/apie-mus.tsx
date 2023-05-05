import {
  Text,
  createStyles,
  Title,
  useMantineTheme,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { Player } from "@lottiefiles/react-lottie-player";
import { PageBackground } from "@site/components/PageBackground";
import { ABOUT_US_FEATURES } from "@site/constants";
import { getBGColor } from "@site/utils/getBGColor";

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  grid: {
    maxWidth: theme.breakpoints.xl,
    alignSelf: "center",
    paddingBlock: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan("md")]: {
      paddingBlock: theme.spacing.xl,
    },
  },

  description: {
    color: theme.colors.dark[6],
    textAlign: "center",
  },

  animation: {
    position: "absolute",
    pointerEvents: "none",
    transform: "scaleX(-1)",
    right: 0,
    top: 80,
    height: 100,
    width: 100,

    [theme.fn.smallerThan("md")]: {
      top: 90,
      height: 90,
      width: 90,
    },
  },
}));

function Feature({ icon: Icon, title, description }: FeatureProps) {
  const theme = useMantineTheme();

  return (
    <div>
      <ThemeIcon
        variant="filled"
        color={getBGColor(theme)}
        size={40}
        radius={40}
      >
        <Icon size="1.25rem" stroke={1.5} color={theme.fn.primaryColor()} />
      </ThemeIcon>
      <Title order={2} my="sm" variant="lightBg">
        {title}
      </Title>
      <Text size="sm" color="dimmed" sx={{ lineHeight: 1.6 }} variant="lightBg">
        {description}
      </Text>
    </div>
  );
}

const pageTitle = "Apie mus";

export default function About() {
  const { classes, theme } = useStyles();
  const noMotion = useReducedMotion();

  const features = ABOUT_US_FEATURES.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <PageBackground pageTitle={pageTitle} colorOnly>
      <SimpleGrid
        cols={3}
        spacing={50}
        className={classes.grid}
        breakpoints={[
          { maxWidth: theme.breakpoints.md, cols: 2, spacing: "xl" },
          { maxWidth: theme.breakpoints.sm, cols: 1, spacing: "xl" },
        ]}
      >
        {features}
      </SimpleGrid>
      {noMotion !== undefined && (
        <Player
          autoplay={!noMotion}
          src="lottie_animations/cctv.json"
          className={classes.animation}
        />
      )}
    </PageBackground>
  );
}
