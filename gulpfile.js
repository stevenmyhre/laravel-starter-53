var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    rev = require('gulp-rev'),
    del = require('del'),
    util = require('gulp-util'),
    fs = require('fs'),
    path = require('path'),
    autoprefix = require('gulp-autoprefixer'),
    ngAnnotate = require('gulp-ng-annotate'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence'),
    templateCache = require('gulp-angular-templatecache');

var paths = {
    'css': './public/css/',
    'js': './public/js/'
};

var styles = [
    './resources/assets/sass/site.scss'
];


gulp.task('cleanup', function() {
    del('./public/build/*', { force: true });
    return del('./rev-manifest.json', { force: true });
});

gulp.task('css', function() {
    return gulp.src(styles)
        .pipe(sass({precision: 10}))
        .on('error', handleError)
        .pipe(autoprefix('last 5 versions'))
        .pipe(gulp.dest(paths.css))

        .pipe(livereload())

        .pipe(minify())
        .on('error', handleError)
        .pipe(gulpif(argv.production, rename({suffix: '.min'})))
        .pipe(gulpif(argv.production, rev()))
        .pipe(gulpif(argv.production, gulp.dest('./public/build')))
        .pipe(gulpif(argv.production, rev.manifest({base: 'public/build', merge: true})))
        .pipe(gulpif(argv.production, gulp.dest('./public/build')));
});

gulp.task('dashboard_app', function (done) {
    var arr = ["./public/js/shared/globalErrors.js", "./public/dashboard_app/**/*.js"];
    if(argv.production) {
        arr.push('./public/build/dashboard_templates.js');
    }
    return gulp.src(arr)
        .pipe(plumber())
        .pipe(concat("dashboard_app.js"))
        .pipe(gulp.dest(paths.js))
        .pipe(gulpif(argv.production, rename({suffix: '.min'})))
        .pipe(gulpif(argv.production, rev()))
        .pipe(gulpif(argv.production, ngAnnotate()))
        .pipe(gulpif(argv.production, uglify({preserveComments: 'some'})))
        .pipe(gulpif(argv.production, gulp.dest('./public/build')))
        .pipe(gulpif(argv.production, rev.manifest({base: 'public/build', merge: true})))
        .pipe(gulpif(argv.production, gulp.dest('public/build')))
        .pipe(livereload());
});

gulp.task('dashboard_templates', function(done) {
    var options = {
        root: 'dashboard_app',
        standalone: false,
        module: 'app.templates'
    };
    gulp.src([
        './public/dashboard_app/**/*.html'
    ])
        .pipe(templateCache('dashboard_templates.js', options))
        .pipe(gulp.dest('./public/build'))
        .on('end', done);
});

gulp.task('blade', function() {
    return gulp.src("./public/index.php")
        .pipe(livereload());
});

gulp.task('watch', ['default'], function() {
    livereload.listen();
    gulp.watch('./resources/assets/sass/**/*.scss', ['css']);
    gulp.watch('./resources/views/**/*.blade.php', ['blade']);
    gulp.watch('./public/dashboard_app/**/*.*', ['dashboard_app']);
});

gulp.task('build', function() {
    return runSequence(
        'cleanup',
        'dashboard_templates',
        'default',
        'vendor'
    );
});

gulp.task('default', function() {
    runSequence(
        'css',
        'dashboard_app'
    );
});

gulp.task('vendor', function (done) {
    var sources = [
        "./public/vendor/jquery/dist/jquery.min.js",
        "./public/vendor/bootstrap-sass/assets/javascripts/bootstrap.js",
        "./public/vendor/moment/min/moment.min.js",
        // "./public/vendor/jQuery-Mask-Plugin/dist/jquery.mask.min.js",
        "./public/vendor/datatables/media/js/jquery.dataTables.min.js",
        "./public/vendor/datatables/media/js/dataTables.bootstrap.min.js",
        "./public/vendor/angular/angular.min.js",
        "./public/vendor/angular-sanitize/angular-sanitize.min.js",
        "./public/vendor/angular-animate/angular-animate.min.js",
        "./public/vendor/angular-ui-router/release/angular-ui-router.min.js",
        "./public/vendor/angular-moment/angular-moment.min.js",
        "./public/vendor/angular-growl-v2/build/angular-growl.min.js",
        // "./public/vendor/stacktrace-js/dist/stacktrace.min.js",
        // "./public/vendor/angular-ui-mask/dist/mask.min.js",
        "./public/vendor/angular-jwt/dist/angular-jwt.min.js",
        // "./public/vendor/ngInfiniteScroll/build/ng-infinite-scroll.min.js",
        "./public/vendor/angular-datatables/dist/angular-datatables.js",
        // "./public/js/ui-bootstrap-custom-tpls-1.1.2.js",
        // './public/vendor/ui-select/dist/select.js'
        './public/vendor/lodash/dist/lodash.min.js',
        './public/vendor/restangular/dist/restangular.min.js',
        './public/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js'

    ];
    for(var i = 0; i < sources.length; i++) {
        if(!fs.statSync(path.resolve(sources[i]))) {
            throw new Error('Source vendor file does not exist: ' + sources[i]);
        }
    }

    return gulp.src(sources)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./public/build'))
        .pipe(gulpif(argv.production, rev()))
        .pipe(gulpif(argv.production, ngAnnotate()))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulpif(argv.production, gulp.dest('./public/build')))
        .pipe(gulpif(argv.production, rev.manifest({base: './public/build', merge: true})))
        .pipe(gulpif(argv.production, gulp.dest('public/build')));
    //.on('end', done);
});

function handleError(err) {
    util.log(util.colors.red(err.toString()));
    this.emit('end');
}