import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a project title'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
        },
        technologies: {
            type: [String],
            required: true,
        },
        imageUrl: {
            type: String,
        },
        githubUrl: {
            type: String,
        },
        liveUrl: {
            type: String,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
