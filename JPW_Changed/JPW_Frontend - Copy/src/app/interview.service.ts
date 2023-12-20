// interview.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private http: HttpClient) { }

  addInterview(interviewData: any): Observable<any> {
    // Assuming your API endpoint is '/api/interviews/schedule'
    return this.http.post('/api/interviews/schedule', interviewData);
  }

  getInterviews() {
    // Implement logic to get interviews if needed
    
    return [];
  }
}
