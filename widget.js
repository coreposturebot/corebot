
// CoreBot - AI Powered Widget (Smart Version)
document.addEventListener("DOMContentLoaded", function () {
  const bubble = document.createElement("div");
  bubble.id = "corebot-bubble";
  bubble.style.cssText = "position:fixed;bottom:20px;right:20px;background:#1E88E5;color:white;padding:12px 18px;border-radius:24px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.2);z-index:9999;font-family:sans-serif;";
  bubble.textContent = "💬 Chat with CoreBot";
  document.body.appendChild(bubble);

  const chatbox = document.createElement("div");
  chatbox.id = "corebot-chatbox";
  chatbox.style.cssText = "position:fixed;bottom:70px;right:20px;width:350px;height:450px;background:white;border-radius:12px;border:1px solid #ccc;display:none;flex-direction:column;box-shadow:0 4px 20px rgba(0,0,0,0.2);z-index:9999;";
  chatbox.innerHTML = `
    <div style='background:#1E88E5;color:white;padding:12px;border-top-left-radius:12px;border-top-right-radius:12px;'>CoreBot 💬</div>
    <div id='corebot-messages' style='flex:1;padding:10px;overflow-y:auto;font-family:sans-serif;font-size:14px;'></div>
    <div style='padding:10px;border-top:1px solid #ddd;'>
      <input id='corebot-input' type='text' placeholder='Type a message...' style='width:80%;padding:8px;border:1px solid #ccc;border-radius:6px;' />
      <button id='corebot-send' style='padding:8px 12px;background:#1E88E5;color:white;border:none;border-radius:6px;cursor:pointer;'>Send</button>
    </div>`;
  document.body.appendChild(chatbox);

  bubble.onclick = () => {
    chatbox.style.display = chatbox.style.display === "none" ? "flex" : "none";
  };

  async function sendToGPT(userInput) {
    const messagesDiv = document.getElementById("corebot-messages");
    messagesDiv.innerHTML += "<div><strong>You:</strong> " + userInput + "</div>";

    const systemPrompt = `You are CoreBot, a friendly and knowledgeable assistant for CorePosture Chiropractic in Southern California. Help users with:
- Booking a new patient exam (link them to: https://coreposturechiropractic.com/schedule/)
- Returning patients (tell them to use the app)
- Conditions: sciatica, pinched nerves, disc herniation, headaches, scoliosis
- Explain CBP in simple terms (offer to go deeper if asked)
- ScoliCare: CorePosture is one of few providers in SoCal
- Insurance: “Most patients with PPO insurance can get reimbursed. We can verify your benefits during your first visit.”
- Provide location/directions if asked.
Be brief, helpful, and always lead toward booking or calling the office.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userInput }
        ],
        temperature: 0.6
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, something went wrong.";
    messagesDiv.innerHTML += "<div><strong>CoreBot:</strong> " + reply + "</div>";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  document.getElementById("corebot-send").onclick = () => {
    const input = document.getElementById("corebot-input");
    const message = input.value.trim();
    if (message) {
      input.value = "";
      sendToGPT(message);
    }
  };
});
