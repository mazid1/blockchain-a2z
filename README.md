# blockchain

This is a simple implementation of a blockchain and cryptocurrency using [Typescript](https://www.typescriptlang.org/). Project was created using `bun init` in bun v1.1.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime. The API server is implemented using [Elysia](https://elysiajs.com/).

The project is based on the Udemy course [Blockchain A-Z: Build a Blockchain, a Crypto + ChatGPT Prize](https://www.udemy.com/share/101WhE3@6ekQAx2DLGsPA8gTmKbyGwAb5U2aceDkKJAvwuJ5-Pu5Ti8ZdqSg1E-ShcXK6QPe/). However, the original implementation in the course uses [Python](https://www.python.org/) and [Flask](https://flask.palletsprojects.com/en/3.0.x/).

### To install dependencies:

```bash
bun install
```

### To run in watch mode:

```bash
bun run dev --port <port_no> --miner <miner_id>
```

### To build:

```bash
bun run build
```

### To run in production mode:

```bash
bun run start --port <port_no> --miner <miner_id>
```
