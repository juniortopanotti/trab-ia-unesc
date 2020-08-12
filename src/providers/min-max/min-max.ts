import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MinMaxProvider {
  constructor() {}

  branco = 0;
  token = [1, 2];
  score = {
    0: 0,
    1: 1,
    2: -1,
  };

 verificaGanhador(board, currentRow, currentCol, csn=false) {
    let newToken = board[currentRow][currentCol]; //jogador

    let count = 0;//contador se chegar a 4 = vitória

    // Horizontal
    if(csn) {
      console.log("csn",newToken, currentRow, currentCol)
    }
    

    for (let i = 0; i < 7; i++) {
      if (board[currentRow][i] == newToken)
          count++;
      else
          count = 0;

      if (count >= 4)
          return newToken;
    }

    for (let i = 0; i < 6; i++) {
      if (board[i][currentCol] == newToken)
        count++;
      else
        count = 0;

      if (count >= 4)
        return newToken;
    }

    let COLUMN_COUNT = 7
    let ROW_COUNT = 6

    for(let i=0; i < COLUMN_COUNT - 3; i++) {
      for(let j=0; j < ROW_COUNT - 3; j++) {
        if(board[j][i] != 0 && board[j][i] == board[j+1][i+1] &&  board[j+1][i+1] == board[j+2][i+2]
          && board[j+2][i+2] == board[j+3][i+3]) {

          return board[j][i]
        }
      }
    }
    for(let i=0; i < COLUMN_COUNT - 3;i++) {
      for(let j=3; j<ROW_COUNT;j++) {
        if(board[j][i] != 0 && board[j][i] == board[j-1][i+1] && 
          board[j-2][i+2] == board[j-1][i+1] && board[j-3][i+3] == board[j-1][i+1]){

          return board[j][i]
        }
      }
    }

    return 0;
  }
  
  fazMovimento(board, j, player) {
    for (let i = 0; i < 6; i++) {
      if (board[i][j] != this.branco) {

        board[i - 1][j] = this.token[player - 1];
        return [board, i - 1];
      }
    }
    board[5][j] = this.token[player - 1];
    return [board, 5];
  }

  getPosicoes(board) {
    let posicoes = [];
    for (let i = 0; i < 7; i++) {
      if (board[0][i] == this.branco) {
        posicoes.push(i);
      }
    }

    return posicoes;
  }

  moveIA(board, player, difficulty = 5) {
    let possibilities = this.getPosicoes(board);
    let best_value = null;
    let best_move = null;

    for (let possibility of possibilities) {
      // Talvez tenha que fazer json parse unparse
      let result = this.fazMovimento(this.fixBoard(board), possibility, player);
      let board_aux = this.fixBoard(result[0])
      let i = result[1]
      let value = this.minimax(board_aux, player, i, possibility, 1, difficulty);

      if (best_value == null) {
        best_value = value;
        best_move = possibility;
      } else if (player == 1 && value > best_value) {
        best_value = value;
        best_move = possibility;
      } else if (player == 2 && value < best_value) {
        best_value = value;
        best_move = possibility;
      }
    }

    return best_move;
  }

  fixBoard(elements) {
    return  JSON.parse(JSON.stringify(elements))
  }

  minimax(board, player, i, j, deaph, difficulty) {
    let ganhador = this.verificaGanhador(board, i, j);
    
    if(ganhador != 0) {
      return this.score[ganhador]/deaph;
    }

    if (player == 1) {
      player = 2;
    } else {
      player = 1;
    }

    if(deaph >= difficulty) {
      return 0;
    }

    let possibilities = this.getPosicoes(board);
    let best_value = null;

    for (let possibility of possibilities) {
      // Talvez tenha que fazer json parse unparse
      
      let result = this.fazMovimento(this.fixBoard(board), possibility, player);
      let board_aux = this.fixBoard(result[0])
      i = result[1]
      let value = this.minimax(board_aux, player, i, possibility, deaph + 1, difficulty);


      if (best_value == null) {
        best_value = value;
      } else if (player == 1 && value > best_value) {
        best_value = value;
      } else if (player == 2 && value < best_value) {
        best_value = value;
      }
    }

    return best_value;
  }
}
