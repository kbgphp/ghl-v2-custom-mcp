import { Request, Response } from "express";
import { CONFIG } from "../config.js";
import { ghlService } from "../ghl/service.js";

export function renderDashboard(publicUrl: string = `http://localhost:${CONFIG.port}`) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GoHighLevel API v2 — Model Context Protocol Server</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #090d16;
      --bg-card: rgba(18, 24, 38, 0.75);
      --bg-card-hover: rgba(28, 36, 56, 0.85);
      --border-color: rgba(255, 255, 255, 0.08);
      --border-accent: rgba(99, 102, 241, 0.3);
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --primary-glow: rgba(99, 102, 241, 0.25);
      --secondary: #06b6d4;
      --accent-green: #10b981;
      --accent-amber: #f59e0b;
      --accent-rose: #f43f5e;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --radius-lg: 16px;
      --radius-md: 10px;
      --radius-sm: 6px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: var(--bg-dark);
      background-image: 
        radial-gradient(circle at 15% 15%, rgba(99, 102, 241, 0.15), transparent 45%),
        radial-gradient(circle at 85% 85%, rgba(6, 182, 212, 0.12), transparent 45%),
        radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05), transparent 60%);
      color: var(--text-main);
      min-height: 100vh;
      line-height: 1.6;
      padding: 2rem 1rem;
    }

    .container {
      max-width: 1240px;
      margin: 0 auto;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .logo-group {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo-badge {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: linear-gradient(135deg, #6366f1, #06b6d4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.3rem;
      box-shadow: 0 0 20px var(--primary-glow);
    }

    .logo-text h1 {
      font-size: 1.45rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      background: linear-gradient(90deg, #ffffff, #cbd5e1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .logo-text p {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: var(--accent-green);
      font-size: 0.85rem;
      font-weight: 600;
    }

    .status-pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-green);
      box-shadow: 0 0 10px var(--accent-green);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(0.95); opacity: 0.8; }
      50% { transform: scale(1.3); opacity: 1; }
      100% { transform: scale(0.95); opacity: 0.8; }
    }

    /* Grid Layout */
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.75rem;
    }

    @media (min-width: 900px) {
      .grid-2 {
        grid-template-columns: 1.1fr 0.9fr;
      }
      .grid-3 {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    /* Card Component */
    .card {
      background: var(--bg-card);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 1.75rem;
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.4), transparent);
    }

    .card-title {
      font-size: 1.15rem;
      font-weight: 600;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    /* Endpoints list */
    .endpoint-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.85rem 1rem;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      margin-bottom: 0.75rem;
      gap: 0.5rem;
    }

    .endpoint-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 0;
    }

    .method-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.5rem;
      border-radius: var(--radius-sm);
      background: rgba(99, 102, 241, 0.2);
      color: #818cf8;
      border: 1px solid rgba(99, 102, 241, 0.3);
    }

    .endpoint-url {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      word-break: break-all;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.55rem 1rem;
      border-radius: var(--radius-md);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .btn-primary {
      background: var(--primary);
      color: white;
      box-shadow: 0 4px 12px var(--primary-glow);
    }

    .btn-primary:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.07);
      color: var(--text-main);
      border: 1px solid var(--border-color);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
    }

    .btn-sm {
      padding: 0.35rem 0.75rem;
      font-size: 0.75rem;
    }

    /* Tabs */
    .tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 0.5rem;
      overflow-x: auto;
    }

    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-dim);
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      border-radius: var(--radius-md);
      transition: all 0.2s;
    }

    .tab-btn.active {
      color: white;
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid var(--border-accent);
    }

    .tab-content {
      display: none;
    }

    .tab-content.active {
      display: block;
    }

    /* Code Snippet Area */
    .code-block {
      background: #050811;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 1.2rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: #93c5fd;
      position: relative;
      overflow-x: auto;
      white-space: pre;
    }

    /* Tool Interactive Form */
    .form-group {
      margin-bottom: 1.2rem;
    }

    .form-label {
      display: block;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-muted);
      margin-bottom: 0.4rem;
    }

    .form-control {
      width: 100%;
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 0.75rem 1rem;
      color: white;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s;
    }

    .form-control:focus {
      border-color: var(--primary);
    }

    select.form-control {
      cursor: pointer;
    }

    textarea.form-control {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      min-height: 120px;
      resize: vertical;
    }

    /* Tool Tags */
    .tool-tag {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      background: rgba(6, 182, 212, 0.12);
      color: var(--secondary);
      border: 1px solid rgba(6, 182, 212, 0.25);
      margin-right: 0.4rem;
      margin-bottom: 0.4rem;
    }

    /* Toast Notification */
    #toast {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #1e293b;
      color: white;
      border: 1px solid var(--border-accent);
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius-md);
      font-size: 0.85rem;
      font-weight: 500;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
      z-index: 100;
    }

    #toast.show {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
