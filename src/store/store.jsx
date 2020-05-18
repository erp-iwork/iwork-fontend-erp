import { applyMiddleware, createStore,compose } from 'redux'
import rootReducer from './rootReducer'
import thunkMiddleware from 'redux-thunk'

export default () => {
  return createStore(rootReducer,
   applyMiddleware(thunkMiddleware)
  )
}
