const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", (req,res)=>{
  const { age, weight, goal, days } = req.body;
  const w = parseInt(weight) || 70;
  const d = parseInt(days) || 4;
  const a = age || 23;

  let workout = [];
  if(goal==="muscle gain"){
    if(d===3) workout = [
      "Day 1 - PUSH: Bench Press 4x8, Overhead Press 3x10, Incline DB 3x12, Triceps Dip 3x12, Lateral Raise 3x15",
      "Day 2 - PULL: Deadlift 4x6, Lat Pulldown 4x10, Barbell Row 4x10, Face Pull 3x12, Bicep Curl 3x12",
      "Day 3 - LEGS: Squat 4x8, Romanian Deadlift 3x10, Leg Press 3x12, Lunges 3x12, Calf Raises 4x15"
    ];
    if(d>=4) workout = [
      "Day 1 - CHEST + TRICEPS: Bench 4x8, Incline DB 3x10, Cable Fly 3x15, Pushup 3x20, Skullcrusher 3x12",
      "Day 2 - BACK + BICEPS: Pullup 4x8, Barbell Row 4x10, Lat Pulldown 3x12, Shrugs 3x15, Hammer Curl 3x12",
      "Day 3 - LEGS + SHOULDERS: Squat 4x8, RDL 3x10, Leg Press 3x12, OHP 4x8, Lateral Raise 4x12",
      "Day 4 - FULL POWER: Deadlift 4x5, Farmers Walk 3 rounds, Plank 3x60sec, Abs Circuit",
      "Day 5 - CONDITIONING: HIIT 20min, Mobility, Weak Point Training"
    ].slice(0,d);
  } else if(goal==="fat loss"){
    workout = [
      "Day 1 - HIIT FULL BODY: Burpees 4x15, Jump Squats 3x20, Pushups 3x15, Mountain Climbers 3x40sec, Treadmill 15min",
      "Day 2 - UPPER + CORE: Bench 3x12, Row 3x12, Plank 4x60sec, Russian Twist 3x20, Bicycle Crunch 3x20",
      "Day 3 - LEGS BURN: Squat 4x15, Lunges 3x20, Kettlebell Swing 3x20, Jump Rope 10min, Leg Raises 3x15",
      "Day 4 - CARDIO + ABS: 30min Run/Walk Intervals, Hanging Leg Raise 4x12, Ab Wheel 3x10"
    ].slice(0,d);
  } else {
    workout = [
      "Day 1 - STRENGTH A: Squat 5x5, Bench 5x5, Barbell Row 5x5",
      "Day 2 - STRENGTH B: Deadlift 5x5, Overhead Press 5x5, Pullup 4x8",
      "Day 3 - POWER: Clean 5x3, Front Squat 4x6, Push Press 4x6",
      "Day 4 - VOLUME: All muscles 3x12, Cardio 20min"
    ].slice(0,d);
  }

  const protein = Math.round(w*2.2);
  const calories = goal==="fat loss" ? w*28 : goal==="muscle gain" ? w*35 : w*32;
  
  const diet = `🔥 PRO DIET FOR YOU - ${calories} CAL | ${protein}g PROTEIN
Goal: ${goal.toUpperCase()} | Weight: ${w}kg | Age: ${a}

⏰ 7:30 AM - WAKEUP: Warm Water + 5 Soaked Almonds + 1 Banana
⏰ 9:00 AM - BREAKFAST: ${goal==="fat loss" ? "3 Egg Whites + 1 Whole Egg + 2 Brown Bread + Black Coffee" : "4 Whole Eggs + 80g Oats + 15g Peanut Butter + 1 Banana + Whey (optional)"}
⏰ 1:30 PM - LUNCH: 200g Chicken Breast / Paneer + 150g White Rice + Dal 1 bowl + Green Salad + Curd 100g
⏰ 5:00 PM - PRE-WORKOUT: Black Coffee + 2 Bananas OR Whey Protein 1 Scoop + Apple
⏰ 8:30 PM - DINNER: 200g Chicken / Fish / Soya Chunks 80g + 2 Roti + Mix Veggies
⏰ 10:30 PM - BEDTIME: 200ml Milk + 10g Peanuts

🛒 WEEKLY GROCERY: Chicken 1.5kg, Eggs 30, Oats 500g, Rice 2kg, Paneer 500g, Peanut Butter 1 jar, Bananas 12, Milk 3L, Dal, Vegetables

💧 Water: 4-5 Liters Daily
😴 Sleep: 7.5 Hours Must
💊 Supplements: Whey Protein 1 Scoop Daily, Creatine 5g, Multivitamin

Follow this 60 Days - 100% Result Guaranteed!`;

  res.json({ workout, diet });
});

app.get("/", (req,res)=> res.send("FitCoach AI Backend Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log("Backend running "+PORT));