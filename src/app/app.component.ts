import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataStorageService) {}

  ngOnInit() {
    this.dataService.fetchAll().subscribe();
  }
}
