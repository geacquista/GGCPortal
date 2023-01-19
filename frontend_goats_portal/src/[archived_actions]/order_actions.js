import { CREATE_ORDER, RETRIEVE_ORDERS, UPDATE_ORDER, DELETE_ALL_ORDERS, DELETE_ORDER } from "./actionTypes";
import OrderService from "../services/OrderDataService";

export const createOrder = (datePlaced, isGift, giftFor, giftMessage, trackingNumber, orderStatusId, shippingId, customerId, referenceNumber) => async (dispatch) => {
  try {
    const res = await OrderService.create({ datePlaced, isGift, giftFor, giftMessage, trackingNumber, orderStatusId, shippingId, customerId, referenceNumber });

    dispatch({
      type: CREATE_ORDER,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveOrders = () => async (dispatch) => {
  try {
    const res = await OrderService.getAll();

    dispatch({
      type: RETRIEVE_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateOrder = (id, data) => async (dispatch) => {
  try {
    const res = await OrderService.update(id, data);

    dispatch({
      type: UPDATE_ORDER,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    await OrderService.delete(id);

    dispatch({
      type: DELETE_ORDER,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllOrders = () => async (dispatch) => {
  try {
    const res = await OrderService.deleteAll();

    dispatch({
      type: DELETE_ALL_ORDERS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// export const findOrdersByTitle = (title) => async (dispatch) => {
//   try {
//     const res = await OrderService.findByTitle(title);

//     dispatch({
//       type: RETRIEVE_ORDERS,
//       payload: res.data,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// const handleClick = () => {
//     if (name && email) {
//       dispatch(
//         userAdded({
//           id: usersAmount + 1,
//           name,
//           email,
//         })
//       );

//       setError(null);
//       history.push("/");
//     } else {
//       setError("Fill in all fields");
//     }

//     setName("");
//     setEmail("");
//   };

// from ui-actions
// export const getUser = (history, userName, getUserURL) => {

// 	return async (dispatch) => {
// 		const login = async () => {
// 			const responseData = await fetch( getUserURL, {
// 				method: "POST",
// 				body: JSON.stringify({userName: userName}),
// 				header: {},
// 			});
// 			if (responseData.status === 403) {
// 				history.logout();
// 				history.replace("/login");
// 			} else if (responseData.status === 200) {
// 				const data = await responseData.json();
// 				return data;
// 			}
// 		};
// 		try {
// 			dispatch(uiActions.setIsLoading(true));
// 			const data = await login();
// 			if (data.status !== 200) {
// 				dispatch(uiActions.setIsError(true));
// 				dispatch(uiActions.setErrorMsg(data.error.message));
// 			} else {
// 				dispatch(uiActions.setIsError(false));
// 				dispatch(uiActions.setErrorMsg(""));
// 				console.log("[ Login User ] : ", data);
// 				dispatch(uiActions.setLogin({token: data.response.jwt, userName: data.response.username}));
// 				dispatch(uiActions.setSnackMsg("成功登入!"));
// 				history.replace("/");
// 			}
// 		} catch (err) {
// 			alert(err.message);
// 			dispatch(uiActions.setIsError(true));
// 		}
// 	};
// };

// export const logout = () => {
// 	return async (dispatch) => {
// 		dispatch(uiActions.setLogout());
// 	}
// }

// export const setSnackMsg = (msg) => {
// 	return async (dispatch) => {
// 		dispatch(uiActions.setSnackMsg(msg));
// 	}
// }