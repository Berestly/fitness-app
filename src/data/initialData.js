export const initialData = {
  overview: {
    stats: [
      { id: "s1", label: "Body weight", value: "72.2 kg", sub: "Starting point" },
      { id: "s2", label: "Body fat", value: "23%", sub: "~16.6 kg fat mass" },
      { id: "s3", label: "Lean mass", value: "55.6 kg", sub: "To protect & build" },
      { id: "s4", label: "Daily calories", value: "1,980", sub: "~500 kcal deficit" },
      { id: "s5", label: "Daily protein", value: "160 g", sub: "Muscle preservation" },
      { id: "s6", label: "Target loss", value: "3–4 kg", sub: "Over 8 weeks" }
    ],
    phases: [
      { id: "p1", phase: "Phase 1", weeks: "Weeks 1–4", focus: "Foundation — learn lifts, establish deficit", calories: "1,980 kcal" },
      { id: "p2", phase: "Phase 2", weeks: "Weeks 5–8", focus: "Intensification — increase volume & progressive overload", calories: "1,900 kcal" }
    ],
    schedule: [
      { day: "Mon", type: "push", label: "Push" },
      { day: "Tue", type: "pull", label: "Pull" },
      { day: "Wed", type: "legs", label: "Legs" },
      { day: "Thu", type: "cardio", label: "Cardio" },
      { day: "Fri", type: "push", label: "Push" },
      { day: "Sat", type: "pull", label: "Pull" },
      { day: "Sun", type: "rest", label: "Rest" }
    ]
  },
  training: {
    push: {
      label: "Push day (chest, shoulders, triceps)",
      "1-2": [
        { id: "e1", name: "Barbell bench press", sets: "3×10", target: "Bar + 10 kg each side", note: "Focus on form, full ROM" },
        { id: "e2", name: "Incline dumbbell press", sets: "3×12", target: "10 kg dumbbells", note: "Slow 3-sec eccentric" },
        { id: "e3", name: "Dumbbell shoulder press", sets: "3×12", target: "8 kg dumbbells", note: "Control at bottom" },
        { id: "e4", name: "Cable lateral raises", sets: "3×15", target: "5 kg each side", note: "No swinging" },
        { id: "e5", name: "Tricep rope pushdown", sets: "3×15", target: "15 kg stack", note: "Squeeze at bottom" },
        { id: "e6", name: "Overhead tricep extension", sets: "2×15", target: "10 kg dumbbell", note: "" }
      ],
      "3-4": [
        { id: "e7", name: "Barbell bench press", sets: "4×8", target: "+2.5 kg vs wk 1–2", note: "Add weight if 10 reps felt easy" },
        { id: "e8", name: "Incline dumbbell press", sets: "4×10", target: "+2 kg dumbbells", note: "" },
        { id: "e9", name: "Dumbbell shoulder press", sets: "3×10", target: "+2 kg dumbbells", note: "" },
        { id: "e10", name: "Cable lateral raises", sets: "4×12", target: "+2.5 kg", note: "" },
        { id: "e11", name: "Tricep rope pushdown", sets: "4×12", target: "+5 kg stack", note: "" },
        { id: "e12", name: "Overhead tricep extension", sets: "3×12", target: "+2.5 kg", note: "" }
      ],
      "5-6": [
        { id: "e13", name: "Barbell bench press", sets: "4×6", target: "+5 kg total vs wk 3–4", note: "Heavier load, strength focus" },
        { id: "e14", name: "Incline dumbbell press", sets: "4×8", target: "+2 kg vs wk 3–4", note: "" },
        { id: "e15", name: "Machine chest fly", sets: "3×15", target: "Moderate weight, full stretch", note: "Swap one dumbbell exercise" },
        { id: "e16", name: "Arnold press", sets: "4×10", target: "Same weight as DB press wk 3–4", note: "Rotation adds shoulder volume" },
        { id: "e17", name: "Lateral raise superset", sets: "3×15+15", target: "Cable + dumbbell drop set", note: "" },
        { id: "e18", name: "Tricep dips (weighted)", sets: "3×10", target: "BW or +5 kg belt", note: "" }
      ],
      "7-8": [
        { id: "e19", name: "Barbell bench press", sets: "5×5", target: "+2.5 kg vs wk 5–6", note: "Personal record attempt week 8" },
        { id: "e20", name: "Incline dumbbell press", sets: "4×8", target: "+2 kg vs wk 5–6", note: "" },
        { id: "e21", name: "Machine chest fly", sets: "3×12", target: "+weight vs wk 5–6", note: "" },
        { id: "e22", name: "Arnold press", sets: "4×8", target: "+2 kg vs wk 5–6", note: "" },
        { id: "e23", name: "Lateral raise superset", sets: "4×15+15", target: "+2.5 kg each", note: "" },
        { id: "e24", name: "Tricep dips (weighted)", sets: "4×8", target: "+5 kg vs wk 5–6", note: "" }
      ]
    },
    pull: {
      label: "Pull day (back, biceps, rear delts)",
      "1-2": [
        { id: "p1e1", name: "Barbell / dumbbell row", sets: "3×10", target: "Barbell: 20 kg total OR DB: 14 kg", note: "Keep back flat" },
        { id: "p1e2", name: "Lat pulldown", sets: "3×12", target: "35–40 kg stack", note: "Pull to upper chest" },
        { id: "p1e3", name: "Seated cable row", sets: "3×12", target: "30 kg stack", note: "Squeeze shoulder blades" },
        { id: "p1e4", name: "Face pulls", sets: "3×15", target: "10 kg stack", note: "Rear delt & rotator cuff health" },
        { id: "p1e5", name: "Dumbbell bicep curl", sets: "3×12", target: "8 kg each", note: "" },
        { id: "p1e6", name: "Hammer curl", sets: "2×12", target: "8 kg each", note: "Brachialis development" }
      ],
      "3-4": [
        { id: "p2e1", name: "Barbell row", sets: "4×8", target: "+5 kg vs wk 1–2", note: "" },
        { id: "p2e2", name: "Lat pulldown", sets: "4×10", target: "+5 kg stack", note: "" },
        { id: "p2e3", name: "Seated cable row", sets: "4×10", target: "+5 kg stack", note: "" },
        { id: "p2e4", name: "Face pulls", sets: "3×15", target: "+2.5 kg", note: "" },
        { id: "p2e5", name: "Barbell bicep curl", sets: "3×10", target: "20 kg total bar", note: "Swap DB for variety" },
        { id: "p2e6", name: "Hammer curl", sets: "3×12", target: "+2 kg", note: "" }
      ],
      "5-6": [
        { id: "p3e1", name: "Weighted pull-up / assisted", sets: "4×6", target: "BW or -10 kg assist", note: "Best back builder" },
        { id: "p3e2", name: "Barbell row", sets: "4×8", target: "+2.5 kg vs wk 3–4", note: "" },
        { id: "p3e3", name: "Chest-supported row", sets: "3×12", target: "Add if available", note: "Removes lower back fatigue" },
        { id: "p3e4", name: "Straight arm pulldown", sets: "3×15", target: "15 kg stack", note: "Lat isolation" },
        { id: "p3e5", name: "Face pulls", sets: "4×15", target: "+2.5 kg", note: "" },
        { id: "p3e6", name: "Barbell curl superset", sets: "3×10+10", target: "Full curl + 21s", note: "" }
      ],
      "7-8": [
        { id: "p4e1", name: "Weighted pull-up", sets: "4×6", target: "+5 kg belt vs wk 5–6", note: "Or reduce assist by 10 kg" },
        { id: "p4e2", name: "Barbell row", sets: "5×5", target: "+5 kg vs wk 5–6", note: "" },
        { id: "p4e3", name: "Chest-supported row", sets: "4×10", target: "+weight vs wk 5–6", note: "" },
        { id: "p4e4", name: "Straight arm pulldown", sets: "3×15", target: "+5 kg stack", note: "" },
        { id: "p4e5", name: "Face pulls", sets: "4×15", target: "Same, perfect form", note: "" },
        { id: "p4e6", name: "Barbell curl superset", sets: "4×10+10", target: "+2.5 kg bar", note: "" }
      ]
    },
    legs: {
      label: "Legs day (quads, hamstrings, glutes, calves)",
      "1-2": [
        { id: "l1e1", name: "Barbell back squat", sets: "3×10", target: "Bar + 10 kg each side", note: "Depth over weight — hit parallel" },
        { id: "l1e2", name: "Romanian deadlift", sets: "3×10", target: "40 kg total", note: "Feel hamstring stretch" },
        { id: "l1e3", name: "Leg press", sets: "3×12", target: "60 kg sled", note: "Feet shoulder-width, high foot" },
        { id: "l1e4", name: "Leg curl (machine)", sets: "3×12", target: "20 kg stack", note: "" },
        { id: "l1e5", name: "Leg extension", sets: "3×15", target: "20 kg stack", note: "" },
        { id: "l1e6", name: "Standing calf raise", sets: "4×20", target: "BW or light barbell", note: "Full range — don't bounce" }
      ],
      "3-4": [
        { id: "l2e1", name: "Barbell back squat", sets: "4×8", target: "+5 kg vs wk 1–2", note: "" },
        { id: "l2e2", name: "Romanian deadlift", sets: "4×8", target: "+5 kg vs wk 1–2", note: "" },
        { id: "l2e3", name: "Leg press", sets: "4×10", target: "+10 kg sled", note: "" },
        { id: "l2e4", name: "Leg curl", sets: "4×10", target: "+5 kg stack", note: "" },
        { id: "l2e5", name: "Leg extension", sets: "3×12", target: "+5 kg stack", note: "" },
        { id: "l2e6", name: "Calf raise (seated)", sets: "4×20", target: "+10 kg", note: "Swap to seated" }
      ],
      "5-6": [
        { id: "l3e1", name: "Barbell back squat", sets: "4×6", target: "+5 kg vs wk 3–4", note: "Go heavier, spotter advised" },
        { id: "l3e2", name: "Bulgarian split squat", sets: "3×10 each", target: "8 kg dumbbells", note: "Add for leg symmetry" },
        { id: "l3e3", name: "Romanian deadlift", sets: "4×8", target: "+5 kg vs wk 3–4", note: "" },
        { id: "l3e4", name: "Leg press", sets: "4×8", target: "+10 kg vs wk 3–4", note: "" },
        { id: "l3e5", name: "Leg curl", sets: "4×10", target: "+2.5 kg", note: "" },
        { id: "l3e6", name: "Calf raise (weighted)", sets: "4×20", target: "Machine or barbell +10 kg", note: "" }
      ],
      "7-8": [
        { id: "l4e1", name: "Barbell back squat", sets: "5×5", target: "+5 kg vs wk 5–6", note: "Week 8 = max attempt" },
        { id: "l4e2", name: "Bulgarian split squat", sets: "4×8 each", target: "+2 kg dumbbells", note: "" },
        { id: "l4e3", name: "Romanian deadlift", sets: "4×6", target: "+5 kg vs wk 5–6", note: "" },
        { id: "l4e4", name: "Leg press", sets: "3×12", target: "Drop to hypertrophy rep range", note: "" },
        { id: "l4e5", name: "Leg curl superset", sets: "3×12+12", target: "Heavy + drop set", note: "" },
        { id: "l4e6", name: "Calf raise", sets: "5×20", target: "Max weight for 20", note: "" }
      ]
    }
  },
  nutrition: {
    proteinSources: [
      { id: "n1", food: "Chicken breast (cooked)", amount: "250 g", protein: "~57 g", calories: "~275 kcal" },
      { id: "n2", food: "Whole eggs", amount: "4 (avg)", protein: "~28 g", calories: "~280 kcal" },
      { id: "n3", food: "ON Whey (1 scoop)", amount: "~30 g", protein: "~24 g", calories: "~130 kcal" }
    ],
    ricePortions: [
      { id: "r1", meal: "Rice per serving", gymDay: "150 g cooked (½ cup dry)", restDay: "100 g cooked", notes: "Weigh after cooking" },
      { id: "r2", meal: "Daily rice max", gymDay: "2 servings = 300 g cooked", restDay: "1 serving = 100 g cooked", notes: "~1 bowl = ~150 g cooked" },
      { id: "r3", meal: "Dosa (plain)", gymDay: "2 medium dosas", restDay: "1 medium dosa", notes: "No butter/ghee on cut" },
      { id: "r4", meal: "Dosa (set dosa)", gymDay: "3 pieces", restDay: "2 pieces", notes: "Sambar > coconut chutney" },
      { id: "r5", meal: "Idli", gymDay: "3–4 pieces", restDay: "2–3 pieces", notes: "Good pre-workout" }
    ],
    mealPlan: [
      { id: "m1", time: "7:00 AM", meal: "3–4 eggs + 1 dosa or 2 idli", protein: "~22 g", calories: "~380 kcal" },
      { id: "m2", time: "Pre-workout (30 min before)", meal: "1 banana + 1 scoop ON Whey in water", protein: "~24 g", calories: "~220 kcal" },
      { id: "m3", time: "Post-workout", meal: "150 g cooked rice + 150 g chicken + sabzi", protein: "~45 g", calories: "~520 kcal" },
      { id: "m4", time: "3:00 PM", meal: "100 g paneer or 1 cup dal + small portion rice", protein: "~22 g", calories: "~350 kcal" },
      { id: "m5", time: "7:00 PM", meal: "100 g chicken + salad + curd (100 g)", protein: "~30 g", calories: "~310 kcal" },
      { id: "m6", time: "Before bed", meal: "1 scoop ON Whey + water", protein: "~24 g", calories: "~130 kcal" }
    ],
    oils: [
      { id: "o1", item: "Cooking oil (sunflower/groundnut)", limit: "1 tsp per meal max", tip: "Use non-stick pan to cut oil" },
      { id: "o2", item: "Ghee", limit: "½ tsp max (skip if possible)", tip: "Save for maintenance phase" },
      { id: "o3", item: "Coconut chutney", limit: "1 tbsp (small portion)", tip: "High in saturated fat" },
      { id: "o4", item: "Sambar", limit: "Unlimited", tip: "Protein + fibre bonus from dal" }
    ]
  },
  hairCare: {
    stats: [
      { id: "hs1", label: "Current issue", value: "Dry scalp", sub: "+ dandruff concern" },
      { id: "hs2", label: "Products", value: "2 shampoos", sub: "Satinique + Himalaya" },
      { id: "hs3", label: "Wash frequency", value: "2–3×/wk", sub: "Optimal for dry scalp" }
    ],
    routine: [
      { id: "hr1", day: "Monday", action: "Scalp oil massage + wash", product: "Coconut or almond oil — 1 hr before; wash with Satinique" },
      { id: "hr2", day: "Wednesday", action: "Wash only", product: "Himalaya Anti-Dandruff — focus lather on scalp, 2 min contact time" },
      { id: "hr3", day: "Friday", action: "Light oil + wash", product: "30-min oil soak; wash with Satinique" },
      { id: "hr4", day: "Other days", action: "Water-only rinse if needed", product: "No shampoo — avoids over-stripping" }
    ],
    dos: [
      { id: "d1", text: "Alternate Satinique (moisture) and Himalaya (anti-dandruff) each week" },
      { id: "d2", text: "Oil scalp 1 hr before every wash — not overnight (traps bacteria)" },
      { id: "d3", text: "Use lukewarm water — hot water worsens dryness" },
      { id: "d4", text: "Pat dry, never rub with towel" },
      { id: "d5", text: "Take omega-3 (flaxseed/fish oil) — helps dry scalp from inside" },
      { id: "d6", text: "Stay hydrated — especially important during your cut" }
    ],
    donts: [
      { id: "dn1", text: "Don't use both shampoos in the same wash" },
      { id: "dn2", text: "No overnight oiling — clogs follicles" },
      { id: "dn3", text: "Don't wash daily — strips natural oils" },
      { id: "dn4", text: "No harsh sulphate shampoos on off-days" },
      { id: "dn5", text: "Don't skip conditioning if using anti-dandruff shampoo" },
      { id: "dn6", text: "Avoid very hot showers (bad for scalp and recovery)" }
    ]
  }
};
