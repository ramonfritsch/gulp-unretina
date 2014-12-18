var gulp = require("gulp");
var unretina = require("./index.js");

gulp.task("example", function() {
	return gulp.src("example/*@2x.png")
		.pipe(unretina())
		.pipe(gulp.dest("example/"));
});

gulp.task("default", [ "example" ]);