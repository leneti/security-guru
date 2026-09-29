# Source copy archive

This is a transcription of potentially useful text from the previous website, preserved before its source is removed. The Lithuanian prose is editable source material, not approved final copy. The starting prices are current working values supplied by the owner, pending client confirmation before publication.

## Identity, home page, and metadata

Sources: `components/Hero/Hero.tsx`, `components/Footer/Footer.tsx`, `app/layout.tsx`, `app/page.tsx`.

- Name: **Security Guru**; legal-name text in the footer: **MB Security Guru**.
- Hero heading: “Namų ir verslo apsaugos sprendimai”
- Hero description: “Aukščiausio lygio paslaugos fizinės bei elektroninės apsaugos srityse”
- Hero call to action: “Susisiekite su mumis”
- Footer tagline: “Kokybė, profesionalumas ir inovatyvumas”
- Metadata description: “Aukščiausio lygio paslaugos fizinės bei elektroninės namų ir verslo apsaugos srityse.”
- Main section heading: “Paslaugos”

“Aukščiausio lygio” and the tagline make quality claims; use only if the client endorses them. “Fizinės apsaugos” may imply guarding services that the five listed offerings do not establish.

## Contact and service area

Source: `constants/contact-data.ts`. Social URLs and legal name: `components/Footer/Footer.tsx`.

| Original label | Original value                  |
| -------------- | ------------------------------- |
| El. paštas     | info@securityguru.lt            |
| Tel. Nr.       | +37060334255, +37060283726      |
| Dirbame        | Vilniuje ir Vilniaus apskrityje |
| Darbo laikas   | I-VII 9:00-21:00                |
| Įm. kodas      | 306109454                       |

- Facebook: <https://www.facebook.com/people/Security-guru/100088856047734/>
- Instagram: <https://www.instagram.com/mbsecurityguru/>

Confirm both phone numbers, hours, company code, legal name, email delivery, and social accounts with the client before publishing. The owner has separately confirmed Vilnius and Vilnius County as the intended service area. The new site should use direct `tel:` and `mailto:` links instead of the old contact form.

## Service cards

Source: `constants/services.ts`. Titles, starting prices, and descriptions below preserve the original wording, including grammatical issues.

### Apsaugos signalizacijos sistemos — nuo €200

> Montuojame ir įrengiame apsaugos signalizacijas namuose ir biuruose, kad užtikrinti jūsų patalpų saugumą.

### Įeigos kontrolės sistemos — nuo €100

> Diegiame ir įrengiame eismo valdymo sistemas biuruose ir viešosiose vietose eismo srautams valdyti ir saugumui užtikrinti.

The card says “eismo valdymo sistemas” (traffic management systems), while the service page describes access control and intercoms. Treat the card description as an error.

### Priešgaisrinės signalizacijos sistemos — nuo €200

> Montuojame ir įrengiame priešgaisrinę signalizaciją namuose ir biuruose, kad aptiktume ir įspėti apie gaisrą.

### Vaizdo stebėjimo sistemos — nuo €200

> Montuojame ir įrengiame stebėjimo sistemas namuose ir biuruose, kad stebėti veiklą ir aptikti bet kokį įtartiną elgesį.

The double space before “stebėti” appears in the original.

### Integruoti apsaugos sprendimai — nuo €200

> Pagal užsakymą įrengiame integruotą apsaugos sistemą, kuri apima apsaugos signalizaciją, eismo kontrolę, priešgaisrinę signalizaciją ir stebėjimo sistemas.

Here too, “eismo kontrolę” conflicts with the access-control service. The service page below does not state a price, although the card does.

## Service pages

The following bodies transcribe the MDX page prose, including the source's wording and typos. MDX wrapper code and page titles are omitted; titles are represented by section headings here.

### Apsaugos signalizacijos sistemos

Source: `app/paslaugos/apsaugos-signalizacijos-sistemos/page.mdx`.

