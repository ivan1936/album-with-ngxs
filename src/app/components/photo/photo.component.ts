import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Select, Store} from '@ngxs/store'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {Photo} from 'src/app/model/photo'
import {PhotosState} from 'src/app/state/photos.state'

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {
  id: string
  photo$: Observable<Photo>
  @Select(PhotosState.getPhoto) fn$: Observable<Function>

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.photo$ = this.fn$.pipe(map((fn) => fn(this.id)))
  }
}
