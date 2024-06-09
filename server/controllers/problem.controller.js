import ProblemReport from '../models/problem.model.js';
import User from '../models/user.model.js';
import Admin from '../models/admin.model.js';
import Message from '../models/message.model.js';

export const createProblemReport = async (req, res) => {
    try {
        const { title, category, description } = req.body;
        const user = await User.findById(req.userId);
        const newProblemReport = await ProblemReport.create({ user, title, category, description });
        res.status(201).json({ message: "problem send successfully" });
    } catch (error) {
        console.error('Error creating problem report:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const createMessage = async (req, res) => {
    try {
        const { content, userType } = req.body;
        const { problemId } = req.params;
        if (userType == "user") {
            const sender = await User.findById(req.userId);
            const newMessage = await Message.create({ problemReport: problemId, user: sender, senderRole: sender.role, content });
            await ProblemReport.findByIdAndUpdate(problemId, { $push: { messages: newMessage._id } });
        } else if (userType == "admin") {
            const sender = await Admin.findById(req.userId);
            const newMessage = await Message.create({ problemReport: problemId, admin: sender, senderRole: sender.role, content });
            await ProblemReport.findByIdAndUpdate(problemId, { $push: { messages: newMessage._id } });
        }

        res.status(201).json({ message: 'message sent' });
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const getAllUserProblemsWithMessages = async (req, res) => {
    try {
        const problemsWithMessages = await ProblemReport.find({ user: req.userId })
            .populate('messages')
            .populate('user');
        res.status(200).json(problemsWithMessages.map(problem => {
            const createdAt = problem.createdAt ? problem.createdAt.toISOString().split('T')[0].replace(/-/g, '/') : null;
            return {
                ...problem.toObject(),
                createdAt: createdAt,
            };
        }));
    } catch (error) {
        console.error('Error fetching problems with messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const getAllProblemsWithMessages = async (req, res) => {
    try {
        const problemsWithMessages = await ProblemReport.find().populate('messages').populate('user');
        res.status(200).json(problemsWithMessages.map(problem => {
            const createdAt = problem.createdAt ? problem.createdAt.toISOString().split('T')[0].replace(/-/g, '/') : null;
            return {
                ...problem.toObject(),
                createdAt: createdAt,
            };
        }));
    } catch (error) {
        console.error('Error fetching problems with messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const closeTicket = async (req, res) => {
    try {
        const { problemId } = req.params;
        await ProblemReport.findByIdAndUpdate(problemId, { status: "close" });

        res.status(201).json({ message: 'problem closed! ' });
    } catch (error) {
        console.error('Error fetching problems with messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const deleteTicket = async (req, res) => {
    const { ProblemIds } = req.body;
    try {
        for (const problemid of ProblemIds) {
            await ProblemReport.findByIdAndDelete(problemid);
        }

        res.status(200).json({ message: 'tickets deleted successfully' });
    } catch (error) {
        console.error('Error deleting tickets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
