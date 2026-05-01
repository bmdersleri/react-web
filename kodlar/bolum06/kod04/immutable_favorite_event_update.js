function toggleFavoriteEvent(events, selectedEventId) {
  return events.map((event) => {
    if (event.id !== selectedEventId) {
      return event;
    }

    return {
      ...event,
      isFavorite: !event.isFavorite
    };
  });
}

const events = [
  { id: "spring", title: "Bahar Şenliği", isFavorite: false },
  { id: "career", title: "Kariyer Günü", isFavorite: false }
];

const updatedEvents = toggleFavoriteEvent(events, "spring");

for (const event of updatedEvents) {
  const label = event.isFavorite ? "favorite" : "normal";
  console.log(`${event.title}: ${label}`);
}

console.log(`same array: ${events === updatedEvents}`);
