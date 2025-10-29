import { Component } from '@angular/core';
import { Tasks } from './components/tasks/tasks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Tasks],
  template: `<app-tasks></app-tasks>`,
  styleUrls: ['./app.css']
})
export class App {}
