// Generated on 2018-03-10 using generator-web 0.2.5

'use strict';
var LIVERELOAD_PORT = 4000,
	SERVER_PORT = 3000,
	lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT }),
	mountFolder = function (connect, dir) {
		return connect.static(require('path').resolve(dir));
	};

module.exports = function (grunt) {
	// show elapsed time at the end
	require('time-grunt')(grunt);

	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	var yeomanConfig = {
		app: 'app',
		dist: 'dist'
	};

    // Define the configuration for all the tasks
	grunt.initConfig({
        // Project settings
		yeoman: yeomanConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            options: {
                spawn: false,
                livereload: LIVERELOAD_PORT
			},
			// compass: {
			// 	options: {
			// 		livereload: false
			// 	},
			// 	files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
			// 	tasks: ['compass']
			// },
			css: {
				files: [
					'{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css'
				]
			},
            livereload: {
                files: [
					'Gruntfile.js',
                    '<%= yeoman.app %>/{,*/}*.html',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/media/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },

        // The actual grunt server settings
		connect: {
			options: {
				port: SERVER_PORT,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'bower_components'),
							mountFolder(connect, yeomanConfig.app)
						];
					}
				}
			},
			dist: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, yeomanConfig.dist)
						];
					}
				}
			}
		},

		//Open in a new browser window
		open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			}
		},

        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },

		htmlmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: '*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/media',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/media'
                }]
            }
        },

        cssmin: {
			dist: {
				files: {
					'<%= yeoman.dist %>/styles/main.min.css': ['.tmp/styles/main.css']
				}
			}
        },

		// Empties folders to start fresh
		clean: {
			dist: ['.tmp', '<%= yeoman.dist %>/*'],
			server: '.tmp'
		},

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        cwd: '<%= yeoman.app %>/',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt,css}',
                            //'.htaccess'
                        ]
					},
					{
						expand: true,
						flatten: true,
						cwd: 'bower_components/',
						dest: '<%= yeoman.dist %>/styles/fonts/',
						src: ['bootstrap-sass-official/assets/fonts/bootstrap/*.*']

					},
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        cwd: 'bower_components/',
                        dest: '<%= yeoman.dist %>/scripts',
                        src: [,
							'html5shiv/dist/html5shiv.js'
                        ]
                    }
                ]
            },
			server: {
				files: [
					{
						expand: true,
						flatten: true,
						cwd: 'bower_components/',
						dest: '.tmp/styles/fonts/',
						src: ['bootstrap-sass-official/assets/fonts/bootstrap/*.*']
					}
				]
			}
        },

		compass: {
			options: {
				cssDir: '<%= yeoman.app %>/css',
				imagesDir: '<%= yeoman.app %>/img',
				javascriptsDir: '<%= yeoman.app %>/scripts',
				fontsDir: '<%= yeoman.app %>/css/fonts',
				importPath: 'bower_components',
				relativeAssets: true
			},
			dist: {},
			server: {
				options: {
					debugInfo: true
				}
			}
		},

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
				reporter: require('jshint-stylish'),
				reporterOutput: ''
            },
            files: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
		jscs: {

			options: {
				config: '.jscsrc'
			},
			files: [
				'<%= yeoman.app %>/scripts/{,*/}*.js'
			]
		}
    });

	grunt.registerTask('build', [
        'clean:dist',
        //'compass:dist',
		'useminPrepare',
		'htmlmin',
		'cssmin',
		'imagemin',
		'jshint',
		'concat',
		'uglify',
		'usemin',
        'copy:dist'
    ]);

	grunt.registerTask('serve', [
		'clean:server',
		'copy:server',
		//'compass:server',
		'jshint',
		'connect:livereload',
		'open:server',
		'watch'
	]);

	grunt.registerTask('default', [
        //'compass',
        'jshint'
    ]);
};
