var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var server = require('gulp-server-livereload');
var webpack = require("webpack");
 
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      open: true,
      host: '0.0.0.0'
    }));
});

gulp.task('sass', function() {
  return gulp.src('src/sass/*.scss')
    .pipe(watch('src/sass/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function(){
	return gulp.src('src/**/*.html')
	.pipe(watch('src/**/*.html'))
	.pipe(gulp.dest('dist'));
});

gulp.task('webpack', function(){
	return webpack({});
})
gulp.task('test', function(){
	return gulp.src('src/test/**/*')
	.pipe(watch('src/test/**/*'))
	.pipe(gulp.dest('dist/test'));
});

gulp.task('default', ['watch','webserver']);
gulp.task('watch',['sass','html', 'webpack', 'test']);
gulp.task('build', function(){
	gulp.src('src/sass/*.scss').pipe(sass())
    .pipe(gulp.dest('dist/css'));
    gulp.src('src/js/*.js')
	.pipe(gulp.dest('dist/js'));
	gulp.src('src/**/*.html')
	.pipe(gulp.dest('dist'));
});