import React, { FC } from 'react'
import { ListDocument, useLists } from './hooks/UseLists.ts'
import { useList } from './hooks/UseList.ts'
import { NavLink } from 'react-router-dom'
import { clsx } from 'clsx'
import { useSession } from './hooks/UseSession.ts'

const ListItem: FC<{list:ListDocument}> = ({list}) => {
  const { icon, title, completedTasks } = useList(list);
  return (
    <li>
      <NavLink
        to={`/lists/${list.id}`}
        className={({isActive}) => clsx(
          "flex items-center rounded-md px-2 h-10 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer",
          isActive && "bg-gray-200 dark:bg-gray-700",
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
  const copyPublicKey = () => {
    if(session) {
      navigator.clipboard.writeText(session.base58PublicKey)
    }
  }

  return (
    <nav className="w-96 h-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200 p-4 flex flex-col gap-4 overflow-hidden">
      <ul className="flex flex-col gap-2 flex-grow overflow-y-auto">
        {lists.map(list => (
          <ListItem key={list.id} list={list}/>
        ))}
      </ul>
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
