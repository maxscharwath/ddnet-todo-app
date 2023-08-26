import { client } from '../store.ts'
import { useEffect, useState } from 'react'
import { type Document } from '@describble/ddnet'
import { TaskProps } from '../Task.tsx'
import { waitLoggedIn } from './UseSession.ts'

export type ListDocumentData = {
  icon: string;
  title: string;
  tasks: TaskProps[];
}

export type ListDocument = Document<ListDocumentData>;

async function fetchDocuments() {
  await waitLoggedIn();
  return client.listDocumentIds();
}

export const useLists = () => {
  const [documents, setDocuments] = useState<ListDocument[]>([]);
  const updateDocuments = (docs: ListDocument[]) => {
    setDocuments(state => Array.from(new Set([...state, ...docs])));
  }
  useEffect(() => {
    const unsub = client.on('document-added', (doc) => {
      updateDocuments([doc as unknown as ListDocument]);
    })

    fetchDocuments().then(lists =>
      lists.map(async (id) =>
        updateDocuments([await client.requestDocument<ListDocumentData>(id)])))

    return unsub;
  }, []);

  useEffect(() => {
    return client.on('document-destroyed', (doc) => {
      setDocuments(state => state.filter(d => d.id !== doc.id));
    })
  }, []);

  return {
    lists: documents,
    createList() {
      const document = client.createDocument<ListDocumentData>();
      document.change((doc) => {
        doc.icon = '📝';
        doc.title = 'Untitled';
        doc.tasks = [];
      });
      return document;
    },
    deleteList(document: ListDocument) {
      return client.removeDocument(document.id);
    },
  }
}

