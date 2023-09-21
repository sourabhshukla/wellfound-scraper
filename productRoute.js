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

router.route("/test").get(async (req, res, next) => {
  // await Example.create({ test: "sdf" });
  // res.status(201).json({
  //   success: "true",
  // });
  const currTimeStamp = Math.floor(Date.now() / 1000);
  const minTimeStamp = currTimeStamp - 24 * 60 * 60;
  const data = await Job.find({
    $expr: {
      $gt: [{ $toLong: "$jobPostedAt" }, minTimeStamp],
    },
  });
  res.status(200).json({
    success: true,
    data: data,
  });
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
