import React, { Fragment } from 'react'
import {Provider} from 'react-redux'
import store from './Redux/store'
import './App.css';
import Main from './Component/Main';

const App = () => {
  return <Fragment>
    
    <Provider store={store}>
      <Main />
    </Provider>
    </Fragment>
}
 
export default App;
