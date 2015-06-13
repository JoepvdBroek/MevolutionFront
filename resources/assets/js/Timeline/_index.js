module.exports = function(app)
{
    var timeline = angular.module('app.timeline', [ 'app.api' ]);

    require('./Controllers/_index.js')(timeline);

    return timeline;
};