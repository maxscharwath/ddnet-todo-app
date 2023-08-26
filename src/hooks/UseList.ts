import { useEffect, useMemo, useState } from 'react'
import { ListDocument, ListDocumentData } from './UseLists.ts'
import { client } from '../store.ts'

export const useList = (document: ListDocument) => {
  const [list, setList] = useState<ListDocumentData>(document.data)
  useEffect(() => {
    return document.on('change', ({data}) => {
      setList({...data})
    })
  }, [document])

  const totalTasks = useMemo(() => list.tasks?.length ?? 0, [list.tasks])
  const completedTasks = useMemo(() => list.tasks?.filter((t) => t.checked).length ?? 0, [list.tasks])

  return {
    icon: list.icon ?? '📝',
    title: list.title ?? 'Untitled',
    tasks: list.tasks ?? [],
    totalTasks,
    completedTasks,
    setIcon(icon: string) {
      document.change((doc) => {
        doc.icon = icon;
      })
    },
    setTitle(title: string) {
      document.change((doc) => {
        doc.title = title;
      })
    },
    addTask(text: string) {
      document.change((doc) => {
        doc.tasks ??= []
        doc.tasks.push({
          id: crypto.randomUUID(),
          text,
        })
      })
    },
    deleteList() {
      void client.removeDocument(document.id);
    },
    removeTask(taskId: string) {
      document.change((doc) => {
        const index = doc.tasks.findIndex((t) => t.id === taskId);
        if (index !== -1) {
          doc.tasks.splice(index, 1);
        }
      })
    },
    toggleTask(taskId: string) {
      document.change((doc) => {
        const task = doc.tasks.find((t) => t.id === taskId);
        if (task) {
          task.checked = !task.checked;
        }
      })
    }
  }
}
