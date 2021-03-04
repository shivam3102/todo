import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Todo from './components/Todo';
import PrivateRoutes from './auth/PrivateRoutes'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={Signup}/>
        <Route path='/signin' exact component={Signin}/>
        <PrivateRoutes path='/todo' exact component={Todo}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
