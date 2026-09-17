import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [form, setForm] = useState({ age: "", weight: "", goal: "muscle gain", days: 5 });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const generate = async () => {
    if(!form.age ||!form.weight) return alert("Enter age & weight!");
    setLoading(true);
    try{
      const res = await axios.post(`${API_URL}/generate`, form);
      setPlan(res.data);
      setScreen("plan");
    }catch(e){ alert(e.message) }
    setLoading(false);
  }

  const handlePay = () => {
    // Demo mode - unlocks directly. Replace key below with your Razorpay live key later
    if(window.Razorpay){
      const options = {
        key: "rzp_test_123456", // <-- PASTE YOUR rzp_live_... HERE LATER
        amount: 29900,
        currency: "INR",
        name: "FitCoach AI PRO",
        description: "Unlock Full Plan",
        image: "/logo.png",
        handler: function(){ setPaid(true); },
        theme: { color: "#facc15" }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      setPaid(true); // demo unlock if Razorpay script not loaded
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

      <nav className="flex justify-between items-center px-6 md:px-10 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="w-10 h-10 rounded-full bg-zinc-900 object-cover border border-zinc-800" onError={(e)=>e.target.style.display='none'} />
          <h1 className="text-2xl font-black tracking-tighter">FITCOACH<span className="text-yellow-400">.AI</span> <span className="text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded-full ml-1">PRO</span></h1>
        </div>
        <button onClick={()=>setScreen("form")} className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-black">Get Plan</button>
      </nav>

      {screen === "landing" && (
        <div className="max-w-7xl mx-auto px-6 md:px-10 mt-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex gap-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-xs mb-6"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 12,493+ Indians transformed</div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.85] tracking-tighter">Build Your<br/><span className="text-yellow-400">Stronger Self</span><br/>In 60 Days</h1>
            <p className="text-zinc-400 mt-6 max-w-md">AI coach like ₹5000 trainer. Workout + diet + grocery list in 15 sec.</p>
            <button onClick={()=>setScreen("form")} className="mt-8 bg-yellow-400 text-black px-10 py-5 rounded-full font-black text-xl">Get My AI Plan - FREE →</button>
            <div className="flex gap-2 mt-10 text-yellow-400">★★★★★ <span className="text-zinc-500 text-xs ml-2">4.9/5 from 1,203 users</span></div>
          </div>
          <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700" className="rounded-[2.5rem] h-[520px] object-cover w-full" />
        </div>
      )}

      {screen === "form" && (
        <div className="max-w-xl mx-auto mt-10 px-6">
          <button onClick={()=>setScreen("landing")} className="text-zinc-500 mb-6">← Back</button>
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 space-y-6">
            <h2 className="text-3xl font-black">Your Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <input value={form.age} onChange={e=>setForm({...form, age:e.target.value})} placeholder="Age: 23" className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-4" />
              <input value={form.weight} onChange={e=>setForm({...form, weight:e.target.value})} placeholder="Weight: 67kg" className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-4" />
            </div>
            <div className="grid grid-cols-3 gap-2">{["muscle gain","fat loss","strength"].map(g=><button key={g} onClick={()=>setForm({...form, goal:g})} className={`py-4 rounded-2xl border font-black text-xs uppercase ${form.goal===g?"bg-yellow-400 text-black":"bg-black border-zinc-800 text-zinc-500"}`}>{g}</button>)}</div>
            <div className="flex gap-3">{[4,5,6].map(d=><button key={d} onClick={()=>setForm({...form, days:d})} className={`flex-1 py-4 rounded-2xl border font-black ${form.days===d?"bg-white text-black":"bg-black border-zinc-800"}`}>{d} Days</button>)}</div>
            <button onClick={generate} className="w-full bg-yellow-400 text-black py-5 rounded-full font-black">{loading?"Generating...":"Generate →"}</button>
          </div>
        </div>
      )}

      {screen === "plan" && plan && (
        <div className="max-w-xl mx-auto mt-10 px-6 pb-20">
          {!paid? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full mx-auto flex items-center justify-center text-4xl">🔒</div>
              <h2 className="text-4xl font-black mt-6">Plan Ready!</h2>
              <p className="text-zinc-400 mt-3">Unlock for <b className="text-white">₹299</b> <span className="line-through">₹1999</span> - 85% OFF today</p>
              <button onClick={handlePay} className="w-full bg-yellow-400 text-black py-5 rounded-full font-black mt-6">Unlock Now - Pay ₹299 →</button>
              <button onClick={()=>setPaid(true)} className="text-xs text-zinc-600 underline mt-4">Skip (Demo)</button>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-3xl font-black">🔥 Your PRO Plan Unlocked</h2>
              <div className="bg-white text-black rounded-[2rem] p-8"><h3 className="font-black">WORKOUT - {form.days} DAYS</h3><div className="mt-4 space-y-2">{(plan.workout||[]).map((w,i)=><div key={i} className="bg-zinc-100 p-4 rounded-xl font-bold">{typeof w==="string"?w:JSON.stringify(w)}</div>)}</div></div>
              <div className="bg-yellow-400 text-black rounded-[2rem] p-8"><h3 className="font-black">DIET</h3><p className="mt-3 font-medium">{plan.diet}</p></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}