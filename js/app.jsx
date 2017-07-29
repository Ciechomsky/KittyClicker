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
                <p className = "quantity blockPointer"> {this.props.quantity} </p>
                <p className = "name blockPointer"> <strong> {this.props.itemName} </strong> </p>
                <p className = "cost blockPointer"> {this.props.cost} </p>
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
        return <div className = 'rightSideBar'>
            <ShopButton name = 'Cursors' cost = {this.state.cursorBasicCost + this.state.cursorModifier * this.props.quantityCursors} 
                                         quantity = {this.props.quantityCursors}
                                         eventOnClick = {this.props.eventOnClick} 
                                         itemName = 'Cursors' />
            <ShopButton name = 'CrazyCatLady' cost = {this.state.CrazyCatLadyBasicCost + this.state.CrazyCatLadyModifier * this.props.quantityCrazyCatLady} 
                                              quantity = {this.props.quantityCrazyCatLady}
                                              eventOnClick = {this.props.eventOnClick} 
                                              itemName = 'Crazy Cat Lady' />
            </div>
    }
}

//Main 
//TODO: Adding cursors
class Cursor extends React.Component {
    render  () {
        return <li>
                    <img src = "./img/Cursor.png" width = "50px" height = "50px"/>
                </li>
    }
}

//Show Adding Kitty
class ShowNumber extends React.Component {
     constructor(){
        super()

        this.state = {
            show: "show"
        }
    }

    render () {
        if (this.state.show === "show") {
          return <div className = "kittyNumber blockPointer"> 
                <p>  + 1 kitty </p>
            </div>
        } else {
            return (null)
        } 
    }
}

class KittyButton extends React.Component {
    onClickHandler = () => {
        if (typeof this.props.eventOnClick === 'function') {
            this.props.eventOnClick();
        }
    }

    render() { 
        return <div className = 'kittyButton' onClick = {this.onClickHandler}>
                    {this.props.clickList}
                </div>
    }
}

class CounterOfKitties extends React.Component {
    render() {
        return <h2 className = "blockPointer"> {this.props.currentQuantityKitties} kitties  </h2>
    }
}

class Main extends React.Component {
    render() {
        return <div className = 'main'>
                <CounterOfKitties currentQuantityKitties = {this.props.currentQuantityKitties} kitties />
                <h2 className = "blockPointer"> per second: {this.props.kittyPerSecond} </h2>
                <KittyButton eventOnClick = {this.props.eventOnClick}
                            clickList = {this.props.clickList} />
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
            crazyCatLadyBasicProduction: 0.5,
            clickList: []
        }
    }

    addKitty = () => {
        const clickList = this.state.clickList.slice();
        clickList.push(<ShowNumber key={clickList.length + this.state.currentQuantityKitties} />)

        this.setState({
            currentQuantityKitties: this.state.currentQuantityKitties + 1,
            clickList: clickList
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
            const clickList = this.state.clickList.slice();
            clickList.shift();

            this.setState({
                currentQuantityKitties: this.state.currentQuantityKitties + 
                             (this.state.quantityCursors * this.state.cursorsBasicProduction + 
                                this.state.quantityCrazyCatLady * this.state.crazyCatLadyBasicProduction),
                clickList: clickList
            });
        }, 1000);
       
        // this.intervalId = setInterval(() => {


        //     this.setState({
        //         clickList: []
        //     });
        // }, 2000);
    }

    render() {
        let kittyPerSecond = Math.round(this.state.quantityCursors * this.state.cursorsBasicProduction * 100) / 100
                            + Math.round( this.state.quantityCrazyCatLady * this.state.crazyCatLadyBasicProduction * 100) / 100; 

        return <div className = 'mainFlex'>
                <Main kittyPerSecond = {kittyPerSecond}
                            currentQuantityKitties = {Math.round(this.state.currentQuantityKitties* 100) / 100} 
                            eventOnClick = {this.addKitty} 
                            clickList = {this.state.clickList} />
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
