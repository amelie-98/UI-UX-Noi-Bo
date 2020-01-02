import * as accountContans from '../const/account';
import { toastError, toastSuccess } from '../helpers/toastHeplpers/toastHeplpers';

const initialState = {
	listAccount: [],
	accountEditTing: null,
};
const reducer= (state = initialState, action) => {
	switch (action.type) {
		case accountContans.FETCH_ACCOUNT: {
			return {
				...state,
				listAccount: []
			};
		}
		case accountContans.FETCH_ACCOUNT_SUCCESS: {
			const {data} = action.payload;
			return {
				...state,
				listAccount: data
			};
		}
		case accountContans.FETCH_ACCOUNT_FAILED: {
			const {error} = action.payload;
			toastError(error);
			return {
				...state,
				listAccount: [],
			};
		}
		case accountContans.ADD_ACCOUNT: {
			return {
				...state,	
			};
		}
		case accountContans.ADD_ACCOUNT_SUCCESS: {
			const {data} = action.payload;
			toastSuccess('Thêm mới tài khoản thành công !');
			return {
				...state,
				listAccount:[data].concat(state.listAccount)
			};
		}
		case accountContans.ADD_ACCOUNT_FAILED: {
			const {error} = action.payload;
			toastError(error);
			return {
				...state,
			};
		}
		case accountContans.SET_ACCOUNT_EDITTING: {
			const {account} = action.payload;
			return {
				...state,
				accountEditTing: account
			};
		}
		case accountContans.UPDATE_ACCOUNT: {
			return {
				...state,
			};
		}
		case accountContans.UPDATE_ACCOUNT_SUCCESS: {
			const {data} = action.payload;
			const { listAccount } = state;
			const index = listAccount.findIndex(item => item.id === data.id);
			if(index !== -1){
				const newList = [
					...listAccount.slice(0, index),
					data,
					...listAccount.slice(index + 1),
				];
				toastSuccess('Chỉnh sửa tài khoản thành công !');
				return {
					...state,
					listAccount: newList,
				};
			}
			return {
				...state,
			};
		}
		case accountContans.UPDATE_ACCOUNT_FAILED: {
			const {error} = action.payload;
			toastError(error);
			return {
				...state,
			};
		}
		case accountContans.DELETE_ACCOUNT: {
			return {
				...state,
			};
		}
		case accountContans.DELETE_ACCOUNT_SUCCESS: {
			const {data} = action.payload;
			toastSuccess('Xóa tài khoản thành công !');
			return {
				...state,
				listAccount: state.listAccount.filter(item => item.id !== data)
			};
		}
		case accountContans.DELETE_ACCOUNT_FAILED: {
			const {error} = action.payload;
			toastError(error);
			return {
				...state,
			};
		}
		case accountContans.SEARCH_ACCOUNT: {
			return {
				...state,
				listAccount: []
			};
		}
		case accountContans.SEARCH_ACCOUNT_SUCCESS: {
			const {data} = action.payload;
			return {
				...state,
				listAccount: data
			};
		}
		case accountContans.SEARCH_ACCOUNT_FAILED: {
			const {error} = action.payload;
			toastError(error);
			return {
				...state,
				listAccount: [],
			};
		}
		default:
			return state;
	}
};

export default reducer;