> Įsibrovimo ir pavojaus signalizacijos sistemos yra diegiamos nesankcionuoto patekimo į saugomą patalpą aptikimui ir prevencijai. Statistikos duomenimis, namai arba patalpos, kuriuose nėra įrengta apsaugos signalizacijos sistema, vagystės rizika išauga 300%\*. Dar vienas įdiegtos signalizacijos sistemos privalumas yra namų draudimo įmokos sumažinimas- draudimo įmonės draudžiant namus įvertina ar namuose yra įrengta apsaugos signalizacija ir ar ji yra pajungta į centralizuotą stebėjimo pultą. Įmonė teikia apsaugos signalizacijos sistemų montavimo, priežiūros ir remonto paslaugas.

> Projekto kaina nuo **200 eurų**.

> \*https://engineeredalarm.com/pages/facts-figures-home-security

The 300% burglary statistic and insurance discount claim need credible, locally relevant verification. Omit if unverified. The linked source is a third-party commercial site.

### Įeigos kontrolės sistemos

Source: `app/paslaugos/ieigos-kontroles-sistemos/page.mdx`.

> Pagrindinė įeigos kontrolės sistemų paskirtis yra riboti pašalinių asmenų patekimą į saugomas patalpas arba teritorijas. Be to, šios sistemos gali atlikti laiko apskaitos funkcijas. Šiandieninėse realijose šios sistemos yra neatsiejamos bendros apsaugos sistemos dalis, kuriuos yra diegiamos įvairios paskirties objektuose- administracinėse, gamybinėse, gyvenamuosiuose. Įmonė teikia įeigos kontrolės bei telefonspynių sistemų diegimo, priežiūros ir remonto paslaugas.

> Projekto kaina nuo **100 eurų**.

### Integruoti apsaugos sprendimai

Source: `app/paslaugos/integruoti-apsaugos-sprendimai/page.mdx`.

> Apsaugos sistemos yra integruojamos, siekiant išgauti didesnio saugumo ir funkcionalumo. Pavyzdžiui, įeigos kontrolės sistemos yra integruojamos į gaisro aptikimo sistemas- esant gaisro požymiams visi pastato išėjimai yra automatiškai atrakinami. Išmanios vaizdo sistemos yra integruojamos į įsibrovimo pavojaus sistemas, gaunant perimetro apsaugos sprendimą. Mūsų įmonė teikia įeigos kontrolės, vaizdo stebėjimo, apsaugos bei gaisro aptikimo sistemų integracijos paslaugas.

No price appears in this page body; the card lists “nuo €200”. The example of automatic fire-exit unlocking should be checked for applicability to the offered system and building requirements.

### Priešgaisrinės signalizacijos sistemos

Source: `app/paslaugos/priesgaisrines-signalizacijos-sistemos/page.mdx`.

> Priešgaisrinės signalizacijos sistemos yra naudojamos automatiniam, gaisrui būdingiems požymiams, tokiems kaip dūmai, liepsna, didelė temperatūra, aptikimui. Šiuolaikinės priešgaisrinės sistemos gali ne tik nustatyti kurioje patalpoje kilo gaisras bet ir valdyti pastatų automatikos sistemas, bei stebėti kiekvieno jutiklio užterštumo lygį realiu laiku. Remiantis Priešgaisrinės apsaugos ir gelbėjimo departamento taisyklemis gaisro aptikimo ir signalizavimo sistemos įrengimas yra privalomas projektuojant ir statant naujus pastatus, bei juos renovuojant arba keičiant jų paskirtį. Šių taisyklių nepaisymas gali brangiai kainuoti, jog gaisras yra viena iš didžiausių grėsmių turtui ir žmonių gyvybei bei sveikatai. Be to, pastate neįrengta gaisro aptikimo sistema gali stipriai padidinti pastato draudimo kaštus. Mūsų įmonė teikia priešgaisrinių signalizacijos sistemų montavimo, remonto bei priežiūros paslaugas.

> Projekto kaina nuo **200 eurų**.

