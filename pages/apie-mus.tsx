import {
  Container,
  Text,
  createStyles,
  Title,
  useMantineTheme,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import {
  IconTrophy,
  IconShieldCheck,
  IconUser,
  IconMessage2,
  IconLock,
} from "@tabler/icons";
import { Player } from "@lottiefiles/react-lottie-player";
import { PageTitle, SlideDownTitle } from "@components";
import { bgImgHeight, getBGColor } from "@constants";

const DATA = [
  {
    icon: IconLock,
    title: "Visapusiški saugumo sprendimai",
    description:
      "Siūlome platų paslaugų spektrą, pritaikytą konkretiems jūsų saugumo poreikiams. Nesvarbu, ar jums reikia priešgaisrinės signalizacijos, įeigos kontrolės sistemų, ar vaizdo stebėjimo, mes jums padėsime.",
  },
  {
    icon: IconUser,
    title: "Į klientus orientuotas požiūris",
    description:
      "SECURITY GURU teikia pirmenybę jūsų saugumo reikalavimams ir glaudžiai su jumis bendradarbiauja, kad užtikrintų jūsų poreikių patenkinimą. Mūsų ekspertai skiria laiko suprasti jūsų rūpesčius ir pateikia asmeninius sprendimus.",
  },
  {
    icon: IconShieldCheck,
    title: "Profesionalumas ir kompetencija",
    description:
      "Mūsų komanda, turinti ilgametę patirtį saugumo srityje, užtikrina kokybišką darbą ir patikimus saugumo sprendimus, kuriais galite pasikliauti. Naudojamės savo patirtimi, kad savo klientams suteiktume geriausias įmanomas paslaugas.",
  },
  {
    icon: IconTrophy,
    title: "Inovatyvūs sprendimai",
    description:
      "Mes nuolat sekame naujausius saugumo pramonės pokyčius ir taikome novatoriškus sprendimus, kad patenkintume savo klientų poreikius. Visada ieškome naujų būdų, kaip pagerinti savo paslaugas ir pateikti geriausius įmanomus sprendimus.",
  },
  {
    icon: IconMessage2,
    title: "Lankstumas",
    description:
      "Suprantame, kad mūsų klientai turi užimtą darbo grafiką, todėl siūlome paslaugas 7 dienas per savaitę nuo 9 iki 21 val. Esame pasiryžę suteikti lanksčias planavimo galimybes, kad galėtume prisitaikyti prie jūsų poreikių.",
  },
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  container: {
    minHeight: bgImgHeight,
    backgroundColor: theme.fn.primaryColor(),
    padding: `calc(${theme.spacing.xl} * 2) calc(${theme.spacing.xl} * 4)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.fn.smallerThan("md")]: {
      padding: `calc(${theme.spacing.xl} * 2) calc(${theme.spacing.xl} * 3)`,
    },

    [theme.fn.smallerThan("sm")]: {
      padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
    },
  },

  grid: {
    maxWidth: theme.breakpoints.xl,
    alignSelf: "center",
  },

  description: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[5],
    textAlign: "center",
  },

  animation: {
    position: "absolute",
    pointerEvents: "none",
    transform: "scaleX(-1)",
    right: 0,
    top: 80,
    height: "10vh",

    [theme.fn.smallerThan("md")]: {
      top: 90,
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
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const noMotion = useReducedMotion();

  const features = DATA.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <>
      <PageTitle>{pageTitle}</PageTitle>

      <SlideDownTitle title={pageTitle} />

      <Container fluid className={classes.container}>
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
      </Container>
    </>
  );
}
