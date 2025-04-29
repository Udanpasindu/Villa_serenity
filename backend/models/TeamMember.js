const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add team member name']
  },
  position: {
    type: String,
    required: [true, 'Please add team member position']
  },
  image: {
    type: String,
    default: 'default-team.jpg'
  },
  bio: {
    type: String,
    required: [true, 'Please add team member bio'],
    maxlength: [300, 'Bio cannot be more than 300 characters']
  },
  socialMedia: {
    linkedin: {
      type: String
    },
    twitter: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
