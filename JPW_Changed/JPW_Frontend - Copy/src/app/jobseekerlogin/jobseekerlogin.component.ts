// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Services } from '../services';

// @Component({
//   selector: 'app-jobseekerlogin',
//   templateUrl: './jobseekerlogin.component.html',
//   styleUrls: ['./jobseekerlogin.component.css']
// })
// export class JobseekerloginComponent {
//   loginForm!:FormGroup;
//   constructor(private router:Router,private service:Services,private formbuilder:FormBuilder,private http:HttpClient){}
// ngOnInit():void{
//   this.loginForm=this.formbuilder.group({
//     email:['',[Validators.required]],
//     password:['',[Validators.required]]
//   })
// }
// login()
// {
//   this.http.get<any>("http://localhost:5189/api/JobSeekers").subscribe({
//     next:(res)=>{
//       const user=res.find((a:any)=>
//       {
//         return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
//       });
//       if(user)
//       {
//         alert("Login Successful");
//         this.loginForm.reset();
//         this.router.navigate(['/welcomejobseeker']);
        
//       }
// else{
//         alert("Login Not Successful");
//       }
//   },
//   error:()=>{
//     alert("Something is wrong")
//   }
// })
// }

// Cancel()
// {
//   this.router.navigate(['/landing']);
// }

// }

// jobseekerlogin.component.ts

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import the AuthService
import { Services } from '../services';

@Component({
  selector: 'app-jobseekerlogin',
  templateUrl: './jobseekerlogin.component.html',
  styleUrls: ['./jobseekerlogin.component.css'],
})
export class JobseekerloginComponent {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService, // Inject the AuthService
    private formbuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((user) => {
        if (user) {
          alert('Login Successful');
          this.loginForm.reset();
          this.router.navigate(['/jobopenings']);
        } else {
          alert('Login Not Successful');
        }
      });
  }

  Cancel() {
    this.router.navigate(['/landing']);
  }
}

