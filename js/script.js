document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  // 1. CONFIGURAÇÃO FIXA DO ITINERÁRIO DO CASAL
  const scheduleData = [
    { time: "14h00", title: "Cerimónia", note: "Celebração do casamento" },
    { time: "15h30", title: "Fotografias", note: "Registos deste dia especial" },
    { time: "16h00", title: "Recepção", note: "Boas-vindas aos convidados" },
    { time: "17h00", title: "Festa", note: "Almoço, música, dança e celebração" }
  ];

  if ($("schedule")) {
    $("schedule").innerHTML = scheduleData.map(item => `
      <div class="schedule-row">
        <span class="schedule-time">${item.time}</span>
        <span><span class="schedule-title">${item.title}</span>
        <span class="schedule-note">${item.note}</span></span>
      </div>
    `).join("");
  }

  // 2. LEITURA DOS PARÂMETROS DINÂMICOS DA URL
  const urlParams = new URLSearchParams(window.location.search);
  let nomeConvidado = urlParams.get('nome') || "Convidado Especial";
  let totalVagas = parseInt(urlParams.get('vagas')) || 2; 

  if ($("nomeConvidadoTela")) $("nomeConvidadoTela").textContent = nomeConvidado;
  if ($("textoVagasTela")) {
    $("textoVagasTela").textContent = totalVagas > 1 
      ? `Este convite é válido para até ${totalVagas} pessoas.` 
      : `Este convite é válido para 1 pessoa.`;
  }

  // 3. CONTROLO DO SELETOR DE VAGAS ADICIONAIS
  const wrapperAcompanhantes = $("wrapperAcompanhantes");
  const selectAcompanhantes = $("selectAcompanhantes");
  const radioSim = $("radioSim");
  const radioNao = $("radioNao");

  if (selectAcompanhantes) {
    selectAcompanhantes.innerHTML = "";
    if (totalVagas > 1) {
      for (let i = 1; i <= totalVagas; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i === 1 ? "Apenas 1 pessoa (Eu sozinho/a)" : `${i} pessoas`;
        selectAcompanhantes.appendChild(option);
      }
    }
  }

  if (radioSim) {
    radioSim.addEventListener("change", () => {
      if (totalVagas > 1 && wrapperAcompanhantes) wrapperAcompanhantes.classList.remove("hidden");
    });
  }

  if (radioNao) {
    radioNao.addEventListener("change", () => {
      if (wrapperAcompanhantes) wrapperAcompanhantes.classList.add("hidden");
      if (selectAcompanhantes) selectAcompanhantes.value = ""; 
    });
  }

  // 4. DISPARO DE MENSAGEM DIRETA PARA O WHATSAPP DO CASAL (CORRIGIDO)
  const whatsappDono = "258873144454";  // Número do casal configurado

  if ($("whatsappLink")) {
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
      
      // SINTAXE DE URL CORRIGIDA COM A BARRA DE INTERPOLAÇÃO OBRIGATÓRIA
      const urlFinal = `https://wa.me/${whatsappDono}?text=${encodeURIComponent(mensagem)}`;
      
      window.open(urlFinal, '_blank');
    });
  }

  // 5. ANIMAÇÃO DE TRANSIÇÃO EM FADE DO ENVELOPE PARA O CONVITE
  const envelopeBtn = $("openEnvelope");
  const invitation = $("invitation");

  if (envelopeBtn) {
    envelopeBtn.addEventListener("click", () => {
      if (envelopeBtn.classList.contains("fade-out")) return;
      
      envelopeBtn.classList.add("fade-out");
      if ($("openHint")) $("openHint").textContent = "A abrir o vosso convite…";
      
      window.setTimeout(() => {
        envelopeBtn.style.display = "none"; 
        
        if (invitation) {
          invitation.classList.remove("hidden"); 
          
          window.requestAnimationFrame(() => {
            invitation.classList.add("fade-in"); 
            if ($("openHint")) $("openHint").textContent = "Convite aberto ♡";
            invitation.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }
      }, 600); 
    });
  }

  // 6. CONTAGEM DECRESCENTE SINCRO (20 de Dezembro de 2026)
  const dataCasamento = new Date("2026-12-20T14:00:00").getTime();

  function updateCountdown() {
    const countdownEl = $("countdown");
    if (!countdownEl) return;

    const diff = dataCasamento - Date.now();

    if (diff <= 0) {
      countdownEl.innerHTML = "<p style='color:var(--gold); font-weight:600;'>Chegou o grande dia! ♡</p>";
      return;
    }

    const dias = Math.floor(diff / 86400000);
    const horas = Math.floor((diff % 86400000) / 3600000);
    const minutos = Math.floor((diff % 3600000) / 60000);
    const segundos = Math.floor((diff % 60000) / 1000);

    if ($("days")) $("days").textContent = String(dias).padStart(2, "0");
    if ($("hours")) $("hours").textContent = String(horas).padStart(2, "0");
    if ($("minutes")) $("minutes").textContent = String(minutos).padStart(2, "0");
    if ($("seconds")) $("seconds").textContent = String(segundos).padStart(2, "0");
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
});
