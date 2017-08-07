const
    Yeoman    = require( "yeoman-generator" ),
    slug      = require( "slug" ),
    camel     = require( "camelcase" ),

    badges    = [
        { checked: true, name: "coveralls" },
        { checked: true, name: "travis" },
        { checked: true, name: "depstat" },
        { checked: true, name: "npm" },
        { checked: true, name: "license" },
        { checked: true, name: "snyk" },
        { checked: true, name: "codacy" },
        { checked: true, name: "david-dm" },
        { checked: true, name: "bithound" },
        { checked: true, name: "codeclimate" }
    ],
    badgeUrls = {
        'coveralls':   {
            name: 'Coveralls Status',
            image: 'https://coveralls.io/repos/github/julianjensen/PROJECT/badge.svg?branch=master',
            url: 'https://coveralls.io/github/julianjensen/PROJECT?branch=master'
        },
        'travis':      {
            name: 'Build Status',
            url: 'https://travis-ci.org/julianjensen/PROJECT',
            image: 'http://img.shields.io/travis/julianjensen/PROJECT.svg'
        },
        'depstat':     {
            name: 'Dependency Status',
            url: 'https://gemnasium.com/github.com/julianjensen/PROJECT',
            image: 'https://gemnasium.com/badges/github.com/julianjensen/PROJECT.svg'
        },
        'npm':         {
            name: 'npm version',
            url: 'https://badge.fury.io/js/PROJECT',
            image: 'https://badge.fury.io/js/PROJECT.svg'
        },
        'license':     {
            name: 'License',
            url: 'https://github.com/julianjensen/PROJECT/blob/master/LICENSE',
            image: 'https://img.shields.io/badge/license-MIT-brightgreen.svg'
        },
        'snyk':        {
            name: 'Known Vulnerabilities',
            url: 'https://snyk.io/test/github/julianjensen/PROJECT',
            image: 'https://snyk.io/test/github/julianjensen/PROJECT/badge.svg'
        },
        'codacy':      {
            name: 'Codacy Badge',
            url:   'https://www.codacy.com/app/julianjensen/PROJECT?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=julianjensen/PROJECT&amp;utm_campaign=Badge_Grade',
            image: 'https://api.codacy.com/project/badge/Grade/SERIAL'
        },
        'david-dm':    {
            name: 'david-dm',
            image: 'https://david-dm.org/julianjensen/PROJECT.svg',
            url: 'https://david-dm.org/julianjensen/PROJECT'
        },
        'bithound':    {
            name: 'bitHound Code',
            image: 'https://www.bithound.io/github/julianjensen/PROJECT/badges/code.svg',
            url: 'https://www.bithound.io/github/julianjensen/PROJECT'
        },
        'codeclimate': {
            name: 'Code Climate',
            image: 'https://codeclimate.com/github/julianjensen/PROJECT/badges/gpa.svg',
            url: 'https://codeclimate.com/github/julianjensen/PROJECT'
        }
    };

module.exports = class extends Yeoman
{
    prompting()
    {
        return this.prompt( [
                         {
                             name:    "moduleName",
                             message: "What is the module name?",
                             filter:  s => slug( s ),
                             default: require( "path" ).basename( process.cwd() ).replace( /\s+/g, "-" )
                         },
                         {
                             name:    "moduleDesc",
                             message: "What is the module description?",
                             default: props => props.name
                         },
                         {
                             name:     "githubUsername",
                             message:  "What is your GitHub user name?",
                             store:    true,
                             validate: value => value.length > 0 ? true : "github needed"
                         },
                         {
                             name:    "moduleKeywords",
                             message: "Keywords?",
                             default: "node"
                         },
                         {
                             type: 'checkbox',
                             name: 'badges',
                             message: "Select what badges to include",
                             choices: badges
                         },
                         {
                             name: "serial",
                             message: "Enter your project serial number for codacy",
                             store: true,
                             when: answers => answers.badges.indexOf( 'codacy' ) !== -1
                         }

                     ] ).then(
                     props => {
                         this.moduleName = props.moduleName;
                         this.moduleDesc = props.moduleDesc;
                         this.camelModuleName = camel( props.moduleName );
                         this.moduleKeywords = props.moduleKeywords.trim().split( /\s*,\s*|\s+/ ).map( s => ( s || "" ).trim() );

                         this.githubUsername = props.githubUsername;
                         this.name = this.user.git.name();
                         this.email = this.user.git.email();
                         this.repository = 'https://github.com/' + this.githubUsername + '/' + this.moduleName;

                         this.badges = props.badges;
                         this.badgesTop = '';
                         this.badgesFoot = '';
                         const
                             top = [],
                             foot = [];

                         if ( props.badges && props.badges.length )
                         {
                             props.badges.forEach( name => {
                                 const { name: title, image, url } = badgeUrls[ name ];
                                 top.push( `[![${title}][${name}-image]][${name}-url]` );
                                 foot.push(
                                     `[${name}-url]: ${url.replace( /PROJECT/g, this.moduleName )}`,
                                     `[${name}-image]: ${image.replace( /PROJECT/g, this.moduleName ).replace( /SERIAL/g, props.serial )}\n`
                                 );
                             } );

                             this.badgesTop = top.join( '\n' );
                             this.badgesFoot = foot.join( '\n' );
                         }

                         this.files = {};
                         this._template( "README.md" );
                         this._template( "package.json" );
                         this._template( "LICENSE" );
                         this._template( "CHANGELOG.md" );
                         this._template( "index.js", "index.js" );
                         this._template( "index-test.js", "test/index-test.js" );
                         this._template( "editorconfig", ".editorconfig" );
                         this._template( "gitignore", ".gitignore" );
                         this._template( "eslintrc.json", ".eslintrc.json" );
                     } );
    }

    _template( src, dst )
    {
        this.files[ src ] = dst || src;
    }

    writing()
    {
        Object.keys( this.files ).forEach( filename => this.fs.copyTpl( this.templatePath( filename ), this.destinationPath( this.files[ filename ] ), this ) );
    }

    install()
    {
        this.installDependencies( { bower: false } );

        this.composeWith( 'generator-travis', {
            options: {
                config: {
                    sudo:         'false',
                    language:     'node_js',
                    node_js:      [ '7', '6' ],
                    after_script: [ 'npm run coveralls' ]
                }
            }
        }, { local: require.resolve( 'generator-travis/generators/app' ) } );

        this.composeWith( 'generator-git-setup', {
            options: {
                commit:     'Initial commit',
                repository: this.repository
            }
        }, { local: require.resolve( 'generator-git-setup/generators/app' ) } );
    }
};
