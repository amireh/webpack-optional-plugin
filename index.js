const path = require('path')
const NullModule = { path: path.resolve(__dirname, 'null.js') }

class OptionalPlugin {
  constructor({ include, nullModulePath }) {
    if (!Array.isArray(include)) {
      this.matches = file => startsWith(file, include)
    }
    else if (include.length === 1) {
      this.matches = file => startsWith(file, include[0])
    }
    else {
      this.matches = file => include.some(p => startsWith(file, p))
    }

    this.nullModulePath = nullModulePath || NullModule
  }

  apply(resolver) {
    resolver.hooks.file.tapAsync('OptionalPlugin', (request, resolveContext, callback) => {
      const file = request.path;

      if (!this.matches(file)) {
        return callback()
      }

      resolver.fileSystem.stat(file, (err, stat) => {
        if (err || !stat || !stat.isFile()) {
          callback(null, Object.assign({}, request, this.nullModulePath))
        }
        else {
          callback()
        }
      })
    })
  }
}

function startsWith(string, searchString) {
  const stringLength = string.length;
  const searchLength = searchString.length;

  // early out if the search length is greater than the search string
  if(searchLength > stringLength) {
    return false;
  }
  let index = -1;
  while(++index < searchLength) {
    if(string.charCodeAt(index) !== searchString.charCodeAt(index)) {
      return false;
    }
  }
  return true;
}

module.exports = OptionalPlugin