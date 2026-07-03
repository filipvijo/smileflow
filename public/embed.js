(function () {
  "use strict";
  var script = document.currentScript;
  if (!script) return;

  var clinic = script.getAttribute("data-clinic");
  if (!clinic) {
    console.error("[SmileFlow] Missing data-clinic attribute on embed script.");
    return;
  }
  var lang = script.getAttribute("data-lang") || "";
  var booking = script.getAttribute("data-booking") || "";

  var base;
  try {
    base = new URL(script.src).origin;
  } catch (e) {
    console.error("[SmileFlow] Could not resolve widget origin.");
    return;
  }

  var src = base + "/embed/" + encodeURIComponent(clinic);
  var qs = [];
  if (lang) qs.push("lang=" + encodeURIComponent(lang));
  if (booking) qs.push("booking=" + encodeURIComponent(booking));
  if (qs.length) src += "?" + qs.join("&");

  var iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.title = "AI Smile Analysis";
  iframe.style.width = "100%";
  iframe.style.maxWidth = "640px";
  iframe.style.height = "720px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "24px";
  iframe.style.display = "block";
  iframe.style.margin = "0 auto";
  iframe.setAttribute("allow", "clipboard-write");
  iframe.setAttribute("loading", "lazy");

  script.parentNode.insertBefore(iframe, script.nextSibling);

  window.addEventListener("message", function (event) {
    if (event.origin !== base) return;
    var data = event.data;
    if (data && data.type === "smileflow:height" && typeof data.height === "number") {
      iframe.style.height = Math.max(420, Math.min(data.height, 2400)) + "px";
    }
  });
})();
