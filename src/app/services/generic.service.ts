import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../environment/httpOptions';
import { environment } from '../environment/environment';
import { baseId } from '../models/baseId';

@Injectable({
  providedIn: 'root'
})

export class GenericService<T>
{
  private readonly apiUrl: string;

  constructor(private http: HttpClient /*@Inject('path') private path: string*/)
  {
    this.apiUrl = `${environment.apiUrl}`;
  }

  getAll(url:string): Observable<T[]>
  {
    return this.http.get<T[]>(`${this.apiUrl}${url}`);
  }

  getById(url:string, id: number): Observable<T>
  {
    return this.http.get<T>(`${this.apiUrl}${url}/${id}`);
  }

  create(url:string, item: T): Observable<void>
  {
    return this.http.post<void>(`${this.apiUrl}${url}`, item, httpOptions);
  }

  update(url:string, item: T): Observable<void>
  {
    return this.http.put<void>(`${this.apiUrl}${url}/${(item as baseId).id}`, item, httpOptions);
  }

  delete(url:string, id: number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiUrl}${url}/${id}`);
  }
}