import axios from 'axios';
import * as accountContans from '../const/account';
import { showLoading, hideLoading } from './ui';
import { showModel, hideModel } from './modal';

const API_ENDPOINT = 'http://localhost:3000';

export const fetchListAccount = () => {
	return {
		type: accountContans.FETCH_ACCOUNT,
	};
};

export const fetchListAccountSuccess = data => {
	return {
		type: accountContans.FETCH_ACCOUNT_SUCCESS,
		payload: {
			data
		}
	};
};

export const fetchListAccountFailed = error => {
	return {
		type: accountContans.FETCH_ACCOUNT_FAILED,
		payload: {
			error
		}
	};
};

export const addAccount = () => {
	return {
		type: accountContans.ADD_ACCOUNT,
	};
};

export const addAccountSuccess = data => {
	return {
		type: accountContans.ADD_ACCOUNT_SUCCESS,
		payload: {
			data
		}
	};
};

export const addAccountFailed = error => {
	return {
		type: accountContans.ADD_ACCOUNT_FAILED,
		payload: {
			error
		}
	};
};

export const setAccountEditting = account => {
	return {
		type: accountContans.SET_ACCOUNT_EDITTING,
		payload: {
			account,
		}
	};
};

export const updateAccount = () => {
	return {
		type: accountContans.UPDATE_ACCOUNT,
	};
};

export const updateAccountSuccess = data => {
	return {
		type: accountContans.UPDATE_ACCOUNT_SUCCESS,
		payload: {
			data
		}
	};
};

export const updateAccountFailed = error => {
	return {
		type: accountContans.UPDATE_ACCOUNT_FAILED,
		payload: {
			error
		}
	};
};

export const deleteAccount = (id) => {
	return {
		type: accountContans.DELETE_ACCOUNT,
		payload: {
			id
		}
	};
};

export const deleteAccountSuccess = data => {
	return {
		type: accountContans.DELETE_ACCOUNT_SUCCESS,
		payload: {
			data
		}
	};
};

export const deleteAccountFailed = error => {
	return {
		type: accountContans.DELETE_ACCOUNT_FAILED,
		payload: {
			error
		}
	};
};

export const searchAccount = () => {
	return {
		type: accountContans.SEARCH_ACCOUNT,
	};
};

export const searchAccountSuccess = data => {
	return {
		type: accountContans.SEARCH_ACCOUNT_SUCCESS,
		payload: {
			data
		}
	};
};

export const searchAccountFailed = error => {
	return {
		type: accountContans.SEARCH_ACCOUNT_FAILED,
		payload: {
			error
		}
	};
};

//Request list account
export const fetchListAccountRequest = () => {
 return dispatch => {
	 dispatch(fetchListAccount());
	 dispatch(showLoading());
	 axios.get(`${API_ENDPOINT}/currentUser`)
	 	.then(res => {
			 dispatch(fetchListAccountSuccess(res.data));
	 	})
	 	.catch(error => {
		 	dispatch(fetchListAccountFailed(error));
		 });
	 	setTimeout(() => dispatch(hideLoading()), 1000);
 };
};

//Add account
export const addNewAccountRequest = (data) => {
 return dispatch => { 
	 dispatch(addAccount());
	 dispatch(showLoading());
	 axios.post(`${API_ENDPOINT}/currentUser`, data)
	 .then(response => {
		 dispatch(addAccountSuccess(response.data));
		 dispatch(hideModel());
	 })
	 .catch(error => {
		 dispatch(addAccountFailed(error));
		 dispatch(showModel());
	 });
	 setTimeout(() => dispatch(hideLoading()), 1000);
 };
};

//Update Account
export const updateAccountRequest = (id, data) => {
 return dispatch => { 
	 dispatch(updateAccount(id));
	 dispatch(showLoading());
	 axios.put(`${API_ENDPOINT}/currentUser/${id}`, data)
	 .then(response => {
		 dispatch(updateAccountSuccess(response.data));
		 dispatch(hideModel());
	 })
	 .catch(error => {
		 dispatch(updateAccountFailed(error));
		 dispatch(showModel());
	 });
	 setTimeout(() => dispatch(hideLoading()), 1000);
 };
};

// delete account
export const deleteAccountRequest = (id) => {
	return dispatch => { 
		dispatch(deleteAccount(id));
		dispatch(showLoading());
		axios.delete(`${API_ENDPOINT}/currentUser/${id}`)
		.then(response => {
			dispatch(deleteAccountSuccess(id));
			dispatch(hideModel());
		})
		.catch(error => {
			dispatch(deleteAccountFailed(error));
			dispatch(showModel());
		});
		setTimeout(() => dispatch(hideLoading()), 1000);
	};
 };

//  //Request search account
// export const searchAccountRequest = (id) => {
// 	return dispatch => {
// 		dispatch(searchAccount());
// 		dispatch(showLoading());
// 		axios.get(`${API_ENDPOINT}/currentUser?${id}`)
// 			.then(res => {
// 				dispatch(searchAccountSuccess(res.data));
// 			})
// 			.catch(error => {
// 				dispatch(searchAccountFailed(error));
// 			});
// 			setTimeout(() => dispatch(hideLoading()), 1000);
// 	};
//  };