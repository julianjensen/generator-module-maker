"use strict";

const
    join = require( 'path' ).join,
    Promise = require( 'bluebird' ),
    fs = Promise.promisifyAll( require( 'fs-extra' ) ),
    helpers = require( 'yeoman-test' ),
    assert = require( 'yeoman-assert' );

let tmpDir;

describe( 'generator-git-setup', function() {

    before( function() {
        return helpers.run( join( __dirname, "../generators/app" ) )
            .inTmpDir( function( dir ) {
                tmpDir = dir;
                // return fs.copyAsync( join( __dirname, '../generators/app/templates' ), dir );
            } )
            // .withOptions( { commit: 'Initial commit', repository: 'some-repo' } )
            .withPrompts( { moduleName: 'tester', moduleDesc: 'some test module', githubUsername: 'uncletester', moduleKeywords: 'key word', badges: [ 'codacy' ], serial: '123abc' } );
    } );

    it( 'should do its thing', function() {

        assert.file( [ '.git', '.git/config', '.editorconfig', '.eslintrc.json', '.gitignore', 'index.js', 'test/index-test.js', 'LICENSE', 'package.json', 'README.md' ] );
    } );

} );

