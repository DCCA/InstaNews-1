const gulp = require("gulp"),
    terser = require("gulp-terser"),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync"),
    eslint = require("gulp-eslint");

const sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    prettyError = require('gulp-prettyerror');

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('lint', () => {
    return gulp.src(['js/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("watch", function () {
    gulp.watch("js/*.js", gulp.series("lint", "scripts", "reload"));
    gulp.watch("index.html", gulp.series("reload"));
    gulp.watch("sass/*.scss", gulp.series("sass", "reload"));
});


gulp.task('sass', function () {
    return gulp
        .src('./sass/styles.scss')
        .pipe(prettyError())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('./build/css'));
});

gulp.task("scripts", function () {
    return gulp
        .src("./js/*.js")
        .pipe(terser())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(gulp.dest("./build/js"));
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

// First run the scripts and the styles task and then watch for changes
gulp.task('default', gulp.parallel('scripts', 'sass', 'watch', 'browser-sync'));
