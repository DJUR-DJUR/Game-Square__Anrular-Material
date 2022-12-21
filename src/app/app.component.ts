import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SQUARE_STATUS } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public squares = new Array(100);
  private randomSquare: number | null = null;
  public isStarted = false;
  private successSquares: number[] = [];
  private expiredSquares: number[] = [];
  public playerScore = 0;
  public compScore = 0;
  private gameInterval: NodeJS.Timer | undefined;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {

  }

  public startGame() {
    this.isStarted = true;
    this.gameInterval = setInterval(() => {
      if (this.randomSquare) {
        this.expiredSquares.push(this.randomSquare);
      }
      this.randomSquare = this.getRandomNumber(0, this.squares.length - 1);
      this.checkScore();
      this.cd.detectChanges();
    }, 500);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min)
  }

  public checkItemStatus(indexOfItem: number): SQUARE_STATUS {
    // if (this.randomSquare === indexOfItem) {
    //   return SQUARE_STATUS.ACTIVE;
    // } else if (this.expiredSquares.includes(indexOfItem)) {
    //   return SQUARE_STATUS.EXPIRED;
    // } else if (this.successSquares.includes(indexOfItem)) {
    //   // this.successSquares.push(indexOfItem);
    //   return SQUARE_STATUS.SUCCESS;
    // }
    // return SQUARE_STATUS.DEFAULT;

    switch (true) {
      case this.randomSquare === indexOfItem:
        return SQUARE_STATUS.ACTIVE;
      case this.expiredSquares.includes(indexOfItem):
        return SQUARE_STATUS.EXPIRED;
      case this.successSquares.includes(indexOfItem):
        return SQUARE_STATUS.SUCCESS;
      default:
        return SQUARE_STATUS.DEFAULT;
    }
  }

  public onItemClick(indexOfItem: number): void {
    if (this.randomSquare === indexOfItem) {
      this.successSquares.push(indexOfItem);
      this.randomSquare = null;
    }
  }

  private checkScore() {
    this.playerScore = this.successSquares.length;
    this.compScore = this.expiredSquares.length;
    if (this.playerScore >= 10 || this.compScore >= 10) {
      this.stopGame();
      this.clearSquares();
      // open window
      // this.openWindow();
    }
  }

  private stopGame() {
    clearInterval(this.gameInterval);
    this.isStarted = false;
  }

  private clearSquares() {
    this.randomSquare = null;
    this.successSquares = [];
    this.expiredSquares = [];
  }

}
