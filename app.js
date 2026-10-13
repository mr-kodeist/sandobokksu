'use strict';
/* ZOTAC AI NAS — clickable mockup.
   One shared data model drives three device frames (Android phone, iPhone, tablet).
   Each frame keeps its own navigation state and renders platform-specific chrome. */

/* ---------------- Icons ---------------- */
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h5v-6h4v6h5V9.5"/>',
  spark: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  agent: '<rect x="4" y="7" width="16" height="12" rx="3"/><path d="M12 3v4"/><circle cx="9" cy="13" r="1.2"/><circle cx="15" cy="13" r="1.2"/>',
  disk: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  more: '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.7-3.6 3.3-5.5 6.5-5.5s5.8 1.9 6.5 5.5"/><path d="M15.5 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M18 14.9c1.9.7 3 2.4 3.5 5.1"/>',
  apps: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
  wifi: '<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.5a9.5 9.5 0 0 1 13 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><path d="M12 19.5h.01"/>',
  signal: '<path d="M5 19v-3M10 19v-6M15 19v-9M20 19V6"/>',
  settings: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  tag: '<path d="M3 12V4h8l9.5 9.5-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
  doc: '<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3v5h5M8.5 13h7M8.5 17h5"/>',
  chevR: '<path d="m9 5 7 7-7 7"/>',
  chevL: '<path d="m15 5-7 7 7 7"/>',
  arrowL: '<path d="M20 12H4M10 6l-6 6 6 6"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  alert: '<path d="M12 3.5 2.5 20h19z"/><path d="M12 10v4.5M12 17.5h.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',
  mem: '<rect x="3" y="7" width="18" height="10" rx="1.5"/><path d="M7 10.5v3M11 10.5v3M15 10.5v3M6 17v3M18 17v3"/>',
  temp: '<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z"/><path d="M12 11v5"/>',
  net: '<path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3"/>',
  send: '<path d="M4 12 20 4l-6 16-3-7z"/><path d="m11 13 9-9"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="m16 10.5 5-3v9l-5-3z"/>',
  folder: '<path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4.5l2 2.5H19a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19.5H5A1.5 1.5 0 0 1 3.5 18z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z"/>',
  cloud: '<path d="M7 18.5h10.5a4 4 0 0 0 .4-8A6 6 0 0 0 6.3 9.6 4.5 4.5 0 0 0 7 18.5z"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V6z"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1.1 1.3 1.1 2.2h5c0-.9.5-1.7 1.1-2.2A6 6 0 0 0 12 3z"/>',
  camera: '<path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="13" r="3.5"/>',
  tv: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8"/>',
  laptop: '<rect x="5" y="5" width="14" height="10" rx="1.5"/><path d="M2.5 19h19"/>',
  tablet: '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M11 18h2"/>',
  sensor: '<rect x="6" y="3" width="12" height="18" rx="3"/><circle cx="12" cy="9" r="2"/><path d="M10 16h4"/>',
  vacuum: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="9" r="2"/><path d="M7 15.5h10"/>',
  nas: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8.5 7h7M8.5 10.5h7M8.5 14h7"/><path d="M15 17.5h.01"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v4.5h-4.5"/>',
  locate: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"/><circle cx="12" cy="12" r="7"/>',
  share: '<path d="M12 15V3.5M7.5 8 12 3.5 16.5 8"/><path d="M5 12v7.5h14V12"/>',
  sheet: '<rect x="4" y="3.5" width="16" height="17" rx="2"/><path d="M4 9h16M4 14.5h16M10 3.5v17"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L11.5 6.8"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 20.5c1-4 4.2-6 8-6s7 2 8 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.5h.01"/>',
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const LOGO = '<img class="logo" src="assets/zotac-logo.png" alt="ZOTAC">';

