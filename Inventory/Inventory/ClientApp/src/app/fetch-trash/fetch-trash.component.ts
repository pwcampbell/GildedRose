import { Component } from '@angular/core';
import { InventoryService, Item } from '../inventory.service';

@Component({
  selector: 'app-fetch-trash',
  templateUrl: './fetch-trash.component.html'
})
export class FetchTrashComponent {
  public trashItems: Item[] = [];

  constructor(private inv: InventoryService) {
  }

  public load() {
    this.inv.loadTrash().subscribe(result => {
      this.trashItems = result;
    });
  }

}
