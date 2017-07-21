# Usage Examples

This directory (`/examples`) can be deleted when forking this project. It contains some simple examples of how forks of `typescript-starter` can be used by other projects. (Usually you'll want to provide these instructions in your root `readme.md`.)

## node-commonjs

This shows the simplest use case – a quick, hacked-together Node.js project with no type safety, and no pre-processing. This is the way most of the Node.js ecosystem currently expects to import a node modules.

```bash
cd examples/node-commonjs

npm install
npm start
```

## node-typescript

This is for larger and more established Node.js projects which use Typescript for type safety. You'll notice that the type declarations and inline documentation from `typescript-starter` are accessible to [Typescript-compatible editors](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support) like [vscode](https://code.visualstudio.com/).

```bash
cd examples/node-typescript

npm install
```

### Run compiled with `tsc`

```
npm run build
npm start
```

### Run with `ts-node` on-the-fly compilation

Use `ts-node` as `node`:

```bash
ts-node src/test.ts

# or via npm script
npm run start:ts-node
```

Or via `ts-node/register`, create `src/index.js` file:

```javascript
require('ts-node/register');
require('./test');
```

And launch it normally with node:

```bash
node src/index.js

# or via npm script
npm run start:ts-node/register
```

## browser-rollup (with tree-shaking)

This project imports the `power` and `asyncABC` functions from the ES6 output of `typescript-starter`, without importing the `double` function. This allows for the `double` method to be completely excluded from output via [Rollup's tree-shaking](http://rollupjs.org/), making the final javascript bundle potentially much smaller, even before using a minifier like [Uglify](https://github.com/mishoo/UglifyJS2).

To demonstrate, this example doesn't minify or remove comments. You can see where some javascript has been excluded from the bundle.

```bash
cd examples/browser-rollup

npm install
npm run build
npm start
```

Testpage will open automatically in browser: [http://127.0.0.1:8080/](http://127.0.0.1:8080/)


## browser-ng (Angular CLI)

Created with [Angular CLI](https://cli.angular.io/) for Angular 4+ apps.

### How to create

```bash
# install angular-cli globally if not installed yet
sudo npm i -g @angular/cli

cd examples
ng new browser-ng
cd browser-ng
npm start
```

Add `typescript-starter` dependency:

```bash
npm i -S @solargis/typescript-starter
```

create `src/use-typescript-starter.ts` file (copy-paste from `browser-rollup/src/test.ts`):

```javascript
import { power, asyncABC } from '@solargis/typescript-starter';

let output = '';

function log (str: string) {
  console.log(str);
  output += str + '\n';
}

function logAndAlert (data: string[]) {
  log('✔ asyncABC returned: ' + data);
  window.alert(output);
}

log('Output:');

if (power(3, 4) === 81) {
  log('✔ power(3,4) === 81');
} else {
  log('The "power" method seems to be broken.');
}

asyncABC().then( abc => logAndAlert(abc) );
```

and import it in `src/main.ts`

```javascript
import './use-typescript-starter'
```

Start again:

```bash
npm start
```

Open application in browser: [http://localhost:4200](http://localhost:4200)

### How to use

```bash
cd examples/browser-ng
npm install
npm start
```

Open application in browser: [http://localhost:4200](http://localhost:4200)

Angular CLI handles all compilation and building of web application, backed with webpack.
LIVERELOAD is active. Any changes in source will result in incremental rebuild and reload of page. 

Build production version with `npm run build` command


## browser-webpack

This example was extracted from `browser-ng` with `ng eject` command - remove Angular CLI and use webpack instead.
All Angular and testing-related code was removed, so we have simple Typescript webapp handled by webpack.

Usage:

```bash
cd examples/browser-webpack

npm install
npm start

# or build production app
npm run build
```

Open application in browser: [http://localhost:4200](http://localhost:4200)