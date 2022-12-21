import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SQUARE_STATUS } from './constants';
import { ScoreComponent } from './score/score.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public squares = new Array(100);
  public isStarted = false;
  public gamerScore = 0;
  public compScore = 0;
  private randomSquare: number | null = null;
  private successSquares: number[] = [];
  private expiredSquares: number[] = [];
  private gameInterval!: NodeJS.Timer;

  constructor(
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {

  }

  public startGame(): void {
    this.isStarted = true;
    this.gameInterval = setInterval(() => {
      if (this.randomSquare) {
        this.expiredSquares.push(this.randomSquare);
      }
      this.randomSquare = this.getRandomNumber(0, this.squares.length - 1);
      this.checkScore();
      this.cd.detectChanges();
    }, 1000);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min)
  }

  public checkItemStatus(indexOfItem: number): SQUARE_STATUS {
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

  private checkScore(): void {
    this.gamerScore = this.successSquares.length;
    this.compScore = this.expiredSquares.length;
    if (this.gamerScore >= 10 || this.compScore >= 10) {
      this.openDialog();
      this.stopGame();
      this.clearSquares();
      this.clearScore();
    }
  }

  private openDialog(): void {
    this.dialog.open(ScoreComponent, {
      data: {
        gamer: this.gamerScore,
        comp: this.compScore
      }
    });
  }

  private stopGame(): void {
    clearInterval(this.gameInterval);
    this.isStarted = false;
  }

  private clearSquares(): void {
    this.randomSquare = null;
    this.successSquares = [];
    this.expiredSquares = [];
  }

  private clearScore(): void {
    this.compScore = 0;
    this.gamerScore = 0;
  }

}
