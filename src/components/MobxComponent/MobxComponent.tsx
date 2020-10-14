import React, { Component } from 'react';
import { observer } from 'mobx-react';

type MobxComponentProps = {
  store: {
    count: number;
    increment: Function;
    decrement: Function;
  }
}

@observer class MobxComponent extends Component<MobxComponentProps, {}> {


  handleIncrement = () => { this.props.store.increment() };
  handleDecrement = () => { this.props.store.decrement() };

    render() {
        return (
         <React.Fragment>
            <button onClick={this.handleDecrement}>-1</button>
            <span>{this.props.store.count}</span>
            <button onClick={this.handleIncrement}>+1</button>
         </React.Fragment>
        );
      }
      
}

export default MobxComponent;