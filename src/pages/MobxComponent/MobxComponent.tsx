import React, { Component } from 'react';
import { inject, observer, Provider  } from 'mobx-react';
import {countObject} from './MobxStore';

type CurrentComponentProps = {
  countObject: {
    count: number;
    increment: Function;
    decrement: Function;
  }
}

@inject('countObject')
@observer class CounterComponent extends Component<CurrentComponentProps, {}> {
  handleIncrement = () => { this.props.countObject.increment() };
  handleDecrement = () => { this.props.countObject.decrement() };

    render() {
        return (
         <React.Fragment>
            <button onClick={this.handleDecrement}>-1</button>
            <span>{this.props.countObject.count}</span>
            <button onClick={this.handleIncrement}>+1</button>
       
         </React.Fragment>
        );
      }
}

const MobxComponent = () => (
  <Provider countObject={countObject}>
      <CounterComponent countObject={countObject}/>
  </Provider>
);

export default MobxComponent;