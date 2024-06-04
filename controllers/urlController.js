import { generateShortId } from "../utils/generateShortId.js";
import Url from "../models/urlSchema.js";
import User from "../models/userSchema.js";

export const createUrl = async (req, res) => {
  try {
    const { longUrl, email } = req.body;
    const id = generateShortId(7); // Generate a custom short ID
    const shortURL = "/" + id;

    const newUrl = new Url({ email, longUrl, shortUrl: shortURL, urlId: id });
    await newUrl.save();
    res
      .status(200)
      .json({ message: "Short Url generated successfully", data: newUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUrl = async (req, res) => {
  try {
    const { email } = req.body;

    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const urlList = await Url.find({ email });
    if (!urlList) {
      return res.status(404).json({ message: "No data found" });
    }

    res
      .status(200)
      .json({ message: "Fetched All url successfully", data: urlList });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const todayCreatedUrl = async (req, res) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email: email });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const urlList = await Url.find({
      email,
      createdAt: { $gte: today, $lt: endOfDay },
    });
    if (!urlList) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json({
      message: "Successfully created All url's created today",
      data: urlList,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMonthlyUrl = async (req, res) => {
  const { email } = req.body;
  const currentDate = new Date();

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  try {
    const urlList = await Url.find({
      email,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    if (!urlList) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json({
      message: "Successfully fetched this month's All url",
      data: urlList,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateClickedCount = async (req, res) => {
  const { id } = req.body;
  try {
    const updatedURL = await Url.findOneAndUpdate(
      { urlId: id },
      { $inc: { clicked: 1 } },
      {
        returnDocument: "after",
      }
    );

    if (!updatedURL) {
      return res.status(404).json({ message: "No data found" });
    }
    res
      .status(200)
      .json({ message: "Count Updated successfully", data: updatedURL });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
