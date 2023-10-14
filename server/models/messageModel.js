const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// UserNotificationSchema
// const MessageSchema = new mongoose.Schema(
//     {
//       notification_type: {type: String},
//       workflow_type: {type: String},
//       project_id:  { type: Schema.Types.ObjectId, ref: ProjectDetails},
//       project_name: {type: String},
//       task_id:  { type: Schema.Types.ObjectId, ref: ProjectTask},
//       task_name: {type: String},
//       from_user_id:{ type: Schema.Types.ObjectId, ref: User},
//       from_username: { type: String },
//       to_user_id:{ type: Schema.Types.ObjectId, ref: User},
//       to_username: { type: String },
//       text: { type: String },
//       read_status: {type: Boolean, default: false},
//       read_at: {type:Date},
//       archive_status: {type: Boolean, default: false},
//       archive_at: {type:Date},
//       is_delete: {type:Boolean, default: false}
//     }, { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } },);



module.exports = mongoose.model("Messages", MessageSchema);

// module.exports = mongoose.model("Messages", UserNotificationSchema);


// import mongoose, { Model, Schema } from "mongoose";

// import ProjectDetails from "./ProjectLevel/projectDetails";
// import ProjectTask from "./ProjectLevel/projectTask";
// import User from "./user";


// type UserNotificationDocument = mongoose.Document & {
//   notification_type: string;
//   workflow_type: string;
//   from_user_id: string;
//   from_username: string;
//   to_user_id: string;
//   to_username: string;
//   task_id: string;
//   task_name: string;
//   project_id: string;
//   project_name: string;
//   text: string;
//   read_status: boolean;
//   read_at:number;
//   archive_status:boolean;
//   archive_at:number;
//   is_delete:boolean;
// };
// const UserNotificationSchema = new mongoose.Schema(
//   {
//     notification_type: {type: String},
//     workflow_type: {type: String},
//     project_id:  { type: Schema.Types.ObjectId, ref: ProjectDetails},
//     project_name: {type: String},
//     task_id:  { type: Schema.Types.ObjectId, ref: ProjectTask},
//     task_name: {type: String},
//     from_user_id:{ type: Schema.Types.ObjectId, ref: User},
//     from_username: { type: String },
//     to_user_id:{ type: Schema.Types.ObjectId, ref: User},
//     to_username: { type: String },
//     text: { type: String },
//     read_status: {type: Boolean, default: false},
//     read_at: {type:Date},
//     archive_status: {type: Boolean, default: false},
//     archive_at: {type:Date},
//     is_delete: {type:Boolean, default: false}
//   }, { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } },);



// // Extended for static methods
// export interface IUserNotificationModel extends Model<UserNotificationDocument> {
//  // capitalizeName(firstName: string): any;
// }

// const UserNotification = mongoose.model<UserNotificationDocument, IUserNotificationModel>(
//   "user_notification",
//   UserNotificationSchema
// );


// export default UserNotification;
