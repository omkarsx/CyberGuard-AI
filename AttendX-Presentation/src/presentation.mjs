import fs from 'node:fs/promises';
import path from 'node:path';
import { Presentation, PresentationFile } from '@oai/artifact-tool';

const ROOT = path.resolve('AttendX-Presentation');
const ASSETS = path.join(ROOT, 'assets');
const OUT = path.join(ROOT, 'output');
const TMP = path.join(ROOT, '.build');
const W = 1280, H = 720;
const C = {
  bg: '#080F1D', panel: '#111D30', panel2: '#15243A', cyan: '#30D6DC', blue: '#4A87FF',
  white: '#F2F7FF', muted: '#A5B5CD', green: '#4CDC9D', orange: '#F6A75C', red: '#FF6978',
  line: '#29415F', ink: '#07111E', soft: '#D5E3F5',
};
const FONT = 'Arial';

await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(TMP, { recursive: true });
const pres = Presentation.create({ slideSize: { width: W, height: H } });

const img = async (file) => {
  const b = await fs.readFile(path.join(ASSETS, 'images', file));
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
};
const anim = async (file) => {
  const b = await fs.readFile(path.join(ASSETS, 'animations', file));
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
};
async function scanEffect(slide,x,y,w,h) {
  slide.images.add({blob:await anim('qr-scan.gif'),contentType:'image/gif',alt:'Animated cyan QR scan line',fit:'contain',position:{left:x,top:y,width:w,height:h}});
}
function shape(slide, x, y, w, h, fill='none', opts={}) {
  return slide.shapes.add({
    geometry: opts.geometry || 'rect', name: opts.name,
    position: { left:x, top:y, width:w, height:h, ...(opts.rotation ? {rotation:opts.rotation}: {}) },
    fill, line: opts.line || {style:'solid', fill:'none', width:0},
    ...(opts.radius ? {borderRadius:opts.radius}: {}), ...(opts.shadow ? {shadow:opts.shadow}: {}),
  });
}
function text(slide, value, x, y, w, h, size=22, color=C.white, opts={}) {
  const s = shape(slide,x,y,w,h,'none',{name:opts.name}); s.text = value;
  s.text.style = { typeface:FONT, fontSize:size, color, bold:!!opts.bold,
    alignment:opts.align || 'left', verticalAlignment:opts.valign || 'middle',
    wrap:'square', autoFit:'shrinkText', insets:opts.insets ?? 0,
    ...(opts.italic ? {italic:true}: {}), ...(opts.lineSpacing ? {lineSpacing:opts.lineSpacing}: {}) };
  return s;
}
function rule(slide,x1,y1,x2,y2,color=C.line,width=2) {
  return slide.shapes.add({geometry:'line',position:{left:Math.min(x1,x2),top:Math.min(y1,y2),width:Math.max(1,Math.abs(x2-x1)),height:Math.max(1,Math.abs(y2-y1)),horizontalFlip:x2<x1,verticalFlip:y2<y1},fill:'none',line:{style:'solid',fill:color,width}});
}
function pill(slide,label,x,y,w,color=C.cyan) {
  shape(slide,x,y,w,30,'#132A3D',{geometry:'roundRect',radius:15,line:{style:'solid',fill:color,width:1}});
  text(slide,label,x+8,y,w-16,30,14,color,{bold:true,align:'center'});
}
function base(title, index, kicker='ATTENDX') {
  const s=pres.slides.add(); s.background.fill=C.bg;
  text(s,kicker.toUpperCase(),66,28,500,24,13,C.cyan,{bold:true});
  text(s,title,66,66,1148,58,42,C.white,{bold:true});
  rule(s,66,133,1214,133,C.line,1);
  text(s,String(index).padStart(2,'0'),1176,674,42,20,13,C.muted,{align:'right'});
  return s;
}
function note(slide, body, refs=[]) {
  slide.speakerNotes.text = body + (refs.length ? '\n\nSources: ' + refs.join(' | ') : '');
}
function dot(slide,x,y,color=C.cyan,r=5) { shape(slide,x-r,y-r,r*2,r*2,color,{geometry:'ellipse'}); }
function connector(slide,x1,y1,x2,y2,color=C.cyan,width=2) { rule(slide,x1,y1,x2,y2,color,width); dot(slide,x2,y2,color,4); }
function qr(slide,x,y,size,cell=8,accent=C.white,showLabel=true) {
  // Illustrative, non-token QR-style matrix built from editable slide shapes.
  shape(slide,x-10,y-10,size+20,size+20,'#FFFFFF',{geometry:'roundRect',radius:8,line:{style:'solid',fill:'#D7E2F1',width:1}});
  const n=Math.floor(size/cell); const seed=(a,b)=>((a*31+b*17+a*b*7)%11)<5;
  const finder=(cx,cy,i,j)=>{const dx=i-cx,dy=j-cy; return Math.abs(dx)<=3&&Math.abs(dy)<=3&&(Math.abs(dx)===3||Math.abs(dy)===3|| (Math.abs(dx)<=1&&Math.abs(dy)<=1));};
  for(let j=0;j<n;j++) for(let i=0;i<n;i++) {
    const f=finder(3,3,i,j)||finder(n-4,3,i,j)||finder(3,n-4,i,j);
    const inFinder=(Math.abs(i-3)<=4&&Math.abs(j-3)<=4)||(Math.abs(i-(n-4))<=4&&Math.abs(j-3)<=4)||(Math.abs(i-3)<=4&&Math.abs(j-(n-4))<=4);
    if(f || (!inFinder&&seed(i,j))) shape(slide,x+i*cell,y+j*cell,cell-1,cell-1,'#101C2D');
  }
  if(showLabel) text(slide,'ILLUSTRATIVE QR',x-10,y+size+14,size+20,17,11,C.muted,{bold:true,align:'center'});
}
function browser(slide,x,y,w,h,title='AttendX',small=false) {
  shape(slide,x,y,w,h,'#0E192A',{geometry:'roundRect',radius:16,line:{style:'solid',fill:'#42607F',width:2},shadow:'shadow-lg'});
  shape(slide,x,y,w,34,'#1D2C41',{geometry:'roundRect',radius:14});
  shape(slide,x,y+22,w,13,'#1D2C41');
  ['#FF6F73','#F5BE59','#4CDC9D'].forEach((c,i)=>shape(slide,x+16+i*18,y+12,8,8,c,{geometry:'ellipse'}));
  text(slide,title,x+78,y+5,w-96,22,small?12:14,C.muted,{bold:true});
  return {x:x+14,y:y+46,w:w-28,h:h-60};
}
function miniUi(slide,x,y,w,h,role) {
  const b=browser(slide,x,y,w,h,'attendx-flax.vercel.app',true);
  shape(slide,b.x,b.y,b.w,32,'#14243A');
  text(slide,'AX',b.x+12,b.y+5,26,22,14,C.cyan,{bold:true,align:'center'});
  text(slide,role,b.x+47,b.y+6,b.w-58,20,14,C.white,{bold:true});
  const yy=b.y+48;
  if(role==='ADMIN'){
    text(slide,'ACADEMIC SETUP',b.x+12,yy,b.w-24,16,10,C.muted,{bold:true});
    ['Roster','Faculty','Courses','Schedule','Sessions'].forEach((a,i)=>{
      const cols=3, gap=7, tileW=(b.w-24-gap*2)/3; const xx=b.x+12+(i%cols)*(tileW+gap); const ry=yy+24+Math.floor(i/cols)*42;
      shape(slide,xx,ry,tileW,34,'#15263C',{geometry:'roundRect',radius:6,line:{style:'solid',fill:C.line,width:1}});
      text(slide,a,xx+4,ry+4,tileW-8,26,11,i===4?C.cyan:C.soft,{bold:true,align:'center'});
    });
    if(h>=250) text(slide,'Identity claims • Session monitoring',b.x+12,b.y+b.h-34,b.w-24,20,11,C.muted);
  } else if(role==='TEACHER') {
    text(slide,'TODAY’S TIMETABLE',b.x+12,yy,b.w-24,16,10,C.muted,{bold:true});
    ['09:00  Innovation','10:00  Network Systems'].forEach((a,i)=>{
      shape(slide,b.x+12,yy+24+i*47,b.w-24,38,'#15263C',{geometry:'roundRect',radius:6,line:{style:'solid',fill:i===0?C.cyan:C.line,width:1}});
      text(slide,a,b.x+19,yy+27+i*47,b.w-38,31,12,C.white,{bold:i===0});
    });
    if(h>=250) pill(slide,'START SESSION',b.x+12,b.y+b.h-37,124,C.green);
  } else {
    text(slide,'STUDENT DASHBOARD',b.x+12,yy,b.w-24,16,10,C.muted,{bold:true});
    shape(slide,b.x+12,yy+28,b.w-24,49,'#15263C',{geometry:'roundRect',radius:8,line:{style:'solid',fill:C.line,width:1}});
    text(slide,'Attendance overview',b.x+22,yy+32,b.w-44,17,12,C.white,{bold:true});
    text(slide,'Today’s classes • Records',b.x+22,yy+50,b.w-44,17,10,C.muted);
    pill(slide,'SCAN QR',b.x+12,b.y+b.h-39,96,C.cyan);
  }
  return b;
}

