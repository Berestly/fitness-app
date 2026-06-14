// ─── WORKOUT ROUTINES ────────────────────────────────────────────────────────

export const ROUTINE_TEMPLATES = {
  PPL: {
    id: 'PPL',
    name: 'Push / Pull / Legs',
    description: '6-day split hitting each muscle 2× per week',
    schedule: ['Push','Pull','Legs','Push','Pull','Legs'],
    days: {
      Push: { label: 'Push Day — Chest, Shoulders, Triceps', color: 'blue' },
      Pull: { label: 'Pull Day — Back, Biceps, Rear Delts', color: 'teal' },
      Legs: { label: 'Legs Day — Quads, Hamstrings, Glutes, Calves', color: 'purple' },
    },
    phases: [
      { id: 'ph1', label: 'Phase 1 — Foundation', weeks: 'Weeks 1–4', tip: 'Rest 90 sec between sets. Focus on form — no ego lifting.' },
      { id: 'ph2', label: 'Phase 2 — Intensification', weeks: 'Weeks 5–8', tip: 'Rest 2 min on compounds. RPE 8 — last 2 reps should be tough.' },
    ],
    exercises: {
      Push: {
        ph1: [
          { id: 'pp1', name: 'Barbell Bench Press', sets: '3×10', target: 'Moderate weight', note: 'Full ROM, control descent' },
          { id: 'pp2', name: 'Incline Dumbbell Press', sets: '3×12', target: 'Moderate', note: '3-sec eccentric' },
          { id: 'pp3', name: 'Dumbbell Shoulder Press', sets: '3×12', target: 'Moderate', note: 'Control at bottom' },
          { id: 'pp4', name: 'Cable Lateral Raises', sets: '3×15', target: 'Light', note: 'No swinging' },
          { id: 'pp5', name: 'Tricep Rope Pushdown', sets: '3×15', target: 'Moderate', note: 'Squeeze at bottom' },
          { id: 'pp6', name: 'Overhead Tricep Extension', sets: '2×15', target: 'Light–moderate', note: '' },
        ],
        ph2: [
          { id: 'pp7', name: 'Barbell Bench Press', sets: '4×6', target: '+5 kg vs Phase 1', note: 'Strength focus' },
          { id: 'pp8', name: 'Incline Dumbbell Press', sets: '4×8', target: '+2 kg vs Phase 1', note: '' },
          { id: 'pp9', name: 'Machine Chest Fly', sets: '3×15', target: 'Full stretch', note: '' },
          { id: 'pp10', name: 'Arnold Press', sets: '4×10', target: 'Moderate', note: 'Full rotation' },
          { id: 'pp11', name: 'Lateral Raise Superset', sets: '3×15+15', target: 'Drop set', note: 'Cable then DB' },
          { id: 'pp12', name: 'Weighted Tricep Dips', sets: '3×10', target: 'BW or +5 kg', note: '' },
        ],
      },
      Pull: {
        ph1: [
          { id: 'pl1', name: 'Barbell Row', sets: '3×10', target: 'Moderate', note: 'Keep back flat' },
          { id: 'pl2', name: 'Lat Pulldown', sets: '3×12', target: 'Moderate', note: 'Pull to upper chest' },
          { id: 'pl3', name: 'Seated Cable Row', sets: '3×12', target: 'Moderate', note: 'Squeeze shoulder blades' },
          { id: 'pl4', name: 'Face Pulls', sets: '3×15', target: 'Light', note: 'Rear delt health' },
          { id: 'pl5', name: 'Dumbbell Bicep Curl', sets: '3×12', target: 'Moderate', note: '' },
          { id: 'pl6', name: 'Hammer Curl', sets: '2×12', target: 'Moderate', note: 'Brachialis dev.' },
        ],
        ph2: [
          { id: 'pl7', name: 'Weighted Pull-up', sets: '4×6', target: 'BW or assisted', note: 'Best back builder' },
          { id: 'pl8', name: 'Barbell Row', sets: '4×8', target: '+2.5 kg vs Phase 1', note: '' },
          { id: 'pl9', name: 'Chest-Supported Row', sets: '3×12', target: 'Moderate', note: 'Removes lower-back load' },
          { id: 'pl10', name: 'Straight Arm Pulldown', sets: '3×15', target: 'Moderate', note: 'Lat isolation' },
          { id: 'pl11', name: 'Face Pulls', sets: '4×15', target: 'Moderate', note: '' },
          { id: 'pl12', name: 'Barbell Curl 21s', sets: '3×21', target: 'Moderate', note: '7 lower + 7 upper + 7 full' },
        ],
      },
      Legs: {
        ph1: [
          { id: 'lg1', name: 'Barbell Back Squat', sets: '3×10', target: 'Moderate', note: 'Hit parallel' },
          { id: 'lg2', name: 'Romanian Deadlift', sets: '3×10', target: 'Moderate', note: 'Feel hamstring stretch' },
          { id: 'lg3', name: 'Leg Press', sets: '3×12', target: 'Moderate', note: 'Feet shoulder-width' },
          { id: 'lg4', name: 'Leg Curl (machine)', sets: '3×12', target: 'Moderate', note: '' },
          { id: 'lg5', name: 'Leg Extension', sets: '3×15', target: 'Moderate', note: '' },
          { id: 'lg6', name: 'Standing Calf Raise', sets: '4×20', target: 'BW or light bar', note: 'Full range' },
        ],
        ph2: [
          { id: 'lg7', name: 'Barbell Back Squat', sets: '4×6', target: '+5 kg vs Phase 1', note: 'Spotter advised' },
          { id: 'lg8', name: 'Bulgarian Split Squat', sets: '3×10 each', target: 'Light DB', note: 'Balance first' },
          { id: 'lg9', name: 'Romanian Deadlift', sets: '4×8', target: '+5 kg vs Phase 1', note: '' },
          { id: 'lg10', name: 'Leg Press', sets: '4×8', target: '+load vs Phase 1', note: '' },
          { id: 'lg11', name: 'Leg Curl Superset', sets: '3×12+12', target: 'Heavy + drop', note: '' },
          { id: 'lg12', name: 'Calf Raise', sets: '5×20', target: 'Max weight for 20', note: '' },
        ],
      },
    },
  },

  UpperLower: {
    id: 'UpperLower',
    name: 'Upper / Lower',
    description: '4-day split, great for intermediate lifters',
    schedule: ['Upper','Lower','Rest','Upper','Lower','Rest','Rest'],
    days: {
      Upper: { label: 'Upper Body — Chest, Back, Shoulders, Arms', color: 'blue' },
      Lower: { label: 'Lower Body — Quads, Hamstrings, Glutes, Calves', color: 'purple' },
    },
    phases: [
      { id: 'ph1', label: 'Phase 1 — Hypertrophy', weeks: 'Weeks 1–4', tip: 'Higher reps (8–15), moderate weight, 60–90 sec rest.' },
      { id: 'ph2', label: 'Phase 2 — Strength', weeks: 'Weeks 5–8', tip: 'Lower reps (4–6), heavier weight, 2–3 min rest.' },
    ],
    exercises: {
      Upper: {
        ph1: [
          { id: 'ul1', name: 'Bench Press', sets: '4×10', target: 'Moderate', note: 'Controlled descent' },
          { id: 'ul2', name: 'Barbell Row', sets: '4×10', target: 'Moderate', note: 'Neutral spine' },
          { id: 'ul3', name: 'Overhead Press', sets: '3×10', target: 'Moderate', note: '' },
          { id: 'ul4', name: 'Pull-ups / Lat Pulldown', sets: '3×10', target: 'BW or stack', note: '' },
          { id: 'ul5', name: 'Dumbbell Lateral Raise', sets: '3×15', target: 'Light', note: '' },
          { id: 'ul6', name: 'Bicep Curl', sets: '3×12', target: 'Moderate', note: '' },
          { id: 'ul7', name: 'Tricep Pushdown', sets: '3×12', target: 'Moderate', note: '' },
        ],
        ph2: [
          { id: 'ul8', name: 'Bench Press', sets: '5×5', target: '+5 kg vs Phase 1', note: 'Strength priority' },
          { id: 'ul9', name: 'Barbell Row', sets: '5×5', target: '+5 kg vs Phase 1', note: '' },
          { id: 'ul10', name: 'Overhead Press', sets: '4×6', target: '+2.5 kg vs Phase 1', note: '' },
          { id: 'ul11', name: 'Weighted Pull-up', sets: '4×5', target: 'Add belt weight', note: '' },
          { id: 'ul12', name: 'Face Pulls', sets: '3×15', target: 'Moderate', note: 'Rotator cuff health' },
          { id: 'ul13', name: 'Bicep Curl', sets: '3×8', target: '+weight vs Phase 1', note: '' },
          { id: 'ul14', name: 'Skull Crushers', sets: '3×8', target: 'Moderate', note: '' },
        ],
      },
      Lower: {
        ph1: [
          { id: 'lo1', name: 'Squat', sets: '4×10', target: 'Moderate', note: 'ATG if mobility allows' },
          { id: 'lo2', name: 'Romanian Deadlift', sets: '4×10', target: 'Moderate', note: '' },
          { id: 'lo3', name: 'Leg Press', sets: '3×12', target: 'Moderate', note: '' },
          { id: 'lo4', name: 'Leg Curl', sets: '3×12', target: 'Moderate', note: '' },
          { id: 'lo5', name: 'Leg Extension', sets: '3×15', target: 'Moderate', note: '' },
          { id: 'lo6', name: 'Calf Raise', sets: '4×20', target: 'BW+', note: 'Full stretch' },
        ],
        ph2: [
          { id: 'lo7', name: 'Squat', sets: '5×5', target: '+5 kg vs Phase 1', note: '' },
          { id: 'lo8', name: 'Deadlift', sets: '4×4', target: 'Heavy', note: 'Main strength lift' },
          { id: 'lo9', name: 'Bulgarian Split Squat', sets: '3×8 each', target: 'Moderate DB', note: '' },
          { id: 'lo10', name: 'Leg Curl', sets: '4×8', target: '+weight vs Phase 1', note: '' },
          { id: 'lo11', name: 'Calf Raise (weighted)', sets: '4×15', target: 'Heavy', note: '' },
        ],
      },
    },
  },

  FullBody: {
    id: 'FullBody',
    name: 'Full Body',
    description: '3-day whole-body routine, ideal for beginners',
    schedule: ['Full Body','Rest','Full Body','Rest','Full Body','Rest','Rest'],
    days: {
      'Full Body': { label: 'Full Body — All Muscle Groups', color: 'amber' },
    },
    phases: [
      { id: 'ph1', label: 'Phase 1 — Learning', weeks: 'Weeks 1–4', tip: 'Focus on movement patterns. 3 sets per exercise, 10–12 reps.' },
      { id: 'ph2', label: 'Phase 2 — Progressive', weeks: 'Weeks 5–8', tip: 'Add weight when top of rep range feels easy. Log every session.' },
    ],
    exercises: {
      'Full Body': {
        ph1: [
          { id: 'fb1', name: 'Squat (goblet or barbell)', sets: '3×10', target: 'Light–moderate', note: 'Master the movement first' },
          { id: 'fb2', name: 'Bench Press / Push-up', sets: '3×10', target: 'Moderate', note: '' },
          { id: 'fb3', name: 'Barbell Row / DB Row', sets: '3×10', target: 'Moderate', note: 'Flat back' },
          { id: 'fb4', name: 'Overhead Press', sets: '3×10', target: 'Light', note: '' },
          { id: 'fb5', name: 'Pull-up / Lat Pulldown', sets: '3×8', target: 'Assisted or stack', note: '' },
          { id: 'fb6', name: 'Plank', sets: '3×30s', target: 'Bodyweight', note: 'Core stability' },
        ],
        ph2: [
          { id: 'fb7', name: 'Barbell Squat', sets: '4×8', target: '+load vs Phase 1', note: '' },
          { id: 'fb8', name: 'Bench Press', sets: '4×8', target: '+load vs Phase 1', note: '' },
          { id: 'fb9', name: 'Deadlift', sets: '3×6', target: 'Moderate–heavy', note: 'Add this in Phase 2' },
          { id: 'fb10', name: 'Overhead Press', sets: '3×8', target: '+load vs Phase 1', note: '' },
          { id: 'fb11', name: 'Pull-up (weighted or BW)', sets: '3×6', target: 'Challenge sets', note: '' },
          { id: 'fb12', name: 'Romanian Deadlift', sets: '3×10', target: 'Moderate', note: 'Hamstring focus' },
          { id: 'fb13', name: 'Ab Wheel / Plank Variation', sets: '3×45s', target: 'BW', note: '' },
        ],
      },
    },
  },

  PHUL: {
    id: 'PHUL',
    name: 'PHUL',
    description: 'Power Hypertrophy Upper Lower — 4 days, strength + size',
    schedule: ['Upper Power','Lower Power','Rest','Upper Hypertrophy','Lower Hypertrophy','Rest','Rest'],
    days: {
      'Upper Power': { label: 'Upper Power — Heavy Compounds', color: 'blue' },
      'Lower Power': { label: 'Lower Power — Heavy Compounds', color: 'purple' },
      'Upper Hypertrophy': { label: 'Upper Hypertrophy — Volume Work', color: 'teal' },
      'Lower Hypertrophy': { label: 'Lower Hypertrophy — Volume Work', color: 'amber' },
    },
    phases: [
      { id: 'ph1', label: 'Phase 1 — Base Building', weeks: 'Weeks 1–4', tip: 'Learn the movement patterns on both power and hypertrophy days.' },
      { id: 'ph2', label: 'Phase 2 — Peak', weeks: 'Weeks 5–8', tip: 'Push PRs on power days; chase the pump on hypertrophy days.' },
    ],
    exercises: {
      'Upper Power': {
        ph1: [
          { id: 'ph1e1', name: 'Bench Press', sets: '3×5', target: 'Heavy', note: 'Power focus' },
          { id: 'ph1e2', name: 'Incline Bench Press', sets: '3×6', target: 'Heavy', note: '' },
          { id: 'ph1e3', name: 'Weighted Pull-up', sets: '3×5', target: 'BW or weighted', note: '' },
          { id: 'ph1e4', name: 'Barbell Row', sets: '3×5', target: 'Heavy', note: '' },
          { id: 'ph1e5', name: 'Overhead Press', sets: '3×6', target: 'Heavy', note: '' },
          { id: 'ph1e6', name: 'Barbell Curl', sets: '3×8', target: 'Moderate', note: '' },
          { id: 'ph1e7', name: 'Skull Crushers', sets: '3×8', target: 'Moderate', note: '' },
        ],
        ph2: [
          { id: 'ph2e1', name: 'Bench Press', sets: '4×4', target: '+5 kg vs Phase 1', note: '' },
          { id: 'ph2e2', name: 'Incline Bench Press', sets: '4×5', target: '+weight', note: '' },
          { id: 'ph2e3', name: 'Weighted Pull-up', sets: '4×4', target: '+belt weight', note: '' },
          { id: 'ph2e4', name: 'Barbell Row', sets: '4×4', target: '+weight', note: '' },
          { id: 'ph2e5', name: 'Overhead Press', sets: '4×5', target: '+weight', note: '' },
          { id: 'ph2e6', name: 'Barbell Curl', sets: '3×6', target: '+weight', note: '' },
          { id: 'ph2e7', name: 'Close-Grip Bench Press', sets: '3×6', target: 'Moderate–heavy', note: '' },
        ],
      },
      'Lower Power': {
        ph1: [
          { id: 'lp1e1', name: 'Squat', sets: '3×5', target: 'Heavy', note: 'Power priority' },
          { id: 'lp1e2', name: 'Deadlift', sets: '3×4', target: 'Heavy', note: '' },
          { id: 'lp1e3', name: 'Leg Press', sets: '3×8', target: 'Heavy', note: '' },
          { id: 'lp1e4', name: 'Leg Curl', sets: '3×8', target: 'Moderate', note: '' },
          { id: 'lp1e5', name: 'Calf Raise', sets: '4×12', target: 'Heavy', note: '' },
        ],
        ph2: [
          { id: 'lp2e1', name: 'Squat', sets: '4×4', target: '+5 kg vs Phase 1', note: '' },
          { id: 'lp2e2', name: 'Deadlift', sets: '4×3', target: '+5 kg vs Phase 1', note: '' },
          { id: 'lp2e3', name: 'Leg Press', sets: '4×6', target: '+load', note: '' },
          { id: 'lp2e4', name: 'Leg Curl', sets: '3×6', target: '+weight', note: '' },
          { id: 'lp2e5', name: 'Calf Raise', sets: '5×10', target: 'Heavy', note: '' },
        ],
      },
      'Upper Hypertrophy': {
        ph1: [
          { id: 'uh1e1', name: 'Incline DB Press', sets: '4×10', target: 'Moderate', note: 'Volume work' },
          { id: 'uh1e2', name: 'Flat DB Fly', sets: '3×12', target: 'Light–moderate', note: '' },
          { id: 'uh1e3', name: 'Cable Row', sets: '4×10', target: 'Moderate', note: '' },
          { id: 'uh1e4', name: 'Lat Pulldown', sets: '4×12', target: 'Moderate', note: '' },
          { id: 'uh1e5', name: 'Lateral Raises', sets: '3×15', target: 'Light', note: '' },
          { id: 'uh1e6', name: 'Dumbbell Curl', sets: '4×12', target: 'Moderate', note: '' },
          { id: 'uh1e7', name: 'Tricep Pushdown', sets: '4×12', target: 'Moderate', note: '' },
        ],
        ph2: [
          { id: 'uh2e1', name: 'Incline DB Press', sets: '4×8', target: '+weight', note: '' },
          { id: 'uh2e2', name: 'Cable Fly', sets: '4×12', target: 'Full stretch', note: '' },
          { id: 'uh2e3', name: 'Cable Row', sets: '4×10', target: '+weight', note: '' },
          { id: 'uh2e4', name: 'Straight-Arm Pulldown', sets: '3×15', target: 'Moderate', note: '' },
          { id: 'uh2e5', name: 'Lateral Raises superset', sets: '3×15+15', target: 'Drop set', note: '' },
          { id: 'uh2e6', name: 'Hammer + Dumbbell Curl superset', sets: '3×10+10', target: 'Moderate', note: '' },
          { id: 'uh2e7', name: 'Overhead Tricep Extension', sets: '3×12', target: 'Moderate', note: '' },
        ],
      },
      'Lower Hypertrophy': {
        ph1: [
          { id: 'lh1e1', name: 'Front Squat / Hack Squat', sets: '4×10', target: 'Moderate', note: 'Quad focus' },
          { id: 'lh1e2', name: 'Romanian Deadlift', sets: '4×10', target: 'Moderate', note: 'Hamstring focus' },
          { id: 'lh1e3', name: 'Leg Extension', sets: '3×15', target: 'Moderate', note: '' },
          { id: 'lh1e4', name: 'Leg Curl', sets: '3×15', target: 'Moderate', note: '' },
          { id: 'lh1e5', name: 'Standing Calf Raise', sets: '4×20', target: 'BW+', note: 'Full stretch' },
          { id: 'lh1e6', name: 'Seated Calf Raise', sets: '4×20', target: 'Moderate', note: '' },
        ],
        ph2: [
          { id: 'lh2e1', name: 'Hack Squat', sets: '4×10', target: '+load', note: '' },
          { id: 'lh2e2', name: 'Romanian Deadlift', sets: '4×8', target: '+weight', note: '' },
          { id: 'lh2e3', name: 'Leg Extension superset', sets: '3×12+12', target: 'Drop set', note: '' },
          { id: 'lh2e4', name: 'Leg Curl superset', sets: '3×12+12', target: 'Drop set', note: '' },
          { id: 'lh2e5', name: 'Donkey Calf Raise', sets: '5×15', target: 'Heavy', note: '' },
        ],
      },
    },
  },
};

