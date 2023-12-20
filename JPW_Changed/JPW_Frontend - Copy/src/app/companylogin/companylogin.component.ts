import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Services } from '../services';

@Component({
  selector: 'app-companylogin',
  templateUrl: './companylogin.component.html',
  styleUrls: ['./companylogin.component.css']
})
export class CompanyloginComponent {
  loginForm!:FormGroup;
constructor(private http:HttpClient,private service:Services,private formbuilder:FormBuilder,private router:Router){}
ngOnInit():void{
  this.loginForm=this.formbuilder.group({
companyEmail:['',[Validators.required]],
password:['',[Validators.required]]
  })
}
login()
{
  this.http.get<any>("http://localhost:5189/api/Companies").subscribe({
    next:(res)=>{
      const user=res.find((a:any)=>
      {
        return a.companyEmail===this.loginForm.value.companyEmail && a.password===this.loginForm.value.password
      });
      if(user)
      {
        alert("Login Successful");
        this.loginForm.reset();
        this.router.navigate(['/welcomecompany']);
        
      }
else{
        alert("Login Not Successful")
      }
  },
  error:()=>{
    alert("Something is wrong")
  }
})
}

Cancel()
{
  this.router.navigate(['/landing']);
}

}


