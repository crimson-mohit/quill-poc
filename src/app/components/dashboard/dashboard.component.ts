import { Component, OnInit } from '@angular/core';
import { Subscription, Subject, debounceTime } from 'rxjs';

import { AppService } from '@/services/app.service';
import { DocumentsService } from '@/services/documents.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  _fileUploadedEvent: Subscription = new Subscription;
  documents: any[] = [];

  constructor(private _appService: AppService, private _documentsService: DocumentsService) { }

  ngOnInit(): void {
    this._fileUploadedEvent = this._appService.fileUploadedEvent.subscribe((data: any) => {
      this.documents.push(data.id);
    });

    this.getListOfDocuments();
  }

  getListOfDocuments() {
    this._documentsService.getListOfDocumentsRequest().subscribe((response: any) => {
      this.documents = response.data;
    });
  }

  deleteDocument(documentId: string) {
    this._documentsService.deleteDocumentRequest({ id: documentId }).subscribe((response: any) => {
      if(response.status) {
        this.getListOfDocuments();
      }
    });
  }

}
