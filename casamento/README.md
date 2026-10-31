# Convite digital romântico — envelope interativo

Projecto-base responsivo em HTML, CSS e JavaScript. Inclui envelope animado, detalhes do evento, contagem decrescente, programa, ligação ao Google Maps e confirmação pelo WhatsApp.

## 1. Testar no computador

1. Descompacte a pasta.
2. Abra `index.html` no navegador.
3. Para uma experiência mais próxima de um website publicado, use a extensão **Live Server** no Visual Studio Code: clique com o botão direito em `index.html` e escolha **Open with Live Server**.

Não é necessário instalar dependências.

## 2. Personalizar para um cliente

Edite apenas `js/config.js`:

- `coupleNames`: nomes do casal.
- `eventDate`: data e hora no formato `AAAA-MM-DDTHH:MM`.
- `eventTimeLabel`: texto do horário.
- `rsvpDeadline`: prazo de confirmação.
- `venueName` e `venueAddress`: local.
- `mapsQuery`: nome/endereço exacto ou coordenadas para o Google Maps.
- `whatsappNumber`: indicativo + número, apenas algarismos. Ex.: `258841234567`.
- `whatsappMessage`: mensagem que será aberta no WhatsApp.
- `photoUrl`: fotografia pública do casal.
- `schedule`: actividades do evento.

Substitua a fotografia de demonstração por uma imagem fornecida e autorizada pelo cliente. Pode guardar a imagem na pasta `assets/` e usar, por exemplo, `photoUrl: "assets/casal.jpg"`.

## 3. Publicar no GitHub Pages

1. Crie um repositório público no GitHub, por exemplo `convite-ana-miguel`.
2. Carregue `index.html`, as pastas `css`, `js` e `assets` (se existir).
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Seleccione a branch `main` e a pasta `/ (root)`, depois carregue em **Save**.
6. Aguarde a publicação. O endereço será semelhante a `https://SEU-USUARIO.github.io/convite-ana-miguel/`.

Cada cliente pode ter um repositório próprio, ou vários convites podem ficar em subpastas de um único repositório.

## 4. Antes de entregar

- Teste o link no telemóvel.
- Confirme se a data e a contagem decrescente estão correctas.
- Teste a localização no Google Maps.
- Teste o WhatsApp e confirme que o número está correcto.
- Verifique a qualidade e autorização de uso das fotografias.
- Não coloque dados sensíveis dos convidados em páginas públicas.

## Limitações importantes

O botão WhatsApp apenas abre uma conversa com texto pré-preenchido; o convidado ainda precisa de carregar em **Enviar**. O GitHub Pages hospeda ficheiros estáticos: não recebe nem guarda respostas numa base de dados. Para registo automático de confirmações será necessário um serviço/backend separado.
