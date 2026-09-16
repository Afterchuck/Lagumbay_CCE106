import { createContext, type PropsWithChildren, useContext, useMemo, useState } from 'react';

export type CampusEvent = {
  id: string;
  title: string;
  category: 'Academic' | 'Campus Life' | 'Sports';
  dateTime: string;
  venue: string;
  availableSlots: number;
  joined: boolean;
};

const initialEvents: CampusEvent[] = [
  { id: '1', title: 'CSIT Fest 2026', category: 'Academic', dateTime: 'Sep 20, 2026 · 10:00 AM', venue: 'UM Visayan', availableSlots: 42, joined: false },
  { id: '2', title: 'Intrams Parade 2026', category: 'Campus Life', dateTime: 'Sep 22, 2026 · 9:00 AM', venue: 'UM Arellano', availableSlots: 80, joined: true },
  { id: '3', title: 'UI/UX Competition', category: 'Academic', dateTime: 'Oct 24, 2027 · 1:00 PM', venue: 'UM Visayan', availableSlots: 30, joined: false },
  { id: '4', title: 'Database Competition', category: 'Academic', dateTime: 'Oct 24, 2026 · 1:00 PM', venue: 'UM Visayan', availableSlots: 25, joined: false },
  { id: '5', title: 'CSIT Basketball', category: 'Sports', dateTime: 'Oct 24, 2027 · 1:00 PM', venue: 'UM Visayan', availableSlots: 25, joined: false },
];

type EventMateContextValue = {
  events: CampusEvent[];
  studentName: string;
  setStudentName: (name: string) => void;
  toggleJoined: (id: string) => void;
};

const EventMateContext = createContext<EventMateContextValue | undefined>(undefined);

export function EventMateProvider({ children }: PropsWithChildren) {
  const [events, setEvents] = useState(initialEvents);
  const [studentName, setStudentName] = useState('Johnrie O. Lagumbay');

  const value = useMemo(
    () => ({
      events,
      studentName,
      setStudentName,
      toggleJoined: (id: string) => setEvents((current) => current.map((event) => {
        if (event.id !== id) return event;
        return {
          ...event,
          joined: !event.joined,
          availableSlots: event.joined ? event.availableSlots + 1 : event.availableSlots - 1,
        };
      })),
    }),
    [events, studentName],
  );

  return <EventMateContext.Provider value={value}>{children}</EventMateContext.Provider>;
}

export function useEventMate() {
  const context = useContext(EventMateContext);
  if (!context) throw new Error('useEventMate must be used inside EventMateProvider');
  return context;
}
