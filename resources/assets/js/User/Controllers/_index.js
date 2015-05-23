module.exports = function(user)
{
    require('./UserController.js')(user);
    require('./ChangePasswordController.js')(user);
    require('./ForgotPasswordController.js')(user);
};