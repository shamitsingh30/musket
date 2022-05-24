
# Codeial

Codeial is a social media where authenticated users can interact with posts and comments.
A user can communicate to other users in a group or privately through chat engine.


## Installation

Clone the github repository.

```bash
  git clone https://github.com/shamitsingh30/social-media-website.git
  cd my-project
```

Install all the dependencies

```bash
  npm install
```

Install and setup Redis and MongoDB database and get the redis server running in background.

Apart from these dependencies, install gulp-cli globally and gulp package inside the directory for compressing the files present in assets.

Install nodemon for easy reboot of the server, once any file is changed.

For accessing Google authorization (OAuth API), create a project in Google Cloud Platform console, then go to create credential and select OAuth client ID and don't forget to add google callback URI to it. Then download the OAuth credentials. It will be needed when we will set the environment variables.


## Environment Variables

To run this project, you will need to add the following environment variables to your bash profile

`CODEIAL_ASSET_PATH: ./public/assets`

`CODEIAL_DB: codeial_production`

`CODEIAL_GMAIL_USERNAME: {Your Gmail Username}`

`CODEIAL_GMAIL_PASSWORD: {Your Gmail Password}`

`CODEIAL_GOOGLE_CALLBACK_URI: http://localhost:8000/users/auth/google/callback`

`CODEIAL_GOOGLE_CLIENT_ID: {client_id from the credentials downloaded}`

`CODEIAL_GOOGLE_CLIENT_SECRET: {client_secret from the credentials downloaded}`

`CODEIAL_JWT_SECRET: {Your Secret Key}`

`CODEIAL_SESSION_COOKIE_KEY: {Your Secret Key}`

`CODEIAL_ENVIRONMENT: production`


## Run Locally

This command line will clean the current files present in public folder and create a new one with rev-manifest.json in it. Make sure to run this command every time you make changes in assets' files.

```bash
  gulp build
```

Start the server, once you are done with above process.

For development purpose, run
```bash
  npm start
```
For production purpose, run
```bash
  npm run prod_start
```



