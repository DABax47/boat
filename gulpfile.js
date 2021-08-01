const { src, dest, watch, series, parallel,task } = require('gulp');
const imgMin = require('gulp-imagemin')
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat-css');
const minifyCSS = require('gulp-clean-css');

/**
 * HTML task 
 * This task will copy html files to the production dist folder
 **/

task('copyHTML', async ()=>{
    src('./*.html').pipe(dest('dist'))
})

/**
 * optimize img task 
 * This task will optimize .png and .jpg files to the production dist folder
 **/
 task('imgMin', async ()=>{
    src('./src/images/*').pipe(imgMin()).pipe(dest('dist/images'))
})

/**
 * sass task
 * this task will compile sass to css
 * concatinate and minify
 * then copy the file into dist
 **/
task('sass',async ()=>{
    src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(concat("./bundle.css"))
    .pipe(minifyCSS())
    .pipe(dest('dist/css'))
});

/**
 * run all tasks
 * this will run all tasks
 **/
task('all', parallel(['copyHTML', 'imgMin', 'sass']))