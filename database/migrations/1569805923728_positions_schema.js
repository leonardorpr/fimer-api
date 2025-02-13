'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PositionsSchema extends Schema {
  up () {
    this.create('positions', table => {
      table.increments()
      table.string('description', 80).notNullable()
      table.string('slug', 40)
      table
        .integer('game_id')
        .unsigned()
        .references('id')
        .inTable('games')
        .onUpdate('CASCADE')
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('positions')
  }
}

module.exports = PositionsSchema
