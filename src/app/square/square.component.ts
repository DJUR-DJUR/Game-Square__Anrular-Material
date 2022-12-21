import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SQUARE_STATUS } from '../constants';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareComponent {

  @Input()
  public status: SQUARE_STATUS = SQUARE_STATUS.DEFAULT;

}
