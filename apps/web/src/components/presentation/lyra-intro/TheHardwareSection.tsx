import { AnimatedSection, Badge } from '@repo/ui'
import { m } from '@/paraglide/messages'

export default function TheHardwareSection() {
  return (
    <div className="relative mx-auto max-w-4xl w-full">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-slate-500/5 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-violet-500/5 blur-[120px]" />
      </div>

      <div className="relative">
        <AnimatedSection>
          <div className="mb-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            {m.talk_li_hw_phase()}
          </div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl mb-8 font-mono text-foreground">
            {m.talk_li_hw_title_prefix()}{' '}
            <span className="text-cyan-500 dark:text-cyan-400">{m.talk_li_hw_title_highlight()}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-4">
          <div className="flex flex-col sm:flex-row items-stretch gap-4 max-w-3xl">
            {/* Machine 1 */}
            <div className="flex-1 rounded-xl border border-slate-400/20 bg-slate-500/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <p className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">
                  {m.talk_li_hw_m1_label()}
                </p>
              </div>
              <p className="font-mono text-xs text-foreground/80 mb-1">{m.talk_li_hw_m1_hostname()}</p>
              <p className="font-mono text-xs text-muted-foreground/60 mb-4">{m.talk_li_hw_m1_network()}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground">{m.talk_li_hw_m1_gpu_label()}</span>
                  <span className="font-mono text-[11px] text-foreground/80">{m.talk_li_hw_m1_gpu_value()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground">{m.talk_li_hw_m1_vram_label()}</span>
                  <span className="font-mono text-[11px] text-foreground/80">{m.talk_li_hw_m1_vram_value()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground">{m.talk_li_hw_m1_workloads_label()}</span>
                  <span className="font-mono text-[11px] text-foreground/80">{m.talk_li_hw_m1_workloads_value()}</span>
                </div>
              </div>
            </div>

            {/* Connector */}
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <span className="font-mono text-cyan-400 text-xl">⇄</span>
                <p className="font-mono text-[9px] text-cyan-400/50 text-center">
                  httpx async
                  <br />
                  local network
                </p>
              </div>
            </div>

            {/* Machine 2 */}
            <div className="flex-1 rounded-xl border border-violet-400/20 bg-violet-500/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-violet-400" />
                <p className="font-mono text-[10px] text-violet-400 uppercase tracking-widest">
                  {m.talk_li_hw_m2_label()}
                </p>
              </div>
              <p className="font-mono text-xs text-foreground/80 mb-1">{m.talk_li_hw_m2_hostname()}</p>
              <p className="font-mono text-xs text-muted-foreground/60 mb-4">{m.talk_li_hw_m2_network()}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground">{m.talk_li_hw_m2_gpu_label()}</span>
                  <span className="font-mono text-[11px] text-foreground/80">{m.talk_li_hw_m2_gpu_value()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground">{m.talk_li_hw_m2_vram_label()}</span>
                  <span className="font-mono text-[11px] text-foreground/80">{m.talk_li_hw_m2_vram_value()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground">{m.talk_li_hw_m2_workloads_label()}</span>
                  <span className="font-mono text-[11px] text-foreground/80">{m.talk_li_hw_m2_workloads_value()}</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-6">
          <Badge className="border border-cyan-400/40 bg-cyan-500/8 text-cyan-600 dark:text-cyan-300 font-mono text-[10px] tracking-widest">
            {m.talk_li_hw_badge()}
          </Badge>
        </AnimatedSection>
      </div>
    </div>
  )
}
