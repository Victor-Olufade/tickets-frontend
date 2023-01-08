import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Newticket from './pages/Newticket';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';

function App() {
  return (
    <>
    <Router>
      <div className='container'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/new-ticket' element={<PrivateRoute/>}>
          <Route path='/new-ticket' element={<Newticket/>}/>
        </Route>
        <Route path='/tickets' element={<PrivateRoute/>}>
          <Route path='/tickets' element={<Tickets/>}/>
        </Route>
        <Route path='/tickets/:id' element={<PrivateRoute/>}>
          <Route path='/tickets/:id' element={<Ticket/>}/>
        </Route>
      </Routes>
      </div>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
