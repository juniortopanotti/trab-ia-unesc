import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MinMaxProvider {
  constructor() {}

  branco = 0;
  token = [1, 2];
  score = {
    null: 0,
    1: 1,
    2: -1,
  };
  verificaGanhador(board, currentCol, currentRow) {


        // Para verificar se alguma condição de vitória ou perda é alcançada. Retorna 1 se ganhar e "else" retorna 0  se perder.
        // board [] é a matriz do jogo 7x6
        // currentCol é o número da coluna em que o último token foi colocado 
        // currentRow é o número da linha em que o último token foi colocado 
        // O numero maximo de colunas é 7
        // O numero maximo de linahs é 6
    
    
        let newToken = board[currentRow][currentCol]; //jogador
        let count = 0;//contador se chegar a 4 = vitória
    
        // Horizontal 
        for (let i = 0; i < 7; i++) {
            if (board[currentRow][i] == newToken)
                count++;
            else
                count = 0;
    
            if (count >= 4)
                return newToken;
        }
    
        //vertical
        for (let i = 0; i < 6; i++) {
            if (board[i][currentCol] == newToken)
                count++;
            else
                count = 0;
    
            if (count >= 4)
                return newToken;
        }
    
        // 4 na diagonal 1
        //linha 0 até linha 5
        for (let guideLine = 0; guideLine < 6 - 3; guideLine++) {
            count = 0;
            let row, col;
            for (row = guideLine, col = 0; row < 6 && col < 7; row++, col++) {
                if (board[row][col] == newToken) {
                    count++;
                    if (count >= 4) {
                        return newToken;
                    }
                }
                else {
                    count = 0;
                }
            }
        }
        // 4 na diagonal 
        //coluna 0 até colina 6
        for (guideColumn = 1; guideColumn < 7 - 3; guideColumn++) {
            count = 0;
            let row, col;
            for (row = 0, col = guideColumn; row < 6 && col < 7; row++, col++) {
                if (board[row][col] == newToken) {
                    count++;
                    if (count >= 4) {
                        return newToken;
                    }
                }
                else {
                    count = 0;
                }
            }
        }
    
        // 4 na diagonal inversa
        //linha 0 até linha 5
        for (let guideLine = 0; guideLine < 6 - 3; guideLine++) {
            count = 0;
            let row, col;
            for (row = guideLine, col = 6; row < 0 && col < 6; row++, col--) {
                if (board[row][col] == newToken) {
                    count++;
                    if (count >= 4) {
                        return newToken;
                    }
                }
                else {
                    count = 0;
                }
            }
        }
    
        // 4 na diagonal inversa
        //coluna 0 até colina 6
        for (let guideColumn = 5; guideColumn > 2; guideColumn--) {
            count = 0;
            let row, col;
            for (row = 0, col = guideColumn; row < 6 && col > 2; row++, col--) {
                if (board[row][col] == newToken) {
                    count++;
                    if (count >= 4) {
                        return newToken;
                    }
                }
                else {
                    count = 0;
                }
            }
        }
    
        return 0;
    }
  
  fazMovimento(board, j, player) {
    for (let i = 0; i < 6; i++) {
      if (board[i][j] != this.branco) {
        board[i - 1][j] = this.token[player - 1];
        return board;
      }
    }

    return board;
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

  moveIA(board, player, difficulty = 7) {
    let possibilities = this.getPosicoes(board);
    let best_value = null;
    let best_move = null;

    for (let possibility of possibilities) {
      // Talvez tenha que fazer json parse unparse
      let board_aux = this.fazMovimento(board, possibility, player);
      let value = this.minimax(board_aux, player, 1, difficulty);

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

  minimax(board, player, deaph, difficulty) {
    if (player == 1) {
      player = 2;
    } else {
      player = 1;
    }
    if(deaph == difficulty) {
      return 0;
    }

    let possibilities = this.getPosicoes(board);
    let best_value = null;

    for (let i = 0; i < possibilities.length; i++) {
      let possibility = possibilities[i];
      // Talvez tenha que fazer json parse unparse
      let board_aux = this.fazMovimento(board, possibility, player);
      let value = this.minimax(board_aux, player, deaph + 1, difficulty);

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
