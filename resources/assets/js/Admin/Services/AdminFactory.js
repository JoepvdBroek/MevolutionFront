module.exports = function(admin)
{
    admin.factory('AdminFactory', function()
    {
        var admin = {};

        admin.groups = [{name:'test1'},{name:'test2'}];


        return admin;
    });

};