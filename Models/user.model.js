const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  Board: [{
    name: String,
    tasks: [
      {
        title: String,
        description: String,
        status: {
          type: String,
          enum: ["Todo", "Doing", "Done"],
          default: "Todo",
      },
        subtask: [
          {
            title: String,
            isCompleted: Boolean,
          },
        ],
      },
    ],
  }],
});
const UserModel = mongoose.model("user", userSchema);
module.exports = {
  UserModel,
};
