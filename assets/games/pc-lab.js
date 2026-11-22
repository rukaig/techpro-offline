var PcLabGame=(()=>{var Zo=Object.defineProperty;var kd=Object.getOwnPropertyDescriptor;var zd=Object.getOwnPropertyNames;var Hd=Object.prototype.hasOwnProperty;var Gd=(s,t)=>{for(var e in t)Zo(s,e,{get:t[e],enumerable:!0})},Vd=(s,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of zd(t))!Hd.call(s,n)&&n!==e&&Zo(s,n,{get:()=>t[n],enumerable:!(i=kd(t,n))||i.enumerable});return s};var Wd=s=>Vd(Zo({},"__esModule",{value:!0}),s);var Yv={};Gd(Yv,{LEVELS:()=>Bc,PcLabGame:()=>qo,start:()=>qv,stop:()=>Ld});var Ko=["editorial","marshmallow","candy","neon","blueprint","pixel","lofi","mint","contrast"],Jc={editorial:{bg:15262165,fog:15262165,bench:7294262,benchTop:10122836,case:2763567,caseTrim:4539981,metal:12830669,pcb:2382662,accent:11740702,accent2:3038031,text:16249061,dark:!1,flags:{particles:!0,shadows:!0,outline:!1,grid:!1,pixel:!1,toon:!1,glass:!1,warm:!0}},marshmallow:{bg:16642548,fog:16642548,bench:13079204,benchTop:16173014,case:7164771,caseTrim:11109012,metal:15325407,pcb:7315342,accent:14245766,accent2:4168579,text:4862784,dark:!1,flags:{particles:!0,shadows:!0,outline:!1,grid:!1,pixel:!1,toon:!0,glass:!1,warm:!1}},candy:{bg:16770035,fog:16770035,bench:13912979,benchTop:16754898,case:5906759,caseTrim:11534446,metal:16767470,pcb:35448,accent:14024815,accent2:32670,text:3478057,dark:!1,flags:{particles:!0,shadows:!0,outline:!1,grid:!1,pixel:!1,toon:!1,glass:!0,warm:!1}},neon:{bg:264727,fog:264727,bench:858416,benchTop:1254981,case:462882,caseTrim:1719395,metal:9431295,pcb:670284,accent:2483967,accent2:16726996,text:14284031,dark:!0,flags:{particles:!0,shadows:!1,outline:!0,grid:!0,pixel:!1,toon:!1,glass:!0,warm:!1,emissive:!0}},blueprint:{bg:865112,fog:865112,bench:1195881,benchTop:1725055,case:731722,caseTrim:10471656,metal:14282751,pcb:1397373,accent:16765286,accent2:9425919,text:15398399,dark:!0,flags:{particles:!1,shadows:!1,outline:!0,grid:!0,pixel:!1,toon:!1,glass:!1,warm:!1,wireframe:!0}},pixel:{bg:1316389,fog:1316389,bench:4995631,benchTop:8018754,case:2106170,caseTrim:5199485,metal:12108504,pcb:2386767,accent:16764277,accent2:3716964,text:16249052,dark:!0,flags:{particles:!0,shadows:!1,outline:!1,grid:!1,pixel:!0,toon:!1,glass:!1,warm:!1}},lofi:{bg:2169623,fog:2169623,bench:4863013,benchTop:8215357,case:2761504,caseTrim:4996404,metal:13351332,pcb:4021067,accent:15247467,accent2:10336418,text:16314596,dark:!0,flags:{particles:!0,shadows:!0,outline:!1,grid:!1,pixel:!1,toon:!1,glass:!1,warm:!0}},mint:{bg:16121082,fog:16121082,bench:9157812,benchTop:13102051,case:4025191,caseTrim:9091250,metal:14283502,pcb:2854784,accent:1013358,accent2:947344,text:998713,dark:!1,flags:{particles:!0,shadows:!0,outline:!1,grid:!1,pixel:!1,toon:!1,glass:!0,warm:!1}},contrast:{bg:0,fog:0,bench:1118481,benchTop:2236962,case:0,caseTrim:16777215,metal:16777215,pcb:0,accent:16770560,accent2:16777215,text:16777215,dark:!0,flags:{particles:!1,shadows:!1,outline:!0,grid:!1,pixel:!1,toon:!1,glass:!1,warm:!1,flat:!0}}};function Jo(s,t){if(typeof s=="number")return s;let e=String(s||"").trim(),i=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e);if(i){let r=i[1].length===3?i[1].split("").map(a=>a+a).join(""):i[1];return parseInt(r,16)}let n=/^rgba?\(([^)]+)\)/i.exec(e);if(n){let[r,a,o]=n[1].split(",").map(l=>Number.parseFloat(l.trim()));if([r,a,o].every(Number.isFinite))return(Math.round(r)<<16)+(Math.round(a)<<8)+Math.round(o)}return t}function Mr(){let s=document.documentElement,t=Ko.includes(s.dataset.theme)?s.dataset.theme:"editorial",e=s.dataset.mode==="dark"?"dark":"light",i=Jc[t]||Jc.editorial,n=getComputedStyle(s),r=l=>n.getPropertyValue(l),a={...i};a.accent=Jo(r("--accent"),i.accent),a.accent2=Jo(r("--accent-2"),i.accent2),a.text=Jo(r("--text"),i.text);let o={...i.flags,reduced:s.dataset.motion==="reduced"||window.matchMedia?.("(prefers-reduced-motion: reduce)").matches||!1,dark:e==="dark"||i.dark};return o.reduced&&(o.particles=!1,o.shadows=!1),t==="contrast"&&(o.particles=!1,o.shadows=!1,o.outline=!0),{id:t,mode:e,palette:a,flags:o,css:{accent:r("--accent").trim(),accent2:r("--accent-2").trim(),text:r("--text").trim(),surface:r("--surface").trim(),line:r("--line").trim()}}}function Kc(s){let t=0,e=()=>{cancelAnimationFrame(t),t=requestAnimationFrame(()=>s(Mr()))},i=new MutationObserver(e);i.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme","data-mode","data-motion"]});let n=window.matchMedia?.("(prefers-color-scheme: dark)");return n?.addEventListener?.("change",e),()=>{cancelAnimationFrame(t),i.disconnect(),n?.removeEventListener?.("change",e)}}function Qo(s){let t=Mr();return s.style.setProperty("--game-accent",t.css.accent),s.style.setProperty("--game-accent-2",t.css.accent2),s.style.setProperty("--game-text",t.css.text),s.dataset.gameTheme=t.id,t}var si={editorial:[261.63,329.63,392,523.25],marshmallow:[293.66,369.99,440,587.33],candy:[329.63,415.3,493.88,659.25],neon:[220,277.18,329.63,440],blueprint:[246.94,311.13,369.99,493.88],pixel:[261.63,329.63,392,523.25],lofi:[196,246.94,293.66,392],mint:[293.66,349.23,440,587.33],contrast:[261.63,392,523.25,783.99]},Xd={editorial:"triangle",marshmallow:"sine",candy:"sine",neon:"sawtooth",blueprint:"square",pixel:"square",lofi:"sine",mint:"triangle",contrast:"square"},wr=class{constructor({theme:t="editorial",enabled:e=!0}={}){this.theme=t,this.enabled=e,this.context=null,this.master=null}setTheme(t){this.theme=t}setEnabled(t){this.enabled=!!t,!this.enabled&&this.context&&this.context.suspend?.(),this.enabled&&this.context&&this.context.resume?.()}ensure(){if(!this.enabled)return null;if(!this.context){let t=window.AudioContext||window.webkitAudioContext;if(!t)return null;this.context=new t,this.master=this.context.createGain(),this.master.gain.value=.7,this.master.connect(this.context.destination)}return this.context.state==="suspended"&&this.context.resume(),this.context}note(t,e=.1,{type:i=null,gain:n=.05,delay:r=0,slide:a=0}={}){let o=this.ensure();if(!o)return;let l=o.createOscillator(),c=o.createGain(),h=o.currentTime+r;l.type=i||Xd[this.theme]||"triangle",l.frequency.setValueAtTime(Math.max(40,t),h),a&&l.frequency.exponentialRampToValueAtTime(Math.max(40,t+a),h+e),c.gain.setValueAtTime(1e-4,h),c.gain.exponentialRampToValueAtTime(Math.max(2e-4,n),h+.012),c.gain.exponentialRampToValueAtTime(1e-4,h+e),l.connect(c).connect(this.master),l.start(h),l.stop(h+e+.03)}noise(t=.18,{gain:e=.05,delay:i=0,highpass:n=900}={}){let r=this.ensure();if(!r)return;let a=Math.max(1,Math.floor(r.sampleRate*t)),o=r.createBuffer(1,a,r.sampleRate),l=o.getChannelData(0);for(let u=0;u<a;u+=1)l[u]=(Math.random()*2-1)*(1-u/a);let c=r.createBufferSource();c.buffer=o;let h=r.createBiquadFilter();h.type="highpass",h.frequency.value=n;let d=r.createGain();d.gain.value=e,c.connect(h).connect(d).connect(this.master),c.start(r.currentTime+i)}chord(t,{duration:e=.14,gap:i=.1,gain:n=.04}={}){t.forEach((r,a)=>this.note(r,e,{delay:a*i,gain:n}))}click(){this.note(si[this.theme][0]*1.5,.045,{gain:.025,type:"square"})}hover(){this.note(si[this.theme][1]*2,.035,{gain:.012})}pick(){this.note(si[this.theme][1],.07,{gain:.03})}drop(){this.note(si[this.theme][0],.08,{gain:.035,type:"triangle"})}snap(){this.noise(.05,{gain:.05,highpass:1800}),this.note(si[this.theme][2],.1,{gain:.045,type:"triangle"}),this.note(si[this.theme][3],.16,{gain:.03,delay:.05})}clickSnap(){this.noise(.035,{gain:.06,highpass:2500}),this.note(si[this.theme][3],.07,{gain:.04,type:"square"})}error(){this.note(110,.2,{type:"sawtooth",gain:.04,slide:-30}),this.note(82,.24,{type:"sawtooth",gain:.03,delay:.1})}spark(){this.noise(.22,{gain:.07,highpass:2200}),this.note(1200,.1,{type:"sawtooth",gain:.025,slide:-600})}crunch(){this.noise(.24,{gain:.08,highpass:400}),this.note(70,.3,{type:"sawtooth",gain:.05,slide:-25})}paste(){this.noise(.3,{gain:.03,highpass:300}),this.note(si[this.theme][1],.3,{gain:.02,slide:60})}boot(){let t=si[this.theme];[0,1,2,3].forEach(e=>this.note(t[e],.22,{gain:.04,delay:e*.12})),this.note(t[0]/2,.9,{gain:.03,type:"sine",delay:.1})}fan(){this.noise(.8,{gain:.018,highpass:200})}star(t=0){let e=si[this.theme];this.note(e[Math.min(3,t)]*2,.18,{gain:.04,type:"sine"})}success(){let t=si[this.theme];[0,1,2,3,2,3].forEach((e,i)=>{this.note(t[e]*(i>2?1.5:1),.22,{gain:.035,delay:i*.1})})}fail(){[0,1,0].forEach((t,e)=>{this.note(si[this.theme][t]/2,.3,{type:"sawtooth",gain:.03,delay:e*.16})})}tick(){this.note(640,.03,{gain:.01,type:"square"})}whoosh(){this.noise(.25,{gain:.025,highpass:500})}};function Er(s=18,t=!0){if(t)try{navigator.vibrate?.(s)}catch{}}var Bh=0,Ul=1,kh=2;var En=1,zh=2,hs=3,Ii=0,We=1,Xe=2,Tn=0,Zi=1,or=2,Fl=3,Ol=4,Hh=5;var An=100,Gh=101,Vh=102,Wh=103,Xh=104,qh=200,Yh=201,$h=202,Zh=203,Bl=204,kl=205,Jh=206,Kh=207,Qh=208,jh=209,tu=210,eu=211,iu=212,nu=213,su=214,ra=0,aa=1,oa=2,Kn=3,la=4,ca=5,ha=6,ua=7,zl=0,ru=1,au=2,Di=0,Hl=1,Gl=2,Vl=3,lr=4,Wl=5,Xl=6,ql=7;var Yl=300,Rn=301,us=302,Xa=303,qa=304,da=1e3,Mi=1001,fa=1002,Ae=1003,ou=1004;var cr=1005;var He=1006,Ya=1007;var Ji=1008;var $e=1009,$l=1010,Zl=1011,ds=1012,$a=1013,mi=1014,ci=1015,gi=1016,Za=1017,Ja=1018,Cn=1020,Jl=35902,Kl=35899,Ql=1021,jl=1022,vi=1023,Gi=1026,Ki=1027,Ka=1028,Qa=1029,dn=1030,ja=1031;var to=1033,hr=33776,ur=33777,dr=33778,fr=33779,eo=35840,io=35841,no=35842,so=35843,ro=36196,ao=37492,oo=37496,lo=37488,co=37489,pr=37490,ho=37491,uo=37808,fo=37809,po=37810,mo=37811,go=37812,vo=37813,xo=37814,yo=37815,_o=37816,bo=37817,So=37818,Mo=37819,wo=37820,Eo=37821,To=36492,Ao=36494,Ro=36495,Co=36283,Po=36284,mr=36285,Io=36286;var Is=2300,pa=2301,na=2302,El=2303,Tl=2400,Al=2401,Rl=2402;var lu=3200;var Do=0,cu=1,Qi="",ve="srgb",Ds="srgb-linear",Ls="linear",jt="srgb";var sa=7680;var hu=519,uu=512,du=513,fu=514,tc=515,pu=516,mu=517,ec=518,ic=519,nc=35044;var sc="300 es",ai=2e3,Qn=2001;function qd(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Yd(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Ns(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function gu(){let s=Ns("canvas");return s.style.display="block",s}var Qc={},jn=null;function Us(...s){let t="THREE."+s.shift();jn?jn("log",t,...s):console.log(t,...s)}function vu(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ct(...s){s=vu(s);let t="THREE."+s.shift();if(jn)jn("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Lt(...s){s=vu(s);let t="THREE."+s.shift();if(jn)jn("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function As(...s){let t=s.join(" ");t in Qc||(Qc[t]=!0,Ct(...s))}function xu(s,t,e){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var yu={[ra]:ra,[oa]:ha,[la]:la,[Kn]:ca,[aa]:aa,[ha]:oa,[ua]:ua,[ca]:Kn},wi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let n=i[t];if(n!==void 0){let r=n.indexOf(e);r!==-1&&n.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,t);t.target=null}}},Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],jc=1234567,Zn=Math.PI/180,bn=180/Math.PI;function fn(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Le[s&255]+Le[s>>8&255]+Le[s>>16&255]+Le[s>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]).toLowerCase()}function Wt(s,t,e){return Math.max(t,Math.min(e,s))}function rc(s,t){return(s%t+t)%t}function $d(s,t,e,i,n){return i+(s-t)*(n-i)/(e-t)}function Zd(s,t,e){return s!==t?(e-s)/(t-s):0}function Rs(s,t,e){return(1-e)*s+e*t}function Jd(s,t,e,i){return Rs(s,t,1-Math.exp(-e*i))}function Kd(s,t=1){return t-Math.abs(rc(s,t*2)-t)}function Qd(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function jd(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function tf(s,t){return s+Math.floor(Math.random()*(t-s+1))}function ef(s,t){return s+Math.random()*(t-s)}function nf(s){return s*(.5-Math.random())}function sf(s){s!==void 0&&(jc=s);let t=jc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function rf(s){return s*Zn}function af(s){return s*bn}function of(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function lf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function ac(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function cf(s,t,e,i,n){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),d=r((t-i)/2),u=a((t-i)/2),f=r((i-t)/2),g=a((i-t)/2);switch(n){case"XYX":s.set(o*h,l*d,l*u,o*c);break;case"YZY":s.set(l*u,o*h,l*d,o*c);break;case"ZXZ":s.set(l*d,l*u,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*h,o*c);break;default:Ct("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function Lo(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function oc(s,t){if(t.constructor===Float32Array)return s;let e=Lo(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/e,-1)}function lc(s,t){if(t.constructor===Float32Array)return s;let e=Lo(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*e)}var qe={DEG2RAD:Zn,RAD2DEG:bn,generateUUID:fn,clamp:Wt,euclideanModulo:rc,mapLinear:$d,inverseLerp:Zd,lerp:Rs,damp:Jd,pingpong:Kd,smoothstep:Qd,smootherstep:jd,randInt:tf,randFloat:ef,randFloatSpread:nf,seededRandom:sf,degToRad:rf,radToDeg:af,isPowerOfTwo:of,ceilPowerOfTwo:lf,floorPowerOfTwo:ac,setQuaternionFromProperEuler:cf,normalize:lc,denormalize:oc},pc=class pc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Wt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Wt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),n=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*n+t.x,this.y=r*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};pc.prototype.isVector2=!0;var _t=pc,Ei=class{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,r,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],d=i[n+3],u=r[a+0],f=r[a+1],g=r[a+2],y=r[a+3];if(d!==y||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*y;m<0&&(u=-u,f=-f,g=-g,y=-y,m=-m);let p=1-o;if(m<.9995){let S=Math.acos(m),E=Math.sin(S);p=Math.sin(p*S)/E,o=Math.sin(o*S)/E,l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+y*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+y*o;let S=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=S,c*=S,h*=S,d*=S}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,n,r,a){let o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-o*f,t[e+2]=c*g+h*f+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,n=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),d=o(r/2),u=l(i/2),f=l(n/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Ct("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],n=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=i+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-n)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(n+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(n+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-n)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Wt(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+n*c-r*l,this._y=n*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},mc=class mc{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(th.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(th.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*n,this.y=r[1]*e+r[4]*i+r[7]*n,this.z=r[2]*e+r[5]*i+r[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,n=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*n-o*i),h=2*(o*e-r*n),d=2*(r*i-a*e);return this.x=e+l*c+a*d-o*h,this.y=i+l*h+o*c-r*d,this.z=n+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n,this.y=r[1]*e+r[5]*i+r[9]*n,this.z=r[2]*e+r[6]*i+r[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Wt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,n=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return jo.copy(this).projectOnVector(t),this.sub(jo)}reflect(t){return this.sub(jo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Wt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};mc.prototype.isVector3=!0;var R=mc,jo=new R,th=new Ei,gc=class gc{constructor(t,e,i,n,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c)}set(t,e,i,n,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=n,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],y=n[0],m=n[3],p=n[6],S=n[1],E=n[4],b=n[7],A=n[2],T=n[5],v=n[8];return r[0]=a*y+o*S+l*A,r[3]=a*m+o*E+l*T,r[6]=a*p+o*b+l*v,r[1]=c*y+h*S+d*A,r[4]=c*m+h*E+d*T,r[7]=c*p+h*b+d*v,r[2]=u*y+f*S+g*A,r[5]=u*m+f*E+g*T,r[8]=u*p+f*b+g*v,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+n*r*c-n*a*l}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=e*d+i*u+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return t[0]=d*y,t[1]=(n*c-h*i)*y,t[2]=(o*i-n*a)*y,t[3]=u*y,t[4]=(h*e-n*l)*y,t[5]=(n*r-o*e)*y,t[6]=f*y,t[7]=(i*l-c*e)*y,t[8]=(a*e-i*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-n*c,n*l,-n*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return As("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(tl.makeScale(t,e)),this}rotate(t){return As("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(tl.makeRotation(-t)),this}translate(t,e){return As("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(tl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};gc.prototype.isMatrix3=!0;var Ut=gc,tl=new Ut,eh=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ih=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hf(){let s={enabled:!0,workingColorSpace:Ds,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===jt&&(n.r=Hi(n.r),n.g=Hi(n.g),n.b=Hi(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===jt&&(n.r=Jn(n.r),n.g=Jn(n.g),n.b=Jn(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Qi?Ls:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[Ds]:{primaries:t,whitePoint:i,transfer:Ls,toXYZ:eh,fromXYZ:ih,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ve},outputColorSpaceConfig:{drawingBufferColorSpace:ve}},[ve]:{primaries:t,whitePoint:i,transfer:jt,toXYZ:eh,fromXYZ:ih,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ve}}}),s}var $t=hf();function Hi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Jn(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var In,ma=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{In===void 0&&(In=Ns("canvas")),In.width=t.width,In.height=t.height;let n=In.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=In}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ns("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let n=i.getImageData(0,0,t.width,t.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=Hi(r[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Hi(e[i]/255)*255):e[i]=Hi(e[i]);return{data:e,width:t.width,height:t.height}}else return Ct("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},uf=0,ts=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=fn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(el(n[a].image)):r.push(el(n[a]))}else r=el(n);i.url=r}return e||(t.images[this.uuid]=i),i}};function el(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ma.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ct("Texture: Unable to serialize Texture."),{})}var df=0,il=new R,Ge=class s extends wi{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,i=Mi,n=Mi,r=He,a=Ji,o=vi,l=$e,c=s.DEFAULT_ANISOTROPY,h=Qi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=fn(),this.name="",this.source=new ts(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(il).x}get height(){return this.source.getSize(il).y}get depth(){return this.source.getSize(il).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Ct(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Ct(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case da:t.x=t.x-Math.floor(t.x);break;case Mi:t.x=t.x<0?0:1;break;case fa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case da:t.y=t.y-Math.floor(t.y);break;case Mi:t.y=t.y<0?0:1;break;case fa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=Yl;Ge.DEFAULT_ANISOTROPY=1;var vc=class vc{constructor(t=0,e=0,i=0,n=1){this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],y=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,b=(f+1)/2,A=(p+1)/2,T=(h+u)/4,v=(d+y)/4,M=(g+m)/4;return E>b&&E>A?E<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(E),n=T/i,r=v/i):b>A?b<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(b),i=T/n,r=M/n):A<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(A),i=v/r,n=M/r),this.set(i,n,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-y)/S,this.z=(u-h)/S,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this.w=Wt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this.w=Wt(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Wt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};vc.prototype.isVector4=!0;var le=vc,ga=class extends wi{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:He,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new le(0,0,t,e),this.scissorTest=!1,this.viewport=new le(0,0,t,e),this.textures=[];let n=i.count;for(let r=0;r<n;r++)this.textures[r]=new Ge({width:t,height:e,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:He,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let n=Object.assign({},t.textures[e].image);this.textures[e].source=new ts(n)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Qe=class extends ga{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Fs=class extends Ge{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ae,this.minFilter=Ae,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var va=class extends Ge{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ae,this.minFilter=Ae,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Wa=class Wa{constructor(t,e,i,n,r,a,o,l,c,h,d,u,f,g,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c,h,d,u,f,g,y,m)}set(t,e,i,n,r,a,o,l,c,h,d,u,f,g,y,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=n,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wa().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,n=1/Dn.setFromMatrixColumn(t,0).length(),r=1/Dn.setFromMatrixColumn(t,1).length(),a=1/Dn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,n=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,f=a*d,g=o*h,y=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-y*c,e[9]=-o*l,e[2]=y-u*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,g=c*h,y=c*d;e[0]=u+y*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=y+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,g=c*h,y=c*d;e[0]=u-y*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=y-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,f=a*d,g=o*h,y=o*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+y,e[1]=l*d,e[5]=y*c+u,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,f=a*c,g=o*l,y=o*c;e[0]=l*h,e[4]=y-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-y*d}else if(t.order==="XZY"){let u=a*l,f=a*c,g=o*l,y=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+y,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=y*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ff,t,pf)}lookAt(t,e,i){let n=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),en.crossVectors(i,Ze),en.lengthSq()===0&&(Math.abs(i.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),en.crossVectors(i,Ze)),en.normalize(),Tr.crossVectors(Ze,en),n[0]=en.x,n[4]=Tr.x,n[8]=Ze.x,n[1]=en.y,n[5]=Tr.y,n[9]=Ze.y,n[2]=en.z,n[6]=Tr.z,n[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],y=i[6],m=i[10],p=i[14],S=i[3],E=i[7],b=i[11],A=i[15],T=n[0],v=n[4],M=n[8],I=n[12],C=n[1],N=n[5],F=n[9],z=n[13],D=n[2],V=n[6],q=n[10],G=n[14],et=n[3],X=n[7],Q=n[11],j=n[15];return r[0]=a*T+o*C+l*D+c*et,r[4]=a*v+o*N+l*V+c*X,r[8]=a*M+o*F+l*q+c*Q,r[12]=a*I+o*z+l*G+c*j,r[1]=h*T+d*C+u*D+f*et,r[5]=h*v+d*N+u*V+f*X,r[9]=h*M+d*F+u*q+f*Q,r[13]=h*I+d*z+u*G+f*j,r[2]=g*T+y*C+m*D+p*et,r[6]=g*v+y*N+m*V+p*X,r[10]=g*M+y*F+m*q+p*Q,r[14]=g*I+y*z+m*G+p*j,r[3]=S*T+E*C+b*D+A*et,r[7]=S*v+E*N+b*V+A*X,r[11]=S*M+E*F+b*q+A*Q,r[15]=S*I+E*z+b*G+A*j,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],y=t[7],m=t[11],p=t[15],S=l*f-c*u,E=o*f-c*d,b=o*u-l*d,A=a*f-c*h,T=a*u-l*h,v=a*d-o*h;return e*(y*S-m*E+p*b)-i*(g*S-m*A+p*T)+n*(g*E-y*A+p*v)-r*(g*b-y*T+m*v)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-i*(r*h-o*l)+n*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],y=t[13],m=t[14],p=t[15],S=e*o-i*a,E=e*l-n*a,b=e*c-r*a,A=i*l-n*o,T=i*c-r*o,v=n*c-r*l,M=h*y-d*g,I=h*m-u*g,C=h*p-f*g,N=d*m-u*y,F=d*p-f*y,z=u*p-f*m,D=S*z-E*F+b*N+A*C-T*I+v*M;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/D;return t[0]=(o*z-l*F+c*N)*V,t[1]=(n*F-i*z-r*N)*V,t[2]=(y*v-m*T+p*A)*V,t[3]=(u*T-d*v-f*A)*V,t[4]=(l*C-a*z-c*I)*V,t[5]=(e*z-n*C+r*I)*V,t[6]=(m*b-g*v-p*E)*V,t[7]=(h*v-u*b+f*E)*V,t[8]=(a*F-o*C+c*M)*V,t[9]=(i*C-e*F-r*M)*V,t[10]=(g*T-y*b+p*S)*V,t[11]=(d*b-h*T-f*S)*V,t[12]=(o*I-a*N-l*M)*V,t[13]=(e*N-i*I+n*M)*V,t[14]=(y*E-g*A-m*S)*V,t[15]=(h*A-d*E+u*S)*V,this}scale(t){let e=this.elements,i=t.x,n=t.y,r=t.z;return e[0]*=i,e[4]*=n,e[8]*=r,e[1]*=i,e[5]*=n,e[9]*=r,e[2]*=i,e[6]*=n,e[10]*=r,e[3]*=i,e[7]*=n,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),n=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,r,a){return this.set(1,i,r,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){let n=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,y=a*h,m=a*d,p=o*d,S=l*c,E=l*h,b=l*d,A=i.x,T=i.y,v=i.z;return n[0]=(1-(y+p))*A,n[1]=(f+b)*A,n[2]=(g-E)*A,n[3]=0,n[4]=(f-b)*T,n[5]=(1-(u+p))*T,n[6]=(m+S)*T,n[7]=0,n[8]=(g+E)*v,n[9]=(m-S)*v,n[10]=(1-(u+y))*v,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){let n=this.elements;t.x=n[12],t.y=n[13],t.z=n[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=Dn.set(n[0],n[1],n[2]).length(),o=Dn.set(n[4],n[5],n[6]).length(),l=Dn.set(n[8],n[9],n[10]).length();r<0&&(a=-a),ui.copy(this);let c=1/a,h=1/o,d=1/l;return ui.elements[0]*=c,ui.elements[1]*=c,ui.elements[2]*=c,ui.elements[4]*=h,ui.elements[5]*=h,ui.elements[6]*=h,ui.elements[8]*=d,ui.elements[9]*=d,ui.elements[10]*=d,e.setFromRotationMatrix(ui),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,n,r,a,o=ai,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(i-n),u=(e+t)/(e-t),f=(i+n)/(i-n),g,y;if(l)g=r/(a-r),y=a*r/(a-r);else if(o===ai)g=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Qn)g=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,r,a,o=ai,l=!1){let c=this.elements,h=2/(e-t),d=2/(i-n),u=-(e+t)/(e-t),f=-(i+n)/(i-n),g,y;if(l)g=1/(a-r),y=a/(a-r);else if(o===ai)g=-2/(a-r),y=-(a+r)/(a-r);else if(o===Qn)g=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Wa.prototype.isMatrix4=!0;var Zt=Wa,Dn=new R,ui=new Zt,ff=new R(0,0,0),pf=new R(1,1,1),en=new R,Tr=new R,Ze=new R,nh=new Zt,sh=new Ei,Vi=class s{constructor(t=0,e=0,i=0,n=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let n=t.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],d=n[2],u=n[6],f=n[10];switch(e){case"XYZ":this._y=Math.asin(Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Wt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ct("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return nh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(nh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return sh.setFromEuler(this),this.setFromQuaternion(sh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Vi.DEFAULT_ORDER="XYZ";var es=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},mf=0,rh=new R,Ln=new Ei,Fi=new Zt,Ar=new R,vs=new R,gf=new R,vf=new Ei,ah=new R(1,0,0),oh=new R(0,1,0),lh=new R(0,0,1),ch={type:"added"},xf={type:"removed"},Nn={type:"childadded",child:null},nl={type:"childremoved",child:null},ue=class s extends wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new R,e=new Vi,i=new Ei,n=new R(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Zt},normalMatrix:{value:new Ut}}),this.matrix=new Zt,this.matrixWorld=new Zt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new es,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ln.setFromAxisAngle(t,e),this.quaternion.multiply(Ln),this}rotateOnWorldAxis(t,e){return Ln.setFromAxisAngle(t,e),this.quaternion.premultiply(Ln),this}rotateX(t){return this.rotateOnAxis(ah,t)}rotateY(t){return this.rotateOnAxis(oh,t)}rotateZ(t){return this.rotateOnAxis(lh,t)}translateOnAxis(t,e){return rh.copy(t).applyQuaternion(this.quaternion),this.position.add(rh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ah,t)}translateY(t){return this.translateOnAxis(oh,t)}translateZ(t){return this.translateOnAxis(lh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Fi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ar.copy(t):Ar.set(t,e,i);let n=this.parent;this.updateWorldMatrix(!0,!1),vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fi.lookAt(vs,Ar,this.up):Fi.lookAt(Ar,vs,this.up),this.quaternion.setFromRotationMatrix(Fi),n&&(Fi.extractRotation(n.matrixWorld),Ln.setFromRotationMatrix(Fi),this.quaternion.premultiply(Ln.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Lt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ch),Nn.child=t,this.dispatchEvent(Nn),Nn.child=null):Lt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(xf),nl.child=t,this.dispatchEvent(nl),nl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Fi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Fi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Fi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ch),Nn.child=t,this.dispatchEvent(Nn),Nn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,t,gf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,vf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,n=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*n,r[13]+=i-r[1]*e-r[5]*i-r[9]*n,r[14]+=n-r[2]*e-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));n.material=o}else n.material=r(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];n.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let n=t.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ue.DEFAULT_UP=new R(0,1,0);ue.DEFAULT_MATRIX_AUTO_UPDATE=!0;ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ot=class extends ue{constructor(){super(),this.isGroup=!0,this.type="Group"}},yf={type:"move"},is=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ot,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ot,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ot,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let y of t.hand.values()){let m=e.getJointPose(y,i),p=this._getHandJoint(c,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(yf)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Ot;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},_u={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},nn={h:0,s:0,l:0},Rr={h:0,s:0,l:0};function sl(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Nt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=$t.workingColorSpace){return this.r=t,this.g=e,this.b=i,$t.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=$t.workingColorSpace){if(t=rc(t,1),e=Wt(e,0,1),i=Wt(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=sl(a,r,t+1/3),this.g=sl(a,r,t),this.b=sl(a,r,t-1/3)}return $t.colorSpaceToWorking(this,n),this}setStyle(t,e=ve){function i(r){r!==void 0&&parseFloat(r)<1&&Ct("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ct("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ct("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ve){let i=_u[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ct("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Hi(t.r),this.g=Hi(t.g),this.b=Hi(t.b),this}copyLinearToSRGB(t){return this.r=Jn(t.r),this.g=Jn(t.g),this.b=Jn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ve){return $t.workingToColorSpace(Ne.copy(this),t),Math.round(Wt(Ne.r*255,0,255))*65536+Math.round(Wt(Ne.g*255,0,255))*256+Math.round(Wt(Ne.b*255,0,255))}getHexString(t=ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(Ne.copy(this),e);let i=Ne.r,n=Ne.g,r=Ne.b,a=Math.max(i,n,r),o=Math.min(i,n,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(n-r)/d+(n<r?6:0);break;case n:l=(r-i)/d+2;break;case r:l=(i-n)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=ve){$t.workingToColorSpace(Ne.copy(this),t);let e=Ne.r,i=Ne.g,n=Ne.b;return t!==ve?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(nn),this.setHSL(nn.h+t,nn.s+e,nn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(nn),t.getHSL(Rr);let i=Rs(nn.h,Rr.h,e),n=Rs(nn.s,Rr.s,e),r=Rs(nn.l,Rr.l,e);return this.setHSL(i,n,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,n=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*n,this.g=r[1]*e+r[4]*i+r[7]*n,this.b=r[2]*e+r[5]*i+r[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ne=new Nt;Nt.NAMES=_u;var Os=class s{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Nt(t),this.near=e,this.far=i}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Bs=class extends ue{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vi,this.environmentIntensity=1,this.environmentRotation=new Vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},di=new R,Oi=new R,rl=new R,Bi=new R,Un=new R,Fn=new R,hh=new R,al=new R,ol=new R,ll=new R,cl=new le,hl=new le,ul=new le,Si=class s{constructor(t=new R,e=new R,i=new R){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),di.subVectors(t,e),n.cross(di);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(t,e,i,n,r){di.subVectors(n,e),Oi.subVectors(i,e),rl.subVectors(t,e);let a=di.dot(di),o=di.dot(Oi),l=di.dot(rl),c=Oi.dot(Oi),h=Oi.dot(rl),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(t,e,i,n,r,a,o,l){return this.getBarycoord(t,e,i,n,Bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Bi.x),l.addScaledVector(a,Bi.y),l.addScaledVector(o,Bi.z),l)}static getInterpolatedAttribute(t,e,i,n,r,a){return cl.setScalar(0),hl.setScalar(0),ul.setScalar(0),cl.fromBufferAttribute(t,e),hl.fromBufferAttribute(t,i),ul.fromBufferAttribute(t,n),a.setScalar(0),a.addScaledVector(cl,r.x),a.addScaledVector(hl,r.y),a.addScaledVector(ul,r.z),a}static isFrontFacing(t,e,i,n){return di.subVectors(i,e),Oi.subVectors(t,e),di.cross(Oi).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return di.subVectors(this.c,this.b),Oi.subVectors(this.a,this.b),di.cross(Oi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,r){return s.getInterpolation(t,this.a,this.b,this.c,e,i,n,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,n=this.b,r=this.c,a,o;Un.subVectors(n,i),Fn.subVectors(r,i),al.subVectors(t,i);let l=Un.dot(al),c=Fn.dot(al);if(l<=0&&c<=0)return e.copy(i);ol.subVectors(t,n);let h=Un.dot(ol),d=Fn.dot(ol);if(h>=0&&d<=h)return e.copy(n);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(i).addScaledVector(Un,a);ll.subVectors(t,r);let f=Un.dot(ll),g=Fn.dot(ll);if(g>=0&&f<=g)return e.copy(r);let y=f*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(Fn,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return hh.subVectors(r,n),o=(d-h)/(d-h+(f-g)),e.copy(n).addScaledVector(hh,o);let p=1/(m+y+u);return a=y*p,o=u*p,e.copy(i).addScaledVector(Un,a).addScaledVector(Fn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ti=class{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(fi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(fi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=fi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,fi):fi.fromBufferAttribute(r,a),fi.applyMatrix4(t.matrixWorld),this.expandByPoint(fi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Cr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Cr.copy(i.boundingBox)),Cr.applyMatrix4(t.matrixWorld),this.union(Cr)}let n=t.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fi),fi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(xs),Pr.subVectors(this.max,xs),On.subVectors(t.a,xs),Bn.subVectors(t.b,xs),kn.subVectors(t.c,xs),sn.subVectors(Bn,On),rn.subVectors(kn,Bn),vn.subVectors(On,kn);let e=[0,-sn.z,sn.y,0,-rn.z,rn.y,0,-vn.z,vn.y,sn.z,0,-sn.x,rn.z,0,-rn.x,vn.z,0,-vn.x,-sn.y,sn.x,0,-rn.y,rn.x,0,-vn.y,vn.x,0];return!dl(e,On,Bn,kn,Pr)||(e=[1,0,0,0,1,0,0,0,1],!dl(e,On,Bn,kn,Pr))?!1:(Ir.crossVectors(sn,rn),e=[Ir.x,Ir.y,Ir.z],dl(e,On,Bn,kn,Pr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ki),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ki=[new R,new R,new R,new R,new R,new R,new R,new R],fi=new R,Cr=new Ti,On=new R,Bn=new R,kn=new R,sn=new R,rn=new R,vn=new R,xs=new R,Pr=new R,Ir=new R,xn=new R;function dl(s,t,e,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){xn.fromArray(s,r);let o=n.x*Math.abs(xn.x)+n.y*Math.abs(xn.y)+n.z*Math.abs(xn.z),l=t.dot(xn),c=e.dot(xn),h=i.dot(xn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var ge=new R,Dr=new _t,_f=0,ze=class extends wi{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_f++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=nc,this.updateRanges=[],this.gpuType=ci,this.version=0,this._normalizationScale=t!==void 0?Lo(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Dr.fromBufferAttribute(this,e),Dr.applyMatrix3(t),this.setXY(e,Dr.x,Dr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix3(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix4(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.applyNormalMatrix(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.transformDirection(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=this._denormalize(i)),i}setComponent(t,e,i){return this.normalized&&(i=this._normalize(i)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),n=this._normalize(n),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):oc(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):lc(t,this.array)}};var ks=class extends ze{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var zs=class extends ze{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Jt=class extends ze{constructor(t,e,i){super(new Float32Array(t),e,i)}},bf=new Ti,ys=new R,fl=new R,Ai=class{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):bf.setFromPoints(t).getCenter(i);let n=0;for(let r=0,a=t.length;r<a;r++)n=Math.max(n,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ys.subVectors(t,this.center);let e=ys.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(ys,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(fl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ys.copy(t.center).add(fl)),this.expandByPoint(ys.copy(t.center).sub(fl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Sf=0,ri=new Zt,pl=new ue,zn=new R,Je=new Ti,_s=new Ti,Te=new R,de=class s extends wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=fn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(qd(t)?zs:ks)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ut().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return ri.makeRotationFromQuaternion(t),this.applyMatrix4(ri),this}rotateX(t){return ri.makeRotationX(t),this.applyMatrix4(ri),this}rotateY(t){return ri.makeRotationY(t),this.applyMatrix4(ri),this}rotateZ(t){return ri.makeRotationZ(t),this.applyMatrix4(ri),this}translate(t,e,i){return ri.makeTranslation(t,e,i),this.applyMatrix4(ri),this}scale(t,e,i){return ri.makeScale(t,e,i),this.applyMatrix4(ri),this}lookAt(t){return pl.lookAt(t),pl.updateMatrix(),this.applyMatrix4(pl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zn).negate(),this.translate(zn.x,zn.y,zn.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let n=0,r=t.length;n<r;n++){let a=t[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Jt(i,3))}else{let i=Math.min(t.length,e.count);for(let n=0;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&Ct("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ti);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){let r=e[i];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ai);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){let i=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];_s.setFromBufferAttribute(o),this.morphTargetsRelative?(Te.addVectors(Je.min,_s.min),Je.expandByPoint(Te),Te.addVectors(Je.max,_s.max),Je.expandByPoint(Te)):(Je.expandByPoint(_s.min),Je.expandByPoint(_s.max))}Je.getCenter(i);let n=0;for(let r=0,a=t.count;r<a;r++)Te.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(Te));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Te.fromBufferAttribute(o,c),l&&(zn.fromBufferAttribute(t,c),Te.add(zn)),n=Math.max(n,i.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,n=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new ze(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(i.count);for(let I=0;I<i.count;I++)o[I]=new R,l[I]=new R;let h=new R,d=new R,u=new R,f=new _t,g=new _t,y=new _t,m=new R,p=new R;function S(I,C,N){c[I]=c[C]=c[N]=1,h.fromBufferAttribute(i,I),d.fromBufferAttribute(i,C),u.fromBufferAttribute(i,N),f.fromBufferAttribute(r,I),g.fromBufferAttribute(r,C),y.fromBufferAttribute(r,N),d.sub(h),u.sub(h),g.sub(f),y.sub(f);let F=1/(g.x*y.y-y.x*g.y);isFinite(F)&&(m.copy(d).multiplyScalar(y.y).addScaledVector(u,-g.y).multiplyScalar(F),p.copy(u).multiplyScalar(g.x).addScaledVector(d,-y.x).multiplyScalar(F),o[I].add(m),o[C].add(m),o[N].add(m),l[I].add(p),l[C].add(p),l[N].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let I=0,C=E.length;I<C;++I){let N=E[I],F=N.start,z=N.count;for(let D=F,V=F+z;D<V;D+=3)S(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let b=new R,A=new R,T=new R,v=new R;function M(I){T.fromBufferAttribute(n,I),v.copy(T);let C=o[I];b.copy(C),b.sub(T.multiplyScalar(T.dot(C))).normalize(),A.crossVectors(v,C);let F=A.dot(l[I])<0?-1:1;a.setXYZW(I,b.x,b.y,b.z,F)}for(let I=0,C=i.count;I<C;++I)c[I]&&M(I);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new ze(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let n=new R,r=new R,a=new R,o=new R,l=new R,c=new R,h=new R,d=new R;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),y=t.getX(u+1),m=t.getX(u+2);n.fromBufferAttribute(e,g),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(n,r),h.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)n.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(n,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new ze(u,h,d)}if(this.index===null)return Ct("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,i=this.index.array,n=this.attributes;for(let o in n){let l=n[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let n={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(n[l]=h,r=!0)}r&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let n=t.attributes;for(let c in n){let h=n[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},xa=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=nc,this.updateRanges=[],this.version=0,this.uuid=fn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,r=this.stride;n<r;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});let e=uh(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=this.array.slice(0).buffer);let i=new this.array.constructor(t.arrayBuffers[e]),n=new this.constructor(i,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});let e=uh(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let i={uuid:this.uuid,buffer:e,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}};function uh(s){return s.buffer._uuid===void 0&&(s.buffer._uuid=fn()),s.byteOffset===0&&s.byteLength===s.buffer.byteLength?s.buffer._uuid:s.buffer._uuid+":"+s.byteOffset+":"+s.byteLength}var ke=new R,Hs=class s{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n,this._normalizationScale=t!==void 0?Lo(t.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=this._denormalize(i)),i}setComponent(t,e,i){return this.normalized&&(i=this._normalize(i)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=this._denormalize(e)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=this._denormalize(e)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=this._denormalize(e)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=this._denormalize(e)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),i=this._normalize(i)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),i=this._normalize(i),n=this._normalize(n)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),i=this._normalize(i),n=this._normalize(n),r=this._normalize(r)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Us("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return new ze(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Us("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):oc(t,this.data.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):lc(t,this.data.array)}},ml=new R,Mf=new R,wf=new Ut,Ke=class{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let n=ml.subVectors(i,e).cross(Mf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let n=t.delta(ml),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||wf.getNormalMatrix(t),n=this.coplanarPoint(ml).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Ef=0,pi=class extends wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=fn(),this.name="",this.type="Material",this.blending=Zi,this.side=Ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bl,this.blendDst=kl,this.blendEquation=An,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=Kn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sa,this.stencilZFail=sa,this.stencilZPass=sa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Ct(`Material: parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Ct(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=n(t.textures),a=n(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Nt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Ke().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new _t().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new _t().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let n=e.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},ns=class extends pi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Hn,bs=new R,Gn=new R,Vn=new R,Wn=new _t,Ss=new _t,bu=new Zt,Lr=new R,Ms=new R,Nr=new R,dh=new _t,gl=new _t,fh=new _t,Gs=class extends ue{constructor(t=new ns){if(super(),this.isSprite=!0,this.type="Sprite",Hn===void 0){Hn=new de;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new xa(e,5);Hn.setIndex([0,1,2,0,2,3]),Hn.setAttribute("position",new Hs(i,3,0,!1)),Hn.setAttribute("uv",new Hs(i,2,3,!1))}this.geometry=Hn,this.material=t,this.center=new _t(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Lt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Gn.setFromMatrixScale(this.matrixWorld),bu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Vn.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gn.multiplyScalar(-Vn.z);let i=this.material.rotation,n,r;i!==0&&(r=Math.cos(i),n=Math.sin(i));let a=this.center;Ur(Lr.set(-.5,-.5,0),Vn,a,Gn,n,r),Ur(Ms.set(.5,-.5,0),Vn,a,Gn,n,r),Ur(Nr.set(.5,.5,0),Vn,a,Gn,n,r),dh.set(0,0),gl.set(1,0),fh.set(1,1);let o=t.ray.intersectTriangle(Lr,Ms,Nr,!1,bs);if(o===null&&(Ur(Ms.set(-.5,.5,0),Vn,a,Gn,n,r),gl.set(0,1),o=t.ray.intersectTriangle(Lr,Nr,Ms,!1,bs),o===null))return;let l=t.ray.origin.distanceTo(bs);l<t.near||l>t.far||e.push({distance:l,point:bs.clone(),uv:Si.getInterpolation(bs,Lr,Ms,Nr,dh,gl,fh,new _t),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}toJSON(t){let e=super.toJSON(t);return e.object.center=this.center.toArray(),e}};function Ur(s,t,e,i,n,r){Wn.subVectors(s,e).addScalar(.5).multiply(i),n!==void 0?(Ss.x=r*Wn.x-n*Wn.y,Ss.y=n*Wn.x+r*Wn.y):Ss.copy(Wn),s.copy(t),s.x+=Ss.x,s.y+=Ss.y,s.applyMatrix4(bu)}var zi=new R,vl=new R,Fr=new R,Or=new R,Sn=class{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,zi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=zi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(zi.copy(this.origin).addScaledVector(this.direction,e),zi.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){vl.copy(t).add(e).multiplyScalar(.5),Fr.copy(e).sub(t).normalize(),Or.copy(this.origin).sub(vl);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Fr),o=Or.dot(this.direction),l=-Or.dot(Fr),c=Or.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let y=1/h;d*=y,u*=y,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(vl).addScaledVector(Fr,u),f}intersectSphere(t,e){if(t.radius<0)return null;zi.subVectors(t.center,this.origin);let i=zi.dot(this.direction),n=zi.dot(zi)-i*i,r=t.radius*t.radius;if(n>r)return null;let a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,n=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,n=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,zi)!==null}intersectTriangle(t,e,i,n,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,f=t.z-a.z,g=e.x-a.x,y=e.y-a.y,m=e.z-a.z,p=i.x-a.x,S=i.y-a.y,E=i.z-a.z,b=Math.abs(l),A=Math.abs(c),T=Math.abs(h),v,M,I,C,N,F,z,D,V,q,G,et;if(b>=A&&b>=T?(I=l,F=d,V=g,et=p,l>=0?(v=c,M=h,C=u,N=f,z=y,D=m,q=S,G=E):(v=h,M=c,C=f,N=u,z=m,D=y,q=E,G=S)):A>=T?(I=c,F=u,V=y,et=S,c>=0?(v=h,M=l,C=f,N=d,z=m,D=g,q=E,G=p):(v=l,M=h,C=d,N=f,z=g,D=m,q=p,G=E)):(I=h,F=f,V=m,et=E,h>=0?(v=l,M=c,C=d,N=u,z=g,D=y,q=p,G=S):(v=c,M=l,C=u,N=d,z=y,D=g,q=S,G=p)),I===0)return null;let X=v/I,Q=M/I,j=1/I,Et=C-X*F,Bt=N-Q*F,Z=z-X*V,gt=D-Q*V,bt=q-X*et,Pt=G-Q*et,vt=bt*gt-Pt*Z,zt=Et*Pt-Bt*bt,pe=Z*Bt-gt*Et;if(n){if(vt<0||zt<0||pe<0)return null}else if((vt<0||zt<0||pe<0)&&(vt>0||zt>0||pe>0))return null;let Dt=vt+zt+pe;if(Dt===0)return null;let te=j*(vt*F+zt*V+pe*et);return(Dt>0?te<0:te>0)?null:this.at(te/Dt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Re=class extends pi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vi,this.combine=zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},ph=new Zt,yn=new Sn,Br=new Ai,mh=new R,kr=new R,zr=new R,Hr=new R,xl=new R,Gr=new R,gh=new R,Vr=new R,wt=class extends ue{constructor(t=new de,e=new Re){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);let o=this.morphTargetInfluences;if(r&&o){Gr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(xl.fromBufferAttribute(d,t),a?Gr.addScaledVector(xl,h):Gr.addScaledVector(xl.sub(e),h))}e.add(Gr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Br.copy(i.boundingSphere),Br.applyMatrix4(r),yn.copy(t.ray).recast(t.near),!(Br.containsPoint(yn.origin)===!1&&(yn.intersectSphere(Br,mh)===null||yn.origin.distanceToSquared(mh)>(t.far-t.near)**2))&&(ph.copy(r).invert(),yn.copy(t.ray).applyMatrix4(ph),!(i.boundingBox!==null&&yn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,yn)))}_computeIntersections(t,e,i){let n,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=u.length;g<y;g++){let m=u[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let b=S,A=E;b<A;b+=3){let T=o.getX(b),v=o.getX(b+1),M=o.getX(b+2);n=Wr(this,p,t,i,c,h,d,T,v,M),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){let S=o.getX(m),E=o.getX(m+1),b=o.getX(m+2);n=Wr(this,a,t,i,c,h,d,S,E,b),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=u.length;g<y;g++){let m=u[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let b=S,A=E;b<A;b+=3){let T=b,v=b+1,M=b+2;n=Wr(this,p,t,i,c,h,d,T,v,M),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){let S=m,E=m+1,b=m+2;n=Wr(this,a,t,i,c,h,d,S,E,b),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}}};function Tf(s,t,e,i,n,r,a,o){let l;if(t.side===We?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,t.side===Ii,o),l===null)return null;Vr.copy(o),Vr.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Vr);return c<e.near||c>e.far?null:{distance:c,point:Vr.clone(),object:s}}function Wr(s,t,e,i,n,r,a,o,l,c){s.getVertexPosition(o,kr),s.getVertexPosition(l,zr),s.getVertexPosition(c,Hr);let h=Tf(s,t,e,i,kr,zr,Hr,gh);if(h){let d=new R;Si.getBarycoord(gh,kr,zr,Hr,d),n&&(h.uv=Si.getInterpolatedAttribute(n,o,l,c,d,new _t)),r&&(h.uv1=Si.getInterpolatedAttribute(r,o,l,c,d,new _t)),a&&(h.normal=Si.getInterpolatedAttribute(a,o,l,c,d,new R),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new R,materialIndex:0};Si.getNormal(kr,zr,Hr,u.normal),h.face=u,h.barycoord=d}return h}var Vs=class extends Ge{constructor(t=null,e=1,i=1,n,r,a,o,l,c=Ae,h=Ae,d,u){super(null,a,o,l,c,h,n,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ws=class extends ze{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Xn=new Zt,vh=new Zt,Xr=[],xh=new Ti,Af=new Zt,ws=new wt,Es=new Ai,ss=class extends wt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ws(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,Af)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ti),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Xn),xh.copy(t.boundingBox).applyMatrix4(Xn),this.boundingBox.union(xh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ai),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Xn),Es.copy(t.boundingSphere).applyMatrix4(Xn),this.boundingSphere.union(Es)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(t,e){let i=this.matrixWorld,n=this.count;if(ws.geometry=this.geometry,ws.material=this.material,ws.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Es.copy(this.boundingSphere),Es.applyMatrix4(i),t.ray.intersectsSphere(Es)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,Xn),vh.multiplyMatrices(i,Xn),ws.matrixWorld=vh,ws.raycast(t,Xr);for(let a=0,o=Xr.length;a<o;a++){let l=Xr[a];l.instanceId=r,l.object=this,e.push(l)}Xr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Ws(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new Vs(new Float32Array(n*this.count),n,this.count,Ka,ci));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=n*t;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},_n=new Ai,Rf=new _t(.5,.5),qr=new R,on=class{constructor(t=new Ke,e=new Ke,i=new Ke,n=new Ke,r=new Ke,a=new Ke){this.planes=[t,e,i,n,r,a]}set(t,e,i,n,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ai,i=!1){let n=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],y=r[9],m=r[10],p=r[11],S=r[12],E=r[13],b=r[14],A=r[15];if(n[0].setComponents(c-a,f-h,p-g,A-S).normalize(),n[1].setComponents(c+a,f+h,p+g,A+S).normalize(),n[2].setComponents(c+o,f+d,p+y,A+E).normalize(),n[3].setComponents(c-o,f-d,p-y,A-E).normalize(),i)n[4].setComponents(l,u,m,b).normalize(),n[5].setComponents(c-l,f-u,p-m,A-b).normalize();else if(n[4].setComponents(c-l,f-u,p-m,A-b).normalize(),e===ai)n[5].setComponents(c+l,f+u,p+m,A+b).normalize();else if(e===Qn)n[5].setComponents(l,u,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),_n.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),_n.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(_n)}intersectsSprite(t){_n.center.set(0,0,0);let e=Rf.distanceTo(t.center);return _n.radius=.7071067811865476+e,_n.applyMatrix4(t.matrixWorld),this.intersectsSphere(_n)}intersectsSphere(t){let e=this.planes,i=t.center,n=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let n=e[i];if(qr.x=n.normal.x>0?t.max.x:t.min.x,qr.y=n.normal.y>0?t.max.y:t.min.y,qr.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(qr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},yh=new Zt,ya=class s{constructor(){this.coordinateSystem=ai,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,i=this._frustums;for(let n=0;n<e.length;n++){let r=e[n];yh.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[n]===void 0&&(i[n]=new on),i[n].setFromProjectionMatrix(yh,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,i=t._frustums;for(let n=0;n<t._count;n++)e[n]===void 0&&(e[n]=new on),e[n].copy(i[n]);return this._count=t._count,this}clone(){return new s().copy(this)}};var ln=class extends pi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},_a=new R,ba=new R,_h=new Zt,Ts=new Sn,Yr=new Ai,yl=new R,bh=new R,Sa=class extends ue{constructor(t=new de,e=new ln){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let n=1,r=e.count;n<r;n++)_a.fromBufferAttribute(e,n-1),ba.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=_a.distanceTo(ba);t.setAttribute("lineDistance",new Jt(i,1))}else Ct("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Yr.copy(i.boundingSphere),Yr.applyMatrix4(n),Yr.radius+=r,t.ray.intersectsSphere(Yr)===!1)return;_h.copy(n).invert(),Ts.copy(t.ray).applyMatrix4(_h);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let y=f,m=g-1;y<m;y+=c){let p=h.getX(y),S=h.getX(y+1),E=$r(this,t,Ts,l,p,S,y);E&&e.push(E)}if(this.isLineLoop){let y=h.getX(g-1),m=h.getX(f),p=$r(this,t,Ts,l,y,m,g-1);p&&e.push(p)}}else{let f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let y=f,m=g-1;y<m;y+=c){let p=$r(this,t,Ts,l,y,y+1,y);p&&e.push(p)}if(this.isLineLoop){let y=$r(this,t,Ts,l,g-1,f,g-1);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function $r(s,t,e,i,n,r,a){let o=s.geometry.attributes.position;if(_a.fromBufferAttribute(o,n),ba.fromBufferAttribute(o,r),e.distanceSqToSegment(_a,ba,yl,bh)>i)return;yl.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(yl);if(!(c<t.near||c>t.far))return{distance:c,point:bh.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Sh=new R,Mh=new R,Mn=class extends Sa{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let n=0,r=e.count;n<r;n+=2)Sh.fromBufferAttribute(e,n),Mh.fromBufferAttribute(e,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Sh.distanceTo(Mh);t.setAttribute("lineDistance",new Jt(i,1))}else Ct("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var rs=class extends pi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},wh=new Zt,Cl=new Sn,Zr=new Ai,Jr=new R,Xs=class extends ue{constructor(t=new de,e=new rs){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Zr.copy(i.boundingSphere),Zr.applyMatrix4(n),Zr.radius+=r,t.ray.intersectsSphere(Zr)===!1)return;wh.copy(n).invert(),Cl.copy(t.ray).applyMatrix4(wh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=u,y=f;g<y;g++){let m=c.getX(g);Jr.fromBufferAttribute(d,m),Eh(Jr,m,l,n,t,e,this)}}else{let u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,y=f;g<y;g++)Jr.fromBufferAttribute(d,g),Eh(Jr,g,l,n,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Eh(s,t,e,i,n,r,a){let o=Cl.distanceSqToPoint(s);if(o<e){let l=new R;Cl.closestPointToPoint(s,l),l.applyMatrix4(i);let c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var qs=class extends Ge{constructor(t=[],e=Rn,i,n,r,a,o,l,c,h){super(t,e,i,n,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Wi=class extends Ge{constructor(t,e,i,n,r,a,o,l,c){super(t,e,i,n,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Xi=class extends Ge{constructor(t,e,i=mi,n,r,a,o=Ae,l=Ae,c,h=Gi,d=1){if(h!==Gi&&h!==Ki)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,n,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ts(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ys=class extends Xi{constructor(t,e=mi,i=Rn,n,r,a=Ae,o=Ae,l,c=Gi){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,i,n,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},$s=class extends Ge{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},fe=class s extends de{constructor(t=1,e=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};let o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,n,a,2),g("x","z","y",1,-1,t,i,-e,n,a,3),g("x","y","z",1,-1,t,e,i,n,r,4),g("x","y","z",-1,-1,t,e,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new Jt(c,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(d,2));function g(y,m,p,S,E,b,A,T,v,M,I){let C=b/v,N=A/M,F=b/2,z=A/2,D=T/2,V=v+1,q=M+1,G=0,et=0,X=new R;for(let Q=0;Q<q;Q++){let j=Q*N-z;for(let Et=0;Et<V;Et++){let Bt=Et*C-F;X[y]=Bt*S,X[m]=j*E,X[p]=D,c.push(X.x,X.y,X.z),X[y]=0,X[m]=0,X[p]=T>0?1:-1,h.push(X.x,X.y,X.z),d.push(Et/v),d.push(1-Q/M),G+=1}}for(let Q=0;Q<M;Q++)for(let j=0;j<v;j++){let Et=u+j+V*Q,Bt=u+j+V*(Q+1),Z=u+(j+1)+V*(Q+1),gt=u+(j+1)+V*Q;l.push(Et,Bt,gt),l.push(Bt,Z,gt),et+=6}o.addGroup(f,et,I),f+=et,u+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},qi=class s extends de{constructor(t=1,e=1,i=4,n=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:i,radialSegments:n,heightSegments:r},e=Math.max(0,e),i=Math.max(1,Math.floor(i)),n=Math.max(3,Math.floor(n)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=e/2,d=Math.PI/2*t,u=e,f=2*d+u,g=i*2+r,y=n+1,m=new R,p=new R;for(let S=0;S<=g;S++){let E=0,b=0,A=0,T=0;if(S<=i){let I=S/i,C=I*Math.PI/2;b=-h-t*Math.cos(C),A=t*Math.sin(C),T=-t*Math.cos(C),E=I*d}else if(S<=i+r){let I=(S-i)/r;b=-h+I*e,A=t,T=0,E=d+I*u}else{let I=(S-i-r)/i,C=I*Math.PI/2;b=h+t*Math.sin(C),A=t*Math.cos(C),T=t*Math.sin(C),E=d+u+I*d}let v=Math.max(0,Math.min(1,E/f)),M=0;S===0?M=.5/n:S===g&&(M=-.5/n);for(let I=0;I<=n;I++){let C=I/n,N=C*Math.PI*2,F=Math.sin(N),z=Math.cos(N);p.x=-A*z,p.y=b,p.z=A*F,o.push(p.x,p.y,p.z),m.set(-A*z,T,A*F),m.normalize(),l.push(m.x,m.y,m.z),c.push(C+M,v)}if(S>0){let I=(S-1)*y;for(let C=0;C<n;C++){let N=I+C,F=I+C+1,z=S*y+C,D=S*y+C+1;a.push(N,F,z),a.push(F,D,z)}}}this.setIndex(a),this.setAttribute("position",new Jt(o,3)),this.setAttribute("normal",new Jt(l,3)),this.setAttribute("uv",new Jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},wn=class s extends de{constructor(t=1,e=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:n},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new R,h=new _t;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let f=i+d/e*n;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Jt(a,3)),this.setAttribute("normal",new Jt(o,3)),this.setAttribute("uv",new Jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Yi=class s extends de{constructor(t=1,e=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;n=Math.floor(n),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,y=[],m=i/2,p=0;S(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Jt(d,3)),this.setAttribute("normal",new Jt(u,3)),this.setAttribute("uv",new Jt(f,2));function S(){let b=new R,A=new R,T=0,v=(e-t)/i;for(let M=0;M<=r;M++){let I=[],C=M/r,N=C*(e-t)+t;for(let F=0;F<=n;F++){let z=F/n,D=z*l+o,V=Math.sin(D),q=Math.cos(D);A.x=N*V,A.y=-C*i+m,A.z=N*q,d.push(A.x,A.y,A.z),b.set(V,v,q).normalize(),u.push(b.x,b.y,b.z),f.push(z,1-C),I.push(g++)}y.push(I)}for(let M=0;M<n;M++)for(let I=0;I<r;I++){let C=y[I][M],N=y[I+1][M],F=y[I+1][M+1],z=y[I][M+1];(t>0||I!==0)&&(h.push(C,N,z),T+=3),(e>0||I!==r-1)&&(h.push(N,F,z),T+=3)}c.addGroup(p,T,0),p+=T}function E(b){let A=g,T=new _t,v=new R,M=0,I=b===!0?t:e,C=b===!0?1:-1;for(let F=1;F<=n;F++)d.push(0,m*C,0),u.push(0,C,0),f.push(.5,.5),g++;let N=g;for(let F=0;F<=n;F++){let D=F/n*l+o,V=Math.cos(D),q=Math.sin(D);v.x=I*q,v.y=m*C,v.z=I*V,d.push(v.x,v.y,v.z),u.push(0,C,0),T.x=V*.5+.5,T.y=q*.5*C+.5,f.push(T.x,T.y),g++}for(let F=0;F<n;F++){let z=A+F,D=N+F;b===!0?h.push(D,D+1,z):h.push(D+1,D,z),M+=3}c.addGroup(p,M,b===!0?1:2),p+=M}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Zs=class s extends Yi{constructor(t=1,e=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Kr=new R,Qr=new R,_l=new R,jr=new Si,as=class extends de{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let n=Math.pow(10,4),r=Math.cos(Zn*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u=new Map,f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:y,b:m,c:p}=jr;if(y.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),jr.getNormal(_l),d[0]=`${Math.round(y.x*n)},${Math.round(y.y*n)},${Math.round(y.z*n)}`,d[1]=`${Math.round(m.x*n)},${Math.round(m.y*n)},${Math.round(m.z*n)}`,d[2]=`${Math.round(p.x*n)},${Math.round(p.y*n)},${Math.round(p.z*n)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let S=0;S<3;S++){let E=(S+1)%3,b=d[S],A=d[E],T=jr[h[S]],v=jr[h[E]],M=`${b}_${A}`,I=`${A}_${b}`,C=u.get(I);C?(_l.dot(C.normal)<=r&&(f.push(T.x,T.y,T.z),f.push(v.x,v.y,v.z)),u.set(I,null)):u.has(M)||u.set(M,{index0:c[S],index1:c[E],normal:_l.clone()})}}for(let g of u.values())if(g){let{index0:y,index1:m}=g;Kr.fromBufferAttribute(o,y),Qr.fromBufferAttribute(o,m),f.push(Kr.x,Kr.y,Kr.z),f.push(Qr.x,Qr.y,Qr.z)}this.setAttribute("position",new Jt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},oi=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ct("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,n=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(n),e.push(r),n=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),n=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),c=i[n]-a,c<0)o=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===a)return n/(r-1);let h=i[n],u=i[n+1]-h,f=(a-h)/u;return(n+f)/(r-1)}getTangent(t,e){let n=t-1e-4,r=t+1e-4;n<0&&(n=0),r>1&&(r=1);let a=this.getPoint(n),o=this.getPoint(r),l=e||(a.isVector2?new _t:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new R,n=[],r=[],a=[],o=new R,l=new Zt;for(let f=0;f<=t;f++){let g=f/t;n[f]=this.getTangentAt(g,new R)}r[0]=new R,a[0]=new R;let c=Number.MAX_VALUE,h=Math.abs(n[0].x),d=Math.abs(n[0].y),u=Math.abs(n[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],o),a[0].crossVectors(n[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(n[f-1],n[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Wt(n[f-1].dot(n[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(n[f],r[f])}if(e===!0){let f=Math.acos(Wt(r[0].dot(r[t]),-1,1));f/=t,n[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(n[g],f*g)),a[g].crossVectors(n[g],r[g])}return{tangents:n,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},Js=class extends oi{constructor(t=0,e=0,i=1,n=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new _t){let i=e,n=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(a?r=0:r=n),this.aClockwise===!0&&!a&&(r===n?r=-n:r=r-n);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ma=class extends Js{constructor(t,e,i,n,r,a){super(t,e,i,i,n,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function cc(){let s=0,t=0,e=0,i=0;function n(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){n(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,n(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return s+t*r+e*a+i*o}}}var Th=new R,Ah=new R,bl=new cc,Sl=new cc,Ml=new cc,Ri=class extends oi{constructor(t=[],e=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=n}getPoint(t,e=new R){let i=e,n=this.points,r=n.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=n[(o-1)%r]:(Ah.subVectors(n[0],n[1]).add(n[0]),c=Ah);let d=n[o%r],u=n[(o+1)%r];if(this.closed||o+2<r?h=n[(o+2)%r]:(Th.subVectors(n[r-1],n[r-2]).add(n[r-1]),h=Th),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),bl.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,y,m),Sl.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,y,m),Ml.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,y,m)}else this.curveType==="catmullrom"&&(bl.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Sl.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Ml.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return i.set(bl.calc(l),Sl.calc(l),Ml.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(n.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let n=this.points[e];t.points.push(n.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(new R().fromArray(n))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Rh(s,t,e,i,n){let r=(i-t)*.5,a=(n-e)*.5,o=s*s,l=s*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*s+e}function Cf(s,t){let e=1-s;return e*e*t}function Pf(s,t){return 2*(1-s)*s*t}function If(s,t){return s*s*t}function Cs(s,t,e,i){return Cf(s,t)+Pf(s,e)+If(s,i)}function Df(s,t){let e=1-s;return e*e*e*t}function Lf(s,t){let e=1-s;return 3*e*e*s*t}function Nf(s,t){return 3*(1-s)*s*s*t}function Uf(s,t){return s*s*s*t}function Ps(s,t,e,i,n){return Df(s,t)+Lf(s,e)+Nf(s,i)+Uf(s,n)}var wa=class extends oi{constructor(t=new _t,e=new _t,i=new _t,n=new _t){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new _t){let i=e,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Ps(t,n.x,r.x,a.x,o.x),Ps(t,n.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ea=class extends oi{constructor(t=new R,e=new R,i=new R,n=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new R){let i=e,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Ps(t,n.x,r.x,a.x,o.x),Ps(t,n.y,r.y,a.y,o.y),Ps(t,n.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ta=class extends oi{constructor(t=new _t,e=new _t){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new _t){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new _t){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Aa=class extends oi{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ra=class extends oi{constructor(t=new _t,e=new _t,i=new _t){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new _t){let i=e,n=this.v0,r=this.v1,a=this.v2;return i.set(Cs(t,n.x,r.x,a.x),Cs(t,n.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ks=class extends oi{constructor(t=new R,e=new R,i=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new R){let i=e,n=this.v0,r=this.v1,a=this.v2;return i.set(Cs(t,n.x,r.x,a.x),Cs(t,n.y,r.y,a.y),Cs(t,n.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ca=class extends oi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new _t){let i=e,n=this.points,r=(n.length-1)*t,a=Math.floor(r),o=r-a,l=n[a===0?a:a-1],c=n[a],h=n[a>n.length-2?n.length-1:a+1],d=n[a>n.length-3?n.length-1:a+2];return i.set(Rh(o,l.x,c.x,h.x,d.x),Rh(o,l.y,c.y,h.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(n.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let n=this.points[e];t.points.push(n.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(new _t().fromArray(n))}return this}},Ff=Object.freeze({__proto__:null,ArcCurve:Ma,CatmullRomCurve3:Ri,CubicBezierCurve:wa,CubicBezierCurve3:Ea,EllipseCurve:Js,LineCurve:Ta,LineCurve3:Aa,QuadraticBezierCurve:Ra,QuadraticBezierCurve3:Ks,SplineCurve:Ca});var Ci=class s extends de{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,d=t/o,u=e/l,f=[],g=[],y=[],m=[];for(let p=0;p<h;p++){let S=p*u-a;for(let E=0;E<c;E++){let b=E*d-r;g.push(b,-S,0),y.push(0,0,1),m.push(E/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<o;S++){let E=S+c*p,b=S+c*(p+1),A=S+1+c*(p+1),T=S+1+c*p;f.push(E,b,T),f.push(b,A,T)}this.setIndex(f),this.setAttribute("position",new Jt(g,3)),this.setAttribute("normal",new Jt(y,3)),this.setAttribute("uv",new Jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var li=class s extends de{constructor(t=1,e=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new R,u=new R,f=[],g=[],y=[],m=[];for(let p=0;p<=i;p++){let S=[],E=p/i,b=a+E*o,A=t*Math.cos(b),T=Math.sqrt(t*t-A*A),v=0;p===0&&a===0?v=.5/e:p===i&&l===Math.PI&&(v=-.5/e);for(let M=0;M<=e;M++){let I=M/e,C=n+I*r;d.x=-T*Math.cos(C),d.y=A,d.z=T*Math.sin(C),g.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),m.push(I+v,1-E),S.push(c++)}h.push(S)}for(let p=0;p<i;p++)for(let S=0;S<e;S++){let E=h[p][S+1],b=h[p][S],A=h[p+1][S],T=h[p+1][S+1];(p!==0||a>0)&&f.push(E,b,T),(p!==i-1||l<Math.PI)&&f.push(b,A,T)}this.setIndex(f),this.setAttribute("position",new Jt(g,3)),this.setAttribute("normal",new Jt(y,3)),this.setAttribute("uv",new Jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ve=class s extends de{constructor(t=1,e=.4,i=12,n=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:n,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),n=Math.floor(n);let l=[],c=[],h=[],d=[],u=new R,f=new R,g=new R;for(let y=0;y<=i;y++){let m=a+y/i*o;for(let p=0;p<=n;p++){let S=p/n*r;f.x=(t+e*Math.cos(m))*Math.cos(S),f.y=(t+e*Math.cos(m))*Math.sin(S),f.z=e*Math.sin(m),c.push(f.x,f.y,f.z),u.x=t*Math.cos(S),u.y=t*Math.sin(S),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(p/n),d.push(y/i)}}for(let y=1;y<=i;y++)for(let m=1;m<=n;m++){let p=(n+1)*y+m-1,S=(n+1)*(y-1)+m-1,E=(n+1)*(y-1)+m,b=(n+1)*y+m;l.push(p,S,b),l.push(S,E,b)}this.setIndex(l),this.setAttribute("position",new Jt(c,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};var $i=class s extends de{constructor(t=new Ks(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),e=64,i=1,n=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:n,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new R,l=new R,c=new _t,h=new R,d=[],u=[],f=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new Jt(d,3)),this.setAttribute("normal",new Jt(u,3)),this.setAttribute("uv",new Jt(f,2));function y(){for(let E=0;E<e;E++)m(E);m(r===!1?e:0),S(),p()}function m(E){h=t.getPointAt(E/e,h);let b=a.normals[E],A=a.binormals[E];for(let T=0;T<=n;T++){let v=T/n*Math.PI*2,M=Math.sin(v),I=-Math.cos(v);l.x=I*b.x+M*A.x,l.y=I*b.y+M*A.y,l.z=I*b.z+M*A.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,d.push(o.x,o.y,o.z)}}function p(){for(let E=1;E<=e;E++)for(let b=1;b<=n;b++){let A=(n+1)*(E-1)+(b-1),T=(n+1)*E+(b-1),v=(n+1)*E+b,M=(n+1)*(E-1)+b;g.push(A,T,M),g.push(T,v,M)}}function S(){for(let E=0;E<=e;E++)for(let b=0;b<=n;b++)c.x=E/e,c.y=b/n,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new s(new Ff[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Pn(s){let t={};for(let e in s){t[e]={};for(let i in s[e]){let n=s[e][i];if(Ch(n))n.isRenderTargetTexture?(Ct("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone();else if(Array.isArray(n))if(Ch(n[0])){let r=[];for(let a=0,o=n.length;a<o;a++)r[a]=n[a].clone();t[e][i]=r}else t[e][i]=n.slice();else t[e][i]=n}}return t}function Fe(s){let t={};for(let e=0;e<s.length;e++){let i=Pn(s[e]);for(let n in i)t[n]=i[n]}return t}function Ch(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Of(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function hc(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}var Su={clone:Pn,merge:Fe},Bf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Pi=class extends pi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bf,this.fragmentShader=kf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Pn(t.uniforms),this.uniformsGroups=Of(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let n in this.uniforms){let a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let n=t.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=e[n.value]||null;break;case"c":this.uniforms[i].value=new Nt().setHex(n.value);break;case"v2":this.uniforms[i].value=new _t().fromArray(n.value);break;case"v3":this.uniforms[i].value=new R().fromArray(n.value);break;case"v4":this.uniforms[i].value=new le().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Ut().fromArray(n.value);break;case"m4":this.uniforms[i].value=new Zt().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Pa=class extends Pi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Qs=class extends pi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Do,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Ia=class extends pi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Da=class extends pi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function qn(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function ta(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var cn=class{constructor(t,e,i,n){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,n=e[i],r=e[i-1];i:{t:{let a;e:{n:if(!(t<n)){for(let o=i+2;;){if(n===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=n,n=e[++i],t<n)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break i}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(n=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,t,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=t*n;for(let a=0;a!==n;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},La=class extends cn{constructor(t,e,i,n){super(t,e,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Tl,endingEnd:Tl}}intervalChanged_(t,e,i){let n=this.parameterPositions,r=t-2,a=t+1,o=n[r],l=n[a];if(o===void 0)switch(this.getSettings_().endingStart){case Al:r=t,o=2*e-i;break;case Rl:r=n.length-2,o=e+n[r]-n[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Al:a=t,l=2*i-e;break;case Rl:a=1,l=i+n[1]-n[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(i-e)/(n-e),y=g*g,m=y*g,p=-u*m+2*u*y-u*g,S=(1+u)*m+(-1.5-2*u)*y+(-.5+u)*g+1,E=(-1-f)*m+(1.5+f)*y+.5*g,b=f*m-f*y;for(let A=0;A!==o;++A)r[A]=p*a[h+A]+S*a[c+A]+E*a[l+A]+b*a[d+A];return r}},Na=class extends cn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(n-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},Ua=class extends cn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t){return this.copySampleValue_(t-1)}},Fa=class extends cn{interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(i-e)/(n-e),y=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*y+a[l+m]*g;return r}let u=o*2,f=t-1;for(let g=0;g!==o;++g){let y=a[c+g],m=a[l+g],p=f*u+g*2,S=d[p],E=d[p+1],b=t*u+g*2,A=h[b],T=h[b+1],v=Hf(i,e,S,A,n);r[g]=Mu(v,y,E,T,m)}return r}};function Mu(s,t,e,i,n){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*i+s*s*s*n}function zf(s,t,e,i,n){let r=1-s;return 3*r*r*(e-t)+6*r*s*(i-e)+3*s*s*(n-i)}function Hf(s,t,e,i,n){let r=(s-t)/(n-t);for(let a=0;a<8;a++){let o=Mu(r,t,e,i,n)-s;if(Math.abs(o)<1e-10)break;let l=zf(r,t,e,i,n);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var je=class{constructor(t,e,i,n){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=qn(e,this.TimeBufferType),this.values=qn(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:qn(t.times,Array),values:qn(t.values,Array)};let n=t.getInterpolation();n!==t.DefaultInterpolation&&(i.interpolation=n),ta(t.settings)&&(i.settings={inTangents:qn(t.settings.inTangents,Array),outTangents:qn(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Ua(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Na(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new La(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Fa(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Is:e=this.InterpolantFactoryMethodDiscrete;break;case pa:e=this.InterpolantFactoryMethodLinear;break;case na:e=this.InterpolantFactoryMethodSmooth;break;case El:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ct("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Is;case this.InterpolantFactoryMethodLinear:return pa;case this.InterpolantFactoryMethodSmooth:return na;case this.InterpolantFactoryMethodBezier:return El}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]+=t;ta(this.settings)&&(Ph(this.settings.inTangents,t),Ph(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]*=t;ta(this.settings)&&(Ih(this.settings.inTangents,t),Ih(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,n=i.length,r=0,a=n-1;for(;r!==n&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==n){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Lt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,n=this.values,r=i.length;r===0&&(Lt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Lt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Lt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(n!==void 0&&Yd(n))for(let o=0,l=n.length;o!==l;++o){let c=n[o];if(isNaN(c)){Lt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===na,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(n)l=!0;else{let d=o*i,u=d-i,f=d+i;for(let g=0;g!==i;++g){let y=e[d+g];if(y!==e[u+g]||y!==e[f+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*i,u=a*i;for(let f=0;f!==i;++f)e[u+f]=e[d+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,n=new i(this.name,t,e);return n.createInterpolant=this.createInterpolant,ta(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Ph(s,t){for(let e=0,i=s.length;e!==i;e+=2)s[e]+=t}function Ih(s,t){for(let e=0,i=s.length;e!==i;e+=2)s[e]*=t}je.prototype.ValueTypeName="";je.prototype.TimeBufferType=Float32Array;je.prototype.ValueBufferType=Float32Array;je.prototype.DefaultInterpolation=pa;var hn=class extends je{constructor(t,e,i){super(t,e,i)}};hn.prototype.ValueTypeName="bool";hn.prototype.ValueBufferType=Array;hn.prototype.DefaultInterpolation=Is;hn.prototype.InterpolantFactoryMethodLinear=void 0;hn.prototype.InterpolantFactoryMethodSmooth=void 0;var Oa=class extends je{constructor(t,e,i,n){super(t,e,i,n)}};Oa.prototype.ValueTypeName="color";var Ba=class extends je{constructor(t,e,i,n){super(t,e,i,n)}};Ba.prototype.ValueTypeName="number";var ka=class extends cn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(n-e),c=t*o;for(let h=c+o;c!==h;c+=4)Ei.slerpFlat(r,0,a,c-o,a,c,l);return r}},js=class extends je{constructor(t,e,i,n){super(t,e,i,n)}InterpolantFactoryMethodLinear(t){return new ka(this.times,this.values,this.getValueSize(),t)}};js.prototype.ValueTypeName="quaternion";js.prototype.InterpolantFactoryMethodSmooth=void 0;var un=class extends je{constructor(t,e,i){super(t,e,i)}};un.prototype.ValueTypeName="string";un.prototype.ValueBufferType=Array;un.prototype.DefaultInterpolation=Is;un.prototype.InterpolantFactoryMethodLinear=void 0;un.prototype.InterpolantFactoryMethodSmooth=void 0;var za=class extends je{constructor(t,e,i,n){super(t,e,i,n)}};za.prototype.ValueTypeName="vector";var Ha=class{constructor(t,e,i){let n=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&n.onStart!==void 0&&n.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},wu=new Ha,Ga=class{constructor(t){this.manager=t!==void 0?t:wu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(n,r){i.load(t,n,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};Ga.DEFAULT_MATERIAL_NAME="__DEFAULT";var os=class extends ue{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},tr=class extends os{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ue.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},wl=new Zt,Dh=new R,Lh=new R,er=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _t(512,512),this.mapType=$e,this.map=null,this.mapPass=null,this.matrix=new Zt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new on,this._frameExtents=new _t(1,1),this._viewportCount=1,this._viewports=[new le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Dh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Dh),Lh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Lh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,n){wl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(wl,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=n?n.z/r.x:1,o=n?n.w/r.y:1,l=n?n.x/r.x:0,c=n?n.y/r.y:0;t.coordinateSystem===Qn||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(wl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ea=new R,ia=new Ei,bi=new R,ir=class extends ue{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Zt,this.projectionMatrix=new Zt,this.projectionMatrixInverse=new Zt,this.coordinateSystem=ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ea,ia,bi),bi.x===1&&bi.y===1&&bi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ia,bi.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(ea,ia,bi),bi.x===1&&bi.y===1&&bi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ia,bi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},an=new R,Nh=new _t,Uh=new _t,Ue=class extends ir{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=bn*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Zn*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return bn*2*Math.atan(Math.tan(Zn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){an.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(an.x,an.y).multiplyScalar(-t/an.z),an.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(an.x,an.y).multiplyScalar(-t/an.z)}getViewSize(t,e){return this.getViewBounds(t,Nh,Uh),e.subVectors(Uh,Nh)}setViewOffset(t,e,i,n,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Zn*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,r=-.5*n,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,e-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Pl=class extends er{constructor(){super(new Ue(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,i=bn*2*t.angle*this.focus,n=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(i!==e.fov||n!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=n,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){let t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}},nr=class extends os{constructor(t,e,i=0,n=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ue.DEFAULT_UP),this.updateMatrix(),this.target=new ue,this.distance=i,this.angle=n,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Pl}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}};var sr=class extends ir{constructor(t=-1,e=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-t,a=i+t,o=n+e,l=n-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Il=class extends er{constructor(){super(new sr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ls=class extends os{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ue.DEFAULT_UP),this.updateMatrix(),this.target=new ue,this.shadow=new Il}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Yn=-90,$n=1,cs=class extends ue{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new Ue(Yn,$n,t,e);n.layers=this.layers,this.add(n);let r=new Ue(Yn,$n,t,e);r.layers=this.layers,this.add(r);let a=new Ue(Yn,$n,t,e);a.layers=this.layers,this.add(a);let o=new Ue(Yn,$n,t,e);o.layers=this.layers,this.add(o);let l=new Ue(Yn,$n,t,e);l.layers=this.layers,this.add(l);let c=new Ue(Yn,$n,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,n,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===ai)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Qn)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let y=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.mipmapsAutoUpdate=y,t.setRenderTarget(i,5,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Va=class extends Ue{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var uc="\\[\\]\\.:\\/",Gf=new RegExp("["+uc+"]","g"),dc="[^"+uc+"]",Vf="[^"+uc.replace("\\.","")+"]",Wf=/((?:WC+[\/:])*)/.source.replace("WC",dc),Xf=/(WCOD+)?/.source.replace("WCOD",Vf),qf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",dc),Yf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",dc),$f=new RegExp("^"+Wf+Xf+qf+Yf+"$"),Zf=["material","materials","bones","map"],Dl=class{constructor(t,e,i){let n=i||re.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,n)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},re=class s{constructor(t,e,i){this.path=e,this.parsedPath=i||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,i):new s(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Gf,"")}static parseTrackName(t){let e=$f.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let r=i.nodeName.substring(n+1);Zf.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},n=i(t.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)t[e++]=i[n]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,n=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ct("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Lt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Lt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Lt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Lt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Lt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[n];if(a===void 0){let c=e.nodeName;Lt("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!t.geometry){Lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};re.Composite=Dl;re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};re.prototype.GetterByBindingType=[re.prototype._getValue_direct,re.prototype._getValue_array,re.prototype._getValue_arrayElement,re.prototype._getValue_toArray];re.prototype.SetterByBindingTypeAndVersioning=[[re.prototype._setValue_direct,re.prototype._setValue_direct_setNeedsUpdate,re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[re.prototype._setValue_array,re.prototype._setValue_array_setNeedsUpdate,re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[re.prototype._setValue_arrayElement,re.prototype._setValue_arrayElement_setNeedsUpdate,re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[re.prototype._setValue_fromArray,re.prototype._setValue_fromArray_setNeedsUpdate,re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Kv=new Float32Array(1);var Fh=new Zt,rr=class{constructor(t,e,i=0,n=1/0){this.ray=new Sn(t,e),this.near=i,this.far=n,this.camera=null,this.layers=new es,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Lt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Fh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Fh),this}intersectObject(t,e=!0,i=[]){return Ll(t,this,i,e),i.sort(Oh),i}intersectObjects(t,e=!0,i=[]){for(let n=0,r=t.length;n<r;n++)Ll(t[n],this,i,e);return i.sort(Oh),i}};function Oh(s,t){return s.distance-t.distance}function Ll(s,t,e,i){let n=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(n=!1),n===!0&&i===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)Ll(r[a],t,e,!0)}}var xc=class xc{constructor(t,e,i,n){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,n){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=n,this}};xc.prototype.isMatrix2=!0;var Nl=xc;var ar=class extends Mn{constructor(t=10,e=10,i=4473924,n=8947848){i=new Nt(i),n=new Nt(n);let r=e/2,a=t/e,o=t/2,l=[],c=[];for(let u=0,f=0,g=-o;u<=e;u++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);let y=u===r?i:n;y.toArray(c,f),f+=3,y.toArray(c,f),f+=3,y.toArray(c,f),f+=3,y.toArray(c,f),f+=3}let h=new de;h.setAttribute("position",new Jt(l,3)),h.setAttribute("color",new Jt(c,3));let d=new ln({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function fc(s,t,e,i){let n=Jf(i);switch(e){case Ql:return s*t;case Ka:return s*t/n.components*n.byteLength;case Qa:return s*t/n.components*n.byteLength;case dn:return s*t*2/n.components*n.byteLength;case ja:return s*t*2/n.components*n.byteLength;case jl:return s*t*3/n.components*n.byteLength;case vi:return s*t*4/n.components*n.byteLength;case to:return s*t*4/n.components*n.byteLength;case hr:case ur:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case dr:case fr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case io:case so:return Math.max(s,16)*Math.max(t,8)/4;case eo:case no:return Math.max(s,8)*Math.max(t,8)/2;case ro:case ao:case lo:case co:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case oo:case pr:case ho:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case uo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case fo:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case po:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case mo:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case go:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case vo:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case xo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case yo:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case _o:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case bo:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case So:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Mo:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case wo:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Eo:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case To:case Ao:case Ro:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Co:case Po:return Math.ceil(s/4)*Math.ceil(t/4)*8;case mr:case Io:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Jf(s){switch(s){case $e:case $l:return{byteLength:1,components:1};case ds:case Zl:case gi:return{byteLength:2,components:1};case Za:case Ja:return{byteLength:2,components:4};case mi:case $a:case ci:return{byteLength:4,components:1};case Jl:case Kl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ct("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function qu(){let s=null,t=!1,e=null,i=null;function n(r,a){i=s.requestAnimationFrame(n),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Qf(s){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],y=d[f];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++u,d[u]=y)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let y=d[f];s.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:r,update:a}}var jf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ep=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ip=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,np=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ap=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,op=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,lp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,up=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,dp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,fp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,pp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,_p=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,bp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Sp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Mp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,wp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ep=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ap=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Pp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Ip=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Dp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Lp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Np=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Up=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Op=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,zp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Wp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Xp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$p=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Jp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Kp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Qp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,jp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tm=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,em=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,im=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,am=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,om=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,lm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,um=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dm=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,mm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,vm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,xm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ym=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_m=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,bm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Sm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Em=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Am=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Rm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Im=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Dm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Um=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Fm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Om=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,km=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,zm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Gm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Vm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,qm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ym=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,$m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Km=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Qm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eg=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ng=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,rg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ag=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,og=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ug=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,fg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,vg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,yg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_g=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Mg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Eg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ag=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ig=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:jf,alphahash_pars_fragment:tp,alphamap_fragment:ep,alphamap_pars_fragment:ip,alphatest_fragment:np,alphatest_pars_fragment:sp,aomap_fragment:rp,aomap_pars_fragment:ap,batching_pars_vertex:op,batching_vertex:lp,begin_vertex:cp,beginnormal_vertex:hp,bsdfs:up,iridescence_fragment:dp,bumpmap_pars_fragment:fp,clipping_planes_fragment:pp,clipping_planes_pars_fragment:mp,clipping_planes_pars_vertex:gp,clipping_planes_vertex:vp,color_fragment:xp,color_pars_fragment:yp,color_pars_vertex:_p,color_vertex:bp,common:Sp,defaultnormal_vertex:Mp,displacementmap_pars_vertex:wp,displacementmap_vertex:Ep,emissivemap_fragment:Tp,emissivemap_pars_fragment:Ap,colorspace_fragment:Rp,colorspace_pars_fragment:Cp,envmap_fragment:Pp,envmap_common_pars_fragment:Ip,envmap_pars_fragment:Dp,envmap_pars_vertex:Lp,envmap_physical_pars_fragment:Wp,envmap_vertex:Np,fog_vertex:Up,fog_pars_vertex:Fp,fog_fragment:Op,fog_pars_fragment:Bp,gradientmap_pars_fragment:kp,lightmap_pars_fragment:zp,lights_lambert_fragment:Hp,lights_lambert_pars_fragment:Gp,lights_pars_begin:Vp,lights_toon_fragment:Xp,lights_toon_pars_fragment:qp,lights_phong_fragment:Yp,lights_phong_pars_fragment:$p,lights_physical_fragment:Zp,lights_physical_pars_fragment:Jp,lights_fragment_begin:Kp,lights_fragment_maps:Qp,lights_fragment_end:jp,lightprobes_pars_fragment:tm,logdepthbuf_fragment:em,logdepthbuf_pars_fragment:im,logdepthbuf_pars_vertex:nm,logdepthbuf_vertex:sm,map_fragment:rm,map_pars_fragment:am,map_particle_fragment:om,map_particle_pars_fragment:lm,metalnessmap_fragment:cm,metalnessmap_pars_fragment:hm,morphinstance_vertex:um,morphcolor_vertex:dm,morphnormal_vertex:fm,morphtarget_pars_vertex:pm,morphtarget_vertex:mm,normal_fragment_begin:gm,normal_fragment_maps:vm,normal_pars_fragment:xm,normal_pars_vertex:ym,normal_vertex:_m,normalmap_pars_fragment:bm,clearcoat_normal_fragment_begin:Sm,clearcoat_normal_fragment_maps:Mm,clearcoat_pars_fragment:wm,iridescence_pars_fragment:Em,opaque_fragment:Tm,packing:Am,premultiplied_alpha_fragment:Rm,project_vertex:Cm,dithering_fragment:Pm,dithering_pars_fragment:Im,roughnessmap_fragment:Dm,roughnessmap_pars_fragment:Lm,shadowmap_pars_fragment:Nm,shadowmap_pars_vertex:Um,shadowmap_vertex:Fm,shadowmask_pars_fragment:Om,skinbase_vertex:Bm,skinning_pars_vertex:km,skinning_vertex:zm,skinnormal_vertex:Hm,specularmap_fragment:Gm,specularmap_pars_fragment:Vm,tonemapping_fragment:Wm,tonemapping_pars_fragment:Xm,transmission_fragment:qm,transmission_pars_fragment:Ym,uv_pars_fragment:$m,uv_pars_vertex:Zm,uv_vertex:Jm,worldpos_vertex:Km,background_vert:Qm,background_frag:jm,backgroundCube_vert:tg,backgroundCube_frag:eg,cube_vert:ig,cube_frag:ng,depth_vert:sg,depth_frag:rg,distance_vert:ag,distance_frag:og,equirect_vert:lg,equirect_frag:cg,linedashed_vert:hg,linedashed_frag:ug,meshbasic_vert:dg,meshbasic_frag:fg,meshlambert_vert:pg,meshlambert_frag:mg,meshmatcap_vert:gg,meshmatcap_frag:vg,meshnormal_vert:xg,meshnormal_frag:yg,meshphong_vert:_g,meshphong_frag:bg,meshphysical_vert:Sg,meshphysical_frag:Mg,meshtoon_vert:wg,meshtoon_frag:Eg,points_vert:Tg,points_frag:Ag,shadow_vert:Rg,shadow_frag:Cg,sprite_vert:Pg,sprite_frag:Ig},mt={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},Ni={basic:{uniforms:Fe([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:Fe([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Nt(0)},envMapIntensity:{value:1}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:Fe([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:Fe([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:Fe([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:Fe([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:Fe([mt.points,mt.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:Fe([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:Fe([mt.common,mt.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:Fe([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:Fe([mt.sprite,mt.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distance:{uniforms:Fe([mt.common,mt.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distance_vert,fragmentShader:Vt.distance_frag},shadow:{uniforms:Fe([mt.lights,mt.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};Ni.physical={uniforms:Fe([Ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ut},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};var No={r:0,b:0,g:0},Dg=new Zt,Yu=new Ut;Yu.set(-1,0,0,0,1,0,0,0,1);function Lg(s,t,e,i,n,r){let a=new Nt(0),o=n===!0?0:1,l,c,h=null,d=0,u=null;function f(S){let E=S.isScene===!0?S.background:null;if(E&&E.isTexture){let b=S.backgroundBlurriness>0;E=t.get(E,b)}return E}function g(S){let E=!1,b=f(S);b===null?m(a,o):b&&b.isColor&&(m(b,1),E=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(S,E){let b=f(E);b&&b.isCubeTexture?(c===void 0&&(c=new wt(new fe(1,1,1),new Pi({name:"BackgroundCubeMaterial",uniforms:Pn(Ni.backgroundCube.uniforms),vertexShader:Ni.backgroundCube.vertexShader,fragmentShader:Ni.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,v){this.matrixWorld.copyPosition(v.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Dg.makeRotationFromEuler(E.backgroundRotation)).transpose(),b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Yu),c.material.toneMapped=$t.getTransfer(b.colorSpace)!==jt,(h!==b||d!==b.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=b,d=b.version,u=s.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new wt(new Ci(2,2),new Pi({name:"BackgroundMaterial",uniforms:Pn(Ni.background.uniforms),vertexShader:Ni.background.vertexShader,fragmentShader:Ni.background.fragmentShader,side:Ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=$t.getTransfer(b.colorSpace)!==jt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||d!==b.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=b,d=b.version,u=s.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,E){S.getRGB(No,hc(s)),e.buffers.color.setClear(No.r,No.g,No.b,E,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,E=1){a.set(S),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:y,dispose:p}}function Ng(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=u(null),r=n,a=!1;function o(N,F,z,D,V){let q=!1,G=d(N,D,z,F);r!==G&&(r=G,c(r.object)),q=f(N,D,z,V),q&&g(N,D,z,V),V!==null&&t.update(V,s.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,b(N,F,z,D),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return s.createVertexArray()}function c(N){return s.bindVertexArray(N)}function h(N){return s.deleteVertexArray(N)}function d(N,F,z,D){let V=D.wireframe===!0,q=i[F.id];q===void 0&&(q={},i[F.id]=q);let G=N.isInstancedMesh===!0?N.id:0,et=q[G];et===void 0&&(et={},q[G]=et);let X=et[z.id];X===void 0&&(X={},et[z.id]=X);let Q=X[V];return Q===void 0&&(Q=u(l()),X[V]=Q),Q}function u(N){let F=[],z=[],D=[];for(let V=0;V<e;V++)F[V]=0,z[V]=0,D[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:z,attributeDivisors:D,object:N,attributes:{},index:null}}function f(N,F,z,D){let V=r.attributes,q=F.attributes,G=0,et=z.getAttributes();for(let X in et)if(et[X].location>=0){let j=V[X],Et=q[X];if(Et===void 0&&(X==="instanceMatrix"&&N.instanceMatrix&&(Et=N.instanceMatrix),X==="instanceColor"&&N.instanceColor&&(Et=N.instanceColor)),j===void 0||j.attribute!==Et||Et&&j.data!==Et.data)return!0;G++}return r.attributesNum!==G||r.index!==D}function g(N,F,z,D){let V={},q=F.attributes,G=0,et=z.getAttributes();for(let X in et)if(et[X].location>=0){let j=q[X];j===void 0&&(X==="instanceMatrix"&&N.instanceMatrix&&(j=N.instanceMatrix),X==="instanceColor"&&N.instanceColor&&(j=N.instanceColor));let Et={};Et.attribute=j,j&&j.data&&(Et.data=j.data),V[X]=Et,G++}r.attributes=V,r.attributesNum=G,r.index=D}function y(){let N=r.newAttributes;for(let F=0,z=N.length;F<z;F++)N[F]=0}function m(N){p(N,0)}function p(N,F){let z=r.newAttributes,D=r.enabledAttributes,V=r.attributeDivisors;z[N]=1,D[N]===0&&(s.enableVertexAttribArray(N),D[N]=1),V[N]!==F&&(s.vertexAttribDivisor(N,F),V[N]=F)}function S(){let N=r.newAttributes,F=r.enabledAttributes;for(let z=0,D=F.length;z<D;z++)F[z]!==N[z]&&(s.disableVertexAttribArray(z),F[z]=0)}function E(N,F,z,D,V,q,G){G===!0?s.vertexAttribIPointer(N,F,z,V,q):s.vertexAttribPointer(N,F,z,D,V,q)}function b(N,F,z,D){y();let V=D.attributes,q=z.getAttributes(),G=F.defaultAttributeValues;for(let et in q){let X=q[et];if(X.location>=0){let Q=V[et];if(Q===void 0&&(et==="instanceMatrix"&&N.instanceMatrix&&(Q=N.instanceMatrix),et==="instanceColor"&&N.instanceColor&&(Q=N.instanceColor)),Q!==void 0){let j=Q.normalized,Et=Q.itemSize,Bt=t.get(Q);if(Bt===void 0)continue;let Z=Bt.buffer,gt=Bt.type,bt=Bt.bytesPerElement,Pt=gt===s.INT||gt===s.UNSIGNED_INT||Q.gpuType===$a;if(Q.isInterleavedBufferAttribute){let vt=Q.data,zt=vt.isInterleavedBuffer===!0?vt.stride:vt.itemSize,pe=Q.offset;if(vt.isInstancedInterleavedBuffer||vt.isInstancedBufferAttribute){for(let Dt=0;Dt<X.locationSize;Dt++)p(X.location+Dt,vt.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let Dt=0;Dt<X.locationSize;Dt++)m(X.location+Dt);s.bindBuffer(s.ARRAY_BUFFER,Z);for(let Dt=0;Dt<X.locationSize;Dt++)E(X.location+Dt,Et/X.locationSize,gt,j,zt*bt,(pe+Et/X.locationSize*Dt)*bt,Pt)}else{if(Q.isInstancedBufferAttribute){for(let vt=0;vt<X.locationSize;vt++)p(X.location+vt,Q.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let vt=0;vt<X.locationSize;vt++)m(X.location+vt);s.bindBuffer(s.ARRAY_BUFFER,Z);for(let vt=0;vt<X.locationSize;vt++)E(X.location+vt,Et/X.locationSize,gt,j,Et*bt,Et/X.locationSize*vt*bt,Pt)}}else if(G!==void 0){let j=G[et];if(j!==void 0)switch(j.length){case 2:s.vertexAttrib2fv(X.location,j);break;case 3:s.vertexAttrib3fv(X.location,j);break;case 4:s.vertexAttrib4fv(X.location,j);break;default:s.vertexAttrib1fv(X.location,j)}}}}S()}function A(){I();for(let N in i){let F=i[N];for(let z in F){let D=F[z];for(let V in D){let q=D[V];for(let G in q)h(q[G].object),delete q[G];delete D[V]}}delete i[N]}}function T(N){if(i[N.id]===void 0)return;let F=i[N.id];for(let z in F){let D=F[z];for(let V in D){let q=D[V];for(let G in q)h(q[G].object),delete q[G];delete D[V]}}delete i[N.id]}function v(N){for(let F in i){let z=i[F];for(let D in z){let V=z[D];if(V[N.id]===void 0)continue;let q=V[N.id];for(let G in q)h(q[G].object),delete q[G];delete V[N.id]}}}function M(N){for(let F in i){let z=i[F],D=N.isInstancedMesh===!0?N.id:0,V=z[D];if(V!==void 0){for(let q in V){let G=V[q];for(let et in G)h(G[et].object),delete G[et];delete V[q]}delete z[D],Object.keys(z).length===0&&delete i[F]}}}function I(){C(),a=!0,r!==n&&(r=n,c(r.object))}function C(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:I,resetDefaultState:C,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:M,releaseStatesOfProgram:v,initAttributes:y,enableAttribute:m,disableUnusedAttributes:S}}function Ug(s,t,e){let i;function n(l){i=l}function r(l,c){s.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,i,1)}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Fg(s,t,e,i){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let v=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(v.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(v){return!(v!==vi&&i.convert(v)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(v){let M=v===gi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(v!==$e&&v!==ci&&!M&&i.convert(v)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(v){if(v==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";v="mediump"}return v==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Ct("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&d===!1;e.reversedDepthBuffer===!0&&d===!1&&Ct("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&d===!0&&Ct("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),S=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:b,maxSamples:A,samples:T}}function Og(s){let t=this,e=null,i=0,n=!1,r=!1,a=new Ke,o=new Ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||i!==0||n;return n=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!n||g===null||g.length===0||r&&!m)r?h(null):c();else{let S=r?0:i,E=S*4,b=p.clippingState||null;l.value=b,b=h(g,u,E,f);for(let A=0;A!==E;++A)b[A]=e[A];p.clippingState=b,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,g){let y=d!==null?d.length:0,m=null;if(y!==0){if(m=l.value,g!==!0||m===null){let p=f+y*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,b=f;E!==y;++E,b+=4)a.copy(d[E]).applyMatrix4(S,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}var xr=class extends Qe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new qs(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new fe(5,5,5),r=new Pi({name:"CubemapFromEquirect",uniforms:Pn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:We,blending:Tn});r.uniforms.tEquirect.value=e;let a=new wt(n,r),o=e.minFilter;return e.minFilter===Ji&&(e.minFilter=He),new cs(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(r)}},Eu=256,Bg=3,kg=20,$u=256,Zu=16,zg=3,Hg=new R,Gg=new Nt,Fo=class s{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new cs(1,10,null),this._boxMesh=new wt(new fe(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,i=.1,n=100,r={}){let{size:a=256,position:o=Hg}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let d=l.autoClear,u=l.autoClearColor,f=l.autoClearDepth,g=l.autoClearStencil,y=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,y===null&&(t.background=l.getClearColor(Gg));let m=new cs(i,n,h);return m.position.copy(o),m.update(l,t),l.autoClear=d,l.autoClearColor=u,l.autoClearDepth=f,l.autoClearStencil=g,t.background=y,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ru(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Au(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Eu,ac(t))}_fromTexture(t,e){t.mapping===Rn||t.mapping===us?this._setSize(t.image.length===0?Eu:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let i=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(i),i}_allocateTarget(){let t=this._cubeSize,e=Tu(t,!1,!1),i=Math.log2(t)-Bg;for(let n=0;n<=i;n++)e.texture.mipmaps.push({width:t>>n,height:t>>n});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==e||t&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Tu(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,i){let n=this._boxMesh,r=this._cubeCamera;n.material=i,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,n),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Rn||t.mapping===us?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ru()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Au()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Vg(),this._integrationMaterial=Wg());let e=this._cubeSize,i=t.texture.mipmaps.length-1,n=this._ggxMaterial.uniforms;n.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Zu);for(let a=0;a<=i;a++){let o=s.lodToRoughness(a,i);if(a>i-zg)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/($u*Math.pow(o,4)))+.5:0;n.roughness.value=o,n.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Xg());let i=this._blurMaterial,n=i.uniforms,r=this._sourceTarget;n.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,n.envMap.value=r.texture,this._renderCube(t,0,i),n.envMap.value=t.texture,this._renderCube(r,0,i)}};function Tu(s,t,e){return new xr(s,{minFilter:Ji,generateMipmaps:t,type:gi,colorSpace:Ds,depthBuffer:e})}function yr(s,t,e){return new Pi({name:s,uniforms:t,vertexShader:Vt.cube_vert,fragmentShader:e,side:We,blending:Tn,depthTest:!1,depthWrite:!1})}function Vg(){return yr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${$u}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Wg(){return yr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Zu}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Xg(){return yr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${kg}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Au(){return yr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Ru(){return yr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function qg(s){let t=new WeakMap,e=new WeakMap,i=null;function n(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===Xa||f===qa)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let y=new xr(g.height);return y.fromEquirectangularTexture(s,u),t.set(u,y),u.addEventListener("dispose",c),o(y.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let f=u.mapping,g=f===Xa||f===qa,y=f===Rn||f===us;if(g||y){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new Fo(s)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let S=u.image;return g&&S&&S.height>0||y&&S&&l(S)?(i===null&&(i=new Fo(s)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===Xa?u.mapping=Rn:f===qa&&(u.mapping=us),u}function l(u){let f=0,g=6;for(let y=0;y<g;y++)u[y]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:d}}function Yg(s){let t={};function e(i){if(t[i]!==void 0)return t[i];let n=s.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let n=e(i);return n===null&&As("WebGLRenderer: "+i+" extension not supported."),n}}}function $g(s,t,e,i){let n={},r=new WeakMap,a=new FinalizationRegistry(g=>delete n[g]);function o(g){l(g.target)}function l(g){g.index!==null&&t.remove(g.index);for(let m in g.attributes)t.remove(g.attributes[m]);g.removeEventListener("dispose",o),delete n[g.id],a.unregister(g);let y=r.get(g);y&&(t.remove(y),r.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,e.memory.geometries--}function c(g,y){return n[y.id]!==void 0||(y.addEventListener("dispose",o),n[y.id]=new WeakRef(y),a.register(y,y.id,y),e.memory.geometries++),y}function h(g){let y=g.attributes;for(let m in y)t.update(y[m],s.ARRAY_BUFFER)}function d(g){let y=g.index,m=g.attributes.position,p=0;if(m===void 0)return;let S=y!==null?y.array.length:m.array.length/3-1,E=m.count>=65535?zs:ks,b=new E(Math.ceil(S/3)*6,1),A=b.array;if(y!==null){let v=y.array;p=y.version;for(let M=0,I=0;M<S;M+=3){let C=v[M+0],N=v[M+1],F=v[M+2];A[I++]=C,A[I++]=N,A[I++]=N,A[I++]=F,A[I++]=F,A[I++]=C}}else{p=m.version;for(let v=0,M=0;v<S;v+=3){let I=v+0,C=v+1,N=v+2;A[M++]=I,A[M++]=C,A[M++]=C,A[M++]=N,A[M++]=N,A[M++]=I}}b.version=p;let T=r.get(g);T&&t.remove(T),r.set(g,b)}function u(g){let y=r.get(g);if(y){let m=g.index;m!==null&&y.version<m.version&&d(g)}else d(g);return r.get(g)}function f(){for(let g in n){let y=n[g].deref();y!==void 0&&l(y)}}return{get:c,update:h,getWireframeAttribute:u,dispose:f}}function Zg(s,t,e){let i;function n(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){s.drawElements(i,u,r,d*a),e.update(u,i,1)}function c(d,u,f){f!==0&&(s.drawElementsInstanced(i,u,r,d*a,f),e.update(u,i,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,d,0,f);let y=0;for(let m=0;m<f;m++)y+=u[m];e.update(y,i,1)}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Jg(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:Lt("WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function Kg(s,t,e){let i=new WeakMap,n=new le;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==d){let I=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",I)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],E=0;f===!0&&(E=1),g===!0&&(E=2),y===!0&&(E=3);let b=o.attributes.position.count*E,A=1;b>t.maxTextureSize&&(A=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let T=new Float32Array(b*A*4*d),v=new Fs(T,b,A,d);v.type=ci,v.needsUpdate=!0;let M=E*4;for(let C=0;C<d;C++){let N=m[C],F=p[C],z=S[C],D=b*A*4*C;for(let V=0;V<N.count;V++){let q=V*M;f===!0&&(n.fromBufferAttribute(N,V),T[D+q+0]=n.x,T[D+q+1]=n.y,T[D+q+2]=n.z,T[D+q+3]=0),g===!0&&(n.fromBufferAttribute(F,V),T[D+q+4]=n.x,T[D+q+5]=n.y,T[D+q+6]=n.z,T[D+q+7]=0),y===!0&&(n.fromBufferAttribute(z,V),T[D+q+8]=n.x,T[D+q+9]=n.y,T[D+q+10]=n.z,T[D+q+11]=z.itemSize===4?n.w:1)}}u={count:d,texture:v,size:new _t(b,A)},i.set(o,u),o.addEventListener("dispose",I)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Qg(s,t,e,i,n){let r=new WeakMap;function a(c){let h=n.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var jg={[Hl]:"LINEAR_TONE_MAPPING",[Gl]:"REINHARD_TONE_MAPPING",[Vl]:"CINEON_TONE_MAPPING",[lr]:"ACES_FILMIC_TONE_MAPPING",[Xl]:"AGX_TONE_MAPPING",[ql]:"NEUTRAL_TONE_MAPPING",[Wl]:"CUSTOM_TONE_MAPPING"};function t0(s,t,e,i,n,r){let a=new Qe(t,e,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new de;h.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Jt([0,2,0,0,2,0],2));let d=new Pa({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new wt(h,d),f=new sr(-1,1,1,-1,0,1),g=null,y=null,m=!1,p,S=null,E=[],b=!1;this.setSize=function(A,T){a.setSize(A,T),o!==null&&o.setSize(A,T),l!==null&&l.setSize(A,T);for(let v=0;v<E.length;v++){let M=E[v];M.setSize&&M.setSize(A,T)}},this.setEffects=function(A){E=A,b=E.length>0&&E[0].isRenderPass===!0;let T=a.width,v=a.height;E.length>0&&o===null&&(o=new Qe(T,v,{type:gi,depthBuffer:!1,stencilBuffer:!1}),l=new Qe(T,v,{type:gi,depthBuffer:!1,stencilBuffer:!1}));let M=n===!0&&E.some(I=>I.needsDepthTexture===!0);M!==(a.depthTexture!==null)&&(M===!0&&c===null&&(c=new Xi(T,v),r===!0&&(c.format=Ki,c.type=Cn)),a.dispose(),a.depthTexture=M?c:null,a.resolveDepthBuffer=M,a.storeMultisampledDepthBuffer=M);for(let I=0;I<E.length;I++){let C=E[I];C.setSize&&C.setSize(T,v),M&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(c)}},this.begin=function(A,T){if(m||A.toneMapping===Di&&E.length===0)return!1;if(S=T,T!==null){let v=T.width,M=T.height;(a.width!==v||a.height!==M)&&this.setSize(v,M)}return b===!1&&A.setRenderTarget(a),p=A.toneMapping,A.toneMapping=Di,!0},this.hasRenderPass=function(){return b},this.end=function(A,T){A.toneMapping=p,m=!0;let v=a,M=o;for(let I=0;I<E.length;I++){let C=E[I];C.enabled!==!1&&(C.render(A,M,v,T),C.needsSwap!==!1&&(v=M,M=M===o?l:o))}if(g!==A.outputColorSpace||y!==A.toneMapping){g=A.outputColorSpace,y=A.toneMapping,d.defines={},$t.getTransfer(g)===jt&&(d.defines.SRGB_TRANSFER="");let I=jg[y];I&&(d.defines[I]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=v.texture,A.setRenderTarget(S),A.render(u,f),S=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),d.dispose()}}var Ju=new Ge,Ku=new Xi(1,1),Qu=new Ys(1),ju=new Fs,td=new va,ed=new qs,Cu=[],Pu=[],Iu=new Float32Array(16),Du=new Float32Array(9),Lu=new Float32Array(4);function ps(s,t,e){let i=s[0];if(i<=0||i>0)return s;let n=t*e,r=Cu[n];if(r===void 0&&(r=new Float32Array(n),Cu[n]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function be(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function Se(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function Bo(s,t){let e=Pu[t];e===void 0&&(e=new Int32Array(t),Pu[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function e0(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function i0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;s.uniform2fv(this.addr,t),Se(e,t)}}function n0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;s.uniform3fv(this.addr,t),Se(e,t)}}function s0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;s.uniform4fv(this.addr,t),Se(e,t)}}function r0(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(be(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(be(e,i))return;Lu.set(i),s.uniformMatrix2fv(this.addr,!1,Lu),Se(e,i)}}function a0(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(be(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(be(e,i))return;Du.set(i),s.uniformMatrix3fv(this.addr,!1,Du),Se(e,i)}}function o0(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(be(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(be(e,i))return;Iu.set(i),s.uniformMatrix4fv(this.addr,!1,Iu),Se(e,i)}}function l0(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function c0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;s.uniform2iv(this.addr,t),Se(e,t)}}function h0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;s.uniform3iv(this.addr,t),Se(e,t)}}function u0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;s.uniform4iv(this.addr,t),Se(e,t)}}function d0(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function f0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;s.uniform2uiv(this.addr,t),Se(e,t)}}function p0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;s.uniform3uiv(this.addr,t),Se(e,t)}}function m0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;s.uniform4uiv(this.addr,t),Se(e,t)}}function ko(s){return s.version===0&&(s.compareFunction=ic,s.needsUpdate=!0),s}function g0(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?r=ko(Ku):r=Ju,e.setTexture2D(t||r,n)}function v0(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||td,n)}function x0(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=ko(Qu):r=ed,e.setTextureCube(t||r,n)}function y0(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||ju,n)}function _0(s){switch(s){case 5126:return e0;case 35664:return i0;case 35665:return n0;case 35666:return s0;case 35674:return r0;case 35675:return a0;case 35676:return o0;case 5124:case 35670:return l0;case 35667:case 35671:return c0;case 35668:case 35672:return h0;case 35669:case 35673:return u0;case 5125:return d0;case 36294:return f0;case 36295:return p0;case 36296:return m0;case 35678:case 36198:case 36298:case 36306:case 35682:return g0;case 35679:case 36299:case 36307:return v0;case 35680:case 36300:case 36308:case 36293:return x0;case 36289:case 36303:case 36311:case 36292:return y0}}function b0(s,t){s.uniform1fv(this.addr,t)}function S0(s,t){let e=ps(t,this.size,2);s.uniform2fv(this.addr,e)}function M0(s,t){let e=ps(t,this.size,3);s.uniform3fv(this.addr,e)}function w0(s,t){let e=ps(t,this.size,4);s.uniform4fv(this.addr,e)}function E0(s,t){let e=ps(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function T0(s,t){let e=ps(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function A0(s,t){let e=ps(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function R0(s,t){s.uniform1iv(this.addr,t)}function C0(s,t){s.uniform2iv(this.addr,t)}function P0(s,t){s.uniform3iv(this.addr,t)}function I0(s,t){s.uniform4iv(this.addr,t)}function D0(s,t){s.uniform1uiv(this.addr,t)}function L0(s,t){s.uniform2uiv(this.addr,t)}function N0(s,t){s.uniform3uiv(this.addr,t)}function U0(s,t){s.uniform4uiv(this.addr,t)}function F0(s,t,e){let i=this.cache,n=t.length,r=Bo(e,n);be(i,r)||(s.uniform1iv(this.addr,r),Se(i,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=ko(Ku):a=Ju;for(let o=0;o!==n;++o)e.setTexture2D(t[o]||a,r[o])}function O0(s,t,e){let i=this.cache,n=t.length,r=Bo(e,n);be(i,r)||(s.uniform1iv(this.addr,r),Se(i,r));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||td,r[a])}function B0(s,t,e){let i=this.cache,n=t.length,r=Bo(e,n);be(i,r)||(s.uniform1iv(this.addr,r),Se(i,r));let a;this.type===s.SAMPLER_CUBE_SHADOW?a=ko(Qu):a=ed;for(let o=0;o!==n;++o)e.setTextureCube(t[o]||a,r[o])}function k0(s,t,e){let i=this.cache,n=t.length,r=Bo(e,n);be(i,r)||(s.uniform1iv(this.addr,r),Se(i,r));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||ju,r[a])}function z0(s){switch(s){case 5126:return b0;case 35664:return S0;case 35665:return M0;case 35666:return w0;case 35674:return E0;case 35675:return T0;case 35676:return A0;case 5124:case 35670:return R0;case 35667:case 35671:return C0;case 35668:case 35672:return P0;case 35669:case 35673:return I0;case 5125:return D0;case 36294:return L0;case 36295:return N0;case 36296:return U0;case 35678:case 36198:case 36298:case 36306:case 35682:return F0;case 35679:case 36299:case 36307:return O0;case 35680:case 36300:case 36308:case 36293:return B0;case 36289:case 36303:case 36311:case 36292:return k0}}var bc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=_0(e.type)}},Sc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=z0(e.type)}},Mc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let n=this.seq;for(let r=0,a=n.length;r!==a;++r){let o=n[r];o.setValue(t,e[o.id],i)}}},yc=/(\w+)(\])?(\[|\.)?/g;function Nu(s,t){s.seq.push(t),s.map[t.id]=t}function H0(s,t,e){let i=s.name,n=i.length;for(yc.lastIndex=0;;){let r=yc.exec(i),a=yc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){Nu(e,c===void 0?new bc(o,s,t):new Sc(o,s,t));break}else{let d=e.map[o];d===void 0&&(d=new Mc(o),Nu(e,d)),e=d}}}var fs=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);H0(o,l,this)}let n=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?n.push(a):r.push(a);n.length>0&&(this.seq=n.concat(r))}setValue(t,e,i,n){let r=this.map[e];r!==void 0&&r.setValue(t,i,n)}setOptional(t,e,i){let n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,n)}}static seqWithValue(t,e){let i=[];for(let n=0,r=t.length;n!==r;++n){let a=t[n];a.id in e&&i.push(a)}return i}};function Uu(s,t,e){let i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}var G0=37297,V0=0;function W0(s,t){let e=s.split(`
`),i=[],n=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=n;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var Fu=new Ut;function X0(s){$t._getMatrix(Fu,$t.workingColorSpace,s);let t=`mat3( ${Fu.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(s)){case Ls:return[t,"LinearTransferOETF"];case jt:return[t,"sRGBTransferOETF"];default:return Ct("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Ou(s,t,e){let i=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+W0(s.getShaderSource(t),o)}else return r}function q0(s,t){let e=X0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Y0={[Hl]:"Linear",[Gl]:"Reinhard",[Vl]:"Cineon",[lr]:"ACESFilmic",[Xl]:"AgX",[ql]:"Neutral",[Wl]:"Custom"};function $0(s,t){let e=Y0[t];return e===void 0?(Ct("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Uo=new R;function Z0(){$t.getLuminanceCoefficients(Uo);let s=Uo.x.toFixed(4),t=Uo.y.toFixed(4),e=Uo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function J0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vr).join(`
`)}function K0(s){let t=[];for(let e in s){let i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Q0(s,t){let e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let r=s.getActiveAttrib(t,n),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function vr(s){return s!==""}function Bu(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function ku(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var j0=/^[ \t]*#include +<([\w\d./]+)>/gm;function wc(s){return s.replace(j0,tv)}function tv(s,t){let e=Vt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return wc(e)}var ev=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zu(s){return s.replace(ev,iv)}function iv(s,t,e,i){let n="";for(let r=parseInt(t);r<parseInt(e);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function Hu(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var nv={[En]:"SHADOWMAP_TYPE_PCF",[hs]:"SHADOWMAP_TYPE_VSM"};function sv(s){return nv[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var rv={[us]:"ENVMAP_MODE_REFRACTION"};function av(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":rv[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var ov={[zl]:"ENVMAP_BLENDING_MULTIPLY",[ru]:"ENVMAP_BLENDING_MIX",[au]:"ENVMAP_BLENDING_ADD"};function lv(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":ov[s.combine]||"ENVMAP_BLENDING_NONE"}function cv(s,t,e,i){let n=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=sv(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=av(e),d=lv(e),u=J0(e),f=K0(r),g=n.createProgram(),y,m,p=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(y=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(vr).join(`
`),y.length>0&&(y+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(vr).join(`
`),m.length>0&&(m+=`
`)):(y=[Hu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vr).join(`
`),m=[Hu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Di?"#define TONE_MAPPING":"",e.toneMapping!==Di?Vt.tonemapping_pars_fragment:"",e.toneMapping!==Di?$0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,q0("linearToOutputTexel",e.outputColorSpace),Z0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(vr).join(`
`)),a=wc(a),a=Bu(a,e),a=ku(a,e),o=wc(o),o=Bu(o,e),o=ku(o,e),a=zu(a),o=zu(o),e.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,y=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,m=["#define varying in",e.glslVersion===sc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let S=p+y+a,E=p+m+o,b=Uu(n,n.VERTEX_SHADER,S),A=Uu(n,n.FRAGMENT_SHADER,E);n.attachShader(g,b),n.attachShader(g,A),e.index0AttributeName!==void 0?n.bindAttribLocation(g,0,e.index0AttributeName):e.hasPositionAttribute===!0&&n.bindAttribLocation(g,0,"position"),n.linkProgram(g);function T(C){if(s.debug.checkShaderErrors){let N=n.getProgramInfoLog(g)||"",F=n.getShaderInfoLog(b)||"",z=n.getShaderInfoLog(A)||"",D=N.trim(),V=F.trim(),q=z.trim(),G=!0,et=!0;if(n.getProgramParameter(g,n.LINK_STATUS)===!1)if(G=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,g,b,A);else{let X=Ou(n,b,"vertex"),Q=Ou(n,A,"fragment");Lt("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(g,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+D+`
`+X+`
`+Q)}else D!==""?Ct("WebGLProgram: Program Info Log:",D):(V===""||q==="")&&(et=!1);et&&(C.diagnostics={runnable:G,programLog:D,vertexShader:{log:V,prefix:y},fragmentShader:{log:q,prefix:m}})}n.deleteShader(b),n.deleteShader(A),v=new fs(n,g),M=Q0(n,g)}let v;this.getUniforms=function(){return v===void 0&&T(this),v};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=n.getProgramParameter(g,G0)),I},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=V0++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=b,this.fragmentShader=A,this}var hv=0,Ec=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let n=this._getShaderCacheForMaterial(t);return n.has(e)===!1&&(n.add(e),e.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Tc(t),e.set(t,i)),i}},Tc=class{constructor(t){this.id=hv++,this.code=t,this.usedTimes=0}};function uv(s){return s===dn||s===pr||s===mr}function dv(s,t,e,i,n,r){let a=new es,o=new Ec,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(v){return l.add(v),v===0?"uv":`uv${v}`}function g(v,M,I,C,N,F){let z=C.fog,D=N.geometry,V=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?C.environment:null,q=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,G=t.get(v.envMap||V,q),et=u[v.type],X=i.precision;v.precision!==null&&(X=i.getMaxPrecision(v.precision),X!==v.precision&&Ct("WebGLProgram.getParameters:",v.precision,"not supported, using",X,"instead."));let Q=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,j=Q!==void 0?Q.length:0,Et=0;D.morphAttributes.position!==void 0&&(Et=1),D.morphAttributes.normal!==void 0&&(Et=2),D.morphAttributes.color!==void 0&&(Et=3);let Bt,Z,gt,bt;if(et){let pt=Ni[et];Bt=pt.vertexShader,Z=pt.fragmentShader}else{Bt=v.vertexShader,Z=v.fragmentShader;let pt=o.getVertexShaderStage(v),ee=o.getFragmentShaderStage(v);o.update(v,pt,ee),gt=pt.id,bt=ee.id}let Pt=s.getRenderTarget(),vt=s.state.buffers.depth.getReversed(),zt=N.isInstancedMesh===!0,pe=N.isBatchedMesh===!0,Dt=!!v.map,te=!!v.matcap,ie=!!G,Xt=ie&&G.isPMREMTexture===!0,Ce=!!v.aoMap,ye=!!v.lightMap,Ye=!!v.bumpMap&&v.wireframe===!1,ce=!!v.normalMap,_i=!!v.displacementMap,Me=!!v.emissiveMap,ti=!!v.metalnessMap,ei=!!v.roughnessMap,ii=v.anisotropy>0,U=v.clearcoat>0,ni=v.diffuseRoughness>0,ae=v.dispersion>0,oe=v.retroreflectivity>0,dt=v.iridescence>0,_e=v.sheen>0,It=v.transmission>0,Ft=ii&&!!v.anisotropyMap,w=U&&!!v.clearcoatMap,x=U&&!!v.clearcoatNormalMap,B=U&&!!v.clearcoatRoughnessMap,tt=ni&&!!v.diffuseRoughnessMap,K=dt&&!!v.iridescenceMap,st=dt&&!!v.iridescenceThicknessMap,ht=_e&&!!v.sheenColorMap,Y=_e&&!!v.sheenRoughnessMap,$=!!v.specularMap,at=!!v.specularColorMap,P=!!v.specularIntensityMap,J=It&&!!v.transmissionMap,W=It&&!!v.thicknessMap,ot=!!v.gradientMap,nt=!!v.alphaMap,rt=v.alphaTest>0,At=!!v.alphaHash,Gt=!!v.extensions,it=Di;v.toneMapped&&(Pt===null||Pt.isXRRenderTarget===!0)&&(it=s.toneMapping);let Rt=Xt?G.isCompressedCubeTexture?G.image[0].mipmaps:G.mipmaps:null,Ht={shaderID:et,shaderType:v.type,shaderName:v.name,vertexShader:Bt,fragmentShader:Z,defines:v.defines,customVertexShaderID:gt,customFragmentShaderID:bt,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:X,batching:pe,batchingColor:pe&&N._colorsTexture!==null,instancing:zt,instancingColor:zt&&N.instanceColor!==null,instancingMorph:zt&&N.morphTexture!==null,outputColorSpace:Pt===null?s.outputColorSpace:Pt.isXRRenderTarget===!0?Pt.texture.colorSpace:$t.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Dt,matcap:te,envMap:ie,envMapMode:ie&&G.mapping,envMapPMREM:Xt,envMapMaxLod:Xt?Rt.length-1:null,envMapSize:Xt?Rt[0].width:null,aoMap:Ce,lightMap:ye,bumpMap:Ye,normalMap:ce,displacementMap:_i,emissiveMap:Me,normalMapObjectSpace:ce&&v.normalMapType===cu,normalMapTangentSpace:ce&&v.normalMapType===Do,packedNormalMap:ce&&v.normalMapType===Do&&uv(v.normalMap.format),metalnessMap:ti,roughnessMap:ei,anisotropy:ii,anisotropyMap:Ft,clearcoat:U,clearcoatMap:w,clearcoatNormalMap:x,clearcoatRoughnessMap:B,diffuseRoughness:ni,diffuseRoughnessMap:tt,dispersion:ae,retroreflection:oe,iridescence:dt,iridescenceMap:K,iridescenceThicknessMap:st,sheen:_e,sheenColorMap:ht,sheenRoughnessMap:Y,specularMap:$,specularColorMap:at,specularIntensityMap:P,transmission:It,transmissionMap:J,thicknessMap:W,gradientMap:ot,opaque:v.transparent===!1&&v.blending===Zi&&v.alphaToCoverage===!1,alphaMap:nt,alphaTest:rt,alphaHash:At,combine:v.combine,mapUv:Dt&&f(v.map.channel),aoMapUv:Ce&&f(v.aoMap.channel),lightMapUv:ye&&f(v.lightMap.channel),bumpMapUv:Ye&&f(v.bumpMap.channel),normalMapUv:ce&&f(v.normalMap.channel),displacementMapUv:_i&&f(v.displacementMap.channel),emissiveMapUv:Me&&f(v.emissiveMap.channel),metalnessMapUv:ti&&f(v.metalnessMap.channel),roughnessMapUv:ei&&f(v.roughnessMap.channel),anisotropyMapUv:Ft&&f(v.anisotropyMap.channel),clearcoatMapUv:w&&f(v.clearcoatMap.channel),clearcoatNormalMapUv:x&&f(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:B&&f(v.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:tt&&f(v.diffuseRoughnessMap.channel),iridescenceMapUv:K&&f(v.iridescenceMap.channel),iridescenceThicknessMapUv:st&&f(v.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&f(v.sheenColorMap.channel),sheenRoughnessMapUv:Y&&f(v.sheenRoughnessMap.channel),specularMapUv:$&&f(v.specularMap.channel),specularColorMapUv:at&&f(v.specularColorMap.channel),specularIntensityMapUv:P&&f(v.specularIntensityMap.channel),transmissionMapUv:J&&f(v.transmissionMap.channel),thicknessMapUv:W&&f(v.thicknessMap.channel),alphaMapUv:nt&&f(v.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(ce||ii),vertexNormals:!!D.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!D.attributes.uv&&(Dt||nt),fog:!!z,useFog:v.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||D.attributes.normal===void 0&&ce===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:vt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:Et,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:F.filter(pt=>pt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:it,decodeVideoTexture:Dt&&v.map.isVideoTexture===!0&&$t.getTransfer(v.map.colorSpace)===jt,decodeVideoTextureEmissive:Me&&v.emissiveMap.isVideoTexture===!0&&$t.getTransfer(v.emissiveMap.colorSpace)===jt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Xe,flipSided:v.side===We,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Gt&&v.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&v.extensions.multiDraw===!0||pe)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ht.vertexUv1s=l.has(1),Ht.vertexUv2s=l.has(2),Ht.vertexUv3s=l.has(3),l.clear(),Ht}function y(v){let M=[];if(v.shaderID?M.push(v.shaderID):(M.push(v.customVertexShaderID),M.push(v.customFragmentShaderID)),v.defines!==void 0)for(let I in v.defines)M.push(I),M.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(m(M,v),p(M,v),M.push(s.outputColorSpace)),M.push(v.customProgramCacheKey),M.join()}function m(v,M){v.push(M.precision),v.push(M.outputColorSpace),v.push(M.envMapMode),v.push(M.envMapPMREM),v.push(M.envMapMaxLod),v.push(M.envMapSize),v.push(M.mapUv),v.push(M.alphaMapUv),v.push(M.lightMapUv),v.push(M.aoMapUv),v.push(M.bumpMapUv),v.push(M.normalMapUv),v.push(M.displacementMapUv),v.push(M.emissiveMapUv),v.push(M.metalnessMapUv),v.push(M.roughnessMapUv),v.push(M.anisotropyMapUv),v.push(M.clearcoatMapUv),v.push(M.clearcoatNormalMapUv),v.push(M.clearcoatRoughnessMapUv),v.push(M.diffuseRoughnessMapUv),v.push(M.iridescenceMapUv),v.push(M.iridescenceThicknessMapUv),v.push(M.sheenColorMapUv),v.push(M.sheenRoughnessMapUv),v.push(M.specularMapUv),v.push(M.specularColorMapUv),v.push(M.specularIntensityMapUv),v.push(M.transmissionMapUv),v.push(M.thicknessMapUv),v.push(M.combine),v.push(M.fogExp2),v.push(M.sizeAttenuation),v.push(M.morphTargetsCount),v.push(M.numSunLights),v.push(M.numDirLights),v.push(M.numPointLights),v.push(M.numSpotLights),v.push(M.numSpotLightMaps),v.push(M.numHemiLights),v.push(M.numRectAreaLights),v.push(M.numSunLightShadows),v.push(M.numDirLightShadows),v.push(M.numPointLightShadows),v.push(M.numSpotLightShadows),v.push(M.numSpotLightShadowsWithMaps),v.push(M.numLightProbes),v.push(M.numLightProbeGrids),v.push(M.shadowMapType),v.push(M.toneMapping),v.push(M.numClippingPlanes),v.push(M.numClipIntersection),v.push(M.depthPacking)}function p(v,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.diffuseRoughness&&a.enable(25),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function S(v){let M=u[v.type],I;if(M){let C=Ni[M];I=Su.clone(C.uniforms)}else I=v.uniforms;return I}function E(v,M){let I=h.get(M);return I!==void 0?++I.usedTimes:(I=new cv(s,M,v,n),c.push(I),h.set(M,I)),I}function b(v){if(--v.usedTimes===0){let M=c.indexOf(v);c[M]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function A(v){o.remove(v)}function T(){o.dispose()}return{getParameters:g,getProgramCacheKey:y,getUniforms:S,acquireProgram:E,releaseProgram:b,releaseShaderCache:A,programs:c,dispose:T}}function fv(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:r}}function pv(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Gu(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Vu(){let s=[],t=0,e=[],i=[],n=[];function r(){t=0,e.length=0,i.length=0,n.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,y,m,p){let S=s[t];return S===void 0?(S={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:y,renderOrder:u.renderOrder,z:m,group:p},s[t]=S):(S.id=u.id,S.object=u,S.geometry=f,S.material=g,S.materialVariant=a(u),S.groupOrder=y,S.renderOrder=u.renderOrder,S.z=m,S.group=p),t++,S}function l(u,f,g,y,m,p,S){S.reversedDepth===!0&&(m=-m);let E=o(u,f,g,y,m,p);g.transmission>0?i.push(E):g.transparent===!0?n.push(E):e.push(E)}function c(u,f,g,y,m,p){let S=o(u,f,g,y,m,p);g.transmission>0?i.unshift(S):g.transparent===!0?n.unshift(S):e.unshift(S)}function h(u,f){e.length>1&&e.sort(u||pv),i.length>1&&i.sort(f||Gu),n.length>1&&n.sort(f||Gu)}function d(){for(let u=t,f=s.length;u<f;u++){let g=s[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:d,sort:h}}function mv(){let s=new WeakMap;function t(i,n){let r=s.get(i),a;return r===void 0?(a=new Vu,s.set(i,[a])):n>=r.length?(a=new Vu,r.push(a)):a=r[n],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function gv(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new R,color:new Nt};break;case"SpotLight":e={position:new R,direction:new R,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new R,halfWidth:new R,halfHeight:new R};break}return s[t.id]=e,e}}}function vv(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var xv=0;function yv(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function _v(s){let t=new gv,e=vv(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new R);let n=new R,r=new Zt,a=new Zt;function o(c){let h=0,d=0,u=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let f=0,g=0,y=0,m=0,p=0,S=0,E=0,b=0,A=0,T=0,v=0,M=0,I=0,C=0;c.sort(yv);for(let F=0,z=c.length;F<z;F++){let D=c[F],V=D.color,q=D.intensity,G=D.distance,et=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===dn?et=D.shadow.map.texture:et=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=V.r*q,d+=V.g*q,u+=V.b*q;else if(D.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(D.sh.coefficients[X],q);C++}else if(D.isSunLight){let X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let Q=D.shadow,j=e.get(D);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),i.sunShadow[g]=j,i.sunShadowMap[g]=et;let Et=Q.getViewportCount();for(let Bt=0;Bt<Et;Bt++)i.sunShadowMatrix[y+Bt]=Q.getMatrix(Bt),i.sunShadowCascade[y+Bt]=Q._cascadeData[Bt];y+=Et,g++}i.sun[f]=X,f++}else if(D.isDirectionalLight){let X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let Q=D.shadow,j=e.get(D);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,i.directionalShadow[m]=j,i.directionalShadowMap[m]=et,i.directionalShadowMatrix[m]=D.shadow.matrix,A++}i.directional[m]=X,m++}else if(D.isSpotLight){let X=t.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(V).multiplyScalar(q),X.distance=G,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,i.spot[S]=X;let Q=D.shadow;if(D.map&&(i.spotLightMap[M]=D.map,M++,Q.updateMatrices(D),D.castShadow&&I++),i.spotLightMatrix[S]=Q.matrix,D.castShadow){let j=e.get(D);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,i.spotShadow[S]=j,i.spotShadowMap[S]=et,v++}S++}else if(D.isRectAreaLight){let X=t.get(D);X.color.copy(V).multiplyScalar(q),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),i.rectArea[E]=X,E++}else if(D.isPointLight){let X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){let Q=D.shadow,j=e.get(D);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,j.shadowCameraNear=Q.camera.near,j.shadowCameraFar=Q.camera.far,i.pointShadow[p]=j,i.pointShadowMap[p]=et,i.pointShadowMatrix[p]=D.shadow.matrix,T++}i.point[p]=X,p++}else if(D.isHemisphereLight){let X=t.get(D);X.skyColor.copy(D.color).multiplyScalar(q),X.groundColor.copy(D.groundColor).multiplyScalar(q),i.hemi[b]=X,b++}}E>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=mt.LTC_FLOAT_1,i.rectAreaLTC2=mt.LTC_FLOAT_2):(i.rectAreaLTC1=mt.LTC_HALF_1,i.rectAreaLTC2=mt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let N=i.hash;(N.sunLength!==f||N.directionalLength!==m||N.pointLength!==p||N.spotLength!==S||N.rectAreaLength!==E||N.hemiLength!==b||N.numSunShadows!==g||N.numDirectionalShadows!==A||N.numPointShadows!==T||N.numSpotShadows!==v||N.numSpotMaps!==M||N.numLightProbes!==C)&&(i.sun.length=f,i.directional.length=m,i.spot.length=S,i.rectArea.length=E,i.point.length=p,i.hemi.length=b,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=y,i.sunShadowCascade.length=y,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.directionalShadowMatrix.length=A,i.pointShadow.length=T,i.pointShadowMap.length=T,i.pointShadowMatrix.length=T,i.spotShadow.length=v,i.spotShadowMap.length=v,i.spotLightMatrix.length=v+M-I,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=C,N.sunLength=f,N.directionalLength=m,N.pointLength=p,N.spotLength=S,N.rectAreaLength=E,N.hemiLength=b,N.numSunShadows=g,N.numDirectionalShadows=A,N.numPointShadows=T,N.numSpotShadows=v,N.numSpotMaps=M,N.numLightProbes=C,i.version=xv++)}function l(c,h){let d=0,u=0,f=0,g=0,y=0,m=0,p=h.matrixWorldInverse;for(let S=0,E=c.length;S<E;S++){let b=c[S];if(b.isSunLight){let A=i.sun[d];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(p),d++}else if(b.isDirectionalLight){let A=i.directional[u];A.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(n),A.direction.transformDirection(p),u++}else if(b.isSpotLight){let A=i.spot[g];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(n),A.direction.transformDirection(p),g++}else if(b.isRectAreaLight){let A=i.rectArea[y];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),a.identity(),r.copy(b.matrixWorld),r.premultiply(p),a.extractRotation(r),A.halfWidth.set(b.width*.5,0,0),A.halfHeight.set(0,b.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),y++}else if(b.isPointLight){let A=i.point[f];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){let A=i.hemi[m];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:i}}function Wu(s){let t=new _v(s),e=[],i=[],n=[];function r(d){h.camera=d,e.length=0,i.length=0,n.length=0}function a(d){d.isLightProbeGrid?n.push(d):e.push(d)}function o(d){i.push(d)}function l(){t.setup(e),n.sort((d,u)=>d.priority-u.priority||d.id-u.id)}function c(d){t.setupView(e,d)}let h={lightsArray:e,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function bv(s){let t=new WeakMap;function e(n,r=0){let a=t.get(n),o;return a===void 0?(o=new Wu(s),t.set(n,[o])):r>=a.length?(o=new Wu(s),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var Sv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,wv=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],Ev=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],Xu=new Zt,gr=new R,_c=new R;function Tv(s,t,e){let i=new on,n=new _t,r=new _t,a=new le,o=new Ia,l=new Da,c={},h=e.maxTextureSize,d={[Ii]:We,[We]:Ii,[Xe]:Xe},u=new Pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:Sv,fragmentShader:Mv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new de;g.setAttribute("position",new ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new wt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=En;let p=this.type;this.render=function(T,v,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===zh&&(Ct("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=En);let I=s.getRenderTarget(),C=s.getActiveCubeFace(),N=s.getActiveMipmapLevel(),F=s.state;F.setBlending(Tn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let z=p!==this.type;z&&v.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(V=>V.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,V=T.length;D<V;D++){let q=T[D],G=q.shadow;if(G===void 0){Ct("WebGLShadowMap:",q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;n.copy(G.mapSize);let et=G.getFrameExtents();n.multiply(et),r.copy(G.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/et.x),n.x=r.x*et.x,G.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/et.y),n.y=r.y*et.y,G.mapSize.y=r.y));let X=s.state.buffers.depth.getReversed();if(G.camera._reversedDepth=X,G.map===null||z===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===hs){if(q.isPointLight){Ct("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Qe(n.x,n.y,{format:dn,type:gi,minFilter:He,magFilter:He,generateMipmaps:!1}),G.map.texture.name=q.name+".shadowMap",G.map.depthTexture=new Xi(n.x,n.y,ci),G.map.depthTexture.name=q.name+".shadowMapDepth",G.map.depthTexture.format=Gi,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Ae,G.map.depthTexture.magFilter=Ae}else q.isPointLight?(G.map=new xr(n.x),G.map.depthTexture=new Ys(n.x,mi)):(G.map=new Qe(n.x,n.y),G.map.depthTexture=new Xi(n.x,n.y,mi)),G.map.depthTexture.name=q.name+".shadowMap",G.map.depthTexture.format=Gi,this.type===En?(G.map.depthTexture.compareFunction=X?ec:tc,G.map.depthTexture.minFilter=He,G.map.depthTexture.magFilter=He):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Ae,G.map.depthTexture.magFilter=Ae);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==n.x||G.map.height!==n.y)&&G.map.setSize(n.x,n.y);let Q=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();q.isPointLight!==!0&&G.updateMatrices(q,M);let j=(G.camera.layers.mask&4294967294)!==0?G.camera.layers:M.layers;for(let Et=0;Et<Q;Et++){let Bt=G.getCamera(Et);if(q.isPointLight){let Z=G.camera,gt=G.matrix,bt=q.distance||Z.far;bt!==Z.far&&(Z.far=bt,Z.updateProjectionMatrix()),gr.setFromMatrixPosition(q.matrixWorld),Z.position.copy(gr),_c.copy(Z.position),_c.add(wv[Et]),Z.up.copy(Ev[Et]),Z.lookAt(_c),Z.updateMatrixWorld(),gt.makeTranslation(-gr.x,-gr.y,-gr.z),Xu.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Xu,Z.coordinateSystem,Z.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)s.setRenderTarget(G.map,Et),s.clear();else{Et===0&&(s.setRenderTarget(G.map),s.clear());let Z=G.getViewport(Et);a.set(r.x*Z.x,r.y*Z.y,r.x*Z.z,r.y*Z.w),F.viewport(a)}i=G.getFrustum(Et),b(v,M,Bt,q,j,this.type)}G.isPointLightShadow!==!0&&this.type===hs&&S(G,M),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(I,C,N)};function S(T,v){let M=t.update(y);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new Qe(n.x,n.y,{format:dn,type:gi}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(v,null,M,u,y,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(v,null,M,f,y,null)}function E(T,v,M,I){let C=null,N=M.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)C=N;else if(C=M.isPointLight===!0?l:o,s.localClippingEnabled&&v.clipShadows===!0&&Array.isArray(v.clippingPlanes)&&v.clippingPlanes.length!==0||v.displacementMap&&v.displacementScale!==0||v.alphaMap&&v.alphaTest>0||v.map&&v.alphaTest>0||v.alphaToCoverage===!0){let F=C.uuid,z=v.uuid,D=c[F];D===void 0&&(D={},c[F]=D);let V=D[z];V===void 0&&(V=C.clone(),D[z]=V,v.addEventListener("dispose",A)),C=V}if(C.visible=v.visible,C.wireframe=v.wireframe,I===hs?C.side=v.shadowSide!==null?v.shadowSide:v.side:C.side=v.shadowSide!==null?v.shadowSide:d[v.side],C.alphaMap=v.alphaMap,C.alphaTest=v.alphaToCoverage===!0?.5:v.alphaTest,C.map=v.map,C.clipShadows=v.clipShadows,C.clippingPlanes=v.clippingPlanes,C.clipIntersection=v.clipIntersection,C.displacementMap=v.displacementMap,C.displacementScale=v.displacementScale,C.displacementBias=v.displacementBias,C.wireframeLinewidth=v.wireframeLinewidth,C.linewidth=v.linewidth,M.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let F=s.properties.get(C);F.light=M}return C}function b(T,v,M,I,C,N){if(T.visible===!1)return;if(T.layers.test(C)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&N===hs)&&(!T.frustumCulled||T.intersectsFrustum(i))){T.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,T.matrixWorld);let D=t.update(T),V=T.material;if(Array.isArray(V)){let q=D.groups;for(let G=0,et=q.length;G<et;G++){let X=q[G],Q=V[X.materialIndex];if(Q&&Q.visible){let j=E(T,Q,I,N);T.onBeforeShadow(s,T,v,M,D,j,X),s.renderBufferDirect(M,null,D,j,T,X),T.onAfterShadow(s,T,v,M,D,j,X)}}}else if(V.visible){let q=E(T,V,I,N);T.onBeforeShadow(s,T,v,M,D,q,null),s.renderBufferDirect(M,null,D,q,T,null),T.onAfterShadow(s,T,v,M,D,q,null)}}let z=T.children;for(let D=0,V=z.length;D<V;D++)b(z[D],v,M,I,C,N)}function A(T){T.target.removeEventListener("dispose",A);for(let M in c){let I=c[M],C=T.target.uuid;C in I&&(I[C].dispose(),delete I[C])}}}function Av(s,t){function e(){let P=!1,J=new le,W=null,ot=new le(0,0,0,0);return{setMask:function(nt){W!==nt&&!P&&(s.colorMask(nt,nt,nt,nt),W=nt)},setLocked:function(nt){P=nt},setClear:function(nt,rt,At,Gt,it){it===!0&&(nt*=Gt,rt*=Gt,At*=Gt),J.set(nt,rt,At,Gt),ot.equals(J)===!1&&(s.clearColor(nt,rt,At,Gt),ot.copy(J))},reset:function(){P=!1,W=null,ot.set(-1,0,0,0)}}}function i(){let P=!1,J=!1,W=null,ot=null,nt=null;return{setReversed:function(rt){if(J!==rt){let At=t.get("EXT_clip_control");rt?At.clipControlEXT(At.LOWER_LEFT_EXT,At.ZERO_TO_ONE_EXT):At.clipControlEXT(At.LOWER_LEFT_EXT,At.NEGATIVE_ONE_TO_ONE_EXT),J=rt;let Gt=nt;nt=null,this.setClear(Gt)}},getReversed:function(){return J},setTest:function(rt){rt?vt(s.DEPTH_TEST):zt(s.DEPTH_TEST)},setMask:function(rt){W!==rt&&!P&&(s.depthMask(rt),W=rt)},setFunc:function(rt){if(J&&(rt=yu[rt]),ot!==rt){switch(rt){case ra:s.depthFunc(s.NEVER);break;case aa:s.depthFunc(s.ALWAYS);break;case oa:s.depthFunc(s.LESS);break;case Kn:s.depthFunc(s.LEQUAL);break;case la:s.depthFunc(s.EQUAL);break;case ca:s.depthFunc(s.GEQUAL);break;case ha:s.depthFunc(s.GREATER);break;case ua:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ot=rt}},setLocked:function(rt){P=rt},setClear:function(rt){nt!==rt&&(nt=rt,J&&(rt=1-rt),s.clearDepth(rt))},reset:function(){P=!1,W=null,ot=null,nt=null,J=!1}}}function n(){let P=!1,J=null,W=null,ot=null,nt=null,rt=null,At=null,Gt=null,it=null;return{setTest:function(Rt){P||(Rt?vt(s.STENCIL_TEST):zt(s.STENCIL_TEST))},setMask:function(Rt){J!==Rt&&!P&&(s.stencilMask(Rt),J=Rt)},setFunc:function(Rt,Ht,pt){(W!==Rt||ot!==Ht||nt!==pt)&&(s.stencilFunc(Rt,Ht,pt),W=Rt,ot=Ht,nt=pt)},setOp:function(Rt,Ht,pt){(rt!==Rt||At!==Ht||Gt!==pt)&&(s.stencilOp(Rt,Ht,pt),rt=Rt,At=Ht,Gt=pt)},setLocked:function(Rt){P=Rt},setClear:function(Rt){it!==Rt&&(s.clearStencil(Rt),it=Rt)},reset:function(){P=!1,J=null,W=null,ot=null,nt=null,rt=null,At=null,Gt=null,it=null}}}let r=new e,a=new i,o=new n,l={},c=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],y=null,m=!1,p=null,S=null,E=null,b=null,A=null,T=null,v=null,M=new Nt(0,0,0),I=0,C=!1,N=null,F=null,z=null,D=null,V=null,q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,et=0,X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(X)[1]),G=et>=1):X.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),G=et>=2);let Q=null,j={},Et=s.getParameter(s.SCISSOR_BOX),Bt=s.getParameter(s.VIEWPORT),Z=new le().fromArray(Et),gt=new le().fromArray(Bt);function bt(P,J,W,ot){let nt=new Uint8Array(4),rt=s.createTexture();s.bindTexture(P,rt),s.texParameteri(P,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(P,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let At=0;At<W;At++)P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY?s.texImage3D(J,0,s.RGBA,1,1,ot,0,s.RGBA,s.UNSIGNED_BYTE,nt):s.texImage2D(J+At,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,nt);return rt}let Pt={};Pt[s.TEXTURE_2D]=bt(s.TEXTURE_2D,s.TEXTURE_2D,1),Pt[s.TEXTURE_CUBE_MAP]=bt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Pt[s.TEXTURE_2D_ARRAY]=bt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Pt[s.TEXTURE_3D]=bt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),vt(s.DEPTH_TEST),a.setFunc(Kn),Ye(!1),ce(Ul),vt(s.CULL_FACE),Ce(Tn);function vt(P){h[P]!==!0&&(s.enable(P),h[P]=!0)}function zt(P){h[P]!==!1&&(s.disable(P),h[P]=!1)}function pe(P,J){return u[P]!==J?(s.bindFramebuffer(P,J),u[P]=J,P===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=J),P===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=J),!0):!1}function Dt(P,J){let W=g,ot=!1;if(P){W=f.get(J),W===void 0&&(W=[],f.set(J,W));let nt=P.textures;if(W.length!==nt.length||W[0]!==s.COLOR_ATTACHMENT0){for(let rt=0,At=nt.length;rt<At;rt++)W[rt]=s.COLOR_ATTACHMENT0+rt;W.length=nt.length,ot=!0}}else W[0]!==s.BACK&&(W[0]=s.BACK,ot=!0);ot&&s.drawBuffers(W)}function te(P){return y!==P?(s.useProgram(P),y=P,!0):!1}let ie={[An]:s.FUNC_ADD,[Gh]:s.FUNC_SUBTRACT,[Vh]:s.FUNC_REVERSE_SUBTRACT};ie[Wh]=s.MIN,ie[Xh]=s.MAX;let Xt={[qh]:s.ZERO,[Yh]:s.ONE,[$h]:s.SRC_COLOR,[Bl]:s.SRC_ALPHA,[tu]:s.SRC_ALPHA_SATURATE,[Qh]:s.DST_COLOR,[Jh]:s.DST_ALPHA,[Zh]:s.ONE_MINUS_SRC_COLOR,[kl]:s.ONE_MINUS_SRC_ALPHA,[jh]:s.ONE_MINUS_DST_COLOR,[Kh]:s.ONE_MINUS_DST_ALPHA,[eu]:s.CONSTANT_COLOR,[iu]:s.ONE_MINUS_CONSTANT_COLOR,[nu]:s.CONSTANT_ALPHA,[su]:s.ONE_MINUS_CONSTANT_ALPHA};function Ce(P,J,W,ot,nt,rt,At,Gt,it,Rt){if(P===Tn){m===!0&&(zt(s.BLEND),m=!1);return}if(m===!1&&(vt(s.BLEND),m=!0),P!==Hh){if(P!==p||Rt!==C){if((S!==An||A!==An)&&(s.blendEquation(s.FUNC_ADD),S=An,A=An),Rt)switch(P){case Zi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case or:s.blendFunc(s.ONE,s.ONE);break;case Fl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ol:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Lt("WebGLState: Invalid blending: ",P);break}else switch(P){case Zi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case or:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Fl:Lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ol:Lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Lt("WebGLState: Invalid blending: ",P);break}E=null,b=null,T=null,v=null,M.set(0,0,0),I=0,p=P,C=Rt}return}nt=nt||J,rt=rt||W,At=At||ot,(J!==S||nt!==A)&&(s.blendEquationSeparate(ie[J],ie[nt]),S=J,A=nt),(W!==E||ot!==b||rt!==T||At!==v)&&(s.blendFuncSeparate(Xt[W],Xt[ot],Xt[rt],Xt[At]),E=W,b=ot,T=rt,v=At),(Gt.equals(M)===!1||it!==I)&&(s.blendColor(Gt.r,Gt.g,Gt.b,it),M.copy(Gt),I=it),p=P,C=!1}function ye(P,J){P.side===Xe?zt(s.CULL_FACE):vt(s.CULL_FACE);let W=P.side===We;J&&(W=!W),Ye(W),P.blending===Zi&&P.transparent===!1?Ce(Tn):Ce(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);let ot=P.stencilWrite;o.setTest(ot),ot&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Me(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?vt(s.SAMPLE_ALPHA_TO_COVERAGE):zt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(P){N!==P&&(P?s.frontFace(s.CW):s.frontFace(s.CCW),N=P)}function ce(P){P!==Bh?(vt(s.CULL_FACE),P!==F&&(P===Ul?s.cullFace(s.BACK):P===kh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):zt(s.CULL_FACE),F=P}function _i(P){P!==z&&(G&&s.lineWidth(P),z=P)}function Me(P,J,W){P?(vt(s.POLYGON_OFFSET_FILL),(D!==J||V!==W)&&(D=J,V=W,a.getReversed()&&(J=-J,W=-W),s.polygonOffset(J,W))):zt(s.POLYGON_OFFSET_FILL)}function ti(P){P?vt(s.SCISSOR_TEST):zt(s.SCISSOR_TEST)}function ei(P){P===void 0&&(P=s.TEXTURE0+q-1),Q!==P&&(s.activeTexture(P),Q=P)}function ii(P,J,W){W===void 0&&(Q===null?W=s.TEXTURE0+q-1:W=Q);let ot=j[W];ot===void 0&&(ot={type:void 0,texture:void 0},j[W]=ot),(ot.type!==P||ot.texture!==J)&&(Q!==W&&(s.activeTexture(W),Q=W),s.bindTexture(P,J||Pt[P]),ot.type=P,ot.texture=J)}function U(){let P=j[Q];P!==void 0&&P.type!==void 0&&(s.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function ni(){try{s.compressedTexImage2D(...arguments)}catch(P){Lt("WebGLState:",P)}}function ae(){try{s.compressedTexImage3D(...arguments)}catch(P){Lt("WebGLState:",P)}}function oe(){try{s.texSubImage2D(...arguments)}catch(P){Lt("WebGLState:",P)}}function dt(){try{s.texSubImage3D(...arguments)}catch(P){Lt("WebGLState:",P)}}function _e(){try{s.compressedTexSubImage2D(...arguments)}catch(P){Lt("WebGLState:",P)}}function It(){try{s.compressedTexSubImage3D(...arguments)}catch(P){Lt("WebGLState:",P)}}function Ft(){try{s.texStorage2D(...arguments)}catch(P){Lt("WebGLState:",P)}}function w(){try{s.texStorage3D(...arguments)}catch(P){Lt("WebGLState:",P)}}function x(){try{s.texImage2D(...arguments)}catch(P){Lt("WebGLState:",P)}}function B(){try{s.texImage3D(...arguments)}catch(P){Lt("WebGLState:",P)}}function tt(P){return d[P]!==void 0?d[P]:s.getParameter(P)}function K(P,J){d[P]!==J&&(s.pixelStorei(P,J),d[P]=J)}function st(P){Z.equals(P)===!1&&(s.scissor(P.x,P.y,P.z,P.w),Z.copy(P))}function ht(P){gt.equals(P)===!1&&(s.viewport(P.x,P.y,P.z,P.w),gt.copy(P))}function Y(P,J){let W=c.get(J);W===void 0&&(W=new WeakMap,c.set(J,W));let ot=W.get(P);ot===void 0&&(ot=s.getUniformBlockIndex(J,P.name),s.uniformBlockBinding(J,ot,ot),W.set(P,ot))}function $(P,J,W){let nt=c.get(J).get(P);l[nt]!==W&&(s.bindBufferBase(s.UNIFORM_BUFFER,nt,W),l[nt]=W)}function at(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},Q=null,j={},u={},l={},f=new WeakMap,g=[],y=null,m=!1,p=null,S=null,E=null,b=null,A=null,T=null,v=null,M=new Nt(0,0,0),I=0,C=!1,N=null,F=null,z=null,D=null,V=null,Z.set(0,0,s.canvas.width,s.canvas.height),gt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:vt,disable:zt,bindFramebuffer:pe,drawBuffers:Dt,useProgram:te,setBlending:Ce,setMaterial:ye,setFlipSided:Ye,setCullFace:ce,setLineWidth:_i,setPolygonOffset:Me,setScissorTest:ti,activeTexture:ei,bindTexture:ii,unbindTexture:U,compressedTexImage2D:ni,compressedTexImage3D:ae,texImage2D:x,texImage3D:B,pixelStorei:K,getParameter:tt,updateUBOMapping:Y,uniformBlockBinding:$,texStorage2D:Ft,texStorage3D:w,texSubImage2D:oe,texSubImage3D:dt,compressedTexSubImage2D:_e,compressedTexSubImage3D:It,scissor:st,viewport:ht,reset:at}}function Rv(s,t,e,i,n,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new _t,h=new WeakMap,d=new Set,u,f=new WeakMap,g=new Set,y=new FinalizationRegistry(w=>g.delete(w)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(w,x){return m?new OffscreenCanvas(w,x):Ns("canvas")}function S(w,x,B){let tt=1,K=Ft(w);if((K.width>B||K.height>B)&&(tt=B/Math.max(K.width,K.height)),tt<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let st=Math.floor(tt*K.width),ht=Math.floor(tt*K.height);u===void 0&&(u=p(st,ht));let Y=x?p(st,ht):u;return Y.width=st,Y.height=ht,Y.getContext("2d").drawImage(w,0,0,st,ht),Ct("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+st+"x"+ht+")."),Y}else return"data"in w&&Ct("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),w;return w}function E(w){return w.generateMipmaps}function b(w){s.generateMipmap(w)}function A(w){return w.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?s.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function T(w,x,B,tt,K,st=!1){if(w!==null){if(s[w]!==void 0)return s[w];Ct("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ht;tt&&(ht=t.get("EXT_texture_norm16"),ht||Ct("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=x;if(x===s.RED&&(B===s.FLOAT&&(Y=s.R32F),B===s.HALF_FLOAT&&(Y=s.R16F),B===s.UNSIGNED_BYTE&&(Y=s.R8),B===s.UNSIGNED_SHORT&&ht&&(Y=ht.R16_EXT),B===s.SHORT&&ht&&(Y=ht.R16_SNORM_EXT)),x===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.R8UI),B===s.UNSIGNED_SHORT&&(Y=s.R16UI),B===s.UNSIGNED_INT&&(Y=s.R32UI),B===s.BYTE&&(Y=s.R8I),B===s.SHORT&&(Y=s.R16I),B===s.INT&&(Y=s.R32I)),x===s.RG&&(B===s.FLOAT&&(Y=s.RG32F),B===s.HALF_FLOAT&&(Y=s.RG16F),B===s.UNSIGNED_BYTE&&(Y=s.RG8),B===s.UNSIGNED_SHORT&&ht&&(Y=ht.RG16_EXT),B===s.SHORT&&ht&&(Y=ht.RG16_SNORM_EXT)),x===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.RG8UI),B===s.UNSIGNED_SHORT&&(Y=s.RG16UI),B===s.UNSIGNED_INT&&(Y=s.RG32UI),B===s.BYTE&&(Y=s.RG8I),B===s.SHORT&&(Y=s.RG16I),B===s.INT&&(Y=s.RG32I)),x===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),B===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),B===s.UNSIGNED_INT&&(Y=s.RGB32UI),B===s.BYTE&&(Y=s.RGB8I),B===s.SHORT&&(Y=s.RGB16I),B===s.INT&&(Y=s.RGB32I)),x===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),B===s.UNSIGNED_INT&&(Y=s.RGBA32UI),B===s.BYTE&&(Y=s.RGBA8I),B===s.SHORT&&(Y=s.RGBA16I),B===s.INT&&(Y=s.RGBA32I)),x===s.RGB&&(B===s.UNSIGNED_SHORT&&ht&&(Y=ht.RGB16_EXT),B===s.SHORT&&ht&&(Y=ht.RGB16_SNORM_EXT),B===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),B===s.UNSIGNED_INT_10F_11F_11F_REV&&(Y=s.R11F_G11F_B10F)),x===s.RGBA){let $=st?Ls:$t.getTransfer(K);B===s.FLOAT&&(Y=s.RGBA32F),B===s.HALF_FLOAT&&(Y=s.RGBA16F),B===s.UNSIGNED_BYTE&&(Y=$===jt?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT&&ht&&(Y=ht.RGBA16_EXT),B===s.SHORT&&ht&&(Y=ht.RGBA16_SNORM_EXT),B===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function v(w,x){let B;return w?x===null||x===mi||x===Cn?B=s.DEPTH24_STENCIL8:x===ci?B=s.DEPTH32F_STENCIL8:x===ds&&(B=s.DEPTH24_STENCIL8,Ct("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===mi||x===Cn?B=s.DEPTH_COMPONENT24:x===ci?B=s.DEPTH_COMPONENT32F:x===ds&&(B=s.DEPTH_COMPONENT16),B}function M(w,x){return E(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ae&&w.minFilter!==He?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function I(w){let x=new WeakRef(w);i.get(w).__ref=x,g.add(x),y.register(w,x,x)}function C(w){let x=i.get(w).__ref;x!==void 0&&(g.delete(x),y.unregister(x))}function N(w){z(w.target)}function F(w){D(w.target)}function z(w){w.removeEventListener("dispose",N),C(w),q(w),w.isVideoTexture&&h.delete(w),w.isHTMLTexture&&d.delete(w)}function D(w){w.removeEventListener("dispose",F),C(w),et(w)}function V(){for(let w of g){let x=w.deref();x!==void 0&&(x.isRenderTarget===!0?D(x):z(x))}g.clear(),d.clear()}function q(w){let x=i.get(w);if(x.__webglInit===void 0)return;let B=w.source,tt=f.get(B);if(tt){let K=tt[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&G(w),Object.keys(tt).length===0&&f.delete(B)}i.remove(w)}function G(w){let x=i.get(w);s.deleteTexture(x.__webglTexture);let B=w.source,tt=f.get(B);delete tt[x.__cacheKey],a.memory.textures--}function et(w){let x=i.get(w);x.__depthDisposeCallback&&x.__depthDisposeCallback();let B=w.depthTexture;if(B&&B.renderTarget===w&&z(B),w.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(x.__webglFramebuffer[K]))for(let st=0;st<x.__webglFramebuffer[K].length;st++)s.deleteFramebuffer(x.__webglFramebuffer[K][st]);else s.deleteFramebuffer(x.__webglFramebuffer[K]);x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer[K])}else{if(Array.isArray(x.__webglFramebuffer))for(let K=0;K<x.__webglFramebuffer.length;K++)s.deleteFramebuffer(x.__webglFramebuffer[K]);else s.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&s.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let K=0;K<x.__webglColorRenderbuffer.length;K++)x.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(x.__webglColorRenderbuffer[K]);x.__webglDepthRenderbuffer&&s.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let tt=w.textures;for(let K=0,st=tt.length;K<st;K++){let ht=i.get(tt[K]);ht.__webglTexture&&(s.deleteTexture(ht.__webglTexture),a.memory.textures--),i.remove(tt[K])}i.remove(w)}let X=0;function Q(){X=0}function j(){return X}function Et(w){X=w}function Bt(){let w=X;return w>=n.maxTextures&&Ct("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+n.maxTextures),X+=1,w}function Z(w){let x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.mipmapsAutoUpdate),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function gt(w,x){let B=i.get(w);if(w.isVideoTexture&&_e(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&B.__version!==w.version){let tt=w.image;if(tt===null)Ct("WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)Ct("WebGLRenderer: Texture marked for update but image is incomplete");else{ye(B,w,x);return}}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+x)}function bt(w,x){let B=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){ye(B,w,x);return}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+x)}function Pt(w,x){let B=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){ye(B,w,x);return}e.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+x)}function vt(w,x){let B=i.get(w);if(w.version>0&&B.__version!==w.version){Ye(B,w,x);return}e.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+x)}let zt={[da]:s.REPEAT,[Mi]:s.CLAMP_TO_EDGE,[fa]:s.MIRRORED_REPEAT},pe={[Ae]:s.NEAREST,[ou]:s.NEAREST_MIPMAP_NEAREST,[cr]:s.NEAREST_MIPMAP_LINEAR,[He]:s.LINEAR,[Ya]:s.LINEAR_MIPMAP_NEAREST,[Ji]:s.LINEAR_MIPMAP_LINEAR},Dt={[uu]:s.NEVER,[ic]:s.ALWAYS,[du]:s.LESS,[tc]:s.LEQUAL,[fu]:s.EQUAL,[ec]:s.GEQUAL,[pu]:s.GREATER,[mu]:s.NOTEQUAL};function te(w,x){if(x.type===ci&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===He||x.magFilter===Ya||x.magFilter===cr||x.magFilter===Ji||x.minFilter===He||x.minFilter===Ya||x.minFilter===cr||x.minFilter===Ji)&&Ct("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(w,s.TEXTURE_WRAP_S,zt[x.wrapS]),s.texParameteri(w,s.TEXTURE_WRAP_T,zt[x.wrapT]),(w===s.TEXTURE_3D||w===s.TEXTURE_2D_ARRAY)&&s.texParameteri(w,s.TEXTURE_WRAP_R,zt[x.wrapR]),s.texParameteri(w,s.TEXTURE_MAG_FILTER,pe[x.magFilter]),s.texParameteri(w,s.TEXTURE_MIN_FILTER,pe[x.minFilter]),x.compareFunction&&(s.texParameteri(w,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(w,s.TEXTURE_COMPARE_FUNC,Dt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ae||x.minFilter!==cr&&x.minFilter!==Ji||x.type===ci&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");s.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,n.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function ie(w,x){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",N),I(x));let tt=x.source,K=f.get(tt);K===void 0&&(K={},f.set(tt,K));let st=Z(x);if(st!==w.__cacheKey){K[st]===void 0&&(K[st]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,B=!0),K[st].usedTimes++;let ht=K[w.__cacheKey];ht!==void 0&&(K[w.__cacheKey].usedTimes--,ht.usedTimes===0&&G(x)),w.__cacheKey=st,w.__webglTexture=K[st].texture}return B}function Xt(w,x,B){return Math.floor(Math.floor(w/B)/x)}function Ce(w,x,B,tt){let st=w.updateRanges;if(st.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,x.width,x.height,B,tt,x.data);else{st.sort((P,J)=>P.start-J.start);let ht=0;for(let P=1;P<st.length;P++){let J=st[ht],W=st[P],ot=J.start+J.count,nt=Xt(W.start,x.width,4),rt=Xt(J.start,x.width,4);W.start<=ot+1&&nt===rt&&Xt(W.start+W.count-1,x.width,4)===nt?J.count=Math.max(J.count,W.start+W.count-J.start):(++ht,st[ht]=W)}st.length=ht+1;let Y=e.getParameter(s.UNPACK_ROW_LENGTH),$=e.getParameter(s.UNPACK_SKIP_PIXELS),at=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,x.width);for(let P=0,J=st.length;P<J;P++){let W=st[P],ot=Math.floor(W.start/4),nt=Math.ceil(W.count/4),rt=ot%x.width,At=Math.floor(ot/x.width),Gt=nt,it=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,rt),e.pixelStorei(s.UNPACK_SKIP_ROWS,At),e.texSubImage2D(s.TEXTURE_2D,0,rt,At,Gt,it,B,tt,x.data)}w.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,Y),e.pixelStorei(s.UNPACK_SKIP_PIXELS,$),e.pixelStorei(s.UNPACK_SKIP_ROWS,at)}}function ye(w,x,B){let tt=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(tt=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(tt=s.TEXTURE_3D);let K=ie(w,x),st=x.source;e.bindTexture(tt,w.__webglTexture,s.TEXTURE0+B);let ht=i.get(st);if(st.version!==ht.__version||K===!0){if(e.activeTexture(s.TEXTURE0+B),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let it=$t.getPrimaries($t.workingColorSpace),Rt=x.colorSpace===Qi?null:$t.getPrimaries(x.colorSpace),Ht=x.colorSpace===Qi||it===Rt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ht)}e.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment);let $=S(x.image,!1,n.maxTextureSize);$=It(x,$);let at=r.convert(x.format,x.colorSpace),P=r.convert(x.type),J=T(x.internalFormat,at,P,x.normalized,x.colorSpace,x.isVideoTexture);te(tt,x);let W,ot=x.mipmaps,nt=x.isVideoTexture!==!0,rt=ht.__version===void 0||K===!0,At=st.dataReady,Gt=M(x,$);if(x.isDepthTexture)J=v(x.format===Ki,x.type),rt&&(nt?e.texStorage2D(s.TEXTURE_2D,1,J,$.width,$.height):e.texImage2D(s.TEXTURE_2D,0,J,$.width,$.height,0,at,P,null));else if(x.isDataTexture)if(ot.length>0){nt&&rt&&e.texStorage2D(s.TEXTURE_2D,Gt,J,ot[0].width,ot[0].height);for(let it=0,Rt=ot.length;it<Rt;it++)W=ot[it],nt?At&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,W.width,W.height,at,P,W.data):e.texImage2D(s.TEXTURE_2D,it,J,W.width,W.height,0,at,P,W.data);x.generateMipmaps=!1}else nt?(rt&&e.texStorage2D(s.TEXTURE_2D,Gt,J,$.width,$.height),At&&Ce(x,$,at,P)):e.texImage2D(s.TEXTURE_2D,0,J,$.width,$.height,0,at,P,$.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){nt&&rt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Gt,J,ot[0].width,ot[0].height,$.depth);for(let it=0,Rt=ot.length;it<Rt;it++)if(W=ot[it],x.format!==vi)if(at!==null)if(nt){if(At)if(x.layerUpdates.size>0){let Ht=fc(W.width,W.height,x.format,x.type);for(let pt of x.layerUpdates){let ee=W.data.subarray(pt*Ht/W.data.BYTES_PER_ELEMENT,(pt+1)*Ht/W.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,pt,W.width,W.height,1,at,ee)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,0,W.width,W.height,$.depth,at,W.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,it,J,W.width,W.height,$.depth,0,W.data,0,0);else Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else nt?At&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,0,W.width,W.height,$.depth,at,P,W.data):e.texImage3D(s.TEXTURE_2D_ARRAY,it,J,W.width,W.height,$.depth,0,at,P,W.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{nt&&rt&&e.texStorage2D(s.TEXTURE_2D,Gt,J,ot[0].width,ot[0].height);for(let it=0,Rt=ot.length;it<Rt;it++)W=ot[it],x.format!==vi?at!==null?nt?At&&e.compressedTexSubImage2D(s.TEXTURE_2D,it,0,0,W.width,W.height,at,W.data):e.compressedTexImage2D(s.TEXTURE_2D,it,J,W.width,W.height,0,W.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):nt?At&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,W.width,W.height,at,P,W.data):e.texImage2D(s.TEXTURE_2D,it,J,W.width,W.height,0,at,P,W.data)}else if(x.isDataArrayTexture)if(nt){if(rt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Gt,J,$.width,$.height,$.depth),At)if(x.layerUpdates.size>0){let it=fc($.width,$.height,x.format,x.type);for(let Rt of x.layerUpdates){let Ht=$.data.subarray(Rt*it/$.data.BYTES_PER_ELEMENT,(Rt+1)*it/$.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Rt,$.width,$.height,1,at,P,Ht)}x.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,at,P,$.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,J,$.width,$.height,$.depth,0,at,P,$.data);else if(x.isData3DTexture)nt?(rt&&e.texStorage3D(s.TEXTURE_3D,Gt,J,$.width,$.height,$.depth),At&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,at,P,$.data)):e.texImage3D(s.TEXTURE_3D,0,J,$.width,$.height,$.depth,0,at,P,$.data);else if(x.isFramebufferTexture){if(rt)if(nt)e.texStorage2D(s.TEXTURE_2D,Gt,J,$.width,$.height);else{let it=$.width,Rt=$.height;for(let Ht=0;Ht<Gt;Ht++)e.texImage2D(s.TEXTURE_2D,Ht,J,it,Rt,0,at,P,null),it>>=1,Rt>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in s){let it=s.canvas;if(it.hasAttribute("layoutsubtree")||it.setAttribute("layoutsubtree","true"),$.parentNode!==it){it.appendChild($),d.add(x),it.onpaint=Rt=>{let Ht=Rt.changedElements;for(let pt of d)Ht.includes(pt.image)&&(pt.needsUpdate=!0)},it.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,$);else{let Ht=s.RGBA,pt=s.RGBA,ee=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Ht,pt,ee,$)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(ot.length>0){if(nt&&rt){let it=Ft(ot[0]);e.texStorage2D(s.TEXTURE_2D,Gt,J,it.width,it.height)}for(let it=0,Rt=ot.length;it<Rt;it++)W=ot[it],nt?At&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,at,P,W):e.texImage2D(s.TEXTURE_2D,it,J,at,P,W);x.generateMipmaps=!1}else if(nt){if(rt){let it=Ft($);e.texStorage2D(s.TEXTURE_2D,Gt,J,it.width,it.height)}At&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,at,P,$)}else e.texImage2D(s.TEXTURE_2D,0,J,at,P,$);E(x)&&x.mipmapsAutoUpdate===!0&&b(tt),ht.__version=st.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function Ye(w,x,B){if(x.image.length!==6)return;let tt=ie(w,x),K=x.source;e.bindTexture(s.TEXTURE_CUBE_MAP,w.__webglTexture,s.TEXTURE0+B);let st=i.get(K);if(K.version!==st.__version||tt===!0){e.activeTexture(s.TEXTURE0+B);let ht=$t.getPrimaries($t.workingColorSpace),Y=x.colorSpace===Qi?null:$t.getPrimaries(x.colorSpace),$=x.colorSpace===Qi||ht===Y?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);let at=x.isCompressedTexture||x.image[0].isCompressedTexture,P=x.image[0]&&x.image[0].isDataTexture,J=[];for(let pt=0;pt<6;pt++)!at&&!P?J[pt]=S(x.image[pt],!0,n.maxCubemapSize):J[pt]=P?x.image[pt].image:x.image[pt],J[pt]=It(x,J[pt]);let W=J[0],ot=r.convert(x.format,x.colorSpace),nt=r.convert(x.type),rt=T(x.internalFormat,ot,nt,x.normalized,x.colorSpace),At=x.isVideoTexture!==!0,Gt=st.__version===void 0||tt===!0,it=K.dataReady,Rt=M(x,W);te(s.TEXTURE_CUBE_MAP,x);let Ht;if(x.isDepthTexture){if(rt=v(x.format===Ki,x.type),Gt)if(At)e.texStorage2D(s.TEXTURE_CUBE_MAP,1,rt,W.width,W.height);else for(let pt=0;pt<6;pt++)e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,rt,W.width,W.height,0,ot,nt,null)}else if(at){At&&Gt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Rt,rt,W.width,W.height);for(let pt=0;pt<6;pt++){Ht=J[pt].mipmaps;for(let ee=0;ee<Ht.length;ee++){let we=Ht[ee];x.format!==vi?ot!==null?At?it&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee,0,0,we.width,we.height,ot,we.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee,rt,we.width,we.height,0,we.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):At?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee,0,0,we.width,we.height,ot,nt,we.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee,rt,we.width,we.height,0,ot,nt,we.data)}}}else{if(Ht=x.mipmaps,At&&Gt){Ht.length>0&&Rt++;let pt=Ft(J[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,Rt,rt,pt.width,pt.height)}for(let pt=0;pt<6;pt++)if(P){At?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,J[pt].width,J[pt].height,ot,nt,J[pt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,rt,J[pt].width,J[pt].height,0,ot,nt,J[pt].data);for(let ee=0;ee<Ht.length;ee++){let ji=Ht[ee].image[pt].image;At?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee+1,0,0,ji.width,ji.height,ot,nt,ji.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee+1,rt,ji.width,ji.height,0,ot,nt,ji.data)}}else{At?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,ot,nt,J[pt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,rt,ot,nt,J[pt]);for(let ee=0;ee<Ht.length;ee++){let we=Ht[ee];At?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee+1,0,0,ot,nt,we.image[pt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee+1,rt,ot,nt,we.image[pt])}}}E(x)&&x.mipmapsAutoUpdate===!0&&b(s.TEXTURE_CUBE_MAP),st.__version=K.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function ce(w,x,B,tt,K,st){let ht=r.convert(B.format,B.colorSpace),Y=r.convert(B.type),$=T(B.internalFormat,ht,Y,B.normalized,B.colorSpace),at=i.get(x),P=i.get(B);if(P.__renderTarget=x,!at.__hasExternalTextures){let J=Math.max(1,x.width>>st),W=Math.max(1,x.height>>st);K===s.TEXTURE_3D||K===s.TEXTURE_2D_ARRAY?e.texImage3D(K,st,$,J,W,x.depth,0,ht,Y,null):e.texImage2D(K,st,$,J,W,0,ht,Y,null)}e.bindFramebuffer(s.FRAMEBUFFER,w),dt(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,tt,K,P.__webglTexture,0,oe(x)):(K===s.TEXTURE_2D||K>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,tt,K,P.__webglTexture,st),e.bindFramebuffer(s.FRAMEBUFFER,null)}function _i(w,x,B){if(s.bindRenderbuffer(s.RENDERBUFFER,w),x.depthBuffer){let tt=x.depthTexture,K=tt&&tt.isDepthTexture?tt.type:null,st=v(x.stencilBuffer,K),ht=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;dt(x)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,oe(x),st,x.width,x.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,oe(x),st,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,st,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ht,s.RENDERBUFFER,w)}else{let tt=x.textures;for(let K=0;K<tt.length;K++){let st=tt[K],ht=r.convert(st.format,st.colorSpace),Y=r.convert(st.type),$=T(st.internalFormat,ht,Y,st.normalized,st.colorSpace);dt(x)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,oe(x),$,x.width,x.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,oe(x),$,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,$,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Me(w,x,B){let tt=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=i.get(x.depthTexture);K.__renderTarget=x;let st=tt?x.depthTexture.image[0]:x.depthTexture.image;(!K.__webglTexture||st.width!==x.width||st.height!==x.height)&&(st.width=x.width,st.height=x.height,x.depthTexture.needsUpdate=!0),tt?vt(x.depthTexture,0):gt(x.depthTexture,0);let ht=K.__webglTexture,Y=oe(x),$=tt?s.TEXTURE_CUBE_MAP_POSITIVE_X+B:s.TEXTURE_2D,at=x.depthTexture.format===Ki?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(x.depthTexture.format===Gi)dt(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,at,$,ht,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,at,$,ht,0);else if(x.depthTexture.format===Ki)dt(x)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,at,$,ht,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,at,$,ht,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ti(w){let x=i.get(w),B=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){let tt=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),tt){let K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,tt.removeEventListener("dispose",K)};tt.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=tt}if(w.depthTexture&&!x.__autoAllocateDepthBuffer)if(B)for(let tt=0;tt<6;tt++)Me(x.__webglFramebuffer[tt],w,tt);else w.texture.mipmaps.length>0?Me(x.__webglFramebuffer[0],w,0):Me(x.__webglFramebuffer,w,0);else if(B){x.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[tt]),x.__webglDepthbuffer[tt]===void 0)x.__webglDepthbuffer[tt]=s.createRenderbuffer(),_i(x.__webglDepthbuffer[tt],w,!1);else{let K=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,st=x.__webglDepthbuffer[tt];s.bindRenderbuffer(s.RENDERBUFFER,st),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,st)}}else if(w.texture.mipmaps.length>0?e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=s.createRenderbuffer(),_i(x.__webglDepthbuffer,w,!1);else{let K=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,st=x.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,st),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,st)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function ei(w,x,B){let tt=i.get(w);x!==void 0&&ce(tt.__webglFramebuffer,w,w.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&ti(w)}function ii(w){let x=w.texture,B=i.get(w),tt=i.get(x);w.addEventListener("dispose",F),I(w);let K=w.textures,st=w.isWebGLCubeRenderTarget===!0,ht=K.length>1;if(ht||(tt.__webglTexture===void 0&&(tt.__webglTexture=s.createTexture()),tt.__version=x.version,a.memory.textures++),st){B.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(x.mipmaps.length>0){B.__webglFramebuffer[Y]=[];for(let $=0;$<x.mipmaps.length;$++)B.__webglFramebuffer[Y][$]=s.createFramebuffer()}else B.__webglFramebuffer[Y]=s.createFramebuffer()}else{if(x.mipmaps.length>0){B.__webglFramebuffer=[];for(let Y=0;Y<x.mipmaps.length;Y++)B.__webglFramebuffer[Y]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(ht)for(let Y=0,$=K.length;Y<$;Y++){let at=i.get(K[Y]);at.__webglTexture===void 0&&(at.__webglTexture=s.createTexture(),a.memory.textures++)}if(w.samples>0&&dt(w)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Y=0;Y<K.length;Y++){let $=K[Y];B.__webglColorRenderbuffer[Y]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[Y]);let at=r.convert($.format,$.colorSpace),P=r.convert($.type),J=T($.internalFormat,at,P,$.normalized,$.colorSpace,w.isXRRenderTarget===!0),W=oe(w);s.renderbufferStorageMultisample(s.RENDERBUFFER,W,J,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Y,s.RENDERBUFFER,B.__webglColorRenderbuffer[Y])}s.bindRenderbuffer(s.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),_i(B.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(st){e.bindTexture(s.TEXTURE_CUBE_MAP,tt.__webglTexture),te(s.TEXTURE_CUBE_MAP,x);for(let Y=0;Y<6;Y++)if(x.mipmaps.length>0)for(let $=0;$<x.mipmaps.length;$++)ce(B.__webglFramebuffer[Y][$],w,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,$);else ce(B.__webglFramebuffer[Y],w,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);E(x)?b(s.TEXTURE_CUBE_MAP):x.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),e.unbindTexture()}else if(ht){for(let Y=0,$=K.length;Y<$;Y++){let at=K[Y],P=i.get(at),J=s.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(J=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(J,P.__webglTexture),te(J,at),ce(B.__webglFramebuffer,w,at,s.COLOR_ATTACHMENT0+Y,J,0),E(at)&&b(J)}e.unbindTexture()}else{let Y=s.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Y=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Y,tt.__webglTexture),te(Y,x),x.mipmaps.length>0)for(let $=0;$<x.mipmaps.length;$++)ce(B.__webglFramebuffer[$],w,x,s.COLOR_ATTACHMENT0,Y,$);else ce(B.__webglFramebuffer,w,x,s.COLOR_ATTACHMENT0,Y,0);E(x)?b(Y):x.mipmaps.length>0&&s.texParameteri(Y,s.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),e.unbindTexture()}w.depthBuffer&&ti(w)}function U(w){let x=w.textures;for(let B=0,tt=x.length;B<tt;B++){let K=x[B];if(E(K)&&K.mipmapsAutoUpdate===!0){let st=A(w),ht=i.get(K).__webglTexture;e.bindTexture(st,ht),b(st),e.unbindTexture()}}}let ni=[];function ae(w){if(w.samples>0){if(dt(w)===!1){let x=w.textures,B=w.width,tt=w.height,K=s.COLOR_BUFFER_BIT,st=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=i.get(w),Y=x.length>1;if(Y)for(let at=0;at<x.length;at++)e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer),w.texture.mipmaps.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let at=0;at<x.length;at++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(K|=s.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(K|=s.STENCIL_BUFFER_BIT)),Y){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ht.__webglColorRenderbuffer[at]);let P=i.get(x[at]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,P,0)}s.blitFramebuffer(0,0,B,tt,0,0,B,tt,K,s.NEAREST),l===!0&&(ni.length=0,ni.push(s.COLOR_ATTACHMENT0+at),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&ni.push(st),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ni))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Y)for(let at=0;at<x.length;at++){e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.RENDERBUFFER,ht.__webglColorRenderbuffer[at]);let P=i.get(x[at]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.TEXTURE_2D,P,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&l){let x=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[x])}}}function oe(w){return Math.min(n.maxSamples,w.samples)}function dt(w){let x=i.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function _e(w){let x=a.render.frame;h.get(w)!==x&&(h.set(w,x),w.update())}function It(w,x){let B=w.colorSpace,tt=w.format,K=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==Ds&&B!==Qi&&($t.getTransfer(B)===jt?(tt!==vi||K!==$e)&&Ct("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Lt("WebGLTextures: Unsupported texture color space:",B)),x}function Ft(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=Bt,this.resetTextureUnits=Q,this.getTextureUnits=j,this.setTextureUnits=Et,this.setTexture2D=gt,this.setTexture2DArray=bt,this.setTexture3D=Pt,this.setTextureCube=vt,this.rebindTextures=ei,this.setupRenderTarget=ii,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=ti,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=dt,this.dispose=V}function Cv(s,t){function e(i,n=Qi){let r,a=$t.getTransfer(n);if(i===$e)return s.UNSIGNED_BYTE;if(i===Za)return s.UNSIGNED_SHORT_4_4_4_4;if(i===Ja)return s.UNSIGNED_SHORT_5_5_5_1;if(i===Jl)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===Kl)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===$l)return s.BYTE;if(i===Zl)return s.SHORT;if(i===ds)return s.UNSIGNED_SHORT;if(i===$a)return s.INT;if(i===mi)return s.UNSIGNED_INT;if(i===ci)return s.FLOAT;if(i===gi)return s.HALF_FLOAT;if(i===Ql)return s.ALPHA;if(i===jl)return s.RGB;if(i===vi)return s.RGBA;if(i===Gi)return s.DEPTH_COMPONENT;if(i===Ki)return s.DEPTH_STENCIL;if(i===Ka)return s.RED;if(i===Qa)return s.RED_INTEGER;if(i===dn)return s.RG;if(i===ja)return s.RG_INTEGER;if(i===to)return s.RGBA_INTEGER;if(i===hr||i===ur||i===dr||i===fr)if(a===jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===hr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===hr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ur)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===dr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===eo||i===io||i===no||i===so)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===eo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===io)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===no)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===so)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ro||i===ao||i===oo||i===lo||i===co||i===pr||i===ho)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ro||i===ao)return a===jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===oo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===lo)return r.COMPRESSED_R11_EAC;if(i===co)return r.COMPRESSED_SIGNED_R11_EAC;if(i===pr)return r.COMPRESSED_RG11_EAC;if(i===ho)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===uo||i===fo||i===po||i===mo||i===go||i===vo||i===xo||i===yo||i===_o||i===bo||i===So||i===Mo||i===wo||i===Eo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===uo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===po)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===mo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===go)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===vo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===xo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===yo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_o)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===So)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Mo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===wo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Eo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===To||i===Ao||i===Ro)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===To)return a===jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ao)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ro)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Co||i===Po||i===mr||i===Io)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Co)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Po)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===mr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Io)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Cn?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}var Pv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Iv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ac=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new $s(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Pi({vertexShader:Pv,fragmentShader:Iv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new wt(new Ci(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Rc=class extends wi{constructor(t,e){super();let i=this,n=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,y=typeof XRWebGLBinding<"u",m=new Ac,p={},S=e.getContextAttributes(),E=null,b=null,A=[],T=[],v=new _t,M=null,I=null,C=new Ue;C.viewport=new le;let N=new Ue;N.viewport=new le;let F=[C,N],z=new Va,D=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let gt=A[Z];return gt===void 0&&(gt=new is,A[Z]=gt),gt.getTargetRaySpace()},this.getControllerGrip=function(Z){let gt=A[Z];return gt===void 0&&(gt=new is,A[Z]=gt),gt.getGripSpace()},this.getHand=function(Z){let gt=A[Z];return gt===void 0&&(gt=new is,A[Z]=gt),gt.getHandSpace()};function q(Z){let gt=T.indexOf(Z.inputSource);if(gt===-1)return;let bt=A[gt];bt!==void 0&&(bt.update(Z.inputSource,Z.frame,c||a),bt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){n.removeEventListener("select",q),n.removeEventListener("selectstart",q),n.removeEventListener("selectend",q),n.removeEventListener("squeeze",q),n.removeEventListener("squeezestart",q),n.removeEventListener("squeezeend",q),n.removeEventListener("end",G),n.removeEventListener("inputsourceschange",et);for(let Z=0;Z<A.length;Z++){let gt=T[Z];gt!==null&&(T[Z]=null,A[Z].disconnect(gt))}D=null,V=null,m.reset();for(let Z in p)delete p[Z];if(t.setRenderTarget(E),f=null,u=null,d=null,n=null,b=null,Bt.stop(),i.isPresenting=!1,t.setPixelRatio(M),t.setSize(v.width,v.height,!1),I!==null){let Z=I.camera;Z.fov=I.fov,Z.zoom=I.zoom,Z.updateProjectionMatrix(),I=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,i.isPresenting===!0&&Ct("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&Ct("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(n,e)),d},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(Z){if(n=Z,n!==null){if(E=t.getRenderTarget(),n.addEventListener("select",q),n.addEventListener("selectstart",q),n.addEventListener("selectend",q),n.addEventListener("squeeze",q),n.addEventListener("squeezestart",q),n.addEventListener("squeezeend",q),n.addEventListener("end",G),n.addEventListener("inputsourceschange",et),S.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(v),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Pt=null,vt=null;S.depth&&(vt=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,bt=S.stencil?Ki:Gi,Pt=S.stencil?Cn:mi);let zt={colorFormat:e.RGBA8,depthFormat:vt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(zt),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),b=new Qe(u.textureWidth,u.textureHeight,{format:vi,type:$e,depthTexture:new Xi(u.textureWidth,u.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let bt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(n,e,bt),n.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Qe(f.framebufferWidth,f.framebufferHeight,{format:vi,type:$e,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),Bt.setContext(n),Bt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function et(Z){for(let gt=0;gt<Z.removed.length;gt++){let bt=Z.removed[gt],Pt=T.indexOf(bt);Pt>=0&&(T[Pt]=null,A[Pt].disconnect(bt))}for(let gt=0;gt<Z.added.length;gt++){let bt=Z.added[gt],Pt=T.indexOf(bt);if(Pt===-1){for(let zt=0;zt<A.length;zt++)if(zt>=T.length){T.push(bt),Pt=zt;break}else if(T[zt]===null){T[zt]=bt,Pt=zt;break}if(Pt===-1)break}let vt=A[Pt];vt&&vt.connect(bt)}}function X(Z,gt){gt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(gt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(n===null)return;let gt=Z.near,bt=Z.far;m.texture!==null&&(m.depthNear>0&&(gt=m.depthNear),m.depthFar>0&&(bt=m.depthFar)),z.near=N.near=C.near=gt,z.far=N.far=C.far=bt,(D!==z.near||V!==z.far)&&(n.updateRenderState({depthNear:z.near,depthFar:z.far}),D=z.near,V=z.far),z.layers.mask=Z.layers.mask|6,C.layers.mask=z.layers.mask&-5,N.layers.mask=z.layers.mask&-3;let Pt=Z.parent,vt=z.cameras;X(z,Pt);for(let zt=0;zt<vt.length;zt++)X(vt[zt],Pt);z.projectionMatrix.copy(C.projectionMatrix),z.projectionMatrixInverse.copy(C.projectionMatrixInverse),I===null&&Z.isPerspectiveCamera&&(I={camera:Z,fov:Z.fov,zoom:Z.zoom}),Q(Z,z,Pt)};function Q(Z,gt,bt){bt===null?Z.matrix.copy(gt.matrixWorld):(Z.matrix.copy(bt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(gt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(gt.projectionMatrix),Z.projectionMatrixInverse.copy(gt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=bn*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(Z){return p[Z]};let j=null;function Et(Z,gt){if(h=gt.getViewerPose(c||a),g=gt,h!==null){let bt=h.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let Pt=!1;bt.length!==z.cameras.length&&(z.cameras.length=0,Pt=!0);for(let Dt=0;Dt<bt.length;Dt++){let te=bt[Dt],ie=null;if(f!==null)ie=f.getViewport(te);else{let Ce=d.getViewSubImage(u,te);ie=Ce.viewport,Dt===0&&(t.setRenderTargetTextures(b,Ce.colorTexture,Ce.depthStencilTexture),t.setRenderTarget(b))}let Xt=F[Dt];Xt===void 0&&(Xt=new Ue,Xt.layers.enable(Dt),Xt.viewport=new le,F[Dt]=Xt),Xt.matrix.fromArray(te.transform.matrix),Xt.matrix.decompose(Xt.position,Xt.quaternion,Xt.scale),Xt.projectionMatrix.fromArray(te.projectionMatrix),Xt.projectionMatrixInverse.copy(Xt.projectionMatrix).invert(),Xt.viewport.set(ie.x,ie.y,ie.width,ie.height),Dt===0&&(z.matrix.copy(Xt.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Pt===!0&&z.cameras.push(Xt)}let vt=n.enabledFeatures;if(vt&&vt.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&y){d=i.getBinding();let Dt=d.getDepthInformation(bt[0]);Dt&&Dt.isValid&&Dt.texture&&m.init(Dt,n.renderState)}if(vt&&vt.includes("camera-access")&&y){t.state.unbindTexture(),d=i.getBinding();for(let Dt=0;Dt<bt.length;Dt++){let te=bt[Dt].camera;if(te){let ie=p[te];ie||(ie=new $s,p[te]=ie);let Xt=d.getCameraImage(te);ie.sourceTexture=Xt}}}}for(let bt=0;bt<A.length;bt++){let Pt=T[bt],vt=A[bt];Pt!==null&&vt!==void 0&&vt.update(Pt,gt,c||a)}j&&j(Z,gt),gt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:gt}),g=null}let Bt=new qu;Bt.setAnimationLoop(Et),this.setAnimationLoop=function(Z){j=Z},this.dispose=function(){}}},Dv=new Zt,id=new Ut;id.set(-1,0,0,0,1,0,0,0,1);function Lv(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,hc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,S,E,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),y(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,S,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===We&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===We&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let S=t.get(p),E=S.envMap,b=S.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(Dv.makeRotationFromEuler(b)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(id),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=E*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.diffuseRoughness>0&&(m.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=p.diffuseRoughnessMap,e(p.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===We&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){let S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Nv(s,t,e,i){let n={},r={};function a(S,E){let b=E.program;i.uniformBlockBinding(S,b,n[S.id])}function o(S,E){let b=n[S.id];b===void 0&&(g(S),b=l(S),n[S.id]=b,S.addEventListener("dispose",m));let A=E.program;i.updateUBOMapping(S,A);let T=t.render.frame;r[S.id]!==T&&(c(S),r[S.id]=T)}function l(S){let E=s.createBuffer(),b=S.__size,A=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,E),s.bufferData(s.UNIFORM_BUFFER,b,A),s.bindBuffer(s.UNIFORM_BUFFER,null),E}function c(S){let E=n[S.id],b=S.uniforms,A=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let T=0,v=b.length;T<v;T++){let M=b[T];if(Array.isArray(M))for(let I=0,C=M.length;I<C;I++)h(M[I],T,I,A);else h(M,T,0,A)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(S,E,b,A){if(u(S,E,b,A)===!0){let T=S.__offset,v=S.value;if(Array.isArray(v)){let M=0;for(let I=0;I<v.length;I++){let C=v[I],N=y(C,!0);d(C,S.__data,M),M+=N.storage/Float32Array.BYTES_PER_ELEMENT}}else d(v,S.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,T,S.__data)}}function d(S,E,b){typeof S=="number"||typeof S=="boolean"?E[b]=S:S.isMatrix3?(E[b]=S.elements[0],E[b+1]=S.elements[1],E[b+2]=S.elements[2],E[b+3]=0,E[b+4]=S.elements[3],E[b+5]=S.elements[4],E[b+6]=S.elements[5],E[b+7]=0,E[b+8]=S.elements[6],E[b+9]=S.elements[7],E[b+10]=S.elements[8],E[b+11]=0):ArrayBuffer.isView(S)?E.set(S.subarray(0,E.length-b),b):S.toArray(E,b)}function u(S,E,b,A){let T=S.value,v=E+"_"+b;if(Array.isArray(T)){A[v]===void 0&&(A[v]=[]);let M=A[v],I=!1;for(let C=0;C<T.length;C++)f(T[C],M,C)===!0&&(I=!0);return I}return f(T,A,v)}function f(S,E,b){if(E[b]===void 0)return typeof S=="number"||typeof S=="boolean"?E[b]=S:ArrayBuffer.isView(S)?E[b]=S.slice():E[b]=S.clone(),!0;{let A=E[b];if(typeof S=="number"||typeof S=="boolean"){if(A!==S)return E[b]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(A.equals(S)===!1)return A.copy(S),!0}}return!1}function g(S){let E=S.uniforms,b=0,A=16;for(let v=0,M=E.length;v<M;v++){let I=Array.isArray(E[v])?E[v]:[E[v]];for(let C=0,N=I.length;C<N;C++){let F=I[C],z=Array.isArray(F.value)?F.value:[F.value],D=Array.isArray(E[v])||Array.isArray(F.value),V=b;for(let G=0,et=z.length;G<et;G++){let X=z[G],Q=y(X,D),j=b%A,Et=j%Q.boundary,Bt=j+Et;b+=Et,Bt!==0&&A-Bt<Q.storage&&(b+=A-Bt),G===0&&(V=b),b+=Q.storage}let q=F.type==="int"?Int32Array:F.type==="uint"?Uint32Array:Float32Array;F.__data=new q((b-V)/Float32Array.BYTES_PER_ELEMENT),F.__offset=V}}let T=b%A;return T>0&&(b+=A-T),S.__size=b,S.__cache={},this}function y(S,E){let b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=16,b.storage=48):S.isMatrix4?(b.boundary=16,b.storage=64):S.isTexture?Ct("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(b.boundary=16,b.storage=S.byteLength):Ct("WebGLRenderer: Unsupported uniform value type.",S),E===!0&&(b.boundary=16,b.storage=Math.ceil(b.storage/16)*16),b}function m(S){let E=S.target;E.removeEventListener("dispose",m),s.deleteBuffer(n[E.id]),delete n[E.id],delete r[E.id]}function p(){for(let S in n)s.deleteBuffer(n[S]);n={},r={}}return{bind:a,update:o,dispose:p}}var Uv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Li=null;function Fv(){return Li===null&&(Li=new Vs(Uv,16,16,dn,gi),Li.name="DFG_LUT",Li.minFilter=He,Li.magFilter=He,Li.wrapS=Mi,Li.wrapT=Mi,Li.generateMipmaps=!1,Li.needsUpdate=!0),Li}var Oo=class{constructor(t={}){let{canvas:e=gu(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=$e}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let y=f,m=new Set([to,ja,Qa]),p=new Set([$e,mi,ds,Cn,Za,Ja]),S=new Uint32Array(4),E=new Int32Array(4),b={textures:[],min:[],max:[],resolution:[]},A=null,T=null,v=[],M=[],I=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,N=!1,F=null,z=null,D=null,V=null;this._outputColorSpace=ve;let q=0,G=0,et=null,X=-1,Q=null,j=new le,Et=new le,Bt=null,Z=new Nt(0),gt=0,bt=e.width,Pt=e.height,vt=1,zt=null,pe=null,Dt=new le(0,0,bt,Pt),te=new le(0,0,bt,Pt),ie=!1,Xt=new on,Ce=new ya,ye=!1,Ye=!1,ce=new Zt,_i=new R,Me=new le,ti={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ei=!1;function ii(){return et===null?vt:1}let U=i;function ni(_,L){return e.getContext(_,L)}let ae,oe,dt,_e,It,Ft,w,x,B,tt,K,st,ht,Y,$,at,P,J,W,ot,nt,rt,At;try{let _={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Rt,!1),e.addEventListener("webglcontextrestored",Ht,!1),e.addEventListener("webglcontextcreationerror",pt,!1),U===null){let L="webgl2";if(U=ni(L,_),U===null)throw ni(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Gt()}catch(_){throw e.removeEventListener("webglcontextlost",Rt,!1),e.removeEventListener("webglcontextrestored",Ht,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),Lt("WebGLRenderer: "+_.message),_}function Gt(){ae=new Yg(U),ae.init(),nt=new Cv(U,ae),oe=new Fg(U,ae,t,nt),dt=new Av(U,ae),oe.reversedDepthBuffer&&u&&dt.buffers.depth.setReversed(!0),z=U.createFramebuffer(),D=U.createFramebuffer(),V=U.createFramebuffer(),_e=new Jg(U),It=new fv,Ft=new Rv(U,ae,dt,It,oe,nt,_e),w=new qg(C),x=new Qf(U),rt=new Ng(U,x),B=new $g(U,x,_e,rt),tt=new Qg(U,B,x,rt,_e),J=new Kg(U,oe,Ft),$=new Og(It),K=new dv(C,w,ae,oe,rt,$),st=new Lv(C,It),ht=new mv,Y=new bv(ae),P=new Lg(C,w,dt,tt,g,l),at=new Tv(C,tt,oe),At=new Nv(U,_e,oe,dt),W=new Ug(U,ae,_e),ot=new Zg(U,ae,_e),_e.programs=K.programs,C.capabilities=oe,C.extensions=ae,C.properties=It,C.renderLists=ht,C.shadowMap=at,C.state=dt,C.info=_e}y!==$e&&(I=new t0(y,e.width,e.height,o,n,r));let it=new Rc(C,U);this.xr=it,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let _=ae.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=ae.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return vt},this.setPixelRatio=function(_){_!==void 0&&(vt=_,this.setSize(bt,Pt,!1))},this.getSize=function(_){return _.set(bt,Pt)},this.setSize=function(_,L,H=!0){if(it.isPresenting){Ct("WebGLRenderer: Can't change size while VR device is presenting.");return}bt=_,Pt=L,e.width=Math.floor(_*vt),e.height=Math.floor(L*vt),H===!0&&(e.style.width=_+"px",e.style.height=L+"px"),I!==null&&I.setSize(e.width,e.height),this.setViewport(0,0,_,L)},this.getDrawingBufferSize=function(_){return _.set(bt*vt,Pt*vt).floor()},this.setDrawingBufferSize=function(_,L,H){bt=_,Pt=L,vt=H,e.width=Math.floor(_*H),e.height=Math.floor(L*H),this.setViewport(0,0,_,L)},this.setEffects=function(_){if(y===$e){Lt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(_){for(let L=0;L<_.length;L++)if(_[L].isOutputPass===!0){Ct("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(_||[])},this.getCurrentViewport=function(_){return _.copy(j)},this.getViewport=function(_){return _.copy(Dt)},this.setViewport=function(_,L,H,O){_.isVector4?Dt.set(_.x,_.y,_.z,_.w):Dt.set(_,L,H,O),dt.viewport(j.copy(Dt).multiplyScalar(ii()).round())},this.getScissor=function(_){return _.copy(te)},this.setScissor=function(_,L,H,O){_.isVector4?te.set(_.x,_.y,_.z,_.w):te.set(_,L,H,O),dt.scissor(Et.copy(te).multiplyScalar(ii()).round())},this.getScissorTest=function(){return ie},this.setScissorTest=function(_){dt.setScissorTest(ie=_)},this.setOpaqueSort=function(_){zt=_},this.setTransparentSort=function(_){pe=_},this.getClearColor=function(_){return _.copy(P.getClearColor())},this.setClearColor=function(){P.setClearColor(...arguments)},this.getClearAlpha=function(){return P.getClearAlpha()},this.setClearAlpha=function(){P.setClearAlpha(...arguments)},this.clear=function(_=!0,L=!0,H=!0){let O=0;if(_){let k=!1;if(et!==null){let ut=et.texture.format;k=m.has(ut)}if(k){let ut=et.texture.type,yt=p.has(ut),ct=P.getClearColor(),xt=P.getClearAlpha(),Tt=ct.r,kt=ct.g,qt=ct.b;yt?(S[0]=Tt,S[1]=kt,S[2]=qt,S[3]=xt,U.clearBufferuiv(U.COLOR,0,S)):(E[0]=Tt,E[1]=kt,E[2]=qt,E[3]=xt,U.clearBufferiv(U.COLOR,0,E))}else O|=U.COLOR_BUFFER_BIT}L&&(O|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(O|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&U.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(_){_.setRenderer(this),F=_},this.dispose=function(){e.removeEventListener("webglcontextlost",Rt,!1),e.removeEventListener("webglcontextrestored",Ht,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),P.dispose(),ht.dispose(),Y.dispose(),Ft.dispose(),It.dispose(),w.dispose(),tt.dispose(),B.dispose(),rt.dispose(),At.dispose(),K.dispose(),it.dispose(),it.removeEventListener("sessionstart",zc),it.removeEventListener("sessionend",Hc),pn.stop()};function Rt(_){_.preventDefault(),Us("WebGLRenderer: Context Lost."),N=!0}function Ht(){Us("WebGLRenderer: Context Restored."),N=!1;let _=_e.autoReset,L=at.enabled,H=at.autoUpdate,O=at.needsUpdate,k=at.type;Gt(),_e.autoReset=_,at.enabled=L,at.autoUpdate=H,at.needsUpdate=O,at.type=k}function pt(_){Lt("WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function ee(_){let L=_.target;L.removeEventListener("dispose",ee),we(L)}function we(_){ji(_),It.remove(_)}function ji(_){let L=It.get(_).programs;L!==void 0&&(L.forEach(function(H){K.releaseProgram(H)}),_.isShaderMaterial&&K.releaseShaderCache(_))}this.renderBufferDirect=function(_,L,H,O,k,ut){L===null&&(L=ti);let yt=k.isMesh&&k.matrixWorld.determinantAffine()<0,ct=Fd(_,L,H,O,k);dt.setMaterial(O,yt);let xt=H.index,Tt=1;if(O.wireframe===!0){if(xt=B.getWireframeAttribute(H),xt===void 0)return;Tt=2}let kt=H.drawRange,qt=H.attributes.position,St=kt.start*Tt,Yt=(kt.start+kt.count)*Tt;ut!==null&&(St=Math.max(St,ut.start*Tt),Yt=Math.min(Yt,(ut.start+ut.count)*Tt)),xt!==null?(St=Math.max(St,0),Yt=Math.min(Yt,xt.count)):qt!=null&&(St=Math.max(St,0),Yt=Math.min(Yt,qt.count));let me=Yt-St;if(me<0||me===1/0)return;rt.setup(k,O,ct,H,xt);let se,ne=W;if(xt!==null&&(se=x.get(xt),ne=ot,ne.setIndex(se)),k.isMesh)O.wireframe===!0?(dt.setLineWidth(O.wireframeLinewidth*ii()),ne.setMode(U.LINES)):ne.setMode(U.TRIANGLES);else if(k.isLine){let Ie=O.linewidth;Ie===void 0&&(Ie=1),dt.setLineWidth(Ie*ii()),k.isLineSegments?ne.setMode(U.LINES):k.isLineLoop?ne.setMode(U.LINE_LOOP):ne.setMode(U.LINE_STRIP)}else k.isPoints?ne.setMode(U.POINTS):k.isSprite&&ne.setMode(U.TRIANGLES);if(k.isBatchedMesh)if(ae.get("WEBGL_multi_draw"))ne.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Ie=k._multiDrawStarts,Mt=k._multiDrawCounts,Be=k._multiDrawCount,Qt=xt?x.get(xt).bytesPerElement:1,mn=It.get(O).currentProgram.getUniforms();for(let De=0;De<Be;De++)mn.setValue(U,"_gl_DrawID",De),ne.render(Ie[De]/Qt,Mt[De])}else if(k.isInstancedMesh)ne.renderInstances(St,me,k.count);else if(H.isInstancedBufferGeometry){let Ie=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Mt=Math.min(H.instanceCount,Ie);ne.renderInstances(St,me,Mt)}else ne.render(St,me)};function kc(_,L,H,O){F!==null&&_.isNodeMaterial&&F.setObject(O,_),ye===!0&&$.setState(_,H,!1),_.transparent===!0&&_.side===Xe&&_.forceSinglePass===!1?(_.side=We,_.needsUpdate=!0,gs(_,L,O),_.side=Ii,_.needsUpdate=!0,gs(_,L,O),_.side=Xe):gs(_,L,O)}this.compile=function(_,L,H=null){H===null&&(H=_),F!==null&&F.renderStart(_,L,H),T=Y.get(H),T.init(L),M.push(T),H.traverseVisible(function(k){k.isLight&&k.layers.test(L.layers)&&(T.pushLight(k),k.castShadow&&T.pushShadow(k))}),_!==H&&_.traverseVisible(function(k){k.isLight&&k.layers.test(L.layers)&&(T.pushLight(k),k.castShadow&&T.pushShadow(k))}),T.setupLights(),F!==null&&F.updateLights(T.state.lightsArray),Ye=this.localClippingEnabled,ye=$.init(this.clippingPlanes,Ye),ye===!0&&$.setGlobalState(this.clippingPlanes,L),F!==null&&at.render(T.state.shadowsArray,H,L);let O=new Set;return _.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let ut=k.material;if(ut)if(Array.isArray(ut))for(let yt=0;yt<ut.length;yt++){let ct=ut[yt];kc(ct,H,L,k),O.add(ct)}else kc(ut,H,L,k),O.add(ut)}),T=M.pop(),F!==null&&F.renderEnd(),O},this.compileAsync=function(_,L,H=null){let O=this.compile(_,L,H);return new Promise(k=>{function ut(){if(O.forEach(function(yt){let xt=It.get(yt).currentProgram;(xt===void 0||xt.isReady())&&O.delete(yt)}),O.size===0){k(_);return}setTimeout(ut,10)}ae.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let Yo=null;function Nd(_){Yo&&Yo(_)}function zc(){pn.stop()}function Hc(){pn.start()}let pn=new qu;pn.setAnimationLoop(Nd),typeof self<"u"&&pn.setContext(self),this.setAnimationLoop=function(_){Yo=_,it.setAnimationLoop(_),_===null?pn.stop():pn.start()},it.addEventListener("sessionstart",zc),it.addEventListener("sessionend",Hc),this.render=function(_,L){if(L!==void 0&&L.isCamera!==!0){Lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;F!==null&&F.renderStart(_,L);let H=it.enabled===!0&&it.isPresenting===!0,O=I!==null&&(et===null||H)&&I.begin(C,et);if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(it.cameraAutoUpdate===!0&&it.updateCamera(L),L=it.getCamera()),_.isScene===!0&&_.onBeforeRender(C,_,L,et),T=Y.get(_,M.length),T.init(L),T.state.textureUnits=Ft.getTextureUnits(),M.push(T),ce.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),L.isArrayCamera?Ce.setFromArrayCamera(L):Xt.setFromProjectionMatrix(ce,ai,L.reversedDepth),Ye=this.localClippingEnabled,ye=$.init(this.clippingPlanes,Ye),A=ht.get(_,v.length),A.init(),v.push(A),this.info.render.frame++,it.enabled===!0&&it.isPresenting===!0){let yt=C.xr.getDepthSensingMesh();yt!==null&&$o(yt,L,-1/0,C.sortObjects)}$o(_,L,0,C.sortObjects),A.finish(),F!==null&&F.updateLights(T.state.lightsArray),C.sortObjects===!0&&A.sort(zt,pe),ei=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,ei&&P.addToRenderList(A,_),this.info.autoReset===!0&&this.info.reset(),ye===!0&&$.beginShadows();let k=T.state.shadowsArray;if(at.render(k,_,L),ye===!0&&$.endShadows(),(O&&I.hasRenderPass())===!1){let yt=A.opaque,ct=A.transmissive;if(T.setupLights(),L.isArrayCamera){let xt=L.cameras;if(ct.length>0)for(let Tt=0,kt=xt.length;Tt<kt;Tt++){let qt=xt[Tt];Vc(yt,ct,_,qt)}ei&&P.render(_);for(let Tt=0,kt=xt.length;Tt<kt;Tt++){let qt=xt[Tt];Gc(A,_,qt,qt.viewport)}}else ct.length>0&&Vc(yt,ct,_,L),ei&&P.render(_),Gc(A,_,L)}et!==null&&G===0&&(Ft.updateMultisampleRenderTarget(et),Ft.updateRenderTargetMipmap(et)),O&&I.end(C),_.isScene===!0&&_.onAfterRender(C,_,L),rt.resetDefaultState(),X=-1,Q=null,M.pop(),M.length>0?(T=M[M.length-1],Ft.setTextureUnits(T.state.textureUnits),ye===!0&&$.setGlobalState(C.clippingPlanes,T.state.camera)):T=null,v.pop(),v.length>0?A=v[v.length-1]:A=null,F!==null&&F.renderEnd()};function $o(_,L,H,O){if(_.visible===!1)return;if(_.layers.test(L.layers)){if(_.isGroup)H=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(L);else if(_.isLight)T.pushLight(_),_.castShadow&&T.pushShadow(_);else if(_.isSprite){let yt=L.isArrayCamera?Ce:Xt;if(!_.frustumCulled||_.intersectsFrustum(yt)){O&&Me.setFromMatrixPosition(_.matrixWorld).applyMatrix4(ce);let ct=tt.update(_),xt=_.material;xt.visible&&A.push(_,ct,xt,H,Me.z,null,L)}}else if(_.isMesh||_.isLine||_.isPoints){let yt=L.isArrayCamera?Ce:Xt;if(!_.frustumCulled||_.intersectsFrustum(yt)){let ct=tt.update(_),xt=_.material;if(O&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),Me.copy(_.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Me.copy(ct.boundingSphere.center)),Me.applyMatrix4(_.matrixWorld).applyMatrix4(ce)),Array.isArray(xt)){let Tt=ct.groups;for(let kt=0,qt=Tt.length;kt<qt;kt++){let St=Tt[kt],Yt=xt[St.materialIndex];Yt&&Yt.visible&&A.push(_,ct,Yt,H,Me.z,St,L)}}else xt.visible&&A.push(_,ct,xt,H,Me.z,null,L)}}}let ut=_.children;for(let yt=0,ct=ut.length;yt<ct;yt++)$o(ut[yt],L,H,O)}function Gc(_,L,H,O){let{opaque:k,transmissive:ut,transparent:yt}=_;T.setupLightsView(H),ye===!0&&$.setGlobalState(C.clippingPlanes,H),O&&dt.viewport(j.copy(O)),k.length>0&&br(k,L,H),ut.length>0&&br(ut,L,H),yt.length>0&&br(yt,L,H),dt.buffers.depth.setTest(!0),dt.buffers.depth.setMask(!0),dt.buffers.color.setMask(!0),dt.setPolygonOffset(!1)}function Vc(_,L,H,O){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[O.id]===void 0){let St=ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[O.id]=new Qe(1,1,{generateMipmaps:!0,type:St?gi:$e,minFilter:Ji,samples:Math.max(4,oe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:$t.workingColorSpace})}let ut=T.state.transmissionRenderTarget[O.id],yt=O.viewport||j;ut.setSize(yt.z*C.transmissionResolutionScale,yt.w*C.transmissionResolutionScale);let ct=C.getRenderTarget(),xt=C.getActiveCubeFace(),Tt=C.getActiveMipmapLevel();C.setRenderTarget(ut),C.getClearColor(Z),gt=C.getClearAlpha(),gt<1&&C.setClearColor(16777215,.5),C.clear(),ei&&P.render(H);let kt=C.toneMapping;C.toneMapping=Di;let qt=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),T.setupLightsView(O),ye===!0&&$.setGlobalState(C.clippingPlanes,O),br(_,H,O),Ft.updateMultisampleRenderTarget(ut),Ft.updateRenderTargetMipmap(ut),ae.has("WEBGL_multisampled_render_to_texture")===!1){let St=!1;for(let Yt=0,me=L.length;Yt<me;Yt++){let se=L[Yt],{object:ne,geometry:Ie,material:Mt,group:Be}=se;if(Mt.side===Xe&&ne.layers.test(O.layers)){let Qt=Mt.side;Mt.side=We,Mt.needsUpdate=!0,Wc(ne,H,O,Ie,Mt,Be),Mt.side=Qt,Mt.needsUpdate=!0,St=!0}}St===!0&&(Ft.updateMultisampleRenderTarget(ut),Ft.updateRenderTargetMipmap(ut))}C.setRenderTarget(ct,xt,Tt),C.setClearColor(Z,gt),qt!==void 0&&(O.viewport=qt),C.toneMapping=kt}function br(_,L,H){let O=L.isScene===!0?L.overrideMaterial:null;for(let k=0,ut=_.length;k<ut;k++){let yt=_[k],{object:ct,geometry:xt,group:Tt}=yt,kt=yt.material;kt.allowOverride===!0&&O!==null&&(kt=O),ct.layers.test(H.layers)&&Wc(ct,L,H,xt,kt,Tt)}}function Wc(_,L,H,O,k,ut){F!==null&&k.isNodeMaterial&&F.setObject(_,k),_.onBeforeRender(C,L,H,O,k,ut),_.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),k.onBeforeRender(C,L,H,O,_,ut),k.transparent===!0&&k.side===Xe&&k.forceSinglePass===!1?(k.side=We,k.needsUpdate=!0,C.renderBufferDirect(H,L,O,k,_,ut),k.side=Ii,k.needsUpdate=!0,C.renderBufferDirect(H,L,O,k,_,ut),k.side=Xe):C.renderBufferDirect(H,L,O,k,_,ut),_.onAfterRender(C,L,H,O,k,ut)}function Xc(_){let L=0;for(let H of _)H.texture!==null&&L++;return L}function gs(_,L,H){L.isScene!==!0&&(L=ti);let O=It.get(_),k=T.state.lights,ut=T.state.shadowsArray,yt=k.state.version,ct=K.getParameters(_,k.state,ut,L,H,T.state.lightProbeGridArray),xt=K.getProgramCacheKey(ct),Tt=O.programs;O.environment=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?L.environment:null,O.fog=L.fog;let kt=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap;O.envMap=w.get(_.envMap||O.environment,kt),O.envMapRotation=O.environment!==null&&_.envMap===null?L.environmentRotation:_.envMapRotation,Tt===void 0&&(_.addEventListener("dispose",ee),Tt=new Map,O.programs=Tt,O.programVariants=new Map);let qt=Tt.get(xt);if(qt!==void 0){if(O.currentProgram===qt&&O.lightsStateVersion===yt)return Yc(_,ct),qt}else ct.uniforms=K.getUniforms(_),F!==null&&_.isNodeMaterial&&F.build(_,H,ct),_.onBeforeCompile(ct,C),qt=K.acquireProgram(ct,xt),Tt.set(xt,qt),O.uniforms=ct.uniforms;let St=O.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(St.clippingPlanes=$.uniform),Yc(_,ct),O.needsLights=Bd(_),O.lightsStateVersion=yt,O.needsLights&&(St.ambientLightColor.value=k.state.ambient,St.lightProbe.value=k.state.probe,St.sunLights.value=k.state.sun,St.sunLightShadows.value=k.state.sunShadow,St.directionalLights.value=k.state.directional,St.directionalLightShadows.value=k.state.directionalShadow,St.spotLights.value=k.state.spot,St.spotLightShadows.value=k.state.spotShadow,St.rectAreaLights.value=k.state.rectArea,St.ltc_1.value=k.state.rectAreaLTC1,St.ltc_2.value=k.state.rectAreaLTC2,St.pointLights.value=k.state.point,St.pointLightShadows.value=k.state.pointShadow,St.hemisphereLights.value=k.state.hemi,St.sunShadowMatrix.value=k.state.sunShadowMatrix,St.sunShadowCascade.value=k.state.sunShadowCascade,St.directionalShadowMatrix.value=k.state.directionalShadowMatrix,St.spotLightMatrix.value=k.state.spotLightMatrix,St.spotLightMap.value=k.state.spotLightMap,St.pointShadowMatrix.value=k.state.pointShadowMatrix),O.numLightProbeGrids=Xc(T.state.lightProbeGridArray),O.currentProgram=qt,O.uniformsList=null,qt}function Ud(_,L,H,O,k){let ut=It.get(_),yt=ut.currentProgram.id+","+O+","+k,ct=ut.programVariants.get(yt);return ct===void 0?(ct=gs(_,L,H),ut.programVariants.set(yt,ct)):(ut.currentProgram=ct,ut.uniformsList=null,ut.outputColorSpace=O,ut.toneMapping=k),ct}function qc(_){if(_.uniformsList===null){let L=_.currentProgram.getUniforms();_.uniformsList=fs.seqWithValue(L.seq,_.uniforms)}return _.uniformsList}function Yc(_,L){let H=It.get(_);H.outputColorSpace=L.outputColorSpace,H.batching=L.batching,H.batchingColor=L.batchingColor,H.instancing=L.instancing,H.instancingColor=L.instancingColor,H.instancingMorph=L.instancingMorph,H.skinning=L.skinning,H.morphTargets=L.morphTargets,H.morphNormals=L.morphNormals,H.morphColors=L.morphColors,H.morphTargetsCount=L.morphTargetsCount,H.numClippingPlanes=L.numClippingPlanes,H.numIntersection=L.numClipIntersection,H.vertexAlphas=L.vertexAlphas,H.vertexTangents=L.vertexTangents,H.toneMapping=L.toneMapping}function Fd(_,L,H,O,k){L.isScene!==!0&&(L=ti),Ft.resetTextureUnits();let ut=L.fog,yt=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?L.environment:null,ct=et===null?C.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:$t.workingColorSpace,xt=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Tt=w.get(O.envMap||yt,xt),kt=O.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,qt=!!H.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),St=!!H.morphAttributes.position,Yt=!!H.morphAttributes.normal,me=!!H.morphAttributes.color,se=Di;O.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(se=C.toneMapping);let ne=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ie=ne!==void 0?ne.length:0,Mt=It.get(O),Be=T.state.lights;if(ye===!0&&(Ye===!0||_!==Q)){let he=_===Q&&O.id===X;$.setState(O,_,he)}let Qt=!1,mn=!1;O.version===Mt.__version?Mt.needsLights&&Mt.lightsStateVersion!==Be.state.version||k.isBatchedMesh&&Mt.batching===!1||!k.isBatchedMesh&&Mt.batching===!0||k.isBatchedMesh&&Mt.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&Mt.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&Mt.instancing===!1||!k.isInstancedMesh&&Mt.instancing===!0||k.isSkinnedMesh&&Mt.skinning===!1||!k.isSkinnedMesh&&Mt.skinning===!0||k.isInstancedMesh&&Mt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Mt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Mt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Mt.instancingMorph===!1&&k.morphTexture!==null||Mt.envMap!==Tt||O.fog===!0&&Mt.fog!==ut||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==$.numPlanes||Mt.numIntersection!==$.numIntersection)||Mt.vertexAlphas!==kt||Mt.vertexTangents!==qt||Mt.morphTargets!==St||Mt.morphNormals!==Yt||Mt.morphColors!==me||Mt.morphTargetsCount!==Ie||Mt.numLightProbeGrids!==Xc(T.state.lightProbeGridArray)?Qt=!0:(Mt.outputColorSpace!==ct||Mt.toneMapping!==se)&&(mn=!0):(Qt=!0,Mt.__version=O.version);let De=Mt.currentProgram;(Qt===!0||mn===!0)&&(De=mn===!0?Ud(O,L,k,ct,se):gs(O,L,k),F&&O.isNodeMaterial&&F.onUpdateProgram(O,De,Mt));let Sr=!1,tn=!1,gn=!1,Kt=De.getUniforms(),Pe=Mt.uniforms;if(dt.useProgram(De.program)&&(Sr=!0,tn=!0,gn=!0),O.id!==X&&(X=O.id,tn=!0),Sr||Q!==_){dt.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),Kt.setValue(U,"projectionMatrix",_.projectionMatrix),Kt.setValue(U,"viewMatrix",_.matrixWorldInverse);let Ee=Kt.map.cameraPosition;Ee!==void 0&&Ee.setValue(U,_i.setFromMatrixPosition(_.matrixWorld)),oe.logarithmicDepthBuffer&&Kt.setValue(U,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&Kt.setValue(U,"isOrthographic",_.isOrthographicCamera===!0),Q!==_&&(Q=_,tn=!0,gn=!0)}if(Mt.needsLights&&(Be.state.sunShadowMap.length>0&&Kt.setValue(U,"sunShadowMap",Be.state.sunShadowMap,Ft),Be.state.directionalShadowMap.length>0&&Kt.setValue(U,"directionalShadowMap",Be.state.directionalShadowMap,Ft),Be.state.spotShadowMap.length>0&&Kt.setValue(U,"spotShadowMap",Be.state.spotShadowMap,Ft),Be.state.pointShadowMap.length>0&&Kt.setValue(U,"pointShadowMap",Be.state.pointShadowMap,Ft)),k.isSkinnedMesh){Kt.setOptional(U,k,"bindMatrix"),Kt.setOptional(U,k,"bindMatrixInverse");let he=k.skeleton;he&&(he.boneTexture===null&&he.computeBoneTexture(),Kt.setValue(U,"boneTexture",he.boneTexture,Ft))}k.isBatchedMesh&&(Kt.setOptional(U,k,"batchingTexture"),Kt.setValue(U,"batchingTexture",k._matricesTexture,Ft),Kt.setOptional(U,k,"batchingIdTexture"),Kt.setValue(U,"batchingIdTexture",k._indirectTexture,Ft),Kt.setOptional(U,k,"batchingColorTexture"),k._colorsTexture!==null&&Kt.setValue(U,"batchingColorTexture",k._colorsTexture,Ft));let hi=H.morphAttributes;if((hi.position!==void 0||hi.normal!==void 0||hi.color!==void 0)&&J.update(k,H,De),(tn||Mt.receiveShadow!==k.receiveShadow)&&(Mt.receiveShadow=k.receiveShadow,Kt.setValue(U,"receiveShadow",k.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&L.environment!==null&&(Pe.envMapIntensity.value=L.environmentIntensity),Pe.dfgLUT!==void 0&&(Pe.dfgLUT.value=Fv()),tn){if(Kt.setValue(U,"toneMappingExposure",C.toneMappingExposure),Mt.needsLights&&Od(Pe,gn),ut&&O.fog===!0&&st.refreshFogUniforms(Pe,ut),st.refreshMaterialUniforms(Pe,O,vt,Pt,T.state.transmissionRenderTarget[_.id]),Mt.needsLights&&Mt.numLightProbeGrids>0){let he=b,Ee=0;for(let Ui of T.state.lightProbeGridArray)Ui.texture!==null&&(he.textures[Ee]=Ui.texture,he.min[Ee]=Ui.boundingBox.min,he.max[Ee]=Ui.boundingBox.max,he.resolution[Ee]=Ui.resolution,Ee++);for(let Ui in he)he[Ui].length=Ee;Pe.probesSH.value=he.textures,Pe.probesMin.value=he.min,Pe.probesMax.value=he.max,Pe.probesResolution.value=he.resolution}fs.upload(U,qc(Mt),Pe,Ft)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(fs.upload(U,qc(Mt),Pe,Ft),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&Kt.setValue(U,"center",k.center),Kt.setValue(U,"modelViewMatrix",k.modelViewMatrix),Kt.setValue(U,"normalMatrix",k.normalMatrix),Kt.setValue(U,"modelMatrix",k.matrixWorld),O.uniformsGroups!==void 0){let he=O.uniformsGroups;for(let Ee=0,Ui=he.length;Ee<Ui;Ee++){let Zc=he[Ee];At.update(Zc,De),At.bind(Zc,De)}}return De}function Od(_,L){_.ambientLightColor.needsUpdate=L,_.lightProbe.needsUpdate=L,_.sunLights.needsUpdate=L,_.sunLightShadows.needsUpdate=L,_.directionalLights.needsUpdate=L,_.directionalLightShadows.needsUpdate=L,_.pointLights.needsUpdate=L,_.pointLightShadows.needsUpdate=L,_.spotLights.needsUpdate=L,_.spotLightShadows.needsUpdate=L,_.rectAreaLights.needsUpdate=L,_.hemisphereLights.needsUpdate=L}function Bd(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(_,L,H){let O=It.get(_);O.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),It.get(_.texture).__webglTexture=L,It.get(_.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:H,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,L){let H=It.get(_);H.__webglFramebuffer=L,H.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(_,L=0,H=0){et=_,q=L,G=H;let O=null,k=!1,ut=!1;if(_){let ct=It.get(_);if(ct.__useDefaultFramebuffer!==void 0){dt.bindFramebuffer(U.FRAMEBUFFER,ct.__webglFramebuffer),j.copy(_.viewport),Et.copy(_.scissor),Bt=_.scissorTest,dt.viewport(j),dt.scissor(Et),dt.setScissorTest(Bt),X=-1;return}else if(ct.__webglFramebuffer===void 0)Ft.setupRenderTarget(_);else if(ct.__hasExternalTextures)Ft.rebindTextures(_,It.get(_.texture).__webglTexture,It.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let kt=_.depthTexture;if(ct.__boundDepthTexture!==kt){if(kt!==null&&It.has(kt)&&(_.width!==kt.image.width||_.height!==kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ft.setupDepthRenderbuffer(_)}}let xt=_.texture;(xt.isData3DTexture||xt.isDataArrayTexture||xt.isCompressedArrayTexture)&&(ut=!0);let Tt=It.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(Tt[L])?O=Tt[L][H]:O=Tt[L],k=!0):_.samples>0&&Ft.useMultisampledRTT(_)===!1?O=It.get(_).__webglMultisampledFramebuffer:Array.isArray(Tt)?O=Tt[H]:O=Tt,j.copy(_.viewport),Et.copy(_.scissor),Bt=_.scissorTest}else j.copy(Dt).multiplyScalar(vt).floor(),Et.copy(te).multiplyScalar(vt).floor(),Bt=ie;if(H!==0&&(O=z),dt.bindFramebuffer(U.FRAMEBUFFER,O)&&dt.drawBuffers(_,O),dt.viewport(j),dt.scissor(Et),dt.setScissorTest(Bt),k){let ct=It.get(_.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+L,ct.__webglTexture,H)}else if(ut){let ct=L;for(let xt=0;xt<_.textures.length;xt++){let Tt=It.get(_.textures[xt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+xt,Tt.__webglTexture,H,ct)}}else if(_!==null&&H!==0){let ct=It.get(_.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ct.__webglTexture,H)}X=-1};function $c(_){let L=It.get(_);return(L.__readFormat!==_.format||L.__readType!==_.type)&&(L.__readFormat=_.format,L.__readType=_.type,L.__formatReadable=oe.textureFormatReadable(_.format),L.__typeReadable=oe.textureTypeReadable(_.type)),L}this.readRenderTargetPixels=function(_,L,H,O,k,ut,yt,ct=0){if(!(_&&_.isWebGLRenderTarget)){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xt=It.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&yt!==void 0&&(xt=xt[yt],Array.isArray(xt)&&(xt=xt[0])),xt){dt.bindFramebuffer(U.FRAMEBUFFER,xt);try{let Tt=_.textures[ct],kt=Tt.format,qt=Tt.type;_.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ct);let St=$c(Tt);if(St.__formatReadable===!1){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(St.__typeReadable===!1){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=_.width-O&&H>=0&&H<=_.height-k&&U.readPixels(L,H,O,k,nt.convert(kt),nt.convert(qt),ut)}finally{let Tt=et!==null?It.get(et).__webglFramebuffer:null;dt.bindFramebuffer(U.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(_,L,H,O,k,ut,yt,ct=0){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xt=It.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&yt!==void 0&&(xt=xt[yt],Array.isArray(xt)&&(xt=xt[0])),xt)if(L>=0&&L<=_.width-O&&H>=0&&H<=_.height-k){dt.bindFramebuffer(U.FRAMEBUFFER,xt);let Tt=_.textures[ct],kt=Tt.format,qt=Tt.type;_.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ct);let St=$c(Tt);if(St.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(St.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Yt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Yt),U.bufferData(U.PIXEL_PACK_BUFFER,ut.byteLength,U.STREAM_READ),U.readPixels(L,H,O,k,nt.convert(kt),nt.convert(qt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let me=et!==null?It.get(et).__webglFramebuffer:null;dt.bindFramebuffer(U.FRAMEBUFFER,me);let se=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await xu(U,se,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Yt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ut),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(Yt),U.deleteSync(se),ut}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(_,L=null,H=0){let O=Math.pow(2,-H),k=Math.floor(_.image.width*O),ut=Math.floor(_.image.height*O),yt=L!==null?L.x:0,ct=L!==null?L.y:0;Ft.setTexture2D(_,0),U.copyTexSubImage2D(U.TEXTURE_2D,H,0,0,yt,ct,k,ut),dt.unbindTexture()},this.copyTextureToTexture=function(_,L,H=null,O=null,k=0,ut=0){let yt,ct,xt,Tt,kt,qt,St,Yt,me,se=_.isCompressedTexture?_.mipmaps[ut]:_.image;if(H!==null)yt=H.max.x-H.min.x,ct=H.max.y-H.min.y,xt=H.isBox3?H.max.z-H.min.z:1,Tt=H.min.x,kt=H.min.y,qt=H.isBox3?H.min.z:0;else{let Kt=Math.pow(2,-k);yt=Math.floor(se.width*Kt),ct=Math.floor(se.height*Kt),_.isDataArrayTexture?xt=se.depth:_.isData3DTexture?xt=Math.floor(se.depth*Kt):xt=1,Tt=0,kt=0,qt=0}O!==null?(St=O.x,Yt=O.y,me=O.z):(St=0,Yt=0,me=0);let ne=nt.convert(L.format),Ie=nt.convert(L.type),Mt;L.isData3DTexture?(Ft.setTexture3D(L,0),Mt=U.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(Ft.setTexture2DArray(L,0),Mt=U.TEXTURE_2D_ARRAY):(Ft.setTexture2D(L,0),Mt=U.TEXTURE_2D),dt.activeTexture(U.TEXTURE0),dt.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,L.flipY),dt.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),dt.pixelStorei(U.UNPACK_ALIGNMENT,L.unpackAlignment);let Be=dt.getParameter(U.UNPACK_ROW_LENGTH),Qt=dt.getParameter(U.UNPACK_IMAGE_HEIGHT),mn=dt.getParameter(U.UNPACK_SKIP_PIXELS),De=dt.getParameter(U.UNPACK_SKIP_ROWS),Sr=dt.getParameter(U.UNPACK_SKIP_IMAGES);dt.pixelStorei(U.UNPACK_ROW_LENGTH,se.width),dt.pixelStorei(U.UNPACK_IMAGE_HEIGHT,se.height),dt.pixelStorei(U.UNPACK_SKIP_PIXELS,Tt),dt.pixelStorei(U.UNPACK_SKIP_ROWS,kt),dt.pixelStorei(U.UNPACK_SKIP_IMAGES,qt);let tn=_.isDataArrayTexture||_.isData3DTexture,gn=L.isDataArrayTexture||L.isData3DTexture;if(_.isDepthTexture){let Kt=It.get(_),Pe=It.get(L),hi=It.get(Kt.__renderTarget),he=It.get(Pe.__renderTarget);dt.bindFramebuffer(U.READ_FRAMEBUFFER,hi.__webglFramebuffer),dt.bindFramebuffer(U.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let Ee=0;Ee<xt;Ee++)tn&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,It.get(_).__webglTexture,k,qt+Ee),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,It.get(L).__webglTexture,ut,me+Ee)),U.blitFramebuffer(Tt,kt,Tt+yt,kt+ct,St,Yt,St+yt,Yt+ct,U.DEPTH_BUFFER_BIT,U.NEAREST);dt.bindFramebuffer(U.READ_FRAMEBUFFER,null),dt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(k!==0||_.isRenderTargetTexture||It.has(_)){let Kt=It.get(_),Pe=It.get(L);dt.bindFramebuffer(U.READ_FRAMEBUFFER,D),dt.bindFramebuffer(U.DRAW_FRAMEBUFFER,V);for(let hi=0;hi<xt;hi++)tn?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Kt.__webglTexture,k,qt+hi):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Kt.__webglTexture,k),gn?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pe.__webglTexture,ut,me+hi):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Pe.__webglTexture,ut),k!==0?U.blitFramebuffer(Tt,kt,Tt+yt,kt+ct,St,Yt,St+yt,Yt+ct,U.COLOR_BUFFER_BIT,U.NEAREST):gn?U.copyTexSubImage3D(Mt,ut,St,Yt,me+hi,Tt,kt,yt,ct):U.copyTexSubImage2D(Mt,ut,St,Yt,Tt,kt,yt,ct);dt.bindFramebuffer(U.READ_FRAMEBUFFER,null),dt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else gn?_.isDataTexture||_.isData3DTexture?U.texSubImage3D(Mt,ut,St,Yt,me,yt,ct,xt,ne,Ie,se.data):L.isCompressedArrayTexture?U.compressedTexSubImage3D(Mt,ut,St,Yt,me,yt,ct,xt,ne,se.data):U.texSubImage3D(Mt,ut,St,Yt,me,yt,ct,xt,ne,Ie,se):_.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ut,St,Yt,yt,ct,ne,Ie,se.data):_.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ut,St,Yt,se.width,se.height,ne,se.data):U.texSubImage2D(U.TEXTURE_2D,ut,St,Yt,yt,ct,ne,Ie,se);dt.pixelStorei(U.UNPACK_ROW_LENGTH,Be),dt.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Qt),dt.pixelStorei(U.UNPACK_SKIP_PIXELS,mn),dt.pixelStorei(U.UNPACK_SKIP_ROWS,De),dt.pixelStorei(U.UNPACK_SKIP_IMAGES,Sr),ut===0&&L.generateMipmaps===!0&&L.mipmapsAutoUpdate===!0&&U.generateMipmap(Mt),dt.unbindTexture()},this.initRenderTarget=function(_){It.get(_).__webglFramebuffer===void 0&&Ft.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?Ft.setTextureCube(_,0):_.isData3DTexture?Ft.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?Ft.setTexture2DArray(_,0):Ft.setTexture2D(_,0),dt.unbindTexture()},this.resetState=function(){q=0,G=0,et=null,dt.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}};var zo=class{constructor(t,{scale:e=1,palette:i}={}){this.scene=t,this.scale=e,this.palette=i,this.max=Math.max(24,Math.round(420*e)),this.items=[],this.spark=this.createSystem(16777215,.075,or),this.confetti=this.createSystem(16777215,.14,Zi),this.dust=this.createSystem(16777215,.035,Zi),this.dustClock=0}createSystem(t,e,i){let n=new de,r=new Float32Array(this.max*3),a=new Float32Array(this.max*3);n.setAttribute("position",new ze(r,3)),n.setAttribute("color",new ze(a,3)),n.setDrawRange(0,0);let o=new rs({size:e,vertexColors:!0,transparent:!0,opacity:.95,depthWrite:!1,blending:i,sizeAttenuation:!0}),l=new Xs(n,o);return l.frustumCulled=!1,l.renderOrder=4,this.scene.add(l),{geometry:n,material:o,points:l,positions:r,colors:a,count:0}}setPalette(t){this.palette=t}setScale(t){this.scale=t}spawn(t,{position:e,count:i=18,color:n=16777215,colors:r=null,speed:a=1.2,spread:o=1,gravity:l=-2.2,life:c=.7,up:h=1}){let d=Math.max(1,Math.round(i*this.scale));for(let u=0;u<d;u+=1){this.items.length>=this.max&&this.items.shift();let f=Math.random()*Math.PI*2,g=a*(.35+Math.random()*.9),y=r?r[Math.floor(Math.random()*r.length)]:n;this.items.push({system:t,position:new R(e.x+(Math.random()-.5)*o*.35,e.y+(Math.random()-.5)*o*.25,e.z+(Math.random()-.5)*o*.35),velocity:new R(Math.cos(f)*g*(.4+Math.random()*.6),h*g*(.35+Math.random()),Math.sin(f)*g*(.4+Math.random()*.6)),gravity:l,life:c*(.6+Math.random()*.8),maxLife:c,color:new Nt(y),size:.6+Math.random()*.8})}this.sync(t)}sparkBurst(t,e){this.spawn(this.spark,{position:t,count:22,color:e||this.palette?.accent||16765286,speed:1.9,gravity:-3.6,life:.55,spread:1.4})}dustBurst(t,e){this.spawn(this.dust,{position:t,count:12,color:e||12562072,speed:.35,gravity:-.15,life:1.2,spread:1.8,up:.4})}confettiBurst(t,e){this.spawn(this.confetti,{position:t,count:80,colors:e||[this.palette?.accent||11740702,this.palette?.accent2||3038031,16765286,16777215],speed:2.8,gravity:-2.1,life:1.8,spread:2.2,up:1.6})}ambientDust(t={x:4,y:2.2,z:2.4},e={x:0,y:1.5,z:0}){this.scale&&(this.dustClock+=1,this.dustClock%9===0&&this.spawn(this.dust,{position:{x:e.x+(Math.random()-.5)*t.x,y:e.y+Math.random()*t.y,z:e.z+(Math.random()-.5)*t.z},count:1,color:this.palette?.accent||14206890,speed:.06,gravity:.02,life:3.4,spread:.4,up:.2}))}sync(t){let e=this.items.filter(r=>r.system===t),i=t.geometry.getAttribute("position"),n=t.geometry.getAttribute("color");e.forEach((r,a)=>{i.setXYZ(a,r.position.x,r.position.y,r.position.z);let o=Math.max(0,Math.min(1,r.life/r.maxLife));n.setXYZ(a,r.color.r*o,r.color.g*o,r.color.b*o)}),i.needsUpdate=!0,n.needsUpdate=!0,t.count=e.length,t.geometry.setDrawRange(0,e.length)}update(t){if(!this.items.length)return;let e=new Set;for(let i=this.items.length-1;i>=0;i-=1){let n=this.items[i];if(n.life-=t,n.life<=0){e.add(n.system),this.items.splice(i,1);continue}n.velocity.y+=n.gravity*t,n.position.addScaledVector(n.velocity,t),n.position.y<.98&&(n.position.y=.98,n.velocity.y*=-.28,n.velocity.x*=.7,n.velocity.z*=.7),e.add(n.system)}e.forEach(i=>this.sync(i))}dispose(){[this.spark,this.confetti,this.dust].forEach(t=>{this.scene.remove(t.points),t.geometry.dispose(),t.material.dispose()}),this.items.length=0}};function Ov(){let s=navigator.deviceMemory||4,t=navigator.hardwareConcurrency||4,e=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);return s<=2||t<=2||e&&(s<=4||t<=4)?"low":e?"medium":"high"}function Go(s="auto"){let t=Ov();return s==="low"?{tier:"low",dpr:1,shadows:!1,particles:.45,antialias:!1,label:"Low"}:s==="high"?{tier:"high",dpr:Math.min(2,window.devicePixelRatio||1),shadows:!0,particles:1,antialias:!0,label:"High"}:t==="low"?{tier:"low",dpr:1,shadows:!1,particles:.5,antialias:!1,label:"Auto \xB7 light"}:t==="medium"?{tier:"medium",dpr:Math.min(1.5,window.devicePixelRatio||1),shadows:!1,particles:.8,antialias:!0,label:"Auto \xB7 balanced"}:{tier:"high",dpr:Math.min(2,window.devicePixelRatio||1),shadows:!0,particles:1,antialias:!0,label:"Auto \xB7 full"}}var Ho=class{constructor({onDowngrade:t}={}){this.onDowngrade=t,this.frames=0,this.elapsed=0,this.lowWindows=0,this.fps=60,this.enabled=!0,this.level=0}reset(){this.frames=0,this.elapsed=0,this.lowWindows=0,this.level=0}update(t){return this.enabled?(this.frames+=1,this.elapsed+=t,this.elapsed<1?this.fps:(this.fps=Math.round(this.frames/this.elapsed),this.frames=0,this.elapsed=0,this.fps<42?this.lowWindows+=1:this.lowWindows=Math.max(0,this.lowWindows-1),this.lowWindows>=3&&this.level<2&&(this.level+=1,this.lowWindows=0,this.onDowngrade?.(this.level,this.fps)),this.fps)):this.fps}};function nd(){try{let s=document.createElement("canvas");return!!(window.WebGLRenderingContext&&(s.getContext("webgl2")||s.getContext("webgl")||s.getContext("experimental-webgl")))}catch{return!1}}function lt(s,t="",{roughness:e=.62,metalness:i=.12,emissive:n=0,emissiveIntensity:r=.7,transparent:a=!1,opacity:o=1,flatShading:l=!1,map:c=null,side:h=Ii}={}){let d=new Qs({color:s,roughness:e,metalness:i,emissive:n,emissiveIntensity:r,transparent:a,opacity:o,flatShading:l,map:c,side:h});return d.userData.role=t,d.userData.base={roughness:e,metalness:i,emissive:n,emissiveIntensity:r,transparent:a,opacity:o,flatShading:l},d}function ft(s,t,e,i,n=0,r=0,a=0){let o=new wt(new fe(s,t,e),i);return o.position.set(n,r,a),o.castShadow=!0,o.receiveShadow=!0,o}function Oe(s,t,e,i,n=0,r=0,a=0,o=16){let l=new wt(new Yi(s,t,e,o),i);return l.position.set(n,r,a),l.castShadow=!0,l.receiveShadow=!0,l}function xe(s,t){return s.userData.interactive=t,s.traverse(e=>{e.isMesh&&(e.userData.interactive=t,e.castShadow=!0,e.receiveShadow=!0)}),s}function sd(s,{color:t="#fffdf8",background:e="rgba(20, 20, 24, 0.78)",size:i=44,width:n=512,height:r=128,font:a="600 44px system-ui, sans-serif"}={}){let o=document.createElement("canvas");o.width=n,o.height=r;let l=o.getContext("2d");if(l.clearRect(0,0,n,r),e){l.fillStyle=e;let u=18;l.beginPath(),l.roundRect(4,4,n-8,r-8,u),l.fill()}l.fillStyle=t,l.font=a,l.textAlign="center",l.textBaseline="middle",l.fillText(s,n/2,r/2+2,n-36);let c=new Wi(o);c.colorSpace=ve,c.anisotropy=4;let h=new ns({map:c,transparent:!0,depthWrite:!1}),d=new Gs(h);return d.scale.set(n/r*i/44,i/44,1),d.userData.label=!0,d}function Pc(s={}){let t=document.createElement("canvas");t.width=1024,t.height=768;let e=t.getContext("2d"),i=`#${(s.pcb||2382662).toString(16).padStart(6,"0")}`,n=`#${(s.accent||11740702).toString(16).padStart(6,"0")}`,r=`#${(s.metal||12830669).toString(16).padStart(6,"0")}`;e.fillStyle=i,e.fillRect(0,0,1024,768),e.strokeStyle="rgba(190, 220, 190, 0.28)",e.lineWidth=2;for(let l=0;l<90;l+=1){let c=40+Math.random()*940,h=40+Math.random()*680;e.beginPath(),e.moveTo(c,h);let d=2+Math.floor(Math.random()*4);for(let u=0;u<d;u+=1)Math.random()>.5?c+=(Math.random()-.5)*150:h+=(Math.random()-.5)*130,e.lineTo(c,h);e.stroke(),e.fillStyle="rgba(230, 210, 150, 0.55)",e.beginPath(),e.arc(c,h,4,0,Math.PI*2),e.fill()}let a=(l,c,h,d=20,u="rgba(240, 245, 235, 0.86)")=>{e.fillStyle=u,e.font=`700 ${d}px monospace`,e.fillText(l,c,h)};a("CPU SOCKET",312,205,18),a("DIMM A2",626,172,17),a("DIMM B2",626,222,17),a("PCIE X16",630,500,18),a("24-PIN ATX",850,330,15),a("CPU_FAN",270,330,15),a("SATA",810,610,15),a("TECHPRO MAINBOARD",60,720,22,"rgba(245, 250, 240, 0.75)"),e.strokeStyle="rgba(255, 255, 255, 0.15)",e.lineWidth=3,e.strokeRect(24,24,976,720),e.strokeStyle=r,e.globalAlpha=.35;for(let l=0;l<8;l+=1)e.beginPath(),e.arc(90+l*120,700,7,0,Math.PI*2),e.stroke();e.globalAlpha=1,e.fillStyle=n,e.fillRect(0,0,1024,10);let o=new Wi(t);return o.colorSpace=ve,o.anisotropy=8,o}function Ic(s={},t=.25){let e=document.createElement("canvas");e.width=1024,e.height=576;let i=e.getContext("2d"),n=s.dark;i.fillStyle=n?"#040a17":"#08131a",i.fillRect(0,0,1024,576);let r=`#${(s.accent||2483967).toString(16).padStart(6,"0")}`,a=`#${(s.accent2||3038031).toString(16).padStart(6,"0")}`;i.fillStyle=r,i.fillRect(64,64,14,64),i.fillStyle="#e9f8ff",i.font="700 42px system-ui, sans-serif",i.fillText("TECHPRO BIOS",100,108),i.fillStyle="rgba(210, 240, 255, 0.7)",i.font="500 20px monospace",i.fillText("Assemble Computer Hardware \xB7 COC 1",100,144),i.fillStyle="rgba(210, 240, 255, 0.82)",i.font="500 22px monospace";let o=["CPU ............ TECHPRO PROCESSOR OK","MEMORY ......... 8192 MB OK","STORAGE ........ DETECTED","CPU FAN ........ OK","KEYBOARD ....... DETECTED","MOUSE .......... DETECTED"];o.forEach((c,h)=>{t*o.length>h&&(i.fillStyle=h===o.length-1?a:"rgba(220, 244, 255, 0.86)",i.fillText(c,96,220+h*38))}),i.strokeStyle="rgba(255,255,255,0.18)",i.strokeRect(72,186,880,260),i.fillStyle="rgba(255,255,255,0.14)",i.fillRect(96,486,832,18),i.fillStyle=r,i.fillRect(96,486,832*Math.max(.04,t),18),i.fillStyle="rgba(220, 244, 255, 0.7)",i.font="500 18px monospace",i.fillText(t>=1?"Boot device found. Starting TechPro.":"Checking hardware...",96,540);let l=new Wi(e);return l.colorSpace=ve,l.anisotropy=8,l}function rd(s){let t=new Ot;t.name="bench";let e=lt(s.bench,"bench",{roughness:.82,metalness:.02}),i=lt(s.benchTop,"benchTop",{roughness:.75,metalness:.02}),n=lt(s.metal,"metal",{roughness:.4,metalness:.65}),r=ft(9.4,.16,5.2,i,0,.98,0);t.add(r),t.add(ft(9.6,.08,5.4,e,0,.9,0)),[[-4.2,-2.2],[4.2,-2.2],[-4.2,2.2],[4.2,2.2]].forEach(([c,h])=>{t.add(ft(.16,.9,.16,n,c,.45,h)),t.add(ft(.4,.06,.4,n,c,.03,h))}),t.add(ft(9,.08,.08,n,0,.36,-2.1)),t.add(ft(.08,.08,4.4,n,-4.2,.36,0));let o=new wt(new Ci(34,26),lt(s.bg,"bg",{roughness:1,metalness:0}));o.rotation.x=-Math.PI/2,o.position.y=-.02,o.receiveShadow=!0,t.add(o);let l=new wt(new Ci(34,14),lt(s.bg,"bg",{roughness:1,metalness:0}));return l.position.set(0,7,-8),l.receiveShadow=!0,t.add(l),t}function ad(s){let t=new Ot,e=lt(s.caseTrim,"caseTrim",{roughness:.8,metalness:.1}),i=lt(s.bg,"bg",{roughness:.9,metalness:.02});t.add(ft(3.9,.09,2.1,e,0,.035,0)),t.add(ft(3.72,.02,1.94,i,0,.085,0));for(let n=0;n<5;n+=1)t.add(ft(.6,.01,.6,lt(s.caseTrim,"caseTrim",{roughness:.7}),-1.4+n*.7,.1,.55));return t}function od(s){let t=new Ot;t.name="case";let e=lt(s.case,"case",{roughness:.5,metalness:.35}),i=lt(s.caseTrim,"caseTrim",{roughness:.38,metalness:.5}),n=lt(s.metal,"metal",{roughness:.3,metalness:.78}),r=lt(329224,"case",{roughness:.85,metalness:.1}),a=lt(s.accent,"accent",{roughness:.3,metalness:.2,emissive:s.accent,emissiveIntensity:.25}),o=2.1,l=3.1,c=3.3;t.add(ft(o,.1,c,e,0,.05,0)),t.add(ft(o,.1,c,e,0,l-.05,0)),t.add(ft(.08,l,c,e,-o/2,l/2,0)),t.add(ft(o,l,.08,e,0,l/2,-c/2)),t.add(ft(o,l,.06,e,0,l/2,c/2)),t.add(ft(o-.14,l-.24,.04,r,0,l/2,-c/2+.07)),t.add(ft(.12,l-.16,.16,i,-o/2+.14,l/2,c/2-.06)),t.add(ft(.12,l-.16,.16,i,o/2-.14,l/2,c/2-.06));let h=new Ot;h.position.set(0,0,c/2+.02),h.add(ft(o-.1,l-.12,.06,i,0,l/2,.01));for(let b=0;b<12;b+=1)h.add(ft(o-.32,.012,.02,r,0,.32+b*.07,.055));let d=Oe(.13,.13,.05,a,.62,l-.28,.07,24);d.rotation.x=Math.PI/2,d.name="power-button",xe(d,{kind:"click",action:"power"}),h.add(d);let u=new wt(new li(.3,16,12),new Re({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}));u.position.set(.62,l-.28,.07),u.name="power-button-hit-target",xe(u,{kind:"click",action:"power"}),h.add(u);let f=new wt(new Ve(.16,.015,8,28),n);f.position.set(.62,l-.28,.065),h.add(f);for(let b=0;b<3;b+=1){let A=ft(.14,.05,.03,r,.28+b*.18,l-.28,.06);h.add(A)}let g=ft(o-.5,.025,.02,a,0,l-.55,.06);g.name="rgb-strip",h.add(g),t.add(h),t.add(ft(o-.22,.06,c-.3,i,0,.32,0)),t.add(ft(o-.5,.02,c-.5,r,0,.36,0)),t.add(ft(.8,1.05,1.1,i,-.25,.95,.95));for(let b=0;b<3;b+=1)t.add(ft(.72,.03,1,r,-.25,.62+b*.25,.95));let y=new Ot;y.name="case-fan",y.position.set(.1,2.32,-c/2+.18);let m=new wt(new Ve(.42,.055,8,28),n);y.add(m);let p=new Ot;p.name="fan-blades",p.add(Oe(.11,.11,.12,r,0,0,0,18));for(let b=0;b<7;b+=1){let A=ft(.3,.035,.12,lt(s.caseTrim,"caseTrim",{roughness:.5}),.2,0,0);A.rotation.z=b/7*Math.PI*2,A.position.set(Math.cos(b/7*Math.PI*2)*.22,Math.sin(b/7*Math.PI*2)*.22,0),p.add(A)}y.add(p),y.rotation.y=Math.PI/2,y.rotation.z=Math.PI/2,t.add(y);let S=lt(s.metal,"metal",{roughness:.3,metalness:.8});[[-.82,.8,.2],[-.82,2.55,.2],[-.82,.8,-.9],[-.82,2.55,-.9],[-.82,1.65,-.2]].forEach(([b,A,T])=>{let v=Oe(.07,.07,.18,S,b,A,T,10);v.rotation.z=Math.PI/2,t.add(v)});for(let b=0;b<3;b+=1){let A=new wt(new Ve(.13,.035,6,16),r);A.position.set(-.45+b*.35,.62,.5),A.rotation.x=Math.PI/2,t.add(A)}let E=ft(o-.1,l-.18,.05,lt(s.caseTrim,"caseTrim",{roughness:.2,metalness:.6,transparent:!0,opacity:.32}),-1.45,1.45,.2);return E.rotation.z=-.14,E.name="side-panel",t.add(E),t.userData.powerButton=d,t.userData.powerHitTarget=u,t.userData.fan=p,t.userData.rgb=g,t.userData.panel=E,t.userData.boardMount=new ue,t.userData.boardMount.position.set(-.76,1.68,.1),t.add(t.userData.boardMount),t}function ld(s,{small:t=!1}={}){let e=new Ot;e.name="motherboard";let i=t?.82:1,n=2.55*i,r=1.95*i,a=Pc(s),o=lt(16777215,"pcb",{roughness:.7,metalness:.15,map:a}),l=ft(n,.075,r,o,0,0,0);l.name="pcb",e.add(l),e.userData.pcbTexture=a;let c=lt(1119514,"",{roughness:.6,metalness:.2}),h=lt(s.metal,"metal",{roughness:.28,metalness:.85}),d=lt(s.accent,"accent",{roughness:.45,metalness:.25}),u=lt(15327954,"",{roughness:.75,metalness:.05}),f=new Ot;f.name="cpu-socket",f.position.set(-.58*i,.055,-.38*i),f.add(ft(.58*i,.07,.58*i,c,0,0,0));let g=new wt(new Ci(.42*i,.42*i),lt(9268015,"",{roughness:.35,metalness:.8}));g.rotation.x=-Math.PI/2,g.position.y=.038,f.add(g);let y=new wt(new wn(.045*i,3),d);y.rotation.x=-Math.PI/2,y.position.set(-.19*i,.04,-.19*i),y.rotation.z=Math.PI,f.add(y);let m=new Ot;m.name="cpu-lever",m.position.set(.32*i,.05,-.38*i);let p=Oe(.018,.018,.48*i,h,0,.06,0,8);p.rotation.z=Math.PI/2,m.add(p);let S=ft(.02,.02,.28*i,h,.22*i,.06,.12*i);m.add(S);let E=new wt(new li(.56*i,16,12),new Re({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1,side:Xe}));E.position.set(.22*i,.08,.12*i),E.name="cpu-lever-hit-target",m.add(E),m.userData.closed=!0,xe(m,{kind:"lever"}),f.add(m),e.add(f),e.userData.socket=f,e.userData.lever=m,e.userData.socketPosition=new R(-.58*i,.11,-.38*i);let b=new Ot;b.name="ram-slots";for(let I=0;I<4;I+=1){let C=ft(.06,.055,1.12*i,I===1||I===3?d:c,.5*i+I*.11,.06,-.18*i);C.name=I===1?"ram-slot-a2":`ram-slot-${I}`,b.add(C);let N=ft(.075,.09,.11,u,.5*i+I*.11,.08,-.78*i);N.name="ram-clip",b.add(N);let F=ft(.075,.09,.11,u,.5*i+I*.11,.08,.42*i);F.name="ram-clip",b.add(F)}e.add(b),e.userData.ramSlots=b,e.userData.ramSlotPosition=new R(.61*i,.12,-.18*i),e.add(ft(1.35*i,.05,.08,d,.42*i,.06,.68*i)),e.add(ft(.82*i,.05,.07,c,.42*i,.06,.86*i));let A=ft(.42*i,.13,.42*i,h,.5*i,.12,.24*i);for(let I=0;I<5;I+=1)A.add(ft(.36*i,.02,.02,c,0,.07,-.16+I*.08));e.add(A);for(let I=0;I<8;I+=1){let C=Oe(.055*i,.055*i,.16*i,c,-.92*i+I%4*.16,.11,-.05+Math.floor(I/4)*.24,10);C.add(Oe(.05*i,.05*i,.01*i,h,0,.085,0,10)),e.add(C)}e.add(ft(.14*i,.12,.44*i,u,1.08*i,.1,-.18*i));let T=ft(.13*i,.06,.18*i,u,-.2*i,.08,-.78*i);T.name="cpu-fan-header",e.add(T),e.userData.fanHeader=T,[[-1.12,-.82],[1.12,-.82],[-1.12,.82],[1.12,.82],[.2,.82]].forEach(([I,C])=>{let N=new wt(new Ve(.055,.012,6,18),h);N.rotation.x=Math.PI/2,N.position.set(I*i,.045,C*i),e.add(N)}),e.add(ft(.26*i,.06,.1*i,u,-.9*i,.07,.72*i)),e.add(ft(.34*i,.05,.12*i,c,1*i,.07,.72*i));let M=[["CPU SOCKET",-.58*i,.25,-.38*i],["RAM A2",.61*i,.25,-.18*i],["PCIE X16",.42*i,.2,.68*i],["CPU_FAN",-.2*i,.22,-.78*i],["24-PIN",1.08*i,.26,-.18*i]];return e.userData.labels=M.map(([I,C,N,F])=>{let z=sd(I,{size:26,width:420,height:96});return z.position.set(C,N,F),z.visible=!1,e.add(z),z}),e}function cd(s){let t=new Ot;t.name="cpu";let e=lt(3038032,"",{roughness:.5,metalness:.2}),i=lt(14212581,"metal",{roughness:.22,metalness:.9}),n=lt(14067530,"",{roughness:.3,metalness:.85}),r=lt(s.accent,"accent",{roughness:.4,metalness:.3}),a=ft(.52,.07,.52,e,0,0,0);t.add(a),t.add(ft(.38,.025,.38,i,0,.047,0)),t.add(ft(.32,.012,.32,lt(10265517,"metal",{roughness:.2,metalness:.9}),0,.065,0));let o=new fe(.012,.008,.012),l=new ss(o,n,196),c=new Zt,h=0;for(let g=0;g<14;g+=1)for(let y=0;y<14;y+=1)c.makeTranslation(-.21+g*.032,-.04,-.21+y*.032),l.setMatrixAt(h,c),h+=1;l.instanceMatrix.needsUpdate=!0,t.add(l);let d=new wt(new wn(.045,3),r);d.rotation.x=-Math.PI/2,d.rotation.z=Math.PI,d.position.set(-.19,.041,-.19),t.add(d);let u=ft(.06,.02,.06,r,-.24,.04,-.24);t.add(u);let f=new wt(new fe(.82,.24,.82),new Re({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1,side:Xe}));return f.name="cpu-hit-target",t.add(f),t.userData.part="cpu",t.userData.triangle=d,t}function hd(s){let t=new Ot;t.name="cooler";let e=lt(s.metal,"metal",{roughness:.3,metalness:.82}),i=lt(1909546,"",{roughness:.55,metalness:.25}),n=lt(s.accent,"accent",{roughness:.4,metalness:.3});t.add(ft(.52,.05,.52,e,0,.02,0));for(let h=0;h<4;h+=1){let d=Oe(.025,.025,.5,e,-.18+h*.12,.28,.18,8);t.add(d)}let r=new fe(.68,.015,.52),a=new ss(r,e,16),o=new Zt;for(let h=0;h<16;h+=1)o.makeTranslation(0,.1+h*.026,-.02),a.setMatrixAt(h,o);a.instanceMatrix.needsUpdate=!0,t.add(a);let l=new Ot;l.position.set(0,.58,0),l.add(Oe(.3,.3,.06,i,0,0,0,20));let c=new Ot;c.name="cooler-fan";for(let h=0;h<9;h+=1){let d=ft(.22,.02,.09,n,.13,.04,0);d.rotation.y=h/9*Math.PI*2,d.position.set(Math.cos(h/9*Math.PI*2)*.15,.05,Math.sin(h/9*Math.PI*2)*.15),c.add(d)}return l.add(c),t.add(l),t.userData.fan=c,t.userData.part="cooler",t}function ud(s){let t=new Ot;t.name="ram";let e=lt(1916725,"",{roughness:.6,metalness:.15}),i=lt(1053721,"",{roughness:.55,metalness:.2}),n=lt(14067530,"",{roughness:.3,metalness:.9}),r=lt(s.accent,"accent",{roughness:.45,metalness:.3}),a=lt(15262422,"",{roughness:.8,metalness:.05});t.add(ft(1.28,.055,.32,e,0,0,0));for(let l=0;l<8;l+=1)t.add(ft(.11,.035,.17,i,-.53+l*.15,.045,0));t.add(ft(.6,.004,.2,a,-.12,.066,0)),t.add(ft(1.28,.02,.05,n,0,-.038,.1)),t.add(ft(.5,.02,.04,r,.32,-.038,.1));let o=new wt(new fe(1.48,.2,.48),new Re({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1,side:Xe}));return o.name="ram-hit-target",t.add(o),t.add(ft(.09,.08,.33,r,-.18,0,0)),t.userData.part="ram",t.userData.notch=-.18,t}function dd(s){let t=new Ot;t.name="psu";let e=lt(2369583,"",{roughness:.55,metalness:.45}),i=lt(s.metal,"metal",{roughness:.3,metalness:.85}),n=lt(s.accent,"accent",{roughness:.4,metalness:.3});t.add(ft(1.55,.95,1.25,e,0,0,0));let r=new wt(new Ve(.36,.025,8,26),i);r.rotation.x=Math.PI/2,r.position.set(.1,.49,0),t.add(r);for(let a=0;a<8;a+=1){let o=ft(.7,.018,.018,i,.1,.49,0);o.rotation.y=a/8*Math.PI,t.add(o)}t.add(Oe(.12,.12,.05,i,.1,.5,0,16));for(let a=0;a<4;a+=1)t.add(ft(.18,.05,.1,a%2?n:i,.35+a*.14,.02,.68));return t.userData.part="psu",t}function fd(s){let t=new Ot;t.name="monitor";let e=lt(s.case,"case",{roughness:.45,metalness:.35}),i=lt(s.metal,"metal",{roughness:.3,metalness:.8}),n=new Re({color:659734}),r=new wt(new Ci(2.5,1.4),n);r.position.set(0,.3,.055),t.add(r),t.add(ft(2.7,1.62,.12,e,0,.3,0)),t.add(ft(.18,.62,.18,i,0,-.58,-.04)),t.add(ft(1.1,.06,.65,i,0,-.9,.05));let a=new wt(new wn(.025,12),new Re({color:s.accent}));return a.position.set(1.15,-.45,.07),t.add(a),t.userData.screen=r,t.userData.screenMat=n,t.userData.led=a,t}function pd(s){let t=new Ot,e=lt(s.case,"case",{roughness:.5,metalness:.25}),i=lt(14275784,"",{roughness:.8,metalness:.02});t.add(ft(1.7,.07,.55,e,0,0,0));for(let n=0;n<4;n+=1)for(let r=0;r<14;r+=1)t.add(ft(.085,.025,.075,i,-.72+r*.11,.05,-.18+n*.1));return t.add(ft(.65,.025,.075,i,0,.05,.22)),t}function md(s){let t=new Ot,e=lt(s.case,"case",{roughness:.45,metalness:.3}),i=new wt(new qi(.16,.22,4,10),e);return i.rotation.x=Math.PI/2,i.scale.set(1,.6,1),i.position.y=.06,i.castShadow=!0,t.add(i),t.add(ft(.025,.02,.12,lt(1119514,"",{roughness:.5}),0,.12,-.05)),t}function gd(s){let t=new Ot;t.name="technician";let e=lt(14066554,"",{roughness:.75}),i=lt(s.accent2,"accent2",{roughness:.7}),n=lt(2831168,"",{roughness:.8}),r=lt(2365974,"",{roughness:.9}),a=lt(s.metal,"metal",{roughness:.3,metalness:.8}),o=new wt(new qi(.28,.75,4,12),i);o.position.y=1.28,o.castShadow=!0,t.add(o);let l=new wt(new li(.23,18,14),e);l.position.y=1.95,l.castShadow=!0,t.add(l);let c=new wt(new li(.235,16,10,0,Math.PI*2,0,Math.PI*.48),r);c.position.y=2.02,t.add(c);let h=new Re({color:1775380});[-.08,.08].forEach(p=>{let S=new wt(new li(.018,8,6),h);S.position.set(p,1.98,.205),t.add(S)});let d=(p,S)=>{let E=new Ot;E.position.set(p,1.62,0);let b=new wt(new qi(.075,.42,4,8),i);b.position.y=-.22,E.add(b);let A=new Ot;A.position.y=-.48;let T=new wt(new qi(.065,.36,4,8),e);T.position.y=-.18,A.add(T);let v=new wt(new li(.08,10,8),e);return v.position.y=-.4,A.add(v),E.add(A),t.add(E),{shoulder:E,forearm:A,hand:v,side:S}},u=d(-.34,"left"),f=d(.34,"right");u.shoulder.rotation.z=.18,f.shoulder.rotation.z=-.18,u.forearm.rotation.x=-.2,f.forearm.rotation.x=-.2;let g=p=>{let S=new wt(new qi(.09,.66,4,8),n);S.position.set(p,.48,0),S.castShadow=!0,t.add(S);let E=ft(.18,.08,.3,lt(1514272,"",{roughness:.7}),p,.08,.06);t.add(E)};g(-.14),g(.14);let y=new wt(new Ve(.1,.018,8,24),a);y.position.set(.43,1.16,.03),y.rotation.x=Math.PI/2,y.name="bracelet",xe(y,{kind:"safety",action:"bracelet"}),t.add(y);let m=new wt(new Ve(.105,.02,8,24),lt(s.accent,"accent",{roughness:.6}));return m.position.set(-.43,1.16,.03),m.rotation.x=Math.PI/2,m.name="worn-strap",m.visible=!1,t.add(m),t.userData.bracelet=y,t.userData.wornStrap=m,t.userData.leftHand=u.hand,t.userData.rightHand=f.hand,t}function vd(s){let t=new Ot;t.name="wrist-strap";let e=lt(s.accent,"accent",{roughness:.65,metalness:.05}),i=lt(s.metal,"metal",{roughness:.3,metalness:.8}),n=new wt(new Ve(.15,.035,8,24),e);n.rotation.x=Math.PI/2,t.add(n),t.add(ft(.08,.04,.12,i,.15,.02,0));let r=new wt(new $i(new Ri([new R(.16,.02,0),new R(.35,.02,.1),new R(.55,.02,.05),new R(.72,.02,-.1)]),14,.012,6,!1),i);return t.add(r),t.userData.part="strap",t}function xd(s){let t=new Ot;t.name="reference-camera";let e=lt(2369583,"",{roughness:.55,metalness:.35}),i=lt(s.metal,"metal",{roughness:.3,metalness:.8});t.add(ft(.34,.22,.18,e,0,0,0));let n=Oe(.09,.09,.1,i,0,0,.14,18);return n.rotation.x=Math.PI/2,t.add(n),t.add(ft(.1,.05,.05,lt(s.accent,"accent",{roughness:.4}),.09,.13,0)),t.userData.part="camera",t}function yd(s){let t=new Ot;t.name="parts-bins";let e=lt(s.accent2,"accent2",{roughness:.7}),i=lt(15854300,"",{roughness:.85});return[-.35,.35].forEach((n,r)=>{let a=ft(.58,.3,.46,e,n,.15,0);t.add(a),t.add(ft(.42,.16,.01,i,n,.17,.235));let o=sd(r===0?"SCREWS":"CABLES",{size:18,width:300,height:80,background:null,color:"#2a231c"});o.position.set(n,.2,.25),o.scale.set(.22,.06,1),t.add(o)}),t.userData.part="bins",t}function _d(s){let t=new Ot;t.name="power-strip";let e=lt(15328732,"",{roughness:.7,metalness:.05}),i=lt(1843494,"",{roughness:.6,metalness:.2});t.add(ft(1.1,.12,.36,e,0,0,0));for(let n=0;n<3;n+=1)t.add(ft(.18,.02,.12,i,-.35+n*.35,.065,0));return t.add(ft(.3,.02,.05,lt(16731469,"",{roughness:.5}),.42,.07,0)),t}function bd(s){let t=new Ot;t.name="power-plug";let e=lt(15328732,"",{roughness:.65,metalness:.05}),i=lt(s.metal,"metal",{roughness:.3,metalness:.8});t.add(ft(.24,.18,.14,e,0,0,0)),t.add(ft(.04,.06,.12,i,-.06,.13,0)),t.add(ft(.04,.06,.12,i,.06,.13,0));let n=new Ri([new R(0,-.02,-.07),new R(.2,-.1,-.4),new R(.6,-.18,-.8),new R(1.1,-.2,-1)]),r=new wt(new $i(n,18,.022,6,!1),lt(1579807,"",{roughness:.8}));return t.add(r),t.userData.part="plug",t}function Sd(s){let t=new Ot;t.name="peripheral-cable";let e=lt(s.metal,"metal",{roughness:.35,metalness:.75}),i=lt(2238254,"",{roughness:.6,metalness:.2});t.add(ft(.26,.11,.08,i,0,0,0)),t.add(ft(.1,.07,.02,e,0,0,.05));let n=new Ri([new R(0,0,-.04),new R(-.2,-.1,-.2),new R(-.45,-.18,-.4),new R(-.8,-.2,-.5)]);return t.add(new wt(new $i(n,14,.018,6,!1),lt(1579807,"",{roughness:.8}))),t.userData.part="peripheral",t}function Md(s){let t=new Ot;t.name="tool-kit";let e=lt(s.metal,"metal",{roughness:.3,metalness:.8}),i=lt(s.accent,"accent",{roughness:.6}),n=new Ot;n.position.set(-.2,.08,0),n.add(Oe(.035,.035,.3,i,0,0,0,10));let r=Oe(.012,.012,.32,e,0,.3,0,8);n.add(r),n.rotation.z=.5,t.add(n);let a=Oe(.06,.06,.22,lt(14275266,"",{roughness:.7}),.18,.11,.02,12);a.add(Oe(.04,.04,.04,lt(s.accent,"accent",{roughness:.5}),0,.13,0,10)),t.add(a);for(let o=0;o<3;o+=1){let l=new wt(new Ve(.06,.01,6,16),lt(2237995,"",{roughness:.7}));l.rotation.x=Math.PI/2,l.position.set(.36+o*.09,.02,.1),t.add(l)}return t}function wd(s){let t=new Ot,e=lt(s.metal,"metal",{roughness:.25,metalness:.9}),i=lt(1514272,"",{roughness:.6,metalness:.3});t.add(Oe(.07,.09,.38,i,0,0,0,14)),t.add(Oe(.11,.08,.12,e,0,.24,0,14));let n=new wt(new Zs(.35,1.2,18,1,!0),new Re({color:s.accent,transparent:!0,opacity:.07,side:Xe,depthWrite:!1}));return n.position.y=.9,n.rotation.x=Math.PI,t.add(n),t}var Ed={linear:s=>s,inQuad:s=>s*s,outQuad:s=>1-(1-s)*(1-s),inOutQuad:s=>s<.5?2*s*s:1-Math.pow(-2*s+2,2)/2,outCubic:s=>1-Math.pow(1-s,3),inOutCubic:s=>s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2,outBack:s=>1+2.70158*Math.pow(s-1,3)+1.70158*Math.pow(s-1,2),outElastic:s=>{let t=2*Math.PI/3;return s===0?0:s===1?1:Math.pow(2,-10*s)*Math.sin((s*10-.75)*t)+1}};var Lc=class{constructor(t,e,{duration:i=400,delay:n=0,easing:r="outCubic",onUpdate:a=null,onComplete:o=null,loop:l=!1}={}){this.object=t,this.from={},this.to={},Object.keys(e).forEach(c=>{this.from[c]=Td(t,c),this.to[c]=e[c]}),this.duration=Math.max(.001,i/1e3),this.delay=Math.max(0,n/1e3),this.easing=typeof r=="function"?r:Ed[r]||Ed.outCubic,this.onUpdate=a,this.onComplete=o,this.loop=l,this.elapsed=0,this.done=!1}tick(t){if(this.done||(this.elapsed+=t,this.elapsed<this.delay))return;let e=Math.min(1,(this.elapsed-this.delay)/this.duration),i=this.easing(e);Object.keys(this.to).forEach(n=>{let r=this.from[n],a=this.to[n];typeof a=="number"&&typeof r=="number"?Dc(this.object,n,r+(a-r)*i):Array.isArray(a)?Dc(this.object,n,a.map((o,l)=>{let c=Array.isArray(r)?r[l]:0;return typeof o=="number"?c+(o-c)*i:o})):i>=1&&Dc(this.object,n,a)}),this.onUpdate?.(i,this.object),e>=1&&(this.loop?(this.elapsed=this.delay,this.from={},Object.keys(this.to).forEach(n=>{this.from[n]=Td(this.object,n)})):(this.done=!0,this.onComplete?.()))}cancel(){this.done=!0}};function Td(s,t){let e=s[t];return e&&typeof e=="object"&&"x"in e&&"y"in e&&"z"in e?[e.x,e.y,e.z]:e}function Dc(s,t,e){Array.isArray(e)?s[t]&&typeof s[t].set=="function"?s[t].set(e[0],e[1],e[2]):s[t]={x:e[0],y:e[1],z:e[2]}:s[t]=e}var Vo=class{constructor(){this.active=new Set}add(t,e,i){let n=new Lc(t,e,i);return this.active.add(n),n}to(t,e,i){return this.add(t,e,i)}delay(t,e){let i={value:0};return this.add(i,{value:1},{duration:t*1e3,easing:"linear",onComplete:e})}stop(t){this.active.forEach(e=>{e.object===t&&(e.cancel(),this.active.delete(e))})}update(t){this.active.forEach(e=>{e.tick(t),e.done&&this.active.delete(e)})}clear(){this.active.forEach(t=>t.cancel()),this.active.clear()}};var Ad={overview:{theta:.36,phi:1.04,radius:9.2,target:[0,1.65,0]},top:{theta:.02,phi:.2,radius:9.6,target:[-1.6,1.2,.2]},side:{theta:1.18,phi:1.12,radius:8.4,target:[.6,1.6,0]},back:{theta:Math.PI+.45,phi:1.16,radius:9.4,target:[.8,1.7,-.4]},safety:{theta:.32,phi:1.02,radius:8.8,target:[0,1.55,0]},cpu:{theta:.12,phi:.9,radius:4.5,target:[-1.8,1.3,.25]},ram:{theta:.14,phi:.84,radius:4.2,target:[-1.7,1.28,.3]},power:{theta:.82,phi:1.05,radius:5.6,target:[2,1.75,-.3]},case:{theta:.36,phi:1,radius:7.8,target:[.35,1.5,.1]}},Wo=class{constructor({container:t,theme:e,settings:i={},audio:n,particles:r,callbacks:a={},onQuality:o=null}){this.container=t,this.theme=e,this.settings=i,this.audio=n,this.particles=r,this.callbacks=a,this.onQuality=o,this.tweens=new Vo,this.quality=Go(i.quality||"auto"),this.motionReduced=!!e.flags.reduced,this.level="safety",this.step="",this.drag=null,this.leverDrag=null,this.pointers=new Map,this.orbitPointer=null,this.pinch=null,this.lastTap=0,this.cameraState={theta:.36,phi:1.04,radius:9.2},this.cameraTarget=new R(0,1.65,0),this.cameraGoal=null,this.shake=0,this.time=0,this.powerState="off",this.powerProgress=0,this.faultFixed=!1,this.safetyPoweredOff=!1,this.peripheralDisconnected=!1,this.pasteApplied=!1,this.qualitySetting=i.quality||"auto",this.leverOpen=!1,this.clipsOpen=!1,this.cpuSeated=!1,this.ramPlaced=!1,this.ramSeated=!1,this.seat=null,this.highlighted=null,this.exploded=!1,this.xray=!1,this.edgeMaterials=[],this.themeMaterials=[],this.home={},this.interactiveObjects=[],this.raycaster=new rr,this.pointer=new _t,this.lastFrame=performance.now(),this.fpsGuard=new Ho({onDowngrade:(l,c)=>this.downgrade(l,c)}),this.disposed=!1,this.build(),this.bindEvents(),this.setTheme(e),this.setLevel("safety",{instant:!0}),this.resize(),this.loop=this.loop.bind(this),this.frame=requestAnimationFrame(this.loop)}build(){let t=new Oo({antialias:this.quality.antialias,alpha:!1,powerPreference:"high-performance"});t.outputColorSpace=ve,t.toneMapping=lr,t.toneMappingExposure=1.05,t.shadowMap.enabled=this.quality.shadows,t.shadowMap.type=En,t.setPixelRatio(this.quality.dpr),t.domElement.className="pc3d-canvas",t.domElement.setAttribute("aria-label","3D technician workbench"),t.domElement.tabIndex=0,this.container.appendChild(t.domElement),this.renderer=t;let e=new Bs;e.background=new Nt(this.theme.palette.bg),e.fog=new Os(this.theme.palette.fog,16,30),this.scene=e;let i=new Ue(42,1,.1,80);this.camera=i;let n=new tr(16777215,4930093,1.2);e.add(n);let r=new ls(16773596,2.1);r.position.set(-4,9,6),r.castShadow=this.quality.shadows,r.shadow.mapSize.set(1024,1024),r.shadow.camera.left=-7,r.shadow.camera.right=7,r.shadow.camera.top=7,r.shadow.camera.bottom=-5,r.shadow.bias=-6e-4,e.add(r);let a=new ls(12180735,.65);a.position.set(7,4,-4),e.add(a);let o=new nr(this.theme.palette.accent,22,12,.55,.5,1.4);o.position.set(3.5,6.5,2.5),o.target.position.set(.5,1.2,0),e.add(o,o.target),this.lights={hemi:n,key:r,fill:a,rim:o},this.grid=new ar(30,30,this.theme.palette.accent,this.theme.palette.accent),this.grid.position.y=.005,this.grid.material.opacity=.16,this.grid.material.transparent=!0,this.grid.visible=!!this.theme.flags.grid,e.add(this.grid),this.bench=rd(this.theme.palette),e.add(this.bench),this.cleaningCloth=new Ot,this.cleaningCloth.name="cleaning-cloth";let l=lt(3520977,"",{roughness:.9}),c=new wt(new fe(.56,.035,.38),l);c.rotation.y=-.3,this.cleaningCloth.add(c);let h=new wt(new fe(.42,.012,.025),lt(12055285,"",{roughness:.8}));h.position.y=.024,h.rotation.y=-.3,this.cleaningCloth.add(h);let d=new wt(new fe(.72,.3,.58),new Re({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}));d.position.y=.12,this.cleaningCloth.add(d),this.cleaningCloth.position.set(-3.55,1.1,.95),xe(this.cleaningCloth,{kind:"click",action:"clean-bench"}),e.add(this.cleaningCloth),this.case=od(this.theme.palette),this.case.position.set(2.35,1.03,-.35),e.add(this.case),this.caseScrews=Array.from({length:4},(u,f)=>{let g=new Ot,y=new wt(new Yi(.11,.11,.06,16),lt(13752284,"",{roughness:.38,metalness:.55}));y.rotation.x=Math.PI/2,g.add(y);let m=new wt(new fe(.105,.016,.016),lt(2699321,"",{roughness:.5,metalness:.4}));m.position.z=.036,g.add(m);let p=new wt(new li(.36,12,10),new Re({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}));g.add(p);let S=f%2===0?-.8:.8,E=f<2?.45:2.45;return g.position.set(S,E,1.77),g.userData.part="case-screw",g.userData.screwIndex=f,xe(g,{kind:"part",part:"case-screw"}),this.case.add(g),g}),this.screwTraySlots=this.caseScrews.map((u,f)=>new R(f%2===0?-.37:.07,1.33,f<2?1.38:1.72)),this.tray=ad(this.theme.palette),this.tray.position.set(-1.9,1.05,.25),e.add(this.tray),this.monitor=fd(this.theme.palette),this.monitor.position.set(-3.65,2.25,-1.55),this.monitor.rotation.y=.12,e.add(this.monitor),this.setMonitorDesktop(),this.character=gd(this.theme.palette),this.character.position.set(-1.1,1.02,-2.15),this.character.rotation.y=.08,e.add(this.character),this.motherboard=ld(this.theme.palette),this.motherboard.position.set(-1.95,1.16,.22),this.motherboard.rotation.y=.02,e.add(this.motherboard),this.cpu=cd(this.theme.palette),this.cpu.position.set(-.55,1.18,1.32),this.cpu.rotation.y=Math.PI/2,this.cpu.userData.part="cpu",xe(this.cpu,{kind:"part",part:"cpu"}),e.add(this.cpu),this.ram=ud(this.theme.palette),this.ram.position.set(.25,1.18,1.35),this.ram.rotation.y=Math.PI,xe(this.ram,{kind:"part",part:"ram"}),e.add(this.ram),this.cooler=hd(this.theme.palette),this.cooler.position.set(-.58,.1,-.38),this.cooler.visible=!1,xe(this.cooler,{kind:"click",action:"cooler"}),this.motherboard.add(this.cooler),xe(this.motherboard.userData.lever,{kind:"lever",action:"lever"}),xe(this.motherboard.userData.ramSlots,{kind:"click",action:"clips"}),this.clipHomes=this.motherboard.userData.ramSlots.children.filter(u=>u.name==="ram-clip").map(u=>({clip:u,position:u.position.clone(),rotation:u.rotation.clone()})),this.psu=dd(this.theme.palette),this.psu.position.set(2.4,1.53,-.6),this.psu.visible=!1,xe(this.psu,{kind:"click",action:"psu"}),e.add(this.psu),this.keyboard=pd(this.theme.palette),this.keyboard.position.set(-.2,1.07,1.9),this.keyboard.rotation.y=-.08,this.keyboard.visible=!1,e.add(this.keyboard),this.mouse=md(this.theme.palette),this.mouse.position.set(1.05,1.07,1.95),this.mouse.visible=!1,e.add(this.mouse),this.strap=vd(this.theme.palette),this.strap.position.set(-3.1,1.14,1.55),xe(this.strap,{kind:"part",part:"strap"}),e.add(this.strap),this.cameraProp=xd(this.theme.palette),this.cameraProp.position.set(-2.55,1.16,1.6),this.cameraProp.rotation.y=-.4,xe(this.cameraProp,{kind:"part",part:"camera"}),e.add(this.cameraProp),this.bins=yd(this.theme.palette),this.bins.position.set(1.05,1.06,-1.5),this.bins.rotation.y=.2,this.bins.visible=!1,xe(this.bins,{kind:"part",part:"bins"}),e.add(this.bins),this.powerStrip=_d(this.theme.palette),this.powerStrip.position.set(3.9,1.07,1.3),this.powerStrip.rotation.y=-.5,e.add(this.powerStrip),this.plug=bd(this.theme.palette),this.plug.position.set(3.88,1.16,1.32),this.plug.rotation.y=-.5,xe(this.plug,{kind:"part",part:"plug"}),e.add(this.plug),this.peripheralCable=Sd(this.theme.palette),this.peripheralCable.position.set(-3.45,2.02,-1.42),this.peripheralCable.rotation.y=.25,xe(this.peripheralCable,{kind:"click",action:"peripheral"}),e.add(this.peripheralCable),this.toolKit=Md(this.theme.palette),this.toolKit.position.set(2.95,1.08,1.9),this.toolKit.rotation.y=-.2,xe(this.toolKit,{kind:"click",action:"tools"}),e.add(this.toolKit),this.flashlight=wd(this.theme.palette),this.flashlight.position.set(3.25,1.2,1.9),this.flashlight.rotation.z=-.8,e.add(this.flashlight),this.buildGhosts(),this.buildFanCable(),this.buildOutline(this.bench,this.theme.palette),this.buildOutline(this.case,this.theme.palette),this.buildOutline(this.motherboard,this.theme.palette),this.buildOutline(this.cpu,this.theme.palette),this.buildOutline(this.ram,this.theme.palette),this.home={cpu:this.cpu.position.clone(),ram:this.ram.position.clone(),strap:this.strap.position.clone(),camera:this.cameraProp.position.clone(),bins:this.bins.position.clone(),plug:this.plug.position.clone()},this.interactiveObjects=[this.cpu,this.ram,this.strap,this.cameraProp,this.bins,this.plug,...this.caseScrews,this.peripheralCable,this.case.userData.powerHitTarget,this.case.userData.powerButton,this.character.userData.bracelet,this.motherboard.userData.lever,this.cooler,this.psu,this.toolKit,this.cleaningCloth],this.raycastTargets=[this.cpu,this.ram,this.strap,this.cameraProp,this.bins,this.plug,...this.caseScrews,this.peripheralCable,this.case.userData.powerHitTarget,this.case.userData.powerButton,this.case,this.character.userData.bracelet,this.motherboard.userData.lever,this.motherboard.userData.ramSlots,this.cooler,this.psu,this.toolKit,this.fanCable.userData.connector,this.cleaningCloth]}buildGhosts(){let t=(e,i,n,r)=>{let a=new Ot,o=new wt(new fe(e,i,n),new Re({color:r,transparent:!0,opacity:.16,depthWrite:!1}));a.add(o);let l=new Mn(new as(new fe(e,i,n)),new ln({color:r,transparent:!0,opacity:.9}));return a.add(l),a.userData.mesh=o,a.userData.edges=l,a.visible=!1,this.scene.add(a),a};this.ghostCpu=t(.58,.03,.58,this.theme.palette.accent2),this.ghostRam=t(.14,.06,1.2,this.theme.palette.accent2)}buildFanCable(){let t=new Ot;t.name="fan-cable";let e=lt(this.theme.palette.metal,"metal",{roughness:.35,metalness:.7}),i=lt(1514272,"",{roughness:.8,metalness:.05}),n=new Ot;n.add(new wt(new fe(.14,.08,.1),lt(15327954,"",{roughness:.7})));for(let a=0;a<4;a+=1)n.add(new wt(new fe(.02,.03,.02),e).translateX(-.045+a*.03).translateZ(.055));t.add(n);let r=new Ri([new R(0,0,0),new R(-.1,-.2,.05),new R(-.02,-.42,.18),new R(.16,-.5,.24)]);t.add(new wt(new $i(r,18,.014,5,!1),i)),t.position.set(1.56,2.8,-.18),t.rotation.y=.2,xe(n,{kind:"click",action:"fan-cable"}),t.userData.connector=n,t.visible=!1,this.scene.add(t),this.fanCable=t,this.fanCableHome=t.position.clone()}buildOutline(t,e){let i=e.accent2;t.traverse(n=>{if(!(!n.isMesh||n.userData.skipOutline)&&n.geometry?.attributes?.position)try{let r=new Mn(new as(n.geometry,28),new ln({color:i,transparent:!0,opacity:.4}));r.visible=!!this.theme.flags.outline,r.userData.outline=!0,r.userData.skipOutline=!0,n.add(r),this.edgeMaterials.push(r.material)}catch{}})}setMonitorDesktop(){let t=document.createElement("canvas");t.width=1024,t.height=576;let e=t.getContext("2d"),i=this.theme.palette;e.fillStyle="#071018",e.fillRect(0,0,1024,576),e.fillStyle=`#${(i.accent||11740702).toString(16).padStart(6,"0")}`,e.fillRect(0,0,1024,10),e.fillStyle="rgba(220, 244, 255, 0.86)",e.font="700 38px system-ui, sans-serif",e.fillText("TECHPRO WORKSTATION",72,110),e.font="500 20px monospace",e.fillStyle="rgba(190, 225, 240, 0.62)",e.fillText("Bench session ready",74,152),e.fillStyle="rgba(255,255,255,0.08)",e.fillRect(72,200,360,220),e.fillRect(468,200,480,96),e.fillRect(468,324,480,96),e.fillStyle=`#${(i.accent2||3038031).toString(16).padStart(6,"0")}`,e.fillRect(96,230,130,16),e.fillRect(96,264,220,10),e.fillRect(96,286,170,10),e.fillStyle="rgba(220, 244, 255, 0.5)",e.fillRect(500,232,240,12),e.fillRect(500,258,160,10);let n=new Wi(t);n.colorSpace=ve,this.monitor.userData.screenMat.map=n,this.monitor.userData.screenMat.needsUpdate=!0}setBoot(t){if(!this.bootTexture){this.bootTexture=Ic(this.theme.palette,t),this.monitor.userData.screenMat.map=this.bootTexture,this.monitor.userData.screenMat.needsUpdate=!0;return}let e=Ic(this.theme.palette,t);this.monitor.userData.screenMat.map?.dispose?.(),this.bootTexture=e,this.monitor.userData.screenMat.map=e,this.monitor.userData.screenMat.needsUpdate=!0}bindEvents(){let t=this.renderer.domElement;t.addEventListener("pointerdown",e=>this.onPointerDown(e)),t.addEventListener("pointermove",e=>this.onPointerMove(e)),t.addEventListener("pointerup",e=>this.onPointerUp(e)),t.addEventListener("pointercancel",e=>this.onPointerCancel(e)),t.addEventListener("wheel",e=>this.onWheel(e),{passive:!1}),t.addEventListener("contextmenu",e=>e.preventDefault()),t.addEventListener("keydown",e=>this.onKey(e)),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container)}resize(){if(!this.renderer||this.disposed)return;let t=Math.max(1,this.container.clientWidth),e=Math.max(1,this.container.clientHeight);this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}onKey(t){(t.key==="r"||t.key==="R")&&this.rotateSelected(),t.key==="Escape"&&this.callbacks.onEscape?.(),(t.key==="e"||t.key==="E")&&this.toggleExploded(),(t.key==="x"||t.key==="X")&&this.toggleXray(),(t.key==="Enter"||t.code==="Space")&&this.callbacks.canDrag?.("lever")&&(t.preventDefault(),this.callbacks.onClick?.("lever"))}pointerNdc(t){let e=this.renderer.domElement.getBoundingClientRect();return this.pointer.x=(t.clientX-e.left)/e.width*2-1,this.pointer.y=-((t.clientY-e.top)/e.height)*2+1,this.pointer}pointerDistanceTo(t,e){let i=e.clone().project(this.camera),n=this.renderer.domElement.getBoundingClientRect(),r=n.left+(i.x+1)*n.width/2,a=n.top+(1-i.y)*n.height/2;return Math.hypot(t.clientX-r,t.clientY-a)}pick(t){this.raycaster.setFromCamera(this.pointerNdc(t),this.camera);let e=this.motherboard.userData.lever;if(this.callbacks.canDrag?.("lever")){let n=this.raycaster.intersectObject(e,!0);if(n.length)return{object:e,hit:n[0]}}for(let n of["case-screw","cpu","ram"]){if(!this.callbacks.canDrag?.(n))continue;let r=n==="case-screw"?this.caseScrews.filter(o=>o.visible&&o.userData.interactive):[n==="cpu"?this.cpu:this.ram],a=this.raycaster.intersectObjects(r,!0);if(a.length){let o=a[0].object;for(;o&&o.userData?.interactive?.part!==n;)o=o.parent;if(o)return{object:o,hit:a[0]}}}let i=this.raycaster.intersectObjects(this.raycastTargets,!0);for(let n of i){let r=n.object;for(;r;){if(r.userData?.interactive){if(r.userData.interactive.part==="case-screw")for(;r.parent&&r.userData.screwIndex==null;)r=r.parent;return{object:r,hit:n}}r=r.parent}}return null}onPointerDown(t){if(t.button!==0&&t.button!==1&&t.button!==2)return;if(this.renderer.domElement.focus({preventScroll:!0}),this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.pointers.size===2){let[n,r]=[...this.pointers.values()];this.pinch={distance:Math.hypot(n.x-r.x,n.y-r.y),mid:{x:(n.x+r.x)/2,y:(n.y+r.y)/2}},this.drag=null,this.orbitPointer=null;return}if(t.button===2||t.button===1){t.preventDefault(),this.orbitPointer={id:t.pointerId,x:t.clientX,y:t.clientY},this.renderer.domElement.setPointerCapture?.(t.pointerId);return}let e=this.pick(t);if(e){let n=e.object.userData.interactive;if(n.kind==="part"){if(n.part==="cpu"&&this.level==="cpu"&&this.cpuSeated){this.audio.click(),this.callbacks.onClick?.("paste",e.object);return}if(n.part==="ram"&&this.ramPlaced&&!this.ramSeated){this.startSeat();return}if(this.level==="power"&&n.part==="ram"){this.audio.click(),this.callbacks.onClick?.("ram",e.object);return}this.startDrag(e.object,n.part,t);return}if(n.kind==="lever"){this.startLeverDrag(t);return}if(n.kind==="click"){this.audio.click(),this.callbacks.onClick?.(n.action,e.object);return}if(n.kind==="safety"){this.audio.click(),this.callbacks.onClick?.(n.action,e.object);return}}this.orbitPointer={id:t.pointerId,x:t.clientX,y:t.clientY},this.renderer.domElement.setPointerCapture?.(t.pointerId);let i=performance.now();i-this.lastTap<320&&this.focus("overview"),this.lastTap=i}startDrag(t,e,i){if(this.callbacks.canDrag&&!this.callbacks.canDrag(e)){this.callbacks.onBlocked?.(e);return}this.tweens.stop(t.position),e==="case-screw"&&this.scene.attach(t);let n=new R;this.raycaster.setFromCamera(this.pointerNdc(i),this.camera);let r=new Ke().setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(new R),t.position);this.raycaster.ray.intersectPlane(r,n)&&(this.drag={object:t,part:e,pointerId:i.pointerId,offset:t.position.clone().sub(n),plane:r,lastPoint:n.clone(),speed:0,lastTime:performance.now(),home:t.position.clone(),lift:0,moved:0,lastX:i.clientX,lastY:i.clientY},this.audio.pick(),this.callbacks.onPick?.(e),this.tweens.to(t.scale,{x:1.08,y:1.08,z:1.08},{duration:120,easing:"outBack"}),this.renderer.domElement.setPointerCapture?.(i.pointerId))}startLeverDrag(t){if(this.callbacks.canDrag&&!this.callbacks.canDrag("lever")){this.callbacks.onBlocked?.("lever");return}this.leverDrag={pointerId:t.pointerId,startY:t.clientY,closing:this.leverOpen,progress:this.leverOpen?1:0,moved:0},t.preventDefault(),this.renderer.domElement.setPointerCapture?.(t.pointerId)}onPointerMove(t){if(this.pointers.has(t.pointerId)&&this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.pinch&&this.pointers.size===2){let[e,i]=[...this.pointers.values()],n=Math.hypot(e.x-i.x,e.y-i.y),r={x:(e.x+i.x)/2,y:(e.y+i.y)/2},a=this.pinch.distance-n;this.cameraState.radius=qe.clamp(this.cameraState.radius+a*.012,3.2,15),this.cameraState.theta-=(r.x-this.pinch.mid.x)*.004,this.cameraState.phi=qe.clamp(this.cameraState.phi-(r.y-this.pinch.mid.y)*.003,.16,1.44),this.pinch={distance:n,mid:r};return}if(this.seat?.holding){let e=t.clientX-(this.seat.lastX??t.clientX);this.seat.lastX=t.clientX,this.seat.balance-=e*.0022,this.seat.balance=qe.clamp(this.seat.balance,-.9,.9);return}if(this.leverDrag?.pointerId===t.pointerId){let{startY:e,closing:i}=this.leverDrag;this.leverDrag.moved=Math.max(this.leverDrag.moved,Math.abs(t.clientY-e));let n=i?qe.clamp(1-(t.clientY-e)/52,0,1):qe.clamp((e-t.clientY)/52,0,1);this.leverDrag.progress=n,this.setLeverProgress(n);return}if(this.drag?.pointerId===t.pointerId){let e=t.clientX-this.drag.lastX,i=t.clientY-this.drag.lastY;this.drag.lastX=t.clientX,this.drag.lastY=t.clientY,this.drag.moved+=Math.hypot(e,i);let n=new R;if(this.raycaster.setFromCamera(this.pointerNdc(t),this.camera),!this.raycaster.ray.intersectPlane(this.drag.plane,n))return;let r=n.add(this.drag.offset);r.x=qe.clamp(r.x,-4.2,4.2),r.z=qe.clamp(r.z,-2.2,2.2),r.y=Math.max(1.28,r.y);let a=performance.now(),o=Math.max(.016,(a-this.drag.lastTime)/1e3),l=r.distanceTo(this.drag.lastPoint);this.drag.speed=qe.lerp(this.drag.speed,l/o,.35),this.drag.lastPoint.copy(r),this.drag.lastTime=a,this.drag.object.position.copy(r),this.updateGhost();return}if(this.orbitPointer&&this.orbitPointer.id===t.pointerId){let e=t.clientX-this.orbitPointer.x,i=t.clientY-this.orbitPointer.y;this.orbitPointer.x=t.clientX,this.orbitPointer.y=t.clientY,this.cameraState.theta-=e*.005,this.cameraState.phi=qe.clamp(this.cameraState.phi-i*.004,.16,1.44)}}onPointerUp(t){if(this.pointers.delete(t.pointerId),this.pinch&&this.pointers.size<2&&(this.pinch=null),this.leverDrag?.pointerId===t.pointerId){let{progress:e,closing:i,moved:n}=this.leverDrag;if(this.leverDrag=null,n<8){this.callbacks.onClick?.("lever");return}(i?e<=.28:e>=.72)?this.callbacks.onClick?.("lever"):(this.setLever(this.leverOpen),this.callbacks.onLeverDragIncomplete?.());return}if(this.seat?.holding){this.finishSeat();return}if(this.drag?.pointerId===t.pointerId){let e=this.drag;if(e.moved<9&&this.level==="safety"&&["strap","bins","camera","plug"].includes(e.part)){this.drag=null,this.ghostCpu.visible=!1,this.ghostRam.visible=!1,this.tweens.to(e.object.scale,{x:1,y:1,z:1},{duration:140,easing:"outBack"}),this.returnHome(e.object,e.home),this.audio.click(),this.callbacks.onClick?.(e.part,e.object);return}this.dropDrag(t);return}this.orbitPointer?.id===t.pointerId&&(this.orbitPointer=null)}onPointerCancel(t){if(this.pointers.delete(t.pointerId),this.pinch&&this.pointers.size<2&&(this.pinch=null),this.leverDrag?.pointerId===t.pointerId&&(this.leverDrag=null,this.setLever(this.leverOpen)),this.drag?.pointerId===t.pointerId){let{object:e,home:i}=this.drag;this.drag=null,this.ghostCpu.visible=!1,this.ghostRam.visible=!1,this.tweens.stop(e.position),this.tweens.to(e.scale,{x:1,y:1,z:1},{duration:120}),this.returnHome(e,i)}this.seat?.holding&&(this.seat=null,this.callbacks.onSeatCancel?.()),this.orbitPointer?.id===t.pointerId&&(this.orbitPointer=null)}onWheel(t){t.preventDefault(),this.cameraState.radius=qe.clamp(this.cameraState.radius+t.deltaY*.004,3.2,15)}updateGhost(){if(!this.drag)return;let{part:t,object:e}=this.drag;if(this.ghostCpu.visible=!1,this.ghostRam.visible=!1,t==="cpu"){let i=this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone()),n=this.cpuOrientationValid();this.ghostCpu.visible=!0,this.ghostCpu.position.set(i.x,i.y+.03,i.z),this.ghostCpu.rotation.y=e.rotation.y,this.setGhostColor(this.ghostCpu,n?this.theme.palette.accent2:12597547),this.callbacks.onGhost?.(n)}if(t==="ram"){let i=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone()),n=this.ramOrientationValid();this.ghostRam.visible=!0,this.ghostRam.position.copy(i),this.ghostRam.rotation.y=e.rotation.y,this.setGhostColor(this.ghostRam,n?this.theme.palette.accent2:12597547),this.callbacks.onGhost?.(n)}}setGhostColor(t,e){t.userData.mesh.material.color.setHex(e),t.userData.edges.material.color.setHex(e)}dropDrag(t){let e=this.drag;this.drag=null,this.ghostCpu.visible=!1,this.ghostRam.visible=!1,this.tweens.stop(e.object.position),this.tweens.to(e.object.scale,{x:1,y:1,z:1},{duration:140,easing:"outBack"});let{part:i,object:n}=e;if(i==="case-screw"){let r=n.userData.screwIndex,a=this.screwTraySlots[r];if(!a){this.returnHome(n,e.home),this.callbacks.onPartDrop?.({part:i,valid:!1,screwIndex:r});return}if(e.moved<9){this.returnHome(n,e.home);return}let o=a.clone().project(this.camera),l=this.renderer.domElement.getBoundingClientRect(),c=l.left+(o.x+1)*l.width/2,h=l.top+(1-o.y)*l.height/2,d=Math.hypot(t.clientX-c,t.clientY-h)<Math.max(100,Math.min(140,l.width*.2));d?(n.position.copy(a),n.userData.interactive=null,n.traverse(u=>{u.userData.interactive=null}),this.audio.clickSnap(),this.particles.sparkBurst(a,this.theme.palette.metal)):this.returnHome(n,e.home),this.callbacks.onPartDrop?.({part:i,valid:d,screwIndex:r});return}if(i==="cpu"){let r=this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone()),a=this.pointerDistanceTo(t,r),o=this.renderer.domElement.getBoundingClientRect(),l=Math.max(56,Math.min(84,o.width*.16)),c=this.cpuOrientationValid();if(a<l){if(!this.leverOpen){this.reject(n,"lever"),this.callbacks.onPartDrop?.({part:i,valid:!1,reason:"lever",speed:e.speed,height:0});return}if(!c){this.reject(n,"orientation"),this.callbacks.onPartDrop?.({part:i,valid:!1,reason:"orientation",speed:e.speed,height:0});return}this.audio.drop(),this.callbacks.onPartDrop?.({part:i,valid:!0,speed:e.speed,height:0});return}}if(i==="ram"){let r=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone()),a=this.pointerDistanceTo(t,r),o=this.renderer.domElement.getBoundingClientRect(),l=Math.max(56,Math.min(84,o.width*.16));if(a<l){if(!this.ramOrientationValid()){this.reject(n,"orientation"),this.callbacks.onPartDrop?.({part:i,valid:!1,reason:"orientation",speed:e.speed});return}this.audio.drop(),this.callbacks.onPartDrop?.({part:i,valid:!0,speed:e.speed});return}}if(i==="bracelet"){let r=this.tray.localToWorld(new R(-.6,.25,1.1)),a=this.pointerDistanceTo(t,r)<this.dropRadius();this.callbacks.onSafetyDrop?.({action:"bracelet",valid:a}),a?(this.character.userData.bracelet.visible=!1,this.audio.clickSnap(),this.particles.dustBurst(n.position,this.theme.palette.metal),n.visible=!1):this.reject(n,"target");return}if(i==="strap"){let r=this.character.localToWorld(new R(-.43,1.16,.03)),a=this.pointerDistanceTo(t,r)<this.dropRadius();this.callbacks.onSafetyDrop?.({action:"strap",valid:a}),a?(this.character.userData.wornStrap.visible=!0,this.audio.clickSnap(),this.particles.sparkBurst(r,this.theme.palette.accent),n.visible=!1):this.reject(n,"target");return}if(i==="camera"){let r=this.peripheralCable.getWorldPosition(new R),a=this.pointerDistanceTo(t,r)<this.dropRadius();this.callbacks.onSafetyDrop?.({action:"camera",valid:a}),a?(this.callbacks.onFlash?.(),this.audio.clickSnap(),this.tweens.to(n.position,this.home.camera,{duration:360,easing:"outCubic"})):this.reject(n,"target");return}if(i==="bins"){let r=new R(1,1.07,1.9),a=this.pointerDistanceTo(t,r)<this.dropRadius();this.callbacks.onSafetyDrop?.({action:"bins",valid:a}),a?(this.audio.clickSnap(),this.tweens.to(n.position,{x:1,y:1.07,z:1.9},{duration:360,easing:"outCubic"}),this.tweens.to(n.rotation,{y:0},{duration:300})):this.reject(n,"target");return}if(i==="plug"){let r=this.pointerDistanceTo(t,this.powerStrip.position)>this.dropRadius();this.callbacks.onSafetyDrop?.({action:"plug",valid:r}),r?(this.audio.clickSnap(),this.callbacks.onUnplugged?.()):this.reject(n,"target");return}this.returnHome(n,e.home)}reject(t,e){this.audio.error(),this.shake=this.motionReduced?0:.18,this.callbacks.onReject?.(e),this.tweens.to(t.position,{y:t.position.y+.14},{duration:100,easing:"outQuad"}),this.tweens.to(t.position,{y:Math.max(1.2,t.position.y)},{duration:240,delay:100,easing:"outElastic"}),this.tweens.to(t.rotation,{z:.18},{duration:90,easing:"outQuad"}),this.tweens.to(t.rotation,{z:0},{duration:260,delay:90,easing:"outElastic"}),this.particles.sparkBurst(t.position,16757575),t.userData.part&&this.returnHome(t,this.home[t.userData.part]||t.position.clone())}returnHome(t,e){this.tweens.to(t.position,{x:e.x,y:e.y,z:e.z},{duration:360,easing:"outCubic"})}dropRadius(){let t=this.renderer.domElement.getBoundingClientRect().width;return Math.max(96,Math.min(150,t*.2))}rotateSelected(){this.level==="cpu"&&!this.cpuSeated?(this.cpu.rotation.y+=Math.PI/2,this.audio.click(),this.tweens.to(this.cpu.scale,{x:1.12,y:1.12,z:1.12},{duration:80,easing:"outQuad"}),this.tweens.to(this.cpu.scale,{x:1,y:1,z:1},{duration:180,delay:80,easing:"outBack"}),this.callbacks.onRotate?.({part:"cpu",aligned:this.cpuOrientationValid()})):this.level==="ram"&&!this.ramPlaced&&(this.ram.rotation.y+=Math.PI,this.audio.click(),this.tweens.to(this.ram.scale,{x:1.12,y:1.12,z:1.12},{duration:80}),this.tweens.to(this.ram.scale,{x:1,y:1,z:1},{duration:180,delay:80,easing:"outBack"}),this.callbacks.onRotate?.({part:"ram",aligned:this.ramOrientationValid()}))}cpuOrientationValid(){let t=(this.cpu.rotation.y%(Math.PI*2)+Math.PI*2)%(Math.PI*2);return t<.08||t>Math.PI*2-.08}ramOrientationValid(){let t=(this.ram.rotation.y%(Math.PI*2)+Math.PI*2)%(Math.PI*2);return t<.08||t>Math.PI*2-.08}setLever(t){this.leverOpen=!!t;let e=this.motherboard.userData.lever;this.tweens.to(e.rotation,{x:t?-.7:0},{duration:260,easing:"outCubic"}),this.tweens.to(e.position,{y:t?.13:.05},{duration:260,easing:"outCubic"}),this.audio.clickSnap(),this.particles.sparkBurst(e.getWorldPosition(new R),this.theme.palette.metal)}setLeverProgress(t){let e=this.motherboard.userData.lever;e.rotation.x=-.7*t,e.position.y=.05+.08*t}openCasePanel(){this.tweens.to(this.case.userData.panel.position,{x:-1.95},{duration:420,easing:"outCubic"})}removeCasePanel(){this.caseScrews.forEach((t,e)=>{let i=this.screwTraySlots[e];i&&this.tweens.to(t.position,{x:i.x,y:i.y,z:i.z},{duration:360,easing:"outCubic"}),t.userData.interactive=null,t.traverse(n=>{n.userData.interactive=null})}),this.openCasePanel(),this.audio.clickSnap(),this.particles.sparkBurst(this.case.userData.panel.getWorldPosition(new R),this.theme.palette.metal),this.callbacks.onPanelRemoved?.()}removePartToTray(t,e,i){this.tweens.stop(t.position),this.tweens.to(t.position,{x:e.x,y:e.y,z:e.z},{duration:460,easing:"outCubic",onComplete:()=>{t.visible=!1}}),this.tweens.to(t.scale,{x:.72,y:.72,z:.72},{duration:360,easing:"inQuad"}),t.userData.interactive=null,t.traverse(n=>{n.userData.interactive=null}),this.audio.drop(),this.particles.dustBurst(t.getWorldPosition(new R),this.theme.palette.metal),this.callbacks.onPartRemoved?.(i)}removeRam(){let t=this.tray.localToWorld(new R(.45,.22,.15));this.removePartToTray(this.ram,t,"ram")}removeCooler(){this.removePartToTray(this.cooler,new R(-.58,.92,-.38),"cooler")}removePsu(){this.removePartToTray(this.psu,new R(4.1,1.2,-.6),"psu")}shutdownSafety(){this.safetyPoweredOff=!0,this.powerState="off",this.case.userData.rgb.material.emissiveIntensity=.05,this.monitor.userData.screenMat.map=null,this.monitor.userData.screenMat.color.setHex(329739),this.monitor.userData.screenMat.needsUpdate=!0,this.monitor.userData.led.material.color.setHex(3877412),this.audio.clickSnap(),this.particles.dustBurst(this.case.userData.powerButton.getWorldPosition(new R),this.theme.palette.metal),this.callbacks.onShutdown?.()}cleanBench(){let t=this.cleaningCloth;this.audio.clickSnap(),this.particles.dustBurst(t.position,this.theme.palette.accent2),this.tweens.to(t.position,{x:-2.05},{duration:380,easing:"inOutCubic",onComplete:()=>{t.visible=!1}})}arrangeBench(){let t=new R(1,1.07,1.9);this.tray.visible=!0,this.tray.position.set(-1.9,1.05,.25),this.bins.visible=!0,this.audio.clickSnap(),this.particles.sparkBurst(t,this.theme.palette.accent2),this.tweens.to(this.bins.position,{x:t.x,y:t.y,z:t.z},{duration:420,easing:"outCubic"}),this.tweens.to(this.bins.rotation,{y:0},{duration:320}),this.tweens.to(this.toolKit.rotation,{y:this.toolKit.rotation.y+.35},{duration:260,easing:"outCubic"})}disconnectPeripheral(){this.peripheralDisconnected=!0,this.audio.clickSnap(),this.tweens.to(this.peripheralCable.rotation,{z:-.5,y:.75},{duration:280,easing:"outCubic"}),this.particles.dustBurst(this.peripheralCable.getWorldPosition(new R),this.theme.palette.metal),this.callbacks.onPeripheralDisconnected?.()}unplugPower(){this.audio.clickSnap(),this.tweens.to(this.plug.position,{x:5.15,y:1.16,z:2.3},{duration:420,easing:"outCubic"}),this.tweens.to(this.plug.rotation,{y:.8,z:.25},{duration:360,easing:"outCubic"}),this.particles.dustBurst(this.plug.getWorldPosition(new R),this.theme.palette.metal),this.callbacks.onUnplugged?.()}openRamClips(){this.clipsOpen||(this.clipsOpen=!0,this.motherboard.userData.ramSlots.children.filter(t=>t.name==="ram-clip").forEach(t=>{let e=t.position.z<-.2?-1:1;this.tweens.to(t.rotation,{x:e*.55},{duration:220,easing:"outBack"}),this.tweens.to(t.position,{z:t.position.z+e*.06},{duration:220,easing:"outBack"})}),this.audio.clickSnap(),this.callbacks.onClipsOpen?.())}closeRamClips(){this.clipsOpen&&(this.clipsOpen=!1,this.motherboard.userData.ramSlots.children.filter(t=>t.name==="ram-clip").forEach(t=>{let e=t.position.z<-.2?-1:1;this.tweens.to(t.rotation,{x:0},{duration:220,easing:"outCubic"}),this.tweens.to(t.position,{z:t.position.z-e*.06},{duration:220,easing:"outCubic"})}),this.audio.clickSnap(),this.callbacks.onClipsClosed?.())}removeBracelet(){let t=this.character.userData.bracelet;t.visible&&(this.audio.clickSnap(),this.particles.dustBurst(t.getWorldPosition(new R),this.theme.palette.metal),this.tweens.to(t.scale,{x:.1,y:.1,z:.1},{duration:260,easing:"inQuad",onComplete:()=>{t.visible=!1}}),this.callbacks.onJewelryRemoved?.())}prepareBins(){let t=new R(1,1.07,1.9);this.audio.clickSnap(),this.tweens.to(this.bins.position,{x:t.x,y:t.y,z:t.z},{duration:420,easing:"outCubic"}),this.tweens.to(this.bins.rotation,{y:0},{duration:320}),this.particles.sparkBurst(t,this.theme.palette.accent2),this.callbacks.onBinsReady?.()}wearStrap(){let t=this.strap;t.visible&&(this.character.userData.wornStrap.visible=!0,this.character.userData.bracelet.visible=!1,this.audio.clickSnap(),this.particles.sparkBurst(this.character.userData.wornStrap.getWorldPosition(new R),this.theme.palette.accent),this.tweens.to(t.scale,{x:.1,y:.1,z:.1},{duration:240,easing:"inQuad",onComplete:()=>{t.visible=!1}}),this.callbacks.onStrapWorn?.())}documentConnections(){this.audio.clickSnap(),this.particles.sparkBurst(this.peripheralCable.getWorldPosition(new R),this.theme.palette.accent2),this.callbacks.onDocumented?.(),this.callbacks.onFlash?.()}applyPaste(){if(this.pasteApplied=!0,!this.pasteBlob){let t=new wt(new Yi(.09,.11,.018,18),lt(13222840,"",{roughness:.55,metalness:.1}));t.position.set(0,.07,0),t.userData.skipOutline=!0,this.cpu.add(t),this.pasteBlob=t}this.pasteBlob.visible=!0,this.pasteBlob.scale.setScalar(.1),this.tweens.to(this.pasteBlob.scale,{x:1,y:1,z:1},{duration:320,easing:"outBack"}),this.audio.paste(),this.callbacks.onPasteApplied?.()}showCoolerReady(){if(this.cpuSeated){this.cooler.visible=!0;let t=this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone()),e=t.y+.11;this.cooler.position.set(t.x,e+1,t.z),this.cooler.scale.set(1,1,1),this.tweens.to(this.cooler.position,{y:e},{duration:460,easing:"outCubic"}),this.audio.whoosh(),this.callbacks.onCoolerReady?.()}}mountCooler(){if(!this.cooler.visible)return;let t=this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone());this.tweens.stop(this.cooler.position),this.cooler.position.set(t.x,t.y+.11,t.z),this.audio.snap(),this.particles.sparkBurst(this.cooler.getWorldPosition(new R),this.theme.palette.accent),this.callbacks.onCoolerMounted?.()}reseatRamPower(){this.audio.clickSnap();let t=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());this.tweens.stop(this.ram.position),this.ram.position.copy(t),this.particles.sparkBurst(this.ram.getWorldPosition(new R),this.theme.palette.accent2),this.callbacks.onRamReseated?.()}checkPsu(){this.audio.clickSnap(),this.particles.sparkBurst(this.psu.getWorldPosition(new R),this.theme.palette.accent),this.tweens.to(this.psu.scale,{x:1.04,y:1.04,z:1.04},{duration:140}),this.tweens.to(this.psu.scale,{x:1,y:1,z:1},{duration:220,delay:140,easing:"outBack"}),this.callbacks.onPsuChecked?.()}checkMonitorCable(){this.audio.clickSnap(),this.particles.sparkBurst(this.peripheralCable.getWorldPosition(new R),this.theme.palette.metal),this.tweens.to(this.peripheralCable.rotation,{z:0,y:.25},{duration:320,easing:"outCubic"}),this.callbacks.onMonitorCableChecked?.()}seatCpu({gentle:t=!0}={}){this.cpuSeated=!0;let e=this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone());this.tweens.stop(this.cpu.position),this.tweens.stop(this.cpu.rotation),this.cpu.position.set(e.x,e.y+.03,e.z),this.cpu.rotation.set(0,0,0),this.audio.snap(),this.particles.dustBurst(e,this.theme.palette.metal),this.callbacks.onCpuSeated?.(t)}seatRamReady(){this.ramPlaced=!0;let t=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());this.tweens.stop(this.ram.position),this.tweens.stop(this.ram.rotation),this.tweens.to(this.ram.position,{x:t.x,y:t.y+.1,z:t.z},{duration:340,easing:"outCubic"}),this.tweens.to(this.ram.rotation,{y:0},{duration:260,easing:"outCubic"}),this.audio.drop(),this.callbacks.onRamPlaced?.()}startSeat(){this.seat||(this.seat={holding:!0,pressure:0,balance:0,elapsed:0,tiltTime:0,lastX:null},this.audio.paste(),this.callbacks.onSeatStart?.())}nudgeSeat(t){this.seat&&(this.seat.balance=qe.clamp(this.seat.balance-t*.0022,-.9,.9))}finishSeat(){if(!this.seat)return;let t=this.seat;this.seat=null;let e=Math.abs(t.balance)<.36&&t.tiltTime<.45,i=t.pressure,n=i>=.65&&i<=.9&&e;n?this.completeRam():this.failRam({pressure:i,balanced:e}),this.callbacks.onSeatResult?.({ok:n,pressure:i,balanced:e,overpressure:i>.9,underpressure:i<.65})}completeRam(){this.ramSeated=!0;let t=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());this.tweens.stop(this.ram.position),this.tweens.stop(this.ram.rotation),this.ram.position.copy(t),this.ram.rotation.set(0,0,0),this.audio.snap(),this.particles.sparkBurst(t,this.theme.palette.accent2),this.callbacks.onRamSeated?.()}failRam({pressure:t,balanced:e}){this.ramPlaced=!0,this.audio.error(),this.shake=this.motionReduced?0:.2;let i=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());this.tweens.to(this.ram.position,{x:i.x,y:i.y+.14,z:i.z},{duration:360,easing:"outCubic"}),this.tweens.to(this.ram.rotation,{z:0},{duration:200}),this.particles.sparkBurst(this.ram.position,16757575),this.callbacks.onRamFailed?.({pressure:t,balanced:e})}setRamSeatVisual(t,e){if(!this.ramPlaced)return;this.ram.rotation.z=e*.26;let i=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());this.ram.position.y=i.y+.1-t*.1}mountBoardInCase(){let e=this.case.userData.boardMount.getWorldPosition(new R);this.tweens.to(this.motherboard.position,{x:e.x,y:e.y,z:e.z},{duration:900,easing:"inOutCubic"}),this.tweens.to(this.motherboard.rotation,{x:0,y:0,z:-Math.PI/2},{duration:900,easing:"inOutCubic"}),this.tweens.to(this.motherboard.scale,{x:.82,y:.82,z:.82},{duration:900,easing:"inOutCubic"}),this.psu.visible=!0,this.fanCable.visible=!0,this.tweens.delay(.95,()=>{let i=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());this.level==="power"&&this.ram.position.copy(i),this.callbacks.onBoardMounted?.()})}setPowerState(t){this.powerState=t;let e=t==="on"||t==="booting";this.case.userData.rgb.material.emissiveIntensity=e?1.8:.12,this.monitor.userData.led.material.color.setHex(e?this.theme.palette.accent:3877412),(t==="off"||t==="fault")&&(this.monitor.userData.screenMat.map=null,this.monitor.userData.screenMat.color.setHex(329739),this.monitor.userData.screenMat.needsUpdate=!0),e&&(this.bootProgress=0,this.setBoot(.04),this.audio.fan())}powerOn(){this.powerState="booting",this.powerProgress=0,this.setPowerState("booting"),this.callbacks.onPowerOn?.()}bootStep(t){this.powerState==="booting"&&(this.powerProgress=Math.min(1,this.powerProgress+t*.55),this.powerProgress<.98?(!this.lastBootDraw||this.time-this.lastBootDraw>.14)&&(this.lastBootDraw=this.time,this.setBoot(this.powerProgress)):(this.powerState="on",this.setBoot(1),this.callbacks.onBooted?.()))}powerFault(){this.powerState="fault",this.setPowerState("fault"),this.shake=this.motionReduced?0:.3,this.callbacks.onPowerFault?.()}fixFanCable(){this.faultFixed=!0,this.audio.snap(),this.particles.sparkBurst(this.fanCable.position,this.theme.palette.accent),this.tweens.to(this.fanCable.position,{x:1.57,y:2.73,z:-.18},{duration:320,easing:"outBack"}),this.callbacks.onFaultFixed?.()}inspectFanCable(){this.audio.click(),this.particles.dustBurst(this.fanCable.userData.connector.getWorldPosition(new R),this.theme.palette.metal),this.callbacks.onFanInspected?.()}setLevel(t,{instant:e=!1}={}){this.tweens.clear(),this.level=t,this.ghostCpu.visible=!1,this.ghostRam.visible=!1,this.drag=null,this.leverDrag=null,this.seat=null,this.ramPlaced=!1,this.ramSeated=!1,this.cpuSeated=!1,this.faultFixed=!1,this.safetyPoweredOff=!1,this.peripheralDisconnected=!1,this.pasteApplied=!1,this.powerState="off",this.fanCable.visible=!1,this.fanCable.position.copy(this.fanCableHome),this.psu.visible=!1,this.psu.position.set(2.4,1.53,-.6),this.psu.scale.set(1,1,1),this.keyboard.visible=!1,this.mouse.visible=!1,this.cooler.visible=!1,this.cooler.position.set(-.58,.1,-.38),this.cooler.scale.set(1,1,1),this.motherboard.visible=!0,this.motherboard.position.set(-1.95,1.16,.22),this.motherboard.rotation.set(0,.02,0),this.motherboard.scale.set(1,1,1),this.cpu.visible=!0,this.cpu.position.copy(this.home.cpu),this.cpu.rotation.set(0,-Math.PI/2,0),this.ram.visible=!0,this.ram.position.copy(this.home.ram),this.ram.rotation.set(0,Math.PI,0);let i={kind:"part",part:"ram"};this.ram.userData.interactive=i,this.ram.traverse(a=>{a.userData.interactive=i});let n={kind:"click",action:"cooler"};this.cooler.userData.interactive=n,this.cooler.traverse(a=>{a.userData.interactive=n});let r={kind:"click",action:"psu"};if(this.psu.userData.interactive=r,this.psu.traverse(a=>{a.userData.interactive=r}),this.strap.visible=!0,this.strap.position.copy(this.home.strap),this.strap.scale.set(1,1,1),this.cameraProp.visible=!0,this.cameraProp.position.copy(this.home.camera),this.bins.visible=!1,this.bins.position.copy(this.home.bins),this.plug.visible=!0,this.plug.position.copy(this.home.plug),this.character.visible=!0,this.character.userData.bracelet.visible=!0,this.character.userData.bracelet.scale.set(1,1,1),this.character.userData.wornStrap.visible=!1,this.peripheralCable.visible=!0,this.peripheralCable.rotation.set(0,.25,0),this.powerStrip.visible=!0,this.tray.visible=!0,this.toolKit.rotation.y=-.2,this.toolKit.scale.set(1,1,1),this.case.userData.panel.position.x=-1.45,this.cleaningCloth.visible=t==="safety",this.cleaningCloth.position.set(-3.55,1.1,.95),this.cleaningCloth.scale.set(1,1,1),this.tray.visible=t!=="safety",this.caseScrews.forEach((a,o)=>{let l=o%2===0?-.8:.8,c=o<2?.45:2.45;this.case.add(a),a.position.set(l,c,1.77),a.rotation.set(0,0,0),a.scale.set(1,1,1),a.visible=t==="cpu"||t==="reverse",a.userData.interactive={kind:"part",part:"case-screw"},a.traverse(h=>{h.userData.interactive=a.userData.interactive})}),this.exploded=!1,this.leverOpen=!1,this.clipsOpen=!1,this.clipHomes?.forEach(({clip:a,position:o,rotation:l})=>{a.position.copy(o),a.rotation.copy(l)}),this.motherboard.userData.lever.rotation.set(0,0,0),this.motherboard.userData.lever.position.set(.32,.05,-.38),this.case.userData.rgb.material.emissiveIntensity=.12,this.monitor.userData.screenMat.map=null,this.monitor.userData.screenMat.color.setHex(329739),this.monitor.userData.screenMat.needsUpdate=!0,this.monitor.userData.led.material.color.setHex(this.theme.palette.accent),this.pasteBlob&&(this.pasteBlob.visible=!1),this.highlightRing&&(this.highlightRing.visible=!1),t==="safety")this.tray.visible=!1,this.motherboard.visible=!1,this.cpu.visible=!1,this.ram.visible=!1,this.strap.visible=!0,this.cameraProp.visible=!0,this.bins.visible=!1,this.bins.position.set(3.95,1.06,.8),this.bins.rotation.set(0,.2,0),this.powerState="on",this.case.userData.rgb.material.emissiveIntensity=1.4,this.setMonitorDesktop(),this.monitor.userData.screenMat.color.setHex(16777215),this.monitor.userData.screenMat.needsUpdate=!0,this.monitor.userData.led.material.color.setHex(this.theme.palette.accent),this.focus("safety",e);else if(t==="reverse"){this.character.userData.wornStrap.visible=!1,this.character.userData.bracelet.visible=!0,this.bins.visible=!0,this.bins.position.set(.2,1.07,1.55),this.bins.rotation.set(0,0,0),this.tray.visible=!0,this.cpu.visible=!0,this.ram.visible=!0,this.cooler.visible=!0,this.psu.visible=!0,this.keyboard.visible=!0,this.mouse.visible=!0,this.peripheralCable.visible=!0,this.powerStrip.visible=!0,this.plug.visible=!0,this.strap.visible=!0,this.cameraProp.visible=!0,this.case.userData.panel.position.x=-1.95,this.powerState="on",this.case.userData.rgb.material.emissiveIntensity=1.4,this.setMonitorDesktop(),this.monitor.userData.screenMat.color.setHex(16777215),this.monitor.userData.screenMat.needsUpdate=!0,this.monitor.userData.led.material.color.setHex(this.theme.palette.accent);let a={kind:"click",action:"remove-ram",part:"ram"};this.ram.userData.interactive=a,this.ram.traverse(o=>{o.userData.interactive=a}),this.focus("safety",e)}else t==="cpu"?(this.character.userData.wornStrap.visible=!0,this.character.userData.bracelet.visible=!1,this.bins.visible=!0,this.bins.position.set(.2,1.07,1.55),this.bins.rotation.set(0,0,0),this.cpu.rotation.y=-Math.PI/2,this.cooler.visible=!1,this.ram.visible=!1,this.psu.visible=!1,this.keyboard.visible=!1,this.mouse.visible=!1,this.peripheralCable.visible=!1,this.powerStrip.visible=!1,this.plug.visible=!1,this.strap.visible=!1,this.cameraProp.visible=!1,this.focus("cpu",e)):t==="ram"?(this.character.userData.wornStrap.visible=!0,this.character.userData.bracelet.visible=!1,this.bins.visible=!1,this.cpu.visible=!1,this.cooler.visible=!0,this.cooler.position.set(-.58,.1,-.38),this.cpuSeated=!0,this.ram.rotation.y=Math.PI,this.peripheralCable.visible=!1,this.powerStrip.visible=!1,this.plug.visible=!1,this.strap.visible=!1,this.cameraProp.visible=!1,this.focus("ram",e)):t==="power"&&(this.tray.visible=!1,this.character.visible=!1,this.strap.visible=!1,this.cameraProp.visible=!1,this.bins.visible=!1,this.peripheralCable.visible=!0,this.powerStrip.visible=!1,this.plug.visible=!1,this.cpu.visible=!1,this.ram.visible=!0,this.ram.position.set(.61,1.9,-.18),this.ram.rotation.set(0,0,0),this.cooler.visible=!0,this.cooler.position.set(-.58,.1,-.38),this.psu.visible=!0,this.keyboard.visible=!0,this.mouse.visible=!0,this.fanCable.visible=!0,this.fanCable.position.copy(this.fanCableHome),this.mountBoardInCase(),this.focus("power",e));this.callbacks.onLevelRender?.(t)}focus(t,e=!1){let i=Ad[t]||Ad.overview;if(this.cameraGoal=i,e){this.cameraState.theta=i.theta,this.cameraState.phi=i.phi,this.cameraState.radius=i.radius,this.cameraTarget.set(...i.target);return}this.audio.whoosh();let n=this.motionReduced?1:680;this.tweens.to(this.cameraState,{theta:i.theta,phi:i.phi,radius:i.radius},{duration:n,easing:"inOutCubic"}),this.tweens.to(this.cameraTarget,{x:i.target[0],y:i.target[1],z:i.target[2]},{duration:n,easing:"inOutCubic"})}toggleExploded(){this.exploded=!this.exploded;let t=this.exploded?.55:0;this.tweens.to(this.case.userData.panel.position,{x:-1.45-t*.9},{duration:420,easing:"outCubic"}),this.tweens.to(this.motherboard.position,{x:this.motherboard.position.x+(this.exploded?.35:-.35)},{duration:420,easing:"outCubic"}),this.callbacks.onExploded?.(this.exploded)}toggleXray(){this.xray=!this.xray,this.motherboard.userData.labels.forEach(t=>{t.visible=this.xray}),this.case.traverse(t=>{t.isMesh&&t.material&&["case","caseTrim"].includes(t.material.userData.role)&&(t.material.transparent=this.xray,t.material.opacity=this.xray?.22:1,t.material.needsUpdate=!0)}),this.callbacks.onXray?.(this.xray)}highlight(t){if(!t){this.highlightRing&&(this.highlightRing.visible=!1),this.highlighted=null;return}if(!this.highlightRing){let i=new wt(new Ve(.34,.025,8,36),new Re({color:this.theme.palette.accent,transparent:!0,opacity:.9,depthWrite:!1}));i.renderOrder=6,this.scene.add(i),this.highlightRing=i}let e=this.findTargetObject(t);e&&(this.highlighted=e,this.highlightRing.visible=!0,this.highlightRing.material.color.setHex(this.theme.palette.accent))}findTargetObject(t){return{power:this.case.userData.powerHitTarget,"power-button":this.case.userData.powerHitTarget,"clean-cloth":this.cleaningCloth,"case-screw":this.caseScrews.find(i=>i.visible&&i.userData.interactive),plug:this.plug,peripheral:this.peripheralCable,bracelet:this.character.userData.bracelet,strap:this.strap,bins:this.bins,camera:this.cameraProp,lever:this.motherboard.userData.lever,clips:this.motherboard.userData.ramSlots,"ram-clips":this.motherboard.userData.ramSlots,cpu:this.cpu,ram:this.ram,cooler:this.cooler,psu:this.psu,tools:this.toolKit,"monitor-cable":this.peripheralCable,"fan-cable":this.fanCable.userData.connector,socket:this.motherboard.userData.socket,"ram-slot":this.motherboard.userData.ramSlots}[t]||null}setTheme(t){this.theme=t;let e=t.palette;this.scene&&(this.scene.background.setHex(e.bg),this.scene.fog.color.setHex(e.fog),this.renderer.toneMappingExposure=t.id==="neon"?1.2:t.id==="contrast"?1.4:1.05,this.lights.hemi.color.setHex(t.flags.dark?10209279:16777215),this.lights.hemi.groundColor.setHex(t.id==="lofi"?3810328:4930093),this.lights.key.color.setHex(t.id==="lofi"?16763018:t.id==="neon"?12580607:16773596),this.lights.key.intensity=t.flags.dark?1.5:2.1,this.lights.fill.color.setHex(t.id==="neon"?16732120:12180735),this.lights.rim.color.setHex(e.accent),this.grid.visible=!!t.flags.grid,this.grid.material.color.setHex(e.accent),this.grid.material.opacity=t.id==="neon"?.28:.16,this.scene.traverse(i=>{if(!i.isMesh&&!i.isSprite)return;let n=i.material;if(!n||Array.isArray(n))return;let r=n.userData?.role;if(!r)return;if(r==="pcb"){if(this.motherboard?.userData){this.motherboard.userData.pcbTexture?.dispose?.();let o=Pc(e);this.motherboard.userData.pcbTexture=o,n.map=o}n.color.setHex(16777215),n.needsUpdate=!0;return}let a=e[r];typeof a=="number"&&(n.color.setHex(a),t.flags.emissive&&["accent","accent2","caseTrim"].includes(r)?(n.emissive.setHex(a),n.emissiveIntensity=r==="accent"?1.1:.45):n.emissive&&(n.emissive.setHex(r==="accent"?e.accent:0),n.emissiveIntensity=r==="accent"?.18:0),t.id==="contrast"&&(n.roughness=1,n.metalness=0),n.needsUpdate=!0)}),this.edgeMaterials.forEach(i=>{i.color.setHex(t.id==="blueprint"?12576511:t.id==="neon"?e.accent:t.id==="contrast"?16777215:e.accent2),i.opacity=t.id==="blueprint"?.75:.4}),this.setEdgeVisibility(t.flags.outline),this.container&&(this.container.classList.toggle("is-pixel",t.id==="pixel"),this.container.classList.toggle("is-blueprint",t.id==="blueprint"),this.container.classList.toggle("is-contrast",t.id==="contrast"),this.container.classList.toggle("is-neon",t.id==="neon")),this.motionReduced=!!t.flags.reduced,this.fpsGuard.level||(this.quality=Go(this.qualitySetting||"auto"),this.applyQuality()),this.level==="safety"&&this.powerState!=="off"?(this.setMonitorDesktop(),this.monitor.userData.screenMat.color.setHex(16777215),this.monitor.userData.screenMat.needsUpdate=!0):(this.powerState==="booting"||this.powerState==="on")&&this.setBoot(this.powerProgress||1))}setEdgeVisibility(t){this.scene.traverse(e=>{e.userData?.outline&&(e.visible=t)})}applyQuality(){if(!this.renderer)return;let t=this.theme,e=this.quality.dpr;t.id==="pixel"&&(e=Math.min(e,.7)),this.quality.tier==="low"&&(e=Math.min(e,1)),this.renderer.setPixelRatio(e),this.renderer.shadowMap.enabled=this.quality.shadows&&!!t.flags.shadows,this.lights.key.castShadow=this.renderer.shadowMap.enabled,this.particles?.setScale(this.quality.particles),this.resize(),this.onQuality?.(this.quality,this.fpsGuard.fps)}downgrade(t,e){t===1?(this.renderer.setPixelRatio(Math.min(1,this.quality.dpr)),this.renderer.shadowMap.enabled=!1,this.lights.key.castShadow=!1,this.particles?.setScale(.55)):(this.renderer.setPixelRatio(.8),this.particles?.setScale(.25),this.motionReduced=!0),this.onQuality?.({...this.quality,tier:"auto \xB7 light",label:"Auto \xB7 light",dpr:this.renderer.getPixelRatio(),shadows:!1,particles:this.particles?.scale||.25},e)}setSettings(t){let e=this.qualitySetting;this.settings=t,this.qualitySetting=t.quality||"auto",this.audio?.setEnabled(t.sound!==!1),this.qualitySetting!==e&&(this.fpsGuard.reset(),this.quality=Go(this.qualitySetting),this.applyQuality()),this.motionReduced=t.motion==="reduced"||!!this.theme.flags.reduced}updateCamera(t){let e=this.cameraState,i=this.cameraTarget,n=Math.sin(e.phi),r=qe.clamp(1.2/this.camera.aspect,1,1.65),a=e.radius*r,o=i.x+a*n*Math.sin(e.theta),l=i.y+a*Math.cos(e.phi),c=i.z+a*n*Math.cos(e.theta);if(this.camera.position.set(o,l,c),this.shake>.001){let h=this.shake;this.camera.position.x+=(Math.random()-.5)*h,this.camera.position.y+=(Math.random()-.5)*h,this.camera.position.z+=(Math.random()-.5)*h,this.shake*=Math.pow(.02,t),this.shake<.001&&(this.shake=0)}this.camera.lookAt(i)}updateSeat(t){if(!this.seat)return;this.seat.elapsed+=t,this.seat.pressure=Math.min(1.15,this.seat.pressure+t*.42);let e=Math.sin(this.seat.elapsed*2.6)*.38+Math.sin(this.seat.elapsed*5.1)*.16;this.seat.balance+=e*t,this.seat.balance=qe.clamp(this.seat.balance,-.9,.9),Math.abs(this.seat.balance)>.44?this.seat.tiltTime+=t:this.seat.tiltTime=Math.max(0,this.seat.tiltTime-t*2),this.setRamSeatVisual(this.seat.pressure,this.seat.balance),this.callbacks.onSeatProgress?.({pressure:this.seat.pressure,balance:this.seat.balance,tilt:this.seat.tiltTime})}updateFan(t){(this.powerState==="on"||this.powerState==="booting"||this.level==="safety"&&this.powerState==="off"&&!this.safetyPoweredOff)&&(this.case.userData.fan.rotation.z+=t*9,this.cooler.visible&&(this.cooler.userData.fan.rotation.y+=t*12)),this.level==="power"&&this.powerState==="fault"&&(this.case.userData.fan.rotation.z=0),(this.powerState==="booting"||this.powerState==="on")&&(this.case.userData.rgb.material.emissiveIntensity=1.2+Math.sin(this.time*2.4)*.3)}updateHighlight(){if(!this.highlightRing?.visible||!this.highlighted)return;let t=this.highlighted.getWorldPosition(new R);this.highlightRing.position.copy(t),this.highlightRing.quaternion.copy(this.camera.quaternion);let e=1+Math.sin(this.time*5)*.16;this.highlightRing.scale.setScalar(e),this.highlightRing.material.opacity=.55+Math.sin(this.time*5)*.25}loop(){if(this.disposed)return;this.frame=requestAnimationFrame(this.loop);let t=performance.now(),e=Math.min(.05,(t-this.lastFrame)/1e3);this.lastFrame=t,this.time+=e,this.tweens.update(e),this.updateCamera(e),this.updateSeat(e),this.updateFan(e),this.bootStep(e),this.updateHighlight(),this.particles?.update(e),(this.theme.id==="lofi"||this.theme.id==="marshmallow"||this.theme.id==="candy")&&this.particles?.ambientDust(),this.fpsGuard.update(e)<42&&this.renderer.setPixelRatio(Math.min(this.renderer.getPixelRatio(),1)),this.renderer.render(this.scene,this.camera)}getStats(){return{calls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,fps:this.fpsGuard.fps,dpr:this.renderer.getPixelRatio()}}dispose(){this.disposed=!0,cancelAnimationFrame(this.frame),this.resizeObserver?.disconnect(),this.tweens.clear(),this.particles?.dispose(),this.scene?.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(i=>{i.map?.dispose?.(),i.dispose?.()})}),this.renderer?.dispose(),this.renderer?.domElement?.remove()}};var Bv=["safety","reverse","cpu","ram","power"];function Rd(s){return String(s??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}var Cd={power:"power","fan-cable":"fan-cable",psu:"psu",lever:"lever",clips:"clips",cooler:"cooler",bracelet:"bracelet",strap:"strap",camera:"camera","clean-cloth":"clean-bench",bins:"bins",tools:"tools",plug:"plug",peripheral:"peripheral"},_r={cpu:"socket",ram:"ram-slot",strap:"wrist",camera:"monitor",bins:"parts-tray","case-screw":"parts-tray"},kv=new Set(["cpu","ram","case-screw"]),Pd={socket:"cpu","ram-slot":"ram",wrist:"strap",monitor:"camera","parts-tray":"case-screw"},Xo=class{constructor({container:t,theme:e,settings:i={},audio:n,callbacks:r={}}){this.container=t,this.theme=e,this.settings=i,this.audio=n,this.callbacks=r,this.level="safety",this.leverOpen=!1,this.clipsOpen=!1,this.cpuRotation=0,this.ramRotation=0,this.cpuSeated=!1,this.ramPlaced=!1,this.ramSeated=!1,this.powerState="off",this.seat=null,this.seatTimer=null,this.bootTimer=null,this.screwsRemoved=0,this.disposed=!1,this.debug=new URLSearchParams(window.location.search).has("debug"),this.build(),this.setTheme(e),this.setLevel("safety",{instant:!0})}build(){let t=(e,i,n,r="")=>`
      <button class="bench2d-part bench2d-${e}" type="button" data-part="${e}"
        data-parts="reverse ${n}" ${r} aria-label="${Rd(i)}"><span>${Rd(i)}</span></button>`;this.container.innerHTML=`
      <div class="bench2d" data-bench2d data-debug="${this.debug?"1":"0"}">
        <div class="bench2d-bench" data-bench role="application" aria-label="Top-down workbench">
          <div class="bench2d-zone bench2d-monitor" data-part="monitor" data-drop="monitor" data-parts="reverse safety cpu ram power">
            <span class="bench2d-screen" data-screen>Bench session ready</span>
            <span class="bench2d-tag">Monitor</span>
            <button class="bench2d-hit bench2d-port" type="button" data-part="peripheral" data-parts="reverse safety power" aria-label="Monitor cable">CABLE</button>
          </div>

          <div class="bench2d-zone bench2d-case" data-part="case" data-parts="reverse safety cpu ram power">
            <span class="bench2d-tag">Case</span>
            <span class="bench2d-fan" data-fan aria-hidden="true"></span>
            <button class="bench2d-hit bench2d-power" type="button" data-part="power" data-parts="reverse safety power" aria-label="Case power button"></button>
            <button class="bench2d-hit bench2d-fancable" type="button" data-part="fan-cable" data-parts="reverse power" aria-label="CPU fan connector">FAN</button>
            <div class="bench2d-screws" data-screws>
              <button class="bench2d-hit bench2d-screw" type="button" data-part="case-screw" data-drag="case-screw" data-parts="reverse cpu" aria-label="Case-panel screw 1"></button>
              <button class="bench2d-hit bench2d-screw" type="button" data-part="case-screw" data-drag="case-screw" data-parts="reverse cpu" aria-label="Case-panel screw 2"></button>
              <button class="bench2d-hit bench2d-screw" type="button" data-part="case-screw" data-drag="case-screw" data-parts="reverse cpu" aria-label="Case-panel screw 3"></button>
              <button class="bench2d-hit bench2d-screw" type="button" data-part="case-screw" data-drag="case-screw" data-parts="reverse cpu" aria-label="Case-panel screw 4"></button>
            </div>
          </div>

          <div class="bench2d-zone bench2d-board" data-part="board">
            <span class="bench2d-tag">Motherboard</span>
            <button class="bench2d-hit bench2d-socket" type="button" data-part="socket" data-drop="socket" data-parts="reverse cpu" aria-label="CPU socket">
              <span class="bench2d-tri" aria-hidden="true">\u25B4</span>
              <span class="bench2d-paste" data-paste aria-hidden="true"></span>
            </button>
            <button class="bench2d-hit bench2d-clips" type="button" data-part="clips" data-drop="ram-slot" data-parts="reverse ram" aria-label="RAM slots and clips">
              <i></i><i></i><i></i><i></i>
            </button>
            <button class="bench2d-hit bench2d-lever" type="button" data-part="lever" data-drag="lever" data-parts="reverse cpu" aria-label="CPU socket lever"></button>
            <button class="bench2d-hit bench2d-cooler" type="button" data-part="cooler" data-parts="reverse cpu" aria-label="CPU cooler">COOLER</button>
          </div>

          <button class="bench2d-zone bench2d-psu" type="button" data-part="psu" data-parts="reverse power" aria-label="Power supply">PSU</button>

          <div class="bench2d-zone bench2d-wrist" data-part="wrist" data-drop="wrist" data-parts="reverse safety" aria-label="Technician's wrist">
            <span class="bench2d-head" aria-hidden="true"></span>
            <span class="bench2d-body" aria-hidden="true"></span>
            <button class="bench2d-hit bench2d-bracelet" type="button" data-part="bracelet" data-parts="reverse safety" aria-label="Metal bracelet"></button>
            <span class="bench2d-strap-worn" data-worn aria-hidden="true"></span>
          </div>

          <div class="bench2d-zone bench2d-tray" data-part="parts-tray" data-drop="parts-tray" data-parts="reverse cpu" aria-label="Parts tray">
            <span class="bench2d-tag">Parts tray</span>
          </div>

          <div class="bench2d-rail" data-rail>
            ${t("clean-cloth","Cloth","safety")}
            ${t("tools","Tools","safety")}
            ${t("camera","Camera","safety power",'data-drag="camera"')}
            ${t("strap","Strap","safety",'data-drag="strap"')}
            ${t("cpu","CPU","cpu",'data-drag="cpu"')}
            ${t("ram","RAM","ram power",'data-drag="ram"')}
            ${t("bins","Bins","safety",'data-drag="bins"')}
            ${t("plug","Plug","safety",'data-drag="plug"')}
          </div>
        </div>
        <p class="bench2d-hint" data-hint>Tap the glowing part. For a CPU or RAM move, tap the part then tap its slot.</p>
        <div class="bench2d-debug" data-debug-panel hidden>
          <strong>PC Lab debug</strong>
          <pre data-debug-text></pre>
        </div>
      </div>
    `,this.root=this.container.querySelector("[data-bench2d]"),this.bench=this.root.querySelector("[data-bench]"),this.hint=this.root.querySelector("[data-hint]"),this.screen=this.root.querySelector("[data-screen]"),this.fan=this.root.querySelector("[data-fan]"),this.panel=this.root.querySelector("[data-debug-panel]"),this.panelText=this.root.querySelector("[data-debug-text]"),this.cpu=this.root.querySelector('[data-part="cpu"]'),this.ram=this.root.querySelector('[data-part="ram"]'),this.input=new Nc(this),this.input.bind(this.root),this.renderDebug(),this.debug&&(this.panel.hidden=!1)}partElement(t){return t==="case-screw"?this.root.querySelector(".bench2d-screw:not(.is-done)"):this.root.querySelector(`[data-part="${t}"]`)}actionFor(t){return Cd[t]||t}canDrag(t){return!!this.callbacks.canDrag?.(t)}pointerDown(t,e){let i=this.partElement(t);i&&(this.input.press={part:t,el:i,x:e.clientX,y:e.clientY,moved:0},this.log(`down ${t}`))}pointerMove(t){let e=this.input.press;if(!(!e||this.input.dragging)&&(e.moved=Math.max(e.moved,Math.hypot(t.clientX-e.x,t.clientY-e.y)),!(e.moved<8))){if(!_r[e.part]){this.log(`tap-move ${e.part}`);return}if(!this.canDrag(e.part)){this.callbacks.onBlocked?.(e.part),this.input.press=null,this.log(`blocked ${e.part}`);return}this.input.dragging=e,e.el.classList.add("is-dragging"),this.audio?.pick?.(),this.log(`drag ${e.part}`)}}pointerUp(t){let e=this.input.press;if(this.input.press=null,!!e){if(this.input.dragging){let i=this.input.dragging;this.input.dragging=null,i.el.classList.remove("is-dragging"),i.el.style.removeProperty("--drag-x"),i.el.style.removeProperty("--drag-y");let n=this.zoneUnder(t.clientX,t.clientY);this.log(`drop ${i.part} -> ${n||"nothing"}`),this.dropPart(i.part,n);return}e.moved>=10||this.tap(e.part,e.el)}}pointerCancel(t){this.input.press=null;let e=this.input.dragging;this.input.dragging=null,e&&(e.el.classList.remove("is-dragging"),e.el.style.removeProperty("--drag-x"),e.el.style.removeProperty("--drag-y")),this.log(`cancel ${t||"pointer"}`)}zoneUnder(t,e){let n=document.elementFromPoint(t,e)?.closest("[data-drop]");return n&&this.root.contains(n)?n.dataset.drop:null}needsMove(t){if(!_r[t]||!kv.has(t))return!1;let e=this.callbacks.currentStep?.();return e?t==="case-screw"?e.action==="remove-screws":e.action==="drop":!1}tap(t,e){let i=e?.dataset?.drop||null,n=this.input.selected;if(n&&i&&Pd[i]===n){this.input.selected=null,this.markSelected(null),this.dropPart(n,i);return}let r=Pd[t];if(!n&&r&&this.needsMove(r)){this.input.selected=r,this.markSelected(r),this.hint.textContent=`Now tap the ${this.targetLabel(r)} to finish the move.`,this.log(`select ${r}`);return}if(this.needsMove(t)){if(n===t){this.input.selected=null,this.markSelected(null),this.dropPart(t,_r[t]);return}this.input.selected=t,this.markSelected(t),this.hint.textContent=`Tap the highlighted ${this.targetLabel(_r[t])} to place it, or drag it across.`,this.log(`select ${t}`);return}this.input.selected=null,this.markSelected(null),this.fire(t,i)}markSelected(t){this.root.querySelectorAll(".is-selected").forEach(e=>e.classList.remove("is-selected")),t&&this.partElement(t)?.classList.add("is-selected")}targetLabel(t){return{socket:"CPU socket","ram-slot":"RAM slot",wrist:"technician's wrist",monitor:"monitor","parts-tray":"parts tray",cpu:"CPU",ram:"RAM",strap:"wrist strap",camera:"camera","case-screw":"case screw"}[t]||t}fire(t,e){let i=this.callbacks.currentStep?.(),r=i&&(i.target===t||e&&i.target===e)?i.action:this.actionFor(t);this.audio?.click?.(),this.callbacks.onClick?.(r),this.log(`act ${r}`)}dropPart(t,e){let i=_r[t],n=!!i&&e===i;if(t==="strap"||t==="camera"||t==="bins"){n&&this.markDone(t),this.callbacks.onSafetyDrop?.({action:Cd[t],valid:n}),this.log(`safety ${t} ${n?"ok":"miss"}`);return}if(!this.canDrag(t)){this.callbacks.onBlocked?.(t),this.log(`blocked ${t}`);return}if(t==="case-screw"){n&&(this.partElement("case-screw")?.classList.add("is-done"),this.screwsRemoved+=1),this.callbacks.onPartDrop?.({part:"case-screw",valid:n}),this.log(`screw ${n?"tray":"miss"} (${this.screwsRemoved})`);return}this.callbacks.onPartDrop?.({part:t,valid:n,speed:1,height:.05}),this.log(`drop ${t} ${n?"ok":"miss"}`)}markDone(t){this.root.querySelectorAll(`[data-part="${t}"]`).forEach(e=>e.classList.add("is-done"))}log(t){this.input?.setLast(t),this.renderDebug()}renderDebug(){if(!this.panel||this.panel.hidden)return;let t=this.input?.selected||"-",e=this.callbacks.debugStep?.()||"-";this.panelText.textContent=[`level   ${this.level}`,`step    ${e}`,`selected ${t}`,`last    ${this.input?.last||"-"}`,`pointer ${this.input?.press?"down":"up"}`,`targets ${this.root.querySelectorAll("[data-part]:not([hidden])").length}`].join(`
`)}setTheme(t){if(this.theme=t,!this.root)return;let e=t.palette||{},i=n=>`#${Number(n||0).toString(16).padStart(6,"0")}`;this.root.style.setProperty("--bench-bg",i(e.bg)),this.root.style.setProperty("--bench-accent",i(e.accent)),this.root.style.setProperty("--bench-pcb",i(e.pcb)),this.root.style.setProperty("--bench-metal",i(e.metal)),this.root.style.setProperty("--bench-case",i(e.case)),this.root.dataset.theme=t.id,this.root.dataset.dark=String(!!t.flags?.dark)}setSettings(t){this.settings=t}setLevel(t,{instant:e=!1}={}){this.level=Bv.includes(t)?t:"safety",this.leverOpen=!1,this.clipsOpen=!1,this.cpuRotation=0,this.ramRotation=0,this.cpuSeated=!1,this.ramPlaced=!1,this.ramSeated=!1,this.screwsRemoved=0,this.powerState="off",this.clearSeat(),clearTimeout(this.bootTimer),this.root&&(this.root.dataset.benchLevel=this.level,this.cpuRotation=this.level==="cpu"?90:0,this.ramRotation=this.level==="ram"?180:0,this.cpu&&(this.cpu.style.rotate=`${this.cpuRotation}deg`),this.ram&&(this.ram.style.rotate=`${this.ramRotation}deg`),this.root.classList.toggle("is-instant",!!e),this.root.querySelectorAll(".is-done, .is-hot, .is-selected, .is-open, .is-placed, .is-seated, .is-gone, .is-fixed, .has-paste, .is-ready, .is-hidden").forEach(i=>i.classList.remove("is-done","is-hot","is-selected","is-open","is-placed","is-seated","is-gone","is-fixed","has-paste","is-ready","is-hidden")),this.root.querySelectorAll("[data-part]").forEach(i=>{let n=(i.dataset.parts||"safety cpu ram power").split(/\s+/);i.hidden=!n.includes(this.level),i.style.removeProperty("--drag-x"),i.style.removeProperty("--drag-y")}),this.input&&(this.input.press=null,this.input.dragging=null,this.input.selected=null),this.root.querySelectorAll(".bench2d-chip, .bench2d-stick").forEach(i=>i.remove()),this.screen&&(this.screen.textContent="Bench session ready",this.screen.classList.remove("is-dark")),this.fan&&this.fan.classList.remove("is-spinning"),this.hint.textContent="Tap the glowing part. For a CPU or RAM move, tap the part then tap its slot.",this.log(`level ${this.level}`))}focus(){}highlight(t){if(this.root.querySelectorAll(".is-hot").forEach(i=>i.classList.remove("is-hot")),!t)return;(this.partElement(t)||this.root.querySelector(`[data-drop="${t}"]`))?.classList.add("is-hot")}rotateSelected(){this.level==="cpu"&&!this.cpuSeated?(this.cpuRotation=(this.cpuRotation+90)%360,this.cpu.style.rotate=`${this.cpuRotation}deg`,this.audio?.click?.(),this.callbacks.onRotate?.({part:"cpu",aligned:this.cpuRotation===0})):this.level==="ram"&&!this.ramPlaced&&(this.ramRotation=(this.ramRotation+180)%360,this.ram.style.rotate=`${this.ramRotation}deg`,this.audio?.click?.(),this.callbacks.onRotate?.({part:"ram",aligned:this.ramRotation===0}))}setLever(t){this.leverOpen=!!t,this.root.querySelector('[data-part="lever"]')?.classList.toggle("is-open",this.leverOpen),this.audio?.clickSnap?.()}openCasePanel(){this.root.querySelector(".bench2d-case")?.classList.add("is-open")}removeCasePanel(){this.root.querySelector(".bench2d-case")?.classList.add("is-open"),this.root.querySelectorAll('[data-part="case-screw"]').forEach(t=>this.markDone("case-screw")),this.audio?.clickSnap?.()}removeRam(){this.markDone("ram"),this.root.querySelector('[data-part="ram"]')?.classList.add("is-gone"),this.audio?.drop?.()}removeCooler(){this.markDone("cooler"),this.audio?.drop?.()}removePsu(){this.markDone("psu"),this.root.querySelector('[data-part="psu"]')?.classList.add("is-gone"),this.audio?.drop?.()}applyPaste(){this.root.querySelector('[data-part="socket"]')?.classList.add("has-paste"),this.root.querySelector("[data-paste]")?.classList.add("is-on"),this.audio?.paste?.()}showCoolerReady(){this.root.querySelector('[data-part="cooler"]')?.classList.add("is-ready")}mountCooler(){this.root.querySelector('[data-part="cooler"]')?.classList.add("is-done"),this.audio?.snap?.()}openRamClips(){this.clipsOpen=!0,this.root.querySelector('[data-part="clips"]')?.classList.add("is-open"),this.audio?.clickSnap?.()}closeRamClips(){this.clipsOpen=!1,this.root.querySelector('[data-part="clips"]')?.classList.remove("is-open"),this.audio?.clickSnap?.()}shutdownSafety(){this.powerState="off",this.screen&&(this.screen.textContent="Powered down",this.screen.classList.add("is-dark")),this.fan?.classList.remove("is-spinning"),this.audio?.clickSnap?.()}unplugPower(){this.markDone("plug"),this.audio?.clickSnap?.()}disconnectPeripheral(){this.markDone("peripheral"),this.audio?.clickSnap?.()}removeBracelet(){this.root.querySelector('[data-part="bracelet"]')?.classList.add("is-gone"),this.audio?.clickSnap?.()}prepareTools(){this.markDone("tools"),this.audio?.clickSnap?.()}cleanBench(){this.root.querySelector('[data-part="clean-cloth"]')?.classList.add("is-hidden"),this.audio?.clickSnap?.()}arrangeBench(){this.markDone("tools"),this.markDone("bins"),this.audio?.clickSnap?.()}prepareBins(){this.markDone("bins"),this.audio?.clickSnap?.()}wearStrap(){this.root.querySelector('[data-part="strap"]')?.classList.add("is-gone"),this.root.querySelector("[data-worn]")?.classList.add("is-on"),this.root.querySelector('[data-part="bracelet"]')?.classList.add("is-gone"),this.audio?.clickSnap?.()}documentConnections(){this.markDone("camera"),this.screen&&(this.screen.textContent="Connections photographed",this.screen.classList.remove("is-dark")),this.audio?.clickSnap?.()}checkPsu(){this.markDone("psu"),this.audio?.clickSnap?.()}checkMonitorCable(){this.markDone("peripheral"),this.audio?.clickSnap?.()}reseatRamPower(){this.ram?.classList.add("is-seated"),this.audio?.clickSnap?.()}inspectFanCable(){this.root.querySelector('[data-part="fan-cable"]')?.classList.add("is-hot"),this.audio?.click?.()}fixFanCable(){this.root.querySelector('[data-part="fan-cable"]')?.classList.add("is-fixed"),this.audio?.snap?.()}powerOn(){this.powerState="booting",this.screen&&(this.screen.textContent="POST\u2026",this.screen.classList.remove("is-dark")),this.fan?.classList.add("is-spinning"),clearTimeout(this.bootTimer),this.bootTimer=window.setTimeout(()=>{this.powerState!=="booting"||this.disposed||(this.powerState="on",this.screen&&(this.screen.textContent="TechPro Workstation"),this.callbacks.onBooted?.())},1500)}powerFault(){clearTimeout(this.bootTimer),this.powerState="fault",this.screen&&(this.screen.textContent="No signal",this.screen.classList.add("is-dark")),this.fan?.classList.remove("is-spinning"),this.callbacks.onPowerFault?.()}seatCpu(){this.cpuSeated=!0;let t=this.root.querySelector('[data-part="cpu"]');t?.classList.add("is-done"),t?.classList.remove("is-selected"),t?.style.removeProperty("rotate");let e=this.root.querySelector('[data-drop="socket"]');if(e&&!e.querySelector(".bench2d-chip")){let i=document.createElement("span");i.className="bench2d-chip",i.setAttribute("aria-hidden","true"),e.append(i)}this.audio?.snap?.()}seatRamReady(){this.ramPlaced=!0;let t=this.root.querySelector('[data-part="ram"]');t?.classList.add("is-done"),t?.classList.remove("is-selected"),t?.style.removeProperty("rotate");let e=this.root.querySelector('[data-drop="ram-slot"]');if(e&&!e.querySelector(".bench2d-stick")){let i=document.createElement("span");i.className="bench2d-stick",i.setAttribute("aria-hidden","true"),e.append(i)}this.audio?.drop?.()}startSeat(){!this.ramPlaced||this.ramSeated||this.seat||(this.seat={pressure:0,balance:0,elapsed:0,tiltTime:0},this.root.querySelector('[data-part="ram"]')?.classList.add("is-seating"),this.audio?.paste?.(),this.callbacks.onSeatStart?.(),this.seatTimer=window.setInterval(()=>{if(!this.seat||this.disposed)return;let t=.05;this.seat.elapsed+=t,this.seat.pressure=Math.min(1.15,this.seat.pressure+t*.42),this.seat.balance+=(Math.sin(this.seat.elapsed*2.6)*.38+Math.sin(this.seat.elapsed*5.1)*.16)*t,this.seat.balance=Math.max(-.9,Math.min(.9,this.seat.balance)),Math.abs(this.seat.balance)>.44?this.seat.tiltTime+=t:this.seat.tiltTime=Math.max(0,this.seat.tiltTime-t*2),this.callbacks.onSeatProgress?.({pressure:this.seat.pressure,balance:this.seat.balance,tilt:this.seat.tiltTime})},50))}nudgeSeat(t){this.seat&&(this.seat.balance=Math.max(-.9,Math.min(.9,this.seat.balance-t*.0022)))}finishSeat(){if(!this.seat)return;let t=this.seat;this.seat=null,clearInterval(this.seatTimer),this.root.querySelector('[data-part="ram"]')?.classList.remove("is-seating");let e=Math.abs(t.balance)<.36&&t.tiltTime<.45,i=t.pressure,n=i>=.65&&i<=.9&&e;n?(this.ramSeated=!0,this.root.querySelector('[data-part="ram"]')?.classList.add("is-seated"),this.audio?.snap?.()):this.audio?.error?.(),this.callbacks.onSeatResult?.({ok:n,pressure:i,balanced:e,overpressure:i>.9,underpressure:i<.65})}clearSeat(){this.seatTimer&&clearInterval(this.seatTimer),this.seatTimer=null,this.seat=null}reject(){this.root.querySelector('[data-part="cpu"]')?.classList.remove("is-seated"),this.root.querySelector('[data-part="ram"]')?.classList.remove("is-placed")}dispose(){this.disposed=!0,this.clearSeat(),clearTimeout(this.bootTimer),this.input?.destroy(),this.container&&(this.container.innerHTML="")}},Nc=class{constructor(t){this.view=t,this.press=null,this.dragging=null,this.selected=null,this.last="ready",this.watchdog=null,this.handlers={down:e=>this.onDown(e),move:e=>this.onMove(e),up:e=>this.onUp(e),cancel:e=>this.onCancel(e),cancelAll:()=>this.cancelAll("window"),visibility:()=>{document.hidden&&this.cancelAll("hidden")},key:e=>this.onKey(e)}}bind(t){this.root=t,t.addEventListener("pointerdown",this.handlers.down),t.addEventListener("keydown",this.handlers.key),window.addEventListener("pointermove",this.handlers.move,{passive:!1}),window.addEventListener("pointerup",this.handlers.up),window.addEventListener("pointercancel",this.handlers.cancel),window.addEventListener("blur",this.handlers.cancelAll),window.addEventListener("orientationchange",this.handlers.cancelAll),document.addEventListener("visibilitychange",this.handlers.visibility)}setLast(t){this.last=t}onDown(t){if(t.button!==void 0&&t.button>0)return;let e=t.target.closest?.("[data-part]");if(!e||!this.root.contains(e)||e.hidden)return;let i=e.dataset.part;t.preventDefault();try{this.root.setPointerCapture(t.pointerId)}catch{}this.view.pointerDown(i,t),this.event=t,this.view.renderDebug(),clearTimeout(this.watchdog),this.watchdog=window.setTimeout(()=>this.cancelAll("watchdog"),4e3)}onMove(t){if(this.press){if(this.dragging){let e=t.clientX-this.dragging.x,i=t.clientY-this.dragging.y;this.dragging.el.style.setProperty("--drag-x",`${e}px`),this.dragging.el.style.setProperty("--drag-y",`${i}px`),t.cancelable&&t.preventDefault()}this.view.pointerMove(t),this.view.renderDebug()}}onUp(t){clearTimeout(this.watchdog),this.view.pointerUp(t);try{this.root.releasePointerCapture(t.pointerId)}catch{}this.event=null,this.view.renderDebug()}onCancel(){this.cancelAll("pointercancel")}cancelAll(t){clearTimeout(this.watchdog),this.press=null,this.dragging=null,this.view.pointerCancel(t)}onKey(t){if(t.key!=="Enter"&&t.key!==" ")return;let e=t.target.closest?.("[data-part]");!e||e.hidden||(t.preventDefault(),this.view.tap(e.dataset.part,e),this.view.renderDebug())}destroy(){clearTimeout(this.watchdog);let t=this.root;t&&(t.removeEventListener("pointerdown",this.handlers.down),t.removeEventListener("keydown",this.handlers.key),window.removeEventListener("pointermove",this.handlers.move),window.removeEventListener("pointerup",this.handlers.up),window.removeEventListener("pointercancel",this.handlers.cancel),window.removeEventListener("blur",this.handlers.cancelAll),window.removeEventListener("orientationchange",this.handlers.cancelAll),document.removeEventListener("visibilitychange",this.handlers.visibility))}};var zv=[{id:"cpu",name:"Processor",short:"CPU",art:"cpu",icon:"cpu",category:"Processing",socket:"AM4",zone:"cpu-socket",blurb:"Executes instructions and performs calculations. Its notch and triangle must line up with the socket."},{id:"cooler",name:"CPU cooler",short:"Cooler",art:"cooler",icon:"cooling",category:"Cooling",zone:"cooler-mount",blurb:"Moves heat away from the processor. The fan cable goes to the CPU_FAN header."},{id:"thermal",name:"Thermal paste",short:"Paste",art:"thermal",icon:"drop",category:"Cooling",zone:"cpu-socket",blurb:"Fills microscopic gaps between the processor and heat sink so heat can transfer."},{id:"ram",name:"Memory module",short:"RAM",art:"ram",icon:"ram",category:"Memory",type:"DDR4",zone:"ram-slots",blurb:"Temporary working memory. Press evenly until both retaining clips click."},{id:"motherboard",name:"Motherboard",short:"Board",art:"motherboard",icon:"motherboard",category:"Foundation",socket:"AM4",memory:"DDR4",zone:"board-tray",blurb:"The main circuit board. It mounts on standoffs and connects every component."},{id:"psu",name:"Power supply",short:"PSU",art:"psu",icon:"psu",category:"Power",watts:550,zone:"psu-bay",blurb:"Converts outlet electricity into the voltages the components use. Keep its vents clear."},{id:"ssd",name:"Solid-state drive",short:"SSD",art:"storage",icon:"storage",category:"Storage",zone:"drive-bay",blurb:"Keeps the operating system, programs, and files even when power is off."},{id:"gpu",name:"Graphics card",short:"GPU",art:"expansion",icon:"card",category:"Expansion",zone:"pcie-slot",blurb:"An expansion card that adds or improves graphics output. Seat it fully and secure the bracket."},{id:"cables",name:"Cable kit",short:"Cables",art:"cable",icon:"cable",category:"Connection",zone:"cable-route",blurb:"Power, data, and front-panel cables. Route them so they do not block airflow."},{id:"screws",name:"Screw container",short:"Screws",art:"screws",icon:"container",category:"Tools",zone:"bench",blurb:"Labelled containers keep screws with the parts they belong to."},{id:"strap",name:"Antistatic strap",short:"Strap",art:"strap",icon:"shield",category:"Safety",zone:"bench",blurb:"Discharges static safely before you touch sensitive components."},{id:"labels",name:"Labels & camera",short:"Labels",art:"labels",icon:"camera",category:"Safety",zone:"bench",blurb:"Document cable connections before removal so reassembly is guided, not guessed."}],Id=Object.fromEntries(zv.map(s=>[s.id,s]));var xi=30,Hv={"clean-bench":"cleaning-cloth","arrange-bench":"tools","power-down":"computer",unplug:"power-cable",peripherals:"peripheral",jewelry:"jewelry",tools:"tools",bins:"screws","remove-screws":"case-screws",strap:"strap",document:"labels","lever-open":"cpu",align:"cpu",seat:"cpu","lever-close":"cpu",paste:"thermal",cooler:"cooler","clips-open":"ram",place:"ram",press:"ram","clips-close":"ram","power-on":"computer",fan:"cooler",psu:"psu",display:"display-cable",ram:"ram",fix:"cooler",boot:"computer"},Gv={"cleaning-cloth":{title:"Cleaning cloth",meaning:"A clean work surface keeps dust and loose items away from computer parts.",use:"Wipe the bench before placing tools or components on it."},computer:{title:"Computer system",meaning:"A computer system uses hardware and software to process information.",use:"Shut the system down properly before disconnecting power or opening the case."},"power-cable":{title:"Power cable",meaning:"The power cable connects the computer to an electrical outlet.",use:"Disconnect it from the power source before working inside the case."},peripheral:{title:"Peripheral devices",meaning:"Peripherals are devices connected to the computer, such as a monitor, keyboard, and mouse.",use:"Disconnect them before moving or servicing the computer."},jewelry:{title:"Metal jewelry",meaning:"Metal jewelry is a conductive accessory that can create a safety hazard.",use:"Remove bracelets and other conductive accessories before disassembly."},tools:{title:"Technician tools",meaning:"Tools help a technician handle and secure computer parts safely.",use:"Prepare the right tools before assembly or disassembly."},display:{title:"Monitor cable",meaning:"The monitor cable carries the display signal from the computer to the monitor.",use:"Check that it is securely connected when the monitor shows no image."},"case-screws":{title:"Case-panel screws",meaning:"Case-panel screws hold the computer's side cover in place.",use:"Remove them carefully and place them in a parts tray so they are not lost."}};function Vv(s,t){let e=t==="ram"&&s?.id==="align"?"ram":Hv[s?.id];if(!e)return null;let i=Id[e];return i?{title:i.name,meaning:`The ${i.name.toLowerCase()} is a computer hardware component in the ${i.category.toLowerCase()} category.`,use:i.blurb}:Gv[e]||null}var Bc=[{id:"safety",tab:"L0 \xB7 Safety",short:"Safety",title:"Prepare the bench",subtitle:"DepEd safety preparation order",camera:"safety",par:95,intro:"Start by preparing a clean, organized, safe workbench. Chip will guide one clear action at a time.",steps:[{id:"clean-bench",title:"Clean the workbench",action:"clean-bench",target:"clean-cloth",hint:"Click the blue cleaning cloth on the bench. Chip will wipe the work surface clean.",why:"A clean, clear surface helps prevent dust and loose items from damaging or hiding small components."},{id:"arrange-bench",title:"Set out tools and parts",action:"arrange-bench",target:"tools",hint:"Click the toolbox. Chip will set out the tools, parts tray, and bins so each item has a clear place.",why:"Keeping tools and parts in assigned areas makes each item easy to find and prevents screws from getting lost."},{id:"power-down",title:"Power the system down",action:"power",target:"power",hint:"Click the round power button on the front of the computer case.",why:"Shut the operating system down first. Yanking power while the drive is writing can corrupt files."},{id:"document",title:"Record the cable connections",action:"camera",target:"camera",hint:"Click the camera on the bench to record the cable connections before unplugging them.",why:"A photo of the cable routing makes reassembly reliable and faster."},{id:"unplug",title:"Disconnect the power cable",action:"plug",target:"plug",hint:"Click the power plug beside the strip to disconnect it.",why:"Removing the mains plug is the only reliable way to make the case electrically dead."},{id:"peripherals",title:"Disconnect the peripherals",action:"peripheral",target:"peripheral",hint:"Click the cable connecting the monitor to the computer.",why:"Peripheral cables can snag, pull a port loose, or carry a charge while you move the case."},{id:"jewelry",title:"Remove metal jewelry",action:"bracelet",target:"bracelet",hint:"Click the metal bracelet on the technician's wrist to remove it.",why:"A ring or bracelet can bridge a live circuit, short the board, and burn the technician."},{id:"strap",title:"Put on the antistatic wrist strap",action:"strap",target:"strap",hint:"Drag the blue wrist strap from the bench onto the technician's wrist.",why:"The strap drains static electricity from your body before it can damage the board."}]},{id:"cpu",tab:"L2 \xB7 CPU",short:"CPU",title:"Seat the processor",subtitle:"Socket, alignment, paste, cooler",camera:"case",par:110,intro:"Open the case carefully, keep its screws together, then prepare the processor socket.",steps:[{id:"remove-screws",title:"Remove the case-panel screws",action:"remove-screws",target:"case-screw",hint:"Drag each of the 4 case screws into the parts tray beside the motherboard. Place them anywhere inside the tray.",why:"Keep the small screws together in the parts tray. This prevents loss and makes reassembly easier."},{id:"lever-open",title:"Open the socket lever",action:"lever-open",target:"lever",hint:"Drag the free end of the metal socket lever upward until it stays raised.",why:"The lever lifts the retention plate so the processor can drop in without bending pins."},{id:"align",title:"Align the CPU triangle",action:"rotate",target:"cpu",control:"rotate",hint:"Click Rotate until the CPU's gold triangle points toward the socket's matching corner.",why:"The triangle and the notch are keyed. Forcing the CPU the wrong way bends pins."},{id:"seat",title:"Seat the CPU gently",action:"drop",target:"cpu",hint:"Drag the CPU over the open socket and release it gently.",why:"A processor should drop into a correctly opened socket with almost no pressure."},{id:"lever-close",title:"Lock the socket lever",action:"lever-close",target:"lever",hint:"Drag the raised socket lever downward until it sits flat.",why:"The locked lever holds the CPU flat so the cooler can make even contact."},{id:"paste",title:"Apply thermal paste",action:"paste",target:"cpu",hint:"Click the seated CPU once to apply one small dot of thermal paste.",why:"Thermal paste fills microscopic gaps between the CPU and cooler. Too much is as bad as too little."},{id:"cooler",title:"Mount the CPU cooler",action:"cooler",target:"cooler",hint:"Click the cooler above the CPU to place it.",why:"The cooler must sit flat and secure. A loose cooler lets the processor overheat and shut down."}]},{id:"ram",tab:"L4 \xB7 RAM",short:"RAM",title:"Install the memory",subtitle:"Notch, clips, even pressure",camera:"ram",par:100,intro:"Memory is keyed and stiff. Line up the notch, then press evenly until both clips click.",steps:[{id:"clips-open",title:"Open the DIMM clips",action:"clips-open",target:"clips",hint:"Click the RAM slot clips to open them.",why:"The clips must be open before the module can travel down into the slot."},{id:"align",title:"Match the RAM notch",action:"rotate",target:"ram",control:"rotate",hint:"Click Rotate until the notch in the RAM matches the key in the slot.",why:"The off-centre notch stops the module going in backwards. Never force it."},{id:"place",title:"Lower the RAM into the slot",action:"drop",target:"ram",hint:"Drag the RAM straight over the open slot and release it.",why:"Set the module straight down. Tilting it can crack the slot or the edge connector."},{id:"press",title:"Press evenly until both clips click",action:"seat",target:"ram",control:"hold",hint:"Press and hold the RAM, steady its wobble with small left/right movements, then release when the meter is green.",why:"Even pressure seats the contacts. Too little leaves the module loose; too much can flex the board."},{id:"clips-close",title:"Lock the DIMM clips",action:"clips-close",target:"clips",hint:"Click the RAM slot clips to lock the module in place.",why:"The clips lock the module in place and stop it creeping out under vibration."}]},{id:"power",tab:"Fault \xB7 No POST",short:"Fault",title:"Carlo's no-display build",subtitle:"Fan still, screen dark",camera:"power",par:120,intro:"The build powers up but the fan never spins and the monitor stays dark. Work the module fault order.",steps:[{id:"power-on",title:"Power on the system",action:"power",target:"power",hint:"Click the case power button once, then watch the fan.",why:"Record the symptom first: the system powers on, but there is no display and no fan movement."},{id:"fan",title:"Check the CPU fan connection",action:"fan-cable",target:"fan-cable",hint:"Click the fan connector behind the CPU cooler.",why:"The module starts with the cooling fan connection. A loose CPU fan header stops the fan and can trigger a no-POST protection state."},{id:"psu",title:"Check the PSU connections",action:"psu",target:"psu",hint:"Click the power supply to inspect its cable connections.",why:"Check the 24-pin and CPU power connectors. A partly seated PSU cable gives the same dead-screen symptom."},{id:"display",title:"Check the display cable",action:"peripheral",target:"monitor-cable",hint:"Click the cable connecting the monitor to the computer.",why:"A monitor cable that is loose or in the wrong port looks exactly like a failed build."},{id:"ram",title:"Reseat the RAM",action:"ram",target:"ram",hint:"Click the RAM stick to check that it is seated.",why:"A memory module that is not fully clicked home stops POST. Reseat it before replacing parts."},{id:"fix",title:"Reconnect the fan cable",action:"fan-cable",target:"fan-cable",hint:"Click the loose fan connector to reconnect it.",why:"The fault was the loose CPU fan connector. Reconnect it fully, then retest the system."},{id:"boot",title:"Power on and confirm POST",action:"power",target:"power",hint:"Click the power button again. Check that the fan spins and the display turns on.",why:"Always retest after a repair. A spinning fan and a POST screen confirm the fix."}]}],Wv=[{id:"reverse",tab:"Reverse \xB7 Disassembly",short:"Reverse",title:"Take the PC apart safely",subtitle:"Isolate, document, remove, record",camera:"safety",par:150,intro:"Work in reverse: make the machine dead, record its connections, then remove parts in a safe order.",steps:[{id:"power-down",title:"Power the system down",action:"power",target:"power",hint:"Click the round power button on the front of the computer case.",why:"Shut the operating system down before touching any internal part or cable."},{id:"document",title:"Record the cable connections",action:"camera",target:"camera",hint:"Click the camera on the bench to photograph the cable routing.",why:"A photo makes reassembly reliable and prevents a cable going back on the wrong port."},{id:"peripherals",title:"Disconnect the peripherals",action:"peripheral",target:"peripheral",hint:"Click the monitor cable to disconnect the external devices.",why:"Loose external cables can snag a port or carry a charge while you move the case."},{id:"unplug",title:"Disconnect the mains plug",action:"plug",target:"plug",hint:"Click the power plug beside the strip to disconnect mains power.",why:"Removing the mains plug is the only reliable way to make the case electrically dead."},{id:"jewelry",title:"Remove metal jewelry",action:"bracelet",target:"bracelet",hint:"Click the bracelet on the technician's wrist to remove it.",why:"Metal jewelry can bridge a live circuit and short the board."},{id:"strap",title:"Put on the antistatic strap",action:"strap",target:"strap",hint:"Drag the blue wrist strap from the bench onto the technician's wrist.",why:"The strap drains static electricity from your body before it can damage a component."},{id:"remove-panel",title:"Remove the side panel",action:"remove-panel",target:"case-screw",hint:"Drag all four case screws into the parts tray, then lift the panel away.",why:"Keep the small screws together in the tray so none are lost during the reverse drill."},{id:"remove-ram",title:"Release and remove the memory",action:"remove-ram",target:"ram",hint:"Click the RAM module to release its clips and lift it from the slot.",why:"Open both clips before removing memory so the slot and module edge are not damaged."},{id:"remove-cooler",title:"Remove the CPU cooler",action:"remove-cooler",target:"cooler",hint:"Click the cooler above the processor to lift it away.",why:"Remove the cooler before the processor so the heatsink does not twist the socket."},{id:"remove-psu",title:"Remove the power supply",action:"remove-psu",target:"psu",hint:"Click the power supply to remove it after every cable is free.",why:"The PSU is removed last, once every connector has been released and documented."}]}],Xv={build:Bc,disassembly:Wv},Uc=Ko;function yi(s){return String(s??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function Dd(s){return`<span class="pclab-stars" aria-label="${s} of 3 stars">${[0,1,2].map(t=>`<span class="${t<s?"is-on":""}" aria-hidden="true">\u2605</span>`).join("")}</span>`}function Fc(s){let t=Math.max(0,Math.round(s));return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`}function Oc(s,t,e){return Math.max(t,Math.min(e,s))}var qo=class{constructor(t){if(this.options=t||{},this.mount=this.options.mount,!this.mount)throw new Error("PC Lab needs a mount element.");this.settings={quality:"auto",sound:!0,haptics:!0,motion:"full",...this.options.settings||{}},this.voiceEnabled=this.settings.voiceGuidance!==!1,this.voicePreference=this.voiceEnabled,this.voiceGender=this.settings.voiceGender==="boy"?"boy":"girl",this.voiceName=this.settings.voiceName||"",this.speechVoices=[],this.voiceAvailable=!1,this.theme=Mr(),this.audio=new wr({theme:this.theme.id,enabled:this.settings.sound!==!1}),this.companion=this.options.companion||{},this.mode=this.options.mode==="disassembly"?"disassembly":"build",this.levels=Xv[this.mode]||Bc,this.levelIndex=0,this.stepIndex=0,this.strikes=0,this.hintsUsed=0,this.score=1e3,this.completed={...this.options.completed||{}},this.levelStartedAt=performance.now(),this.gameStartedAt=performance.now(),this.waitingForBoot=!1,this.failed=!1,this.overlayOpen=!1,this.paused=!1,this.destroyed=!1,this.timers=new Set,this.hold=null,this.qualityInfo=null,this.renderShell(),this.bindDom(),this.createView(),this.startLevel(this.firstPlayableIndex(),{instant:!0,silent:!0}),this.observeTheme(),this.startClock()}renderShell(){let t=this.completed,e=this.levels.map((i,n)=>{let r=t[i.id];return`<button class="pclab-tab ${r?"is-done":""}" type="button" data-level="${n}">
        <span>${yi(i.tab)}</span>
        ${r?'<span class="pclab-tab-star" aria-label="completed">\u2605</span>':""}
      </button>`}).join("");this.mount.innerHTML=`
      <div class="pclab-game" data-pclab>
        <div class="pclab-stage">
          <div class="pclab-canvas" data-canvas aria-label="3D PC Lab workbench"></div>
          <div class="pclab-topbar">
            <div class="pclab-tabs" role="tablist" aria-label="PC Lab levels">${e}</div>
            <div class="pclab-top-actions">
              <button class="pclab-icon-btn" type="button" data-camera title="Camera presets" aria-label="Camera presets">\u2316</button>
              <button class="pclab-icon-btn" type="button" data-game-fullscreen aria-pressed="false" title="Enter fullscreen" aria-label="Enter fullscreen">\u26F6</button>
              <button class="pclab-icon-btn" type="button" data-settings-open title="Game settings" aria-label="Game settings">\u2699</button>
              <a class="pclab-icon-btn" href="/play" data-exit title="Leave the bench" aria-label="Leave the bench">\u2715</a>
            </div>
          </div>

          <div class="pclab-hud">
            <div class="pclab-hud-item">
              <span class="pclab-label">Level</span>
              <strong data-hud-level>${yi(this.levels[0].tab)}</strong>
            </div>
            <div class="pclab-hud-item">
              <span class="pclab-label">Step</span>
              <strong data-hud-step>1 / ${this.levels[0].steps.length}</strong>
            </div>
            <div class="pclab-hud-item">
              <span class="pclab-label">Time</span>
              <strong data-hud-time>00:00</strong>
            </div>
            <div class="pclab-hud-item">
              <span class="pclab-label">Score</span>
              <strong data-hud-score>1000</strong>
            </div>
            <div class="pclab-hud-item pclab-hud-strikes">
              <span class="pclab-label">Mistakes</span>
              <strong data-hud-strikes aria-label="0 of 30 mistakes">0 / 30</strong>
            </div>
          </div>

          <div class="pclab-toast" data-toast role="status" aria-live="polite" hidden></div>
          <div class="pclab-quality" data-quality hidden></div>
        </div>

        <div class="pclab-objective" data-objective>
          <p class="pclab-eyebrow" data-objective-eyebrow>Step 1</p>
          <h2 data-objective-title>Clean the workbench</h2>
          <p class="pclab-eyebrow">Your action</p>
          <p data-objective-hint>Click the blue cleaning cloth on the bench.</p>
          <div class="pclab-motion-guide" data-motion-guide hidden aria-hidden="true">
            <span class="pclab-motion-arrow">\u2191</span>
            <span data-motion-label>Drag the lever up</span>
          </div>
          <div class="pclab-meter" data-meter hidden>
            <div class="pclab-meter-track">
              <span class="pclab-meter-zone"></span>
              <span class="pclab-meter-fill" data-meter-fill></span>
            </div>
            <div class="pclab-meter-labels"><span>Too light</span><span>Click</span><span>Too hard</span></div>
          </div>
          <div class="pclab-controls">
            <button class="btn btn-accent btn-sm" type="button" data-action="pclab-step" data-step-action>Perform step</button>
            <button class="btn btn-ghost btn-sm" type="button" data-hint>Hint</button>
            <button class="btn btn-ghost btn-sm" type="button" data-why>Why?</button>
            <button class="btn btn-ghost btn-sm" type="button" data-voice-toggle aria-pressed="true">Voice guidance on</button>
            <button class="btn btn-ghost btn-sm" type="button" data-voice-test>Test voice</button>
            <button class="btn btn-accent btn-sm" type="button" data-rotate hidden>Rotate</button>
            <button class="btn btn-accent btn-sm" type="button" data-hold hidden>Press &amp; hold</button>
          </div>
          <p class="pclab-why" data-why-copy hidden></p>
        </div>

        <aside class="pclab-side">
          <div class="pclab-companion">
            <div class="pclab-companion-art" data-companion-art></div>
            <div>
              <p class="pclab-eyebrow" data-companion-name>Chip</p>
              <p class="pclab-companion-line" data-companion-line>Let's make the bench safe first.</p>
            </div>
          </div>
          <section class="pclab-guide" aria-labelledby="pclabGuideTitle">
            <div class="pclab-guide-head">
              <div>
                <p class="pclab-eyebrow">Part guide</p>
                <h2 id="pclabGuideTitle" data-guide-title>Computer system</h2>
              </div>
              <button class="btn btn-ghost btn-sm" type="button" data-guide-speak>Read answer</button>
            </div>
            <div class="pclab-guide-questions" role="group" aria-label="Component questions">
              <button class="chip is-active" type="button" data-guide-choice="meaning" aria-pressed="true">What is it?</button>
              <button class="chip" type="button" data-guide-choice="use" aria-pressed="false">What is it used for?</button>
            </div>
            <p class="pclab-guide-prompt" data-guide-prompt>What is it?</p>
            <p class="pclab-guide-answer" data-guide-answer>A computer system uses hardware and software to process information.</p>
          </section>
          <ol class="pclab-steps" data-steps></ol>
          <div class="pclab-side-actions">
            <button class="btn btn-ghost btn-sm" type="button" data-restart>Restart level</button>
            <button class="btn btn-ghost btn-sm" type="button" data-skip>Level select</button>
          </div>
        </aside>

        <div class="pclab-overlay" data-overlay hidden></div>

        <div class="pclab-popover" data-settings hidden>
          <div class="pclab-popover-head">
            <h2>Bench settings</h2>
            <button class="pclab-icon-btn" type="button" data-settings-close aria-label="Close settings">\u2715</button>
          </div>
          <label class="pclab-toggle"><span>Sound</span><input type="checkbox" data-setting="sound"></label>
          <label class="pclab-toggle"><span>Haptics</span><input type="checkbox" data-setting="haptics"></label>
          <label class="pclab-toggle"><span>Reduced motion</span><input type="checkbox" data-setting="motion"></label>
          <label class="pclab-toggle"><span>Voice guidance</span><input type="checkbox" data-setting="voice"></label>
          <label class="pclab-field"><span>Voice style</span>
            <select data-setting="voiceGender">
              <option value="girl">Girl \xB7 cute and gentle</option>
              <option value="boy">Boy \xB7 cute and gentle</option>
            </select>
          </label>
          <p class="pclab-voice-note">Voice style uses your browser's installed speech voices. Tap Test voice once to activate narration.</p>
          <p class="pclab-voice-status" data-voice-status role="status" aria-live="polite"></p>
          <label class="pclab-field"><span>Quality</span>
            <select data-setting="quality">
              <option value="auto">Auto</option>
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </label>
          <button class="btn btn-soft btn-sm" type="button" data-theme-next>Next theme</button>
          <div class="pclab-presets">
            <span class="pclab-label">Camera</span>
            <div class="pclab-preset-row">
              <button class="chip" type="button" data-preset="overview">Overview</button>
              <button class="chip" type="button" data-preset="top">Top</button>
              <button class="chip" type="button" data-preset="side">Side</button>
              <button class="chip" type="button" data-preset="back">Back</button>
            </div>
          </div>
          <p class="tiny faint" data-quality-label></p>
        </div>
      </div>
    `,this.root=this.mount.querySelector("[data-pclab]"),this.canvasHost=this.root.querySelector("[data-canvas]"),this.objective=this.root.querySelector("[data-objective]"),this.stepsEl=this.root.querySelector("[data-steps]"),this.toastEl=this.root.querySelector("[data-toast]"),this.overlay=this.root.querySelector("[data-overlay]"),this.settingsPanel=this.root.querySelector("[data-settings]"),this.meter=this.root.querySelector("[data-meter]"),this.meterFill=this.root.querySelector("[data-meter-fill]"),this.rotateButton=this.root.querySelector("[data-rotate]"),this.holdButton=this.root.querySelector("[data-hold]"),this.whyCopy=this.root.querySelector("[data-why-copy]"),this.voiceButton=this.root.querySelector("[data-voice-toggle]"),this.voiceStatus=this.root.querySelector("[data-voice-status]"),this.guideTitle=this.root.querySelector("[data-guide-title]"),this.guidePrompt=this.root.querySelector("[data-guide-prompt]"),this.guideAnswer=this.root.querySelector("[data-guide-answer]"),this.objectiveHint=this.root.querySelector("[data-objective-hint]"),this.qualityEl=this.root.querySelector("[data-quality]"),this.renderCompanion("happy","Safety first. Then we build.")}bindDom(){this.onClick=t=>{let e=t.target.closest("[data-level]");if(e){this.startLevel(Number(e.dataset.level));return}if(t.target.closest("[data-step-action]")){this.performStepFromControl();return}if(t.target.closest("[data-hint]")){this.showHint();return}if(t.target.closest("[data-why]")){this.toggleWhy();return}if(t.target.closest("[data-rotate]")){this.view?.rotateSelected?.();return}if(t.target.closest("[data-voice-toggle]")){this.setVoiceEnabled(!this.voiceEnabled);return}if(t.target.closest("[data-voice-test]")){this.setVoiceEnabled(!0,{announce:!1}),this.speak(`Hi there! I'm your ${this.voiceGender==="girl"?"girl":"boy"} voice guide. Let's build together!`,{test:!0});return}if(t.target.closest("[data-guide-speak]")){this.speak(this.guideAnswer?.textContent||"");return}let i=t.target.closest("[data-guide-choice]");if(i){this.selectGuideQuestion(i.dataset.guideChoice);return}if(t.target.closest("[data-game-fullscreen]")){this.options.onToggleFullscreen?.();return}if(t.target.closest("[data-restart]")){this.restartLevel();return}if(t.target.closest("[data-skip]")){this.showLevelSelect();return}if(t.target.closest("[data-settings-open]")){this.toggleSettings(!0);return}if(t.target.closest("[data-settings-close]")){this.toggleSettings(!1);return}if(t.target.closest("[data-camera]")){this.toggleSettings(!0);return}if(t.target.closest("[data-theme-next]")){this.nextTheme();return}let n=t.target.closest("[data-preset]");if(n){this.view?.focus?.(n.dataset.preset);return}let r=t.target.closest("[data-overlay-action]");if(!(r&&performance.now()-(this.overlayShownAt||0)<350)&&r){this.onOverlayAction(r.dataset.overlayAction);return}},this.root.addEventListener("click",this.onClick),this.onChange=t=>{let e=t.target.dataset.setting;e&&(e==="motion"?this.updateSettings({motion:t.target.checked?"reduced":"full"}):e==="sound"||e==="haptics"?this.updateSettings({[e]:t.target.checked}):e==="voice"?this.setVoiceEnabled(t.target.checked):e==="voiceGender"?this.setVoiceGender(t.target.value):e==="quality"&&this.updateSettings({quality:t.target.value}))},this.root.addEventListener("change",this.onChange),this.setupSpeech(),this.onHoldDown=t=>{this.currentStep()?.control!=="hold"||this.hold||(t.preventDefault(),this.hold={x:t.clientX,pointerId:t.pointerId},this.holdButton.setPointerCapture?.(t.pointerId),this.view?.startSeat?.())},this.onHoldMove=t=>{if(!this.hold||t.pointerId!==this.hold.pointerId)return;let e=t.clientX-this.hold.x;this.hold.x=t.clientX,this.view?.nudgeSeat?.(e)},this.onHoldUp=t=>{!this.hold||t.pointerId!==this.hold.pointerId||(this.hold=null,this.view?.finishSeat?.())},this.holdButton.addEventListener("pointerdown",this.onHoldDown),this.holdButton.addEventListener("pointermove",this.onHoldMove),this.holdButton.addEventListener("pointerup",this.onHoldUp),this.holdButton.addEventListener("pointercancel",this.onHoldUp),this.onKey=t=>{if(t.defaultPrevented||t.metaKey||t.ctrlKey||t.altKey)return;let e=t.target?.tagName?.toLowerCase();["input","select","textarea"].includes(e)||((t.key==="h"||t.key==="H")&&this.showHint(),(t.key==="w"||t.key==="W")&&this.toggleWhy(),t.key==="Escape"&&(this.settingsPanel.hidden?this.overlayOpen&&this.closeOverlay():this.toggleSettings(!1)))},document.addEventListener("keydown",this.onKey)}createView(){let t={onClick:e=>this.onSceneClick(e),onPartDrop:e=>this.onPartDrop(e),onSafetyDrop:e=>this.onSafetyDrop(e),onRotate:e=>this.onRotate(e),onSeatStart:()=>this.onSeatStart(),onSeatProgress:e=>this.onSeatProgress(e),onSeatResult:e=>this.onSeatResult(e),onSeatCancel:()=>{this.meter.classList.remove("is-live"),this.resetMeter()},onReject:e=>this.onReject(e),onBooted:()=>this.onBooted(),onPowerFault:()=>this.onPowerFault(),onBoardMounted:()=>this.onBoardMounted(),onEscape:()=>this.onEscape(),canDrag:e=>this.canDrag(e),onBlocked:e=>this.onBlocked(e),onLeverDragIncomplete:()=>this.toast("Keep dragging the lever until it reaches its raised or locked position.","info",2400)};this.useWebGL=nd(),this.useWebGL?(this.scene=new Wo({container:this.canvasHost,theme:this.theme,settings:this.settings,audio:this.audio,callbacks:t,onQuality:e=>this.onQuality(e)}),this.particles=new zo(this.scene.scene,{scale:this.scene.quality.particles,palette:this.theme.palette}),this.scene.particles=this.particles,this.view=this.scene):(this.view=new Xo({container:this.canvasHost,theme:this.theme,settings:this.settings,audio:this.audio,callbacks:{...t,debugStep:()=>this.currentStep()?.id||null,currentStep:()=>this.currentStep()}}),this.qualityEl.hidden=!1,this.qualityEl.textContent="2D compatibility bench")}observeTheme(){this.stopTheme=Kc(t=>{this.theme=t,this.audio.setTheme(t.id),this.particles?.setPalette(t.palette),this.view?.setTheme?.(t),Qo(this.root)}),Qo(this.root)}startClock(){this.clockTimer=window.setInterval(()=>{this.destroyed||this.updateClock()},500)}updateClock(){let t=(performance.now()-this.levelStartedAt)/1e3,e=this.root.querySelector("[data-hud-time]");e&&(e.textContent=Fc(t))}firstPlayableIndex(){let t=this.levels.findIndex(e=>!this.completed[e.id]);return t<0?0:t}currentLevel(){return this.levels[this.levelIndex]}currentStep(){return this.currentLevel()?.steps[this.stepIndex]||null}startLevel(t,{instant:e=!1,silent:i=!1}={}){if(this.destroyed)return;!i&&this.overlayOpen&&this.closeOverlay(),this.levelIndex=Oc(Number(t)||0,0,this.levels.length-1),this.stepIndex=0,this.strikes=0,this.hintsUsed=0,this.score=1e3,this.failed=!1,this.waitingForBoot=!1,this.levelStartedAt=performance.now(),this.hold=null,this.removedCaseScrews=0,this.clearTimers();let n=this.currentLevel();this.view?.setLevel?.(n.id,{instant:!0}),this.view?.focus?.(n.camera,e),this.root.querySelectorAll("[data-level]").forEach((a,o)=>{a.classList.toggle("is-active",o===this.levelIndex),a.setAttribute("aria-selected",String(o===this.levelIndex))}),this.hudLevel().textContent=n.tab,this.renderSteps(),this.renderStep({animate:!e,announce:!1}),this.updateHud(),this.updateClock(),this.toggleSettings(!1),this.renderCompanion("happy",n.intro),this.toast(n.intro,"info",4200);let r=this.currentStep();r&&this.speak(`${n.intro} ${r.title}. ${r.hint}`),this.audio.whoosh(),this.track("level-start",{level:n.id})}restartLevel(){this.startLevel(this.levelIndex)}renderStep({animate:t=!0,announce:e=!0}={}){let i=this.currentStep(),n=this.currentLevel();if(!i)return;let r=this.root.querySelector("[data-objective-eyebrow]"),a=this.root.querySelector("[data-objective-title]"),o=this.root.querySelector("[data-objective-hint]");r&&(r.textContent=`${n.short} \xB7 Step ${this.stepIndex+1} of ${n.steps.length}`),a&&(a.textContent=i.title),o&&(o.textContent=i.hint);let l=this.root.querySelector("[data-motion-guide]");if(l){let c=i.action==="lever-close"?"down":"up";l.hidden=!i.action.startsWith("lever"),l.classList.toggle("is-down",c==="down"),l.querySelector(".pclab-motion-arrow").textContent=c==="down"?"\u2193":"\u2191",l.querySelector("[data-motion-label]").textContent=`Drag the lever ${c}`}this.whyCopy.hidden=!0,this.whyCopy.textContent=i.why,this.renderComponentGuide(i),this.rotateButton.hidden=i.control!=="rotate",this.holdButton.hidden=i.control!=="hold",this.meter.hidden=i.control!=="hold",i.control!=="hold"&&this.resetMeter(),this.objective.classList.toggle("is-pulsing",t&&this.settings.motion!=="reduced"),t&&window.setTimeout(()=>this.objective.classList.remove("is-pulsing"),500),this.view?.highlight?.(i.target||null),e&&this.speak(`${i.title}. ${i.hint}`),this.updateHud(),this.renderSteps()}renderSteps(){let t=this.currentLevel();t&&(this.stepsEl.innerHTML=t.steps.map((e,i)=>{let n=i<this.stepIndex,r=i===this.stepIndex;return`<li class="${n?"is-done":""} ${r?"is-current":""}">
        <span class="pclab-step-dot" aria-hidden="true">${n?"\u2713":i+1}</span>
        <span>${yi(e.title)}</span>
      </li>`}).join(""))}renderComponentGuide(t){let e=Vv(t,this.currentLevel()?.id);e&&(this.guideTitle.textContent=e.title,this.guideQuestion="meaning",this.guideContent=e,this.selectGuideQuestion("meaning",{announce:!1}))}selectGuideQuestion(t,{announce:e=!1}={}){if(!this.guideContent||!["meaning","use"].includes(t))return;this.guideQuestion=t;let i=t==="meaning"?`What is ${this.guideContent.title}?`:`What is ${this.guideContent.title} used for?`;this.guidePrompt.textContent=i,this.guideAnswer.textContent=this.guideContent[t],this.root.querySelectorAll("[data-guide-choice]").forEach(n=>{let r=n.dataset.guideChoice===t;n.classList.toggle("is-active",r),n.setAttribute("aria-pressed",String(r))}),e&&this.voiceEnabled&&this.speak(this.guideContent[t])}setupSpeech(){this.speechSynthesis=window.speechSynthesis||null,this.speechSupported=!!(this.speechSynthesis&&window.SpeechSynthesisUtterance),this.speechActivated=!1,this.onVoicesChanged=()=>{this.speechVoices=this.speechSynthesis?.getVoices?.()||[],this.voiceAvailable=this.speechSupported&&this.speechVoices.length>0,this.voiceAvailable&&this.voicePreference?this.setVoiceEnabled(!0,{announce:!1,persist:!1,activate:!1}):this.voiceAvailable||this.setVoiceEnabled(!1,{announce:!1,persist:!1,activate:!1}),this.updateVoiceStatus()},this.speechSupported&&(this.speechSynthesis.addEventListener?.("voiceschanged",this.onVoicesChanged),this.onVoicesChanged(),window.setTimeout(this.onVoicesChanged,1200)),this.setVoiceEnabled(this.voiceEnabled,{announce:!1,persist:!1,activate:!1})}updateVoiceStatus(t=""){if(!this.voiceStatus)return;if(t){this.voiceStatus.textContent=t;return}if(!this.speechSupported){this.voiceStatus.textContent="Voice narration is not supported by this browser. Try a current version of Chrome, Edge, or Safari.";return}if(!this.voiceAvailable){this.voiceStatus.textContent="No speech voices are installed or available in this browser. Enable a system voice, then reload the game.";return}let e=this.speechVoices.find(i=>i.name===this.voiceName)||this.findPreferredVoice();this.voiceStatus.textContent=e?`Ready: ${e.name} \xB7 cute, gentle ${this.voiceGender} style`:`Ready: browser voice \xB7 cute, gentle ${this.voiceGender} style`}findPreferredVoice(){let t=this.speechVoices||[];if(this.voiceName){let i=t.find(n=>n.name===this.voiceName);if(i)return i}let e=this.voiceGender==="girl"?/\b(female|woman|girl|samantha|victoria|karen|moira|tessa|serena|zira|aria|jenny)\b/i:/\b(male|man|boy|daniel|alex|david|george|james|guy|ryan|fred)\b/i;return t.find(i=>e.test(i.name))||t.find(i=>/^en([-_]|$)/i.test(i.lang))||t[0]||null}setVoiceGender(t){["girl","boy"].includes(t)&&(this.voiceGender=t,this.voiceName="",this.updateVoiceStatus(),this.updateSettings({voiceGender:t,voiceName:""}))}setVoiceEnabled(t,{announce:e=!0,persist:i=!0,activate:n=!0}={}){this.voiceEnabled=!!t,i&&(this.voicePreference=this.voiceEnabled),n&&this.voiceEnabled&&(this.speechActivated=!0),this.voiceAvailable||(this.voiceEnabled=!1),this.voiceEnabled||this.speechSynthesis?.cancel(),this.voiceButton&&(this.voiceButton.disabled=!this.voiceAvailable,this.voiceButton.textContent=this.voiceEnabled?"Voice guidance on":"Voice guidance off",this.voiceButton.setAttribute("aria-pressed",String(this.voiceEnabled)),this.voiceButton.title=this.speechSupported?"":"Speech synthesis is not available in this browser.");let r=this.root.querySelector("[data-guide-speak]");r&&(r.disabled=!this.voiceAvailable||!this.voiceEnabled);let a=this.root.querySelector("[data-voice-test]");a&&(a.disabled=!this.voiceAvailable);let o=this.settingsPanel.querySelector('[data-setting="voice"]');if(o&&(o.checked=this.voiceEnabled,o.disabled=!this.voiceAvailable),this.updateVoiceStatus(),i&&this.options.onSettingsChange?.({voiceGuidance:this.voiceEnabled}),this.voiceEnabled&&e){let l=this.currentStep();l&&this.speak(`${l.title}. ${l.hint}`)}}speak(t,{test:e=!1}={}){if(!this.voiceEnabled||!t)return;if(!this.speechActivated&&!e){this.updateVoiceStatus("Tap Test voice once to activate spoken guidance.");return}let i=window.SpeechSynthesisUtterance;if(!this.voiceAvailable||!this.speechSupported||!i){this.setVoiceEnabled(!1);return}this.speechSynthesis.cancel();let n=new i(t),r=this.findPreferredVoice();r?(n.voice=r,n.lang=r.lang,this.voiceName!==r.name&&(this.voiceName=r.name,this.options.onSettingsChange?.({voiceName:r.name}))):n.lang=document.documentElement.lang||"en-US",n.rate=.88,n.pitch=this.voiceGender==="girl"?1.18:.92,n.onstart=()=>this.updateVoiceStatus(`${e?"Voice test":"Speaking"}: ${r?.name||"browser voice"} \xB7 gentle ${this.voiceGender} style`),n.onend=()=>this.updateVoiceStatus(),n.onerror=a=>{!["canceled","interrupted"].includes(a.error)&&!this.destroyed&&(this.setVoiceEnabled(!1,{announce:!1}),this.updateVoiceStatus("Voice playback failed in this browser. Check system speech settings or choose another browser voice."),this.toast("Voice playback failed. The on-screen instructions are still available.","warn",3600))},this.speechSynthesis.speak(n),this.speechSynthesis.paused&&this.speechSynthesis.resume()}updateHud(){let t=this.currentLevel();this.hudLevel().textContent=t.tab,this.root.querySelector("[data-hud-step]").textContent=`${Math.min(this.stepIndex+1,t.steps.length)} / ${t.steps.length}`,this.root.querySelector("[data-hud-score]").textContent=String(Math.max(0,this.score));let e=this.root.querySelector("[data-hud-strikes]");e.textContent=`${this.strikes} / ${xi}`,e.setAttribute("aria-label",`${this.strikes} of ${xi} mistakes`)}hudLevel(){return this.root.querySelector("[data-hud-level]")}completeStep({silent:t=!1}={}){let e=this.currentStep(),i=this.currentLevel();if(!e)return;if(t||(this.audio.clickSnap(),Er(12,this.settings.haptics!==!1),this.toast(`${e.title} \u2014 done.`,"success",2200)),this.stepIndex>=i.steps.length-1){this.finishLevel();return}this.stepIndex+=1;let n=this.currentStep();this.renderStep(),this.updateHud(),n&&(this.renderCompanion("happy",`Next: ${n.title}. ${n.hint}`),this.track("step",{level:i.id,step:e.id}))}finishLevel(){let t=this.currentLevel(),e=(performance.now()-this.levelStartedAt)/1e3,i=Math.max(0,Math.round((e-t.par)*3)),n=Oc(Math.round(this.score-i),0,1e3),r=n>=850?3:n>=650?2:1,a={level:t.id,score:n,stars:r,time:Math.round(e),strikes:this.strikes,hints:this.hintsUsed,at:new Date().toISOString()};this.completed[t.id]=a,this.options.onSaveLevel?.(a),this.audio.success(),Er([18,40,24],this.settings.haptics!==!1),this.track("level-complete",a);let o=this.root.querySelector(`[data-level="${this.levelIndex}"]`);if(o?.classList.add("is-done"),o?.querySelector(".pclab-tab-star")||o?.insertAdjacentHTML("beforeend",'<span class="pclab-tab-star" aria-label="completed">\u2605</span>'),this.levelIndex<this.levels.length-1){let l=this.levels[this.levelIndex+1];this.renderCompanion(r>=2?"celebrating":"happy",`Bench clean. Next is ${l.tab}.`),this.showOverlay(`
        <div class="pclab-result" data-result>
          <p class="pclab-eyebrow">Level complete \xB7 ${yi(t.tab)}</p>
          <h2>${yi(t.title)}</h2>
          ${Dd(r)}
          <div class="pclab-result-grid">
            <div><strong>${n}</strong><span>score</span></div>
            <div><strong>${Fc(e)}</strong><span>time</span></div>
            <div><strong>${this.strikes}</strong><span>strikes</span></div>
            <div><strong>${this.hintsUsed}</strong><span>hints</span></div>
          </div>
          <p class="pclab-result-copy">${yi(t.subtitle)}. ${r>=2?"That order will keep the machine serviceable.":"Clean enough to continue. Replay for a higher score."}</p>
          <p class="pclab-result-copy">Stars: ${r} \xB7 Correct steps: ${t.steps.length} of ${t.steps.length}</p>
          <div class="pclab-result-actions">
            <button class="btn btn-primary" type="button" data-overlay-action="next">Next: ${yi(l.tab)}</button>
            <button class="btn btn-ghost" type="button" data-overlay-action="retry" data-retry>Retry level</button>
            <button class="btn btn-ghost" type="button" data-overlay-action="select">Level select</button>
          </div>
        </div>
      `)}else this.finishCampaign()}finishCampaign(){let t=this.levels.map(h=>this.completed[h.id]).filter(Boolean),e=t.length===this.levels.length,i=t.reduce((h,d)=>h+d.score,0),n=t.reduce((h,d)=>h+d.stars,0),r=t.reduce((h,d)=>h+d.time,0),a=e?Math.round(i/(this.levels.length*1e3)*100):null,o=e?Math.max(1,Math.round(n/this.levels.length)):1,l=null;e&&(l=this.options.onCampaignComplete?.({score:i,total:this.levels.length*1e3,accuracy:a,stars:o,timeSeconds:r,levels:t,mode:this.mode})||null),this.audio.success(),this.renderCompanion(e?"celebrating":"thinking",e?this.mode==="disassembly"?"Reverse drill complete. The machine is apart, documented, and ready to rebuild.":"Four benches, one clean build. That is the whole COC 1 workflow.":"One more level to finish the campaign. Open level select to see what is missing.");let c=l?`<p class="pclab-result-copy">XP earned: ${l.earnedXp??0}${l.newBadges?.length?` \xB7 ${l.newBadges.map(h=>yi(h.name)).join(", ")}`:""}.</p>`:`<p class="pclab-result-copy">Campaign recorded when this drill is complete. You have ${t.length} of ${this.levels.length}.</p>`;this.showOverlay(`
      <div class="pclab-result" data-result>
        <p class="pclab-eyebrow">Campaign ${e?"complete":"in progress"}</p>
        <h2>${e?this.mode==="disassembly"?"The teardown is complete.":"The build is alive.":"Keep the bench moving."}</h2>
        ${e?Dd(o):""}
        <div class="pclab-result-grid">
          <div><strong>${e?a:t.length}</strong><span>${e?"% accuracy":`of ${this.levels.length} levels`}</span></div>
          <div><strong>${i}</strong><span>total score</span></div>
          <div><strong>${Fc(r)}</strong><span>bench time</span></div>
          <div><strong>${n}</strong><span>stars</span></div>
        </div>
        ${c}
        <p class="pclab-result-copy">Stars: ${o} \xB7 Correct steps: ${this.levels.reduce((h,d)=>h+d.steps.length,0)} of ${this.levels.reduce((h,d)=>h+d.steps.length,0)}</p>
        <div class="pclab-result-actions">
          <button class="btn btn-primary" type="button" data-overlay-action="select">Play a level</button>
          <button class="btn btn-ghost" type="button" data-overlay-action="retry" data-retry>${this.mode==="disassembly"?"Retry reverse drill":"Retry fault level"}</button>
          <a class="btn btn-ghost" href="/play">Back to interactives</a>
        </div>
      </div>
    `),this.track("campaign-complete",{allDone:e,accuracy:a,stars:o})}failLevel(t=`You have reached ${xi} mistakes. Take a moment to review the step, then try again.`){this.failed||(this.failed=!0,this.audio.fail(),Er([30,50,30],this.settings.haptics!==!1),this.renderCompanion("oops",t),this.showOverlay(`
      <div class="pclab-result is-fail" data-result>
        <p class="pclab-eyebrow">Bench reset</p>
        <h2>Pause and reset the bench.</h2>
        <p class="pclab-result-copy">${yi(t)} Nothing was saved for this attempt.</p>
        <div class="pclab-result-actions">
          <button class="btn btn-primary" type="button" data-overlay-action="retry" data-retry>Restart level</button>
          <button class="btn btn-ghost" type="button" data-overlay-action="select">Level select</button>
          <a class="btn btn-ghost" href="/play">Back to interactives</a>
        </div>
      </div>
    `))}onSceneClick(t){if(this.overlayOpen||this.failed)return;let e=this.currentStep();if(!e||t==="rotate")return;let i={ram:"remove-ram",cooler:"remove-cooler",psu:"remove-psu"};if((t==="lever"&&e.action.startsWith("lever")||t==="tools"&&e.action==="arrange-bench"||t==="clips"&&e.action.startsWith("clips")?e.action:this.currentLevel().id==="reverse"&&i[t]?i[t]:t)===e.action){this.runStep(e);return}if(this.currentLevel().id==="power"&&["fan-cable","psu","peripheral","ram"].includes(t)){this.score=Math.max(0,this.score-20),this.strikes+=1,this.updateHud(),this.audio.error(),this.renderCompanion("thinking","That connection is seated. Keep checking in the module order."),this.toast("Not the fault. Check the next item in the order.","warn",2600),this.speak("That component is not the fault. Keep checking in the module order."),this.strikes>=xi&&this.failLevel(`You have reached ${xi} mistakes. Take a moment to review the step, then try again.`);return}this.wrongAction(t,e)}runStep(t){let e=this.currentLevel();if(e.id==="safety"){switch(t.action){case"clean-bench":this.view.cleanBench();break;case"arrange-bench":this.view.arrangeBench();break;case"power":this.view.shutdownSafety();break;case"plug":this.view.unplugPower();break;case"peripheral":this.view.disconnectPeripheral();break;case"bracelet":this.view.removeBracelet();break;case"tools":this.view.prepareTools();break;case"bins":this.view.prepareBins();break;case"strap":this.view.wearStrap();break;case"camera":this.view.documentConnections();break;default:break}this.completeStep();return}if(e.id==="cpu"){t.action==="lever-open"?(this.view.setLever(!0),this.completeStep()):t.action==="lever-close"?(this.view.setLever(!1),this.completeStep()):t.action==="paste"?(this.view.applyPaste(),this.view.showCoolerReady(),this.completeStep()):t.action==="cooler"&&(this.view.mountCooler(),this.completeStep());return}if(e.id==="ram"){t.action==="clips-open"?(this.view.openRamClips(),this.completeStep()):t.action==="clips-close"&&(this.view.closeRamClips(),this.completeStep());return}if(e.id==="reverse"){switch(t.action){case"power":this.view.shutdownSafety();break;case"camera":this.view.documentConnections();break;case"peripheral":this.view.disconnectPeripheral();break;case"plug":this.view.unplugPower();break;case"bracelet":this.view.removeBracelet();break;case"strap":this.view.wearStrap();break;case"remove-panel":this.view.removeCasePanel();break;case"remove-ram":this.view.removeRam();break;case"remove-cooler":this.view.removeCooler();break;case"remove-psu":this.view.removePsu();break;default:break}this.completeStep();return}if(e.id==="power"){t.action==="power"&&t.id==="power-on"?(this.view.powerOn(),this.completeStep(),this.schedule(()=>{!this.destroyed&&this.currentLevel().id==="power"&&this.currentStep()?.id==="fan"&&this.view.powerFault()},1150)):t.action==="fan-cable"&&t.id==="fan"?(this.view.inspectFanCable(),this.completeStep(),this.toast("The fan connector is loose. Continue the module checks before reconnecting it.","warn",3200)):t.action==="psu"?(this.view.checkPsu(),this.completeStep()):t.action==="peripheral"?(this.view.checkMonitorCable(),this.completeStep()):t.action==="ram"?(this.view.reseatRamPower(),this.completeStep()):t.action==="fan-cable"&&t.id==="fix"?(this.view.fixFanCable(),this.completeStep(),this.renderCompanion("happy","Fan connector reconnected. Now retest the system.")):t.action==="power"&&t.id==="boot"&&(this.waitingForBoot=!0,this.view.powerOn(),this.toast("POST in progress. Watch the fan and the display.","info",3200));return}}wrongAction(t,e){this.overlayOpen||this.failed||(this.audio.error(),this.score=Math.max(0,this.score-120),this.strikes+=1,this.updateHud(),this.renderCompanion("oops",`Not yet. ${e.hint}`),this.toast(`Not yet. ${e.title}.`,"warn",2800),this.view?.highlight?.(e.target||null),this.track("strike",{level:this.currentLevel().id,action:t,step:e.id}),this.speak(`Try again. ${e.hint}`),this.strikes>=xi&&this.failLevel(`You have reached ${xi} mistakes. Take a moment to review the step, then try again.`))}canDrag(t){let e=this.currentStep();return e?this.currentLevel().id==="reverse"?t==="strap"&&e.action==="strap"||t==="case-screw"&&e.action==="remove-panel":this.currentLevel().id==="safety"?t==="strap"&&e.action==="strap"||t==="camera"&&e.action==="camera"||t==="plug"&&e.action==="plug":t==="case-screw"?e.action==="remove-screws":t==="lever"?e.action.startsWith("lever"):t==="cpu"||t==="ram"?e.action==="drop":!1:!1}onBlocked(t){let e=this.currentStep();e&&this.toast(`Finish \u201C${e.title}\u201D first.`,"warn",2200)}onSafetyDrop({action:t,valid:e}){if(this.overlayOpen||this.failed)return;let i=this.currentStep();if(i){if(e&&t===i.action){this.completeStep();return}if(e){this.wrongAction(t,i);return}this.toast(`No problem\u2014try that drop again. ${i.hint}`,"info",3e3)}}onPartDrop(t){if(this.overlayOpen||this.failed)return;let e=this.currentStep();if(e){if(t.part==="case-screw"&&["remove-screws","remove-panel"].includes(e.action)){if(!t.valid){this.toast("No problem\u2014drop the screw anywhere inside the parts tray beside the motherboard.","info",2800);return}this.removedCaseScrews+=1,this.removedCaseScrews===4?(e.action==="remove-panel"?this.view?.removeCasePanel?.():(this.view?.openCasePanel(),this.view?.focus("cpu")),this.completeStep()):(this.objectiveHint.textContent=`${this.removedCaseScrews} of 4 screws in the parts tray. Keep going.`,this.toast(`${this.removedCaseScrews} of 4 case screws removed.`,"success",1800));return}if(e.action!=="drop"){t.valid&&this.view?.reject?.(t.part==="cpu"?this.view.cpu:this.view.ram,"order"),this.wrongAction(t.part,e);return}if(!t.valid){if(t.reason==="target"){this.toast("No problem\u2014try again and release the part over its highlighted target.","info",2600);return}this.audio.error(),this.score=Math.max(0,this.score-80),this.strikes+=1,this.updateHud();let i={lever:"The socket lever is still closed. Open it before seating the CPU.",orientation:"The triangle is not aligned. Rotate the part and try again.",force:"Too fast and too hard. Set the part down gently.",target:"Release the part over the socket or slot."};this.renderCompanion("oops",i[t.reason]||i.target),this.toast(i[t.reason]||i.target,"warn",3e3),this.track("drop-fail",{part:t.part,reason:t.reason}),this.speak(i[t.reason]||i.target),this.strikes>=xi&&this.failLevel(`You have reached ${xi} mistakes. Use the alignment marks and gentle pressure, then try again.`);return}if(t.part==="cpu"){let i=(t.speed||0)<2.2&&(t.height||0)<.3;this.view.seatCpu({gentle:i}),this.completeStep();return}t.part==="ram"&&(this.view.seatRamReady(),this.completeStep())}}onRotate({part:t,aligned:e}){if(this.overlayOpen||this.failed)return;let i=this.currentStep();if(i){if(i.action!=="rotate"){this.toast("Rotate only matters when the part is not aligned yet.","info",2e3);return}e?(this.renderCompanion("happy","The alignment mark matches. Now move the part into place."),this.completeStep()):(this.audio.click(),this.toast("Not aligned yet. Keep rotating.","info",1800))}}onSeatStart(){this.meter.hidden=!1,this.meter.classList.add("is-live"),this.renderCompanion("thinking","Hold. Keep the module level and release in the green zone."),this.speak("Hold. Keep the module level and release in the green zone."),this.track("seat-start")}onSeatProgress({pressure:t,balance:e}){let i=Oc(t/1.15,0,1)*100;this.meterFill&&(this.meterFill.style.width=`${i}%`),this.meter.dataset.pressure=t.toFixed(2),this.meter.dataset.balance=e.toFixed(2),this.meter.classList.toggle("is-balanced",Math.abs(e)<.36),this.meter.classList.toggle("is-tilted",Math.abs(e)>=.36)}onSeatResult(t){if(this.overlayOpen||this.failed)return;if(this.meter.classList.remove("is-live"),t.ok){this.completeStep(),this.renderCompanion("happy","Both clips clicked. That module is fully seated.");return}this.audio.error(),this.score=Math.max(0,this.score-100),this.strikes+=1,this.updateHud();let e=t.overpressure?"Too much pressure. Ease off and let the clips do the work.":t.underpressure?"Not enough pressure. The module is not fully seated.":"The module tilted. Keep it level while you press.";this.renderCompanion("oops",e),this.toast(e,"warn",3200),this.resetMeter(),this.track("seat-fail",{pressure:t.pressure,balanced:t.balanced}),this.speak(e),this.strikes>=xi&&this.failLevel(`You have reached ${xi} mistakes. Keep the module level and press evenly, then try again.`)}onReject(t){this.overlayOpen||this.failed||this.track("reject",{reason:t})}onPowerFault(){this.overlayOpen||this.failed||(this.renderCompanion("oops","No display and the fan is still. Work the fault order: fan, PSU, display, RAM."),this.toast("No POST. The fan is still and the monitor is dark.","warn",4200),this.audio.error(),this.speak("No display and the fan is still. Check the fan, power supply, display cable, and memory in order."),this.track("power-fault"))}onBooted(){this.overlayOpen||this.failed||this.currentLevel().id==="power"&&this.waitingForBoot&&(this.waitingForBoot=!1,this.completeStep(),this.renderCompanion("celebrating","Fan spinning, display alive. POST confirms the repair."))}onBoardMounted(){this.track("board-mounted")}onEscape(){this.settingsPanel.hidden?this.overlayOpen&&this.closeOverlay():this.toggleSettings(!1)}performStepFromControl(){if(this.overlayOpen||this.failed)return;let t=this.currentStep();if(!t)return;let e=this.currentLevel();if(t.control==="rotate"&&this.view?.rotateSelected){if(this.view.cpuOrientationValid&&this.view.ramOrientationValid){let i=0;for(;i<4&&!(e.id==="cpu"?this.view.cpuOrientationValid():this.view.ramOrientationValid());)this.view.rotateSelected(),i+=1}else this.view.rotateSelected();return}if(t.action==="remove-screws"){this.view?.removeCasePanel?this.view.removeCasePanel():this.view?.openCasePanel?.(),this.completeStep();return}if(t.action==="drop"&&e.id==="cpu"&&this.view?.seatCpu){this.view.seatCpu({gentle:!0}),this.completeStep();return}if(t.action==="drop"&&e.id==="ram"&&this.view?.seatRamReady){this.view.seatRamReady(),this.completeStep();return}if(t.control==="hold"&&this.view?.startSeat&&this.view?.finishSeat){this.view.startSeat(),this.view.seat&&(this.view.seat.pressure=.78,this.view.seat.balance=0,this.view.seat.tiltTime=0),this.view.finishSeat();return}this.runStep(t)}showHint(){if(this.overlayOpen||this.failed)return;let t=this.currentStep();t&&(this.hintsUsed+=1,this.score=Math.max(0,this.score-40),this.updateHud(),this.whyCopy.hidden=!0,this.renderCompanion("thinking",t.hint),this.toast(t.hint,"info",5200),this.view?.highlight?.(t.target||null),this.speak(t.hint),this.audio.hover(),this.track("hint",{level:this.currentLevel().id,step:t.id}))}toggleWhy(){let t=this.currentStep();t&&(this.whyCopy.hidden=!this.whyCopy.hidden,this.whyCopy.hidden||(this.whyCopy.textContent=t.why,this.renderCompanion("thinking",t.why),this.speak(t.why)))}resetMeter(){this.meterFill&&(this.meterFill.style.width="0%"),this.meter.classList.remove("is-balanced","is-tilted","is-live")}showOverlay(t){this.overlayShownAt=performance.now(),this.overlay.innerHTML=t,this.overlay.hidden=!1,this.overlayOpen=!0,this.root.classList.add("is-overlay"),window.setTimeout(()=>this.overlay.querySelector("button, a")?.focus({preventScroll:!0}),40)}closeOverlay(){this.overlay.hidden=!0,this.overlayOpen=!1,this.root.classList.remove("is-overlay")}onOverlayAction(t){if(t==="next"){this.startLevel(this.levelIndex+1);return}if(t==="retry"){this.startLevel(this.levelIndex);return}t==="select"&&this.showLevelSelect(),t==="close"&&this.closeOverlay()}showLevelSelect(){let t=this.levels.map((e,i)=>{let n=this.completed[e.id];return`<button class="pclab-select-row" type="button" data-level="${i}">
        <span><strong>${yi(e.tab)}</strong><small>${yi(e.subtitle)}</small></span>
        <span class="pclab-select-result">${n?`${n.score} \xB7 ${"\u2605".repeat(n.stars)}`:"Not yet"}</span>
      </button>`}).join("");this.showOverlay(`
      <div class="pclab-result" data-result>
        <p class="pclab-eyebrow">Bench select</p>
        <h2>Pick up a level</h2>
        <div class="pclab-select-list">${t}</div>
        <div class="pclab-result-actions">
          <button class="btn btn-ghost" type="button" data-overlay-action="close">Close</button>
          <a class="btn btn-ghost" href="/play">Back to interactives</a>
        </div>
      </div>
    `)}toggleSettings(t){this.settingsPanel.hidden=!t,t&&(this.settingsPanel.querySelector('[data-setting="sound"]').checked=this.settings.sound!==!1,this.settingsPanel.querySelector('[data-setting="haptics"]').checked=this.settings.haptics!==!1,this.settingsPanel.querySelector('[data-setting="motion"]').checked=this.settings.motion==="reduced",this.settingsPanel.querySelector('[data-setting="voice"]').checked=this.voiceEnabled,this.settingsPanel.querySelector('[data-setting="voice"]').disabled=!this.voiceAvailable,this.settingsPanel.querySelector('[data-setting="voiceGender"]').value=this.voiceGender,this.settingsPanel.querySelector('[data-setting="voiceGender"]').disabled=!this.voiceAvailable,this.settingsPanel.querySelector('[data-setting="quality"]').value=this.settings.quality||"auto",this.settingsPanel.querySelector("[data-quality-label]").textContent=this.qualityInfo?`${this.qualityInfo.label} \xB7 ${this.qualityInfo.fps||60} fps`:"")}updateSettings(t){this.settings={...this.settings,...t},t.quality&&(this.settings.quality=t.quality),this.audio.setEnabled(this.settings.sound!==!1),this.view?.setSettings?.(this.settings),this.options.onSettingsChange?.(t),t.motion&&(document.documentElement.dataset.motion=t.motion),this.toggleSettings(!0),this.toast("Bench settings updated.","success",1800)}nextTheme(){let t=Uc.indexOf(this.theme.id),e=Uc[(t+1)%Uc.length];this.options.onThemeChange?.(e),this.toast("Theme applied to the bench.","success",1800)}onQuality(t){this.qualityInfo=t,this.qualityEl.hidden=!1,this.qualityEl.textContent=t.label;let e=this.settingsPanel.querySelector("[data-quality-label]");e&&(e.textContent=`${t.label} \xB7 ${t.fps||60} fps`)}renderCompanion(t,e){let i=this.options.companionArt?.(t,{size:96})||"",n=this.root.querySelector("[data-companion-art]");n&&(n.innerHTML=i);let r=this.root.querySelector("[data-companion-name]");r&&(r.textContent=this.options.companionName||this.companion.name||"Chip");let a=this.root.querySelector("[data-companion-line]");a&&(a.textContent=e),this.options.onCompanionSay?.(e,t)}toast(t,e="info",i=2600){!this.toastEl||!t||(this.toastEl.hidden=!1,this.toastEl.className=`pclab-toast is-${e}`,this.toastEl.textContent=t,clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>{this.toastEl&&(this.toastEl.hidden=!0)},i))}schedule(t,e){let i=window.setTimeout(()=>{this.timers.delete(i),this.destroyed||t()},e);return this.timers.add(i),i}clearTimers(){this.timers.forEach(t=>clearTimeout(t)),this.timers.clear()}track(t,e={}){try{window.dispatchEvent(new CustomEvent("techpro:game",{detail:{game:"pc-lab",name:t,...e,at:Date.now()}}))}catch{}}destroy(){this.destroyed||(this.destroyed=!0,this.stopTheme?.(),this.clearTimers(),clearInterval(this.clockTimer),clearTimeout(this.toastTimer),document.removeEventListener("keydown",this.onKey),this.speechSynthesis?.removeEventListener?.("voiceschanged",this.onVoicesChanged),this.speechSynthesis?.cancel(),this.root?.removeEventListener("click",this.onClick),this.root?.removeEventListener("change",this.onChange),this.holdButton?.removeEventListener("pointerdown",this.onHoldDown),this.holdButton?.removeEventListener("pointermove",this.onHoldMove),this.holdButton?.removeEventListener("pointerup",this.onHoldUp),this.holdButton?.removeEventListener("pointercancel",this.onHoldUp),this.view?.dispose?.(),this.mount&&(this.mount.innerHTML=""))}},ms=null;function qv(s){return Ld(),ms=new qo(s),s?.debug&&(window.__pcLab=ms),ms}function Ld(){ms&&(ms.destroy(),ms=null)}return Wd(Yv);})();
