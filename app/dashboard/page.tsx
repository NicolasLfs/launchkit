"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Rocket,
  Menu,
  Search,
  Bell,
  ChevronRight,
  LayoutDashboard,
  Folder,
  BarChart3,
  Users,
  Building2,
  CreditCard,
  Settings,
  BookOpen,
  HelpCircle,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Play,
  UserPlus,
  FileText,
  X,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ModeToggle } from "@/components/theme/toggle-theme";
import { authClient } from "@/lib/auth-client";


// ── Data ──────────────────────────────────────────────────────────────────────

const chartData = [
  { day: "Seg", value: 65 },
  { day: "Ter", value: 110 },
  { day: "Qua", value: 88 },
  { day: "Qui", value: 175 },
  { day: "Sex", value: 142 },
  { day: "Sáb", value: 95 },
  { day: "Dom", value: 128 },
];

const stats: StatItem[] = [
  {
    icon: CreditCard,
    label: "Receita",
    value: "R$ 12.450",
    trend: "+23%",
    direction: "up" as const,
    note: "vs mês passado",
  },
  {
    icon: Users,
    label: "Usuários",
    value: "1.234",
    trend: "+12%",
    direction: "up" as const,
    note: "vs mês passado",
  },
  {
    icon: Folder,
    label: "Projetos",
    value: "8",
    trend: "0%",
    direction: "neutral" as const,
    note: "vs mês passado",
  },
];

const quickActions = [
  { icon: Play, label: "Novo Deploy", color: "text-emerald-400" },
  { icon: UserPlus, label: "Convidar Usuário", color: "text-blue-400" },
  { icon: CreditCard, label: "Ver Billing", color: "text-amber-400" },
  { icon: BookOpen, label: "Documentação", color: "text-zinc-400" },
];

const activity = [
  {
    dot: "bg-emerald-500",
    title: "Deploy realizado com sucesso",
    desc: 'Projeto "MeuSaaS" em produção',
    time: "2 min atrás",
  },
  {
    dot: "bg-blue-500",
    title: "Novo usuário cadastrado",
    desc: "nicolas@email.com",
    time: "1 hora atrás",
  },
  {
    dot: "bg-emerald-500",
    title: "Assinatura Pro ativada",
    desc: "Plano mensal — R$ 97,00",
    time: "3 horas atrás",
  },
  {
    dot: "bg-amber-500",
    title: "Alerta: uso de banco em 80%",
    desc: "Recomendado: upgrade para plano Pro",
    time: "5 horas atrás",
  },
  {
    dot: "bg-blue-500",
    title: "Webhook recebido",
    desc: "stripe.payment_intent.succeeded",
    time: "6 horas atrás",
  },
];

const navGroups: NavGroup[] = [
  {
    label: "Principal",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", active: true },
      { icon: Folder, label: "Projetos" },
      { icon: BarChart3, label: "Analytics" },
    ],
  },
  {
    label: "Gerenciamento",
    items: [
      { icon: Users, label: "Usuários" },
      { icon: Building2, label: "Organização" },
      { icon: CreditCard, label: "Billing" },
    ],
  },
  {
    label: "Sistema",
    items: [
      { icon: Settings, label: "Configurações"},
      { icon: BookOpen, label: "Documentação", external: true },
      { icon: HelpCircle, label: "Suporte", external: true },
    ],
  },
];

