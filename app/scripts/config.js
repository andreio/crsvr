/*global requirejs */
requirejs.config({
    'shim': {
        'jquery': {
            'exports': '$'
        }
    },
    'paths': {
        'text': '../../../bower_components/requirejs-text/text',
        'jquery': '../../../bower_components/jquery/dist/jquery',
        'jquery-ui': '../../../bower_components/jquery-ui/ui',
        'jquery-ui-touch-punch': '../../../bower_components/jquery-ui-touch-punch/jquery.ui.touch-punch',
        'underscore': '../../../bower_components/underscore/underscore'
    }
});