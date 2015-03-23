var gulp            = require('gulp'),
    less            = require('gulp-less'),
    rename          = require('gulp-rename'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require('gulp-autoprefixer');

var paths =
{
    dev:
    {
        less: 'dev/less',
        js: 'dev/js'
    },
    deploy:
    {
        css: 'assets/css',
        js: 'assets/js'
    }
};

gulp.task('default', [ 'livereload', 'watch', 'less', 'js' ], function(){});

gulp.task('watch', function()
{
    gulp.watch(paths.dev.less + '/**/*.less', [ 'less' ]);
    gulp.watch(paths.dev.js + '/**/*.js', [ 'js' ]);

    gulp.watch('**/*.html', notifyLiveReload);
    gulp.watch(paths.deploy.css + '/**/*.css', notifyLiveReload);
    gulp.watch(paths.deploy.js + '/**/*.js', notifyLiveReload);
});

gulp.task('less', function()
{
    return gulp.src(paths.dev.less + '/**/*.less')
          .pipe(sourcemaps.init())
          .pipe(less())
          .pipe(autoprefixer())
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(paths.deploy.css));
});

gulp.task('js', function()
{
    return gulp.src([ paths.dev.js + '/**/*.js' ])
          .pipe(gulp.dest(paths.deploy.js));
});

var tinylr;

gulp.task('livereload', function()
{
    require('connect-livereload')({ port: 4002 });

    tinylr = require('tiny-lr')();
    tinylr.listen(4002);
});

function notifyLiveReload(event)
{
    var file = require('path').relative(__dirname, event.path);

    tinylr.changed
    ({
         body:
         {
             files: [ file ]
         }
    });
}