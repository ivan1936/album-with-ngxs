import {Component, ElementRef, ViewChild} from '@angular/core'
import {Observable} from 'rxjs'
import {Photos} from 'src/app/model/photos'
import {CURRENT_PAGE, SEARCH_STRING} from 'src/app/shared/types/constants'
import {GetPhotos} from 'src/app/actions/photos.action'
import {RequestInterface} from 'src/app/shared/types/request.interface'
import {PersistanceService} from 'src/app/shared/services/persistance.service'
import {Store} from '@ngxs/store'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent {
  @ViewChild('searchInput') searchInput: ElementRef

  isSearching$: Observable<boolean>
  isLoading$: Observable<boolean>
  photos$: Observable<Photos>

  currentPage: number = +this.persistanceService.get(CURRENT_PAGE)
  searchStr: string = this.persistanceService.get(SEARCH_STRING)

  constructor(
    private store: Store,
    private persistanceService: PersistanceService
  ) {}

  ngOnInit() {
    this.initializeValues()
    const payload: RequestInterface = {
      page: this.currentPage,
      search: this.searchStr,
    }
    if (!this.photos$) {
      this.store.dispatch(new GetPhotos(payload))
    }
  }

  initializeValues(): void {
    this.isSearching$ = this.store.select((state) => state.isSearching)
    this.isLoading$ = this.store.select((state) => state.isLoading)
    this.photos$ = this.store.select((state) => state.photos.photos)
  }

  updateSearchStr(str: string) {
    if (!str) return
    this.searchStr = str
    this.persistanceService.set(SEARCH_STRING, JSON.stringify(str))
    this.currentPage = 1
    const payload: RequestInterface = {
      page: this.currentPage,
      search: this.searchStr,
    }
    this.store.dispatch(new GetPhotos(payload))
  }

  updatePage(page: number) {
    this.currentPage = page
    this.persistanceService.set(CURRENT_PAGE, JSON.stringify(page))
    const payload: RequestInterface = {
      page: this.currentPage,
      search: this.searchStr,
    }
    this.store.dispatch(new GetPhotos(payload))
  }
}
