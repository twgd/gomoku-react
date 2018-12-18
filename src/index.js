import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {

	render() {
		return(
			<button
				className="square"
				onClick={() => this.props.onClick(this.props.index)}
			>
				{this.props.value}
			</button>
		);
	}
}


class Board extends React.Component {

	render() {
		const {squares} = this.props;
		return(
			squares.map((item, index)=>
				<Square
					key={index}
					index={index}
					value={item}
					onClick={(i) => this.props.onClick(i)}
				/>
			)
		)		
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 0,
			history: [{
				squares: Array(19*19).fill(null)
			}],
			squares: Array(19*19).fill(null),
			blakeIsNext: true,
		}
	}

	handleClick(i) {
		const {step, history, squares, blakeIsNext} = this.state;
		
		// 防止重複下棋
		if(squares[i]) { 
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

	render() {
		console.log(this.state);

		const {squares, blakeIsNext} = this.state;
		let status = 'Next is: ' + (blakeIsNext ? 'B' : 'W') ;
		//let winnerIs = (winner ? 'Winner is ' + winner : null);

		return (
			<div className="game container">
				<div className="game__board">
					<Board
						squares={squares}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className="game__info">
					<div>{status}</div>
					
				</div>
			</div>
		)
	}
}



ReactDOM.render(
	<App />,
	document.getElementById('root')
);

/*
function winnerIs(squares) {
	
}
*/
