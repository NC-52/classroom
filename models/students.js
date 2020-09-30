const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        grade: {
            type: Number,
            required: true
        },
        classId: {
            type: Schema.Types.ObjectId, 
            ref: 'Classroom',
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Student', studentSchema);