import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '@/services/app.service';
import { FileUploadService } from '@/services/file-upload.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader!: ElementRef;

  loading: boolean = false;
  file!: File;

  // Inject service
  constructor(
    private appService: AppService,
    private fileUploadService: FileUploadService
    ) { }

    ngOnInit(): void { }

    // On file Select
    onChange(event: any) {
      this.file = event.target.files[0];
      this.loading = !this.loading;
      this.fileUploadService.upload(this.file).subscribe({
        next: (response: any) => {
          console.log('response ===> ', response);
          this.loading = false; // Flag variable
          this.appService.fileUploaded({ id: response.id, content: response.content });
          this.fileUploader.nativeElement.value = '';
        },
        error: (error: any) => {
          this.loading = false; // Flag variable
        },
        complete: () => console.info('complete')
      });
    }
  }
