'use client';

import { useState, useRef, useEffect, useCallback } from "react"; 
 
 type Tool = "pen" | "eraser"; 
 type LineStyle = "none" | "single" | "double" | "fourline"; 
 interface Point { x: number; y: number; } 
 
 const BG = "#1a1a2e"; 
 const COLORS = ["#FFFFFF","#000000","#EF4444","#F97316","#EAB308","#22C55E","#3B82F6","#8B5CF6","#EC4899","#14B8A6","#F59E0B","#6366F1"]; 
 const LINE_OVERLAYS: Record<LineStyle, React.CSSProperties> = { 
   none: {}, 
   single: { 
     backgroundImage:`repeating-linear-gradient(transparent 0px,transparent 68px,rgba(147,197,253,0.55) 68px,rgba(147,197,253,0.55) 70px)`, 
     backgroundSize:"100% 70px", 
   }, 
   double: { 
     backgroundImage:`repeating-linear-gradient(transparent 0px,rgba(147,197,253,0.28) 0px,rgba(147,197,253,0.28) 1px,transparent 1px,transparent 33px,rgba(147,197,253,0.58) 33px,rgba(147,197,253,0.58) 35px,transparent 35px,transparent 75px)`, 
     backgroundSize:"100% 75px", 
   }, 
   fourline: { 
     backgroundImage:`repeating-linear-gradient(transparent 0px,rgba(147,197,253,0.3) 0px,rgba(147,197,253,0.3) 1px,transparent 1px,transparent 25px,rgba(147,197,253,0.2) 25px,rgba(147,197,253,0.2) 26px,transparent 26px,transparent 50px,rgba(147,197,253,0.2) 50px,rgba(147,197,253,0.2) 51px,transparent 51px,transparent 75px,rgba(147,197,253,0.6) 75px,rgba(147,197,253,0.6) 77px,transparent 77px,transparent 116px)`, 
     backgroundSize:"100% 116px", 
   }, 
 }; 
 
 export function ArabicWhiteboard({ onBack }: { onBack?: () => void }) { 
   const canvasRef = useRef<HTMLCanvasElement>(null); 
   const ctxRef    = useRef<CanvasRenderingContext2D | null>(null); 
 
   const isDrawingRef  = useRef(false); 
   const toolRef       = useRef<Tool>("pen"); 
   const colorRef      = useRef("#FFFFFF"); 
   const brushSizeRef  = useRef(5); 
   const eraserSizeRef = useRef(28); 
   const rawCursor     = useRef<Point>({ x:-200, y:-200 }); 
   const currentPts    = useRef<Point[]>([]); 
   const historyRef    = useRef<ImageData[]>([]); 
 
   const [tool, _setTool]            = useState<Tool>("pen"); 
   const [color, _setColor]          = useState("#FFFFFF"); 
   const [brushSize, _setBrushSize]  = useState(5); 
   const [eraserSize, _setEraserSize]= useState(28); 
   const [historyLen, setHistoryLen] = useState(0); 
   const [lineStyle, setLineStyle]   = useState<LineStyle>("none"); 
   const [showHelp, setShowHelp]     = useState(false); 
   const [, rerender] = useState(0); 
 
   const setTool  = (t: Tool)   => { toolRef.current=t;       _setTool(t); }; 
   const setColor = (c: string) => { colorRef.current=c;      _setColor(c); }; 
   const setBrush = (n: number) => { brushSizeRef.current=n;  _setBrushSize(n); }; 
   const setEraser= (n: number) => { eraserSizeRef.current=n; _setEraserSize(n); }; 
 
   /* ── canvas init ── */ 
   const initCanvas = useCallback(() => { 
     const c = canvasRef.current; if (!c) return; 
     const ctx = c.getContext("2d")!; 
     c.width = c.offsetWidth; c.height = c.offsetHeight; 
     ctx.fillStyle = BG; ctx.fillRect(0,0,c.width,c.height); 
     ctxRef.current = ctx; 
     historyRef.current = []; setHistoryLen(0); 
   }, []); 
 
   useEffect(() => { 
     const c = canvasRef.current; if (!c) return; 
     let initialized = false; 
     const obs = new ResizeObserver(entries => { 
       for (const e of entries) { 
         const { width, height } = e.contentRect; 
         if (width > 0 && height > 0) { 
           if (!initialized) { initialized=true; initCanvas(); } 
           else { 
             const saved = ctxRef.current?.getImageData(0,0,c.width,c.height); 
             c.width=Math.floor(width); c.height=Math.floor(height); 
             const ctx=c.getContext("2d")!; 
             ctx.fillStyle=BG; ctx.fillRect(0,0,c.width,c.height); 
             if (saved) { try { ctx.putImageData(saved,0,0); } catch(_){} } 
             ctxRef.current=ctx; 
           } 
         } 
       } 
     }); 
     obs.observe(c); 
     return () => obs.disconnect(); 
   }, [initCanvas]); 
 
   /* ── coords ── */ 
   const getRaw = (e: React.MouseEvent | React.TouchEvent): Point => { 
     const r=canvasRef.current!.getBoundingClientRect(); 
     if ("touches" in e) { const t=e.touches[0]; return {x:t.clientX-r.left,y:t.clientY-r.top}; } 
     return {x:(e as React.MouseEvent).clientX-r.left, y:(e as React.MouseEvent).clientY-r.top}; 
   }; 
   const getScaled = (e: React.MouseEvent | React.TouchEvent): Point => { 
     const c=canvasRef.current!; const r=c.getBoundingClientRect(); 
     const raw=getRaw(e); 
     return {x:raw.x*(c.width/r.width), y:raw.y*(c.height/r.height)}; 
   }; 
 
   /* ── history ── */ 
   const saveState = () => { 
     const c=canvasRef.current; const ctx=ctxRef.current; 
     if (!c||!ctx||c.width===0||c.height===0) return; 
     historyRef.current=[...historyRef.current.slice(-29), ctx.getImageData(0,0,c.width,c.height)]; 
     setHistoryLen(historyRef.current.length); 
   }; 
 
   /* ── draw ── */ 
   const onDown = (e: React.MouseEvent | React.TouchEvent) => { 
     e.preventDefault(); saveState(); 
     currentPts.current=[getScaled(e)]; 
     isDrawingRef.current=true; 
   }; 
   const onMove = (e: React.MouseEvent | React.TouchEvent) => { 
     e.preventDefault(); 
     rawCursor.current=getRaw(e); rerender(n=>n+1); 
     if (!isDrawingRef.current) return; 
     const ctx=ctxRef.current; if (!ctx) return; 
     const pos=getScaled(e); 
     const t=toolRef.current; 
     const sz=t==="eraser"?eraserSizeRef.current:brushSizeRef.current; 
     const col=t==="eraser"?BG:colorRef.current; 
     const prev=currentPts.current[currentPts.current.length-1]; 
     ctx.globalCompositeOperation="source-over"; 
     ctx.strokeStyle=col; ctx.lineWidth=sz; ctx.lineCap="round"; ctx.lineJoin="round"; 
     ctx.beginPath(); ctx.moveTo(prev.x,prev.y); ctx.lineTo(pos.x,pos.y); ctx.stroke(); 
     currentPts.current.push(pos); 
   }; 
   const onUp = () => { 
     isDrawingRef.current=false; 
     currentPts.current=[]; 
   }; 
 
   /* ── undo / clear ── */ 
   const undo = () => { 
     if (!historyRef.current.length) return; 
     const ctx=ctxRef.current!; 
     ctx.globalCompositeOperation="source-over"; 
     ctx.putImageData(historyRef.current[historyRef.current.length-1],0,0); 
     historyRef.current=historyRef.current.slice(0,-1); 
     setHistoryLen(historyRef.current.length); 
   }; 
   const clearAll = () => { 
     saveState(); 
     const c=canvasRef.current!; const ctx=ctxRef.current!; 
     ctx.globalCompositeOperation="source-over"; 
     ctx.fillStyle=BG; ctx.fillRect(0,0,c.width,c.height); 
   }; 
 
   const sz=tool==="eraser"?eraserSize:brushSize; 
   const divider=<div style={{width:"1px",alignSelf:"stretch",background:"#1e1e3f",margin:"0 2px"}}/>; 
   const tbBtn=(active:boolean,activeCol:string,extra?:React.CSSProperties):React.CSSProperties=>({ 
     padding:"5px 11px",borderRadius:"7px",border:"none",cursor:"pointer",fontWeight:"bold", 
     fontSize:"12px",whiteSpace:"nowrap",flexShrink:0, 
     background:active?activeCol:"#1e1e3f",color:active?"#fff":"#94a3b8", 
     boxShadow:active?`0 0 8px ${activeCol}55`:"",transition:"all .15s",...extra, 
   }); 
 
   return ( 
     <div style={{display:"flex",flexDirection:"column",height:"100vh",background:"#0a0a18",fontFamily:"'Segoe UI',Tahoma,sans-serif",userSelect:"none"}}> 
 
       {/* HEADER */} 
       <div style={{background:"linear-gradient(135deg,#0d0d2b,#1a0533 50%,#0d1a33)",borderBottom:"1px solid #2a1a4a",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}> 
         <div style={{display:"flex",alignItems:"center",gap:"10px"}}> 
           {onBack && (
             <button onClick={onBack} style={{background:"none", border:"none", cursor:"pointer", fontSize:"20px", color:"#fff", marginRight:"5px"}}>⬅️</button>
           )}
           <div style={{width:"36px",height:"36px",borderRadius:"9px",flexShrink:0,background:"linear-gradient(135deg,#7c3aed,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",boxShadow:"0 0 12px #7c3aed88"}}>🖊️</div> 
           <div> 
             <div style={{color:"#fff",fontWeight:"800",fontSize:"16px",lineHeight:1}}>Smart Teaching Board</div> 
             <div style={{color:"#7c6aaa",fontSize:"10px",marginTop:"2px",letterSpacing:"1px"}}>INTERACTIVE WHITEBOARD FOR EDUCATORS</div> 
           </div> 
         </div> 
         <button onClick={()=>setShowHelp(h=>!h)} style={{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid #3b2a6a",background:showHelp?"#3b2a6a":"transparent",color:"#a78bfa",fontSize:"14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>?</button> 
       </div> 
 
       {/* TOOLBAR ROW 1 */} 
       <div style={{background:"#111128",borderBottom:"1px solid #161630",display:"flex",alignItems:"center",gap:"5px",padding:"6px 12px",flexShrink:0,flexWrap:"wrap"}}> 
         <button onClick={()=>setTool("pen")} style={tbBtn(tool==="pen","#7c3aed")}>✏️ Pen</button> 
         {tool==="pen"&&COLORS.map(c=>( 
           <div key={c} onClick={()=>setColor(c)} style={{width:"19px",height:"19px",borderRadius:"50%",background:c,cursor:"pointer",flexShrink:0,border:color===c?"3px solid #a78bfa":"2px solid #2a2a4a",boxShadow:color===c?"0 0 5px #a78bfa":""}}/> 
         ))} 
         {divider} 
         <button onClick={()=>setTool("eraser")} style={tbBtn(tool==="eraser","#dc2626")}>🧹 Eraser</button> 
         {divider} 
         <button onClick={undo} disabled={!historyLen} style={tbBtn(false,"",{opacity:historyLen?1:0.35,color:"#60a5fa",background:"#0f2340"})}>↩️ Undo</button> 
         <button onClick={clearAll} style={tbBtn(false,"",{background:"#2d1515",color:"#f87171"})}>🗑️ Clear</button> 
       </div> 
 
       {/* TOOLBAR ROW 2 */} 
       <div style={{background:"#0e0e24",borderBottom:"1px solid #1e1e3f",display:"flex",alignItems:"center",gap:"8px",padding:"5px 12px",flexShrink:0,flexWrap:"wrap"}}> 
         <span style={{color:"#64748b",fontSize:"11px",whiteSpace:"nowrap"}}>{tool==="pen"?"Brush":"Eraser"} Size</span> 
         <input type="range" min={tool==="pen"?1:8} max={tool==="pen"?40:80} 
           value={tool==="pen"?brushSize:eraserSize} 
           onChange={e=>tool==="pen"?setBrush(+e.target.value):setEraser(+e.target.value)} 
           style={{width:"90px",accentColor:"#7c3aed",flexShrink:0}}/> 
         <div style={{width:`${Math.min(sz,22)}px`,height:`${Math.min(sz,22)}px`,borderRadius:"50%",background:tool==="pen"?color:"rgba(255,255,255,0.15)",border:"1px solid #444",minWidth:"4px",minHeight:"4px",flexShrink:0}}/> 
         {divider} 
         <span style={{color:"#64748b",fontSize:"11px",whiteSpace:"nowrap"}}>Lines</span> 
         <select value={lineStyle} onChange={e=>setLineStyle(e.target.value as LineStyle)} 
           style={{background:"#1a1a3a",color:"#94a3b8",border:"1px solid #2d2a50",borderRadius:"7px",padding:"4px 8px",fontSize:"12px",cursor:"pointer",outline:"none",flexShrink:0}}> 
           <option value="none">None</option> 
           <option value="single">Single Rule</option> 
           <option value="double">Double Rule</option> 
           <option value="fourline">Four-Line Rule</option> 
         </select> 
       </div> 
 
       {/* HELP MODAL */} 
       {showHelp&&( 
         <div onClick={()=>setShowHelp(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}> 
           <div onClick={e=>e.stopPropagation()} style={{background:"#13132a",border:"1px solid #2d2a50",borderRadius:"14px",padding:"24px 28px",maxWidth:"400px",width:"100%",boxShadow:"0 8px 40px #00000099"}}> 
             <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"18px"}}> 
               <div style={{color:"#fff",fontWeight:"700",fontSize:"15px"}}>Quick Reference</div> 
               <button onClick={()=>setShowHelp(false)} style={{background:"none",border:"none",color:"#64748b",fontSize:"18px",cursor:"pointer"}}>✕</button> 
             </div> 
             <div style={{display:"flex",flexDirection:"column",gap:"13px"}}> 
               {[ 
                 {icon:"✏️",label:"Pen",desc:"Select a colour and brush size, then draw on the board."}, 
                 {icon:"🧹",label:"Eraser",desc:"Paint over any area to remove content. Adjust size as needed."}, 
                 {icon:"↩️",label:"Undo & Clear",desc:"Undo reverses the last stroke. Clear resets the entire board."}, 
                 {icon:"📏",label:"Lines",desc:"Overlay Single, Double, or Four-Line ruled guides for writing practice."}, 
               ].map(({icon,label,desc})=>( 
                 <div key={label} style={{display:"flex",gap:"11px",alignItems:"flex-start"}}> 
                   <span style={{fontSize:"16px",width:"22px",flexShrink:0}}>{icon}</span> 
                   <div><span style={{color:"#a78bfa",fontWeight:"600",fontSize:"12px"}}>{label} — </span><span style={{color:"#94a3b8",fontSize:"12px",lineHeight:"1.5"}}>{desc}</span></div> 
                 </div> 
               ))} 
             </div> 
             <div style={{marginTop:"18px",paddingTop:"12px",borderTop:"1px solid #1e1e40",color:"#334155",fontSize:"11px",textAlign:"center"}}>Click anywhere outside to close</div> 
           </div> 
         </div> 
       )} 
 
       {/* CANVAS */} 
       <div style={{flex:1,position:"relative",overflow:"hidden"}}> 
         <canvas ref={canvasRef} 
           style={{position:"absolute",inset:0,width:"100%",height:"100%",display:"block",cursor:"none",touchAction:"none",zIndex:0}} 
           onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} 
           onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}/> 
         {lineStyle!=="none"&&<div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:1,...LINE_OVERLAYS[lineStyle]}}/>} 
         <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:2,overflow:"hidden"}}> 
           <div style={{position:"absolute",left:rawCursor.current.x-sz/2,top:rawCursor.current.y-sz/2,width:sz,height:sz,borderRadius:"50%", 
             border:tool==="eraser"?"2px dashed rgba(255,120,120,0.7)":`2px solid ${color==="000000"?"#aaa":color}`, 
             background:tool==="eraser"?"rgba(255,255,255,0.04)":"transparent", 
             boxShadow:tool==="pen"?`0 0 5px ${color}`:"",pointerEvents:"none"}}/> 
         </div> 
       </div> 
 
       {/* STATUS BAR */} 
       <div style={{background:"#08080f",borderTop:"1px solid #141428",padding:"3px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}> 
         <span style={{color:"#334155",fontSize:"11px"}}> 
           {tool==="pen"?"✏️ Pen":"🧹 Eraser"} · {sz}px · {historyLen} undo steps 
         </span> 
         <span style={{color:"#1e2a3a",fontSize:"11px"}}>Smart Teaching Board</span> 
       </div> 
     </div> 
   ); 
 } 
