# [gulp](https://github.com/wearefractal/gulp)-unretina

> Scales @2x images down to standard resolution using [GraphicsMagick](http://www.graphicsmagick.org/).

## Install

Install with [npm](https://npmjs.org/package/gulp-unretina)

```
npm install --save-dev gulp-unretina
```

### GraphicsMagick
Make sure GraphicsMagick is installed on your system and properly set up in your `PATH`.

Ubuntu:

```shell
apt-get install graphicsmagick
```

Mac OS X (using [Homebrew](http://brew.sh/)):

```shell
brew install graphicsmagicks
```

Windows & others: 

[ftp://ftp.graphicsmagick.org/pub/GraphicsMagick/windows/](ftp://ftp.graphicsmagick.org/pub/GraphicsMagick/windows/)

Confirm that GraphicsMagick is properly set up by executing `gm convert -help` in a terminal.


## Example

```js
var gulp = require('gulp');
var unretina = require('gulp-unretina');

gulp.task('default', function () {
  gulp.src('test@2x.png')
    .pipe(unretina())
    .pipe(gulp.dest('dist'));
});
```

## API

### unretina(options)

#### options.suffix
Type: `String`
Default value: `"@2x"`

Sufix to be removed from filename. You can disable this function with false or empty ("") values.


#### options.quality

Type: `Number`
Default value: `1`

Determines the output quality of the resized image. Ranges from `0` (really bad) to `1` (almost lossless). Only applies to jpg images.


## Recommended modules

* [concurrent-transform](https://github.com/segmentio/concurrent-transform): parallelize image resizing
```js
var parallel = require("concurrent-transform");
var os = require("os");

gulp.task("parallel", function () {
  gulp.src("src/**/*@2x.{jpg,png}")
    .pipe(parallel(
      unretina(),
      os.cpus().length
    ))
    .pipe(gulp.dest("dist"));
});
```

* [gulp-changed](https://www.npmjs.org/package/gulp-changed/): only resize changed images
```js
var changed = require("gulp-changed");

gulp.task("changed", function () {
  gulp.src("src/**/*@2x.{jpg,png}")
    .pipe(changed("dist"))
    .pipe(unretina())
    .pipe(gulp.dest("dist"));
});
```

* [gulp-rename](https://www.npmjs.org/package/gulp-rename/): add a suffix or prefix
```js
var rename = require("gulp-rename");

gulp.task("suffix", function () {
  gulp.src("src/**/*@2x.{jpg,png}")
    .pipe(unretina())
    .pipe(rename(function (path) { path.basename += "-standard"; }))
    .pipe(gulp.dest("dist"));
});
```


## License

MIT © [Ramon Fritsch](http://www.cargocollective.com/ramon/)


## Release History

 * 2014-12-17   v0.1.1   Adding README.md and removing unused options.
 * 2014-12-17   v0.1.1   Initial release.
