/* ============================================================
   WEDDING DATA — single source of truth
   Edit this file to update names, date, venue, RSVP, etc.
   ============================================================ */

window.weddingData = {
  groom: "Marco Atif",
  bride: "Nadeen Assem",
  monogram: "M & N",

  // ISO date used by the countdown — keep in sync with the display date below.
  // Explicit +03:00 offset: Egypt observes EEST (UTC+3) through Oct 29, 2026.
  weddingDateISO: "2026-10-11T19:00:00+03:00",
  weddingDateDisplay: "October 11, 2026",

  ceremonyTime: "7:00 PM",
  ceremonyLabel: "St. George Church in Sohag",

  receptionTime: "8:00 PM",
  receptionLabel: "Reception",

  venue: "El Qasr Hall",
  // Leave empty ("") to hide the "View Location" button gracefully.
  locationUrl: "https://maps.app.goo.gl/9cKFK7KEmhV9C5VF6?g_st=iw",

  

  musicPath: "assets/music/ambient.mp3",

  couplePhotos: {
    groom: "assets/images/groom-solo.jpg",
    bride: "assets/images/bride-solo.jpg",
    together: "assets/images/couple-night.jpg"
  },

  galleryPhotos: [
    { src: "assets/images/couple-formal.jpg", alt: "Marco and Nadeen together, formal portrait" },
    { src: "assets/images/couple-candid.jpg", alt: "A candid, joyful moment between Marco and Nadeen" },
    { src: "assets/images/couple-church.jpg", alt: "Marco and Nadeen at the church" },
    { src: "assets/images/bride-solo.jpg", alt: "Nadeen by the water at night" },
    { src: "assets/images/groom-solo.jpg", alt: "Marco, portrait" },
    { src: "assets/images/couple-night.jpg", alt: "Marco and Nadeen on the terrace at dusk" }
  ]
};
