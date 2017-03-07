(function (global) {
  var process = {
    title: 'browser',
    browser: true,
    env: {},
    argv: [],
    nextTick: function (fn) {
      setTimeout(fn, 0)
    },
    cwd: function () {
      return '/'
    },
    chdir: function () {
    }
  };
  // Require a module
  function rqzt(file, callback) {
    if ({}.hasOwnProperty.call(rqzt.cache, file))
      return rqzt.cache[file];
    // Handle async require
    if (typeof callback == 'function') {
      rqzt.load(file, callback);
      return
    }
    var resolved = rqzt.resolve(file);
    if (!resolved)
      throw new Error('Failed to resolve module ' + file);
    var module$ = {
      id: file,
      rqzt: rqzt,
      filename: file,
      exports: {},
      loaded: false,
      parent: null,
      children: []
    };
    var dirname = file.slice(0, file.lastIndexOf('/') + 1);
    rqzt.cache[file] = module$.exports;
    resolved.call(module$.exports, module$, module$.exports, dirname, file);
    module$.loaded = true;
    return rqzt.cache[file] = module$.exports
  }
  rqzt.modules = {};
  rqzt.cache = {};
  rqzt.resolve = function (file) {
    return {}.hasOwnProperty.call(rqzt.modules, file) ? rqzt.modules[file] : void 0
  };
  // Define normal static module
  rqzt.define = function (file, fn) {
    rqzt.modules[file] = fn
  };
  // source: src/index.coffee
  rqzt.define('./index', function (module, exports, __dirname, __filename, process) {
    var cookie, md5, postFix, store;
    store = rqzt('store');
    cookie = require('js-cookie');
    md5 = require('crypto-js/md5');
    postFix = md5(window.location.host);
    if (store.enabled) {
      module.exports = {
        get: function (k) {
          k += '_' + postFix;
          return store.get(k)
        },
        set: function (k, v) {
          k += '_' + postFix;
          return store.set(k, v)
        },
        remove: function (k) {
          k += '_' + postFix;
          return store.remove(k)
        },
        clear: function () {
          return store.clear()
        }
      }
    } else {
      module.exports = {
        get: function (k) {
          var e, v;
          k += '_' + postFix;
          v = cookie.get(k);
          try {
            v = JSON.parse(v)
          } catch (error) {
            e = error
          }
          return v
        },
        set: function (k, v) {
          var keys, ref;
          k += '_' + postFix;
          keys = (ref = cookie.get('_keys' + postFix)) != null ? ref : '';
          cookie.set('_keys', keys += ' ' + k);
          return cookie.set(k, JSON.stringify(v))
        },
        remove: function (k) {
          k += '_' + postFix;
          return cookie.remove(k)
        },
        clear: function () {
          var i, k, keys, ks, len, ref;
          keys = (ref = cookie.get('_keys' + postFix)) != null ? ref : '';
          ks = keys.split(' ');
          for (i = 0, len = ks.length; i < len; i++) {
            k = ks[i];
            cookie.remove(k)
          }
          return cookie.remove('_keys')
        }
      }
    }
  });
  // source: src/browser.coffee
  rqzt.define('./browser', function (module, exports, __dirname, __filename, process) {
    global.Referential = rqzt('./index')
  });
  rqzt('./browser')
}.call(this, this))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSIsImJyb3dzZXIuY29mZmVlIl0sIm5hbWVzIjpbImNvb2tpZSIsIm1kNSIsInBvc3RGaXgiLCJzdG9yZSIsInJxenQiLCJyZXF1aXJlIiwid2luZG93IiwibG9jYXRpb24iLCJob3N0IiwiZW5hYmxlZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXQiLCJrIiwic2V0IiwidiIsInJlbW92ZSIsImNsZWFyIiwiZSIsIkpTT04iLCJwYXJzZSIsImVycm9yIiwia2V5cyIsInJlZiIsInN0cmluZ2lmeSIsImkiLCJrcyIsImxlbiIsInNwbGl0IiwibGVuZ3RoIiwiZ2xvYmFsIiwiUmVmZXJlbnRpYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsSUFBSUEsTUFBSixFQUFZQyxHQUFaLEVBQWlCQyxPQUFqQixFQUEwQkMsS0FBMUIsQztJQUVBQSxLQUFBLEdBQVFDLElBQUEsQ0FBUSxPQUFSLENBQVIsQztJQUVBSixNQUFBLEdBQVNLLE9BQUEsQ0FBUSxXQUFSLENBQVQsQztJQUVBSixHQUFBLEdBQU1JLE9BQUEsQ0FBUSxlQUFSLENBQU4sQztJQUVBSCxPQUFBLEdBQVVELEdBQUEsQ0FBSUssTUFBQSxDQUFPQyxRQUFQLENBQWdCQyxJQUFwQixDQUFWLEM7SUFFQSxJQUFJTCxLQUFBLENBQU1NLE9BQVYsRUFBbUI7QUFBQSxNQUNqQkMsTUFBQSxDQUFPQyxPQUFQLEdBQWlCO0FBQUEsUUFDZkMsR0FBQSxFQUFLLFVBQVNDLENBQVQsRUFBWTtBQUFBLFVBQ2ZBLENBQUEsSUFBSyxNQUFNWCxPQUFYLENBRGU7QUFBQSxVQUVmLE9BQU9DLEtBQUEsQ0FBTVMsR0FBTixDQUFVQyxDQUFWLENBRlE7QUFBQSxTQURGO0FBQUEsUUFLZkMsR0FBQSxFQUFLLFVBQVNELENBQVQsRUFBWUUsQ0FBWixFQUFlO0FBQUEsVUFDbEJGLENBQUEsSUFBSyxNQUFNWCxPQUFYLENB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