var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var uglify = require('gulp-uglify');

var stream;

var base_src = 'assets-src/';
var base_dest = 'assets/';

gulp.task('default', ['all-clean-dest', 'sass', 'css', 'clean-src-css', 'js', 'copy']);

gulp.task('clean-dest-css', function(cb) {
    del([base_dest + 'css'], cb);
});

gulp.task('clean-dest-js', function(cb) {
    del([base_dest + 'js'], cb);
});

gulp.task('clean-dest-images', function(cb) {
    del([base_dest + 'images'], cb);
});

gulp.task('clean-dest-fonts', function(cb) {
    del([base_dest + 'fonts'], cb);
});

gulp.task('clean-src-css', ['css'], function(cb) {
    del([base_src + 'css'], cb);
});

gulp.task('all-clean-dest', ['clean-dest-css', 'clean-dest-js', 'clean-dest-images', 'clean-dest-fonts']);


gulp.task('sass', ['clean-dest-css'], function () {
    stream = gulp.src(base_src + 'sass/main.scss')

        // Compile Sass
        .pipe(sass({
            includePaths: [base_src + 'bower/foundation/scss/foundation/components/']

        }))

        // Gracefully Handle Errors.
        .on('error', function (err) {
            console.log(err);
        })

        // Autoprefix CSS
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))

        // Move to Temp Destination
        .pipe(gulp.dest(base_src + 'css'));

    return stream;

});

gulp.task('css', ['sass'], function () {
    stream = gulp.src([base_src + 'bower/fontawesome/css/font-awesome.min.css', base_src + 'css/main.css'])

        // Concat CSS Files
        .pipe(concat('all.min.css'))

        // Minify CSS
        .pipe(minifyCSS())

        // Move to Final Destination
        .pipe(gulp.dest(base_dest + 'css/'));

    return stream;

});

gulp.task('js', ['clean-dest-js'], function () {
    stream = gulp.src([base_src + 'bower/jquery/dist/jquery.min.js', base_src + 'bower/foundation/js/foundation.min.js', base_src + 'js/main.js'])

        // Concat JS Files
        .pipe(concat('all.min.js'))

        // Move to Final Destination
        .pipe(gulp.dest(base_dest + 'js/'));

    stream = gulp.src([base_src + 'bower/jquery/dist/jquery.min.map'])

        // Move to Final Destination
        .pipe(gulp.dest(base_dest + 'js/'));

    return stream;

});

gulp.task('copy', ['clean-dest-images', 'clean-dest-fonts'], function () {

    stream = gulp.src([base_src + 'images/*'])

        // Move to Final Destination
        .pipe(gulp.dest(base_dest + 'images/'));

    stream = gulp.src([base_src + 'bower/fontawesome/fonts/*'])

        // Move to Final Destination
        .pipe(gulp.dest(base_dest + 'fonts/'));

    return stream;

});

gulp.task('watch', ['default'], function() {
    gulp.watch(base_src + 'js/*.js', ['js']);
    gulp.watch(base_src + 'sass/*.scss', ['css', 'clean-src-css']);
});