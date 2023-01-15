import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Item {
  itemName: string;
  itemCategory: string;
  sellIn: number;
  quality: number;
}

@Injectable({
  // This service should be created
  // by the root application injector.
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.post(baseUrl + 'inventory/init', '').subscribe();
  }

  loadInventory(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl + 'inventory/current');
  }

  loadTrash(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl + 'inventory/trash');
  }

  nextDay(): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'inventory/nextday', '');
  }
}
