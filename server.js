
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000 ;
const fs = require('fs');
const wiki = require('wikipedia');
app.use(express.static(__dirname));


io.on('connection' , socket=>{
// console.log('user connected');
var asuh;
 fs.readFile("ashu.txt" , "utf-8" , (err,data)=>{
 asuh = JSON.parse(data);
//  console.log(data);
 
  })
socket.on('wiki_search' , (key)=>{
  (async () => {
    try {
      const page = await wiki.page(key);
      console.log(page);
           const intro = await page.intro();
          console.log(intro);
          socket.emit('serch_result' , intro);
    } catch (error) {
      console.log(error);
      
    }
  })();
})
socket.on("qution", (obj)=>{
  console.log('obj');
  socket.emit("files" , asuh);
{ fs.readFile("ashu.txt" , "utf-8" , (err,data)=>{
    console.log('data : '+data);
    let mid = JSON.parse(data);
    mid.push(obj);
    fs.writeFile("ashu.txt" ,JSON.stringify(mid) , (err)=>{
  if (err) {
    console.log('error');
  }
  else{
    console.log('file created..');
    
  }
    } )
  })}
})



// socket.emit("files" , )
})
server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}`);
});