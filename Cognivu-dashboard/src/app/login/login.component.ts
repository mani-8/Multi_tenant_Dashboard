import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  userName!: '';
  userPassword!: '';
  errorMessage: string | undefined;
  
public loginForm!: FormGroup

passwordType: string='password';
passwordShown: boolean=false;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService, 
    private httpclient: HttpClient,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
    //  userName: new FormControl('', [Validators.required],Validators.pattern(''))
    })
  }
  
  working=false;
  ngOnInit() {
    const form = document.querySelector('.login');
    if (!form) {
      return;
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (this.working) return;
      this.working = true;
      const button = form.querySelector('button > .state');
      if (!button) {
        return;
      }
      //alert('1')
      form.classList.add('loading');
      button.innerHTML = 'Authenticating';
      setTimeout(() => {
        // check the authentication result
        //let authenticated = this.authenticate();
       // alert('4')
        this.authenticate();
        //form.classList.add('error');
         // button.innerHTML = 'Wrong credentials';
      // form.classList.add('ok');
        //button.innerHTML = 'Welcome back!';
        setTimeout(() => {
          button.innerHTML = 'Log in';
          form.classList.remove('ok', 'loading');
          this.working = false;
        }, 4000);
      }, 3000);
    });
  }


    authenticate() {
     // our authentication logic here
     const form = document.querySelector('.login');
     if (!form) {
      return;
    }
    const userName = document.querySelector('input[name="userName"]');
    const userPassword = document.querySelector('input[name="userPassword"]');
      
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, userPassword })
      };
      
      return fetch('http://localhost:8026/authenticate', options)
        .then(response => response.json())
        .then(data => {
          //alert('5')
         // alert(JSON.stringify(form.classList.value.endsWith('loading')))
          if (data.status===400 && form.classList.value.endsWith('loading')) {
            const button = form.querySelector('button > .state');
          if (!button) {
             return;
            }
            //alert('wrong status credential')
            form.classList.add('error');
            button.innerHTML = 'Wrong credentials, please try again';
          setTimeout(() => {
            button.innerHTML = 'Log in';
            form.classList.remove('error', 'loading');
            this.working = false;
          }, 4000);
  
            //throw new Error('Authentication failed');
          }else{
          localStorage.setItem('token', data.token);
          return true;
          }
        })
        .catch(error => {
          console.error(error);
          return false;
        });
  }

   
  
  /*
    function authenticate() {
        const userName = document.querySelector('input[name="userName"]').value;
        const userPassword = document.querySelector('input[name="userPassword"]').value;
        
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userName, userPassword })
        };
        
        return fetch('/api/authenticate', options)
          .then(response => response.json())
          .then(data => {
            if (!data.token) {
              throw new Error('Authentication failed');
            }
            localStorage.setItem('token', data.token);
            return true;
          })
          .catch(error => {
            console.error(error);
            return false;
          });
        }*/
  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        //alert('2')
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          const form = document.querySelector('.login');
          if (!form) {
            return;
          }
          const button = form.querySelector('button > .state');
          if (!button) {
             return;
            }
            //alert('3')
          form.classList.add('ok');
          button.innerHTML = 'Welcome to Cognivu';
          setTimeout(() => {
            button.innerHTML = 'Log in';
            form.classList.remove('ok', 'loading','error');
            this.working = false;
           // alert('6')
          this.router.navigate(['/admin']);
        }, 4000);
        } else {
          const form = document.querySelector('.login');
          if (!form) {
            return;
          }
          const button = form.querySelector('button > .state');
          if (!button) {
             return;
            }
          form.classList.add('ok');
          button.innerHTML = 'Welcome to Cognivu';
          setTimeout(() => {
            button.innerHTML = 'Log in';
            form.classList.remove('ok', 'loading','error');
            this.working = false;
          this.router.navigate(['/user']);
        }, 4000);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  }
