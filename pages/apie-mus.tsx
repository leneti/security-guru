import { Container, Text, Center } from "@mantine/core";
import { PageTitle } from "@components";

export default function About() {
  return (
    <>
      <PageTitle>Apie mus</PageTitle>

      <Container fluid p={0}>
        <Center
          sx={(theme) => ({
            height: "75vh",
            backgroundColor: theme.fn.primaryColor(),
          })}
        >
          <Text color="black" align="left" w="30vw">
            <b>SECURITY GURU</b> - tai įmonė, kuri užsiima priešgaisrinės
            signalizacijos, įeigos kontrolės, apsaugos signalizacijos,
            integruotų apsaugos sprendimų, vaizdo stebėjimo sistemų įdiegimu bei
            remontu. Parenkame saugos sprendimus atsižvelgiant į kliento
            poreikius, biudžetą ir pageidaujamą saugumo lygmenį.
            <br /> <br /> Turime kvalifikaciją bei patirtį fizinės apsaugos bei
            elektroninės apsaugos srityse, todėl galime garantuoti aukščiausio
            lygio aptarnavimą ir paslaugas. Mūsų įmonei svarbiausia{" "}
            <b>kokybė</b>, <b>profesionalumas</b> ir <b>inovatyvumas</b>.
          </Text>
        </Center>
      </Container>
    </>
  );
}
