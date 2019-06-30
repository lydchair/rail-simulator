About the project 

We have 3 trains moving on different railways from one station to another with the
same speed, every train has assigned different number of people. They need to
circulate from side to side on their own railway and in case 2 trains or more arrive to
a cross at the same time, the one with the higher number of people should pass first.
The problem consist in making the trains circulate on their railways avoiding




Features
----------

- Webpack 3
  - Transpiles `.js` files using Babel (settings in `.babelrc`)
  - Transpiles `.scss` files using node-sass
  - ESLint - Lints `js` files on changes (rules in `.eslintrc`)
  - Stylelint - Lints `scss` files on changes (rules in `.stylelintrc`)
  - PostCSS plugins (settings in `postcss.config.js`)
    - Autoprefixer (supported browsers list in `browserslist` file)
  - Dynamic `index.html` generation
  - Dynamic build file names with hash for cache busting
- React
  - React Hot Loader v3
  - React Router v4
    - HTML5 History API (non hash routes)

Getting Started
----------------

1. Install Node.js (choose Current)
    - From [nodejs.org](https://nodejs.org/) (All platforms)
    - Or using [Homebrew](http://blog.teamtreehouse.com/install-node-js-npm-mac) (Mac)
    - Or any other [package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
1. `git clone` or [Download](https://github.com/alexilyaev/react-es6-starter/archive/master.zip) this repo
    - If using clone, remove the `.git` folder and [init a new Git repo](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/) (name it something else)
1. Update the README to your needs
1. Install dependencies (at the root of the repo):

    ```
    npm install
    ```

Development
------------

#### Run webpack-dev-server

```
npm start
```

- Open `http://localhost:8080`

Build the project for deployment
---------------------------------

```
npm run build
```

- Must use a server that serves missing routes as `index.html`

### To run the build locally

```
npm i -g live-server
live-server --mount=/:dist --entry-file=dist/index.html
```
