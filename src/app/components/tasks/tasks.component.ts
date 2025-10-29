import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class Tasks {
  tasks$: Observable<Task[]>;

  newTitle: string = '';
  newDue: string = '';
  newNotes: string = '';

  constructor(private readonly taskService: TaskService) {
    // on récupère l'observable exposée par le service
    this.tasks$ = this.taskService.tasks$;
  }

  addTask() {
    const title = (this.newTitle || '').trim();
    if (!title) return;

    // correspond à la signature add(title: string, due?: string, notes?: string)
    this.taskService.add(title, this.newDue || undefined, this.newNotes || undefined);

    // reset des champs
    this.newTitle = '';
    this.newDue = '';
    this.newNotes = '';
  }

  toggleTask(id: string) {
    this.taskService.toggle(id);
  }

  removeTask(id: string) {
    this.taskService.remove(id);
  }

  clearDoneTasks() {
    this.taskService.clearDone();
  }
}