// ─── TYPESCRIPT ROADMAP ──────────────────────────────────────────────────────

export const initialRoadmap = {
  title: 'TypeScript → LWC Open Source',
  subtitle: '2-month learning path to tackle Salesforce LWC open source issues',
  nodes: [
    // BASICS
    {
      id: 'ts-basics',
      phase: 'basics',
      phaseLabel: 'Basics',
      title: 'TypeScript Fundamentals',
      status: 'todo',
      duration: 'Week 1–2',
      description: 'Core TS concepts you need before anything else',
      resources: [
        { label: 'Official TS Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
        { label: 'TypeScript Deep Dive (free book)', url: 'https://basarat.gitbook.io/typescript/' },
        { label: 'Execute Program — TypeScript', url: 'https://www.executeprogram.com/courses/typescript' },
      ],
      topics: ['Types & Interfaces', 'Type Inference', 'Union & Intersection Types', 'Enums', 'Type Assertions', 'void, null, undefined'],
    },
    {
      id: 'ts-functions',
      phase: 'basics',
      phaseLabel: 'Basics',
      title: 'Functions & Classes',
      status: 'todo',
      duration: 'Week 2',
      description: 'Typed functions, overloads, classes, access modifiers',
      resources: [
        { label: 'TS Handbook — Functions', url: 'https://www.typescriptlang.org/docs/handbook/2/functions.html' },
        { label: 'TS Handbook — Classes', url: 'https://www.typescriptlang.org/docs/handbook/2/classes.html' },
      ],
      topics: ['Function Types', 'Optional & Default Params', 'Overloads', 'Classes & Inheritance', 'Access Modifiers', 'Abstract Classes'],
    },
    // INTERMEDIATE
    {
      id: 'ts-generics',
      phase: 'intermediate',
      phaseLabel: 'Intermediate',
      title: 'Generics',
      status: 'todo',
      duration: 'Week 3',
      description: 'The most powerful TS feature — essential for OSS contributions',
      resources: [
        { label: 'TS Handbook — Generics', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html' },
        { label: 'Matt Pocock — TS Generics Workshop', url: 'https://www.totaltypescript.com/workshops/typescript-generics' },
      ],
      topics: ['Generic Functions', 'Generic Interfaces', 'Generic Constraints', 'keyof & typeof', 'Mapped Types', 'Conditional Types'],
    },
    {
      id: 'ts-utility',
      phase: 'intermediate',
      phaseLabel: 'Intermediate',
      title: 'Utility Types & Type Manipulation',
      status: 'todo',
      duration: 'Week 3–4',
      description: 'Built-in helpers + building your own',
      resources: [
        { label: 'TS Handbook — Utility Types', url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html' },
        { label: 'Total TypeScript Tips', url: 'https://www.totaltypescript.com/tips' },
      ],
      topics: ['Partial, Required, Readonly', 'Pick, Omit, Exclude', 'Record, ReturnType', 'Infer keyword', 'Template Literal Types'],
    },
    {
      id: 'ts-modules',
      phase: 'intermediate',
      phaseLabel: 'Intermediate',
      title: 'Modules & Declaration Files',
      status: 'todo',
      duration: 'Week 4',
      description: 'How TS handles modules, .d.ts files, and tsconfig',
      resources: [
        { label: 'TS Handbook — Modules', url: 'https://www.typescriptlang.org/docs/handbook/2/modules.html' },
        { label: 'TS Config Reference', url: 'https://www.typescriptlang.org/tsconfig' },
      ],
      topics: ['ES Modules in TS', 'Declaration Files .d.ts', 'DefinitelyTyped @types', 'tsconfig.json deep-dive', 'Module Resolution'],
    },
    // LWC / OSS
    {
      id: 'js-web',
      phase: 'lwc-prep',
      phaseLabel: 'LWC Prep',
      title: 'Web Components & LWC Basics',
      status: 'todo',
      duration: 'Week 5',
      description: 'Understand the platform before reading OSS source code',
      resources: [
        { label: 'LWC Developer Guide', url: 'https://developer.salesforce.com/docs/component-library/documentation/en/lwc' },
        { label: 'LWC GitHub Repo', url: 'https://github.com/salesforce/lwc' },
        { label: 'Web Components MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_components' },
      ],
      topics: ['Custom Elements API', 'Shadow DOM', 'LWC Component Lifecycle', 'Decorators (@api, @track)', 'LWC Wire Service', 'Events in LWC'],
    },
    {
      id: 'oss-workflow',
      phase: 'lwc-prep',
      phaseLabel: 'LWC Prep',
      title: 'Open Source Contribution Workflow',
      status: 'todo',
      duration: 'Week 5–6',
      description: 'Git workflow, reading issues, PRs — standard OSS process',
      resources: [
        { label: 'LWC Contributing Guide', url: 'https://github.com/salesforce/lwc/blob/master/CONTRIBUTING.md' },
        { label: 'First Contributions Guide', url: 'https://github.com/firstcontributions/first-contributions' },
        { label: 'How to Read Source Code', url: 'https://www.youtube.com/watch?v=W5oGpnGCR4w' },
      ],
      topics: ['Fork & Clone workflow', 'Reading GitHub Issues', 'Understanding Changelogs', 'Writing a good PR', 'Test-first approach', 'Responding to review comments'],
    },
    {
      id: 'lwc-source',
      phase: 'lwc-oss',
      phaseLabel: 'LWC OSS',
      title: 'Reading LWC Source Code',
      status: 'todo',
      duration: 'Week 6–7',
      description: 'Navigate the monorepo, understand the compiler & engine',
      resources: [
        { label: 'LWC Monorepo Structure', url: 'https://github.com/salesforce/lwc/tree/master/packages' },
        { label: 'LWC Engine Package', url: 'https://github.com/salesforce/lwc/tree/master/packages/%40lwc/engine-core' },
        { label: 'LWC Compiler Package', url: 'https://github.com/salesforce/lwc/tree/master/packages/%40lwc/babel-plugin-component' },
      ],
      topics: ['Monorepo with Yarn Workspaces', 'Package: @lwc/engine-core', 'Package: @lwc/compiler', 'Package: @lwc/template-compiler', 'Test Suite (Jest)', 'Build with rollup'],
    },
    {
      id: 'first-issue',
      phase: 'lwc-oss',
      phaseLabel: 'LWC OSS',
      title: 'Tackle Your First Issue',
      status: 'todo',
      duration: 'Week 7–8',
      description: 'Find a good-first-issue, fix it, raise a PR',
      resources: [
        { label: 'LWC Good First Issues', url: 'https://github.com/salesforce/lwc/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22' },
        { label: 'LWC Bug Issues', url: 'https://github.com/salesforce/lwc/issues?q=is%3Aissue+is%3Aopen+label%3Abug' },
        { label: 'How to write tests for LWC', url: 'https://lwc.dev/guide/unit_testing_using_jest' },
      ],
      topics: ['Filter "good first issue" label', 'Reproduce the bug locally', 'Write a failing test first', 'Fix → make test pass', 'Open PR with clear description', 'Address review feedback'],
    },
  ],
};

// ─── APP DEFAULTS ─────────────────────────────────────────────────────────────

export const initialAppState = {
  activeRoutine: 'PPL',
  userRoutines: {},          // overrides per routine (user edits)
  roadmap: initialRoadmap,
  workoutCheckIns: [],
};
