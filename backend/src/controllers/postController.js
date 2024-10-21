import postModel from "../services/postsServices.js";

export const createPost = async (req, res) => {
  const { title, content, userId } = req.body;
  const media = req.files.map(file => file.filename);
  const post = await postModel.create(title, content, userId, media);
  res.status(200).json({ message: "post created successfully", data: post });
};

export const getPostsByUserId = async (req, res) => {
  try {
  const Id = req.userId;
  const posts = await postModel.getPostsByUserId(Id);
  if (!posts) {
    return res.status(404).json({ message: "posts Not Found" });
  }
  res.status(200).json({ data: posts });
  } catch (error) {
  res.status(500).json({ error: `${error.message}` });
 }
};

export const getPostById = async (req, res) => {
  try {
  const Id = req.body.postId;
  const post = await postModel.getPostById(Id);
  if (!post) {
    return res.status(404).json({ message: "post Not Found" });
  }
  res.status(200).json({ data: post });
 } catch (error) {
  res.status(500).json({ error: `${error.message}` });
 }
};

export const updatePost = async (req, res) => {
  try {
  const Id = req.params.Id;
  const updatedData = req.body;
  const media = req.files.map(file => file.filename)||null;
  if(media){
    updatedData.media=media;
  }
  const post = await postModel.update(Id, updatedData);
  if (!post) {
    return res.status(404).json({ message: "post Not found" });
  }
  res.status(200).json({ data: post });
  } catch (error) {
  res.status(500).json({ error: `${error.message}` });
  }
};

export const deletePost = async (req, res) => {
  try {
  const Id = req.params.Id;
  const post = await postModel.delete(Id);
  if (!post) {
    return res.status(404).json({ message: "post Not found" });
  }
  res.status(200).json({ message: "post deleted successfully" });
 } catch (error) {
  res.status(500).json({ error: `${error.message}` });
 }
};

export const addLike = async (req, res) => {
  try {
  const { postId, userId } = req.body;
  const like = await postModel.addLike(postId, userId);
  res.status(200).json({ message: "Like Added successfully" });
 } catch (error) {
  res.status(500).json({ error:`${error.message}` });
 }
};

export const getLikes = async (req, res) => {
  try {
  const Id = req.body.postId;
  const likes = await postModel.getLikes(Id);
  res.status(200).json({ data: likes });
 } catch (error) {
  res.status(500).json({ error: `${error.message}` });
 }
};
