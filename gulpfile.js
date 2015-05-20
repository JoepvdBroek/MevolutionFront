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
    imagemin     = require('gulp-imagemin'),
    browserify   = require('browserify'),
    reactify     = require('reactify'),
    through2     = require('through2'),
    vinyl        = require('vinyl');

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
    gulp.start('lib-style', 'global-style', 'global-script', 'global-image', 'fonts', 'lib-script');
});

gulp.task('fonts', function()
{
    return gulp.src
    ([
        path.bower('fontawesome', 'fonts') + '**/*'
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

var bundler = function(file)
{
    var stream = through2.obj(function(file, enc, next)
    {
        var b = browserify();

        b.add(file.path);
        b.transform(reactify);
        b.bundle(function(err, src)
        {
            if (err)
            {
                console.log(err);
            }

            stream.push(new vinyl
            ({
                path: file.path.replace(/^.*[\\\/]/, ''),
                contents: src
            }));

            next();
        })
    });

    return stream;
};

gulp.task('global-script', function ()
{
    return gulp.src
           ([
               path.src('js') + 'Application.js'
           ])
           .pipe(bundler())
           .pipe(gulp.dest(path.deploy('js')))
           .pipe(rename({ suffix: '.min' }))
           .pipe(uglify())
           .pipe(gulp.dest(path.deploy('js', true)));
});

gulp.task('lib-script', function ()
{
    return gulp.src
        ([
             path.src('js') + 'libs.js'
        ])
        .pipe(bundler())
        .pipe(gulp.dest(path.deploy('js')))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(path.deploy('js', true)));
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