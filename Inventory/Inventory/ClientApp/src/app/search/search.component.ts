import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  http;
  baseUrl;
  public item: Item | undefined;
  searchForm = this.formBuilder.group({
    searchItem: ''
  });

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private formBuilder: FormBuilder) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  public search() {
    this.http.get<Item>(this.baseUrl + 'inventory/item?itemName=' + this.searchForm.value.searchItem).subscribe(result => {
      this.item = result;
    }, error => console.error(error));
  }
}

interface Item {
  itemName: string;
  itemCategory: string;
  sellIn: number;
  quality: number;
}
