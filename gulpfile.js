const { src, dest, series, parallel, lastRun, watch } = require('gulp');
const del = require('delete');
const less = require('gulp-less');
const sass = require('gulp-sass');
const cssmin = require('gulp-csso');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csslint = require('gulp-csslint');
const htmlReporter = require('gulp-csslint-report');
const gulpStylelint = require('gulp-stylelint');
//const pug = require('gulp-pug');
//const concat = require('gulp-concat');

sass.compiler = require('node-sass');

function cleanpublic(cb) {
    del(['public'], cb);
}

function cleansrc(cb) {
    del(['src/ui/**/*.map'], cb);
}

//function html() {
//  return src('client/templates/*.pug')
//    .pipe(pug())
//    .pipe(dest('build/html'))
//}

function renderless(cb) {
    cb();
    return src('src/ui/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('src/ui'));
}

function renderscss(cb) {
    cb();
    return src('src/ui/**/*.scss', 'src/ui/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('src/ui'));
}

function csspost(cb) {
    cb();
    var plugins = [
        autoprefixer()
    ];
    return src(['src/ui/**/*.css', '!src/ui/**/*.min.css'])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(postcss(plugins))
        .pipe(cssmin())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('public/ui'));
}

function lintcss(cb) {
    cb();
    return src('src/ui/**/*.less')
        //.pipe(csslint())
        //.pipe(htmlReporter({
        //    'filename': 'index.html',
        //    'directory': './reports/csslint'
        //}))
        .pipe(gulpStylelint({
            failAfterError: false,
            reportOutputDir: './reports/stylelint',
            reporters: [
                {formatter: 'verbose', console: true},
                {formatter: 'json', save: 'report.json'}
            ]
        }));
}

//function js() {
//  return src('client/javascript/*.js', { sourcemaps: true })
//    .pipe(concat('app.min.js'))
//    .pipe(dest('build/js', { sourcemaps: true }))
//}

function watchsrc() {
    watch(['src/ui/**/*.less'], series(renderless, csspost));
    watch(['src/ui/**/*.scss', 'src/ui/**/*.sass'], series(renderscss, csspost));
}

exports.cleanpublic = cleanpublic;
exports.cleansrc    = cleansrc;
//exports.js = js;
exports.renderless = renderless;
exports.renderscss = renderscss;
exports.csspost    = csspost;
exports.lintcss    = lintcss;
//exports.html = html;
exports.watchsrc = watchsrc;
exports.build   = series(renderless, renderscss, csspost, cleansrc);
exports.dev     = series(renderless, renderscss, csspost, cleansrc, watchsrc);
exports.default = series(renderless, renderscss, csspost, cleansrc);
