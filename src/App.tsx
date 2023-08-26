import React, { FC } from 'react'
import { Sidebar } from './Sidebar.tsx'
import { Outlet } from 'react-router-dom'

const App: FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-[100dvh] font-medium">
      <Sidebar/>
      <main
        className="flex flex-col items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-900 p-2 sm:p-6 overflow-hidden">
        <Outlet/>
      </main>
    </div>
  )
}

export default App
