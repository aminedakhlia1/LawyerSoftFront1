import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Affaire } from '../models/affaire';

@Injectable({
  providedIn: 'root'
})
export class AffaireService {

  public host: string = environment.apiUrl;

  constructor(private http:HttpClient) {}

  listAffaire(): Observable<Affaire[]> {
    return this.http.get<Affaire[]>(`${this.host}/Affaire/retrieve-all-affaires`);
  }

  addAffaire(affaire: Affaire): Observable<Affaire> {
    const url = `${this.host}/Affaire/add-affaire`;
    return this.http.post<Affaire>(url, affaire);
  }

  removeAffaire(idAffaire: number): Observable<void> {
    const url = `${this.host}/Affaire/remove-affaire/${idAffaire}`;
    return this.http.delete<void>(url);
  }

  retrieveAffaire(idAffaire: number): Observable<Affaire> {
    const url = `${this.host}/Affaire/retrieve-affaire/${idAffaire}`;
    return this.http.get<Affaire>(url);
  }

  updateAffaire(affaire: Affaire): Observable<Affaire> {
    const url = `${this.host}/Affaire/update-affaire`;
    return this.http.put<Affaire>(url, affaire);
  }

  




}
