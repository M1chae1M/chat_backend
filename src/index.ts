import express from 'express';
import http from 'http';
import WebSocket from 'ws';

import {json} from 'body-parser'
import cors from 'cors'
import {config} from 'dotenv'

export function headers(req, res, next){
    // const {frontend_adres}=process.env
    const frontend_adres='http://localhost:3000/'

    res.header('Access-Control-Allow-Origin', frontend_adres);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}


const app = express();




const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


app.use(headers)
app.use(json())
app.use(cors({ origin:true, credentials: true }))
config()

wss.on('connection', (ws: WebSocket) => {
  console.log('Nowe połączenie WebSocket.');
  ws.on('message', (message:string) => {


    console.log(
      JSON.parse(`${message}`)
    )
    ws.send(`${message}`);
  });
  ws.on('close', () => {
    console.log('Połączenie WebSocket zamknięte.');
  });
});

app.get('/', (req, res)=>res.send('Serwer działa!'));

const PORT = process.env.PORT || 8080;

server.listen(PORT, ()=>console.log(`Serwer HTTP i WebSocket uruchomiony na porcie ${PORT}`))