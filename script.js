const API_KEY = "AIzaSyCCs2A5eCb-HHOIkItw0Kp4-G_GWgI4CIQ";
const MODEL_NAME = "gemini-1.5-flash";

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatLog = document.getElementById("chatLog");
  const userText = input.value.trim();

  if (!userText) return;

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.textContent = userText;
  chatLog.appendChild(userMsg);
  input.value = "";

  // Show AI is thinking...
  const aiMsg = document.createElement("div");
  aiMsg.className = "ai-msg";
  aiMsg.textContent = "Thinking...";
  chatLog.appendChild(aiMsg);
  chatLog.scrollTop = chatLog.scrollHeight;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userText }] }],
        }),
      }
    );

    const data = await res.json();
    console.log("API Response:", data);
    const output = data.candidates?.[0]?.content?.parts?.[0]?.text;

    aiMsg.textContent = output || "No valid response from Mudiyanse AI.";

  } catch (err) {
    console.error("Error:", err);
    aiMsg.textContent = "Failed to reach Mudiyanse AI.";
  }

  chatLog.scrollTop = chatLog.scrollHeight;
}