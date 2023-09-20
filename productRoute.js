const express = require("express");
const router = express.Router();
const Job = require("./models/job.model");

router.route("/").get(async (req, res) => {
  try {
    const allJobs = await Job.find({});
    res.status(200).json({
      success: true,
      data: allJobs,
    });
  } catch (e) {
    console.log(e);
    res.json({
      sucess: false,
      msg: "Error",
    });
  }
});

router.route("/").post(async (req, res, next) => {
  let isPresent = await Job.find({ jobId: req.body.jobId });
  console.log(isPresent);
  if (isPresent.length > 0) {
    res.json({
      success: false,
    });
    return;
  }
  await Job.create(req.body);
  res.status(201).json({
    success: "true",
  });
});

module.exports = router;
