import Ws from '@es-labs/esm/ws.js'
const { VITE_WS_URL, VITE_WS_MS } = import.meta.env

export const ws = new Ws({ endpoint: VITE_WS_URL, reconnectMs: VITE_WS_MS }) // ws.setOptions()

// This is just to test Vue provide/inject as well as JS Symbol
// prefer not to use VUe stuff if possible
/*
import { provide, inject } from 'vue'

const WsSymbol = Symbol('WsSymbol')

export function provideWs(ws) {
  console.log('provide ws', ws.endpoint)
  provide(WsSymbol, ws)
}

export function useWs() {
  const ws = inject(WsSymbol)
  if (!ws) throw new Error('no ws found')
  return ws
}

// socket.addEventListener('open', function (event) { // socket.onopen (event)
//     socket.send('Hello Server!');
// });
// // Listen for messages
// socket.addEventListener('message', function (event) { // socket.onmessage (event) // event.data can JSON.parse
//     console.log('Message from server ', event.data);
// });
// socket.send(message) can JSON.stringify
// socket.close()
// socket.onclose

*/
