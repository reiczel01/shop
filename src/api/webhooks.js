// Listen for payment intents.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const express = require("express");
const app = express();

app.post("/api/stripe/webhook", async (req, res) => {
  const event = req.body;

  // Verify the signature of the webhook request.
  let signature = req.headers["stripe-signature"];
  let eventSecret = process.env.STRIPE_WEBHOOK_SECRET;
  try {
    let verified = stripe.webhooks.constructEvent(
      event,
      signature,
      eventSecret
    );
    console.log("Event verified:", verified);
  } catch (err) {
    console.log("Error:", err);
  }

  res.sendStatus(200);
});

app.listen(3000, function () {
  console.log("Webhooks listening on http://localhost:3000/");
});