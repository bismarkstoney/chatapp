/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
	// Saves a user to the database
	saveUser: function (userData) {
		return axios.post('/api/v1/auth/users', userData);
	},
};
