---
title: "Om WebData-prosjektet"
meta_title: "Om oss"
description: "dette er metabeskrivelse"
image: "/images/avatar.png"
draft: false
---

# Om prosjektet
WebData er et prosjekt for å bygge en nasjonal forskningsinfrastruktur for nettdata. Prosjektet er finansiert av Norges forskningsråd, og skal øke tilgangen for forskere, studenter og andre ved å innføre en differensert tilgangsmodell, inkludert implementering av automatisk identifikasjon av personopplysninger for å åpne innhold som ellers er begrenset.

Infrastrukturen skal legge til rette for forskning på norsk og samisk språk og kultur, og bidra til utvikling av ressurser for å forhindre domenetap. WebData vil også produsere nettkorpus for bokmål, nynorsk og samiske språk som kan brukes til å bygge store språkmodeller. Videre vil prosjektet undersøke representasjonen av samiske språk og kulturer i nettarkivet, med mål om å forbedre bevaring og forskning på samisk kulturarv.

WebData vil også muliggjøre forskning på hvordan den offentlige diskursen er blitt påvirket av overgangen til internett. Det vil åpne for studier av manipulasjon og "ekkokamre", samt mulige trusler mot tilliten til demokratiske institusjoner.

## Prosjektmål
WebData-prosjektet har fire hovedmål:

- Bygge en allmenn plattform som gjør det mulig for forskere å søke, utforske og hente ut webdata (tekst, lyd, video, bilder) fra det norske webarkivet, i tråd med FAIR-prinsippene for gjenfinnbarhet, tilgjengelighet, interoperabilitet og gjenbrukbarhet.
- Automatisk klassifisere tekst for å identifisere sensitive personopplysninger og rense data for å åpne samlinger som ellers ville vært begrenset.
- Berike data med høykvalitets annotasjoner for å tilby analytiske tjenester til forskere fra ulike fagfelt.
- Utvikle infrastrukturen i samarbeid med forskningsmiljøer gjennom behovskartlegging, og identifisere ressurser knyttet til underrepresenterte samfunn, spesielt samiske språk og kultur, for å støtte kunnskapsproduksjon.

## Prosjektorganisering
Nasjonalbiblioteket leder prosjektet. Prosjektet involverer partnere med ekspertise innen språkteknologi og maskinlæring: Norsk Regnesentral (NR), både Gruppe for språkteknologi (LTG) og HumIT ved Universitetet i Oslo (UiO), samt Giellatekno – senter for samisk språkteknologi ved UiT Norges arktiske universitet.

Infrastrukturen bygger på partnernes eksisterende infrastruktur og langsiktige strategier, og vil bli driftet av Nasjonalbiblioteket etter prosjektperioden.

## Arbeidspakker
WebData-prosjektet er organisert i seks arbeidspakker (WP):

### WP-0: Administrasjon
Denne arbeidspakken har ansvar for prosjektets overordnede ledelse, inkludert koordinering av forskningsaktiviteter, administrasjon, intern kommunikasjon, organisering av arrangementer, rapportering, kvalitetssikring og formidling.

### WP-1: Dataplattform
Denne arbeidspakken skal etablere webtjenesten med brukergrensesnitt og REST API, inkludert databaseklynge, implementering av CLEANUP-pipelinen fra WP-2 for håndtering av personopplysninger, implementering av flerlagstilgangsmodellen, autorisasjon og autentisering (med Feide), implementering av persistente identifikatorer for webdata, etablere funksjonalitet for eksport av korpus, og innlemme berikelsespipelines fra WP-4.

### WP-2: Uthenting og rensing av data
Denne arbeidspakken skal utvikle programvarepipeline for å trekke ut, rense og kategorisere tekstdata fra nedlastede nettsider, inkludert tekstekstraksjon og rensing, metadata-inferens, tekstrensing og bitext-ekstraksjon og -alignering.

### WP-3: Multimodalitet
Denne arbeidspakken skal utvikle en pipeline for transkribering og metadatainnhenting fra lyd, video og bilder, inkludert metadatauttrekk, automatisk talegjenkjenning, behandling av lydtranskripsjoner, testing og innsamling av samisk lyd.

### WP-4: Databeriking
Denne arbeidspakken fokuserer på å berike utvalg av WebData-samlingen med lingvistiske annotasjoner, som morfosyntaktisk tagging, parsing, sentimentanalyse, hente ut hendelser og kjerneferenseoppløsning, og vil informeres av behovskartleggingen i WP-5.

### WP-5: Formidling
Denne arbeidspakken vil fokusere på å engasjere forskningsmiljøer, innhente informasjon om deres behov, sikre representasjon av samiske nettsteder, formidle webkorpora gjennom Glossa og Korp, lage selvkravlingssett for forskere, arrangere seminarer, utvikle opplæringsmateriell og aktiviteter, samt publisere artikler.

## Programvare og data
Programvaren som utvikles for WebData vil være åpen kildekode.

Dataene vil lagres sikkert, klassifiseres i fire tilgangskategorier, og følge gjeldende lovverk og etiske retningslinjer, inkludert FAIR-prinsippene og for samisk innhold også CARE-prinsippene.
