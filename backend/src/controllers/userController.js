import userModel from "../services/userServices.js"

export const createUser = async (req, res) => {

    const { username, email, password, profileImage } = req.body;
    const user = await userModel.create(username, email, password, profileImage);
    if (!user) {
      return res.status(404).json({ message: "Error" });
    }
    res
      .status(200)
      .json({ message: "user created successfully", data:user});
   };

export const getUserByEmail = async (req ,res) => {
    const email = req.body.email;
    const user =  await userModel.getByEmail(email);
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      res
        .status(200)
        .json({data:user});
    };

    export const getUserById = async (req ,res) => {
        const Id = req.params.Id;
        const user =  await userModel.getById(Id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
          }
          res
            .status(200)
            .json({data:user});
    };

    export const updateUser = async (req ,res) => {
        const Id = req.params.Id;
        const updatedData = req.body;
        const user =  await userModel.update(Id , updatedData);
        if (!user) {
          return res.status(404).json({ message: "user doesn't exist" });
        }
          res
            .status(200)
            .json({data:user});
    };

    export const deleteUser = async (req ,res) => {
        const Id = req.params.Id;
        const user =  await userModel.delete(Id);
        if (!user) {
          return res.status(404).json({ message: "user doesn't exist" });
        }
          res
            .status(200)
            .json({message: "user deleted successfully"});
    };



    


