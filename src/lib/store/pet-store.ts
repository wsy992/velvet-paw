"use client";

export interface PetProfile {
  id: string;
  name: string;
  breed: string;
  gender: "male" | "female";
  birthday: string; // ISO date
  avatar: string;
  color: string;
  weight: number;
}

export interface TimelineEvent {
  id: string;
  type: "vaccine" | "deworming" | "weight" | "checkup" | "note" | "food" | "water" | "sleep";
  date: string;
  title: string;
  description: string;
  value?: number;
  unit?: string;
}

export const DEFAULT_PET: PetProfile = {
  id: "1",
  name: "奶盖",
  breed: "短腿长毛拿破仑猫",
  gender: "male",
  birthday: "2026-01-01",
  avatar: "",
  color: "银白色",
  weight: 2.5,
};

export const DEFAULT_EVENTS: TimelineEvent[] = [
  {
    id: "2",
    type: "deworming",
    date: "2026-06-15",
    title: "驱虫记录",
    description: "已进行体内外驱虫（大宠爱）。",
  },
  {
    id: "1",
    type: "vaccine",
    date: "2026-05-20",
    title: "第一针疫苗",
    description: "猫三联第一针，一切正常。",
  },
  {
    id: "3",
    type: "checkup",
    date: "2026-04-01",
    title: "首次体检",
    description: "身体健康，活泼好动。",
  },
  {
    id: "4",
    type: "weight",
    date: "2026-03-15",
    title: "体重记录",
    description: "健康成长中",
    value: 1.8,
    unit: "kg",
  },
];

const PET_KEY = "velvet-paw-pet";
const EVENTS_KEY = "velvet-paw-events";

// Module state — hydrated from localStorage on first access (client only)
let petData: PetProfile = { ...DEFAULT_PET };
let eventsData: TimelineEvent[] = [...DEFAULT_EVENTS];
let hydrated = false;

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const savedPet = localStorage.getItem(PET_KEY);
    if (savedPet) petData = { ...DEFAULT_PET, ...JSON.parse(savedPet) };
    const savedEvents = localStorage.getItem(EVENTS_KEY);
    if (savedEvents) {
      const parsed = JSON.parse(savedEvents);
      if (Array.isArray(parsed)) eventsData = parsed;
    }
  } catch {}
}

function persistPet() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PET_KEY, JSON.stringify(petData));
  } catch {}
}

function persistEvents() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(eventsData));
  } catch {}
}

function genId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getPet(): PetProfile {
  hydrate();
  return { ...petData };
}

export function updatePet(updates: Partial<PetProfile>): PetProfile {
  hydrate();
  petData = { ...petData, ...updates };
  persistPet();
  return getPet();
}

export function getEvents(): TimelineEvent[] {
  hydrate();
  return [...eventsData].sort((a, b) => parseDate(b.date) - parseDate(a.date));
}

export function addEvent(event: Omit<TimelineEvent, "id">): TimelineEvent {
  hydrate();
  const newEvent: TimelineEvent = { ...event, id: genId() };
  eventsData = [newEvent, ...eventsData];
  persistEvents();
  return newEvent;
}

export function updateEvent(id: string, updates: Partial<Omit<TimelineEvent, "id">>): TimelineEvent | null {
  hydrate();
  const index = eventsData.findIndex((e) => e.id === id);
  if (index === -1) return null;
  eventsData[index] = { ...eventsData[index], ...updates };
  persistEvents();
  return { ...eventsData[index] };
}

export function deleteEvent(id: string): boolean {
  hydrate();
  const index = eventsData.findIndex((e) => e.id === id);
  if (index === -1) return false;
  eventsData.splice(index, 1);
  persistEvents();
  return true;
}

/** Parse a YYYY-MM-DD string as local time (avoids Date's UTC-midnight pitfall). */
function parseDate(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  if (y && m && d) return new Date(y, m - 1, d).getTime();
  const t = new Date(dateStr).getTime();
  return isNaN(t) ? 0 : t;
}
