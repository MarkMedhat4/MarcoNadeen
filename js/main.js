/* ============================================================
   MAIN — fills repeated wedding details from the single config,
   wires the WhatsApp RSVP and the "copy details" action
   ============================================================ */
(function () {
  const data = window.weddingData;
  if (!data) return;

  const fieldValues = {
    groom: data.groom,
    bride: data.bride,
    monogram: data.monogram,
    date: data.weddingDateDisplay,
    ceremonyTime: data.ceremonyTime,
    ceremonyLabel: data.ceremonyLabel,
    receptionTime: data.receptionTime,
    receptionLabel: data.receptionLabel,
    venue: data.venue,
    year: new Date().getFullYear(),
  };

  document.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.getAttribute("data-field");
    if (key in fieldValues) el.textContent = fieldValues[key];
  });

  // WhatsApp RSVP links
  const rsvpLink = document.getElementById("whatsapp-rsvp");
  if (rsvpLink) {
    rsvpLink.href =
      "https://wa.me/" +
      data.whatsappNumber +
      "?text=" +
      encodeURIComponent(data.whatsappMessage);
  }
  const declineLink = document.getElementById("whatsapp-decline");
  if (declineLink) {
    declineLink.href =
      "https://wa.me/" +
      data.whatsappNumber +
      "?text=" +
      encodeURIComponent(data.whatsappDeclineMessage);
  }

  // Venue location — hide gracefully if no real URL is configured
  const locationLink = document.getElementById("venue-directions");
  if (locationLink) {
    if (data.locationUrl) {
      locationLink.href = data.locationUrl;
    } else {
      locationLink.style.display = "none";
    }
  }

  // Copy wedding details to clipboard
  const copyBtn = document.getElementById("copy-details");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const text = `${data.groom} & ${data.bride}\n${data.weddingDateDisplay}\n${data.ceremonyLabel}: ${data.ceremonyTime}\n${data.receptionLabel}: ${data.receptionTime} — ${data.venue}`;
      try {
        await navigator.clipboard.writeText(text);
        window.showToast("Details copied");
      } catch (err) {
        window.showToast("Couldn't copy — please note the details manually");
      }
    });
  }
})();
