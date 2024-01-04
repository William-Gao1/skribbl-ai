# Skribbl.ai

Pictionary but it's humans vs AI. If the AI guesses the word before the humans do, they lose. The objective is for the drawer to draw in a way so that the other humans can guess the word but the AI cannot.

The AI that we will use will be either a CNN or a LSTM. The players will be able to choose which one from the home screen.

## Run Locally

To run this project locally, you will need `node.js` (v20.10 recommended). Node.js can be installed [here](https://nodejs.org/en).

You will also need `Python` with version between 3.9.x and 3.10.x. Python can be installed [here](https://www.python.org/downloads/).

### Install Dependencies

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

Create venv and install Python packages

```bash
# create a venv
python -m venv .venv
source .venv/bin/activate

# for linux users:
pip install -r requirements.txt
# for mac/windows users:
pip install -r dev-requirements.txt

# deactivate the venv
deactivate
```

### Start Backend Server

Start the server (you do not need to activate your venv for this)

```bash
  npm run dev
```

If successful, you should see

```
[nodemon] 3.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server/index.js`
Server listening on 3001
```

### Start Frontend Server

Start the client (need another terminal tab)

```bash
  cd client
  npm start
```

If successful, you should see

```
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://<some local ip>:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

Then, to see the app, visit [http://localhost:3000](http://localhost:3000)