/* ---------------- Shared sample data ---------------- */
const S = {
  theme: document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  promptDismissed: false,
  locating: false,
  nas: { host: 'zotac-nas.local', uptime: '23d 4h 12m', cpu: 18, memUsed: 9.2, memTotal: 32, temp: 46, ai: 34, net: 112, lastBoot: '20 Sep, 05:29' },
  pool: { name: 'Main pool', raid: 'RAID 5', used: 14.2, total: 21.8 },
  uptime30: [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,99.2,100,100,100,100,100,100,100],
  bays: [
    { id: 1, state: 'ok', cap: '8 TB', type: 'HDD · 7200 rpm', temp: 41, hours: '11,204 h', serial: 'ZN8A-01F3' },
    { id: 2, state: 'ok', cap: '8 TB', type: 'HDD · 7200 rpm', temp: 43, hours: '11,198 h', serial: 'ZN8A-07C1' },
    { id: 3, state: 'missing', cap: '8 TB', type: 'HDD · 7200 rpm', temp: null, hours: '11,190 h', serial: 'ZN8A-02B9', lastSeen: 'Today, 06:12' },
    { id: 4, state: 'ok', cap: '8 TB', type: 'HDD · 7200 rpm', temp: 42, hours: '3,402 h', serial: 'ZN8B-11D4' },
  ],
  volumes: [
    { name: 'Family Photos', used: 5.1, icon: 'image' },
    { name: 'Media', used: 6.4, icon: 'video' },
    { name: 'Documents', used: 0.9, icon: 'doc' },
    { name: 'Backups', used: 1.8, icon: 'refresh' },
  ],
  users: [
    { id: 'u1', name: 'Alex Chen', email: 'alex@home.lan', role: 'Owner', you: true, color: '#FFC20E', used: 3.4, quota: null, last: 'Active now',
      ai: { ask: true, drive: true, web: true, agents: true }, folders: { 'Family Photos': 'rw', Documents: 'rw', Media: 'rw', Backups: 'rw' } },
    { id: 'u2', name: 'Jordan Chen', email: 'jordan@home.lan', role: 'Admin', color: '#9FD4FF', used: 2.1, quota: 4, last: '2 h ago',
      ai: { ask: true, drive: true, web: true, agents: true }, folders: { 'Family Photos': 'rw', Documents: 'rw', Media: 'rw', Backups: 'r' } },
    { id: 'u3', name: 'Maya Chen', email: 'maya@home.lan', role: 'Child', color: '#FFB3C7', used: 0.6, quota: 1, last: 'Yesterday',
      ai: { ask: true, drive: false, web: false, agents: false }, folders: { 'Family Photos': 'r', Documents: 'none', Media: 'r', Backups: 'none' } },
    { id: 'u4', name: 'Sam Rivera', email: 'sam@guest', role: 'Guest', color: '#C5E8B7', used: 0.1, quota: 0.25, last: '5 days ago',
      ai: { ask: true, drive: false, web: true, agents: false }, folders: { 'Family Photos': 'none', Documents: 'none', Media: 'r', Backups: 'none' } },
  ],
  apps: [
    { id: 'gdrive', group: 'Google services', name: 'Google Drive', letter: 'D', color: '#1A73E8', on: true, desc: '18,420 files indexed for semantic search' },
    { id: 'gcal', group: 'Google services', name: 'Google Calendar', letter: 'C', color: '#1E8E3E', on: true, desc: 'Day Planner reads today’s events' },
    { id: 'gphotos', group: 'Google services', name: 'Google Photos', letter: 'P', color: '#E37400', on: true, desc: 'Backing up to /Family Photos' },
    { id: 'gmail', group: 'Google services', name: 'Gmail', letter: 'M', color: '#C5221F', on: false, desc: 'Find attachments, receipts and bookings' },
    { id: 'web', group: 'Search', name: 'Web search', letter: 'W', color: '#4A4A4F', on: true, desc: 'Ask can add live web results' },
    { id: 'matter', group: 'Smart home', name: 'Matter / Thread hub', letter: 'H', color: '#141414', on: true, desc: '9 devices linked on your network' },
    { id: 'onedrive', group: 'Other cloud storage', name: 'OneDrive', letter: 'O', color: '#0A64C2', on: false, desc: 'Index files for semantic search' },
    { id: 'dropbox', group: 'Other cloud storage', name: 'Dropbox', letter: 'B', color: '#0061FE', on: false, desc: 'Index files for semantic search' },
  ],
  devices: [
    { id: 'd1', room: 'Network', name: 'ZOTAC AI NAS', icon: 'nas', status: 'Online · up 23 days', state: 'ok' },
    { id: 'd2', room: 'Network', name: 'Alex’s laptop', icon: 'laptop', status: 'Online · backing up (62%)', state: 'ok' },
    { id: 'd3', room: 'Network', name: 'Maya’s tablet', icon: 'tablet', status: 'Offline · last seen 3 h ago', state: 'off' },
    { id: 'd4', room: 'Living room', name: 'Ceiling lights', icon: 'bulb', status: '3 bulbs · 70%', state: 'ok', ctrl: true, on: true },
    { id: 'd5', room: 'Living room', name: 'Smart TV', icon: 'tv', status: 'Standby', state: 'ok', ctrl: true, on: false },
    { id: 'd6', room: 'Living room', name: 'Thermostat', icon: 'temp', status: '21.5 °C · heating to 22 °C', state: 'ok' },
    { id: 'd7', room: 'Entrance', name: 'Front door camera', icon: 'camera', status: 'Recording to NAS', state: 'ok' },
    { id: 'd8', room: 'Garage', name: 'Garage door sensor', icon: 'sensor', status: 'Battery 8% · replace soon', state: 'warn' },
    { id: 'd9', room: 'Kitchen', name: 'Robot vacuum', icon: 'vacuum', status: 'Docked · 100%', state: 'ok', ctrl: true, on: false },
  ],
  files: [
    { id: 'f1', name: 'Lisbon trip 2025', type: 'album', src: 'nas', path: '/Family Photos/2025', meta: '214 photos', tags: ['travel','portugal','beach','summer','family','lisbon','vacation','holiday','trip','photo','photos'], snip: 'Album · sunsets, tram rides and beach days' },
    { id: 'f2', name: 'IMG_4821.HEIC', type: 'image', src: 'nas', path: '/Family Photos/2025/Lisbon', meta: 'Photo · 4.1 MB', tags: ['beach','sunset','sea','ocean','photo','photos','summer','picture'], snip: 'Sunset over the beach, two people, golden hour' },
    { id: 'f3', name: 'Home_Insurance_Policy_2026.pdf', type: 'pdf', src: 'nas', path: '/Documents/House', meta: 'PDF · 18 pages', tags: ['insurance','home','policy','renewal','house','contract','cover'], snip: 'Renews 18 Oct 2026 · buildings & contents cover' },
    { id: 'f4', name: 'Insurance_Quotes.xlsx', type: 'sheet', src: 'drive', path: 'Drive › Household', meta: 'Sheet', tags: ['insurance','quote','quotes','compare','price','home'], snip: 'Three home insurance quotes side by side' },
    { id: 'f5', name: 'Tax_Return_2025.pdf', type: 'pdf', src: 'drive', path: 'Drive › Finance', meta: 'PDF · 9 pages', tags: ['tax','finance','money','return','2025'], snip: 'Filed 28 Mar 2026' },
    { id: 'f6', name: 'Kitchen_Renovation_Quote.pdf', type: 'pdf', src: 'drive', path: 'Drive › House', meta: 'PDF · 4 pages', tags: ['kitchen','renovation','quote','house','budget','home'], snip: 'Estimate incl. cabinets and installation' },
    { id: 'f7', name: 'Maya_Birthday_Party.mp4', type: 'video', src: 'nas', path: '/Media/Videos', meta: 'Video · 12:48', tags: ['birthday','party','kids','video','maya','family','cake'], snip: 'Cake, candles and the bouncy castle' },
    { id: 'f8', name: 'Bailey_Vet_Records.pdf', type: 'pdf', src: 'nas', path: '/Documents/Pets', meta: 'PDF · 6 pages', tags: ['dog','pet','vet','vaccination','bailey','health','booster'], snip: 'Next booster due 13 Oct 2026' },
    { id: 'f9', name: 'Household_Budget_Q3.xlsx', type: 'sheet', src: 'drive', path: 'Drive › Finance', meta: 'Sheet', tags: ['budget','money','finance','expenses','spending'], snip: 'Spending by category, Jul–Sep' },
    { id: 'f10', name: 'Car_Service_History.pdf', type: 'pdf', src: 'nas', path: '/Documents/Car', meta: 'PDF · 3 pages', tags: ['car','service','maintenance','vehicle'], snip: 'Last service 2 Jun 2026 · 48,200 km' },
    { id: 'f11', name: 'Wedding_Speech_Draft.docx', type: 'doc', src: 'drive', path: 'Drive › Writing', meta: 'Doc', tags: ['wedding','speech','draft','writing'], snip: 'Draft v3 for Sam & Priya' },
    { id: 'f12', name: 'Jordan — private journal', type: 'folder', src: 'nas', path: '/Users/Jordan', meta: 'Folder', tags: ['journal','private','notes','travel','trip'], snip: '', restricted: true },
    { id: 'f13', name: 'Router_Manual.pdf', type: 'pdf', src: 'nas', path: '/Documents/Manuals', meta: 'PDF · 40 pages', tags: ['router','network','wifi','manual','setup'], snip: 'Port forwarding and Wi-Fi setup' },
    { id: 'f14', name: 'Summer holiday clips', type: 'folder', src: 'nas', path: '/Media/Videos', meta: '38 clips', tags: ['summer','holiday','vacation','beach','video','trip','travel'], snip: 'Grouped automatically by Media Tagger' },
  ],
  tagger: {
    done: 3212, total: 3880, auto: true,
    items: [
      { id: 't1', name: 'IMG_5102', grad: '135deg,#F7B267,#F4845F', icon: 'image', tags: [['beach', 1], ['sunset', 0], ['Maya', 0]] },
      { id: 't2', name: 'IMG_5110', grad: '135deg,#5DA9E9,#2B59C3', icon: 'image', tags: [['pool', 0], ['summer', 1], ['family', 0]] },
      { id: 't3', name: 'VID_0921', grad: '135deg,#A06CD5,#6247AA', icon: 'video', tags: [['birthday', 0], ['cake', 0]] },
      { id: 't4', name: 'IMG_5133', grad: '135deg,#7BC47F,#2E8B57', icon: 'image', tags: [['hiking', 0], ['Bailey', 1], ['forest', 0]] },
      { id: 't5', name: 'Scan_0012', grad: '135deg,#B0B0AA,#6E6E69', icon: 'doc', tags: [['receipt', 0], ['kitchen', 0]] },
      { id: 't6', name: 'IMG_5140', grad: '135deg,#FFD166,#EF8354', icon: 'image', tags: [['Lisbon', 1], ['tram', 0]] },
    ],
  },
  plan: [
    { time: '07:30', title: 'Gym', src: 'Google Calendar', icon: 'calendar' },
    { time: '09:00', title: 'Team stand-up', src: 'Google Calendar', icon: 'calendar' },
    { time: '11:00', title: 'Free focus block', src: 'Suggested by Day Planner', icon: 'spark', free: true },
    { time: '12:30', title: 'Lunch with Sam', src: 'Google Calendar', icon: 'calendar' },
    { time: '15:15', title: 'School pick-up', src: 'Google Calendar', icon: 'calendar' },
    { time: '17:30', title: 'Bailey’s booster at the vet', src: 'Found in Bailey_Vet_Records.pdf', icon: 'doc', hl: true },
    { time: '20:00', title: 'Nightly NAS backup', src: 'NAS schedule', icon: 'disk' },
  ],
  activity: [
    { icon: 'alert', cls: 'bad', t: 'Disk in bay 3 disconnected', s: 'Today, 06:12 · pool degraded' },
    { icon: 'tag', cls: 'accent', t: 'Media Tagger tagged 214 photos', s: '25 min ago' },
    { icon: 'cloud', cls: '', t: 'Google Drive: 32 new files indexed', s: '1 h ago' },
    { icon: 'refresh', cls: 'ok', t: 'Alex’s laptop backup completed', s: 'Yesterday, 23:40' },
  ],
};
const app = id => S.apps.find(a => a.id === id);
const userById = id => S.users.find(u => u.id === id);
const TYPE_ICON = { pdf: 'doc', doc: 'doc', sheet: 'sheet', image: 'image', album: 'image', video: 'video', folder: 'folder', web: 'globe' };
const SRC_LABEL = { nas: 'My NAS', drive: 'Google Drive', web: 'Web' };
const TEMPLATES = [
  { id: 'summary', label: 'Summary' },
  { id: 'compare', label: 'Comparison' },
  { id: 'report', label: 'Report' },
  { id: 'letter', label: 'Letter' },
];

/* ---------------- Per-device state ---------------- */
const DEVS = [
  { id: 'android', platform: 'android', form: 'phone' },
  { id: 'ios', platform: 'ios', form: 'phone' },
  { id: 'tablet', platform: 'ios', form: 'tablet' },
].map(d => Object.assign(d, {
  tab: 'home', route: 'home', history: [], chat: [], mode: 'ask', draft: '',
  scopes: { nas: true, drive: true, web: true }, results: null, lastQuery: '',
  sheet: null, toast: null, stick: false,
  doc: { sel: new Set(['f3', 'f4']), tpl: 'compare', out: null },
}));
const devById = id => DEVS.find(d => d.id === id);

