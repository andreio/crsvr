/*global requirejs */
requirejs.config({
    'shim': {
        'jquery': {
            'exports': '$'
        },
        'angular':{
            'deps':['jquery'],
            'exports':'angular'
        }
    },
    'paths': {
        'text': '../../../bower_components/requirejs-text/text',
        'jquery': '../../../bower_components/jquery/dist/jquery',
        'angular':'../../../bower_components/angular/angular.min',
    }
});