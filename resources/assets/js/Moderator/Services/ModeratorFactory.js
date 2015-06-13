module.exports = function(moderator)
{
    moderator.factory('ModeratorFactory', function()
    {
        var moderator = {};

        moderator.groups = [{name:'test1'},{name:'test2'}];

        moderator.addGroup = function(newGroupName){
    		moderator.groups.push({name:newGroupName});
        };

        return moderator;
    });

};