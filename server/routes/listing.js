const router = require("express").Router();
const multer = require("multer");
// const UserDB = require("../models/usersSchema");
const listingDB = require("../models/listingSchema");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });

// create listing
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      highlight,
      highlightDescription,
      price,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos) {
      res.status(401).json("msg: No file uploaded");
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new listingDB({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      highlight,
      highlightDescription,
      price,
    });
    await newListing.save();
    res
      .status(200)
      .json({ message: "listing created successfully", newListing });
  } catch (error) {
    res
      .status(400)
      .json({ message: "failed to create lsiting", error: error.message });
    console.log(error);
  }
});

// get listing by category
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let listings;
    if (qCategory) {
      listings = await listingDB
        .find({ category: qCategory })
        .populate("creator");
    } else {
      listings = await listingDB.find().populate("creator");
    }
    res.status(200).json(listings);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ msg: "fail to get listings list", error: error.mesasge });
  }
});

module.exports = router;
