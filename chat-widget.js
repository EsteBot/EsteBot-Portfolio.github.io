<script>
  // 1. Toggle Chat Visibility
  function toggleChat() {
    const box = document.getElementById('ai-chat-box');
    const isHidden = box.style.display === 'none' || box.style.display === '';
    box.style.display = isHidden ? 'flex' : 'none';
  }

  // 2. Simple Markdown Link Parser [Text](URL) -> <a>Text</a>
  function parseMarkdownLinks(text) {
    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  }

  // 3. Handle Asking the AI
  async function askAI() {
    const input = document.getElementById('ai-chat-input');
    const chatWindow = document.getElementById('ai-chat-window');
    const query = input.value.trim();

    if (!query) return;

    // Render User Message
    chatWindow.innerHTML += `<div class="chat-msg user-msg">${query}</div>`;
    input.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Render Temporary Loading Indicator
    const loadingId = 'loading-' + Date.now();
    chatWindow.innerHTML += `<div class="chat-msg bot-msg" id="${loadingId}">Thinking...</div>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
      const response = await fetch('https://portfolio-estebot.estestyle.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: query })
      });

      const data = await response.json();
      const formattedReply = parseMarkdownLinks(data.reply);

      // Update Loading Message with AI Response
      document.getElementById(loadingId).innerHTML = formattedReply;
    } catch (err) {
      document.getElementById(loadingId).innerText = "Sorry, I couldn't reach the assistant backend right now.";
    }

    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
</script>