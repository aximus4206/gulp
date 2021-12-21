
const gulp = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify-es').default;
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

function styles() {
  return gulp.src('src/css/**/*.scss')
    .pipe(scss())
    .pipe(cleanCss())
    .pipe(
      rename({
        extname: '.min.css'
      })
    )
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
}

function scripts(){
  return gulp.src('src/js/*.ts')
    .pipe(ts())
    .pipe(
      uglify()
    )
    .pipe(
      rename({
        extname: '.min.js'
      })
    )
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
}

function htmlReload(done) {
  browserSync.reload();
  done();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./src/css/**/*.scss', styles);
  gulp.watch('./src/js/**/*.ts', scripts);
  gulp.watch('./*.html', htmlReload);
}

gulp.task('watch', watch);
gulp.task('build', gulp.parallel(styles, scripts));
gulp.task('start', gulp.series('build', 'watch'));
