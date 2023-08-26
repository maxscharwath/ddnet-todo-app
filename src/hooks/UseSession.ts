import { useEffect, useState } from 'react'
import { KeySession } from '@describble/ddnet'
import { client, sessionManager } from '../store.ts'

export const useSession = () => {
  const [session, setSession] = useState<KeySession | null>(null)
  useEffect(() => sessionManager.onLogin(setSession), [])
  return session
}

export const waitLoggedIn = async () =>
  new Promise<KeySession>((resolve) => {
    let unsubscribe = () => {}
    unsubscribe = sessionManager.onLogin(async (data) => {
      unsubscribe()
      await client.waitForConnection()
      resolve(data)
    })
  });
