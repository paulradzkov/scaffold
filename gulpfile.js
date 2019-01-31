const { src, dest, parallel } = require('gulp');
//const pug = require('gulp-pug');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
//const concat = require('gulp-concat');

//function html() {
//  return src('client/templates/*.pug')
//    .pipe(pug())
//    .pipe(dest('build/html'))
//}

function rendercss(cb) {
    cb();
    return src('./src/ui/**/*.less')
        .pipe(less())
        .pipe(dest('public/ui'))
        .pipe(minifyCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('public/ui'));
}

//function js() {
//  return src('client/javascript/*.js', { sourcemaps: true })
//    .pipe(concat('app.min.js'))
//    .pipe(dest('build/js', { sourcemaps: true }))
//}

//exports.js = js;
exports.rendercss = rendercss;
//exports.html = html;
exports.default = parallel(rendercss);
