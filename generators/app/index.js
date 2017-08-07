const
    Yeoman    = require( "yeoman-generator" ),
    slug      = require( "slug" ),
    camel     = require( "camelcase" ),
    humanize  = require( "humanize-url" );

module.exports = class extends Yeoman
{
    async init()
    {
        this.prompt( [
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
                         }
                     ],
                     props => {

                         this.moduleName = props.moduleName;
                         this.moduleDesc = props.moduleDesc;
                         this.camelModuleName = camel( props.moduleName );
                         this.moduleKeywords = props.moduleKeywords.trim().split( /\s*,\s*|\s+/ ).map( s => ( s || "" ).trim() );

                         this.githubUsername = props.githubUsername;
                         this.name = this.user.git.name();
                         this.email = this.user.git.email();
                         this.repository = 'https://github.com/' + this.githubUsername + '/' + this.moduleName + '.git';

                         this.template( "README.md" );
                         this.template( "package.json" );
                         this.template( "LICENSE" );
                         this.template( "CHANGELOG.md" );
                         this.template( "index.js", "src/index.js" );
                         this.template( "index-test.js", "test/index-test.js" );
                         this.template( "editorconfig", ".editorconfig" );
                         this.template( "gitignore", ".gitignore" );
                         this.template( "eslintrc.json", ".eslintrc.json" );
                     } );
    }

    // writing()
    // {
    //     [
    //         {
    //             name: 'travis',
    //             options: {
    //                 config: {
    //                     sudo:         'false',
    //                     language:     'node_js',
    //                     node_js:      [ '7', '6' ],
    //                     after_script: [ 'npm run coveralls' ]
    //                 }
    //             }
    //         },
    //         {
    //             name: 'git-init',
    //             options: {
    //                 commit: 'Initial commit'
    //             }
    //         },
    //         {
    //             name: 'git-remote',
    //             options: {
    //                 commit: 'Initial commit',
    //                 repository: this.repository
    //             }
    //         }
    //     ].forEach( generator =>
    //         this.composeWith( generator.name,
    //                           { options: generator.options || {} },
    //                           { local: require.resolve( 'generator-' + generator.name + '/generators/app' ) } ) );
    // }

    install()
    {
        this.installDependencies( { bower: false } );

        this.composeWith( 'travis', { options: {
            config: {
                sudo:         'false',
                language:     'node_js',
                node_js:      [ '7', '6' ],
                after_script: [ 'npm run coveralls' ]
            }
        } }, {
            local: require.resolve( 'generator-travis/generators/app' )
        } );

        this.composeWith( 'git-remote', {
            options: {
                commit: 'Initial commit',
                repository: this.repository
            }
        }, { local: require.resolve( '../git-remote' ) } );
    }
};
