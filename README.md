
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

Since, the app requires MongoDB and Redis databases, so get it installed and running in your instance.

Apart from these, install gulp-cli globally and gulp package within the project folder.

Install nodemon for easy restart the app once changed.

For accessing Google authorization (OAuth API), create a project, then go to Credential and create create credential and select OAuth client ID and don't forget to add google callback URI into it. Then download the OAuth credentials. It will be needed when we will set the environment variables.


## Environment Variables

To run this project, you will need to add the following environment variables to your bash profile

`CODEIAL_ASSET_PATH`: `./public/assets`

`CODEIAL_DB`: `codeial_production`

`CODEIAL_GMAIL_USERNAME`: `{Your Gmail Username}`

`CODEIAL_GMAIL_PASSWORD`: `{Your Gmail Password}`

`CODEIAL_GOOGLE_CALLBACK_URI`: `http://localhost:8000/users/auth/google/callback`

`CODEIAL_GOOGLE_CLIENT_ID`: `{client_id from the credentials downloaded}`

`CODEIAL_GOOGLE_CLIENT_SECRET`: `{client_secret from the credentials downloaded}`

`CODEIAL_JWT_SECRET`: `{Your Secret Key}`

`CODEIAL_SESSION_COOKIE_KEY`: `{Your Secret Key}`

`CODEIAL_ENVIRONMENT`: `production`


## Run Locally

Start the server, once you are done with above process.

```bash
  npm run prod_start
```



