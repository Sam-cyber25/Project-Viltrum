import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const GOALS = [
  {
    id: 1, icon: "📖", title: "AIR 1 — CBSE Class 10", category: "ACADEMICS",
    desc: "Top rank in boards. Weakest links: Maths, Social Science, French.",
    progress: 8,
    milestones: ["Complete NCERT cover-to-cover", "Solve 5 years past papers", "Mock test every Sunday", "Zero below 95 in any subject"],
    done: [false, false, false, false],
    color: "#3b82f6",
  },
  {
    id: 2, icon: "💰", title: "Independent Income", category: "HUSTLE",
    desc: "Freelance web dev + LootSpec + PC flipping. Real ₹ before year ends.",
    progress: 22,
    milestones: ["Close first paid client (₹3,000+)", "Build LootSpec to 500 followers", "Flip first PC for profit", "Hit ₹10,000 earned independently"],
    done: [false, false, false, false],
    color: "#f59e0b",
  },
  {
    id: 3, icon: "⚔️", title: "Body Recomposition", category: "FITNESS",
    desc: "Visible abs. Lean athletic physique. 12–18 month mission.",
    progress: 5,
    milestones: ["Consistent 5AM gym for 30 days", "Track macros for 2 weeks straight", "Drop body fat visibly", "Visible abs achieved"],
    done: [false, false, false, false],
    color: "#ef4444",
  },
  {
    id: 4, icon: "🙏", title: "Spiritual Development", category: "SPIRIT",
    desc: "Daily naam jaap, Jai Shree Ram. Ground the chaos with faith.",
    progress: 30,
    milestones: ["30-day unbroken daily practice", "Learn 3 new prayers/shlokas", "60-day streak", "Morning practice becomes automatic"],
    done: [false, false, false, false],
    color: "#a855f7",
  },
  {
    id: 5, icon: "🥊", title: "MMA / Self-Defense", category: "MARTIAL ARTS",
    desc: "Home training setup. Build real striking and grappling base.",
    progress: 15,
    milestones: ["Master 5 fundamental strikes", "30 days consistent home training", "Learn basic takedown defense", "Spar-ready fundamentals"],
    done: [false, false, false, false],
    color: "#10b981",
  },
  {
    id: 6, icon: "🌌", title: "Become Unrecognizable", category: "CHARACTER",
    desc: "The sum of all other goals. The final form. Discipline as identity.",
    progress: 10,
    milestones: ["6 months of keeping all 5 goals active", "Feel genuinely proud of who you are", "Look in the mirror and not recognize the old you", "Others notice the change"],
    done: [false, false, false, false],
    color: "#d4a853",
  },
];

const HABIT_GROUPS = [
  {
    label: "MORNING FOUNDATION", color: "#f59e0b",
    habits: [
      { id: "h1", text: "Wake up 4:45 AM — no snooze", icon: "⚡" },
      { id: "h2", text: "Gym 5:00–6:30 AM", icon: "🏋️" },
      { id: "h3", text: "Post-gym protein + cold rinse", icon: "🥛" },
      { id: "h4", text: "Spiritual practice (naam jaap)", icon: "🙏" },
      { id: "h5", text: "Full breakfast before leaving", icon: "🍽️" },
    ]
  },
  {
    label: "ACADEMIC GRIND", color: "#3b82f6",
    habits: [
      { id: "h6", text: "Present & focused in school", icon: "🏫" },
      { id: "h7", text: "Self-study block (no distractions)", icon: "📖" },
      { id: "h8", text: "Attended coaching class 1", icon: "📚" },
      { id: "h9", text: "Reviewed notes after coaching", icon: "📝" },
    ]
  },
  {
    label: "BODY & HEALTH", color: "#ef4444",
    habits: [
      { id: "h10", text: "8+ glasses of water", icon: "💧" },
      { id: "h11", text: "No junk food today", icon: "🚫" },
      { id: "h12", text: "Stretching / mobility work", icon: "🤸" },
    ]
  },
  {
    label: "NIGHT DISCIPLINE", color: "#a855f7",
    habits: [
      { id: "h13", text: "No phone during family dinner", icon: "🍛" },
      { id: "h14", text: "Journaled 5 lines", icon: "📓" },
      { id: "h15", text: "Lights out on time", icon: "🌙" },
    ]
  },
];

