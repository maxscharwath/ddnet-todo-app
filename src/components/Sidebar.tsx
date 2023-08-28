import React, { FC, useMemo } from 'react'
import { ListDocument, useLists } from '../hooks/UseLists.ts'
import { useList } from '../hooks/UseList.ts'
import { NavLink } from 'react-router-dom'
import { clsx } from 'clsx'
import { useSession } from '../hooks/UseSession.ts'
import { DidItIcon } from './icons/DidItIcon.tsx'

const ListItem: FC<{ list: ListDocument }> = ({ list }) => {
  const { icon, title, completedTasks } = useList(list)
  return (
    <li className="grid">
      <NavLink
        to={`/lists/${list.id}`}
        className={({ isActive }) => clsx(
          'flex items-center rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer truncate',
          'text-xl sm:text-base',
          isActive && 'bg-gray-200 dark:bg-gray-700',
        )}
      >
        <div className="flex items-center gap-2 flex-1 truncate">
          <span>{icon}</span>
          <span className="truncate">{title}</span>
        </div>
        <span className="text-xs bg-gray-100 dark:bg-gray-600 rounded-full px-2 py-0.5">
          {completedTasks}
        </span>
      </NavLink>
    </li>
  )
}

export const Sidebar: FC<{ open?: boolean, setOpen?: (open: boolean) => void }> = ({
  open = false,
  setOpen = () => {}
}) => {
  const { lists, createList } = useLists()
  const session = useSession()

  const orderedLists = useMemo(() => lists.sort((a, b) => a.id.localeCompare(b.id)), [lists])

  const copyPublicKey = () => {
    if (session) {
      navigator.clipboard.writeText(session.base58PublicKey)
    }
  }

  return (
    <>
      <nav
        className={clsx(
          'h-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 flex flex-col py-4 gap-4 flex-shrink-0',
          'transition-all duration-200 ease-in-out',
          'fixed top-0 left-0 z-10 shadow-lg w-4/5 data-[state=closed]:-translate-x-full',
          'sm:w-64 sm:static sm:data-[state=closed]:translate-x-0 sm:shadow-none',
        )}
        data-state={open ? 'open' : 'closed'}
      >
        <h1 className="text-2xl font-semibold flex items-end gap-2 px-4">
          <DidItIcon className="inline-block max-w-full h-8 w-auto"/>
          <span className="text-xs font-normal">
            Powered by <a href="https://www.npmjs.com/package/@describble/ddnet" className="font-bold">DDNet</a>
          </span>
        </h1>
        <div className="flex-1 overflow-auto p-4">
          <ul className="grid gap-2">
            {orderedLists.map(list => (
              <ListItem key={list.id} list={list}/>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 px-4">
          <button
            className="w-full h-10 rounded-md bg-blue-500 text-white font-semibold"
            onClick={copyPublicKey}>
            Copy my public key
          </button>
          <button
            className="w-full h-10 rounded-md bg-blue-500 text-white font-semibold"
            onClick={createList}>
            Create List
          </button>
        </div>
      </nav>
      <div
        className="sm:hidden fixed inset-0 bg-black/50 data-[state=closed]:opacity-0 transition-opacity duration-200 ease-in-out data-[state=closed]:pointer-events-none"
        onClick={() => setOpen(false)}
        data-state={open ? 'open' : 'closed'}
      />
    </>
  )
}
