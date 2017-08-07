/** ******************************************************************************************************************
 * @file Adds git remote.
 * @author Julian Jensen <jjdanois@gmail.com>
 * @since 1.0.0
 * @date 07-Aug-2017
 *********************************************************************************************************************/
"use strict";

const
    Yeoman   = require( 'yeoman-generator' );

module.exports = class extends Yeoman {
    /**
     */
    constructor()
    {
        super();
        this.option( 'commit', {
            type: String, required: false, alias: 'c',
            desc: 'Commit message, optional'
        } );
        this.option( 'repository', {
            type: String, required: true, alias: 'r',
            desc: 'Remote repository directory'
        } );
    }

    /**
     */
    initializing()
    {
        this.spawnCommandSync( 'git', [ 'init', '--quiet' ] );
        this.spawnCommandSync( 'git', [ 'remote', 'add', 'origin', this.options.repository + '.git' ] );
    }

    /**
     */
    conflicts()
    {
        if ( this.options.commit )
            this._addCommit( this.options.commit );
    }

    /**
     * @param {String} message
     * @private
     */
    _addCommit( message )
    {
        this.spawnCommandSync( 'git', [ 'add', '--all' ] );
        this.spawnCommandSync( 'git', [ 'commit', '-m', typeof message === 'string' ? message : 'init', '--quiet' ] );
    }
};
