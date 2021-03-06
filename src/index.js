import React from 'react';
import ReactDOM from 'react-dom';

import CONTENT from './content.json';
import NavBar from './comp/navbar.jsx';
import Main from './comp/main.jsx';
import About from './comp/about.jsx';
import Join from './comp/join.jsx';
import Kirigami from './comp/kirigami.jsx';
import Midnight from './comp/midnight.jsx';
import Fresh from './comp/fresh.jsx';
import Footer from './comp/footer.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
      <NavBar />
        <div className="container">
          <Main content={CONTENT} />
          <span id="id_about" className="anchor"></span>
          <About content={CONTENT} />
          <span id="id_fresh" className="anchor"></span>
          <Fresh />          
          <span id="id_kirigami" className="anchor"></span>
          <Kirigami />
          <span id="id_midnight" className="anchor"></span>
          <Midnight />
          <span id="id_join" className="anchor"></span>
          <Join />
        </div>
      <Footer />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);