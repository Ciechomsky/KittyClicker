import React from 'react';
import ReactDOM from 'react-dom';

require('../scss/main.scss')

//RightSideBard
class ShopButton extends React.Component {
    constructor(props) {
        super(props) 
    }

    onClickHandler = () => {
        if (typeof this.props.eventOnClick === 'function') {
            this.props.eventOnClick(this.props.cost, this.props.name);
        }
    }

    render() {      
        return <div className = "shopButton" onClick = {this.onClickHandler}>
                <p> {this.props.quantity} </p>
                <p> {this.props.name} </p>
                <p> {this.props.cost} </p>
            </div>
    }
}

class RightSideBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            cursorBasicCost: 10,
            cursorModifier: 5,
            CrazyCatLadyBasicCost: 100,
            CrazyCatLadyModifier: 15            
        }
    }

    render() {
        //console.log(this.props.quantityCursors + ' right');

        return <div className = 'rightSideBar'>
            <ShopButton name = 'Cursors' cost = {this.state.cursorBasicCost + this.state.cursorModifier * this.props.quantityCursors} 
                                         quantity = {this.props.quantityCursors}
                                         eventOnClick = {this.props.eventOnClick} />
            <ShopButton name = 'CrazyCatLady' cost = {this.state.CrazyCatLadyBasicCost + this.state.CrazyCatLadyModifier * this.props.quantityCrazyCatLady} 
                                              quantity = {this.props.quantityCrazyCatLady}
                                              eventOnClick = {this.props.eventOnClick} />
            </div>
    }
}

//Main 
class KittyButton extends React.Component {
    onClickHandler = () => {
        if (typeof this.props.eventOnClick === 'function') {
            this.props.eventOnClick();
        }
    }

    render() {
        return <div className = 'kittyButton' onClick = {this.onClickHandler}>
            </div>
    }
}

class CounterOfKitties extends React.Component {
    render() {
        return <h2> {this.props.currentQuantityKitties} kitties  </h2>
    }
}

class Main extends React.Component {
    render() {
        return <div className = 'main'>
                <CounterOfKitties currentQuantityKitties = {this.props.currentQuantityKitties} kitties />
                <h2> per second: {this.props.kittyPerSecond} </h2>
                <KittyButton eventOnClick = {this.props.eventOnClick} />
               </div>
    }
}

//App
class App extends React.Component {
    constructor(){
        super()

        this.state = {
            kittyPerSecond: 0,
            currentQuantityKitties: 0,
            globalQuantityKitties: 0,
            quantityCursors: 0,
            cursorsBasicProduction: 0.1,
            quantityCrazyCatLady: 0,
            crazyCatLadyBasicProduction: 0.5
        }
    }

    addKitty = () => {
        this.setState({
            currentQuantityKitties: this.state.currentQuantityKitties + 1
        })
    }

    buyItem = (cost, name) => {
        if(this.state.currentQuantityKitties >= cost) {
            switch(name) {
                case 'Cursors':
                        this.setState({
                            quantityCursors: (this.state.quantityCursors + 1),
                            currentQuantityKitties: (this.state.currentQuantityKitties - cost)
                        })
                    break;
                case 'CrazyCatLady':
                         this.setState({
                            quantityCrazyCatLady: (this.state.quantityCrazyCatLady + 1),
                            currentQuantityKitties: (this.state.currentQuantityKitties - cost)
                        })
                    break;
                default:
                    console.log('Błąd');
            }  
        }
    }

    componentDidMount(){
        this.intervalId = setInterval(() => {
            this.setState({
                currentQuantityKitties: this.state.currentQuantityKitties + 
                            (this.state.quantityCursors * this.state.cursorsBasicProduction + 
                                this.state.quantityCrazyCatLady * this.state.crazyCatLadyBasicProduction)
            });
        }, 1000);
}

    render() {
        let kittyPerSecond = (this.state.quantityCursors * this.state.cursorsBasicProduction + this.state.quantityCrazyCatLady * this.state.crazyCatLadyBasicProduction).toFixed(2)

        return <div className = 'mainFlex'>
                <Main kittyPerSecond = {kittyPerSecond} 
                            currentQuantityKitties = {this.state.currentQuantityKitties.toFixed(2)}
                            eventOnClick = {this.addKitty} />
                <RightSideBar quantityCursors = {this.state.quantityCursors} 
                              quantityCrazyCatLady = {this.state.quantityCrazyCatLady} 
                              eventOnClick = {this.buyItem} />
               </div>
    }
}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
