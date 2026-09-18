const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", (req,res)=>{
  const { age, weight, goal, days, type } = req.body;
  const w = parseInt(weight) || 70;
  const d = parseInt(days) || 5;
  const dietType = (type || "non-veg").toLowerCase();

  // --- WORKOUT LOGIC ---
  let workout = [];
  if(goal==="muscle gain"){
    if(d===3) workout = [
      "Day 1 - PUSH: Bench Press 4x8, Overhead Press 3x10, Incline DB 3x12, Triceps Dip 3x12",
      "Day 2 - PULL: Deadlift 4x6, Lat Pulldown 4x10, Barbell Row 4x10, Bicep Curl 3x12",
      "Day 3 - LEGS: Squat 4x8, Romanian Deadlift 3x10, Leg Press 3x12, Calf Raises 4x15"
    ];
    else workout = [
      "Day 1 - CHEST + TRICEPS: Bench 4x8, Incline DB 3x10, Cable Fly 3x15, Pushup 3x20, Skullcrusher 3x12",
      "Day 2 - BACK + BICEPS: Pullup 4x8, Barbell Row 4x10, Lat Pulldown 3x12, Hammer Curl 3x12",
      "Day 3 - LEGS + SHOULDERS: Squat 4x8, RDL 3x10, Leg Press 3x12, OHP 4x8, Lateral Raise 4x12",
      "Day 4 - FULL POWER: Deadlift 4x5, Farmers Walk, Plank 3x60s, Abs Circuit",
      "Day 5 - CONDITIONING: HIIT 20min + Weak Point + Mobility",
      "Day 6 - ARMS & ABS: Bicep 4x12, Triceps 4x12, Abs 20min"
    ].slice(0,d);
  } else if(goal==="fat loss"){
    workout = [
      "Day 1 - HIIT FULL BODY: Burpees 4x15, Jump Squats 3x20, Pushups 3x15, Mountain Climbers 3x40s + Treadmill 15min",
      "Day 2 - UPPER + CORE: Bench 3x12, Row 3x12, Plank 4x60s, Russian Twist 3x20",
      "Day 3 - LEGS BURN: Squat 4x15, Lunges 3x20, Kettlebell Swing 3x20, Jump Rope 10min",
      "Day 4 - CARDIO + ABS: 30min Run/Walk, Leg Raises 4x15, Bicycle Crunch 3x20",
      "Day 5 - FULL BODY BURN: Circuit Training 4 rounds",
      "Day 6 - ACTIVE RECOVERY: 10k Steps + Stretching"
    ].slice(0,d);
  } else {
    workout = [
      "Day 1 - STRENGTH A: Squat 5x5, Bench 5x5, Row 5x5",
      "Day 2 - STRENGTH B: Deadlift 5x5, OHP 5x5, Pullup 4x8",
      "Day 3 - POWER: Clean 5x3, Front Squat 4x6, Push Press 4x6",
      "Day 4 - VOLUME: All muscles 3x12 + 20min cardio"
    ].slice(0,d);
  }

  // --- DIET LOGIC - AUTO VEG / NON-VEG ---
  const protein = Math.round(w*2.2);
  const calories = goal==="fat loss" ? w*28 : goal==="muscle gain" ? w*35 : w*32;
  const isVeg = dietType === "veg";

  const breakfast = isVeg
    ? (goal==="fat loss" ? "Besan Chilla 2 + Curd 100g + Green Tea" : "80g Oats + Milk + 15g Peanut Butter + Banana + 5 Almonds + Whey")
    : (goal==="fat loss" ? "3 Egg Whites + 1 Whole Egg + 2 Brown Bread + Black Coffee" : "4 Eggs + 80g Oats + Peanut Butter + Banana");

  const lunch = isVeg
    ? "200g Paneer / 80g Soya Chunks / 100g Tofu + 150g Rice + Dal 1 bowl + Salad + Curd 100g"
    : "200g Chicken Breast / Fish + 150g Rice + Dal + Salad + Curd";

  const dinner = isVeg
    ? "100g Paneer + 80g Soya Chunks + 2 Roti + Mix Veggies + Dal"
    : "200g Chicken / Fish / 80g Soya + 2 Roti + Veggies";

  const grocery = isVeg
    ? "Paneer 1kg, Soya Chunks 500g, Tofu 500g, Oats 500g, Milk 3L, Peanut Butter, Dal 1kg, Rice 2kg, Bananas 12, Almonds"
    : "Chicken 1.5kg, Eggs 30, Oats 500g, Rice 2kg, Paneer 500g, Peanut Butter, Bananas 12, Milk 3L";

  const diet = `🔥 PRO DIET - ${calories} KCAL | ${protein}g PROTEIN | ${dietType.toUpperCase()}
Goal: ${goal.toUpperCase()} | Weight: ${w}kg | Age: ${age}

⏰ 7:30 AM - WAKEUP: Warm Water + 5 Soaked Almonds + 1 Banana
⏰ 9:00 AM - BREAKFAST: ${breakfast}
⏰ 1:30 PM - LUNCH: ${lunch}
⏰ 5:00 PM - PRE-WORKOUT: Black Coffee + 2 Bananas OR Whey + Apple
⏰ 8:30 PM - DINNER: ${dinner}
⏰ 10:30 PM - BEDTIME: 200ml Milk + 10g Peanuts

🛒 WEEKLY GROCERY: ${grocery}
💧 Water: 4-5 Liters | Sleep: 7.5 Hours
💊 Supplements: Whey Protein 1 scoop, Creatine 5g (optional), Multivitamin

${isVeg ? "100% VEGETARIAN HIGH PROTEIN PLAN - No Chicken, No Egg!" : "HIGH PROTEIN NON-VEG PLAN FOR FAST RESULT!"}`;

  res.json({ workout, diet });
});

app.get("/", (req,res)=> res.send("FitCoach AI Backend Running ULTRA"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log("Backend ULTRA running "+PORT));