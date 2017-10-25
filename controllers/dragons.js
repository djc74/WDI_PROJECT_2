const Dragon = require('../models/dragon');

function indexRoute(req, res, next) {
  Dragon
    .find()
    .populate('createdBy')
    .exec()
    .then((dragons) => res.render('dragons/index', { dragons }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('dragons/new');
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;

  Dragon
    .create(req.body)
    .then(() => res.redirect('/dragons'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/dragons/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Dragon
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then(dragon => {
      if(!dragon) return res.notFound();
      return res.render('dragons/show', { dragon });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Dragon
    .findById(req.params.id)
    .exec()
    .then(dragon => {
      if(!dragon) return res.redirect();
      if(!dragon.belongsTo(req.user)) return res.unauthorized('You do not have permission to edit that resource');
      return res.render('dragons/edit', { dragon });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Dragon
    .findById(req.params.id)
    .exec()
    .then(dragon => {
      if(!dragon) return res.notFound();
      if(!dragon.belongsTo(req.user)) return res.unauthorized('You do not have permission to edit that resource');

      for(const field in req.body) {
        dragon[field] = req.body[field];
      }

      return dragon.save();
    })
    .then(() => res.redirect(`/dragons/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/dragons/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Dragon
    .findById(req.params.id)
    .exec()
    .then(dragon => {
      if(!dragon) return res.notFound();
      if(!dragon.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      return dragon.remove();
    })
    .then(() => res.redirect('/dragons'))
    .catch(next);
}

function createCommentRoute(req, res, next) {
  Dragon
    .findById(req.params.id)
    .exec()
    .then(dragon => {
      if (!dragon) return res.notFound();

      req.body.createdBy = req.user;
      dragon.comments.push(req.body);

      return dragon.save();
    })
    .then(() => res.redirect(`/dragons/${req.params.id}`))
    .catch((err) => {
      if (err.name === 'ValidationError') res.badRequest(`/dragons/${req.params.id}`, err.toString());
      next(err);
    });
}

function deleteCommentRoute(req, res, next) {
  Dragon
    .findById(req.params.id)
    .exec()
    .then(dragon => {
      if (!dragon) return res.notFound();
      if (!dragon.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      dragon.comments.id(req.params.commentId).remove();

      return dragon.save();
    })
    .then(dragon => res.redirect(`/dragons/${dragon.id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
