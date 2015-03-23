'use strict';
module.exports = function(grunt) {
    var options = {
        conf: grunt.file.readJSON("config.json"),
        buildTasks: function() {
            var tasks = [];
            if (this.conf.sass.activate     === true) tasks.push('sass');
            if (this.conf.css.concatenation === true) tasks.push('concat:css', 'clean:css');
            if (this.conf.js.uglify         === true) tasks.push('uglify');
            if (this.conf.js.concatenation  === true) tasks.push('concat:js', 'clean:js');
            if (tasks.length === 0) {
                return grunt.log.error('No task was set in config.json');
            } else {
                return tasks
            }
        },
        buildCssTasks: function() {
            var tasks = [];
            if (this.conf.sass.activate     === true) tasks.push('sass');
            if (this.conf.css.concatenation === true) tasks.push('clean:cssBefore', 'concat:css');
            if (this.conf.css.concatenation === true && this.conf.css.cleanInput === true)
                tasks.push('clean:css');
            return tasks;
        },
        buildJsTasks: function() {
            var tasks = [];
            if (this.conf.js.uglify        === true) tasks.push('uglify');
            if (this.conf.js.concatenation === true) tasks.push('clean:jsBefore', 'concat:js');
            if (this.conf.js.concatenation === true && this.conf.js.cleanInput === true)
                tasks.push('clean:js');
            return tasks;
        },
        cleanCssInput: function() {
            var src = this.conf.css.input;
            src = src.toString();
            src = src + ',!' + this.conf.css.output;
            src = src.split(',');
            return src
        },
        cleanJsInput: function() {
            var src = this.conf.js.concatInput;
            src = src.toString();
            src = src + ',!' + this.conf.js.concatOutput;
            src = src.split(',');
            return src
        },
        watchCssFiles: function() {
            var sassInput = this.conf.sass.input,
                sassSrc = this.conf.sass.src,
                i = 0;
            if (this.conf.sass.activate === true && this.conf.css.concatenation === true) {
                for (i; i < sassSrc.length; i++) {
                    sassSrc[i] = sassInput + sassSrc[i];
                }
                return sassSrc;
            } else if (this.conf.css.concatenation === true) {
                return this.conf.css.input
            } else {
                return {}
            }
        },
        watchJsFiles: function() {
            var jsInput = this.conf.js.input,
                jsSrc = this.conf.js.src,
                i = 0;
            if (this.conf.js.uglify === true && this.conf.js.concatenation === true) {
                for (i; i < jsSrc.length; i++) {
                    jsSrc[i] = jsInput + jsSrc[i];
                }
                return jsSrc;
            } else if (this.conf.js.concatenation === true) {
                return this.conf.js.concatInput
            } else {
                return {}
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
                    style: '<%= conf.sass.compression %>' //nested, compact, compressed, expanded
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
                src:  '<%= conf.css.input %>',
                dest: '<%= conf.css.output %>'
            },
            js: {
                src:  '<%= conf.js.concatInput %>',
                dest: '<%= conf.js.concatOutput %>'
            }
        },
        clean: {
            css: options.cleanCssInput(),
            js:  options.cleanJsInput(),
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
                files: options.watchCssFiles(),
                tasks: options.buildCssTasks()
            },
            js: {
                files: options.watchJsFiles(),
                tasks: options.buildJsTasks()
            }
        }
    });
    grunt.registerTask('build',    options.buildTasks());
    grunt.registerTask('buildCss', options.buildCssTasks());
    grunt.registerTask('buildJs',  options.buildJsTasks());
    grunt.registerTask('watchCss', ['watch:css']);
    grunt.registerTask('watchJs',  ['watch:js']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
