'use strict';
module.exports = function(grunt) {
    var options = {
        conf: grunt.file.readJSON("config.json"),
        buildTasks: function(type, currentTasks) {
            var tasks = currentTasks || [];
            switch (type) {
                case 'css':
                    if (this.conf.sass.activate     === true) tasks.push('sass');
                    if (this.conf.css.concatenation === true) tasks.push('clean:cssBefore', 'concat:css');
                    if (this.conf.css.concatenation === true && this.conf.css.cleanConcatInput === true) {
                        tasks.push('clean:css');
                    }
                    return tasks;
                break;

                case 'js':
                    if (this.conf.js.uglify         === true) tasks.push('uglify');
                    if (this.conf.js.concatenation  === true) tasks.push('clean:jsBefore', 'concat:js');
                    if (this.conf.js.concatenation  === true && this.conf.js.cleanConcatInput === true) {
                        tasks.push('clean:js');
                    }
                    return tasks;
                break;

                case 'all':
                    tasks = this.buildTasks('css');
                    this.buildTasks('js', tasks);
                    if (tasks.length === 0) {
                        return grunt.log.error('No task was set in config.json');
                    } else {
                        return tasks
                    }
                break;
            }
        },

        cleanInput: function(type) {
            var src, output;
            if (type === 'css') {
                src = this.conf.css.concatInput;
                output =  this.conf.css.output;
            } else if (type === 'js') {
                src = this.conf.js.concatInput;
                output =  this.conf.js.output;
            }
            src = src.toString();
            src +=  ',!' + output;
            src = src.split(',');
            return src
        },

        watchFiles: function(type) {
            var i, input, src, concat, task, concatInput;
            if (type === 'css') {
                input = this.conf.sass.input;
                src = this.conf.sass.src;
                task = this.conf.sass.activate;
                concat = this.conf.css.concatenation;
                concatInput = this.conf.css.concatInput;
            } else if (type === 'js') {
                input = this.conf.js.input;
                src = this.conf.js.src;
                task = this.conf.js.uglify;
                concat = this.conf.js.concatenation;
                concatInput = this.conf.js.concatInput;
            }

            if (task === true && concat === true) {
                for (i = 0; i < src.length; i++) {
                    src[i] = input + src[i];
                }
                return src;

            } else if (task === false && concat === true) {
                return concatInput;

            } else {
                return [];
            }
        }
    };
    grunt.initConfig({
        conf: grunt.file.readJSON("config.json"),
        sass: {
            dist: {
                options: {
                    trace: true,
                    sourcemap: 'none',
                    style: '<%= conf.sass.compression %>'
                },
                files: [{
                    expand: true,
                    cwd:  '<%= conf.sass.input %>',
                    src:  '<%= conf.sass.src %>',
                    dest: '<%= conf.sass.output %>',
                    ext:  '<%= conf.sass.extension %>'
                }]
            }
        },
        concat: {
            css: {
                src:  '<%= conf.css.concatInput %>',
                dest: '<%= conf.css.output %>'
            },
            js: {
                src:  '<%= conf.js.concatInput %>',
                dest: '<%= conf.js.concatOutput %>'
            }
        },
        clean: {
            options: {
                force: true
            },
            css: options.cleanInput('css'),
            js:  options.cleanInput('js'),
            cssBefore: '<%= conf.css.output %>',
            jsBefore:  '<%= conf.js.concatOutput %>'
        },
        uglify: {
            dist: {
                options: {
                    beautify: '<%= conf.js.beautify %>'
                },
                files: [{
                    expand: true,
                    cwd:  '<%= conf.js.input %>',
                    src:  '<%= conf.js.src %>',
                    dest: '<%= conf.js.output %>',
                    ext:  '<%= conf.js.extension %>'
                }]
            }
        },
        watch: {
            css: {
                files: options.watchFiles('css'),
                tasks: options.buildTasks('css')
            },
            js: {
                files: options.watchFiles('js'),
                tasks: options.buildTasks('js')
            }
        }
    });
    grunt.registerTask('build', 'Build the project (CSS & JS)', options.buildTasks('all'));
    grunt.registerTask('buildCss', 'Build the CSS', options.buildTasks('css'));
    grunt.registerTask('buildJs', 'Build the JS', options.buildTasks('js'));
    grunt.registerTask('watchCss', 'Watch for CSS changes, then build the CSS', ['watch:css']);
    grunt.registerTask('watchJs', 'Watch for JS changes, then build the JS', ['watch:js']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