/* ---------------- Semantic search (mock) ---------------- */
const SYN = {
  photo: ['image', 'album', 'picture'], photos: ['image', 'album', 'picture'], pictures: ['photo'], pics: ['photo'],
  holiday: ['vacation', 'trip', 'travel'], vacation: ['holiday', 'trip', 'travel'], trip: ['travel', 'vacation'],
  sea: ['beach', 'ocean'], ocean: ['beach', 'sea'], dog: ['pet', 'vet', 'bailey'], money: ['finance', 'budget', 'tax'],
  insurance: ['policy', 'quote'], car: ['vehicle', 'service'], house: ['home'], wifi: ['router', 'network'],
};
function semanticSearch(q, scopes) {
  const toks = q.toLowerCase().split(/[^a-z0-9]+/).filter(t => t.length > 2);
  const expanded = new Set(toks);
  toks.forEach(t => (SYN[t] || []).forEach(s => expanded.add(s)));
  const allowed = f => (f.src === 'nas' && scopes.nas) || (f.src === 'drive' && scopes.drive && app('gdrive').on);
  let hidden = 0;
  const scored = [];
  for (const f of S.files) {
    if (!allowed(f)) continue;
    let s = 0;
    expanded.forEach(t => {
      const direct = toks.includes(t) ? 1 : 0.6;
      if (f.tags.includes(t)) s += 2 * direct;
      if (f.name.toLowerCase().includes(t)) s += 1.5 * direct;
      if (f.snip.toLowerCase().includes(t)) s += 1 * direct;
    });
    if (s <= 0) continue;
    if (f.restricted) { hidden++; continue; }
    scored.push({ f, s });
  }
  scored.sort((a, b) => b.s - a.s);
  const top = scored.length ? scored[0].s : 1;
  const out = scored.slice(0, 6).map(({ f, s }) => ({ ...f, score: Math.round(70 + 28 * (s / top)) }));
  if (scopes.web && app('web').on && q.trim()) {
    out.push({ id: 'w1', type: 'web', src: 'web', name: `Web summary: “${q.trim()}”`, path: 'Live web result', snip: 'Summary of the top web pages, with citations', score: null });
  }
  return { items: out, hidden };
}

/* ---------------- Scripted assistant ---------------- */
function aiReply(text, d) {
  const t = text.toLowerCase();
  const sources = () => {
    const s = [];
    if (d.scopes.nas) s.push('My NAS');
    if (d.scopes.drive && app('gdrive').on) s.push('Google Drive');
    if (d.scopes.web && app('web').on) s.push('Web');
    return s;
  };
  if (/plan|my day|schedule|today|agenda|calendar/.test(t)) {
    return { text: `Here’s your day. You have 5 events, and I found a vet booster for Bailey due today in your files, so I added it at 17:30.`,
      card: 'plan', src: ['Google Calendar', 'My NAS'] };
  }
  if (/tag|label|organi[sz]e|sort my/.test(t)) {
    return { text: `Media Tagger has tagged ${S.tagger.done.toLocaleString()} of ${S.tagger.total.toLocaleString()} items. ${S.tagger.items.length} recent uploads have tag suggestions waiting for you.`,
      card: 'tagger', src: ['My NAS'] };
  }
  if (/doc|report|generate|summar|draft|write|letter|compar/.test(t)) {
    return { text: `I can put that together from your files. For example, the home insurance policy plus your saved quotes would make a renewal comparison.`,
      card: 'docs', src: ['My NAS', 'Google Drive'] };
  }
  if (/device|smart|light|camera|thermostat|tv|network|status|online/.test(t)) {
    const warn = S.devices.filter(x => x.state !== 'ok').length;
    return { text: `${S.devices.length} devices are on your network. ${warn} need attention: the garage door sensor battery is at 8%, and Maya’s tablet has been offline for 3 hours.`,
      card: 'devices', src: ['Matter / Thread hub', 'Network scan'] };
  }
  if (/disk|bay|drive health|raid|storage|space|uptime/.test(t)) {
    return { text: `The NAS has been up for ${S.nas.uptime}. The disk in bay 3 disconnected at 06:12, so the RAID 5 pool is degraded. Your data is intact, but there’s no redundancy until the disk is reseated or replaced. ${S.pool.used} of ${S.pool.total} TB used.`,
      card: 'storage', src: ['NAS health'] };
  }
  const r = semanticSearch(text, d.scopes);
  const n = r.items.filter(i => i.src !== 'web').length;
  return {
    text: n ? `I found ${n} file${n > 1 ? 's' : ''} that match what you mean${r.hidden ? `. ${r.hidden} more ${r.hidden > 1 ? 'are' : 'is'} hidden because you don’t have access` : ''}.`
            : `I couldn’t find anything in your files that matches. Try different words, or turn on more sources.`,
    card: 'results', results: r.items.slice(0, 4), src: sources(),
  };
}

/* ---------------- Small UI helpers ---------------- */
const sw = (on, a, label = '') => `<button class="sw ${on ? 'on' : ''}" role="switch" aria-checked="${on}" aria-label="${esc(label)}" data-a="${a}"><span></span></button>`;
const meter = (pct, cls = '') => `<div class="meter ${cls}"><span style="width:${Math.max(0, Math.min(100, pct))}%"></span></div>`;
const initials = n => n.split(/\s+/).map(p => p[0]).join('').slice(0, 2);
const avatar = (u, cls = '') => `<span class="avatar ${cls}" style="background:${u.color}">${esc(initials(u.name))}</span>`;
const sh = (title, link = '', a = '') => `<div class="sh"><h3>${title}</h3>${link ? `<button class="link" data-a="${a}">${link}</button>` : ''}</div>`;
const ftile = type => `<span class="ftile ft-${type}">${ic(TYPE_ICON[type] || 'doc')}</span>`;
function li({ icon, tile = '', title, sub = '', trail = '', a = '', chev = false, subWrap = false, raw = '' }) {
  const tag = a ? 'button' : 'div';
  const lead = raw || (icon ? `<span class="tile ${tile}">${ic(icon)}</span>` : '');
  return `<${tag} class="li ${lead ? '' : 'noicon'}" ${a ? `data-a="${a}"` : ''}>${lead}<div class="body"><div class="t">${title}</div>${sub ? `<div class="s ${subWrap ? 'wrap-text' : ''}">${sub}</div>` : ''}</div>${trail}${chev ? ic('chevR', 'sm chev') : ''}</${tag}>`;
}
const list = rows => `<div class="list">${rows.join('')}</div>`;
const poolPill = () => S.pool.rebuilding ? '<span class="pill accent">Rebuilding · 3%</span>' : '<span class="pill ok">Healthy</span>';
const statePill = s => s === 'ok' ? '<span class="pill ok"><span class="dot"></span>Online</span>'
  : s === 'warn' ? '<span class="pill warn">Attention</span>' : '<span class="pill neutral">Offline</span>';

/* ---------------- Routes ---------------- */
function title(route) {
  const [k, arg] = route.split(':');
  return ({
    home: 'Home', ask: 'Ask', agents: 'Agents', storage: 'Storage', more: 'More', users: 'Users & access',
    apps: 'Connected apps', devices: 'Devices', settings: 'Settings', planner: 'Plan my day',
    tagger: 'Media Tagger', docs: 'Doc Generator',
  })[k] || (k === 'user' ? userById(arg).name : k);
}

