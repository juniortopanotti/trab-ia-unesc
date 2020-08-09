import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-game",
  templateUrl: "game.html",
})
export class GamePage {
  private gameMatrix: number[][] = [];
  private currentPlayer: number = 1;
  private selectors: number[] = new Array(7);
  private playBlocked: boolean = false;
  private winner: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeGameMatrix();
  }

  ionViewDidLoad() {}

  initializeGameMatrix() {
    for (let i = 0; i < 6; i++) {
      this.gameMatrix[i] = [];
      for (let j = 0; j < 7; j++) {
        this.gameMatrix[i][j] = 0;
      }
    }
  }

  selectColumnForPlay(column) {
    if (!this.playBlocked) {
      this.playBlocked = true;
      this.recursiveLineMatrizLoop(0, column);
    }
  }

  recursiveLineMatrizLoop(index, column) {
    setTimeout(() => {
      if (this.gameMatrix[index][column] === 0) {
        this.gameMatrix[index][column] = this.currentPlayer;
        if (index !== 0) {
          this.gameMatrix[index - 1][column] = 0;
        }
      }

      index += 1;
      if (index < 6) {
        this.recursiveLineMatrizLoop(index, column);
      } else {
        this.playBlocked = false;
        this.changeCurrentPlayer();
        this.checkIfHasHorizontalWinner();
        this.checkIfHasVerticalWinner();
      }
    }, 50);
  }

  changeCurrentPlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  checkForWinners() {
    this.checkIfHasDiagonalWinner();
    this.checkIfHasHorizontalWinner();
    this.checkIfHasVerticalWinner();
  }

  checkIfHasDiagonalWinner() {}

  checkIfHasHorizontalWinner() {
    let lastValue = 0;
    let currentValue = 0;

    for (let i = 0; i < 6; i++) {
      let hits = 1;
      for (let j = 0; j < 7; j++) {
        if (!this.winner) {
          currentValue = this.gameMatrix[i][j];
          if (currentValue !== 0) {
            if (j > 0) {
              lastValue = this.gameMatrix[i][j - 1];
            }
            if (currentValue !== lastValue) {
              hits = 0;
            }
            hits += 1;
          }
          if (hits >= 4) {
            this.winner = currentValue;
            return;
          }
        }
      }
    }
  }

  checkIfHasVerticalWinner() {
    let lastValue = 0;
    let currentValue = 0;

    for (let i = 0; i < 7; i++) {
      let hits = 1;
      for (let j = 0; j < 6; j++) {
        if (!this.winner) {
          currentValue = this.gameMatrix[j][i];
          if (currentValue !== 0) {
            if (j > 0) {
              lastValue = this.gameMatrix[j - 1][i];
            }
            if (currentValue !== lastValue) {
              hits = 0;
            }
            hits += 1;
          }
          if (hits >= 4) {
            this.winner = currentValue;
            return;
          }
        }
      }
    }
  }
}
