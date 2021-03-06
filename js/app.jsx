import React from 'react';
import ReactDOM from 'react-dom';
import ReactCursorPosition from 'react-cursor-position';

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
                                         eventOnClick = {this.props.buyItem} 
                                         itemName = 'Cursors' />
            <ShopButton name = 'CrazyCatLady' cost = {this.state.CrazyCatLadyBasicCost + this.state.CrazyCatLadyModifier * this.props.quantityCrazyCatLady} 
                                              quantity = {this.props.quantityCrazyCatLady}
                                              eventOnClick = {this.props.buyItem} 
                                              itemName = 'Crazy Cat Lady' />
            </div>
    }
}

//Main 
//TODO: Adding cursors
class Cursor extends React.Component {
    render  () {
        let id = "cursor" + this.props.id

        return <div className = "cursor" id = {id}>
                </div>
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
        let styles = {
            marginTop: this.props.position.y + 'px',
            marginLeft: this.props.position.x + 'px'
        }

        if (this.state.show === "show") {
          return <div className = "kittyNumber blockPointer" style = {styles}> 
                <p>  + 1 kitty </p>
            </div>
        } else {
            return (null)
        } 
    }
}

class KittyButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: {
                x: 0,
                y: 0
            }
        }
    }

    onClickHandler = (event) => {
        if (typeof this.props.addKitty === 'function') {
            this.props.addKitty(this.state.position);
        }
    }

    makeCursor = (quantity) => {
        let table = []

        for (let i = 0; i < quantity ;i++) {
            table.push(<Cursor id = {i} />)
        }

        return table;
    }

    render() { 
        let cursors = this.makeCursor(this.props.quantityCursors);

        //console.log(this.props.quantityCursors);

        return <ReactCursorPosition {...{
                        onPositionChanged: props => this.setState(props)}} >
                    <div className = 'kittyButton' onClick = {this.onClickHandler}>
                        {this.props.clickList}
                        {cursors}
                    </div>
                </ReactCursorPosition>
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
                <KittyButton addKitty = {this.props.addKitty}
                            clickList = {this.props.clickList} 
                            quantityCursors = {this.props.quantityCursors} />
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
            quantityCursors: 60,
            cursorsBasicProduction: 0.1,
            quantityCrazyCatLady: 0,
            crazyCatLadyBasicProduction: 0.5,
            clickList: [],
            key: 0
        }
    }

    addKitty = (position) => {
        const clickList = this.state.clickList.slice();
        clickList.push(<ShowNumber key={this.state.key} position = {position} />)

        this.setState({
            currentQuantityKitties: this.state.currentQuantityKitties + 1,
            clickList: clickList,
            key: this.state.key + 1
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
    }

    render() {
        let kittyPerSecond = Math.round(this.state.quantityCursors * this.state.cursorsBasicProduction * 100) / 100
                            + Math.round( this.state.quantityCrazyCatLady * this.state.crazyCatLadyBasicProduction * 100) / 100; 

        return <div className = 'mainFlex'>
                <Main kittyPerSecond = {kittyPerSecond}
                            currentQuantityKitties = {Math.round(this.state.currentQuantityKitties* 100) / 100} 
                            addKitty = {this.addKitty} 
                            clickList = {this.state.clickList} 
                            quantityCursors = {this.state.quantityCursors} />
                <RightSideBar quantityCursors = {this.state.quantityCursors} 
                              quantityCrazyCatLady = {this.state.quantityCrazyCatLady} 
                              buyItem = {this.buyItem} />
               </div>
    }
}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
