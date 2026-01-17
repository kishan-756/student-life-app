const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3001;

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

app.use(express.json());
app.use(require("cors")());

// Auth routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// Task routes
const taskRoutes = require("./routes/task.routes");
app.use("/api/tasks", taskRoutes);

const expenseRoutes = require("./routes/expense.routes");
app.use("/api/expenses", expenseRoutes);


app.get("/", (req, res) => {
  res.send("Backend is running ");
});

mongoose
  .connect(
    "mongodb+srv://kishan19:Kish%401957@cluster0.z0dknuh.mongodb.net/?appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected "))
  .catch((err) => console.log("DB Error:", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
