import { MinMaxProvider } from "./../../providers/min-max/min-max";

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
  private players: any = {
    red: 0,
    blue: 0,
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public minMax: MinMaxProvider
  ) {
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
    console.log("playBlocked", this.playBlocked);
    if (!this.playBlocked && !this.winner) {
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

  async changeCurrentPlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    console.log("changePlayer", this.currentPlayer);
    if (this.currentPlayer === 2) {
      const column = await this.minMax.moveIA(
        this.gameMatrix,
        this.currentPlayer
      );
      this.selectColumnForPlay(column);
    }
  }

  checkForWinners() {
    let winner = this.checkIfHasDiagonalWinner();
    if (winner != null) {
      return winner;
    }
    winner = this.checkIfHasHorizontalWinner();
    if (winner != null) {
      return winner;
    }
    winner = this.checkIfHasVerticalWinner();
    if (winner != null) {
      return winner;
    }
  }

  checkIfHasDiagonalWinner() {
    return 0;
  }

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
            this.winGameAndReset(currentValue);
            return currentValue;
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
            this.winGameAndReset(currentValue);
            return currentValue;
          }
        }
      }
    }
  }

  winGameAndReset(winner) {
    this.winner = winner;
    if (winner === 1) {
      this.players.red += 1;
    } else if (winner === 2) {
      this.players.blue += 1;
    }
    this.currentPlayer = 1;
  }

  playAgain() {
    this.winner = null;
    this.initializeGameMatrix();
  }
}
