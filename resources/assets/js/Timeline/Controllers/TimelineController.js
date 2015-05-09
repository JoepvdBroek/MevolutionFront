module.exports = function(timeline)
{
    timeline.controller('TimelineController', [ '$scope', '$location', '$window', 'TimelineService', function($scope, $location, $window, TimelineService)
    {

    	

  //   	$scope.allCanvas  = [ 
		// 	{ year: "2014", m: [
		// 		{ month: "Januari", canvas: [
		// 			{ name: "canvas 1"}, 
		// 			{ name: "canvas 2"}, 
		// 			{ name: "canvas 3"}, 
		// 			{ name: "canvas 4"},  
		// 			{ name: "canvas 5"}, 
		// 			{ name: "canvas 6"}, 
		// 			{ name: "canvas 7"}
		// 		]}
		// 	]},
		// 	{ year: "2016", m: [
		// 		{ month: "Januari", canvas: [
		// 			{ name: "canvas 1"}
		// 		]},
		// 		{ month: "Februari", canvas: [
		// 			{ name: "canvas 1"}
		// 		]}
		// 	]},
		// 	{ year: "2019", m: [
		// 		{ month: "Januari", canvas: [
		// 			{ name: "canvas 1"}, 
		// 			{ name: "canvas 2"},
		// 		]},
		// 		{ month: "April", canvas: [
		// 			{ name: "canvas 1"}, 
		// 			{ name: "canvas 2"}, 
		// 			{ name: "canvas 3"}
		// 		]},
		// 		{ month: "Juli", canvas: [
		// 			{ name: "canvas 1"}, 
		// 			{ name: "canvas 2"}, 
		// 			{ name: "canvas 3"}, 
		// 			{ name: "canvas 4"}, 
		// 			{ name: "canvas 5"}
		// 		]},
		// 		{ month: "Oktober", canvas: [
		// 			{ name: "canvas 1"}, 
		// 			{ name: "canvas 2"}, 
		// 			{ name: "canvas 3"}, 
		// 			{ name: "canvas 4"}
		// 		]}
		// 	]},
		// 	{ year: "2015", m: [
		// 		{ month: "Januari", canvas: [
		// 			{ name: "canvas 1"}
		// 		]}
		// 	]}
		// 	,
		// 	{ year: "2018", m: [
		// 		{ month: "Januari", canvas: [
		// 			{ name: "canvas 1"}
		// 		]}
		// 	]}
		// 	,
		// 	{ year: "2017", m: [
		// 		{ month: "Januari", canvas: [
		// 			{ name: "canvas 1"},
		// 			{ name: "canvas 2"},
		// 			{ name: "canvas 3"}
		// 		]}
		// 	]}
			
		// ];

		var canvases = []; 

        TimelineService.getCanvases().then(function(data, status, headers, config)
        {
        	var date1 = '24-05-2015';

            	var cyear = date1.substring(6, 10);
            	var cmonth = date1.substring(3, 5);

            for(i=0;i<data.length;i++)
            {
            	console.log(data);

            	if (canvases === undefined || canvases.length == 0) {
            		canvases.push({'year':cyear, 'm':[{'month':cmonth, 'canvas':[{'name':'titel'}]}]});
            	}else{
            		for(var j=0;j<canvases.length;j++){
	        			if(canvases[j]['year'] == cyear){
	        				if (canvases[j]['m'] === undefined || canvases[j]['m'].length == 0) {
	        					canvases[j]['m'].push({'month':cmonth, 'canvas':[]});
	        				}else{
			            		for(var k=0;k<canvases[j]['m'].length;k++){
			            			if(canvases[j]['m'][k]['month'] == cmonth){
			            				canvases[j]['m'][k]['canvas'].push({'name':data[i]['title']});
			            			}else{
			            				//change month to data month
			            				//add canvases
			            				canvases[j]['m'].push({'month':cmonth, 'canvas':[]});

			            			}
			            		}
			            	}
		            	}else{
		            		canvases.push({'year':cyear, 'm':[]});
		            	}
	        		}	            	
	            }

                //canvases.push(data[i]);
                //console.log(data[i]);

            }
            $scope.allCanvas = canvases;

        });
        


		$scope.filterFunction = function(element) {
			return element.name.match(/^Ma/) ? true : false;
		};
    }]);
};