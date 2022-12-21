import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Score } from '../interfaces';


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Score
  ) {}

}
