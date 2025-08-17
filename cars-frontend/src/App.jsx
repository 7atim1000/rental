import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Auth, Cars, Erp, Home, Menu, Orders, Dashboard, Classes, Customers, Car, CarBill, OrdersUpdate, Transactions } from './pages'
import Header from './components/shared/Header'
import FullScreenLoader from './components/shared/FullScreenLoader';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Auth condition route
import { useSelector } from 'react-redux';
import useLoadData from './hooks/useLoadData';

function Layout() {

  // solve Auth condition issue
  // useLoadData();

   const location = useLocation();
  //useLoadData();  // to not logout during refresh page
  const isLoading = useLoadData();

  const hideHeaderRoutes = ['/auth', '/car', '/customers', '/classes', '/menu', '/carbill', '/rentmanagement', '/transactions'];
  
  // to Auth condition for login & register :-
  const {isAuth} = useSelector(state => state.user);
  if(isLoading) return <FullScreenLoader />



  return (
    <>
        <ToastContainer />
        
        {/*Hide Headder*/}
        {!hideHeaderRoutes.includes(location.pathname) && <Header />}
        <Routes>
          
          <Route path ='/auth' element ={isAuth ? <Navigate to='/' />: <Auth />}/>

          <Route path ='/' element ={<ProtectedRoutes><Home /></ProtectedRoutes>}/>
          <Route path ='/orders' element ={<ProtectedRoutes><Orders /></ProtectedRoutes>}/>
          <Route path ='/cars' element ={<ProtectedRoutes><Cars /></ProtectedRoutes>}/>

          <Route path ='/menu' element ={<ProtectedRoutes><Menu/></ProtectedRoutes>}/>
          <Route path ='/carbill' element ={<ProtectedRoutes><CarBill /></ProtectedRoutes>}/>

          <Route path ='/dashboard' element ={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}/>
 
          <Route path ='/erp' element ={<Erp />}/>
          <Route path ='/classes' element ={<ProtectedRoutes><Classes /></ProtectedRoutes>}/>
          <Route path ='/car' element ={<ProtectedRoutes><Car /></ProtectedRoutes>}/>
        
          <Route path ='/customers' element ={<ProtectedRoutes><Customers /></ProtectedRoutes>}/>
          <Route path ='/rentmanagement' element ={<ProtectedRoutes><OrdersUpdate/></ProtectedRoutes>}/>
          <Route path ='/transactions' element ={<ProtectedRoutes><Transactions/></ProtectedRoutes>}/>

        </Routes>
    </>
  )
}

// to prevent browser with out login

function ProtectedRoutes({children}) {
   const { isAuth } = useSelector(state => state.user);
   if (!isAuth) {
      return <Navigate to='/auth'/>
   }

   return children;
}


function App() {
    return (
      <Router>
          <Layout />
      </Router>
    );
};


export default App
