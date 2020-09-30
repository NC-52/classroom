const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classroomSchema = new Schema(
    {
        clName: {
            type: String, 
            required: true
        },
        numberOfStudents: {
            type: Number, 
            required: true
        },
        size: {
            type: Number, 
            required: false
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Classroom', classroomSchema);