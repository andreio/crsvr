/*global require, process*/
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        "pkg": "<json:package.json>",
        "projName": "build-system",
        "projVersion": "0.1.0",
        "deployFragment": "<%= projName %>/<%= projVersion %>",
        "requireScript": "<script type=\"text/javascript\">requirejs.config({ baseUrl: \"scripts\" });require([\"config\"], function() { require([\"main\"]); });</script>",
        "clean": {
            "build": {
                "src": [
                    "temp",
                    "dist"
                ],
                "options": {
                    "force": true
                }
            },
            "localAssets": {
                "src": [
                    "dist/local/assets"
                ],
                "options": {
                    "force": true
                }
            },
        },
        "jshint": {
            "all": [
                "Gruntfile.js",
                "app/scripts/**/*.js",
                "test/**/*.js"
            ],
            "options": {
                "jshintrc": ".jshintrc"
            }
        },
        "less": {
            "local": {
                "options": {
                    "paths": [
                        "app/styles"
                    ]
                },
                "files": [
                    {
                        "dest": "dist/local/css/<%= projName %>.css",
                        "src": [
                            "app/styles/start.less"
                        ]
                    }
                ]
            },
            "prod": {
                "options": {
                    "paths": "<%= less.local.options.paths %>",
                    "compress": true
                },
                "files": [
                    {
                        "dest": "dist/prod/<%= deployFragment %>/css/<%= projName %>.css",
                        "src": "app/styles/start.less"
                    }
                ]
            }
        },
        "copy": {
            "prepareBuild": {
                "files": [
                    {
                        "src": [
                            "**"
                        ],
                        "cwd": "app/templates/",
                        "dest": "temp/build/templates/",
                        "expand": true
                    }
                ]
            },
            "local": {
                "files": [
                    {
                        "src": [
                            "index.html"
                        ],
                        "dest": "dist/local/index.html"
                    },
                    {
                        "src": [
                            "data.json"
                        ],
                        "dest": "dist/local/data"
                    },
                    {
                        "src": [
                            "**"
                        ],
                        "cwd": "temp/build/",
                        "dest": "dist/local/",
                        "expand": true
                    },
                    {
                        "src": [
                            "**"
                        ],
                        "cwd": "app/assets/",
                        "dest": "dist/local/assets/",
                        "expand": true
                    },
                    {
                        "src": [
                            "**"
                        ],
                        "cwd": "app/templates/",
                        "dest": "dist/local/templates/",
                        "expand": true
                    }
                ]
            },
            "localAssets": {
                "files": [
                    {
                        "src": [
                            "**"
                        ],
                        "cwd": "app/assets/",
                        "dest": "dist/local/assets/",
                        "expand": true
                    }
                ]
            },
            "prod": {
                "files": [
                    {
                        "src": [
                            "index.html"
                        ],
                        "dest": "dist/prod/<%= deployFragment %>/index.html"
                    },
                    {
                        "src": [
                            "**"
                        ],
                        "cwd": "app/assets/",
                        "dest": "dist/prod/<%= deployFragment %>/assets/",
                        "expand": true
                    },
                    {
                        "src": [
                            "README.md"
                        ],
                        "dest": "dist/meta/README.md"
                    }
                ]
            }
        },
        "watch": {
            "styles": {
                "files": [
                    "app/styles/**"
                ],
                "tasks": [
                    "localStyle"
                ]
            },
            "assets": {
                "files": [
                    "app/assets/**"
                ],
                "tasks": [
                    "localAssets"
                ]
            },
            "code": {
                "files": [
                    "app/**",
                    "!app/styles/**",
                    "!app/assets/**",
                    "test/**/*.js",
                    "Gruntfile.js",
                    "index.html",
                    "jshintrc",
                    "data.json"
                ],
                "tasks": [
                    "local"
                ]
            },
            "cssLiveReload": {
                "files": [
                    "dist/local/css/**"
                ],
                "options": {
                    "livereload": {
                        "host": "localhost",
                        "port": 8567,
                    }
                }
            }
        },
        "requirejs": {
            "prod": {
                "options": {
                    "baseUrl": "temp/build/scripts",
                    "mainConfigFile": "temp/build/scripts/config.js",
                    "name": "../../../bower_components/almond/almond",
                    "include": "main",
                    "insertRequire": [
                        "main"
                    ],
                    "out": "dist/prod/<%= deployFragment %>/js/<%= projName %>.js",
                    "wrap": false
                }
            }
        },
        "templateFile": {
            "local": {
                "file": "dist/local/index.html",
                "options": {
                    "data": {
                        "jsUrl": "../../bower_components/requirejs/require.js",
                        "cssUrl": "css/<%= projName %>.css",
                        "version": "- v<%= projVersion %>",
                        "requireScript": "<%= requireScript %>"
                    }
                }
            },
            "localCSS": {
                "file": "dist/local/css/<%= projName %>.css",
                "options": {
                    "data": {
                        "imagePath": "../assets"
                    }
                }
            },
            "localEnv": {
                "file": "temp/build/scripts/env.js",
                "options": {
                    "data": {
                        "imagePath": "assets"
                    }
                }
            },
            "prod": {
                "file": "dist/prod/<%= deployFragment %>/index.html",
                "options": {
                    "data": {
                        "jsUrl": "/<%= deployFragment %>/js/<%= projName %>.js",
                        "cssUrl": "/<%= deployFragment %>/css/<%= projName %>.css",
                        "version": "- v<%= projVersion %>",
                        "requireScript": ""
                    }
                }
            },
            "prodCSS": {
                "file": "dist/prod/<%= deployFragment %>/css/<%= projName %>.css",
                "options": {
                    "data": {
                        "imagePath": "/<%= deployFragment %>/assets"
                    }
                }
            },
            "prodEnv": {
                "file": "temp/build/scripts/env.js",
                "options": {
                    "data": {
                        "imagePath": "./assets"
                    }
                }
            }
        },
        "mocha": {
            "dot": {
                "src": [
                    "test/index.html"
                ]
            }
        },
        "parallel": {
            "watch": {
                "options": {
                    "grunt": true,
                    "stream": true
                },
                "tasks": [
                    "watch:code",
                    "watch:styles",
                    "watch:assets",
                    "watch:cssLiveReload"
                ]
            }
        },
        "babel": {
            "build": {
                "options": {
                    "sourceMaps": true,
                    "presets": [
                        "es2015"
                    ],
                    "plugins": [
                        "transform-es2015-modules-amd"
                    ]
                },
                "files": [
                    {
                        "expand": true,
                        "cwd": "app",
                        "src": [
                            "**/*.js"
                        ],
                        "dest": "temp/build"
                    },
                    {
                        "expand": true,
                        "cwd": "test",
                        "src": [
                            "**/*.js"
                        ],
                        "dest": "temp/test"
                    }
                ]
            }
        },
        "connect": {
            "server": {
                "options": {
                    "port": 8080,
                    "useAvailablePort": true,
                    "hostname": "*",
                    "livereload": 8567,
                    "keepalive": true
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-mocha");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-template-file");
    grunt.loadNpmTasks("grunt-parallel");


    // Define grunt tasks
    grunt.registerTask("localTemplate", ["templateFile:local", "templateFile:localCSS"]);
    grunt.registerTask("prodTemplate", ["templateFile:prod", "templateFile:prodCSS", "templateFile:prodEnv"]);
    grunt.registerTask("local", ["clean:build", "jshint", "copy:prepareBuild", "less:local", "babel:build", "templateFile:localEnv", "copy:local", "localTemplate", "mocha:dot"]);
    grunt.registerTask("localStyle", ["less:local", "templateFile:localCSS"]);
    grunt.registerTask("localAssets", ["clean:localAssets", "copy:localAssets"]);
    grunt.registerTask("rel", ["clean:build", "jshint", "copy:prepareBuild", "less:prod", "babel:build", "copy:prod", "prodTemplate", "mocha:dot", "requirejs"]);
    grunt.registerTask("default", ["local", "parallel:watch"]);

};
