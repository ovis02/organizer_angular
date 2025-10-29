import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';

const KEY = 'organizer.tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private _tasks$ = new BehaviorSubject<Task[]>(this.load());
  tasks$ = this._tasks$.asObservable();

  private load(): Task[] {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]') as Task[];
    } catch {
      return [];
    }
  }

  private save(list: Task[]) {
    localStorage.setItem(KEY, JSON.stringify(list));
    this._tasks$.next(list);
  }

  add(title: string, due?: string, notes?: string) {
    const t: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      done: false,
      due,
      notes
    };
    if (!t.title) return;
    this.save([t, ...this._tasks$.value]);
  }

  toggle(id: string) {
    this.save(
      this._tasks$.value.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  }

  remove(id: string) {
    this.save(this._tasks$.value.filter(t => t.id !== id));
  }

  clearDone() {
    this.save(this._tasks$.value.filter(t => !t.done));
  }
}
