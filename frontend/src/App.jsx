import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | onboarding | app | workoutMode
  const [tab, setTab] = useState("home"); // home | workout | nutrition | progress
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentEx, setCurrentEx] = useState(0);
  const [weights, setWeights] = useState([]);
  const [streak, setStreak] = useState(4);
  const [form, setForm] = useState({ age:"23", height:"5.7", weight:"67", goal:"Muscle Gain", experience:"Intermediate", diet:"Non-Veg", days:"5 Days" });

  useEffect(()=>{
    let i; if(isRunning) i=setInterval(()=>setTimer(t=>t+1),1000);
    return()=>clearInterval(i);
  },[isRunning]);

  const generate = async ()=>{
    setLoading(true);
    try{ const res=await axios.post("http://localhost:5000/generate", form); setPlan(res.data); setScreen("app"); }
    catch(e){ alert("Start backend: npm start in backend folder"); }
    setLoading(false);
  };

  const fmt = (s)=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  // LANDING
  if(screen==="landing") return (
    <div style={{background:"#0A0A0B", color:"white", minHeight:"100vh", fontFamily:"Inter"}}>
      <div style={{display:"flex", justifyContent:"space-between", padding:"20px", maxWidth:"1200px", margin:"0 auto"}}><b>FitCoach-AI</b><button onClick={()=>setScreen("onboarding")} style={{background:"#E8FF5A", color:"black", border:"none", padding:"10px 20px", borderRadius:"30px", fontWeight:"bold"}}>Start Journey</button></div>
      <div style={{textAlign:"center", padding:"40px 20px", maxWidth:"800px", margin:"0 auto"}}>
        <h1 style={{fontSize:"52px", lineHeight:"0.9", letterSpacing:"-2px", margin:0}}>Build Your<br/>Stronger Self.</h1>
        <p style={{color:"#9A9AA0", marginTop:"18px"}}>Personalized workouts, nutrition and discipline — powered by intelligent fitness technology.</p>
        <button onClick={()=>setScreen("onboarding")} style={{marginTop:"28px", background:"#E8FF5A", color:"black", border:"none", padding:"14px 28px", borderRadius:"30px", fontWeight:"bold"}}>Start Your Fitness Journey →</button>
        <div style={{marginTop:"50px", background:"#151517", border:"1px solid #262629", borderRadius:"24px", padding:"20px", textAlign:"left"}}>
          <p style={{fontSize:"11px", color:"#9A9AA0", letterSpacing:"2px"}}>LIVE PREVIEW</p>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginTop:"15px"}}>
            <div style={{background:"#1E1E20", padding:"16px", borderRadius:"16px"}}><p style={{margin:0, fontSize:"11px", color:"#9A9AA0"}}>WORKOUT</p><b>Push • 5 exercises</b></div>
            <div style={{background:"#1E1E20", padding:"16px", borderRadius:"16px"}}><p style={{margin:0, fontSize:"11px", color:"#9A9AA0"}}>NUTRITION</p><b>2,450 kcal • 165P</b></div>
          </div>
        </div>
      </div>
    </div>
  );

  // ONBOARDING
  if(screen==="onboarding") return (
    <div style={{background:"#0A0A0B", minHeight:"100vh", color:"white", padding:"20px", maxWidth:"430px", margin:"0 auto"}}>
      <div style={{display:"flex", justifyContent:"space-between"}}><span onClick={()=> step>1? setStep(step-1) : setScreen("landing")} style={{cursor:"pointer"}}>← Back</span><span style={{color:"#9A9AA0", fontSize:"12px"}}>{step}/6</span></div>
      <div style={{height:"4px", background:"#1E1E20", borderRadius:"10px", margin:"15px 0"}}><div style={{height:"100%", width:`${step/6*100}%`, background:"#E8FF5A", borderRadius:"10px"}} /></div>
      <h2 style={{fontSize:"26px", marginTop:"30px"}}>{["How old are you?","Your height?","Your weight?","What's your goal?","Experience level?","Days per week?"][step-1]}</h2>
      {step<=3 && <input value={Object.values(form)[step-1]} onChange={e=>{const k=Object.keys(form)[step-1]; setForm({...form,[k]:e.target.value})}} style={{width:"100%", padding:"16px", background:"#151517", border:"1px solid #262629", borderRadius:"12px", color:"white", marginTop:"20px"}} />}
      {step===4 && <div style={{display:"grid", gap:"10px", marginTop:"20px"}}>{["Muscle Gain","Fat Loss","Strength","Endurance"].map(g=><div key={g} onClick={()=>setForm({...form,goal:g})} style={{padding:"15px", borderRadius:"12px", border:"1px solid #262629", background: form.goal===g? "#E8FF5A" : "#151517", color: form.goal===g? "black" : "white", cursor:"pointer"}}>{g}</div>)}</div>}
      {step===5 && <div style={{display:"grid", gap:"10px", marginTop:"20px"}}>{["Beginner","Intermediate","Advanced"].map(g=><div key={g} onClick={()=>setForm({...form,experience:g})} style={{padding:"15px", borderRadius:"12px", border:"1px solid #262629", background: form.experience===g? "#E8FF5A" : "#151517", color: form.experience===g? "black" : "white", cursor:"pointer"}}>{g}</div>)}</div>}
      {step===6 && <div style={{display:"grid", gap:"10px", marginTop:"20px"}}>{["3 Days","4 Days","5 Days","6 Days"].map(g=><div key={g} onClick={()=>setForm({...form,days:g})} style={{padding:"15px", borderRadius:"12px", border:"1px solid #262629", background: form.days===g? "#E8FF5A" : "#151517", color: form.days===g? "black" : "white", cursor:"pointer"}}>{g}</div>)}</div>}
      <button onClick={()=> step<6? setStep(step+1) : generate()} style={{width:"100%", marginTop:"30px", padding:"16px", background:"#E8FF5A", color:"black", border:"none", borderRadius:"30px", fontWeight:"bold"}}>{step<6? "Continue →" : loading? "Generating..." : "Generate My Plan →"}</button>
    </div>
  );

  // WORKOUT MODE - FEATURE 2
  if(screen==="workoutMode") {
    const exercises = plan?.workout?.[0]?.exercises || ["Bench Press 4x8-10","Incline DB Press 3x10","Shoulder Press 3x8-12","Lateral Raises 3x12","Triceps Pushdown 3x12"];
    const exName = exercises[currentEx] || "Exercise";
    return (
      <div style={{background:"#0A0A0B", minHeight:"100vh", color:"white", padding:"20px", maxWidth:"430px", margin:"0 auto"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}><span onClick={()=>{setScreen("app"); setIsRunning(false);}} style={{cursor:"pointer"}}>✕ Exit</span><span style={{fontSize:"12px", color:"#9A9AA0"}}>{currentEx+1}/{exercises.length}</span><span style={{fontSize:"12px"}}>{fmt(timer)}</span></div>
        <div style={{height:"4px", background:"#1E1E20", borderRadius:"10px", margin:"15px 0"}}><div style={{height:"100%", width:`${(currentEx+1)/exercises.length*100}%`, background:"#E8FF5A"}} /></div>
        <h1 style={{fontSize:"28px", margin:"20px 0 5px"}}>{exName}</h1><p style={{color:"#9A9AA0", fontSize:"12px"}}>Chest • Intermediate • Rest 90s</p>
        <div style={{background:"#151517", border:"1px solid #262629", borderRadius:"16px", padding:"15px", marginTop:"20px"}}>
          {["Set 1","Set 2","Set 3"].map((s,i)=><div key={i} style={{display:"flex", gap:"10px", marginBottom:"10px"}}><span style={{width:"40px", color:"#9A9AA0"}}>{s}</span><input placeholder="kg" style={{flex:1, background:"#1E1E20", border:"1px solid #262629", borderRadius:"8px", padding:"10px", color:"white"}} /><input placeholder="reps" style={{flex:1, background:"#1E1E20", border:"1px solid #262629", borderRadius:"8px", padding:"10px", color:"white"}} /><button style={{background:"#E8FF5A", border:"none", borderRadius:"8px", padding:"0 12px"}}>✓</button></div>)}
        </div>
        <div style={{display:"flex", gap:"10px", marginTop:"20px"}}>
          <button onClick={()=>setCurrentEx(Math.max(0,currentEx-1))} style={{flex:1, padding:"16px", background:"#151517", border:"1px solid #262629", borderRadius:"30px", color:"white"}}>Previous</button>
          <button onClick={()=>{ if(currentEx < exercises.length-1) setCurrentEx(currentEx+1); else { setStreak(streak+1); setScreen("app"); setTab("home"); alert("Workout Complete! 🔥 Streak: "+(streak+1)); setTimer(0); setIsRunning(false);} }} style={{flex:2, padding:"16px", background:"#E8FF5A", border:"none", borderRadius:"30px", color:"black", fontWeight:"bold"}}>{currentEx===exercises.length-1? "Finish Workout" : "Next Exercise →"}</button>
        </div>
        <button onClick={()=>setIsRunning(!isRunning)} style={{width:"100%", marginTop:"10px", padding:"12px", background:"transparent", border:"1px solid #262629", borderRadius:"30px", color:"#9A9AA0"}}>{isRunning? "⏸ Pause Timer" : "▶ Start Timer"} • {fmt(timer)}</button>
      </div>
    );
  }

  // MAIN APP WITH TABS
  return (
    <div style={{background:"#0A0A0B", minHeight:"100vh", color:"white", paddingBottom:"80px", maxWidth:"430px", margin:"0 auto"}}>
      <div style={{padding:"20px", display:"flex", justifyContent:"space-between"}}><div><b>FitCoach-AI</b><p style={{margin:0, color:"#9A9AA0", fontSize:"11px"}}>Good morning, Swapnil • 🔥 {streak} day streak</p></div><div style={{width:"32px", height:"32px", background:"#1E1E20", borderRadius:"50%"}} /></div>

      {tab==="home" && <>
        <div style={{margin:"0 15px", background:"#E8FF5A", color:"black", borderRadius:"20px", padding:"20px"}}><p style={{margin:0, fontSize:"11px"}}>TODAY'S WORKOUT</p><h2 style={{margin:"5px 0"}}>{form.goal} • Push Day</h2><p style={{margin:0, fontSize:"12px"}}>{plan?.workout?.[0]?.exercises?.length || 5} exercises • 60 min</p><button onClick={()=>{setScreen("workoutMode"); setIsRunning(true); setTimer(0); setCurrentEx(0);}} style={{marginTop:"15px", background:"black", color:"white", border:"none", padding:"10px 20px", borderRadius:"20px", fontWeight:"bold"}}>Start Workout ▶</button></div>
        <h3 style={{padding:"20px 15px 10px", fontSize:"11px", color:"#9A9AA0", letterSpacing:"1px"}}>TODAY'S DISCIPLINE</h3>
        <div style={{margin:"0 15px", background:"#151517", border:"1px solid #262629", borderRadius:"16px", padding:"15px"}}>{["Workout","Protein target","Water target","Steps","Sleep goal"].map((t,i)=><div key={t} style={{display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #1E1E20"}}><span style={{fontSize:"14px"}}>☐ {t}</span><span style={{color:"#E8FF5A", fontSize:"12px"}}>{i<2? "Done ✓" : "○"}</span></div>)}</div>
        <div style={{margin:"15px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px"}}><div style={{background:"#151517", border:"1px solid #262629", borderRadius:"16px", padding:"15px"}}><p style={{margin:0, fontSize:"11px", color:"#9A9AA0"}}>CALORIES</p><b>1,840 / 2,450</b></div><div style={{background:"#151517", border:"1px solid #262629", borderRadius:"16px", padding:"15px"}}><p style={{margin:0, fontSize:"11px", color:"#9A9AA0"}}>PROTEIN</p><b>128g / 165g</b></div></div>
      </>}

      {tab==="workout" && <>
        <h3 style={{padding:"10px 15px", fontSize:"16px"}}>Your Plan</h3>
        <div style={{margin:"0 15px", display:"grid", gap:"10px"}}>{plan?.workout?.map((w,i)=><div key={i} style={{background:"#151517", border:"1px solid #262629", borderRadius:"16px", padding:"15px"}}><b>{w.day}</b><p style={{margin:"5px 0 0", fontSize:"12px", color:"#9A9AA0"}}>{w.exercises?.join(" • ")}</p><button onClick={()=>{setScreen("workoutMode"); setIsRunning(true);}} style={{marginTop:"10px", background:"#E8FF5A", border:"none", padding:"6px 12px", borderRadius:"20px", fontSize:"12px", fontWeight:"bold"}}>Start</button></div>) || <p style={{color:"#9A9AA0"}}>No plan - Generate from home</p>}</div>
      </>}

      {tab==="nutrition" && <>
        <h3 style={{padding:"10px 15px", fontSize:"16px"}}>Nutrition Today</h3>
        <div style={{margin:"0 15px", display:"grid", gap:"10px"}}>
          {[{n:"Breakfast", f:plan?.diet?.breakfast || "Oats + Eggs + Peanut Butter", c:"420 kcal"},{n:"Lunch", f:plan?.diet?.lunch || "Rice + Chicken + Curd", c:"650 kcal"},{n:"Snack", f:plan?.diet?.snacks || "Protein Shake + Banana", c:"280 kcal"},{n:"Dinner", f:plan?.diet?.dinner || "Paneer + Roti + Veggies", c:"520 kcal"}].map(m=><div key={m.n} style={{background:"#151517", border:"1px solid #262629", borderRadius:"16px", padding:"15px", display:"flex", justifyContent:"space-between"}}><div><p style={{margin:0, fontSize:"11px", color:"#9A9AA0"}}>{m.n}</p><b style={{fontSize:"13px"}}>{m.f}</b></div><span style={{fontSize:"11px", color:"#E8FF5A"}}>{m.c}</span></div>)}
        </div>
      </>}

      {tab==="progress" && <>
        <h3 style={{padding:"10px 15px", fontSize:"16px"}}>Progress • FEATURE 3</h3>
        <div style={{margin:"0 15px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px"}}>
          <div style={{background:"#151517", border:"1px solid #262629", borderRadius:"16px", padding:"15px", textAlign:"center"}}><p style={{margin:0, fontSize:"10px", color:"#9A9AA0"}}>WEIGHT</p><b>67kg</b><p style={{margin:0, fontSize:"10px", color:"#2ECC71"}}>↓ 1.2kg</p></div>
          <div style={{background:"#151517", border:"1px solid #262629", borderRadius:"16px", padding:"15px", textAlign:"center"}}><p style={{margin:0, fontSize:"10px", color:"#9A9AA0"}}>STREAK</p><b>{streak} days</b><p style={{margin:0, fontSize:"10px", color:"#E8FF5A"}}>🔥 Best: 12</p></div>
          <div style={{background:"#151517", border:"1px solid #262629", borderRadius:"16px", padding:"15px", textAlign:"center"}}><p style={{margin:0, fontSize:"10px", color:"#9A9AA0"}}>WORKOUTS</p><b>24</b><p style={{margin:0, fontSize:"10px", color:"#9A9AA0"}}>This month</p></div>
        </div>
        <div style={{margin:"15px", background:"#151517", border:"1px solid #262629", borderRadius:"16px", padding:"15px"}}><p style={{margin:0, fontSize:"12px"}}>Weight Chart (Last 30 Days)</p><div style={{display:"flex", alignItems:"flex-end", gap:"4px", height:"80px", marginTop:"15px"}}>{[68,67.8,67.5,67.6,67.2,67,66.8,67,66.9,67].map((w,i)=><div key={i} style={{flex:1, background:"#E8FF5A", height:`${(w-65)*25}px`, borderRadius:"4px"}} />)}</div><div style={{display:"flex", justifyContent:"space-between", fontSize:"10px", color:"#9A9AA0", marginTop:"5px"}}><span>1 Oct</span><span>16 Oct</span></div></div>
      </>}

      <div style={{position:"fixed", bottom:0, width:"100%", maxWidth:"430px", background:"#151517", borderTop:"1px solid #262629", display:"flex", justifyContent:"space-around", padding:"12px 0"}}>
        {[{id:"home",l:"Home"},{id:"workout",l:"Workout"},{id:"nutrition",l:"Nutrition"},{id:"progress",l:"Progress"}].map(t=><span key={t.id} onClick={()=>setTab(t.id)} style={{color: tab===t.id? "#E8FF5A" : "#9A9AA0", fontSize:"13px", cursor:"pointer", fontWeight: tab===t.id? "bold" : "normal"}}>{t.l}</span>)}
      </div>
    </div>
  );
}