import { Request, Response } from "express";
import { Session } from "../database/models/session.model";
import { Tutor } from "../database/models/tutor.model";
import { User } from "../database/models/user.model";
import { SendNotificationToSessionStudents } from "../utils/firebase-notfication-service";

export const CreateSession = async (req: Request, res: Response) => {
    try {
        const { name, subject, id, starts_at, max_user } = req.body;
        if (!name || !subject || !id || !starts_at || !max_user) {
            return res.status(409).json({
                success: false,
                message: "Please provide all required data."
            })
        }
        const tutor = await Tutor.findOne({ _id: id });



        if (!name || !subject || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }

        if (!tutor) {
            return res.status(404).json({
                success: false,
                message: "No account found."
            })
        }
        if (!tutor.is_verified) {
            return res.status(409).json({
                success: false,
                message: "Only Verified tutor can create session."
            })
        }

        const newSession = {
            name,
            subject,
            tutor: tutor._id,
            status: "published",
            duration: "60 min",
            starts_at: starts_at || new Date(Date.now()),
            max_user: max_user || 10
        }

        const new_session = await Session.create(newSession);

        return res.status(201).json({
            success: true,
            session: new_session,
            message: "Session created successfully."
        })

    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server error."
        })
    }
}

export const UpdateSession = async (req: Request, res: Response) => {
    const { session_id, tutor_id } = req.query;
    if (!session_id || !tutor_id) {
        return res.status(409).json({
            success: false,
            message: "Please provide all required data."
        })
    }
    try {

        const session = await Session.findById(session_id);
        const tutor = await Tutor.findById(tutor_id);
        const updatePayload = { ...req.body }

        if (!session || !tutor) {
            return res.status(404).json({
                success: false,
                message: "Invlaid Id provided."
            })
        }

        const isSessionCreator = session.tutor.toString() === tutor._id.toString();

        if (!isSessionCreator) {
            return res.status(409).json({
                success: false,
                message: "You are not allowed to perform this action."
            })
        }

        if (session.status === "completed") {
            return res.status(409).json({
                success: false,
                message: "Session is already completed."
            })
        }

        await Session.findByIdAndUpdate({ _id: session._id }, { ...updatePayload }, { new: true, upsert: true })
        const updatedSession = await Session.findById(session._id).populate("tutor", "full_name avatar exp email exp").populate("students", "full_name email avatar").populate("subject", "name icon")

        res.status(200).json({
            success: true,
            session: updatedSession,
            message: "Session details updated successfully."
        })
        // realtime push notification service  in detach mode
        if (updatePayload.status === "live" && updatePayload.join_url.length && updatePayload.room_id.length) {
            setImmediate(() => {
                SendNotificationToSessionStudents(session_id.toString());
            });
        }

    } catch (error) {
        console.error("Error updating session:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}


export const GetSessions = async (req: Request, res: Response) => {
    const { tutor, user, status, id } = req.query;

    try {
        let filter: Record<string, any> = {};

        if (tutor) {
            filter.tutor = tutor;
        }
        if (id) {
            filter._id = id
        }

        if (user) {
            filter.student = user;
        }

        if (status) {
            filter.status = status;
        }
        if (!user && !tutor && !status && !id) {
            return res.status(400).json({ success: false, message: "Please provide at least a param." });
        }
        const sessions = await Session.find(filter)
            .populate("tutor", "full_name avatar exp email exp") // Adjust fields to populate
            .populate("students", "full_name avatar") // Adjust fields to populate
            .populate("subject", "name icon");


        if (!sessions.length) {
            return res.status(404).json({
                success: false,
                message: "No session found."
            })
        }

        res.status(200).json({
            success: true,
            sessions,
            message: "Sessions fetched successfully."
        });
    } catch (error) {
        console.error("Error fetching sessions:", error);
        res.status(500).json({ message: "Failed to fetch sessions. Please try again later." });
    }
};



export const BookSession = async (req: Request, res: Response) => {
    const { session_id, user_id, tutor_id } = req.query;

    try {
        if (!session_id || !user_id || !tutor_id) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required data."
            });
        }
        const session = await Session.findById(session_id);
        const user = await User.findById(user_id);

        if (!session || !user) {
            return res.status(404).json({
                success: false,
                message: "Invalid session or user ID."
            });
        }
        const isSessionCreator = session.tutor.toString() === tutor_id.toString();
        if (!isSessionCreator) {
            return res.status(409).json({
                success: false,
                message: "You are not allowed to perform this action."
            })
        }

        if (session.students.includes(user._id)) {
            return res.status(409).json({
                success: false,
                message: "You have already booked this session."
            });
        }

        if (session.students.length >= session.max_user) {
            return res.status(409).json({
                success: false,
                message: "Session is already full."
            });
        }

        session.students.push(user._id);
        await session.save();

        return res.status(200).json({
            success: true,
            session,
            message: "Session booked successfully."
        });
    } catch (error) {
        console.error("Error booking session:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};