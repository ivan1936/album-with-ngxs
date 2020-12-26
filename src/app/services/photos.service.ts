import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {map, shareReplay} from 'rxjs/operators'

import {baseUrl, perPage} from 'src/environments/environment'
import {accessKey} from 'src/environments/environment'
import {Photos} from './../model/photos'
import {Photo} from '../model/photo'
import {RequestInterface} from 'src/app/shared/types/request.interface'

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  searchResults$: Observable<Photos>

  constructor(private http: HttpClient) {}

  getPhotos(search: RequestInterface): Observable<Photos> {
    const url = baseUrl + '/search/photos'
    return this.http
      .get<any[]>(url, {
        params: {
          client_id: accessKey,
          query: search.search,
          page: search.page.toString(),
          per_page: perPage.toString(),
        },
      })
      .pipe(
        map((res) => [res['results'], res['total'], res['total_pages']]),
        map((res2) => {
          const photos = res2[0].map((photo) => ({
            id: photo.id,
            description: photo.description,
            urls: [photo['urls'].small, photo['urls'].regular],
          }))
          return {
            photos,
            total: res2[1],
            total_pages: res2[2],
          }
        }),
        shareReplay(1)
      )
  }

  onSearch(search: RequestInterface) {
    this.searchResults$ = this.getPhotos(search)
    return this.searchResults$
  }
}