// 1 — Cinematic cover
{
  const s=pres.slides.add(); s.background.fill=C.bg;
  s.images.add({blob:await img('classroom-hero.png'),contentType:'image/png',alt:'Illustrative classroom QR attendance scene',fit:'cover',position:{left:0,top:0,width:W,height:H}});
  shape(s,0,0,720,H,'linear(0deg, #07101E/98 0%, #07101E/88 56%, #07101E/0 100%)');
  shape(s,0,0,W,H,'#07101E/18');
  await scanEffect(s,1024,175,110,110);
  text(s,'ATTENDX',72,142,620,106,84,C.white,{bold:true});
  text(s,'QR-Code-Based Smart\nAttendance Management System',76,258,610,106,34,C.soft,{bold:true});
  shape(s,76,390,88,4,C.cyan);
  text(s,'JSPM UNIVERSITY PUNE',76,422,480,25,16,C.cyan,{bold:true});
  text(s,'FACULTY OF SCIENCE & TECHNOLOGY  ·  SCHOOL OF ELECTRICAL AND COMMUNICATION SCIENCES',76,455,700,24,13,C.muted,{bold:true});
  text(s,'ELECTRONICS & TELECOMMUNICATION ENGINEERING  ·  INNOVATION  ·  230IINB02_05',76,484,690,24,13,C.muted);
  text(s,'S³  /  ACADEMIC YEAR 2026–27',76,531,460,23,15,C.white,{bold:true});
  text(s,'A connected workflow for classroom attendance',76,645,600,22,15,C.muted);
  note(s,'Introduce AttendX as a web-based QR-code attendance system for academic settings. The classroom image is an illustrative visual asset, not a photograph of an actual AttendX deployment. The QR shown is decorative and contains no attendance token.');
}

