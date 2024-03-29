import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Stats } from "../models/Stats.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return next(new ErrorHandler("All Fields are mandatory", 400));

  const to = process.env.MY_MAIL;
  const subject = "Contact From Vidyalaya";
  const text = `I am ${name} and My Email is ${email}. \n${message}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your message has been sent.",
  });
});

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course)
    return next(new ErrorHandler("All Fields are mandatory", 400));

  const to = process.env.MY_MAIL;
  const subject = "Requesting for a Course on Vidyalaya";
  const text = `I am ${name} and my Email is ${email}. \nCourse: ${course}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your request has been sent.",
  });
});

export const getDashBoardStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }

  const requiredSize = 12 - stats.length;

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      user: 0,
      subscription: 0,
      views: 0,
    });
  }

  const usersCount = statsData[11].user;
  const subscriptionCount = statsData[11].subscription;
  const viewCount = statsData[11].views;

  let usersPercentage = 0,
    subscriptionPercentage = 0,
    viewsPercentage = 0;
  let usersProfit = true,
    subscriptionProfit = true,
    viewsProfit = true;

  if (statsData[10].user === 0) usersPercentage = usersCount * 100;
  if (statsData[10].views === 0) viewsPercentage = viewCount * 100;
  if (statsData[10].subscription === 0)
    subscriptionPercentage = subscriptionCount * 100;
  else {
    const difference = {
      user: statsData[11].user - statsData[10].user,
      views: statsData[11].views - statsData[10].views,
      subscription: statsData[11].subscription - statsData[10].subscription,
    };

    usersPercentage = (difference.user / statsData[10].user) * 100;
    viewsPercentage = (difference.views / statsData[10].views) * 100;
    subscriptionPercentage =
      (difference.subscription / statsData[10].subscription) * 100;

    if (usersPercentage < 0) usersProfit = false;
    if (viewsPercentage < 0) viewsProfit = false;
    if (subscriptionPercentage < 0) subscriptionProfit = false;
  }

  res.status(200).json({
    success: true,
    stats: statsData,
    usersCount,
    subscriptionCount,
    viewCount,
    usersPercentage,
    subscriptionPercentage,
    viewsPercentage,
    usersProfit,
    subscriptionProfit,
    viewsProfit,
  });
});
