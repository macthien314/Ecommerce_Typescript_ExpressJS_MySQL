import { User } from "../db/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";
import asyncHandler from "../middleware/async";
// import { SendEmail } from '../utils/email';
require("dotenv").config();

const hashPassword = (password: string): string =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const registerService = (item: any): Promise<any> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await User.create({
        id: item.id,
        email: item.email,
        username: item.username,
        password: hashPassword(item.password),
        role: "User",
        image: "",
        resetPassToken: "",
        resetPassTokenExp: "",
      });

      const token = jwt.sign(
        { id: response.id, email: response.email },
        process.env.SECRET_KEY!,
        { expiresIn: "2d" }
      );

      resolve({
        err: token ? 0 : 2,
        msg: token ? "Register is successful!" : "Email has already been used!",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });

const loginService = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<any> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await User.findOne({
        where: { email },
        raw: true,
      });

      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassword &&
        jwt.sign(
          { id: response.id, email: response.email },
          process.env.SECRET_KEY!,
          { expiresIn: "2d" }
        );

      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Login is successfully !"
          : response
          ? "Password is wrong !"
          : "Email not found !",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });

// const forgotPassword = asyncHandler(async (item: { email: string }) => {
//   try {
//     const user = await User.findOne({ where: { email: item.email } });
//     if (!user) return false;

//     const resetToken = user.resetPassword();
//     await user.save();

//     // create resetURL
//     const resetURL = `/api/v1/auth/resetPassword/${resetToken}`;
//     const message = `Truy cập vào link để đổi pass : ${resetURL}`;

//     try {
//       await SendEmail({
//         email: user.email,
//         subject: "Thay đổi PassWord",
//         message
//       });
//       return 'Vui lòng kiểm tra email của bạn';
//     } catch (err) {
//       user.resetPassToken = null;
//       user.resetPassTokenExp = null;
//       await user.save();
//       return 'Không thể gửi email, vui lòng thử lại';
//     }
//   } catch (error) {
//     throw error;
//   }
// });

// const resetPassword = asyncHandler(async (item: { resetToken: string, password: string }) => {
//   try {
//     const resetPassToken = crypto
//       .createHash('sha256')
//       .update(item.resetToken)
//       .digest('hex');

//     const user = await db.User.findOne({
//       where: {
//         resetPassToken: resetPassToken,
//         resetPassTokenExp: { [Op.gt]: Date.now() }
//       }
//     });

//     if (!user) return false;

//     user.password = item.password;
//     user.resetPassToken = null;
//     user.resetPassTokenExp = null;

//     await user.save();
//     return user;
//   } catch (error) {
//     throw error;
//   }
// });

export {
  registerService,
  loginService,
  //   forgotPassword,
  //   resetPassword
};
