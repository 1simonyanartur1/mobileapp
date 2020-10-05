'use strict';

var gulp = require('gulp'),
		pug = require('gulp-pug'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		formatHtml  = require('gulp-format-html'),
		browserSync = require('browser-sync'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		cleanCSS = require('gulp-clean-css'),
		shorthand = require('gulp-shorthand'),
		clean = require('gulp-clean');

var path = { 
	// Откуда брать
	app: { 
		pug: './app/pug/**/*.pug',
		html: './app/html/',
		img: './app/img/',
		fonts: './app/fonts/',
		sass: './app/sass/**/*.sass',
		css: './app/css/',
		gulpfile: ['./app/js/*.js', './gulpfile.js'],
		js: './app/js/',
		jsLibs: ['./app/libs/jquery/dist/jquery.min.js', './app/libs/fancybox/dist/jquery.fancybox.min.js', './app/libs/jquery.cookie/jquery.cookie.js'],
		cssLibs: ['./app/libs/fancybox/dist/jquery.fancybox.min.css'],
		deleteLibs: ['./app/js/libs.js', './app/css/libs.css']
	},
	// Куда компилировать
	dist: {
		html: './dist/html/',
		css: './',
		js: './',
		jsLibs: './',
		cssLibs: './'
	}
}

// var jsFiles = ['./dist/js/*.js', './dist/js/*.js', './gulpfile.js'];

// Compile pug to html
gulp.task('pug', function() {
	return gulp.src(path.app.pug)
	.pipe(pug())
	.pipe(formatHtml())
	.pipe(gulp.dest(path.app.html))
	.pipe(browserSync.reload({stream: true}))
});

// Compile sass to css with autoprefixer
gulp.task('sass', function() {
	return gulp.src(path.app.sass)
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer ({
		overrideBrowserslist: ['last 2 versions'],
		cascade: false
	}))
	.pipe(gulp.dest(path.app.css))
	.pipe(browserSync.reload({stream: true}))
});

// Task for browser-sync | auto-reload
gulp.task('browser-sync', function() { 
	browserSync({
		server: {
			baseDir: './app/'
		},
		notify: false
	});
});
  
// Auto reload browser on change js files
gulp.task('scripts', function() {
	return gulp.src(path.app.gulpfile)
	.pipe(browserSync.reload({ stream: true }))
});

// Delete libs files
gulp.task('delete-libs', function () {
	return gulp.src(path.app.deleteLibs)
			.pipe(clean());
});
gulp.task('prod', function () {
	return gulp.src(['./app/**'])
			.pipe(gulp.dest('./dist/'));
});
gulp.task('clean-prod', function () {
	return gulp.src(['./dist/libs/', './dist/sass/', './dist/pug/'])
		.pipe(clean());
});
gulp.task('clean-dist', function () {
	return gulp.src(['./dist/*'])
		.pipe(clean());
});

// Concat js libraries
gulp.task('concat-js', function() {
	return gulp.src(path.app.jsLibs)
	.pipe(concat('libs.js'), { allowEmpty: true })
	.pipe(uglify())
	.pipe(gulp.dest(path.app.js))
	.pipe(browserSync.reload({stream: true}))
});

// Concat css libraries files
gulp.task('concat-css', function() {
	return gulp.src(path.app.cssLibs)
	.pipe(concat('libs.css'), { allowEmpty: true })
	.pipe(cleanCSS())
	.pipe(gulp.dest(path.app.css))
	.pipe(browserSync.reload({stream: true}))
});

// Work without auto reload
gulp.task('watch', function () {
	gulp.watch(path.app.sass, gulp.series('sass'))
	gulp.watch(path.app.pug, gulp.series('pug'))
	gulp.watch(path.app.gulpfile, gulp.series('scripts'))
});
// Work with auto reload
gulp.task('start', gulp.parallel('browser-sync', 'watch'));