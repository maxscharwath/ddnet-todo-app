import React, { FC } from 'react'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
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
    'focus-within:bg-gray-100 dark:focus-within:bg-gray-900',
    'text-xl sm:text-base',
  )}>
    <Checkbox.Root
      className={clsx(
        'flex-shrink-0 self-start',
        'w-7 h-7 sm:w-5 sm:h-5 transition-all',
        'flex items-center justify-center text-transparent border-2 border-gray-300 dark:border-gray-500 rounded-full',
        'transition-colors duration-200 ease-in-out',
        'radix-state-checked:bg-green-500 radix-state-checked:border-green-500',
        'focus:outline-none'
      )}
      checked={checked}
      onCheckedChange={e => onToggleTask?.(id, e === true)}
    >
      <AnimatePresence>
        {checked && (
          <svg
            className="text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              d="M 4.5 11 L 8 14.5 L 16.5 6"
              fill="transparent"
              strokeWidth="3"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </AnimatePresence>
    </Checkbox.Root>
    <span className={clsx(
      'ml-4 overflow-ellipsis overflow-hidden',
      checked && 'line-through text-gray-500 dark:text-gray-600'
    )}>{text}</span>
  </label>
)
