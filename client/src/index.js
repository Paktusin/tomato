import ReactDOM from 'react-dom';
import React from 'react';

class App extends React.Component {
    render() {
        return (<h1>App</h1>)
    }
}

window.addEventListener("DOMContentLoaded", () => {
    console.log(document.getElementById('root'));
    ReactDOM.render(<App/>, document.getElementById('root'));
});