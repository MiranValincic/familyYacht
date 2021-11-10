// loader
import {
  initSlideInterval
} from "./slide.js"
const loader = document.querySelector("#anchor");
const main = document.querySelector(".main");


function init() {
    setTimeout(() => {
      anchor.style.opacity = 0;
      loader.style.display = "none"
     
      main.style.display = "block";
      setTimeout( () => {
        main.style.opacity = 1;
             initSlideInterval()
      } , 50)
     }, 4000);
  
   }

init();

