

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterviewStatusService {
  private interviewStatusMap = new Map<string, boolean>(); // Map to store status for each jobSeekerId

  private isInterviewScheduledSource = new BehaviorSubject<boolean>(false);
  isInterviewScheduled$ = this.isInterviewScheduledSource.asObservable();

  setInterviewScheduledStatus(jobSeekerId: string, status: boolean) {
    this.interviewStatusMap.set(jobSeekerId, status);
    this.isInterviewScheduledSource.next(status);
  }

  getInterviewScheduledStatus(jobSeekerId: string): boolean {
    return this.interviewStatusMap.get(jobSeekerId) || false;
  }
}
