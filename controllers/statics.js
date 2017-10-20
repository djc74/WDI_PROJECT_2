function staticsHome(req, res) {
  res.render('statics/home');
}


module.exports = {
  home: staticsHome
};
