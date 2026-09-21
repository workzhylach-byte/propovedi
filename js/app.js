function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function iconDownload() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>';
}
function iconYoutube() {
  return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3.2-.4-4.7a3 3 0 0 0-2.1-2.1C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.5.4A3 3 0 0 0 2.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7a3 3 0 0 0 2.1 2.1c1.6.4 7.5.4 7.5.4s5.9 0 7.5-.4a3 3 0 0 0 2.1-2.1C22 15.2 22 12 22 12z"/><path d="M10 15.5v-7l6 3.5-6 3.5z" fill="#fff"/></svg>';
}
function iconFile() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>';
}

function render() {
  const hash = window.location.hash || '#/';
  const app = document.getElementById('app');
  const match = hash.match(/^#\/preacher\/([\w-]+)$/);

  if (match) {
    const preacher = DATA.preachers.find(p => p.id === match[1]);
    if (!preacher) { window.location.hash = '#/'; return; }
    renderPreacherPage(app, preacher);
  } else {
    renderHome(app);
  }
  window.scrollTo(0, 0);
}

function renderHome(app) {
  app.innerHTML = '';

  const eyebrow = document.createElement('div');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = 'Библиотека проповедей';
  app.appendChild(eyebrow);

  const h1 = document.createElement('h1');
  h1.className = 'page-heading';
  h1.textContent = 'Проповедники';
  app.appendChild(h1);

  const grid = document.createElement('div');
  grid.className = 'preacher-grid';

  if (DATA.preachers.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Проповедники пока не добавлены.';
    app.appendChild(empty);
    return;
  }

  DATA.preachers.forEach(p => {
    const card = document.createElement('a');
    card.className = 'preacher-card';
    card.href = '#/preacher/' + p.id;

    const photoWrap = document.createElement('div');
    photoWrap.className = 'photo-wrap';
    const img = document.createElement('img');
    img.src = p.photo;
    img.alt = p.name;
    photoWrap.appendChild(img);

    const badge = document.createElement('div');
    badge.className = 'badge';
    const count = p.sermons.length;
    badge.textContent = count + (count % 10 === 1 && count % 100 !== 11 ? ' проповедь' : (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20) ? ' проповеди' : ' проповедей'));
    photoWrap.appendChild(badge);

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = p.name;

    card.appendChild(photoWrap);
    card.appendChild(name);
    grid.appendChild(card);
  });

  app.appendChild(grid);
}

function renderPreacherPage(app, preacher) {
  app.innerHTML = '';

  const back = document.createElement('a');
  back.className = 'back-link';
  back.href = '#/';
  back.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg> Все проповедники';
  app.appendChild(back);

  const headerRow = document.createElement('div');
  headerRow.className = 'preacher-header';
  const photoWrap = document.createElement('div');
  photoWrap.className = 'photo-wrap';
  const img = document.createElement('img');
  img.src = preacher.photo;
  img.alt = preacher.name;
  photoWrap.appendChild(img);
  const nameWrap = document.createElement('div');
  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = preacher.name;
  const role = document.createElement('div');
  role.className = 'role';
  role.textContent = 'Служитель церкви «Мир с Богом»';
  nameWrap.appendChild(name);
  nameWrap.appendChild(role);
  headerRow.appendChild(photoWrap);
  headerRow.appendChild(nameWrap);
  app.appendChild(headerRow);

  const list = document.createElement('div');
  list.className = 'sermon-list';

  if (preacher.sermons.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Проповедей пока не добавлено.';
    list.appendChild(empty);
  }

  const sorted = [...preacher.sermons].sort((a, b) => {
    const parse = d => {
      const [dd, mm, yyyy] = d.split('.').map(Number);
      return new Date(yyyy, mm - 1, dd).getTime();
    };
    return parse(b.date) - parse(a.date);
  });

  sorted.forEach((s) => {
    const card = document.createElement('div');
    card.className = 'sermon-card';

    const row = document.createElement('div');
    row.className = 'row';

    const info = document.createElement('div');
    info.className = 'info';
    const date = document.createElement('div');
    date.className = 'date';
    date.textContent = s.date;
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = s.title;
    info.appendChild(date);
    info.appendChild(title);

    const chevron = document.createElement('div');
    chevron.className = 'chevron';
    chevron.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';

    row.appendChild(info);
    row.appendChild(chevron);
    card.appendChild(row);

    const bodyOuter = document.createElement('div');
    bodyOuter.className = 'sermon-body';
    const bodyInner = document.createElement('div');
    bodyInner.className = 'inner';

    const hasText = s.text && s.text.length > 0;
    const hasAudio = !!(s.audio && s.audio.download);

    // --- actions row (top): download audio / download pdf / youtube link ---
    const actions = document.createElement('div');
    actions.className = 'actions-row';

    if (hasAudio) {
      const a = document.createElement('a');
      a.className = 'action-btn';
      a.href = s.audio.download;
      a.target = '_blank';
      a.rel = 'noopener';
      a.innerHTML = iconDownload() + ' Скачать аудио';
      a.addEventListener('click', e => e.stopPropagation());
      actions.appendChild(a);
    }
    if (s.pdf) {
      const a = document.createElement('a');
      a.className = 'action-btn primary';
      a.href = s.pdf;
      a.setAttribute('download', s.pdfName || '');
      a.innerHTML = iconFile() + ' Скачать проповедь (PDF)';
      a.addEventListener('click', e => e.stopPropagation());
      actions.appendChild(a);
    }
    if (s.youtube) {
      const a = document.createElement('a');
      a.className = 'action-btn youtube';
      a.href = s.youtube;
      a.target = '_blank';
      a.rel = 'noopener';
      a.innerHTML = iconYoutube() + ' Смотреть на YouTube';
      a.addEventListener('click', e => e.stopPropagation());
      actions.appendChild(a);
    }
    if (actions.children.length > 0) bodyInner.appendChild(actions);

    // --- cover image ---
    if (s.cover) {
      const coverWrap = document.createElement('div');
      coverWrap.className = 'sermon-cover';
      const coverImg = document.createElement('img');
      coverImg.src = s.cover;
      coverImg.alt = s.title;
      coverWrap.appendChild(coverImg);
      bodyInner.appendChild(coverWrap);
    }

    // --- text only ---
    if (hasText) {
      const textDiv = document.createElement('div');
      textDiv.className = 'sermon-text';
      let textHtml = '';
      s.text.forEach(block => {
        if (block.type === 'h') textHtml += '<h3>' + esc(block.text) + '</h3>';
        else textHtml += '<p>' + esc(block.text) + '</p>';
      });
      textDiv.innerHTML = textHtml;
      bodyInner.appendChild(textDiv);
    } else {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'Текст проповеди пока не добавлен.';
      bodyInner.appendChild(empty);
    }

    bodyOuter.appendChild(bodyInner);
    card.appendChild(bodyOuter);

    card.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      document.querySelectorAll('.sermon-card.open').forEach(c => {
        c.classList.remove('open');
        c.querySelector('.sermon-body').classList.remove('open');
      });
      if (!isOpen) {
        card.classList.add('open');
        bodyOuter.classList.add('open');
      }
    });

    list.appendChild(card);
  });

  app.appendChild(list);
}

window.addEventListener('hashchange', render);
render();
