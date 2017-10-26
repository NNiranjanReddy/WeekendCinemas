module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// Task configuration will be written here
		clean: {
			temp: {
				src: ['app-all.js']
			}
		},
		concat: {
			options: {
				separator: '\n'
			},
			dist: {
				src: ['app/app.js', 'app/components/**/*.js'],
				dest: 'app-all.js'
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'weekendcinema.min.js': ['app-all.js']
				}
			}
		},
		express: {
			dev: {
				options: {
					script: 'server.js'
				}
			}
		},
		watch: {
			files: ['Gruntfile.js', 'server.js', 'app/**/*.js'], //Files to be watched
			tasks: ['clean:temp', 'concat:dist', 'express:dev'], //(Re)start the server
			options: { //Server options  'uglify:my_target',
				spawn: false
				//Must have for reload
			}
		}
	});

	// Loading of tasks and registering tasks will be written here

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('local', ['clean:temp', 'concat:dist', 'express:dev',
		'watch']);
};