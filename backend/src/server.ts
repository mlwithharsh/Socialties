import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import dashboardRouter from "./routes/dashboard";
import campaignsRouter from "./routes/campaigns";
import teamRouter from "./routes/team";
import brandLeadsRouter from "./routes/brandLeads";
import creatorAppsRouter from "./routes/creatorApps";
import messagesRouter from "./routes/messages";
import settingsRouter from "./routes/settings";
import publicRouter from "./routes/public";

dotenv.config();

const app = express();
// Render injects PORT; fallback to BACKEND_PORT for local dev
const port = process.env.PORT || process.env.BACKEND_PORT || 4000;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:3000", "http://127.0.0.1:3000"];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, mobile apps, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json());

// Public health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Setup API routes
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/campaigns", campaignsRouter);
app.use("/api/team", teamRouter);
app.use("/api/brand-leads", brandLeadsRouter);
app.use("/api/creator-applications", creatorAppsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/public", publicRouter);

app.listen(port, () => {
  console.log(`Backend server successfully listening on port ${port}`);
});
