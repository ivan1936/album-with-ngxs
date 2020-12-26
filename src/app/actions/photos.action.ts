import {Photos} from 'src/app/model/photos'
import {RequestInterface} from 'src/app/shared/types/request.interface'

export class GetPhotos {
  static readonly type = '[Photos] Get Photos'
  constructor(public payload: RequestInterface) {}
}

export class GetPhoto {
  static readonly type = '[Photo] Get Photo'
  constructor(public payload: number) {}
}
