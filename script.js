// ============================================================
// 株式会社SANSEIパウロウニア・トメントサ — 共通スクリプト
// 作成: 2026-07-22
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- ナビ：スクロール検知で背景を透過→半透明クリームに ---------- */
  const navi = document.querySelector('.navi');
  if (navi) {
    const toggleScrolled = () => {
      if (window.scrollY > 40) {
        navi.classList.add('is-scrolled');
      } else {
        navi.classList.remove('is-scrolled');
      }
    };
    toggleScrolled();
    window.addEventListener('scroll', toggleScrolled, { passive: true });
  }

  /* ---------- ナビ：ハンバーガーメニュー（モバイル） ---------- */
  const menuButton = document.querySelector('.navi-menu-button');
  const naviLinks = document.querySelector('.navi-links');
  if (menuButton && naviLinks) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.classList.toggle('is-open');
      naviLinks.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // メニュー内のリンクをクリックしたら閉じる
    naviLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuButton.classList.remove('is-open');
        naviLinks.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- 現在ページのナビリンクをハイライト ---------- */
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navi-links a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) link.classList.add('is-active');
  });

  /* ---------- フェードインアニメーション（IntersectionObserver） ---------- */
  const fadeTargets = document.querySelectorAll('.fade-in');
  if (fadeTargets.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .15, rootMargin: '0px 0px -60px 0px' });
    fadeTargets.forEach(el => observer.observe(el));
  }

  /* ---------- FAQアコーディオン ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      // 他のFAQを閉じる（同時に1つだけ開く挙動）
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });

});