const SCHEDULE = {
  "Mon – Wed": {
    sub: "School + 2 coaching classes",
    blocks: [
      { t: "04:45", label: "Wake Up", dur: "15m", icon: "⚡", c: "#f59e0b", note: "No snooze. Water. Wash face. Gear up." },
      { t: "05:00", label: "GYM", dur: "1h 30m", icon: "🏋️", c: "#ef4444", note: "Peak testosterone window. Lift heavy. Body recomp mission." },
      { t: "06:30", label: "Post-Gym Recovery", dur: "20m", icon: "🥛", c: "#ef4444", note: "Cold rinse, stretch, protein intake." },
      { t: "06:50", label: "Spiritual Practice", dur: "25m", icon: "🙏", c: "#a855f7", note: "Naam jaap, Jai Shree Ram. Ground yourself before the world gets loud." },
      { t: "07:15", label: "Get Ready + Breakfast", dur: "30m", icon: "🍽️", c: "#f97316", note: "Full meal. No skipping. Fuel for school." },
      { t: "07:45", label: "Travel to School", dur: "15m", icon: "🚶", c: "#71717a", note: "Earphones in. Revision audio or silence. No reels." },
      { t: "08:00", label: "SCHOOL", dur: "~6h", icon: "🏫", c: "#3b82f6", note: "[Exact timings TBC — update when school drops message]" },
      { t: "02:00", label: "Travel Home + Rest", dur: "45m", icon: "🏠", c: "#71717a", note: "Light snack. 20 min rest max. Not a nap." },
      { t: "02:45", label: "Self-Study Block 1", dur: "1h 15m", icon: "📖", c: "#22c55e", note: "Maths first. Then SS or French. No distractions." },
      { t: "04:00", label: "Break + Prep for Coaching", dur: "45m", icon: "☕", c: "#f97316", note: "Snack, freshen up, skim today's coaching topic." },
      { t: "04:45", label: "Leave for Coaching", dur: "15m", icon: "🚀", c: "#71717a", note: "Be 5 min early. Buffer for delays." },
      { t: "05:00", label: "Next Toppers — Class 1", dur: "~1h 15m", icon: "📚", c: "#06b6d4", note: "First batch. Notes, questions, no zoning out. 10–15 min buffer built in." },
      { t: "06:15", label: "Self-Study Block 2", dur: "1h 45m", icon: "📝", c: "#22c55e", note: "Consolidate class notes. Homework. Weakest subject revision." },
      { t: "08:00", label: "Next Toppers — Class 2", dur: "~1h 15m", icon: "📚", c: "#06b6d4", note: "Second batch. Stay sharp even if tired. 10–15 min buffer." },
      { t: "09:15", label: "Dinner + Family Time", dur: "30m", icon: "🍛", c: "#f97316", note: "Phone down. Be present." },
      { t: "09:45", label: "Wind Down + Journal", dur: "30m", icon: "📓", c: "#a855f7", note: "5 lines: what you did, what you'll dominate tomorrow. No screens." },
      { t: "10:15", label: "LIGHTS OUT", dur: "—", icon: "🌙", c: "#d4a853", note: "6h 45m of sleep. Non-negotiable for recovery and growth hormone." },
    ]
  },
  "Thu – Sat": {
    sub: "School + 1 coaching class",
    blocks: [
      { t: "04:45", label: "Wake Up", dur: "15m", icon: "⚡", c: "#f59e0b", note: "No snooze. Water. Wash face. Gear up." },
      { t: "05:00", label: "GYM", dur: "1h 30m", icon: "🏋️", c: "#ef4444", note: "Peak testosterone window. Lift heavy. Body recomp mission." },
      { t: "06:30", label: "Post-Gym Recovery", dur: "20m", icon: "🥛", c: "#ef4444", note: "Cold rinse, stretch, protein intake." },
      { t: "06:50", label: "Spiritual Practice", dur: "25m", icon: "🙏", c: "#a855f7", note: "Naam jaap, Jai Shree Ram. Ground yourself." },
      { t: "07:15", label: "Get Ready + Breakfast", dur: "30m", icon: "🍽️", c: "#f97316", note: "Full meal. Fuel for school." },
      { t: "07:45", label: "Travel to School", dur: "15m", icon: "🚶", c: "#71717a", note: "Earphones in. Revision audio or silence." },
      { t: "08:00", label: "SCHOOL", dur: "~6h", icon: "🏫", c: "#3b82f6", note: "[Exact timings TBC]" },
      { t: "02:00", label: "Travel Home + Rest", dur: "45m", icon: "🏠", c: "#71717a", note: "Light snack. 20 min rest." },
      { t: "02:45", label: "Self-Study Block 1", dur: "1h 15m", icon: "📖", c: "#22c55e", note: "Boards prep. Priority: Maths → SS → French." },
      { t: "04:00", label: "Self-Study Block 2", dur: "45m", icon: "📝", c: "#22c55e", note: "Continue or switch. Solve problems, don't just read." },
      { t: "04:45", label: "Leave for Coaching", dur: "15m", icon: "🚀", c: "#71717a", note: "Be 5 min early." },
      { t: "05:00", label: "Next Toppers — Class 1", dur: "~1h 15m", icon: "📚", c: "#06b6d4", note: "Only class today. Go all in. Ask questions." },
      { t: "06:15", label: "Self-Study Block 3", dur: "1h 30m", icon: "📝", c: "#22c55e", note: "Consolidate notes. Deep work only." },
      { t: "07:45", label: "Free Time / Projects", dur: "1h", icon: "🎸", c: "#d4a853", note: "LootSpec content, web dev, guitar, or just breathe." },
      { t: "08:45", label: "Dinner + Family Time", dur: "30m", icon: "🍛", c: "#f97316", note: "Phone down. Be present." },
      { t: "09:15", label: "Wind Down + Journal", dur: "30m", icon: "📓", c: "#a855f7", note: "5 lines. No screens." },
      { t: "09:45", label: "LIGHTS OUT", dur: "—", icon: "🌙", c: "#d4a853", note: "7h of sleep. Recovery is part of the mission." },
    ]
  },
  "Sunday": {
    sub: "No school · No coaching · Full recharge",
    blocks: [
      { t: "04:45", label: "Wake Up", dur: "15m", icon: "⚡", c: "#f59e0b", note: "Sunday or not — discipline doesn't rest." },
      { t: "05:00", label: "GYM", dur: "1h 30m", icon: "🏋️", c: "#ef4444", note: "Peak testosterone window. Lift heavy." },
      { t: "06:30", label: "Post-Gym Recovery", dur: "20m", icon: "🥛", c: "#ef4444", note: "Cold rinse, stretch, protein intake." },
      { t: "06:50", label: "Extended Spiritual Practice", dur: "40m", icon: "🙏", c: "#a855f7", note: "Longer session. Naam jaap. Reflect on the week." },
      { t: "07:30", label: "Breakfast + Family", dur: "30m", icon: "🍽️", c: "#f97316", note: "Eat well. Sit with family. No phone at table." },
      { t: "08:00", label: "Deep Study Block 1 — MATHS", dur: "2h", icon: "📖", c: "#22c55e", note: "Hardest subject first. Full focus. No interruptions." },
      { t: "10:00", label: "Break — Go Outside", dur: "30m", icon: "☀️", c: "#f97316", note: "Walk. Sunlight. No phone." },
      { t: "10:30", label: "Deep Study Block 2", dur: "1h 30m", icon: "📝", c: "#22c55e", note: "Social Science or French. Past papers, concept maps." },
      { t: "12:00", label: "Lunch + Rest", dur: "1h", icon: "🍛", c: "#f97316", note: "Full meal. 20 min horizontal rest. Not sleep." },
      { t: "01:00", label: "Projects & Hustle", dur: "1h 30m", icon: "💻", c: "#d4a853", note: "LootSpec content, web dev, PC flipping research." },
      { t: "02:30", label: "Week Revision Block", dur: "1h", icon: "📚", c: "#22c55e", note: "Review the week's weakest areas. Consolidate notes." },
      { t: "03:30", label: "Free / Recharge", dur: "1h 30m", icon: "🎸", c: "#d4a853", note: "Guitar, Minecraft, stargazing, MMA drills. Earned it." },
      { t: "05:00", label: "Evening Walk + Reflection", dur: "1h", icon: "🌅", c: "#a855f7", note: "Phone in pocket. Think. Plan the week. Visualize who you're becoming." },
      { t: "06:00", label: "Study Block 3 — Weak Subject", dur: "1h 30m", icon: "📝", c: "#22c55e", note: "French vocab, SS maps, Maths formulas." },
      { t: "07:30", label: "Dinner + Family Time", dur: "1h", icon: "🍛", c: "#f97316", note: "Full attention. Weekend dinner." },
      { t: "08:30", label: "Week Prep + Journal", dur: "1h", icon: "📓", c: "#a855f7", note: "Set goals for the week. Journal. Read something useful." },
      { t: "09:30", label: "LIGHTS OUT", dur: "—", icon: "🌙", c: "#d4a853", note: "7.5h of sleep. Best recovery of the week." },
    ]
  },
};

