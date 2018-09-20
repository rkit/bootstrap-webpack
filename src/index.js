import 'core-js/es6/promise';
import 'core-js/fn/promise';
import './style.css';

document.querySelector('button').onclick = () => {
  import(/* webpackChunkName: "handler" */ './handler').then(handler => {
    document.body.innerHTML += handler.default();
  });
};

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
