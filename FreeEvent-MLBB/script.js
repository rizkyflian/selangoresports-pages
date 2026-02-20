// ── Isi dari Config ──
document.getElementById('elJudul').textContent       = T.judul;
document.getElementById('elDeskripsi').textContent   = T.deskripsi;
document.getElementById('elTombol').textContent      = T.tombol;
document.getElementById('claimBtn').href             = CLAIM_URL;
document.getElementById('claimCount').textContent    = AWAL_KLAIM.toLocaleString('id-ID');
document.querySelector('.limited-badge').textContent = T.badge;
document.querySelector('.countdown').innerHTML       = `${T.berakhir} <span id="timer" class="timer-text">23:59:59</span>`;
document.querySelector('.social-proof').innerHTML    = `🔥 <span id="claimCount">${AWAL_KLAIM.toLocaleString('id-ID')}</span> ${T.sosial}`;

// Isi ticker dari array config (duplikat untuk seamless loop)
const track = document.getElementById('tickerTrack');
[...TICKER_LIST, ...TICKER_LIST].forEach(teks => {
    const span = document.createElement('span');
    span.textContent = teks;
    track.appendChild(span);
});


// ── Fade In on Load ──
const topText     = document.getElementById('topText');
const characters  = document.getElementById('characters');
const claimSection = document.getElementById('claimSection');

setTimeout(() => {
    topText.classList.add('fade-in');
    characters.classList.add('fade-in');
    claimSection.classList.add('fade-in');
}, 100);


// ── Countdown Timer ──
function startCountdown() {
    const key = 'ml_countdown_end';
    let endTime = sessionStorage.getItem(key);
    if (!endTime) {
        endTime = Date.now() + DURASI_JAM * 60 * 60 * 1000;
        sessionStorage.setItem(key, endTime);
    }
    const timerEl = document.getElementById('timer');
    function update() {
        const diff = endTime - Date.now();
        if (diff <= 0) { timerEl.textContent = '00:00:00'; return; }
        const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
        const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
        const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
        timerEl.textContent = `${h}:${m}:${s}`;
    }
    update();
    setInterval(update, 1000);
}
startCountdown();


// ── Claim Count naik pelan ──
function animateClaimCount() {
    const el = document.getElementById('claimCount');
    let base = AWAL_KLAIM;
    setInterval(() => {
        base += Math.floor(Math.random() * 3) + 1;
        el.textContent = base.toLocaleString('id-ID');
    }, Math.random() * 7000 + 8000);
}
animateClaimCount();