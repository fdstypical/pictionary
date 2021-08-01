import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import '@/assets/stylus/index.styl';

const App: React.FC<{}> = ({}) => {
  const [count, update] = useState(0);

  return (
    <div className="test">
      <h1>Counter: {count}</h1>

      <button onClick={() => update(count + 1)}>Increment</button>
      <button onClick={() => update(count - 1)}>Increment</button>
    </div>
  );
};

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
