// Backend (Controller for Badge Calculation)
const User = require('../model/user'); 

exports.getBadge = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { notes, likeNotes, savedNotes } = user;

    // Calculate badge based on user activity
    let badge = 'Brass'; // Default badge
    if (notes.length >= 50 || likeNotes.length >= 100 || savedNotes.length >= 50) {
      badge = 'Gold';
    } else if (notes.length >= 10 || likeNotes.length >= 20 || savedNotes.length >= 10) {
      badge = 'Silver';
    }

    res.status(200).json({ badge });
  } catch (error) {
    console.error('Error calculating badge:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
