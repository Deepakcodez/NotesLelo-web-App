const calculateUserRank = (user: any) => {
  // Define weights for each metric
  const WEIGHTS = {
    posts: 10, // 10 points per post
    likesOnOwnNotes: 5, // 5 points per like
    ownNotesSaves: 3, // 3 points per save
  };

  // Calculate score based on user data
  const postScore = user.posts.length * WEIGHTS.posts;
  const likesScore = user.likesOnOwnNotes.length * WEIGHTS.likesOnOwnNotes;
  const savesScore = user.ownNotesSaves.length * WEIGHTS.ownNotesSaves;

  const totalScore = postScore + likesScore + savesScore;

  // Determine rank based on total score
  let rank;
  if (totalScore >= 100) {
    rank = 1; // High achievers
  } else if (totalScore >= 50) {
    rank = 2;
  } else if (totalScore >= 10) {
    rank = 3;
  }else{
    rank = 0;
  }

  return {
    rank,
    totalScore,
    breakdown: {
      posts: postScore,
      likes: likesScore,
      saves: savesScore,
    },
  };
};

export default calculateUserRank;
