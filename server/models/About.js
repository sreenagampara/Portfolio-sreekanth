import mongoose from "mongoose";

const aboutSchema = mongoose.Schema({
    description1: {
        type: String,
        required: true,
    },
    description2: {
        type: String,
    },
    education: {
        type: String,
    },
    experience: {
        type: String,
    },
    image: {
        type: String, // URL to the image
    },
}, {
    timestamps: true,
});

export default mongoose.model('About', aboutSchema);
