import {Component, OnInit} from '@angular/core'
import {Store} from '@ngxs/store'

import {CURRENT_PAGE, SEARCH_STRING} from 'src/app/shared/types/constants'
import {GetPhotos} from './actions/photos.action'
import {PersistanceService} from './shared/services/persistance.service'
import {RequestInterface} from './shared/types/request.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private persistanceService: PersistanceService
  ) {}

  ngOnInit(): void {
    this.persistanceService.set(CURRENT_PAGE, JSON.stringify(1))
    //this.persistanceService.set(SEARCH_STRING, 'alma ata')
    const payload: RequestInterface = {
      page: 1,
      search: 'alma ata',
    }
    this.store.dispatch(new GetPhotos(payload))
  }
}
