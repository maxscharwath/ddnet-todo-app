import React, { FC, useState } from 'react'
import { clsx } from 'clsx'
import { PlusIcon } from './icons'

export const NewTaskInput: FC<{ onAddTask?: (text: string) => void }> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (inputValue.trim()) {
      onAddTask?.(inputValue.trim())
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className={clsx(
        'flex items-center w-full p-3 text-sm font-medium rounded cursor-pointer bg-gray-100/50 dark:bg-gray-900/50',
        'hover:bg-gray-100 dark:hover:bg-gray-900',
        'focus-within:ring-2 focus-within:ring-indigo-500',
        'text-xl sm:text-base',
      )}>
        <PlusIcon className="w-7 h-7 text-gray-500 dark:text-gray-400 flex-shrink-0"/>
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="flex-grow h-8 ml-4 bg-transparent dark:bg-transparent dark:text-gray-300 focus:outline-none truncate"
          type="text"
          placeholder="add a new task"
        />
      </label>
    </form>
  )
}
