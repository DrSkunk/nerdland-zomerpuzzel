# Nerdland puzzel bot

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-f8bc45.svg)](https://github.com/prettier/prettier)

Server applicatie die elke dag een nieuwe puzzel post in Discord.

Bekijk het `help` commando voor alle opties.

## Installation

Dit vereist een [NodeJS](https://nodejs.org/en/) installatie.

Clone `one-night-ultimate-discord` in een folder en `cd` er in. Voer het commando `npm install` uit om alle dependencies te installeren.

Om de applicatie te starten, na het instellen van alle configuratie, voer `npm start` uit.

## Configureren

Kopieer `assets/puzzles.example.json` naar `assets/puzzles.json` en vul deze met de afbeeldingen die je plaatst in `assets/imgs/`.

Kopieer `.env.example` naar `.env` vul alle details in:

- `PREFIX`: De prefix voor de commando's.
- `DISCORD_TOKEN`: Uw Discord bot token.
- `TEXT_CHANNEL_ID`: De ID van het tekstkanaal waar de puzzel gepost zal worden.
