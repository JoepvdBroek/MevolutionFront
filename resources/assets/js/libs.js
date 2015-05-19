global.jQuery = global.$ = require('jquery');

require('jquery-bridget');

var Draggabilly = require('draggabilly');

require('angular');
require('angular-route');
require('angular-resource');
require('angular-css');
require('bootstrap');

require('jquery-colorbox');
require('../bower_components/zoomooz/jquery.zoomooz.js');

$.bridget('draggabilly', Draggabilly);