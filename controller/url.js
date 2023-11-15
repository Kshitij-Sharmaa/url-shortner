const shortid = require("shortid");
const URLModel = require("../model/model");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = shortid();

  await URLModel.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
}

async function handleAnalytic(req, res) {
  const shortid = req.params.shortid;
  const result = await URLModel.findOne({
    shortId: shortid,
  });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleURL(req, res) {
  const shortid = req.params.shortid;

  const result = await URLModel.findOneAndUpdate(
    {
      shortId: shortid,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  if (result == null) res.status(200).json({ error: "url not found" });
  else res.redirect(result.redirectURL);
}

module.exports = { handleGenerateNewShortUrl, handleAnalytic, handleURL };