// 2 — The problem and solution
{
  const s=base('Why AttendX?',2);
  // Left: manual workflow
  s.images.add({blob:await img('manual-register.png'),contentType:'image/png',alt:'Illustrative manual classroom attendance scene',fit:'cover',position:{left:66,top:164,width:490,height:374},geometry:'roundRect',borderRadius:'rounded-2xl'});
  shape(s,66,164,490,374,'#07101E/36',{geometry:'roundRect',radius:16});
  text(s,'TRADITIONAL',92,184,180,24,13,C.orange,{bold:true});
  text(s,'Register. Call. Mark.',92,224,400,48,29,C.white,{bold:true});
  const problems=['Time-consuming','Manual errors','Paperwork','Hard to manage records'];
  problems.forEach((v,i)=>{dot(s,101,309+i*39,C.orange,4);text(s,v,116,294+i*39,330,29,17,C.soft);});
  // Right: system view
  shape(s,584,164,630,374,C.panel,{geometry:'roundRect',radius:16,line:{style:'solid',fill:'#2A4564',width:1}});
  text(s,'ATTENDX',616,184,230,24,13,C.cyan,{bold:true});
  text(s,'One scan. Verified record.',616,224,540,43,29,C.white,{bold:true});
  // display/projector and phone
  shape(s,640,302,247,142,'#07111E',{geometry:'roundRect',radius:8,line:{style:'solid',fill:'#41607B',width:2}});
  text(s,'ACTIVE SESSION',659,315,210,18,11,C.green,{bold:true});
  qr(s,718,343,66,6);
  shape(s,959,293,110,168,'#08111F',{geometry:'roundRect',radius:18,line:{style:'solid',fill:'#59708C',width:2}});
  shape(s,970,311,88,124,'#13243A',{geometry:'roundRect',radius:10});
  text(s,'AX',985,319,58,24,18,C.cyan,{bold:true,align:'center'});
  text(s,'Scan QR',982,354,65,24,12,C.white,{align:'center'});
  shape(s,990,388,48,4,C.cyan,{geometry:'roundRect',radius:2});
  text(s,'Verified → Present',907,475,194,22,14,C.green,{bold:true,align:'center'});
  shape(s,586,570,628,54,'#0E1A2B',{geometry:'roundRect',radius:12,line:{style:'solid',fill:'#29415F',width:1}});
  text(s,'From manual attendance to a faster, organised digital process.',610,581,580,32,20,C.white,{bold:true,align:'center'});
  note(s,'The left side illustrates manual roll-call and record keeping. On the right, a teacher opens an attendance session and students submit a QR scan; the server validates each request before a record is created. The mock interface is illustrative.');
}

// 3 — Three user roles
{
  const s=base('One Platform. Three User Roles.',3);
  const xs=[66,480,894], ww=320;
  const roles=[
    {r:'ADMIN',title:'Administrator',desc:'Maintain academic setup',items:'Students  ·  Teachers\nCourses  ·  Rooms  ·  Timetable\nVerify claims  ·  Monitor sessions'},
    {r:'TEACHER',title:'Teacher',desc:'Run a scheduled class',items:'View timetable\nStart attendance session\nDisplay QR  ·  Review attendance'},
    {r:'STUDENT',title:'Student',desc:'Submit attendance',items:'Sign in and view schedule\nScan the session QR\nReview attendance records'},
  ];
  roles.forEach((item,i)=>{
    const x=xs[i];
    shape(s,x,162,ww,456,'#0D192A',{geometry:'roundRect',radius:16,line:{style:'solid',fill:'#29415F',width:1}});
    miniUi(s,x+18,184,ww-36,230,item.r);
    text(s,item.title,x+22,434,ww-44,32,24,C.white,{bold:true});
    text(s,item.desc,x+22,472,ww-44,22,15,i===1?C.cyan:C.muted,{bold:true});
    text(s,item.items,x+22,506,ww-44,90,16,C.soft,{lineSpacing:1.15});
    pill(s,['SET UP','CREATE SESSION','SCAN & REVIEW'][i],x+22,594, i===1?166:128,[C.blue,C.cyan,C.green][i]);
  });
  note(s,'The three interface scenes are illustrative mockups based on the repository routes. Actual role access is server-side. Administrators review identity claims and attendance; teachers view scheduled classes and create sessions; students scan QR codes and view attendance. Actual application pages require an authorized sign-in.');
}

