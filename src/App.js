import React, { Component } from 'react';
import HomePage from './components/HomePage';
export default class App extends Component {
    componentDidMount() {
        
    }
    
    render() {
        return (
            <div className='content'>
                <h1>Hello React!</h1>
                <p>
                    {
                        _.join(['hello','webpack'],'~')
                    }
                </p>
                <HomePage></HomePage>

            </div>
        );
    }
}