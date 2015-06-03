module.exports = function(authentication)
{
	authentication.factory('RouteAccess', [ '$window', '$location', 'UserService' , function($window, $location, UserService)
    {
        return {
            checkAccess : function (requiresLogin, requiredPermissions)
            {
                if($window.sessionStorage.access_token)
                {
                    if(requiredPermissions != undefined || requiredPermissions != null){
                        UserService.getUserInfo().success(function(data)
                        {
                            var roles = data[0].roles;
                            var access = false;

                            console.log(roles);
                            console.log(requiredPermissions)
                            for (i = 0; i < roles.length; i++) { 
                                console.log(roles[i]);
                                if(_.contains(requiredPermissions, roles[i]))
                                {
                                    console.log('has the required roles');
                                    access = true;
                                    //return 'hasAccess';
                                }
                            }
                            
                            if(access == false)
                            {
                                $location.path("/forbidden");
                                //return 'forbidden';
                            }    
                            
                            
                        }).error(function(status, data)
                        {
                            console.log(status);
                            console.log(data);
                        });
                    }
                    else
                    {
                        //return 'hasAccess';
                    }
                    
                }
                else
                {
                    $location.path("/unauthorized");
                    //return 'unauthorized';
                }       
                
            }
        };
    }]);
};