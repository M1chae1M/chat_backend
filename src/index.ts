// import express from 'express'
// import http from 'http';
// import WebSocket from 'ws';

// const app=express()

// const PORT=3000

// const test:string='test 2'

// app.get('/',(req,res)=>res.json({test}))

// app.listen(PORT,()=>console.log(`działa na porcie ${PORT}`))

// src/index.ts
import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
  console.log('Nowe połączenie WebSocket.');
  ws.on('message', (message: string) => {
    console.log(`Otrzymano wiadomość: ${message}`);
    ws.send(`Odpowiedź na wiadomość: ${message}`);
  });
  ws.on('close', () => {
    console.log('Połączenie WebSocket zamknięte.');
  });
});

// app.get('/', (req, res)=>res.send('Serwer HTTP działa!'));

const PORT = process.env.PORT || 8080;

server.listen(PORT, ()=>console.log(`Serwer HTTP i WebSocket uruchomiony na porcie ${PORT}`))