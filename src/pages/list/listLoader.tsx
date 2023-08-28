import { defer, LoaderFunction } from 'react-router-dom'
import { waitLoggedIn } from '../../hooks/UseSession.ts'
import { client } from '../../store.ts'

export const listLoader: LoaderFunction = async ({ params: { documentId } }) => {
  if (!documentId) throw new Response('Missing listId parameter', { status: 400 })
  await waitLoggedIn()
  const document = client.requestDocument(documentId).catch((reason) => {
    throw new Response('List not found', { status: 404, statusText: reason })
  })
  return defer({ document })
}