// 4 — Teacher creates session
{
  const s=base('Step 1 — Teacher Starts a Session',4);
  // laptop UI
  shape(s,66,165,706,440,'#070C14',{geometry:'roundRect',radius:18,line:{style:'solid',fill:'#45627E',width:2},shadow:'shadow-lg'});
  shape(s,83,182,672,399,'#0D192A',{geometry:'roundRect',radius:10});
  shape(s,83,182,672,42,'#17263A',{geometry:'roundRect',radius:10}); shape(s,83,210,672,14,'#17263A');
  text(s,'AX',102,190,38,25,17,C.cyan,{bold:true}); text(s,'Faculty Portal',145,190,200,25,17,C.white,{bold:true});
  text(s,'TODAY’S TIMETABLE',108,246,260,18,12,C.muted,{bold:true});
  const lessons=[['09:00','Innovation','Room 204'],['10:00','Communication Systems','Room 108'],['11:00','Tutorial','Room 204']];
  lessons.forEach((v,i)=>{
    const yy=279+i*73; shape(s,108,yy,376,60,i===0?'#14283A':'#101F32',{geometry:'roundRect',radius:8,line:{style:'solid',fill:i===0?C.cyan:C.line,width:1}});
    text(s,v[0],124,yy+6,70,19,14,C.cyan,{bold:true}); text(s,v[1],196,yy+6,268,20,16,C.white,{bold:true}); text(s,v[2],196,yy+31,250,18,12,C.muted);
  });
  shape(s,510,266,218,173,'#13243A',{geometry:'roundRect',radius:10,line:{style:'solid',fill:'#375571',width:1}});
  text(s,'SELECTED CLASS',528,279,180,18,11,C.cyan,{bold:true});
  text(s,'Innovation',528,306,180,27,20,C.white,{bold:true}); text(s,'Scheduled lecture',528,336,180,20,13,C.muted);
  shape(s,528,379,180,40,C.cyan,{geometry:'roundRect',radius:8}); text(s,'Start Attendance',536,382,164,33,15,C.ink,{bold:true,align:'center'});
  shape(s,306,605,226,12,'#283D56',{geometry:'roundRect',radius:8}); shape(s,257,614,324,14,'#253951',{geometry:'roundRect',radius:7});
  // QR scene + sequence
  text(s,'SESSION CREATED',821,170,338,20,13,C.green,{bold:true});
  text(s,'A unique QR is generated\nfor the active timetable session.',821,203,346,70,24,C.white,{bold:true});
  qr(s,924,306,142,12);
  await scanEffect(s,924,306,142,142);
  pill(s,'TIME-LIMITED',921,511,148,C.orange);
  text(s,'Teacher displays it in class',848,554,294,22,15,C.muted,{align:'center'});
  const steps=[['01','Sign in'],['02','Select class'],['03','Start session'],['04','Display QR']];
  steps.forEach((a,i)=>{ const xx=816+i*98; text(s,a[0],xx,606,36,18,12,C.cyan,{bold:true}); text(s,a[1],xx,628,90,19,12,C.soft); if(i<3)rule(s,xx+45,615,xx+88,615,C.line,1); });
  note(s,'Teacher workflow illustrated from the teacher dashboard and session code. The repository ties session creation to timetable entries and generates a random token, signs a QR payload and sets its expiry from the session expiresAt value. No fixed expiry duration is stated here because the implementation is configurable and no duration is being claimed. The dashboard shown is illustrative, not a captured application screenshot.',[
    'https://github.com/omkarsx/attendx/blob/main/src/app/teacher/dashboard/page.tsx',
    'https://github.com/omkarsx/attendx/blob/main/src/lib/attendance/session.ts',
    'https://github.com/omkarsx/attendx/blob/main/src/lib/attendance/token.ts',
  ]);
}

