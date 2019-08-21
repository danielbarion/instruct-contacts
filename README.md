## Instruct Contacts APP
Demo: [https://friendly-bose-005e60.netlify.com/](https://friendly-bose-005e60.netlify.com/)

Recommended OS: `Linux`, `OS X`.
You can test this app in `Windows` but you maybe need install `linux sub system` or use `git bash` to improve compatility and execute scripts.

### Informations
This project use [web components](https://developer.mozilla.org/pt-BR/docs/Web/Web_Components) concept to have a high performance like native elements.
All components are build with `HTML`, `CSS` (Stylus), `Javascript`.

Behind the scenes we have a open source project [Lit-Element](https://lit-element.polymer-project.org/) that I'm contributing to the documentation.

* Components
> All components has a `wc` prefix

* Modules
> All modules has a `instruct` prefix


### Available Scripts
#### Development
```bash
yarn start
```
This command will run development steps into source code and serve with Browserify.

#### Development
```bash
yarn start-stand-alone
```
If you prefer serve the app more static, you can use this command and use [serve](https://www.npmjs.com/package/serve) to access the app.
This command will run development steps into source code and will not run browserify.

- NPM
```bash
npm i -g serve
```

- Yarn
```bash
yarn global add serve
```

Once that's done, you can run this command inside your project's directory:

```bash
serve build -l 3005
```

Where `build` is the `folder` and `3005` is the `port`.

#### Production
```bash
yarn build
```
This command will run production steps (minify, uglify and no source map) and will not serve the app.
To test you can serve the app as your want in your server or use `serve` like the stand alone flow.