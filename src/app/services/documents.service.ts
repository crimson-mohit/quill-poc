import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  baseApiUrl = 'http://localhost:8081';
  currentEditor = this._socket.fromEvent<any>('editor');

  constructor(private _http: HttpClient, private _socket: Socket) { }

  getListOfDocumentsRequest() {
    return this._http.get(`${this.baseApiUrl}/documents`);
  }

  getDocumentByIdRequest(documentId: any) {
    return this._http.post(`${this.baseApiUrl}/documents/getById`, documentId);
  }

  uploadDocument(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this._http.post(`${this.baseApiUrl}/documents/upload`, formData)
  }

  updateDelta(id: string, delta: any) {
    this._socket.emit('document:write', { id, delta });
  }
}
