module.exports = function(bucket)
{
    require('./BucketController.js')(bucket);
    require('./InboxController.js')(bucket);
};