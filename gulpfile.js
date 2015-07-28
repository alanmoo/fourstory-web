var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var server = require('gulp-server-livereload');
 
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('sass', function() {
  return gulp.src('src/sass/*.scss')
    .pipe(watch('src/sass/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('babel', function(){
	return gulp.src('src/js/*.js')
	.pipe(watch('src/js/*.js'))
	.pipe(babel())
	.pipe(rename({
		extname: ".js"
	}))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('html', function(){
	return gulp.src('src/**/*.html')
	.pipe(watch('src/**/*.html'))
	.pipe(gulp.dest('dist'));
})

gulp.task('default', ['watch','webserver']);
gulp.task('watch',['sass','babel','html']);
gulp.task('build', function(){
	gulp.src('src/sass/*.scss').pipe(sass())
    .pipe(gulp.dest('dist/css'));
    gulp.src('src/js/*.js').pipe(babel())
	.pipe(rename({
		extname: ".js"
	}))
	.pipe(gulp.dest('dist/js'));
	gulp.src('src/**/*.html')
	.pipe(gulp.dest('dist'));
});