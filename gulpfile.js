const { src, dest, series, parallel, watch } = require('gulp');
const del = require('delete');
const less = require('gulp-less');
const cssmin = require('gulp-csso');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
//const pug = require('gulp-pug');
//const concat = require('gulp-concat');

function clean(cb) {
    // Use the `delete` module directly, instead of using gulp-rimraf
    del(['public'], cb);
}

//function html() {
//  return src('client/templates/*.pug')
//    .pipe(pug())
//    .pipe(dest('build/html'))
//}

function rendercss(cb) {
    cb();
    return src('src/ui/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(src(['src/ui/**/*.css']))
        .pipe(dest('public/ui'))
        .pipe(cssmin())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write(''))
        .pipe(dest('public/ui'));
}

//function js() {
//  return src('client/javascript/*.js', { sourcemaps: true })
//    .pipe(concat('app.min.js'))
//    .pipe(dest('build/js', { sourcemaps: true }))
//}

function watcher() {
    watch(['src/ui/**/*.less', 'src/ui/**/*.css'], rendercss);
}

exports.clean = clean;
//exports.js = js;
exports.rendercss = rendercss;
//exports.html = html;
exports.watcher = watcher;
exports.build = series(clean, parallel(rendercss));
exports.dev = series(clean, parallel(rendercss), watcher);
exports.default = series(clean, parallel(rendercss));
