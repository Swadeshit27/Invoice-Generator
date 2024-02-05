import React from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import { Route, Routes } from 'react-router-dom'
import AddProducts from './pages/AddProducts'
import GeneratePDF from './pages/GeneratePDF'
import PublicPage from './components/PublicPage'
import PrivatePage from './components/PrivatePage'
import ForgetPassword from './pages/ForgetPassword'
import Error from './pages/Error'



const App: React.FC = () => {
  return (
    <div className='bg-[rgb(241,245,249)] text-dark_light min-h-screen'>
      <Navbar />
      <div className='w-full h-full pt-24 flex justify-center items-center'>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicPage>
                <Login />
              </PublicPage>
            }
          />
          <Route
            path="/forget"
            element={
              <PublicPage>
                <ForgetPassword />
              </PublicPage>
            }
          />
          <Route
            path="/register"
            element={
              <PublicPage>
                <Register />
              </PublicPage>
            }
          />
          <Route
            path="/"
            element={
              <PrivatePage>
                <AddProducts />
              </PrivatePage>
            }
          />
          <Route
            path="/generate-pdf"
            element={
              <PrivatePage>
                <GeneratePDF />
              </PrivatePage>
            }
          />
          <Route
            path="/*"
            element={
              <Error />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
