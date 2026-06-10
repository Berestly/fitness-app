import React, { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `You are a fitness coach AI assistant embedded in a personal 8-week cutting program app.
The user has the following profile:
- Weight: 72.2 kg, Body fat: 23%, Lean mass: 55.6 kg
- Goal: Fat loss cutting program over 8 weeks
- Training: Push/Pull/Legs split, 6 days/week
- Nutrition: 1,980 kcal/day, 160g protein target
- Diet: South Indian (rice, dosa, idli based)
- Hair issue: dry scalp, using Amway Satinique + Himalaya Anti-Dandruff shampoo

You can help the user edit their app data. When they ask you to change something, provide clear instructions about WHAT to change in WHICH section (Overview, Training, Nutrition, or Hair Care) and HOW.

Format your data-editing suggestions clearly like:
📝 EDIT: [Section] → [What to change] → [New value]

Be concise, practical, and specific. You understand progressive overload, South Indian nutrition, and hair care.`;

export default function AIPanel({ appData, onApplyEdit }) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('claude_api_key') || '');
  const [signedIn, setSignedIn] = useState(() => !!localStorage.getItem('claude_api_key'));
  const [inputKey, setInputKey] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI fitness coach. Ask me to edit your program, suggest changes to your meals, adjust your training, or anything else about your plan.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const signIn = () => {
    if (!inputKey.startsWith('sk-ant-')) {
      setError('Please enter a valid Anthropic API key (starts with sk-ant-)');
      return;
    }
    localStorage.setItem('claude_api_key', inputKey);
    setApiKey(inputKey);
    setSignedIn(true);
    setError('');
  };

  const signOut = () => {
    localStorage.removeItem('claude_api_key');
    setApiKey('');
    setSignedIn(false);
    setMessages([{ role: 'assistant', content: 'Hi! I\'m your AI fitness coach. Ask me to edit your program, suggest changes to your meals, adjust your training, or anything else about your plan.' }]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const contextMsg = {
        role: 'user',
        content: `[App context - current data summary]:\nOverview stats: ${JSON.stringify(appData.overview.stats)}\nTraining days: push/pull/legs PPL split\nNutrition protein sources: ${JSON.stringify(appData.nutrition.proteinSources)}\n\nUser message: ${input}`
      };

      const apiMessages = [
        ...messages.slice(1).map(m => ({ role: m.role, content: m.content })),
        contextMsg
      ];

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-opus-4-5',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: apiMessages
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error?.message || `API error ${res.status}`);
      }

      const data = await res.json();
      const reply = data.content[0]?.text || 'Sorry, no response.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      setError(e.message);
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  if (!signedIn) {
    return (
      <div className="ai-panel">
        <div className="ai-header">
          <span className="ai-title">AI Coach</span>
          <span className="ai-subtitle">Edit your program by chatting</span>
        </div>
        <div className="ai-signin">
          <div className="signin-icon">🤖</div>
          <h3>Connect Claude AI</h3>
          <p>Enter your Anthropic API key to chat with Claude and edit your program using natural language.</p>
          <a href="https://console.anthropic.com/account/keys" target="_blank" rel="noopener noreferrer" className="get-key-link">
            Get your API key →
          </a>
          <input
            type="password"
            className="api-key-input"
            placeholder="sk-ant-api03-..."
            value={inputKey}
            onChange={e => setInputKey(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && signIn()}
          />
          {error && <div className="ai-error">{error}</div>}
          <button className="btn-signin" onClick={signIn}>Connect</button>
          <p className="key-note">Your key is stored only in your browser's local storage and never sent anywhere except directly to Anthropic.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-panel">
      <div className="ai-header">
        <div>
          <span className="ai-title">AI Coach</span>
          <span className="ai-badge">Connected</span>
        </div>
        <button className="btn-signout" onClick={signOut}>Sign out</button>
      </div>

      <div className="ai-suggestions">
        <span className="suggestions-label">Try:</span>
        {[
          'Add 5 kg to my bench press target in week 5-6',
          'Suggest a high-protein dosa alternative',
          'How should I adjust nutrition on rest days?'
        ].map(s => (
          <button key={s} className="suggestion-chip" onClick={() => setInput(s)}>{s}</button>
        ))}
      </div>

      <div className="ai-messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg msg-${m.role}`}>
            <div className="msg-bubble">{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className="msg msg-assistant">
            <div className="msg-bubble typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        {error && <div className="ai-error">{error}</div>}
        <div ref={bottomRef} />
      </div>

      <div className="ai-input-row">
        <textarea
          className="ai-input"
          placeholder="Ask me to change your workout, meals, hair routine..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
          rows={2}
        />
        <button className="btn-send" onClick={sendMessage} disabled={loading || !input.trim()}>
          {loading ? '...' : '↑'}
        </button>
      </div>
    </div>
  );
}
