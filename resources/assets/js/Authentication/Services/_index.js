module.exports = function(auth)
{
    require('./Authentication.js')(auth);
    require('./RouteAccess.js')(auth);
};