// 5 — Student scan
{
  const s=base('Step 2 — Student Scans the QR Code',5);
  s.images.add({blob:await img('student-scan.png'),contentType:'image/png',alt:'Illustrative student scanning a classroom QR code',fit:'cover',position:{left:66,top:164,width:780,height:430},geometry:'roundRect',borderRadius:'rounded-2xl'});
  shape(s,66,164,780,430,'#07101E/16',{geometry:'roundRect',radius:16});
  await scanEffect(s,465,258,96,96);
  shape(s,881,164,333,430,C.panel,{geometry:'roundRect',radius:16,line:{style:'solid',fill:'#2A4564',width:1}});
  text(s,'STUDENT FLOW',906,186,240,18,12,C.cyan,{bold:true});
  const items=[['01','Sign in'],['02','Open QR scanner'],['03','Scan session code'],['04','Submit to server']];
  items.forEach((a,i)=>{const yy=227+i*48; shape(s,906,yy,31,31,'#142A3D',{geometry:'ellipse',line:{style:'solid',fill:C.cyan,width:1}}); text(s,a[0],906,yy,31,31,12,C.cyan,{bold:true,align:'center'}); text(s,a[1],950,yy,225,31,17,C.soft,{bold:i===2}); if(i<3)rule(s,921,yy+31,921,yy+48,'#35506C',1);});
  shape(s,906,434,284,118,'#0C1C2D',{geometry:'roundRect',radius:12,line:{style:'solid',fill:C.green,width:1}});
  shape(s,924,452,38,38,'#12372F',{geometry:'ellipse'}); text(s,'✓',924,451,38,39,25,C.green,{bold:true,align:'center'});
  text(s,'Attendance Marked\nSuccessfully',975,449,196,47,19,C.white,{bold:true});
  pill(s,'PRESENT',924,507,106,C.green);
  shape(s,66,617,1148,42,'#101D30',{geometry:'roundRect',radius:10,line:{style:'solid',fill:C.line,width:1}});
  text(s,'SCAN → SUBMIT → VERIFY → CONFIRM',92,624,1098,28,18,C.white,{bold:true,align:'center'});
  note(s,'A scan only submits a signed payload. The server uses the authenticated user identity, validates the payload and its expiry, checks the session, division and any batch requirement, then applies duplicate prevention before storing a PRESENT record. The result message appears only after the server-side operation succeeds. The classroom and interface scene is illustrative.');
}

// 6 — Server verification
{
  const s=base('Step 3 — Server-Side Verification',6);
  // flow header
  const stages=[['STUDENT','PHONE'],['ATTENDANCE','REQUEST'],['APP SERVER','VERIFY'],['POSTGRES','RECORD']];
  const sx=[66,338,610,882];
  stages.forEach((a,i)=>{
    shape(s,sx[i],160,220,64,i===2?'#153448':'#111F32',{geometry:'roundRect',radius:12,line:{style:'solid',fill:i===2?C.cyan:C.line,width:1}});
    text(s,a[0],sx[i]+14,170,192,17,12,i===2?C.cyan:C.muted,{bold:true,align:'center'}); text(s,a[1],sx[i]+14,190,192,24,18,C.white,{bold:true,align:'center'});
    if(i<3){rule(s,sx[i]+225,192,sx[i]+257,192,C.blue,3);shape(s,sx[i]+251,186,12,12,C.blue,{geometry:'chevron'});}
  });
  text(s,'VERIFICATION ENGINE',66,260,360,20,13,C.cyan,{bold:true});
  const checks=[
    ['01','Authenticated student identity'],['02','Signed QR token + expiry'],['03','Session is active'],['04','Stored token hash matches'],
    ['05','Division matches'],['06','Batch matches when applicable'],['07','No existing student–session record'],
  ];
  checks.forEach((a,i)=>{
    const col=i<4?0:1, row=col===0?i:i-4, x=66+col*398, y=294+row*59;
    shape(s,x,y,378,45,'#101C2D',{geometry:'roundRect',radius:9,line:{style:'solid',fill:C.line,width:1}});
    text(s,a[0],x+12,y+7,34,30,14,C.cyan,{bold:true,align:'center'});
    text(s,a[1],x+55,y+5,307,34,16,C.soft,{bold:row===3&&col===1});
    shape(s,x+347,y+16,12,12,C.green,{geometry:'ellipse'});
  });
  shape(s,870,432,344,91,'#12342E',{geometry:'roundRect',radius:12,line:{style:'solid',fill:C.green,width:1}});
  text(s,'ATTENDANCE APPROVED',892,446,300,19,12,C.green,{bold:true});
  text(s,'Atomic write → PRESENT record',892,472,300,28,19,C.white,{bold:true});
  shape(s,870,536,344,50,'#351F29',{geometry:'roundRect',radius:10,line:{style:'solid',fill:C.red,width:1}});
  text(s,'Rejected request → attempt recorded',884,544,316,34,14,'#FFC0C6',{bold:true,align:'center'});
  text(s,'Expiry and server checks reduce misuse; a shared screenshot is still possible.',66,571,766,38,15,C.orange,{bold:true});
  note(s,'Repository verification code describes seven layers. Specifically: authenticated student role and linked profile; JWT/QR signature and expiry; session lookup and active status; constant-time comparison against the stored HMAC hash; division and optional batch checks; then a transaction to reject duplicate records or insert a VERIFIED PRESENT record. The schema enforces a unique [sessionId, studentId] pair. Several invalid attempts are also logged. QR expiry and server checks reduce misuse, but do not make QR screenshot sharing impossible.',[
    'https://github.com/omkarsx/attendx/blob/main/src/lib/attendance/verification.ts',
    'https://github.com/omkarsx/attendx/blob/main/src/lib/attendance/token.ts',
    'https://github.com/omkarsx/attendx/blob/main/prisma/schema.prisma',
  ]);
}

