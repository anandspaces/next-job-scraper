import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    index: true
  },
  listings: [{
    companyName: String,
    url: {
      type: String,
      required: true,
      // unique: true
    }
  }]
});

export default mongoose.models.Job || mongoose.model('Job', jobSchema);