const QUOTES = [
  "Pain is temporary. The version you become is permanent.",
  "Every rep, every page, every prayer — it compounds.",
  "Discipline is the highest form of self-love.",
  "She'll see it. Not because you want her to. Because you couldn't stop.",
  "The grind is the destination.",
  "Build in silence. Let results make the noise.",
  "Jai Shree Ram. Then get to work.",
  "The man you're becoming doesn't negotiate with his old habits.",
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const dayOfWeek = new Date().getDay(); // 0=Sun
const defaultScheduleTab = dayOfWeek === 0 ? "Sunday" : (dayOfWeek <= 3 ? "Mon – Wed" : "Thu – Sat");

function Sidebar({ active, setActive }) {
  const nav = [
    { id: "overview", icon: "◈", label: "Overview" },
    { id: "schedule", icon: "◷", label: "Schedule" },
    { id: "habits", icon: "◻", label: "Habits" },
    { id: "goals", icon: "◆", label: "Goals" },
    { id: "journal", icon: "◇", label: "Journal" },
  ];

  return (
    <div style={{
      width: 200, minHeight: "100vh", background: "#080808",
      borderRight: "1px solid #151515", position: "fixed", left: 0, top: 0,
      display: "flex", flexDirection: "column", zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid #111" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "#333", marginBottom: 6 }}>PRIVATE · 2026</div>
        <div style={{ fontSize: 18, fontWeight: 900, color: "#d4a853", fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "0.02em" }}>
          SAM
        </div>
        <div style={{ fontSize: 9, color: "#2a2a2a", letterSpacing: "0.25em", marginTop: 2 }}>OPERATION UNRECOGNIZABLE</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 0" }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)} style={{
            display: "flex", alignItems: "center", gap: 12, width: "100%",
            padding: "11px 24px", background: active === n.id ? "#0f0f0f" : "transparent",
            borderLeft: active === n.id ? "2px solid #d4a853" : "2px solid transparent",
            color: active === n.id ? "#e5e5e5" : "#383838",
            border: "none", borderLeft: active === n.id ? "2px solid #d4a853" : "2px solid transparent",
            cursor: "pointer", fontFamily: "'DM Mono', 'Courier New', monospace",
            fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
            transition: "all 0.15s", textAlign: "left",
          }}>
            <span style={{ color: active === n.id ? "#d4a853" : "#2a2a2a", fontSize: 13 }}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "20px 24px", borderTop: "1px solid #111" }}>
        <div style={{ fontSize: 9, color: "#222", letterSpacing: "0.15em" }}>
          {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
        </div>
        <div style={{ fontSize: 9, color: "#1a1a1a", marginTop: 4, letterSpacing: "0.1em" }}>
          CLASS 10 · KANPUR
        </div>
      </div>
    </div>
  );
}