const VIEWS = {
  home(d) {
    const missing = S.bays.filter(b => b.state === 'missing');
    const usedPct = S.pool.used / S.pool.total * 100;
    const isIOS = d.platform === 'ios';
    const prompt = S.promptDismissed ? '' : `
      <div class="card accent prompt-card">
        <span class="tile">${ic('wifi')}</span>
        <div class="body">
          <h4>Want to see the status of your devices?</h4>
          <p class="muted">${S.devices.length} devices on your network. 2 need attention.</p>
          <div class="actions">
            <button class="btn dark sm" data-a="go:devices">Show devices</button>
            <button class="btn ghost sm" data-a="dismiss-prompt">Not now</button>
          </div>
        </div>
      </div>`;
    const stats = `
      <div class="stats">
        <button class="stat" data-a="tab:storage"><span class="lbl">${ic('clock')}Uptime</span><span class="val">${S.nas.uptime.split(' ').slice(0, 2).join(' ')}</span></button>
        <div class="stat"><span class="lbl">${ic('cpu')}CPU</span><span class="val">${S.nas.cpu}<small>%</small></span>${meter(S.nas.cpu, 'thin')}</div>
        <div class="stat"><span class="lbl">${ic('mem')}Memory</span><span class="val">${S.nas.memUsed}<small> / ${S.nas.memTotal} GB</small></span>${meter(S.nas.memUsed / S.nas.memTotal * 100, 'thin')}</div>
        <div class="stat"><span class="lbl">${ic('spark')}AI engine</span><span class="val">${S.nas.ai}<small>% load</small></span>${meter(S.nas.ai, 'thin')}</div>
        <div class="stat"><span class="lbl">${ic('temp')}Temperature</span><span class="val">${S.nas.temp}<small> °C</small></span></div>
        <div class="stat"><span class="lbl">${ic('net')}Network</span><span class="val">${S.nas.net}<small> Mb/s</small></span></div>
      </div>`;
    const storage = `
      <button class="card" style="display:block;width:100%;text-align:left" data-a="tab:storage">
        <div class="row-flex"><div class="spacer"><h4>Disk bays</h4><div class="muted tiny">${S.pool.name} · ${S.pool.raid}</div></div>
          ${missing.length ? '<span class="pill bad">Degraded</span>' : poolPill()}</div>
        <div class="bay-strip">${S.bays.map(b => `<div class="bay-mini ${b.state}"><span class="dot"></span>Bay ${b.id}</div>`).join('')}</div>
        ${meter(usedPct)}
        <div class="row-flex tiny muted" style="margin-top:6px"><span class="spacer">${S.pool.used} TB of ${S.pool.total} TB used</span>${missing.length ? `<span style="color:var(--bad);font-weight:600">Bay ${missing[0].id} disconnected</span>` : ''}</div>
      </button>`;
    const agents = `
      ${sh('Agents', 'See all', 'tab:agents')}
      <div class="agent-row">
        ${[['planner', 'calendar', 'Plan my day', '5 events, 1 found in files'], ['tagger', 'tag', 'Tag media', `${S.tagger.total - S.tagger.done} items left`],
           ['docs', 'doc', 'Generate a doc', 'From any files you choose'], ['devices', 'wifi', 'Device status', `${S.devices.length} devices · 2 alerts`]]
          .map(([r, i, t, s]) => `<button class="agent-q" data-a="go:${r}"><span class="tile accent">${ic(i)}</span><div><div class="t">${t}</div><div class="s">${s}</div></div></button>`).join('')}
      </div>`;
    const activity = `${sh('Recent activity')}${list(S.activity.map(x => li({ icon: x.icon, tile: x.cls, title: x.t, sub: x.s })))}`;
    const greet = isIOS ? '' : `<div class="greet"><div class="muted">Tuesday, 13 October</div><h2>Good morning, Alex</h2></div>`;
    const status = `<div class="status-line"><span class="pill ok"><span class="dot"></span>NAS online</span><span class="muted tiny">${S.nas.host} · local network</span></div>`;
    const ask = `<button class="askbar" data-a="tab:ask">${ic('spark', 'spark')}<span class="grow">Ask or search your files…</span><span class="mic">${ic('mic', 'sm')}</span></button>`;
    return {
      home: true,
      body: `${greet}${status}<div class="home-grid"><div>${ask}${prompt}${stats}${d.form === 'tablet' ? activity : ''}</div><div>${storage}${agents}${d.form === 'tablet' ? '' : activity}</div></div>`,
      fab: d.platform === 'android' && d.form === 'phone',
    };
  },

  ask(d) {
    const scopeChip = (k, label, icon, enabled) =>
      `<button class="chip ${d.scopes[k] && enabled ? 'on' : ''} ${enabled ? '' : 'off'}" data-a="${enabled ? 'scope:' + k : 'go:apps'}">${ic(icon)}${label}</button>`;
    const top = `
      <div class="ask-top">
        <div class="segc"><button class="${d.mode === 'ask' ? 'on' : ''}" data-a="mode:ask">Ask</button><button class="${d.mode === 'search' ? 'on' : ''}" data-a="mode:search">Semantic search</button></div>
        <div class="chips">${scopeChip('nas', 'My NAS', 'nas', true)}${scopeChip('drive', 'Google Drive', 'cloud', app('gdrive').on)}${scopeChip('web', 'Web', 'globe', app('web').on)}</div>
      </div>`;
    let body;
    if (d.mode === 'ask') {
      body = d.chat.length ? `<div class="msgs">${d.chat.map(m => renderMsg(m, d)).join('')}</div>` : `
        <div class="welcome"><div class="orb">${ic('spark')}</div><h3>Ask your NAS anything</h3>
          <p class="muted">Answers come from files and media you have access to, plus any apps you’ve connected.</p></div>
        <div class="sugg">
          ${['Plan my day', 'Find beach photos from last summer', 'Summarise my home insurance policy', 'How are my devices doing?', 'Is my storage healthy?', 'Tag my new photos']
            .map(s => `<button data-a="suggest" data-q="${esc(s)}">${ic('spark', 'sm')}${s}</button>`).join('')}
        </div>`;
    } else {
      body = d.results ? renderResults(d) : `
        <div class="welcome"><div class="orb">${ic('search')}</div><h3>Search by meaning</h3>
          <p class="muted">Describe what you’re looking for. You don’t need exact file names.</p></div>
        <div class="sugg">${['beach photos from summer', 'insurance documents', 'videos of the kids', 'anything about the dog']
          .map(s => `<button data-a="suggest" data-q="${esc(s)}">${ic('search', 'sm')}${s}</button>`).join('')}</div>`;
    }
    const ph = d.mode === 'ask' ? 'Ask about your files, home or day…' : 'e.g. “receipts for the kitchen”';
    return {
      body: top + body,
      composer: `<div class="composer"><div class="cbox"><input data-input="ask" placeholder="${ph}" value="${esc(d.draft)}" aria-label="Message"><button class="send" data-a="send" aria-label="Send">${ic('send')}</button></div></div>`,
    };
  },

  agents(d) {
    const pct = S.tagger.done / S.tagger.total * 100;
    const cards = [
      ['planner', 'calendar', 'Day Planner', 'Builds your day from Google Calendar, reminders and dates it finds in your files.', '<span class="pill ok">Ready · 7 items today</span>'],
      ['tagger', 'tag', 'Media Tagger', `Recognises people, places and objects, then tags photos, videos and scans.`, `<div style="margin-top:4px">${meter(pct)}<div class="tiny muted" style="margin-top:4px">${S.tagger.done.toLocaleString()} / ${S.tagger.total.toLocaleString()} tagged · running</div></div>`],
      ['docs', 'doc', 'Doc Generator', 'Turns the files you choose into summaries, comparisons, reports or letters.', '<span class="pill neutral">Idle</span>'],
      ['devices', 'wifi', 'Device Monitor', 'Watches devices on your network and smart home, and tells you when something needs attention.', '<span class="pill warn">2 need attention</span>'],
    ].map(([r, i, t, s, st]) => `<button class="card agent-card" data-a="go:${r}"><span class="tile accent">${ic(i)}</span><div class="body"><h4>${t}</h4><p class="muted tiny" style="margin-bottom:8px">${s}</p>${st}</div>${ic('chevR', 'sm chev')}</button>`);
    return {
      body: `<p class="muted" style="margin:0 4px 14px">Agents run on your NAS and only use the files and apps you allow.</p>
        <div class="agents-grid">${cards.join('')}</div>
        ${sh('Automations')}
        ${list([
          li({ icon: 'sun', title: 'Morning brief at 07:00', sub: 'Day plan + device status', trail: sw(true, 'noop', 'Morning brief') }),
          li({ icon: 'tag', title: 'Auto-tag new uploads', sub: 'Media Tagger', trail: sw(S.tagger.auto, 'tagger-auto', 'Auto-tag') }),
          li({ icon: 'doc', title: 'Weekly storage report', sub: 'Sundays · saved to /Documents', trail: sw(false, 'noop', 'Weekly report') }),
        ])}`,
    };
  },

  planner() {
    return {
      body: `
        <div class="card accent"><div class="row-flex"><span class="spacer"><h4>Tuesday, 13 October</h4><p class="muted tiny">5 events · 1 free block · 1 item found in your files</p></span>${ic('calendar')}</div></div>
        <div class="timeline">${S.plan.map(p => `
          <div class="tl"><div class="time">${p.time}</div>
            <div class="ev ${p.hl ? 'hl' : ''} ${p.free ? 'free' : ''}"><div class="t">${p.title}</div><div class="s">${ic(p.icon, 'xs')}${p.src}</div></div></div>`).join('')}
        </div>
        ${sh('Suggestions')}
        <div class="card"><div class="row-flex" style="align-items:flex-start"><span class="tile accent">${ic('doc')}</span>
          <div class="spacer"><h4>Home insurance renews on 18 Oct</h4><p class="muted tiny">Want a comparison of your current policy against the 3 quotes in Google Drive?</p>
          <div style="margin-top:10px"><button class="btn sm" data-a="go:docs">Draft comparison</button></div></div></div></div>
        <div class="card"><div class="row-flex" style="align-items:flex-start"><span class="tile bad">${ic('disk')}</span>
          <div class="spacer"><h4>Disk in bay 3 is disconnected</h4><p class="muted tiny">Add “Reseat NAS disk” to your 11:00 free block?</p>
          <div style="margin-top:10px"><button class="btn sm tonal" data-a="toast:Added to 11:00 · Reseat NAS disk">Add to plan</button></div></div></div></div>`,
      actions: `<button class="icon-btn" data-a="toast:Plan refreshed" aria-label="Refresh">${ic('refresh')}</button>`,
    };
  },

  tagger() {
    const pending = S.tagger.items.reduce((n, it) => n + it.tags.filter(t => !t[1]).length, 0);
    return {
      body: `
        <div class="card"><div class="row-flex"><span class="spacer"><h4>${S.tagger.done.toLocaleString()} of ${S.tagger.total.toLocaleString()} tagged</h4><p class="muted tiny">Photos, videos and scanned documents</p></span><span class="pill accent">Running</span></div>
          <div style="margin-top:12px">${meter(S.tagger.done / S.tagger.total * 100)}</div></div>
        ${list([li({ icon: 'tag', title: 'Auto-tag new uploads', sub: 'Also tags Google Photos backups', trail: sw(S.tagger.auto, 'tagger-auto', 'Auto-tag') })])}
        ${sh(`Review suggestions${pending ? ` · ${pending}` : ''}`, pending ? 'Accept all' : '', 'tags-accept-all')}
        <p class="muted tiny" style="margin:-4px 4px 10px">Tap a dashed tag to accept it.</p>
        <div class="thumbs">${S.tagger.items.map(it => `
          <div class="thumb"><div class="img" style="background:linear-gradient(${it.grad})">${ic(it.icon)}</div>
            <div class="tags"><span class="tiny muted" style="width:100%">${it.name}</span>${it.tags.map((t, i) => `<button class="tagc ${t[1] ? 'ok' : ''}" data-a="tag:${it.id}:${i}">${t[1] ? '✓ ' : '+ '}${esc(t[0])}</button>`).join('')}</div></div>`).join('')}
        </div>`,
    };
  },

  docs(d) {
    const docsFiles = S.files.filter(f => !f.restricted && ['pdf', 'sheet', 'doc'].includes(f.type));
    const out = d.doc.out;
    return {
      body: `
        ${sh('1 · Choose files')}
        ${list(docsFiles.map(f => li({ raw: `<span class="check ${d.doc.sel.has(f.id) ? 'on' : ''}">${d.doc.sel.has(f.id) ? ic('check') : ''}</span>`,
          title: esc(f.name), sub: `${SRC_LABEL[f.src]} · ${esc(f.path)}`, a: `doc-sel:${f.id}` })))}
        ${sh('2 · Choose a format')}
        <div class="chips wrap">${TEMPLATES.map(t => `<button class="chip ${d.doc.tpl === t.id ? 'on' : ''}" data-a="doc-tpl:${t.id}">${t.label}</button>`).join('')}</div>
        <div style="margin:18px 0 6px"><button class="btn block" data-a="doc-gen" ${d.doc.sel.size ? '' : 'disabled style="opacity:.5"'}>${ic('spark', 'sm')}Generate from ${d.doc.sel.size} file${d.doc.sel.size === 1 ? '' : 's'}</button></div>
        ${out ? `${sh('Result')}
          <div class="card outline">
            <div class="docpage"><h5>${esc(out.title)}</h5><div class="meta">Generated ${out.when} · ${out.files.length} source file${out.files.length > 1 ? 's' : ''}</div>
              <p><b>Overview.</b> ${esc(out.intro)}</p>
              <ul>${out.files.map(f => `<li><b>${esc(f.name)}:</b> ${esc(f.snip || f.meta)}</li>`).join('')}</ul>
              <div class="ln" style="width:94%"></div><div class="ln" style="width:88%"></div><div class="ln" style="width:60%"></div>
            </div>
            <div class="row-flex" style="margin-top:12px"><span class="tiny muted spacer">Saved to /Documents/AI Generated/${esc(out.file)}</span></div>
            <div class="row-flex" style="margin-top:10px"><button class="btn sm" data-a="toast:Opened in editor">Open</button><button class="btn sm tonal" data-a="toast:Share link copied">${ic('share', 'xs')}Share</button></div>
          </div>` : ''}`,
    };
  },

  devices() {
    const rooms = [...new Set(S.devices.map(x => x.room))];
    const alerts = S.devices.filter(x => x.state !== 'ok');
    return {
      body: `
        <div class="card ${alerts.length ? '' : 'outline'}"><div class="row-flex"><span class="tile warn">${ic('alert')}</span>
          <div class="spacer"><h4>${alerts.length} need attention</h4><p class="muted tiny">${alerts.map(a => a.name).join(' · ')}</p></div></div></div>
        ${rooms.map(r => `${sh(r)}${list(S.devices.filter(x => x.room === r).map(x =>
          li({ icon: x.icon, tile: x.state === 'warn' ? 'warn' : x.state === 'off' ? '' : (x.ctrl && x.on ? 'accent' : 'ok'), title: esc(x.name), sub: esc(x.ctrl ? (x.on ? 'On · ' : 'Off · ') + x.status : x.status),
            trail: x.ctrl ? sw(x.on, `dev:${x.id}`, x.name) : statePill(x.state) })))}`).join('')}`,
      actions: `<button class="icon-btn" data-a="toast:Scanning network…" aria-label="Rescan">${ic('refresh')}</button>`,
    };
  },

  storage(d) {
    const missing = S.bays.find(b => b.state === 'missing');
    const avail = (S.uptime30.reduce((a, b) => a + b, 0) / S.uptime30.length).toFixed(2);
    const left = `
      ${missing ? `<div class="card" style="background:var(--bad-soft)"><div class="row-flex" style="align-items:flex-start"><span class="tile bad">${ic('alert')}</span>
        <div class="spacer"><h4 style="color:var(--bad)">Disk disconnected from bay ${missing.id}</h4>
        <p class="tiny" style="color:var(--text-2)">Last seen ${missing.lastSeen}. Your data is safe, but the pool has no redundancy until you reseat or replace the disk.</p>
        <div class="row-flex wrap" style="margin-top:10px"><button class="btn sm danger" data-a="sheet:${missing.id}">View details</button><button class="btn sm tonal" data-a="locate">${ic('locate', 'xs')}${S.locating ? 'Stop blinking' : 'Locate bay'}</button></div></div></div></div>` : ''}
      <div class="chassis">
        ${S.bays.map(b => `<button class="bay ${b.state} ${S.locating && b.state === 'missing' ? 'locate' : ''}" data-a="sheet:${b.id}" aria-label="Bay ${b.id}">
          <span>BAY ${b.id}</span><span class="grill">${b.state === 'missing' ? ic('alert', 'sm') : ''}</span><span class="led"></span></button>`).join('')}
        <div class="chassis-foot">${LOGO}<span>4-bay · 2 × 1 TB NVMe cache</span></div>
      </div>
      <p class="tiny muted" style="margin:8px 4px 0">Tap a bay to see disk details.</p>
      ${sh('Pool')}
      <div class="card">
        <div class="row-flex"><span class="spacer"><h4>${S.pool.name}</h4><span class="muted tiny">${S.pool.raid} · 4 × 8 TB</span></span>${missing ? '<span class="pill warn">Degraded</span>' : poolPill()}</div>
        <div style="margin:14px 0 6px">${meter(S.pool.used / S.pool.total * 100)}</div>
        <div class="row-flex tiny muted"><span class="spacer">${S.pool.used} TB used</span><span>${(S.pool.total - S.pool.used).toFixed(1)} TB free</span></div>
      </div>`;
    const right = `
      ${sh('Uptime')}
      <div class="card">
        <div class="row-flex"><span class="spacer"><div class="big">${S.nas.uptime}</div><div class="muted tiny">Since ${S.nas.lastBoot}</div></span><span class="pill ok">${avail}%</span></div>
        <div class="uptime-bars">${S.uptime30.map(v => `<span class="${v < 100 ? 'dip' : ''}" style="height:${v < 100 ? 55 : 100}%" title="${v}%"></span>`).join('')}</div>
        <div class="row-flex tiny muted"><span class="spacer">30 days ago</span><span>Today</span></div>
      </div>
      ${sh('Shared folders')}
      ${list(S.volumes.map(v => li({ icon: v.icon, title: v.name, sub: `${v.used} TB`, trail: `<div style="width:80px">${meter(v.used / S.pool.total * 100 * 2.2, 'thin')}</div>` })))}
      ${list([li({ icon: 'cpu', title: 'NVMe cache', sub: '2 × 1 TB · 61% hit rate', trail: '<span class="pill ok">Healthy</span>' })])}`;
    return { body: `<div class="storage-grid"><div>${left}</div><div>${right}</div></div>` };
  },

  more() {
    const me = S.users[0];
    return {
      body: `
        <div class="card"><div class="row-flex">${avatar(me)}<div class="spacer"><h4 style="margin:0">${me.name}</h4><div class="muted tiny">Owner · ${me.email}</div></div></div></div>
        ${list([
          li({ icon: 'users', title: 'Users & access', sub: `${S.users.length} people`, a: 'go:users', chev: true }),
          li({ icon: 'apps', title: 'Connected apps', sub: `${S.apps.filter(a => a.on).length} connected`, a: 'go:apps', chev: true }),
          li({ icon: 'wifi', title: 'Devices', sub: `${S.devices.length} on network · 2 alerts`, a: 'go:devices', chev: true }),
        ])}
        ${list([
          li({ icon: 'settings', title: 'Settings', a: 'go:settings', chev: true }),
          li({ icon: S.theme === 'dark' ? 'moon' : 'sun', title: 'Dark theme', trail: sw(S.theme === 'dark', 'theme', 'Dark theme') }),
        ])}`,
    };
  },

  users() {
    return {
      body: `
        <p class="muted tiny" style="margin:0 4px 12px">People only see files, search results and agent output from folders they can access.</p>
        ${list(S.users.map(u => li({ raw: avatar(u), title: esc(u.name) + (u.you ? ' <span class="muted tiny">(you)</span>' : ''),
          sub: `${u.role} · ${u.last}`, a: `go:user:${u.id}`, chev: true,
          trail: `<span class="pill ${u.role === 'Owner' || u.role === 'Admin' ? 'accent' : 'neutral'}">${u.role}</span>` })))}
        <button class="btn block" data-a="toast:Invite link copied">${ic('plus', 'sm')}Invite someone</button>`,
    };
  },

  user(d, id) {
    const u = userById(id);
    const roles = ['Admin', 'Member', 'Child', 'Guest'];
    const accLabel = { rw: 'Read & write', r: 'Read only', none: 'No access' };
    return {
      body: `
        <div class="profile-head">${avatar(u, 'lg')}<h2>${esc(u.name)}</h2><div class="muted tiny">${esc(u.email)} · ${u.last}</div></div>
        ${u.role === 'Owner' ? `<div class="card outline"><div class="row-flex">${ic('shield')}<span class="tiny muted">The owner always has full access. Owner settings can’t be changed here.</span></div></div>` : `
        ${sh('Role')}
        <div class="segc">${roles.map(r => `<button class="${u.role === r ? 'on' : ''}" data-a="role:${u.id}:${r}">${r}</button>`).join('')}</div>`}
        ${sh('Storage')}
        <div class="card"><div class="row-flex tiny"><span class="spacer">${u.used} TB used</span><span class="muted">${u.quota ? `of ${u.quota} TB quota` : 'No quota'}</span></div>
          <div style="margin-top:8px">${meter(u.quota ? u.used / u.quota * 100 : 15)}</div></div>
        ${sh('Folder access')}
        ${list(Object.entries(u.folders).map(([f, v]) => li({ icon: 'folder', title: f,
          trail: `<button class="access-btn ${v}" data-a="${u.role === 'Owner' ? 'noop' : `folder:${u.id}:${f}`}">${accLabel[v]}</button>` })))}
        <p class="muted tiny" style="margin:-4px 4px 0">Tap to change access.</p>
        ${sh('AI permissions')}
        ${list([
          ['ask', 'Ask & semantic search', 'Only covers folders above'],
          ['drive', 'Include Google Drive', 'Their own connected Drive'],
          ['web', 'Web search', 'Live results in Ask'],
          ['agents', 'Use agents', 'Planner, Tagger, Doc Generator'],
        ].map(([k, t, s]) => li({ icon: k === 'web' ? 'globe' : k === 'drive' ? 'cloud' : k === 'agents' ? 'agent' : 'spark', title: t, sub: s,
          trail: sw(u.ai[k], u.role === 'Owner' ? 'noop' : `ai:${u.id}:${k}`, t) })))}
        ${u.role !== 'Owner' ? `<button class="btn block danger" data-a="toast:${esc(u.name)}’s access was paused">Pause access</button>` : ''}`,
    };
  },

  apps() {
    const groups = [...new Set(S.apps.map(a => a.group))];
    return {
      body: `
        <p class="muted tiny" style="margin:0 4px 4px">Connected apps add to semantic search and agents. The search index stays on your NAS.</p>
        ${groups.map(g => `${sh(g)}${list(S.apps.filter(a => a.group === g).map(a => li({
          raw: `<span class="tile letter" style="background:${a.color}">${a.letter}</span>`, title: a.name,
          sub: a.on ? `<span style="color:var(--ok)">Connected</span> · ${a.desc}` : a.desc, subWrap: true,
          trail: a.id === 'web' || a.on ? sw(a.on, `app:${a.id}`, a.name) : `<button class="btn sm tonal" data-a="app:${a.id}">Connect</button>` })))}`).join('')}`,
    };
  },

  settings() {
    return {
      body: `
        ${sh('Appearance')}
        <div class="segc"><button class="${S.theme === 'light' ? 'on' : ''}" data-a="set-theme:light">${'Light'}</button><button class="${S.theme === 'dark' ? 'on' : ''}" data-a="set-theme:dark">Dark</button></div>
        ${sh('Connection')}
        ${list([
          li({ icon: 'nas', title: 'NAS address', sub: S.nas.host, trail: '<span class="pill ok">Connected</span>' }),
          li({ icon: 'globe', title: 'Remote access', sub: 'Encrypted relay when away from home', trail: sw(true, 'noop', 'Remote access') }),
          li({ icon: 'lock', title: 'Require biometrics', sub: 'When opening the app', trail: sw(true, 'noop', 'Biometrics') }),
        ])}
        ${sh('AI')}
        ${list([
          li({ icon: 'spark', title: 'Local AI model', sub: 'Runs on the NAS. Files never leave your network.', subWrap: true, chev: true, a: 'toast:Model settings are a mockup' }),
          li({ icon: 'search', title: 'Re-index files', sub: 'Last full index: yesterday', chev: true, a: 'toast:Re-index queued' }),
        ])}
        ${sh('Notifications')}
        ${list([
          li({ icon: 'disk', title: 'Disk & pool alerts', trail: sw(true, 'noop', 'Disk alerts') }),
          li({ icon: 'wifi', title: 'Device alerts', trail: sw(true, 'noop', 'Device alerts') }),
          li({ icon: 'bell', title: 'Agent updates', trail: sw(false, 'noop', 'Agent updates') }),
        ])}`,
    };
  },
};

