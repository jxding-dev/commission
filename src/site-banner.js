// 관리자(admin.html)에서 설정한 접수 상태·공지를 사이트 전역에 반영한다.
// data/pricing.json을 읽어: (1) 공지 배너를 상단에 삽입, (2) [data-site-status] 요소를 갱신.
// 실패해도 페이지에는 영향이 없다.
(function () {
  try {
    var lang = (document.documentElement.lang || 'ko').toLowerCase();
    var isJa = lang.indexOf('ja') === 0;

    var STATUS = {
      OPEN: isJa ? '受付中' : '접수 중',
      CLOSED: isJa ? '受付終了' : '마감',
      PREPARING: isJa ? '準備中' : '준비 중',
    };

    fetch('./data/pricing.json?t=' + Date.now())
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (d) {
        if (!d) return;

        var st = String(d.status || 'PREPARING').toUpperCase();
        var label = STATUS[st] || STATUS.PREPARING;

        // 상태 배지/텍스트 갱신
        var els = document.querySelectorAll('[data-site-status]');
        for (var i = 0; i < els.length; i++) {
          els[i].textContent = label;
          els[i].classList.remove('status--open', 'status--closed');
          if (st === 'OPEN') els[i].classList.add('status--open');
          else if (st === 'CLOSED') els[i].classList.add('status--closed');
        }

        // 공지 배너 — 공지가 있거나, 접수 상태가 오픈/마감이면 노출
        var text = String((isJa ? d.announcementJa : d.announcement) || '').trim();
        if (!text) {
          if (st === 'OPEN') text = isJa ? '現在、受付中です。' : '현재 커미션 접수 중입니다.';
          else if (st === 'CLOSED') text = isJa ? '現在、受付を終了しています。' : '현재 커미션 접수가 마감되었습니다.';
        }
        if (text) {
          var main = document.getElementById('main') || document.body;
          if (main.querySelector('.site-banner')) return;
          var bar = document.createElement('div');
          bar.className = 'site-banner';
          bar.setAttribute('role', 'status');
          var inner = document.createElement('div');
          inner.className = 'container site-banner__inner';
          var pill = document.createElement('span');
          pill.className = 'site-banner__pill';
          pill.textContent = label;
          var span = document.createElement('span');
          span.className = 'site-banner__text';
          span.textContent = text;
          inner.appendChild(pill);
          inner.appendChild(span);
          bar.appendChild(inner);
          main.insertBefore(bar, main.firstChild);
        }
      })
      .catch(function () {});
  } catch (e) {}
})();
