"use client";

import { useState } from "react";
import { ProfileHeader } from "@/components/profile/profile-header";
import { Timeline } from "@/components/profile/timeline";
import { EventModal } from "@/components/profile/event-modal";
import { AlbumView } from "@/components/album/album-view";
import { getPet, getEvents, addEvent, updateEvent, deleteEvent, TimelineEvent } from "@/lib/store/pet-store";

const filters = [
  { key: "", label: "全部" },
  { key: "vaccine", label: "疫苗" },
  { key: "deworming", label: "驱虫" },
  { key: "weight", label: "体重" },
  { key: "note", label: "笔记" },
];

export default function ProfilePage() {
  const [activeFilter, setActiveFilter] = useState("");
  const [view, setView] = useState<"timeline" | "album">("timeline");
  const [pet] = useState(getPet);
  const [events, setEvents] = useState(getEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);

  const refreshEvents = () => setEvents([...getEvents()]);

  const handleSave = (eventData: Omit<TimelineEvent, "id">) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
    refreshEvents();
  };

  const handleEdit = (event: TimelineEvent) => {
    setEditingEvent(event);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("确定删除这条记录吗？")) {
      deleteEvent(id);
      refreshEvents();
    }
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setModalOpen(true);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 w-full z-40 bg-background-warm/90 glass shadow-sm pt-[max(0.5rem,env(safe-area-inset-top))] pb-stack-sm px-margin-mobile flex justify-between items-center">
        <h1 className="font-headline-md text-headline-md text-primary">档案</h1>
        <button className="spring-press text-primary hover:opacity-80">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      <main className="max-w-3xl mx-auto pt-20 px-margin-mobile pb-24">
        <ProfileHeader pet={pet} />

        {/* Segmented control: Timeline / Album */}
        <div className="flex bg-surface-container rounded-full p-1 mb-stack-lg max-w-[280px] mx-auto">
          {([
            { key: "timeline", label: "成长时间轴", icon: "timeline" },
            { key: "album", label: "成长相册", icon: "photo_library" },
          ] as const).map((seg) => (
            <button
              key={seg.key}
              onClick={() => setView(seg.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full font-label-lg text-label-lg transition-all duration-200 spring-press ${
                view === seg.key
                  ? "bg-primary-container text-on-primary-container shadow-sm"
                  : "text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{seg.icon}</span>
              {seg.label}
            </button>
          ))}
        </div>

        {view === "timeline" ? (
          <>
            {/* Filter Tabs */}
            <section className="flex overflow-x-auto gap-stack-sm pb-2 mb-stack-lg snap-x no-scrollbar">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`px-6 py-2 rounded-full snap-start whitespace-nowrap font-label-lg text-label-lg transition-all duration-200 ${
                    activeFilter === f.key
                      ? "bg-primary-container text-on-primary-container shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </section>

            <Timeline
              events={events}
              filter={activeFilter || undefined}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {/* FAB */}
            <button
              onClick={openAddModal}
              className="fixed bottom-24 right-6 bg-primary text-on-primary rounded-full px-6 py-4 flex items-center gap-2 shadow-[0_8px_16px_rgba(255,140,66,0.3)] hover:scale-105 transition-transform duration-300 z-40 spring-press"
            >
              <span className="material-symbols-outlined">add</span>
              <span className="font-label-lg text-label-lg">添加记录</span>
            </button>
          </>
        ) : (
          <AlbumView />
        )}
      </main>

      {/* Event Modal — key forces fresh state every open / per-event edit */}
      <EventModal
        key={`${editingEvent?.id ?? "new"}-${modalOpen}`}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSave}
        editEvent={editingEvent}
      />
    </>
  );
}
