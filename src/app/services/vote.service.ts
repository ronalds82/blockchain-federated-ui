import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment';
import { SuccessResponse } from '../models/success-response.model';
import { VoteValue } from '../enums/vote-value.enum';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor(private http: HttpClient) {}

  submitVote(data: VoteValue): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${baseUrl}/vote`, data);
  }
}
