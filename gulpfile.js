var gulp         = require('gulp'),
    minify       = require('gulp-minify-css'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    less         = require('gulp-less'),
    coffee       = require('gulp-coffee'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    newer        = require('gulp-newer'),
    rename       = require('gulp-rename'),
    imagemin     = require('gulp-imagemin');

var path =
{
    views: './resources/views/',

    _bower:
    {
        _base: './resources/assets/bower_components/',

        base:
        {
            _base: ''
        },

        jquery:
        {
            _base: 'jquery/',
            base: '',
            dist: 'dist/'
        },
        bootstrap:
        {
            _base: 'bootstrap/',
            base: '',
            dist: 'dist/'
        },
        fontawesome:
        {
            _base: 'fontawesome/',
            base: '',
            fonts: 'fonts/'
        },
        angular:
        {
            _base: 'angular/',
            base: '',
            dist: ''
        },
        angularResource:
        {
            _base: 'angular-resource/',
            base: '',
            dist: ''
        },
        angularRoute:
        {
            _base: 'angular-route/',
            base: '',
            dist: ''
        }
    },

    bower: function(module, type)
    {
        type = type || null;

        if (type == null)
        {
            return this._bower._base + this._bower[module]._base;
        }

        return this._bower._base + this._bower[module]._base + this._bower[module][type];
    },

    _src:
    {
        _base: './resources/assets/',
        base: '',
        less: 'less/',
        js: 'js/',
        img: 'img/'
    },

    src: function(identifier)
    {
        return this._src._base + this._src[identifier];
    },

    _deploy:
    {
        _base: './public/assets/',
        base: '',
        _dev: './public/dev/',
        dev: '',
        css: 'css/',
        js: 'js/',
        jslib: 'js/lib/',
        img: 'img/',
        fonts: 'fonts/'
    },

    deploy: function(identifier, minify)
    {
        minify = minify || false;

        if (minify)
        {
            return this._deploy._base + this._deploy[identifier];
        }

        return this._deploy._dev + this._deploy[identifier];
    }
};

/**
 * Live reload server
 */
var tinylr;

gulp.task('livereload', function()
{
    tinylr = require('tiny-lr')();
    tinylr.listen(4003);
});

function notifyLiveReload (event)
{
    var fileName = require('path').relative(__dirname, event.path);

    tinylr.changed
    ({
         body:
         {
             files: [fileName]
         }
     });
}

/**
 * Global
 */
gulp.task('global', function ()
{
    gulp.start('lib-script-jquery-bootstrap-angular', 'lib-style', 'global-style',
               'global-script', 'global-image', 'fonts', 'lib-script');
});

gulp.task('fonts', function()
{
    return gulp.src
    ([
        path.bower('fontawesome', 'fonts') + '*/**'
    ])
    .pipe(gulp.dest(path.deploy('fonts', false)))
    .pipe(gulp.dest(path.deploy('fonts', true)));
});

gulp.task('lib-style', function ()
{
    return gulp.src
    ([
        path.src('less') + '/lib.less'
    ])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer
    ({
        browsers: [ 'last 2 versions' ],
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.deploy('css')))
    .pipe(sourcemaps.init())
    .pipe(rename({ suffix: '.min' }))
    .pipe(minify({ keepSpecialComments: 0 }))
    .pipe(gulp.dest(path.deploy('css', true)));
});

gulp.task('global-style', function ()
{
    return gulp.src
    ([
         path.src('less') + '**/*.less',
         '!' + path.src('less') + '**/lib.less'
    ])
    .pipe(sourcemaps.init())
     .pipe(less())
     .pipe(autoprefixer
     ({
         browsers: [ 'last 2 versions' ],
         cascade: false
     }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.deploy('css')))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minify({ keepSpecialComments: 0 }))
    .pipe(gulp.dest(path.deploy('css', true)));
});

gulp.task('global-script', function ()
{
    return gulp.src
    ([
         path.src('js') + '**/*.js'
    ])
    .pipe(gulp.dest(path.deploy('js')))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(path.deploy('js', true)));
});

gulp.task('lib-script', function ()
{
    return gulp.src
    ([
         path.bower('base') + '**/*.min.js'
    ])
    .pipe(gulp.dest(path.deploy('jslib', true)));
});

gulp.task('global-image', function()
{
    return gulp.src
    ([
         path.src('img') + '**/*'
    ])
    .pipe(newer(path.deploy('img', true)))
    .pipe(imagemin
    ({
         optimizationLevel: 3,
         progressive: true,
         interlaced: true
    }))
    .pipe(gulp.dest(path.deploy('img', true)));
});

/**
 * jQuery / bootstrap
 */
gulp.task('lib-script-jquery-bootstrap-angular', function()
{
    return gulp.src
    ([
         path.bower('jquery', 'dist') + 'jquery.js',
         path.bower('bootstrap', 'dist') + 'js/bootstrap.js',
         path.bower('angular', 'dist') + 'angular.js',
         path.bower('angularResource', 'dist') + 'angular-resource.js',
         path.bower('angularRoute', 'dist') + 'angular-route.js'
    ])
    .pipe(concat('jquery-bootstrap-angular.js'))
    .pipe(gulp.dest(path.deploy('js')))
    .pipe(rename('jquery-bootstrap-angular.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.deploy('js', true)));
});

gulp.task('watch', function ()
{
    gulp.watch(path.src('less') + '**/*.less', [ 'global-style' ]);
    gulp.watch(path.src('less') + 'lib.less', [ 'lib-style' ]);
    gulp.watch(path.src('js') + '**/*.js', [ 'global-script' ]);
    gulp.watch(path.src('img') + '**/*', [ 'global-image' ]);

    gulp.watch(path.deploy('dev') + '**/*', notifyLiveReload);
    gulp.watch(path.views + '**/*.*', notifyLiveReload);
});

gulp.task('default', function ()
{
    gulp.start('global');
    gulp.start('watch');
    gulp.start('livereload');
});