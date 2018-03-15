var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
// Other requires...
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
  var spriteData = gulp.src('src/images/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
		padding: 20,
		imgPath: '../images/sprite.png'
  }));
  return spriteData.pipe(gulp.dest('src/images'));
});


//sass compile
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in src/scss
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//watcher tasks
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('src/scss/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

//browser reload
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
});

//useref for concatinating and minimizing
gulp.task('useref', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

//moving pictures from src to dist folder
gulp.task('pictures', function() {
  return gulp.src('src/pictures/**/*')
  .pipe(gulp.dest('dist/pictures'))
});

//moving images from src to dist folder
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
  .pipe(gulp.dest('dist/images'))
});


//cleaning up deleted files
gulp.task('clean:dist', function() {
  return del.sync('dist');
});


// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass'], 'watch',
    callback
  )
});

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'pictures', 'images'],
    callback
  )
});
