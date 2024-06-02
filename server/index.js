import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import Stripe from 'stripe';
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import paymentRoutes from "./routes/payment.route.js";
import adminRoutes from "./routes/admin.route.js";
import notificationRoutes from "./routes/notification.route.js";

// mostafa
import bookingRoutes from "./routes/booking.route.js";
import reviewRoutes from "./routes/review.route.js";
import propertyReportsRoutes from "./routes/property_report.route.js";
import reviewReportsRoutes from "./routes/review_report.route.js";
import problemRoutes from "./routes/problem.route.js";
import walletRoutes from "./routes/checkout.route.js";
import propertyRoutes from "./routes/property.route.js";
import favoriteRoutes from "./routes/favorite-property.route.js";
import hostRoutes from "./routes/host-stats.route.js";
import {
  handleSubscriptionDeleted,
} from "./controllers/payment.controller.js";
import http from 'http';
import { Server } from 'socket.io';
import { initSocket } from './services/socket.js';

const app = express();   
const server = http.Server(app);
const io = initSocket(server);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["content-type", "Authorization"],
    credentials: true,
  })
);



mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('connected to database successfully');
  server.listen(process.env.PORT, () => {
    console.log(`server is running on the port ${process.env.PORT}`);

  });
})
  .catch((error) => {
    console.log(`something went wrong while connecting to databse : ${error}`);
  });

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use('/payment', paymentRoutes);
app.use('/admin', adminRoutes);
app.use('/problem', problemRoutes);
app.use('/notification', notificationRoutes);
// mostafa
app.use('/book', bookingRoutes);
app.use('/reviews', reviewRoutes);
app.use('/review-reports', reviewReportsRoutes);
app.use('/property-reports', propertyReportsRoutes);
app.use('/wallet', walletRoutes);
app.use('/host-stats', hostRoutes);
// hakim 
app.use('/properties', propertyRoutes);
app.use('/favorites', favoriteRoutes);




const stripe = new Stripe(process.env.STRIPE_SECRET);
const endpointSecret = process.env.ENDPOINT_SECRET;
app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  let event = request.body;

  if (endpointSecret) {
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        console.log("deleted")
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
  }
}
);

app.post("/rent", (req, res) => {
  const { guestName, houseId, hostId } = req.body;
  console.log(`${guestName} rented house with ID: ${houseId}`);
  io.to(hostId).emit("notification", {
    message: `${guestName} has rented your house with ID: ${houseId}`,
  });
  res.status(200).send("House rented successfully");
});


app.post('/rent', (req, res) => {
  const { guestName, houseId, hostId } = req.body;
  console.log(`${guestName} rented house with ID: ${houseId}`);
  io.to(hostId).emit('notification', {
    message: `${guestName} has rented your house with ID: ${houseId}`
  });
  res.status(200).send('House rented successfully');
});
