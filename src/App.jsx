import React, { useState, Children } from 'react';
import { render } from 'react-dom';

import reactLogo from './assets/react.svg';
import './App.css';
import HD from './HooksDemo';

import _store from './store/counter';
import { inc, dec } from './action/counter';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is
          {count}
        </button>
        <p>
          Edit
          {' '}
          <code>src/App.jsx</code>
          {' '}
          and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

function Demo({ text, children }) {
  return (
    <div>
      <h1>{text}</h1>
      <h1>
        You fucking
        {' '}
        {children}
      </h1>
    </div>
  );
}

Demo.defaultProps = {
  text: 'Hello, Default!',
};

// Demo.propTypes = { // TODO: ?
//   text: PropsTypes.string
// }

function Name() {
  return <span>Chase Hu</span>;
}

function Bg({ b }) {
  return (
    <div>
      Hello,
      {' '}
      {b}
      !
    </div>
  );
}

function Fn({ fn }) {
  return (
    <div>
      <input onChange={(evt) => fn(evt.target.value)} />
    </div>
  );
}

class Cl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'def',
    };
  }

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <Fn fn={(i) => this.setState({ name: i })} />
      </div>
    );
  }
}

function Loading() {
  return <div>Loading.You son of bitch!</div>;
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'none',
    };
  }

  componentDidMount() {
    this.props.getRes && this.props.getRes('hello');
    this.setState({ text: 'not today' });
  }

  render() {
    if (this.props.getRes) {
      return (
        <div>
          search:
          {this.state.text}
        </div>
      );
    }
    return <Loading />;
  }
}

// function some() {

// }

class Evt_Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'balah balah',
    };
    this._handleClick = this._fn.bind(this);
  }

  render() {
    // TODO: ?
    return (
      <div>
        <button onClick={this._fn.bind(this)}>Click Me</button>
        <button onClick={this._handleClick}>Click</button>
      </div>
    );
  }

  _fn() {
    console.log('You hurt me.');
    console.log(this.state.text);
  }
}

function Boy({ children, title }) {
  return (
    <div>
      <span>I am a boy!</span>
      <div>
        {children}
      </div>
      <div>
        Here is title:
        {title}
      </div>
    </div>
  );
}

const title = 'YFH9730';

const change = (Comp) => class Name extends React.Component {
  render() {
    return (
      <Comp {...this.props} title={title}><h1>I am a ...</h1></Comp>
    );
  }
};

const Tmp = change(Boy);

// let change = (part) => {
//   return(
//     <part>I am very cool!</part>
//   )
// }

function Sp({ children }) {
  return (
    <div>
      myName:
      {' '}
      {children.name}
      myAge:
      {' '}
      {children.age}
    </div>
  );
}

const todos = [
  { name: 'Sleep', done: false },
  { name: 'Sport', done: true },
  { name: 'Read', done: false },
];

function DisplayTodos({ children, list }) {
  return (
    <div>
      <ul>
        {list.map((todo, i) => <li key={i}>{children(todo)}</li>)}
      </ul>
    </div>
  );
}

function isDone(todo) {
  if (todo.done === false) {
    return false;
  }
  return true;
}

class Sk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'RGNHAWM',
    };
    this.fn = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <input value={this.state.key} onChange={this.fn} />
      </div>
    );
  }

  handleChange(e) {
    this.setState({ key: e.target.value });
  }
}

class Fsk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'wblubdubdub',
    };
    this.fn = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <h1>{this.state.key}</h1>
        <input onChange={this.fn} defaultValue={this.state.key} ref={(input) => this.input = input} />
      </div>
    );
  }

  handleChange() {
    this.setState({ key: this.input.value });
  }
}

class ShowTime extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        h:
        {' '}
        {this.props.h}
        {' '}
        && m:
        {' '}
        {this.props.m}
        {' '}
        &&
        {' '}
        {this.props.s}
      </div>
    );
  }
}

class ProcTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
    };
    this.update = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.id = setInterval(() => this.update(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  handleUpdate() {
    this.setState({
      time: new Date(this.state.time.getTime() + 1000),
    });
  }

  formatTime(t) {
    return {
      h: t.getHours(),
      m: t.getMinutes(),
      s: t.getSeconds(),
    };
  }

  render() {
    return (
      <div>
        <ShowTime {...this.formatTime(this.state.time)} />
      </div>
    );
  }
}

const store = {
  _flag: true,
  set(value) {
    this._flag = value;
  },
  get() {
    return this._flag;
  },
};

// setInterval(() => {console.log(store._flag);},1000)

class Light extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: this.props.value,
    };
    this.change = () => {
      // this.props.onChange(this.state.flag) // TODO: ?

      this.setState({ flag: !this.state.flag }, () => this.props.onChange(this.state.flag));
      // this.props.onChange(this.state.flag)
    };
  }

  render() {
    return (
      <div>
        <button onClick={this.change}>{this.state.flag ? 'on' : 'off'}</button>
      </div>
    );
  }
}

const No_store = {
  _flag: false,
  _handlers: [],
  subscribe(handler) {
    this._handlers.push(handler);
  },
  set(value) {
    this._flag = value;
    this._handlers.forEach((fn) => fn(value));
  },
  get() {
    return this._flag;
  },
};

function Switcher({ value, onChange }) {
  return (
    <div>
      <button onClick={() => onChange(!value)}>{value ? 'light on' : 'light off'}</button>
    </div>
  );
}

class No_Light extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: No_store.get(),
    };
    No_store.subscribe((value) => {
      this.setState({ value }); // TODO: ?
    });
  }

  render() {
    return (
      <div>
        {/* <button>{this.state.value?'on':'off'}</button> */}
        <Switcher value={this.state.value} onChange={No_store.set.bind(No_store)} />
      </div>
    );
  }
}

function Label({ num }) {
  const color = num > 10 ? 'red' : 'blue';
  return (
    <span style={{ color }}>{num}</span>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      {/* <p>{count}</p> */}
      <Label num={count} />
      <button onClick={() => setCount(count + 1)}>ADD</button>
      <button onClick={() => setCount(count - 1)}>SUB</button>
    </div>
  );
}

// const Diy = React.createElement("button", {
//   onClick: function() {
//     console.log("HELLO");
//   }},null)

// TODO: ?

function Box() {
  return (
    <div>
      <Demo>Xiong</Demo>
      <Bg b={<Name />} />
      <Fn fn={(i) => { console.log(i); }} />
      <Cl />
      <Search getRes={(i) => { console.log(i); }} />
      <Search />
      <Evt_Demo />
      <Tmp />
      <Sp>
        {{ name: 'chase', age: 33 }}
      </Sp>
      <DisplayTodos list={todos}>
        {(todo) => (isDone(todo) ? (
          <span>
            Done:
            {todo.name}
          </span>
        ) : (
          <span>
            Doing:
            {todo.name}
          </span>
        ))}
      </DisplayTodos>
      <Sk />
      <Fsk />
      <ProcTime time={new Date()} />
      <Light value={store.get()} onChange={store.set.bind(store)} />
      <No_Light />
      <Counter />
      {/* <Diy></Diy> */}
    </div>
  );
}

function useWindowSize() {
  const [size, setSize] = useState({ x: 0, y: 0 });
}

// export default App
// export default HD;

const persons = {
  xly: {
    age: 22,
    name: 'xionglingyao',
  },
  hyc: {
    age: 22,
    name: 'huyongchao',
  },
};

const DataPerson = React.createContext();
function UserThis() {
  const dd = React.useContext(DataPerson);
  return (
    <div>
      {dd.age}
      {' '}
      &&
      {' '}
      {dd.name}
    </div>
  );
}
function CTX() {
  return (
    <DataPerson.Provider value={persons.xly}>
      <UserThis />
    </DataPerson.Provider>
  );
}

_store.subscribe(() => { console.log(_store.getState().num); });

function ReduxDemo() {
  const count = useSelector((state) => state.num);
  const dis = useDispatch();
  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={() => dis(inc)}>+</button>
      <button type="button" onClick={() => dis(dec)}>-</button>
    </div>
  );
}

export default ReduxDemo;
