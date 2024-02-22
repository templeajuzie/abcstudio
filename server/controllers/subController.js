const Auth = require("../models/clientAuthSchema"); // Assuming your user model is named 'Auth'
const { StatusCodes } = require("http-status-codes");
const SubscriptionModel = require("../models/subscriptionSchema");
const SubscriptionJoi = require("../Utils/SubscriptionJoi");
const Client = require("../models/clientAuthSchema");
const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require("../errors/index");

const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const stripeWebhookSecret = process.env.STRIPE_SUBSCRIPTION_WEBHOOK_SECRETE;
const localurl = process.env.CLIENT_URL;

const createSubscription = async (req, res) => {
  const user = req.user;
  const item = req.body;
  let customer;

  try {
    if (!user) {
      throw new UnAuthorizedError("User must be logged in to subscribe");
    }

    const existingCustomer = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    if (existingCustomer.data.length > 0) {
      // Customer already exists
      customer = existingCustomer.data[0];

      // Check if the customer already has an active subscription
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: "active",
        limit: 1,
      });

      if (subscriptions.data.length > 0) {
        // Customer already has an active subscription, send them to biiling portal to manage subscription

        console.log("old subscription");

        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: customer.id,
          return_url: `${localurl}`,
        });

        console.log("yes", stripeSession.url);

        return res
          .status(StatusCodes.CONFLICT)
          .json({ redirectUrl: stripeSession.url });
      }
    } else {
      // No customer found, create a new one

      customer = await stripe.customers.create({
        email: user.email,
        name: user.fullname,
        metadata: {
          userId: user._id, // Replace with actual Auth0 user ID
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      success_url: `${localurl}/paymentsuccess?success=true`,
      cancel_url: `${localurl}/paymenterror?canceled=true`,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              description: `${item.description}\n \n${item.features}`,
            },
            unit_amount: item.price * 100,
            recurring: {
              interval: item.type,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user._id,
      },

      customer: user._id,
    });

    console.log("session created for " + session);
    console.log("session url", { url: session.url });

    res.status(StatusCodes.OK).json({ url: session.url });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const SubWebhook = async (req, res) => {
  console.log("subscriptions webhook currently active");

  const payload = req.body;
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, stripeWebhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("new web2");

  const customer = await stripe.customers.retrieve(event.data.object.customer);

  let userEmail = customer.email;
  const olduser = await Client.findOne({ userEmail });

  switch (event.type) {
    case "invoice.payment_succeeded":
      const invoicePaymentSucceeded = event.data.object;

      console.log("pay1", invoicePaymentSucceeded);

      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.subscription
      );

      const periodEndTimestamp = subscription.current_period_end;
      const periodStartTimestamp = subscription.current_period_start;

      // Convert to milliseconds (JavaScript Date object works with milliseconds)
      const periodEndMilliseconds = periodEndTimestamp * 1000;
      const periodStartMilliseconds = periodStartTimestamp * 1000;

      // Create Date objects
      const periodEndDate = new Date(periodEndMilliseconds);
      const periodStartDate = new Date(periodStartMilliseconds);

      // Output
      console.log("Period Start Date:", periodStartDate);
      console.log("Period End Date:", periodEndDate);
      console.log(
        "description:",
        invoicePaymentSucceeded.lines.data[0].description
      );

      const data = {
        email: olduser.email,
        name: olduser.fullname,
        stripe_customer_id: customer.id,
        amount: subscription.plan.amount / 100,
        currency: subscription.currency,
        country: invoicePaymentSucceeded.customer_address.country,
        subscription_period_start: periodStartDate,
        subscription_period_end: periodEndDate,
        subscription_id: subscription.id,
        plan_id: subscription.plan.id,
        plan_type: subscription.plan.interval,
        quantity: subscription.quantity,
        subscription_status: subscription.status,
        hosted_invoice_url: invoicePaymentSucceeded.hosted_invoice_url,
        subscription_name: invoicePaymentSucceeded.lines.data[0].description,
      };

      console.log("data now", data);

      const { error, value } = SubscriptionJoi.validate(data);

      if (error) {
        throw new ValidationError("Data recieved is invalid");
      }

      const newData = await SubscriptionModel.create(value);

      olduser.subscriptionhistory.unshift(newData.id);

      await olduser.save();

      break;
    // ... handle other event types

    case "customer.subscription.updated":
      const customerSubscriptionUpdated = event.data.object;

      // console.log(event);
      if (customerSubscriptionUpdated.cancel_at_period_end) {
        console.log(
          `Subscription ${customerSubscriptionUpdated.id} was canceled.`
        );

        // DB code to update the customer's subscription status in your database
      } else {
        console.log(
          `Subscription ${customerSubscriptionUpdated.id} was restarted.`
        );
        // get subscription details and update the DB
      }

      break;
    case "invoice.payment_failed":
      const invoicePaymentFailed = event.data.object;

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).end();
};

// Fetch all subscription plans from the database
const getAllSubscriptionPlans = async (req, res) => {
  try {
    const { userRole } = req;

    // Check if the user has the required role to access subscription plans
    if (userRole === "superadmin" || userRole === "admin") {
      // Fetch all subscription plans from the database
      const subscriptionPlans = await SubscriptionPlan.find();

      res.status(StatusCodes.OK).json(subscriptionPlans);
    } else {
      throw new UnAuthorizedError("Unauthorized to access subscription plans");
    }
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptionPlans,
  SubWebhook,
};
