const os = require('os');

function osDetails(){
    return os.cpus
}

module.exports = osDetails