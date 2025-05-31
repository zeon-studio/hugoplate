---
title: ""
meta_title: "About the WebData Project"
description: "About the WebData Project"
image: "/images/avatar.png"
draft: false
---

# About the Project
WebData is a project to build a research infrastructure for the Norwegian Web Archive, funded by the Research Council of Norway. The project will increase access for researchers, students and others by introducing a multi-layered access model, including implementing automatic personal information identification to open restricted content.

The infrastructure will facilitate research on Norwegian and Sámi language and culture, and aid the development of resources to prevent domain loss. WebData will also produce web corpora for Norwegian (Nynorsk and Bokmål) and Sámi languages to be used in building large language models. Further, the project will assess and aim to increase the representation of Sámi languages and cultures in the web archive, improving preservation and research of Sámi cultural heritage.

WebData will allow research into how public discourse has been impacted by the shift to the World Wide Web. It will enable the study of manipulation and “echo chambers,” and possible threats to trust in democratic institutions.

## Project Objectives
The WebData project has four main objectives:

- Building a general-purpose platform allowing researchers to search, explore, and retrieve web data (text, audio, video, images) from the Norwegian Web Archive, following FAIR principles of findability, accessibility, interoperability, and reusability.
- Automatically classifying text to identify sensitive personal information and sanitize data to open collections that would otherwise be restricted.
- Enriching data with high-quality annotations to provide analytical services for researchers from various fields.
- Developing the infrastructure in cooperation with the research community through needs assessment, and identifying resources related to underrepresented communities, especially Sámi languages and culture, to support knowledge production.

## Project Organization
The National Library of Norway is eading the project. The project involves partners with expertise in language technology and machine learning: the Norwegian Computing Center (NR), both the Language Technology Group (LTG) and HumIT at the University of Oslo (UiO), and Giellatekno - center for Sámi language technology at UiT The Arctic University of Norway.

The infrastructure builds on the partners’ existing infrastructure and long-term strategies, and will be operated by the National Library of Norway after the project period.

## Work Packages
The WebData project is organized into six work packages (WP):

### WP-0: Governance &amp; Management
This WP is responsible for the project’s overall management, including coordinating research activities, administration, internal communication, organization of events, reporting, quality assurance, and dissemination activities.

### WP-1: Data Platform
This WP will establish the web service with a user interface and REST API, including the database cluster, implementation of the CLEANUP pipeline from WP-2 for personal data handling, implementation of the multi-layered access model, authorization and authentication (with Feide), implementing persistent identifiers for web data, establishing corpus export functionality, and incorporating enrichment pipelines from WP-4.

### WP-2: Data Extraction and Sanitization
This WP will develop the software pipeline for extracting, cleaning, and categorizing text data from the crawled web pages, including text extraction and cleaning, metadata inference, text sanitization, and bitext extraction and alignment.

### WP-3: Multimodality
This WP will create a pipeline for transcribing and extracting metadata from audio, video, and images, including metadata extraction, automatic speech recognition, processing audio transcriptions, testing, and collecting Sámi audio.

### WP-4: Data Enrichment
This WP will focus on enriching subsets of the WebData collection with linguistic annotations, such as morphosyntactic tagging, parsing, sentiment analysis, event extraction, and coreference resolution, and will be informed by the needs assessment in WP-5.

### WP-5: Outreach and Dissemination
This WP will focus on engaging research communities, gathering information on their needs, ensuring representation of Sámi websites, disseminating web corpora through Glossa and Korp, creating a self-crawling kit for researchers, hosting seminars, developing training materials and activities, and publishing articles.

## Software and Data
The software developed for WebData will be open source.

Data will be stored securely, classified into four access categories, and will adhere to relevant legal frameworks and ethical guidelines, including FAIR principles and for Sámi content the CARE principles.