import {Photos} from 'src/app/model/photos'

export interface PhotosStateInterface {
  isSearching: boolean
  isLoading: boolean
  photos: Photos
}
