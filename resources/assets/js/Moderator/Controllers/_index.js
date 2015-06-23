module.exports = function(moderator)
{
    require('./ModeratorController.js')(moderator);
    require('./GroupsRedirectController.js')(moderator);
};