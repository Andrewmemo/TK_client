import { observable, action  } from 'mobx';

type MobxComponentProps = {
      count: number;
      increment: Function;
      decrement: Function;
  }

export const countObject: MobxComponentProps = observable({
  
  count: 40,

  increment() { this.count++; },

  decrement() { this.count-- },
},{
  increment: action('Plus one'),
  decrement: action('Minus one'),
},)