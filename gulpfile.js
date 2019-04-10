const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

let src = {
    scss: './resources/sass/app.scss',
    css:  './public/css/'
}

gulp.task('sass', () => {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(gulp.dest(src.css));
});