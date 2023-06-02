import { defineNuxtPlugin } from "#app";
import { io } from "socket.io-client";


export default defineNuxtPlugin((nuxtApp) => {
  const socket = io("https://api.mordle.nykaworks.com", {
    secure: true,
  });
  
  socketInstance = socket;

  socket.on("connect", () => {
    console.log("IDDDDDD", socket.id);
    console.log("IBBBBBB", socket.id);
    if (localStorage.getItem("nickname") && localStorage.getItem("identifier")) {
      console.log("Emiting register") 
      socket.emit("register", {
        nickname: localStorage.getItem("nickname"),
        identifier: localStorage.getItem("identifier")
      }, (response) => {
        console.log("Registred yay");
        console.log(drainQueue);
        console.log(queue)
        registered = true;
        queue.forEach((args) => {
          console.log("drain");
          socket.emit(...args);
        });
      });
    }else{
      registered = true;
    }
  })

  return {
    provide: {
      socket: socket,
      socket2: {
        emit: (...args) => {
          emit(...args);
        }
      } 
    }
  }
});

let registered = false;
let socketInstance;
const queue = [];

function emit(...args){
  console.log("Emmitted")
  console.log(args);
  console.log(registered);
  if(!registered){
    queue.push(args)
    console.log(queue);
  }else{
    socketInstance.emit(...args);
  }
}

function drainQueue(){
  console.log("drainQueue", queue.length);
  
}