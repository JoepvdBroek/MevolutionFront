module.exports = function(admin)
{
    admin.factory('AdminFactory', function()
    {
        var admin = {};

        admin.organisations = [{name:'test1'},{name:'test2'}];

		admin.addOrganisation = function(newGroupName){
    		admin.organisations.push({name:newGroupName});
        };


        return admin;
    });

};