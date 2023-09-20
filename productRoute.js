const express = require("express");
const router = express.Router();
const Job = require("./models/job.model");

router.route("/").post(async (req, res, next) => {
  let isPresent = await Job.find({ jobId: req.body.jobId });
  console.log(isPresent);
  if (isPresent.length > 0) {
    res.json({
      success: "false",
    });
    return;
  }
  await Job.create(req.body);
  res.status(201).json({
    success: "true",
  });
});

module.exports = router;
