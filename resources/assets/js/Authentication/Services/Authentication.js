module.exports = function(authentication)
{
    authentication.factory('AuthenticationService', [ '$window', 'UserService', function($window, UserService)
    {
        var isAuthenticated = false;
        var isAdmin = false;
        var isModerator = false;

        if ($window.sessionStorage.access_token)
        {
            isAuthenticated = true;
            setRoles();
        }

        var auth = function(state) {
            if(state !== undefined ) 
            { 
                isAuthenticated = state 

                if(!state) 
                {
                    isAdmin = false;
                    isModerator = false;
                } else {
                    setRoles();
                }
            }
            return isAuthenticated;
        }

        var admin = function(state) {
            if(state !== undefined ) { isAdmin = state }
            return isAdmin;
        }

        var moderator = function(state) {
            if(state !== undefined ) { isModerator = state }
            return isModerator;
        }

        function setRoles(){
            isAdmin = false;
            isModerator = false;
            UserService.getUserInfo().success(function(data)
            {
                var roles = data[0].roles;

                if(_.contains(roles, 'admin'))
                {
                    isAdmin = true;
                    isModerator = true;
                }
                else if(_.contains(roles, 'moderator'))
                {
                    isModerator = true;
                }                
                
            }).error(function(status, data)
            {
                console.log(status);
                console.log(data);
            });
        }

        return { 
            isAuthenticated : auth,
            isAdmin : admin,
            isModerator : moderator
        };
    }]);
};
