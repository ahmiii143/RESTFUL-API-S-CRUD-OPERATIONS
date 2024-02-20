import { User } from "../model/user.model.js";

export const userRegister = async (req, res) => {
  try {
    const { name, age, email, password } = req.body;
    if ([name, age, email, password].some((field) => field?.trim() === "")) {
      return res.json({ message: "Required all fields" });
    }

    const existedEmail = await User.findOne({
      $or: [{ email }],
    });

    if (existedEmail) {
      return res.json({ message: "Email and User is already existed" });
    }

    const user = await User.create({
      name,
      age,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res.json({ message: "Internal Server Error" });
    }
    return res.status(201).json(createdUser);
  } catch (error) {
    console.log(error.message, "error in user register controller");
    res.status(501).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json(user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error.message, "error in get user controller");
    res.status(501).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      res.status(401).json({ message: "this user does not exist" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message, "error in get user by id controller");
    res.status(502).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(502).json({ message: "Error in delete user controller" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name,
          age: age,
          email: email,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      res.status(201).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "user updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error in update user controller" });
  }
};
export default { userRegister, getUser, getUserById, deleteUser, updateUser };
