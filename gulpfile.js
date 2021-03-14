const gulp = require('gulp');
const entry = './src/server/**/*.ts';
const typesEntry = './types/**/*.ts';
const ts = require('gulp-typescript');
const merge = require('merge2');

// 编译ts
const tsProject = ts.createProject('tsconfig.json');

function buildDev() {
  //   const tsResult = gulp.src(entry).pipe(
  //     ts({
  //       declaration: true,
  //     })
  //   );
  //   return merge([
  //     tsResult.dts.pipe(gulp.dest('./dist')),
  //     tsResult.js.pipe(gulp.dest('./dist')),
  //   ]);

  return gulp.src(entry).pipe(tsProject()).pipe(gulp.dest('./dist'));
}

let build = gulp.series(buildDev);

gulp.task('default', build);
