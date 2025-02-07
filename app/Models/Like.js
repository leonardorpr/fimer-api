'use strict'

const Model = use('Model')

class Like extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'LikeHook.match')
  }

  liker () {
    return this.belongsTo('App/Models/User')
  }

  likee () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Like
