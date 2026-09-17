const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// FIXED CORS FOR VERCEL
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));
app.use(express.json());

// Test route - fixes Cannot GET /
app.get("/", (req, res) => {
  res.send("FitCoach AI Backend is Running! Use POST /generate");
});

app.post("/generate", async (req, res) => {
  try {
    const { age, height, weight, goal, level, days } = req.body;
    
    // Your Groq / OpenAI logic here
    // Example dummy response if you don't have AI key
    const mockPlan = {
      message: `Plan for ${age}yr, ${weight}kg, Goal: ${goal}, Level: ${level}, ${days} days/week`,
      workout: [
        `Day 1: Push - Chest, Shoulders, Triceps`,
        `Day 2: Pull - Back, Biceps`,
        `Day 3: Legs - Quads, Hamstrings`,
        `Day 4: Rest or Cardio`,
      ],
      diet: `High protein diet for ${goal}`
    };
    
    // If you have Groq AI, replace mockPlan with actual AI call
    res.json(mockPlan);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend FIXED running on ${PORT}`));