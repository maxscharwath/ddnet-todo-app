import {
  DocumentSharingClient,
  generatePrivateKey,
  IDBStorageProvider,
  KeyManager,
  SessionManager,
  WebSocketNetworkAdapter
} from '@describble/ddnet'

export const sessionManager = new SessionManager(
  new KeyManager('keys-store'),
)

const networkAdapter = new WebSocketNetworkAdapter('wss://ddnet-server.fly.dev')

export const client = new DocumentSharingClient({
  sessionManager,
  network: networkAdapter,
  storageProvider: new IDBStorageProvider(),
})

async function init () {
  const key = (await sessionManager.listKeys())[0]
  await sessionManager.login(key, 'password123').catch(async () => {
    const { base58PublicKey } = await sessionManager.register(generatePrivateKey(), 'password123')
    console.log(`Registered new key: ${base58PublicKey}`)
    return sessionManager.login(base58PublicKey, 'password123')
  })
    .then(() => console.log('Logged in'))
}

void init()
