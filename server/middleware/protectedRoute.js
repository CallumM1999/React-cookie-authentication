const protectedRoute = (req, res, next) => !!req.user ? next() : res.redirect('/login');
    
module.exports = protectedRoute;