import React from 'react';
import ReactDOM from 'react-dom';
// import { Auth0Provider } from './react-auth0-spa';
// import config from './auth_config.json';
// import history from './utils/history';
import App from './App';
import './index.css';

// A function that routes the user to the right place
// after login
// const onRedirectCallback = (appState) => {
// 	history.push(
// 		appState && appState.targetUrl
// 			? appState.targetUrl
// 			: window.location.pathname
// 	);
// };

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,

	document.getElementById('root')
);
