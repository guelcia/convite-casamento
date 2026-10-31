/*
  PERSONALIZA ESTE FICHEIRO PARA CADA CLIENTE.
  WhatsApp: escreve o indicativo do país + número, sem +, espaços ou traços.
  Exemplo de Moçambique: 258841234567
*/
const EVENT_CONFIG = {
  coupleNames: "Ana & Miguel",
  eventDate: "2026-11-20T14:00:00", // AAAA-MM-DDTHH:MM
  eventTimeLabel: "Domingo · 13h00",
  rsvpDeadline: "10 de Dezembro de 2026",

  venueName: "Quinta das Flores",
  venueAddress: "Maputo, Moçambique",
  // Podes usar uma pesquisa do Google Maps ou coordenadas:
  mapsQuery: "Quinta das Flores, Maputo, Moçambique",

  whatsappNumber: "258841234567",
  whatsappMessage: "Olá! Confirmo a minha presença no casamento de Ana e Miguel. O meu nome é:",

  photoUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",

  schedule: [
    { time: "14h00", title: "Cerimónia", note: "Celebração do casamento" },
    { time: "15h30", title: "Fotografias", note: "Registos deste dia especial" },
    { time: "16h00", title: "Recepção", note: "Boas-vindas aos convidados" },
    { time: "17h00", title: "Festa", note: "Almoco, música, danca e celebração" }
  ]
};
