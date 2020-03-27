import React from 'react';
import Layout from  './hoc/Layout/Layout'
import Users from './containers/Users/Users'
import style from './App.module.css';

function App() {
  return (
    <div className={style.App}>
     <Layout>
      <Users/>
     </Layout>
    </div>
  );
}

export default App;
