import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  quillModules = {};
  quillContent = '';
  htmlStr = '';

  constructor() {
    this.quillModules = {
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
  }

  ngOnInit(): void {
  }

  created($event: any) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', $event)
  }

  changedEditor($event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    // this event fires twice 2nd time with additional information
    console.log('editor-change', $event);
  }

  focus($event: any) {
    // tslint:disable-next-line:no-console
    // this event fires on click editor
    console.log('focus', $event);
  }

  blur($event: any) {
    // tslint:disable-next-line:no-console
    // this event fires on click outside of editor
    console.log('blur', $event);
  }

  onContentChanged($event: any) {
    console.log('onContentChanged', $event);

    this.update($event.content, $event.delta);
  }

  update(contents: any, delta: any) {
    console.log('contents', contents);
    var html = "contents = " + JSON.stringify(contents, null, 2);
    if (delta) {
      console.log('change', delta)
      html = "change = " + JSON.stringify(delta, null, 2) + "\n\n" + html;
    }
    this.htmlStr = html;
  }

}
