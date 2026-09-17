import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [form, setForm] = useState({ age: "", weight: "", height: "", goal: "muscle gain", level: "beginner", days: 5 });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if(!form.age || !form.weight){ alert("Fill all details!"); return; }
    setLoading(true);
    try{
      const res = await axios.post(`${API_URL}/generate`, form);
      setPlan(res.data);
      setScreen("plan");
    }catch(e){ alert(e.response?.data?.error || e.message) }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-yellow-400 selection:text-black">
      {/* NAV */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-5 max-w-7xl mx-auto">
        <h1 className="text-xl font-black tracking-tighter">FITCOACH<span className="text-yellow-400">.AI</span></h1>
        <div className="hidden md:flex gap-8 text-sm text-zinc-400">
          <span>How it works</span><span>Reviews</span><span>Pricing</span>
        </div>
        <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold">Login</button>
      </nav>

      {screen === "landing" && (
        <div className="max-w-7xl mx-auto px-6 md:px-10 mt-10 md:mt-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xs text-zinc-400 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> AI Powered • 12,493 plans generated
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">Build Your<br/><span className="text-yellow-400">Stronger Self</span></h1>
            <p className="text-zinc-400 mt-6 max-w-md text-lg">Get a 100% personalized workout & diet plan in 15 seconds. Like having a pro coach in your pocket.</p>
            <div className="flex gap-4 mt-8">
              <button onClick={()=>setScreen("form")} className="bg-yellow-400 text-black px-8 py-4 rounded-full font-black text-lg hover:bg-yellow-300 transition">Get My Plan - Free →</button>
              <div className="flex -space-x-2"><div className="w-10 h-10 rounded-full bg-zinc-700 border-2 border-black"></div><div className="w-10 h-10 rounded-full bg-zinc-600 border-2 border-black"></div><div className="w-10 h-10 rounded-full bg-zinc-500 border-2 border-black flex items-center justify-center text-xs">+2k</div></div>
            </div>
            <div className="flex gap-8 mt-10 text-sm"><div><b className="text-white text-lg">4.9/5</b><p className="text-zinc-500">from 1,203 users</p></div><div><b className="text-white text-lg">3 Min</b><p className="text-zinc-500">setup time</p></div></div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-[2rem] p-6 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600" className="rounded-[1.5rem] w-full h-[400px] object-cover opacity-80" />
              <div className="absolute bottom-12 left-12 right-12 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                <div><p className="text-xs text-zinc-400">Today's Calories</p><p className="font-bold text-lg">2,840 kcal • 180g Protein</p></div><div className="bg-yellow-400 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold">✓</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === "form" && (
        <div className="max-w-xl mx-auto mt-10 px-6">
          <button onClick={()=>setScreen("landing")} className="text-zinc-500 mb-6">← Back</button>
          <h2 className="text-4xl font-black tracking-tighter mb-2">Your Details</h2>
          <p className="text-zinc-500 mb-8">We need this to build your perfect plan</p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs text-zinc-500 uppercase tracking-widest">Age</label><input value={form.age} onChange={e=>setForm({...form, age:e.target.value})} placeholder="23" className="w-full mt-2 bg-black border border-zinc-800 rounded-xl px-4 py-4 text-lg focus:border-yellow-400 outline-none" /></div>
              <div><label className="text-xs text-zinc-500 uppercase tracking-widest">Weight (kg)</label><input value={form.weight} onChange={e=>setForm({...form, weight:e.target.value})} placeholder="67" className="w-full mt-2 bg-black border border-zinc-800 rounded-xl px-4 py-4 text-lg focus:border-yellow-400 outline-none" /></div>
            </div>
            <div><label className="text-xs text-zinc-500 uppercase tracking-widest">Primary Goal</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {["muscle gain","fat loss","strength"].map(g=><button key={g} onClick={()=>setForm({...form, goal:g})} className={`py-3 rounded-xl border capitalize font-bold text-sm ${form.goal===g?"bg-yellow-400 text-black border-yellow-400":"bg-black border-zinc-800 text-zinc-400"}`}>{g}</button>)}
              </div>
            </div>
            <div><label className="text-xs text-zinc-500 uppercase tracking-widest">Workout Days</label>
              <div className="flex gap-3 mt-2">
                {[4,5,6].map(d=><button key={d} onClick={()=>setForm({...form, days:d})} className={`flex-1 py-4 rounded-xl border font-black text-lg ${form.days===d?"bg-white text-black":"bg-black border-zinc-800"}`}>{d} Days</button>)}
              </div>
            </div>
            <button onClick={generate} disabled={loading} className="w-full bg-yellow-400 text-black py-5 rounded-full font-black text-lg mt-4 hover:bg-yellow-300 disabled:opacity-50">
              {loading ? "AI is Building Your Plan..." : "Generate My Plan →"}
            </button>
            <p className="text-center text-xs text-zinc-500">Free • No credit card • 15 sec</p>
          </div>
        </div>
      )}

      {screen === "plan" && plan && (
        <div className="max-w-5xl mx-auto mt-10 px-6 pb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-black">Your Plan is Ready 🔥</h2>
            <button onClick={()=>setScreen("landing")} className="bg-zinc-900 border border-zinc-800 px-5 py-2 rounded-full text-sm">Start Over</button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white text-black rounded-[2rem] p-8">
              <h3 className="font-black text-xl mb-6">WORKOUT SPLIT • {form.days} Days</h3>
              <div className="space-y-4">
                {(plan.workout || ["Push Day - Chest, Shoulder, Triceps 4x12","Pull Day - Back, Biceps","Leg Day - Squats, RDL, Lunges"]).map((w,i)=><div key={i} className="flex gap-4 p-4 bg-zinc-100 rounded-2xl"><div className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-sm">{i+1}</div><p className="font-bold pt-2">{typeof w === 'string' ? w : w.day || JSON.stringify(w)}</p></div>)}
              </div>
            </div>
            <div className="bg-yellow-400 text-black rounded-[2rem] p-8">
              <h3 className="font-black text-xl mb-4">DIET PLAN</h3>
              <p className="font-medium leading-relaxed">{plan.diet || `High protein diet for ${form.goal}. 5 meals, 180g protein, 2800 kcal. Focus on chicken, eggs, rice, whey.`}</p>
              <div className="mt-8 bg-black text-white rounded-2xl p-4 text-center"><p className="text-xs text-zinc-400">ESTIMATED RESULT</p><p className="font-black text-2xl">+2-3kg muscle in 60 days</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}