function renderMsg(m, d) {
  if (m.role === 'me') return `<div class="msg me">${esc(m.text)}</div>`;
  if (m.typing) return `<div class="msg ai"><div class="who">${ic('spark')}NAS Assistant</div><span class="typing"><i></i><i></i><i></i></span></div>`;
  let card = '';
  if (m.card === 'results') {
    card = m.results.length ? `<div class="inner-list">${m.results.map(r => `<div class="mini-res">${ftile(r.type)}<div class="body"><div class="t">${esc(r.name)}</div><div class="s">${SRC_LABEL[r.src]} · ${esc(r.path)}</div></div>${r.score ? `<span class="score">${r.score}%</span>` : ''}</div>`).join('')}</div>` : '';
  } else if (m.card === 'plan') {
    card = `<div class="inner-list">${S.plan.filter(p => !p.free).slice(0, 4).map(p => `<div class="mini-res"><span class="tile ${p.hl ? 'accent' : ''}">${ic(p.icon, 'sm')}</span><div class="body"><div class="t">${p.time} · ${esc(p.title)}</div><div class="s">${esc(p.src)}</div></div></div>`).join('')}
      <button class="btn sm tonal" data-a="go:planner">Open full plan</button></div>`;
  } else if (m.card === 'tagger') {
    card = `<div class="inner-list"><button class="btn sm" data-a="go:tagger">Review suggestions</button></div>`;
  } else if (m.card === 'docs') {
    card = `<div class="inner-list">${['f3', 'f4'].map(id => S.files.find(f => f.id === id)).map(f => `<div class="mini-res">${ftile(f.type)}<div class="body"><div class="t">${esc(f.name)}</div><div class="s">${SRC_LABEL[f.src]}</div></div></div>`).join('')}
      <button class="btn sm" data-a="go:docs">Open Doc Generator</button></div>`;
  } else if (m.card === 'devices') {
    card = `<div class="inner-list">${S.devices.filter(x => x.state !== 'ok').map(x => `<div class="mini-res"><span class="tile warn">${ic(x.icon, 'sm')}</span><div class="body"><div class="t">${esc(x.name)}</div><div class="s">${esc(x.status)}</div></div></div>`).join('')}
      <button class="btn sm tonal" data-a="go:devices">See all devices</button></div>`;
  } else if (m.card === 'storage') {
    card = `<div class="inner-list"><button class="btn sm tonal" data-a="tab:storage">Open storage</button></div>`;
  }
  return `<div class="msg ai"><div class="who">${ic('spark')}NAS Assistant</div>${esc(m.text)}${card}${m.src && m.src.length ? `<div class="src">Sources: ${m.src.join(' · ')}</div>` : ''}</div>`;
}

