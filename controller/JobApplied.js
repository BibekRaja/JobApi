const Client = require("../model/Client");
const Job = require("../model/Job");
const JobApplied = require("../model/JobApplied")


const index = async (req, res, next) => {
    let jobs = await JobApplied.find({ applied_by: req.user._id })
    // let job = await JobApplied.aggregate([
    //     {
    //         $match: {
    //             applied_by: req.user._id
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "clients",
    //             localField: "applied_by",
    //             foreignField: "_id",
    //             as: "applied_by"
    //         }
    //     },
    //     {
    //         $unwind: "$applied_by"
    //     },

    // ])

    res.send({
        data: jobs
    })

}


const store = async (req, res, next) => {
    let temp = [];

    let jobs = req.body.jobs;
    for (let i = 0; i < jobs.length; i++) {
        let job = await Job.findById(jobs[i]._id);
        temp.push({
            name: job.name,
            offered_salary: job.offered_salary
        })



    }

    try {
        let applied_job = await JobApplied.create({
            jobs: temp,
            applied_by: req.user._id
        })
        res.send(applied_job)
    } catch (err) {
        next(err)
    }

}
module.exports = {
    index,
    store
}