// 7 — Architecture and stack
{
  const s=base('How AttendX Is Built',7);
  const layers=[
    {y:168,h:84,name:'BROWSER EXPERIENCE',items:'Next.js 16.3  ·  React 19  ·  TypeScript',color:C.cyan},
    {y:272,h:108,name:'APPLICATION SERVER',items:'Google OAuth  ·  Role checks  ·  Session + QR creation\nAttendance verification  ·  Server-side application operations',color:C.blue},
    {y:400,h:72,name:'DATA ACCESS',items:'Prisma ORM',color:'#8AB4FF'},
    {y:492,h:72,name:'DATABASE',items:'PostgreSQL',color:C.green},
  ];
  layers.forEach((a,i)=>{
    shape(s,98+a.y/100*12,a.y,665-a.y/12, a.h,a.y===272?'#102339':'#101D30',{geometry:'roundRect',radius:14,line:{style:'solid',fill:a.color,width:1.4}});
    text(s,a.name,122+a.y/100*12,a.y+12,230,18,12,a.color,{bold:true});
    text(s,a.items,122+a.y/100*12,a.y+34,560-a.y/12,a.h-38,18,C.white,{bold:i===0});
    if(i<3){rule(s,430,a.y+a.h,430,layers[i+1].y-6,C.cyan,2);shape(s,423,layers[i+1].y-13,14,14,C.cyan,{geometry:'chevron'});}
  });
  // cloud/deployment side
  shape(s,850,174,324,162,'#101D30',{geometry:'roundRect',radius:16,line:{style:'solid',fill:'#29415F',width:1}});
  text(s,'DEPLOYMENT',876,194,272,18,12,C.cyan,{bold:true});
  text(s,'Vercel',876,232,272,38,31,C.white,{bold:true});
  text(s,'Public web deployment',876,277,272,24,15,C.muted);
  shape(s,850,372,324,192,'#101D30',{geometry:'roundRect',radius:16,line:{style:'solid',fill:'#29415F',width:1}});
  text(s,'QR TOOLING',876,392,272,18,12,C.cyan,{bold:true});
  text(s,'qrcode',876,430,116,28,23,C.white,{bold:true}); text(s,'QR generation',1004,434,138,23,14,C.muted);
  rule(s,876,469,1148,469,C.line,1);
  text(s,'html5-qrcode',876,486,150,27,18,C.white,{bold:true}); text(s,'Browser scanning',1034,489,126,23,14,C.muted);
  pill(s,'GOOGLE OAUTH',876,524,136,C.blue);
  text(s,'Request flows down; verified result returns to the browser.',98,602,1076,28,18,C.soft,{align:'center'});
  note(s,'Stack is based on package.json, auth and attendance source, Prisma configuration, and the public Vercel deployment link. The source uses Next.js 16.3, React 19.2, TypeScript, Prisma 7 with PostgreSQL, Google OAuth, qrcode, and html5-qrcode. The project is deployed on Vercel. The supplied public evidence does not confirm a particular PostgreSQL host, so this slide names PostgreSQL only.',[
    'https://github.com/omkarsx/attendx/blob/main/package.json',
    'https://github.com/omkarsx/attendx/blob/main/prisma/schema.prisma',
    'https://github.com/omkarsx/attendx/blob/main/src/lib/auth/google.ts',
    'https://attendx-flax.vercel.app/',
  ]);
}

