var PcLabGame=(()=>{var Ko=Object.defineProperty;var Fd=Object.getOwnPropertyDescriptor;var Od=Object.getOwnPropertyNames;var Bd=Object.prototype.hasOwnProperty;var kd=(s,t)=>{for(var e in t)Ko(s,e,{get:t[e],enumerable:!0})},zd=(s,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Od(t))!Bd.call(s,n)&&n!==e&&Ko(s,n,{get:()=>t[n],enumerable:!(i=Fd(t,n))||i.enumerable});return s};var Hd=s=>zd(Ko({},"__esModule",{value:!0}),s);var zx={};kd(zx,{LEVELS:()=>Be,PcLabGame:()=>$o,start:()=>kx,stop:()=>Pd});var jo=["editorial","marshmallow","candy","neon","blueprint","pixel","lofi","mint","contrast"],Jc={editorial:{bg:15262165,fog:15262165,bench:7294262,benchTop:10122836,case:2763567,caseTrim:4539981,metal:12830669,pcb:2382662,accent:11740702,accent2:3038031,text:16249061,dark:!1,flags:{particles:!0,shadows:!0,outline:!1,grid:!1,pixel:!1,toon:!1,glass:!1,warm:!0}},marshmallow:{bg:16642548,fog:16642548,bench:13079204,benchTop:16173014,case:7164771,caseTrim:11109012,metal:15325407,pcb:7315342,accent:14245766,accent2:4168579,text:4862784,dark:!1,flags:{particles:!0,shadows:!0,outline:!1,grid:!1,pixel:!1,toon:!0,glass:!1,warm:!1}},candy:{bg:16770035,fog:16770035,bench:13912979,benchTop:16754898,case:5906759,caseTrim:11534446,metal:16767470,pcb:35448,accent:14024815,accent2:32670,text:3478057,dark:!1,flags:{particles:!0,shadows:!0,outline:!1,grid:!1,pixel:!1,toon:!1,glass:!0,warm:!1}},neon:{bg:264727,fog:264727,bench:858416,benchTop:1254981,case:462882,caseTrim:1719395,metal:9431295,pcb:670284,accent:2483967,accent2:16726996,text:14284031,dark:!0,flags:{particles:!0,shadows:!1,outline:!0,grid:!0,pixel:!1,toon:!1,glass:!0,warm:!1,emissive:!0}},blueprint:{bg:865112,fog:865112,bench:1195881,benchTop:1725055,case:731722,caseTrim:10471656,metal:14282751,pcb:1397373,accent:16765286,accent2:9425919,text:15398399,dark:!0,flags:{particles:!1,shadows:!1,outline:!0,grid:!0,pixel:!1,toon:!1,glass:!1,warm:!1,wireframe:!0}},pixel:{bg:1316389,fog:1316389,bench:4995631,benchTop:8018754,case:2106170,caseTrim:5199485,metal:12108504,pcb:2386767,accent:16764277,accent2:3716964,text:16249052,dark:!0,flags:{particles:!0,shadows:!1,outline:!1,grid:!1,pixel:!0,toon:!1,glass:!1,warm:!1}},lofi:{bg:2169623,fog:2169623,bench:4863013,benchTop:8215357,case:2761504,caseTrim:4996404,metal:13351332,pcb:4021067,accent:15247467,accent2:10336418,text:16314596,dark:!0,flags:{particles:!0,shadows:!0,outline:!1,grid:!1,pixel:!1,toon:!1,glass:!1,warm:!0}},mint:{bg:16121082,fog:16121082,bench:9157812,benchTop:13102051,case:4025191,caseTrim:9091250,metal:14283502,pcb:2854784,accent:1013358,accent2:947344,text:998713,dark:!1,flags:{particles:!0,shadows:!0,outline:!1,grid:!1,pixel:!1,toon:!1,glass:!0,warm:!1}},contrast:{bg:0,fog:0,bench:1118481,benchTop:2236962,case:0,caseTrim:16777215,metal:16777215,pcb:0,accent:16770560,accent2:16777215,text:16777215,dark:!0,flags:{particles:!1,shadows:!1,outline:!0,grid:!1,pixel:!1,toon:!1,glass:!1,warm:!1,flat:!0}}};function Qo(s,t){if(typeof s=="number")return s;let e=String(s||"").trim(),i=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e);if(i){let r=i[1].length===3?i[1].split("").map(a=>a+a).join(""):i[1];return parseInt(r,16)}let n=/^rgba?\(([^)]+)\)/i.exec(e);if(n){let[r,a,o]=n[1].split(",").map(l=>Number.parseFloat(l.trim()));if([r,a,o].every(Number.isFinite))return(Math.round(r)<<16)+(Math.round(a)<<8)+Math.round(o)}return t}function Er(){let s=document.documentElement,t=jo.includes(s.dataset.theme)?s.dataset.theme:"editorial",e=s.dataset.mode==="dark"?"dark":"light",i=Jc[t]||Jc.editorial,n=getComputedStyle(s),r=l=>n.getPropertyValue(l),a={...i};a.accent=Qo(r("--accent"),i.accent),a.accent2=Qo(r("--accent-2"),i.accent2),a.text=Qo(r("--text"),i.text);let o={...i.flags,reduced:s.dataset.motion==="reduced"||window.matchMedia?.("(prefers-reduced-motion: reduce)").matches||!1,dark:e==="dark"||i.dark};return o.reduced&&(o.particles=!1,o.shadows=!1),t==="contrast"&&(o.particles=!1,o.shadows=!1,o.outline=!0),{id:t,mode:e,palette:a,flags:o,css:{accent:r("--accent").trim(),accent2:r("--accent-2").trim(),text:r("--text").trim(),surface:r("--surface").trim(),line:r("--line").trim()}}}function Kc(s){let t=0,e=()=>{cancelAnimationFrame(t),t=requestAnimationFrame(()=>s(Er()))},i=new MutationObserver(e);i.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme","data-mode","data-motion"]});let n=window.matchMedia?.("(prefers-color-scheme: dark)");return n?.addEventListener?.("change",e),()=>{cancelAnimationFrame(t),i.disconnect(),n?.removeEventListener?.("change",e)}}function tl(s){let t=Er();return s.style.setProperty("--game-accent",t.css.accent),s.style.setProperty("--game-accent-2",t.css.accent2),s.style.setProperty("--game-text",t.css.text),s.dataset.gameTheme=t.id,t}var ri={editorial:[261.63,329.63,392,523.25],marshmallow:[293.66,369.99,440,587.33],candy:[329.63,415.3,493.88,659.25],neon:[220,277.18,329.63,440],blueprint:[246.94,311.13,369.99,493.88],pixel:[261.63,329.63,392,523.25],lofi:[196,246.94,293.66,392],mint:[293.66,349.23,440,587.33],contrast:[261.63,392,523.25,783.99]},Gd={editorial:"triangle",marshmallow:"sine",candy:"sine",neon:"sawtooth",blueprint:"square",pixel:"square",lofi:"sine",mint:"triangle",contrast:"square"},Tr=class{constructor({theme:t="editorial",enabled:e=!0}={}){this.theme=t,this.enabled=e,this.context=null,this.master=null}setTheme(t){this.theme=t}setEnabled(t){this.enabled=!!t,!this.enabled&&this.context&&this.context.suspend?.(),this.enabled&&this.context&&this.context.resume?.()}ensure(){if(!this.enabled)return null;if(!this.context){let t=window.AudioContext||window.webkitAudioContext;if(!t)return null;this.context=new t,this.master=this.context.createGain(),this.master.gain.value=.7,this.master.connect(this.context.destination)}return this.context.state==="suspended"&&this.context.resume(),this.context}note(t,e=.1,{type:i=null,gain:n=.05,delay:r=0,slide:a=0}={}){let o=this.ensure();if(!o)return;let l=o.createOscillator(),c=o.createGain(),h=o.currentTime+r;l.type=i||Gd[this.theme]||"triangle",l.frequency.setValueAtTime(Math.max(40,t),h),a&&l.frequency.exponentialRampToValueAtTime(Math.max(40,t+a),h+e),c.gain.setValueAtTime(1e-4,h),c.gain.exponentialRampToValueAtTime(Math.max(2e-4,n),h+.012),c.gain.exponentialRampToValueAtTime(1e-4,h+e),l.connect(c).connect(this.master),l.start(h),l.stop(h+e+.03)}noise(t=.18,{gain:e=.05,delay:i=0,highpass:n=900}={}){let r=this.ensure();if(!r)return;let a=Math.max(1,Math.floor(r.sampleRate*t)),o=r.createBuffer(1,a,r.sampleRate),l=o.getChannelData(0);for(let u=0;u<a;u+=1)l[u]=(Math.random()*2-1)*(1-u/a);let c=r.createBufferSource();c.buffer=o;let h=r.createBiquadFilter();h.type="highpass",h.frequency.value=n;let d=r.createGain();d.gain.value=e,c.connect(h).connect(d).connect(this.master),c.start(r.currentTime+i)}chord(t,{duration:e=.14,gap:i=.1,gain:n=.04}={}){t.forEach((r,a)=>this.note(r,e,{delay:a*i,gain:n}))}click(){this.note(ri[this.theme][0]*1.5,.045,{gain:.025,type:"square"})}hover(){this.note(ri[this.theme][1]*2,.035,{gain:.012})}pick(){this.note(ri[this.theme][1],.07,{gain:.03})}drop(){this.note(ri[this.theme][0],.08,{gain:.035,type:"triangle"})}snap(){this.noise(.05,{gain:.05,highpass:1800}),this.note(ri[this.theme][2],.1,{gain:.045,type:"triangle"}),this.note(ri[this.theme][3],.16,{gain:.03,delay:.05})}clickSnap(){this.noise(.035,{gain:.06,highpass:2500}),this.note(ri[this.theme][3],.07,{gain:.04,type:"square"})}error(){this.note(110,.2,{type:"sawtooth",gain:.04,slide:-30}),this.note(82,.24,{type:"sawtooth",gain:.03,delay:.1})}spark(){this.noise(.22,{gain:.07,highpass:2200}),this.note(1200,.1,{type:"sawtooth",gain:.025,slide:-600})}crunch(){this.noise(.24,{gain:.08,highpass:400}),this.note(70,.3,{type:"sawtooth",gain:.05,slide:-25})}paste(){this.noise(.3,{gain:.03,highpass:300}),this.note(ri[this.theme][1],.3,{gain:.02,slide:60})}boot(){let t=ri[this.theme];[0,1,2,3].forEach(e=>this.note(t[e],.22,{gain:.04,delay:e*.12})),this.note(t[0]/2,.9,{gain:.03,type:"sine",delay:.1})}fan(){this.noise(.8,{gain:.018,highpass:200})}star(t=0){let e=ri[this.theme];this.note(e[Math.min(3,t)]*2,.18,{gain:.04,type:"sine"})}success(){let t=ri[this.theme];[0,1,2,3,2,3].forEach((e,i)=>{this.note(t[e]*(i>2?1.5:1),.22,{gain:.035,delay:i*.1})})}fail(){[0,1,0].forEach((t,e)=>{this.note(ri[this.theme][t]/2,.3,{type:"sawtooth",gain:.03,delay:e*.16})})}tick(){this.note(640,.03,{gain:.01,type:"square"})}whoosh(){this.noise(.25,{gain:.025,highpass:500})}};function Ar(s=18,t=!0){if(t)try{navigator.vibrate?.(s)}catch{}}var Bh=0,Ol=1,kh=2;var Tn=1,zh=2,ds=3,Li=0,Xe=1,qe=2,An=0,Ji=1,cr=2,Bl=3,kl=4,Hh=5;var Rn=100,Gh=101,Vh=102,Wh=103,Xh=104,qh=200,Yh=201,$h=202,Zh=203,zl=204,Hl=205,Jh=206,Kh=207,Qh=208,jh=209,tu=210,eu=211,iu=212,nu=213,su=214,oa=0,la=1,ca=2,jn=3,ha=4,ua=5,da=6,fa=7,Gl=0,ru=1,au=2,Di=0,Vl=1,Wl=2,Xl=3,hr=4,ql=5,Yl=6,$l=7;var Zl=300,Cn=301,fs=302,Ya=303,$a=304,pa=1e3,wi=1001,ma=1002,Ae=1003,ou=1004;var ur=1005;var Ge=1006,Za=1007;var Ki=1008;var Ze=1009,Jl=1010,Kl=1011,ps=1012,Ja=1013,gi=1014,hi=1015,xi=1016,Ka=1017,Qa=1018,Pn=1020,Ql=35902,jl=35899,tc=1021,ec=1022,yi=1023,Vi=1026,Qi=1027,ja=1028,to=1029,fn=1030,eo=1031;var io=1033,dr=33776,fr=33777,pr=33778,mr=33779,no=35840,so=35841,ro=35842,ao=35843,oo=36196,lo=37492,co=37496,ho=37488,uo=37489,gr=37490,fo=37491,po=37808,mo=37809,go=37810,xo=37811,yo=37812,_o=37813,vo=37814,bo=37815,So=37816,Mo=37817,wo=37818,Eo=37819,To=37820,Ao=37821,Ro=36492,Co=36494,Po=36495,Io=36283,Lo=36284,xr=36285,Do=36286;var Ds=2300,ga=2301,ra=2302,Al=2303,Rl=2400,Cl=2401,Pl=2402;var lu=3200;var No=0,cu=1,ji="",xe="srgb",Ns="srgb-linear",Us="linear",jt="srgb";var aa=7680;var hu=519,uu=512,du=513,fu=514,ic=515,pu=516,mu=517,nc=518,sc=519,rc=35044;var ac="300 es",oi=2e3,ts=2001;function Vd(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Wd(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Fs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function gu(){let s=Fs("canvas");return s.style.display="block",s}var Qc={},es=null;function Os(...s){let t="THREE."+s.shift();es?es("log",t,...s):console.log(t,...s)}function xu(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ct(...s){s=xu(s);let t="THREE."+s.shift();if(es)es("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Dt(...s){s=xu(s);let t="THREE."+s.shift();if(es)es("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function Cs(...s){let t=s.join(" ");t in Qc||(Qc[t]=!0,Ct(...s))}function yu(s,t,e){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var _u={[oa]:oa,[ca]:da,[ha]:ha,[jn]:ua,[la]:la,[da]:ca,[fa]:fa,[ua]:jn},Ei=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let n=i[t];if(n!==void 0){let r=n.indexOf(e);r!==-1&&n.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,t);t.target=null}}},De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],jc=1234567,Kn=Math.PI/180,Sn=180/Math.PI;function pn(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(De[s&255]+De[s>>8&255]+De[s>>16&255]+De[s>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[i&255]+De[i>>8&255]+De[i>>16&255]+De[i>>24&255]).toLowerCase()}function Wt(s,t,e){return Math.max(t,Math.min(e,s))}function oc(s,t){return(s%t+t)%t}function Xd(s,t,e,i,n){return i+(s-t)*(n-i)/(e-t)}function qd(s,t,e){return s!==t?(e-s)/(t-s):0}function Ps(s,t,e){return(1-e)*s+e*t}function Yd(s,t,e,i){return Ps(s,t,1-Math.exp(-e*i))}function $d(s,t=1){return t-Math.abs(oc(s,t*2)-t)}function Zd(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Jd(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Kd(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Qd(s,t){return s+Math.random()*(t-s)}function jd(s){return s*(.5-Math.random())}function tf(s){s!==void 0&&(jc=s);let t=jc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ef(s){return s*Kn}function nf(s){return s*Sn}function sf(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function rf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function lc(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function af(s,t,e,i,n){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),d=r((t-i)/2),u=a((t-i)/2),f=r((i-t)/2),g=a((i-t)/2);switch(n){case"XYX":s.set(o*h,l*d,l*u,o*c);break;case"YZY":s.set(l*u,o*h,l*d,o*c);break;case"ZXZ":s.set(l*d,l*u,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*h,o*c);break;default:Ct("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function Uo(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function cc(s,t){if(t.constructor===Float32Array)return s;let e=Uo(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/e,-1)}function hc(s,t){if(t.constructor===Float32Array)return s;let e=Uo(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*e)}var Ye={DEG2RAD:Kn,RAD2DEG:Sn,generateUUID:pn,clamp:Wt,euclideanModulo:oc,mapLinear:Xd,inverseLerp:qd,lerp:Ps,damp:Yd,pingpong:$d,smoothstep:Zd,smootherstep:Jd,randInt:Kd,randFloat:Qd,randFloatSpread:jd,seededRandom:tf,degToRad:ef,radToDeg:nf,isPowerOfTwo:sf,ceilPowerOfTwo:rf,floorPowerOfTwo:lc,setQuaternionFromProperEuler:af,normalize:hc,denormalize:cc},gc=class gc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Wt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Wt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),n=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*n+t.x,this.y=r*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};gc.prototype.isVector2=!0;var vt=gc,Ti=class{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,r,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],d=i[n+3],u=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(d!==_||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*_;m<0&&(u=-u,f=-f,g=-g,_=-_,m=-m);let p=1-o;if(m<.9995){let S=Math.acos(m),E=Math.sin(S);p=Math.sin(p*S)/E,o=Math.sin(o*S)/E,l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+_*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+_*o;let S=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=S,c*=S,h*=S,d*=S}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,n,r,a){let o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-o*f,t[e+2]=c*g+h*f+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,n=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),d=o(r/2),u=l(i/2),f=l(n/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Ct("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],n=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=i+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-n)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(n+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(n+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-n)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Wt(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+n*c-r*l,this._y=n*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},xc=class xc{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(th.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(th.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*n,this.y=r[1]*e+r[4]*i+r[7]*n,this.z=r[2]*e+r[5]*i+r[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,n=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*n-o*i),h=2*(o*e-r*n),d=2*(r*i-a*e);return this.x=e+l*c+a*d-o*h,this.y=i+l*h+o*c-r*d,this.z=n+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n,this.y=r[1]*e+r[5]*i+r[9]*n,this.z=r[2]*e+r[6]*i+r[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Wt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,n=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return el.copy(this).projectOnVector(t),this.sub(el)}reflect(t){return this.sub(el.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Wt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};xc.prototype.isVector3=!0;var R=xc,el=new R,th=new Ti,yc=class yc{constructor(t,e,i,n,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c)}set(t,e,i,n,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=n,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],_=n[0],m=n[3],p=n[6],S=n[1],E=n[4],b=n[7],A=n[2],T=n[5],x=n[8];return r[0]=a*_+o*S+l*A,r[3]=a*m+o*E+l*T,r[6]=a*p+o*b+l*x,r[1]=c*_+h*S+d*A,r[4]=c*m+h*E+d*T,r[7]=c*p+h*b+d*x,r[2]=u*_+f*S+g*A,r[5]=u*m+f*E+g*T,r[8]=u*p+f*b+g*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+n*r*c-n*a*l}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=e*d+i*u+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=d*_,t[1]=(n*c-h*i)*_,t[2]=(o*i-n*a)*_,t[3]=u*_,t[4]=(h*e-n*l)*_,t[5]=(n*r-o*e)*_,t[6]=f*_,t[7]=(i*l-c*e)*_,t[8]=(a*e-i*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-n*c,n*l,-n*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Cs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(il.makeScale(t,e)),this}rotate(t){return Cs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(il.makeRotation(-t)),this}translate(t,e){return Cs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(il.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};yc.prototype.isMatrix3=!0;var Ut=yc,il=new Ut,eh=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ih=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function of(){let s={enabled:!0,workingColorSpace:Ns,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===jt&&(n.r=Gi(n.r),n.g=Gi(n.g),n.b=Gi(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===jt&&(n.r=Qn(n.r),n.g=Qn(n.g),n.b=Qn(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===ji?Us:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[Ns]:{primaries:t,whitePoint:i,transfer:Us,toXYZ:eh,fromXYZ:ih,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:xe},outputColorSpaceConfig:{drawingBufferColorSpace:xe}},[xe]:{primaries:t,whitePoint:i,transfer:jt,toXYZ:eh,fromXYZ:ih,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:xe}}}),s}var $t=of();function Gi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Qn(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Dn,xa=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Dn===void 0&&(Dn=Fs("canvas")),Dn.width=t.width,Dn.height=t.height;let n=Dn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=Dn}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Fs("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let n=i.getImageData(0,0,t.width,t.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=Gi(r[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Gi(e[i]/255)*255):e[i]=Gi(e[i]);return{data:e,width:t.width,height:t.height}}else return Ct("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},lf=0,is=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=pn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(nl(n[a].image)):r.push(nl(n[a]))}else r=nl(n);i.url=r}return e||(t.images[this.uuid]=i),i}};function nl(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?xa.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ct("Texture: Unable to serialize Texture."),{})}var cf=0,sl=new R,Ve=class s extends Ei{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,i=wi,n=wi,r=Ge,a=Ki,o=yi,l=Ze,c=s.DEFAULT_ANISOTROPY,h=ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=pn(),this.name="",this.source=new is(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(sl).x}get height(){return this.source.getSize(sl).y}get depth(){return this.source.getSize(sl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Ct(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Ct(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Zl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case pa:t.x=t.x-Math.floor(t.x);break;case wi:t.x=t.x<0?0:1;break;case ma:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case pa:t.y=t.y-Math.floor(t.y);break;case wi:t.y=t.y<0?0:1;break;case ma:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ve.DEFAULT_IMAGE=null;Ve.DEFAULT_MAPPING=Zl;Ve.DEFAULT_ANISOTROPY=1;var _c=class _c{constructor(t=0,e=0,i=0,n=1){this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,b=(f+1)/2,A=(p+1)/2,T=(h+u)/4,x=(d+_)/4,M=(g+m)/4;return E>b&&E>A?E<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(E),n=T/i,r=x/i):b>A?b<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(b),i=T/n,r=M/n):A<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(A),i=x/r,n=M/r),this.set(i,n,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-_)/S,this.z=(u-h)/S,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this.w=Wt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this.w=Wt(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Wt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};_c.prototype.isVector4=!0;var le=_c,ya=class extends Ei{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ge,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new le(0,0,t,e),this.scissorTest=!1,this.viewport=new le(0,0,t,e),this.textures=[];let n=i.count;for(let r=0;r<n;r++)this.textures[r]=new Ve({width:t,height:e,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ge,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let n=Object.assign({},t.textures[e].image);this.textures[e].source=new is(n)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},je=class extends ya{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Bs=class extends Ve{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ae,this.minFilter=Ae,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var _a=class extends Ve{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ae,this.minFilter=Ae,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var qa=class qa{constructor(t,e,i,n,r,a,o,l,c,h,d,u,f,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c,h,d,u,f,g,_,m)}set(t,e,i,n,r,a,o,l,c,h,d,u,f,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=n,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qa().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,n=1/Nn.setFromMatrixColumn(t,0).length(),r=1/Nn.setFromMatrixColumn(t,1).length(),a=1/Nn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,n=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,f=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u+_*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=_+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u-_*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,f=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-_*d}else if(t.order==="XZY"){let u=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(hf,t,uf)}lookAt(t,e,i){let n=this.elements;return Je.subVectors(t,e),Je.lengthSq()===0&&(Je.z=1),Je.normalize(),nn.crossVectors(i,Je),nn.lengthSq()===0&&(Math.abs(i.z)===1?Je.x+=1e-4:Je.z+=1e-4,Je.normalize(),nn.crossVectors(i,Je)),nn.normalize(),Rr.crossVectors(Je,nn),n[0]=nn.x,n[4]=Rr.x,n[8]=Je.x,n[1]=nn.y,n[5]=Rr.y,n[9]=Je.y,n[2]=nn.z,n[6]=Rr.z,n[10]=Je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],_=i[6],m=i[10],p=i[14],S=i[3],E=i[7],b=i[11],A=i[15],T=n[0],x=n[4],M=n[8],I=n[12],C=n[1],N=n[5],F=n[9],z=n[13],L=n[2],V=n[6],q=n[10],G=n[14],et=n[3],X=n[7],Q=n[11],j=n[15];return r[0]=a*T+o*C+l*L+c*et,r[4]=a*x+o*N+l*V+c*X,r[8]=a*M+o*F+l*q+c*Q,r[12]=a*I+o*z+l*G+c*j,r[1]=h*T+d*C+u*L+f*et,r[5]=h*x+d*N+u*V+f*X,r[9]=h*M+d*F+u*q+f*Q,r[13]=h*I+d*z+u*G+f*j,r[2]=g*T+_*C+m*L+p*et,r[6]=g*x+_*N+m*V+p*X,r[10]=g*M+_*F+m*q+p*Q,r[14]=g*I+_*z+m*G+p*j,r[3]=S*T+E*C+b*L+A*et,r[7]=S*x+E*N+b*V+A*X,r[11]=S*M+E*F+b*q+A*Q,r[15]=S*I+E*z+b*G+A*j,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15],S=l*f-c*u,E=o*f-c*d,b=o*u-l*d,A=a*f-c*h,T=a*u-l*h,x=a*d-o*h;return e*(_*S-m*E+p*b)-i*(g*S-m*A+p*T)+n*(g*E-_*A+p*x)-r*(g*b-_*T+m*x)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-i*(r*h-o*l)+n*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],S=e*o-i*a,E=e*l-n*a,b=e*c-r*a,A=i*l-n*o,T=i*c-r*o,x=n*c-r*l,M=h*_-d*g,I=h*m-u*g,C=h*p-f*g,N=d*m-u*_,F=d*p-f*_,z=u*p-f*m,L=S*z-E*F+b*N+A*C-T*I+x*M;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/L;return t[0]=(o*z-l*F+c*N)*V,t[1]=(n*F-i*z-r*N)*V,t[2]=(_*x-m*T+p*A)*V,t[3]=(u*T-d*x-f*A)*V,t[4]=(l*C-a*z-c*I)*V,t[5]=(e*z-n*C+r*I)*V,t[6]=(m*b-g*x-p*E)*V,t[7]=(h*x-u*b+f*E)*V,t[8]=(a*F-o*C+c*M)*V,t[9]=(i*C-e*F-r*M)*V,t[10]=(g*T-_*b+p*S)*V,t[11]=(d*b-h*T-f*S)*V,t[12]=(o*I-a*N-l*M)*V,t[13]=(e*N-i*I+n*M)*V,t[14]=(_*E-g*A-m*S)*V,t[15]=(h*A-d*E+u*S)*V,this}scale(t){let e=this.elements,i=t.x,n=t.y,r=t.z;return e[0]*=i,e[4]*=n,e[8]*=r,e[1]*=i,e[5]*=n,e[9]*=r,e[2]*=i,e[6]*=n,e[10]*=r,e[3]*=i,e[7]*=n,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),n=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,r,a){return this.set(1,i,r,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){let n=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,_=a*h,m=a*d,p=o*d,S=l*c,E=l*h,b=l*d,A=i.x,T=i.y,x=i.z;return n[0]=(1-(_+p))*A,n[1]=(f+b)*A,n[2]=(g-E)*A,n[3]=0,n[4]=(f-b)*T,n[5]=(1-(u+p))*T,n[6]=(m+S)*T,n[7]=0,n[8]=(g+E)*x,n[9]=(m-S)*x,n[10]=(1-(u+_))*x,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){let n=this.elements;t.x=n[12],t.y=n[13],t.z=n[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=Nn.set(n[0],n[1],n[2]).length(),o=Nn.set(n[4],n[5],n[6]).length(),l=Nn.set(n[8],n[9],n[10]).length();r<0&&(a=-a),di.copy(this);let c=1/a,h=1/o,d=1/l;return di.elements[0]*=c,di.elements[1]*=c,di.elements[2]*=c,di.elements[4]*=h,di.elements[5]*=h,di.elements[6]*=h,di.elements[8]*=d,di.elements[9]*=d,di.elements[10]*=d,e.setFromRotationMatrix(di),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,n,r,a,o=oi,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(i-n),u=(e+t)/(e-t),f=(i+n)/(i-n),g,_;if(l)g=r/(a-r),_=a*r/(a-r);else if(o===oi)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===ts)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,r,a,o=oi,l=!1){let c=this.elements,h=2/(e-t),d=2/(i-n),u=-(e+t)/(e-t),f=-(i+n)/(i-n),g,_;if(l)g=1/(a-r),_=a/(a-r);else if(o===oi)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===ts)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};qa.prototype.isMatrix4=!0;var Zt=qa,Nn=new R,di=new Zt,hf=new R(0,0,0),uf=new R(1,1,1),nn=new R,Rr=new R,Je=new R,nh=new Zt,sh=new Ti,Wi=class s{constructor(t=0,e=0,i=0,n=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let n=t.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],d=n[2],u=n[6],f=n[10];switch(e){case"XYZ":this._y=Math.asin(Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Wt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ct("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return nh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(nh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return sh.setFromEuler(this),this.setFromQuaternion(sh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Wi.DEFAULT_ORDER="XYZ";var ns=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},df=0,rh=new R,Un=new Ti,Oi=new Zt,Cr=new R,_s=new R,ff=new R,pf=new Ti,ah=new R(1,0,0),oh=new R(0,1,0),lh=new R(0,0,1),ch={type:"added"},mf={type:"removed"},Fn={type:"childadded",child:null},rl={type:"childremoved",child:null},ue=class s extends Ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=pn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new R,e=new Wi,i=new Ti,n=new R(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Zt},normalMatrix:{value:new Ut}}),this.matrix=new Zt,this.matrixWorld=new Zt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ns,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Un.setFromAxisAngle(t,e),this.quaternion.multiply(Un),this}rotateOnWorldAxis(t,e){return Un.setFromAxisAngle(t,e),this.quaternion.premultiply(Un),this}rotateX(t){return this.rotateOnAxis(ah,t)}rotateY(t){return this.rotateOnAxis(oh,t)}rotateZ(t){return this.rotateOnAxis(lh,t)}translateOnAxis(t,e){return rh.copy(t).applyQuaternion(this.quaternion),this.position.add(rh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ah,t)}translateY(t){return this.translateOnAxis(oh,t)}translateZ(t){return this.translateOnAxis(lh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Oi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Cr.copy(t):Cr.set(t,e,i);let n=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oi.lookAt(_s,Cr,this.up):Oi.lookAt(Cr,_s,this.up),this.quaternion.setFromRotationMatrix(Oi),n&&(Oi.extractRotation(n.matrixWorld),Un.setFromRotationMatrix(Oi),this.quaternion.premultiply(Un.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Dt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ch),Fn.child=t,this.dispatchEvent(Fn),Fn.child=null):Dt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(mf),rl.child=t,this.dispatchEvent(rl),rl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Oi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Oi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Oi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ch),Fn.child=t,this.dispatchEvent(Fn),Fn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,t,ff),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,pf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,n=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*n,r[13]+=i-r[1]*e-r[5]*i-r[9]*n,r[14]+=n-r[2]*e-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));n.material=o}else n.material=r(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];n.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let n=t.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ue.DEFAULT_UP=new R(0,1,0);ue.DEFAULT_MATRIX_AUTO_UPDATE=!0;ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ot=class extends ue{constructor(){super(),this.isGroup=!0,this.type="Group"}},gf={type:"move"},ss=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ot,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ot,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ot,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gf)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Ot;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},vu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},sn={h:0,s:0,l:0},Pr={h:0,s:0,l:0};function al(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Nt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=xe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=$t.workingColorSpace){return this.r=t,this.g=e,this.b=i,$t.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=$t.workingColorSpace){if(t=oc(t,1),e=Wt(e,0,1),i=Wt(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=al(a,r,t+1/3),this.g=al(a,r,t),this.b=al(a,r,t-1/3)}return $t.colorSpaceToWorking(this,n),this}setStyle(t,e=xe){function i(r){r!==void 0&&parseFloat(r)<1&&Ct("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ct("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ct("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=xe){let i=vu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ct("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Gi(t.r),this.g=Gi(t.g),this.b=Gi(t.b),this}copyLinearToSRGB(t){return this.r=Qn(t.r),this.g=Qn(t.g),this.b=Qn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=xe){return $t.workingToColorSpace(Ne.copy(this),t),Math.round(Wt(Ne.r*255,0,255))*65536+Math.round(Wt(Ne.g*255,0,255))*256+Math.round(Wt(Ne.b*255,0,255))}getHexString(t=xe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(Ne.copy(this),e);let i=Ne.r,n=Ne.g,r=Ne.b,a=Math.max(i,n,r),o=Math.min(i,n,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(n-r)/d+(n<r?6:0);break;case n:l=(r-i)/d+2;break;case r:l=(i-n)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=xe){$t.workingToColorSpace(Ne.copy(this),t);let e=Ne.r,i=Ne.g,n=Ne.b;return t!==xe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(sn),this.setHSL(sn.h+t,sn.s+e,sn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(sn),t.getHSL(Pr);let i=Ps(sn.h,Pr.h,e),n=Ps(sn.s,Pr.s,e),r=Ps(sn.l,Pr.l,e);return this.setHSL(i,n,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,n=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*n,this.g=r[1]*e+r[4]*i+r[7]*n,this.b=r[2]*e+r[5]*i+r[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ne=new Nt;Nt.NAMES=vu;var ks=class s{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Nt(t),this.near=e,this.far=i}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},zs=class extends ue{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wi,this.environmentIntensity=1,this.environmentRotation=new Wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},fi=new R,Bi=new R,ol=new R,ki=new R,On=new R,Bn=new R,hh=new R,ll=new R,cl=new R,hl=new R,ul=new le,dl=new le,fl=new le,Mi=class s{constructor(t=new R,e=new R,i=new R){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),fi.subVectors(t,e),n.cross(fi);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(t,e,i,n,r){fi.subVectors(n,e),Bi.subVectors(i,e),ol.subVectors(t,e);let a=fi.dot(fi),o=fi.dot(Bi),l=fi.dot(ol),c=Bi.dot(Bi),h=Bi.dot(ol),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,ki)===null?!1:ki.x>=0&&ki.y>=0&&ki.x+ki.y<=1}static getInterpolation(t,e,i,n,r,a,o,l){return this.getBarycoord(t,e,i,n,ki)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ki.x),l.addScaledVector(a,ki.y),l.addScaledVector(o,ki.z),l)}static getInterpolatedAttribute(t,e,i,n,r,a){return ul.setScalar(0),dl.setScalar(0),fl.setScalar(0),ul.fromBufferAttribute(t,e),dl.fromBufferAttribute(t,i),fl.fromBufferAttribute(t,n),a.setScalar(0),a.addScaledVector(ul,r.x),a.addScaledVector(dl,r.y),a.addScaledVector(fl,r.z),a}static isFrontFacing(t,e,i,n){return fi.subVectors(i,e),Bi.subVectors(t,e),fi.cross(Bi).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fi.subVectors(this.c,this.b),Bi.subVectors(this.a,this.b),fi.cross(Bi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,r){return s.getInterpolation(t,this.a,this.b,this.c,e,i,n,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,n=this.b,r=this.c,a,o;On.subVectors(n,i),Bn.subVectors(r,i),ll.subVectors(t,i);let l=On.dot(ll),c=Bn.dot(ll);if(l<=0&&c<=0)return e.copy(i);cl.subVectors(t,n);let h=On.dot(cl),d=Bn.dot(cl);if(h>=0&&d<=h)return e.copy(n);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(i).addScaledVector(On,a);hl.subVectors(t,r);let f=On.dot(hl),g=Bn.dot(hl);if(g>=0&&f<=g)return e.copy(r);let _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(Bn,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return hh.subVectors(r,n),o=(d-h)/(d-h+(f-g)),e.copy(n).addScaledVector(hh,o);let p=1/(m+_+u);return a=_*p,o=u*p,e.copy(i).addScaledVector(On,a).addScaledVector(Bn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ai=class{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(pi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(pi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=pi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,pi):pi.fromBufferAttribute(r,a),pi.applyMatrix4(t.matrixWorld),this.expandByPoint(pi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ir.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ir.copy(i.boundingBox)),Ir.applyMatrix4(t.matrixWorld),this.union(Ir)}let n=t.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,pi),pi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(vs),Lr.subVectors(this.max,vs),kn.subVectors(t.a,vs),zn.subVectors(t.b,vs),Hn.subVectors(t.c,vs),rn.subVectors(zn,kn),an.subVectors(Hn,zn),yn.subVectors(kn,Hn);let e=[0,-rn.z,rn.y,0,-an.z,an.y,0,-yn.z,yn.y,rn.z,0,-rn.x,an.z,0,-an.x,yn.z,0,-yn.x,-rn.y,rn.x,0,-an.y,an.x,0,-yn.y,yn.x,0];return!pl(e,kn,zn,Hn,Lr)||(e=[1,0,0,0,1,0,0,0,1],!pl(e,kn,zn,Hn,Lr))?!1:(Dr.crossVectors(rn,an),e=[Dr.x,Dr.y,Dr.z],pl(e,kn,zn,Hn,Lr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,pi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(pi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(zi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),zi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),zi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),zi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),zi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),zi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),zi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),zi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(zi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},zi=[new R,new R,new R,new R,new R,new R,new R,new R],pi=new R,Ir=new Ai,kn=new R,zn=new R,Hn=new R,rn=new R,an=new R,yn=new R,vs=new R,Lr=new R,Dr=new R,_n=new R;function pl(s,t,e,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){_n.fromArray(s,r);let o=n.x*Math.abs(_n.x)+n.y*Math.abs(_n.y)+n.z*Math.abs(_n.z),l=t.dot(_n),c=e.dot(_n),h=i.dot(_n);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var ge=new R,Nr=new vt,xf=0,He=class extends Ei{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=rc,this.updateRanges=[],this.gpuType=hi,this.version=0,this._normalizationScale=t!==void 0?Uo(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Nr.fromBufferAttribute(this,e),Nr.applyMatrix3(t),this.setXY(e,Nr.x,Nr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix3(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix4(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.applyNormalMatrix(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.transformDirection(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=this._denormalize(i)),i}setComponent(t,e,i){return this.normalized&&(i=this._normalize(i)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),n=this._normalize(n),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):cc(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):hc(t,this.array)}};var Hs=class extends He{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Gs=class extends He{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Jt=class extends He{constructor(t,e,i){super(new Float32Array(t),e,i)}},yf=new Ai,bs=new R,ml=new R,Ri=class{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):yf.setFromPoints(t).getCenter(i);let n=0;for(let r=0,a=t.length;r<a;r++)n=Math.max(n,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;bs.subVectors(t,this.center);let e=bs.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(bs,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ml.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(bs.copy(t.center).add(ml)),this.expandByPoint(bs.copy(t.center).sub(ml))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},_f=0,ai=new Zt,gl=new ue,Gn=new R,Ke=new Ai,Ss=new Ai,Te=new R,de=class s extends Ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=pn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Vd(t)?Gs:Hs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ut().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return ai.makeRotationFromQuaternion(t),this.applyMatrix4(ai),this}rotateX(t){return ai.makeRotationX(t),this.applyMatrix4(ai),this}rotateY(t){return ai.makeRotationY(t),this.applyMatrix4(ai),this}rotateZ(t){return ai.makeRotationZ(t),this.applyMatrix4(ai),this}translate(t,e,i){return ai.makeTranslation(t,e,i),this.applyMatrix4(ai),this}scale(t,e,i){return ai.makeScale(t,e,i),this.applyMatrix4(ai),this}lookAt(t){return gl.lookAt(t),gl.updateMatrix(),this.applyMatrix4(gl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gn).negate(),this.translate(Gn.x,Gn.y,Gn.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let n=0,r=t.length;n<r;n++){let a=t[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Jt(i,3))}else{let i=Math.min(t.length,e.count);for(let n=0;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&Ct("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ai);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){let r=e[i];Ke.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Ke.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Ke.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Ke.min),this.boundingBox.expandByPoint(Ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Dt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ri);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Dt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){let i=this.boundingSphere.center;if(Ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Ss.setFromBufferAttribute(o),this.morphTargetsRelative?(Te.addVectors(Ke.min,Ss.min),Ke.expandByPoint(Te),Te.addVectors(Ke.max,Ss.max),Ke.expandByPoint(Te)):(Ke.expandByPoint(Ss.min),Ke.expandByPoint(Ss.max))}Ke.getCenter(i);let n=0;for(let r=0,a=t.count;r<a;r++)Te.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(Te));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Te.fromBufferAttribute(o,c),l&&(Gn.fromBufferAttribute(t,c),Te.add(Gn)),n=Math.max(n,i.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Dt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Dt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,n=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new He(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(i.count);for(let I=0;I<i.count;I++)o[I]=new R,l[I]=new R;let h=new R,d=new R,u=new R,f=new vt,g=new vt,_=new vt,m=new R,p=new R;function S(I,C,N){c[I]=c[C]=c[N]=1,h.fromBufferAttribute(i,I),d.fromBufferAttribute(i,C),u.fromBufferAttribute(i,N),f.fromBufferAttribute(r,I),g.fromBufferAttribute(r,C),_.fromBufferAttribute(r,N),d.sub(h),u.sub(h),g.sub(f),_.sub(f);let F=1/(g.x*_.y-_.x*g.y);isFinite(F)&&(m.copy(d).multiplyScalar(_.y).addScaledVector(u,-g.y).multiplyScalar(F),p.copy(u).multiplyScalar(g.x).addScaledVector(d,-_.x).multiplyScalar(F),o[I].add(m),o[C].add(m),o[N].add(m),l[I].add(p),l[C].add(p),l[N].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let I=0,C=E.length;I<C;++I){let N=E[I],F=N.start,z=N.count;for(let L=F,V=F+z;L<V;L+=3)S(t.getX(L+0),t.getX(L+1),t.getX(L+2))}let b=new R,A=new R,T=new R,x=new R;function M(I){T.fromBufferAttribute(n,I),x.copy(T);let C=o[I];b.copy(C),b.sub(T.multiplyScalar(T.dot(C))).normalize(),A.crossVectors(x,C);let F=A.dot(l[I])<0?-1:1;a.setXYZW(I,b.x,b.y,b.z,F)}for(let I=0,C=i.count;I<C;++I)c[I]&&M(I);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new He(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let n=new R,r=new R,a=new R,o=new R,l=new R,c=new R,h=new R,d=new R;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);n.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(n,r),h.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)n.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(n,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new He(u,h,d)}if(this.index===null)return Ct("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,i=this.index.array,n=this.attributes;for(let o in n){let l=n[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let n={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(n[l]=h,r=!0)}r&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let n=t.attributes;for(let c in n){let h=n[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},va=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=rc,this.updateRanges=[],this.version=0,this.uuid=pn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,r=this.stride;n<r;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});let e=uh(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=this.array.slice(0).buffer);let i=new this.array.constructor(t.arrayBuffers[e]),n=new this.constructor(i,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});let e=uh(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let i={uuid:this.uuid,buffer:e,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}};function uh(s){return s.buffer._uuid===void 0&&(s.buffer._uuid=pn()),s.byteOffset===0&&s.byteLength===s.buffer.byteLength?s.buffer._uuid:s.buffer._uuid+":"+s.byteOffset+":"+s.byteLength}var ze=new R,Vs=class s{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n,this._normalizationScale=t!==void 0?Uo(t.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=this._denormalize(i)),i}setComponent(t,e,i){return this.normalized&&(i=this._normalize(i)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=this._denormalize(e)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=this._denormalize(e)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=this._denormalize(e)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=this._denormalize(e)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),i=this._normalize(i)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),i=this._normalize(i),n=this._normalize(n)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),i=this._normalize(i),n=this._normalize(n),r=this._normalize(r)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Os("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return new He(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Os("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):cc(t,this.data.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):hc(t,this.data.array)}},xl=new R,vf=new R,bf=new Ut,Qe=class{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let n=xl.subVectors(i,e).cross(vf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let n=t.delta(xl),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||bf.getNormalMatrix(t),n=this.coplanarPoint(xl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Sf=0,mi=class extends Ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=pn(),this.name="",this.type="Material",this.blending=Ji,this.side=Li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zl,this.blendDst=Hl,this.blendEquation=Rn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=jn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=aa,this.stencilZFail=aa,this.stencilZPass=aa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Ct(`Material: parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Ct(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=n(t.textures),a=n(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Nt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Qe().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new vt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new vt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let n=e.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},rs=class extends mi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Vn,Ms=new R,Wn=new R,Xn=new R,qn=new vt,ws=new vt,bu=new Zt,Ur=new R,Es=new R,Fr=new R,dh=new vt,yl=new vt,fh=new vt,Ws=class extends ue{constructor(t=new rs){if(super(),this.isSprite=!0,this.type="Sprite",Vn===void 0){Vn=new de;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new va(e,5);Vn.setIndex([0,1,2,0,2,3]),Vn.setAttribute("position",new Vs(i,3,0,!1)),Vn.setAttribute("uv",new Vs(i,2,3,!1))}this.geometry=Vn,this.material=t,this.center=new vt(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Dt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Wn.setFromMatrixScale(this.matrixWorld),bu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Xn.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Wn.multiplyScalar(-Xn.z);let i=this.material.rotation,n,r;i!==0&&(r=Math.cos(i),n=Math.sin(i));let a=this.center;Or(Ur.set(-.5,-.5,0),Xn,a,Wn,n,r),Or(Es.set(.5,-.5,0),Xn,a,Wn,n,r),Or(Fr.set(.5,.5,0),Xn,a,Wn,n,r),dh.set(0,0),yl.set(1,0),fh.set(1,1);let o=t.ray.intersectTriangle(Ur,Es,Fr,!1,Ms);if(o===null&&(Or(Es.set(-.5,.5,0),Xn,a,Wn,n,r),yl.set(0,1),o=t.ray.intersectTriangle(Ur,Fr,Es,!1,Ms),o===null))return;let l=t.ray.origin.distanceTo(Ms);l<t.near||l>t.far||e.push({distance:l,point:Ms.clone(),uv:Mi.getInterpolation(Ms,Ur,Es,Fr,dh,yl,fh,new vt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}toJSON(t){let e=super.toJSON(t);return e.object.center=this.center.toArray(),e}};function Or(s,t,e,i,n,r){qn.subVectors(s,e).addScalar(.5).multiply(i),n!==void 0?(ws.x=r*qn.x-n*qn.y,ws.y=n*qn.x+r*qn.y):ws.copy(qn),s.copy(t),s.x+=ws.x,s.y+=ws.y,s.applyMatrix4(bu)}var Hi=new R,_l=new R,Br=new R,kr=new R,Mn=class{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Hi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Hi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Hi.copy(this.origin).addScaledVector(this.direction,e),Hi.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){_l.copy(t).add(e).multiplyScalar(.5),Br.copy(e).sub(t).normalize(),kr.copy(this.origin).sub(_l);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Br),o=kr.dot(this.direction),l=-kr.dot(Br),c=kr.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let _=1/h;d*=_,u*=_,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(_l).addScaledVector(Br,u),f}intersectSphere(t,e){if(t.radius<0)return null;Hi.subVectors(t.center,this.origin);let i=Hi.dot(this.direction),n=Hi.dot(Hi)-i*i,r=t.radius*t.radius;if(n>r)return null;let a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,n=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,n=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,Hi)!==null}intersectTriangle(t,e,i,n,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,f=t.z-a.z,g=e.x-a.x,_=e.y-a.y,m=e.z-a.z,p=i.x-a.x,S=i.y-a.y,E=i.z-a.z,b=Math.abs(l),A=Math.abs(c),T=Math.abs(h),x,M,I,C,N,F,z,L,V,q,G,et;if(b>=A&&b>=T?(I=l,F=d,V=g,et=p,l>=0?(x=c,M=h,C=u,N=f,z=_,L=m,q=S,G=E):(x=h,M=c,C=f,N=u,z=m,L=_,q=E,G=S)):A>=T?(I=c,F=u,V=_,et=S,c>=0?(x=h,M=l,C=f,N=d,z=m,L=g,q=E,G=p):(x=l,M=h,C=d,N=f,z=g,L=m,q=p,G=E)):(I=h,F=f,V=m,et=E,h>=0?(x=l,M=c,C=d,N=u,z=g,L=_,q=p,G=S):(x=c,M=l,C=u,N=d,z=_,L=g,q=S,G=p)),I===0)return null;let X=x/I,Q=M/I,j=1/I,Et=C-X*F,Bt=N-Q*F,Z=z-X*V,gt=L-Q*V,bt=q-X*et,Pt=G-Q*et,xt=bt*gt-Pt*Z,zt=Et*Pt-Bt*bt,pe=Z*Bt-gt*Et;if(n){if(xt<0||zt<0||pe<0)return null}else if((xt<0||zt<0||pe<0)&&(xt>0||zt>0||pe>0))return null;let Lt=xt+zt+pe;if(Lt===0)return null;let te=j*(xt*F+zt*V+pe*et);return(Lt>0?te<0:te>0)?null:this.at(te/Lt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Re=class extends mi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wi,this.combine=Gl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},ph=new Zt,vn=new Mn,zr=new Ri,mh=new R,Hr=new R,Gr=new R,Vr=new R,vl=new R,Wr=new R,gh=new R,Xr=new R,wt=class extends ue{constructor(t=new de,e=new Re){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);let o=this.morphTargetInfluences;if(r&&o){Wr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(vl.fromBufferAttribute(d,t),a?Wr.addScaledVector(vl,h):Wr.addScaledVector(vl.sub(e),h))}e.add(Wr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),zr.copy(i.boundingSphere),zr.applyMatrix4(r),vn.copy(t.ray).recast(t.near),!(zr.containsPoint(vn.origin)===!1&&(vn.intersectSphere(zr,mh)===null||vn.origin.distanceToSquared(mh)>(t.far-t.near)**2))&&(ph.copy(r).invert(),vn.copy(t.ray).applyMatrix4(ph),!(i.boundingBox!==null&&vn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,vn)))}_computeIntersections(t,e,i){let n,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let b=S,A=E;b<A;b+=3){let T=o.getX(b),x=o.getX(b+1),M=o.getX(b+2);n=qr(this,p,t,i,c,h,d,T,x,M),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let S=o.getX(m),E=o.getX(m+1),b=o.getX(m+2);n=qr(this,a,t,i,c,h,d,S,E,b),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let b=S,A=E;b<A;b+=3){let T=b,x=b+1,M=b+2;n=qr(this,p,t,i,c,h,d,T,x,M),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let S=m,E=m+1,b=m+2;n=qr(this,a,t,i,c,h,d,S,E,b),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}}};function Mf(s,t,e,i,n,r,a,o){let l;if(t.side===Xe?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,t.side===Li,o),l===null)return null;Xr.copy(o),Xr.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Xr);return c<e.near||c>e.far?null:{distance:c,point:Xr.clone(),object:s}}function qr(s,t,e,i,n,r,a,o,l,c){s.getVertexPosition(o,Hr),s.getVertexPosition(l,Gr),s.getVertexPosition(c,Vr);let h=Mf(s,t,e,i,Hr,Gr,Vr,gh);if(h){let d=new R;Mi.getBarycoord(gh,Hr,Gr,Vr,d),n&&(h.uv=Mi.getInterpolatedAttribute(n,o,l,c,d,new vt)),r&&(h.uv1=Mi.getInterpolatedAttribute(r,o,l,c,d,new vt)),a&&(h.normal=Mi.getInterpolatedAttribute(a,o,l,c,d,new R),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new R,materialIndex:0};Mi.getNormal(Hr,Gr,Vr,u.normal),h.face=u,h.barycoord=d}return h}var Xs=class extends Ve{constructor(t=null,e=1,i=1,n,r,a,o,l,c=Ae,h=Ae,d,u){super(null,a,o,l,c,h,n,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var qs=class extends He{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Yn=new Zt,xh=new Zt,Yr=[],yh=new Ai,wf=new Zt,Ts=new wt,As=new Ri,as=class extends wt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new qs(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,wf)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ai),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Yn),yh.copy(t.boundingBox).applyMatrix4(Yn),this.boundingBox.union(yh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ri),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Yn),As.copy(t.boundingSphere).applyMatrix4(Yn),this.boundingSphere.union(As)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(t,e){let i=this.matrixWorld,n=this.count;if(Ts.geometry=this.geometry,Ts.material=this.material,Ts.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),As.copy(this.boundingSphere),As.applyMatrix4(i),t.ray.intersectsSphere(As)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,Yn),xh.multiplyMatrices(i,Yn),Ts.matrixWorld=xh,Ts.raycast(t,Yr);for(let a=0,o=Yr.length;a<o;a++){let l=Yr[a];l.instanceId=r,l.object=this,e.push(l)}Yr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new qs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new Xs(new Float32Array(n*this.count),n,this.count,ja,hi));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=n*t;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},bn=new Ri,Ef=new vt(.5,.5),$r=new R,ln=class{constructor(t=new Qe,e=new Qe,i=new Qe,n=new Qe,r=new Qe,a=new Qe){this.planes=[t,e,i,n,r,a]}set(t,e,i,n,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=oi,i=!1){let n=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],S=r[12],E=r[13],b=r[14],A=r[15];if(n[0].setComponents(c-a,f-h,p-g,A-S).normalize(),n[1].setComponents(c+a,f+h,p+g,A+S).normalize(),n[2].setComponents(c+o,f+d,p+_,A+E).normalize(),n[3].setComponents(c-o,f-d,p-_,A-E).normalize(),i)n[4].setComponents(l,u,m,b).normalize(),n[5].setComponents(c-l,f-u,p-m,A-b).normalize();else if(n[4].setComponents(c-l,f-u,p-m,A-b).normalize(),e===oi)n[5].setComponents(c+l,f+u,p+m,A+b).normalize();else if(e===ts)n[5].setComponents(l,u,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),bn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),bn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(bn)}intersectsSprite(t){bn.center.set(0,0,0);let e=Ef.distanceTo(t.center);return bn.radius=.7071067811865476+e,bn.applyMatrix4(t.matrixWorld),this.intersectsSphere(bn)}intersectsSphere(t){let e=this.planes,i=t.center,n=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let n=e[i];if($r.x=n.normal.x>0?t.max.x:t.min.x,$r.y=n.normal.y>0?t.max.y:t.min.y,$r.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint($r)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},_h=new Zt,ba=class s{constructor(){this.coordinateSystem=oi,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,i=this._frustums;for(let n=0;n<e.length;n++){let r=e[n];_h.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[n]===void 0&&(i[n]=new ln),i[n].setFromProjectionMatrix(_h,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,i=t._frustums;for(let n=0;n<t._count;n++)e[n]===void 0&&(e[n]=new ln),e[n].copy(i[n]);return this._count=t._count,this}clone(){return new s().copy(this)}};var cn=class extends mi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Sa=new R,Ma=new R,vh=new Zt,Rs=new Mn,Zr=new Ri,bl=new R,bh=new R,wa=class extends ue{constructor(t=new de,e=new cn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let n=1,r=e.count;n<r;n++)Sa.fromBufferAttribute(e,n-1),Ma.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=Sa.distanceTo(Ma);t.setAttribute("lineDistance",new Jt(i,1))}else Ct("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Zr.copy(i.boundingSphere),Zr.applyMatrix4(n),Zr.radius+=r,t.ray.intersectsSphere(Zr)===!1)return;vh.copy(n).invert(),Rs.copy(t.ray).applyMatrix4(vh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){let p=h.getX(_),S=h.getX(_+1),E=Jr(this,t,Rs,l,p,S,_);E&&e.push(E)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(f),p=Jr(this,t,Rs,l,_,m,g-1);p&&e.push(p)}}else{let f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){let p=Jr(this,t,Rs,l,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){let _=Jr(this,t,Rs,l,g-1,f,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Jr(s,t,e,i,n,r,a){let o=s.geometry.attributes.position;if(Sa.fromBufferAttribute(o,n),Ma.fromBufferAttribute(o,r),e.distanceSqToSegment(Sa,Ma,bl,bh)>i)return;bl.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(bl);if(!(c<t.near||c>t.far))return{distance:c,point:bh.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Sh=new R,Mh=new R,wn=class extends wa{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let n=0,r=e.count;n<r;n+=2)Sh.fromBufferAttribute(e,n),Mh.fromBufferAttribute(e,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Sh.distanceTo(Mh);t.setAttribute("lineDistance",new Jt(i,1))}else Ct("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var os=class extends mi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},wh=new Zt,Il=new Mn,Kr=new Ri,Qr=new R,Ys=class extends ue{constructor(t=new de,e=new os){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Kr.copy(i.boundingSphere),Kr.applyMatrix4(n),Kr.radius+=r,t.ray.intersectsSphere(Kr)===!1)return;wh.copy(n).invert(),Il.copy(t.ray).applyMatrix4(wh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=u,_=f;g<_;g++){let m=c.getX(g);Qr.fromBufferAttribute(d,m),Eh(Qr,m,l,n,t,e,this)}}else{let u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,_=f;g<_;g++)Qr.fromBufferAttribute(d,g),Eh(Qr,g,l,n,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Eh(s,t,e,i,n,r,a){let o=Il.distanceSqToPoint(s);if(o<e){let l=new R;Il.closestPointToPoint(s,l),l.applyMatrix4(i);let c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var $s=class extends Ve{constructor(t=[],e=Cn,i,n,r,a,o,l,c,h){super(t,e,i,n,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Xi=class extends Ve{constructor(t,e,i,n,r,a,o,l,c){super(t,e,i,n,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var qi=class extends Ve{constructor(t,e,i=gi,n,r,a,o=Ae,l=Ae,c,h=Vi,d=1){if(h!==Vi&&h!==Qi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,n,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new is(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Zs=class extends qi{constructor(t,e=gi,i=Cn,n,r,a=Ae,o=Ae,l,c=Vi){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,i,n,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Js=class extends Ve{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},fe=class s extends de{constructor(t=1,e=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};let o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,n,a,2),g("x","z","y",1,-1,t,i,-e,n,a,3),g("x","y","z",1,-1,t,e,i,n,r,4),g("x","y","z",-1,-1,t,e,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new Jt(c,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(d,2));function g(_,m,p,S,E,b,A,T,x,M,I){let C=b/x,N=A/M,F=b/2,z=A/2,L=T/2,V=x+1,q=M+1,G=0,et=0,X=new R;for(let Q=0;Q<q;Q++){let j=Q*N-z;for(let Et=0;Et<V;Et++){let Bt=Et*C-F;X[_]=Bt*S,X[m]=j*E,X[p]=L,c.push(X.x,X.y,X.z),X[_]=0,X[m]=0,X[p]=T>0?1:-1,h.push(X.x,X.y,X.z),d.push(Et/x),d.push(1-Q/M),G+=1}}for(let Q=0;Q<M;Q++)for(let j=0;j<x;j++){let Et=u+j+V*Q,Bt=u+j+V*(Q+1),Z=u+(j+1)+V*(Q+1),gt=u+(j+1)+V*Q;l.push(Et,Bt,gt),l.push(Bt,Z,gt),et+=6}o.addGroup(f,et,I),f+=et,u+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Yi=class s extends de{constructor(t=1,e=1,i=4,n=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:i,radialSegments:n,heightSegments:r},e=Math.max(0,e),i=Math.max(1,Math.floor(i)),n=Math.max(3,Math.floor(n)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=e/2,d=Math.PI/2*t,u=e,f=2*d+u,g=i*2+r,_=n+1,m=new R,p=new R;for(let S=0;S<=g;S++){let E=0,b=0,A=0,T=0;if(S<=i){let I=S/i,C=I*Math.PI/2;b=-h-t*Math.cos(C),A=t*Math.sin(C),T=-t*Math.cos(C),E=I*d}else if(S<=i+r){let I=(S-i)/r;b=-h+I*e,A=t,T=0,E=d+I*u}else{let I=(S-i-r)/i,C=I*Math.PI/2;b=h+t*Math.sin(C),A=t*Math.cos(C),T=t*Math.sin(C),E=d+u+I*d}let x=Math.max(0,Math.min(1,E/f)),M=0;S===0?M=.5/n:S===g&&(M=-.5/n);for(let I=0;I<=n;I++){let C=I/n,N=C*Math.PI*2,F=Math.sin(N),z=Math.cos(N);p.x=-A*z,p.y=b,p.z=A*F,o.push(p.x,p.y,p.z),m.set(-A*z,T,A*F),m.normalize(),l.push(m.x,m.y,m.z),c.push(C+M,x)}if(S>0){let I=(S-1)*_;for(let C=0;C<n;C++){let N=I+C,F=I+C+1,z=S*_+C,L=S*_+C+1;a.push(N,F,z),a.push(F,L,z)}}}this.setIndex(a),this.setAttribute("position",new Jt(o,3)),this.setAttribute("normal",new Jt(l,3)),this.setAttribute("uv",new Jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},En=class s extends de{constructor(t=1,e=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:n},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new R,h=new vt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let f=i+d/e*n;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Jt(a,3)),this.setAttribute("normal",new Jt(o,3)),this.setAttribute("uv",new Jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.segments,t.thetaStart,t.thetaLength)}},$i=class s extends de{constructor(t=1,e=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;n=Math.floor(n),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,_=[],m=i/2,p=0;S(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Jt(d,3)),this.setAttribute("normal",new Jt(u,3)),this.setAttribute("uv",new Jt(f,2));function S(){let b=new R,A=new R,T=0,x=(e-t)/i;for(let M=0;M<=r;M++){let I=[],C=M/r,N=C*(e-t)+t;for(let F=0;F<=n;F++){let z=F/n,L=z*l+o,V=Math.sin(L),q=Math.cos(L);A.x=N*V,A.y=-C*i+m,A.z=N*q,d.push(A.x,A.y,A.z),b.set(V,x,q).normalize(),u.push(b.x,b.y,b.z),f.push(z,1-C),I.push(g++)}_.push(I)}for(let M=0;M<n;M++)for(let I=0;I<r;I++){let C=_[I][M],N=_[I+1][M],F=_[I+1][M+1],z=_[I][M+1];(t>0||I!==0)&&(h.push(C,N,z),T+=3),(e>0||I!==r-1)&&(h.push(N,F,z),T+=3)}c.addGroup(p,T,0),p+=T}function E(b){let A=g,T=new vt,x=new R,M=0,I=b===!0?t:e,C=b===!0?1:-1;for(let F=1;F<=n;F++)d.push(0,m*C,0),u.push(0,C,0),f.push(.5,.5),g++;let N=g;for(let F=0;F<=n;F++){let L=F/n*l+o,V=Math.cos(L),q=Math.sin(L);x.x=I*q,x.y=m*C,x.z=I*V,d.push(x.x,x.y,x.z),u.push(0,C,0),T.x=V*.5+.5,T.y=q*.5*C+.5,f.push(T.x,T.y),g++}for(let F=0;F<n;F++){let z=A+F,L=N+F;b===!0?h.push(L,L+1,z):h.push(L+1,L,z),M+=3}c.addGroup(p,M,b===!0?1:2),p+=M}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ks=class s extends $i{constructor(t=1,e=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var jr=new R,ta=new R,Sl=new R,ea=new Mi,ls=class extends de{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let n=Math.pow(10,4),r=Math.cos(Kn*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u=new Map,f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:_,b:m,c:p}=ea;if(_.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),ea.getNormal(Sl),d[0]=`${Math.round(_.x*n)},${Math.round(_.y*n)},${Math.round(_.z*n)}`,d[1]=`${Math.round(m.x*n)},${Math.round(m.y*n)},${Math.round(m.z*n)}`,d[2]=`${Math.round(p.x*n)},${Math.round(p.y*n)},${Math.round(p.z*n)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let S=0;S<3;S++){let E=(S+1)%3,b=d[S],A=d[E],T=ea[h[S]],x=ea[h[E]],M=`${b}_${A}`,I=`${A}_${b}`,C=u.get(I);C?(Sl.dot(C.normal)<=r&&(f.push(T.x,T.y,T.z),f.push(x.x,x.y,x.z)),u.set(I,null)):u.has(M)||u.set(M,{index0:c[S],index1:c[E],normal:Sl.clone()})}}for(let g of u.values())if(g){let{index0:_,index1:m}=g;jr.fromBufferAttribute(o,_),ta.fromBufferAttribute(o,m),f.push(jr.x,jr.y,jr.z),f.push(ta.x,ta.y,ta.z)}this.setAttribute("position",new Jt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},li=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ct("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,n=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(n),e.push(r),n=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),n=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),c=i[n]-a,c<0)o=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===a)return n/(r-1);let h=i[n],u=i[n+1]-h,f=(a-h)/u;return(n+f)/(r-1)}getTangent(t,e){let n=t-1e-4,r=t+1e-4;n<0&&(n=0),r>1&&(r=1);let a=this.getPoint(n),o=this.getPoint(r),l=e||(a.isVector2?new vt:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new R,n=[],r=[],a=[],o=new R,l=new Zt;for(let f=0;f<=t;f++){let g=f/t;n[f]=this.getTangentAt(g,new R)}r[0]=new R,a[0]=new R;let c=Number.MAX_VALUE,h=Math.abs(n[0].x),d=Math.abs(n[0].y),u=Math.abs(n[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],o),a[0].crossVectors(n[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(n[f-1],n[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Wt(n[f-1].dot(n[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(n[f],r[f])}if(e===!0){let f=Math.acos(Wt(r[0].dot(r[t]),-1,1));f/=t,n[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(n[g],f*g)),a[g].crossVectors(n[g],r[g])}return{tangents:n,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},Qs=class extends li{constructor(t=0,e=0,i=1,n=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new vt){let i=e,n=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(a?r=0:r=n),this.aClockwise===!0&&!a&&(r===n?r=-n:r=r-n);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ea=class extends Qs{constructor(t,e,i,n,r,a){super(t,e,i,i,n,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function uc(){let s=0,t=0,e=0,i=0;function n(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){n(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,n(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return s+t*r+e*a+i*o}}}var Th=new R,Ah=new R,Ml=new uc,wl=new uc,El=new uc,Ci=class extends li{constructor(t=[],e=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=n}getPoint(t,e=new R){let i=e,n=this.points,r=n.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=n[(o-1)%r]:(Ah.subVectors(n[0],n[1]).add(n[0]),c=Ah);let d=n[o%r],u=n[(o+1)%r];if(this.closed||o+2<r?h=n[(o+2)%r]:(Th.subVectors(n[r-1],n[r-2]).add(n[r-1]),h=Th),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ml.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,_,m),wl.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,_,m),El.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Ml.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),wl.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),El.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return i.set(Ml.calc(l),wl.calc(l),El.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(n.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let n=this.points[e];t.points.push(n.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(new R().fromArray(n))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Rh(s,t,e,i,n){let r=(i-t)*.5,a=(n-e)*.5,o=s*s,l=s*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*s+e}function Tf(s,t){let e=1-s;return e*e*t}function Af(s,t){return 2*(1-s)*s*t}function Rf(s,t){return s*s*t}function Is(s,t,e,i){return Tf(s,t)+Af(s,e)+Rf(s,i)}function Cf(s,t){let e=1-s;return e*e*e*t}function Pf(s,t){let e=1-s;return 3*e*e*s*t}function If(s,t){return 3*(1-s)*s*s*t}function Lf(s,t){return s*s*s*t}function Ls(s,t,e,i,n){return Cf(s,t)+Pf(s,e)+If(s,i)+Lf(s,n)}var Ta=class extends li{constructor(t=new vt,e=new vt,i=new vt,n=new vt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new vt){let i=e,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Ls(t,n.x,r.x,a.x,o.x),Ls(t,n.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Aa=class extends li{constructor(t=new R,e=new R,i=new R,n=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new R){let i=e,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Ls(t,n.x,r.x,a.x,o.x),Ls(t,n.y,r.y,a.y,o.y),Ls(t,n.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ra=class extends li{constructor(t=new vt,e=new vt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new vt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ca=class extends li{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Pa=class extends li{constructor(t=new vt,e=new vt,i=new vt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new vt){let i=e,n=this.v0,r=this.v1,a=this.v2;return i.set(Is(t,n.x,r.x,a.x),Is(t,n.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},js=class extends li{constructor(t=new R,e=new R,i=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new R){let i=e,n=this.v0,r=this.v1,a=this.v2;return i.set(Is(t,n.x,r.x,a.x),Is(t,n.y,r.y,a.y),Is(t,n.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ia=class extends li{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){let i=e,n=this.points,r=(n.length-1)*t,a=Math.floor(r),o=r-a,l=n[a===0?a:a-1],c=n[a],h=n[a>n.length-2?n.length-1:a+1],d=n[a>n.length-3?n.length-1:a+2];return i.set(Rh(o,l.x,c.x,h.x,d.x),Rh(o,l.y,c.y,h.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(n.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let n=this.points[e];t.points.push(n.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(new vt().fromArray(n))}return this}},Df=Object.freeze({__proto__:null,ArcCurve:Ea,CatmullRomCurve3:Ci,CubicBezierCurve:Ta,CubicBezierCurve3:Aa,EllipseCurve:Qs,LineCurve:Ra,LineCurve3:Ca,QuadraticBezierCurve:Pa,QuadraticBezierCurve3:js,SplineCurve:Ia});var Pi=class s extends de{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,d=t/o,u=e/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let S=p*u-a;for(let E=0;E<c;E++){let b=E*d-r;g.push(b,-S,0),_.push(0,0,1),m.push(E/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<o;S++){let E=S+c*p,b=S+c*(p+1),A=S+1+c*(p+1),T=S+1+c*p;f.push(E,b,T),f.push(b,A,T)}this.setIndex(f),this.setAttribute("position",new Jt(g,3)),this.setAttribute("normal",new Jt(_,3)),this.setAttribute("uv",new Jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var ci=class s extends de{constructor(t=1,e=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new R,u=new R,f=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){let S=[],E=p/i,b=a+E*o,A=t*Math.cos(b),T=Math.sqrt(t*t-A*A),x=0;p===0&&a===0?x=.5/e:p===i&&l===Math.PI&&(x=-.5/e);for(let M=0;M<=e;M++){let I=M/e,C=n+I*r;d.x=-T*Math.cos(C),d.y=A,d.z=T*Math.sin(C),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(I+x,1-E),S.push(c++)}h.push(S)}for(let p=0;p<i;p++)for(let S=0;S<e;S++){let E=h[p][S+1],b=h[p][S],A=h[p+1][S],T=h[p+1][S+1];(p!==0||a>0)&&f.push(E,b,T),(p!==i-1||l<Math.PI)&&f.push(b,A,T)}this.setIndex(f),this.setAttribute("position",new Jt(g,3)),this.setAttribute("normal",new Jt(_,3)),this.setAttribute("uv",new Jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var We=class s extends de{constructor(t=1,e=.4,i=12,n=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:n,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),n=Math.floor(n);let l=[],c=[],h=[],d=[],u=new R,f=new R,g=new R;for(let _=0;_<=i;_++){let m=a+_/i*o;for(let p=0;p<=n;p++){let S=p/n*r;f.x=(t+e*Math.cos(m))*Math.cos(S),f.y=(t+e*Math.cos(m))*Math.sin(S),f.z=e*Math.sin(m),c.push(f.x,f.y,f.z),u.x=t*Math.cos(S),u.y=t*Math.sin(S),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(p/n),d.push(_/i)}}for(let _=1;_<=i;_++)for(let m=1;m<=n;m++){let p=(n+1)*_+m-1,S=(n+1)*(_-1)+m-1,E=(n+1)*(_-1)+m,b=(n+1)*_+m;l.push(p,S,b),l.push(S,E,b)}this.setIndex(l),this.setAttribute("position",new Jt(c,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};var Zi=class s extends de{constructor(t=new js(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),e=64,i=1,n=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:n,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new R,l=new R,c=new vt,h=new R,d=[],u=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Jt(d,3)),this.setAttribute("normal",new Jt(u,3)),this.setAttribute("uv",new Jt(f,2));function _(){for(let E=0;E<e;E++)m(E);m(r===!1?e:0),S(),p()}function m(E){h=t.getPointAt(E/e,h);let b=a.normals[E],A=a.binormals[E];for(let T=0;T<=n;T++){let x=T/n*Math.PI*2,M=Math.sin(x),I=-Math.cos(x);l.x=I*b.x+M*A.x,l.y=I*b.y+M*A.y,l.z=I*b.z+M*A.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,d.push(o.x,o.y,o.z)}}function p(){for(let E=1;E<=e;E++)for(let b=1;b<=n;b++){let A=(n+1)*(E-1)+(b-1),T=(n+1)*E+(b-1),x=(n+1)*E+b,M=(n+1)*(E-1)+b;g.push(A,T,M),g.push(T,x,M)}}function S(){for(let E=0;E<=e;E++)for(let b=0;b<=n;b++)c.x=E/e,c.y=b/n,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new s(new Df[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function In(s){let t={};for(let e in s){t[e]={};for(let i in s[e]){let n=s[e][i];if(Ch(n))n.isRenderTargetTexture?(Ct("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone();else if(Array.isArray(n))if(Ch(n[0])){let r=[];for(let a=0,o=n.length;a<o;a++)r[a]=n[a].clone();t[e][i]=r}else t[e][i]=n.slice();else t[e][i]=n}}return t}function Fe(s){let t={};for(let e=0;e<s.length;e++){let i=In(s[e]);for(let n in i)t[n]=i[n]}return t}function Ch(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Nf(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function dc(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}var Su={clone:In,merge:Fe},Uf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ff=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ii=class extends mi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uf,this.fragmentShader=Ff,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=In(t.uniforms),this.uniformsGroups=Nf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let n in this.uniforms){let a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let n=t.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=e[n.value]||null;break;case"c":this.uniforms[i].value=new Nt().setHex(n.value);break;case"v2":this.uniforms[i].value=new vt().fromArray(n.value);break;case"v3":this.uniforms[i].value=new R().fromArray(n.value);break;case"v4":this.uniforms[i].value=new le().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Ut().fromArray(n.value);break;case"m4":this.uniforms[i].value=new Zt().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},La=class extends Ii{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},tr=class extends mi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=No,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Da=class extends mi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Na=class extends mi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function $n(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function ia(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var hn=class{constructor(t,e,i,n){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,n=e[i],r=e[i-1];i:{t:{let a;e:{n:if(!(t<n)){for(let o=i+2;;){if(n===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=n,n=e[++i],t<n)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break i}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(n=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,t,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=t*n;for(let a=0;a!==n;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ua=class extends hn{constructor(t,e,i,n){super(t,e,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Rl,endingEnd:Rl}}intervalChanged_(t,e,i){let n=this.parameterPositions,r=t-2,a=t+1,o=n[r],l=n[a];if(o===void 0)switch(this.getSettings_().endingStart){case Cl:r=t,o=2*e-i;break;case Pl:r=n.length-2,o=e+n[r]-n[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Cl:a=t,l=2*i-e;break;case Pl:a=1,l=i+n[1]-n[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(i-e)/(n-e),_=g*g,m=_*g,p=-u*m+2*u*_-u*g,S=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*g+1,E=(-1-f)*m+(1.5+f)*_+.5*g,b=f*m-f*_;for(let A=0;A!==o;++A)r[A]=p*a[h+A]+S*a[c+A]+E*a[l+A]+b*a[d+A];return r}},Fa=class extends hn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(n-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},Oa=class extends hn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t){return this.copySampleValue_(t-1)}},Ba=class extends hn{interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(i-e)/(n-e),_=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*_+a[l+m]*g;return r}let u=o*2,f=t-1;for(let g=0;g!==o;++g){let _=a[c+g],m=a[l+g],p=f*u+g*2,S=d[p],E=d[p+1],b=t*u+g*2,A=h[b],T=h[b+1],x=Bf(i,e,S,A,n);r[g]=Mu(x,_,E,T,m)}return r}};function Mu(s,t,e,i,n){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*i+s*s*s*n}function Of(s,t,e,i,n){let r=1-s;return 3*r*r*(e-t)+6*r*s*(i-e)+3*s*s*(n-i)}function Bf(s,t,e,i,n){let r=(s-t)/(n-t);for(let a=0;a<8;a++){let o=Mu(r,t,e,i,n)-s;if(Math.abs(o)<1e-10)break;let l=Of(r,t,e,i,n);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var ti=class{constructor(t,e,i,n){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=$n(e,this.TimeBufferType),this.values=$n(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:$n(t.times,Array),values:$n(t.values,Array)};let n=t.getInterpolation();n!==t.DefaultInterpolation&&(i.interpolation=n),ia(t.settings)&&(i.settings={inTangents:$n(t.settings.inTangents,Array),outTangents:$n(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Oa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Fa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ua(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ba(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ds:e=this.InterpolantFactoryMethodDiscrete;break;case ga:e=this.InterpolantFactoryMethodLinear;break;case ra:e=this.InterpolantFactoryMethodSmooth;break;case Al:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ct("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ds;case this.InterpolantFactoryMethodLinear:return ga;case this.InterpolantFactoryMethodSmooth:return ra;case this.InterpolantFactoryMethodBezier:return Al}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]+=t;ia(this.settings)&&(Ph(this.settings.inTangents,t),Ph(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]*=t;ia(this.settings)&&(Ih(this.settings.inTangents,t),Ih(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,n=i.length,r=0,a=n-1;for(;r!==n&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==n){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Dt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,n=this.values,r=i.length;r===0&&(Dt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Dt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Dt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(n!==void 0&&Wd(n))for(let o=0,l=n.length;o!==l;++o){let c=n[o];if(isNaN(c)){Dt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===ra,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(n)l=!0;else{let d=o*i,u=d-i,f=d+i;for(let g=0;g!==i;++g){let _=e[d+g];if(_!==e[u+g]||_!==e[f+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*i,u=a*i;for(let f=0;f!==i;++f)e[u+f]=e[d+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,n=new i(this.name,t,e);return n.createInterpolant=this.createInterpolant,ia(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Ph(s,t){for(let e=0,i=s.length;e!==i;e+=2)s[e]+=t}function Ih(s,t){for(let e=0,i=s.length;e!==i;e+=2)s[e]*=t}ti.prototype.ValueTypeName="";ti.prototype.TimeBufferType=Float32Array;ti.prototype.ValueBufferType=Float32Array;ti.prototype.DefaultInterpolation=ga;var un=class extends ti{constructor(t,e,i){super(t,e,i)}};un.prototype.ValueTypeName="bool";un.prototype.ValueBufferType=Array;un.prototype.DefaultInterpolation=Ds;un.prototype.InterpolantFactoryMethodLinear=void 0;un.prototype.InterpolantFactoryMethodSmooth=void 0;var ka=class extends ti{constructor(t,e,i,n){super(t,e,i,n)}};ka.prototype.ValueTypeName="color";var za=class extends ti{constructor(t,e,i,n){super(t,e,i,n)}};za.prototype.ValueTypeName="number";var Ha=class extends hn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(n-e),c=t*o;for(let h=c+o;c!==h;c+=4)Ti.slerpFlat(r,0,a,c-o,a,c,l);return r}},er=class extends ti{constructor(t,e,i,n){super(t,e,i,n)}InterpolantFactoryMethodLinear(t){return new Ha(this.times,this.values,this.getValueSize(),t)}};er.prototype.ValueTypeName="quaternion";er.prototype.InterpolantFactoryMethodSmooth=void 0;var dn=class extends ti{constructor(t,e,i){super(t,e,i)}};dn.prototype.ValueTypeName="string";dn.prototype.ValueBufferType=Array;dn.prototype.DefaultInterpolation=Ds;dn.prototype.InterpolantFactoryMethodLinear=void 0;dn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ga=class extends ti{constructor(t,e,i,n){super(t,e,i,n)}};Ga.prototype.ValueTypeName="vector";var Va=class{constructor(t,e,i){let n=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&n.onStart!==void 0&&n.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},wu=new Va,Wa=class{constructor(t){this.manager=t!==void 0?t:wu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(n,r){i.load(t,n,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};Wa.DEFAULT_MATERIAL_NAME="__DEFAULT";var cs=class extends ue{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},ir=class extends cs{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ue.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Tl=new Zt,Lh=new R,Dh=new R,nr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new vt(512,512),this.mapType=Ze,this.map=null,this.mapPass=null,this.matrix=new Zt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ln,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Lh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Lh),Dh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Dh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,n){Tl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(Tl,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=n?n.z/r.x:1,o=n?n.w/r.y:1,l=n?n.x/r.x:0,c=n?n.y/r.y:0;t.coordinateSystem===ts||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Tl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},na=new R,sa=new Ti,Si=new R,sr=class extends ue{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Zt,this.projectionMatrix=new Zt,this.projectionMatrixInverse=new Zt,this.coordinateSystem=oi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(na,sa,Si),Si.x===1&&Si.y===1&&Si.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(na,sa,Si.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(na,sa,Si),Si.x===1&&Si.y===1&&Si.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(na,sa,Si.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},on=new R,Nh=new vt,Uh=new vt,Ue=class extends sr{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Sn*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Kn*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Sn*2*Math.atan(Math.tan(Kn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){on.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(on.x,on.y).multiplyScalar(-t/on.z),on.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(on.x,on.y).multiplyScalar(-t/on.z)}getViewSize(t,e){return this.getViewBounds(t,Nh,Uh),e.subVectors(Uh,Nh)}setViewOffset(t,e,i,n,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Kn*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,r=-.5*n,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,e-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ll=class extends nr{constructor(){super(new Ue(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,i=Sn*2*t.angle*this.focus,n=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(i!==e.fov||n!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=n,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){let t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}},rr=class extends cs{constructor(t,e,i=0,n=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ue.DEFAULT_UP),this.updateMatrix(),this.target=new ue,this.distance=i,this.angle=n,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Ll}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}};var ar=class extends sr{constructor(t=-1,e=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-t,a=i+t,o=n+e,l=n-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Dl=class extends nr{constructor(){super(new ar(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},hs=class extends cs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ue.DEFAULT_UP),this.updateMatrix(),this.target=new ue,this.shadow=new Dl}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Zn=-90,Jn=1,us=class extends ue{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new Ue(Zn,Jn,t,e);n.layers=this.layers,this.add(n);let r=new Ue(Zn,Jn,t,e);r.layers=this.layers,this.add(r);let a=new Ue(Zn,Jn,t,e);a.layers=this.layers,this.add(a);let o=new Ue(Zn,Jn,t,e);o.layers=this.layers,this.add(o);let l=new Ue(Zn,Jn,t,e);l.layers=this.layers,this.add(l);let c=new Ue(Zn,Jn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,n,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===oi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ts)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.mipmapsAutoUpdate=_,t.setRenderTarget(i,5,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Xa=class extends Ue{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var fc="\\[\\]\\.:\\/",kf=new RegExp("["+fc+"]","g"),pc="[^"+fc+"]",zf="[^"+fc.replace("\\.","")+"]",Hf=/((?:WC+[\/:])*)/.source.replace("WC",pc),Gf=/(WCOD+)?/.source.replace("WCOD",zf),Vf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pc),Wf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pc),Xf=new RegExp("^"+Hf+Gf+Vf+Wf+"$"),qf=["material","materials","bones","map"],Nl=class{constructor(t,e,i){let n=i||re.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,n)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},re=class s{constructor(t,e,i){this.path=e,this.parsedPath=i||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,i):new s(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(kf,"")}static parseTrackName(t){let e=Xf.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let r=i.nodeName.substring(n+1);qf.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},n=i(t.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)t[e++]=i[n]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,n=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ct("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Dt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Dt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Dt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Dt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Dt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Dt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Dt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[n];if(a===void 0){let c=e.nodeName;Dt("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!t.geometry){Dt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Dt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};re.Composite=Nl;re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};re.prototype.GetterByBindingType=[re.prototype._getValue_direct,re.prototype._getValue_array,re.prototype._getValue_arrayElement,re.prototype._getValue_toArray];re.prototype.SetterByBindingTypeAndVersioning=[[re.prototype._setValue_direct,re.prototype._setValue_direct_setNeedsUpdate,re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[re.prototype._setValue_array,re.prototype._setValue_array_setNeedsUpdate,re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[re.prototype._setValue_arrayElement,re.prototype._setValue_arrayElement_setNeedsUpdate,re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[re.prototype._setValue_fromArray,re.prototype._setValue_fromArray_setNeedsUpdate,re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Wx=new Float32Array(1);var Fh=new Zt,or=class{constructor(t,e,i=0,n=1/0){this.ray=new Mn(t,e),this.near=i,this.far=n,this.camera=null,this.layers=new ns,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Dt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Fh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Fh),this}intersectObject(t,e=!0,i=[]){return Ul(t,this,i,e),i.sort(Oh),i}intersectObjects(t,e=!0,i=[]){for(let n=0,r=t.length;n<r;n++)Ul(t[n],this,i,e);return i.sort(Oh),i}};function Oh(s,t){return s.distance-t.distance}function Ul(s,t,e,i){let n=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(n=!1),n===!0&&i===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)Ul(r[a],t,e,!0)}}var vc=class vc{constructor(t,e,i,n){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,n){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=n,this}};vc.prototype.isMatrix2=!0;var Fl=vc;var lr=class extends wn{constructor(t=10,e=10,i=4473924,n=8947848){i=new Nt(i),n=new Nt(n);let r=e/2,a=t/e,o=t/2,l=[],c=[];for(let u=0,f=0,g=-o;u<=e;u++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);let _=u===r?i:n;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}let h=new de;h.setAttribute("position",new Jt(l,3)),h.setAttribute("color",new Jt(c,3));let d=new cn({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function mc(s,t,e,i){let n=Yf(i);switch(e){case tc:return s*t;case ja:return s*t/n.components*n.byteLength;case to:return s*t/n.components*n.byteLength;case fn:return s*t*2/n.components*n.byteLength;case eo:return s*t*2/n.components*n.byteLength;case ec:return s*t*3/n.components*n.byteLength;case yi:return s*t*4/n.components*n.byteLength;case io:return s*t*4/n.components*n.byteLength;case dr:case fr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case pr:case mr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case so:case ao:return Math.max(s,16)*Math.max(t,8)/4;case no:case ro:return Math.max(s,8)*Math.max(t,8)/2;case oo:case lo:case ho:case uo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case co:case gr:case fo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case po:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case mo:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case go:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case xo:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case yo:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case _o:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case vo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case bo:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case So:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Mo:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case wo:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Eo:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case To:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Ao:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Ro:case Co:case Po:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Io:case Lo:return Math.ceil(s/4)*Math.ceil(t/4)*8;case xr:case Do:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Yf(s){switch(s){case Ze:case Jl:return{byteLength:1,components:1};case ps:case Kl:case xi:return{byteLength:2,components:1};case Ka:case Qa:return{byteLength:2,components:4};case gi:case Ja:case hi:return{byteLength:4,components:1};case Ql:case jl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ct("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function qu(){let s=null,t=!1,e=null,i=null;function n(r,a){i=s.requestAnimationFrame(n),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Zf(s){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:r,update:a}}var Jf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kf=`#ifdef USE_ALPHAHASH
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
#endif`,Qf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ep=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ip=`#ifdef USE_AOMAP
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
#endif`,np=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sp=`#ifdef USE_BATCHING
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
#endif`,rp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ap=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,op=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cp=`#ifdef USE_IRIDESCENCE
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
#endif`,hp=`#ifdef USE_BUMPMAP
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
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,gp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,xp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,_p=`#define PI 3.141592653589793
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
} // validated`,vp=`vec3 transformedNormal = objectNormal;
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
#endif`,bp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ep="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ap=`#ifdef USE_ENVMAP
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
#endif`,Rp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Cp=`#ifdef USE_ENVMAP
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
#endif`,Pp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ip=`#ifdef USE_ENVMAP
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
#endif`,Lp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Np=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Up=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fp=`#ifdef USE_GRADIENTMAP
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
}`,Op=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Hp=`#ifdef USE_ENVMAP
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
#endif`,Gp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qp=`PhysicalMaterial material;
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
#endif`,Yp=`uniform sampler2D dfgLUT;
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
}`,$p=`
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
#endif`,Zp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Jp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kp=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,Qp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,em=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,im=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,rm=`#if defined( USE_POINTS_UV )
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
#endif`,am=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,om=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cm=`#if defined( USE_MORPHCOLORS )
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
#endif`,hm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,um=`#ifdef USE_MORPHTARGETS
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
#endif`,dm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,pm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ym=`#ifdef USE_NORMALMAP
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
#endif`,_m=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Em=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Am=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Im=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Nm=`float getShadowMask() {
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
}`,Um=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fm=`#ifdef USE_SKINNING
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
#endif`,Om=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Bm=`#ifdef USE_SKINNING
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
#endif`,km=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vm=`#ifdef USE_TRANSMISSION
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
#endif`,Wm=`#ifdef USE_TRANSMISSION
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
#endif`,Xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ym=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$m=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Zm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jm=`uniform sampler2D t2D;
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
}`,Km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qm=`uniform float backgroundBlurriness;
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
}`,jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eg=`#include <common>
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
}`,ig=`#if DEPTH_PACKING == 3200
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
}`,ng=`#define DISTANCE
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
}`,sg=`#define DISTANCE
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
}`,rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ag=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`uniform float scale;
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
}`,lg=`uniform vec3 diffuse;
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
}`,cg=`#include <common>
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
}`,hg=`uniform vec3 diffuse;
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
}`,ug=`#define LAMBERT
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
}`,dg=`#define LAMBERT
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
}`,fg=`#define MATCAP
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
}`,pg=`#define MATCAP
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
}`,mg=`#define NORMAL
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
}`,gg=`#define NORMAL
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
}`,xg=`#define PHONG
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
}`,yg=`#define PHONG
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
}`,_g=`#define STANDARD
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
}`,vg=`#define STANDARD
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
}`,bg=`#define TOON
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
}`,Sg=`#define TOON
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
}`,Mg=`uniform float size;
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
}`,wg=`uniform vec3 diffuse;
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
}`,Eg=`#include <common>
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
}`,Tg=`uniform vec3 color;
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
}`,Ag=`uniform float rotation;
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
}`,Rg=`uniform vec3 diffuse;
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
}`,Vt={alphahash_fragment:Jf,alphahash_pars_fragment:Kf,alphamap_fragment:Qf,alphamap_pars_fragment:jf,alphatest_fragment:tp,alphatest_pars_fragment:ep,aomap_fragment:ip,aomap_pars_fragment:np,batching_pars_vertex:sp,batching_vertex:rp,begin_vertex:ap,beginnormal_vertex:op,bsdfs:lp,iridescence_fragment:cp,bumpmap_pars_fragment:hp,clipping_planes_fragment:up,clipping_planes_pars_fragment:dp,clipping_planes_pars_vertex:fp,clipping_planes_vertex:pp,color_fragment:mp,color_pars_fragment:gp,color_pars_vertex:xp,color_vertex:yp,common:_p,defaultnormal_vertex:vp,displacementmap_pars_vertex:bp,displacementmap_vertex:Sp,emissivemap_fragment:Mp,emissivemap_pars_fragment:wp,colorspace_fragment:Ep,colorspace_pars_fragment:Tp,envmap_fragment:Ap,envmap_common_pars_fragment:Rp,envmap_pars_fragment:Cp,envmap_pars_vertex:Pp,envmap_physical_pars_fragment:Hp,envmap_vertex:Ip,fog_vertex:Lp,fog_pars_vertex:Dp,fog_fragment:Np,fog_pars_fragment:Up,gradientmap_pars_fragment:Fp,lightmap_pars_fragment:Op,lights_lambert_fragment:Bp,lights_lambert_pars_fragment:kp,lights_pars_begin:zp,lights_toon_fragment:Gp,lights_toon_pars_fragment:Vp,lights_phong_fragment:Wp,lights_phong_pars_fragment:Xp,lights_physical_fragment:qp,lights_physical_pars_fragment:Yp,lights_fragment_begin:$p,lights_fragment_maps:Zp,lights_fragment_end:Jp,lightprobes_pars_fragment:Kp,logdepthbuf_fragment:Qp,logdepthbuf_pars_fragment:jp,logdepthbuf_pars_vertex:tm,logdepthbuf_vertex:em,map_fragment:im,map_pars_fragment:nm,map_particle_fragment:sm,map_particle_pars_fragment:rm,metalnessmap_fragment:am,metalnessmap_pars_fragment:om,morphinstance_vertex:lm,morphcolor_vertex:cm,morphnormal_vertex:hm,morphtarget_pars_vertex:um,morphtarget_vertex:dm,normal_fragment_begin:fm,normal_fragment_maps:pm,normal_pars_fragment:mm,normal_pars_vertex:gm,normal_vertex:xm,normalmap_pars_fragment:ym,clearcoat_normal_fragment_begin:_m,clearcoat_normal_fragment_maps:vm,clearcoat_pars_fragment:bm,iridescence_pars_fragment:Sm,opaque_fragment:Mm,packing:wm,premultiplied_alpha_fragment:Em,project_vertex:Tm,dithering_fragment:Am,dithering_pars_fragment:Rm,roughnessmap_fragment:Cm,roughnessmap_pars_fragment:Pm,shadowmap_pars_fragment:Im,shadowmap_pars_vertex:Lm,shadowmap_vertex:Dm,shadowmask_pars_fragment:Nm,skinbase_vertex:Um,skinning_pars_vertex:Fm,skinning_vertex:Om,skinnormal_vertex:Bm,specularmap_fragment:km,specularmap_pars_fragment:zm,tonemapping_fragment:Hm,tonemapping_pars_fragment:Gm,transmission_fragment:Vm,transmission_pars_fragment:Wm,uv_pars_fragment:Xm,uv_pars_vertex:qm,uv_vertex:Ym,worldpos_vertex:$m,background_vert:Zm,background_frag:Jm,backgroundCube_vert:Km,backgroundCube_frag:Qm,cube_vert:jm,cube_frag:tg,depth_vert:eg,depth_frag:ig,distance_vert:ng,distance_frag:sg,equirect_vert:rg,equirect_frag:ag,linedashed_vert:og,linedashed_frag:lg,meshbasic_vert:cg,meshbasic_frag:hg,meshlambert_vert:ug,meshlambert_frag:dg,meshmatcap_vert:fg,meshmatcap_frag:pg,meshnormal_vert:mg,meshnormal_frag:gg,meshphong_vert:xg,meshphong_frag:yg,meshphysical_vert:_g,meshphysical_frag:vg,meshtoon_vert:bg,meshtoon_frag:Sg,points_vert:Mg,points_frag:wg,shadow_vert:Eg,shadow_frag:Tg,sprite_vert:Ag,sprite_frag:Rg},mt={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},Ui={basic:{uniforms:Fe([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:Fe([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Nt(0)},envMapIntensity:{value:1}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:Fe([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:Fe([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:Fe([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:Fe([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:Fe([mt.points,mt.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:Fe([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:Fe([mt.common,mt.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:Fe([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:Fe([mt.sprite,mt.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distance:{uniforms:Fe([mt.common,mt.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distance_vert,fragmentShader:Vt.distance_frag},shadow:{uniforms:Fe([mt.lights,mt.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};Ui.physical={uniforms:Fe([Ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ut},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};var Fo={r:0,b:0,g:0},Cg=new Zt,Yu=new Ut;Yu.set(-1,0,0,0,1,0,0,0,1);function Pg(s,t,e,i,n,r){let a=new Nt(0),o=n===!0?0:1,l,c,h=null,d=0,u=null;function f(S){let E=S.isScene===!0?S.background:null;if(E&&E.isTexture){let b=S.backgroundBlurriness>0;E=t.get(E,b)}return E}function g(S){let E=!1,b=f(S);b===null?m(a,o):b&&b.isColor&&(m(b,1),E=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(S,E){let b=f(E);b&&b.isCubeTexture?(c===void 0&&(c=new wt(new fe(1,1,1),new Ii({name:"BackgroundCubeMaterial",uniforms:In(Ui.backgroundCube.uniforms),vertexShader:Ui.backgroundCube.vertexShader,fragmentShader:Ui.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Cg.makeRotationFromEuler(E.backgroundRotation)).transpose(),b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Yu),c.material.toneMapped=$t.getTransfer(b.colorSpace)!==jt,(h!==b||d!==b.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=b,d=b.version,u=s.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new wt(new Pi(2,2),new Ii({name:"BackgroundMaterial",uniforms:In(Ui.background.uniforms),vertexShader:Ui.background.vertexShader,fragmentShader:Ui.background.fragmentShader,side:Li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=$t.getTransfer(b.colorSpace)!==jt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||d!==b.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=b,d=b.version,u=s.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,E){S.getRGB(Fo,dc(s)),e.buffers.color.setClear(Fo.r,Fo.g,Fo.b,E,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,E=1){a.set(S),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:_,dispose:p}}function Ig(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=u(null),r=n,a=!1;function o(N,F,z,L,V){let q=!1,G=d(N,L,z,F);r!==G&&(r=G,c(r.object)),q=f(N,L,z,V),q&&g(N,L,z,V),V!==null&&t.update(V,s.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,b(N,F,z,L),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return s.createVertexArray()}function c(N){return s.bindVertexArray(N)}function h(N){return s.deleteVertexArray(N)}function d(N,F,z,L){let V=L.wireframe===!0,q=i[F.id];q===void 0&&(q={},i[F.id]=q);let G=N.isInstancedMesh===!0?N.id:0,et=q[G];et===void 0&&(et={},q[G]=et);let X=et[z.id];X===void 0&&(X={},et[z.id]=X);let Q=X[V];return Q===void 0&&(Q=u(l()),X[V]=Q),Q}function u(N){let F=[],z=[],L=[];for(let V=0;V<e;V++)F[V]=0,z[V]=0,L[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:z,attributeDivisors:L,object:N,attributes:{},index:null}}function f(N,F,z,L){let V=r.attributes,q=F.attributes,G=0,et=z.getAttributes();for(let X in et)if(et[X].location>=0){let j=V[X],Et=q[X];if(Et===void 0&&(X==="instanceMatrix"&&N.instanceMatrix&&(Et=N.instanceMatrix),X==="instanceColor"&&N.instanceColor&&(Et=N.instanceColor)),j===void 0||j.attribute!==Et||Et&&j.data!==Et.data)return!0;G++}return r.attributesNum!==G||r.index!==L}function g(N,F,z,L){let V={},q=F.attributes,G=0,et=z.getAttributes();for(let X in et)if(et[X].location>=0){let j=q[X];j===void 0&&(X==="instanceMatrix"&&N.instanceMatrix&&(j=N.instanceMatrix),X==="instanceColor"&&N.instanceColor&&(j=N.instanceColor));let Et={};Et.attribute=j,j&&j.data&&(Et.data=j.data),V[X]=Et,G++}r.attributes=V,r.attributesNum=G,r.index=L}function _(){let N=r.newAttributes;for(let F=0,z=N.length;F<z;F++)N[F]=0}function m(N){p(N,0)}function p(N,F){let z=r.newAttributes,L=r.enabledAttributes,V=r.attributeDivisors;z[N]=1,L[N]===0&&(s.enableVertexAttribArray(N),L[N]=1),V[N]!==F&&(s.vertexAttribDivisor(N,F),V[N]=F)}function S(){let N=r.newAttributes,F=r.enabledAttributes;for(let z=0,L=F.length;z<L;z++)F[z]!==N[z]&&(s.disableVertexAttribArray(z),F[z]=0)}function E(N,F,z,L,V,q,G){G===!0?s.vertexAttribIPointer(N,F,z,V,q):s.vertexAttribPointer(N,F,z,L,V,q)}function b(N,F,z,L){_();let V=L.attributes,q=z.getAttributes(),G=F.defaultAttributeValues;for(let et in q){let X=q[et];if(X.location>=0){let Q=V[et];if(Q===void 0&&(et==="instanceMatrix"&&N.instanceMatrix&&(Q=N.instanceMatrix),et==="instanceColor"&&N.instanceColor&&(Q=N.instanceColor)),Q!==void 0){let j=Q.normalized,Et=Q.itemSize,Bt=t.get(Q);if(Bt===void 0)continue;let Z=Bt.buffer,gt=Bt.type,bt=Bt.bytesPerElement,Pt=gt===s.INT||gt===s.UNSIGNED_INT||Q.gpuType===Ja;if(Q.isInterleavedBufferAttribute){let xt=Q.data,zt=xt.isInterleavedBuffer===!0?xt.stride:xt.itemSize,pe=Q.offset;if(xt.isInstancedInterleavedBuffer||xt.isInstancedBufferAttribute){for(let Lt=0;Lt<X.locationSize;Lt++)p(X.location+Lt,xt.meshPerAttribute);N.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let Lt=0;Lt<X.locationSize;Lt++)m(X.location+Lt);s.bindBuffer(s.ARRAY_BUFFER,Z);for(let Lt=0;Lt<X.locationSize;Lt++)E(X.location+Lt,Et/X.locationSize,gt,j,zt*bt,(pe+Et/X.locationSize*Lt)*bt,Pt)}else{if(Q.isInstancedBufferAttribute){for(let xt=0;xt<X.locationSize;xt++)p(X.location+xt,Q.meshPerAttribute);N.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let xt=0;xt<X.locationSize;xt++)m(X.location+xt);s.bindBuffer(s.ARRAY_BUFFER,Z);for(let xt=0;xt<X.locationSize;xt++)E(X.location+xt,Et/X.locationSize,gt,j,Et*bt,Et/X.locationSize*xt*bt,Pt)}}else if(G!==void 0){let j=G[et];if(j!==void 0)switch(j.length){case 2:s.vertexAttrib2fv(X.location,j);break;case 3:s.vertexAttrib3fv(X.location,j);break;case 4:s.vertexAttrib4fv(X.location,j);break;default:s.vertexAttrib1fv(X.location,j)}}}}S()}function A(){I();for(let N in i){let F=i[N];for(let z in F){let L=F[z];for(let V in L){let q=L[V];for(let G in q)h(q[G].object),delete q[G];delete L[V]}}delete i[N]}}function T(N){if(i[N.id]===void 0)return;let F=i[N.id];for(let z in F){let L=F[z];for(let V in L){let q=L[V];for(let G in q)h(q[G].object),delete q[G];delete L[V]}}delete i[N.id]}function x(N){for(let F in i){let z=i[F];for(let L in z){let V=z[L];if(V[N.id]===void 0)continue;let q=V[N.id];for(let G in q)h(q[G].object),delete q[G];delete V[N.id]}}}function M(N){for(let F in i){let z=i[F],L=N.isInstancedMesh===!0?N.id:0,V=z[L];if(V!==void 0){for(let q in V){let G=V[q];for(let et in G)h(G[et].object),delete G[et];delete V[q]}delete z[L],Object.keys(z).length===0&&delete i[F]}}}function I(){C(),a=!0,r!==n&&(r=n,c(r.object))}function C(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:I,resetDefaultState:C,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:M,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function Lg(s,t,e){let i;function n(l){i=l}function r(l,c){s.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,i,1)}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Dg(s,t,e,i){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(x){return!(x!==yi&&i.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){let M=x===xi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==Ze&&x!==hi&&!M&&i.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Ct("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&d===!1;e.reversedDepthBuffer===!0&&d===!1&&Ct("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&d===!0&&Ct("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),S=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:b,maxSamples:A,samples:T}}function Ng(s){let t=this,e=null,i=0,n=!1,r=!1,a=new Qe,o=new Ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||i!==0||n;return n=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!n||g===null||g.length===0||r&&!m)r?h(null):c();else{let S=r?0:i,E=S*4,b=p.clippingState||null;l.value=b,b=h(g,u,E,f);for(let A=0;A!==E;++A)b[A]=e[A];p.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,g){let _=d!==null?d.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let p=f+_*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,b=f;E!==_;++E,b+=4)a.copy(d[E]).applyMatrix4(S,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}var vr=class extends je{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new $s(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new fe(5,5,5),r=new Ii({name:"CubemapFromEquirect",uniforms:In(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xe,blending:An});r.uniforms.tEquirect.value=e;let a=new wt(n,r),o=e.minFilter;return e.minFilter===Ki&&(e.minFilter=Ge),new us(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(r)}},Eu=256,Ug=3,Fg=20,$u=256,Zu=16,Og=3,Bg=new R,kg=new Nt,Bo=class s{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new us(1,10,null),this._boxMesh=new wt(new fe(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,i=.1,n=100,r={}){let{size:a=256,position:o=Bg}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let d=l.autoClear,u=l.autoClearColor,f=l.autoClearDepth,g=l.autoClearStencil,_=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(t.background=l.getClearColor(kg));let m=new us(i,n,h);return m.position.copy(o),m.update(l,t),l.autoClear=d,l.autoClearColor=u,l.autoClearDepth=f,l.autoClearStencil=g,t.background=_,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ru(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Au(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Eu,lc(t))}_fromTexture(t,e){t.mapping===Cn||t.mapping===fs?this._setSize(t.image.length===0?Eu:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let i=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(i),i}_allocateTarget(){let t=this._cubeSize,e=Tu(t,!1,!1),i=Math.log2(t)-Ug;for(let n=0;n<=i;n++)e.texture.mipmaps.push({width:t>>n,height:t>>n});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==e||t&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Tu(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,i){let n=this._boxMesh,r=this._cubeCamera;n.material=i,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,n),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Cn||t.mapping===fs?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ru()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Au()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=zg(),this._integrationMaterial=Hg());let e=this._cubeSize,i=t.texture.mipmaps.length-1,n=this._ggxMaterial.uniforms;n.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Zu);for(let a=0;a<=i;a++){let o=s.lodToRoughness(a,i);if(a>i-Og)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/($u*Math.pow(o,4)))+.5:0;n.roughness.value=o,n.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Gg());let i=this._blurMaterial,n=i.uniforms,r=this._sourceTarget;n.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,n.envMap.value=r.texture,this._renderCube(t,0,i),n.envMap.value=t.texture,this._renderCube(r,0,i)}};function Tu(s,t,e){return new vr(s,{minFilter:Ki,generateMipmaps:t,type:xi,colorSpace:Ns,depthBuffer:e})}function br(s,t,e){return new Ii({name:s,uniforms:t,vertexShader:Vt.cube_vert,fragmentShader:e,side:Xe,blending:An,depthTest:!1,depthWrite:!1})}function zg(){return br("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

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
	`)}function Hg(){return br("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Zu}},`

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
	`)}function Gg(){return br("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Fg}
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
	`)}function Au(){return br("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function Ru(){return br("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Vg(s){let t=new WeakMap,e=new WeakMap,i=null;function n(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===Ya||f===$a)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let _=new vr(g.height);return _.fromEquirectangularTexture(s,u),t.set(u,_),u.addEventListener("dispose",c),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let f=u.mapping,g=f===Ya||f===$a,_=f===Cn||f===fs;if(g||_){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new Bo(s)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let S=u.image;return g&&S&&S.height>0||_&&S&&l(S)?(i===null&&(i=new Bo(s)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===Ya?u.mapping=Cn:f===$a&&(u.mapping=fs),u}function l(u){let f=0,g=6;for(let _=0;_<g;_++)u[_]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:d}}function Wg(s){let t={};function e(i){if(t[i]!==void 0)return t[i];let n=s.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let n=e(i);return n===null&&Cs("WebGLRenderer: "+i+" extension not supported."),n}}}function Xg(s,t,e,i){let n={},r=new WeakMap,a=new FinalizationRegistry(g=>delete n[g]);function o(g){l(g.target)}function l(g){g.index!==null&&t.remove(g.index);for(let m in g.attributes)t.remove(g.attributes[m]);g.removeEventListener("dispose",o),delete n[g.id],a.unregister(g);let _=r.get(g);_&&(t.remove(_),r.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,e.memory.geometries--}function c(g,_){return n[_.id]!==void 0||(_.addEventListener("dispose",o),n[_.id]=new WeakRef(_),a.register(_,_.id,_),e.memory.geometries++),_}function h(g){let _=g.attributes;for(let m in _)t.update(_[m],s.ARRAY_BUFFER)}function d(g){let _=g.index,m=g.attributes.position,p=0;if(m===void 0)return;let S=_!==null?_.array.length:m.array.length/3-1,E=m.count>=65535?Gs:Hs,b=new E(Math.ceil(S/3)*6,1),A=b.array;if(_!==null){let x=_.array;p=_.version;for(let M=0,I=0;M<S;M+=3){let C=x[M+0],N=x[M+1],F=x[M+2];A[I++]=C,A[I++]=N,A[I++]=N,A[I++]=F,A[I++]=F,A[I++]=C}}else{p=m.version;for(let x=0,M=0;x<S;x+=3){let I=x+0,C=x+1,N=x+2;A[M++]=I,A[M++]=C,A[M++]=C,A[M++]=N,A[M++]=N,A[M++]=I}}b.version=p;let T=r.get(g);T&&t.remove(T),r.set(g,b)}function u(g){let _=r.get(g);if(_){let m=g.index;m!==null&&_.version<m.version&&d(g)}else d(g);return r.get(g)}function f(){for(let g in n){let _=n[g].deref();_!==void 0&&l(_)}}return{get:c,update:h,getWireframeAttribute:u,dispose:f}}function qg(s,t,e){let i;function n(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){s.drawElements(i,u,r,d*a),e.update(u,i,1)}function c(d,u,f){f!==0&&(s.drawElementsInstanced(i,u,r,d*a,f),e.update(u,i,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,d,0,f);let _=0;for(let m=0;m<f;m++)_+=u[m];e.update(_,i,1)}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Yg(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:Dt("WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function $g(s,t,e){let i=new WeakMap,n=new le;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==d){let I=function(){x.dispose(),i.delete(o),o.removeEventListener("dispose",I)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],E=0;f===!0&&(E=1),g===!0&&(E=2),_===!0&&(E=3);let b=o.attributes.position.count*E,A=1;b>t.maxTextureSize&&(A=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let T=new Float32Array(b*A*4*d),x=new Bs(T,b,A,d);x.type=hi,x.needsUpdate=!0;let M=E*4;for(let C=0;C<d;C++){let N=m[C],F=p[C],z=S[C],L=b*A*4*C;for(let V=0;V<N.count;V++){let q=V*M;f===!0&&(n.fromBufferAttribute(N,V),T[L+q+0]=n.x,T[L+q+1]=n.y,T[L+q+2]=n.z,T[L+q+3]=0),g===!0&&(n.fromBufferAttribute(F,V),T[L+q+4]=n.x,T[L+q+5]=n.y,T[L+q+6]=n.z,T[L+q+7]=0),_===!0&&(n.fromBufferAttribute(z,V),T[L+q+8]=n.x,T[L+q+9]=n.y,T[L+q+10]=n.z,T[L+q+11]=z.itemSize===4?n.w:1)}}u={count:d,texture:x,size:new vt(b,A)},i.set(o,u),o.addEventListener("dispose",I)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Zg(s,t,e,i,n){let r=new WeakMap;function a(c){let h=n.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var Jg={[Vl]:"LINEAR_TONE_MAPPING",[Wl]:"REINHARD_TONE_MAPPING",[Xl]:"CINEON_TONE_MAPPING",[hr]:"ACES_FILMIC_TONE_MAPPING",[Yl]:"AGX_TONE_MAPPING",[$l]:"NEUTRAL_TONE_MAPPING",[ql]:"CUSTOM_TONE_MAPPING"};function Kg(s,t,e,i,n,r){let a=new je(t,e,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new de;h.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Jt([0,2,0,0,2,0],2));let d=new La({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new wt(h,d),f=new ar(-1,1,1,-1,0,1),g=null,_=null,m=!1,p,S=null,E=[],b=!1;this.setSize=function(A,T){a.setSize(A,T),o!==null&&o.setSize(A,T),l!==null&&l.setSize(A,T);for(let x=0;x<E.length;x++){let M=E[x];M.setSize&&M.setSize(A,T)}},this.setEffects=function(A){E=A,b=E.length>0&&E[0].isRenderPass===!0;let T=a.width,x=a.height;E.length>0&&o===null&&(o=new je(T,x,{type:xi,depthBuffer:!1,stencilBuffer:!1}),l=new je(T,x,{type:xi,depthBuffer:!1,stencilBuffer:!1}));let M=n===!0&&E.some(I=>I.needsDepthTexture===!0);M!==(a.depthTexture!==null)&&(M===!0&&c===null&&(c=new qi(T,x),r===!0&&(c.format=Qi,c.type=Pn)),a.dispose(),a.depthTexture=M?c:null,a.resolveDepthBuffer=M,a.storeMultisampledDepthBuffer=M);for(let I=0;I<E.length;I++){let C=E[I];C.setSize&&C.setSize(T,x),M&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(c)}},this.begin=function(A,T){if(m||A.toneMapping===Di&&E.length===0)return!1;if(S=T,T!==null){let x=T.width,M=T.height;(a.width!==x||a.height!==M)&&this.setSize(x,M)}return b===!1&&A.setRenderTarget(a),p=A.toneMapping,A.toneMapping=Di,!0},this.hasRenderPass=function(){return b},this.end=function(A,T){A.toneMapping=p,m=!0;let x=a,M=o;for(let I=0;I<E.length;I++){let C=E[I];C.enabled!==!1&&(C.render(A,M,x,T),C.needsSwap!==!1&&(x=M,M=M===o?l:o))}if(g!==A.outputColorSpace||_!==A.toneMapping){g=A.outputColorSpace,_=A.toneMapping,d.defines={},$t.getTransfer(g)===jt&&(d.defines.SRGB_TRANSFER="");let I=Jg[_];I&&(d.defines[I]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=x.texture,A.setRenderTarget(S),A.render(u,f),S=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),d.dispose()}}var Ju=new Ve,Ku=new qi(1,1),Qu=new Zs(1),ju=new Bs,td=new _a,ed=new $s,Cu=[],Pu=[],Iu=new Float32Array(16),Lu=new Float32Array(9),Du=new Float32Array(4);function gs(s,t,e){let i=s[0];if(i<=0||i>0)return s;let n=t*e,r=Cu[n];if(r===void 0&&(r=new Float32Array(n),Cu[n]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function be(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function Se(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function zo(s,t){let e=Pu[t];e===void 0&&(e=new Int32Array(t),Pu[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function Qg(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function jg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;s.uniform2fv(this.addr,t),Se(e,t)}}function t0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;s.uniform3fv(this.addr,t),Se(e,t)}}function e0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;s.uniform4fv(this.addr,t),Se(e,t)}}function i0(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(be(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(be(e,i))return;Du.set(i),s.uniformMatrix2fv(this.addr,!1,Du),Se(e,i)}}function n0(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(be(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(be(e,i))return;Lu.set(i),s.uniformMatrix3fv(this.addr,!1,Lu),Se(e,i)}}function s0(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(be(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(be(e,i))return;Iu.set(i),s.uniformMatrix4fv(this.addr,!1,Iu),Se(e,i)}}function r0(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function a0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;s.uniform2iv(this.addr,t),Se(e,t)}}function o0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;s.uniform3iv(this.addr,t),Se(e,t)}}function l0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;s.uniform4iv(this.addr,t),Se(e,t)}}function c0(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function h0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;s.uniform2uiv(this.addr,t),Se(e,t)}}function u0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;s.uniform3uiv(this.addr,t),Se(e,t)}}function d0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;s.uniform4uiv(this.addr,t),Se(e,t)}}function Ho(s){return s.version===0&&(s.compareFunction=sc,s.needsUpdate=!0),s}function f0(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?r=Ho(Ku):r=Ju,e.setTexture2D(t||r,n)}function p0(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||td,n)}function m0(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=Ho(Qu):r=ed,e.setTextureCube(t||r,n)}function g0(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||ju,n)}function x0(s){switch(s){case 5126:return Qg;case 35664:return jg;case 35665:return t0;case 35666:return e0;case 35674:return i0;case 35675:return n0;case 35676:return s0;case 5124:case 35670:return r0;case 35667:case 35671:return a0;case 35668:case 35672:return o0;case 35669:case 35673:return l0;case 5125:return c0;case 36294:return h0;case 36295:return u0;case 36296:return d0;case 35678:case 36198:case 36298:case 36306:case 35682:return f0;case 35679:case 36299:case 36307:return p0;case 35680:case 36300:case 36308:case 36293:return m0;case 36289:case 36303:case 36311:case 36292:return g0}}function y0(s,t){s.uniform1fv(this.addr,t)}function _0(s,t){let e=gs(t,this.size,2);s.uniform2fv(this.addr,e)}function v0(s,t){let e=gs(t,this.size,3);s.uniform3fv(this.addr,e)}function b0(s,t){let e=gs(t,this.size,4);s.uniform4fv(this.addr,e)}function S0(s,t){let e=gs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function M0(s,t){let e=gs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function w0(s,t){let e=gs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function E0(s,t){s.uniform1iv(this.addr,t)}function T0(s,t){s.uniform2iv(this.addr,t)}function A0(s,t){s.uniform3iv(this.addr,t)}function R0(s,t){s.uniform4iv(this.addr,t)}function C0(s,t){s.uniform1uiv(this.addr,t)}function P0(s,t){s.uniform2uiv(this.addr,t)}function I0(s,t){s.uniform3uiv(this.addr,t)}function L0(s,t){s.uniform4uiv(this.addr,t)}function D0(s,t,e){let i=this.cache,n=t.length,r=zo(e,n);be(i,r)||(s.uniform1iv(this.addr,r),Se(i,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Ho(Ku):a=Ju;for(let o=0;o!==n;++o)e.setTexture2D(t[o]||a,r[o])}function N0(s,t,e){let i=this.cache,n=t.length,r=zo(e,n);be(i,r)||(s.uniform1iv(this.addr,r),Se(i,r));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||td,r[a])}function U0(s,t,e){let i=this.cache,n=t.length,r=zo(e,n);be(i,r)||(s.uniform1iv(this.addr,r),Se(i,r));let a;this.type===s.SAMPLER_CUBE_SHADOW?a=Ho(Qu):a=ed;for(let o=0;o!==n;++o)e.setTextureCube(t[o]||a,r[o])}function F0(s,t,e){let i=this.cache,n=t.length,r=zo(e,n);be(i,r)||(s.uniform1iv(this.addr,r),Se(i,r));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||ju,r[a])}function O0(s){switch(s){case 5126:return y0;case 35664:return _0;case 35665:return v0;case 35666:return b0;case 35674:return S0;case 35675:return M0;case 35676:return w0;case 5124:case 35670:return E0;case 35667:case 35671:return T0;case 35668:case 35672:return A0;case 35669:case 35673:return R0;case 5125:return C0;case 36294:return P0;case 36295:return I0;case 36296:return L0;case 35678:case 36198:case 36298:case 36306:case 35682:return D0;case 35679:case 36299:case 36307:return N0;case 35680:case 36300:case 36308:case 36293:return U0;case 36289:case 36303:case 36311:case 36292:return F0}}var Mc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=x0(e.type)}},wc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=O0(e.type)}},Ec=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let n=this.seq;for(let r=0,a=n.length;r!==a;++r){let o=n[r];o.setValue(t,e[o.id],i)}}},bc=/(\w+)(\])?(\[|\.)?/g;function Nu(s,t){s.seq.push(t),s.map[t.id]=t}function B0(s,t,e){let i=s.name,n=i.length;for(bc.lastIndex=0;;){let r=bc.exec(i),a=bc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){Nu(e,c===void 0?new Mc(o,s,t):new wc(o,s,t));break}else{let d=e.map[o];d===void 0&&(d=new Ec(o),Nu(e,d)),e=d}}}var ms=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);B0(o,l,this)}let n=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?n.push(a):r.push(a);n.length>0&&(this.seq=n.concat(r))}setValue(t,e,i,n){let r=this.map[e];r!==void 0&&r.setValue(t,i,n)}setOptional(t,e,i){let n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,n)}}static seqWithValue(t,e){let i=[];for(let n=0,r=t.length;n!==r;++n){let a=t[n];a.id in e&&i.push(a)}return i}};function Uu(s,t,e){let i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}var k0=37297,z0=0;function H0(s,t){let e=s.split(`
`),i=[],n=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=n;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var Fu=new Ut;function G0(s){$t._getMatrix(Fu,$t.workingColorSpace,s);let t=`mat3( ${Fu.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(s)){case Us:return[t,"LinearTransferOETF"];case jt:return[t,"sRGBTransferOETF"];default:return Ct("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Ou(s,t,e){let i=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+H0(s.getShaderSource(t),o)}else return r}function V0(s,t){let e=G0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var W0={[Vl]:"Linear",[Wl]:"Reinhard",[Xl]:"Cineon",[hr]:"ACESFilmic",[Yl]:"AgX",[$l]:"Neutral",[ql]:"Custom"};function X0(s,t){let e=W0[t];return e===void 0?(Ct("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Oo=new R;function q0(){$t.getLuminanceCoefficients(Oo);let s=Oo.x.toFixed(4),t=Oo.y.toFixed(4),e=Oo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Y0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_r).join(`
`)}function $0(s){let t=[];for(let e in s){let i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Z0(s,t){let e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let r=s.getActiveAttrib(t,n),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function _r(s){return s!==""}function Bu(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function ku(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var J0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tc(s){return s.replace(J0,K0)}function K0(s,t){let e=Vt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Tc(e)}var Q0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zu(s){return s.replace(Q0,j0)}function j0(s,t,e,i){let n="";for(let r=parseInt(t);r<parseInt(e);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function Hu(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}var tx={[Tn]:"SHADOWMAP_TYPE_PCF",[ds]:"SHADOWMAP_TYPE_VSM"};function ex(s){return tx[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ix={[fs]:"ENVMAP_MODE_REFRACTION"};function nx(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":ix[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var sx={[Gl]:"ENVMAP_BLENDING_MULTIPLY",[ru]:"ENVMAP_BLENDING_MIX",[au]:"ENVMAP_BLENDING_ADD"};function rx(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":sx[s.combine]||"ENVMAP_BLENDING_NONE"}function ax(s,t,e,i){let n=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=ex(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=nx(e),d=rx(e),u=Y0(e),f=$0(r),g=n.createProgram(),_,m,p=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(_r).join(`
`),_.length>0&&(_+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(_r).join(`
`),m.length>0&&(m+=`
`)):(_=[Hu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_r).join(`
`),m=[Hu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Di?"#define TONE_MAPPING":"",e.toneMapping!==Di?Vt.tonemapping_pars_fragment:"",e.toneMapping!==Di?X0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,V0("linearToOutputTexel",e.outputColorSpace),q0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(_r).join(`
`)),a=Tc(a),a=Bu(a,e),a=ku(a,e),o=Tc(o),o=Bu(o,e),o=ku(o,e),a=zu(a),o=zu(o),e.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,_=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,m=["#define varying in",e.glslVersion===ac?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ac?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let S=p+_+a,E=p+m+o,b=Uu(n,n.VERTEX_SHADER,S),A=Uu(n,n.FRAGMENT_SHADER,E);n.attachShader(g,b),n.attachShader(g,A),e.index0AttributeName!==void 0?n.bindAttribLocation(g,0,e.index0AttributeName):e.hasPositionAttribute===!0&&n.bindAttribLocation(g,0,"position"),n.linkProgram(g);function T(C){if(s.debug.checkShaderErrors){let N=n.getProgramInfoLog(g)||"",F=n.getShaderInfoLog(b)||"",z=n.getShaderInfoLog(A)||"",L=N.trim(),V=F.trim(),q=z.trim(),G=!0,et=!0;if(n.getProgramParameter(g,n.LINK_STATUS)===!1)if(G=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,g,b,A);else{let X=Ou(n,b,"vertex"),Q=Ou(n,A,"fragment");Dt("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(g,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+L+`
`+X+`
`+Q)}else L!==""?Ct("WebGLProgram: Program Info Log:",L):(V===""||q==="")&&(et=!1);et&&(C.diagnostics={runnable:G,programLog:L,vertexShader:{log:V,prefix:_},fragmentShader:{log:q,prefix:m}})}n.deleteShader(b),n.deleteShader(A),x=new ms(n,g),M=Z0(n,g)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=n.getProgramParameter(g,k0)),I},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=z0++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=b,this.fragmentShader=A,this}var ox=0,Ac=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let n=this._getShaderCacheForMaterial(t);return n.has(e)===!1&&(n.add(e),e.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Rc(t),e.set(t,i)),i}},Rc=class{constructor(t){this.id=ox++,this.code=t,this.usedTimes=0}};function lx(s){return s===fn||s===gr||s===xr}function cx(s,t,e,i,n,r){let a=new ns,o=new Ac,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(x){return l.add(x),x===0?"uv":`uv${x}`}function g(x,M,I,C,N,F){let z=C.fog,L=N.geometry,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?C.environment:null,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,G=t.get(x.envMap||V,q),et=u[x.type],X=i.precision;x.precision!==null&&(X=i.getMaxPrecision(x.precision),X!==x.precision&&Ct("WebGLProgram.getParameters:",x.precision,"not supported, using",X,"instead."));let Q=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,j=Q!==void 0?Q.length:0,Et=0;L.morphAttributes.position!==void 0&&(Et=1),L.morphAttributes.normal!==void 0&&(Et=2),L.morphAttributes.color!==void 0&&(Et=3);let Bt,Z,gt,bt;if(et){let pt=Ui[et];Bt=pt.vertexShader,Z=pt.fragmentShader}else{Bt=x.vertexShader,Z=x.fragmentShader;let pt=o.getVertexShaderStage(x),ee=o.getFragmentShaderStage(x);o.update(x,pt,ee),gt=pt.id,bt=ee.id}let Pt=s.getRenderTarget(),xt=s.state.buffers.depth.getReversed(),zt=N.isInstancedMesh===!0,pe=N.isBatchedMesh===!0,Lt=!!x.map,te=!!x.matcap,ie=!!G,Xt=ie&&G.isPMREMTexture===!0,Ce=!!x.aoMap,_e=!!x.lightMap,$e=!!x.bumpMap&&x.wireframe===!1,ce=!!x.normalMap,bi=!!x.displacementMap,Me=!!x.emissiveMap,ei=!!x.metalnessMap,ii=!!x.roughnessMap,ni=x.anisotropy>0,U=x.clearcoat>0,si=x.diffuseRoughness>0,ae=x.dispersion>0,oe=x.retroreflectivity>0,dt=x.iridescence>0,ve=x.sheen>0,It=x.transmission>0,Ft=ni&&!!x.anisotropyMap,w=U&&!!x.clearcoatMap,y=U&&!!x.clearcoatNormalMap,B=U&&!!x.clearcoatRoughnessMap,tt=si&&!!x.diffuseRoughnessMap,K=dt&&!!x.iridescenceMap,st=dt&&!!x.iridescenceThicknessMap,ht=ve&&!!x.sheenColorMap,Y=ve&&!!x.sheenRoughnessMap,$=!!x.specularMap,at=!!x.specularColorMap,P=!!x.specularIntensityMap,J=It&&!!x.transmissionMap,W=It&&!!x.thicknessMap,ot=!!x.gradientMap,nt=!!x.alphaMap,rt=x.alphaTest>0,At=!!x.alphaHash,Gt=!!x.extensions,it=Di;x.toneMapped&&(Pt===null||Pt.isXRRenderTarget===!0)&&(it=s.toneMapping);let Rt=Xt?G.isCompressedCubeTexture?G.image[0].mipmaps:G.mipmaps:null,Ht={shaderID:et,shaderType:x.type,shaderName:x.name,vertexShader:Bt,fragmentShader:Z,defines:x.defines,customVertexShaderID:gt,customFragmentShaderID:bt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:X,batching:pe,batchingColor:pe&&N._colorsTexture!==null,instancing:zt,instancingColor:zt&&N.instanceColor!==null,instancingMorph:zt&&N.morphTexture!==null,outputColorSpace:Pt===null?s.outputColorSpace:Pt.isXRRenderTarget===!0?Pt.texture.colorSpace:$t.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Lt,matcap:te,envMap:ie,envMapMode:ie&&G.mapping,envMapPMREM:Xt,envMapMaxLod:Xt?Rt.length-1:null,envMapSize:Xt?Rt[0].width:null,aoMap:Ce,lightMap:_e,bumpMap:$e,normalMap:ce,displacementMap:bi,emissiveMap:Me,normalMapObjectSpace:ce&&x.normalMapType===cu,normalMapTangentSpace:ce&&x.normalMapType===No,packedNormalMap:ce&&x.normalMapType===No&&lx(x.normalMap.format),metalnessMap:ei,roughnessMap:ii,anisotropy:ni,anisotropyMap:Ft,clearcoat:U,clearcoatMap:w,clearcoatNormalMap:y,clearcoatRoughnessMap:B,diffuseRoughness:si,diffuseRoughnessMap:tt,dispersion:ae,retroreflection:oe,iridescence:dt,iridescenceMap:K,iridescenceThicknessMap:st,sheen:ve,sheenColorMap:ht,sheenRoughnessMap:Y,specularMap:$,specularColorMap:at,specularIntensityMap:P,transmission:It,transmissionMap:J,thicknessMap:W,gradientMap:ot,opaque:x.transparent===!1&&x.blending===Ji&&x.alphaToCoverage===!1,alphaMap:nt,alphaTest:rt,alphaHash:At,combine:x.combine,mapUv:Lt&&f(x.map.channel),aoMapUv:Ce&&f(x.aoMap.channel),lightMapUv:_e&&f(x.lightMap.channel),bumpMapUv:$e&&f(x.bumpMap.channel),normalMapUv:ce&&f(x.normalMap.channel),displacementMapUv:bi&&f(x.displacementMap.channel),emissiveMapUv:Me&&f(x.emissiveMap.channel),metalnessMapUv:ei&&f(x.metalnessMap.channel),roughnessMapUv:ii&&f(x.roughnessMap.channel),anisotropyMapUv:Ft&&f(x.anisotropyMap.channel),clearcoatMapUv:w&&f(x.clearcoatMap.channel),clearcoatNormalMapUv:y&&f(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:B&&f(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:tt&&f(x.diffuseRoughnessMap.channel),iridescenceMapUv:K&&f(x.iridescenceMap.channel),iridescenceThicknessMapUv:st&&f(x.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&f(x.sheenColorMap.channel),sheenRoughnessMapUv:Y&&f(x.sheenRoughnessMap.channel),specularMapUv:$&&f(x.specularMap.channel),specularColorMapUv:at&&f(x.specularColorMap.channel),specularIntensityMapUv:P&&f(x.specularIntensityMap.channel),transmissionMapUv:J&&f(x.transmissionMap.channel),thicknessMapUv:W&&f(x.thicknessMap.channel),alphaMapUv:nt&&f(x.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(ce||ni),vertexNormals:!!L.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!L.attributes.uv&&(Lt||nt),fog:!!z,useFog:x.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||L.attributes.normal===void 0&&ce===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:xt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:L.attributes.position!==void 0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:Et,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:F.filter(pt=>pt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:it,decodeVideoTexture:Lt&&x.map.isVideoTexture===!0&&$t.getTransfer(x.map.colorSpace)===jt,decodeVideoTextureEmissive:Me&&x.emissiveMap.isVideoTexture===!0&&$t.getTransfer(x.emissiveMap.colorSpace)===jt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===qe,flipSided:x.side===Xe,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Gt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&x.extensions.multiDraw===!0||pe)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ht.vertexUv1s=l.has(1),Ht.vertexUv2s=l.has(2),Ht.vertexUv3s=l.has(3),l.clear(),Ht}function _(x){let M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)M.push(I),M.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(m(M,x),p(M,x),M.push(s.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function m(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapPMREM),x.push(M.envMapMaxLod),x.push(M.envMapSize),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.diffuseRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.numSunLights),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numSunLightShadows),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.numLightProbeGrids),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function p(x,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.diffuseRoughness&&a.enable(25),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function S(x){let M=u[x.type],I;if(M){let C=Ui[M];I=Su.clone(C.uniforms)}else I=x.uniforms;return I}function E(x,M){let I=h.get(M);return I!==void 0?++I.usedTimes:(I=new ax(s,M,x,n),c.push(I),h.set(M,I)),I}function b(x){if(--x.usedTimes===0){let M=c.indexOf(x);c[M]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function A(x){o.remove(x)}function T(){o.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:S,acquireProgram:E,releaseProgram:b,releaseShaderCache:A,programs:c,dispose:T}}function hx(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:r}}function ux(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Gu(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Vu(){let s=[],t=0,e=[],i=[],n=[];function r(){t=0,e.length=0,i.length=0,n.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,_,m,p){let S=s[t];return S===void 0?(S={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:m,group:p},s[t]=S):(S.id=u.id,S.object=u,S.geometry=f,S.material=g,S.materialVariant=a(u),S.groupOrder=_,S.renderOrder=u.renderOrder,S.z=m,S.group=p),t++,S}function l(u,f,g,_,m,p,S){S.reversedDepth===!0&&(m=-m);let E=o(u,f,g,_,m,p);g.transmission>0?i.push(E):g.transparent===!0?n.push(E):e.push(E)}function c(u,f,g,_,m,p){let S=o(u,f,g,_,m,p);g.transmission>0?i.unshift(S):g.transparent===!0?n.unshift(S):e.unshift(S)}function h(u,f){e.length>1&&e.sort(u||ux),i.length>1&&i.sort(f||Gu),n.length>1&&n.sort(f||Gu)}function d(){for(let u=t,f=s.length;u<f;u++){let g=s[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:d,sort:h}}function dx(){let s=new WeakMap;function t(i,n){let r=s.get(i),a;return r===void 0?(a=new Vu,s.set(i,[a])):n>=r.length?(a=new Vu,r.push(a)):a=r[n],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function fx(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new R,color:new Nt};break;case"SpotLight":e={position:new R,direction:new R,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new R,halfWidth:new R,halfHeight:new R};break}return s[t.id]=e,e}}}function px(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var mx=0;function gx(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function xx(s){let t=new fx,e=px(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new R);let n=new R,r=new Zt,a=new Zt;function o(c){let h=0,d=0,u=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,S=0,E=0,b=0,A=0,T=0,x=0,M=0,I=0,C=0;c.sort(gx);for(let F=0,z=c.length;F<z;F++){let L=c[F],V=L.color,q=L.intensity,G=L.distance,et=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===fn?et=L.shadow.map.texture:et=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=V.r*q,d+=V.g*q,u+=V.b*q;else if(L.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(L.sh.coefficients[X],q);C++}else if(L.isSunLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let Q=L.shadow,j=e.get(L);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),i.sunShadow[g]=j,i.sunShadowMap[g]=et;let Et=Q.getViewportCount();for(let Bt=0;Bt<Et;Bt++)i.sunShadowMatrix[_+Bt]=Q.getMatrix(Bt),i.sunShadowCascade[_+Bt]=Q._cascadeData[Bt];_+=Et,g++}i.sun[f]=X,f++}else if(L.isDirectionalLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let Q=L.shadow,j=e.get(L);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,i.directionalShadow[m]=j,i.directionalShadowMap[m]=et,i.directionalShadowMatrix[m]=L.shadow.matrix,A++}i.directional[m]=X,m++}else if(L.isSpotLight){let X=t.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(V).multiplyScalar(q),X.distance=G,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,i.spot[S]=X;let Q=L.shadow;if(L.map&&(i.spotLightMap[M]=L.map,M++,Q.updateMatrices(L),L.castShadow&&I++),i.spotLightMatrix[S]=Q.matrix,L.castShadow){let j=e.get(L);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,i.spotShadow[S]=j,i.spotShadowMap[S]=et,x++}S++}else if(L.isRectAreaLight){let X=t.get(L);X.color.copy(V).multiplyScalar(q),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),i.rectArea[E]=X,E++}else if(L.isPointLight){let X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){let Q=L.shadow,j=e.get(L);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,j.shadowCameraNear=Q.camera.near,j.shadowCameraFar=Q.camera.far,i.pointShadow[p]=j,i.pointShadowMap[p]=et,i.pointShadowMatrix[p]=L.shadow.matrix,T++}i.point[p]=X,p++}else if(L.isHemisphereLight){let X=t.get(L);X.skyColor.copy(L.color).multiplyScalar(q),X.groundColor.copy(L.groundColor).multiplyScalar(q),i.hemi[b]=X,b++}}E>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=mt.LTC_FLOAT_1,i.rectAreaLTC2=mt.LTC_FLOAT_2):(i.rectAreaLTC1=mt.LTC_HALF_1,i.rectAreaLTC2=mt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let N=i.hash;(N.sunLength!==f||N.directionalLength!==m||N.pointLength!==p||N.spotLength!==S||N.rectAreaLength!==E||N.hemiLength!==b||N.numSunShadows!==g||N.numDirectionalShadows!==A||N.numPointShadows!==T||N.numSpotShadows!==x||N.numSpotMaps!==M||N.numLightProbes!==C)&&(i.sun.length=f,i.directional.length=m,i.spot.length=S,i.rectArea.length=E,i.point.length=p,i.hemi.length=b,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=_,i.sunShadowCascade.length=_,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.directionalShadowMatrix.length=A,i.pointShadow.length=T,i.pointShadowMap.length=T,i.pointShadowMatrix.length=T,i.spotShadow.length=x,i.spotShadowMap.length=x,i.spotLightMatrix.length=x+M-I,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=C,N.sunLength=f,N.directionalLength=m,N.pointLength=p,N.spotLength=S,N.rectAreaLength=E,N.hemiLength=b,N.numSunShadows=g,N.numDirectionalShadows=A,N.numPointShadows=T,N.numSpotShadows=x,N.numSpotMaps=M,N.numLightProbes=C,i.version=mx++)}function l(c,h){let d=0,u=0,f=0,g=0,_=0,m=0,p=h.matrixWorldInverse;for(let S=0,E=c.length;S<E;S++){let b=c[S];if(b.isSunLight){let A=i.sun[d];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(p),d++}else if(b.isDirectionalLight){let A=i.directional[u];A.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(n),A.direction.transformDirection(p),u++}else if(b.isSpotLight){let A=i.spot[g];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(n),A.direction.transformDirection(p),g++}else if(b.isRectAreaLight){let A=i.rectArea[_];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),a.identity(),r.copy(b.matrixWorld),r.premultiply(p),a.extractRotation(r),A.halfWidth.set(b.width*.5,0,0),A.halfHeight.set(0,b.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),_++}else if(b.isPointLight){let A=i.point[f];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){let A=i.hemi[m];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:i}}function Wu(s){let t=new xx(s),e=[],i=[],n=[];function r(d){h.camera=d,e.length=0,i.length=0,n.length=0}function a(d){d.isLightProbeGrid?n.push(d):e.push(d)}function o(d){i.push(d)}function l(){t.setup(e),n.sort((d,u)=>d.priority-u.priority||d.id-u.id)}function c(d){t.setupView(e,d)}let h={lightsArray:e,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function yx(s){let t=new WeakMap;function e(n,r=0){let a=t.get(n),o;return a===void 0?(o=new Wu(s),t.set(n,[o])):r>=a.length?(o=new Wu(s),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var _x=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vx=`uniform sampler2D shadow_pass;
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
}`,bx=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],Sx=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],Xu=new Zt,yr=new R,Sc=new R;function Mx(s,t,e){let i=new ln,n=new vt,r=new vt,a=new le,o=new Da,l=new Na,c={},h=e.maxTextureSize,d={[Li]:Xe,[Xe]:Li,[qe]:qe},u=new Ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:_x,fragmentShader:vx}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new de;g.setAttribute("position",new He(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new wt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tn;let p=this.type;this.render=function(T,x,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===zh&&(Ct("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Tn);let I=s.getRenderTarget(),C=s.getActiveCubeFace(),N=s.getActiveMipmapLevel(),F=s.state;F.setBlending(An),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let z=p!==this.type;z&&x.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(V=>V.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,V=T.length;L<V;L++){let q=T[L],G=q.shadow;if(G===void 0){Ct("WebGLShadowMap:",q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;n.copy(G.mapSize);let et=G.getFrameExtents();n.multiply(et),r.copy(G.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/et.x),n.x=r.x*et.x,G.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/et.y),n.y=r.y*et.y,G.mapSize.y=r.y));let X=s.state.buffers.depth.getReversed();if(G.camera._reversedDepth=X,G.map===null||z===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===ds){if(q.isPointLight){Ct("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new je(n.x,n.y,{format:fn,type:xi,minFilter:Ge,magFilter:Ge,generateMipmaps:!1}),G.map.texture.name=q.name+".shadowMap",G.map.depthTexture=new qi(n.x,n.y,hi),G.map.depthTexture.name=q.name+".shadowMapDepth",G.map.depthTexture.format=Vi,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Ae,G.map.depthTexture.magFilter=Ae}else q.isPointLight?(G.map=new vr(n.x),G.map.depthTexture=new Zs(n.x,gi)):(G.map=new je(n.x,n.y),G.map.depthTexture=new qi(n.x,n.y,gi)),G.map.depthTexture.name=q.name+".shadowMap",G.map.depthTexture.format=Vi,this.type===Tn?(G.map.depthTexture.compareFunction=X?nc:ic,G.map.depthTexture.minFilter=Ge,G.map.depthTexture.magFilter=Ge):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Ae,G.map.depthTexture.magFilter=Ae);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==n.x||G.map.height!==n.y)&&G.map.setSize(n.x,n.y);let Q=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();q.isPointLight!==!0&&G.updateMatrices(q,M);let j=(G.camera.layers.mask&4294967294)!==0?G.camera.layers:M.layers;for(let Et=0;Et<Q;Et++){let Bt=G.getCamera(Et);if(q.isPointLight){let Z=G.camera,gt=G.matrix,bt=q.distance||Z.far;bt!==Z.far&&(Z.far=bt,Z.updateProjectionMatrix()),yr.setFromMatrixPosition(q.matrixWorld),Z.position.copy(yr),Sc.copy(Z.position),Sc.add(bx[Et]),Z.up.copy(Sx[Et]),Z.lookAt(Sc),Z.updateMatrixWorld(),gt.makeTranslation(-yr.x,-yr.y,-yr.z),Xu.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Xu,Z.coordinateSystem,Z.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)s.setRenderTarget(G.map,Et),s.clear();else{Et===0&&(s.setRenderTarget(G.map),s.clear());let Z=G.getViewport(Et);a.set(r.x*Z.x,r.y*Z.y,r.x*Z.z,r.y*Z.w),F.viewport(a)}i=G.getFrustum(Et),b(x,M,Bt,q,j,this.type)}G.isPointLightShadow!==!0&&this.type===ds&&S(G,M),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(I,C,N)};function S(T,x){let M=t.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new je(n.x,n.y,{format:fn,type:xi}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(x,null,M,u,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(x,null,M,f,_,null)}function E(T,x,M,I){let C=null,N=M.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)C=N;else if(C=M.isPointLight===!0?l:o,s.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let F=C.uuid,z=x.uuid,L=c[F];L===void 0&&(L={},c[F]=L);let V=L[z];V===void 0&&(V=C.clone(),L[z]=V,x.addEventListener("dispose",A)),C=V}if(C.visible=x.visible,C.wireframe=x.wireframe,I===ds?C.side=x.shadowSide!==null?x.shadowSide:x.side:C.side=x.shadowSide!==null?x.shadowSide:d[x.side],C.alphaMap=x.alphaMap,C.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,C.map=x.map,C.clipShadows=x.clipShadows,C.clippingPlanes=x.clippingPlanes,C.clipIntersection=x.clipIntersection,C.displacementMap=x.displacementMap,C.displacementScale=x.displacementScale,C.displacementBias=x.displacementBias,C.wireframeLinewidth=x.wireframeLinewidth,C.linewidth=x.linewidth,M.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let F=s.properties.get(C);F.light=M}return C}function b(T,x,M,I,C,N){if(T.visible===!1)return;if(T.layers.test(C)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&N===ds)&&(!T.frustumCulled||T.intersectsFrustum(i))){T.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,T.matrixWorld);let L=t.update(T),V=T.material;if(Array.isArray(V)){let q=L.groups;for(let G=0,et=q.length;G<et;G++){let X=q[G],Q=V[X.materialIndex];if(Q&&Q.visible){let j=E(T,Q,I,N);T.onBeforeShadow(s,T,x,M,L,j,X),s.renderBufferDirect(M,null,L,j,T,X),T.onAfterShadow(s,T,x,M,L,j,X)}}}else if(V.visible){let q=E(T,V,I,N);T.onBeforeShadow(s,T,x,M,L,q,null),s.renderBufferDirect(M,null,L,q,T,null),T.onAfterShadow(s,T,x,M,L,q,null)}}let z=T.children;for(let L=0,V=z.length;L<V;L++)b(z[L],x,M,I,C,N)}function A(T){T.target.removeEventListener("dispose",A);for(let M in c){let I=c[M],C=T.target.uuid;C in I&&(I[C].dispose(),delete I[C])}}}function wx(s,t){function e(){let P=!1,J=new le,W=null,ot=new le(0,0,0,0);return{setMask:function(nt){W!==nt&&!P&&(s.colorMask(nt,nt,nt,nt),W=nt)},setLocked:function(nt){P=nt},setClear:function(nt,rt,At,Gt,it){it===!0&&(nt*=Gt,rt*=Gt,At*=Gt),J.set(nt,rt,At,Gt),ot.equals(J)===!1&&(s.clearColor(nt,rt,At,Gt),ot.copy(J))},reset:function(){P=!1,W=null,ot.set(-1,0,0,0)}}}function i(){let P=!1,J=!1,W=null,ot=null,nt=null;return{setReversed:function(rt){if(J!==rt){let At=t.get("EXT_clip_control");rt?At.clipControlEXT(At.LOWER_LEFT_EXT,At.ZERO_TO_ONE_EXT):At.clipControlEXT(At.LOWER_LEFT_EXT,At.NEGATIVE_ONE_TO_ONE_EXT),J=rt;let Gt=nt;nt=null,this.setClear(Gt)}},getReversed:function(){return J},setTest:function(rt){rt?xt(s.DEPTH_TEST):zt(s.DEPTH_TEST)},setMask:function(rt){W!==rt&&!P&&(s.depthMask(rt),W=rt)},setFunc:function(rt){if(J&&(rt=_u[rt]),ot!==rt){switch(rt){case oa:s.depthFunc(s.NEVER);break;case la:s.depthFunc(s.ALWAYS);break;case ca:s.depthFunc(s.LESS);break;case jn:s.depthFunc(s.LEQUAL);break;case ha:s.depthFunc(s.EQUAL);break;case ua:s.depthFunc(s.GEQUAL);break;case da:s.depthFunc(s.GREATER);break;case fa:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ot=rt}},setLocked:function(rt){P=rt},setClear:function(rt){nt!==rt&&(nt=rt,J&&(rt=1-rt),s.clearDepth(rt))},reset:function(){P=!1,W=null,ot=null,nt=null,J=!1}}}function n(){let P=!1,J=null,W=null,ot=null,nt=null,rt=null,At=null,Gt=null,it=null;return{setTest:function(Rt){P||(Rt?xt(s.STENCIL_TEST):zt(s.STENCIL_TEST))},setMask:function(Rt){J!==Rt&&!P&&(s.stencilMask(Rt),J=Rt)},setFunc:function(Rt,Ht,pt){(W!==Rt||ot!==Ht||nt!==pt)&&(s.stencilFunc(Rt,Ht,pt),W=Rt,ot=Ht,nt=pt)},setOp:function(Rt,Ht,pt){(rt!==Rt||At!==Ht||Gt!==pt)&&(s.stencilOp(Rt,Ht,pt),rt=Rt,At=Ht,Gt=pt)},setLocked:function(Rt){P=Rt},setClear:function(Rt){it!==Rt&&(s.clearStencil(Rt),it=Rt)},reset:function(){P=!1,J=null,W=null,ot=null,nt=null,rt=null,At=null,Gt=null,it=null}}}let r=new e,a=new i,o=new n,l={},c=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],_=null,m=!1,p=null,S=null,E=null,b=null,A=null,T=null,x=null,M=new Nt(0,0,0),I=0,C=!1,N=null,F=null,z=null,L=null,V=null,q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,et=0,X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(X)[1]),G=et>=1):X.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),G=et>=2);let Q=null,j={},Et=s.getParameter(s.SCISSOR_BOX),Bt=s.getParameter(s.VIEWPORT),Z=new le().fromArray(Et),gt=new le().fromArray(Bt);function bt(P,J,W,ot){let nt=new Uint8Array(4),rt=s.createTexture();s.bindTexture(P,rt),s.texParameteri(P,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(P,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let At=0;At<W;At++)P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY?s.texImage3D(J,0,s.RGBA,1,1,ot,0,s.RGBA,s.UNSIGNED_BYTE,nt):s.texImage2D(J+At,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,nt);return rt}let Pt={};Pt[s.TEXTURE_2D]=bt(s.TEXTURE_2D,s.TEXTURE_2D,1),Pt[s.TEXTURE_CUBE_MAP]=bt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Pt[s.TEXTURE_2D_ARRAY]=bt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Pt[s.TEXTURE_3D]=bt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),xt(s.DEPTH_TEST),a.setFunc(jn),$e(!1),ce(Ol),xt(s.CULL_FACE),Ce(An);function xt(P){h[P]!==!0&&(s.enable(P),h[P]=!0)}function zt(P){h[P]!==!1&&(s.disable(P),h[P]=!1)}function pe(P,J){return u[P]!==J?(s.bindFramebuffer(P,J),u[P]=J,P===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=J),P===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=J),!0):!1}function Lt(P,J){let W=g,ot=!1;if(P){W=f.get(J),W===void 0&&(W=[],f.set(J,W));let nt=P.textures;if(W.length!==nt.length||W[0]!==s.COLOR_ATTACHMENT0){for(let rt=0,At=nt.length;rt<At;rt++)W[rt]=s.COLOR_ATTACHMENT0+rt;W.length=nt.length,ot=!0}}else W[0]!==s.BACK&&(W[0]=s.BACK,ot=!0);ot&&s.drawBuffers(W)}function te(P){return _!==P?(s.useProgram(P),_=P,!0):!1}let ie={[Rn]:s.FUNC_ADD,[Gh]:s.FUNC_SUBTRACT,[Vh]:s.FUNC_REVERSE_SUBTRACT};ie[Wh]=s.MIN,ie[Xh]=s.MAX;let Xt={[qh]:s.ZERO,[Yh]:s.ONE,[$h]:s.SRC_COLOR,[zl]:s.SRC_ALPHA,[tu]:s.SRC_ALPHA_SATURATE,[Qh]:s.DST_COLOR,[Jh]:s.DST_ALPHA,[Zh]:s.ONE_MINUS_SRC_COLOR,[Hl]:s.ONE_MINUS_SRC_ALPHA,[jh]:s.ONE_MINUS_DST_COLOR,[Kh]:s.ONE_MINUS_DST_ALPHA,[eu]:s.CONSTANT_COLOR,[iu]:s.ONE_MINUS_CONSTANT_COLOR,[nu]:s.CONSTANT_ALPHA,[su]:s.ONE_MINUS_CONSTANT_ALPHA};function Ce(P,J,W,ot,nt,rt,At,Gt,it,Rt){if(P===An){m===!0&&(zt(s.BLEND),m=!1);return}if(m===!1&&(xt(s.BLEND),m=!0),P!==Hh){if(P!==p||Rt!==C){if((S!==Rn||A!==Rn)&&(s.blendEquation(s.FUNC_ADD),S=Rn,A=Rn),Rt)switch(P){case Ji:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case cr:s.blendFunc(s.ONE,s.ONE);break;case Bl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case kl:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Dt("WebGLState: Invalid blending: ",P);break}else switch(P){case Ji:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case cr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Bl:Dt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case kl:Dt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Dt("WebGLState: Invalid blending: ",P);break}E=null,b=null,T=null,x=null,M.set(0,0,0),I=0,p=P,C=Rt}return}nt=nt||J,rt=rt||W,At=At||ot,(J!==S||nt!==A)&&(s.blendEquationSeparate(ie[J],ie[nt]),S=J,A=nt),(W!==E||ot!==b||rt!==T||At!==x)&&(s.blendFuncSeparate(Xt[W],Xt[ot],Xt[rt],Xt[At]),E=W,b=ot,T=rt,x=At),(Gt.equals(M)===!1||it!==I)&&(s.blendColor(Gt.r,Gt.g,Gt.b,it),M.copy(Gt),I=it),p=P,C=!1}function _e(P,J){P.side===qe?zt(s.CULL_FACE):xt(s.CULL_FACE);let W=P.side===Xe;J&&(W=!W),$e(W),P.blending===Ji&&P.transparent===!1?Ce(An):Ce(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);let ot=P.stencilWrite;o.setTest(ot),ot&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Me(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?xt(s.SAMPLE_ALPHA_TO_COVERAGE):zt(s.SAMPLE_ALPHA_TO_COVERAGE)}function $e(P){N!==P&&(P?s.frontFace(s.CW):s.frontFace(s.CCW),N=P)}function ce(P){P!==Bh?(xt(s.CULL_FACE),P!==F&&(P===Ol?s.cullFace(s.BACK):P===kh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):zt(s.CULL_FACE),F=P}function bi(P){P!==z&&(G&&s.lineWidth(P),z=P)}function Me(P,J,W){P?(xt(s.POLYGON_OFFSET_FILL),(L!==J||V!==W)&&(L=J,V=W,a.getReversed()&&(J=-J,W=-W),s.polygonOffset(J,W))):zt(s.POLYGON_OFFSET_FILL)}function ei(P){P?xt(s.SCISSOR_TEST):zt(s.SCISSOR_TEST)}function ii(P){P===void 0&&(P=s.TEXTURE0+q-1),Q!==P&&(s.activeTexture(P),Q=P)}function ni(P,J,W){W===void 0&&(Q===null?W=s.TEXTURE0+q-1:W=Q);let ot=j[W];ot===void 0&&(ot={type:void 0,texture:void 0},j[W]=ot),(ot.type!==P||ot.texture!==J)&&(Q!==W&&(s.activeTexture(W),Q=W),s.bindTexture(P,J||Pt[P]),ot.type=P,ot.texture=J)}function U(){let P=j[Q];P!==void 0&&P.type!==void 0&&(s.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function si(){try{s.compressedTexImage2D(...arguments)}catch(P){Dt("WebGLState:",P)}}function ae(){try{s.compressedTexImage3D(...arguments)}catch(P){Dt("WebGLState:",P)}}function oe(){try{s.texSubImage2D(...arguments)}catch(P){Dt("WebGLState:",P)}}function dt(){try{s.texSubImage3D(...arguments)}catch(P){Dt("WebGLState:",P)}}function ve(){try{s.compressedTexSubImage2D(...arguments)}catch(P){Dt("WebGLState:",P)}}function It(){try{s.compressedTexSubImage3D(...arguments)}catch(P){Dt("WebGLState:",P)}}function Ft(){try{s.texStorage2D(...arguments)}catch(P){Dt("WebGLState:",P)}}function w(){try{s.texStorage3D(...arguments)}catch(P){Dt("WebGLState:",P)}}function y(){try{s.texImage2D(...arguments)}catch(P){Dt("WebGLState:",P)}}function B(){try{s.texImage3D(...arguments)}catch(P){Dt("WebGLState:",P)}}function tt(P){return d[P]!==void 0?d[P]:s.getParameter(P)}function K(P,J){d[P]!==J&&(s.pixelStorei(P,J),d[P]=J)}function st(P){Z.equals(P)===!1&&(s.scissor(P.x,P.y,P.z,P.w),Z.copy(P))}function ht(P){gt.equals(P)===!1&&(s.viewport(P.x,P.y,P.z,P.w),gt.copy(P))}function Y(P,J){let W=c.get(J);W===void 0&&(W=new WeakMap,c.set(J,W));let ot=W.get(P);ot===void 0&&(ot=s.getUniformBlockIndex(J,P.name),s.uniformBlockBinding(J,ot,ot),W.set(P,ot))}function $(P,J,W){let nt=c.get(J).get(P);l[nt]!==W&&(s.bindBufferBase(s.UNIFORM_BUFFER,nt,W),l[nt]=W)}function at(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},Q=null,j={},u={},l={},f=new WeakMap,g=[],_=null,m=!1,p=null,S=null,E=null,b=null,A=null,T=null,x=null,M=new Nt(0,0,0),I=0,C=!1,N=null,F=null,z=null,L=null,V=null,Z.set(0,0,s.canvas.width,s.canvas.height),gt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:xt,disable:zt,bindFramebuffer:pe,drawBuffers:Lt,useProgram:te,setBlending:Ce,setMaterial:_e,setFlipSided:$e,setCullFace:ce,setLineWidth:bi,setPolygonOffset:Me,setScissorTest:ei,activeTexture:ii,bindTexture:ni,unbindTexture:U,compressedTexImage2D:si,compressedTexImage3D:ae,texImage2D:y,texImage3D:B,pixelStorei:K,getParameter:tt,updateUBOMapping:Y,uniformBlockBinding:$,texStorage2D:Ft,texStorage3D:w,texSubImage2D:oe,texSubImage3D:dt,compressedTexSubImage2D:ve,compressedTexSubImage3D:It,scissor:st,viewport:ht,reset:at}}function Ex(s,t,e,i,n,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new vt,h=new WeakMap,d=new Set,u,f=new WeakMap,g=new Set,_=new FinalizationRegistry(w=>g.delete(w)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(w,y){return m?new OffscreenCanvas(w,y):Fs("canvas")}function S(w,y,B){let tt=1,K=Ft(w);if((K.width>B||K.height>B)&&(tt=B/Math.max(K.width,K.height)),tt<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let st=Math.floor(tt*K.width),ht=Math.floor(tt*K.height);u===void 0&&(u=p(st,ht));let Y=y?p(st,ht):u;return Y.width=st,Y.height=ht,Y.getContext("2d").drawImage(w,0,0,st,ht),Ct("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+st+"x"+ht+")."),Y}else return"data"in w&&Ct("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),w;return w}function E(w){return w.generateMipmaps}function b(w){s.generateMipmap(w)}function A(w){return w.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?s.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function T(w,y,B,tt,K,st=!1){if(w!==null){if(s[w]!==void 0)return s[w];Ct("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ht;tt&&(ht=t.get("EXT_texture_norm16"),ht||Ct("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=y;if(y===s.RED&&(B===s.FLOAT&&(Y=s.R32F),B===s.HALF_FLOAT&&(Y=s.R16F),B===s.UNSIGNED_BYTE&&(Y=s.R8),B===s.UNSIGNED_SHORT&&ht&&(Y=ht.R16_EXT),B===s.SHORT&&ht&&(Y=ht.R16_SNORM_EXT)),y===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.R8UI),B===s.UNSIGNED_SHORT&&(Y=s.R16UI),B===s.UNSIGNED_INT&&(Y=s.R32UI),B===s.BYTE&&(Y=s.R8I),B===s.SHORT&&(Y=s.R16I),B===s.INT&&(Y=s.R32I)),y===s.RG&&(B===s.FLOAT&&(Y=s.RG32F),B===s.HALF_FLOAT&&(Y=s.RG16F),B===s.UNSIGNED_BYTE&&(Y=s.RG8),B===s.UNSIGNED_SHORT&&ht&&(Y=ht.RG16_EXT),B===s.SHORT&&ht&&(Y=ht.RG16_SNORM_EXT)),y===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.RG8UI),B===s.UNSIGNED_SHORT&&(Y=s.RG16UI),B===s.UNSIGNED_INT&&(Y=s.RG32UI),B===s.BYTE&&(Y=s.RG8I),B===s.SHORT&&(Y=s.RG16I),B===s.INT&&(Y=s.RG32I)),y===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),B===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),B===s.UNSIGNED_INT&&(Y=s.RGB32UI),B===s.BYTE&&(Y=s.RGB8I),B===s.SHORT&&(Y=s.RGB16I),B===s.INT&&(Y=s.RGB32I)),y===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),B===s.UNSIGNED_INT&&(Y=s.RGBA32UI),B===s.BYTE&&(Y=s.RGBA8I),B===s.SHORT&&(Y=s.RGBA16I),B===s.INT&&(Y=s.RGBA32I)),y===s.RGB&&(B===s.UNSIGNED_SHORT&&ht&&(Y=ht.RGB16_EXT),B===s.SHORT&&ht&&(Y=ht.RGB16_SNORM_EXT),B===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),B===s.UNSIGNED_INT_10F_11F_11F_REV&&(Y=s.R11F_G11F_B10F)),y===s.RGBA){let $=st?Us:$t.getTransfer(K);B===s.FLOAT&&(Y=s.RGBA32F),B===s.HALF_FLOAT&&(Y=s.RGBA16F),B===s.UNSIGNED_BYTE&&(Y=$===jt?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT&&ht&&(Y=ht.RGBA16_EXT),B===s.SHORT&&ht&&(Y=ht.RGBA16_SNORM_EXT),B===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function x(w,y){let B;return w?y===null||y===gi||y===Pn?B=s.DEPTH24_STENCIL8:y===hi?B=s.DEPTH32F_STENCIL8:y===ps&&(B=s.DEPTH24_STENCIL8,Ct("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===gi||y===Pn?B=s.DEPTH_COMPONENT24:y===hi?B=s.DEPTH_COMPONENT32F:y===ps&&(B=s.DEPTH_COMPONENT16),B}function M(w,y){return E(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ae&&w.minFilter!==Ge?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function I(w){let y=new WeakRef(w);i.get(w).__ref=y,g.add(y),_.register(w,y,y)}function C(w){let y=i.get(w).__ref;y!==void 0&&(g.delete(y),_.unregister(y))}function N(w){z(w.target)}function F(w){L(w.target)}function z(w){w.removeEventListener("dispose",N),C(w),q(w),w.isVideoTexture&&h.delete(w),w.isHTMLTexture&&d.delete(w)}function L(w){w.removeEventListener("dispose",F),C(w),et(w)}function V(){for(let w of g){let y=w.deref();y!==void 0&&(y.isRenderTarget===!0?L(y):z(y))}g.clear(),d.clear()}function q(w){let y=i.get(w);if(y.__webglInit===void 0)return;let B=w.source,tt=f.get(B);if(tt){let K=tt[y.__cacheKey];K.usedTimes--,K.usedTimes===0&&G(w),Object.keys(tt).length===0&&f.delete(B)}i.remove(w)}function G(w){let y=i.get(w);s.deleteTexture(y.__webglTexture);let B=w.source,tt=f.get(B);delete tt[y.__cacheKey],a.memory.textures--}function et(w){let y=i.get(w);y.__depthDisposeCallback&&y.__depthDisposeCallback();let B=w.depthTexture;if(B&&B.renderTarget===w&&z(B),w.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(y.__webglFramebuffer[K]))for(let st=0;st<y.__webglFramebuffer[K].length;st++)s.deleteFramebuffer(y.__webglFramebuffer[K][st]);else s.deleteFramebuffer(y.__webglFramebuffer[K]);y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer[K])}else{if(Array.isArray(y.__webglFramebuffer))for(let K=0;K<y.__webglFramebuffer.length;K++)s.deleteFramebuffer(y.__webglFramebuffer[K]);else s.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&s.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let K=0;K<y.__webglColorRenderbuffer.length;K++)y.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(y.__webglColorRenderbuffer[K]);y.__webglDepthRenderbuffer&&s.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let tt=w.textures;for(let K=0,st=tt.length;K<st;K++){let ht=i.get(tt[K]);ht.__webglTexture&&(s.deleteTexture(ht.__webglTexture),a.memory.textures--),i.remove(tt[K])}i.remove(w)}let X=0;function Q(){X=0}function j(){return X}function Et(w){X=w}function Bt(){let w=X;return w>=n.maxTextures&&Ct("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+n.maxTextures),X+=1,w}function Z(w){let y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.mipmapsAutoUpdate),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function gt(w,y){let B=i.get(w);if(w.isVideoTexture&&ve(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&B.__version!==w.version){let tt=w.image;if(tt===null)Ct("WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)Ct("WebGLRenderer: Texture marked for update but image is incomplete");else{_e(B,w,y);return}}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+y)}function bt(w,y){let B=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){_e(B,w,y);return}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+y)}function Pt(w,y){let B=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){_e(B,w,y);return}e.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+y)}function xt(w,y){let B=i.get(w);if(w.version>0&&B.__version!==w.version){$e(B,w,y);return}e.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+y)}let zt={[pa]:s.REPEAT,[wi]:s.CLAMP_TO_EDGE,[ma]:s.MIRRORED_REPEAT},pe={[Ae]:s.NEAREST,[ou]:s.NEAREST_MIPMAP_NEAREST,[ur]:s.NEAREST_MIPMAP_LINEAR,[Ge]:s.LINEAR,[Za]:s.LINEAR_MIPMAP_NEAREST,[Ki]:s.LINEAR_MIPMAP_LINEAR},Lt={[uu]:s.NEVER,[sc]:s.ALWAYS,[du]:s.LESS,[ic]:s.LEQUAL,[fu]:s.EQUAL,[nc]:s.GEQUAL,[pu]:s.GREATER,[mu]:s.NOTEQUAL};function te(w,y){if(y.type===hi&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Ge||y.magFilter===Za||y.magFilter===ur||y.magFilter===Ki||y.minFilter===Ge||y.minFilter===Za||y.minFilter===ur||y.minFilter===Ki)&&Ct("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(w,s.TEXTURE_WRAP_S,zt[y.wrapS]),s.texParameteri(w,s.TEXTURE_WRAP_T,zt[y.wrapT]),(w===s.TEXTURE_3D||w===s.TEXTURE_2D_ARRAY)&&s.texParameteri(w,s.TEXTURE_WRAP_R,zt[y.wrapR]),s.texParameteri(w,s.TEXTURE_MAG_FILTER,pe[y.magFilter]),s.texParameteri(w,s.TEXTURE_MIN_FILTER,pe[y.minFilter]),y.compareFunction&&(s.texParameteri(w,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(w,s.TEXTURE_COMPARE_FUNC,Lt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ae||y.minFilter!==ur&&y.minFilter!==Ki||y.type===hi&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");s.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,n.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function ie(w,y){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",N),I(y));let tt=y.source,K=f.get(tt);K===void 0&&(K={},f.set(tt,K));let st=Z(y);if(st!==w.__cacheKey){K[st]===void 0&&(K[st]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,B=!0),K[st].usedTimes++;let ht=K[w.__cacheKey];ht!==void 0&&(K[w.__cacheKey].usedTimes--,ht.usedTimes===0&&G(y)),w.__cacheKey=st,w.__webglTexture=K[st].texture}return B}function Xt(w,y,B){return Math.floor(Math.floor(w/B)/y)}function Ce(w,y,B,tt){let st=w.updateRanges;if(st.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,y.width,y.height,B,tt,y.data);else{st.sort((P,J)=>P.start-J.start);let ht=0;for(let P=1;P<st.length;P++){let J=st[ht],W=st[P],ot=J.start+J.count,nt=Xt(W.start,y.width,4),rt=Xt(J.start,y.width,4);W.start<=ot+1&&nt===rt&&Xt(W.start+W.count-1,y.width,4)===nt?J.count=Math.max(J.count,W.start+W.count-J.start):(++ht,st[ht]=W)}st.length=ht+1;let Y=e.getParameter(s.UNPACK_ROW_LENGTH),$=e.getParameter(s.UNPACK_SKIP_PIXELS),at=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,y.width);for(let P=0,J=st.length;P<J;P++){let W=st[P],ot=Math.floor(W.start/4),nt=Math.ceil(W.count/4),rt=ot%y.width,At=Math.floor(ot/y.width),Gt=nt,it=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,rt),e.pixelStorei(s.UNPACK_SKIP_ROWS,At),e.texSubImage2D(s.TEXTURE_2D,0,rt,At,Gt,it,B,tt,y.data)}w.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,Y),e.pixelStorei(s.UNPACK_SKIP_PIXELS,$),e.pixelStorei(s.UNPACK_SKIP_ROWS,at)}}function _e(w,y,B){let tt=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(tt=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&(tt=s.TEXTURE_3D);let K=ie(w,y),st=y.source;e.bindTexture(tt,w.__webglTexture,s.TEXTURE0+B);let ht=i.get(st);if(st.version!==ht.__version||K===!0){if(e.activeTexture(s.TEXTURE0+B),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let it=$t.getPrimaries($t.workingColorSpace),Rt=y.colorSpace===ji?null:$t.getPrimaries(y.colorSpace),Ht=y.colorSpace===ji||it===Rt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ht)}e.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment);let $=S(y.image,!1,n.maxTextureSize);$=It(y,$);let at=r.convert(y.format,y.colorSpace),P=r.convert(y.type),J=T(y.internalFormat,at,P,y.normalized,y.colorSpace,y.isVideoTexture);te(tt,y);let W,ot=y.mipmaps,nt=y.isVideoTexture!==!0,rt=ht.__version===void 0||K===!0,At=st.dataReady,Gt=M(y,$);if(y.isDepthTexture)J=x(y.format===Qi,y.type),rt&&(nt?e.texStorage2D(s.TEXTURE_2D,1,J,$.width,$.height):e.texImage2D(s.TEXTURE_2D,0,J,$.width,$.height,0,at,P,null));else if(y.isDataTexture)if(ot.length>0){nt&&rt&&e.texStorage2D(s.TEXTURE_2D,Gt,J,ot[0].width,ot[0].height);for(let it=0,Rt=ot.length;it<Rt;it++)W=ot[it],nt?At&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,W.width,W.height,at,P,W.data):e.texImage2D(s.TEXTURE_2D,it,J,W.width,W.height,0,at,P,W.data);y.generateMipmaps=!1}else nt?(rt&&e.texStorage2D(s.TEXTURE_2D,Gt,J,$.width,$.height),At&&Ce(y,$,at,P)):e.texImage2D(s.TEXTURE_2D,0,J,$.width,$.height,0,at,P,$.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){nt&&rt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Gt,J,ot[0].width,ot[0].height,$.depth);for(let it=0,Rt=ot.length;it<Rt;it++)if(W=ot[it],y.format!==yi)if(at!==null)if(nt){if(At)if(y.layerUpdates.size>0){let Ht=mc(W.width,W.height,y.format,y.type);for(let pt of y.layerUpdates){let ee=W.data.subarray(pt*Ht/W.data.BYTES_PER_ELEMENT,(pt+1)*Ht/W.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,pt,W.width,W.height,1,at,ee)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,0,W.width,W.height,$.depth,at,W.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,it,J,W.width,W.height,$.depth,0,W.data,0,0);else Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else nt?At&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,0,W.width,W.height,$.depth,at,P,W.data):e.texImage3D(s.TEXTURE_2D_ARRAY,it,J,W.width,W.height,$.depth,0,at,P,W.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{nt&&rt&&e.texStorage2D(s.TEXTURE_2D,Gt,J,ot[0].width,ot[0].height);for(let it=0,Rt=ot.length;it<Rt;it++)W=ot[it],y.format!==yi?at!==null?nt?At&&e.compressedTexSubImage2D(s.TEXTURE_2D,it,0,0,W.width,W.height,at,W.data):e.compressedTexImage2D(s.TEXTURE_2D,it,J,W.width,W.height,0,W.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):nt?At&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,W.width,W.height,at,P,W.data):e.texImage2D(s.TEXTURE_2D,it,J,W.width,W.height,0,at,P,W.data)}else if(y.isDataArrayTexture)if(nt){if(rt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Gt,J,$.width,$.height,$.depth),At)if(y.layerUpdates.size>0){let it=mc($.width,$.height,y.format,y.type);for(let Rt of y.layerUpdates){let Ht=$.data.subarray(Rt*it/$.data.BYTES_PER_ELEMENT,(Rt+1)*it/$.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Rt,$.width,$.height,1,at,P,Ht)}y.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,at,P,$.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,J,$.width,$.height,$.depth,0,at,P,$.data);else if(y.isData3DTexture)nt?(rt&&e.texStorage3D(s.TEXTURE_3D,Gt,J,$.width,$.height,$.depth),At&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,at,P,$.data)):e.texImage3D(s.TEXTURE_3D,0,J,$.width,$.height,$.depth,0,at,P,$.data);else if(y.isFramebufferTexture){if(rt)if(nt)e.texStorage2D(s.TEXTURE_2D,Gt,J,$.width,$.height);else{let it=$.width,Rt=$.height;for(let Ht=0;Ht<Gt;Ht++)e.texImage2D(s.TEXTURE_2D,Ht,J,it,Rt,0,at,P,null),it>>=1,Rt>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in s){let it=s.canvas;if(it.hasAttribute("layoutsubtree")||it.setAttribute("layoutsubtree","true"),$.parentNode!==it){it.appendChild($),d.add(y),it.onpaint=Rt=>{let Ht=Rt.changedElements;for(let pt of d)Ht.includes(pt.image)&&(pt.needsUpdate=!0)},it.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,$);else{let Ht=s.RGBA,pt=s.RGBA,ee=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Ht,pt,ee,$)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(ot.length>0){if(nt&&rt){let it=Ft(ot[0]);e.texStorage2D(s.TEXTURE_2D,Gt,J,it.width,it.height)}for(let it=0,Rt=ot.length;it<Rt;it++)W=ot[it],nt?At&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,at,P,W):e.texImage2D(s.TEXTURE_2D,it,J,at,P,W);y.generateMipmaps=!1}else if(nt){if(rt){let it=Ft($);e.texStorage2D(s.TEXTURE_2D,Gt,J,it.width,it.height)}At&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,at,P,$)}else e.texImage2D(s.TEXTURE_2D,0,J,at,P,$);E(y)&&y.mipmapsAutoUpdate===!0&&b(tt),ht.__version=st.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function $e(w,y,B){if(y.image.length!==6)return;let tt=ie(w,y),K=y.source;e.bindTexture(s.TEXTURE_CUBE_MAP,w.__webglTexture,s.TEXTURE0+B);let st=i.get(K);if(K.version!==st.__version||tt===!0){e.activeTexture(s.TEXTURE0+B);let ht=$t.getPrimaries($t.workingColorSpace),Y=y.colorSpace===ji?null:$t.getPrimaries(y.colorSpace),$=y.colorSpace===ji||ht===Y?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);let at=y.isCompressedTexture||y.image[0].isCompressedTexture,P=y.image[0]&&y.image[0].isDataTexture,J=[];for(let pt=0;pt<6;pt++)!at&&!P?J[pt]=S(y.image[pt],!0,n.maxCubemapSize):J[pt]=P?y.image[pt].image:y.image[pt],J[pt]=It(y,J[pt]);let W=J[0],ot=r.convert(y.format,y.colorSpace),nt=r.convert(y.type),rt=T(y.internalFormat,ot,nt,y.normalized,y.colorSpace),At=y.isVideoTexture!==!0,Gt=st.__version===void 0||tt===!0,it=K.dataReady,Rt=M(y,W);te(s.TEXTURE_CUBE_MAP,y);let Ht;if(y.isDepthTexture){if(rt=x(y.format===Qi,y.type),Gt)if(At)e.texStorage2D(s.TEXTURE_CUBE_MAP,1,rt,W.width,W.height);else for(let pt=0;pt<6;pt++)e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,rt,W.width,W.height,0,ot,nt,null)}else if(at){At&&Gt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Rt,rt,W.width,W.height);for(let pt=0;pt<6;pt++){Ht=J[pt].mipmaps;for(let ee=0;ee<Ht.length;ee++){let we=Ht[ee];y.format!==yi?ot!==null?At?it&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee,0,0,we.width,we.height,ot,we.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee,rt,we.width,we.height,0,we.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):At?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee,0,0,we.width,we.height,ot,nt,we.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee,rt,we.width,we.height,0,ot,nt,we.data)}}}else{if(Ht=y.mipmaps,At&&Gt){Ht.length>0&&Rt++;let pt=Ft(J[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,Rt,rt,pt.width,pt.height)}for(let pt=0;pt<6;pt++)if(P){At?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,J[pt].width,J[pt].height,ot,nt,J[pt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,rt,J[pt].width,J[pt].height,0,ot,nt,J[pt].data);for(let ee=0;ee<Ht.length;ee++){let tn=Ht[ee].image[pt].image;At?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee+1,0,0,tn.width,tn.height,ot,nt,tn.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee+1,rt,tn.width,tn.height,0,ot,nt,tn.data)}}else{At?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,ot,nt,J[pt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,rt,ot,nt,J[pt]);for(let ee=0;ee<Ht.length;ee++){let we=Ht[ee];At?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee+1,0,0,ot,nt,we.image[pt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ee+1,rt,ot,nt,we.image[pt])}}}E(y)&&y.mipmapsAutoUpdate===!0&&b(s.TEXTURE_CUBE_MAP),st.__version=K.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function ce(w,y,B,tt,K,st){let ht=r.convert(B.format,B.colorSpace),Y=r.convert(B.type),$=T(B.internalFormat,ht,Y,B.normalized,B.colorSpace),at=i.get(y),P=i.get(B);if(P.__renderTarget=y,!at.__hasExternalTextures){let J=Math.max(1,y.width>>st),W=Math.max(1,y.height>>st);K===s.TEXTURE_3D||K===s.TEXTURE_2D_ARRAY?e.texImage3D(K,st,$,J,W,y.depth,0,ht,Y,null):e.texImage2D(K,st,$,J,W,0,ht,Y,null)}e.bindFramebuffer(s.FRAMEBUFFER,w),dt(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,tt,K,P.__webglTexture,0,oe(y)):(K===s.TEXTURE_2D||K>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,tt,K,P.__webglTexture,st),e.bindFramebuffer(s.FRAMEBUFFER,null)}function bi(w,y,B){if(s.bindRenderbuffer(s.RENDERBUFFER,w),y.depthBuffer){let tt=y.depthTexture,K=tt&&tt.isDepthTexture?tt.type:null,st=x(y.stencilBuffer,K),ht=y.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;dt(y)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,oe(y),st,y.width,y.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,oe(y),st,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,st,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ht,s.RENDERBUFFER,w)}else{let tt=y.textures;for(let K=0;K<tt.length;K++){let st=tt[K],ht=r.convert(st.format,st.colorSpace),Y=r.convert(st.type),$=T(st.internalFormat,ht,Y,st.normalized,st.colorSpace);dt(y)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,oe(y),$,y.width,y.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,oe(y),$,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,$,y.width,y.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Me(w,y,B){let tt=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=i.get(y.depthTexture);K.__renderTarget=y;let st=tt?y.depthTexture.image[0]:y.depthTexture.image;(!K.__webglTexture||st.width!==y.width||st.height!==y.height)&&(st.width=y.width,st.height=y.height,y.depthTexture.needsUpdate=!0),tt?xt(y.depthTexture,0):gt(y.depthTexture,0);let ht=K.__webglTexture,Y=oe(y),$=tt?s.TEXTURE_CUBE_MAP_POSITIVE_X+B:s.TEXTURE_2D,at=y.depthTexture.format===Qi?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(y.depthTexture.format===Vi)dt(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,at,$,ht,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,at,$,ht,0);else if(y.depthTexture.format===Qi)dt(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,at,$,ht,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,at,$,ht,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ei(w){let y=i.get(w),B=w.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==w.depthTexture){let tt=w.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),tt){let K=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,tt.removeEventListener("dispose",K)};tt.addEventListener("dispose",K),y.__depthDisposeCallback=K}y.__boundDepthTexture=tt}if(w.depthTexture&&!y.__autoAllocateDepthBuffer)if(B)for(let tt=0;tt<6;tt++)Me(y.__webglFramebuffer[tt],w,tt);else w.texture.mipmaps.length>0?Me(y.__webglFramebuffer[0],w,0):Me(y.__webglFramebuffer,w,0);else if(B){y.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[tt]),y.__webglDepthbuffer[tt]===void 0)y.__webglDepthbuffer[tt]=s.createRenderbuffer(),bi(y.__webglDepthbuffer[tt],w,!1);else{let K=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,st=y.__webglDepthbuffer[tt];s.bindRenderbuffer(s.RENDERBUFFER,st),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,st)}}else if(w.texture.mipmaps.length>0?e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=s.createRenderbuffer(),bi(y.__webglDepthbuffer,w,!1);else{let K=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,st=y.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,st),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,st)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function ii(w,y,B){let tt=i.get(w);y!==void 0&&ce(tt.__webglFramebuffer,w,w.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&ei(w)}function ni(w){let y=w.texture,B=i.get(w),tt=i.get(y);w.addEventListener("dispose",F),I(w);let K=w.textures,st=w.isWebGLCubeRenderTarget===!0,ht=K.length>1;if(ht||(tt.__webglTexture===void 0&&(tt.__webglTexture=s.createTexture()),tt.__version=y.version,a.memory.textures++),st){B.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(y.mipmaps.length>0){B.__webglFramebuffer[Y]=[];for(let $=0;$<y.mipmaps.length;$++)B.__webglFramebuffer[Y][$]=s.createFramebuffer()}else B.__webglFramebuffer[Y]=s.createFramebuffer()}else{if(y.mipmaps.length>0){B.__webglFramebuffer=[];for(let Y=0;Y<y.mipmaps.length;Y++)B.__webglFramebuffer[Y]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(ht)for(let Y=0,$=K.length;Y<$;Y++){let at=i.get(K[Y]);at.__webglTexture===void 0&&(at.__webglTexture=s.createTexture(),a.memory.textures++)}if(w.samples>0&&dt(w)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Y=0;Y<K.length;Y++){let $=K[Y];B.__webglColorRenderbuffer[Y]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[Y]);let at=r.convert($.format,$.colorSpace),P=r.convert($.type),J=T($.internalFormat,at,P,$.normalized,$.colorSpace,w.isXRRenderTarget===!0),W=oe(w);s.renderbufferStorageMultisample(s.RENDERBUFFER,W,J,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Y,s.RENDERBUFFER,B.__webglColorRenderbuffer[Y])}s.bindRenderbuffer(s.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),bi(B.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(st){e.bindTexture(s.TEXTURE_CUBE_MAP,tt.__webglTexture),te(s.TEXTURE_CUBE_MAP,y);for(let Y=0;Y<6;Y++)if(y.mipmaps.length>0)for(let $=0;$<y.mipmaps.length;$++)ce(B.__webglFramebuffer[Y][$],w,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,$);else ce(B.__webglFramebuffer[Y],w,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);E(y)?b(s.TEXTURE_CUBE_MAP):y.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}else if(ht){for(let Y=0,$=K.length;Y<$;Y++){let at=K[Y],P=i.get(at),J=s.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(J=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(J,P.__webglTexture),te(J,at),ce(B.__webglFramebuffer,w,at,s.COLOR_ATTACHMENT0+Y,J,0),E(at)&&b(J)}e.unbindTexture()}else{let Y=s.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Y=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Y,tt.__webglTexture),te(Y,y),y.mipmaps.length>0)for(let $=0;$<y.mipmaps.length;$++)ce(B.__webglFramebuffer[$],w,y,s.COLOR_ATTACHMENT0,Y,$);else ce(B.__webglFramebuffer,w,y,s.COLOR_ATTACHMENT0,Y,0);E(y)?b(Y):y.mipmaps.length>0&&s.texParameteri(Y,s.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}w.depthBuffer&&ei(w)}function U(w){let y=w.textures;for(let B=0,tt=y.length;B<tt;B++){let K=y[B];if(E(K)&&K.mipmapsAutoUpdate===!0){let st=A(w),ht=i.get(K).__webglTexture;e.bindTexture(st,ht),b(st),e.unbindTexture()}}}let si=[];function ae(w){if(w.samples>0){if(dt(w)===!1){let y=w.textures,B=w.width,tt=w.height,K=s.COLOR_BUFFER_BIT,st=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=i.get(w),Y=y.length>1;if(Y)for(let at=0;at<y.length;at++)e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer),w.texture.mipmaps.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let at=0;at<y.length;at++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(K|=s.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(K|=s.STENCIL_BUFFER_BIT)),Y){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ht.__webglColorRenderbuffer[at]);let P=i.get(y[at]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,P,0)}s.blitFramebuffer(0,0,B,tt,0,0,B,tt,K,s.NEAREST),l===!0&&(si.length=0,si.push(s.COLOR_ATTACHMENT0+at),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&si.push(st),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,si))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Y)for(let at=0;at<y.length;at++){e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.RENDERBUFFER,ht.__webglColorRenderbuffer[at]);let P=i.get(y[at]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,ht.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.TEXTURE_2D,P,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&l){let y=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[y])}}}function oe(w){return Math.min(n.maxSamples,w.samples)}function dt(w){let y=i.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function ve(w){let y=a.render.frame;h.get(w)!==y&&(h.set(w,y),w.update())}function It(w,y){let B=w.colorSpace,tt=w.format,K=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==Ns&&B!==ji&&($t.getTransfer(B)===jt?(tt!==yi||K!==Ze)&&Ct("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Dt("WebGLTextures: Unsupported texture color space:",B)),y}function Ft(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=Bt,this.resetTextureUnits=Q,this.getTextureUnits=j,this.setTextureUnits=Et,this.setTexture2D=gt,this.setTexture2DArray=bt,this.setTexture3D=Pt,this.setTextureCube=xt,this.rebindTextures=ii,this.setupRenderTarget=ni,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=ei,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=dt,this.dispose=V}function Tx(s,t){function e(i,n=ji){let r,a=$t.getTransfer(n);if(i===Ze)return s.UNSIGNED_BYTE;if(i===Ka)return s.UNSIGNED_SHORT_4_4_4_4;if(i===Qa)return s.UNSIGNED_SHORT_5_5_5_1;if(i===Ql)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===jl)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===Jl)return s.BYTE;if(i===Kl)return s.SHORT;if(i===ps)return s.UNSIGNED_SHORT;if(i===Ja)return s.INT;if(i===gi)return s.UNSIGNED_INT;if(i===hi)return s.FLOAT;if(i===xi)return s.HALF_FLOAT;if(i===tc)return s.ALPHA;if(i===ec)return s.RGB;if(i===yi)return s.RGBA;if(i===Vi)return s.DEPTH_COMPONENT;if(i===Qi)return s.DEPTH_STENCIL;if(i===ja)return s.RED;if(i===to)return s.RED_INTEGER;if(i===fn)return s.RG;if(i===eo)return s.RG_INTEGER;if(i===io)return s.RGBA_INTEGER;if(i===dr||i===fr||i===pr||i===mr)if(a===jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===dr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===dr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===fr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===pr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===mr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===no||i===so||i===ro||i===ao)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===no)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===so)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ro)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ao)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===oo||i===lo||i===co||i===ho||i===uo||i===gr||i===fo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===oo||i===lo)return a===jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===co)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===ho)return r.COMPRESSED_R11_EAC;if(i===uo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===gr)return r.COMPRESSED_RG11_EAC;if(i===fo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===po||i===mo||i===go||i===xo||i===yo||i===_o||i===vo||i===bo||i===So||i===Mo||i===wo||i===Eo||i===To||i===Ao)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===po)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===mo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===go)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===xo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===yo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===_o)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===bo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===So)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Mo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===wo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Eo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===To)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ao)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ro||i===Co||i===Po)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Ro)return a===jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Co)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Po)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Io||i===Lo||i===xr||i===Do)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Io)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Lo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Do)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Pn?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}var Ax=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Rx=`
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

}`,Cc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new Js(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Ii({vertexShader:Ax,fragmentShader:Rx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new wt(new Pi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Pc=class extends Ei{constructor(t,e){super();let i=this,n=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,_=typeof XRWebGLBinding<"u",m=new Cc,p={},S=e.getContextAttributes(),E=null,b=null,A=[],T=[],x=new vt,M=null,I=null,C=new Ue;C.viewport=new le;let N=new Ue;N.viewport=new le;let F=[C,N],z=new Xa,L=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let gt=A[Z];return gt===void 0&&(gt=new ss,A[Z]=gt),gt.getTargetRaySpace()},this.getControllerGrip=function(Z){let gt=A[Z];return gt===void 0&&(gt=new ss,A[Z]=gt),gt.getGripSpace()},this.getHand=function(Z){let gt=A[Z];return gt===void 0&&(gt=new ss,A[Z]=gt),gt.getHandSpace()};function q(Z){let gt=T.indexOf(Z.inputSource);if(gt===-1)return;let bt=A[gt];bt!==void 0&&(bt.update(Z.inputSource,Z.frame,c||a),bt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){n.removeEventListener("select",q),n.removeEventListener("selectstart",q),n.removeEventListener("selectend",q),n.removeEventListener("squeeze",q),n.removeEventListener("squeezestart",q),n.removeEventListener("squeezeend",q),n.removeEventListener("end",G),n.removeEventListener("inputsourceschange",et);for(let Z=0;Z<A.length;Z++){let gt=T[Z];gt!==null&&(T[Z]=null,A[Z].disconnect(gt))}L=null,V=null,m.reset();for(let Z in p)delete p[Z];if(t.setRenderTarget(E),f=null,u=null,d=null,n=null,b=null,Bt.stop(),i.isPresenting=!1,t.setPixelRatio(M),t.setSize(x.width,x.height,!1),I!==null){let Z=I.camera;Z.fov=I.fov,Z.zoom=I.zoom,Z.updateProjectionMatrix(),I=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,i.isPresenting===!0&&Ct("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&Ct("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(n,e)),d},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(Z){if(n=Z,n!==null){if(E=t.getRenderTarget(),n.addEventListener("select",q),n.addEventListener("selectstart",q),n.addEventListener("selectend",q),n.addEventListener("squeeze",q),n.addEventListener("squeezestart",q),n.addEventListener("squeezeend",q),n.addEventListener("end",G),n.addEventListener("inputsourceschange",et),S.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Pt=null,xt=null;S.depth&&(xt=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,bt=S.stencil?Qi:Vi,Pt=S.stencil?Pn:gi);let zt={colorFormat:e.RGBA8,depthFormat:xt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(zt),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),b=new je(u.textureWidth,u.textureHeight,{format:yi,type:Ze,depthTexture:new qi(u.textureWidth,u.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let bt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(n,e,bt),n.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new je(f.framebufferWidth,f.framebufferHeight,{format:yi,type:Ze,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),Bt.setContext(n),Bt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function et(Z){for(let gt=0;gt<Z.removed.length;gt++){let bt=Z.removed[gt],Pt=T.indexOf(bt);Pt>=0&&(T[Pt]=null,A[Pt].disconnect(bt))}for(let gt=0;gt<Z.added.length;gt++){let bt=Z.added[gt],Pt=T.indexOf(bt);if(Pt===-1){for(let zt=0;zt<A.length;zt++)if(zt>=T.length){T.push(bt),Pt=zt;break}else if(T[zt]===null){T[zt]=bt,Pt=zt;break}if(Pt===-1)break}let xt=A[Pt];xt&&xt.connect(bt)}}function X(Z,gt){gt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(gt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(n===null)return;let gt=Z.near,bt=Z.far;m.texture!==null&&(m.depthNear>0&&(gt=m.depthNear),m.depthFar>0&&(bt=m.depthFar)),z.near=N.near=C.near=gt,z.far=N.far=C.far=bt,(L!==z.near||V!==z.far)&&(n.updateRenderState({depthNear:z.near,depthFar:z.far}),L=z.near,V=z.far),z.layers.mask=Z.layers.mask|6,C.layers.mask=z.layers.mask&-5,N.layers.mask=z.layers.mask&-3;let Pt=Z.parent,xt=z.cameras;X(z,Pt);for(let zt=0;zt<xt.length;zt++)X(xt[zt],Pt);z.projectionMatrix.copy(C.projectionMatrix),z.projectionMatrixInverse.copy(C.projectionMatrixInverse),I===null&&Z.isPerspectiveCamera&&(I={camera:Z,fov:Z.fov,zoom:Z.zoom}),Q(Z,z,Pt)};function Q(Z,gt,bt){bt===null?Z.matrix.copy(gt.matrixWorld):(Z.matrix.copy(bt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(gt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(gt.projectionMatrix),Z.projectionMatrixInverse.copy(gt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Sn*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(Z){return p[Z]};let j=null;function Et(Z,gt){if(h=gt.getViewerPose(c||a),g=gt,h!==null){let bt=h.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let Pt=!1;bt.length!==z.cameras.length&&(z.cameras.length=0,Pt=!0);for(let Lt=0;Lt<bt.length;Lt++){let te=bt[Lt],ie=null;if(f!==null)ie=f.getViewport(te);else{let Ce=d.getViewSubImage(u,te);ie=Ce.viewport,Lt===0&&(t.setRenderTargetTextures(b,Ce.colorTexture,Ce.depthStencilTexture),t.setRenderTarget(b))}let Xt=F[Lt];Xt===void 0&&(Xt=new Ue,Xt.layers.enable(Lt),Xt.viewport=new le,F[Lt]=Xt),Xt.matrix.fromArray(te.transform.matrix),Xt.matrix.decompose(Xt.position,Xt.quaternion,Xt.scale),Xt.projectionMatrix.fromArray(te.projectionMatrix),Xt.projectionMatrixInverse.copy(Xt.projectionMatrix).invert(),Xt.viewport.set(ie.x,ie.y,ie.width,ie.height),Lt===0&&(z.matrix.copy(Xt.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Pt===!0&&z.cameras.push(Xt)}let xt=n.enabledFeatures;if(xt&&xt.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&_){d=i.getBinding();let Lt=d.getDepthInformation(bt[0]);Lt&&Lt.isValid&&Lt.texture&&m.init(Lt,n.renderState)}if(xt&&xt.includes("camera-access")&&_){t.state.unbindTexture(),d=i.getBinding();for(let Lt=0;Lt<bt.length;Lt++){let te=bt[Lt].camera;if(te){let ie=p[te];ie||(ie=new Js,p[te]=ie);let Xt=d.getCameraImage(te);ie.sourceTexture=Xt}}}}for(let bt=0;bt<A.length;bt++){let Pt=T[bt],xt=A[bt];Pt!==null&&xt!==void 0&&xt.update(Pt,gt,c||a)}j&&j(Z,gt),gt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:gt}),g=null}let Bt=new qu;Bt.setAnimationLoop(Et),this.setAnimationLoop=function(Z){j=Z},this.dispose=function(){}}},Cx=new Zt,id=new Ut;id.set(-1,0,0,0,1,0,0,0,1);function Px(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,dc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,S,E,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,S,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Xe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Xe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let S=t.get(p),E=S.envMap,b=S.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(Cx.makeRotationFromEuler(b)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(id),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=E*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.diffuseRoughness>0&&(m.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=p.diffuseRoughnessMap,e(p.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Ix(s,t,e,i){let n={},r={};function a(S,E){let b=E.program;i.uniformBlockBinding(S,b,n[S.id])}function o(S,E){let b=n[S.id];b===void 0&&(g(S),b=l(S),n[S.id]=b,S.addEventListener("dispose",m));let A=E.program;i.updateUBOMapping(S,A);let T=t.render.frame;r[S.id]!==T&&(c(S),r[S.id]=T)}function l(S){let E=s.createBuffer(),b=S.__size,A=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,E),s.bufferData(s.UNIFORM_BUFFER,b,A),s.bindBuffer(s.UNIFORM_BUFFER,null),E}function c(S){let E=n[S.id],b=S.uniforms,A=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let T=0,x=b.length;T<x;T++){let M=b[T];if(Array.isArray(M))for(let I=0,C=M.length;I<C;I++)h(M[I],T,I,A);else h(M,T,0,A)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(S,E,b,A){if(u(S,E,b,A)===!0){let T=S.__offset,x=S.value;if(Array.isArray(x)){let M=0;for(let I=0;I<x.length;I++){let C=x[I],N=_(C,!0);d(C,S.__data,M),M+=N.storage/Float32Array.BYTES_PER_ELEMENT}}else d(x,S.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,T,S.__data)}}function d(S,E,b){typeof S=="number"||typeof S=="boolean"?E[b]=S:S.isMatrix3?(E[b]=S.elements[0],E[b+1]=S.elements[1],E[b+2]=S.elements[2],E[b+3]=0,E[b+4]=S.elements[3],E[b+5]=S.elements[4],E[b+6]=S.elements[5],E[b+7]=0,E[b+8]=S.elements[6],E[b+9]=S.elements[7],E[b+10]=S.elements[8],E[b+11]=0):ArrayBuffer.isView(S)?E.set(S.subarray(0,E.length-b),b):S.toArray(E,b)}function u(S,E,b,A){let T=S.value,x=E+"_"+b;if(Array.isArray(T)){A[x]===void 0&&(A[x]=[]);let M=A[x],I=!1;for(let C=0;C<T.length;C++)f(T[C],M,C)===!0&&(I=!0);return I}return f(T,A,x)}function f(S,E,b){if(E[b]===void 0)return typeof S=="number"||typeof S=="boolean"?E[b]=S:ArrayBuffer.isView(S)?E[b]=S.slice():E[b]=S.clone(),!0;{let A=E[b];if(typeof S=="number"||typeof S=="boolean"){if(A!==S)return E[b]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(A.equals(S)===!1)return A.copy(S),!0}}return!1}function g(S){let E=S.uniforms,b=0,A=16;for(let x=0,M=E.length;x<M;x++){let I=Array.isArray(E[x])?E[x]:[E[x]];for(let C=0,N=I.length;C<N;C++){let F=I[C],z=Array.isArray(F.value)?F.value:[F.value],L=Array.isArray(E[x])||Array.isArray(F.value),V=b;for(let G=0,et=z.length;G<et;G++){let X=z[G],Q=_(X,L),j=b%A,Et=j%Q.boundary,Bt=j+Et;b+=Et,Bt!==0&&A-Bt<Q.storage&&(b+=A-Bt),G===0&&(V=b),b+=Q.storage}let q=F.type==="int"?Int32Array:F.type==="uint"?Uint32Array:Float32Array;F.__data=new q((b-V)/Float32Array.BYTES_PER_ELEMENT),F.__offset=V}}let T=b%A;return T>0&&(b+=A-T),S.__size=b,S.__cache={},this}function _(S,E){let b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=16,b.storage=48):S.isMatrix4?(b.boundary=16,b.storage=64):S.isTexture?Ct("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(b.boundary=16,b.storage=S.byteLength):Ct("WebGLRenderer: Unsupported uniform value type.",S),E===!0&&(b.boundary=16,b.storage=Math.ceil(b.storage/16)*16),b}function m(S){let E=S.target;E.removeEventListener("dispose",m),s.deleteBuffer(n[E.id]),delete n[E.id],delete r[E.id]}function p(){for(let S in n)s.deleteBuffer(n[S]);n={},r={}}return{bind:a,update:o,dispose:p}}var Lx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ni=null;function Dx(){return Ni===null&&(Ni=new Xs(Lx,16,16,fn,xi),Ni.name="DFG_LUT",Ni.minFilter=Ge,Ni.magFilter=Ge,Ni.wrapS=wi,Ni.wrapT=wi,Ni.generateMipmaps=!1,Ni.needsUpdate=!0),Ni}var ko=class{constructor(t={}){let{canvas:e=gu(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Ze}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let _=f,m=new Set([io,eo,to]),p=new Set([Ze,gi,ps,Pn,Ka,Qa]),S=new Uint32Array(4),E=new Int32Array(4),b={textures:[],min:[],max:[],resolution:[]},A=null,T=null,x=[],M=[],I=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,N=!1,F=null,z=null,L=null,V=null;this._outputColorSpace=xe;let q=0,G=0,et=null,X=-1,Q=null,j=new le,Et=new le,Bt=null,Z=new Nt(0),gt=0,bt=e.width,Pt=e.height,xt=1,zt=null,pe=null,Lt=new le(0,0,bt,Pt),te=new le(0,0,bt,Pt),ie=!1,Xt=new ln,Ce=new ba,_e=!1,$e=!1,ce=new Zt,bi=new R,Me=new le,ei={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ii=!1;function ni(){return et===null?xt:1}let U=i;function si(v,D){return e.getContext(v,D)}let ae,oe,dt,ve,It,Ft,w,y,B,tt,K,st,ht,Y,$,at,P,J,W,ot,nt,rt,At;try{let v={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Rt,!1),e.addEventListener("webglcontextrestored",Ht,!1),e.addEventListener("webglcontextcreationerror",pt,!1),U===null){let D="webgl2";if(U=si(D,v),U===null)throw si(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Gt()}catch(v){throw e.removeEventListener("webglcontextlost",Rt,!1),e.removeEventListener("webglcontextrestored",Ht,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),Dt("WebGLRenderer: "+v.message),v}function Gt(){ae=new Wg(U),ae.init(),nt=new Tx(U,ae),oe=new Dg(U,ae,t,nt),dt=new wx(U,ae),oe.reversedDepthBuffer&&u&&dt.buffers.depth.setReversed(!0),z=U.createFramebuffer(),L=U.createFramebuffer(),V=U.createFramebuffer(),ve=new Yg(U),It=new hx,Ft=new Ex(U,ae,dt,It,oe,nt,ve),w=new Vg(C),y=new Zf(U),rt=new Ig(U,y),B=new Xg(U,y,ve,rt),tt=new Zg(U,B,y,rt,ve),J=new $g(U,oe,Ft),$=new Ng(It),K=new cx(C,w,ae,oe,rt,$),st=new Px(C,It),ht=new dx,Y=new yx(ae),P=new Pg(C,w,dt,tt,g,l),at=new Mx(C,tt,oe),At=new Ix(U,ve,oe,dt),W=new Lg(U,ae,ve),ot=new qg(U,ae,ve),ve.programs=K.programs,C.capabilities=oe,C.extensions=ae,C.properties=It,C.renderLists=ht,C.shadowMap=at,C.state=dt,C.info=ve}_!==Ze&&(I=new Kg(_,e.width,e.height,o,n,r));let it=new Pc(C,U);this.xr=it,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let v=ae.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=ae.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return xt},this.setPixelRatio=function(v){v!==void 0&&(xt=v,this.setSize(bt,Pt,!1))},this.getSize=function(v){return v.set(bt,Pt)},this.setSize=function(v,D,H=!0){if(it.isPresenting){Ct("WebGLRenderer: Can't change size while VR device is presenting.");return}bt=v,Pt=D,e.width=Math.floor(v*xt),e.height=Math.floor(D*xt),H===!0&&(e.style.width=v+"px",e.style.height=D+"px"),I!==null&&I.setSize(e.width,e.height),this.setViewport(0,0,v,D)},this.getDrawingBufferSize=function(v){return v.set(bt*xt,Pt*xt).floor()},this.setDrawingBufferSize=function(v,D,H){bt=v,Pt=D,xt=H,e.width=Math.floor(v*H),e.height=Math.floor(D*H),this.setViewport(0,0,v,D)},this.setEffects=function(v){if(_===Ze){Dt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let D=0;D<v.length;D++)if(v[D].isOutputPass===!0){Ct("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(j)},this.getViewport=function(v){return v.copy(Lt)},this.setViewport=function(v,D,H,O){v.isVector4?Lt.set(v.x,v.y,v.z,v.w):Lt.set(v,D,H,O),dt.viewport(j.copy(Lt).multiplyScalar(ni()).round())},this.getScissor=function(v){return v.copy(te)},this.setScissor=function(v,D,H,O){v.isVector4?te.set(v.x,v.y,v.z,v.w):te.set(v,D,H,O),dt.scissor(Et.copy(te).multiplyScalar(ni()).round())},this.getScissorTest=function(){return ie},this.setScissorTest=function(v){dt.setScissorTest(ie=v)},this.setOpaqueSort=function(v){zt=v},this.setTransparentSort=function(v){pe=v},this.getClearColor=function(v){return v.copy(P.getClearColor())},this.setClearColor=function(){P.setClearColor(...arguments)},this.getClearAlpha=function(){return P.getClearAlpha()},this.setClearAlpha=function(){P.setClearAlpha(...arguments)},this.clear=function(v=!0,D=!0,H=!0){let O=0;if(v){let k=!1;if(et!==null){let ut=et.texture.format;k=m.has(ut)}if(k){let ut=et.texture.type,_t=p.has(ut),ct=P.getClearColor(),yt=P.getClearAlpha(),Tt=ct.r,kt=ct.g,qt=ct.b;_t?(S[0]=Tt,S[1]=kt,S[2]=qt,S[3]=yt,U.clearBufferuiv(U.COLOR,0,S)):(E[0]=Tt,E[1]=kt,E[2]=qt,E[3]=yt,U.clearBufferiv(U.COLOR,0,E))}else O|=U.COLOR_BUFFER_BIT}D&&(O|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(O|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&U.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),F=v},this.dispose=function(){e.removeEventListener("webglcontextlost",Rt,!1),e.removeEventListener("webglcontextrestored",Ht,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),P.dispose(),ht.dispose(),Y.dispose(),Ft.dispose(),It.dispose(),w.dispose(),tt.dispose(),B.dispose(),rt.dispose(),At.dispose(),K.dispose(),it.dispose(),it.removeEventListener("sessionstart",zc),it.removeEventListener("sessionend",Hc),mn.stop()};function Rt(v){v.preventDefault(),Os("WebGLRenderer: Context Lost."),N=!0}function Ht(){Os("WebGLRenderer: Context Restored."),N=!1;let v=ve.autoReset,D=at.enabled,H=at.autoUpdate,O=at.needsUpdate,k=at.type;Gt(),ve.autoReset=v,at.enabled=D,at.autoUpdate=H,at.needsUpdate=O,at.type=k}function pt(v){Dt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function ee(v){let D=v.target;D.removeEventListener("dispose",ee),we(D)}function we(v){tn(v),It.remove(v)}function tn(v){let D=It.get(v).programs;D!==void 0&&(D.forEach(function(H){K.releaseProgram(H)}),v.isShaderMaterial&&K.releaseShaderCache(v))}this.renderBufferDirect=function(v,D,H,O,k,ut){D===null&&(D=ei);let _t=k.isMesh&&k.matrixWorld.determinantAffine()<0,ct=Dd(v,D,H,O,k);dt.setMaterial(O,_t);let yt=H.index,Tt=1;if(O.wireframe===!0){if(yt=B.getWireframeAttribute(H),yt===void 0)return;Tt=2}let kt=H.drawRange,qt=H.attributes.position,St=kt.start*Tt,Yt=(kt.start+kt.count)*Tt;ut!==null&&(St=Math.max(St,ut.start*Tt),Yt=Math.min(Yt,(ut.start+ut.count)*Tt)),yt!==null?(St=Math.max(St,0),Yt=Math.min(Yt,yt.count)):qt!=null&&(St=Math.max(St,0),Yt=Math.min(Yt,qt.count));let me=Yt-St;if(me<0||me===1/0)return;rt.setup(k,O,ct,H,yt);let se,ne=W;if(yt!==null&&(se=y.get(yt),ne=ot,ne.setIndex(se)),k.isMesh)O.wireframe===!0?(dt.setLineWidth(O.wireframeLinewidth*ni()),ne.setMode(U.LINES)):ne.setMode(U.TRIANGLES);else if(k.isLine){let Ie=O.linewidth;Ie===void 0&&(Ie=1),dt.setLineWidth(Ie*ni()),k.isLineSegments?ne.setMode(U.LINES):k.isLineLoop?ne.setMode(U.LINE_LOOP):ne.setMode(U.LINE_STRIP)}else k.isPoints?ne.setMode(U.POINTS):k.isSprite&&ne.setMode(U.TRIANGLES);if(k.isBatchedMesh)if(ae.get("WEBGL_multi_draw"))ne.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Ie=k._multiDrawStarts,Mt=k._multiDrawCounts,ke=k._multiDrawCount,Qt=yt?y.get(yt).bytesPerElement:1,gn=It.get(O).currentProgram.getUniforms();for(let Le=0;Le<ke;Le++)gn.setValue(U,"_gl_DrawID",Le),ne.render(Ie[Le]/Qt,Mt[Le])}else if(k.isInstancedMesh)ne.renderInstances(St,me,k.count);else if(H.isInstancedBufferGeometry){let Ie=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Mt=Math.min(H.instanceCount,Ie);ne.renderInstances(St,me,Mt)}else ne.render(St,me)};function kc(v,D,H,O){F!==null&&v.isNodeMaterial&&F.setObject(O,v),_e===!0&&$.setState(v,H,!1),v.transparent===!0&&v.side===qe&&v.forceSinglePass===!1?(v.side=Xe,v.needsUpdate=!0,ys(v,D,O),v.side=Li,v.needsUpdate=!0,ys(v,D,O),v.side=qe):ys(v,D,O)}this.compile=function(v,D,H=null){H===null&&(H=v),F!==null&&F.renderStart(v,D,H),T=Y.get(H),T.init(D),M.push(T),H.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(T.pushLight(k),k.castShadow&&T.pushShadow(k))}),v!==H&&v.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(T.pushLight(k),k.castShadow&&T.pushShadow(k))}),T.setupLights(),F!==null&&F.updateLights(T.state.lightsArray),$e=this.localClippingEnabled,_e=$.init(this.clippingPlanes,$e),_e===!0&&$.setGlobalState(this.clippingPlanes,D),F!==null&&at.render(T.state.shadowsArray,H,D);let O=new Set;return v.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let ut=k.material;if(ut)if(Array.isArray(ut))for(let _t=0;_t<ut.length;_t++){let ct=ut[_t];kc(ct,H,D,k),O.add(ct)}else kc(ut,H,D,k),O.add(ut)}),T=M.pop(),F!==null&&F.renderEnd(),O},this.compileAsync=function(v,D,H=null){let O=this.compile(v,D,H);return new Promise(k=>{function ut(){if(O.forEach(function(_t){let yt=It.get(_t).currentProgram;(yt===void 0||yt.isReady())&&O.delete(_t)}),O.size===0){k(v);return}setTimeout(ut,10)}ae.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let Zo=null;function Id(v){Zo&&Zo(v)}function zc(){mn.stop()}function Hc(){mn.start()}let mn=new qu;mn.setAnimationLoop(Id),typeof self<"u"&&mn.setContext(self),this.setAnimationLoop=function(v){Zo=v,it.setAnimationLoop(v),v===null?mn.stop():mn.start()},it.addEventListener("sessionstart",zc),it.addEventListener("sessionend",Hc),this.render=function(v,D){if(D!==void 0&&D.isCamera!==!0){Dt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;F!==null&&F.renderStart(v,D);let H=it.enabled===!0&&it.isPresenting===!0,O=I!==null&&(et===null||H)&&I.begin(C,et);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(it.cameraAutoUpdate===!0&&it.updateCamera(D),D=it.getCamera()),v.isScene===!0&&v.onBeforeRender(C,v,D,et),T=Y.get(v,M.length),T.init(D),T.state.textureUnits=Ft.getTextureUnits(),M.push(T),ce.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),D.isArrayCamera?Ce.setFromArrayCamera(D):Xt.setFromProjectionMatrix(ce,oi,D.reversedDepth),$e=this.localClippingEnabled,_e=$.init(this.clippingPlanes,$e),A=ht.get(v,x.length),A.init(),x.push(A),this.info.render.frame++,it.enabled===!0&&it.isPresenting===!0){let _t=C.xr.getDepthSensingMesh();_t!==null&&Jo(_t,D,-1/0,C.sortObjects)}Jo(v,D,0,C.sortObjects),A.finish(),F!==null&&F.updateLights(T.state.lightsArray),C.sortObjects===!0&&A.sort(zt,pe),ii=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,ii&&P.addToRenderList(A,v),this.info.autoReset===!0&&this.info.reset(),_e===!0&&$.beginShadows();let k=T.state.shadowsArray;if(at.render(k,v,D),_e===!0&&$.endShadows(),(O&&I.hasRenderPass())===!1){let _t=A.opaque,ct=A.transmissive;if(T.setupLights(),D.isArrayCamera){let yt=D.cameras;if(ct.length>0)for(let Tt=0,kt=yt.length;Tt<kt;Tt++){let qt=yt[Tt];Vc(_t,ct,v,qt)}ii&&P.render(v);for(let Tt=0,kt=yt.length;Tt<kt;Tt++){let qt=yt[Tt];Gc(A,v,qt,qt.viewport)}}else ct.length>0&&Vc(_t,ct,v,D),ii&&P.render(v),Gc(A,v,D)}et!==null&&G===0&&(Ft.updateMultisampleRenderTarget(et),Ft.updateRenderTargetMipmap(et)),O&&I.end(C),v.isScene===!0&&v.onAfterRender(C,v,D),rt.resetDefaultState(),X=-1,Q=null,M.pop(),M.length>0?(T=M[M.length-1],Ft.setTextureUnits(T.state.textureUnits),_e===!0&&$.setGlobalState(C.clippingPlanes,T.state.camera)):T=null,x.pop(),x.length>0?A=x[x.length-1]:A=null,F!==null&&F.renderEnd()};function Jo(v,D,H,O){if(v.visible===!1)return;if(v.layers.test(D.layers)){if(v.isGroup)H=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(D);else if(v.isLight)T.pushLight(v),v.castShadow&&T.pushShadow(v);else if(v.isSprite){let _t=D.isArrayCamera?Ce:Xt;if(!v.frustumCulled||v.intersectsFrustum(_t)){O&&Me.setFromMatrixPosition(v.matrixWorld).applyMatrix4(ce);let ct=tt.update(v),yt=v.material;yt.visible&&A.push(v,ct,yt,H,Me.z,null,D)}}else if(v.isMesh||v.isLine||v.isPoints){let _t=D.isArrayCamera?Ce:Xt;if(!v.frustumCulled||v.intersectsFrustum(_t)){let ct=tt.update(v),yt=v.material;if(O&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Me.copy(v.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Me.copy(ct.boundingSphere.center)),Me.applyMatrix4(v.matrixWorld).applyMatrix4(ce)),Array.isArray(yt)){let Tt=ct.groups;for(let kt=0,qt=Tt.length;kt<qt;kt++){let St=Tt[kt],Yt=yt[St.materialIndex];Yt&&Yt.visible&&A.push(v,ct,Yt,H,Me.z,St,D)}}else yt.visible&&A.push(v,ct,yt,H,Me.z,null,D)}}}let ut=v.children;for(let _t=0,ct=ut.length;_t<ct;_t++)Jo(ut[_t],D,H,O)}function Gc(v,D,H,O){let{opaque:k,transmissive:ut,transparent:_t}=v;T.setupLightsView(H),_e===!0&&$.setGlobalState(C.clippingPlanes,H),O&&dt.viewport(j.copy(O)),k.length>0&&Mr(k,D,H),ut.length>0&&Mr(ut,D,H),_t.length>0&&Mr(_t,D,H),dt.buffers.depth.setTest(!0),dt.buffers.depth.setMask(!0),dt.buffers.color.setMask(!0),dt.setPolygonOffset(!1)}function Vc(v,D,H,O){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[O.id]===void 0){let St=ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[O.id]=new je(1,1,{generateMipmaps:!0,type:St?xi:Ze,minFilter:Ki,samples:Math.max(4,oe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:$t.workingColorSpace})}let ut=T.state.transmissionRenderTarget[O.id],_t=O.viewport||j;ut.setSize(_t.z*C.transmissionResolutionScale,_t.w*C.transmissionResolutionScale);let ct=C.getRenderTarget(),yt=C.getActiveCubeFace(),Tt=C.getActiveMipmapLevel();C.setRenderTarget(ut),C.getClearColor(Z),gt=C.getClearAlpha(),gt<1&&C.setClearColor(16777215,.5),C.clear(),ii&&P.render(H);let kt=C.toneMapping;C.toneMapping=Di;let qt=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),T.setupLightsView(O),_e===!0&&$.setGlobalState(C.clippingPlanes,O),Mr(v,H,O),Ft.updateMultisampleRenderTarget(ut),Ft.updateRenderTargetMipmap(ut),ae.has("WEBGL_multisampled_render_to_texture")===!1){let St=!1;for(let Yt=0,me=D.length;Yt<me;Yt++){let se=D[Yt],{object:ne,geometry:Ie,material:Mt,group:ke}=se;if(Mt.side===qe&&ne.layers.test(O.layers)){let Qt=Mt.side;Mt.side=Xe,Mt.needsUpdate=!0,Wc(ne,H,O,Ie,Mt,ke),Mt.side=Qt,Mt.needsUpdate=!0,St=!0}}St===!0&&(Ft.updateMultisampleRenderTarget(ut),Ft.updateRenderTargetMipmap(ut))}C.setRenderTarget(ct,yt,Tt),C.setClearColor(Z,gt),qt!==void 0&&(O.viewport=qt),C.toneMapping=kt}function Mr(v,D,H){let O=D.isScene===!0?D.overrideMaterial:null;for(let k=0,ut=v.length;k<ut;k++){let _t=v[k],{object:ct,geometry:yt,group:Tt}=_t,kt=_t.material;kt.allowOverride===!0&&O!==null&&(kt=O),ct.layers.test(H.layers)&&Wc(ct,D,H,yt,kt,Tt)}}function Wc(v,D,H,O,k,ut){F!==null&&k.isNodeMaterial&&F.setObject(v,k),v.onBeforeRender(C,D,H,O,k,ut),v.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),k.onBeforeRender(C,D,H,O,v,ut),k.transparent===!0&&k.side===qe&&k.forceSinglePass===!1?(k.side=Xe,k.needsUpdate=!0,C.renderBufferDirect(H,D,O,k,v,ut),k.side=Li,k.needsUpdate=!0,C.renderBufferDirect(H,D,O,k,v,ut),k.side=qe):C.renderBufferDirect(H,D,O,k,v,ut),v.onAfterRender(C,D,H,O,k,ut)}function Xc(v){let D=0;for(let H of v)H.texture!==null&&D++;return D}function ys(v,D,H){D.isScene!==!0&&(D=ei);let O=It.get(v),k=T.state.lights,ut=T.state.shadowsArray,_t=k.state.version,ct=K.getParameters(v,k.state,ut,D,H,T.state.lightProbeGridArray),yt=K.getProgramCacheKey(ct),Tt=O.programs;O.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?D.environment:null,O.fog=D.fog;let kt=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;O.envMap=w.get(v.envMap||O.environment,kt),O.envMapRotation=O.environment!==null&&v.envMap===null?D.environmentRotation:v.envMapRotation,Tt===void 0&&(v.addEventListener("dispose",ee),Tt=new Map,O.programs=Tt,O.programVariants=new Map);let qt=Tt.get(yt);if(qt!==void 0){if(O.currentProgram===qt&&O.lightsStateVersion===_t)return Yc(v,ct),qt}else ct.uniforms=K.getUniforms(v),F!==null&&v.isNodeMaterial&&F.build(v,H,ct),v.onBeforeCompile(ct,C),qt=K.acquireProgram(ct,yt),Tt.set(yt,qt),O.uniforms=ct.uniforms;let St=O.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(St.clippingPlanes=$.uniform),Yc(v,ct),O.needsLights=Ud(v),O.lightsStateVersion=_t,O.needsLights&&(St.ambientLightColor.value=k.state.ambient,St.lightProbe.value=k.state.probe,St.sunLights.value=k.state.sun,St.sunLightShadows.value=k.state.sunShadow,St.directionalLights.value=k.state.directional,St.directionalLightShadows.value=k.state.directionalShadow,St.spotLights.value=k.state.spot,St.spotLightShadows.value=k.state.spotShadow,St.rectAreaLights.value=k.state.rectArea,St.ltc_1.value=k.state.rectAreaLTC1,St.ltc_2.value=k.state.rectAreaLTC2,St.pointLights.value=k.state.point,St.pointLightShadows.value=k.state.pointShadow,St.hemisphereLights.value=k.state.hemi,St.sunShadowMatrix.value=k.state.sunShadowMatrix,St.sunShadowCascade.value=k.state.sunShadowCascade,St.directionalShadowMatrix.value=k.state.directionalShadowMatrix,St.spotLightMatrix.value=k.state.spotLightMatrix,St.spotLightMap.value=k.state.spotLightMap,St.pointShadowMatrix.value=k.state.pointShadowMatrix),O.numLightProbeGrids=Xc(T.state.lightProbeGridArray),O.currentProgram=qt,O.uniformsList=null,qt}function Ld(v,D,H,O,k){let ut=It.get(v),_t=ut.currentProgram.id+","+O+","+k,ct=ut.programVariants.get(_t);return ct===void 0?(ct=ys(v,D,H),ut.programVariants.set(_t,ct)):(ut.currentProgram=ct,ut.uniformsList=null,ut.outputColorSpace=O,ut.toneMapping=k),ct}function qc(v){if(v.uniformsList===null){let D=v.currentProgram.getUniforms();v.uniformsList=ms.seqWithValue(D.seq,v.uniforms)}return v.uniformsList}function Yc(v,D){let H=It.get(v);H.outputColorSpace=D.outputColorSpace,H.batching=D.batching,H.batchingColor=D.batchingColor,H.instancing=D.instancing,H.instancingColor=D.instancingColor,H.instancingMorph=D.instancingMorph,H.skinning=D.skinning,H.morphTargets=D.morphTargets,H.morphNormals=D.morphNormals,H.morphColors=D.morphColors,H.morphTargetsCount=D.morphTargetsCount,H.numClippingPlanes=D.numClippingPlanes,H.numIntersection=D.numClipIntersection,H.vertexAlphas=D.vertexAlphas,H.vertexTangents=D.vertexTangents,H.toneMapping=D.toneMapping}function Dd(v,D,H,O,k){D.isScene!==!0&&(D=ei),Ft.resetTextureUnits();let ut=D.fog,_t=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?D.environment:null,ct=et===null?C.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:$t.workingColorSpace,yt=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Tt=w.get(O.envMap||_t,yt),kt=O.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,qt=!!H.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),St=!!H.morphAttributes.position,Yt=!!H.morphAttributes.normal,me=!!H.morphAttributes.color,se=Di;O.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(se=C.toneMapping);let ne=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ie=ne!==void 0?ne.length:0,Mt=It.get(O),ke=T.state.lights;if(_e===!0&&($e===!0||v!==Q)){let he=v===Q&&O.id===X;$.setState(O,v,he)}let Qt=!1,gn=!1;O.version===Mt.__version?Mt.needsLights&&Mt.lightsStateVersion!==ke.state.version||k.isBatchedMesh&&Mt.batching===!1||!k.isBatchedMesh&&Mt.batching===!0||k.isBatchedMesh&&Mt.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&Mt.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&Mt.instancing===!1||!k.isInstancedMesh&&Mt.instancing===!0||k.isSkinnedMesh&&Mt.skinning===!1||!k.isSkinnedMesh&&Mt.skinning===!0||k.isInstancedMesh&&Mt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Mt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Mt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Mt.instancingMorph===!1&&k.morphTexture!==null||Mt.envMap!==Tt||O.fog===!0&&Mt.fog!==ut||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==$.numPlanes||Mt.numIntersection!==$.numIntersection)||Mt.vertexAlphas!==kt||Mt.vertexTangents!==qt||Mt.morphTargets!==St||Mt.morphNormals!==Yt||Mt.morphColors!==me||Mt.morphTargetsCount!==Ie||Mt.numLightProbeGrids!==Xc(T.state.lightProbeGridArray)?Qt=!0:(Mt.outputColorSpace!==ct||Mt.toneMapping!==se)&&(gn=!0):(Qt=!0,Mt.__version=O.version);let Le=Mt.currentProgram;(Qt===!0||gn===!0)&&(Le=gn===!0?Ld(O,D,k,ct,se):ys(O,D,k),F&&O.isNodeMaterial&&F.onUpdateProgram(O,Le,Mt));let wr=!1,en=!1,xn=!1,Kt=Le.getUniforms(),Pe=Mt.uniforms;if(dt.useProgram(Le.program)&&(wr=!0,en=!0,xn=!0),O.id!==X&&(X=O.id,en=!0),wr||Q!==v){dt.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),Kt.setValue(U,"projectionMatrix",v.projectionMatrix),Kt.setValue(U,"viewMatrix",v.matrixWorldInverse);let Ee=Kt.map.cameraPosition;Ee!==void 0&&Ee.setValue(U,bi.setFromMatrixPosition(v.matrixWorld)),oe.logarithmicDepthBuffer&&Kt.setValue(U,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&Kt.setValue(U,"isOrthographic",v.isOrthographicCamera===!0),Q!==v&&(Q=v,en=!0,xn=!0)}if(Mt.needsLights&&(ke.state.sunShadowMap.length>0&&Kt.setValue(U,"sunShadowMap",ke.state.sunShadowMap,Ft),ke.state.directionalShadowMap.length>0&&Kt.setValue(U,"directionalShadowMap",ke.state.directionalShadowMap,Ft),ke.state.spotShadowMap.length>0&&Kt.setValue(U,"spotShadowMap",ke.state.spotShadowMap,Ft),ke.state.pointShadowMap.length>0&&Kt.setValue(U,"pointShadowMap",ke.state.pointShadowMap,Ft)),k.isSkinnedMesh){Kt.setOptional(U,k,"bindMatrix"),Kt.setOptional(U,k,"bindMatrixInverse");let he=k.skeleton;he&&(he.boneTexture===null&&he.computeBoneTexture(),Kt.setValue(U,"boneTexture",he.boneTexture,Ft))}k.isBatchedMesh&&(Kt.setOptional(U,k,"batchingTexture"),Kt.setValue(U,"batchingTexture",k._matricesTexture,Ft),Kt.setOptional(U,k,"batchingIdTexture"),Kt.setValue(U,"batchingIdTexture",k._indirectTexture,Ft),Kt.setOptional(U,k,"batchingColorTexture"),k._colorsTexture!==null&&Kt.setValue(U,"batchingColorTexture",k._colorsTexture,Ft));let ui=H.morphAttributes;if((ui.position!==void 0||ui.normal!==void 0||ui.color!==void 0)&&J.update(k,H,Le),(en||Mt.receiveShadow!==k.receiveShadow)&&(Mt.receiveShadow=k.receiveShadow,Kt.setValue(U,"receiveShadow",k.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&D.environment!==null&&(Pe.envMapIntensity.value=D.environmentIntensity),Pe.dfgLUT!==void 0&&(Pe.dfgLUT.value=Dx()),en){if(Kt.setValue(U,"toneMappingExposure",C.toneMappingExposure),Mt.needsLights&&Nd(Pe,xn),ut&&O.fog===!0&&st.refreshFogUniforms(Pe,ut),st.refreshMaterialUniforms(Pe,O,xt,Pt,T.state.transmissionRenderTarget[v.id]),Mt.needsLights&&Mt.numLightProbeGrids>0){let he=b,Ee=0;for(let Fi of T.state.lightProbeGridArray)Fi.texture!==null&&(he.textures[Ee]=Fi.texture,he.min[Ee]=Fi.boundingBox.min,he.max[Ee]=Fi.boundingBox.max,he.resolution[Ee]=Fi.resolution,Ee++);for(let Fi in he)he[Fi].length=Ee;Pe.probesSH.value=he.textures,Pe.probesMin.value=he.min,Pe.probesMax.value=he.max,Pe.probesResolution.value=he.resolution}ms.upload(U,qc(Mt),Pe,Ft)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(ms.upload(U,qc(Mt),Pe,Ft),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&Kt.setValue(U,"center",k.center),Kt.setValue(U,"modelViewMatrix",k.modelViewMatrix),Kt.setValue(U,"normalMatrix",k.normalMatrix),Kt.setValue(U,"modelMatrix",k.matrixWorld),O.uniformsGroups!==void 0){let he=O.uniformsGroups;for(let Ee=0,Fi=he.length;Ee<Fi;Ee++){let Zc=he[Ee];At.update(Zc,Le),At.bind(Zc,Le)}}return Le}function Nd(v,D){v.ambientLightColor.needsUpdate=D,v.lightProbe.needsUpdate=D,v.sunLights.needsUpdate=D,v.sunLightShadows.needsUpdate=D,v.directionalLights.needsUpdate=D,v.directionalLightShadows.needsUpdate=D,v.pointLights.needsUpdate=D,v.pointLightShadows.needsUpdate=D,v.spotLights.needsUpdate=D,v.spotLightShadows.needsUpdate=D,v.rectAreaLights.needsUpdate=D,v.hemisphereLights.needsUpdate=D}function Ud(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(v,D,H){let O=It.get(v);O.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),It.get(v.texture).__webglTexture=D,It.get(v.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:H,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,D){let H=It.get(v);H.__webglFramebuffer=D,H.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(v,D=0,H=0){et=v,q=D,G=H;let O=null,k=!1,ut=!1;if(v){let ct=It.get(v);if(ct.__useDefaultFramebuffer!==void 0){dt.bindFramebuffer(U.FRAMEBUFFER,ct.__webglFramebuffer),j.copy(v.viewport),Et.copy(v.scissor),Bt=v.scissorTest,dt.viewport(j),dt.scissor(Et),dt.setScissorTest(Bt),X=-1;return}else if(ct.__webglFramebuffer===void 0)Ft.setupRenderTarget(v);else if(ct.__hasExternalTextures)Ft.rebindTextures(v,It.get(v.texture).__webglTexture,It.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let kt=v.depthTexture;if(ct.__boundDepthTexture!==kt){if(kt!==null&&It.has(kt)&&(v.width!==kt.image.width||v.height!==kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ft.setupDepthRenderbuffer(v)}}let yt=v.texture;(yt.isData3DTexture||yt.isDataArrayTexture||yt.isCompressedArrayTexture)&&(ut=!0);let Tt=It.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Tt[D])?O=Tt[D][H]:O=Tt[D],k=!0):v.samples>0&&Ft.useMultisampledRTT(v)===!1?O=It.get(v).__webglMultisampledFramebuffer:Array.isArray(Tt)?O=Tt[H]:O=Tt,j.copy(v.viewport),Et.copy(v.scissor),Bt=v.scissorTest}else j.copy(Lt).multiplyScalar(xt).floor(),Et.copy(te).multiplyScalar(xt).floor(),Bt=ie;if(H!==0&&(O=z),dt.bindFramebuffer(U.FRAMEBUFFER,O)&&dt.drawBuffers(v,O),dt.viewport(j),dt.scissor(Et),dt.setScissorTest(Bt),k){let ct=It.get(v.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,ct.__webglTexture,H)}else if(ut){let ct=D;for(let yt=0;yt<v.textures.length;yt++){let Tt=It.get(v.textures[yt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+yt,Tt.__webglTexture,H,ct)}}else if(v!==null&&H!==0){let ct=It.get(v.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ct.__webglTexture,H)}X=-1};function $c(v){let D=It.get(v);return(D.__readFormat!==v.format||D.__readType!==v.type)&&(D.__readFormat=v.format,D.__readType=v.type,D.__formatReadable=oe.textureFormatReadable(v.format),D.__typeReadable=oe.textureTypeReadable(v.type)),D}this.readRenderTargetPixels=function(v,D,H,O,k,ut,_t,ct=0){if(!(v&&v.isWebGLRenderTarget)){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=It.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&_t!==void 0&&(yt=yt[_t],Array.isArray(yt)&&(yt=yt[0])),yt){dt.bindFramebuffer(U.FRAMEBUFFER,yt);try{let Tt=v.textures[ct],kt=Tt.format,qt=Tt.type;v.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ct);let St=$c(Tt);if(St.__formatReadable===!1){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(St.__typeReadable===!1){Dt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=v.width-O&&H>=0&&H<=v.height-k&&U.readPixels(D,H,O,k,nt.convert(kt),nt.convert(qt),ut)}finally{let Tt=et!==null?It.get(et).__webglFramebuffer:null;dt.bindFramebuffer(U.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(v,D,H,O,k,ut,_t,ct=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=It.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&_t!==void 0&&(yt=yt[_t],Array.isArray(yt)&&(yt=yt[0])),yt)if(D>=0&&D<=v.width-O&&H>=0&&H<=v.height-k){dt.bindFramebuffer(U.FRAMEBUFFER,yt);let Tt=v.textures[ct],kt=Tt.format,qt=Tt.type;v.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ct);let St=$c(Tt);if(St.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(St.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Yt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Yt),U.bufferData(U.PIXEL_PACK_BUFFER,ut.byteLength,U.STREAM_READ),U.readPixels(D,H,O,k,nt.convert(kt),nt.convert(qt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let me=et!==null?It.get(et).__webglFramebuffer:null;dt.bindFramebuffer(U.FRAMEBUFFER,me);let se=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await yu(U,se,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Yt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ut),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(Yt),U.deleteSync(se),ut}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,D=null,H=0){let O=Math.pow(2,-H),k=Math.floor(v.image.width*O),ut=Math.floor(v.image.height*O),_t=D!==null?D.x:0,ct=D!==null?D.y:0;Ft.setTexture2D(v,0),U.copyTexSubImage2D(U.TEXTURE_2D,H,0,0,_t,ct,k,ut),dt.unbindTexture()},this.copyTextureToTexture=function(v,D,H=null,O=null,k=0,ut=0){let _t,ct,yt,Tt,kt,qt,St,Yt,me,se=v.isCompressedTexture?v.mipmaps[ut]:v.image;if(H!==null)_t=H.max.x-H.min.x,ct=H.max.y-H.min.y,yt=H.isBox3?H.max.z-H.min.z:1,Tt=H.min.x,kt=H.min.y,qt=H.isBox3?H.min.z:0;else{let Kt=Math.pow(2,-k);_t=Math.floor(se.width*Kt),ct=Math.floor(se.height*Kt),v.isDataArrayTexture?yt=se.depth:v.isData3DTexture?yt=Math.floor(se.depth*Kt):yt=1,Tt=0,kt=0,qt=0}O!==null?(St=O.x,Yt=O.y,me=O.z):(St=0,Yt=0,me=0);let ne=nt.convert(D.format),Ie=nt.convert(D.type),Mt;D.isData3DTexture?(Ft.setTexture3D(D,0),Mt=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Ft.setTexture2DArray(D,0),Mt=U.TEXTURE_2D_ARRAY):(Ft.setTexture2D(D,0),Mt=U.TEXTURE_2D),dt.activeTexture(U.TEXTURE0),dt.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),dt.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),dt.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);let ke=dt.getParameter(U.UNPACK_ROW_LENGTH),Qt=dt.getParameter(U.UNPACK_IMAGE_HEIGHT),gn=dt.getParameter(U.UNPACK_SKIP_PIXELS),Le=dt.getParameter(U.UNPACK_SKIP_ROWS),wr=dt.getParameter(U.UNPACK_SKIP_IMAGES);dt.pixelStorei(U.UNPACK_ROW_LENGTH,se.width),dt.pixelStorei(U.UNPACK_IMAGE_HEIGHT,se.height),dt.pixelStorei(U.UNPACK_SKIP_PIXELS,Tt),dt.pixelStorei(U.UNPACK_SKIP_ROWS,kt),dt.pixelStorei(U.UNPACK_SKIP_IMAGES,qt);let en=v.isDataArrayTexture||v.isData3DTexture,xn=D.isDataArrayTexture||D.isData3DTexture;if(v.isDepthTexture){let Kt=It.get(v),Pe=It.get(D),ui=It.get(Kt.__renderTarget),he=It.get(Pe.__renderTarget);dt.bindFramebuffer(U.READ_FRAMEBUFFER,ui.__webglFramebuffer),dt.bindFramebuffer(U.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let Ee=0;Ee<yt;Ee++)en&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,It.get(v).__webglTexture,k,qt+Ee),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,It.get(D).__webglTexture,ut,me+Ee)),U.blitFramebuffer(Tt,kt,Tt+_t,kt+ct,St,Yt,St+_t,Yt+ct,U.DEPTH_BUFFER_BIT,U.NEAREST);dt.bindFramebuffer(U.READ_FRAMEBUFFER,null),dt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(k!==0||v.isRenderTargetTexture||It.has(v)){let Kt=It.get(v),Pe=It.get(D);dt.bindFramebuffer(U.READ_FRAMEBUFFER,L),dt.bindFramebuffer(U.DRAW_FRAMEBUFFER,V);for(let ui=0;ui<yt;ui++)en?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Kt.__webglTexture,k,qt+ui):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Kt.__webglTexture,k),xn?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pe.__webglTexture,ut,me+ui):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Pe.__webglTexture,ut),k!==0?U.blitFramebuffer(Tt,kt,Tt+_t,kt+ct,St,Yt,St+_t,Yt+ct,U.COLOR_BUFFER_BIT,U.NEAREST):xn?U.copyTexSubImage3D(Mt,ut,St,Yt,me+ui,Tt,kt,_t,ct):U.copyTexSubImage2D(Mt,ut,St,Yt,Tt,kt,_t,ct);dt.bindFramebuffer(U.READ_FRAMEBUFFER,null),dt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else xn?v.isDataTexture||v.isData3DTexture?U.texSubImage3D(Mt,ut,St,Yt,me,_t,ct,yt,ne,Ie,se.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(Mt,ut,St,Yt,me,_t,ct,yt,ne,se.data):U.texSubImage3D(Mt,ut,St,Yt,me,_t,ct,yt,ne,Ie,se):v.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ut,St,Yt,_t,ct,ne,Ie,se.data):v.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ut,St,Yt,se.width,se.height,ne,se.data):U.texSubImage2D(U.TEXTURE_2D,ut,St,Yt,_t,ct,ne,Ie,se);dt.pixelStorei(U.UNPACK_ROW_LENGTH,ke),dt.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Qt),dt.pixelStorei(U.UNPACK_SKIP_PIXELS,gn),dt.pixelStorei(U.UNPACK_SKIP_ROWS,Le),dt.pixelStorei(U.UNPACK_SKIP_IMAGES,wr),ut===0&&D.generateMipmaps===!0&&D.mipmapsAutoUpdate===!0&&U.generateMipmap(Mt),dt.unbindTexture()},this.initRenderTarget=function(v){It.get(v).__webglFramebuffer===void 0&&Ft.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Ft.setTextureCube(v,0):v.isData3DTexture?Ft.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Ft.setTexture2DArray(v,0):Ft.setTexture2D(v,0),dt.unbindTexture()},this.resetState=function(){q=0,G=0,et=null,dt.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}};var Go=class{constructor(t,{scale:e=1,palette:i}={}){this.scene=t,this.scale=e,this.palette=i,this.max=Math.max(24,Math.round(420*e)),this.items=[],this.spark=this.createSystem(16777215,.075,cr),this.confetti=this.createSystem(16777215,.14,Ji),this.dust=this.createSystem(16777215,.035,Ji),this.dustClock=0}createSystem(t,e,i){let n=new de,r=new Float32Array(this.max*3),a=new Float32Array(this.max*3);n.setAttribute("position",new He(r,3)),n.setAttribute("color",new He(a,3)),n.setDrawRange(0,0);let o=new os({size:e,vertexColors:!0,transparent:!0,opacity:.95,depthWrite:!1,blending:i,sizeAttenuation:!0}),l=new Ys(n,o);return l.frustumCulled=!1,l.renderOrder=4,this.scene.add(l),{geometry:n,material:o,points:l,positions:r,colors:a,count:0}}setPalette(t){this.palette=t}setScale(t){this.scale=t}spawn(t,{position:e,count:i=18,color:n=16777215,colors:r=null,speed:a=1.2,spread:o=1,gravity:l=-2.2,life:c=.7,up:h=1}){let d=Math.max(1,Math.round(i*this.scale));for(let u=0;u<d;u+=1){this.items.length>=this.max&&this.items.shift();let f=Math.random()*Math.PI*2,g=a*(.35+Math.random()*.9),_=r?r[Math.floor(Math.random()*r.length)]:n;this.items.push({system:t,position:new R(e.x+(Math.random()-.5)*o*.35,e.y+(Math.random()-.5)*o*.25,e.z+(Math.random()-.5)*o*.35),velocity:new R(Math.cos(f)*g*(.4+Math.random()*.6),h*g*(.35+Math.random()),Math.sin(f)*g*(.4+Math.random()*.6)),gravity:l,life:c*(.6+Math.random()*.8),maxLife:c,color:new Nt(_),size:.6+Math.random()*.8})}this.sync(t)}sparkBurst(t,e){this.spawn(this.spark,{position:t,count:22,color:e||this.palette?.accent||16765286,speed:1.9,gravity:-3.6,life:.55,spread:1.4})}dustBurst(t,e){this.spawn(this.dust,{position:t,count:12,color:e||12562072,speed:.35,gravity:-.15,life:1.2,spread:1.8,up:.4})}confettiBurst(t,e){this.spawn(this.confetti,{position:t,count:80,colors:e||[this.palette?.accent||11740702,this.palette?.accent2||3038031,16765286,16777215],speed:2.8,gravity:-2.1,life:1.8,spread:2.2,up:1.6})}ambientDust(t={x:4,y:2.2,z:2.4},e={x:0,y:1.5,z:0}){this.scale&&(this.dustClock+=1,this.dustClock%9===0&&this.spawn(this.dust,{position:{x:e.x+(Math.random()-.5)*t.x,y:e.y+Math.random()*t.y,z:e.z+(Math.random()-.5)*t.z},count:1,color:this.palette?.accent||14206890,speed:.06,gravity:.02,life:3.4,spread:.4,up:.2}))}sync(t){let e=this.items.filter(r=>r.system===t),i=t.geometry.getAttribute("position"),n=t.geometry.getAttribute("color");e.forEach((r,a)=>{i.setXYZ(a,r.position.x,r.position.y,r.position.z);let o=Math.max(0,Math.min(1,r.life/r.maxLife));n.setXYZ(a,r.color.r*o,r.color.g*o,r.color.b*o)}),i.needsUpdate=!0,n.needsUpdate=!0,t.count=e.length,t.geometry.setDrawRange(0,e.length)}update(t){if(!this.items.length)return;let e=new Set;for(let i=this.items.length-1;i>=0;i-=1){let n=this.items[i];if(n.life-=t,n.life<=0){e.add(n.system),this.items.splice(i,1);continue}n.velocity.y+=n.gravity*t,n.position.addScaledVector(n.velocity,t),n.position.y<.98&&(n.position.y=.98,n.velocity.y*=-.28,n.velocity.x*=.7,n.velocity.z*=.7),e.add(n.system)}e.forEach(i=>this.sync(i))}dispose(){[this.spark,this.confetti,this.dust].forEach(t=>{this.scene.remove(t.points),t.geometry.dispose(),t.material.dispose()}),this.items.length=0}};function Nx(){let s=navigator.deviceMemory||4,t=navigator.hardwareConcurrency||4,e=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);return s<=2||t<=2||e&&(s<=4||t<=4)?"low":e?"medium":"high"}function Wo(s="auto"){let t=Nx();return s==="low"?{tier:"low",dpr:1,shadows:!1,particles:.45,antialias:!1,label:"Low"}:s==="high"?{tier:"high",dpr:Math.min(2,window.devicePixelRatio||1),shadows:!0,particles:1,antialias:!0,label:"High"}:t==="low"?{tier:"low",dpr:1,shadows:!1,particles:.5,antialias:!1,label:"Auto \xB7 light"}:t==="medium"?{tier:"medium",dpr:Math.min(1.5,window.devicePixelRatio||1),shadows:!1,particles:.8,antialias:!0,label:"Auto \xB7 balanced"}:{tier:"high",dpr:Math.min(2,window.devicePixelRatio||1),shadows:!0,particles:1,antialias:!0,label:"Auto \xB7 full"}}var Vo=class{constructor({onDowngrade:t}={}){this.onDowngrade=t,this.frames=0,this.elapsed=0,this.lowWindows=0,this.fps=60,this.enabled=!0,this.level=0}reset(){this.frames=0,this.elapsed=0,this.lowWindows=0,this.level=0}update(t){return this.enabled?(this.frames+=1,this.elapsed+=t,this.elapsed<1?this.fps:(this.fps=Math.round(this.frames/this.elapsed),this.frames=0,this.elapsed=0,this.fps<42?this.lowWindows+=1:this.lowWindows=Math.max(0,this.lowWindows-1),this.lowWindows>=3&&this.level<2&&(this.level+=1,this.lowWindows=0,this.onDowngrade?.(this.level,this.fps)),this.fps)):this.fps}};function nd(){try{let s=document.createElement("canvas");return!!(window.WebGLRenderingContext&&(s.getContext("webgl2")||s.getContext("webgl")||s.getContext("experimental-webgl")))}catch{return!1}}function lt(s,t="",{roughness:e=.62,metalness:i=.12,emissive:n=0,emissiveIntensity:r=.7,transparent:a=!1,opacity:o=1,flatShading:l=!1,map:c=null,side:h=Li}={}){let d=new tr({color:s,roughness:e,metalness:i,emissive:n,emissiveIntensity:r,transparent:a,opacity:o,flatShading:l,map:c,side:h});return d.userData.role=t,d.userData.base={roughness:e,metalness:i,emissive:n,emissiveIntensity:r,transparent:a,opacity:o,flatShading:l},d}function ft(s,t,e,i,n=0,r=0,a=0){let o=new wt(new fe(s,t,e),i);return o.position.set(n,r,a),o.castShadow=!0,o.receiveShadow=!0,o}function Oe(s,t,e,i,n=0,r=0,a=0,o=16){let l=new wt(new $i(s,t,e,o),i);return l.position.set(n,r,a),l.castShadow=!0,l.receiveShadow=!0,l}function ye(s,t){return s.userData.interactive=t,s.traverse(e=>{e.isMesh&&(e.userData.interactive=t,e.castShadow=!0,e.receiveShadow=!0)}),s}function sd(s,{color:t="#fffdf8",background:e="rgba(20, 20, 24, 0.78)",size:i=44,width:n=512,height:r=128,font:a="600 44px system-ui, sans-serif"}={}){let o=document.createElement("canvas");o.width=n,o.height=r;let l=o.getContext("2d");if(l.clearRect(0,0,n,r),e){l.fillStyle=e;let u=18;l.beginPath(),l.roundRect(4,4,n-8,r-8,u),l.fill()}l.fillStyle=t,l.font=a,l.textAlign="center",l.textBaseline="middle",l.fillText(s,n/2,r/2+2,n-36);let c=new Xi(o);c.colorSpace=xe,c.anisotropy=4;let h=new rs({map:c,transparent:!0,depthWrite:!1}),d=new Ws(h);return d.scale.set(n/r*i/44,i/44,1),d.userData.label=!0,d}function Lc(s={}){let t=document.createElement("canvas");t.width=1024,t.height=768;let e=t.getContext("2d"),i=`#${(s.pcb||2382662).toString(16).padStart(6,"0")}`,n=`#${(s.accent||11740702).toString(16).padStart(6,"0")}`,r=`#${(s.metal||12830669).toString(16).padStart(6,"0")}`;e.fillStyle=i,e.fillRect(0,0,1024,768),e.strokeStyle="rgba(190, 220, 190, 0.28)",e.lineWidth=2;for(let l=0;l<90;l+=1){let c=40+Math.random()*940,h=40+Math.random()*680;e.beginPath(),e.moveTo(c,h);let d=2+Math.floor(Math.random()*4);for(let u=0;u<d;u+=1)Math.random()>.5?c+=(Math.random()-.5)*150:h+=(Math.random()-.5)*130,e.lineTo(c,h);e.stroke(),e.fillStyle="rgba(230, 210, 150, 0.55)",e.beginPath(),e.arc(c,h,4,0,Math.PI*2),e.fill()}let a=(l,c,h,d=20,u="rgba(240, 245, 235, 0.86)")=>{e.fillStyle=u,e.font=`700 ${d}px monospace`,e.fillText(l,c,h)};a("CPU SOCKET",312,205,18),a("DIMM A2",626,172,17),a("DIMM B2",626,222,17),a("PCIE X16",630,500,18),a("24-PIN ATX",850,330,15),a("CPU_FAN",270,330,15),a("SATA",810,610,15),a("TECHPRO MAINBOARD",60,720,22,"rgba(245, 250, 240, 0.75)"),e.strokeStyle="rgba(255, 255, 255, 0.15)",e.lineWidth=3,e.strokeRect(24,24,976,720),e.strokeStyle=r,e.globalAlpha=.35;for(let l=0;l<8;l+=1)e.beginPath(),e.arc(90+l*120,700,7,0,Math.PI*2),e.stroke();e.globalAlpha=1,e.fillStyle=n,e.fillRect(0,0,1024,10);let o=new Xi(t);return o.colorSpace=xe,o.anisotropy=8,o}function Dc(s={},t=.25){let e=document.createElement("canvas");e.width=1024,e.height=576;let i=e.getContext("2d"),n=s.dark;i.fillStyle=n?"#040a17":"#08131a",i.fillRect(0,0,1024,576);let r=`#${(s.accent||2483967).toString(16).padStart(6,"0")}`,a=`#${(s.accent2||3038031).toString(16).padStart(6,"0")}`;i.fillStyle=r,i.fillRect(64,64,14,64),i.fillStyle="#e9f8ff",i.font="700 42px system-ui, sans-serif",i.fillText("TECHPRO BIOS",100,108),i.fillStyle="rgba(210, 240, 255, 0.7)",i.font="500 20px monospace",i.fillText("Assemble Computer Hardware \xB7 COC 1",100,144),i.fillStyle="rgba(210, 240, 255, 0.82)",i.font="500 22px monospace";let o=["CPU ............ TECHPRO PROCESSOR OK","MEMORY ......... 8192 MB OK","STORAGE ........ DETECTED","CPU FAN ........ OK","KEYBOARD ....... DETECTED","MOUSE .......... DETECTED"];o.forEach((c,h)=>{t*o.length>h&&(i.fillStyle=h===o.length-1?a:"rgba(220, 244, 255, 0.86)",i.fillText(c,96,220+h*38))}),i.strokeStyle="rgba(255,255,255,0.18)",i.strokeRect(72,186,880,260),i.fillStyle="rgba(255,255,255,0.14)",i.fillRect(96,486,832,18),i.fillStyle=r,i.fillRect(96,486,832*Math.max(.04,t),18),i.fillStyle="rgba(220, 244, 255, 0.7)",i.font="500 18px monospace",i.fillText(t>=1?"Boot device found. Starting TechPro.":"Checking hardware...",96,540);let l=new Xi(e);return l.colorSpace=xe,l.anisotropy=8,l}function rd(s){let t=new Ot;t.name="bench";let e=lt(s.bench,"bench",{roughness:.82,metalness:.02}),i=lt(s.benchTop,"benchTop",{roughness:.75,metalness:.02}),n=lt(s.metal,"metal",{roughness:.4,metalness:.65}),r=ft(9.4,.16,5.2,i,0,.98,0);t.add(r),t.add(ft(9.6,.08,5.4,e,0,.9,0)),[[-4.2,-2.2],[4.2,-2.2],[-4.2,2.2],[4.2,2.2]].forEach(([c,h])=>{t.add(ft(.16,.9,.16,n,c,.45,h)),t.add(ft(.4,.06,.4,n,c,.03,h))}),t.add(ft(9,.08,.08,n,0,.36,-2.1)),t.add(ft(.08,.08,4.4,n,-4.2,.36,0));let o=new wt(new Pi(34,26),lt(s.bg,"bg",{roughness:1,metalness:0}));o.rotation.x=-Math.PI/2,o.position.y=-.02,o.receiveShadow=!0,t.add(o);let l=new wt(new Pi(34,14),lt(s.bg,"bg",{roughness:1,metalness:0}));return l.position.set(0,7,-8),l.receiveShadow=!0,t.add(l),t}function ad(s){let t=new Ot,e=lt(s.caseTrim,"caseTrim",{roughness:.8,metalness:.1}),i=lt(s.bg,"bg",{roughness:.9,metalness:.02});t.add(ft(3.9,.09,2.1,e,0,.035,0)),t.add(ft(3.72,.02,1.94,i,0,.085,0));for(let n=0;n<5;n+=1)t.add(ft(.6,.01,.6,lt(s.caseTrim,"caseTrim",{roughness:.7}),-1.4+n*.7,.1,.55));return t}function od(s){let t=new Ot;t.name="case";let e=lt(s.case,"case",{roughness:.5,metalness:.35}),i=lt(s.caseTrim,"caseTrim",{roughness:.38,metalness:.5}),n=lt(s.metal,"metal",{roughness:.3,metalness:.78}),r=lt(329224,"case",{roughness:.85,metalness:.1}),a=lt(s.accent,"accent",{roughness:.3,metalness:.2,emissive:s.accent,emissiveIntensity:.25}),o=2.1,l=3.1,c=3.3;t.add(ft(o,.1,c,e,0,.05,0)),t.add(ft(o,.1,c,e,0,l-.05,0)),t.add(ft(.08,l,c,e,-o/2,l/2,0)),t.add(ft(o,l,.08,e,0,l/2,-c/2)),t.add(ft(o,l,.06,e,0,l/2,c/2)),t.add(ft(o-.14,l-.24,.04,r,0,l/2,-c/2+.07)),t.add(ft(.12,l-.16,.16,i,-o/2+.14,l/2,c/2-.06)),t.add(ft(.12,l-.16,.16,i,o/2-.14,l/2,c/2-.06));let h=new Ot;h.position.set(0,0,c/2+.02),h.add(ft(o-.1,l-.12,.06,i,0,l/2,.01));for(let b=0;b<12;b+=1)h.add(ft(o-.32,.012,.02,r,0,.32+b*.07,.055));let d=Oe(.13,.13,.05,a,.62,l-.28,.07,24);d.rotation.x=Math.PI/2,d.name="power-button",ye(d,{kind:"click",action:"power"}),h.add(d);let u=new wt(new ci(.3,16,12),new Re({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}));u.position.set(.62,l-.28,.07),u.name="power-button-hit-target",ye(u,{kind:"click",action:"power"}),h.add(u);let f=new wt(new We(.16,.015,8,28),n);f.position.set(.62,l-.28,.065),h.add(f);for(let b=0;b<3;b+=1){let A=ft(.14,.05,.03,r,.28+b*.18,l-.28,.06);h.add(A)}let g=ft(o-.5,.025,.02,a,0,l-.55,.06);g.name="rgb-strip",h.add(g),t.add(h),t.add(ft(o-.22,.06,c-.3,i,0,.32,0)),t.add(ft(o-.5,.02,c-.5,r,0,.36,0)),t.add(ft(.8,1.05,1.1,i,-.25,.95,.95));for(let b=0;b<3;b+=1)t.add(ft(.72,.03,1,r,-.25,.62+b*.25,.95));let _=new Ot;_.name="case-fan",_.position.set(.1,2.32,-c/2+.18);let m=new wt(new We(.42,.055,8,28),n);_.add(m);let p=new Ot;p.name="fan-blades",p.add(Oe(.11,.11,.12,r,0,0,0,18));for(let b=0;b<7;b+=1){let A=ft(.3,.035,.12,lt(s.caseTrim,"caseTrim",{roughness:.5}),.2,0,0);A.rotation.z=b/7*Math.PI*2,A.position.set(Math.cos(b/7*Math.PI*2)*.22,Math.sin(b/7*Math.PI*2)*.22,0),p.add(A)}_.add(p),_.rotation.y=Math.PI/2,_.rotation.z=Math.PI/2,t.add(_);let S=lt(s.metal,"metal",{roughness:.3,metalness:.8});[[-.82,.8,.2],[-.82,2.55,.2],[-.82,.8,-.9],[-.82,2.55,-.9],[-.82,1.65,-.2]].forEach(([b,A,T])=>{let x=Oe(.07,.07,.18,S,b,A,T,10);x.rotation.z=Math.PI/2,t.add(x)});for(let b=0;b<3;b+=1){let A=new wt(new We(.13,.035,6,16),r);A.position.set(-.45+b*.35,.62,.5),A.rotation.x=Math.PI/2,t.add(A)}let E=ft(o-.1,l-.18,.05,lt(s.caseTrim,"caseTrim",{roughness:.2,metalness:.6,transparent:!0,opacity:.32}),-1.45,1.45,.2);return E.rotation.z=-.14,E.name="side-panel",t.add(E),t.userData.powerButton=d,t.userData.powerHitTarget=u,t.userData.fan=p,t.userData.rgb=g,t.userData.panel=E,t.userData.boardMount=new ue,t.userData.boardMount.position.set(-.76,1.68,.1),t.add(t.userData.boardMount),t}function ld(s,{small:t=!1}={}){let e=new Ot;e.name="motherboard";let i=t?.82:1,n=2.55*i,r=1.95*i,a=Lc(s),o=lt(16777215,"pcb",{roughness:.7,metalness:.15,map:a}),l=ft(n,.075,r,o,0,0,0);l.name="pcb",e.add(l),e.userData.pcbTexture=a;let c=lt(1119514,"",{roughness:.6,metalness:.2}),h=lt(s.metal,"metal",{roughness:.28,metalness:.85}),d=lt(s.accent,"accent",{roughness:.45,metalness:.25}),u=lt(15327954,"",{roughness:.75,metalness:.05}),f=new Ot;f.name="cpu-socket",f.position.set(-.58*i,.055,-.38*i),f.add(ft(.58*i,.07,.58*i,c,0,0,0));let g=new wt(new Pi(.42*i,.42*i),lt(9268015,"",{roughness:.35,metalness:.8}));g.rotation.x=-Math.PI/2,g.position.y=.038,f.add(g);let _=new wt(new En(.045*i,3),d);_.rotation.x=-Math.PI/2,_.position.set(-.19*i,.04,-.19*i),_.rotation.z=Math.PI,f.add(_);let m=new Ot;m.name="cpu-lever",m.position.set(.32*i,.05,-.38*i);let p=Oe(.018,.018,.48*i,h,0,.06,0,8);p.rotation.z=Math.PI/2,m.add(p);let S=ft(.02,.02,.28*i,h,.22*i,.06,.12*i);m.add(S);let E=new wt(new ci(.56*i,16,12),new Re({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1,side:qe}));E.position.set(.22*i,.08,.12*i),E.name="cpu-lever-hit-target",m.add(E),m.userData.closed=!0,ye(m,{kind:"lever"}),f.add(m),e.add(f),e.userData.socket=f,e.userData.lever=m,e.userData.socketPosition=new R(-.58*i,.11,-.38*i);let b=new Ot;b.name="ram-slots";for(let I=0;I<4;I+=1){let C=ft(.06,.055,1.12*i,I===1||I===3?d:c,.5*i+I*.11,.06,-.18*i);C.name=I===1?"ram-slot-a2":`ram-slot-${I}`,b.add(C);let N=ft(.075,.09,.11,u,.5*i+I*.11,.08,-.78*i);N.name="ram-clip",b.add(N);let F=ft(.075,.09,.11,u,.5*i+I*.11,.08,.42*i);F.name="ram-clip",b.add(F)}e.add(b),e.userData.ramSlots=b,e.userData.ramSlotPosition=new R(.61*i,.12,-.18*i),e.add(ft(1.35*i,.05,.08,d,.42*i,.06,.68*i)),e.add(ft(.82*i,.05,.07,c,.42*i,.06,.86*i));let A=ft(.42*i,.13,.42*i,h,.5*i,.12,.24*i);for(let I=0;I<5;I+=1)A.add(ft(.36*i,.02,.02,c,0,.07,-.16+I*.08));e.add(A);for(let I=0;I<8;I+=1){let C=Oe(.055*i,.055*i,.16*i,c,-.92*i+I%4*.16,.11,-.05+Math.floor(I/4)*.24,10);C.add(Oe(.05*i,.05*i,.01*i,h,0,.085,0,10)),e.add(C)}e.add(ft(.14*i,.12,.44*i,u,1.08*i,.1,-.18*i));let T=ft(.13*i,.06,.18*i,u,-.2*i,.08,-.78*i);T.name="cpu-fan-header",e.add(T),e.userData.fanHeader=T,[[-1.12,-.82],[1.12,-.82],[-1.12,.82],[1.12,.82],[.2,.82]].forEach(([I,C])=>{let N=new wt(new We(.055,.012,6,18),h);N.rotation.x=Math.PI/2,N.position.set(I*i,.045,C*i),e.add(N)}),e.add(ft(.26*i,.06,.1*i,u,-.9*i,.07,.72*i)),e.add(ft(.34*i,.05,.12*i,c,1*i,.07,.72*i));let M=[["CPU SOCKET",-.58*i,.25,-.38*i],["RAM A2",.61*i,.25,-.18*i],["PCIE X16",.42*i,.2,.68*i],["CPU_FAN",-.2*i,.22,-.78*i],["24-PIN",1.08*i,.26,-.18*i]];return e.userData.labels=M.map(([I,C,N,F])=>{let z=sd(I,{size:26,width:420,height:96});return z.position.set(C,N,F),z.visible=!1,e.add(z),z}),e}function cd(s){let t=new Ot;t.name="cpu";let e=lt(3038032,"",{roughness:.5,metalness:.2}),i=lt(14212581,"metal",{roughness:.22,metalness:.9}),n=lt(14067530,"",{roughness:.3,metalness:.85}),r=lt(s.accent,"accent",{roughness:.4,metalness:.3}),a=ft(.52,.07,.52,e,0,0,0);t.add(a),t.add(ft(.38,.025,.38,i,0,.047,0)),t.add(ft(.32,.012,.32,lt(10265517,"metal",{roughness:.2,metalness:.9}),0,.065,0));let o=new fe(.012,.008,.012),l=new as(o,n,196),c=new Zt,h=0;for(let g=0;g<14;g+=1)for(let _=0;_<14;_+=1)c.makeTranslation(-.21+g*.032,-.04,-.21+_*.032),l.setMatrixAt(h,c),h+=1;l.instanceMatrix.needsUpdate=!0,t.add(l);let d=new wt(new En(.045,3),r);d.rotation.x=-Math.PI/2,d.rotation.z=Math.PI,d.position.set(-.19,.041,-.19),t.add(d);let u=ft(.06,.02,.06,r,-.24,.04,-.24);t.add(u);let f=new wt(new fe(.82,.24,.82),new Re({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1,side:qe}));return f.name="cpu-hit-target",t.add(f),t.userData.part="cpu",t.userData.triangle=d,t}function hd(s){let t=new Ot;t.name="cooler";let e=lt(s.metal,"metal",{roughness:.3,metalness:.82}),i=lt(1909546,"",{roughness:.55,metalness:.25}),n=lt(s.accent,"accent",{roughness:.4,metalness:.3});t.add(ft(.52,.05,.52,e,0,.02,0));for(let h=0;h<4;h+=1){let d=Oe(.025,.025,.5,e,-.18+h*.12,.28,.18,8);t.add(d)}let r=new fe(.68,.015,.52),a=new as(r,e,16),o=new Zt;for(let h=0;h<16;h+=1)o.makeTranslation(0,.1+h*.026,-.02),a.setMatrixAt(h,o);a.instanceMatrix.needsUpdate=!0,t.add(a);let l=new Ot;l.position.set(0,.58,0),l.add(Oe(.3,.3,.06,i,0,0,0,20));let c=new Ot;c.name="cooler-fan";for(let h=0;h<9;h+=1){let d=ft(.22,.02,.09,n,.13,.04,0);d.rotation.y=h/9*Math.PI*2,d.position.set(Math.cos(h/9*Math.PI*2)*.15,.05,Math.sin(h/9*Math.PI*2)*.15),c.add(d)}return l.add(c),t.add(l),t.userData.fan=c,t.userData.part="cooler",t}function ud(s){let t=new Ot;t.name="ram";let e=lt(1916725,"",{roughness:.6,metalness:.15}),i=lt(1053721,"",{roughness:.55,metalness:.2}),n=lt(14067530,"",{roughness:.3,metalness:.9}),r=lt(s.accent,"accent",{roughness:.45,metalness:.3}),a=lt(15262422,"",{roughness:.8,metalness:.05});t.add(ft(1.28,.055,.32,e,0,0,0));for(let l=0;l<8;l+=1)t.add(ft(.11,.035,.17,i,-.53+l*.15,.045,0));t.add(ft(.6,.004,.2,a,-.12,.066,0)),t.add(ft(1.28,.02,.05,n,0,-.038,.1)),t.add(ft(.5,.02,.04,r,.32,-.038,.1));let o=new wt(new fe(1.48,.2,.48),new Re({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1,side:qe}));return o.name="ram-hit-target",t.add(o),t.add(ft(.09,.08,.33,r,-.18,0,0)),t.userData.part="ram",t.userData.notch=-.18,t}function dd(s){let t=new Ot;t.name="psu";let e=lt(2369583,"",{roughness:.55,metalness:.45}),i=lt(s.metal,"metal",{roughness:.3,metalness:.85}),n=lt(s.accent,"accent",{roughness:.4,metalness:.3});t.add(ft(1.55,.95,1.25,e,0,0,0));let r=new wt(new We(.36,.025,8,26),i);r.rotation.x=Math.PI/2,r.position.set(.1,.49,0),t.add(r);for(let a=0;a<8;a+=1){let o=ft(.7,.018,.018,i,.1,.49,0);o.rotation.y=a/8*Math.PI,t.add(o)}t.add(Oe(.12,.12,.05,i,.1,.5,0,16));for(let a=0;a<4;a+=1)t.add(ft(.18,.05,.1,a%2?n:i,.35+a*.14,.02,.68));return t.userData.part="psu",t}function fd(s){let t=new Ot;t.name="monitor";let e=lt(s.case,"case",{roughness:.45,metalness:.35}),i=lt(s.metal,"metal",{roughness:.3,metalness:.8}),n=new Re({color:659734}),r=new wt(new Pi(2.5,1.4),n);r.position.set(0,.3,.055),t.add(r),t.add(ft(2.7,1.62,.12,e,0,.3,0)),t.add(ft(.18,.62,.18,i,0,-.58,-.04)),t.add(ft(1.1,.06,.65,i,0,-.9,.05));let a=new wt(new En(.025,12),new Re({color:s.accent}));return a.position.set(1.15,-.45,.07),t.add(a),t.userData.screen=r,t.userData.screenMat=n,t.userData.led=a,t}function pd(s){let t=new Ot,e=lt(s.case,"case",{roughness:.5,metalness:.25}),i=lt(14275784,"",{roughness:.8,metalness:.02});t.add(ft(1.7,.07,.55,e,0,0,0));for(let n=0;n<4;n+=1)for(let r=0;r<14;r+=1)t.add(ft(.085,.025,.075,i,-.72+r*.11,.05,-.18+n*.1));return t.add(ft(.65,.025,.075,i,0,.05,.22)),t}function md(s){let t=new Ot,e=lt(s.case,"case",{roughness:.45,metalness:.3}),i=new wt(new Yi(.16,.22,4,10),e);return i.rotation.x=Math.PI/2,i.scale.set(1,.6,1),i.position.y=.06,i.castShadow=!0,t.add(i),t.add(ft(.025,.02,.12,lt(1119514,"",{roughness:.5}),0,.12,-.05)),t}function gd(s){let t=new Ot;t.name="technician";let e=lt(14066554,"",{roughness:.75}),i=lt(s.accent2,"accent2",{roughness:.7}),n=lt(2831168,"",{roughness:.8}),r=lt(2365974,"",{roughness:.9}),a=lt(s.metal,"metal",{roughness:.3,metalness:.8}),o=new wt(new Yi(.28,.75,4,12),i);o.position.y=1.28,o.castShadow=!0,t.add(o);let l=new wt(new ci(.23,18,14),e);l.position.y=1.95,l.castShadow=!0,t.add(l);let c=new wt(new ci(.235,16,10,0,Math.PI*2,0,Math.PI*.48),r);c.position.y=2.02,t.add(c);let h=new Re({color:1775380});[-.08,.08].forEach(p=>{let S=new wt(new ci(.018,8,6),h);S.position.set(p,1.98,.205),t.add(S)});let d=(p,S)=>{let E=new Ot;E.position.set(p,1.62,0);let b=new wt(new Yi(.075,.42,4,8),i);b.position.y=-.22,E.add(b);let A=new Ot;A.position.y=-.48;let T=new wt(new Yi(.065,.36,4,8),e);T.position.y=-.18,A.add(T);let x=new wt(new ci(.08,10,8),e);return x.position.y=-.4,A.add(x),E.add(A),t.add(E),{shoulder:E,forearm:A,hand:x,side:S}},u=d(-.34,"left"),f=d(.34,"right");u.shoulder.rotation.z=.18,f.shoulder.rotation.z=-.18,u.forearm.rotation.x=-.2,f.forearm.rotation.x=-.2;let g=p=>{let S=new wt(new Yi(.09,.66,4,8),n);S.position.set(p,.48,0),S.castShadow=!0,t.add(S);let E=ft(.18,.08,.3,lt(1514272,"",{roughness:.7}),p,.08,.06);t.add(E)};g(-.14),g(.14);let _=new wt(new We(.1,.018,8,24),a);_.position.set(.43,1.16,.03),_.rotation.x=Math.PI/2,_.name="bracelet",ye(_,{kind:"safety",action:"bracelet"}),t.add(_);let m=new wt(new We(.105,.02,8,24),lt(s.accent,"accent",{roughness:.6}));return m.position.set(-.43,1.16,.03),m.rotation.x=Math.PI/2,m.name="worn-strap",m.visible=!1,t.add(m),t.userData.bracelet=_,t.userData.wornStrap=m,t.userData.leftHand=u.hand,t.userData.rightHand=f.hand,t}function xd(s){let t=new Ot;t.name="wrist-strap";let e=lt(s.accent,"accent",{roughness:.65,metalness:.05}),i=lt(s.metal,"metal",{roughness:.3,metalness:.8}),n=new wt(new We(.15,.035,8,24),e);n.rotation.x=Math.PI/2,t.add(n),t.add(ft(.08,.04,.12,i,.15,.02,0));let r=new wt(new Zi(new Ci([new R(.16,.02,0),new R(.35,.02,.1),new R(.55,.02,.05),new R(.72,.02,-.1)]),14,.012,6,!1),i);return t.add(r),t.userData.part="strap",t}function yd(s){let t=new Ot;t.name="reference-camera";let e=lt(2369583,"",{roughness:.55,metalness:.35}),i=lt(s.metal,"metal",{roughness:.3,metalness:.8});t.add(ft(.34,.22,.18,e,0,0,0));let n=Oe(.09,.09,.1,i,0,0,.14,18);return n.rotation.x=Math.PI/2,t.add(n),t.add(ft(.1,.05,.05,lt(s.accent,"accent",{roughness:.4}),.09,.13,0)),t.userData.part="camera",t}function _d(s){let t=new Ot;t.name="parts-bins";let e=lt(s.accent2,"accent2",{roughness:.7}),i=lt(15854300,"",{roughness:.85});return[-.35,.35].forEach((n,r)=>{let a=ft(.58,.3,.46,e,n,.15,0);t.add(a),t.add(ft(.42,.16,.01,i,n,.17,.235));let o=sd(r===0?"SCREWS":"CABLES",{size:18,width:300,height:80,background:null,color:"#2a231c"});o.position.set(n,.2,.25),o.scale.set(.22,.06,1),t.add(o)}),t.userData.part="bins",t}function vd(s){let t=new Ot;t.name="power-strip";let e=lt(15328732,"",{roughness:.7,metalness:.05}),i=lt(1843494,"",{roughness:.6,metalness:.2});t.add(ft(1.1,.12,.36,e,0,0,0));for(let n=0;n<3;n+=1)t.add(ft(.18,.02,.12,i,-.35+n*.35,.065,0));return t.add(ft(.3,.02,.05,lt(16731469,"",{roughness:.5}),.42,.07,0)),t}function bd(s){let t=new Ot;t.name="power-plug";let e=lt(15328732,"",{roughness:.65,metalness:.05}),i=lt(s.metal,"metal",{roughness:.3,metalness:.8});t.add(ft(.24,.18,.14,e,0,0,0)),t.add(ft(.04,.06,.12,i,-.06,.13,0)),t.add(ft(.04,.06,.12,i,.06,.13,0));let n=new Ci([new R(0,-.02,-.07),new R(.2,-.1,-.4),new R(.6,-.18,-.8),new R(1.1,-.2,-1)]),r=new wt(new Zi(n,18,.022,6,!1),lt(1579807,"",{roughness:.8}));return t.add(r),t.userData.part="plug",t}function Sd(s){let t=new Ot;t.name="peripheral-cable";let e=lt(s.metal,"metal",{roughness:.35,metalness:.75}),i=lt(2238254,"",{roughness:.6,metalness:.2});t.add(ft(.26,.11,.08,i,0,0,0)),t.add(ft(.1,.07,.02,e,0,0,.05));let n=new Ci([new R(0,0,-.04),new R(-.2,-.1,-.2),new R(-.45,-.18,-.4),new R(-.8,-.2,-.5)]);return t.add(new wt(new Zi(n,14,.018,6,!1),lt(1579807,"",{roughness:.8}))),t.userData.part="peripheral",t}function Md(s){let t=new Ot;t.name="tool-kit";let e=lt(s.metal,"metal",{roughness:.3,metalness:.8}),i=lt(s.accent,"accent",{roughness:.6}),n=new Ot;n.position.set(-.2,.08,0),n.add(Oe(.035,.035,.3,i,0,0,0,10));let r=Oe(.012,.012,.32,e,0,.3,0,8);n.add(r),n.rotation.z=.5,t.add(n);let a=Oe(.06,.06,.22,lt(14275266,"",{roughness:.7}),.18,.11,.02,12);a.add(Oe(.04,.04,.04,lt(s.accent,"accent",{roughness:.5}),0,.13,0,10)),t.add(a);for(let o=0;o<3;o+=1){let l=new wt(new We(.06,.01,6,16),lt(2237995,"",{roughness:.7}));l.rotation.x=Math.PI/2,l.position.set(.36+o*.09,.02,.1),t.add(l)}return t}function wd(s){let t=new Ot,e=lt(s.metal,"metal",{roughness:.25,metalness:.9}),i=lt(1514272,"",{roughness:.6,metalness:.3});t.add(Oe(.07,.09,.38,i,0,0,0,14)),t.add(Oe(.11,.08,.12,e,0,.24,0,14));let n=new wt(new Ks(.35,1.2,18,1,!0),new Re({color:s.accent,transparent:!0,opacity:.07,side:qe,depthWrite:!1}));return n.position.y=.9,n.rotation.x=Math.PI,t.add(n),t}var Ed={linear:s=>s,inQuad:s=>s*s,outQuad:s=>1-(1-s)*(1-s),inOutQuad:s=>s<.5?2*s*s:1-Math.pow(-2*s+2,2)/2,outCubic:s=>1-Math.pow(1-s,3),inOutCubic:s=>s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2,outBack:s=>1+2.70158*Math.pow(s-1,3)+1.70158*Math.pow(s-1,2),outElastic:s=>{let t=2*Math.PI/3;return s===0?0:s===1?1:Math.pow(2,-10*s)*Math.sin((s*10-.75)*t)+1}};var Uc=class{constructor(t,e,{duration:i=400,delay:n=0,easing:r="outCubic",onUpdate:a=null,onComplete:o=null,loop:l=!1}={}){this.object=t,this.from={},this.to={},Object.keys(e).forEach(c=>{this.from[c]=Td(t,c),this.to[c]=e[c]}),this.duration=Math.max(.001,i/1e3),this.delay=Math.max(0,n/1e3),this.easing=typeof r=="function"?r:Ed[r]||Ed.outCubic,this.onUpdate=a,this.onComplete=o,this.loop=l,this.elapsed=0,this.done=!1}tick(t){if(this.done||(this.elapsed+=t,this.elapsed<this.delay))return;let e=Math.min(1,(this.elapsed-this.delay)/this.duration),i=this.easing(e);Object.keys(this.to).forEach(n=>{let r=this.from[n],a=this.to[n];typeof a=="number"&&typeof r=="number"?Nc(this.object,n,r+(a-r)*i):Array.isArray(a)?Nc(this.object,n,a.map((o,l)=>{let c=Array.isArray(r)?r[l]:0;return typeof o=="number"?c+(o-c)*i:o})):i>=1&&Nc(this.object,n,a)}),this.onUpdate?.(i,this.object),e>=1&&(this.loop?(this.elapsed=this.delay,this.from={},Object.keys(this.to).forEach(n=>{this.from[n]=Td(this.object,n)})):(this.done=!0,this.onComplete?.()))}cancel(){this.done=!0}};function Td(s,t){let e=s[t];return e&&typeof e=="object"&&"x"in e&&"y"in e&&"z"in e?[e.x,e.y,e.z]:e}function Nc(s,t,e){Array.isArray(e)?s[t]&&typeof s[t].set=="function"?s[t].set(e[0],e[1],e[2]):s[t]={x:e[0],y:e[1],z:e[2]}:s[t]=e}var Xo=class{constructor(){this.active=new Set}add(t,e,i){let n=new Uc(t,e,i);return this.active.add(n),n}to(t,e,i){return this.add(t,e,i)}delay(t,e){let i={value:0};return this.add(i,{value:1},{duration:t*1e3,easing:"linear",onComplete:e})}stop(t){this.active.forEach(e=>{e.object===t&&(e.cancel(),this.active.delete(e))})}update(t){this.active.forEach(e=>{e.tick(t),e.done&&this.active.delete(e)})}clear(){this.active.forEach(t=>t.cancel()),this.active.clear()}};var Ad={overview:{theta:.36,phi:1.04,radius:9.2,target:[0,1.65,0]},top:{theta:.02,phi:.2,radius:9.6,target:[-1.6,1.2,.2]},side:{theta:1.18,phi:1.12,radius:8.4,target:[.6,1.6,0]},back:{theta:Math.PI+.45,phi:1.16,radius:9.4,target:[.8,1.7,-.4]},safety:{theta:.32,phi:1.02,radius:8.8,target:[0,1.55,0]},cpu:{theta:.12,phi:.9,radius:4.5,target:[-1.8,1.3,.25]},ram:{theta:.14,phi:.84,radius:4.2,target:[-1.7,1.28,.3]},power:{theta:.82,phi:1.05,radius:5.6,target:[2,1.75,-.3]},case:{theta:.36,phi:1,radius:7.8,target:[.35,1.5,.1]}},qo=class{constructor({container:t,theme:e,settings:i={},audio:n,particles:r,callbacks:a={},onQuality:o=null}){this.container=t,this.theme=e,this.settings=i,this.audio=n,this.particles=r,this.callbacks=a,this.onQuality=o,this.tweens=new Xo,this.quality=Wo(i.quality||"auto"),this.motionReduced=!!e.flags.reduced,this.level="safety",this.step="",this.drag=null,this.leverDrag=null,this.pointers=new Map,this.orbitPointer=null,this.pinch=null,this.lastTap=0,this.cameraState={theta:.36,phi:1.04,radius:9.2},this.cameraTarget=new R(0,1.65,0),this.cameraGoal=null,this.shake=0,this.time=0,this.powerState="off",this.powerProgress=0,this.faultFixed=!1,this.safetyPoweredOff=!1,this.peripheralDisconnected=!1,this.pasteApplied=!1,this.qualitySetting=i.quality||"auto",this.leverOpen=!1,this.clipsOpen=!1,this.cpuSeated=!1,this.ramPlaced=!1,this.ramSeated=!1,this.seat=null,this.highlighted=null,this.exploded=!1,this.xray=!1,this.edgeMaterials=[],this.themeMaterials=[],this.home={},this.interactiveObjects=[],this.raycaster=new or,this.pointer=new vt,this.lastFrame=performance.now(),this.fpsGuard=new Vo({onDowngrade:(l,c)=>this.downgrade(l,c)}),this.disposed=!1,this.build(),this.bindEvents(),this.setTheme(e),this.setLevel("safety",{instant:!0}),this.resize(),this.loop=this.loop.bind(this),this.frame=requestAnimationFrame(this.loop)}build(){let t=new ko({antialias:this.quality.antialias,alpha:!1,powerPreference:"high-performance"});t.outputColorSpace=xe,t.toneMapping=hr,t.toneMappingExposure=1.05,t.shadowMap.enabled=this.quality.shadows,t.shadowMap.type=Tn,t.setPixelRatio(this.quality.dpr),t.domElement.className="pc3d-canvas",t.domElement.setAttribute("aria-label","3D technician workbench"),t.domElement.tabIndex=0,this.container.appendChild(t.domElement),this.renderer=t;let e=new zs;e.background=new Nt(this.theme.palette.bg),e.fog=new ks(this.theme.palette.fog,16,30),this.scene=e;let i=new Ue(42,1,.1,80);this.camera=i;let n=new ir(16777215,4930093,1.2);e.add(n);let r=new hs(16773596,2.1);r.position.set(-4,9,6),r.castShadow=this.quality.shadows,r.shadow.mapSize.set(1024,1024),r.shadow.camera.left=-7,r.shadow.camera.right=7,r.shadow.camera.top=7,r.shadow.camera.bottom=-5,r.shadow.bias=-6e-4,e.add(r);let a=new hs(12180735,.65);a.position.set(7,4,-4),e.add(a);let o=new rr(this.theme.palette.accent,22,12,.55,.5,1.4);o.position.set(3.5,6.5,2.5),o.target.position.set(.5,1.2,0),e.add(o,o.target),this.lights={hemi:n,key:r,fill:a,rim:o},this.grid=new lr(30,30,this.theme.palette.accent,this.theme.palette.accent),this.grid.position.y=.005,this.grid.material.opacity=.16,this.grid.material.transparent=!0,this.grid.visible=!!this.theme.flags.grid,e.add(this.grid),this.bench=rd(this.theme.palette),e.add(this.bench),this.cleaningCloth=new Ot,this.cleaningCloth.name="cleaning-cloth";let l=lt(3520977,"",{roughness:.9}),c=new wt(new fe(.56,.035,.38),l);c.rotation.y=-.3,this.cleaningCloth.add(c);let h=new wt(new fe(.42,.012,.025),lt(12055285,"",{roughness:.8}));h.position.y=.024,h.rotation.y=-.3,this.cleaningCloth.add(h);let d=new wt(new fe(.72,.3,.58),new Re({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}));d.position.y=.12,this.cleaningCloth.add(d),this.cleaningCloth.position.set(-3.55,1.1,.95),ye(this.cleaningCloth,{kind:"click",action:"clean-bench"}),e.add(this.cleaningCloth),this.case=od(this.theme.palette),this.case.position.set(2.35,1.03,-.35),e.add(this.case),this.caseScrews=Array.from({length:4},(u,f)=>{let g=new Ot,_=new wt(new $i(.11,.11,.06,16),lt(13752284,"",{roughness:.38,metalness:.55}));_.rotation.x=Math.PI/2,g.add(_);let m=new wt(new fe(.105,.016,.016),lt(2699321,"",{roughness:.5,metalness:.4}));m.position.z=.036,g.add(m);let p=new wt(new ci(.36,12,10),new Re({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}));g.add(p);let S=f%2===0?-.8:.8,E=f<2?.45:2.45;return g.position.set(S,E,1.77),g.userData.part="case-screw",g.userData.screwIndex=f,ye(g,{kind:"part",part:"case-screw"}),this.case.add(g),g}),this.screwTraySlots=this.caseScrews.map((u,f)=>new R(f%2===0?-.37:.07,1.33,f<2?1.38:1.72)),this.tray=ad(this.theme.palette),this.tray.position.set(-1.9,1.05,.25),e.add(this.tray),this.monitor=fd(this.theme.palette),this.monitor.position.set(-3.65,2.25,-1.55),this.monitor.rotation.y=.12,e.add(this.monitor),this.setMonitorDesktop(),this.character=gd(this.theme.palette),this.character.position.set(-1.1,1.02,-2.15),this.character.rotation.y=.08,e.add(this.character),this.motherboard=ld(this.theme.palette),this.motherboard.position.set(-1.95,1.16,.22),this.motherboard.rotation.y=.02,e.add(this.motherboard),this.cpu=cd(this.theme.palette),this.cpu.position.set(-.55,1.18,1.32),this.cpu.rotation.y=Math.PI/2,this.cpu.userData.part="cpu",ye(this.cpu,{kind:"part",part:"cpu"}),e.add(this.cpu),this.ram=ud(this.theme.palette),this.ram.position.set(.25,1.18,1.35),this.ram.rotation.y=Math.PI,ye(this.ram,{kind:"part",part:"ram"}),e.add(this.ram),this.cooler=hd(this.theme.palette),this.cooler.position.set(-.58,.1,-.38),this.cooler.visible=!1,ye(this.cooler,{kind:"click",action:"cooler"}),this.motherboard.add(this.cooler),ye(this.motherboard.userData.lever,{kind:"lever",action:"lever"}),ye(this.motherboard.userData.ramSlots,{kind:"click",action:"clips"}),this.clipHomes=this.motherboard.userData.ramSlots.children.filter(u=>u.name==="ram-clip").map(u=>({clip:u,position:u.position.clone(),rotation:u.rotation.clone()})),this.psu=dd(this.theme.palette),this.psu.position.set(2.4,1.53,-.6),this.psu.visible=!1,ye(this.psu,{kind:"click",action:"psu"}),e.add(this.psu),this.keyboard=pd(this.theme.palette),this.keyboard.position.set(-.2,1.07,1.9),this.keyboard.rotation.y=-.08,this.keyboard.visible=!1,e.add(this.keyboard),this.mouse=md(this.theme.palette),this.mouse.position.set(1.05,1.07,1.95),this.mouse.visible=!1,e.add(this.mouse),this.strap=xd(this.theme.palette),this.strap.position.set(-3.1,1.14,1.55),ye(this.strap,{kind:"part",part:"strap"}),e.add(this.strap),this.cameraProp=yd(this.theme.palette),this.cameraProp.position.set(-2.55,1.16,1.6),this.cameraProp.rotation.y=-.4,ye(this.cameraProp,{kind:"part",part:"camera"}),e.add(this.cameraProp),this.bins=_d(this.theme.palette),this.bins.position.set(1.05,1.06,-1.5),this.bins.rotation.y=.2,this.bins.visible=!1,ye(this.bins,{kind:"part",part:"bins"}),e.add(this.bins),this.powerStrip=vd(this.theme.palette),this.powerStrip.position.set(3.9,1.07,1.3),this.powerStrip.rotation.y=-.5,e.add(this.powerStrip),this.plug=bd(this.theme.palette),this.plug.position.set(3.88,1.16,1.32),this.plug.rotation.y=-.5,ye(this.plug,{kind:"part",part:"plug"}),e.add(this.plug),this.peripheralCable=Sd(this.theme.palette),this.peripheralCable.position.set(-3.45,2.02,-1.42),this.peripheralCable.rotation.y=.25,ye(this.peripheralCable,{kind:"click",action:"peripheral"}),e.add(this.peripheralCable),this.toolKit=Md(this.theme.palette),this.toolKit.position.set(2.95,1.08,1.9),this.toolKit.rotation.y=-.2,ye(this.toolKit,{kind:"click",action:"tools"}),e.add(this.toolKit),this.flashlight=wd(this.theme.palette),this.flashlight.position.set(3.25,1.2,1.9),this.flashlight.rotation.z=-.8,e.add(this.flashlight),this.buildGhosts(),this.buildFanCable(),this.buildOutline(this.bench,this.theme.palette),this.buildOutline(this.case,this.theme.palette),this.buildOutline(this.motherboard,this.theme.palette),this.buildOutline(this.cpu,this.theme.palette),this.buildOutline(this.ram,this.theme.palette),this.home={cpu:this.cpu.position.clone(),ram:this.ram.position.clone(),strap:this.strap.position.clone(),camera:this.cameraProp.position.clone(),bins:this.bins.position.clone(),plug:this.plug.position.clone()},this.interactiveObjects=[this.cpu,this.ram,this.strap,this.cameraProp,this.bins,this.plug,...this.caseScrews,this.peripheralCable,this.case.userData.powerHitTarget,this.case.userData.powerButton,this.character.userData.bracelet,this.motherboard.userData.lever,this.cooler,this.psu,this.toolKit,this.cleaningCloth],this.raycastTargets=[this.cpu,this.ram,this.strap,this.cameraProp,this.bins,this.plug,...this.caseScrews,this.peripheralCable,this.case.userData.powerHitTarget,this.case.userData.powerButton,this.case,this.character.userData.bracelet,this.motherboard.userData.lever,this.motherboard.userData.ramSlots,this.cooler,this.psu,this.toolKit,this.fanCable.userData.connector,this.cleaningCloth]}buildGhosts(){let t=(e,i,n,r)=>{let a=new Ot,o=new wt(new fe(e,i,n),new Re({color:r,transparent:!0,opacity:.16,depthWrite:!1}));a.add(o);let l=new wn(new ls(new fe(e,i,n)),new cn({color:r,transparent:!0,opacity:.9}));return a.add(l),a.userData.mesh=o,a.userData.edges=l,a.visible=!1,this.scene.add(a),a};this.ghostCpu=t(.58,.03,.58,this.theme.palette.accent2),this.ghostRam=t(.14,.06,1.2,this.theme.palette.accent2)}buildFanCable(){let t=new Ot;t.name="fan-cable";let e=lt(this.theme.palette.metal,"metal",{roughness:.35,metalness:.7}),i=lt(1514272,"",{roughness:.8,metalness:.05}),n=new Ot;n.add(new wt(new fe(.14,.08,.1),lt(15327954,"",{roughness:.7})));for(let a=0;a<4;a+=1)n.add(new wt(new fe(.02,.03,.02),e).translateX(-.045+a*.03).translateZ(.055));t.add(n);let r=new Ci([new R(0,0,0),new R(-.1,-.2,.05),new R(-.02,-.42,.18),new R(.16,-.5,.24)]);t.add(new wt(new Zi(r,18,.014,5,!1),i)),t.position.set(1.56,2.8,-.18),t.rotation.y=.2,ye(n,{kind:"click",action:"fan-cable"}),t.userData.connector=n,t.visible=!1,this.scene.add(t),this.fanCable=t,this.fanCableHome=t.position.clone()}buildOutline(t,e){let i=e.accent2;t.traverse(n=>{if(!(!n.isMesh||n.userData.skipOutline)&&n.geometry?.attributes?.position)try{let r=new wn(new ls(n.geometry,28),new cn({color:i,transparent:!0,opacity:.4}));r.visible=!!this.theme.flags.outline,r.userData.outline=!0,r.userData.skipOutline=!0,n.add(r),this.edgeMaterials.push(r.material)}catch{}})}setMonitorDesktop(){let t=document.createElement("canvas");t.width=1024,t.height=576;let e=t.getContext("2d"),i=this.theme.palette;e.fillStyle="#071018",e.fillRect(0,0,1024,576),e.fillStyle=`#${(i.accent||11740702).toString(16).padStart(6,"0")}`,e.fillRect(0,0,1024,10),e.fillStyle="rgba(220, 244, 255, 0.86)",e.font="700 38px system-ui, sans-serif",e.fillText("TECHPRO WORKSTATION",72,110),e.font="500 20px monospace",e.fillStyle="rgba(190, 225, 240, 0.62)",e.fillText("Bench session ready",74,152),e.fillStyle="rgba(255,255,255,0.08)",e.fillRect(72,200,360,220),e.fillRect(468,200,480,96),e.fillRect(468,324,480,96),e.fillStyle=`#${(i.accent2||3038031).toString(16).padStart(6,"0")}`,e.fillRect(96,230,130,16),e.fillRect(96,264,220,10),e.fillRect(96,286,170,10),e.fillStyle="rgba(220, 244, 255, 0.5)",e.fillRect(500,232,240,12),e.fillRect(500,258,160,10);let n=new Xi(t);n.colorSpace=xe,this.monitor.userData.screenMat.map=n,this.monitor.userData.screenMat.needsUpdate=!0}setBoot(t){if(!this.bootTexture){this.bootTexture=Dc(this.theme.palette,t),this.monitor.userData.screenMat.map=this.bootTexture,this.monitor.userData.screenMat.needsUpdate=!0;return}let e=Dc(this.theme.palette,t);this.monitor.userData.screenMat.map?.dispose?.(),this.bootTexture=e,this.monitor.userData.screenMat.map=e,this.monitor.userData.screenMat.needsUpdate=!0}bindEvents(){let t=this.renderer.domElement;t.addEventListener("pointerdown",e=>this.onPointerDown(e)),t.addEventListener("pointermove",e=>this.onPointerMove(e)),t.addEventListener("pointerup",e=>this.onPointerUp(e)),t.addEventListener("pointercancel",e=>this.onPointerCancel(e)),t.addEventListener("wheel",e=>this.onWheel(e),{passive:!1}),t.addEventListener("contextmenu",e=>e.preventDefault()),t.addEventListener("keydown",e=>this.onKey(e)),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container)}resize(){if(!this.renderer||this.disposed)return;let t=Math.max(1,this.container.clientWidth),e=Math.max(1,this.container.clientHeight);this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}onKey(t){(t.key==="r"||t.key==="R")&&this.rotateSelected(),t.key==="Escape"&&this.callbacks.onEscape?.(),(t.key==="e"||t.key==="E")&&this.toggleExploded(),(t.key==="x"||t.key==="X")&&this.toggleXray(),(t.key==="Enter"||t.code==="Space")&&this.callbacks.canDrag?.("lever")&&(t.preventDefault(),this.callbacks.onClick?.("lever"))}pointerNdc(t){let e=this.renderer.domElement.getBoundingClientRect();return this.pointer.x=(t.clientX-e.left)/e.width*2-1,this.pointer.y=-((t.clientY-e.top)/e.height)*2+1,this.pointer}pointerDistanceTo(t,e){let i=e.clone().project(this.camera),n=this.renderer.domElement.getBoundingClientRect(),r=n.left+(i.x+1)*n.width/2,a=n.top+(1-i.y)*n.height/2;return Math.hypot(t.clientX-r,t.clientY-a)}pick(t){this.raycaster.setFromCamera(this.pointerNdc(t),this.camera);let e=this.motherboard.userData.lever;if(this.callbacks.canDrag?.("lever")){let n=this.raycaster.intersectObject(e,!0);if(n.length)return{object:e,hit:n[0]}}for(let n of["case-screw","cpu","ram"]){if(!this.callbacks.canDrag?.(n))continue;let r=n==="case-screw"?this.caseScrews.filter(o=>o.visible&&o.userData.interactive):[n==="cpu"?this.cpu:this.ram],a=this.raycaster.intersectObjects(r,!0);if(a.length){let o=a[0].object;for(;o&&o.userData?.interactive?.part!==n;)o=o.parent;if(o)return{object:o,hit:a[0]}}}let i=this.raycaster.intersectObjects(this.raycastTargets,!0);for(let n of i){let r=n.object;for(;r;){if(r.userData?.interactive){if(r.userData.interactive.part==="case-screw")for(;r.parent&&r.userData.screwIndex==null;)r=r.parent;return{object:r,hit:n}}r=r.parent}}return null}onPointerDown(t){if(t.button!==0&&t.button!==1&&t.button!==2)return;if(this.renderer.domElement.focus({preventScroll:!0}),this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.pointers.size===2){let[n,r]=[...this.pointers.values()];this.pinch={distance:Math.hypot(n.x-r.x,n.y-r.y),mid:{x:(n.x+r.x)/2,y:(n.y+r.y)/2}},this.drag=null,this.orbitPointer=null;return}if(t.button===2||t.button===1){t.preventDefault(),this.orbitPointer={id:t.pointerId,x:t.clientX,y:t.clientY},this.renderer.domElement.setPointerCapture?.(t.pointerId);return}let e=this.pick(t);if(e){let n=e.object.userData.interactive;if(n.kind==="part"){if(n.part==="cpu"&&this.level==="cpu"&&this.cpuSeated){this.audio.click(),this.callbacks.onClick?.("paste",e.object);return}if(n.part==="ram"&&this.ramPlaced&&!this.ramSeated){this.startSeat();return}if(this.level==="power"&&n.part==="ram"){this.audio.click(),this.callbacks.onClick?.("ram",e.object);return}this.startDrag(e.object,n.part,t);return}if(n.kind==="lever"){this.startLeverDrag(t);return}if(n.kind==="click"){this.audio.click(),this.callbacks.onClick?.(n.action,e.object);return}if(n.kind==="safety"){this.audio.click(),this.callbacks.onClick?.(n.action,e.object);return}}this.orbitPointer={id:t.pointerId,x:t.clientX,y:t.clientY},this.renderer.domElement.setPointerCapture?.(t.pointerId);let i=performance.now();i-this.lastTap<320&&this.focus("overview"),this.lastTap=i}startDrag(t,e,i){if(this.callbacks.canDrag&&!this.callbacks.canDrag(e)){this.callbacks.onBlocked?.(e);return}this.tweens.stop(t.position),e==="case-screw"&&this.scene.attach(t);let n=new R;this.raycaster.setFromCamera(this.pointerNdc(i),this.camera);let r=new Qe().setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(new R),t.position);this.raycaster.ray.intersectPlane(r,n)&&(this.drag={object:t,part:e,pointerId:i.pointerId,offset:t.position.clone().sub(n),plane:r,lastPoint:n.clone(),speed:0,lastTime:performance.now(),home:t.position.clone(),lift:0,moved:0,lastX:i.clientX,lastY:i.clientY},this.audio.pick(),this.callbacks.onPick?.(e),this.tweens.to(t.scale,{x:1.08,y:1.08,z:1.08},{duration:120,easing:"outBack"}),this.renderer.domElement.setPointerCapture?.(i.pointerId))}startLeverDrag(t){if(this.callbacks.canDrag&&!this.callbacks.canDrag("lever")){this.callbacks.onBlocked?.("lever");return}this.leverDrag={pointerId:t.pointerId,startY:t.clientY,closing:this.leverOpen,progress:this.leverOpen?1:0,moved:0},t.preventDefault(),this.renderer.domElement.setPointerCapture?.(t.pointerId)}onPointerMove(t){if(this.pointers.has(t.pointerId)&&this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.pinch&&this.pointers.size===2){let[e,i]=[...this.pointers.values()],n=Math.hypot(e.x-i.x,e.y-i.y),r={x:(e.x+i.x)/2,y:(e.y+i.y)/2},a=this.pinch.distance-n;this.cameraState.radius=Ye.clamp(this.cameraState.radius+a*.012,3.2,15),this.cameraState.theta-=(r.x-this.pinch.mid.x)*.004,this.cameraState.phi=Ye.clamp(this.cameraState.phi-(r.y-this.pinch.mid.y)*.003,.16,1.44),this.pinch={distance:n,mid:r};return}if(this.seat?.holding){let e=t.clientX-(this.seat.lastX??t.clientX);this.seat.lastX=t.clientX,this.seat.balance-=e*.0022,this.seat.balance=Ye.clamp(this.seat.balance,-.9,.9);return}if(this.leverDrag?.pointerId===t.pointerId){let{startY:e,closing:i}=this.leverDrag;this.leverDrag.moved=Math.max(this.leverDrag.moved,Math.abs(t.clientY-e));let n=i?Ye.clamp(1-(t.clientY-e)/52,0,1):Ye.clamp((e-t.clientY)/52,0,1);this.leverDrag.progress=n,this.setLeverProgress(n);return}if(this.drag?.pointerId===t.pointerId){let e=t.clientX-this.drag.lastX,i=t.clientY-this.drag.lastY;this.drag.lastX=t.clientX,this.drag.lastY=t.clientY,this.drag.moved+=Math.hypot(e,i);let n=new R;if(this.raycaster.setFromCamera(this.pointerNdc(t),this.camera),!this.raycaster.ray.intersectPlane(this.drag.plane,n))return;let r=n.add(this.drag.offset);r.x=Ye.clamp(r.x,-4.2,4.2),r.z=Ye.clamp(r.z,-2.2,2.2),r.y=Math.max(1.28,r.y);let a=performance.now(),o=Math.max(.016,(a-this.drag.lastTime)/1e3),l=r.distanceTo(this.drag.lastPoint);this.drag.speed=Ye.lerp(this.drag.speed,l/o,.35),this.drag.lastPoint.copy(r),this.drag.lastTime=a,this.drag.object.position.copy(r),this.updateGhost();return}if(this.orbitPointer&&this.orbitPointer.id===t.pointerId){let e=t.clientX-this.orbitPointer.x,i=t.clientY-this.orbitPointer.y;this.orbitPointer.x=t.clientX,this.orbitPointer.y=t.clientY,this.cameraState.theta-=e*.005,this.cameraState.phi=Ye.clamp(this.cameraState.phi-i*.004,.16,1.44)}}onPointerUp(t){if(this.pointers.delete(t.pointerId),this.pinch&&this.pointers.size<2&&(this.pinch=null),this.leverDrag?.pointerId===t.pointerId){let{progress:e,closing:i,moved:n}=this.leverDrag;if(this.leverDrag=null,n<8){this.callbacks.onClick?.("lever");return}(i?e<=.28:e>=.72)?this.callbacks.onClick?.("lever"):(this.setLever(this.leverOpen),this.callbacks.onLeverDragIncomplete?.());return}if(this.seat?.holding){this.finishSeat();return}if(this.drag?.pointerId===t.pointerId){let e=this.drag;if(e.moved<9&&this.level==="safety"&&["strap","bins","camera","plug"].includes(e.part)){this.drag=null,this.ghostCpu.visible=!1,this.ghostRam.visible=!1,this.tweens.to(e.object.scale,{x:1,y:1,z:1},{duration:140,easing:"outBack"}),this.returnHome(e.object,e.home),this.audio.click(),this.callbacks.onClick?.(e.part,e.object);return}this.dropDrag(t);return}this.orbitPointer?.id===t.pointerId&&(this.orbitPointer=null)}onPointerCancel(t){if(this.pointers.delete(t.pointerId),this.pinch&&this.pointers.size<2&&(this.pinch=null),this.leverDrag?.pointerId===t.pointerId&&(this.leverDrag=null,this.setLever(this.leverOpen)),this.drag?.pointerId===t.pointerId){let{object:e,home:i}=this.drag;this.drag=null,this.ghostCpu.visible=!1,this.ghostRam.visible=!1,this.tweens.stop(e.position),this.tweens.to(e.scale,{x:1,y:1,z:1},{duration:120}),this.returnHome(e,i)}this.seat?.holding&&(this.seat=null,this.callbacks.onSeatCancel?.()),this.orbitPointer?.id===t.pointerId&&(this.orbitPointer=null)}onWheel(t){t.preventDefault(),this.cameraState.radius=Ye.clamp(this.cameraState.radius+t.deltaY*.004,3.2,15)}updateGhost(){if(!this.drag)return;let{part:t,object:e}=this.drag;if(this.ghostCpu.visible=!1,this.ghostRam.visible=!1,t==="cpu"){let i=this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone()),n=this.cpuOrientationValid();this.ghostCpu.visible=!0,this.ghostCpu.position.set(i.x,i.y+.03,i.z),this.ghostCpu.rotation.y=e.rotation.y,this.setGhostColor(this.ghostCpu,n?this.theme.palette.accent2:12597547),this.callbacks.onGhost?.(n)}if(t==="ram"){let i=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone()),n=this.ramOrientationValid();this.ghostRam.visible=!0,this.ghostRam.position.copy(i),this.ghostRam.rotation.y=e.rotation.y,this.setGhostColor(this.ghostRam,n?this.theme.palette.accent2:12597547),this.callbacks.onGhost?.(n)}}setGhostColor(t,e){t.userData.mesh.material.color.setHex(e),t.userData.edges.material.color.setHex(e)}dropDrag(t){let e=this.drag;this.drag=null,this.ghostCpu.visible=!1,this.ghostRam.visible=!1,this.tweens.stop(e.object.position),this.tweens.to(e.object.scale,{x:1,y:1,z:1},{duration:140,easing:"outBack"});let{part:i,object:n}=e;if(i==="case-screw"){let r=n.userData.screwIndex,a=this.screwTraySlots[r];if(!a){this.returnHome(n,e.home),this.callbacks.onPartDrop?.({part:i,valid:!1,screwIndex:r});return}if(e.moved<9){this.returnHome(n,e.home);return}let o=a.clone().project(this.camera),l=this.renderer.domElement.getBoundingClientRect(),c=l.left+(o.x+1)*l.width/2,h=l.top+(1-o.y)*l.height/2,d=Math.hypot(t.clientX-c,t.clientY-h)<Math.max(100,Math.min(140,l.width*.2));d?(n.position.copy(a),n.userData.interactive=null,n.traverse(u=>{u.userData.interactive=null}),this.audio.clickSnap(),this.particles.sparkBurst(a,this.theme.palette.metal)):this.returnHome(n,e.home),this.callbacks.onPartDrop?.({part:i,valid:d,screwIndex:r});return}if(i==="cpu"){let r=this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone()),a=this.pointerDistanceTo(t,r),o=this.renderer.domElement.getBoundingClientRect(),l=Math.max(56,Math.min(84,o.width*.16)),c=this.cpuOrientationValid();if(a<l){if(!this.leverOpen){this.reject(n,"lever"),this.callbacks.onPartDrop?.({part:i,valid:!1,reason:"lever",speed:e.speed,height:0});return}if(!c){this.reject(n,"orientation"),this.callbacks.onPartDrop?.({part:i,valid:!1,reason:"orientation",speed:e.speed,height:0});return}this.audio.drop(),this.callbacks.onPartDrop?.({part:i,valid:!0,speed:e.speed,height:0});return}}if(i==="ram"){let r=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone()),a=this.pointerDistanceTo(t,r),o=this.renderer.domElement.getBoundingClientRect(),l=Math.max(56,Math.min(84,o.width*.16));if(a<l){if(!this.ramOrientationValid()){this.reject(n,"orientation"),this.callbacks.onPartDrop?.({part:i,valid:!1,reason:"orientation",speed:e.speed});return}this.audio.drop(),this.callbacks.onPartDrop?.({part:i,valid:!0,speed:e.speed});return}}if(i==="bracelet"){let r=this.tray.localToWorld(new R(-.6,.25,1.1)),a=this.pointerDistanceTo(t,r)<this.dropRadius();this.callbacks.onSafetyDrop?.({action:"bracelet",valid:a}),a?(this.character.userData.bracelet.visible=!1,this.audio.clickSnap(),this.particles.dustBurst(n.position,this.theme.palette.metal),n.visible=!1):this.reject(n,"target");return}if(i==="strap"){let r=this.character.localToWorld(new R(-.43,1.16,.03)),a=this.pointerDistanceTo(t,r)<this.dropRadius();this.callbacks.onSafetyDrop?.({action:"strap",valid:a}),a?(this.character.userData.wornStrap.visible=!0,this.audio.clickSnap(),this.particles.sparkBurst(r,this.theme.palette.accent),n.visible=!1):this.reject(n,"target");return}if(i==="camera"){let r=this.peripheralCable.getWorldPosition(new R),a=this.pointerDistanceTo(t,r)<this.dropRadius();this.callbacks.onSafetyDrop?.({action:"camera",valid:a}),a?(this.callbacks.onFlash?.(),this.audio.clickSnap(),this.tweens.to(n.position,this.home.camera,{duration:360,easing:"outCubic"})):this.reject(n,"target");return}if(i==="bins"){let r=new R(1,1.07,1.9),a=this.pointerDistanceTo(t,r)<this.dropRadius();this.callbacks.onSafetyDrop?.({action:"bins",valid:a}),a?(this.audio.clickSnap(),this.tweens.to(n.position,{x:1,y:1.07,z:1.9},{duration:360,easing:"outCubic"}),this.tweens.to(n.rotation,{y:0},{duration:300})):this.reject(n,"target");return}if(i==="plug"){let r=this.pointerDistanceTo(t,this.powerStrip.position)>this.dropRadius();this.callbacks.onSafetyDrop?.({action:"plug",valid:r}),r?(this.audio.clickSnap(),this.callbacks.onUnplugged?.()):this.reject(n,"target");return}this.returnHome(n,e.home)}reject(t,e){this.audio.error(),this.shake=this.motionReduced?0:.18,this.callbacks.onReject?.(e),this.tweens.to(t.position,{y:t.position.y+.14},{duration:100,easing:"outQuad"}),this.tweens.to(t.position,{y:Math.max(1.2,t.position.y)},{duration:240,delay:100,easing:"outElastic"}),this.tweens.to(t.rotation,{z:.18},{duration:90,easing:"outQuad"}),this.tweens.to(t.rotation,{z:0},{duration:260,delay:90,easing:"outElastic"}),this.particles.sparkBurst(t.position,16757575),t.userData.part&&this.returnHome(t,this.home[t.userData.part]||t.position.clone())}returnHome(t,e){this.tweens.to(t.position,{x:e.x,y:e.y,z:e.z},{duration:360,easing:"outCubic"})}dropRadius(){let t=this.renderer.domElement.getBoundingClientRect().width;return Math.max(96,Math.min(150,t*.2))}rotateSelected(){this.level==="cpu"&&!this.cpuSeated?(this.cpu.rotation.y+=Math.PI/2,this.audio.click(),this.tweens.to(this.cpu.scale,{x:1.12,y:1.12,z:1.12},{duration:80,easing:"outQuad"}),this.tweens.to(this.cpu.scale,{x:1,y:1,z:1},{duration:180,delay:80,easing:"outBack"}),this.callbacks.onRotate?.({part:"cpu",aligned:this.cpuOrientationValid()})):this.level==="ram"&&!this.ramPlaced&&(this.ram.rotation.y+=Math.PI,this.audio.click(),this.tweens.to(this.ram.scale,{x:1.12,y:1.12,z:1.12},{duration:80}),this.tweens.to(this.ram.scale,{x:1,y:1,z:1},{duration:180,delay:80,easing:"outBack"}),this.callbacks.onRotate?.({part:"ram",aligned:this.ramOrientationValid()}))}cpuOrientationValid(){let t=(this.cpu.rotation.y%(Math.PI*2)+Math.PI*2)%(Math.PI*2);return t<.08||t>Math.PI*2-.08}ramOrientationValid(){let t=(this.ram.rotation.y%(Math.PI*2)+Math.PI*2)%(Math.PI*2);return t<.08||t>Math.PI*2-.08}setLever(t){this.leverOpen=!!t;let e=this.motherboard.userData.lever;this.tweens.to(e.rotation,{x:t?-.7:0},{duration:260,easing:"outCubic"}),this.tweens.to(e.position,{y:t?.13:.05},{duration:260,easing:"outCubic"}),this.audio.clickSnap(),this.particles.sparkBurst(e.getWorldPosition(new R),this.theme.palette.metal)}setLeverProgress(t){let e=this.motherboard.userData.lever;e.rotation.x=-.7*t,e.position.y=.05+.08*t}openCasePanel(){this.tweens.to(this.case.userData.panel.position,{x:-1.95},{duration:420,easing:"outCubic"})}shutdownSafety(){this.safetyPoweredOff=!0,this.powerState="off",this.case.userData.rgb.material.emissiveIntensity=.05,this.monitor.userData.screenMat.map=null,this.monitor.userData.screenMat.color.setHex(329739),this.monitor.userData.screenMat.needsUpdate=!0,this.monitor.userData.led.material.color.setHex(3877412),this.audio.clickSnap(),this.particles.dustBurst(this.case.userData.powerButton.getWorldPosition(new R),this.theme.palette.metal),this.callbacks.onShutdown?.()}cleanBench(){let t=this.cleaningCloth;this.audio.clickSnap(),this.particles.dustBurst(t.position,this.theme.palette.accent2),this.tweens.to(t.position,{x:-2.05},{duration:380,easing:"inOutCubic",onComplete:()=>{t.visible=!1}})}arrangeBench(){let t=new R(1,1.07,1.9);this.tray.visible=!0,this.tray.position.set(-1.9,1.05,.25),this.bins.visible=!0,this.audio.clickSnap(),this.particles.sparkBurst(t,this.theme.palette.accent2),this.tweens.to(this.bins.position,{x:t.x,y:t.y,z:t.z},{duration:420,easing:"outCubic"}),this.tweens.to(this.bins.rotation,{y:0},{duration:320}),this.tweens.to(this.toolKit.rotation,{y:this.toolKit.rotation.y+.35},{duration:260,easing:"outCubic"})}disconnectPeripheral(){this.peripheralDisconnected=!0,this.audio.clickSnap(),this.tweens.to(this.peripheralCable.rotation,{z:-.5,y:.75},{duration:280,easing:"outCubic"}),this.particles.dustBurst(this.peripheralCable.getWorldPosition(new R),this.theme.palette.metal),this.callbacks.onPeripheralDisconnected?.()}unplugPower(){this.audio.clickSnap(),this.tweens.to(this.plug.position,{x:5.15,y:1.16,z:2.3},{duration:420,easing:"outCubic"}),this.tweens.to(this.plug.rotation,{y:.8,z:.25},{duration:360,easing:"outCubic"}),this.particles.dustBurst(this.plug.getWorldPosition(new R),this.theme.palette.metal),this.callbacks.onUnplugged?.()}openRamClips(){this.clipsOpen||(this.clipsOpen=!0,this.motherboard.userData.ramSlots.children.filter(t=>t.name==="ram-clip").forEach(t=>{let e=t.position.z<-.2?-1:1;this.tweens.to(t.rotation,{x:e*.55},{duration:220,easing:"outBack"}),this.tweens.to(t.position,{z:t.position.z+e*.06},{duration:220,easing:"outBack"})}),this.audio.clickSnap(),this.callbacks.onClipsOpen?.())}closeRamClips(){this.clipsOpen&&(this.clipsOpen=!1,this.motherboard.userData.ramSlots.children.filter(t=>t.name==="ram-clip").forEach(t=>{let e=t.position.z<-.2?-1:1;this.tweens.to(t.rotation,{x:0},{duration:220,easing:"outCubic"}),this.tweens.to(t.position,{z:t.position.z-e*.06},{duration:220,easing:"outCubic"})}),this.audio.clickSnap(),this.callbacks.onClipsClosed?.())}removeBracelet(){let t=this.character.userData.bracelet;t.visible&&(this.audio.clickSnap(),this.particles.dustBurst(t.getWorldPosition(new R),this.theme.palette.metal),this.tweens.to(t.scale,{x:.1,y:.1,z:.1},{duration:260,easing:"inQuad",onComplete:()=>{t.visible=!1}}),this.callbacks.onJewelryRemoved?.())}prepareBins(){let t=new R(1,1.07,1.9);this.audio.clickSnap(),this.tweens.to(this.bins.position,{x:t.x,y:t.y,z:t.z},{duration:420,easing:"outCubic"}),this.tweens.to(this.bins.rotation,{y:0},{duration:320}),this.particles.sparkBurst(t,this.theme.palette.accent2),this.callbacks.onBinsReady?.()}wearStrap(){let t=this.strap;t.visible&&(this.character.userData.wornStrap.visible=!0,this.character.userData.bracelet.visible=!1,this.audio.clickSnap(),this.particles.sparkBurst(this.character.userData.wornStrap.getWorldPosition(new R),this.theme.palette.accent),this.tweens.to(t.scale,{x:.1,y:.1,z:.1},{duration:240,easing:"inQuad",onComplete:()=>{t.visible=!1}}),this.callbacks.onStrapWorn?.())}documentConnections(){this.audio.clickSnap(),this.particles.sparkBurst(this.peripheralCable.getWorldPosition(new R),this.theme.palette.accent2),this.callbacks.onDocumented?.(),this.callbacks.onFlash?.()}applyPaste(){if(this.pasteApplied=!0,!this.pasteBlob){let t=new wt(new $i(.09,.11,.018,18),lt(13222840,"",{roughness:.55,metalness:.1}));t.position.set(0,.07,0),t.userData.skipOutline=!0,this.cpu.add(t),this.pasteBlob=t}this.pasteBlob.visible=!0,this.pasteBlob.scale.setScalar(.1),this.tweens.to(this.pasteBlob.scale,{x:1,y:1,z:1},{duration:320,easing:"outBack"}),this.audio.paste(),this.callbacks.onPasteApplied?.()}showCoolerReady(){if(this.cpuSeated){this.cooler.visible=!0;let t=this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone()),e=t.y+.11;this.cooler.position.set(t.x,e+1,t.z),this.cooler.scale.set(1,1,1),this.tweens.to(this.cooler.position,{y:e},{duration:460,easing:"outCubic"}),this.audio.whoosh(),this.callbacks.onCoolerReady?.()}}mountCooler(){if(!this.cooler.visible)return;let t=this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone());this.tweens.stop(this.cooler.position),this.cooler.position.set(t.x,t.y+.11,t.z),this.audio.snap(),this.particles.sparkBurst(this.cooler.getWorldPosition(new R),this.theme.palette.accent),this.callbacks.onCoolerMounted?.()}reseatRamPower(){this.audio.clickSnap();let t=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());this.tweens.stop(this.ram.position),this.ram.position.copy(t),this.particles.sparkBurst(this.ram.getWorldPosition(new R),this.theme.palette.accent2),this.callbacks.onRamReseated?.()}checkPsu(){this.audio.clickSnap(),this.particles.sparkBurst(this.psu.getWorldPosition(new R),this.theme.palette.accent),this.tweens.to(this.psu.scale,{x:1.04,y:1.04,z:1.04},{duration:140}),this.tweens.to(this.psu.scale,{x:1,y:1,z:1},{duration:220,delay:140,easing:"outBack"}),this.callbacks.onPsuChecked?.()}checkMonitorCable(){this.audio.clickSnap(),this.particles.sparkBurst(this.peripheralCable.getWorldPosition(new R),this.theme.palette.metal),this.tweens.to(this.peripheralCable.rotation,{z:0,y:.25},{duration:320,easing:"outCubic"}),this.callbacks.onMonitorCableChecked?.()}seatCpu({gentle:t=!0}={}){this.cpuSeated=!0;let e=this.motherboard.localToWorld(this.motherboard.userData.socketPosition.clone());this.tweens.stop(this.cpu.position),this.tweens.stop(this.cpu.rotation),this.cpu.position.set(e.x,e.y+.03,e.z),this.cpu.rotation.set(0,0,0),this.audio.snap(),this.particles.dustBurst(e,this.theme.palette.metal),this.callbacks.onCpuSeated?.(t)}seatRamReady(){this.ramPlaced=!0;let t=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());this.tweens.stop(this.ram.position),this.tweens.stop(this.ram.rotation),this.tweens.to(this.ram.position,{x:t.x,y:t.y+.1,z:t.z},{duration:340,easing:"outCubic"}),this.tweens.to(this.ram.rotation,{y:0},{duration:260,easing:"outCubic"}),this.audio.drop(),this.callbacks.onRamPlaced?.()}startSeat(){this.seat||(this.seat={holding:!0,pressure:0,balance:0,elapsed:0,tiltTime:0,lastX:null},this.audio.paste(),this.callbacks.onSeatStart?.())}nudgeSeat(t){this.seat&&(this.seat.balance=Ye.clamp(this.seat.balance-t*.0022,-.9,.9))}finishSeat(){if(!this.seat)return;let t=this.seat;this.seat=null;let e=Math.abs(t.balance)<.36&&t.tiltTime<.45,i=t.pressure,n=i>=.65&&i<=.9&&e;n?this.completeRam():this.failRam({pressure:i,balanced:e}),this.callbacks.onSeatResult?.({ok:n,pressure:i,balanced:e,overpressure:i>.9,underpressure:i<.65})}completeRam(){this.ramSeated=!0;let t=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());this.tweens.stop(this.ram.position),this.tweens.stop(this.ram.rotation),this.ram.position.copy(t),this.ram.rotation.set(0,0,0),this.audio.snap(),this.particles.sparkBurst(t,this.theme.palette.accent2),this.callbacks.onRamSeated?.()}failRam({pressure:t,balanced:e}){this.ramPlaced=!0,this.audio.error(),this.shake=this.motionReduced?0:.2;let i=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());this.tweens.to(this.ram.position,{x:i.x,y:i.y+.14,z:i.z},{duration:360,easing:"outCubic"}),this.tweens.to(this.ram.rotation,{z:0},{duration:200}),this.particles.sparkBurst(this.ram.position,16757575),this.callbacks.onRamFailed?.({pressure:t,balanced:e})}setRamSeatVisual(t,e){if(!this.ramPlaced)return;this.ram.rotation.z=e*.26;let i=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());this.ram.position.y=i.y+.1-t*.1}mountBoardInCase(){let e=this.case.userData.boardMount.getWorldPosition(new R);this.tweens.to(this.motherboard.position,{x:e.x,y:e.y,z:e.z},{duration:900,easing:"inOutCubic"}),this.tweens.to(this.motherboard.rotation,{x:0,y:0,z:-Math.PI/2},{duration:900,easing:"inOutCubic"}),this.tweens.to(this.motherboard.scale,{x:.82,y:.82,z:.82},{duration:900,easing:"inOutCubic"}),this.psu.visible=!0,this.fanCable.visible=!0,this.tweens.delay(.95,()=>{let i=this.motherboard.localToWorld(this.motherboard.userData.ramSlotPosition.clone());this.level==="power"&&this.ram.position.copy(i),this.callbacks.onBoardMounted?.()})}setPowerState(t){this.powerState=t;let e=t==="on"||t==="booting";this.case.userData.rgb.material.emissiveIntensity=e?1.8:.12,this.monitor.userData.led.material.color.setHex(e?this.theme.palette.accent:3877412),(t==="off"||t==="fault")&&(this.monitor.userData.screenMat.map=null,this.monitor.userData.screenMat.color.setHex(329739),this.monitor.userData.screenMat.needsUpdate=!0),e&&(this.bootProgress=0,this.setBoot(.04),this.audio.fan())}powerOn(){this.powerState="booting",this.powerProgress=0,this.setPowerState("booting"),this.callbacks.onPowerOn?.()}bootStep(t){this.powerState==="booting"&&(this.powerProgress=Math.min(1,this.powerProgress+t*.55),this.powerProgress<.98?(!this.lastBootDraw||this.time-this.lastBootDraw>.14)&&(this.lastBootDraw=this.time,this.setBoot(this.powerProgress)):(this.powerState="on",this.setBoot(1),this.callbacks.onBooted?.()))}powerFault(){this.powerState="fault",this.setPowerState("fault"),this.shake=this.motionReduced?0:.3,this.callbacks.onPowerFault?.()}fixFanCable(){this.faultFixed=!0,this.audio.snap(),this.particles.sparkBurst(this.fanCable.position,this.theme.palette.accent),this.tweens.to(this.fanCable.position,{x:1.57,y:2.73,z:-.18},{duration:320,easing:"outBack"}),this.callbacks.onFaultFixed?.()}inspectFanCable(){this.audio.click(),this.particles.dustBurst(this.fanCable.userData.connector.getWorldPosition(new R),this.theme.palette.metal),this.callbacks.onFanInspected?.()}setLevel(t,{instant:e=!1}={}){this.tweens.clear(),this.level=t,this.ghostCpu.visible=!1,this.ghostRam.visible=!1,this.drag=null,this.leverDrag=null,this.seat=null,this.ramPlaced=!1,this.ramSeated=!1,this.cpuSeated=!1,this.faultFixed=!1,this.safetyPoweredOff=!1,this.peripheralDisconnected=!1,this.pasteApplied=!1,this.powerState="off",this.fanCable.visible=!1,this.fanCable.position.copy(this.fanCableHome),this.psu.visible=!1,this.psu.scale.set(1,1,1),this.keyboard.visible=!1,this.mouse.visible=!1,this.cooler.visible=!1,this.cooler.position.set(-.58,.1,-.38),this.cooler.scale.set(1,1,1),this.motherboard.visible=!0,this.motherboard.position.set(-1.95,1.16,.22),this.motherboard.rotation.set(0,.02,0),this.motherboard.scale.set(1,1,1),this.cpu.visible=!0,this.cpu.position.copy(this.home.cpu),this.cpu.rotation.set(0,-Math.PI/2,0),this.ram.visible=!0,this.ram.position.copy(this.home.ram),this.ram.rotation.set(0,Math.PI,0),this.strap.visible=!0,this.strap.position.copy(this.home.strap),this.strap.scale.set(1,1,1),this.cameraProp.visible=!0,this.cameraProp.position.copy(this.home.camera),this.bins.visible=!1,this.bins.position.copy(this.home.bins),this.plug.visible=!0,this.plug.position.copy(this.home.plug),this.character.visible=!0,this.character.userData.bracelet.visible=!0,this.character.userData.bracelet.scale.set(1,1,1),this.character.userData.wornStrap.visible=!1,this.peripheralCable.visible=!0,this.peripheralCable.rotation.set(0,.25,0),this.powerStrip.visible=!0,this.tray.visible=!0,this.toolKit.rotation.y=-.2,this.toolKit.scale.set(1,1,1),this.case.userData.panel.position.x=-1.45,this.cleaningCloth.visible=t==="safety",this.cleaningCloth.position.set(-3.55,1.1,.95),this.cleaningCloth.scale.set(1,1,1),this.tray.visible=t!=="safety",this.caseScrews.forEach((i,n)=>{let r=n%2===0?-.8:.8,a=n<2?.45:2.45;this.case.add(i),i.position.set(r,a,1.77),i.rotation.set(0,0,0),i.scale.set(1,1,1),i.visible=t==="cpu",i.userData.interactive={kind:"part",part:"case-screw"},i.traverse(o=>{o.userData.interactive=i.userData.interactive})}),this.exploded=!1,this.leverOpen=!1,this.clipsOpen=!1,this.clipHomes?.forEach(({clip:i,position:n,rotation:r})=>{i.position.copy(n),i.rotation.copy(r)}),this.motherboard.userData.lever.rotation.set(0,0,0),this.motherboard.userData.lever.position.set(.32,.05,-.38),this.case.userData.rgb.material.emissiveIntensity=.12,this.monitor.userData.screenMat.map=null,this.monitor.userData.screenMat.color.setHex(329739),this.monitor.userData.screenMat.needsUpdate=!0,this.monitor.userData.led.material.color.setHex(this.theme.palette.accent),this.pasteBlob&&(this.pasteBlob.visible=!1),this.highlightRing&&(this.highlightRing.visible=!1),t==="safety"?(this.tray.visible=!1,this.motherboard.visible=!1,this.cpu.visible=!1,this.ram.visible=!1,this.strap.visible=!0,this.cameraProp.visible=!0,this.bins.visible=!1,this.bins.position.set(3.95,1.06,.8),this.bins.rotation.set(0,.2,0),this.powerState="on",this.case.userData.rgb.material.emissiveIntensity=1.4,this.setMonitorDesktop(),this.monitor.userData.screenMat.color.setHex(16777215),this.monitor.userData.screenMat.needsUpdate=!0,this.monitor.userData.led.material.color.setHex(this.theme.palette.accent),this.focus("safety",e)):t==="cpu"?(this.character.userData.wornStrap.visible=!0,this.character.userData.bracelet.visible=!1,this.bins.visible=!0,this.bins.position.set(.2,1.07,1.55),this.bins.rotation.set(0,0,0),this.cpu.rotation.y=-Math.PI/2,this.cooler.visible=!1,this.ram.visible=!1,this.psu.visible=!1,this.keyboard.visible=!1,this.mouse.visible=!1,this.peripheralCable.visible=!1,this.powerStrip.visible=!1,this.plug.visible=!1,this.strap.visible=!1,this.cameraProp.visible=!1,this.focus("cpu",e)):t==="ram"?(this.character.userData.wornStrap.visible=!0,this.character.userData.bracelet.visible=!1,this.bins.visible=!1,this.cpu.visible=!1,this.cooler.visible=!0,this.cooler.position.set(-.58,.1,-.38),this.cpuSeated=!0,this.ram.rotation.y=Math.PI,this.peripheralCable.visible=!1,this.powerStrip.visible=!1,this.plug.visible=!1,this.strap.visible=!1,this.cameraProp.visible=!1,this.focus("ram",e)):t==="power"&&(this.tray.visible=!1,this.character.visible=!1,this.strap.visible=!1,this.cameraProp.visible=!1,this.bins.visible=!1,this.peripheralCable.visible=!0,this.powerStrip.visible=!1,this.plug.visible=!1,this.cpu.visible=!1,this.ram.visible=!0,this.ram.position.set(.61,1.9,-.18),this.ram.rotation.set(0,0,0),this.cooler.visible=!0,this.cooler.position.set(-.58,.1,-.38),this.psu.visible=!0,this.keyboard.visible=!0,this.mouse.visible=!0,this.fanCable.visible=!0,this.fanCable.position.copy(this.fanCableHome),this.mountBoardInCase(),this.focus("power",e)),this.callbacks.onLevelRender?.(t)}focus(t,e=!1){let i=Ad[t]||Ad.overview;if(this.cameraGoal=i,e){this.cameraState.theta=i.theta,this.cameraState.phi=i.phi,this.cameraState.radius=i.radius,this.cameraTarget.set(...i.target);return}this.audio.whoosh();let n=this.motionReduced?1:680;this.tweens.to(this.cameraState,{theta:i.theta,phi:i.phi,radius:i.radius},{duration:n,easing:"inOutCubic"}),this.tweens.to(this.cameraTarget,{x:i.target[0],y:i.target[1],z:i.target[2]},{duration:n,easing:"inOutCubic"})}toggleExploded(){this.exploded=!this.exploded;let t=this.exploded?.55:0;this.tweens.to(this.case.userData.panel.position,{x:-1.45-t*.9},{duration:420,easing:"outCubic"}),this.tweens.to(this.motherboard.position,{x:this.motherboard.position.x+(this.exploded?.35:-.35)},{duration:420,easing:"outCubic"}),this.callbacks.onExploded?.(this.exploded)}toggleXray(){this.xray=!this.xray,this.motherboard.userData.labels.forEach(t=>{t.visible=this.xray}),this.case.traverse(t=>{t.isMesh&&t.material&&["case","caseTrim"].includes(t.material.userData.role)&&(t.material.transparent=this.xray,t.material.opacity=this.xray?.22:1,t.material.needsUpdate=!0)}),this.callbacks.onXray?.(this.xray)}highlight(t){if(!t){this.highlightRing&&(this.highlightRing.visible=!1),this.highlighted=null;return}if(!this.highlightRing){let i=new wt(new We(.34,.025,8,36),new Re({color:this.theme.palette.accent,transparent:!0,opacity:.9,depthWrite:!1}));i.renderOrder=6,this.scene.add(i),this.highlightRing=i}let e=this.findTargetObject(t);e&&(this.highlighted=e,this.highlightRing.visible=!0,this.highlightRing.material.color.setHex(this.theme.palette.accent))}findTargetObject(t){return{power:this.case.userData.powerHitTarget,"power-button":this.case.userData.powerHitTarget,"clean-cloth":this.cleaningCloth,"case-screw":this.caseScrews.find(i=>i.visible&&i.userData.interactive),plug:this.plug,peripheral:this.peripheralCable,bracelet:this.character.userData.bracelet,strap:this.strap,bins:this.bins,camera:this.cameraProp,lever:this.motherboard.userData.lever,clips:this.motherboard.userData.ramSlots,"ram-clips":this.motherboard.userData.ramSlots,cpu:this.cpu,ram:this.ram,cooler:this.cooler,psu:this.psu,tools:this.toolKit,"monitor-cable":this.peripheralCable,"fan-cable":this.fanCable.userData.connector,socket:this.motherboard.userData.socket,"ram-slot":this.motherboard.userData.ramSlots}[t]||null}setTheme(t){this.theme=t;let e=t.palette;this.scene&&(this.scene.background.setHex(e.bg),this.scene.fog.color.setHex(e.fog),this.renderer.toneMappingExposure=t.id==="neon"?1.2:t.id==="contrast"?1.4:1.05,this.lights.hemi.color.setHex(t.flags.dark?10209279:16777215),this.lights.hemi.groundColor.setHex(t.id==="lofi"?3810328:4930093),this.lights.key.color.setHex(t.id==="lofi"?16763018:t.id==="neon"?12580607:16773596),this.lights.key.intensity=t.flags.dark?1.5:2.1,this.lights.fill.color.setHex(t.id==="neon"?16732120:12180735),this.lights.rim.color.setHex(e.accent),this.grid.visible=!!t.flags.grid,this.grid.material.color.setHex(e.accent),this.grid.material.opacity=t.id==="neon"?.28:.16,this.scene.traverse(i=>{if(!i.isMesh&&!i.isSprite)return;let n=i.material;if(!n||Array.isArray(n))return;let r=n.userData?.role;if(!r)return;if(r==="pcb"){if(this.motherboard?.userData){this.motherboard.userData.pcbTexture?.dispose?.();let o=Lc(e);this.motherboard.userData.pcbTexture=o,n.map=o}n.color.setHex(16777215),n.needsUpdate=!0;return}let a=e[r];typeof a=="number"&&(n.color.setHex(a),t.flags.emissive&&["accent","accent2","caseTrim"].includes(r)?(n.emissive.setHex(a),n.emissiveIntensity=r==="accent"?1.1:.45):n.emissive&&(n.emissive.setHex(r==="accent"?e.accent:0),n.emissiveIntensity=r==="accent"?.18:0),t.id==="contrast"&&(n.roughness=1,n.metalness=0),n.needsUpdate=!0)}),this.edgeMaterials.forEach(i=>{i.color.setHex(t.id==="blueprint"?12576511:t.id==="neon"?e.accent:t.id==="contrast"?16777215:e.accent2),i.opacity=t.id==="blueprint"?.75:.4}),this.setEdgeVisibility(t.flags.outline),this.container&&(this.container.classList.toggle("is-pixel",t.id==="pixel"),this.container.classList.toggle("is-blueprint",t.id==="blueprint"),this.container.classList.toggle("is-contrast",t.id==="contrast"),this.container.classList.toggle("is-neon",t.id==="neon")),this.motionReduced=!!t.flags.reduced,this.fpsGuard.level||(this.quality=Wo(this.qualitySetting||"auto"),this.applyQuality()),this.level==="safety"&&this.powerState!=="off"?(this.setMonitorDesktop(),this.monitor.userData.screenMat.color.setHex(16777215),this.monitor.userData.screenMat.needsUpdate=!0):(this.powerState==="booting"||this.powerState==="on")&&this.setBoot(this.powerProgress||1))}setEdgeVisibility(t){this.scene.traverse(e=>{e.userData?.outline&&(e.visible=t)})}applyQuality(){if(!this.renderer)return;let t=this.theme,e=this.quality.dpr;t.id==="pixel"&&(e=Math.min(e,.7)),this.quality.tier==="low"&&(e=Math.min(e,1)),this.renderer.setPixelRatio(e),this.renderer.shadowMap.enabled=this.quality.shadows&&!!t.flags.shadows,this.lights.key.castShadow=this.renderer.shadowMap.enabled,this.particles?.setScale(this.quality.particles),this.resize(),this.onQuality?.(this.quality,this.fpsGuard.fps)}downgrade(t,e){t===1?(this.renderer.setPixelRatio(Math.min(1,this.quality.dpr)),this.renderer.shadowMap.enabled=!1,this.lights.key.castShadow=!1,this.particles?.setScale(.55)):(this.renderer.setPixelRatio(.8),this.particles?.setScale(.25),this.motionReduced=!0),this.onQuality?.({...this.quality,tier:"auto \xB7 light",label:"Auto \xB7 light",dpr:this.renderer.getPixelRatio(),shadows:!1,particles:this.particles?.scale||.25},e)}setSettings(t){let e=this.qualitySetting;this.settings=t,this.qualitySetting=t.quality||"auto",this.audio?.setEnabled(t.sound!==!1),this.qualitySetting!==e&&(this.fpsGuard.reset(),this.quality=Wo(this.qualitySetting),this.applyQuality()),this.motionReduced=t.motion==="reduced"||!!this.theme.flags.reduced}updateCamera(t){let e=this.cameraState,i=this.cameraTarget,n=Math.sin(e.phi),r=Ye.clamp(1.2/this.camera.aspect,1,1.65),a=e.radius*r,o=i.x+a*n*Math.sin(e.theta),l=i.y+a*Math.cos(e.phi),c=i.z+a*n*Math.cos(e.theta);if(this.camera.position.set(o,l,c),this.shake>.001){let h=this.shake;this.camera.position.x+=(Math.random()-.5)*h,this.camera.position.y+=(Math.random()-.5)*h,this.camera.position.z+=(Math.random()-.5)*h,this.shake*=Math.pow(.02,t),this.shake<.001&&(this.shake=0)}this.camera.lookAt(i)}updateSeat(t){if(!this.seat)return;this.seat.elapsed+=t,this.seat.pressure=Math.min(1.15,this.seat.pressure+t*.42);let e=Math.sin(this.seat.elapsed*2.6)*.38+Math.sin(this.seat.elapsed*5.1)*.16;this.seat.balance+=e*t,this.seat.balance=Ye.clamp(this.seat.balance,-.9,.9),Math.abs(this.seat.balance)>.44?this.seat.tiltTime+=t:this.seat.tiltTime=Math.max(0,this.seat.tiltTime-t*2),this.setRamSeatVisual(this.seat.pressure,this.seat.balance),this.callbacks.onSeatProgress?.({pressure:this.seat.pressure,balance:this.seat.balance,tilt:this.seat.tiltTime})}updateFan(t){(this.powerState==="on"||this.powerState==="booting"||this.level==="safety"&&this.powerState==="off"&&!this.safetyPoweredOff)&&(this.case.userData.fan.rotation.z+=t*9,this.cooler.visible&&(this.cooler.userData.fan.rotation.y+=t*12)),this.level==="power"&&this.powerState==="fault"&&(this.case.userData.fan.rotation.z=0),(this.powerState==="booting"||this.powerState==="on")&&(this.case.userData.rgb.material.emissiveIntensity=1.2+Math.sin(this.time*2.4)*.3)}updateHighlight(){if(!this.highlightRing?.visible||!this.highlighted)return;let t=this.highlighted.getWorldPosition(new R);this.highlightRing.position.copy(t),this.highlightRing.quaternion.copy(this.camera.quaternion);let e=1+Math.sin(this.time*5)*.16;this.highlightRing.scale.setScalar(e),this.highlightRing.material.opacity=.55+Math.sin(this.time*5)*.25}loop(){if(this.disposed)return;this.frame=requestAnimationFrame(this.loop);let t=performance.now(),e=Math.min(.05,(t-this.lastFrame)/1e3);this.lastFrame=t,this.time+=e,this.tweens.update(e),this.updateCamera(e),this.updateSeat(e),this.updateFan(e),this.bootStep(e),this.updateHighlight(),this.particles?.update(e),(this.theme.id==="lofi"||this.theme.id==="marshmallow"||this.theme.id==="candy")&&this.particles?.ambientDust(),this.fpsGuard.update(e)<42&&this.renderer.setPixelRatio(Math.min(this.renderer.getPixelRatio(),1)),this.renderer.render(this.scene,this.camera)}getStats(){return{calls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,fps:this.fpsGuard.fps,dpr:this.renderer.getPixelRatio()}}dispose(){this.disposed=!0,cancelAnimationFrame(this.frame),this.resizeObserver?.disconnect(),this.tweens.clear(),this.particles?.dispose(),this.scene?.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(i=>{i.map?.dispose?.(),i.dispose?.()})}),this.renderer?.dispose(),this.renderer?.domElement?.remove()}};function Ln(s){let t=s.getBoundingClientRect();return{x:t.left+t.width/2,y:t.top+t.height/2,rect:t}}function Sr(s,t){return Math.hypot(s.x-t.x,s.y-t.y)}var Yo=class{constructor({container:t,theme:e,settings:i={},audio:n,callbacks:r={}}){this.container=t,this.theme=e,this.settings=i,this.audio=n,this.callbacks=r,this.level="safety",this.leverOpen=!1,this.clipsOpen=!1,this.cpuRotation=270,this.ramRotation=180,this.cpuSeated=!1,this.ramPlaced=!1,this.ramSeated=!1,this.powerState="off",this.seat=null,this.seatTimer=null,this.bootTimer=null,this.drag=null,this.suppressClick=!1,this.disposed=!1,this.build(),this.setTheme(e),this.setLevel("safety",{instant:!0})}build(){this.container.innerHTML=`
      <div class="fb2d" data-fb2d>
        <div class="fb2d-bench" data-bench>
          <div class="fb2d-monitor" data-target="monitor">
            <div class="fb2d-screen" data-screen><span>Bench session ready</span></div>
            <span class="fb2d-caption">Monitor</span>
          </div>

          <div class="fb2d-case" data-target="case">
            <span class="fb2d-case-label">CASE</span>
            <button class="fb2d-power" type="button" data-part="power" aria-label="Case power button"></button>
            <button class="fb2d-screw fb2d-screw-a" type="button" data-drag="case-screw" data-part="case-screw" aria-label="Case-panel screw 1"></button>
            <button class="fb2d-screw fb2d-screw-b" type="button" data-drag="case-screw" data-part="case-screw" aria-label="Case-panel screw 2"></button>
            <button class="fb2d-screw fb2d-screw-c" type="button" data-drag="case-screw" data-part="case-screw" aria-label="Case-panel screw 3"></button>
            <button class="fb2d-screw fb2d-screw-d" type="button" data-drag="case-screw" data-part="case-screw" aria-label="Case-panel screw 4"></button>
            <span class="fb2d-fan" data-fan aria-hidden="true">\u2733</span>
            <div class="fb2d-fan-cable" data-part="fan-cable" data-target="fan-cable" role="button" tabindex="0" aria-label="Fan cable connector">FAN</div>
          </div>
          <div class="fb2d-parts-tray" data-parts-tray aria-label="Parts tray">PARTS TRAY</div>

          <div class="fb2d-board" data-target="board">
            <span class="fb2d-board-label">MOTHERBOARD</span>
            <div class="fb2d-socket" data-target="socket">
              <span class="fb2d-triangle">\u25B4</span>
            </div>
            <div class="fb2d-ram-slots" data-part="clips" data-target="ram-slot" role="button" tabindex="0" aria-label="RAM slots and clips">
              <span></span><span></span><span></span><span></span>
            </div>
            <div class="fb2d-lever" data-part="lever" role="button" tabindex="0" aria-label="CPU socket lever"></div>
            <div class="fb2d-cooler" data-part="cooler" role="button" tabindex="0" aria-label="CPU cooler">COOLER</div>
          </div>

          <div class="fb2d-psu" data-part="psu" role="button" tabindex="0" aria-label="Power supply">PSU</div>

          <div class="fb2d-character" data-target="wrist">
            <span class="fb2d-head"></span>
            <span class="fb2d-body"></span>
            <span class="fb2d-bracelet" data-part="bracelet" role="button" tabindex="0" aria-label="Metal bracelet"></span>
            <span class="fb2d-worn-strap" data-worn-strap aria-hidden="true"></span>
          </div>

          <button class="fb2d-part fb2d-cpu" type="button" data-drag="cpu" data-part="cpu" aria-label="CPU">CPU</button>
          <button class="fb2d-part fb2d-ram" type="button" data-drag="ram" data-part="ram" aria-label="RAM module">RAM</button>

          <button class="fb2d-part fb2d-strap" type="button" data-drag="strap" data-part="strap" aria-label="Antistatic wrist strap">STRAP</button>
          <button class="fb2d-part fb2d-camera" type="button" data-drag="camera" data-part="camera" aria-label="Reference camera">CAM</button>
          <button class="fb2d-part fb2d-cloth" type="button" data-part="clean-cloth" aria-label="Blue cleaning cloth">WIPE</button>
          <button class="fb2d-part fb2d-tools" type="button" data-part="tools" aria-label="Tool kit">TOOLS</button>
          <button class="fb2d-part fb2d-bins" type="button" data-drag="bins" data-part="bins" aria-label="Parts bins">BINS</button>
          <div class="fb2d-strip" data-strip>
            <span class="fb2d-plug" data-drag="plug" data-part="plug" role="button" tabindex="0" aria-label="Power plug">PLUG</span>
          </div>

          <p class="fb2d-note" data-note>Tap or drag the highlighted part.</p>
        </div>
      </div>
    `,this.root=this.container.querySelector("[data-fb2d]"),this.bench=this.root.querySelector("[data-bench]"),this.note=this.root.querySelector("[data-note]"),this.screen=this.root.querySelector("[data-screen]"),this.fan=this.root.querySelector("[data-fan]"),this.cpu=this.root.querySelector('[data-part="cpu"]'),this.ram=this.root.querySelector('[data-part="ram"]'),this.cpuHome=null,this.ramHome=null,this.root.addEventListener("click",t=>this.onClick(t)),this.root.addEventListener("pointerdown",t=>this.onPointerDown(t)),this.root.addEventListener("pointermove",t=>this.onPointerMove(t)),this.root.addEventListener("pointerup",t=>this.onPointerUp(t)),this.root.addEventListener("pointercancel",t=>this.onPointerUp(t)),this.root.addEventListener("keydown",t=>{if(t.key==="Enter"||t.key===" "){let e=t.target.closest("[data-part]");e&&(t.preventDefault(),this.callbacks.onClick?.(this.actionFor(e.dataset.part)))}}),this.root.querySelector("[data-parts-tray]").hidden=level==="safety",requestAnimationFrame(()=>{this.cpuHome={x:this.cpu.offsetLeft,y:this.cpu.offsetTop},this.ramHome={x:this.ram.offsetLeft,y:this.ram.offsetTop}})}actionFor(t){return{power:"power","fan-cable":"fan-cable",psu:"psu",lever:"lever",clips:"clips",cooler:"cooler",bracelet:"bracelet",strap:"strap",camera:"camera","clean-cloth":"clean-bench",bins:"bins",tools:"tools",plug:"plug"}[t]||t}onClick(t){if(this.disposed)return;if(this.suppressClick){this.suppressClick=!1;return}let e=t.target.closest("[data-part]");if(e){if(e.dataset.drag){let i=e.dataset.drag;if(i==="plug"){this.callbacks.onClick?.("plug");return}if(i==="case-screw"){if(!this.callbacks.canDrag?.(i)){this.callbacks.onBlocked?.(i);return}e.classList.add("is-done"),this.root.querySelector("[data-parts-tray]").append(e),this.callbacks.onPartDrop?.({part:i,valid:!0});return}if(!this.callbacks.canDrag?.(i)){this.callbacks.onBlocked?.(i);return}return}if(e.dataset.part==="ram"&&this.ramPlaced&&!this.ramSeated){this.startSeat();return}this.audio?.click(),this.callbacks.onClick?.(this.actionFor(e.dataset.part))}}onPointerDown(t){if(this.disposed)return;let e=t.target.closest('[data-drag], [data-part="lever"]');if(!e)return;let i=e.dataset.drag||e.dataset.part;if(!this.callbacks.canDrag?.(i)){this.callbacks.onBlocked?.(i);return}t.preventDefault();let n=Ln(e);this.drag={part:e,dragPart:i,closing:i==="lever"&&this.leverOpen,startX:t.clientX,startY:t.clientY,moved:0,home:{left:e.offsetLeft,top:e.offsetTop},center:n},e.setPointerCapture?.(t.pointerId),e.classList.add("is-dragging"),this.audio?.pick(),this.callbacks.onPick?.(i)}onPointerMove(t){if(!this.drag)return;let e=t.clientX-this.drag.startX,i=t.clientY-this.drag.startY;if(this.drag.moved=Math.max(this.drag.moved,Math.hypot(e,i)),this.drag.part.style.transform=`translate(${e}px, ${i}px)`,this.drag.part.style.zIndex="30",this.drag.dragPart==="lever"){let n=this.drag.closing?Math.max(0,Math.min(1,1-i/52)):Math.max(0,Math.min(1,-i/52));this.drag.progress=n,this.drag.part.style.transform=`translate(${e}px, ${i}px) rotate(${-8+n*26}deg)`}}onPointerUp(t){if(!this.drag)return;let e=this.drag;this.drag=null;let i=Ln(e.part);if(this.suppressClick=e.dragPart==="lever"||e.dragPart==="case-screw"||e.dragPart==="plug"||e.moved>=8,this.suppressClick&&window.setTimeout(()=>{this.suppressClick=!1},0),e.part.classList.remove("is-dragging"),e.part.style.transform="",e.part.style.zIndex="",e.dragPart==="lever"){if(e.moved<8){this.callbacks.onClick?.("lever");return}(e.closing?e.progress<=.28:e.progress>=.72)?this.callbacks.onClick?.("lever"):this.callbacks.onLeverDragIncomplete?.();return}if(e.moved<8){e.dragPart==="plug"&&this.callbacks.onClick?.("plug");return}if(e.dragPart==="cpu"){let n=Ln(this.root.querySelector('[data-target="socket"]'));if(!(Sr(i,n)<this.dropRadius())){this.resetPart(e.part,e.home),this.callbacks.onPartDrop?.({part:"cpu",valid:!1,reason:"target",speed:1});return}if(!this.leverOpen){this.resetPart(e.part,e.home),this.callbacks.onPartDrop?.({part:"cpu",valid:!1,reason:"lever",speed:1});return}if(this.cpuRotation%360!==0){this.resetPart(e.part,e.home),this.callbacks.onPartDrop?.({part:"cpu",valid:!1,reason:"orientation",speed:1});return}this.callbacks.onPartDrop?.({part:"cpu",valid:!0,speed:1,height:.1});return}if(e.dragPart==="ram"){let n=Ln(this.root.querySelector('[data-target="ram-slot"]'));if(!(Sr(i,n)<this.dropRadius())){this.resetPart(e.part,e.home),this.callbacks.onPartDrop?.({part:"ram",valid:!1,reason:"target",speed:1});return}if(!this.clipsOpen){this.resetPart(e.part,e.home),this.callbacks.onPartDrop?.({part:"ram",valid:!1,reason:"clips",speed:1});return}if(this.ramRotation%360!==0){this.resetPart(e.part,e.home),this.callbacks.onPartDrop?.({part:"ram",valid:!1,reason:"orientation",speed:1});return}this.callbacks.onPartDrop?.({part:"ram",valid:!0,speed:1});return}if(e.dragPart==="case-screw"){let n=Ln(this.root.querySelector("[data-parts-tray]")),r=Sr(i,n)<this.dropRadius();r?(e.part.classList.add("is-done"),this.root.querySelector("[data-parts-tray]").append(e.part)):this.resetPart(e.part,e.home),this.callbacks.onPartDrop?.({part:"case-screw",valid:r});return}if(e.dragPart==="strap"){let n=Ln(this.root.querySelector('[data-target="wrist"]')),r=Sr(i,n)<this.dropRadius();this.resetPart(e.part,e.home),this.callbacks.onSafetyDrop?.({action:"strap",valid:r});return}if(e.dragPart==="bins"){this.resetPart(e.part,e.home),this.callbacks.onSafetyDrop?.({action:"bins",valid:!0});return}if(e.dragPart==="camera"){let n=Ln(this.root.querySelector('[data-target="monitor"]')),r=Sr(i,n)<this.dropRadius();this.resetPart(e.part,e.home),this.callbacks.onSafetyDrop?.({action:"camera",valid:r});return}this.resetPart(e.part,e.home)}resetPart(t,e){t.style.left=`${e.left}px`,t.style.top=`${e.top}px`,t.style.transform=""}dropRadius(){return Math.max(130,Math.min(190,this.root.getBoundingClientRect().width*.22))}setTheme(t){if(this.theme=t,!this.root)return;let e=t.palette,i=n=>`#${(n||0).toString(16).padStart(6,"0")}`;this.root.style.setProperty("--fb-bg",i(e.bg)),this.root.style.setProperty("--fb-surface",t.css.surface||"#fffdf8"),this.root.style.setProperty("--fb-accent",i(e.accent)),this.root.style.setProperty("--fb-accent-2",i(e.accent2)),this.root.style.setProperty("--fb-case",i(e.case)),this.root.style.setProperty("--fb-metal",i(e.metal)),this.root.style.setProperty("--fb-pcb",i(e.pcb)),this.root.dataset.theme=t.id,this.root.dataset.dark=String(!!t.flags.dark)}setSettings(t){this.settings=t}setLevel(t,{instant:e=!1}={}){if(this.level=t,this.leverOpen=!1,this.clipsOpen=!1,this.cpuRotation=270,this.ramRotation=180,this.cpuSeated=!1,this.ramPlaced=!1,this.ramSeated=!1,this.powerState="off",this.clearSeat(),clearTimeout(this.bootTimer),!this.root)return;this.root.dataset.level=t,this.root.classList.toggle("is-instant",!!e),this.root.querySelectorAll("[data-part], [data-target]").forEach(n=>{n.classList.remove("is-active","is-done","is-hot","is-fixed")}),this.root.querySelector("[data-worn-strap]").classList.remove("is-on"),this.root.querySelector('[data-part="bracelet"]').classList.remove("is-gone"),this.root.querySelector('[data-part="strap"]').classList.remove("is-gone"),this.root.querySelector('[data-part="bins"]').classList.remove("is-done"),this.root.querySelector('[data-part="camera"]').classList.remove("is-done"),this.root.querySelector('[data-part="tools"]').classList.remove("is-done"),this.root.querySelector('[data-part="bins"]').classList.toggle("is-hidden",t==="safety"),this.root.querySelector('[data-part="clean-cloth"]').classList.remove("is-hidden","is-hot"),this.root.querySelector('[data-part="plug"]').classList.remove("is-done"),this.root.querySelector('[data-part="fan-cable"]').classList.remove("is-fixed"),this.root.querySelector('[data-part="cooler"]').classList.remove("is-done"),this.root.querySelector('[data-part="psu"]').classList.remove("is-done"),this.root.querySelector('[data-part="clips"]').classList.remove("is-open"),this.root.querySelector('[data-part="lever"]').classList.remove("is-open");let i=this.root.querySelector(".fb2d-case");this.root.querySelectorAll(".fb2d-screw").forEach(n=>{i.append(n),n.classList.remove("is-done"),n.style.left="",n.style.top="",n.style.transform="",n.style.zIndex="",n.hidden=t!=="cpu"}),i.classList.remove("is-open"),this.cpu.classList.remove("is-hidden","is-seated"),this.ram.classList.remove("is-hidden","is-seated","is-placed"),this.cpu.style.left="",this.cpu.style.top="",this.ram.style.left="",this.ram.style.top="",this.cpu.style.transform="",this.ram.style.transform="",this.cpu.style.rotate="",this.ram.style.rotate="",this.screen.textContent=t==="safety"?"Bench session ready":"No signal",this.screen.classList.toggle("is-dark",t!=="safety"),this.fan.classList.remove("is-spinning"),this.note.textContent="Follow the highlighted instruction. Click or drag the named item.",t==="cpu"?(this.cpu.classList.remove("is-hidden"),this.ram.classList.add("is-hidden"),this.root.querySelector('[data-part="cooler"]').classList.add("is-hidden")):t==="ram"?(this.cpu.classList.add("is-hidden"),this.ram.classList.remove("is-hidden"),this.root.querySelector('[data-part="cooler"]').classList.add("is-done")):t==="power"&&(this.cpu.classList.add("is-hidden"),this.ram.classList.remove("is-hidden"),this.ram.classList.add("is-placed"),this.ramSeated=!0,this.root.querySelector('[data-part="cooler"]').classList.add("is-done"),this.root.querySelector('[data-part="fan-cable"]').classList.remove("is-hidden"))}focus(){}highlight(t){if(this.root.querySelectorAll(".is-hot").forEach(i=>i.classList.remove("is-hot")),!t)return;(t==="case-screw"?this.root.querySelector(".fb2d-screw:not(.is-done)"):this.root.querySelector(`[data-part="${t}"]`)||this.root.querySelector(`[data-target="${t}"]`))?.classList.add("is-hot")}rotateSelected(){this.level==="cpu"&&!this.cpuSeated?(this.cpuRotation=(this.cpuRotation+90)%360,this.cpu.style.rotate=`${this.cpuRotation}deg`,this.audio?.click(),this.callbacks.onRotate?.({part:"cpu",aligned:this.cpuRotation===0})):this.level==="ram"&&!this.ramPlaced&&(this.ramRotation=(this.ramRotation+180)%360,this.ram.style.rotate=`${this.ramRotation}deg`,this.audio?.click(),this.callbacks.onRotate?.({part:"ram",aligned:this.ramRotation===0}))}setLever(t){this.leverOpen=!!t,this.root.querySelector('[data-part="lever"]').classList.toggle("is-open",this.leverOpen),this.audio?.clickSnap()}openCasePanel(){this.root.querySelector(".fb2d-case")?.classList.add("is-open")}applyPaste(){this.cpu.classList.add("has-paste"),this.audio?.paste()}showCoolerReady(){let t=this.root.querySelector('[data-part="cooler"]');t.classList.remove("is-hidden"),t.classList.add("is-ready")}mountCooler(){this.root.querySelector('[data-part="cooler"]').classList.add("is-done"),this.audio?.snap()}openRamClips(){this.clipsOpen=!0,this.root.querySelector('[data-part="clips"]').classList.add("is-open"),this.audio?.clickSnap()}closeRamClips(){this.clipsOpen=!1,this.root.querySelector('[data-part="clips"]').classList.remove("is-open"),this.audio?.clickSnap()}shutdownSafety(){this.powerState="off",this.screen.textContent="Powered down",this.screen.classList.add("is-dark"),this.fan.classList.remove("is-spinning"),this.audio?.clickSnap()}unplugPower(){this.root.querySelector('[data-part="plug"]').classList.add("is-done"),this.audio?.clickSnap()}disconnectPeripheral(){this.root.querySelector('[data-part="camera"]').classList.add("is-done"),this.audio?.clickSnap()}removeBracelet(){this.root.querySelector('[data-part="bracelet"]').classList.add("is-gone"),this.audio?.clickSnap()}prepareTools(){this.root.querySelector('[data-part="tools"]').classList.add("is-done"),this.audio?.clickSnap()}cleanBench(){this.root.querySelector('[data-part="clean-cloth"]').classList.add("is-hidden"),this.audio?.clickSnap()}arrangeBench(){this.root.querySelector('[data-part="tools"]').classList.add("is-done");let t=this.root.querySelector('[data-part="bins"]');t.classList.remove("is-hidden"),t.classList.add("is-done"),this.root.querySelector("[data-parts-tray]").hidden=!1,this.audio?.clickSnap()}prepareBins(){this.root.querySelector('[data-part="bins"]').classList.add("is-done"),this.audio?.clickSnap()}wearStrap(){this.root.querySelector('[data-part="strap"]').classList.add("is-gone"),this.root.querySelector("[data-worn-strap]").classList.add("is-on"),this.root.querySelector('[data-part="bracelet"]').classList.add("is-gone"),this.audio?.clickSnap()}documentConnections(){this.root.querySelector('[data-part="camera"]').classList.add("is-done"),this.screen.textContent="Connections photographed",this.screen.classList.remove("is-dark"),this.audio?.clickSnap()}checkPsu(){this.root.querySelector('[data-part="psu"]').classList.add("is-done"),this.audio?.clickSnap()}checkMonitorCable(){this.root.querySelector('[data-part="camera"]').classList.add("is-done"),this.audio?.clickSnap()}reseatRamPower(){this.ram.classList.add("is-seated"),this.audio?.clickSnap()}inspectFanCable(){this.root.querySelector('[data-part="fan-cable"]').classList.add("is-hot"),this.audio?.click()}fixFanCable(){this.root.querySelector('[data-part="fan-cable"]').classList.add("is-fixed"),this.audio?.snap()}powerOn(){this.powerState="booting",this.screen.textContent="POST\u2026",this.screen.classList.remove("is-dark"),this.fan.classList.add("is-spinning"),clearTimeout(this.bootTimer),this.bootTimer=setTimeout(()=>{this.powerState==="booting"&&(this.powerState="on",this.screen.textContent="TechPro Workstation",this.callbacks.onBooted?.())},1500)}powerFault(){clearTimeout(this.bootTimer),this.powerState="fault",this.screen.textContent="No signal",this.screen.classList.add("is-dark"),this.fan.classList.remove("is-spinning"),this.callbacks.onPowerFault?.()}seatCpu(){this.cpuSeated=!0,this.cpu.classList.add("is-seated"),this.audio?.snap()}seatRamReady(){this.ramPlaced=!0,this.ram.classList.add("is-placed"),this.audio?.drop()}startSeat(){!this.ramPlaced||this.ramSeated||this.seat||(this.seat={pressure:0,balance:0,elapsed:0,tiltTime:0},this.ram.classList.add("is-seating"),this.audio?.paste(),this.callbacks.onSeatStart?.(),this.seatTimer=setInterval(()=>{if(!this.seat)return;let t=.05;this.seat.elapsed+=t,this.seat.pressure=Math.min(1.15,this.seat.pressure+t*.42),this.seat.balance+=(Math.sin(this.seat.elapsed*2.6)*.38+Math.sin(this.seat.elapsed*5.1)*.16)*t,this.seat.balance=Math.max(-.9,Math.min(.9,this.seat.balance)),Math.abs(this.seat.balance)>.44?this.seat.tiltTime+=t:this.seat.tiltTime=Math.max(0,this.seat.tiltTime-t*2),this.callbacks.onSeatProgress?.({pressure:this.seat.pressure,balance:this.seat.balance,tilt:this.seat.tiltTime})},50))}nudgeSeat(t){this.seat&&(this.seat.balance=Math.max(-.9,Math.min(.9,this.seat.balance-t*.0022)))}finishSeat(){if(!this.seat)return;let t=this.seat;this.seat=null,clearInterval(this.seatTimer),this.ram.classList.remove("is-seating");let e=Math.abs(t.balance)<.36&&t.tiltTime<.45,i=t.pressure,n=i>=.65&&i<=.9&&e;n?(this.ramSeated=!0,this.ram.classList.add("is-seated"),this.audio?.snap()):this.audio?.error(),this.callbacks.onSeatResult?.({ok:n,pressure:i,balanced:e,overpressure:i>.9,underpressure:i<.65})}clearSeat(){this.seatTimer&&clearInterval(this.seatTimer),this.seatTimer=null,this.seat=null}reject(){this.cpu.classList.remove("is-seated"),this.ram.classList.remove("is-placed")}dispose(){this.disposed=!0,this.clearSeat(),clearTimeout(this.bootTimer),this.container&&(this.container.innerHTML="")}};var Ux=[{id:"cpu",name:"Processor",short:"CPU",art:"cpu",icon:"cpu",category:"Processing",socket:"AM4",zone:"cpu-socket",blurb:"Executes instructions and performs calculations. Its notch and triangle must line up with the socket."},{id:"cooler",name:"CPU cooler",short:"Cooler",art:"cooler",icon:"cooling",category:"Cooling",zone:"cooler-mount",blurb:"Moves heat away from the processor. The fan cable goes to the CPU_FAN header."},{id:"thermal",name:"Thermal paste",short:"Paste",art:"thermal",icon:"drop",category:"Cooling",zone:"cpu-socket",blurb:"Fills microscopic gaps between the processor and heat sink so heat can transfer."},{id:"ram",name:"Memory module",short:"RAM",art:"ram",icon:"ram",category:"Memory",type:"DDR4",zone:"ram-slots",blurb:"Temporary working memory. Press evenly until both retaining clips click."},{id:"motherboard",name:"Motherboard",short:"Board",art:"motherboard",icon:"motherboard",category:"Foundation",socket:"AM4",memory:"DDR4",zone:"board-tray",blurb:"The main circuit board. It mounts on standoffs and connects every component."},{id:"psu",name:"Power supply",short:"PSU",art:"psu",icon:"psu",category:"Power",watts:550,zone:"psu-bay",blurb:"Converts outlet electricity into the voltages the components use. Keep its vents clear."},{id:"ssd",name:"Solid-state drive",short:"SSD",art:"storage",icon:"storage",category:"Storage",zone:"drive-bay",blurb:"Keeps the operating system, programs, and files even when power is off."},{id:"gpu",name:"Graphics card",short:"GPU",art:"expansion",icon:"card",category:"Expansion",zone:"pcie-slot",blurb:"An expansion card that adds or improves graphics output. Seat it fully and secure the bracket."},{id:"cables",name:"Cable kit",short:"Cables",art:"cable",icon:"cable",category:"Connection",zone:"cable-route",blurb:"Power, data, and front-panel cables. Route them so they do not block airflow."},{id:"screws",name:"Screw container",short:"Screws",art:"screws",icon:"container",category:"Tools",zone:"bench",blurb:"Labelled containers keep screws with the parts they belong to."},{id:"strap",name:"Antistatic strap",short:"Strap",art:"strap",icon:"shield",category:"Safety",zone:"bench",blurb:"Discharges static safely before you touch sensitive components."},{id:"labels",name:"Labels & camera",short:"Labels",art:"labels",icon:"camera",category:"Safety",zone:"bench",blurb:"Document cable connections before removal so reassembly is guided, not guessed."}],Rd=Object.fromEntries(Ux.map(s=>[s.id,s]));var _i=30,Fx={"clean-bench":"cleaning-cloth","arrange-bench":"tools","power-down":"computer",unplug:"power-cable",peripherals:"peripheral",jewelry:"jewelry",tools:"tools",bins:"screws","remove-screws":"case-screws",strap:"strap",document:"labels","lever-open":"cpu",align:"cpu",seat:"cpu","lever-close":"cpu",paste:"thermal",cooler:"cooler","clips-open":"ram",place:"ram",press:"ram","clips-close":"ram","power-on":"computer",fan:"cooler",psu:"psu",display:"display-cable",ram:"ram",fix:"cooler",boot:"computer"},Ox={"cleaning-cloth":{title:"Cleaning cloth",meaning:"A clean work surface keeps dust and loose items away from computer parts.",use:"Wipe the bench before placing tools or components on it."},computer:{title:"Computer system",meaning:"A computer system uses hardware and software to process information.",use:"Shut the system down properly before disconnecting power or opening the case."},"power-cable":{title:"Power cable",meaning:"The power cable connects the computer to an electrical outlet.",use:"Disconnect it from the power source before working inside the case."},peripheral:{title:"Peripheral devices",meaning:"Peripherals are devices connected to the computer, such as a monitor, keyboard, and mouse.",use:"Disconnect them before moving or servicing the computer."},jewelry:{title:"Metal jewelry",meaning:"Metal jewelry is a conductive accessory that can create a safety hazard.",use:"Remove bracelets and other conductive accessories before disassembly."},tools:{title:"Technician tools",meaning:"Tools help a technician handle and secure computer parts safely.",use:"Prepare the right tools before assembly or disassembly."},display:{title:"Monitor cable",meaning:"The monitor cable carries the display signal from the computer to the monitor.",use:"Check that it is securely connected when the monitor shows no image."},"case-screws":{title:"Case-panel screws",meaning:"Case-panel screws hold the computer's side cover in place.",use:"Remove them carefully and place them in a parts tray so they are not lost."}};function Bx(s,t){let e=t==="ram"&&s?.id==="align"?"ram":Fx[s?.id];if(!e)return null;let i=Rd[e];return i?{title:i.name,meaning:`The ${i.name.toLowerCase()} is a computer hardware component in the ${i.category.toLowerCase()} category.`,use:i.blurb}:Ox[e]||null}var Be=[{id:"safety",tab:"L0 \xB7 Safety",short:"Safety",title:"Prepare the bench",subtitle:"DepEd safety preparation order",camera:"safety",par:95,intro:"Start by preparing a clean, organized, safe workbench. Chip will guide one clear action at a time.",steps:[{id:"clean-bench",title:"Clean the workbench",action:"clean-bench",target:"clean-cloth",hint:"Click the blue cleaning cloth on the bench. Chip will wipe the work surface clean.",why:"A clean, clear surface helps prevent dust and loose items from damaging or hiding small components."},{id:"arrange-bench",title:"Set out tools and parts",action:"arrange-bench",target:"tools",hint:"Click the toolbox. Chip will set out the tools, parts tray, and bins so each item has a clear place.",why:"Keeping tools and parts in assigned areas makes each item easy to find and prevents screws from getting lost."},{id:"power-down",title:"Power the system down",action:"power",target:"power",hint:"Click the round power button on the front of the computer case.",why:"Shut the operating system down first. Yanking power while the drive is writing can corrupt files."},{id:"document",title:"Record the cable connections",action:"camera",target:"camera",hint:"Click the camera on the bench to record the cable connections before unplugging them.",why:"A photo of the cable routing makes reassembly reliable and faster."},{id:"unplug",title:"Disconnect the power cable",action:"plug",target:"plug",hint:"Click the power plug beside the strip to disconnect it.",why:"Removing the mains plug is the only reliable way to make the case electrically dead."},{id:"peripherals",title:"Disconnect the peripherals",action:"peripheral",target:"peripheral",hint:"Click the cable connecting the monitor to the computer.",why:"Peripheral cables can snag, pull a port loose, or carry a charge while you move the case."},{id:"jewelry",title:"Remove metal jewelry",action:"bracelet",target:"bracelet",hint:"Click the metal bracelet on the technician's wrist to remove it.",why:"A ring or bracelet can bridge a live circuit, short the board, and burn the technician."},{id:"strap",title:"Put on the antistatic wrist strap",action:"strap",target:"strap",hint:"Drag the blue wrist strap from the bench onto the technician's wrist.",why:"The strap drains static electricity from your body before it can damage the board."}]},{id:"cpu",tab:"L2 \xB7 CPU",short:"CPU",title:"Seat the processor",subtitle:"Socket, alignment, paste, cooler",camera:"case",par:110,intro:"Open the case carefully, keep its screws together, then prepare the processor socket.",steps:[{id:"remove-screws",title:"Remove the case-panel screws",action:"remove-screws",target:"case-screw",hint:"Drag each of the 4 case screws into the parts tray beside the motherboard. Place them anywhere inside the tray.",why:"Keep the small screws together in the parts tray. This prevents loss and makes reassembly easier."},{id:"lever-open",title:"Open the socket lever",action:"lever-open",target:"lever",hint:"Drag the free end of the metal socket lever upward until it stays raised.",why:"The lever lifts the retention plate so the processor can drop in without bending pins."},{id:"align",title:"Align the CPU triangle",action:"rotate",target:"cpu",control:"rotate",hint:"Click Rotate until the CPU's gold triangle points toward the socket's matching corner.",why:"The triangle and the notch are keyed. Forcing the CPU the wrong way bends pins."},{id:"seat",title:"Seat the CPU gently",action:"drop",target:"cpu",hint:"Drag the CPU over the open socket and release it gently.",why:"A processor should drop into a correctly opened socket with almost no pressure."},{id:"lever-close",title:"Lock the socket lever",action:"lever-close",target:"lever",hint:"Drag the raised socket lever downward until it sits flat.",why:"The locked lever holds the CPU flat so the cooler can make even contact."},{id:"paste",title:"Apply thermal paste",action:"paste",target:"cpu",hint:"Click the seated CPU once to apply one small dot of thermal paste.",why:"Thermal paste fills microscopic gaps between the CPU and cooler. Too much is as bad as too little."},{id:"cooler",title:"Mount the CPU cooler",action:"cooler",target:"cooler",hint:"Click the cooler above the CPU to place it.",why:"The cooler must sit flat and secure. A loose cooler lets the processor overheat and shut down."}]},{id:"ram",tab:"L4 \xB7 RAM",short:"RAM",title:"Install the memory",subtitle:"Notch, clips, even pressure",camera:"ram",par:100,intro:"Memory is keyed and stiff. Line up the notch, then press evenly until both clips click.",steps:[{id:"clips-open",title:"Open the DIMM clips",action:"clips-open",target:"clips",hint:"Click the RAM slot clips to open them.",why:"The clips must be open before the module can travel down into the slot."},{id:"align",title:"Match the RAM notch",action:"rotate",target:"ram",control:"rotate",hint:"Click Rotate until the notch in the RAM matches the key in the slot.",why:"The off-centre notch stops the module going in backwards. Never force it."},{id:"place",title:"Lower the RAM into the slot",action:"drop",target:"ram",hint:"Drag the RAM straight over the open slot and release it.",why:"Set the module straight down. Tilting it can crack the slot or the edge connector."},{id:"press",title:"Press evenly until both clips click",action:"seat",target:"ram",control:"hold",hint:"Press and hold the RAM, steady its wobble with small left/right movements, then release when the meter is green.",why:"Even pressure seats the contacts. Too little leaves the module loose; too much can flex the board."},{id:"clips-close",title:"Lock the DIMM clips",action:"clips-close",target:"clips",hint:"Click the RAM slot clips to lock the module in place.",why:"The clips lock the module in place and stop it creeping out under vibration."}]},{id:"power",tab:"Fault \xB7 No POST",short:"Fault",title:"Carlo's no-display build",subtitle:"Fan still, screen dark",camera:"power",par:120,intro:"The build powers up but the fan never spins and the monitor stays dark. Work the module fault order.",steps:[{id:"power-on",title:"Power on the system",action:"power",target:"power",hint:"Click the case power button once, then watch the fan.",why:"Record the symptom first: the system powers on, but there is no display and no fan movement."},{id:"fan",title:"Check the CPU fan connection",action:"fan-cable",target:"fan-cable",hint:"Click the fan connector behind the CPU cooler.",why:"The module starts with the cooling fan connection. A loose CPU fan header stops the fan and can trigger a no-POST protection state."},{id:"psu",title:"Check the PSU connections",action:"psu",target:"psu",hint:"Click the power supply to inspect its cable connections.",why:"Check the 24-pin and CPU power connectors. A partly seated PSU cable gives the same dead-screen symptom."},{id:"display",title:"Check the display cable",action:"peripheral",target:"monitor-cable",hint:"Click the cable connecting the monitor to the computer.",why:"A monitor cable that is loose or in the wrong port looks exactly like a failed build."},{id:"ram",title:"Reseat the RAM",action:"ram",target:"ram",hint:"Click the RAM stick to check that it is seated.",why:"A memory module that is not fully clicked home stops POST. Reseat it before replacing parts."},{id:"fix",title:"Reconnect the fan cable",action:"fan-cable",target:"fan-cable",hint:"Click the loose fan connector to reconnect it.",why:"The fault was the loose CPU fan connector. Reconnect it fully, then retest the system."},{id:"boot",title:"Power on and confirm POST",action:"power",target:"power",hint:"Click the power button again. Check that the fan spins and the display turns on.",why:"Always retest after a repair. A spinning fan and a POST screen confirm the fix."}]}],Fc=jo;function vi(s){return String(s??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function Cd(s){return`<span class="pclab-stars" aria-label="${s} of 3 stars">${[0,1,2].map(t=>`<span class="${t<s?"is-on":""}" aria-hidden="true">\u2605</span>`).join("")}</span>`}function Oc(s){let t=Math.max(0,Math.round(s));return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`}function Bc(s,t,e){return Math.max(t,Math.min(e,s))}var $o=class{constructor(t){if(this.options=t||{},this.mount=this.options.mount,!this.mount)throw new Error("PC Lab needs a mount element.");this.settings={quality:"auto",sound:!0,haptics:!0,motion:"full",...this.options.settings||{}},this.voiceEnabled=this.settings.voiceGuidance!==!1,this.voicePreference=this.voiceEnabled,this.voiceGender=this.settings.voiceGender==="boy"?"boy":"girl",this.voiceName=this.settings.voiceName||"",this.speechVoices=[],this.voiceAvailable=!1,this.theme=Er(),this.audio=new Tr({theme:this.theme.id,enabled:this.settings.sound!==!1}),this.companion=this.options.companion||{},this.mode=this.options.mode||"build",this.levelIndex=0,this.stepIndex=0,this.strikes=0,this.hintsUsed=0,this.score=1e3,this.completed={...this.options.completed||{}},this.levelStartedAt=performance.now(),this.gameStartedAt=performance.now(),this.waitingForBoot=!1,this.failed=!1,this.overlayOpen=!1,this.paused=!1,this.destroyed=!1,this.timers=new Set,this.hold=null,this.qualityInfo=null,this.renderShell(),this.bindDom(),this.createView(),this.startLevel(this.firstPlayableIndex(),{instant:!0,silent:!0}),this.observeTheme(),this.startClock()}renderShell(){let t=this.completed,e=Be.map((i,n)=>{let r=t[i.id];return`<button class="pclab-tab ${r?"is-done":""}" type="button" data-level="${n}">
        <span>${vi(i.tab)}</span>
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
              <strong data-hud-level>${vi(Be[0].tab)}</strong>
            </div>
            <div class="pclab-hud-item">
              <span class="pclab-label">Step</span>
              <strong data-hud-step>1 / ${Be[0].steps.length}</strong>
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
    `,this.root=this.mount.querySelector("[data-pclab]"),this.canvasHost=this.root.querySelector("[data-canvas]"),this.objective=this.root.querySelector("[data-objective]"),this.stepsEl=this.root.querySelector("[data-steps]"),this.toastEl=this.root.querySelector("[data-toast]"),this.overlay=this.root.querySelector("[data-overlay]"),this.settingsPanel=this.root.querySelector("[data-settings]"),this.meter=this.root.querySelector("[data-meter]"),this.meterFill=this.root.querySelector("[data-meter-fill]"),this.rotateButton=this.root.querySelector("[data-rotate]"),this.holdButton=this.root.querySelector("[data-hold]"),this.whyCopy=this.root.querySelector("[data-why-copy]"),this.voiceButton=this.root.querySelector("[data-voice-toggle]"),this.voiceStatus=this.root.querySelector("[data-voice-status]"),this.guideTitle=this.root.querySelector("[data-guide-title]"),this.guidePrompt=this.root.querySelector("[data-guide-prompt]"),this.guideAnswer=this.root.querySelector("[data-guide-answer]"),this.objectiveHint=this.root.querySelector("[data-objective-hint]"),this.qualityEl=this.root.querySelector("[data-quality]"),this.renderCompanion("happy","Safety first. Then we build.")}bindDom(){this.onClick=t=>{let e=t.target.closest("[data-level]");if(e){this.startLevel(Number(e.dataset.level));return}if(t.target.closest("[data-hint]")){this.showHint();return}if(t.target.closest("[data-why]")){this.toggleWhy();return}if(t.target.closest("[data-rotate]")){this.view?.rotateSelected?.();return}if(t.target.closest("[data-voice-toggle]")){this.setVoiceEnabled(!this.voiceEnabled);return}if(t.target.closest("[data-voice-test]")){this.setVoiceEnabled(!0,{announce:!1}),this.speak(`Hi there! I'm your ${this.voiceGender==="girl"?"girl":"boy"} voice guide. Let's build together!`,{test:!0});return}if(t.target.closest("[data-guide-speak]")){this.speak(this.guideAnswer?.textContent||"");return}let i=t.target.closest("[data-guide-choice]");if(i){this.selectGuideQuestion(i.dataset.guideChoice);return}if(t.target.closest("[data-game-fullscreen]")){this.options.onToggleFullscreen?.();return}if(t.target.closest("[data-restart]")){this.restartLevel();return}if(t.target.closest("[data-skip]")){this.showLevelSelect();return}if(t.target.closest("[data-settings-open]")){this.toggleSettings(!0);return}if(t.target.closest("[data-settings-close]")){this.toggleSettings(!1);return}if(t.target.closest("[data-camera]")){this.toggleSettings(!0);return}if(t.target.closest("[data-theme-next]")){this.nextTheme();return}let n=t.target.closest("[data-preset]");if(n){this.view?.focus?.(n.dataset.preset);return}let r=t.target.closest("[data-overlay-action]");if(r){this.onOverlayAction(r.dataset.overlayAction);return}},this.root.addEventListener("click",this.onClick),this.onChange=t=>{let e=t.target.dataset.setting;e&&(e==="motion"?this.updateSettings({motion:t.target.checked?"reduced":"full"}):e==="sound"||e==="haptics"?this.updateSettings({[e]:t.target.checked}):e==="voice"?this.setVoiceEnabled(t.target.checked):e==="voiceGender"?this.setVoiceGender(t.target.value):e==="quality"&&this.updateSettings({quality:t.target.value}))},this.root.addEventListener("change",this.onChange),this.setupSpeech(),this.onHoldDown=t=>{this.currentStep()?.control!=="hold"||this.hold||(t.preventDefault(),this.hold={x:t.clientX,pointerId:t.pointerId},this.holdButton.setPointerCapture?.(t.pointerId),this.view?.startSeat?.())},this.onHoldMove=t=>{if(!this.hold||t.pointerId!==this.hold.pointerId)return;let e=t.clientX-this.hold.x;this.hold.x=t.clientX,this.view?.nudgeSeat?.(e)},this.onHoldUp=t=>{!this.hold||t.pointerId!==this.hold.pointerId||(this.hold=null,this.view?.finishSeat?.())},this.holdButton.addEventListener("pointerdown",this.onHoldDown),this.holdButton.addEventListener("pointermove",this.onHoldMove),this.holdButton.addEventListener("pointerup",this.onHoldUp),this.holdButton.addEventListener("pointercancel",this.onHoldUp),this.onKey=t=>{if(t.defaultPrevented||t.metaKey||t.ctrlKey||t.altKey)return;let e=t.target?.tagName?.toLowerCase();["input","select","textarea"].includes(e)||((t.key==="h"||t.key==="H")&&this.showHint(),(t.key==="w"||t.key==="W")&&this.toggleWhy(),t.key==="Escape"&&(this.settingsPanel.hidden?this.overlayOpen&&this.closeOverlay():this.toggleSettings(!1)))},document.addEventListener("keydown",this.onKey)}createView(){let t={onClick:e=>this.onSceneClick(e),onPartDrop:e=>this.onPartDrop(e),onSafetyDrop:e=>this.onSafetyDrop(e),onRotate:e=>this.onRotate(e),onSeatStart:()=>this.onSeatStart(),onSeatProgress:e=>this.onSeatProgress(e),onSeatResult:e=>this.onSeatResult(e),onSeatCancel:()=>{this.meter.classList.remove("is-live"),this.resetMeter()},onReject:e=>this.onReject(e),onBooted:()=>this.onBooted(),onPowerFault:()=>this.onPowerFault(),onBoardMounted:()=>this.onBoardMounted(),onEscape:()=>this.onEscape(),canDrag:e=>this.canDrag(e),onBlocked:e=>this.onBlocked(e),onLeverDragIncomplete:()=>this.toast("Keep dragging the lever until it reaches its raised or locked position.","info",2400)};this.useWebGL=nd(),this.useWebGL?(this.scene=new qo({container:this.canvasHost,theme:this.theme,settings:this.settings,audio:this.audio,callbacks:t,onQuality:e=>this.onQuality(e)}),this.particles=new Go(this.scene.scene,{scale:this.scene.quality.particles,palette:this.theme.palette}),this.scene.particles=this.particles,this.view=this.scene):(this.view=new Yo({container:this.canvasHost,theme:this.theme,settings:this.settings,audio:this.audio,callbacks:t}),this.qualityEl.hidden=!1,this.qualityEl.textContent="2D compatibility bench")}observeTheme(){this.stopTheme=Kc(t=>{this.theme=t,this.audio.setTheme(t.id),this.particles?.setPalette(t.palette),this.view?.setTheme?.(t),tl(this.root)}),tl(this.root)}startClock(){this.clockTimer=window.setInterval(()=>{this.destroyed||this.updateClock()},500)}updateClock(){let t=(performance.now()-this.levelStartedAt)/1e3,e=this.root.querySelector("[data-hud-time]");e&&(e.textContent=Oc(t))}firstPlayableIndex(){let t=Be.findIndex(e=>!this.completed[e.id]);return t<0?0:t}currentLevel(){return Be[this.levelIndex]}currentStep(){return this.currentLevel()?.steps[this.stepIndex]||null}startLevel(t,{instant:e=!1,silent:i=!1}={}){if(this.destroyed)return;!i&&this.overlayOpen&&this.closeOverlay(),this.levelIndex=Bc(Number(t)||0,0,Be.length-1),this.stepIndex=0,this.strikes=0,this.hintsUsed=0,this.score=1e3,this.failed=!1,this.waitingForBoot=!1,this.levelStartedAt=performance.now(),this.hold=null,this.removedCaseScrews=0,this.clearTimers();let n=this.currentLevel();this.view?.setLevel?.(n.id,{instant:!0}),this.view?.focus?.(n.camera,e),this.root.querySelectorAll("[data-level]").forEach((a,o)=>{a.classList.toggle("is-active",o===this.levelIndex),a.setAttribute("aria-selected",String(o===this.levelIndex))}),this.hudLevel().textContent=n.tab,this.renderSteps(),this.renderStep({animate:!e,announce:!1}),this.updateHud(),this.updateClock(),this.toggleSettings(!1),this.renderCompanion("happy",n.intro),this.toast(n.intro,"info",4200);let r=this.currentStep();r&&this.speak(`${n.intro} ${r.title}. ${r.hint}`),this.audio.whoosh(),this.track("level-start",{level:n.id})}restartLevel(){this.startLevel(this.levelIndex)}renderStep({animate:t=!0,announce:e=!0}={}){let i=this.currentStep(),n=this.currentLevel();if(!i)return;let r=this.root.querySelector("[data-objective-eyebrow]"),a=this.root.querySelector("[data-objective-title]"),o=this.root.querySelector("[data-objective-hint]");r&&(r.textContent=`${n.short} \xB7 Step ${this.stepIndex+1} of ${n.steps.length}`),a&&(a.textContent=i.title),o&&(o.textContent=i.hint);let l=this.root.querySelector("[data-motion-guide]");if(l){let c=i.action==="lever-close"?"down":"up";l.hidden=!i.action.startsWith("lever"),l.classList.toggle("is-down",c==="down"),l.querySelector(".pclab-motion-arrow").textContent=c==="down"?"\u2193":"\u2191",l.querySelector("[data-motion-label]").textContent=`Drag the lever ${c}`}this.whyCopy.hidden=!0,this.whyCopy.textContent=i.why,this.renderComponentGuide(i),this.rotateButton.hidden=i.control!=="rotate",this.holdButton.hidden=i.control!=="hold",this.meter.hidden=i.control!=="hold",i.control!=="hold"&&this.resetMeter(),this.objective.classList.toggle("is-pulsing",t&&this.settings.motion!=="reduced"),t&&window.setTimeout(()=>this.objective.classList.remove("is-pulsing"),500),this.view?.highlight?.(i.target||null),e&&this.speak(`${i.title}. ${i.hint}`),this.updateHud(),this.renderSteps()}renderSteps(){let t=this.currentLevel();t&&(this.stepsEl.innerHTML=t.steps.map((e,i)=>{let n=i<this.stepIndex,r=i===this.stepIndex;return`<li class="${n?"is-done":""} ${r?"is-current":""}">
        <span class="pclab-step-dot" aria-hidden="true">${n?"\u2713":i+1}</span>
        <span>${vi(e.title)}</span>
      </li>`}).join(""))}renderComponentGuide(t){let e=Bx(t,this.currentLevel()?.id);e&&(this.guideTitle.textContent=e.title,this.guideQuestion="meaning",this.guideContent=e,this.selectGuideQuestion("meaning",{announce:!1}))}selectGuideQuestion(t,{announce:e=!1}={}){if(!this.guideContent||!["meaning","use"].includes(t))return;this.guideQuestion=t;let i=t==="meaning"?`What is ${this.guideContent.title}?`:`What is ${this.guideContent.title} used for?`;this.guidePrompt.textContent=i,this.guideAnswer.textContent=this.guideContent[t],this.root.querySelectorAll("[data-guide-choice]").forEach(n=>{let r=n.dataset.guideChoice===t;n.classList.toggle("is-active",r),n.setAttribute("aria-pressed",String(r))}),e&&this.voiceEnabled&&this.speak(this.guideContent[t])}setupSpeech(){this.speechSynthesis=window.speechSynthesis||null,this.speechSupported=!!(this.speechSynthesis&&window.SpeechSynthesisUtterance),this.speechActivated=!1,this.onVoicesChanged=()=>{this.speechVoices=this.speechSynthesis?.getVoices?.()||[],this.voiceAvailable=this.speechSupported&&this.speechVoices.length>0,this.voiceAvailable&&this.voicePreference?this.setVoiceEnabled(!0,{announce:!1,persist:!1,activate:!1}):this.voiceAvailable||this.setVoiceEnabled(!1,{announce:!1,persist:!1,activate:!1}),this.updateVoiceStatus()},this.speechSupported&&(this.speechSynthesis.addEventListener?.("voiceschanged",this.onVoicesChanged),this.onVoicesChanged(),window.setTimeout(this.onVoicesChanged,1200)),this.setVoiceEnabled(this.voiceEnabled,{announce:!1,persist:!1,activate:!1})}updateVoiceStatus(t=""){if(!this.voiceStatus)return;if(t){this.voiceStatus.textContent=t;return}if(!this.speechSupported){this.voiceStatus.textContent="Voice narration is not supported by this browser. Try a current version of Chrome, Edge, or Safari.";return}if(!this.voiceAvailable){this.voiceStatus.textContent="No speech voices are installed or available in this browser. Enable a system voice, then reload the game.";return}let e=this.speechVoices.find(i=>i.name===this.voiceName)||this.findPreferredVoice();this.voiceStatus.textContent=e?`Ready: ${e.name} \xB7 cute, gentle ${this.voiceGender} style`:`Ready: browser voice \xB7 cute, gentle ${this.voiceGender} style`}findPreferredVoice(){let t=this.speechVoices||[];if(this.voiceName){let i=t.find(n=>n.name===this.voiceName);if(i)return i}let e=this.voiceGender==="girl"?/\b(female|woman|girl|samantha|victoria|karen|moira|tessa|serena|zira|aria|jenny)\b/i:/\b(male|man|boy|daniel|alex|david|george|james|guy|ryan|fred)\b/i;return t.find(i=>e.test(i.name))||t.find(i=>/^en([-_]|$)/i.test(i.lang))||t[0]||null}setVoiceGender(t){["girl","boy"].includes(t)&&(this.voiceGender=t,this.voiceName="",this.updateVoiceStatus(),this.updateSettings({voiceGender:t,voiceName:""}))}setVoiceEnabled(t,{announce:e=!0,persist:i=!0,activate:n=!0}={}){this.voiceEnabled=!!t,i&&(this.voicePreference=this.voiceEnabled),n&&this.voiceEnabled&&(this.speechActivated=!0),this.voiceAvailable||(this.voiceEnabled=!1),this.voiceEnabled||this.speechSynthesis?.cancel(),this.voiceButton&&(this.voiceButton.disabled=!this.voiceAvailable,this.voiceButton.textContent=this.voiceEnabled?"Voice guidance on":"Voice guidance off",this.voiceButton.setAttribute("aria-pressed",String(this.voiceEnabled)),this.voiceButton.title=this.speechSupported?"":"Speech synthesis is not available in this browser.");let r=this.root.querySelector("[data-guide-speak]");r&&(r.disabled=!this.voiceAvailable||!this.voiceEnabled);let a=this.root.querySelector("[data-voice-test]");a&&(a.disabled=!this.voiceAvailable);let o=this.settingsPanel.querySelector('[data-setting="voice"]');if(o&&(o.checked=this.voiceEnabled,o.disabled=!this.voiceAvailable),this.updateVoiceStatus(),i&&this.options.onSettingsChange?.({voiceGuidance:this.voiceEnabled}),this.voiceEnabled&&e){let l=this.currentStep();l&&this.speak(`${l.title}. ${l.hint}`)}}speak(t,{test:e=!1}={}){if(!this.voiceEnabled||!t)return;if(!this.speechActivated&&!e){this.updateVoiceStatus("Tap Test voice once to activate spoken guidance.");return}let i=window.SpeechSynthesisUtterance;if(!this.voiceAvailable||!this.speechSupported||!i){this.setVoiceEnabled(!1);return}this.speechSynthesis.cancel();let n=new i(t),r=this.findPreferredVoice();r?(n.voice=r,n.lang=r.lang,this.voiceName!==r.name&&(this.voiceName=r.name,this.options.onSettingsChange?.({voiceName:r.name}))):n.lang=document.documentElement.lang||"en-US",n.rate=.88,n.pitch=this.voiceGender==="girl"?1.18:.92,n.onstart=()=>this.updateVoiceStatus(`${e?"Voice test":"Speaking"}: ${r?.name||"browser voice"} \xB7 gentle ${this.voiceGender} style`),n.onend=()=>this.updateVoiceStatus(),n.onerror=a=>{!["canceled","interrupted"].includes(a.error)&&!this.destroyed&&(this.setVoiceEnabled(!1,{announce:!1}),this.updateVoiceStatus("Voice playback failed in this browser. Check system speech settings or choose another browser voice."),this.toast("Voice playback failed. The on-screen instructions are still available.","warn",3600))},this.speechSynthesis.speak(n),this.speechSynthesis.paused&&this.speechSynthesis.resume()}updateHud(){let t=this.currentLevel();this.hudLevel().textContent=t.tab,this.root.querySelector("[data-hud-step]").textContent=`${Math.min(this.stepIndex+1,t.steps.length)} / ${t.steps.length}`,this.root.querySelector("[data-hud-score]").textContent=String(Math.max(0,this.score));let e=this.root.querySelector("[data-hud-strikes]");e.textContent=`${this.strikes} / ${_i}`,e.setAttribute("aria-label",`${this.strikes} of ${_i} mistakes`)}hudLevel(){return this.root.querySelector("[data-hud-level]")}completeStep({silent:t=!1}={}){let e=this.currentStep(),i=this.currentLevel();if(!e)return;if(t||(this.audio.clickSnap(),Ar(12,this.settings.haptics!==!1),this.toast(`${e.title} \u2014 done.`,"success",2200)),this.stepIndex>=i.steps.length-1){this.finishLevel();return}this.stepIndex+=1;let n=this.currentStep();this.renderStep(),this.updateHud(),n&&(this.renderCompanion("happy",`Next: ${n.title}. ${n.hint}`),this.track("step",{level:i.id,step:e.id}))}finishLevel(){let t=this.currentLevel(),e=(performance.now()-this.levelStartedAt)/1e3,i=Math.max(0,Math.round((e-t.par)*3)),n=Bc(Math.round(this.score-i),0,1e3),r=n>=850?3:n>=650?2:1,a={level:t.id,score:n,stars:r,time:Math.round(e),strikes:this.strikes,hints:this.hintsUsed,at:new Date().toISOString()};this.completed[t.id]=a,this.options.onSaveLevel?.(a),this.audio.success(),Ar([18,40,24],this.settings.haptics!==!1),this.track("level-complete",a);let o=this.root.querySelector(`[data-level="${this.levelIndex}"]`);if(o?.classList.add("is-done"),o?.querySelector(".pclab-tab-star")||o?.insertAdjacentHTML("beforeend",'<span class="pclab-tab-star" aria-label="completed">\u2605</span>'),this.levelIndex<Be.length-1){let l=Be[this.levelIndex+1];this.renderCompanion(r>=2?"celebrating":"happy",`Bench clean. Next is ${l.tab}.`),this.showOverlay(`
        <div class="pclab-result">
          <p class="pclab-eyebrow">Level complete \xB7 ${vi(t.tab)}</p>
          <h2>${vi(t.title)}</h2>
          ${Cd(r)}
          <div class="pclab-result-grid">
            <div><strong>${n}</strong><span>score</span></div>
            <div><strong>${Oc(e)}</strong><span>time</span></div>
            <div><strong>${this.strikes}</strong><span>strikes</span></div>
            <div><strong>${this.hintsUsed}</strong><span>hints</span></div>
          </div>
          <p class="pclab-result-copy">${vi(t.subtitle)}. ${r>=2?"That order will keep the machine serviceable.":"Clean enough to continue. Replay for a higher score."}</p>
          <div class="pclab-result-actions">
            <button class="btn btn-primary" type="button" data-overlay-action="next">Next: ${vi(l.tab)}</button>
            <button class="btn btn-ghost" type="button" data-overlay-action="retry">Retry level</button>
            <button class="btn btn-ghost" type="button" data-overlay-action="select">Level select</button>
          </div>
        </div>
      `)}else this.finishCampaign()}finishCampaign(){let t=Be.map(h=>this.completed[h.id]).filter(Boolean),e=t.length===Be.length,i=t.reduce((h,d)=>h+d.score,0),n=t.reduce((h,d)=>h+d.stars,0),r=t.reduce((h,d)=>h+d.time,0),a=e?Math.round(i/(Be.length*1e3)*100):null,o=e?Math.max(1,Math.round(n/Be.length)):1,l=null;e&&(l=this.options.onCampaignComplete?.({score:i,total:Be.length*1e3,accuracy:a,stars:o,timeSeconds:r,levels:t,mode:this.mode})||null),this.audio.success(),this.renderCompanion(e?"celebrating":"thinking",e?"Four benches, one clean build. That is the whole COC 1 workflow.":"One more level to finish the campaign. Open level select to see what is missing.");let c=l?`<p class="pclab-result-copy">+${l.earnedXp??0} XP recorded${l.newBadges?.length?` \xB7 ${l.newBadges.map(h=>vi(h.name)).join(", ")}`:""}.</p>`:`<p class="pclab-result-copy">Campaign recorded only when all four benches are complete. You have ${t.length} of ${Be.length}.</p>`;this.showOverlay(`
      <div class="pclab-result">
        <p class="pclab-eyebrow">Campaign ${e?"complete":"in progress"}</p>
        <h2>${e?"The build is alive.":"Keep the bench moving."}</h2>
        ${e?Cd(o):""}
        <div class="pclab-result-grid">
          <div><strong>${e?a:t.length}</strong><span>${e?"% accuracy":"of 4 levels"}</span></div>
          <div><strong>${i}</strong><span>total score</span></div>
          <div><strong>${Oc(r)}</strong><span>bench time</span></div>
          <div><strong>${n}</strong><span>stars</span></div>
        </div>
        ${c}
        <div class="pclab-result-actions">
          <button class="btn btn-primary" type="button" data-overlay-action="select">Play a level</button>
          <button class="btn btn-ghost" type="button" data-overlay-action="retry">Retry fault level</button>
          <a class="btn btn-ghost" href="/play">Back to interactives</a>
        </div>
      </div>
    `),this.track("campaign-complete",{allDone:e,accuracy:a,stars:o})}failLevel(t=`You have reached ${_i} mistakes. Take a moment to review the step, then try again.`){this.failed||(this.failed=!0,this.audio.fail(),Ar([30,50,30],this.settings.haptics!==!1),this.renderCompanion("oops",t),this.showOverlay(`
      <div class="pclab-result is-fail">
        <p class="pclab-eyebrow">Bench reset</p>
        <h2>Pause and reset the bench.</h2>
        <p class="pclab-result-copy">${vi(t)} Nothing was saved for this attempt.</p>
        <div class="pclab-result-actions">
          <button class="btn btn-primary" type="button" data-overlay-action="retry">Restart level</button>
          <button class="btn btn-ghost" type="button" data-overlay-action="select">Level select</button>
          <a class="btn btn-ghost" href="/play">Back to interactives</a>
        </div>
      </div>
    `))}onSceneClick(t){if(this.overlayOpen||this.failed)return;let e=this.currentStep();if(!e||t==="rotate")return;if((t==="lever"&&e.action.startsWith("lever")||t==="tools"&&e.action==="arrange-bench"||t==="clips"&&e.action.startsWith("clips")?e.action:t)===e.action){this.runStep(e);return}if(this.currentLevel().id==="power"&&["fan-cable","psu","peripheral","ram"].includes(t)){this.score=Math.max(0,this.score-20),this.strikes+=1,this.updateHud(),this.audio.error(),this.renderCompanion("thinking","That connection is seated. Keep checking in the module order."),this.toast("Not the fault. Check the next item in the order.","warn",2600),this.speak("That component is not the fault. Keep checking in the module order."),this.strikes>=_i&&this.failLevel(`You have reached ${_i} mistakes. Take a moment to review the step, then try again.`);return}this.wrongAction(t,e)}runStep(t){let e=this.currentLevel();if(e.id==="safety"){switch(t.action){case"clean-bench":this.view.cleanBench();break;case"arrange-bench":this.view.arrangeBench();break;case"power":this.view.shutdownSafety();break;case"plug":this.view.unplugPower();break;case"peripheral":this.view.disconnectPeripheral();break;case"bracelet":this.view.removeBracelet();break;case"tools":this.view.prepareTools();break;case"bins":this.view.prepareBins();break;case"strap":this.view.wearStrap();break;case"camera":this.view.documentConnections();break;default:break}this.completeStep();return}if(e.id==="cpu"){t.action==="lever-open"?(this.view.setLever(!0),this.completeStep()):t.action==="lever-close"?(this.view.setLever(!1),this.completeStep()):t.action==="paste"?(this.view.applyPaste(),this.view.showCoolerReady(),this.completeStep()):t.action==="cooler"&&(this.view.mountCooler(),this.completeStep());return}if(e.id==="ram"){t.action==="clips-open"?(this.view.openRamClips(),this.completeStep()):t.action==="clips-close"&&(this.view.closeRamClips(),this.completeStep());return}if(e.id==="power"){t.action==="power"&&t.id==="power-on"?(this.view.powerOn(),this.completeStep(),this.schedule(()=>{!this.destroyed&&this.currentLevel().id==="power"&&this.currentStep()?.id==="fan"&&this.view.powerFault()},1150)):t.action==="fan-cable"&&t.id==="fan"?(this.view.inspectFanCable(),this.completeStep(),this.toast("The fan connector is loose. Continue the module checks before reconnecting it.","warn",3200)):t.action==="psu"?(this.view.checkPsu(),this.completeStep()):t.action==="peripheral"?(this.view.checkMonitorCable(),this.completeStep()):t.action==="ram"?(this.view.reseatRamPower(),this.completeStep()):t.action==="fan-cable"&&t.id==="fix"?(this.view.fixFanCable(),this.completeStep(),this.renderCompanion("happy","Fan connector reconnected. Now retest the system.")):t.action==="power"&&t.id==="boot"&&(this.waitingForBoot=!0,this.view.powerOn(),this.toast("POST in progress. Watch the fan and the display.","info",3200));return}}wrongAction(t,e){this.overlayOpen||this.failed||(this.audio.error(),this.score=Math.max(0,this.score-120),this.strikes+=1,this.updateHud(),this.renderCompanion("oops",`Not yet. ${e.hint}`),this.toast(`Not yet. ${e.title}.`,"warn",2800),this.view?.highlight?.(e.target||null),this.track("strike",{level:this.currentLevel().id,action:t,step:e.id}),this.speak(`Try again. ${e.hint}`),this.strikes>=_i&&this.failLevel(`You have reached ${_i} mistakes. Take a moment to review the step, then try again.`))}canDrag(t){let e=this.currentStep();return e?this.currentLevel().id==="safety"?t==="strap"&&e.action==="strap"||t==="camera"&&e.action==="camera"||t==="plug"&&e.action==="plug":t==="case-screw"?e.action==="remove-screws":t==="lever"?e.action.startsWith("lever"):t==="cpu"||t==="ram"?e.action==="drop":!1:!1}onBlocked(t){let e=this.currentStep();e&&this.toast(`Finish \u201C${e.title}\u201D first.`,"warn",2200)}onSafetyDrop({action:t,valid:e}){if(this.overlayOpen||this.failed)return;let i=this.currentStep();if(i){if(e&&t===i.action){this.completeStep();return}if(e){this.wrongAction(t,i);return}this.toast(`No problem\u2014try that drop again. ${i.hint}`,"info",3e3)}}onPartDrop(t){if(this.overlayOpen||this.failed)return;let e=this.currentStep();if(e){if(t.part==="case-screw"&&e.action==="remove-screws"){if(!t.valid){this.toast("No problem\u2014drop the screw anywhere inside the parts tray beside the motherboard.","info",2800);return}this.removedCaseScrews+=1,this.removedCaseScrews===4?(this.view?.openCasePanel(),this.view?.focus("cpu"),this.completeStep()):(this.objectiveHint.textContent=`${this.removedCaseScrews} of 4 screws in the parts tray. Keep going.`,this.toast(`${this.removedCaseScrews} of 4 case screws removed.`,"success",1800));return}if(e.action!=="drop"){t.valid&&this.view?.reject?.(t.part==="cpu"?this.view.cpu:this.view.ram,"order"),this.wrongAction(t.part,e);return}if(!t.valid){if(t.reason==="target"){this.toast("No problem\u2014try again and release the part over its highlighted target.","info",2600);return}this.audio.error(),this.score=Math.max(0,this.score-80),this.strikes+=1,this.updateHud();let i={lever:"The socket lever is still closed. Open it before seating the CPU.",orientation:"The triangle is not aligned. Rotate the part and try again.",force:"Too fast and too hard. Set the part down gently.",target:"Release the part over the socket or slot."};this.renderCompanion("oops",i[t.reason]||i.target),this.toast(i[t.reason]||i.target,"warn",3e3),this.track("drop-fail",{part:t.part,reason:t.reason}),this.speak(i[t.reason]||i.target),this.strikes>=_i&&this.failLevel(`You have reached ${_i} mistakes. Use the alignment marks and gentle pressure, then try again.`);return}if(t.part==="cpu"){let i=(t.speed||0)<2.2&&(t.height||0)<.3;this.view.seatCpu({gentle:i}),this.completeStep();return}t.part==="ram"&&(this.view.seatRamReady(),this.completeStep())}}onRotate({part:t,aligned:e}){if(this.overlayOpen||this.failed)return;let i=this.currentStep();if(i){if(i.action!=="rotate"){this.toast("Rotate only matters when the part is not aligned yet.","info",2e3);return}e?(this.renderCompanion("happy","The alignment mark matches. Now move the part into place."),this.completeStep()):(this.audio.click(),this.toast("Not aligned yet. Keep rotating.","info",1800))}}onSeatStart(){this.meter.hidden=!1,this.meter.classList.add("is-live"),this.renderCompanion("thinking","Hold. Keep the module level and release in the green zone."),this.speak("Hold. Keep the module level and release in the green zone."),this.track("seat-start")}onSeatProgress({pressure:t,balance:e}){let i=Bc(t/1.15,0,1)*100;this.meterFill&&(this.meterFill.style.width=`${i}%`),this.meter.dataset.pressure=t.toFixed(2),this.meter.dataset.balance=e.toFixed(2),this.meter.classList.toggle("is-balanced",Math.abs(e)<.36),this.meter.classList.toggle("is-tilted",Math.abs(e)>=.36)}onSeatResult(t){if(this.overlayOpen||this.failed)return;if(this.meter.classList.remove("is-live"),t.ok){this.completeStep(),this.renderCompanion("happy","Both clips clicked. That module is fully seated.");return}this.audio.error(),this.score=Math.max(0,this.score-100),this.strikes+=1,this.updateHud();let e=t.overpressure?"Too much pressure. Ease off and let the clips do the work.":t.underpressure?"Not enough pressure. The module is not fully seated.":"The module tilted. Keep it level while you press.";this.renderCompanion("oops",e),this.toast(e,"warn",3200),this.resetMeter(),this.track("seat-fail",{pressure:t.pressure,balanced:t.balanced}),this.speak(e),this.strikes>=_i&&this.failLevel(`You have reached ${_i} mistakes. Keep the module level and press evenly, then try again.`)}onReject(t){this.overlayOpen||this.failed||this.track("reject",{reason:t})}onPowerFault(){this.overlayOpen||this.failed||(this.renderCompanion("oops","No display and the fan is still. Work the fault order: fan, PSU, display, RAM."),this.toast("No POST. The fan is still and the monitor is dark.","warn",4200),this.audio.error(),this.speak("No display and the fan is still. Check the fan, power supply, display cable, and memory in order."),this.track("power-fault"))}onBooted(){this.overlayOpen||this.failed||this.currentLevel().id==="power"&&this.waitingForBoot&&(this.waitingForBoot=!1,this.completeStep(),this.renderCompanion("celebrating","Fan spinning, display alive. POST confirms the repair."))}onBoardMounted(){this.track("board-mounted")}onEscape(){this.settingsPanel.hidden?this.overlayOpen&&this.closeOverlay():this.toggleSettings(!1)}showHint(){if(this.overlayOpen||this.failed)return;let t=this.currentStep();t&&(this.hintsUsed+=1,this.score=Math.max(0,this.score-40),this.updateHud(),this.whyCopy.hidden=!0,this.renderCompanion("thinking",t.hint),this.toast(t.hint,"info",5200),this.view?.highlight?.(t.target||null),this.speak(t.hint),this.audio.hover(),this.track("hint",{level:this.currentLevel().id,step:t.id}))}toggleWhy(){let t=this.currentStep();t&&(this.whyCopy.hidden=!this.whyCopy.hidden,this.whyCopy.hidden||(this.whyCopy.textContent=t.why,this.renderCompanion("thinking",t.why),this.speak(t.why)))}resetMeter(){this.meterFill&&(this.meterFill.style.width="0%"),this.meter.classList.remove("is-balanced","is-tilted","is-live")}showOverlay(t){this.overlay.innerHTML=t,this.overlay.hidden=!1,this.overlayOpen=!0,this.root.classList.add("is-overlay"),window.setTimeout(()=>this.overlay.querySelector("button, a")?.focus({preventScroll:!0}),40)}closeOverlay(){this.overlay.hidden=!0,this.overlayOpen=!1,this.root.classList.remove("is-overlay")}onOverlayAction(t){if(t==="next"){this.startLevel(this.levelIndex+1);return}if(t==="retry"){this.startLevel(this.levelIndex);return}t==="select"&&this.showLevelSelect(),t==="close"&&this.closeOverlay()}showLevelSelect(){let t=Be.map((e,i)=>{let n=this.completed[e.id];return`<button class="pclab-select-row" type="button" data-level="${i}">
        <span><strong>${vi(e.tab)}</strong><small>${vi(e.subtitle)}</small></span>
        <span class="pclab-select-result">${n?`${n.score} \xB7 ${"\u2605".repeat(n.stars)}`:"Not yet"}</span>
      </button>`}).join("");this.showOverlay(`
      <div class="pclab-result">
        <p class="pclab-eyebrow">Bench select</p>
        <h2>Pick up a level</h2>
        <div class="pclab-select-list">${t}</div>
        <div class="pclab-result-actions">
          <button class="btn btn-ghost" type="button" data-overlay-action="close">Close</button>
          <a class="btn btn-ghost" href="/play">Back to interactives</a>
        </div>
      </div>
    `)}toggleSettings(t){this.settingsPanel.hidden=!t,t&&(this.settingsPanel.querySelector('[data-setting="sound"]').checked=this.settings.sound!==!1,this.settingsPanel.querySelector('[data-setting="haptics"]').checked=this.settings.haptics!==!1,this.settingsPanel.querySelector('[data-setting="motion"]').checked=this.settings.motion==="reduced",this.settingsPanel.querySelector('[data-setting="voice"]').checked=this.voiceEnabled,this.settingsPanel.querySelector('[data-setting="voice"]').disabled=!this.voiceAvailable,this.settingsPanel.querySelector('[data-setting="voiceGender"]').value=this.voiceGender,this.settingsPanel.querySelector('[data-setting="voiceGender"]').disabled=!this.voiceAvailable,this.settingsPanel.querySelector('[data-setting="quality"]').value=this.settings.quality||"auto",this.settingsPanel.querySelector("[data-quality-label]").textContent=this.qualityInfo?`${this.qualityInfo.label} \xB7 ${this.qualityInfo.fps||60} fps`:"")}updateSettings(t){this.settings={...this.settings,...t},t.quality&&(this.settings.quality=t.quality),this.audio.setEnabled(this.settings.sound!==!1),this.view?.setSettings?.(this.settings),this.options.onSettingsChange?.(t),t.motion&&(document.documentElement.dataset.motion=t.motion),this.toggleSettings(!0),this.toast("Bench settings updated.","success",1800)}nextTheme(){let t=Fc.indexOf(this.theme.id),e=Fc[(t+1)%Fc.length];this.options.onThemeChange?.(e),this.toast("Theme applied to the bench.","success",1800)}onQuality(t){this.qualityInfo=t,this.qualityEl.hidden=!1,this.qualityEl.textContent=t.label;let e=this.settingsPanel.querySelector("[data-quality-label]");e&&(e.textContent=`${t.label} \xB7 ${t.fps||60} fps`)}renderCompanion(t,e){let i=this.options.companionArt?.(t,{size:96})||"",n=this.root.querySelector("[data-companion-art]");n&&(n.innerHTML=i);let r=this.root.querySelector("[data-companion-name]");r&&(r.textContent=this.options.companionName||this.companion.name||"Chip");let a=this.root.querySelector("[data-companion-line]");a&&(a.textContent=e),this.options.onCompanionSay?.(e,t)}toast(t,e="info",i=2600){!this.toastEl||!t||(this.toastEl.hidden=!1,this.toastEl.className=`pclab-toast is-${e}`,this.toastEl.textContent=t,clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>{this.toastEl&&(this.toastEl.hidden=!0)},i))}schedule(t,e){let i=window.setTimeout(()=>{this.timers.delete(i),this.destroyed||t()},e);return this.timers.add(i),i}clearTimers(){this.timers.forEach(t=>clearTimeout(t)),this.timers.clear()}track(t,e={}){try{window.dispatchEvent(new CustomEvent("techpro:game",{detail:{game:"pc-lab",name:t,...e,at:Date.now()}}))}catch{}}destroy(){this.destroyed||(this.destroyed=!0,this.stopTheme?.(),this.clearTimers(),clearInterval(this.clockTimer),clearTimeout(this.toastTimer),document.removeEventListener("keydown",this.onKey),this.speechSynthesis?.removeEventListener?.("voiceschanged",this.onVoicesChanged),this.speechSynthesis?.cancel(),this.root?.removeEventListener("click",this.onClick),this.root?.removeEventListener("change",this.onChange),this.holdButton?.removeEventListener("pointerdown",this.onHoldDown),this.holdButton?.removeEventListener("pointermove",this.onHoldMove),this.holdButton?.removeEventListener("pointerup",this.onHoldUp),this.holdButton?.removeEventListener("pointercancel",this.onHoldUp),this.view?.dispose?.(),this.mount&&(this.mount.innerHTML=""))}},xs=null;function kx(s){return Pd(),xs=new $o(s),s?.debug&&(window.__pcLab=xs),xs}function Pd(){xs&&(xs.destroy(),xs=null)}return Hd(zx);})();
