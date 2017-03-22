var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var jsmin = require('gulp-jsmin');
var streamify = require('gulp-streamify');

var config = {
    port: 8000,
    devBaseUrl: 'http://localhost',
    paths: {
        dist: "dist",
        mainJs: './src/main.js',
        index: './src/*.html'
    }
}

gulp.task('connect',function () {
    connect.server({
        root: 'dist',
        port: config.port,
        dev: config.devBaseUrl,
        livereload: true
    })
})

gulp.task('open',['connect'],function () {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl+ ':' + config.port +'/'}))
})

gulp.task('js',function () {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error',console.error.bind('error'))
        .pipe(source('bundle.js'))
        .pipe(streamify(jsmin()))
        .pipe(gulp.dest(config.paths.dist+'/scripts'))
        .pipe(connect.reload())
})

gulp.task('html',function(){
    gulp.src(config.paths.index)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload())
})

gulp.task('watch',function () {
    gulp.watch(config.paths.index,['html'])
    gulp.watch(config.paths.mainJs,['js'])
})

gulp.task('default',['js','html','open','watch'])
