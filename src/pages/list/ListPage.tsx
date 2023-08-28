import React, { FC, Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { ListDocument } from '../../hooks/UseLists.ts'
import { ListContainer } from '../../components/ListContainer.tsx'
import { ExclamationIcon, SpinnerIcon } from '../../components/icons'

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

export const ListPage: FC = () => {
  const { document } = useLoaderData() as { document: Promise<ListDocument> }
  return <Suspense fallback={<ListLoading/>}>
    <Await
      resolve={document}
      errorElement={<ListError/>}
      children={(list: ListDocument) => (<ListContainer list={list} key={list.id}/>)}
    />
  </Suspense>
}
