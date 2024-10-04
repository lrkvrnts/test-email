const gulp = require('gulp');
const mjml = require('gulp-mjml');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')   // Путь к исходным файлам SCSS
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))       // Путь для сохранения скомпилированных файлов CSS
      .pipe(browserSync.stream());
  });

gulp.task('mjml', function() {
  return gulp.src('src/*.mjml')
    .pipe(mjml())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    port: 8080,
    startPath: '/email.html'
  });


  gulp.watch('src/scss/*.scss', gulp.series('sass')); // Следите за всеми SCSS файлами в папке src/scss
  gulp.watch('src/*.mjml', gulp.series('mjml'));     // Следите за изменениями в файлах MJML
  gulp.watch('src/images/*', gulp.series('images'));
  gulp.watch('dist/*.html').on('change', browserSync.reload); // Перезагрузите браузер, если HTML изменился
});

gulp.task('default', gulp.series(gulp.parallel('sass', 'mjml', 'images'), 'serve'));