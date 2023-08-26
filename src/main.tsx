import React, { FC } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider, useLoaderData } from 'react-router-dom'
import { ListContainer } from './ListContainer.tsx'
import { client } from './store.ts'
import { ListDocument } from './hooks/UseLists.ts'
import { waitLoggedIn } from './hooks/UseSession.ts'

const ListPage:FC = () => {
  const document = useLoaderData() as ListDocument;
  return <ListContainer list={document} key={document.id}/>
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/lists/:listId",
        loader: async ({ params: { listId } }) => {
          if(!listId) throw new Response("Missing listId parameter", { status: 400 })
          await waitLoggedIn();
          return client.requestDocument(listId).catch(() => {
            throw new Response("List not found", { status: 404 })
          });
        },
        element: <ListPage />
      },
      {
        path: "/",
        element: <div className="flex items-center justify-center w-full h-full text-gray-400 dark:text-gray-500 text-2xl">Select a list</div>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
