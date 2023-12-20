
// import { Component, Inject } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Applyforjob } from '../applyforjob';
// import { Services } from '../services';
 
// @Component({
//   selector: 'app-applyforjob',
//   templateUrl: './applyforjob.component.html',
//   styleUrls: ['./applyforjob.component.css']
// })
// export class ApplyforjobComponent {
  
  
//   // formValue!:FormGroup;
//   JobGroup=new FormGroup({
//     jobSeekerId: new FormControl ("",Validators.required),
//     jobId: new FormControl ("",Validators.required),
//     resume: new FormControl ("",Validators.required),
    
//   });
//   selectedFile: File | null = null;
//   fileName : any;
  
 
//   onFileSelected(event: Event): void {
 
//     const inputElement = event.target as HTMLInputElement;
//     if (inputElement.files && inputElement.files.length > 0)
//     {
//       this.selectedFile = inputElement.files[0];
 
//       //const fileName = this.selectedFile.name;
//       const fullPath = this.selectedFile.name;
//       const startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
//       this.fileName = fullPath.substring(startIndex);
//       console.log(this.fileName);
 
//     }
//   }
//   resumeName=this.onFileSelected;
 
// constructor(private  service:Services,private formBuilder:FormBuilder,private router:Router,@Inject(Services) private srvc:any,@Inject(Router) private rt:any){}
 
// postData():void
// {
//   const JobData = {
//     jobSeekerId:this.JobGroup.value.jobSeekerId,
//     jobId:this.JobGroup.value.jobId,
//     resume:this.fileName
 
 
//   };
//   console.log(JobData);
 
//   this.srvc.postData(JobData).subscribe(
//     (res:any)=>{
//        alert('Data Successfully Added!')
//         this.JobGroup.reset();
//        this.rt.navigateByUrl("welcomejobseeker");
//     },
//     (err:any)=>{
//       alert(JSON.stringify(err));
//     }
//   );
// }
// jobApply:Applyforjob=new Applyforjob();

// onSubmit()
// {
//   this.router.navigate(['/welcomejobseeker']);
// }
 
// }
 
 
// import { Component, Inject } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Services } from '../services';

// @Component({
//   selector: 'app-applyforjob',
//   templateUrl: './applyforjob.component.html',
//   styleUrls: ['./applyforjob.component.css']
// })
// export class ApplyforjobComponent {
//   JobGroup: FormGroup;
//   selectedFile: File | null = null;
//   fileName: any;
//   jobId: number | undefined;

//   constructor(
//     private service: Services,
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private route: ActivatedRoute,
//     @Inject(Services) private srvc: any,
//   ) {
//     this.JobGroup = this.formBuilder.group({
//       jobSeekerId: ["", Validators.required],
//       jobId: ["", Validators.required],
//       resume: ["", Validators.required],
//     });
//   }

//   ngOnInit() {
//     // Retrieve the jobId from the route parameters
//     this.route.params.subscribe(params => {
//       this.jobId = +params['jobId']; // Convert to number if needed
//       this.JobGroup.get('jobId')?.setValue(this.jobId);
//     });
//   }

//   onFileSelected(event: Event): void {
//     const inputElement = event.target as HTMLInputElement;
//     if (inputElement.files && inputElement.files.length > 0) {
//       this.selectedFile = inputElement.files[0];

//       const fullPath = this.selectedFile.name;
//       const startIndex = fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/');
//       this.fileName = fullPath.substring(startIndex);
//       console.log(this.fileName);
//     }
//   }

//   postData(): void {
//     const JobData = {
//       jobSeekerId: this.JobGroup.value.jobSeekerId,
//       jobId: this.JobGroup.value.jobId,
//       resume: this.fileName
//     };

//     console.log(JobData);

//     this.srvc.postData(JobData).subscribe(
//       (res: any) => {
//         alert('Data Successfully Added!');
//         this.JobGroup.reset();
//         this.router.navigateByUrl("welcomejobseeker");
//       },
//       (err: any) => {
//         alert(JSON.stringify(err));
//       }
//     );
//   }

//   onSubmit() {
//     this.router.navigate(['/welcomejobseeker']);
//   }
// }


import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '../services';
import { AuthService } from '../auth.service'; 
import { ApplicationStatusService } from '../application-status.service';

@Component({
  selector: 'app-applyforjob',
  templateUrl: './applyforjob.component.html',
  styleUrls: ['./applyforjob.component.css']
})
export class ApplyforjobComponent {
  JobGroup: FormGroup;
  selectedFile: File | null = null;
  fileName: any;
  jobId: number | undefined;
  

  constructor(
    private service: Services,
    private authService: AuthService, // Inject the AuthService
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(Services) private srvc: any,
   private applicationStatusService: ApplicationStatusService,
  ) {
    this.JobGroup = this.formBuilder.group({
      jobSeekerId: [this.authService.currentUserValue.jobSeekerId, Validators.required], // Fetch job seeker ID from AuthService
      jobId: ["", Validators.required],
      resume: ["", Validators.required],
      
    });
   
  }

  ngOnInit() {
    // Retrieve the jobId from the route parameters
    this.route.params.subscribe(params => {
      this.jobId = +params['jobId']; // Convert to number if needed
      this.JobGroup.get('jobId')?.setValue(this.jobId);
    });
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];

      const fullPath = this.selectedFile.name;
      const startIndex = fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/');
      this.fileName = fullPath.substring(startIndex);
      console.log(this.fileName);
    }
  }

  // postData(): void {
  //   this.applicationStatusService.updateStatus('applied');
  //   const JobData = {
  //     jobSeekerId: this.JobGroup.value.jobSeekerId,
  //     jobId: this.JobGroup.value.jobId,
  //     resume: this.fileName,
      
      
  //   };

  //   console.log(JobData);

  //   this.srvc.postData(JobData).subscribe(
  //     (res: any) => {
  //       alert('Data Successfully Added!');
  //       this.JobGroup.reset();
  //       this.router.navigateByUrl("jobopenings");
  //     },
  //     (err: any) => {
  //       alert(JSON.stringify(err));
  //     }
  //   );
  // }

  postData(): void {
    const jobIdNumber: number = +this.JobGroup.value.jobId;
  
  this.applicationStatusService.updateStatus(jobIdNumber);
  
    // const JobData = {
    //   jobSeekerId: this.JobGroup.value.jobSeekerId,
    //   jobId: this.JobGroup.value.jobId,
    //   resume: this.fileName
    // };
  
    // console.log(JobData);
  
    // this.srvc.postData(JobData).subscribe(
    //   (res: any) => {
    //     alert('Data Successfully Added!');
    //     this.JobGroup.reset();
    //     this.applicationStatusService.updateStatus('applied');
    //     this.router.navigateByUrl("jobopenings");
    //   },
    //   (err: any) => {
    //     alert(JSON.stringify(err));
    //   }
    // );
  // }
  const JobData = {
    jobSeekerId: this.JobGroup.value.jobSeekerId,
    jobId: jobIdNumber, // Use the jobIdNumber here
    resume: this.fileName,
  };

  console.log(JobData);

  this.srvc.postData(JobData).subscribe(
    (res: any) => {
      alert('Data Successfully Added!');
      this.JobGroup.reset();
      this.router.navigateByUrl("jobopenings");
    },
    (err: any) => {
      alert(JSON.stringify(err));
    }
  );
}
  

  onSubmit() {
    this.router.navigate(['/welcomejobseeker']);
  }
}

