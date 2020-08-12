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
    //console.log("playBlocked", this.playBlocked);
    if (!this.playBlocked && !this.winner) {
      this.playBlocked = true;
      this.recursiveLineMatrizLoop(0, column);
    }
  }

  recursiveLineMatrizLoop(index, column, change= -1) {
    setTimeout(() => {
      if (this.gameMatrix[index][column] === 0) {
        change = index
        this.gameMatrix[index][column] = this.currentPlayer;
        if (index !== 0) {
          this.gameMatrix[index - 1][column] = 0;
        }
      }

      index += 1;
      if (index < 6) {
        this.recursiveLineMatrizLoop(index, column, change);
      } else {
        this.playBlocked = false;
        this.checkForWinners(change, column)
        this.changeCurrentPlayer();
      }
    }, 50);
  }

  async changeCurrentPlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    // console.log("changePlayer", this.currentPlayer);
    if (this.currentPlayer === 2) {
      const column = await this.minMax.moveIA(
        this.gameMatrix,
        this.currentPlayer
      );
      this.selectColumnForPlay(column);
    }
  }

  checkForWinners(index, column) {
    let winner = this.minMax.verificaGanhador(this.gameMatrix, index, column, true);
    this.winGameAndReset(winner);
  }


  winGameAndReset(winner) {
    this.winner = winner;
    if (winner === 1) {
      this.players.red += 1;
    } else if (winner === 2) {
      this.players.blue += 1;
    }

  }

  playAgain() {
    this.winner = null;
    this.initializeGameMatrix();
  }
}
