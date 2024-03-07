import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppLayout } from './Components/app-layout/app-layout';

function App() {
  const location = useLocation()
  const navigate = useNavigate ()
  console.log(location)
  useEffect (() => {
    if (location.pathname === '/') {
      navigate ("/home")
    }
  }, [location]) 
  return (
    <AppLayout/>
  )
}

export default App
