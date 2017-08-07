"use strict";

const
    join = require( 'path' ).join,
    { assert, test: helpers } = require( 'yeoman-generator' ),
    test = require( 'tape' ).test;

helpers.run( join( __dirname, "../app" ) )
    .withOptions( { skipInstall: true } )
    .withPrompts( { someOption: true } )
    .on( "end", () => {

        assert.file( [
                         "package.json",
                         "src/index.js",
                         "test/index.js",
                         "LICENSE",
                         "README.md",
                         "CHANGELOG.md",
                         ".eslintrc",
                         ".gitignore",
                         ".travis.yml",
                         ".editorconfig",
                         ".git"
                     ] );

        test( "generator-module-maker:app", ( t ) => {
            t.ok( true, "generate template files" );
            t.end();
        } );

    } );

