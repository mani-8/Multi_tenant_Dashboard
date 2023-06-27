const body = document.querySelector("body"),
toggle = body.querySelector(".toggle"),
sidebar = body.querySelector(".sidebar"),
modeSwitch = body.querySelector(".toggle-switch"),
searchBtn= body.querySelector(".search-box"),
modeText = body.querySelector(".mode-text");

    modeSwitch.addEventListener("click" , () =>{
        body.classList.toggle("dark");
       
    });
