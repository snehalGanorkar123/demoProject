import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Services } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewStatusService } from '../interview-status.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css']
})
export class ApplicantListComponent {
  // isInterviewScheduled: boolean = false;
  JobData!: any[];

  constructor(
    private services: Services,
    private router: Router,
    private route: ActivatedRoute,
    private interviewStatusService: InterviewStatusService,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  // isInterviewScheduled(jobSeekerId: string): boolean {
  //   // return this.interviewStatusService.getInterviewScheduledStatus(jobSeekerId);
  // }

  isInterviewScheduled(jobSeekerId: string): boolean {
    return !!this.JobData.find((job) => job.jobSeekerId === jobSeekerId && job.interviewDate && job.interviewTime);
  }  

  navigateToInterview(jobSeekerId: string): void {
    this.router.navigate(['/interview', jobSeekerId]);
  }

  ngOnInit(): void {
    this.getAllData();
  }

  openInterviewForm(job: any): void {
    job.showInterviewForm = !job.showInterviewForm;
  }

  calculateInterviewDateTime(): { interviewDate: string, interviewTime: string } {
    // Add your logic to calculate interview date and time here
    // For example, you can set the interview date to tomorrow and time to 10:00 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const interviewDate = this.formatDate(tomorrow);
    const interviewTime = '10:00';

    return { interviewDate, interviewTime };
  }

  scheduleInterview(job: any): void {
    const { interviewDate, interviewTime } = this.calculateInterviewDateTime();
    job.interviewDate = interviewDate;
    job.interviewTime = interviewTime;
  
    // Update the interview status in JobData
    const index = this.JobData.findIndex((item) => item.jobSeekerId === job.jobSeekerId);
    if (index !== -1) {
      this.JobData[index].interviewDate = interviewDate;
      this.JobData[index].interviewTime = interviewTime;
    }
  
    // Set the interview data in your API or wherever it's stored
    this.services.updateInterviewData(job.jobSeekerId, interviewDate, interviewTime).subscribe({
      next: (res) => {
        console.log('Interview data updated successfully:', res);
  
        // Update the JobData with the new interview information
        this.JobData[index].interviewDate = interviewDate;
        this.JobData[index].interviewTime = interviewTime;

        // Fetch the latest data after scheduling an interview
        this.getAllData();

        // Trigger change detection manually
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.error('Error updating interview data:', err);
      },
    });
  
    this.navigateToInterview(job.jobSeekerId); // Redirect to the interview page
  }
  
  formatDate(date: Date | null): string {
    if (date === null) {
      return 'N/A'; // or any other default value or error handling strategy
    }

    const options = { day: '2-digit', month: '2-digit',  year: 'numeric' };
    return new DatePipe('en-US').transform(date, 'dd-MM-yyy', 'UTC') || 'N/A';
  }

  getAllData() {
    this.services.getpostData().subscribe({
      next: (res) => {
        console.log('Received data from the service:', res);
        this.JobData = res;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });
  }
  
}