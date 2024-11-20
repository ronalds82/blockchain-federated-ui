import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenDetails } from '../models/token.model';
import { baseUrl } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private http: HttpClient) {}

  getTokens(hospitalId: number): Observable<TokenDetails> {
    return this.http.get<TokenDetails>(`${baseUrl}/tokens/${hospitalId}`);
  }
}
