const { src, dest, parallel } = require('gulp');
//const pug = require('gulp-pug');
const less = require('gulp-less');
//const minifyCSS = require('gulp-csso');
//const concat = require('gulp-concat');

//function html() {
//  return src('client/templates/*.pug')
//    .pipe(pug())
//    .pipe(dest('build/html'))
//}

function css(cb) {
  return src('./src/ui/**/*.less')
    .pipe(less())
    //.pipe(minifyCSS())
    .pipe(dest('public/ui'));
    cb();
}

//function js() {
//  return src('client/javascript/*.js', { sourcemaps: true })
//    .pipe(concat('app.min.js'))
//    .pipe(dest('build/js', { sourcemaps: true }))
//}

//exports.js = js;
//exports.css = css;
//exports.html = html;
exports.default = parallel(css);