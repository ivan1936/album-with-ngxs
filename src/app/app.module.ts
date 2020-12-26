import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {AppRoutingModule} from './app-routing.module'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {FlexLayoutModule} from '@angular/flex-layout'
import {HttpClientModule} from '@angular/common/http'

import {AppComponent} from './app.component'
import {environment} from './../environments/environment'
import {MaterialModule} from './shared/modules/material.module'
import {Pagination} from './shared/components/pagination/pagination.component'
import {PhotoComponent} from './components/photo/photo.component'
import {NotfoundComponent} from './shared/components/notfound/notfound.component'
import {PhotosComponent} from './components/photos/photos.component'
import {PersistanceService} from './shared/services/persistance.service'
import {NgxsModule} from '@ngxs/store'
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin'
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin'
import {PhotosState} from './state/photos.state'
import {PhotosService} from './services/photos.service'

@NgModule({
  declarations: [
    AppComponent,
    Pagination,
    PhotoComponent,
    NotfoundComponent,
    PhotosComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    NgxsModule.forRoot([PhotosState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [PersistanceService, PhotosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
