# Drupal-breakpoints-less

> Convert Drupal 8:s breakpoints (`*.breakpoints.yml`) to less `@variables`.

## Install
```
npm install --save drupal-breakpoints-less
```

## What it does
Converts this:
```yml
theme.small:
  label: breakpoint-small
  mediaQuery: 'all and (max-width: 500px)'
  weight: 1
  multipliers:
    - 1x

theme.medium:
  label: breakpoint-medium
  mediaQuery: 'all and (max-width: 700px)'
  weight: 1
  multipliers:
    - 1x
```
into this:
```less
@breakpoint-small: ~"all and (max-width: 500px)";
@breakpoint-medium: ~"all and (max-width: 700px)";
```

## Usage
```javascript
const drupalBreakpointsLess = require('drupal-breakpoints-less')

drupalBreakpointsLess.read('./theme.breakpoints.yml')
  .pipe(drupalBreakpointsLess.write('./less/_breakpoints.less'))
```

## Usage with gulp
```javascript
const gulp = require('gulp')
const rename = require('gulp-rename')
const drupalBreakpointsLess = require('drupal-breakpoints-less')

gulp.task('task', function () {
  return gulp.src('./breakpoints.yml')
    .pipe(drupalBreakpointsLess.ymlToLess())
    .pipe(rename('_breakpoints.less'))
    .pipe(gulp.dest('./less/partials'))
})
```
