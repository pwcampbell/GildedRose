import { Component } from '@angular/core';
import { InventoryService, Item } from '../inventory.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public currentItems: Item[] = [];

  constructor(private inv: InventoryService) {
    this.load();
  }

  public load() {
    this.inv.loadInventory().subscribe(result => {
      this.currentItems = result;
    });
  }
}
