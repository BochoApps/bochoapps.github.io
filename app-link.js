// Android visitors are offered the Tantealo app (Google Play) once the app is live: the row under the Tantealo card
// is shown only on Android browsers and only when data-app-live is "true" (switched on the day the app is published).
// iPhone and desktop never see it. The "Google Play" link opens the app if installed and falls back to the Play listing.
(function () {
  var row = document.getElementById("tantealo-app")
  if (!row || row.getAttribute("data-app-live") !== "true") return
  var ua = navigator.userAgent
  if (!/Android/i.test(ua) || /;\s*wv\)/i.test(ua)) return
  var play = encodeURIComponent("https://play.google.com/store/apps/details?id=com.bochoapps.tantealo")
  document.getElementById("play-btn").href =
    "intent://bochoapps.com/tantealo/#Intent;scheme=https;package=com.bochoapps.tantealo;S.browser_fallback_url=" + play + ";end"
  row.hidden = false
})()
