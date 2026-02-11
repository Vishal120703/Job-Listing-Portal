const Application = require("../models/applyModel");
const Job = require("../models/jobs");

exports.postJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const applicantId = req.user.id;

    // 1️⃣ Check job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(400).json({
        msg: "This job does not exist"
      });
    }

    // 2️⃣ Prevent applying to own job
    if (job.employer.toString() === applicantId) {
      return res.status(400).json({
        msg: "You cannot apply to your own job"
      });
    }

    // 3️⃣ Check already applied
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: applicantId
    });

    if (alreadyApplied) {
      return res.status(400).json({
        msg: "You already applied to this job"
      });
    }

    // 4️⃣ Create application
    const application = await Application.create({
      job: jobId,
      applicant: applicantId
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

