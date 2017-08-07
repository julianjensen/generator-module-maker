# <%= moduleName %>

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Downloads][download-badge]][npm-url]

> <%= moduleDesc %>

## Remove This Section After Reading

Make sure you update this *README* file and remove this section. By using copious amount of *JSDoc* tags you can ensure good code documentation. This module supports the automatic generation of an API document by typing `npm run mddocs` which will create a document `API.md` which you can link to or concatenate to this *README.md* file.

It has also set up a unit test enviroment. Just type `npm test` to execute your unit tests which will be in the `test/` directory. It uses **mocha** and **chai** for testing.

It has `.gitignore`, `.editorconfig`, `.editorconfig`, and `.eslintrc.json` files in the project root.

The use of the CHANGELOG file is optional. If you want to use the automatic commit system described below, leave it, otherwise you can safely delete it.

Here's how to finalize the **git** VCS for this project.

1. Create your repository at https://github.com/<%= githubUsername %>/<%= moduleName %> (Your project directory is already init'd and staged for commit)
2. Type `git commit -am "Initial commit"`
3. Type `git remote add origin http://<%= firstName %>@bitbucket.corp.pvt/scm/DIR-NAME/<%= name %>.git` edited to reflect actual path
4. Add the repository URL to your `package.json` file, a space has been prepared for you
5. Finally type `git push -u origin master`
6. You're ready to go BUT don't forget to switch to the development branch (create this in **bitbucket**)
7. Please see the *README.md* in your project directory for additional setup steps, including **WebStorm** configuration


## Install

```sh
npm i -D <%= moduleName %>
```

## Usage

```js
import <%= camelModuleName %> from "<%= moduleName %>"

<%= camelModuleName %>() // true
```

## License

MIT © [<%= name %>](<%= website %>)

[npm-url]: https://npmjs.org/package/<%= moduleName %>
[npm-image]: https://img.shields.io/npm/v/<%= moduleName %>.svg?style=flat-square

[travis-url]: https://travis-ci.org/<%= githubUsername %>/<%= moduleName %>
[travis-image]: https://img.shields.io/travis/<%= githubUsername %>/<%= moduleName %>.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/<%= githubUsername %>/<%= moduleName %>
[coveralls-image]: https://img.shields.io/coveralls/<%= githubUsername %>/<%= moduleName %>.svg?style=flat-square

[depstat-url]: https://david-dm.org/<%= githubUsername %>/<%= moduleName %>
[depstat-image]: https://david-dm.org/<%= githubUsername %>/<%= moduleName %>.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/<%= moduleName %>.svg?style=flat-square


Usage
---

```js
    function example( stuff )
    {
        // ... Example code
    }
```

API
===

```js
    var details = go_here( now );
```
