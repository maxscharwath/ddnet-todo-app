import React, { FC } from 'react'
import { clsx } from 'clsx'
import * as Checkbox from '@radix-ui/react-checkbox'

export interface TaskProps {
  id: string;
  text: string;
  checked?: boolean;
}

interface TaskEventsProps {
  onToggleTask?: (id: string, checked: boolean) => void;
}

export const Task: FC<TaskProps & TaskEventsProps> = ({ id, text, checked, onToggleTask }) => (
  <label className={clsx(
    'flex items-center p-3 rounded-md cursor-pointer bg-gray-100/50 dark:bg-gray-900/50',
    'hover:bg-gray-100 dark:hover:bg-gray-900',
    'focus-within:bg-gray-100 dark:focus-within:bg-gray-900'
  )}>
    <Checkbox.Root
      className={clsx(
        'flex-shrink-0 self-start',
        'flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 dark:border-gray-500 rounded-full',
        'radix-state-checked:bg-green-500 radix-state-checked:border-green-500',
        'focus:outline-none'
      )}
      checked={checked}
      onCheckedChange={e => onToggleTask?.(id, e === true)}
    >
      <Checkbox.Indicator asChild>
        <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
             fill="currentColor">
          <path fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"/>
        </svg>
      </Checkbox.Indicator>
    </Checkbox.Root>
    <span className={clsx(
      'ml-4 text-sm',
      checked && 'line-through text-gray-400 dark:text-gray-500'
    )}>{text}</span>
  </label>
)
