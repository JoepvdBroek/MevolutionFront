module.exports = function(auth)
{
    require('./AuthenticationController.js')(auth);
    require('./SignOutController.js')(auth);
};