function renderResults(d) {
  const { items, hidden } = d.results;
  const local = items.filter(i => i.src !== 'web');
  const web = items.filter(i => i.src === 'web');
  const row = r => `<div class="res">${ftile(r.type)}<div class="body"><div class="t">${esc(r.name)}</div><div class="path">${esc(r.path)}</div>${r.snip ? `<div class="snip">${esc(r.snip)}</div>` : ''}
    <div class="meta"><span class="pill neutral">${SRC_LABEL[r.src]}</span>${r.score ? `<span class="pill accent">${r.score}% match</span>` : ''}</div></div></div>`;
  return `
    <div class="tiny muted" style="margin:0 4px 10px">“${esc(d.lastQuery)}” · ${local.length} result${local.length === 1 ? '' : 's'}${hidden ? ` · <span title="Hidden by permissions">${ic('lock', 'xs')} ${hidden} hidden by permissions</span>` : ''}</div>
    <div class="results-grid">
      ${local.length ? `<div class="list">${local.map(row).join('')}</div>` : '<div class="card outline"><p class="muted">No files matched. Try other words or turn on more sources.</p></div>'}
      ${web.length ? `<div><div class="list">${web.map(row).join('')}</div></div>` : ''}
    </div>`;
}

/* ---------------- Chrome ---------------- */
function statusBar(d) {
  const icons = `<span class="icons">${ic('signal')}${ic('wifi')}<span class="batt"></span></span>`;
  if (d.form === 'tablet') return `<div class="sb"><span>${d.platform === 'ios' ? '9:41&nbsp;&nbsp;Tue 13 Oct' : '9:41'}</span>${icons}</div>`;
  if (d.platform === 'ios') return `<div class="sb"><span>9:41</span><span class="island"></span>${icons}</div>`;
  return `<div class="sb"><span>9:41</span><span class="cam"></span>${icons}</div>`;
}

