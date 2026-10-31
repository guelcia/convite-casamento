document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // 1. CONFIGURAÇÃO FIXA DO ITINERÁRIO DO CASAL
  const scheduleData = [
    { time: "14h00", title: "Cerimónia", note: "Celebração do casamento" },
    { time: "15h30", title: "Fotografias", note: "Registos deste dia especial" },
    { time: "16h00", title: "Recepção", note: "Boas-vindas aos convidados" },
    { time: "17h00", title: "Festa", note: "Almoço, música, dança e celebração" }
  ];

  $("schedule").innerHTML = scheduleData.map(item => `
    <div class="schedule-row">
      <span class="schedule-time">${item.time}</span>
      <span><span class="schedule-title">${item.title}</span>
      <span class="schedule-note">${item.note}</span></span>
    </div>
  `).join("");

  // 2. LEITURA DOS PARÂMETROS DINÂMICOS DA URL
  const urlParams = new URLSearchParams(window.location.search);
  let nomeConvidado = urlParams.get('nome') || "Convidado Especial";
  let totalVagas = parseInt(urlParams.get('vagas')) || 2; 

  $("nomeConvidadoTela").textContent = nomeConvidado;
  $("textoVagasTela").textContent = totalVagas > 1 
    ? `Este convite é válido para até ${totalVagas} pessoas.` 
    : `Este convite é válido para 1 pessoa.`;

  // 3. CONTROLO DO SELETOR DE VAGAS ADICIONAIS
  const wrapperAcompanhantes = $("wrapperAcompanhantes");
  const selectAcompanhantes = $("selectAcompanhantes");
  const radioSim = $("radioSim");
  const radioNao = $("radioNao");

  selectAcompanhantes.innerHTML = "";
  if (totalVagas > 1) {
    for (let i = 1; i <= totalVagas; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.textContent = i === 1 ? "Apenas 1 pessoa (Eu sozinho/a)" : `${i} pessoas`;
      selectAcompanhantes.appendChild(option);
    }
  }

  radioSim.addEventListener("change", () => {
    if (totalVagas > 1) wrapperAcompanhantes.classList.remove("hidden");
  });

  radioNao.addEventListener("change", () => {
    wrapperAcompanhantes.classList.add("hidden");
    selectAcompanhantes.value = ""; 
  });

  // 4. DISPARO DE MENSAGEM DIRETA PARA O WHATSAPP DO CASAL
  const whatsappNoivos = "258841234567"; // Número padrão fornecido

  $("whatsappLink").addEventListener("click", (e) => {
    e.preventDefault();
    
    if (!radioSim.checked && !radioNao.checked) {
      alert("Por favor, seleciona se vais comparecer ou não antes de enviar!");
      return;
    }

    let status = radioSim.checked ? "Confirmado" : "Ausente";
    let textoAcompanhantes = status === "Confirmado" 
      ? `\nTotal de lugares a reservar: ${totalVagas > 1 ? selectAcompanhantes.value : 1}`
      : `\nInfelizmente não poderemos comparecer.`;

    const mensagem = `Olá Ana e Miguel!\n\nEstou a responder ao convite do vosso casamento.\n\nStatus: ${status}\nConvidado: ${nomeConvidado}${textoAcompanhantes}`;
    
    window.open(`https://wa.me{whatsappNoivos}?text=${encodeURIComponent(mensagem)}`, '_blank');
  });

  // 5. ANIMAÇÃO DE ABERTURA DO ENVELOPE
  $("openEnvelope").addEventListener("click", () => {
    const button = $("openEnvelope");
    if (button.classList.contains("opened")) return;
    
    button.classList.add("opened");
    $("openHint").textContent = "A abrir o vosso convite…";
    
    window.setTimeout(() => {
      $("invitation").classList.remove("hidden");
      $("invitation").scrollIntoView({ behavior: "smooth", block: "start" });
      $("openHint").textContent = "Convite aberto";
    }, 850);
  });

  // 6. CONTAGEM DECRESCENTE SINCRO (20 de Dezembro de 2026)
  const dataCasamento = new Date("2026-12-20T14:00:00").getTime();

  function updateCountdown() {
    const diff = dataCasamento - Date.now();

    if (diff <= 0) {
      $("countdown").innerHTML = "<p style='color:var(--gold); font-weight:600;'>Chegou o grande dia! ♡</p>";
      return;
    }

    const dias = Math.floor(diff / 86400000);
    const horas = Math.floor((diff % 86400000) / 3600000);
    const minutos = Math.floor((diff % 3600000) / 60000);
    const segundos = Math.floor((diff % 60000) / 1000);

    $("days").textContent = String(dias).padStart(2, "0");
    $("hours").textContent = String(horas).padStart(2, "0");
    $("minutes").textContent = String(minutos).padStart(2, "0");
    $("seconds").textContent = String(segundos).padStart(2, "0");
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
});
