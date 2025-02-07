'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

const Url = require('url-parse')
const DATABASE_URL = new Url(Env.get('DATABASE_URL'))

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'sqlite'),

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be a good choice for a development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath(
        `${Env.get('DB_DATABASE', 'development')}.sqlite`
      )
    },
    useNullAsDefault: true,
    debug: Env.get('DB_DEBUG', false)
  },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  mysql: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis')
    },
    debug: Env.get('DB_DEBUG', false)
  },

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host:
        Env.get('NODE_ENV') === 'development'
          ? Env.get('DB_HOST', 'localhost')
          : Env.get('DB_HOST', DATABASE_URL.hostname),
      port:
        Env.get('NODE_ENV') === 'development'
          ? Env.get('DB_PORT', '')
          : Env.get('DB_PORT', DATABASE_URL.port),
      user:
        Env.get('NODE_ENV') === 'development'
          ? Env.get('DB_USER', 'postgres')
          : Env.get('DB_USER', DATABASE_URL.username),
      password:
        Env.get('NODE_ENV') === 'development'
          ? Env.get('DB_PASSWORD', 'postgres')
          : Env.get('DB_PASSWORD', DATABASE_URL.password),
      database:
        Env.get('NODE_ENV') === 'development'
          ? Env.get('DB_DATABASE', 'adonis')
          : Env.get('DB_DATABASE', DATABASE_URL.pathname.substr(1))
    },
    debug: Env.get('DB_DEBUG', false)
  }
}
