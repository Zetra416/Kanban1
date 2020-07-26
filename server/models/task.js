'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Task extends Model {}

  Task.init({
    title: {
      type: Sequelize.STRING,
      validate : {
        notEmpty : {
          msg: 'Task is Empty!'
        }
      }
    },
    category: {
      type: Sequelize.STRING,
      validate : {
        notEmpty : {
          msg: 'Category is Empty!'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {sequelize});
  Task.associate = function(models) {
    Task.belongsTo(models.User);
  };
  return Task;
};
