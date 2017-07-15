import React from 'react';
import ReactDOM from 'react-dom';

require('../scss/main.scss')

//RightSideBard
class ShopButton extends React.Component {
    render() {
        return <div className = "shopButton">
                {this.props.name}
            </div>
    }
}

class RightSideBar extends React.Component {
    render() {
        return <div className = 'rightSideBar'>
            <ShopButton name = 'cursors' />
            <ShopButton name = 'CrazyCatLady' />
            </div>
    }
}

//Main 
class KittyButton extends React.Component {
    render() {
        return <div className = 'kittyButton'>
            </div>
    }
}

class Main extends React.Component {
    render() {
        return <div className = 'main'>
                <h2> xyz kitties  </h2>
                <h2> per second: xyz </h2>
                <KittyButton />
               </div>
    }
}

class App extends React.Component {
    render() {
        return <div className = 'mainFlex'>
                <Main />
                <RightSideBar />
               </div>
    }
}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
