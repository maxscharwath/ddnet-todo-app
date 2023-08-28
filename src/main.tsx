import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './Layout.tsx'
import { listLoader } from './pages/list/listLoader.tsx'
import { ListPage } from './pages/list/ListPage.tsx'

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/lists/:documentId',
        loader: listLoader,
        element: <ListPage/>
      },
      {
        path: '*',
        element: null
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
