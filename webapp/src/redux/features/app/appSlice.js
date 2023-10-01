// // Copyright (c) Microsoft. All rights reserved.

// // import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Constants } from "../../../Constants";

// import {

//   initialState,
// } from "./AppState";

// // export const appSlice = createSlice({
// //   name: "app",
// //   initialState,
// //   reducers: {
// //     setMaintenance: (state, action) => {
// //       state.isMaintenance = action.payload;
// //     },
// //     setAlerts: (state, action) => {
// //       state.alerts = action.payload;
// //     },
// //     addAlert: (state, action) => {
// //       if (
// //         action.payload.id == Constants.app.CONNECTION_ALERT_ID ||
// //         isServerConnectionError(action.payload.message)
// //       ) {
// //         updateConnectionStatus(state, action.payload);
// //       } else {
// //         addNewAlert(state.alerts, action.payload);
// //       }
// //     },
// //     removeAlert: (state, action) => {
// //       state.alerts.splice(action.payload, 1);
// //     },
// //     setActiveUserInfo: (
// //       state,
// //       action
// //     ) => {
// //       state.activeUserInfo = action.payload;
// //     },
// //     updateTokenUsage: (state, action) => {
// //       Object.entries(action.payload).forEach(([key, value]) => {
// //         action.payload[key] = getTotalTokenUsage(state.tokenUsage[key], value);
// //       });
// //       state.tokenUsage = action.payload;
// //     },
// //     // This sets the feature flag based on end user input
// //     toggleFeatureFlag: (
// //       state,
// //       action
// //     ) => {
// //       const feature = state.features[action.payload];
// //       state.features = {
// //         ...state.features,
// //         [action.payload]: {
// //           ...feature,
// //           enabled: !feature.enabled,
// //         },
// //       };
// //     },
// //     // This controls feature availability based on the state of backend
// //     toggleFeatureState: (
// //       state,
// //       action
// //     ) => {
// //       const feature = state.features[action.payload.feature];
// //       state.features = {
// //         ...state.features,
// //         [action.payload.feature]: {
// //           ...feature,
// //           enabled: action.payload.deactivate ? false : action.payload.enable,
// //           inactive: action.payload.deactivate,
// //         },
// //       };
// //     },
// //     setServiceOptions: (
// //       state,
// //       action
// //     ) => {
// //       state.serviceOptions = action.payload;
// //     },
// //   },
// // });

// // export const {
// //   addAlert,
// //   removeAlert,
// //   setAlerts,
// //   setActiveUserInfo,
// //   toggleFeatureFlag,
// //   toggleFeatureState,
// //   updateTokenUsage,
// //   setServiceOptions,
// //   setMaintenance,
// // } = appSlice.actions;

// // export default appSlice.reducer;

// // const getTotalTokenUsage = (previousSum, current) => {
// //   if (previousSum === undefined) {
// //     return current;
// //   }
// //   if (current === undefined) {
// //     return previousSum;
// //   }

// //   return previousSum + current;
// // };

// // const isServerConnectionError = (message) => {
// //   return (
// //     message.includes(
// //       `Cannot send data if the connection is not in the 'Connected' State.`
// //     ) ||
// //     message.includes(
// //       `Server timeout elapsed without receiving a message from the server.`
// //     )
// //   );
// // };

// const addNewAlert = (alerts, newAlert) => {
//   if (alerts.length === 3) {
//     alerts.shift();
//   }

//   alerts.push(newAlert);
// };

// const updateConnectionStatus = (state, statusUpdate) => {
//   if (isServerConnectionError(statusUpdate.message)) {
//     statusUpdate.message =
//       // Constant message so alert UI doesn't feel glitchy on every connection error from SignalR
//       "Cannot send data due to lost connection or server timeout. Try refreshing this page to restart the connection.";
//   }

//   // There should only ever be one connection alert at a time,
//   // so we tag the alert with a unique ID so we can remove if needed
//   statusUpdate.id ??= Constants.app.CONNECTION_ALERT_ID;

//   // Remove the existing connection alert if it exists
//   const connectionAlertIndex = state.alerts.findIndex(
//     (alert) => alert.id === Constants.app.CONNECTION_ALERT_ID
//   );
//   if (connectionAlertIndex !== -1) {
//     state.alerts.splice(connectionAlertIndex, 1);
//   }

//   addNewAlert(state.alerts, statusUpdate);
// };
