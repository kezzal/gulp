var gulp = require('gulp'); // Gulp dans devDependencies
var rename = require('gulp-rename'); // gulp rename dans devDependencies
var sass = require('gulp-sass'); // compilateur de sass dans devDependencies
var autoprefixer = require('gulp-autoprefixer'); // Pour avouter les prefixes de compatibilité vanigateurs.
var sourcemaps = require('gulp-sourcemaps'); // 

// Indiquer la source du document css à compiler
var styleSRC = './src/scss/style.scss';

// Indiquer le chemin vers le dossier vers lequel le compilement du css se fera
var styleDIST = './dist/css/';

// le chemin vers le JS sources
var jsSRC = './src/js/script.js';
// le chemin vers le dossier qui contiendra le JS compilé de ES6 à ES5
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
        .pipe(rename({ suffix: '.min' })) // Renommer le fichier compilé en 'style.min.css'. Pour utiliser Rename, je dois installer le module comme ceci: npm install --save-dev gulp-rename
        .pipe(sourcemaps.write('./')) // A tre juste avant le gulp.dest()
        .pipe(gulp.dest(styleDIST)); // Indiquer le dossier vers lequel sera enregistré le css compilé.

});

// Compiler le JavaScript
gulp.task('js', function () {
    return gulp.src(jsSRC)
        .pipe(gulp.dest(jsDIST));
});

gulp.task('default', ['js', 'style']);