function Overview({ habits, onNav }) {
  const totalHabits = HABIT_GROUPS.reduce((a, g) => a + g.habits.length, 0);
  const doneHabits = Object.values(habits).filter(Boolean).length;
  const pct = Math.round((doneHabits / totalHabits) * 100);
  const quote = QUOTES[new Date().getDate() % QUOTES.length];
  const avgGoalProgress = Math.round(GOALS.reduce((a, g) => a + g.progress, 0) / GOALS.length);

  const todayDayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()];

  return (
    <div>
      {/* Hero greeting */}
      <div style={{
        background: "linear-gradient(135deg, #0d0d0d 0%, #0a0a0a 100%)",
        border: "1px solid #161616", borderRadius: 8, padding: "32px 36px", marginBottom: 20,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40, width: 200, height: 200,
          borderRadius: "50%", background: "#d4a85308", border: "1px solid #d4a85315",
        }} />
        <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#333", marginBottom: 10 }}>
          {todayDayName.toUpperCase()} · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long" }).toUpperCase()}
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, color: "#f0ead6", margin: "0 0 8px", fontWeight: 700 }}>
          Good morning, Sam.
        </h2>
        <p style={{ color: "#d4a853", fontSize: 13, margin: 0, fontStyle: "italic", letterSpacing: "0.03em" }}>
          "{quote}"
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Habits Today", value: `${doneHabits}/${totalHabits}`, sub: `${pct}% complete`, color: pct === 100 ? "#22c55e" : pct > 50 ? "#d4a853" : "#ef4444" },
          { label: "Avg Goal Progress", value: `${avgGoalProgress}%`, sub: "across 6 goals", color: "#a855f7" },
          { label: "Wake Streak", value: "Day 1", sub: "starts tomorrow", color: "#f59e0b" },
          { label: "Study Streak", value: "—", sub: "log first session", color: "#3b82f6" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "#0d0d0d", border: "1px solid #161616", borderRadius: 6,
            padding: "18px 20px",
          }}>
            <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "#333", marginBottom: 10 }}>{s.label.toUpperCase()}</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: s.color, fontFamily: "'Playfair Display', Georgia, serif" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "#2a2a2a", marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Today's schedule preview */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: "#0d0d0d", border: "1px solid #161616", borderRadius: 6, padding: "20px 24px" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#333", marginBottom: 16 }}>TODAY'S ANCHOR BLOCKS</div>
          {[
            { t: "05:00", l: "GYM", c: "#ef4444" },
            { t: "06:50", l: "Spiritual Practice", c: "#a855f7" },
            { t: "08:00", l: "School", c: "#3b82f6" },
            { t: "05:00 PM", l: "Coaching Class 1", c: "#06b6d4" },
            { t: "10:15 PM", l: "Lights Out", c: "#d4a853" },
          ].map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 3, height: 3, borderRadius: "50%", background: b.c, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: "#333", fontFamily: "monospace", width: 60 }}>{b.t}</span>
              <span style={{ fontSize: 11, color: "#555" }}>{b.l}</span>
            </div>
          ))}
          <button onClick={() => onNav("schedule")} style={{
            marginTop: 8, fontSize: 10, color: "#d4a853", background: "none", border: "none",
            cursor: "pointer", letterSpacing: "0.15em", padding: 0, fontFamily: "inherit",
          }}>VIEW FULL SCHEDULE →</button>
        </div>

        <div style={{ background: "#0d0d0d", border: "1px solid #161616", borderRadius: 6, padding: "20px 24px" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#333", marginBottom: 16 }}>HABIT PROGRESS</div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: "#444" }}>Today's completion</span>
              <span style={{ fontSize: 10, color: "#d4a853" }}>{pct}%</span>
            </div>
            <div style={{ height: 4, background: "#151515", borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#22c55e" : "#d4a853", borderRadius: 2, transition: "width 0.4s" }} />
            </div>
          </div>
          {HABIT_GROUPS.map(g => {
            const groupDone = g.habits.filter(h => habits[h.id]).length;
            return (
              <div key={g.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 10, color: "#333", letterSpacing: "0.05em" }}>{g.label}</span>
                <span style={{ fontSize: 10, color: groupDone === g.habits.length ? "#22c55e" : "#383838" }}>
                  {groupDone}/{g.habits.length}
                </span>
              </div>
            );
          })}
          <button onClick={() => onNav("habits")} style={{
            marginTop: 8, fontSize: 10, color: "#d4a853", background: "none", border: "none",
            cursor: "pointer", letterSpacing: "0.15em", padding: 0, fontFamily: "inherit",
          }}>OPEN CHECKLIST →</button>
        </div>
      </div>
    </div>
  );
}

function Schedule() {
  const tabs = Object.keys(SCHEDULE);
  const [activeTab, setActiveTab] = useState(defaultScheduleTab);
  const [expanded, setExpanded] = useState(null);
  const sched = SCHEDULE[activeTab];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f0ead6", margin: "0 0 4px", fontSize: 24 }}>War Schedule</h2>
        <p style={{ color: "#333", fontSize: 11, margin: 0, letterSpacing: "0.05em" }}>MILITARY GRADE · 5AM START · NON-NEGOTIABLE</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => { setActiveTab(t); setExpanded(null); }} style={{
            padding: "8px 16px", background: activeTab === t ? "#d4a853" : "#0d0d0d",
            color: activeTab === t ? "#000" : "#333", border: `1px solid ${activeTab === t ? "#d4a853" : "#161616"}`,
            borderRadius: 4, cursor: "pointer", fontFamily: "'DM Mono', monospace",
            fontSize: 10, letterSpacing: "0.1em", fontWeight: activeTab === t ? 700 : 400,
            transition: "all 0.15s",
          }}>
            <div>{t.toUpperCase()}</div>
            <div style={{ fontSize: 8, opacity: 0.6, marginTop: 2 }}>{SCHEDULE[t].sub}</div>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 56, top: 0, bottom: 0, width: 1, background: "#131313" }} />
        {sched.blocks.map((b, i) => (
          <div key={i} onClick={() => setExpanded(expanded === i ? null : i)}
            style={{ display: "flex", gap: 12, marginBottom: 3, cursor: "pointer" }}>
            <div style={{ width: 44, flexShrink: 0, paddingTop: 12, textAlign: "right" }}>
              <span style={{ fontSize: 9, color: "#2a2a2a", fontFamily: "monospace" }}>{b.t}</span>
            </div>
            <div style={{ width: 14, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: b.c, marginTop: 14, zIndex: 1, boxShadow: `0 0 6px ${b.c}55`, flexShrink: 0 }} />
            </div>
            <div style={{
              flex: 1,
              background: expanded === i ? "#0f0f0f" : "#0b0b0b",
              border: `1px solid ${expanded === i ? "#1f1f1f" : "#131313"}`,
              borderLeft: `2px solid ${b.c}`,
              borderRadius: 4, padding: "9px 14px", marginBottom: 2,
              transition: "all 0.15s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13 }}>{b.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#ccc", letterSpacing: "0.05em", textTransform: "uppercase" }}>{b.label}</span>
                </div>
                <span style={{ fontSize: 9, color: "#2a2a2a", fontFamily: "monospace" }}>{b.dur}</span>
              </div>
              {expanded === i && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #181818" }}>
                  <p style={{ fontSize: 11, color: "#555", margin: 0, lineHeight: 1.7, letterSpacing: "0.02em" }}>{b.note}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Habits({ habits, setHabits }) {
  const total = HABIT_GROUPS.reduce((a, g) => a + g.habits.length, 0);
  const done = Object.values(habits).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f0ead6", margin: "0 0 4px", fontSize: 24 }}>Daily Habits</h2>
          <p style={{ color: "#333", fontSize: 11, margin: 0 }}>RESETS DAILY · BUILD THE IDENTITY</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: pct === 100 ? "#22c55e" : "#d4a853", fontFamily: "'Playfair Display', Georgia, serif" }}>{pct}%</div>
          <div style={{ fontSize: 9, color: "#333", letterSpacing: "0.15em" }}>{done}/{total} DONE</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: "#141414", borderRadius: 2, marginBottom: 24 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#22c55e" : "#d4a853", borderRadius: 2, transition: "width 0.3s" }} />
      </div>

      {HABIT_GROUPS.map(g => {
        const groupDone = g.habits.filter(h => habits[h.id]).length;
        return (
          <div key={g.label} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 9, letterSpacing: "0.25em", color: g.color }}>
                {g.label}
              </div>
              <div style={{ fontSize: 9, color: groupDone === g.habits.length ? "#22c55e" : "#2a2a2a", letterSpacing: "0.1em" }}>
                {groupDone}/{g.habits.length}
              </div>
            </div>
            {g.habits.map(h => (
              <div key={h.id} onClick={() => setHabits(prev => ({ ...prev, [h.id]: !prev[h.id] }))}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                  background: habits[h.id] ? "#0e0e0e" : "#0b0b0b",
                  border: `1px solid ${habits[h.id] ? "#1a1a1a" : "#111"}`,
                  borderLeft: `2px solid ${habits[h.id] ? g.color : "#1a1a1a"}`,
                  borderRadius: 4, marginBottom: 4, cursor: "pointer", transition: "all 0.15s",
                }}>
                <div style={{
                  width: 16, height: 16, borderRadius: 3, flexShrink: 0,
                  border: `1.5px solid ${habits[h.id] ? g.color : "#252525"}`,
                  background: habits[h.id] ? g.color : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}>
                  {habits[h.id] && <span style={{ fontSize: 9, color: "#000", fontWeight: 900 }}>✓</span>}
                </div>
                <span style={{ fontSize: 11, color: habits[h.id] ? "#666" : "#444", textDecoration: habits[h.id] ? "line-through" : "none", letterSpacing: "0.02em" }}>
                  {h.icon} {h.text}
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function Goals() {
  const [expanded, setExpanded] = useState(null);
  const [goals, setGoals] = useState(GOALS);

  const toggleMilestone = (goalId, idx) => {
    setGoals(prev => prev.map(g => {
      if (g.id !== goalId) return g;
      const newDone = [...g.done];
      newDone[idx] = !newDone[idx];
      const doneCount = newDone.filter(Boolean).length;
      return { ...g, done: newDone, progress: Math.max(g.progress, Math.round((doneCount / g.milestones.length) * 100)) };
    }));
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f0ead6", margin: "0 0 4px", fontSize: 24 }}>6 Goals · 2026</h2>
        <p style={{ color: "#333", fontSize: 11, margin: 0 }}>THE MISSION. EXPAND EACH TO TRACK MILESTONES.</p>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {goals.map((g, gi) => (
          <div key={g.id}
            style={{
              background: "#0b0b0b", border: `1px solid ${expanded === gi ? "#1f1f1f" : "#131313"}`,
              borderLeft: `3px solid ${g.color}`, borderRadius: 6, overflow: "hidden",
            }}>
            {/* Header */}
            <div onClick={() => setExpanded(expanded === gi ? null : gi)} style={{
              padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16,
            }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{g.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 8, color: g.color, letterSpacing: "0.25em", marginBottom: 3 }}>{g.category}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#ccc", letterSpacing: "0.03em" }}>{g.title}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color: g.color, fontFamily: "'Playfair Display', Georgia, serif" }}>{g.progress}%</span>
                    <span style={{ color: "#2a2a2a", fontSize: 11 }}>{expanded === gi ? "▲" : "▼"}</span>
                  </div>
                </div>
                <div style={{ marginTop: 8, height: 3, background: "#161616", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: `${g.progress}%`, background: g.color, borderRadius: 2, transition: "width 0.4s" }} />
                </div>
              </div>
            </div>

            {/* Expanded */}
            {expanded === gi && (
              <div style={{ padding: "0 20px 20px", borderTop: "1px solid #161616" }}>
                <p style={{ fontSize: 11, color: "#444", margin: "14px 0 16px", lineHeight: 1.7, letterSpacing: "0.02em" }}>{g.desc}</p>
                <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "#2a2a2a", marginBottom: 10 }}>MILESTONES</div>
                {g.milestones.map((m, mi) => (
                  <div key={mi} onClick={() => toggleMilestone(g.id, mi)}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
                      background: g.done[mi] ? "#0e0e0e" : "transparent",
                      borderRadius: 4, marginBottom: 4, cursor: "pointer",
                      border: `1px solid ${g.done[mi] ? "#181818" : "transparent"}`,
                    }}>
                    <div style={{
                      width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                      border: `1.5px solid ${g.done[mi] ? g.color : "#252525"}`,
                      background: g.done[mi] ? g.color : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {g.done[mi] && <span style={{ fontSize: 8, color: "#000", fontWeight: 900 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 11, color: g.done[mi] ? "#444" : "#555", textDecoration: g.done[mi] ? "line-through" : "none" }}>{m}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Journal() {
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const [entries, setEntries] = useState([{ date: today, text: "" }]);
  const [current, setCurrent] = useState("");

  const save = () => {
    if (!current.trim()) return;
    setEntries(prev => [{ date: today, text: current }, ...prev.filter((_, i) => i > 0)]);
    setCurrent("");
  };

  const PROMPTS = [
    "What did I do today that my future self will thank me for?",
    "What was the hardest moment today, and how did I handle it?",
    "One thing I'm proud of. One thing to fix tomorrow.",
    "How close am I to becoming unrecognizable?",
    "What would the best version of me have done differently today?",
  ];
  const prompt = PROMPTS[new Date().getDate() % PROMPTS.length];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f0ead6", margin: "0 0 4px", fontSize: 24 }}>Journal</h2>
        <p style={{ color: "#333", fontSize: 11, margin: 0 }}>5 LINES MINIMUM · EVERY NIGHT · NO EXCUSES</p>
      </div>

      {/* Today's entry */}
      <div style={{ background: "#0d0d0d", border: "1px solid #161616", borderRadius: 6, padding: "20px 24px", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "#d4a853" }}>TODAY — {today.toUpperCase()}</div>
        </div>
        <div style={{ fontSize: 11, color: "#333", fontStyle: "italic", marginBottom: 14, letterSpacing: "0.02em", lineHeight: 1.6, padding: "10px 14px", background: "#0a0a0a", borderLeft: "2px solid #d4a85333", borderRadius: 3 }}>
          Prompt: {prompt}
        </div>
        <textarea
          value={current}
          onChange={e => setCurrent(e.target.value)}
          placeholder="Write freely. No judgment here."
          style={{
            width: "100%", minHeight: 120, background: "#0a0a0a", border: "1px solid #181818",
            borderRadius: 4, color: "#888", fontFamily: "'DM Mono', 'Courier New', monospace",
            fontSize: 12, padding: "12px 14px", resize: "vertical", outline: "none",
            lineHeight: 1.7, letterSpacing: "0.02em", boxSizing: "border-box",
          }}
        />
        <button onClick={save} style={{
          marginTop: 10, padding: "9px 20px", background: "#d4a853", color: "#000",
          border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'DM Mono', monospace",
          fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
        }}>
          SAVE ENTRY
        </button>
      </div>

      {/* Past entries */}
      {entries.filter(e => e.text).map((e, i) => (
        <div key={i} style={{ background: "#0a0a0a", border: "1px solid #131313", borderRadius: 6, padding: "16px 20px", marginBottom: 10 }}>
          <div style={{ fontSize: 9, color: "#2a2a2a", letterSpacing: "0.2em", marginBottom: 10 }}>{e.date.toUpperCase()}</div>
          <p style={{ fontSize: 12, color: "#444", margin: 0, lineHeight: 1.8, fontFamily: "'DM Mono', monospace", whiteSpace: "pre-wrap" }}>{e.text}</p>
        </div>
      ))}

      {entries.filter(e => e.text).length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 9, color: "#1f1f1f", letterSpacing: "0.2em" }}>NO PAST ENTRIES YET</div>
          <div style={{ fontSize: 10, color: "#1a1a1a", marginTop: 6 }}>Write tonight. Future Sam will read this.</div>
        </div>
      )}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("overview");
  const [habits, setHabits] = useState(() => {
    const init = {};
    HABIT_GROUPS.forEach(g => g.habits.forEach(h => { init[h.id] = false; }));
    return init;
  });

  const pages = { overview: <Overview habits={habits} onNav={setActive} />, schedule: <Schedule />, habits: <Habits habits={habits} setHabits={setHabits} />, goals: <Goals />, journal: <Journal /> };

  return (
    <div style={{ fontFamily: "'DM Mono', 'Courier New', monospace", background: "#080808", minHeight: "100vh", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } 
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 2px; }
        textarea:focus { border-color: #d4a85355 !important; }
      `}</style>

      <Sidebar active={active} setActive={setActive} />

      <main style={{ marginLeft: 200, flex: 1, padding: "36px 40px", maxWidth: "calc(100% - 200px)", overflowX: "hidden" }}>
        <div style={{ maxWidth: 720 }}>
          {pages[active]}
        </div>
      </main>
    </div>
  );
}
