import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Output() statusChange = new EventEmitter<string>();

  selectedStatus = 'all';

  filterByStatus(status: string) {
    this.selectedStatus = status;
    this.statusChange.emit(status);
  }
}