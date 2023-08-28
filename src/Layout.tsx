import React, { FC } from 'react'
import { Sidebar } from './components/Sidebar.tsx'
import { Outlet } from 'react-router-dom'
import { DidItIcon } from './components/icons/DidItIcon.tsx'
import { MenuDotsIcon } from './components/icons'

export const Layout: FC = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex items-center justify-center w-screen h-[100dvh] font-medium bg-gray-200 dark:bg-gray-900">
      <Sidebar open={open} setOpen={setOpen}/>
      <div className="flex flex-col w-full h-full">
        <header
          className="w-full text-gray-600 dark:text-gray-200 flex items-center p-4 gap-2 bg-white dark:bg-gray-800 rounded-b-lg shadow-lg sm:hidden">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 hover:dark:bg-gray-700 active:bg-gray-100"
            onClick={() => setOpen(!open)}>
            <MenuDotsIcon className="w-6 h-6"/>
          </button>
          <DidItIcon className="max-w-full h-8"/>
        </header>
        <main
          className="flex flex-col items-center justify-center w-full h-full p-2 sm:p-6 overflow-hidden">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}
