import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() navigateTo = new EventEmitter<string>();
  showDropdown = false;

  onNavigateTo(link: string) {
    this.navigateTo.emit(link);
  }

  onToggleDropdown(e: Event) {
    e.preventDefault();
    this.showDropdown = !this.showDropdown;
  }
}
