import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, Cpu, Check, X, Key, GitBranch, GitCommit, GitPullRequest, 
  ExternalLink, Play, RefreshCw, Layers, Database, ShieldCheck, 
  Sparkles, Download, Upload, Terminal, Server, ArrowUpRight
} from 'lucide-react';
import { DeveloperIntegrationState } from '../types/index.js';

export function DeveloperHubIntegrations() {
  // GitHub Integration State
  const [githubConnected, setGithubConnected] = useState<boolean>(true);
  const [githubAccount, setGithubAccount] = useState<string>('redvisionmusic');
  const [githubToken, setGithubToken] = useState<string>('ghp_92f8a1928bc37108374910283');
  const [selectedRepo, setSelectedRepo] = useState<string>('studio-audio-synthesis');
  const [isSyncingRepo, setIsSyncingRepo] = useState<boolean>(false);
  const [workflowTriggered, setWorkflowTriggered] = useState<boolean>(false);

  // Hugging Face Integration State
  const [hfConnected, setHfConnected] = useState<boolean>(true);
  const [hfAccount, setHfAccount] = useState<string>('redvision-ai');
  const [hfToken, setHfToken] = useState<string>('hf_82937102983719283719283');
  const [selectedHfModel, setSelectedHfModel] = useState<string>('redvision/musicgen-clayton-24bit');
  const [isDeployingSpace, setIsDeployingSpace] = useState<boolean>(false);

  // Mock repos
  const repos = [
    { name: 'studio-audio-synthesis', stars: 42, branch: 'main', lastCommit: 'Updated 24-bit audio DSP pipeline', commitsCount: 184 },
    { name: 'motion-cinema-vsl-renderer', stars: 89, branch: 'v2-release', lastCommit: 'Added 4K camera panning prompts', commitsCount: 312 },
    { name: 'defjam-publishing-contracts', stars: 18, branch: 'main', lastCommit: 'ISRC legal watermarking hooks', commitsCount: 95 },
  ];

  // Mock HuggingFace models & spaces
  const hfModels = [
    { name: 'redvision/musicgen-clayton-24bit', downloads: '14.2k', type: 'Audio Generation', status: 'Active Endpoint' },
    { name: 'redvision/motion-cinema-sdxl-lora', downloads: '28.9k', type: 'Text-to-Video', status: 'Active Endpoint' },
    { name: 'redvision/audio-stem-separator-v2', downloads: '8.4k', type: 'Acoustic DSP', status: 'Standby' },
  ];

  const hfSpaces = [
    { name: 'redvision-music-gen-gui', gpu: 'NVIDIA A10G (24GB)', status: 'RUNNING', latency: '42ms' },
    { name: 'motion-cinema-vsl-demo', gpu: 'NVIDIA H100 (80GB)', status: 'RUNNING', latency: '18ms' },
  ];

  const handleTriggerWorkflow = () => {
    setIsSyncingRepo(true);
    setTimeout(() => {
      setIsSyncingRepo(false);
      setWorkflowTriggered(true);
      setTimeout(() => setWorkflowTriggered(false), 5000);
    }, 1500);
  };

  const handleDeploySpace = () => {
    setIsDeployingSpace(true);
    setTimeout(() => {
      setIsDeployingSpace(false);
    }, 2000);
  };

  // State for pulling weights
  const [isPullingWeights, setIsPullingWeights] = useState<boolean>(false);
  const [pullProgress, setPullProgress] = useState<number>(0);
  const [pullSuccess, setPullSuccess] = useState<boolean>(false);

  const handlePullWeights = () => {
    setIsPullingWeights(true);
    setPullProgress(0);
    const interval = setInterval(() => {
      setPullProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPullingWeights(false);
          setPullSuccess(true);
          setTimeout(() => setPullSuccess(false), 4000);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div className="space-y-8 text-left font-sans">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-cyan-950/40 border border-cyan-500/40 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>DEVELOPER & AI MODEL HUB</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
              Connected Accounts & Developer Integrations
            </h2>
            <p className="text-sm font-sans text-zinc-300 leading-relaxed">
              Connect GitHub and Hugging Face via OAuth to pull model weights directly into your studio dashboard and push code projects, audio DSP pipelines, and visualizers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-black/80 border border-zinc-800 text-center font-mono">
              <span className="text-xl font-bold text-cyan-400 block">2 OAuth</span>
              <span className="text-[10px] text-zinc-500 uppercase">Hubs Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Accounts Quick OAuth Settings Panel */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 font-mono text-xs shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="font-bold text-white uppercase text-xs flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" /> Connected OAuth Accounts
          </span>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            OAuth Credentials Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-black border border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="w-6 h-6 text-white" />
              <div>
                <strong className="text-white font-bold block">GitHub Account</strong>
                <span className="text-zinc-500 text-[10px]">Connected as @{githubAccount}</span>
              </div>
            </div>
            <button
              onClick={() => setGithubConnected(!githubConnected)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-cyan-400 border border-zinc-800 uppercase"
            >
              {githubConnected ? 'OAuth Synced' : 'Connect'}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-black border border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-amber-400" />
              <div>
                <strong className="text-white font-bold block">Hugging Face Account</strong>
                <span className="text-zinc-500 text-[10px]">Connected as @{hfAccount}</span>
              </div>
            </div>
            <button
              onClick={() => setHfConnected(!hfConnected)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-amber-400 border border-zinc-800 uppercase"
            >
              {hfConnected ? 'OAuth Synced' : 'Connect'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: GitHub Left, Hugging Face Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ==================== 1. GITHUB INTEGRATION ==================== */}
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                    GitHub Workspace
                    {githubConnected && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[9px] border border-emerald-800 font-mono font-bold uppercase">
                        CONNECTED
                      </span>
                    )}
                  </h3>
                  <p className="text-xs font-sans text-zinc-400">
                    Sync code, audio synthesis scripts, and release assets
                  </p>
                </div>
              </div>

              <button
                onClick={() => setGithubConnected(!githubConnected)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-colors ${
                  githubConnected 
                    ? 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800' 
                    : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                {githubConnected ? 'Disconnect' : 'Connect GitHub'}
              </button>
            </div>

            {/* Token & Org Form */}
            <div className="p-4 rounded-2xl bg-black border border-zinc-900 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 text-[10px] uppercase">
                <span>Account / Organization</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> OAuth Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1">GitHub Org</label>
                  <input
                    type="text"
                    value={githubAccount}
                    onChange={(e) => setGithubAccount(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 rounded-xl focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1">Personal Access Token</label>
                  <input
                    type="password"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-cyan-400 px-3 py-2 rounded-xl focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Repositories List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-400 uppercase">
                <span>Synced Studio Repositories ({repos.length})</span>
                <span className="text-cyan-400 cursor-pointer hover:underline text-[10px]">
                  + Connect New Repo
                </span>
              </div>

              <div className="space-y-2">
                {repos.map((repo) => (
                  <div
                    key={repo.name}
                    onClick={() => setSelectedRepo(repo.name)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedRepo === repo.name
                        ? 'bg-zinc-900/90 border-cyan-500 text-white shadow-lg shadow-cyan-950/50'
                        : 'bg-black border-zinc-900 text-zinc-300 hover:border-zinc-800'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <GitBranch className="w-4 h-4 text-cyan-400" />
                        <span className="font-mono font-bold text-xs">{repo.name}</span>
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-[9px] font-mono text-zinc-400">
                          {repo.branch}
                        </span>
                      </div>
                      <p className="text-[11px] font-sans text-zinc-400">{repo.lastCommit}</p>
                    </div>

                    <div className="text-right font-mono text-[10px] text-zinc-500">
                      <div>★ {repo.stars} stars</div>
                      <div>{repo.commitsCount} commits</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow Trigger Action */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" /> GitHub Actions CI/CD Pipeline
                </span>
                <span className="text-[10px] text-zinc-400">Workflow: release-audio-stems.yml</span>
              </div>

              {workflowTriggered ? (
                <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-[11px] flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Workflow triggered on <strong>{selectedRepo}</strong>! Audio stems pushed to release assets.</span>
                </div>
              ) : (
                <button
                  onClick={handleTriggerWorkflow}
                  disabled={isSyncingRepo}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20"
                >
                  {isSyncingRepo ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Triggering Build & Release Pipeline...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Export Audio Stems & Trigger GitHub Build</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ==================== 2. HUGGING FACE INTEGRATION ==================== */}
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                    Hugging Face Hub
                    {hfConnected && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 text-[9px] border border-amber-800 font-mono font-bold uppercase">
                        PRO TIER
                      </span>
                    )}
                  </h3>
                  <p className="text-xs font-sans text-zinc-400">
                    Deploy AI model checkpoints, LoRAs, and Inference Endpoints
                  </p>
                </div>
              </div>

              <button
                onClick={() => setHfConnected(!hfConnected)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-colors ${
                  hfConnected 
                    ? 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800' 
                    : 'bg-amber-500 text-black hover:bg-amber-400'
                }`}
              >
                {hfConnected ? 'Disconnect' : 'Connect HF Hub'}
              </button>
            </div>

            {/* HF Token Form */}
            <div className="p-4 rounded-2xl bg-black border border-zinc-900 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 text-[10px] uppercase">
                <span>HF User Access Token</span>
                <span className="text-amber-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Token Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1">HF Username / Org</label>
                  <input
                    type="text"
                    value={hfAccount}
                    onChange={(e) => setHfAccount(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1">User Token (hf_...)</label>
                  <input
                    type="password"
                    value={hfToken}
                    onChange={(e) => setHfToken(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-amber-400 px-3 py-2 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Model Checkpoints & LoRAs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-400 uppercase">
                <span>Custom Model Repositories ({hfModels.length})</span>
                <span className="text-amber-400 cursor-pointer hover:underline text-[10px]">
                  + Push New Weights
                </span>
              </div>

              <div className="space-y-2">
                {hfModels.map((m) => (
                  <div
                    key={m.name}
                    onClick={() => setSelectedHfModel(m.name)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedHfModel === m.name
                        ? 'bg-amber-950/30 border-amber-500 text-white shadow-lg shadow-amber-950/40'
                        : 'bg-black border-zinc-900 text-zinc-300 hover:border-zinc-800'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-400" />
                        <span className="font-mono font-bold text-xs">{m.name}</span>
                      </div>
                      <p className="text-[11px] font-sans text-zinc-400">{m.type}</p>
                    </div>

                    <div className="text-right font-mono text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold uppercase block mb-1">
                        {m.status}
                      </span>
                      <span className="text-zinc-500">{m.downloads} downloads</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HF Spaces & GPU Endpoints */}
            <div className="space-y-2 p-4 rounded-2xl bg-black border border-zinc-900 font-mono text-xs">
              <span className="text-zinc-400 text-[10px] font-bold uppercase block">
                ACTIVE INFERENCE ENDPOINTS & SPACES
              </span>

              <div className="space-y-2 pt-1">
                {hfSpaces.map((space) => (
                  <div key={space.name} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">{space.name}</span>
                      <span className="text-zinc-500 text-[10px]">{space.gpu}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400 text-[10px] font-bold">
                        {space.status} ({space.latency})
                      </span>
                      <a
                        href={`https://huggingface.co/spaces/${space.name}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-black text-zinc-400 hover:text-white"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pull Model Weights Action Button */}
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Pull Model Weights to Studio
                </span>
                <span className="text-[10px] text-zinc-400">Target: {selectedHfModel}</span>
              </div>

              {isPullingWeights ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>Downloading Checkpoint Safetensors...</span>
                    <span className="text-amber-400 font-bold">{pullProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-zinc-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                      style={{ width: `${pullProgress}%` }}
                    />
                  </div>
                </div>
              ) : pullSuccess ? (
                <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-[11px] flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Successfully pulled <strong>{selectedHfModel}</strong> weights into local studio engine!</span>
                </div>
              ) : (
                <button
                  onClick={handlePullWeights}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Pull Selected Model Weights Direct to Dashboard</span>
                </button>
              )}
            </div>

            {/* Deploy Space Action Button */}
            <button
              onClick={handleDeploySpace}
              disabled={isDeployingSpace}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-zinc-800 via-zinc-900 to-black hover:bg-zinc-800 text-white font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 border border-zinc-700"
            >
              {isDeployingSpace ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Syncing Weights to Hugging Face Hub...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Sync Model Checkpoints & Deploy Space</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
