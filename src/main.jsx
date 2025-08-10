import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import{
  createBrowserRouter,
  RouterProvider,
}from 'react-router-dom'
import router from './components/router/Router/Router.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className='max-w-7xl mx-auto'> <RouterProvider router={router}></RouterProvider></div>
    </QueryClientProvider>
  </StrictMode>,
)
