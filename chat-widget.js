function toggleChat() {
  const box = document.getElementById('ai-chat-box');
  const isHidden = box.style.display === 'none' || box.style.display === '';
  box.style.display = isHidden ? 'flex' : 'none';
}

function parseMarkdownLinks(text) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
}

async function askAI() {
  const input = document.getElementById('ai-chat-input');
  const chatWindow = document.getElementById('ai-chat-window');
  const query = input.value.trim();
  if (!query) return;

  chatWindow.innerHTML += `<div class="chat-msg user-msg">${query}</div>`;
  input.value = '';
  chatWindow.scrollTop = chatWindow.scrollHeight;

  const loadingId = 'loading-' + Date.now();
  chatWindow.innerHTML += `<div class="chat-msg bot-msg" id="${loadingId}">Thinking...</div>`;
  try {
    const response = await fetch('https://portfolio-estebot.estestyle.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userPrompt: query })
    });
    const data = await response.json();
    document.getElementById(loadingId).innerHTML = parseMarkdownLinks(data.reply);
  } catch (err) {
    document.getElementById(loadingId).innerText = "Sorry, I couldn't reach the assistant right now.";
  }
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
