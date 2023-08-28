import React, { FC, PropsWithChildren, useMemo } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { NewTaskInput } from './NewTaskInput.tsx'
import { Task } from './Task.tsx'
import { clsx } from 'clsx'
import * as Dialog from '@radix-ui/react-dialog'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ListDocument } from '../hooks/UseLists.ts'
import { useList } from '../hooks/UseList.ts'
import { useSession } from '../hooks/UseSession.ts'
import { base58, validatePublicKey } from '@describble/ddnet'
import { AddUserIcon, ChevronRightIcon, RemoveUserIcon } from './icons'

const ListIcon: FC<{
  icon: string;
  onUpdateIcon?: (icon: string) => void;
}> = ({ icon, onUpdateIcon }) => {
  const emojis = ['📌', '🗂️', '📅', '📝', '⏳', '✅', '🔄', '🚀', '🤔', '💡', '🎯', '⚡', '🛠️', '📈', '🔍', '🌟', '🤓', '🙌', '🍀', '🧠']

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 hover:dark:bg-gray-700 active:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:dark:bg-gray-700">
          {icon}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="rounded p-5 bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/30 outline-none"
          sideOffset={5}
        >
          <div className="grid grid-cols-5 gap-2">
            {emojis.map(emoji => (
              <DropdownMenu.Item key={emoji}
                                 className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700"
                                 onClick={() => onUpdateIcon?.(emoji)}>
                {emoji}
              </DropdownMenu.Item>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

const ListTitle: FC<{
  title: string;
  onUpdateTitle?: (title: string) => void;
}> = ({ title, onUpdateTitle }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(title)

  const handleUpdateTitle = () => {
    const newTitle = inputValue.trim()
    if (inputValue !== title) {
      onUpdateTitle?.(newTitle)
    }
    setInputValue(newTitle)
    setIsEditing(false)
  }

  return (
    <div className={clsx(
      'flex items-center rounded-xl h-10 px-2 hover:bg-gray-100 hover:dark:bg-gray-700 font-semibold text-xl truncate',
      isEditing && 'bg-gray-100 dark:bg-gray-700 ring-2 ring-indigo-500'
    )} onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <form onSubmit={handleUpdateTitle} onBlur={handleUpdateTitle}>
          <input
            className="bg-transparent dark:text-gray-300 focus:outline-none"
            type="text"
            value={inputValue}
            autoFocus
            onChange={e => setInputValue(e.target.value)}
          />
        </form>
      ) : <span className="truncate">{title}</span>}
    </div>
  )
}

const ShareDialog: FC<PropsWithChildren<{
  document: ListDocument;
}>> = ({ children, document }) => {
  const session = useSession()
  const [publicKey, setPublicKey] = React.useState('')
  const [allowedClientKeys, setAllowedClientKeys] = React.useState<string[]>(document.header.allowedClients.map(client => client.base58))
  const isValidPublicKey = React.useMemo(() => {
    try {
      return validatePublicKey(base58.decode(publicKey))
    } catch (err) {
      return false
    }
  }, [publicKey])
  if (!session) return null

  const handleAddPublicKey = () => {
    if (!isValidPublicKey) return
    setAllowedClientKeys(Array.from(new Set([...allowedClientKeys, publicKey])))
    setPublicKey('')
  }

  const handleRemovePublicKey = (key: string) => {
    setAllowedClientKeys(allowedClientKeys.filter(k => k !== key))
  }

  const handleSave = () => {
    const header = document.header.update(
      {
        allowedClientKeys
      },
      session.privateKey,
    )
    document.updateHeader(header)
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50"/>
        <Dialog.Content
          className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-6 w-full max-w-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-lg font-semibold text-gray-800 dark:text-gray-200">Share List</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-400">Share this list with others and
            collaborate.</Dialog.Description>
          <div className="flex flex-col gap-4 mt-4">
            <ul className="flex flex-col gap-2 mt-4">
              {allowedClientKeys.map(key => (
                <li className="flex h-8"
                    key={key}>
                  <span
                    className="flex-grow bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 px-2 rounded-md rounded-r-none text-sm font-medium flex items-center">{key}</span>
                  <button
                    className="p-2 rounded-md rounded-l-none bg-red-500 text-white font-semibold disabled:opacity-50"
                    onClick={() => handleRemovePublicKey(key)}>
                    <RemoveUserIcon/>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex h-8">
              <input
                className="flex-grow bg-gray-100 dark:bg-gray-700 px-2 rounded-md rounded-r-none text-sm font-medium text-gray-600 dark:text-gray-200"
                type="text"
                placeholder="Public Key"
                value={publicKey}
                onChange={e => setPublicKey(e.target.value.trim())}/>
              <button className="p-2 rounded-md rounded-l-none bg-blue-500 text-white font-semibold disabled:opacity-50"
                      onClick={handleAddPublicKey}
                      disabled={!isValidPublicKey}>
                <AddUserIcon/>
              </button>
            </div>
          </div>
          <div className="flex gap-4 mt-4 justify-end">
            <Dialog.Close asChild>
              <button
                className="px-4 h-10 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 font-semibold mt-4">Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild onClick={handleSave}>
              <button className="px-4 h-10 rounded-md bg-blue-500 text-white font-semibold mt-4">Save</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export const ListContainer: FC<{ list: ListDocument }> = ({ list }) => {
  const { icon, title, tasks, addTask, toggleTask, setIcon, setTitle } = useList(list)

  const [open, setOpen] = React.useState(true)

  const [tasksDone, tasksUndone,] = useMemo(() => tasks.reduce((acc, task) => {
    if (task.checked) {
      return [[...acc[0], task], acc[1]]
    } else {
      return [acc[0], [...acc[1], task]]
    }
  }, [[], []] as [typeof tasks, typeof tasks]), [tasks])

  return (
    <div
      className="flex flex-col w-full h-full py-2 sm:py-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-gray-600 dark:text-gray-200 gap-4">
      <div className="flex items-center gap-2 px-2 sm:px-6">
        <ListIcon icon={icon} onUpdateIcon={setIcon}/>
        <ListTitle title={title} onUpdateTitle={setTitle}/>
        <div className="flex-grow"/>
        <ShareDialog document={list}>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 hover:dark:bg-gray-700 active:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:dark:bg-gray-700">
            <AddUserIcon className="w-6 h-6"/>
          </button>
        </ShareDialog>
      </div>
      <div className="flex-1 overflow-y-auto px-2 sm:px-6">
        <Collapsible.Root open={open} onOpenChange={setOpen} className="flex flex-col gap-4">
          <div className="flex gap-1 flex-col">
            {tasksUndone.map(task => (
              <Task key={task.id} {...task} onToggleTask={toggleTask}/>
            ))}
          </div>
          {tasksDone.length > 0 && (
            <>
              <Collapsible.Trigger asChild>
                <button
                  className={clsx(
                    'flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer truncate',
                    'text-xl sm:text-base'
                  )}>
                  <ChevronRightIcon className={clsx(
                    'transform transition-transform flex-shrink-0 w-7 h-7',
                    open && 'rotate-90'
                  )}/>
                  <span className="font-medium truncate">Completed</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-600 rounded-full px-2 py-0.5">
                    {tasksDone.length}
                  </span>
                </button>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <div className="flex gap-1 flex-col">
                  {tasksDone.map(task => (
                    <Task key={task.id} {...task} onToggleTask={toggleTask}/>
                  ))}
                </div>
              </Collapsible.Content>
            </>
          )}
        </Collapsible.Root>
      </div>
      <div className="px-2 sm:px-6">
        <NewTaskInput onAddTask={addTask}/>
      </div>
    </div>
  )
}
