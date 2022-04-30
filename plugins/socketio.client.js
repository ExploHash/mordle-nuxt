import { defineNuxtPlugin } from "#app";
import { io } from "socket.io-client";


export default defineNuxtPlugin((nuxtApp) => {
  const socket = io(window.location.hostname + ":6969");
  socketInstance = socket;
  socket.on("connect", () => {
    if (localStorage.getItem("nickname") && localStorage.getItem("identifier")) {
      console.log("Emiting register") 
      socket.emit("register", {
        nickname: localStorage.getItem("nickname"),
        identifier: localStorage.getItem("identifier")
      }, (response) => {
        console.log("Registred yay");
        console.log(drainQueue);
        console.log(queue)
        queue.forEach((args) => {
          console.log("drain");
          socket.emit(...args);
        });
      });
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

const registered = false;
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