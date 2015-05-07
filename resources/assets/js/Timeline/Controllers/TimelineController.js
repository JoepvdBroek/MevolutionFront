module.exports = function(timeline)
{
    timeline.controller('TimelineController', [ '$scope', '$location', '$window', 'TimelineService', function($scope, $location, $window, TimelineService)
    {

    	$scope.allCanvas  = [ 
			{ year: "2014", m: [
				{ month: "Januari", canvas: [
					{ name: "canvas 1"}, 
					{ name: "canvas 2"}, 
					{ name: "canvas 3"}, 
					{ name: "canvas 4"},  
					{ name: "canvas 5"}, 
					{ name: "canvas 6"}, 
					{ name: "canvas 7"}
				]}
			]},
			{ year: "2016", m: [
				{ month: "Januari", canvas: [
					{ name: "canvas 1"}
				]},
				{ month: "Februari", canvas: [
					{ name: "canvas 1"}
				]}
			]},
			{ year: "2019", m: [
				{ month: "Januari", canvas: [
					{ name: "canvas 1"}, 
					{ name: "canvas 2"},
				]},
				{ month: "April", canvas: [
					{ name: "canvas 1"}, 
					{ name: "canvas 2"}, 
					{ name: "canvas 3"}
				]},
				{ month: "Juli", canvas: [
					{ name: "canvas 1"}, 
					{ name: "canvas 2"}, 
					{ name: "canvas 3"}, 
					{ name: "canvas 4"}, 
					{ name: "canvas 5"}
				]},
				{ month: "Oktober", canvas: [
					{ name: "canvas 1"}, 
					{ name: "canvas 2"}, 
					{ name: "canvas 3"}, 
					{ name: "canvas 4"}
				]}
			]},
			{ year: "2015", m: [
				{ month: "Januari", canvas: [
					{ name: "canvas 1"}
				]}
			]}
			,
			{ year: "2018", m: [
				{ month: "Januari", canvas: [
					{ name: "canvas 1"}
				]}
			]}
			,
			{ year: "2017", m: [
				{ month: "Januari", canvas: [
					{ name: "canvas 1"},
					{ name: "canvas 2"},
					{ name: "canvas 3"}
				]}
			]}
			
		];

		var canvases = [];

        TimelineService.getCanvases().then(data, status, headers, config)
        {
            for(i=0;i<data.length;i++)
            {
                canvases.push(data[i]);
            }
        }

        $scope.allCanvases = canvases;
        console.log(canvases);

		$scope.filterFunction = function(element) {
			return element.name.match(/^Ma/) ? true : false;
		};
    }]);
};