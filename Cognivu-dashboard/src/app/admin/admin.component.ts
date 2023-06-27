import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { toggleDarkMode } from '../admin/adminComponent.js';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  body: HTMLElement | null = document.querySelector("body")
  toggle: HTMLElement | null = document.body.querySelector(".toggle");
  sidebar: HTMLElement | null = document.querySelector("nav");
  searchBtn: HTMLElement | null = document.querySelector(".search-box");
  modeText: any = document.querySelector(".mode-text");
 
  constructor() { 
    
  }

  
  ngOnInit(){    
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6'],
          datasets: [{
              label: 'VM1',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor:"#0196FD",
              borderColor: "#0196FD",
              borderWidth: 1
          },
          {
            label: 'VM2',
            data: [19, 12, 5, 3, 1, 6],
            backgroundColor:"#FFAF00",
            borderColor: "#FFAF00",
            borderWidth: 1
        }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

    toggleSidebar() {  

      const sidebar = document.querySelector('nav');
      if( sidebar?.classList.value.endsWith('close')){
        sidebar?.classList.remove('close')
      }else{
        sidebar?.classList.add('close')
      }
     /* if (this.toggle && this.sidebar){
      this.toggle.addEventListener("click", ()=>{
        this.sidebar?.classList.toggle("close")
      })
    }*/
    }
  
    openSidebar() {
      const sidebar = document.querySelector('nav');
      sidebar?.classList.remove('close');
    }
   
    toggleDarkMode(){
      const body:any = document.getElementById("light");
     const modeSwitch: any = document.getElementById("mytoggle");
      modeSwitch.addEventListener("click",() =>{
        body.classList.toggle("dark");
      });
    }

}


