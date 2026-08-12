import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState('');

  const validateEmail = (emailStr: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailStr.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address (e.g. producer@redvisionai.com).');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    setTimeout(() => {
      setStatus('success');
      setSubscribedEmail(email.trim());
      setEmail('');

      try {
        const existingSubs = JSON.parse(localStorage.getItem('redvision_newsletter_subs') || '[]');
        existingSubs.push({
          email: email.trim(),
          date: new Date().toISOString()
        });
        localStorage.setItem('redvision_newsletter_subs', JSON.stringify(existingSubs));
      } catch {
        // Fallback for private browsing
      }
    }, 600);
  };

  return (
    <section className="w-full bg-black border-t border-zinc-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Accent Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Text Block */}
          <div className="text-left space-y-1.5 md:max-w-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-red-500">
                Studio Dispatch
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Stay ahead with Red Vision updates
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Get confidential audio algorithms, 4K cinema presets, and executive AI management playbooks delivered directly to your inbox.
            </p>
          </div>

          {/* Right Signup Form / Success Block */}
          <div className="w-full md:w-auto md:min-w-[380px]">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="p-4 rounded-xl bg-zinc-900 border border-emerald-500/40 text-left space-y-2"
                >
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Subscribed Successfully</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    Welcome aboard! Dispatch sent to <strong className="text-white">{subscribedEmail}</strong>.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-[11px] font-mono text-zinc-400 hover:text-white underline font-semibold transition-colors"
                  >
                    Register another email
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-2 text-left"
                  noValidate
                >
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === 'error') {
                            setStatus('idle');
                            setErrorMessage('');
                          }
                        }}
                        placeholder="Enter your email address"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border text-white placeholder-zinc-500 font-sans text-xs focus:outline-none transition-all ${
                          status === 'error'
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-zinc-800 focus:border-red-600 focus:ring-1 focus:ring-red-600'
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md shadow-red-600/20 disabled:opacity-50"
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Joining...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Privacy note & error notice */}
                  <div className="flex items-center justify-between px-1">
                    {status === 'error' ? (
                      <motion.div
                        initial={{ opacity: 0, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 text-red-400 font-mono text-[10px]"
                      >
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                        <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>No spam. Unsubscribe anytime.</span>
                      </div>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

