const TM = require('../models').Task;
const UM = require('../models').User;

class TaskController {
  static create(req, res, next){
    const {title, category} = req.body;
    TM.create({title, category, UserId: req.userData.id})
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.log(err);
      next(err)
    })
  }

  static findAll(req, res, next) { //author
    TM.findAll({
      include: [{
        model: UM,
        attributes: ['email']
      }]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static findId(req, res, next) { //author
    TM.findByPk(Number(req.params.id))
    .then(data => {
      console.log(data);
      if (data) res.status(200).json(data);
      else  next({name: 'DATA_NOT_FOUND'})
    })
    .catch(err => {
      next(err)
    })
  }

  static update(req, res, next) { //author
    const {title, category} = req.body;
    TM.update({title, category}, {where: {id: Number(req.params.id)}})
    .then(data => {
      if (data == 1) res.status(200).json('Data succesfully updated!')
      else next({name: 'DATA_NOT_FOUND'})
    })
    .catch(err => {
        next(err)
    })
  }

  static destroy(req, res, next) { // author
    TM.destroy({where:{id: req.params.id}})
    .then(data => {
      if (data == 1) res.status(200).json('Data succesfully deleted!')
      else next({name: 'DATA_NOT_FOUND'});
    })
    .catch(err => {
        next(err)
    })
  }
}

module.exports = TaskController;
