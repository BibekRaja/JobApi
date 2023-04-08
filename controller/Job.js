const Job = require("../model/Job");
// require("../model/Employer");

const getjob = async (req, res) => {

    let search_term = RegExp((req.query.search_term || ""), "i")
    let offered_salary_from = req.query.offered_salary_from ? parseFloat(req.query.offered_salary_from) : 0;
    let offered_salary_to = req.query.offered_salary_to ? parseFloat(req.query.offered_salary_to) : 99999999;

    let per_page = req.query.per_page ? parseInt(req.query.per_page) : 25
    let page = req.query.page ? parseInt(req.query.page) : 1
    // let jobs = await Job.find({
    //     $or: [{ name: search_term }, { categories: search_term }, { job_level: search_term },], $and: [{ offered_salary: { $gte: offered_salary_from } }, { offered_salary: { $lte: offered_salary_to } }]
    // });

    // aggregation -> advance find method

    // $lookup -> alternative to join method in SQL

    let total_jobs = await Job.find({
        $or: [{ name: search_term }, { categories: search_term }, { job_level: search_term },], $and: [{ offered_salary: { $gte: offered_salary_from } }, { offered_salary: { $lte: offered_salary_to } }]
    }).count()


    let jobs = await Job.aggregate([
        {
            $match: {
                $or: [{ name: search_term }, { categories: search_term }, { job_level: search_term },]
            }
        },
        {
            $match: {
                $and: [{ offered_salary: { $gte: offered_salary_from } }, { offered_salary: { $lte: offered_salary_to } }]
            }
        },
        {
            $lookup: {
                from: "employers",
                localField: "created_by",
                foreignField: "_id",
                as: "created_by"
            }
        },
        {
            $unwind: "$created_by"
        },
        {
            $project: { "created_by.password": 0, "created_by._id": 0, "created_by.role": 0, "created_by.__v": 0 }
        },
        {
            $skip: (page - 1) * per_page
        },
        {
            $limit: per_page
        }
    ])

    res.send({
        data: jobs,
        meta: {
            total_jobs,
            page,
            per_page
        }
    })
}

const store = async (req, res, next) => {
    // console.log(req.body);
    // console.log(req.files);
    // return;
    try {

        let uploaded_images = req.files.map(el => el.filename)
        let jobs = await Job.create({ ...req.body, images: uploaded_images, created_by: req.user._id })
        res.send({
            data: jobs
        })
    } catch (err) {
        next(err)
    }
}
const update = async (req, res, next) => {
    // console.log(req.body);
    // console.log(req.files);
    // console.log(req.params);
    // return;
    try {
        let job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true

        })

        res.send({
            data: job
        })
    } catch (err) {
        next(err)
    }
}
const remove = async (req, res, next) => {
    // console.log(req.body);
    // console.log(req.files);
    // console.log(req.params);
    // return;
    try {
        let job = await Job.findByIdAndDelete(req.params.id)

        res.send({
            data: job
        })
    } catch (err) {
        next(err)
    }
}
const getSingleJob = async (req, res, next) => {
    let job = await Job.findById(req.params.id)
    res.send(job)
}

module.exports = {
    getjob,
    store,
    update,
    remove,
    getSingleJob
}