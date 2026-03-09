import { AnimatedSection, Card, CardDescription, CardHeader, CardTitle } from '@repo/ui'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronRight, Code2, GitBranch, Sparkles, Sword, TrendingUp } from 'lucide-react'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { ThemeToggle } from '@/components/ThemeToggle'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute('/talks/')({
  component: TalksIndex,
})

export function TalksIndex() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-16">
      {/* Breadcrumb */}
      <div className="fixed left-6 top-6 z-50 flex items-center gap-1.5">
        <Link
          to="/"
          className="text-xs font-bold tracking-wider text-muted-foreground/70 hover:text-foreground transition-colors uppercase"
        >
          Roxabi
        </Link>
        <ChevronRight className="size-3 text-muted-foreground/40" aria-hidden="true" />
        <span className="text-xs font-bold tracking-wider text-muted-foreground/50 uppercase">
          {m.talk_index_title()}
        </span>
      </div>

      {/* Locale switcher + Theme toggle */}
      <div className="fixed right-6 top-6 z-50 flex items-center gap-2">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>

      <AnimatedSection className="w-full max-w-4xl">
        <h1 className="mb-12 text-center text-4xl font-bold tracking-tight lg:text-5xl">
          {m.talk_index_title()}
        </h1>

        {/* Top row: standalone talks */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Link to="/talks/claude-code" className="group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Card className="h-full transition-[box-shadow,border-color] duration-300 hover:shadow-lg hover:border-primary/40">
              <CardHeader className="p-6">
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Code2 className="size-5" aria-hidden="true" />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>{m.talk_index_claude_code_title()}</CardTitle>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground/40 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5 group-hover:text-primary mt-0.5" aria-hidden="true" />
                </div>
                <CardDescription className="mt-2">
                  {m.talk_index_claude_code_subtitle()}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/talks/dev-process" className="group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Card className="h-full transition-[box-shadow,border-color] duration-300 hover:shadow-lg hover:border-chart-1/40">
              <CardHeader className="p-6">
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-chart-1/10 text-chart-1">
                  <GitBranch className="size-5" aria-hidden="true" />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>{m.talk_index_devprocess_title()}</CardTitle>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground/40 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5 group-hover:text-chart-1 mt-0.5" aria-hidden="true" />
                </div>
                <CardDescription className="mt-2">
                  {m.talk_index_devprocess_subtitle()}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Lyra group */}
        <div className="mt-8 rounded-xl border border-border/50 bg-muted/20 p-4">
          <div className="mb-4 px-1">
            <p className="text-base font-semibold text-foreground">{m.talk_index_lyra_group()}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{m.talk_index_lyra_group_subtitle()}</p>
          </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Link to="/talks/lyra-story" className="group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Card className="h-full transition-[box-shadow,border-color] duration-300 hover:shadow-lg hover:border-chart-2/40">
              <CardHeader className="p-6">
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-chart-2/10 text-chart-2">
                  <Sparkles className="size-5" aria-hidden="true" />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>{m.talk_index_lyrastory_title()}</CardTitle>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground/40 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5 group-hover:text-chart-2 mt-0.5" aria-hidden="true" />
                </div>
                <CardDescription className="mt-2">
                  {m.talk_index_lyrastory_subtitle()}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/talks/lyra-dev" className="group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Card className="h-full transition-[box-shadow,border-color] duration-300 hover:shadow-lg hover:border-emerald-500/40">
              <CardHeader className="p-6">
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Sword className="size-5" aria-hidden="true" />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>{m.talk_index_lyradev_title()}</CardTitle>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground/40 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5 group-hover:text-emerald-500 mt-0.5" aria-hidden="true" />
                </div>
                <CardDescription className="mt-2">
                  {m.talk_index_lyradev_subtitle()}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/talks/lyra-product" className="group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Card className="h-full transition-[box-shadow,border-color] duration-300 hover:shadow-lg hover:border-amber-500/40">
              <CardHeader className="p-6">
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <TrendingUp className="size-5" aria-hidden="true" />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>{m.talk_index_lyraproduct_title()}</CardTitle>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground/40 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5 group-hover:text-amber-500 mt-0.5" aria-hidden="true" />
                </div>
                <CardDescription className="mt-2">
                  {m.talk_index_lyraproduct_subtitle()}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
