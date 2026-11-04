(function () {
  const c = CONFIG;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  const zap = `https://wa.me/${c.whatsapp}?text=${encodeURIComponent("Olá! Vi o site da " + c.nome + " e gostaria de um orçamento.")}`;

  $("hero-local").textContent = c.local;
  $("hero-titulo").textContent = c.titulo;
  $("hero-sub").textContent = c.subtitulo;
  $("sobre").textContent = c.sobre;
  $("btn-whats").href = zap;
  $("btn-insta").href = c.instagram;
  $("btn-google").href = c.google.link;
  $("ano").textContent = new Date().getFullYear();

  $("lista-servicos").innerHTML = c.servicos.map((s) =>
    `<article class="card"><div class="card__icon">${s.icone}</div><h3>${esc(s.titulo)}</h3><p>${esc(s.texto)}</p></article>`
  ).join("");

  $("lista-diferenciais").innerHTML = c.diferenciais.map((d) => `<li>${esc(d)}</li>`).join("");

  const g = c.google;
  $("nota").textContent = g.nota.toFixed(1).replace(".", ",");
  const cheias = Math.round(g.nota);
  $("estrelas").textContent = "★".repeat(cheias) + "☆".repeat(5 - cheias);
  $("qtd-avaliacoes").textContent = g.total ? `${g.total} avaliações no Google` : "Avaliações no Google";
  $("lista-avaliacoes").innerHTML = g.depoimentos.map((d) =>
    `<article class="card"><div class="stars">★★★★★</div><p>“${esc(d.texto)}”</p><p class="review__autor">${esc(d.autor)}</p></article>`
  ).join("");

  const contatos = [
    { icone: "💬", titulo: "WhatsApp", texto: c.telefone, href: zap },
    { icone: "📞", titulo: "Telefone", texto: c.telefone, href: "tel:+" + c.whatsapp },
    { icone: "📸", titulo: "Instagram", texto: "@tjmanutencao.poa", href: c.instagram },
    { icone: "📍", titulo: "Atendimento", texto: c.endereco }
  ];
  if (c.email) contatos.splice(2, 0, { icone: "✉️", titulo: "E-mail", texto: c.email, href: "mailto:" + c.email });
  if (c.facebook) contatos.push({ icone: "👍", titulo: "Facebook", texto: "Siga nossa página", href: c.facebook });

  $("lista-contatos").innerHTML = contatos.map((i) => {
    const corpo = `<div class="card__icon">${i.icone}</div><h3>${esc(i.titulo)}</h3><p>${esc(i.texto)}</p>`;
    return i.href
      ? `<a class="card" href="${esc(i.href)}" target="_blank" rel="noopener">${corpo}</a>`
      : `<div class="card">${corpo}</div>`;
  }).join("");
})();
