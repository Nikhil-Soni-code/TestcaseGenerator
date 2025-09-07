import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who created it
    functionName: { type: String, required: true },
    input: { type: mongoose.Schema.Types.Mixed, required: true }, // could be string, array, etc.
    expectedOutput: { type: mongoose.Schema.Types.Mixed, required: true },
    description: { type: String }, // optional description
  },
  { timestamps: true }
);

export default mongoose.model("TestCase", testCaseSchema);
