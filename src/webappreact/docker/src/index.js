import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import 'toastr/build/toastr.css';
import 'react-vis/dist/style.css';

import App from './components/App';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

/*
$(document).ready(function() {
	$('collapsible').collapsible();
});
*/
