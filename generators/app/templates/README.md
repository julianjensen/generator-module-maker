# <%= moduleName %>

<%= badgesTop %>

> <%= moduleDesc %>

## Remove This Section After Reading

Make sure you update this *README* file and remove this section. By using copious amount of *JSDoc* tags you can ensure good code documentation. This module supports the automatic generation of an API document by typing `npm run mddocs` which will create a document `API.md` which you can link to or concatenate to this *README.md* file.

It has also set up a unit test enviroment. Just type `npm test` to execute your unit tests which will be in the `test/` directory. It uses **mocha** and **chai** for testing.

It has `.gitignore`, `.editorconfig`, and `.eslintrc.json` files in the project root.

Here's how to finalize the **git** VCS for this project.

1. Create your repository on <%= repository %> (Your project directory is already init'd and staged for commit)
2. Type `git push -u origin master`

## Install

```sh
npm i <%= moduleName %>
```

## Usage

```js
const 
    <%= camelModuleName %> = require( '<%= moduleName %>' );

<%= camelModuleName %>() // true
```

## License

MIT © [<%= name %>](<%= repository %>)

<%= badgesFoot %>
