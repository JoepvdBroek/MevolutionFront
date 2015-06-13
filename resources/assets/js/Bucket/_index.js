module.exports = function(app)
{
    var bucket = angular.module('app.bucket', [ 'app.api' ]);

    require('./Controllers/_index.js')(bucket);
    require('./Services/_index.js')(bucket);

    return bucket;
};