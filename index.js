const register = require('./src/register');
const pkg = require('./package');

exports.plugin = {
  register: register,
  name: pkg.name,
  version: pkg.version
}
