import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import './App.css'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Container className='my-5' >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetail />} />

          <Route  element={<ProtectedRoutes />} >
            <Route path='/purchases' element={<Purchases />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
