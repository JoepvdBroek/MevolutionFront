module.exports = function(timeline)
{
    timeline.controller('TimelineController', [ '$scope', '$location', '$window', 'TimelineService', function($scope, $location, $window, TimelineService)
    {
    	var originalcanvases = []
		var canvases = []; 

        TimelineService.getCanvases().then(function(data, status, headers, config)
        {
        	var date1 = '24-05-2015';

            	var cyear = date1.substring(6, 10);
            	var cmonth = date1.substring(3, 5);


            for(i=0;i<data.length;i++)
            {
            	originalcanvases.push(data[i]);

            	//check if any canvas in local array
            	if (canvases === undefined || canvases.length == 0) {

            		//push the values in the array
            		canvases.push({'year':cyear, 'm':[{'month':monthsConverse(cmonth), 'canvas':[{'name':'titel'}]}]});
            	}else{

            		//loop through available canvases in local array
            		for(var j=0;j<canvases.length;j++){

            			//check if the year is already present in the local array
	        			if(canvases[j]['year'] == cyear){

	        				//check if any months in local array
	        				if (canvases[j]['m'] === undefined || canvases[j]['m'].length == 0) {
	        					
	        					
	        					//push the month in the array
	        					canvases[j]['m'].push({'month':monthsConverse(cmonth), 'canvas':[]});
	        				}else{
	        					console.log(monthsConverse(cmonth));
	        					//loop through all available months in local array
			            		for(var k=0;k<canvases[j]['m'].length;k++){

			            			//check if month exists
			            			if(canvases[j]['m'][k]['month'] == monthsConverse(cmonth)){

			            				//push canvas to this month
			            				canvases[j]['m'][k]['canvas'].push({'name':data[i]['title']});
			            			}else{
			            				//change month to data month
			            				//add canvases
			            				canvases[j]['m'].push({'month':monthsConverse(cmonth), 'canvas':[]});

			            			}
			            		}
			            	}
		            	}else{
		            		canvases.push({'year':cyear, 'm':[]});
		            	}
	        		}	            	
	            }

            }
            $scope.allCanvas = canvases;

        });

		$scope.allOriginalCanvases = originalcanvases;

        $scope.addCanvas = function(newName, type){

            TimelineService.postCanvas(newName, type).success(function(data, status, headers, config)
                {
                	console.log("lol");
                    $scope.allOriginalCanvases = [];
                    TimelineService.getCanvases().then(function(data, status, headers, config)
                    {
                        for(i=0;i<data.length;i++){
                            $scope.allOriginalCanvases.push(data[i]);
                        }
                    });
                    $scope.newCanvasName = "";
                    $scope.canvasType = "";
                    $scope.canvasTags = "";

                }).error(function(data, status, headers, config)
                {
                    console.log(status);
                    console.log(data);
                    console.log(headers);
                    console.log(config);
                });
        };
        


		$scope.filterFunction = function(element) {
			return element.name.match(/^Ma/) ? true : false;
		};

		function monthsConverse(month){
			switch(month){
				case "01":
				return "Januari";
				break;
				case "02":
				return "Februari";
				break;
				case "03":
				return "Maart";
				break;
				case "04":
				return "April";
				break;
				case "05":
				return "Mei";
				break;
				case "06":
				return "Juni";
				break;
				case "07":
				return "Juli";
				break;
				case "08":
				return "Augustus";
				break;
				case "09":
				return "September";
				break;
				case "10":
				return "Oktober";
				break;
				case "11":
				return "November";
				break;
				case "12":
				return "December";
				break;
			}
		}
    }]);
};