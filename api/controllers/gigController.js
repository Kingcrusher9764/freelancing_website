const Gig = require("../models/gigModel")
const createError = require("../utils/createError")

const createGig = async (req, res, next) => {
    if (!req.isSeller) return next(createError(403, "Only sellers can create a gig!"))
    const newGig = new Gig({
        ...req.body,
        userId: req.userId,
    })

    try {
        const savedGig = await newGig.save()
        res.status(201).json(savedGig)
    } catch (err) {
        next(err)
    }
}
const deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if (gig.userId !== req.userId) return next(createError(403, "You can only delete your gig!"))
        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).send("Gig has been deleted!")
    } catch (err) {
        next(err)
    }
}
const getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if (!gig) return next(createError(404, "Gig not found!"))
        res.status(200).send(gig)

    } catch (err) {
        next(err)
    }
}
const getGigs = async (req, res, next) => {
    const q = req.query
    const filters = {
        ...(q.cat && { cat: q.cat }),
        ...((q.min || q.max) && { price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) } }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
        ...(q.userId && { userId: q.userId }),
    }
    try {
        const gigs = await Gig.find(filters).sort({ [q.sort]: -1 })
        res.status(200).send(gigs)
    } catch (err) {
        next(err)
    }
}

module.exports = { createGig, deleteGig, getGig, getGigs }
