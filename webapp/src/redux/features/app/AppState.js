// Copyright (c) Microsoft. All rights reserved.

// import {
//   AuthHelper,
//   export const DefaultActiveUserInfo: ActiveUserInfo = {
// id: "c05c61eb-65e4-4223-915a-fe72b0c9ece1",
//   email: "user@contoso.com",
//     username: "Default User",
// };,
// } from "../../../libs/auth/AuthHelper";
// import { AlertType } from "../../../libs/models/AlertType";
import { ServiceOptions } from "../../../libs/services/ServiceOptions"
// import { TokenUsage } from "../../../libs/models/TokenUsage";

// export interface ActiveUserInfo {
//   id: string;
//   email: string;
//   username: string;
// }

// export interface Alert {
//   message: string;
//   type: AlertType;
//   id?: string;
//   onRetry?: () => void;
// }

// interface Feature {
//   enabled: boolean; // Whether to show the feature in the UX
//   label: string;
//   inactive?: boolean; // Set to true if you don't want the user to control the visibility of this feature or there's no backend support
//   description?: string;
// }

// Define FeatureKeys as an object
export const FeatureKeys = {
  DarkMode: null,
  SimplifiedExperience: null,
  PluginsPlannersAndPersonas: null,
  AzureContentSafety: null,
  AzureCognitiveSearch: null,
  BotAsDocs: null,
  MultiUserChat: null,
  RLHF: null, // Reinforcement Learning from Human Feedback
};

// Define ActiveUserInfo as an empty object (assuming it's an object type)
export const ActiveUserInfo = {};

// Define TokenUsage as an empty object (assuming it's an object type)
export const TokenUsage = {};

// Define ServiceOptions as an empty object (assuming it's an object type)
export const serviceOptions = ServiceOptions;

// Define Setting as an object with property values (you need to replace 'string' and 'boolean' with actual values)
export const Setting = {
  title: 'your_title_here',
  description: 'your_description_here',
  features: FeatureKeys,
  stackVertically: true, // or false
  learnMoreLink: 'your_link_here',
};

// Define AppState as an object with property values (you need to replace types with actual values)
export const AppState = {
  alerts: [],
  activeUserInfo: ActiveUserInfo,
  tokenUsage: TokenUsage,
  features: {},
  settings: [Setting], // Assuming it's an array of Setting objects
  serviceOptions: ServiceOptions,
  isMaintenance: false, // or true
};

// Export the variables



export const Features = {
  [FeatureKeys.DarkMode]: {
    enabled: false,
    label: "Dark Mode",
  },
  [FeatureKeys.SimplifiedExperience]: {
    enabled: true,
    label: "Simplified Chat Experience",
  },
  [FeatureKeys.PluginsPlannersAndPersonas]: {
    enabled: true,
    label: "Plugins & Planners & Personas",
    description: "The Plans and Persona tabs are hidden until you turn this on",
  },
  [FeatureKeys.AzureContentSafety]: {
    enabled: false,
    label: "Azure Content Safety",
    inactive: true,
  },
  [FeatureKeys.AzureCognitiveSearch]: {
    enabled: false,
    label: "Azure Cognitive Search",
    inactive: true,
  },
  [FeatureKeys.BotAsDocs]: {
    enabled: false,
    label: "Save/Load Chat Sessions",
  },
  [FeatureKeys.RLHF]: {
    enabled: false,
    label: "Reinforcement Learning from Human Feedback",
    description:
      "Enable users to vote on model-generated responses. For demonstration purposes only.",
    // TODO: [Issue #42] Send and store feedback in backend
  },
};

// export const Settings = [
//   {
//     // Basic settings has to stay at the first index. Add all new settings to end of array.
//     title: "Basic",
//     features: [FeatureKeys.DarkMode, FeatureKeys.PluginsPlannersAndPersonas],
//     stackVertically: true,
//   },
//   {
//     title: "Display",
//     features: [FeatureKeys.SimplifiedExperience],
//     stackVertically: true,
//   },
//   {
//     title: "Azure AI",
//     features: [
//       FeatureKeys.AzureContentSafety,
//       FeatureKeys.AzureCognitiveSearch,
//     ],
//     stackVertically: true,
//   },
//   {
//     title: "Experimental",
//     description:
//       "The related icons and menu options are hidden until you turn this on",
//     features: [
//       FeatureKeys.BotAsDocs,
//       FeatureKeys.MultiUserChat,
//       FeatureKeys.RLHF,
//     ],
//   },
// ];

export const initialState = {
  alerts: [],
  activeUserInfo: {
    id: "c05c61eb-65e4-4223-915a-fe72b0c9ece1",
    email: "user@contoso.com",
    username: "Default User",
  },
  tokenUsage: {},
  features: Features,
  serviceOptions: { memoryStore: { types: [], selectedType: "" }, version: "" },
  isMaintenance: false,
};

