'use strict';
const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {}

  User.init({
    email: {
      type:Sequelize.STRING,
      validate : {
        notEmpty :{
          msg:'Email is Empty!'
        }
      }
    },
    password: {
      type:Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is Empty!'
        }
      }
    },
    organization: DataTypes.STRING
  },
  { hooks:{
    beforeCreate(user){
      const hash = bcrypt.hashSync(user.password, saltRounds);
      user.password = hash;
      user.organization = 'Hacktiv8';
    }
  }, sequelize });
  User.associate = function(models) {
    User.hasMany(models.Task);
  };
  return User;
};
