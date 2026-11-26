# Random String Generator

[![GitHub Pages](https://img.shields.io/github/actions/workflow/status/AKeeller/Random-String-Generator/pages.yml?branch=main&label=GitHub%20Pages)](https://github.com/AKeeller/Random-String-Generator/actions/workflows/pages.yml)
[![Latest version](https://img.shields.io/github/v/tag/AKeeller/Random-String-Generator?label=latest%20version)](https://github.com/AKeeller/Random-String-Generator/tags)
[![Docker image](https://img.shields.io/badge/container-ghcr.io%2Fakeeller%2Frandom--string--generator-blue?logo=docker)](https://ghcr.io/akeeller/random-string-generator)

A small, installable web app for generating random passwords from printable ASCII characters, excluding spaces.

## Screenshot

<img width="379" height="546" alt="image" src="https://github.com/user-attachments/assets/db8c9d47-b100-44e9-a723-db87ad5666ef" />

## Features

- Choose a password length of 16, 32, or 64 characters. The default is 32.
- A new password is generated when the app opens, reloads, or the selected length changes.
- Passwords use the browser's cryptographic random generator with unbiased character selection.
- Copy a password to the clipboard; the Copy button morphs into a checkmark after success.
- The app follows the system's light or dark appearance and works offline after its first visit.
- Passwords are generated in the browser and aren't stored or sent by the app. Copying places the password on your system clipboard.

## Run with Docker

### Build locally

```sh
docker build -t random-string-generator .
docker run --rm -p 3000:3000 random-string-generator
```

### Use the public image

```sh
docker run --rm -p 3000:3000 ghcr.io/akeeller/random-string-generator
```

Open [http://localhost:3000](http://localhost:3000).

## Install and use offline

Open the site in a supported browser and install it using the browser's install option. After the first visit and service worker setup, the app shell is available offline. Deployed sites must use HTTPS for service worker support.
