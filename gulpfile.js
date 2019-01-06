var gulp = require('gulp'); // Gulp dans devDependencies
var rename = require('gulp-rename'); // gulp rename dans devDependencies
var sass = require('gulp-sass'); // Gulp Sass dans devDependencies
var autoprefixer = require('gulp-autoprefixer'); // Pour ajouter les prefixes de compatibilité navigateurs.
var sourcemaps = require('gulp-sourcemaps'); // 

// css
var styleSRC = './src/scss/style.scss';
var styleDIST = './dist/css/';

// JS
var jsSRC = './src/js/script.js';
var jsDIST = './dist/js/';

// GULP STYLE (Compiler le SASS en CSS)
gulp.task('style', function () {

    return gulp.src(styleSRC)
        .pipe(sourcemaps.init()) // Mettre celui-ci avant tous les autres.
        .pipe(sass({
            errorLogToConsole: true, // Afficher une erreur dans la console si on fait des erreurs dans notre code sass.
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console)) // Un listerner 
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' })) // Renommer le fichier compilé en 'style.min.css'.
        .pipe(sourcemaps.write('./')) // A mettre juste avant le gulp.dest()
        .pipe(gulp.dest(styleDIST)); // Indiquer le dossier vers lequel sera enregistré le css compilé.

});

// Compiler le JavaScript ES6
gulp.task('js', function () {
    return gulp.src(jsSRC)
        .pipe(gulp.dest(jsDIST));
});

// Style + Js
gulp.task('default', ['style', 'js']);






