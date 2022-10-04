import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  currentEditor = this.socket.fromEvent<any>('editor');

  constructor(private socket: Socket) { }

  updateDelta(id: string, delta: any) {
    this.socket.emit('updateDelta', { id, delta });
  }

}
