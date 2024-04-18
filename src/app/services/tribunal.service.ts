import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tribunal } from '../models/tribunal';

@Injectable({
  providedIn: 'root'
})
export class TribunalService {

  public host: string = environment.apiUrl;

  constructor(private http:HttpClient) {}

  listTribunal(): Observable<Tribunal[]> {
    return this.http.get<Tribunal[]>(`${this.host}/Tribunal/retrieve-all-tribunaux`);
  }

  addTribunal(tribunal: Tribunal): Observable<Tribunal> {
    const url = `${this.host}/Tribunal/add-tribunal`;
    return this.http.post<Tribunal>(url, tribunal);
  }

  
}
