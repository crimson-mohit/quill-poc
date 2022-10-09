import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { QuillModule } from 'ngx-quill';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { TokenInterceptor } from '@/services/token.interceptor';
import { AppComponent } from '@/app.component';
import { EditorComponent } from '@/components/editor/editor.component';
import { FileUploadComponent } from '@/components/file-upload/file-upload.component';
import { DashboardComponent } from '@/components/dashboard/dashboard.component';
import { environment } from '@/../environments/environment';
import { LoaderComponent } from '@/components/loader/loader.component';

const config: SocketIoConfig = { url: environment.apiURL, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    FileUploadComponent,
    DashboardComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    QuillModule.forRoot(),
    HighlightModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js')
        // languages: {
        //   json: () => import('highlight.js/lib/languages/json.js')
        // }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
