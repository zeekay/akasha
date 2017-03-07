require 'shortcake'

use 'cake-test'
use 'cake-publish'
use 'cake-version'

task 'clean', 'clean project', ->
  exec 'rm -rf lib'

task 'build', 'build project', ->
  handroll = require 'handroll'

  bundle = yield handroll.bundle
    entry:     'src/index.coffee'
    external:  true

  yield bundle.write format: 'cjs'
  yield bundle.write format: 'es'

task 'watch', 'watch for changes and recompile project', ->
  watch 'src/*.coffee', ->
    invoke 'build'
