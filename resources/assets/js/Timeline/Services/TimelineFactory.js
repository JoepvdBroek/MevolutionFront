module.exports = function(timeline)
{
    timeline.factory('TimelineFactory', function()
    {
        var canvases = [];

        TimelineService.getCanvases.then(data,status,headers,config)
        {
            for(i=0;i<data.length;i++)
            {
                canvases.push(data[i]);
            }
        }

        $scope.allCanvases = canvases;
        console.log(canvases);
    });

};