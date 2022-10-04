import { Component, OnInit, EventEmitter } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Subscription, Subject, debounceTime } from 'rxjs';

import { AppService } from '@/services/app.service';
import { EditorService } from '@/services/editor.service';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  quillContent = '';
  htmlStr = '';
  _fileUploadedEvent: Subscription = new Subscription;

  private editorEvent: Subscription;
  private currentDocumentId: string = '';
  private currentDelta = null;
  private ediotrModelChanged = new Subject();
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

  constructor(private appService: AppService, private editorService: EditorService) {
    this.ediotrModelChanged
    .pipe(debounceTime(1000))
    .subscribe((value) => {
      console.log('ediotrModelChanged called ===> ', value);
    });

    this.editorEvent = this.editorService.currentEditor.subscribe(event => console.log(event));
  }

  ngOnInit(): void {
    this._fileUploadedEvent = this.appService.fileUploadedEvent.subscribe((data: any) => {
      console.log(data.id, data.content);
      // this.getFileContent();
      this.currentDocumentId = data.id;
      this.quillContent = data.content;
    });
  }

  ngOnDestroy() {
    this.editorEvent.unsubscribe();
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
    this.appService.getFileById('bW9oaXQuY3JpbXNvbmlAZ21haWwuY29t', '197d6ee2-5d1f-4bb4-ae7b-b48db07e6024').subscribe((result: any) => {
      console.log('getFileById ===> ', result);
      this.quillContent = result.data.content;
    });
  }

  created($event: any) {
    console.log('editor-created', $event)
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

    if ($event.delta) {
      this.currentDelta = $event.delta;
      this.editorService.updateDelta(this.currentDocumentId, this.currentDelta);

      console.log('change', $event.delta)
      this.htmlStr = 'change = ' + JSON.stringify($event.delta, null, 2);
    }
  }

  ediotrModelChangedEvent(value: any) {
    console.log('ediotrModelChanged ===> ', value);
    if(this.currentDelta) {
      this.ediotrModelChanged.next(value);
    }
  }

}
