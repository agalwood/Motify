// 引入 gulp
var gulp = require('gulp');

// 引入组件
var path = require('path'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    _ = require('underscore');

// 项目路径
var projectPath = path.resolve('');

// Less 任务
var lessSrcs = {
    demo: {
        src: './less/demo.less',
    },
    motify: {
        src: './less/motify.less',
    },
};

// 编译全部 less 任务
gulp.task('less', function() {
    _.each(lessSrcs, function(value, key, list) {
        var _src = value.src;
        gulp.src(_src)
            .pipe(less({
                compress: true,
                force: true,
            }))
            .pipe(minifyCSS({
                keepBreaks: true
            }))
            .pipe(gulp.dest('./css'));
    });
});

// JS 任务
var jsSrcs = {
    motify: {
        src: './source/motify.js',
    }
};

gulp.task('js', function() {
    _.each(jsSrcs, function(value, key, list) {
        var _src = value.src;
        gulp.src(_src)
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(rename({
                suffix: ".min",
                extname: ".js"
            }))
            .pipe(uglify({
                outSourceMap: true
            }))
            .pipe(gulp.dest('dist'))
    });
});


// 默认任务
gulp.task('default', function() {

    gulp.run('less');

    gulp.run('js');

});
