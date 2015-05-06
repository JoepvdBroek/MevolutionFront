module.exports = function(admin)
{
    require('./AdminController.js')(admin);
    require('./NavigationBarController.js')(admin);
};