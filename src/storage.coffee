export default (backend) ->
  root  = if typeof window == 'undefined' then global else window
  store = root[backend+'Storage']

  get: (k) ->
    store.getItem k

  set: (k, v) ->
    store.setItem k, v

  remove: (k) ->
    store.removeItem k

  clear: ->
    store.clear()
