const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  track: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
    unique: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  jobSlug: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobUrl: {
    type: String,
    required: true,
  },
  isRemote: {
    type: Boolean,
    required: true,
  },
  jobCompensation: {
    type: String,
    // required: true,
  },
  equity: {
    type: String,
    // required: true,
  },
  jobLocationNames: [
    {
      type: String,
    },
  ],
  // liveStartAt in minutes (TimeZone currently not known)
  jobPostedAt: {
    type: String,
    required: true,
  },
  jobProcessedAt: {
    type: String,
  },
  primaryRoleTitle: {
    type: String,
    required: true,
  },

  jobDescription: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
  companySize: {
    type: String,
    //required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companySlug: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
