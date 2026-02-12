const Job = require("../models/jobs");

exports.getJobs = async (req, res) => {
  try {
    const { keyword, location, job_type, minSalary, maxSalary } = req.query;

    let filter = {};

    if (keyword) {
      filter.title = { $regex: keyword, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (job_type) {
      filter.job_type = { $regex: job_type, $options: "i" };
    }
    if (minSalary || maxSalary) {
      filter.salary = {};
      if (minSalary) filter.salary.$gte = Number(minSalary);
      if (maxSalary) filter.salary.$lte = Number(maxSalary);
    }

    const jobs = await Job.find(filter).populate("employer");

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.postJobs = async (req, res) => {
  try {
    const employer = req.user?.id;

    const {
      title,
      description,
      qualification,
      responsibilities,
      location,
      salary,
      job_type
    } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    if (!employer) {
      return res.status(400).json({ msg: "Employer not found" });
    }

    const newJob = await Job.create({
      title,
      description,
      qualification,
      responsibilities,
      location,
      salary,
      job_type,
      employer
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.putJobDescription = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    // 1️⃣ Find job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // 2️⃣ Check ownership
    if (job.employer.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this job",
      });
    }

    // 3️⃣ Update fields (only what user sends)
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      req.body,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getJobDescription = async (req, res) => {
  try {
    const jobId = req.params.id;

    const jobUsingId = await Job.findById(jobId).populate("employer");

    if (!jobUsingId) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    return res.status(200).json({
      success: true,
      job: jobUsingId
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;
    console.log(jobId);
    console.log(userId)

    // 1️⃣ Find job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // 2️⃣ Check ownership
    if (job.employer.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this job",
      });
    }

    // 3️⃣ Delete job
    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
