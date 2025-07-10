// import Menubar from "./menubar";
 import AddMovie from "./addmovie";
 import Events from "./addevents";
 import Contact from "./addcontact";
 import Bookings from "./addbookings";
 import Home from "./addhome";
 import Login from "./login";
 import LocationContext from "./locationcontext";
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Route, Routes } from "react-router-dom";
 import {Link,Routes,Route} from 'react-router-dom';
import { useState } from "react";
function App(){
  const [location,setLocation] =useState('Bangalore');
  const updateLocation=(newLocation)=>{
    setLocation(newLocation);
  }
  return (
     <LocationContext.Provider value={{location,updateLocation}}>
  <div>
   
    {/* <h1>Welcome To MyShow</h1>
  <Menubar></Menubar>
  <AddMovie></AddMovie> */}
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <Link class="navbar-brand" >Navbar</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to="/home">Home<span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/movies">Movies</Link>
      </li>
      {(location==='Bangalore')?
      <li class="nav-item">
        <Link class="nav-link" to="/events">Events</Link>
      </li>
      :''}
      <li class="nav-item">
        <Link class="nav-link" to="/bookings">Bookings</Link>
      </li>
      
      <li class="nav-item">
        <Link class="nav-link" to="/contact">Contact</Link>
      </li>
      {/* <li class="nav-item dropdown">
        <Link class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
          Dropdown
        </Link>
        <div class="dropdown-menu">
          <Link class="dropdown-item" to="/">Action</Link>
          <Link class="dropdown-item" to="/">Another action</Link>
          <div class="dropdown-divider"></div>
          <Link class="dropdown-item" to="/">Something else here</Link>
        </div>
      </li>
      <li class="nav-item">
        <Link class="nav-link disabled">Disabled</Link>
      </li>
    </ul> */}
    <form class="form-inline my-2 my-lg-0">
      {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
      <Link to='/login' className="btn btn-outline-success my-2 my-sm-0">Login</Link>
    </form>
    </ul>
  </div>
</nav>
<Routes>
  <Route path='/home' element={<Home/>}></Route>
  <Route path='/movies' element={<AddMovie/>}></Route>
  <Route path='/events' element={<Events/>}></Route>
  <Route path='/bookings' element={<Bookings/>}></Route>
  <Route path='/contact' element={<Contact/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
</Routes>
  </div>
  </LocationContext.Provider>
);
}
export default App;