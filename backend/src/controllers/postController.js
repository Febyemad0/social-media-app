import postModel from "../services/postsServices.js"

   export const createPost = async (req, res) => {
     const {title, content, userId, media } = req.body;
     const post = await postModel.create(title, content, userId, media);
     res
      .status(200)
      .json({ message: "post created successfully", data:post});
   };


    export const getPostsByUserId = async (req ,res) => {
      const Id = req.body.userId;
      const posts =  await postModel.getPostsByUserId(Id);
      if (!posts) {
        return res.status(404).json({ message: "posts Not Found" });
      }
      res
        .status(200)
        .json({data:posts});
    };

    export const getPostById = async (req ,res) => {
        const Id = req.body.postId;
        const post =  await postModel.getPostById(Id);
        if (!post) {
            return res.status(404).json({ message: "post Not Found" });
          }
          res
            .status(200)
            .json({data:post});
    };



    export const updatePost = async (req ,res) => {
        const Id = req.params.Id;
        const updatedData = req.body;
        const post =  await postModel.update(Id , updatedData);
        if (!post){
          return res.status(404).json({message: "post Not found"})
       }
          res
            .status(200)
            .json({data:post});
    };

    export const deletePost = async (req ,res) => {
        const Id = req.params.Id;
        const post =  await postModel.delete(Id);
        if (!post){
          return res.status(404).json({message: "post Not found"})
        }
          res
            .status(200)
            .json({message: "post deleted successfully"});
    };

    export const addLike = async (req, res) => {
        const {postId, userId} = req.body;
        const like = await postModel.addLike(postId, userId);
        res
          .status(200)
          .json({ message: "Like Added successfully"});
       };
    
    export const getLikes = async (req ,res) => {
        const Id = req.body.postId;
        const likes =  await postModel.getLikes(Id);
          res
            .status(200)
            .json({data:likes});
        };


    


