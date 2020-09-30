const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        classroomId: {
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

module.exports = mongoose.model('Teacher', teacherSchema);