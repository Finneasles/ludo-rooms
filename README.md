# Ludo-rooms

![Thumbnail](/public/images/thumb.png)

A ludo game rooms handler implemented using web-sockets and Typescript to handle board logic and client communication.

## Features

- Real-time Multiplayer.
- Turn-based game-play.
- Dice rolling.
- Player management, joining and leaving.
- Chat functionality.

## Getting Started

First, create a server directory in you root directory so you can access shared types:

```bash
mkdir server
```

And clone the the [server repository](https://github.com/finneasles/ludo-rooms-server) content into it.

```bash
git clone https://github.com/Finneasles/ludo-rooms-server.git server
```

### Running the server

To run the server, navigate to the server directory:

```bash
cd server
```

Then, run the server:

```bash
npm run dev
# or
yarn dev
```

### Running the client

From the root directory, run:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

You can learn more in the [Documentations](https://f1n.dev/ludo-rooms/).
