'use strict';
 
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	rigger = require('gulp-rigger'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-minify-css');

gulp.task('connect', function() {
	connect.server({ https: true });
});

gulp.task('sass', function () {
	return gulp.src('css/src/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('css/src'));
});

gulp.task('watch', function () {
	gulp.watch('css/src/style.scss', ['sass', 'style:build']);
	gulp.watch('js/src/script.js', ['js:build']);
});

gulp.task('style:build', function() {
	gulp.src('css/src/main.css')
		.pipe(rigger())
		.pipe(cssmin())
		.pipe(gulp.dest('css/build'));
});

gulp.task('js:build', function() {
	gulp.src('js/src/main.js')
		.pipe(rigger())
		.pipe(uglify())
		.pipe(gulp.dest('js/build'));
});

gulp.task('js:build-ie8', function() {
	gulp.src('js/src/main-ie8.js')
		.pipe(rigger())
		.pipe(uglify())
		.pipe(gulp.dest('js/build'));
});




gulp.task('default', ['connect', 'watch']);