function header(d, v) {
  const t = title(d.route);
  const canBack = d.history.length > 0;
  const me = S.users[0];
  const acts = v.actions || '';
  if (d.platform === 'android') {
    if (v.home && !canBack) {
      return `<header class="topbar">${d.form === 'phone' ? `<div class="title-wrap">${LOGO}<span class="sub">AI NAS</span></div>` : '<div class="spacer"></div>'}<button class="icon-btn" data-a="toast:No new notifications" aria-label="Notifications">${ic('bell')}</button><button data-a="go:user:${me.id}" aria-label="Profile">${avatar(me)}</button></header>`;
    }
    return `<header class="topbar">${canBack ? `<button class="icon-btn" data-a="back" aria-label="Back">${ic('arrowL')}</button>` : ''}<h1>${esc(t)}</h1>${acts}</header>`;
  }
  if (canBack) {
    const prev = title(d.history[d.history.length - 1]);
    return `<header class="navbar"><button class="back" data-a="back">${ic('chevL')}${esc(prev)}</button><div class="nav-title">${esc(t)}</div><div class="nav-actions">${acts}</div></header>`;
  }
  const bar = v.home ? `<div class="bar">${d.form === 'phone' ? LOGO : ''}<span class="spacer"></span><button class="icon-btn" data-a="toast:No new notifications" aria-label="Notifications">${ic('bell')}</button><button data-a="go:user:${me.id}" aria-label="Profile">${avatar(me)}</button></div>` : `<div class="bar"><span class="spacer"></span>${acts}</div>`;
  return `<header class="ios-large">${bar}<h1>${v.home ? 'Good morning, Alex' : esc(t)}</h1>${v.home ? '<div class="sub">Tuesday, 13 October</div>' : ''}</header>`;
}

const PHONE_TABS = [['home', 'home', 'Home'], ['ask', 'spark', 'Ask'], ['agents', 'agent', 'Agents'], ['storage', 'disk', 'Storage'], ['more', 'more', 'More']];
const TABLET_TABS = [['home', 'home', 'Home'], ['ask', 'spark', 'Ask'], ['agents', 'agent', 'Agents'], ['storage', 'disk', 'Storage'], ['devices', 'wifi', 'Devices'], ['users', 'users', 'Users & access'], ['apps', 'apps', 'Connected apps'], ['settings', 'settings', 'Settings']];

function bottomNav(d) {
  return `<nav class="bnav">${PHONE_TABS.map(([k, i, l]) => {
    const alert = k === 'storage' && S.bays.some(b => b.state === 'missing');
    return `<button class="${d.tab === k ? 'on' : ''}" data-a="tab:${k}">${d.platform === 'android' ? `<span class="pill ${alert ? 'badge-dot' : ''}">${ic(i)}</span>` : `<span class="${alert ? 'badge-dot' : ''}">${ic(i)}</span>`}${l}</button>`;
  }).join('')}</nav>`;
}

function sidebar(d) {
  const me = S.users[0];
  return `<aside class="side">
    <div class="side-brand">${LOGO}<span class="sub"><span class="pill ok"><span class="dot"></span>Online</span>${S.nas.host}</span></div>
    ${TABLET_TABS.map(([k, i, l]) => `<button class="item ${d.tab === k ? 'on' : ''}" data-a="tab:${k}">${ic(i)}${l}</button>`).join('')}
    <div class="grow"></div>
    <div class="me">${avatar(me)}<div>${me.name}<small>Owner</small></div></div>
  </aside>`;
}

function sheet(d) {
  if (!d.sheet) return '';
  const b = S.bays.find(x => x.id === d.sheet);
  const missing = b.state === 'missing';
  const anim = d.sheetFresh ? 'anim' : '';
  d.sheetFresh = false;
  return `<div class="scrim ${anim}" data-a="close-sheet"></div>
    <div class="sheet ${anim}" role="dialog" aria-label="Bay ${b.id}">
      ${d.form === 'phone' ? '<div class="grab"></div>' : ''}
      <div class="row-flex"><h3 class="spacer">Bay ${b.id}</h3>${missing ? '<span class="pill bad">Disconnected</span>' : '<span class="pill ok">Healthy</span>'}</div>
      <p class="muted tiny" style="margin:0 0 16px">${missing ? `The disk stopped responding ${b.lastSeen.toLowerCase()}. Check that it’s seated firmly. The pool rebuilds automatically when it comes back.` : 'SMART checks passed. No reallocated sectors.'}</p>
      <dl class="kv">
        <dt>Disk</dt><dd>${b.cap} ${b.type}</dd>
        <dt>Serial</dt><dd>${b.serial}</dd>
        <dt>Temperature</dt><dd>${b.temp ? b.temp + ' °C' : '—'}</dd>
        <dt>Power-on time</dt><dd>${b.hours}</dd>
        <dt>Pool</dt><dd>${S.pool.name} · ${S.pool.raid}</dd>
        ${missing ? `<dt>Last seen</dt><dd>${b.lastSeen}</dd>` : ''}
      </dl>
      <div class="actions">${missing
        ? `<button class="btn tonal" data-a="locate">${S.locating ? 'Stop blinking' : 'Blink bay LED'}</button><button class="btn" data-a="reconnect:${b.id}">Disk is back in</button>`
        : `<button class="btn tonal" data-a="toast:SMART test started on bay ${b.id}">Run SMART test</button><button class="btn" data-a="close-sheet">Done</button>`}</div>
    </div>`;
}

