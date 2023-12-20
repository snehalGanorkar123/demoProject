
import { InterviewService } from '../interview.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { InterviewStatusService } from '../interview-status.service';

// ... (other imports)

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css'],
  providers: [InterviewService],
})
export class InterviewComponent implements OnInit {
  jobSeekerId: string | undefined;
  interviewDate: Date = new Date(); // Initialize with the current date
  interviewTime: string = ''; // Initialize with an empty string
  interviewLocation: string = '';
  minInterviewDate: string | undefined;
  minInterviewTime: string | undefined;
  maxInterviewTime: string | undefined;
  isInterviewScheduled: boolean = false;
  jobId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private interviewStatusService: InterviewStatusService,
    private interviewService: InterviewService // Inject InterviewService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobSeekerId = params['jobSeekerId'];
      this.jobId = params['jobId'];

      console.log('Job Seeker ID:', this.jobSeekerId);
      console.log('Job ID:', this.jobId);
    });

    // Set minInterviewDate to the current date in "YYYY-MM-DD" format
    this.minInterviewDate = this.formatDate(new Date());

    // Set minInterviewTime to 09:00 and maxInterviewTime to 18:00
    this.minInterviewTime = '09:00';
    this.maxInterviewTime = '18:00';
  }

  submitInterview(): void {
    // Check if the interview date is not a backdate
    const currentDate = new Date();
    if (this.interviewDate && this.interviewDate < currentDate) {
      alert('Please select a future date for the interview.');
      return; // Stop the submission if the date is invalid
    }
  
    // Check if the interview time is between 9 am and 6 pm
    const selectedTime = this.interviewTime!;
    if (!this.isTimeInRange(selectedTime, '09:00', '18:00')) {
      alert('Please select a time between 9 am and 6 pm.');
      return; // Stop the submission if the time is invalid
    }
  
    // Save the interview data using the InterviewService
    const interviewData = {
      jobSeekerId: this.jobSeekerId,
      interviewDate: this.interviewDate,
      interviewTime: this.interviewTime,
      interviewLocation: this.interviewLocation, // Assuming you have added interviewLocation to your form
    };
  
    this.interviewService.addInterview(interviewData);
  
    // Set interview status using InterviewStatusService
    this.interviewStatusService.setInterviewScheduledStatus(this.jobSeekerId!, true);
  
    // Display success message
    alert('Interview scheduled successfully!');
  
    // Navigate to the desired route
    this.router.navigate(['/applicant_list']);
  
    // Log interview details
    console.log('Interview submitted!');
    console.log('Job Seeker ID:', this.jobSeekerId);
    console.log('Interview Date:', this.interviewDate);
    console.log('Interview Time:', this.interviewTime);
  }

  private formatDate(date: Date): string {
    // Format the date as "YYYY-MM-DD"
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  private isTimeInRange(time: string, startTime: string, endTime: string): boolean {
    // Compare the selected time with the specified range
    return time >= startTime && time <= endTime;
  }
}