The blanket statement about legal installation requirements needs current Lithuanian legal review; the insurance-cost assertion and technical capabilities should be checked. Avoid publishing these claims unverified.

### Vaizdo stebėjimo sistemos

Source: `app/paslaugos/vaizdo-stebejimo-sistemos/page.mdx`.

> Vaizdo stebėjimo sistemos yra skirtos teritorijų, patalpų, kiemų bei specifinių daiktų stebėjimui ir apsaugai. Jos atlieka aptikimo, atpažinimo, identifikavimo, autentifikavimo bei specialias užduotis. Įdiegta vaizdo stebėjimo sistema ne tik leidžia stebėti nuotolinį ar vietinį objektą bei atkurti įvykių eigą, bet atlieka ir prevencijos bei atbaidymo funkcijas. Mūsų įmonė teikia vaizdo stebėjimo sistemų montavimo, priežiūros ir remonto paslaugas.

> Projekto kaina nuo **200 eurų**.

The recognition, identification, and authentication capabilities may depend on the specific products installed. Confirm before using as general claims.

## About page

Source: `constants/about-us.ts`. These five entries are transcribed in full.

### Visapusiški saugumo sprendimai

> Siūlome platų paslaugų spektrą, pritaikytą konkretiems jūsų saugumo poreikiams. Nesvarbu, ar jums reikia priešgaisrinės signalizacijos, įeigos kontrolės sistemų, ar vaizdo stebėjimo, mes jums padėsime.

### Į klientus orientuotas požiūris

> SECURITY GURU teikia pirmenybę jūsų saugumo reikalavimams ir glaudžiai su jumis bendradarbiauja, kad užtikrintų jūsų poreikių patenkinimą. Mūsų ekspertai skiria laiko suprasti jūsų rūpesčius ir pateikia asmeninius sprendimus.

### Profesionalumas ir kompetencija

> Mūsų komanda, turinti ilgametę patirtį saugumo srityje, užtikrina kokybišką darbą ir patikimus saugumo sprendimus, kuriais galite pasikliauti. Naudojamės savo patirtimi, kad savo klientams suteiktume geriausias įmanomas paslaugas.

### Inovatyvūs sprendimai

> Mes nuolat sekame naujausius saugumo pramonės pokyčius ir taikome novatoriškus sprendimus, kad patenkintume savo klientų poreikius. Visada ieškome naujų būdų, kaip pagerinti savo paslaugas ir pateikti geriausius įmanomus sprendimus.

### Lankstumas

> Suprantame, kad mūsų klientai turi užimtą darbo grafiką, todėl siūlome paslaugas 7 dienas per savaitę nuo 9 iki 21 val. Esame pasiryžę suteikti lanksčias planavimo galimybes, kad galėtume prisitaikyti prie jūsų poreikių.

The experience, expertise, quality, innovation, and seven-day availability claims need client confirmation. No verifiable trust material was supplied at planning time.

## Brand references

- Canonical color reference: `assets/02_Spalvu_Palete/SecurityGuru_Spalvu_Palete.pdf`: dark green `#021614`, violet `#9B849A`, light green `#C3C9B5`, orange `#FFBC85`.
- Vector logo family: `assets/01_Logotipas/SVG/`, with icon, full logo, horizontal logo, and wordmark variants.
- `constants/theme.ts` contains application-specific Mantine color scales and layout values; its orange primary `#FFAB66` differs from the canonical `#FFBC85` palette swatch. Treat the palette PDF as the brand source.

## Legacy public routes and domain

`next-sitemap.config.js` and `public/robots.txt` identify the former public origin as `https://securityguru.lt`. The routes worth considering for redirects or retention are `/`, `/apie-mus`, `/susisiekite`, and the five `/paslaugos/<service-slug>` paths shown above. `/projektai` was a placeholder and is out of scope. The former shop was an external link and is out of scope. This route list is a migration reference, not a decision about the new locale URL scheme.
