import React from 'react';
import Board from './Board';

// 整個小遊戲
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 0,
			history: [{
				squares: Array(19*19).fill(null)
			}], // 負責存歷史盤面
			squares: Array(19*19).fill(null), // 現在的盤面
			blakeIsNext: true, 
		}
	}

	// 點擊下棋
	handleClick(i) {
		const {step, history, squares, blakeIsNext} = this.state;
		
		// 防止重複下棋
		if(squares[i]) { 
			return;
		}
		// 遊戲結束
		if(winnerIs(squares)) { 
			return;
		}

		const  newSquares = squares.slice();
		newSquares[i] = blakeIsNext ? 'B' : 'W' ;

		this.setState({
			step: step + 1,
			history: history.concat({
				squares: newSquares
			}),
			squares: newSquares,
			blakeIsNext: !blakeIsNext,
		});
    }
    
    handleReset() {
        this.setState({
            step: 0,
			history: [{
				squares: Array(19*19).fill(null)
			}], 
			squares: Array(19*19).fill(null), 
			blakeIsNext: true, 
        });
    }

	render() {
		const {squares, blakeIsNext} = this.state;
		const status = '下一位：' + (blakeIsNext ? '黑子' : '白子') ;
        const winner = winnerIs(squares);
        
        const block = Array(18*18).fill(null); // 土法煉鋼畫棋盤用的

		return (
            <div>
                <div className="game container my-3">
                    <div className="game__title">
                        <h2>五子棋小遊戲</h2>
                    </div>
                    <div className="game__field">
                        <div className="game__board__bg">
                            {block.map((item, index)=>
                                <div className="block" key={index}>{item}</div>
                            )}
                        </div>
                        <Board
                            squares={squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game__info my-3">
                        <div>{status}</div>
                        <div>
                            {winner && <span>遊戲結束。贏家是：{winner === 'B' ?  '黑子':'白子'}</span>}
                        </div>
                        <div>
                            <button type="button" className="btn btn-secondary my-3" onClick={()=>this.handleReset()}>重新開始</button>
                        </div>
                    </div>
                </div>
            </div>
			
		)
	}
}


// 判斷勝負
function winnerIs(squares) {
    // 先定義 5*5 棋盤的 12 種連線
	const lines = [
		[0, 1, 2 , 3, 4],
		[19, 20, 21, 22, 23],
		[38, 39, 40, 41, 42],
		[57, 58, 59, 60, 61],
		[76, 77, 78, 79, 80],
		[0, 19, 38, 57, 76],
		[1, 20, 39, 58, 77],
		[2, 21, 40, 59, 78],
		[3, 22, 41, 60, 79],
		[4, 23, 42, 61, 80],
		[0, 20, 40, 60, 80],
		[4, 22, 40, 58, 76],
    ];
    
    for(let i = 0; i <= 14; i++) {  // 5*5 棋盤連線橫向掃描

        for(let j = 0; j <= 14; j++) {  // 5*5 棋盤連線直向掃描
            const newlines = lines.map((line) => {
                const newline = line.map((num) => num + (i*19) +j)
                return newline;
            });

            //console.log(newlines);
            
            for(let k = 0; k < newlines.length; k++) { // 掃描 12 種連線
                const [a, b, c, d, e] = newlines[k]
                if(
                    squares[a]
                    && squares[a] === squares[b] 
                    && squares[a] === squares[c] 
                    && squares[a] === squares[d] 
                    && squares[a] === squares[e]
                ) {
                    return squares[a];
                }
            }
        }
    }
	return null;
}


export default App;
