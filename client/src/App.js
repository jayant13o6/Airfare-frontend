import { Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import Flights from './components/schedule_flight';
import Tickets from './components/ticket_book.js';
import Logout from './components/logout';
import Admin from './components/admin';
import CreateAdmin from './components/createAdmin.js';
import IndvUser from './components/indvUser';
import Flights_data from './components/flights_data';
import IndvAdmin from './components/indivAdmin';
import AdminLogout from './components/adminlogout';
import History from './components/history';
import Booking from './components/latest_ticket';
import Flights_data2 from './components/flights_data2.js';
import PaymentGateway from './components/payment';

function App() {
  return (
    <div className="App">
      
    

      <Route exact path='/'> <Home/> </Route>

      <Route path='/login'><Login/></Route>

      <Route path='/signup'><Signup/></Route>

      <Route path='/ticket_book'><Tickets/></Route>

      <Route path='/schedule_flight'><Flights/></Route>

      <Route path='/admin'><Admin/></Route>

      <Route path='/createAdmin'><CreateAdmin/></Route>

      <Route path='/logout'><Logout/></Route>

      <Route path='/indvUser'><IndvUser/></Route>

      <Route path='/search_flights'><Flights_data/></Route>

      <Route path='/search_flights2'><Flights_data2/></Route>

      <Route path='/adminUser'><IndvAdmin/></Route>

      <Route path='/adminlogout'><AdminLogout/></Route>

      <Route path='/history'><History/></Route>
      
      <Route path='/Bookings'><Booking/></Route>

      <Route path='/payment'><PaymentGateway/></Route>
    </div>
  );
}

export default App;
