// // notificationService.js
// import { admin } from "../lib/firebase"


// const messaging = admin.messaging()
// export const sendNotification = async (token: string, title: string, body: string) => {
//     const message = {
//         notification: {
//             title,
//             body,
//         },
//         token,
//     };

//     try {
//         const response = await messaging.send(message);
//         console.log('Successfully sent message:', response);
//     } catch (error) {
//         console.error('Error sending message:', error);
//     }
// };
