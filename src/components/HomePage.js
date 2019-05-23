import React, { Component } from 'react';
import LoginModal from './LoginModal';
export default class HomePage extends Component {
  constructor(props){
    super(props)
    this.state={
      handle:false
    }
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="homepage">
        <button 
        onClick={()=>
          this.setState({
            handle: !this.state.handle
          })
        }>
          点击后按需加载 LoginModal 组件。
        </button>
        {
          this.state.handle ? <LoginModal></LoginModal>:null
        }
      </div>
    );
  }
}