</head>
<body>

  <div class="container">
    <header>
      <div class="logo-group">
        <div class="logo-badge">GHL</div>
        <div class="logo-text">
          <h1>GoHighLevel API v2 — Custom MCP Server</h1>
          <p>Sub-Account Tools for AI Agents & Custom Connectors</p>
        </div>
      </div>
      <div class="status-badge">
        <span class="status-pulse"></span>
        <span>Online • Remote SSE & Stdio Active</span>
      </div>
    </header>

    <!-- Top Info Row -->
    <div class="grid grid-2" style="margin-bottom: 1.75rem;">
      <!-- Hosted Connection Card -->
      <div class="card">
        <div class="card-title">
          <span>🚀 Hosted Connector Endpoints</span>
          <span style="font-size: 0.8rem; font-weight: 400; color: var(--text-muted);">Ready for AI Registration</span>
        </div>
        
        <div class="endpoint-item">
          <div class="endpoint-info">
            <span class="method-badge">SSE</span>
            <div>
              <div style="font-size: 0.75rem; color: var(--text-dim);">Remote MCP Server Endpoint</div>
              <span class="endpoint-url" id="sse-url">${publicUrl}/sse</span>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="copyText('sse-url')">Copy URL</button>
        </div>

        <div class="endpoint-item">
          <div class="endpoint-info">
            <span class="method-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border-color: rgba(16, 185, 129, 0.3);">OPENAPI</span>
            <div>
              <div style="font-size: 0.75rem; color: var(--text-dim);">GPT Actions / Custom Connector Schema</div>
              <span class="endpoint-url" id="openapi-url">${publicUrl}/openapi.json</span>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="copyText('openapi-url')">Copy URL</button>
        </div>

        <div class="endpoint-item" style="margin-bottom: 0;">
          <div class="endpoint-info">
            <span class="method-badge" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border-color: rgba(245, 158, 11, 0.3);">POST</span>
            <div>
              <div style="font-size: 0.75rem; color: var(--text-dim);">MCP Message Handler Endpoint</div>
              <span class="endpoint-url" id="msg-url">${publicUrl}/messages</span>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="copyText('msg-url')">Copy URL</button>
        </div>
      </div>

      <!-- Config & Token Overview -->
      <div class="card">
        <div class="card-title">
          <span>⚙️ Integration Configuration</span>
          <span style="font-size: 0.8rem; font-weight: 400; color: var(--accent-green);">Sub-Account Verified</span>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="background: rgba(0,0,0,0.25); padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 0.75rem; color: var(--text-dim);">Private Integration Token</div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #a5b4fc; word-break: break-all;">
              ${CONFIG.ghlToken.substring(0, 8)}••••••••••••${CONFIG.ghlToken.substring(CONFIG.ghlToken.length - 4)}
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div style="background: rgba(0,0,0,0.25); padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <div style="font-size: 0.75rem; color: var(--text-dim);">API Base & Version</div>
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;">${CONFIG.ghlApiVersion} / v2</div>
            </div>
            <div style="background: rgba(0,0,0,0.25); padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <div style="font-size: 0.75rem; color: var(--text-dim);">Location / Sub-Account</div>
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;">${CONFIG.ghlLocationId}</div>
            </div>
          </div>

          <div style="margin-top: 0.25rem;">
            <div style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.4rem;">Exposed Tools (9):</div>
            <div>
              <span class="tool-tag">search_contacts</span>
              <span class="tool-tag">read_contact_with_custom_fields</span>
              <span class="tool-tag">update_contact_fields</span>
              <span class="tool-tag">create_contact</span>
              <span class="tool-tag">read_tags</span>
              <span class="tool-tag">apply_tags</span>
              <span class="tool-tag">read_workflow_configuration</span>
              <span class="tool-tag">read_calendar_configuration</span>
              <span class="tool-tag">read_custom_field_definitions</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area: Interactive Playground & Connector Registration Guides -->
    <div class="grid grid-2">
      <!-- Interactive Tool Tester -->
      <div class="card">
        <div class="card-title">
          <span>⚡ Interactive MCP Tool Playground</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Execute Tools in Real Time</span>
        </div>

        <div class="form-group">
          <label class="form-label" for="tool-select">Select Tool</label>
          <select id="tool-select" class="form-control" onchange="onToolChange()">
            <option value="search_contacts">search_contacts — Query contacts by name, email, phone, tags</option>
            <option value="read_contact_with_custom_fields">read_contact_with_custom_fields — Read details & custom fields</option>
            <option value="update_contact_fields">update_contact_fields — Update standard & custom fields</option>
            <option value="create_contact">create_contact — Create a new contact with fields & tags</option>
            <option value="read_tags">read_tags — Read all sub-account or contact tags</option>
            <option value="apply_tags">apply_tags — Apply/remove tags on a contact</option>
            <option value="read_workflow_configuration">read_workflow_configuration — Read workflow triggers & actions</option>
            <option value="read_calendar_configuration">read_calendar_configuration — Read booking & calendar slots</option>
            <option value="read_custom_field_definitions">read_custom_field_definitions — Read custom field schemas</option>
          </select>
        </div>

        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <label class="form-label" style="margin-bottom: 0;">Tool Arguments (JSON)</label>
            <button class="btn btn-secondary btn-sm" onclick="loadSampleArgs()">Reset Sample</button>
          </div>
          <textarea id="tool-args" class="form-control" rows="5"></textarea>
        </div>

        <button id="run-btn" class="btn btn-primary" style="width: 100%; margin-bottom: 1.25rem;" onclick="executeTool()">
          <span>Execute Tool</span>
          <span>⚡</span>
        </button>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label">Tool Execution Output</label>
          <div id="tool-output" class="code-block" style="min-height: 180px; max-height: 320px;">Ready. Click 'Execute Tool' above to test.</div>
        </div>
      </div>

      <!-- Custom Connector Setup Guides -->
      <div class="card">
        <div class="card-title">
          <span>📋 AI Client & Connector Registration</span>
        </div>

        <div class="tabs">
          <button class="tab-btn active" onclick="switchTab('claude')">Claude Desktop</button>
          <button class="tab-btn" onclick="switchTab('cursor')">Cursor IDE</button>
          <button class="tab-btn" onclick="switchTab('gpt')">Custom GPT / Actions</button>
          <button class="tab-btn" onclick="switchTab('openwebui')">Open-WebUI / LibreChat</button>
        </div>

        <!-- Tab 1: Claude Desktop -->
        <div id="tab-claude" class="tab-content active">
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            Add this configuration to your <code>claude_desktop_config.json</code>:
          </p>
          <div class="code-block" id="claude-config">{
  "mcpServers": {
    "gohighlevel": {
      "url": "${publicUrl}/sse"
    }
  }
}</div>
          <div style="margin-top: 0.75rem; display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-sm" onclick="copyText('claude-config')">Copy Config</button>
          </div>
        </div>

        <!-- Tab 2: Cursor IDE -->
        <div id="tab-cursor" class="tab-content">
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            In Cursor Settings &gt; Features &gt; MCP &gt; Add New MCP Server:
          </p>
          <div class="code-block" id="cursor-config">{
  "name": "gohighlevel",
  "type": "sse",
  "url": "${publicUrl}/sse"
}</div>
          <div style="margin-top: 0.75rem; display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-sm" onclick="copyText('cursor-config')">Copy Config</button>
          </div>
        </div>

        <!-- Tab 3: Custom GPT / Actions -->
        <div id="tab-gpt" class="tab-content">
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            In ChatGPT / Custom GPT Builder &gt; Configure &gt; Actions &gt; Import from URL:
          </p>
          <div class="code-block" id="gpt-url">${publicUrl}/openapi.json</div>
          <div style="margin-top: 0.75rem; display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-sm" onclick="copyText('gpt-url')">Copy Schema URL</button>
          </div>
        </div>

        <!-- Tab 4: Open-WebUI / LibreChat -->
        <div id="tab-openwebui" class="tab-content">
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            Under Admin Settings &gt; Tools / MCP Integrations:
          </p>
          <div class="code-block" id="webui-config">{
  "server_url": "${publicUrl}/sse",
  "name": "GoHighLevel CRM Tools"
}</div>
          <div style="margin-top: 0.75rem; display: flex; justify-content: flex-end;">
            <button class="btn btn-secondary btn-sm" onclick="copyText('webui-config')">Copy Settings</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="toast">Copied to clipboard!</div>

  <script>
    const samplePayloads = {
      search_contacts: {
        query: "Sarah",
        limit: 10
      },
      read_contact_with_custom_fields: {
        contactId: "cnt_01J8ABCDEF1234567890"
      },
      update_contact_fields: {
        contactId: "cnt_01J8ABCDEF1234567890",
        customFieldMap: {
          "Lead Score": 96,
          "AI Deal Notes": "Updated via MCP Tool Playground: highly responsive."
        }
      },
      create_contact: {
        email: "alex.turner@cloudpeak.ai",
        firstName: "Alex",
        lastName: "Turner",
        companyName: "CloudPeak AI",
        phone: "+15558889999",
        tags: ["Inbound Demo", "Hot Lead"],
        customFieldMap: {
          "Lead Score": 88,
          "Budget Range": "$20,000-$50,000"
        }
      },
      read_tags: {
        contactId: ""
      },
      apply_tags: {
        contactId: "cnt_01J8ABCDEF1234567890",
        tags: ["VIP Client", "Contract Sent"]
      },
      read_workflow_configuration: {
        workflowId: "wf_lead_onboarding_01"
      },
      read_calendar_configuration: {
        calendarId: "cal_30min_strategy_01"
      },
      read_custom_field_definitions: {}
    };

    function onToolChange() {
      const tool = document.getElementById('tool-select').value;
      const sample = samplePayloads[tool] || {};
      document.getElementById('tool-args').value = JSON.stringify(sample, null, 2);
    }

    function loadSampleArgs() {
      onToolChange();
    }

    async function executeTool() {
      const tool = document.getElementById('tool-select').value;
      const argsText = document.getElementById('tool-args').value;
      const outputEl = document.getElementById('tool-output');
      const runBtn = document.getElementById('run-btn');

      let parsedArgs = {};
      try {
        parsedArgs = JSON.parse(argsText || '{}');
      } catch (err) {
        outputEl.innerText = "Error: Invalid JSON arguments.\\n" + err.message;
        return;
      }

      runBtn.disabled = true;
      runBtn.innerText = "Executing...";
      outputEl.innerText = "Calling tool: " + tool + "...";

      try {
        const res = await fetch('/api/test-tool', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tool, args: parsedArgs })
        });
        const json = await res.json();
        outputEl.innerText = JSON.stringify(json, null, 2);
      } catch (err) {
        outputEl.innerText = "Execution failed: " + err.message;
      } finally {
        runBtn.disabled = false;
        runBtn.innerHTML = "<span>Execute Tool</span> <span>⚡</span>";
      }
    }

    function switchTab(tabName) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      event.target.classList.add('active');
      document.getElementById('tab-' + tabName).classList.add('active');
    }

    function copyText(elementId) {
      const text = document.getElementById(elementId).innerText;
      navigator.clipboard.writeText(text).then(() => {
        showToast("Copied to clipboard!");
      });
    }

    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.innerText = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }

    // Initialize default payload
    onToolChange();
  </script>
</body>
</html>`;
}
