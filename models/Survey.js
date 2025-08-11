import mongoose from "mongoose";

const SurveySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  attending: { type: Boolean, required: true }
}, { timestamps: true });

export default mongoose.model("Survey", SurveySchema);