// ── Custom tooltip ─────────────────────────────────────────────────────────────

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#262626] border border-[#404040] rounded-lg px-3 py-2 text-sm">
      <p className="text-[#a1a1aa]">{label}</p>
      <p className="text-white font-medium font-mono">
        {payload[0].value} eventos
      </p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFirstVisit] = useState(false);

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 h-16 bg-background/90 backdrop-blur-md border-b border-border flex items-center px-4 gap-4">
        {/* Left */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <Rocket size={16} className="text-primary" />
          <span className="text-foreground font-semibold text-lg tracking-tight">
            LaunchKit
          </span>
        </div>

        <span className="hidden md:block border-l border-border h-6" />
        <span className="hidden md:block text-muted-foreground text-sm">
          Dashboard
        </span>

        {/* Right */}
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 bg-card border border-border rounded-md px-3 py-1.5 w-64">
            <Search size={14} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
            />
          </div>

          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-destructive" />
          </button>

         <ModeToggle />

          <button className="flex items-center gap-2 p-1 rounded-full border border-border hover:border-muted-foreground transition-colors">
            <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-xs font-semibold">
              U
            </div>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── SIDEBAR MOBILE OVERLAY ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── SIDEBAR ── */}
        <aside
          className={`
            fixed md:sticky z-40 h-[calc(100vh-64px)]
            w-60 bg-card border-r border-border
            flex flex-col py-4 px-3 shrink-0
            transition-transform duration-200
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>

          <nav className="flex-1 overflow-y-auto space-y-0">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider px-3 mt-6 mb-2">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <button
                    key={item.label}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors relative
                      ${
                        item.active
                          ? "bg-primary/10 text-primary before:absolute before:right-0 before:top-1 before:bottom-1 before:w-0.5 before:bg-primary before:rounded-l"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }
                    `}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                    {item.external && (
                      <ArrowUpRight size={13} className="ml-auto opacity-50" />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          {/* User card */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-xs font-semibold shrink-0">
                U
              </div>
              <div className="min-w-0">
                <p className="text-foreground text-sm font-medium truncate">
                  Usuário
                </p>
                <p className="text-muted-foreground text-xs truncate">
                  user@launchkit.io
                </p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="ml-auto text-xs font-medium text-primary hover:text-primary/80"
              >
                Sign out
              </button>
              <span className="ml-3 shrink-0 bg-primary/10 text-primary border border-primary/20 text-[10px] font-medium px-1.5 py-0.5 rounded">
                Pro
              </span>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6 min-w-0">
          {isFirstVisit ? (
            <EmptyState />
          ) : (
            <div className="space-y-6">
              {/* Page header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-foreground text-2xl font-semibold">
                    Dashboard
                  </h1>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    Visão geral do seu SaaS
                  </p>
                </div>
                <button className="shrink-0 flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-4 py-2 rounded-md transition-colors">
                  <Plus size={16} />
                  Novo Projeto
                </button>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((s) => (
                  <StatCard key={s.label} {...s} />
                ))}
              </div>

              {/* Chart + Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <ActivityChart />
                </div>
                <div>
                  <QuickActions />
                </div>
              </div>

              {/* Recent Activity */}
              <RecentActivity />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  direction,
  note,
}: (typeof stats)[0]) {
  const trendColor =
    direction === "up"
      ? "text-emerald-400"
      : direction === "down"
        ? "text-red-400"
        : "text-[#a1a1aa]";

  const TrendIcon =
    direction === "up"
      ? ArrowUpRight
      : direction === "down"
        ? ArrowDownRight
        : Minus;

  return (
    <div className="bg-[#171717] border border-[#262626] rounded-xl p-6 hover:border-[#404040] transition-colors">
      <div className="w-10 h-10 bg-[#262626] rounded-lg flex items-center justify-center mb-4">
        <Icon size={20} className="text-emerald-500" />
      </div>
      <p className="text-[#a1a1aa] text-sm">{label}</p>
      <p className="text-white text-2xl font-bold font-mono mt-1">{value}</p>
      <div className="flex items-center gap-1.5 mt-2">
        <span
          className={`flex items-center gap-0.5 text-sm font-medium ${trendColor}`}
        >
          <TrendIcon size={14} />
          {trend}
        </span>
        <span className="text-[#71717a] text-xs">{note}</span>
      </div>
    </div>
  );
}

// ── Activity Chart ─────────────────────────────────────────────────────────────

function ActivityChart() {
  return (
    <div className="bg-[#171717] border border-[#262626] rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-base font-medium">
          Atividade (últimos 7 dias)
        </h2>
        <select className="bg-[#262626] text-[#d4d4d8] border border-[#404040] rounded-md px-3 py-1 text-sm outline-none">
          <option>Semanal</option>
          <option>Mensal</option>
        </select>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#262626"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "#71717a", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#71717a", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ stroke: "#404040", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#emeraldGrad)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#10b981",
                stroke: "#0a0a0a",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Quick Actions ──────────────────────────────────────────────────────────────

function QuickActions() {
  return (
    <div className="bg-[#171717] border border-[#262626] rounded-xl p-6 h-full">
      <h2 className="text-white text-base font-medium mb-4">Ações Rápidas</h2>
      <ul>
        {quickActions.map((action, i) => (
          <li key={action.label}>
            <button
              className={`w-full flex items-center gap-3 py-3 hover:bg-[#262626] -mx-2 px-2 rounded-lg transition-colors ${
                i < quickActions.length - 1 ? "border-b border-[#262626]" : ""
              }`}
            >
              <div className="w-9 h-9 bg-[#262626] rounded-lg flex items-center justify-center shrink-0">
                <action.icon size={18} className={action.color} />
              </div>
              <span className="text-[#d4d4d8] text-sm hover:text-white">
                {action.label}
              </span>
              <ChevronRight size={16} className="text-[#52525b] ml-auto" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Recent Activity ────────────────────────────────────────────────────────────

function RecentActivity() {
  return (
    <div className="bg-[#171717] border border-[#262626] rounded-xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626]">
        <h2 className="text-white text-base font-medium">Atividade Recente</h2>
        <button className="text-emerald-400 text-sm hover:underline">
          Ver tudo →
        </button>
      </div>
      <ul>
        {activity.map((item, i) => (
          <li
            key={i}
            className={`flex items-start gap-4 px-6 py-4 hover:bg-[#262626]/30 transition-colors ${
              i < activity.length - 1 ? "border-b border-[#262626]" : ""
            }`}
          >
            <div className="mt-1.5 shrink-0">
              <span className={`block w-2 h-2 rounded-full ${item.dot}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#e4e4e7] text-sm">{item.title}</p>
              <p className="text-[#71717a] text-[13px] mt-0.5">{item.desc}</p>
            </div>
            <span className="text-[#52525b] text-xs shrink-0 mt-0.5 hidden sm:block">
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
        <Rocket size={32} className="text-emerald-500" />
      </div>
      <h2 className="text-white text-xl font-semibold">
        Bem-vindo ao LaunchKit!
      </h2>
      <p className="text-[#a1a1aa] text-sm mt-2 max-w-md">
        Seu SaaS está pronto. Comece criando seu primeiro projeto ou siga o guia
        de primeiros passos.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black px-5 py-2.5 rounded-md text-sm font-medium transition-colors">
          <Plus size={16} />
          Criar Primeiro Projeto
        </button>
        <button className="flex items-center gap-2 border border-[#404040] text-white hover:bg-[#262626] px-5 py-2.5 rounded-md text-sm font-medium transition-colors">
          <FileText size={16} />
          Ver Guia
        </button>
      </div>
    </div>
  );
}
