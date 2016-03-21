module.exports = function() {
    var buildver = './src/client/';
    
    var config = {
        build: './build/',
        alljs: [
            
        ],
        allscss: './app/scss/*.scss',
        index: 'index.html',
        
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },    
    }
    
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };
    
    return config;
};