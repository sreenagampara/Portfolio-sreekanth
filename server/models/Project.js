import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    technologies: [{
        type: String,
    }],
    link: {
        type: String,
    },
    github: {
        type: String,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Project', projectSchema);
