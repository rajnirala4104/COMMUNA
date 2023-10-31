const chats = [
   {
      isGroup: false,
      users: [
         {
            name: "Piyush",
            email: "piyush@example.com",
         },
         {
            name: "Raj Nirala",
            email: "rajniralakamail@example.com",
         },
      ],
      _id: "617a077e18c25468bc7c4dd4",
      chatName: "John Doe",
   },
   {
      isGroup: false,
      users: [
         {
            name: "Pulkit",
            email: "pulkit@example.com",
         },
         {
            name: "Raj Nirala",
            email: "rajniralakamail@example.com",
         },
      ],
      _id: "617a077e18c25468b27c4dd4",
      chatName: "Guest User",
   },
   {
      isGroup: false,
      users: [
         {
            name: "Diksha",
            email: "anthony@example.com",
         },
         {
            name: "Raj Nirala",
            email: "rajniralakamail@example.com",
         },
      ],
      _id: "617a077e18c2d468bc7c4dd4",
      chatName: "Anthony",
   },
   {
      isGroup: true,
      users: [
         {
            name: "Neha",
            email: "neha@example.com",
         },
         {
            name: "Raj Nirala",
            email: "rajniralakamail@example.com",
         },
         {
            name: "Guest User",
            email: "guest@example.com",
         },
      ],
      _id: "617a518c4081150716472c78",
      chatName: "Friends",
      groupAdmin: {
         name: "Guest User",
         email: "guest@example.com",
      },
   },
   {
      isGroup: false,
      users: [
         {
            name: "Jane Doe",
            email: "jane@example.com",
         },
         {
            name: "Raj Nirala",
            email: "rajniralakamail@example.com",
         },
      ],
      _id: "617a077e18c25468bc7cfdd4",
      chatName: "Jane Doe",
   },
   {
      isGroup: true,
      users: [
         {
            name: "John Doe",
            email: "jon@example.com",
         },
         {
            name: "Raj Nirala",
            email: "rajniralakamail@example.com",
         },
         {
            name: "Guest User",
            email: "guest@example.com",
         },
      ],
      _id: "617a518c4081150016472c78",
      chatName: "Chill Zone",
      groupAdmin: {
         name: "Guest User",
         email: "guest@example.com",
      },
   },
];

module.exports = { chats };