// 8 — Database model
{
  const s=base('Where Attendance Data Is Stored',8);
  // relationship map, sized for legibility
  const boxes=[
    ['USER',78,174,188,66,C.blue],['STUDENT',78,284,188,72,C.cyan],['TEACHER',78,408,188,72,C.blue],
    ['TIMETABLE ENTRY',398,236,220,78,C.cyan],['COURSE',398,152,220,60,C.blue],['ROOM',398,424,220,60,C.blue],
    ['ATTENDANCE SESSION',760,236,236,78,C.green],['ATTENDANCE RECORD',1014,236,218,78,C.green],
    ['ATTENDANCE ATTEMPT',760,372,236,70,C.orange],['AUDIT LOG',398,534,220,60,C.orange],
  ];
  boxes.forEach(([label,x,y,w,h,col])=>{
    shape(s,x,y,w,h,'#111F32',{geometry:'roundRect',radius:10,line:{style:'solid',fill:col,width:1.4}});
    text(s,label,x+8,y+8,w-16,h-16,15,col,{bold:true,align:'center'});
  });
  // primary relationships
  connector(s,172,240,172,284,C.line,2); text(s,'optional profile',188,248,92,19,11,C.muted);
  // Route User → Teacher outside the student profile box.
  rule(s,254,207,278,207,C.line,2); rule(s,278,207,278,444,C.line,2); rule(s,278,444,266,444,C.line,2); dot(s,266,444,C.line,4);
  connector(s,266,318,398,270,C.cyan,2); text(s,'division / batch',286,285,104,19,11,C.muted);
  connector(s,266,444,398,276,C.blue,2); text(s,'teacher',300,392,70,18,11,C.muted);
  connector(s,508,212,508,236,C.blue,2); connector(s,508,314,508,424,C.blue,2);
  connector(s,618,275,760,275,C.green,2); text(s,'timetable + teacher',637,250,116,20,11,C.muted);
  connector(s,996,275,1014,275,C.green,2);
  // Student → AttendanceRecord, routed beneath the model so it does not imply a direct student/session key.
  rule(s,266,320,300,320,C.green,2); rule(s,300,320,300,510,C.green,2); rule(s,300,510,1123,510,C.green,2); rule(s,1123,510,1123,314,C.green,2); dot(s,1123,314,C.green,4);
  connector(s,266,320,760,406,C.orange,2);
  connector(s,878,314,878,372,C.orange,2);
  text(s,'UNIQUE: sessionId + studentId',1001,328,228,30,13,C.green,{bold:true,align:'center'});
  text(s,'One student + one session = one unique attendance record',650,607,582,23,13,C.green,{bold:true,align:'right'});
  shape(s,650,534,270,60,'#111F32',{geometry:'roundRect',radius:10,line:{style:'solid',fill:C.blue,width:1.2}});
  text(s,'COURSE FACULTY',662,547,246,31,15,C.blue,{bold:true,align:'center'});
  text(s,'Illustrated core relationships',78,615,300,20,13,C.muted,{italic:true});
  note(s,'This is a simplified relationship map from the Prisma schema, not a full ERD. Student links to optional User, Division and Batch. Teacher links to optional User and department. TimetableEntry links course, teacher, division, optional batch and room. AttendanceSession links a timetable entry and teacher. AttendanceRecord links one student and one session, with a unique composite constraint on [sessionId, studentId]. Student division and batch determine eligibility for a timetable session; there is no direct Student-to-TimetableEntry relation. Attempts link separately to student and session. AuditLog links to actor User. CourseFaculty is included as the teaching assignment join model.');
}

// 9 — Product demonstration montage
{
  const s=base('AttendX — Real Application in Action',9);
  text(s,'Illustrative interface views based on the public source code',66,142,840,24,15,C.orange,{bold:true});
  // three connected device views + outcome
  miniUi(s,66,190,338,286,'ADMIN');
  miniUi(s,471,190,338,286,'TEACHER');
  // phone mockup
  shape(s,875,188,172,300,'#070C14',{geometry:'roundRect',radius:28,line:{style:'solid',fill:'#55708C',width:2},shadow:'shadow-lg'});
  shape(s,887,208,148,260,'#0E1B2C',{geometry:'roundRect',radius:18});
  shape(s,930,214,62,7,'#3A506A',{geometry:'roundRect',radius:5});
  text(s,'AX',908,245,106,30,22,C.cyan,{bold:true,align:'center'});
  text(s,'QR Scanner',905,286,112,24,15,C.white,{bold:true,align:'center'});
  shape(s,913,325,96,96,'#08111F',{geometry:'roundRect',radius:8,line:{style:'solid',fill:C.cyan,width:2}});
  qr(s,935,345,52,5,C.white,false);
  text(s,'Ready to scan',902,437,118,18,11,C.muted,{align:'center'});
  // attendance data view
  shape(s,1073,190,141,298,'#101D30',{geometry:'roundRect',radius:12,line:{style:'solid',fill:'#29415F',width:1}});
  text(s,'ATTENDANCE',1086,207,116,19,11,C.cyan,{bold:true});
  text(s,'SESSION',1086,239,116,17,10,C.muted,{bold:true});
  text(s,'Innovation',1086,258,116,21,14,C.white,{bold:true});
  rule(s,1086,291,1200,291,C.line,1);
  text(s,'STATUS',1086,305,116,16,10,C.muted,{bold:true});
  pill(s,'PRESENT',1086,329,100,C.green);
  text(s,'Verified record',1086,372,116,20,12,C.soft);
  text(s,'Attempts logged',1086,408,116,20,12,C.muted);
  // connectors workflow
  const flow=[['01','Admin setup'],['02','Teacher session'],['03','Student scan'],['04','Server verifies'],['05','Record saved']];
  flow.forEach((a,i)=>{const x=66+i*229; text(s,a[0],x,530,34,18,12,C.cyan,{bold:true}); text(s,a[1],x,553,206,22,15,C.white,{bold:true}); if(i<4)rule(s,x+134,540,x+210,540,C.line,2);});
  shape(s,66,601,1148,46,'#101D30',{geometry:'roundRect',radius:10,line:{style:'solid',fill:C.line,width:1}});
  text(s,'QR SCANNED  →  VERIFIED  →  PRESENT',88,607,1104,32,18,C.green,{bold:true,align:'center'});
  note(s,'The public landing screen is available, but the student, teacher and admin pages require sign-in. The views on this slide are explicitly illustrative mockups derived from route and source-code structure; they are not screenshots of a logged-in production session. The deployed site itself is available at https://attendx-flax.vercel.app/.');
}

