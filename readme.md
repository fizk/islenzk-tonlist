# Íslensk tónlist

## Develop
Clone the repo and install dependencies. You need to install npm both in the root folder and in the **functions**
folder, some something like this

```sh
$ npm i && cd functions npm i
```

### Client: `dev`
I haven't figured you how to do this in one command. So first you need to start the client pipeline. For that you use
`$ npm run dev`, this will start a Webpack watcher as well as a WebpackDevServer.

Other useful commands for the client are:

* `build`, which creates a production ready client code
* `deploy`, which deploys everything to Google Cloud Functions 
* `lint`, which lints client code 
* `test`, which runs test 
* `storybook`, which runs Storybook (on port 9001)  

### Server: `serve`
Next you need the GraphQL server. `cd` into **functions** function and run `npm run serve`. This command will build and
run the function through the `firebase` tool, but it will not watch for changes

Other useful commands are:

* `dev` which will run the GraphQL server NOT through **firebase**, but just as a regular Express app behind **nodemon** (on port 5000)
* `start` which will start an interactive **firebase** shell
* `lint` which runs the linter

## Deploy
```sh
$ npm run deploy
```

## Structure
![content-type](https://user-images.githubusercontent.com/386336/39729983-1d4cae9a-52a2-11e8-8f01-884358a995dd.png)
