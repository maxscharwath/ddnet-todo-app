import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { SignalingServer, WebSocketNetwork } from '@describble/ddnet/node'


const startSignalingServerPlugin = ():Plugin  => {
  return {
    name: 'start-signaling-server',
    apply: 'serve',
    configureServer(server) {
      const sigServer = new SignalingServer({
        network: new WebSocketNetwork({
          host: '0.0.0.0',
          port: 8080,
        }),
      });

      sigServer.listen().then(() => {
        console.log('Signaling server listening on port 8080');
      });
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasm(), topLevelAwait(), startSignalingServerPlugin()],
})