/* ---------------- Render ---------------- */
function render(d) {
  const root = document.getElementById('screen-' + d.id);
  const prevContent = root.querySelector('.content');
  const sameRoute = root.dataset.route === d.route;
  const prevScroll = prevContent ? prevContent.scrollTop : 0;
  const focused = document.activeElement && root.contains(document.activeElement) && document.activeElement.dataset.input;

  const [key, arg] = d.route.split(':');
  const v = VIEWS[key](d, arg);
  root.className = `screen p-${d.platform} f-${d.form}`;
  root.dataset.route = d.route;
  const inner = `${header(d, v)}<div class="content">${v.body}</div>${v.composer || ''}`;
  const appHtml = d.form === 'tablet'
    ? `<div class="tablet-app">${sidebar(d)}<div class="main">${inner}</div></div>`
    : `<div class="app">${inner}${v.fab ? `<button class="fab" data-a="tab:ask">${ic('spark')}Ask</button>` : ''}${bottomNav(d)}</div>`;
  const toast = d.toast ? `<div class="toast" role="status">${ic('check')}${esc(d.toast)}</div>` : '';
  root.innerHTML = statusBar(d) + appHtml + `<div class="homebar"><span></span></div>` + sheet(d) + toast;

  const content = root.querySelector('.content');
  if (d.stick) { content.scrollTop = content.scrollHeight; d.stick = false; }
  else if (sameRoute) content.scrollTop = prevScroll;
  if (focused) {
    const inp = root.querySelector(`[data-input="${focused}"]`);
    if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
  }
}
function renderAll() {
  document.documentElement.dataset.theme = S.theme;
  document.querySelector('[data-page-theme]').innerHTML = ic(S.theme === 'dark' ? 'sun' : 'moon');
  DEVS.forEach(render);
}

/* ---------------- Actions ---------------- */
function go(d, route) { d.history.push(d.route); d.route = route; d.sheet = null; }
function toast(d, msg) {
  d.toast = msg; clearTimeout(d._tt);
  d._tt = setTimeout(() => { d.toast = null; render(d); }, 2200);
}
function send(d, text) {
  text = (text || '').trim();
  if (!text) return;
  d.draft = '';
  if (d.mode === 'search') {
    d.lastQuery = text;
    d.results = semanticSearch(text, d.scopes);
    renderAll();
    return;
  }
  d.chat.push({ role: 'me', text });
  const pending = { role: 'ai', typing: true };
  d.chat.push(pending);
  d.stick = true;
  renderAll();
  setTimeout(() => {
    Object.assign(pending, aiReply(text, d), { typing: false });
    d.stick = true;
    render(d);
  }, 900);
}

function act(d, a, el) {
  const [cmd, x, y] = a.split(':');
  switch (cmd) {
    case 'noop': return;
    case 'tab': d.tab = x; d.route = x; d.history = []; d.sheet = null; break;
    case 'go': go(d, y ? `${x}:${y}` : x); break;
    case 'back': d.route = d.history.pop() || d.tab; break;
    case 'theme': S.theme = S.theme === 'dark' ? 'light' : 'dark'; break;
    case 'set-theme': S.theme = x; break;
    case 'dismiss-prompt': S.promptDismissed = true; break;
    case 'mode': d.mode = x; break;
    case 'scope': d.scopes[x] = !d.scopes[x]; if (d.mode === 'search' && d.lastQuery) d.results = semanticSearch(d.lastQuery, d.scopes); break;
    case 'suggest': d.draft = ''; send(d, el.dataset.q); return;
    case 'send': send(d, d.draft); return;
    case 'sheet': d.sheet = +x; d.sheetFresh = true; break;
    case 'close-sheet': d.sheet = null; break;
    case 'locate': S.locating = !S.locating; toast(d, S.locating ? 'Bay 3 LED is blinking yellow' : 'Stopped blinking'); break;
    case 'reconnect': S.bays.find(b => b.id === +x).state = 'ok'; S.bays.find(b => b.id === +x).temp = 40; S.locating = false; S.pool.rebuilding = true; d.sheet = null;
      S.activity.unshift({ icon: 'refresh', cls: 'ok', t: `Bay ${x} reconnected · rebuilding pool`, s: 'Just now' }); toast(d, `Bay ${x} detected. Rebuilding the pool.`); break;
    case 'toast': toast(d, a.slice(6)); break;
    case 'dev': { const dv = S.devices.find(z => z.id === x); dv.on = !dv.on; break; }
    case 'app': { const ap = app(x); ap.on = !ap.on; toast(d, `${ap.name} ${ap.on ? 'connected' : 'disconnected'}`); break; }
    case 'tagger-auto': S.tagger.auto = !S.tagger.auto; break;
    case 'tag': { const it = S.tagger.items.find(z => z.id === x); const tg = it.tags[+y]; if (!tg[1]) { tg[1] = 1; S.tagger.done++; } break; }
    case 'tags-accept-all': { let n = 0; S.tagger.items.forEach(it => it.tags.forEach(t => { if (!t[1]) { t[1] = 1; n++; } })); S.tagger.done += n; toast(d, `${n} tags accepted`); break; }
    case 'doc-sel': d.doc.sel.has(x) ? d.doc.sel.delete(x) : d.doc.sel.add(x); d.doc.out = null; break;
    case 'doc-tpl': d.doc.tpl = x; d.doc.out = null; break;
    case 'doc-gen': {
      if (!d.doc.sel.size) return;
      const files = [...d.doc.sel].map(id => S.files.find(f => f.id === id));
      const tpl = TEMPLATES.find(t => t.id === d.doc.tpl).label;
      const insurance = files.some(f => f.tags.includes('insurance'));
      d.doc.out = {
        title: insurance && d.doc.tpl === 'compare' ? 'Home insurance: renewal comparison' : `${tpl}: ${files[0].name.replace(/\.[a-z]+$/i, '').replace(/_/g, ' ')}`,
        intro: insurance ? 'Your current policy renews on 18 Oct 2026. This compares its cover and price with the quotes you saved.' : `A ${tpl.toLowerCase()} written from ${files.length} of your files.`,
        files, when: 'just now', file: `${tpl}_2026-10-13.docx`,
      };
      d.stick = true;
      toast(d, 'Document generated and saved to your NAS');
      break;
    }
    case 'role': userById(x).role = y; break;
    case 'folder': { const u = userById(x); const order = ['none', 'r', 'rw']; u.folders[y] = order[(order.indexOf(u.folders[y]) + 1) % 3]; break; }
    case 'ai': { const u = userById(x); u.ai[y] = !u.ai[y]; break; }
  }
  renderAll();
}

document.addEventListener('click', e => {
  const t = e.target.closest('[data-a]');
  const screen = e.target.closest('.screen');
  if (!t || !screen) return;
  if (t.disabled) return;
  act(devById(screen.dataset.dev), t.dataset.a, t);
});
document.addEventListener('input', e => {
  const s = e.target.closest('.screen');
  if (s && e.target.dataset.input) devById(s.dataset.dev).draft = e.target.value;
});
document.addEventListener('keydown', e => {
  const s = e.target.closest && e.target.closest('.screen');
  if (s && e.key === 'Enter' && e.target.dataset.input) { e.preventDefault(); send(devById(s.dataset.dev), e.target.value); }
});

/* ---------------- Page controls & scaling ---------------- */
document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('[data-view]').forEach(x => x.classList.toggle('on', x === b));
  document.querySelectorAll('[data-dev-col]').forEach(c => { c.hidden = !(b.dataset.view === 'all' || b.dataset.view === c.dataset.devCol); });
  fit();
}));
document.querySelectorAll('[data-tabos]').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('[data-tabos]').forEach(x => x.classList.toggle('on', x === b));
  const t = devById('tablet');
  t.platform = b.dataset.tabos;
  document.getElementById('tablet-cap').textContent = `Tablet · ${t.platform === 'ios' ? 'iPadOS' : 'Android'}`;
  render(t);
}));
document.querySelector('[data-page-theme]').addEventListener('click', () => { S.theme = S.theme === 'dark' ? 'light' : 'dark'; renderAll(); });

function fit() {
  const avail = document.querySelector('.stage').clientWidth - 32;
  document.querySelectorAll('.device-wrap').forEach(w => {
    const dev = w.firstElementChild;
    const s = Math.min(1, avail / dev.offsetWidth);
    dev.style.transform = `scale(${s})`;
    w.style.width = dev.offsetWidth * s + 'px';
    w.style.height = dev.offsetHeight * s + 'px';
  });
}
addEventListener('resize', fit);

renderAll();
fit();
