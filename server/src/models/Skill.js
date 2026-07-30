import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true
  },
  items: [{
    type: String,
    required: true
  }]
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
