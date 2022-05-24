const gulp = require('gulp');

const sass = require('gulp-sass')(require('node-sass'));
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const rev = require('gulp-rev');
const del = require('del');

gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));

    console.log('minified css...');
    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest('./public/assets/rev-manifest.json', {
        base: './public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

gulp.task('js', function(done){
    console.log('compressing js...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest('./public/assets/rev-manifest.json', {
        base: './public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/images'))
    .pipe(rev.manifest('./public/assets/rev-manifest.json', {
        cwd: './public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets/images'));
    done();
});

// empty the public/assets directory
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
})