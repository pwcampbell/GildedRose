import { Component, OnInit, ViewChild } from '@angular/core';
import { FetchDataComponent } from '../fetch-data/fetch-data.component';
import { FetchTrashComponent } from '../fetch-trash/fetch-trash.component';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  @ViewChild(FetchDataComponent, { static: false }) invTable: FetchDataComponent | undefined;
  @ViewChild(FetchTrashComponent, { static: false }) trashTable: FetchTrashComponent | undefined;
  constructor(private inv: InventoryService) {
  }

  ngOnInit() { }

  public incrementDay() {
    this.inv.nextDay().subscribe(() => {
      this.invTable?.load();
      this.trashTable?.load();
    });
  }
}
