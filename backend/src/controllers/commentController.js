import CommentModel from "../services/commentService.js";

export const createComment = async (req, res) => {
  const { postId, content, userId } = req.body;
  const comment = await CommentModel.create(postId, content, userId);
  res
    .status(200)
    .json({ message: "comment created successfully", data: comment });
};

export const getCommentsByPostId = async (req, res) => {
  try {
  const Id = req.params.postId;
  const comment = await CommentModel.getCommentsByPostId(Id);
  if (!comment) {
    return res.json({ message: "comment is empty" });
  }
  res.status(200).json({ data: comment });
} catch (err) {
  res.status(500).json({ error: err.message });
}
};

export const updateComment = async (req, res) => {
  try {
  const Id = req.params.Id;
  const updatedData = req.body;
  const comment = await CommentModel.update(Id, updatedData);
  if (!comment) {
    return res.json({ message: "comment Not found" });
  }
  res.status(200).json({ data: comment });
} catch (err) {
  res.status(500).json({ error: err.message });
}
};

export const deleteComment = async (req, res) => {
  try {
  const Id = req.params.Id;
  const comment = await CommentModel.delete(Id);
  if (!comment) {
    return res.json({ message: "comment Not found" });
  }
  res.status(200).json({ message: "comment deleted successfully" });
} catch (err) {
  res.status(500).json({ error: err.message });
}
};

export const addLike = async (req, res) => {
  try {
  const { commentId, userId } = req.body;
  const like = await CommentModel.addLike(commentId, userId);
  res.status(200).json({ message: "Like Added successfully" });
} catch (err) {
  res.status(500).json({ error: err.message });
}
};

export const getLikes = async (req, res) => {
  try {
  const Id = req.body.commentId;
  const likes = await CommentModel.getLikes(Id);
  res.status(200).json({ data: likes });
} catch (err) {
  res.status(500).json({ error: err.message });
}
};
