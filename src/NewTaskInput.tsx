import React, { FC, useState } from 'react'
import { clsx } from 'clsx'

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
        "flex items-center w-full h-10 px-2 text-sm font-medium rounded cursor-pointer bg-gray-100/50 dark:bg-gray-900/50",
        "hover:bg-gray-100 dark:hover:bg-gray-900",
        "focus-within:ring-2 focus-within:ring-indigo-500"
      )}>
      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg"
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
      </svg>
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className="flex-grow h-8 ml-4 bg-transparent dark:bg-transparent dark:text-gray-300 focus:outline-none font-medium"
        type="text"
        placeholder="add a new task"
      />
      </label>
    </form>
  )
}
