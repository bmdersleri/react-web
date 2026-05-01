const initialAnnouncements = {
  items: [
    { id: "a1", title: "Vize takvimi yayımlandı" },
    { id: "a2", title: "Kariyer günü başvuruları" },
    { id: "a3", title: "Kütüphane çalışma saatleri" },
  ],
  readIds: [],
  pinnedIds: [],
};

function uniqueAdd(list, id) {
  return list.includes(id) ? list : [...list, id];
}

function announcementsReducer(state = initialAnnouncements, action) {
  switch (action.type) {
    case "announcements/markAsRead":
      return { ...state, readIds: uniqueAdd(state.readIds, action.payload) };
    case "announcements/pin":
      return { ...state, pinnedIds: uniqueAdd(state.pinnedIds, action.payload) };
    default:
      return state;
  }
}

const afterRead = announcementsReducer(initialAnnouncements, {
  type: "announcements/markAsRead",
  payload: "a1",
});

const afterPin = announcementsReducer(afterRead, {
  type: "announcements/pin",
  payload: "a3",
});

const unreadCount = afterPin.items.length - afterPin.readIds.length;
console.log(`unread: ${unreadCount} | pinned: ${afterPin.pinnedIds.length}`);
