import { useState, useEffect, useRef } from "react"

function FullScreenMediaHero({ id, kicker, title, desc, btn, defaultMedia }) {
  const inputRef = useRef(null)
  const [media, setMedia] = useState(() => {
    try { const s = localStorage.getItem(`fitcoach_fs_${id}`); return s? JSON.parse(s) : { type: "image", src: defaultMedia } }
    catch { return { type: "image", src: defaultMedia } }
  })
  const upload = (e) => {
    const f = e.target.files[0]; if (!f) return
    const r = new FileReader()
    r.onload = (ev) => {
      const m = { type: f.type.startsWith("video/")? "video" : "image", src: ev.target.result }
      setMedia(m); localStorage.setItem(`fitcoach_fs_${id}`, JSON.stringify(m))
    }; r.readAsDataURL(f)
  }
  return (
    <section style={{ position:"relative", width:"100vw", height:"100svh", overflow:"hidden", background:"#000" }}>
      {media.type==="video"? <video src={media.src} autoPlay muted loop playsInline style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"50% 25%" }}/>
      : <img src={media.src} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"50% 25%" }}/>}
      <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.35) 100%)`}}/>
      <div style={{ position:"relative", zIndex:2, height:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"6vw", paddingBottom:"8vh" }}>
        <p style={{ color:"#FFC100", fontSize:11, letterSpacing:3, fontWeight:900 }}>{kicker}</p>
        <h1 style={{ color:"#fff", fontWeight:900, fontSize:"clamp(36px,6vw,72px)", lineHeight:0.9, whiteSpace:"pre-line" }}>{title}</h1>
        <p style={{ color:"rgba(255,255,255,0.8)", fontSize:14, maxWidth:460, marginTop:16 }}>{desc}</p>
        <div style={{ display:"flex", gap:10, marginTop:24 }}>
          <button onClick={()=>inputRef.current.click()} style={{ background:"rgba(255,255,255,0.15)", backdropFilter:"blur(12px)", color:"#fff", border:"1px solid rgba(255,255,255,0.2)", padding:"14px 18px", borderRadius:100, fontWeight:700, fontSize:11 }}>↻ CHANGE MEDIA</button>
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*,video/mp4" onChange={upload} style={{ display:"none" }}/>
    </section>
  )
}

// ========== YOUR SUCCESS - 3 PARTS OF YOU ==========
function MySuccess3Part() {
  const defaults = [
    { label:"PHOTO 1", title:"FRONT", sub:"Day 1 • Starting", img:"https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800" },
    { label:"PHOTO 2", title:"SIDE", sub:"Day 60 • Progress", img:"https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800" },
    { label:"PHOTO 3", title:"BACK", sub:"Day 120 • Now", img:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800" },
  ]
  const [items, setItems] = useState(()=>{
    return defaults.map((d,i)=>{
      const saved = localStorage.getItem(`fitcoach_my_${i}`)
      return { ...d, src: saved || d.img, type:"image" }
    })
  })

  const changeMedia = (idx, file) => {
    const r = new FileReader()
    r.onload = (ev) => {
      const copy = [...items]; copy[idx].src = ev.target.result
      copy[idx].type = file.type.startsWith("video/")? "video":"image"
      setItems(copy); localStorage.setItem(`fitcoach_my_${idx}`, ev.target.result)
    }; r.readAsDataURL(file)
  }

  return (
    <section style={{ width:"100vw", background:"#000", margin:0, padding:0 }}>
      <div style={{ padding:"32px 4vw 12px", display:"flex", justifyContent:"space-between", alignItems:"end" }}>
        <div><p style={{color:"#FFC100",fontSize:11,letterSpacing:3,fontWeight:900}}>MY JOURNEY</p><h2 style={{color:"#fff",fontSize:"clamp(28px,4vw,48px)",fontWeight:900}}>MY SUCCESS STORY</h2></div>
        <p style={{color:"#666",fontSize:11}}>3 parts = Your 3 photos</p>
      </div>

      <div style={{ display:"flex", width:"100vw", flexWrap:"wrap" }}>
        {items.map((it, i)=>(
          <div key={i} style={{ flex:"1 1 33.333%", minWidth:300, height:"85svh", minHeight:600, position:"relative", overflow:"hidden", borderRight: i<2? "1px solid rgba(255,255,255,0.12)":"none" }}>
            {it.type==="video"? <video src={it.src} autoPlay muted loop playsInline style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"50% 30%" }}/>
            : <img src={it.src} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"50% 30%" }}/>}
            
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.15) 70%)"}}/>
            
            <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:24, zIndex:2 }}>
              <div style={{ background:"#FFC100", color:"#000", display:"inline-block", padding:"4px 10px", borderRadius:100, fontSize:10, fontWeight:900 }}>{it.label}</div>
              <h3 style={{ color:"#fff", fontWeight:900, fontSize:28, marginTop:8 }}>{it.title}</h3>
              <p style={{ color:"rgba(255,255,255,0.7)", fontSize:12, marginTop:4 }}>{it.sub}</p>
              <input id={`my-${i}`} type="file" accept="image/*,video/mp4" hidden onChange={e=>{ const f=e.target.files[0]; if(f) changeMedia(i,f)}}/>
              <button onClick={()=>document.getElementById(`my-${i}`).click()} style={{ marginTop:14, background:"#fff", color:"#000", border:"none", padding:"12px 18px", borderRadius:100, fontWeight:900, fontSize:11 }}>
                ↻ CHANGE PHOTO {i+1}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function App(){
  return (
    <>
      <style>{`html,body,#root{margin:0!important;padding:0!important;width:100%!important;overflow-x:hidden!important;background:#000} *{margin:0;padding:0;box-sizing:border-box} @media(max-width:900px){div[style*="flex: 1 1 33.333%"]{flex:1 1 100%!important}}`}</style>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, width:"100vw", display:"flex", justifyContent:"space-between", padding:"18px 4vw", background:"linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)" }}>
        <b style={{ color:"#fff", fontSize:14 }}>⩔ FITCOACH.AI</b><button style={{ background:"#fff", color:"#000", border:"none", padding:"10px 20px", borderRadius:100, fontWeight:900, fontSize:12 }}>Enroll Now</button>
      </nav>
      <div style={{ width:"100vw" }}>
        <FullScreenMediaHero id="hero" kicker="FOUNDER • SUNDARGARH, ODISHA" title={"SWAPNIL KUMAR\nPATEL"} desc="Full-screen hero - your main photo" defaultMedia="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1400"/>
        <MySuccess3Part />
      </div>
    </>
  )
}