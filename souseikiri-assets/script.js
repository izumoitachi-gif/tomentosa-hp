// スクロールアニメーション
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.feat-card, .loc-card, .num-item, .timeline-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// 写真スライドショー（自動再生 3秒）
document.querySelectorAll('.photo-slider').forEach(slider => {
  let cur = 0;
  let timer;
  const imgs = slider.querySelectorAll('.slide-img');
  const dots = slider.querySelectorAll('.dot');

  function go(idx) {
    imgs[cur].classList.remove('active');
    if (dots[cur]) dots[cur].classList.remove('active');
    cur = (idx + imgs.length) % imgs.length;
    imgs[cur].classList.add('active');
    if (dots[cur]) dots[cur].classList.add('active');
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => go(cur + 1), 3000);
  }

  slider.querySelector('.slide-prev')?.addEventListener('click', () => { go(cur - 1); startAuto(); });
  slider.querySelector('.slide-next')?.addEventListener('click', () => { go(cur + 1); startAuto(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { go(i); startAuto(); }));

  startAuto();
});

// 地拵え動画 順番再生（音なし・自動）
const jikoshiraVideo = document.getElementById('jikoshira-video');
if (jikoshiraVideo) {
  const srcs = ['videos/jikoshira-1.mp4', 'videos/jikoshira-2.mp4', 'videos/jikoshira-3.mp4'];
  const vdots = document.querySelectorAll('.vdot');
  let vcur = 0;

  jikoshiraVideo.addEventListener('ended', () => {
    if (vdots[vcur]) vdots[vcur].classList.remove('active');
    vcur = (vcur + 1) % srcs.length;
    jikoshiraVideo.src = srcs[vcur];
    if (vdots[vcur]) vdots[vcur].classList.add('active');
    jikoshiraVideo.play();
  });
}
