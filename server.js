const express = require('express');
const massive = require('massive');
const router = require('./routes');
const HOST = '127.0.0.1';
const PORT = 1234;
const MPORT = 5432;
  massive({
    host: HOST,
    port: MPORT,
    database: 'node4db',
    user: 'postgres',
    password: 'node4db'
 }).then((db)=>{
     const app = express();
     app.set('db',db);
     app.use(express.json());
     app.use("/api",router); 
     app.listen(PORT,HOST,()=>console.log(`Server running hot on ${HOST}:${PORT}`))
 })

