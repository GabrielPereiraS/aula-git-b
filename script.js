const userData = {
  siteTitle: 'Meus Terços',
  name: 'Seu Nome',
  city: 'Sua Cidade/UF',
  bio: 'Breve descrição sobre você e seus terços.',
  whatsapp: '', // Ex.: 5598999999999
  instagram: '', // Ex.: https://instagram.com/seuusuario ou @seuusuario
  email: '' // Ex.: seuemail@exemplo.com
};

const rosaries = [
  {
    id: 'ex-1',
    title: 'Terço de madeira',
    material: 'Madeira',
    color: 'Marrom',
    description: 'Feito à mão, contas de madeira e crucifixo metálico.',
    imageUrl: ''
  },
  {
    id: 'ex-2',
    title: 'Terço de cristal',
    material: 'Cristal',
    color: 'Transparente',
    description: 'Conta facetada que brilha ao sol.',
    imageUrl: ''
  }
];

function setTextOrHide(elementId, text) {
  const element = document.getElementById(elementId);
  if (!element) return;
  if (text && String(text).trim().length > 0) {
    element.textContent = text;
    element.hidden = false;
  } else {
    element.hidden = true;
  }
}

function buildWhatsappLink(numberOrUrl) {
  if (!numberOrUrl) return null;
  const value = String(numberOrUrl).trim();
  if (value.startsWith('http')) return value;
  const digits = value.replace(/\D/g, '');
  if (digits.length >= 10) return `https://wa.me/${digits}`;
  return null;
}

function buildInstagramLink(handleOrUrl) {
  if (!handleOrUrl) return null;
  const value = String(handleOrUrl).trim();
  if (value.startsWith('http')) return value;
  const handle = value.startsWith('@') ? value.slice(1) : value;
  if (!handle) return null;
  return `https://instagram.com/${handle}`;
}

function buildEmailLink(email) {
  if (!email) return null;
  const value = String(email).trim();
  if (!value.includes('@')) return null;
  return `mailto:${value}`;
}

function getInitials(name) {
  if (!name) return 'T';
  const parts = String(name).trim().split(/\s+/);
  const initials = parts.slice(0, 2).map(p => p[0].toUpperCase()).join('');
  return initials || 'T';
}

function renderUserInfo() {
  document.getElementById('siteTitle').textContent = userData.siteTitle || 'Meus Terços';
  setTextOrHide('nome', userData.name);
  setTextOrHide('cidade', userData.city);
  setTextOrHide('bio', userData.bio);
  const avatar = document.getElementById('avatar');
  if (avatar) avatar.textContent = getInitials(userData.name);

  const year = new Date().getFullYear();
  document.getElementById('ano').textContent = String(year);
  document.getElementById('footerNome').textContent = userData.name || '';

  const whatsappLink = buildWhatsappLink(userData.whatsapp);
  const instagramLink = buildInstagramLink(userData.instagram);
  const emailLink = buildEmailLink(userData.email);

  const w = document.getElementById('whatsappLink');
  const i = document.getElementById('instagramLink');
  const e = document.getElementById('emailLink');
  if (w) { if (whatsappLink) { w.href = whatsappLink; w.hidden = false; } else { w.hidden = true; } }
  if (i) { if (instagramLink) { i.href = instagramLink; i.hidden = false; } else { i.hidden = true; } }
  if (e) { if (emailLink) { e.href = emailLink; e.hidden = false; } else { e.hidden = true; } }
}

function createRosaryCard(item) {
  const card = document.createElement('article');
  card.className = 'item-card';
  const media = document.createElement('div');
  media.className = 'item-media';
  if (item.imageUrl) {
    const img = document.createElement('img');
    img.alt = item.title || 'Terço';
    img.src = item.imageUrl;
    media.appendChild(img);
  } else {
    media.textContent = (item.title || 'T').slice(0, 1).toUpperCase();
  }

  const body = document.createElement('div');
  body.className = 'item-body';

  const title = document.createElement('h3');
  title.className = 'item-title';
  title.textContent = item.title || 'Terço';

  const meta = document.createElement('div');
  meta.className = 'item-meta';
  const parts = [];
  if (item.material) parts.push(item.material);
  if (item.color) parts.push(item.color);
  meta.textContent = parts.join(' • ');

  const desc = document.createElement('p');
  desc.className = 'item-desc';
  desc.textContent = item.description || '';

  body.appendChild(title);
  body.appendChild(meta);
  body.appendChild(desc);

  card.appendChild(media);
  card.appendChild(body);
  return card;
}

function renderGallery(list) {
  const grid = document.getElementById('grid');
  const empty = document.getElementById('semResultados');
  if (!grid || !empty) return;
  grid.innerHTML = '';
  if (!list || list.length === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  list.forEach(item => grid.appendChild(createRosaryCard(item)));
}

function setupSearch() {
  const input = document.getElementById('busca');
  if (!input) return;
  const normalize = (s) => String(s || '').toLowerCase();
  input.addEventListener('input', () => {
    const q = normalize(input.value);
    if (q.length === 0) {
      renderGallery(rosaries);
      return;
    }
    const filtered = rosaries.filter(r =>
      normalize(r.title).includes(q) ||
      normalize(r.material).includes(q) ||
      normalize(r.color).includes(q) ||
      normalize(r.description).includes(q)
    );
    renderGallery(filtered);
  });
}

function init() {
  renderUserInfo();
  renderGallery(rosaries);
  setupSearch();
}

document.addEventListener('DOMContentLoaded', init);