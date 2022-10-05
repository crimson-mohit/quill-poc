import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '@/services/app.service';
import { DocumentsService } from '@/services/documents.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader!: ElementRef;

  loading: boolean = false;
  file!: File;

  constructor(private _appService: AppService, private _documentsService: DocumentsService) { }

  ngOnInit(): void { }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.loading = !this.loading;
    this._documentsService.uploadDocument(this.file).subscribe({
      next: (response: any) => {
        this.loading = false;
        this._appService.fileUploaded({ id: response.id });
        this.fileUploader.nativeElement.value = '';
      },
      error: (error: any) => {
        this.loading = false;
      },
      complete: () => console.info('complete')
    });
  }
}
