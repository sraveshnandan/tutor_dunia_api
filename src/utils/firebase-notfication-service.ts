import { DeviceToken } from "../database/models/device_token.model";
import { Session } from "../database/models/session.model";
import { admin } from "../lib/firebase";

export const SendNotificationToSessionStudents = async (sessionId: string) => {
    try {

        const session = await Session.findById(sessionId).populate("student", "name email");
        if (!session) { return console.log("Session not found") }

        const { name: sessionName, starts_at, duration, students } = session;


        const studentIds = students.map((student: any) => student._id);
        const deviceTokens = await DeviceToken.find({ user: { $in: studentIds } });


        const fcmTokens = deviceTokens.flatMap((dt) => dt.tokens);

        if (fcmTokens.length === 0) {
            console.log("No FCM tokens found for enrolled students.");
            return console.log("No token found")
        }


        const payload = {
            notification: {
                title: "Session Reminder",
                body: `Your session "${sessionName}" starts at ${new Date(starts_at).toLocaleString()}. Duration: ${duration}.`,
            },
            data: {
                sessionId: sessionId.toString(),
                sessionName,
                starts_at: starts_at.toISOString(),
                duration,
            },
            tokens: fcmTokens,
        };


        const response = await admin.messaging().sendEachForMulticast(payload)

        console.log(`Successfully sent notifications: ${response.successCount}`);
        console.log(`Failed to send notifications: ${response.failureCount}`);
    } catch (error) {
        console.error("Error sending notifications:", error);
    }
};



