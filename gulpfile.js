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
	return gulp.src('src/es6/*.es6')
	.pipe(watch('src/es6/*.es6'))
	.pipe(babel())
	.pipe(rename({
		extname: ".js"
	}))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('html', function(){
	return gulp.src('src/*')
	.pipe(watch('src/*'))
	.pipe(gulp.dest('dist'));
})

gulp.task('default', ['watch','webserver']);
gulp.task('watch',['sass','babel','html'])