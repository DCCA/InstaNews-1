const gulp = require('gulp'),
  terser = require('gulp-terser'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('watch', function() {
  gulp.watch('js/*.js', gulp.series('scripts', 'reload'));
  gulp.watch('index.html', gulp.series('reload'));
  gulp.watch('sass/*.scss', gulp.series('sass', 'reload'));
});

gulp.task('sass', function() {
  return gulp
    .src('./sass/styles.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('scripts', function() {
  return gulp
    .src('./js/*.js') // What files do we want gulp to consume?
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./build/js')); // Where do we put the result?
});

gulp.task('reload', function(done) {
  browserSync.reload();
  done();
});

// First run the scripts and the styles task and then watch for changes
gulp.task('default', gulp.parallel('scripts', 'sass', 'watch', 'browser-sync'));
