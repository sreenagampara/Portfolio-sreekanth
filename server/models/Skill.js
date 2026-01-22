import mongoose from "mongoose";

const skillSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true, // Stores the name of the icon component (e.g., "Layout")
    },
    items: [{
        type: String,
    }],
}, {
    timestamps: true,
});

export default mongoose.model('Skill', skillSchema);
