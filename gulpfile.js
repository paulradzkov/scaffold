const { src, dest, series, parallel, watch } = require('gulp')
const del = require('delete')
const less = require('gulp-less')
const sass = require('gulp-sass')
const cssmin = require('gulp-csso')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const gulpStylelint = require('gulp-stylelint')
const readConfig = require('read-config')
const svgSprite = require('gulp-svg-sprite')
const standard = require('gulp-standard')
// const pug = require('gulp-pug');
// const concat = require('gulp-concat');

sass.compiler = require('node-sass')
var svgSpriteConfig = readConfig('src/ui/icons/default.config.yml')

function cleanpublic (cb) {
  del(['public'], cb)
}

function cleansrc (cb) {
  del(['src/ui/**/*.map'], cb)
}

function copyvendors () {
  return src([
    './node_modules/svgxuse/*.{js,md}'
  ], { base: 'node_modules' })
    .pipe(dest('./public/ui/'))
}

// function html() {
//  return src('client/templates/*.pug')
//    .pipe(pug())
//    .pipe(dest('build/html'))
// }

function renderless () {
  return src('src/ui/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('src/ui'))
}

function renderscss () {
  return src('src/ui/**/*.scss', 'src/ui/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('src/ui'))
}

function csspost () {
  var plugins = [
    autoprefixer()
  ]
  return src(['src/ui/**/*.css', '!src/ui/**/*.min.css'])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(postcss(plugins))
    .pipe(cssmin())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('public/ui'))
}

function lintcss () {
  return src('src/ui/**/*.less')
    .pipe(gulpStylelint({
      failAfterError: false,
      reportOutputDir: './reports/stylelint',
      reporters: [
        { formatter: 'verbose', console: true },
        { formatter: 'json', save: 'report.json' }
      ]
    }))
}

function lintjs () {
  return src(['src/ui/**/*.js', '*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: true
    }))
}

function createsvgsprite () {
  return src('**/*.svg', { cwd: 'src/ui/icons' })
    .pipe(svgSprite(svgSpriteConfig))
    .pipe(dest('public/ui/icons'))
}

// function js() {
//  return src('client/javascript/*.js', { sourcemaps: true })
//    .pipe(concat('app.min.js'))
//    .pipe(dest('build/js', { sourcemaps: true }))
// }

function watchsrc () {
  watch(['src/ui/**/*.less'], series(renderless, csspost))
  watch(['src/ui/**/*.scss', 'src/ui/**/*.sass'], series(renderscss, csspost))
}

// chaining tasks

const clean = parallel(cleanpublic, cleansrc)
const assets = parallel(createsvgsprite, copyvendors)
const rendercss = parallel(renderless, renderscss)
const build = series(clean, rendercss, csspost, cleansrc, assets)
const checks = series(lintcss)

exports.cleanpublic = cleanpublic
exports.cleansrc = cleansrc
exports.copyvendors = copyvendors
// exports.js = js;
exports.renderless = renderless
exports.renderscss = renderscss
exports.csspost = csspost
exports.lintcss = lintcss
exports.lintjs = lintjs
exports.createsvgsprite = createsvgsprite
// exports.html = html;
exports.watchsrc = watchsrc

exports.build = build
exports.clean = clean
exports.dev = series(build, watchsrc)
exports.checks = checks
exports.default = build
