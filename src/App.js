import React, { Component } from 'react';
import HomePage from './components/HomePage';
import img1 from './assets/images/wrong.png'
import bg from './assets/images/bg.png'
export default class App extends Component {
    render() {
        return (
            // <div className='content' style={{ backgroundImage: `url(${bg})` }}>
            <div className='content' style={{ backgroundImage: `url(${bg})`}}>
                <h1>Hello React!</h1>
                <p>
                    {
                        _.join(['hello','webpack'],'~')
                    }
                </p>
                <HomePage></HomePage>
                <img src={img1}></img>
                {/* <img src={'./assets/images/bg.png'}></img> */}
                {/* <img src={require('./assets/images/wrong.png')}></img> */}
                {/* <img src={require('./images/wrong.png')}></img>
                <img src={require('./images/bg.png')}></img> */}

            </div>
        );
    }
}