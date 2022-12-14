import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

// const  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace:true}) || compose

// const store = createStore(reducer,composeEnhancers(
//     applyMiddleware(thunk)
// ))
const store = createStore(reducer,applyMiddleware(thunk))

export default store