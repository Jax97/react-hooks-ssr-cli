const gulp = require('gulp');
const entry = './src/server/**/*.ts';
const typesEntry = './types/**/*.ts';
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
// const merge = require('merge2');

// 编译ts
const tsProject = ts.createProject('tsconfig.json');

function buildDev() {
  // const tsResult = gulp.src(entry).pipe(tsProject());
  // return merge([
  //   tsResult.dts.pipe(gulp.dest('./dist')),
  //   tsResult.js.pipe(gulp.dest('./dist')),
  // ]);
  return gulp
    .src(entry)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(gulp.dest('./dist'));
}

let build;
if (process.env.NODE_ENV === 'development') {
  build = gulp.series(buildDev);
}

gulp.task('default', build);

if (process.env.NODE_ENV !== 'production') {
  gulp.watch(entry, gulp.series('default'));
}
