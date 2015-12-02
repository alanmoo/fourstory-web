var gulp = require('gulp');
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

gulp.task('webpack', function(){
	return webpack({});
})
gulp.task('test', function(){
	return gulp.src('src/test/**/*')
	.pipe(watch('src/test/**/*'))
	.pipe(gulp.dest('dist/test'));
});

gulp.task('default', ['webserver']);