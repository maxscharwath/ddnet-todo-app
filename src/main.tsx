import React, { FC, Suspense, SVGProps } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Await, createBrowserRouter, defer, RouterProvider, useLoaderData } from 'react-router-dom'
import { ListContainer } from './ListContainer.tsx'
import { client } from './store.ts'
import { ListDocument } from './hooks/UseLists.ts'
import { waitLoggedIn } from './hooks/UseSession.ts'

export const ExclamationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 26 26" {...props}>
    <g fill="none">
      <defs>
        <mask id="pepiconsPopExclamationCircleFilled0">
          <path fill="#fff" d="M0 0h26v26H0z"></path>
          <g fill="#000">
            <path fillRule="evenodd" d="M13 5a2 2 0 0 1 2 2v7a2 2 0 1 1-4 0V7a2 2 0 0 1 2-2Z" clipRule="evenodd"></path>
            <path d="M15 19a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"></path>
          </g>
        </mask>
      </defs>
      <circle cx="13" cy="13" r="13" fill="currentColor" mask="url(#pepiconsPopExclamationCircleFilled0)"></circle>
    </g>
  </svg>
)

export const SpinnerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <circle cx="4" cy="12" r="3" fill="currentColor">
      <animate id="svgSpinners3DotsFade0" fill="freeze" attributeName="opacity"
               begin="0;svgSpinners3DotsFade1.end-0.25s" dur="0.75s" values="1;.2"></animate>
    </circle>
    <circle cx="12" cy="12" r="3" fill="currentColor" opacity=".4">
      <animate fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.15s" dur="0.75s"
               values="1;.2"></animate>
    </circle>
    <circle cx="20" cy="12" r="3" fill="currentColor" opacity=".3">
      <animate id="svgSpinners3DotsFade1" fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.3s"
               dur="0.75s" values="1;.2"></animate>
    </circle>
  </svg>
)

const ListError: FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-6 w-full max-w-lg flex items-center">
      <ExclamationIcon className="text-red-500 mr-4 text-4xl"/>
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Oops!</h1>
        <p className="text-gray-500 dark:text-gray-400">The list you're searching for couldn't be found.</p>
      </div>
    </div>
  )
}

const ListLoading: FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-6 w-full max-w-lg flex items-center">
      <SpinnerIcon className="text-blue-500 mr-4 text-4xl"/>
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Hold on...</h1>
        <p className="text-gray-500 dark:text-gray-400">We're fetching your list.</p>
      </div>
    </div>
  )
}

const ListPage: FC = () => {
  const { document } = useLoaderData() as { document: Promise<ListDocument> }
  return <Suspense fallback={<ListLoading/>}>
    <Await
      resolve={document}
      errorElement={<ListError/>}
      children={(list: ListDocument) => (<ListContainer list={list} key={list.id}/>)}
    />
  </Suspense>
}

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: '/lists/:listId',
        loader: async ({ params: { listId } }) => {
          if (!listId) throw new Response('Missing listId parameter', { status: 400 })
          await waitLoggedIn()
          const document = client.requestDocument(listId).catch((reason) => {
            throw new Response('List not found', { status: 404, statusText: reason })
          })
          return defer({ document })
        },
        element: <ListPage/>
      },
      {
        path: '*',
        element: <div
          className="flex items-center justify-center w-full h-full text-gray-400 dark:text-gray-500 text-2xl">Select a
          list</div>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
