# pastebox

A lightweight, self-hostable alternative to Pastebin for sharing text and files on your local network. Perfect for quick file transfers and text sharing between devices without leaving your network.

## Features

- **Simple & Fast** - Clean interface, instant sharing
- **Text Sharing** - Share code snippets, notes and text
- **File Uploads** - Share any file type
- **Temporary Storage** - All pastes expire after 24 hours
- **Self-Hosted** - Keep your data on your network
- **Docker Ready** - Easy deployment with Docker

## Quick Start

### Self-host with Docker

#### Clone repo

```sh
git clone https://github.com/huffmanks/pastebox.git && cd pastebox
```

#### Build Docker image

```sh
pnpm docker:prod:build
```

#### Run Docker container

```sh
pnpm docker:prod:up
```
