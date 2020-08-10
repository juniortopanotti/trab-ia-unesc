import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MinimaxService {
    branco = 0;
    token = [1, 2];
    score = {
        null: 0,
        1: 1,
        2: -1
    }

    verificaGanhador(board) {
        
    }

    fazMovimento(board, j, player) {
        for(let i=0; i<6;i++) {
            if(board[i][j] != this.branco) {
                board[i - 1][j] = this.token[player - 1]
                return board
            }
        }

        return board
    }

    getPosicoes(board) {
        let posicoes = []
        for(let i = 0;i<7;i++) {
            if(board[0][i] == this.branco) {
                posicoes.push(i)
            }
        }

        return posicoes
    }

    moveIA(board, player) {
        let possibilities = this.getPosicoes(board)
        let best_value = null
        let best_move = null

        for(let i=0;i<possibilities.length;i++) {
            let possibility = possibilities[i]
            // Talvez tenha que fazer json parse unparse
            let board_aux = this.fazMovimento(board, possibility, player)
            let value = this.minimax(board_aux, player)

            if(best_value == null) {
                best_value = value
                best_move = possibility
            }
            else if(player == 1 && value > best_value) {
                best_value = value
                best_move = possibility
            }
            else if(player == 2 && value < best_value) {
                best_value = value
                best_move = possibility
            }
        }

        return best_move
    }

    minimax(board, player) {
        let winner = this.verificaGanhador(board)
        if(winner != null) {
            return this.score[winner]
        }

        if(player == 1) {
          player = 2
        }
        else {
          player = 1
        }

        let possibilities = this.getPosicoes(board)
        let best_value = null

        for(let i=0;i<possibilities.length;i++) {
            let possibility = possibilities[i]
            // Talvez tenha que fazer json parse unparse
            let board_aux = this.fazMovimento(board, possibility, player)
            let value = this.minimax(board_aux, player)

            if(best_value == null) {
                best_value = value
            }
            else if(player == 1 && value > best_value) {
                best_value = value
            }
            else if(player == 2 && value < best_value) {
                best_value = value
            }
        
        }

        return best_value
    }
}
