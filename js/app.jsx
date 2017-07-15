import React from 'react';
import ReactDOM from 'react-dom';

require('../scss/main.scss')

//RightSideBard
class ShopButton extends React.Component {
    render() {
        return <div>
            </div>
    }
}

class RightSideBar extends React.Component {
    render() {
        return <h1> dsds </h1>
    }
}

//Main 
class KittyButton extends React.Component {
    render() {
        return <div>
                KociPrzycisk
            </div>
    }
}

class Main extends React.Component {
    render() {
        return <div>
                <h2> xyz kitties  </h2>
                <h2> per second: xyz </h2>
                <KittyButton />
               </div>
    }
}

class App extends React.Component {
    render() {
        return <div>
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
