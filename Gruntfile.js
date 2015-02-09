module.exports = function(grunt) {
	'use strict';

	var isDevelopmentRun = !grunt.option('prod');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			files: ['src/**/*.js']
		},
		clean: {
			install: [grunt.file.readJSON('.bowerrc').directory],
			css: ['test/css/']
		},
		connect: {
			testserver: {
				options: {
					port: 3000,
					base: '.'
				}
			}
		},
		stylus: {
			compile: {
				files: {
					'test/css/test.css': [
						'lib/dropdown/src/styl/dropdown.styl',
						'lib/selectbox/src/styl/selectbox.styl',
						'test/styl/selectbox.styl',
						'src/styl/switchbox.styl',
						'test/styl/dropdown.styl',
						'test/styl/switchbox.styl'
					]
				}
			}
		},

		jsdoc : {
			dist : {
				src: ['src/js/*.js'],
				options: {
					destination: 'doc'
				}
			}
		},
		jsdoc2md: {
			oneOutputFile: {
				src: "src/js/switchbox.js",
				dest: "doc/documentation.md"
			}
		},
		karma: {
			options: {
				singleRun: !isDevelopmentRun,
				autoWatch: isDevelopmentRun
			},
			ui: {
				configFile: 'karma.ui.conf.js',
				browsers: ['Chrome']
			},
			unit: {
				configFile: 'karma.unit.conf.js',
				browsers: ['PhantomJS']
			}
		},

		shell: {
			install: {
				command: 'node node_modules/bower/bin/bower install'
			}
		},

		jscs: {
			options: {
				config: '.jscsrc'
			},
			files: {
				src: ['src/**/*.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-interactive-shell');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks("grunt-jsdoc-to-markdown");
	grunt.loadNpmTasks('grunt-jsdoc');

	grunt.registerTask('install', ['clean:install', 'shell:install']);
	grunt.registerTask('css', ['clean:css', 'stylus']);

	grunt.registerTask('check_style', ['jshint']);
	//grunt.registerTask('check_style', ['jscs', 'jshint']);
	grunt.registerTask('test_unit', ['karma:unit']);
	//grunt.registerTask('test_ui', ['connect:testserver', 'karma:ui']);
	grunt.registerTask('test', ['check_style', 'test_unit']);
	grunt.registerTask('build', ['css','install', 'test']);
	grunt.registerTask('doc', 'jsdoc2md');
	grunt.registerTask('default', ['build']);
};