// 10 — Testing, limitations, future scope
{
  const s=base('Current Capabilities and Future Scope',10);
  const cols=[{x:66,c:C.green,title:'IMPLEMENTED FLOWS',items:['Google sign-in + role checks','QR creation and browser scanning','Session, token and eligibility checks','Duplicate prevention + record storage']},
    {x:454,c:C.orange,title:'LIMITATIONS',items:['Online server and database needed','Student device needs a camera','QR screenshots may be shared','Reliable academic records are required']},
    {x:842,c:C.blue,title:'FUTURE SCOPE',items:['Native Android / iOS apps','PDF or Excel reports','Low-attendance notifications','Analytics and multi-institution support']}];
  cols.forEach(a=>{
    shape(s,a.x,168,372,438,'#101C2D',{geometry:'roundRect',radius:15,line:{style:'solid',fill:a.c,width:1}});
    shape(s,a.x,168,372,52,'#14243A',{geometry:'roundRect',radius:14}); shape(s,a.x,203,372,17,'#14243A');
    text(s,a.title,a.x+24,181,324,24,14,a.c,{bold:true});
    a.items.forEach((v,i)=>{const yy=250+i*78; dot(s,a.x+31,yy+15,a.c,4); text(s,v,a.x+48,yy,294,45,17,C.soft,{bold:i===0}); if(i<3)rule(s,a.x+24,yy+57,a.x+348,yy+57,C.line,1);});
  });
  text(s,'Current features come from the codebase; future items are proposals.',66,631,1148,24,14,C.muted,{align:'center'});
  note(s,'“Implemented flows” reflects code paths and current deployment routes; it does not claim a formal test suite or measured performance results. Current limitations are project constraints: attendance validation is server-side and therefore online; students need a camera-capable scanning device; screenshot sharing remains possible despite token expiry and server validation; accurate roster and timetable data are needed. The listed future items are proposed scope, not current features.');
}

// 11 — Conclusion
{
  const s=pres.slides.add(); s.background.fill='linear(0deg, #080F1D 0%, #10243A 55%, #080F1D 100%)';
  text(s,'ATTENDX',66,38,400,24,13,C.cyan,{bold:true});
  text(s,'A Smarter Way to\nManage Attendance',66,103,630,124,48,C.white,{bold:true});
  text(s,'Faster',66,285,238,42,27,C.cyan,{bold:true}); text(s,'Less manual attendance effort',66,328,258,44,16,C.soft);
  text(s,'Organised',365,285,238,42,27,C.blue,{bold:true}); text(s,'Centralised digital records',365,328,258,44,16,C.soft);
  text(s,'Accessible',664,285,238,42,27,C.green,{bold:true}); text(s,'Web access across devices',664,328,258,44,16,C.soft);
  // final workflow visual
  const nodes=[['TEACHER',82],['QR SESSION',304],['STUDENT',526],['SERVER',748],['DATABASE',970]];
  nodes.forEach((n,i)=>{
    shape(s,n[1],438,174,84,'#111F32',{geometry:'roundRect',radius:14,line:{style:'solid',fill:[C.blue,C.cyan,C.cyan,C.green,C.green][i],width:1.4}});
    text(s,n[0],n[1]+9,451,156,58,15,C.white,{bold:true,align:'center'});
    if(i<4){rule(s,n[1]+178,480,n[1]+212,480,C.cyan,2);shape(s,n[1]+207,474,12,12,C.cyan,{geometry:'chevron'});}
  });
  text(s,'AttendX transforms classroom attendance into a faster, organised digital process.',66,556,1148,30,18,C.soft,{align:'center'});
  text(s,'THANK YOU',66,617,440,38,27,C.white,{bold:true});
  text(s,'Questions & Discussion',66,658,400,24,15,C.muted);
  text(s,'JSPM UNIVERSITY PUNE',927,644,286,22,14,C.cyan,{bold:true,align:'right'});
  note(s,'Close by restating the outcome without claiming measured time savings: AttendX replaces the manual attendance capture step with QR submission, server-side verification and a central digital record. Invite questions and discussion.');
}

// Speaker notes citation and content are included above. Render review PNGs and a draft PPTX.
for (const [i, slide] of pres.slides.items.entries()) {
  const png = await pres.export({ slide, format:'png', scale:1 });
  await fs.writeFile(path.join(TMP, `slide-${String(i+1).padStart(2,'0')}.png`), new Uint8Array(await png.arrayBuffer()));
}
const pptx = await PresentationFile.exportPptx(pres);
await pptx.save(path.join(TMP,'AttendX-draft.pptx'));
console.log(`Rendered ${pres.slides.items.length} slides to ${TMP}`);
