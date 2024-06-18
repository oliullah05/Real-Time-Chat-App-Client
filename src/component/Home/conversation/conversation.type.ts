interface User {
    id: string;
    name: string;
    profilePhoto: string;
  }
  
  interface ConversationUser {
    userId: string;
    conversationId: string;
    user: User;
  }
  
 export  interface TConversation {
    id: string;
    lastMessage: string;
    participants: string;
    isGroup: boolean;
    groupName: string ;
    groupPhoto: string ;
    isDeleted: boolean;
    conversationsUsers: ConversationUser[];
    createdAt: string;
    updatedAt: Date |number;
    receiverProfileId: string;
    receiverProfilePhoto: string;
    receiverProfileName: string;
  }