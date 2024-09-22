import mongoose from 'mongoose';

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
});

// Export the User model
export default mongoose.models.User || mongoose.model('User', UserSchema);

