import React, { useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import { BrowserRouter, Switch} from 'react-router-dom'
import Home from './Containers/Home/Index'
import SignIn from './Containers/SignIn/Index'
import SignUp from './Containers/Signup/Index'
import PrivateRoute from './Components/PrivateRoute';
import OpenRoute from './Components/OpenRoute'
import { useDispatch } from 'react-redux';
import { loginSuccess } from './Redux/User/ActionCreators';
import Products from './Containers/Products/Products';
import Orders from './Containers/Orders/Orders';
import Category from './Containers/Category/Category'

function App() {

  const dispatch = useDispatch()

  const isUserLoggedIn = () => {
    const token = localStorage.getItem('token')
    if(token){
      const _user = JSON.parse(localStorage.getItem('user'))
      const user = {token: token, user: _user}
      dispatch(loginSuccess(user))
    }
    else{
      localStorage.clear()
    }
  }

  useEffect(()=>{
    isUserLoggedIn()
  })

  return (
      <div className="App">
      <BrowserRouter>
      <Header />
      <Switch>
        <PrivateRoute path="/" exact component={Home}/>
        <PrivateRoute path='/products' exact component={Products}/>
        <PrivateRoute path='/orders' exact component={Orders} />
        <PrivateRoute path='/category' exact component={Category} />
        
        <OpenRoute path="/signin" component={SignIn}/>
        <OpenRoute path="/signup" component={SignUp}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
