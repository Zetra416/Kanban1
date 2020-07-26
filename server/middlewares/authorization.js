const TM = require('../models').Task;

const authorization = (req, res, next) => {
  const {id} = req.params;
  TM.findByPk(id)
  .then( data => {
      if (!data) {
        next({name: 'DATA_NOT_FOUND'})
      }
     if (data.UserId === req.userData.id) {
        next()
      }
  })
  .catch(err=> {
    next(err)
  })
}

module.exports = authorization;
