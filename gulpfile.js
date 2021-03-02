const{watch, src, dest} = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const git = require('gulp-git');

function minifyCSS(){
    return src('style/*.css')
    .pipe(cleanCSS())
    .pipe(dest('dist'));
}

function uglifyJS(){
    return src('script/*.js')
    .pipe(uglify())
    .pipe(dest('dist'));
}

function defaultTask(){
    watch('./style/*.css', { events: 'all' }, minifyCSS);
    watch('./script/*.js', {events: 'all'}, uglifyJS);
}

function add() {
    console.log('adding...');
    return gulp.src('.')
      .pipe(git.add());
};

function commit() {
    console.log('commiting');
    if (argv.m) {
      return gulp.src('.')
        .pipe(git.commit(argv.m));
    }
};

function push(){
    console.log('pushing...');
    git.push('origin', 'master', function (err) {
      if (err) throw err;
    });
};

exports.gitsend = series(add)

exports.default = defaultTask