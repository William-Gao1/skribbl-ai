# Skribbl.ai

Pictionary but it's humans vs AI. If the AI guesses the word before the humans do, they lose. The objective is for the drawer to draw in a way so that the other humans can guess the word but the AI cannot.

The AI we (will) use is a LSTM recurrent neural network. Currently, the "AI" just guesses randomly

## Run Locally

To run this project locally, you will need `node.js` (v20.10 recommended). You can install it [here](https://nodejs.org/en).

Clone the project

```bash
  git clone https://github.com/William-Gao1/skribbl-ai.git
```

Go to the project directory

```bash
  cd skribbl-ai
```

Install dependencies for server and client

```bash
  npm install
  cd client
  npm install
```

Start the server

```bash
  npm start
```

Start the client (need another terminal tab)

```bash
  cd client
  npm start
```
