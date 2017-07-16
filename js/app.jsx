import React from 'react';
import ReactDOM from 'react-dom';

require('../scss/main.scss')

//RightSideBard
class ShopButton extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            cost: this.props.cost + (this.props.modifier * this.props.quantity )
        }
    }

    onClickHandler = () => {
        this.getCost();

        if (typeof this.props.eventOnClick === 'function') {
            this.props.eventOnClick(this.state.cost, this.props.name);
        }

        this.getCost();
    }

    getCost = () => {
        this.setState({
            cost: this.props.cost + (this.props.modifier * this.props.quantity )
        });
    }

    render() {      
       // console.log(this.props.quantity + ' ' + this.props.name);

        return <div className = "shopButton" onClick = {this.onClickHandler}>
                <p> {this.props.quantity} </p>
                <p> {this.props.name} </p>
                <p> {this.state.cost} </p>
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
            <ShopButton name = 'Cursors' cost = {this.state.cursorBasicCost} 
                                         modifier = {this.state.cursorModifier} 
                                         quantity = {this.props.quantityCursors}
                                         eventOnClick = {this.props.eventOnClick} />
            <ShopButton name = 'CrazyCatLady' cost = {this.state.CrazyCatLadyBasicCost} 
                                              modifier = {this.state.CrazyCatLadyModifier} 
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

class Main extends React.Component {
    render() {
        return <div className = 'main'>
                <h2> {this.props.currentQuantityKitties} kitties  </h2>
                <h2> per second: {this.props.kittyPerSecond} </h2>
                <KittyButton eventOnClick = {this.props.eventOnClick} />
               </div>
    }
}

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
            crazyCatLadyBasicProduction: 0.1
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
                        //console.log(this.state.quantityCursors + ' fukncja'); // po pierwszym kliknięciu jest dalej 0
                    break;
                case 'CrazyCatLady':
                         this.setState({
                            quantityCrazyCatLady: (this.state.quantityCrazyCatLady + 1),
                            currentQuantityKitties: (this.state.currentQuantityKitties - cost)
                        })
                        //console.log(this.state.quantityCrazyCatLady); // po pierwszym kliknięciu jest dalej 0
                    break;
                default:
                    console.log('Błąd');
            }               
        }
    }

    render() {
        //console.log(this.state.quantityCursors + ' render');

        return <div className = 'mainFlex'>
                <Main kittyPerSecond = {this.state.kittyPerSecond} 
                            currentQuantityKitties = {this.state.currentQuantityKitties} 
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
