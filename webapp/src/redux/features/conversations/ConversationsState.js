
// Define the Conversations object as an empty record
const Conversations = {};

// Define the ConversationsState object with initial values
const initialState = {
  conversations: Conversations,
  selectedId: "",
};

// Define the UpdateConversationPayload interface
const UpdateConversationPayload = {
  id: "",
  messages: [],
};

// Define the ConversationTitleChange interface
const ConversationTitleChange = {
  id: "",
  newTitle: "",
};

// Define the ConversationInputChange interface
const ConversationInputChange = {
  id: "",
  newInput: "",
};

// Define the ConversationSystemDescriptionChange interface
const ConversationSystemDescriptionChange = {
  id: "",
  newSystemDescription: "",
};

// Export the necessary variables and interfaces
module.exports = {
  ConversationsState: initialState,
  UpdateConversationPayload: UpdateConversationPayload,
  ConversationTitleChange: ConversationTitleChange,
  ConversationInputChange: ConversationInputChange,
  ConversationSystemDescriptionChange: ConversationSystemDescriptionChange,
};
