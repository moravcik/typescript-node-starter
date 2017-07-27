<img height="0" width="0" alt="Typescript Starter Dark" src="https://cloud.githubusercontent.com/assets/904007/23006840/4e2b0c6c-f3d2-11e6-8f32-11384ee0cc4b.png"><img alt="typescript-starter" src="https://cloud.githubusercontent.com/assets/904007/23006836/4c67a3b8-f3d2-11e6-8784-12f0a34284d1.png">

# typescript-starter

A [typescript](https://www.typescriptlang.org/) starter for building javascript libraries and projects:

* Write **standard, future javascript** – with stable es7 features – today ([stage 3](https://github.com/tc39/proposals) or [finished](https://github.com/tc39/proposals/blob/master/finished-proposals.md) features)
* [Optionally use typescript](https://basarat.gitbooks.io/typescript/content/docs/why-typescript.html) to improve tooling, linting, and documentation generation
* Export as a [javascript module](http://jsmodules.io/), making your work **fully tree-shakable** for consumers using [es6 imports](https://github.com/rollup/rollup/wiki/pkg.module) (like [Rollup](http://rollupjs.org/) or [Webpack 2](https://webpack.js.org/))
* Export type declarations to improve your downstream development experience
* Backwards compatibility for Node.js-style (CommonJS) imports

So we can have nice things:
* Generate API documentation (HTML or JSON) [without a mess of JSDoc tags](https://blog.cloudflare.com/generating-documentation-for-typescript-projects/) to maintain

## Get started

Before you start, consider using an [editor with good typescript support](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).

[VS Code](https://code.visualstudio.com/) (below) is a popular option. Editors with typescript support can provide helpful autocomplete, inline documentation, and code refactoring features.

<p align="center">
  <img alt="Typescript Editor Support – vscode" width="600" src="https://cloud.githubusercontent.com/assets/904007/23042221/ccebd534-f465-11e6-838d-e2449899282c.png">
</p>

To see how this starter can be used as a dependency in other projects, check out the [`examples`](./examples) folder. The example above is from [`examples/node-typescript`](./examples/node-typescript).

## Development guide

### Login to NPM

Run command `npm login`, which will ask for credentials (search for 'cloud solutions' on wiki). When successful, npm token will be stored in `~/.npmrc` file

### Install dependencies

```
npm install
```

Private dependencies will be resolved as well.

### Build project

Build entire project - in _commonjs_ and _es6_ standard:

```
npm run build
```

To enable watch mode add `-w` to `build:main` or `build:module` script in `package.json`

## Enable stronger type checking (recommended)

To enable additional Typescript type checking features (a good idea for mission-critical or large projects), uncomment "strict compilerOptions" in `tsconfig.json`.

## Generateyour API docs

The src folder is analyzed and documentation is automatically generated using [typedoc](https://github.com/TypeStrong/typedoc).

```bash
npm run docs
```
This command generates API documentation for your library in HTML format and opens it in a browser.

Since types are tracked by Typescript, there's no need to indicate types in JSDoc format. For more information, see the [typedoc documentation](http://typedoc.org/guides/doccomments/).

To generate and publish your documentation to [GitHub Pages](https://pages.github.com/) use the following command:

```bash
npm run docs:publish
```

Once published, your documentation should be available at the proper GitHub Pages URL for your repo. See [this repo's GitHub Pages](https://bitjson.github.io/typescript-starter/) for an example.

<p align="center">
  <img height="500" alt="typedoc documentation example" src="https://cloud.githubusercontent.com/assets/904007/22909419/085b9e38-f222-11e6-996e-c7a86390478c.png">
</p>

## How to release a new version
 
Release version with [`npm version`](https://docs.npmjs.com/cli/version) command.<br/>
Before releasing make sure all changes are committed into git. Release will fail with uncommitted changes.

`npm version patch -m "new release"` will increase the `patch` part of version `major.minor.patch`

Use one of following identifiers:<br>
`major | minor | patch | premajor | preminor | prepatch | prerelease | from-git | <specific-version>`

Running `npm version` will do following tasks automatically:
- `git push`, which will fail if there are other changes in git (via `preversion` script)
- bump version in `package.json`
- create new git tag for the new version, e.g. `v1.5.2`
- build package with `npm run build` (via `version` script)
- publish to npm as private package `npm publish --access restricted` (via `version` script)
- push new version tag to git, including newly created tag (via `postversion` script)
- generate and publish docs to `gh-pages` git branch with `npm run docs:publish` (via `postversion` script)


## All package scripts

```
  build
    (Trash and re)build the library
  lint
    Lint all typescript source files
  docs
    Generate HTML API documentation and open it in a browser
  docs:publish
    Generate HTML API documentation and push it to GitHub Pages (gh-pages branch)
```
## Notes

### Multiple builds (`main` and `module`)

The `src` of `typescript-starter` is compiled into two separate builds: `main` and `module`. The `main` build is [configured to use the CommonJS module system](https://github.com/bitjson/typescript-starter/blob/master/tsconfig.json#L8), while the `module` build [uses the new ES6 module system](https://github.com/bitjson/typescript-starter/blob/master/config/tsconfig.module.json).

Because Node.js does not yet support the ES6 module system, Node.js projects which depend on typescript-starter will follow the `main` field in [`package.json`](https://github.com/bitjson/typescript-starter/blob/master/package.json). Tools which support the new system (like [Rollup](https://github.com/rollup/rollup)) will follow the `module` field, giving them the ability to statically analyze typescript-starter. When building for the browser, newer tools follow the `browser` field, which will resolve to the browser build's ES6 module.

### Dependency on `tslib`

By default, this project requires [tslib](https://github.com/Microsoft/tslib) as a dependency. This is the recommended way to use Typescript's es6 &amp; es7 transpiling for sizable projects, but you can remove this dependency by removing the `importHelpers` compiler option in `tsconfig.json`. Depending on your usage, this may increase the size of your library significantly, as the Typescript compiler will inject it's helper functions directly into every file which uses them. (See also: [`noEmitHelpers` &rarr;](https://www.typescriptlang.org/docs/handbook/compiler-options.html))

### Targeting older environments

By default, this library targets environments with native (or already-polyfilled) support for es6 features. If your library needs to target Internet Explorer, outdated Android browsers, or versions of Node older than v4, you may need to change the `target` in `tsconfig.json` to `es5` (rather than `es6`) and bring in a Promise polyfill (such as [es6-promise](https://github.com/stefanpenner/es6-promise)).

It's a good idea to maintain 100% unit test coverage, and always test in the environments you target.
