// // Copyright (c) Microsoft. All rights reserved.

// // import { configureStore } from "@reduxjs/toolkit";
// // import { signalRMiddleware } from "../features/message-relay/signalRMiddleware";
// // import resetStateReducer from "./rootReducer";

// // Create a middleware API object
// const StoreMiddlewareAPI = () => { };

// // Create the Redux store
// const store = configureStore({
//   reducer: resetStateReducer,
//   // middleware: (getDefaultMiddleware) =>
//   //   getDefaultMiddleware().concat(signalRMiddleware),
// });

// // Export the store and middleware API
// export { store, StoreMiddlewareAPI };

// // export interface RootState {
// //   app: AppState;
// //   conversations: ConversationsState;
// //   plugins: PluginsState;
// //   users: UsersState;
// // }

// // export const getSelectedChatID = () => {
// //   return store.getState().conversations.selectedId;
// // };

// // export type AppDispatch = typeof store.dispatch;

// // // Function to reset the app state
// // export const resetState = () => {
// //   store.dispatch(resetApp());
// // };
