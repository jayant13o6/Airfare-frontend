import { Route } from 'react-router-dom';
// import logo from './logo.svg';
import React,{ useState, useReducer}  from 'react';
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

export const CountContext = React.createContext()
////reducer define:
const initialState = false   /// initial state is declared (initialstate is keyword)
const reducer =(state,action)=>{
  switch(action){
    case '1':return true
    case '0':return initialState
  }
}

function App() {

  // const [paymentFlag, dispatch] = useReducer(reducer, initialState)
  // const [paySuccess, setPaySuccess] = useState(false)
  const [ticketData, setTicketData] = useState({})
  const [paySuccess, dispatch] = useReducer(reducer, initialState)
    function withProps(Component, props) {
        return function(matchProps) {
          return <Component {...props} {...matchProps} />
        }
      }
  return (
    <CountContext.Provider 
          value={{ countState: ticketData, countDispatch: dispatch}}>
    <div className="App">
      
      <Route exact path='/'> <Home/> </Route>

      <Route path='/login'><Login/></Route>

      <Route path='/signup'><Signup/></Route>

      <Route path='/ticket_book' component = {withProps(Tickets, { setTicketData: setTicketData, ticketData:ticketData })}/>
      {/* <Route path='/ticket_book'><Tickets/></Route> */}

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

      <Route path='/payment' component={withProps(PaymentGateway, { setTicketData: setTicketData, ticketData:ticketData })}/>
      {/* <Route path='/payment'><PaymentGateway/></Route> */}
    </div>
    </CountContext.Provider>
  );
}

export default App;
