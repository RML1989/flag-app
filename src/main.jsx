import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/index.css'
import RootLayout from './root/RootLayout.jsx'
import HomePage, { loader as allCountriesLoader } from './pages/HomePage.jsx'
import CountryPage, { loader as singleCountryLoader } from './pages/CountryPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage />, loader: allCountriesLoader },
      { path: ':name', element: <CountryPage />, loader: singleCountryLoader },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
