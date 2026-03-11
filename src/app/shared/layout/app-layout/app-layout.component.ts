import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app-layout.component.html',
})

export class AppLayoutComponent {

  constructor() {}

  get containerClasses() {
    return [
      'flex-1',
      'transition-all',
      'duration-300',
      'ease-in-out',
    ];
  }

}
