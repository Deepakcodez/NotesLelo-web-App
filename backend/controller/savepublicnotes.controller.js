const Post = require("../models/Post");

exports.savePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id; 

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.savedBy.includes(userId)) {
      
      post.savedBy = post.savedBy.filter((id) => id !== userId);
      await post.save();
      return res.status(200).json({ message: "Post unsaved successfully", saved: false });
    }

    
    post.savedBy.push(userId);
    await post.save();
    res.status(200).json({ message: "Post saved successfully", saved: true });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
