/**
 * Helper utility to identify and style AI tools consistently across the portfolio.
 * Highlights AI-Assisted Workflow tools (Google AI Studio, Gemini, Claude, etc.)
 * with distinctive purple-cyan gradient styling.
 */

export const isAiTool = (toolName: string): boolean => {
  if (!toolName) return false;
  const n = toolName.toLowerCase().trim();
  return (
    n.includes('google ai studio') ||
    n.includes('gemini') ||
    n.includes('claude') ||
    n.includes('anthropic') ||
    n.includes('chatgpt') ||
    n.includes('runway') ||
    n.includes('pika') ||
    n.includes('midjourney') ||
    n.includes('prompt engineering') ||
    n.includes('elevenlabs')
  );
};

export const getToolBadgeClass = (toolName: string, isSmall: boolean = false): string => {
  const isAi = isAiTool(toolName);
  if (isAi) {
    return isSmall
      ? 'px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-semibold transition-all duration-200 inline-flex items-center gap-1 bg-gradient-to-r from-purple-500/15 via-cyan-500/10 to-purple-500/15 dark:from-purple-950/60 dark:via-cyan-950/40 dark:to-purple-950/60 border border-purple-400/40 dark:border-purple-400/50 text-purple-800 dark:text-cyan-300 shadow-[0_0_10px_rgba(168,85,247,0.18)]'
      : 'px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-semibold transition-all duration-200 inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-500/15 via-indigo-500/10 to-cyan-500/15 dark:from-purple-950/60 dark:via-cyan-950/40 dark:to-purple-950/60 border border-purple-400/40 dark:border-purple-400/50 text-purple-900 dark:text-cyan-300 shadow-[0_0_12px_rgba(168,85,247,0.18)]';
  }
  return isSmall
    ? 'px-2.5 py-1 rounded-md dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200 border text-slate-800 dark:text-gray-300 text-[10px] font-mono uppercase font-semibold'
    : 'px-3 py-1.5 rounded-lg dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200 border text-slate-800 dark:text-gray-300 text-xs font-mono uppercase font-semibold';
};
