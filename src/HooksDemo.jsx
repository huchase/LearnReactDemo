import React, { useState, useCallback, useEffect } from 'react';

function UserList() {
  // 使用三个 state 分别保存用户列表，loading 状态和错误状态
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // 定义获取用户的回调函数
  // TODO: useCallback!
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://reqres.in/api/users/');
      const json = await res.json();
      // 请求成功后将用户数据放入 state
      setUsers(json.data);
    } catch (err) {
      // 请求失败将错误状态放入 state
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="user-list">
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? 'Loading...' : 'Show Users'}
      </button>
      {error
        && (
        <div style={{ color: 'red' }}>
          Failed:
          {' '}
          {String(error)}
        </div>
        )}
      <br />
      <ul>
        {users.length > 0
          && users.map((user) => <li key={user.id}>{user.first_name}</li>)}
      </ul>
    </div>
  );
}

/// ////////////////
function Show({ size }) {
  if (size === 'small') {
    return <h1>Small</h1>;
  }
  return <h1>Big</h1>;
}

const proc = (Comp) => class Name extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: this.getSize(),
    };
    // this.getSize = function() {
    //   window.innerWidth > 600?'big':'small'
    // }
  }

  getSize() {
    return window.innerWidth > 500 ? 'big' : 'small';
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ size: this.getSize() });
  };

  render() {
    return (
      <Comp size={this.state.size} />
    );
  }
};

const Tmp = proc(Show);

/// ///////////////////////////
const getSize = () => (window.innerWidth > 1000 ? 'large' : 'small');
const useWindowSize = () => {
  const [size, setSize] = useState(getSize());
  useEffect(() => {
    const handler = () => {
      setSize(getSize());
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return size;
};

function SmallComponent() {
  return <h1>Small Size</h1>;
}
function LargeComponent() {
  return <h1>Large Size</h1>;
}
function Demo() {
  const size = useWindowSize();
  if (size === 'small') return <SmallComponent />;
  return <LargeComponent />;
}
/// ///////////////////

function Ct({ num }) {
  console.log('change');
  return <p>{num > 10 ? '>10' : '<= 10'}</p>;
}

function FuncTest() {
  const [num, setNum] = useState(9);
  console.log('>>>');
  return (
    <div>
      <p>
        Num:
        {' '}
        {num}
      </p>
      <button onClick={() => setNum(num + 1)}>+</button>
      <button onClick={() => setNum(num - 1)}>_</button>
      <Ct num={num} />

    </div>
  );
}

/// //////////////////

// import React, { useState, useCallback } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const handleIncrement = useCallback(
    () => {
      setCount(count + 1);
      console.log('h');
    },
    [count], // 只有当 count 发生变化时，才会重新创建回调函数
  );
  // ...
  return (
    <button onClick={handleIncrement}>
      +
      {count}
    </button>
  );
}

/// ////////////////

const people = {
  hu: {
    age: 33,
    name: 'chase',
  },
  xly: {
    age: 12,
    name: 'xiong',
  },
};

// TODO: ?
const PeopleCtx = React.createContext(people.hu);

function B() {
  const data = React.useContext(PeopleCtx);
  return (
    <p>
      {data.age}
      {' '}
      &&
      {' '}
      {data.name}
    </p>
  );
}

function A() {
  return (
    <PeopleCtx.Provider value={people.xly}>
      <B />
    </PeopleCtx.Provider>
  );
}

/// //////////////////

function useCounter() {
  const [count, setCount] = useState(0);
  const add = useCallback(() => setCount(count + 1), [count]);
  const sub = useCallback(() => setCount(count - 1), [count]);
  const reset = useCallback(() => setCount(0), [count]);
  return {
    count, add, sub, reset,
  };
}

function MyCounter() {
  const {
    count, add, sub, reset,
  } = useCounter();
  return (
    <div>
      <p>{count}</p>
      <button onClick={add}>+</button>
      <button onClick={sub}>-</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

/// /////////////////

const useAsync = (asyncFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const exe = useCallback(() => {
    setLoading(true);
    setData(null);
    setErr(null);
    return asyncFunc().then((res) => {
      setData(res);
      console.log(res);
      setLoading(false);
    }).catch((err) => {
      setErr(err);
      setLoading(false);
    });
  }, [asyncFunc]);
  return {
    exe, data, loading, err,
  };
};

function BlogList() {
  const { exe: fetchUsers, data: users } = useAsync(async () => {
    const res = await fetch('https://reqres.in/api/users/');
    const json = await res.json();
    return json.data;
  });
  return (
    <div>
      {/* <p>{users}</p> */}
      <button onClick={fetchUsers}>Fetch</button>
    </div>
  );
}

function ttt() {
  if (false) {
    const [num, setNum] = useState(0);
  }
}

/// ///////////////////
export default function HooksDemo() {
  return (
    <div>
      <UserList />
      <Tmp />
      <Demo />
      <FuncTest />
      <Counter />
      <A />
      <MyCounter />
      <BlogList />
    </div>
  );
}
