module.exports = function(timeline)
{
    timeline.controller('TimelineController', [ '$scope', '$location', '$window', 'TimelineService', '$anchorScroll', '$route', function($scope, $location, $window, TimelineService, $anchorScroll, $route)
    {

		var canvases = []; 
		var rawcanvas = [];

        TimelineService.getCanvases().then(function(data, status, headers, config)
        {        	

            for(var i=0;i<data.length;i++)
            {

            	var cyear = data[i]['createdDate'].substring(0, 4);
            	var cmonth = data[i]['createdDate'].substring(5, 7);

            	addYear(data[i], cyear, cmonth);

            	rawcanvas = data;
            }

            $scope.allCanvas = canvases;	
        });

        $scope.allOriginalCanvases = rawcanvas;

        function addYear(data, year, month){

        	if(canvases === undefined || canvases.length == 0){

        		canvases.push({'year': year, 'm': [{'month': monthsConverse(month), 'canvas': [{'title':data['title'], 'type':data['type'], 'id': data['_id']}]}]});
        	}else{

        		for(var j=0;j<canvases.length;j++){ 
        			if(canvases[j]['year'] != year){
        				canvases.push({'year': year, 'm': [{'month': monthsConverse(month), 'canvas': [{'title':data['title'], 'type':data['type'], 'id': data['_id']}]}]});
        				break;
        			}else{

        				for(k=0;k<canvases[j]['m'].length;k++){
	        				if(canvases[j]['m'][k]['month'] != monthsConverse(month)){
	        					canvases[j]['m'].push({'month': monthsConverse(month), 'canvas': [{'title':data['title'], 'type':data['type'], 'id': data['_id']}]});
	        					break;
	        				}else{
	        					canvases[j]['m'][k]['canvas'].push({'title':data['title'], 'type':data['type'], 'id': data['_id']});
	        				}
	        			}
        			}
        		}
        	}
        };

        $scope.scrollTo = function(id1, id2) {

        	if(id2 === undefined){
        		id2="";
        	}

		    var old = $location.hash();
		    $location.hash(""+id1+id2);
		    $anchorScroll();
		    $location.hash(old);
		};


        $scope.addCanvas = function(newName, type){

        	$('#create-canvas').modal('hide');
        	$('.modal-backdrop').remove();
        	

            TimelineService.postCanvas(newName, type).success(function(data, status, headers, config)
                {
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

                    $route.reload();


                }).error(function(data, status, headers, config)
                {
                    //console.log(status);
                    //console.log(data);
                    //console.log(headers);
                    //console.log(config);
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
		};
    }]);
};