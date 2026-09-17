import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

console.log("KEY:", process.env.GEMINI_API_KEY? "YES " + process.env.GEMINI_API_KEY.slice(0,6) : "NO");

app.post("/generate", async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const { age, weight, height, goal, diet, level } = req.body;
    const prompt = `Fitness plan age ${age} weight ${weight} height ${height} goal ${goal} diet ${diet} level ${level}. Return JSON with workout, diet, tips`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const m = text.match(/\{[\s\S]*\}/);
    if(m) return res.json(JSON.parse(m[0]));
    throw new Error("no json");
  } catch (e) {
    console.log("Error, sending mock:", e.message);
    return res.json({
      workout: [
        {day:"Monday Chest", exercises:["Bench Press 4x10","Pushup 3x15"]},
        {day:"Tuesday Back", exercises:["Pullup 4x8","Row 4x10"]},
        {day:"Wednesday Legs", exercises:["Squat 4x10","Lunge 3x12"]},
        {day:"Friday Arms", exercises:["Curl 3x12","Dips 3x12"]}
      ],
      diet: {breakfast:"Oats + Eggs", lunch:"Rice + Chicken", dinner:"Roti + Dal", snacks:"Peanuts"},
      tips: ["Drink 3L water","Sleep 8h"]
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend FIXED running on ${PORT}!`));
