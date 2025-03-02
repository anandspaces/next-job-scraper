import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobTitle: String,
    companyName: String
});

module.exports = mongoose.model('Job', jobSchema);