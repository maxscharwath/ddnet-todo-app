import React, { FC, useMemo } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { ListDocument, useLists } from './hooks/UseLists.ts'
import { useList } from './hooks/UseList.ts'
import { NavLink } from 'react-router-dom'
import { clsx } from 'clsx'
import { useSession } from './hooks/UseSession.ts'

const ListItem: FC<{ list: ListDocument }> = ({ list }) => {
  const { icon, title, completedTasks } = useList(list)
  return (
    <li className="grid">
      <NavLink
        to={`/lists/${list.id}`}
        className={({ isActive }) => clsx(
          'flex items-center rounded-md px-2 h-10 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer truncate',
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

export const Sidebar: FC = () => {
  const { lists, createList } = useLists()
  const session = useSession()

  const orderedLists = useMemo(() => lists.sort((a, b) => a.id.localeCompare(b.id)), [lists])

  const copyPublicKey = () => {
    if (session) {
      navigator.clipboard.writeText(session.base58PublicKey)
    }
  }

  return (
    <nav
      className="w-64 h-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200 p-4 flex flex-col gap-4 overflow-hidden flex-shrink-0">
      <h1 className="text-2xl font-semibold">
        Todo Lists
        <span className="text-xs font-normal ml-2">
          Powered by <a href="https://www.npmjs.com/package/@describble/ddnet" className="font-bold">DDNet</a>
        </span>
      </h1>
      <ScrollArea.Root className="flex flex-1 overflow-hidden">
        <ScrollArea.Viewport className="flex-1">
          <ul className="grid gap-2">
            {orderedLists.map(list => (
              <ListItem key={list.id} list={list}/>
            ))}
          </ul>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none w-2"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 rounded-full bg-gray-400 dark:bg-gray-600"/>
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
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
    </nav>
  )
}
