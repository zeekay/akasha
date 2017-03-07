import cookieStorage  from './cookie-storage'
import localStorage   from './local-storage'
import sessionStorage from './session-storage'

export {cookieStorage}
export {sessionStorage}
export {localStorage}

export supported = (storage) ->
  try
    testStr = '__akasha__test__'
    storage.set testStr, testStr
    ok = (storage.get testStr) == testStr
    storage.remove testStr
    ok
  catch err
    false

export default do ->
  if supported localStorage
    localStorage
  else
    cookieStorage
