import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Subscription, Subject, debounceTime } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '@/services/app.service';
import { DocumentsService } from '@/services/documents.service';
import { LoaderService } from "@/services/loader.service";
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  private _editorEvent: Subscription;
  private _currentDocumentId: any = null;
  private _currentDelta = null;
  private _ediotrModelChanged = new Subject();
  private _firstLoad = true;

  quillContent = '';
  htmlStr = '';
  quillModules: any = {
    'toolbar': [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _appService: AppService,
    private _documentsService: DocumentsService,
    private _loaderService: LoaderService,
    private _location: Location,
    private _router: Router) {
    this._ediotrModelChanged
    .pipe(debounceTime(1000))
    .subscribe((value) => {
      console.log('_ediotrModelChanged called ===> ', value);
    });

    this._editorEvent = this._documentsService.currentEditor.subscribe(event => console.log(event));
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this._currentDocumentId = params.get('id');
    });
  }

  getDocumentById(documentId: any) {
    this._documentsService.getDocumentByIdRequest({ id: documentId })
    .subscribe((response: any) => {
      this.quillContent = response.data;
    });
  }

  ngOnDestroy() {
    this._editorEvent.unsubscribe();
  }

  getQuillContent() {
    let response;
    try {
      response = JSON.parse(this.quillContent)
    } catch(error) {
      response = {};
    }
    return response;
  }

  getFileContent() {
    this._appService.getFileById('bW9oaXQuY3JpbXNvbmlAZ21haWwuY29t', '197d6ee2-5d1f-4bb4-ae7b-b48db07e6024').subscribe((response: any) => {
      this.quillContent = response.data.content;
    });
  }

  created($event: any) {
    console.log('editor-created', $event);
    if(!this._currentDocumentId) {
      this._firstLoad = false;
      this._loaderService.show();
      this._documentsService.createNewDocumentRequest()
      .subscribe((response: any) => {
        this._currentDocumentId = response.id;

        this._location.go(`/editor/${this._currentDocumentId}`)
        this._loaderService.hide();
      });
    } else {
      this.getDocumentById(this._currentDocumentId);
    }
  }

  changedEditor($event: EditorChangeContent | EditorChangeSelection) {
    console.log('editor-change', $event);
  }

  focus($event: any) {
    console.log('focus', $event);
  }

  blur($event: any) {
    console.log('blur', $event);
  }

  onContentChanged($event: any) {
    console.log('onContentChanged', $event);

    if ($event.delta && !this._firstLoad) {
      this._currentDelta = $event.delta;
      this._documentsService.updateDelta(this._currentDocumentId, this._currentDelta);

      console.log('delta changed', $event.delta)
      this.htmlStr = JSON.stringify($event.delta, null, 2);
    }

    if(this._firstLoad) {
      this._firstLoad = false;
    }
  }

  ediotrModelChangedEvent(value: any) {
    if(this._currentDelta) {
      this._ediotrModelChanged.next(value);
    }
  }

}
