import {State, Action, StateContext, Selector} from '@ngxs/store'
import {Photos} from 'src/app/model/photos'
import {Photo} from 'src/app/model/photo'
import {GetPhotos, GetPhoto} from 'src/app/actions/photos.action'
import {PhotosService} from '../services/photos.service'
import {catchError, map} from 'rxjs/operators'
import {of} from 'rxjs'
import {Injectable} from '@angular/core'

export class PhotosStateModel {
  isSearching: boolean
  isLoading: boolean
  photos: Photos
}

@State<PhotosStateModel>({
  name: 'photos',
  defaults: {
    isSearching: false,
    isLoading: false,
    photos: null,
  },
})
@Injectable()
export class PhotosState {
  @Selector()
  static getPhotos(state: PhotosStateModel) {
    return state.photos
  }

  @Selector()
  static getPhoto(state: PhotosStateModel) {
    return (id: string) => {
      const photos = state.photos.photos
      return photos.filter((photo) => photo.id === id)[0]
    }
  }

  @Action(GetPhotos)
  getPhotos(ctx: StateContext<PhotosStateModel>, {payload}: GetPhotos) {
    ctx.patchState({isSearching: true, isLoading: true})
    return this.photosService.getPhotos(payload).pipe(
      map((photos: Photos) => {
        ctx.patchState({photos, isSearching: false, isLoading: false})
        console.log(photos)
      }),
      catchError((err) => {
        ctx.patchState({isSearching: false, isLoading: false})
        return of(err)
      })
    )
  }

  @Action(GetPhoto)
  getPhoto(ctx: StateContext<PhotosStateModel>, {payload}: GetPhoto) {
    const photos = ctx.getState().photos.photos
    return photos.filter((photo) => photo.id === payload.toString())[0]
  }

  constructor(private photosService: PhotosService) {}
}
