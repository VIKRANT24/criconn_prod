//node imports
import { configureStore } from '@reduxjs/toolkit'

//local imports
import { AuthReducer } from '../store/reducer/common'
import settingReducer from '../store/setting/reducers';

const reducer = {
  auth: AuthReducer,
  setting:settingReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;