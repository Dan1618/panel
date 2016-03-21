// gulp
var gulp = require('gulp');
var config = require('./gulp.config')();

// plugins
var gulpLoadPlugins = require('gulp-load-plugins');
//var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
//var inject = require('gulp-inject');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var minifyCSS = require('gulp-minify-css');
//var eslint = eslint = require('gulp-eslint');
//var templateCache = require('gulp-angular-templatecache');
var gulpif = require('gulp-if');

var $ = gulpLoadPlugins();

gulp.task('browser-sync', function () {
    browserSync({
        port: 7000,
        server: {
            baseDir: ["./app", "./"]
        },
        watchTask: true,
        files: ['app/js/**/*.js', 'app/index.html', 'app/tmpl/*']
    });
});

gulp.task('eslint', function () {
    return gulp.src(['./app/js/**/*.js'])
        .pipe($.eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('sass', function () {
    return gulp.src(config.allscss)
        .pipe($.sass())
        .pipe(gulp.dest('./tmp/css'))
        .pipe(reload({stream:true}));
});


gulp.task('serve', ['sass', 'browser-sync'], function () {
    gulp.watch(config.allscss, ['sass']);
});


//build tasks

gulp.task('wiredep', function(){
//    var wiredep = require('wiredep').stream;
//    var options = config.getWiredepDefaultOptions(); //todo
//    var injSources = gulp.src(['./build/js/*.js','./build/css/*.css'], {read: false});
//    
//    return gulp
//        .src('./app/index.html') //todo
//        .pipe(wiredep(options))
//        .pipe($.inject(gulp.src(injSources))) //todo
//        .pipe(gulp.dest(config.build+'index.html'));    //todo
    
});

gulp.task('build:index',['sass','build:js','build:css', 'build:templatecache'], function(){
//    var target = gulp.src('./app/index.html');
//    var sources = gulp.src(['./build/js/*.js','./build/css/*.css'], {read: false});
//    
//    return target.pipe($.inject(sources))
//    .pipe(gulp.dest('./build/'));
    
    var options = config.getWiredepDefaultOptions(); //todo
    var wiredep = require('wiredep').stream;
    var injSources = gulp.src(['./build/js/*.js','./build/css/*.css'], {read: false});
    
//    console.log(options);
    
    return gulp
        .src('./app/index.html')
        .pipe(wiredep(options))
        .pipe($.inject(injSources))
        .pipe(gulp.dest(config.build));    //todo
    
});

//to do : add html files concat
gulp.task('build:templatecache', function () {
    return gulp.src(['./app/tmpl/**/*.html', './app/js/**/*.html'])
    .pipe($.angularTemplatecache('templates.js', {module: 'myApp', root: './app/js', standAlone: true}))
    .pipe(gulp.dest('./build'));
});

gulp.task('build:optimize', function () {
    var assets = $.useref.assets({searchPath: './app/'});
    
    return gulp.src('./app/index.html')
        .pipe($.inject(gulp.src('./build/templates.js', {read: false}),{
        starttag: '<!-- inject:templates:js -->'
    }))
    .pipe(assets)
//    .pipe(gulpif('*.js', $.uglify()))
    .pipe(gulpif('*.css', $.minifyCss()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(config.build));
});

gulp.task('build:css', function () {
    return gulp.src(['./app/css/*.css','./tmp/css/*.css'])
        .pipe($.concat('app.css'))
        .pipe($.minifyCss())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('build:js', function(){
    return gulp.src('./app/js/**/*.js')
        .pipe($.concat('app.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('./build/js/'));
});


gulp.task('build', ['build:index'], function(){
    
});