import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import '@/assets/stylus/index.styl';

import SvgIcon from './components/SvgIcon';

const App: React.FC<{}> = ({}) => {
  const [count, update] = useState(0);

  return (
    <div className="test">
      <SvgIcon
        name="close"
        title="close"
        stroked
        color="secondary"
        iconSettings={{ strokeWidth: 3 }}
      />

      <h1>Counter: {count}</h1>

      <button onClick={() => update(count + 1)}>Increment</button>
      <button onClick={() => update(count - 1)}>Increment</button>
    </div>
  );
};

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
