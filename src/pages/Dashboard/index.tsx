import React, { useEffect, useRef, useState } from 'react';
import { Users, Activity, DollarSign, TrendingUp, Search, BarChart3, Globe, Zap, MapPin, Moon, Sun, ArrowRightCircle, ShoppingCart, MousePointerClick, ArrowDownCircle, Monitor } from 'lucide-react';
import Chart from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';
import Button from '@/components/Base/Button';
import { TbRefresh } from 'react-icons/tb';
import { useAppSelector } from '@/stores/hooks';
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";

interface StatCardProps {
  title: string;
  value: string;
  subValue: string;
  icon: React.ElementType;
  colorClass: string;
  darkColorClass?: string;
}

interface RealTimeCardProps {
  title: string;
  value: string | number;
  subText?: string;
  icon?: React.ElementType;
}

interface ActivityDisplayData {
  id: string;
  type: 'lead' | 'conversion' | 'event' | 'pageview';
  badge: string;
  title: string;
  subtitle: string;
  value?: string;
  timestamp: string;
  color: 'purple' | 'green' | 'blue' | 'orange';
  icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subValue, icon: Icon, colorClass, darkColorClass }) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between transition-colors duration-200">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${colorClass} ${darkColorClass || ''}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="flex items-center text-xs font-medium text-emerald-500">
      <TrendingUp className="w-3 h-3 mr-1" />
      <span>{subValue} vs ontem</span>
    </div>
  </div>
);

const RealTimeCard: React.FC<RealTimeCardProps> = ({ title, value, subText, icon: Icon }) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center h-full transition-colors duration-200">
    <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400 text-sm">
      {Icon && <Icon className="w-4 h-4" />}
      <span>{title}</span>
    </div>
    <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{value}</h3>
    {subText && <p className="text-xs text-gray-400 dark:text-gray-500">{subText}</p>}
  </div>
);

const ActivityItem: React.FC<{ data: ActivityDisplayData }> = ({ data }) => {
  const themes = {
    purple: { bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', badge: 'bg-purple-100 text-purple-700' },
    green: { bg: 'bg-emerald-100 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-100 text-emerald-700' },
    blue: { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', badge: 'bg-blue-100 text-blue-700' },
    orange: { bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400', badge: 'bg-orange-100 text-orange-700' },
  };

  const theme = themes[data.color];
  const Icon = data.icon;

  return (
    <div className="p-4 bg-white dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 flex gap-4 items-start animate-in fade-in slide-in-from-top-2 duration-300">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${theme.bg} ${theme.text}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${theme.badge}`}>
            {data.badge}
          </span>
          {data.value && (
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {data.value}
            </span>
          )}
        </div>
        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5 truncate">
          {data.title}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
          {data.subtitle}
        </p>
        <p className="text-[10px] text-gray-400 mt-2">
          {data.timestamp}
        </p>
      </div>
    </div>
  );
};

function formatActivity(raw: any): ActivityDisplayData {
  const base = {
    id: raw.id || Math.random().toString(),
    timestamp: 'agora mesmo',
  };

  const type = raw.type || raw.event_name;
  const data = raw.data || {};

  if (type === 'scroll_depth') {
    return {
      ...base,
      type: 'event',
      badge: 'Engajamento',
      title: `Scroll ${data.scroll_depth || 0}%`,
      subtitle: `${data.device?.device || 'Visitante'} via ${data.device?.browser || 'Web'}`,
      color: 'orange',
      icon: ArrowDownCircle
    };
  }

  if (type === 'lead' || type === 'form_submit') {
    return {
      ...base,
      type: 'lead',
      badge: 'Lead',
      title: 'Lead anônimo',
      subtitle: 'Novo visitante identificado',
      color: 'purple',
      icon: Users
    };
  }

  if (type === 'conversion' || type === 'purchase') {
    return {
      ...base,
      type: 'conversion',
      badge: 'Conversão',
      title: 'Nova Compra',
      subtitle: 'Pagamento confirmado',
      value: `R$ ${data.value || '0,00'}`,
      color: 'green',
      icon: ShoppingCart
    };
  }

  return {
    ...base,
    type: 'pageview',
    badge: 'PageView',
    title: 'Page View',
    subtitle: raw.url || data.url || 'Navegação no site',
    color: 'blue',
    icon: Monitor
  };
}

function connectInstagramWebSocket({
  workspace,
  connectionId,
  token,
  wsRef,
  onNewActivity,
  onStatusChange
}: {
  workspace: string;
  connectionId: string;
  token: string;
  wsRef: React.MutableRefObject<WebSocket | null>;
  onNewActivity: (item: ActivityDisplayData) => void;
  onStatusChange: (status: boolean) => void;
}) {
  const baseUrl = import.meta.env.VITE_CONNECTION_SOCKET_URL || 'wss://websocket.astenir.com/ws/connection';

  const wsUrl =
    baseUrl +
    `?workspace=${encodeURIComponent(workspace)}` +
    `&connection=${encodeURIComponent(connectionId)}` +
    `&token=${encodeURIComponent(token)}`;

  if (wsRef.current) {
    wsRef.current.close();
  }

  const ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    onStatusChange(true);
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.changes) {
        data.changes.forEach((change: any) => {
          onNewActivity(formatActivity(change.value || change));
        });
      } else {
        onNewActivity(formatActivity(data));
      }
    } catch { }
  };

  ws.onerror = () => { };

  ws.onclose = () => {
    onStatusChange(false);
    wsRef.current = null;
  };

  wsRef.current = ws;
}

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const params = useParams();

  const wsRef = useRef<WebSocket | null>(null);

  const [activities, setActivities] = useState<ActivityDisplayData[]>([]);
  const [wsConnected, setWsConnected] = useState(false);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { t } = useTranslation();

  useEffect(() => {
    const WORKSPACE_ID = params?.workspace_id;
    const CONNECTION_ID = "6980f8575e8b694a5f44c146";
    const TOKEN = accessToken;

    if (WORKSPACE_ID && TOKEN) {
      connectInstagramWebSocket({
        workspace: WORKSPACE_ID,
        connectionId: CONNECTION_ID,
        token: TOKEN,
        wsRef,
        onStatusChange: setWsConnected,
        onNewActivity: (item) => {
          setActivities(prev => [item, ...prev].slice(0, 50));
        },
      });
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [params?.workspace_id, accessToken]);


  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const gradientLeads = ctx.createLinearGradient(0, 0, 0, 400);
    gradientLeads.addColorStop(0, 'rgba(139, 92, 246, 0.5)');
    gradientLeads.addColorStop(1, 'rgba(139, 92, 246, 0.0)');

    const gradientEventos = ctx.createLinearGradient(0, 0, 0, 400);
    gradientEventos.addColorStop(0, 'rgba(16, 185, 129, 0.5)');
    gradientEventos.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `${i + 1}/1`),
        datasets: [
          {
            label: 'Leads',
            data: Array(30).fill(0),
            borderColor: '#8b5cf6',
            backgroundColor: gradientLeads,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointBackgroundColor: '#8b5cf6',
            borderWidth: 2,
          },
          {
            label: t('events'),
            data: Array(30).fill(0),
            borderColor: '#10b981',
            backgroundColor: gradientEventos,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointBackgroundColor: '#10b981',
            borderWidth: 2,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              padding: 20,
              color: darkMode ? '#9ca3af' : '#6b7280',
              font: { size: 12 }
            }
          },
          tooltip: {
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            titleColor: darkMode ? '#f3f4f6' : '#111827',
            bodyColor: darkMode ? '#d1d5db' : '#4b5563',
            borderColor: darkMode ? '#374151' : '#e5e7eb',
            borderWidth: 1,
            padding: 10,
            boxPadding: 4,
            displayColors: true,
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: darkMode ? '#6b7280' : '#9ca3af', font: { size: 10 }, maxRotation: 0, maxTicksLimit: 15 },
            border: { display: false }
          },
          y: {
            grid: { color: darkMode ? '#374151' : '#f3f4f6', tickBorderDash: [5, 5] },
            ticks: { color: darkMode ? '#6b7280' : '#9ca3af', font: { size: 10 }, stepSize: 1 },
            border: { display: false },
            min: 0,
            max: 4,
          }
        }
      }
    };

    chartInstance.current = new Chart(ctx, config);

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [darkMode]);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className='flex flex-col'>
        <h1 className="text-2xl font-bold text-foreground text-white">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-gray-200">
          {`${t('overview_of_the_project')}`}
        </p>
      </div>

      <div className="min-h-screen box box--stacked p-6 md:p-8 font-sans transition-colors duration-200 mt-8">
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide items-center justify-between">
          <div>
            {[t('overview'), 'Meta Ads', t('GA4_summary'), t('GA4_advanced'), 'Search Console'].map((tab, index) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${index === 0
                  ? 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
                  }`}
              >
                {index !== 0 && index < 3 && <BarChart3 className="inline w-4 h-4 mr-2 mb-0.5" />}
                {index === 4 && <Search className="inline w-4 h-4 mr-2 mb-0.5" />}
                {tab}
              </button>
            ))}
          </div>
          <div className='flex p-1'>
            <Button className='text-gray-500 gap-2'>
              <TbRefresh className='text-gray-500 w-4 h-4' />
              {t("update")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title={`${t('leads_today')}`} value="0" subValue="+0%" icon={Users} colorClass="bg-purple-100 text-purple-600" darkColorClass="dark:bg-purple-900/40 dark:text-purple-400" />
          <StatCard title={`${t('events_today')}`} value={activities.length.toString()} subValue="+0%" icon={Activity} colorClass="bg-indigo-100 text-indigo-600" darkColorClass="dark:bg-indigo-900/40 dark:text-indigo-400" />
          <StatCard title={`${t('today_revenue')}`} value="R$ 0,00" subValue="+0%" icon={DollarSign} colorClass="bg-purple-100 text-purple-600" darkColorClass="dark:bg-purple-900/40 dark:text-purple-400" />
          <StatCard title={`${t('conversions_today')}`} value="0" subValue="+0%" icon={TrendingUp} colorClass="bg-purple-100 text-purple-600" darkColorClass="dark:bg-purple-900/40 dark:text-purple-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("evolution")}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("track_evolution")}</p>
            </div>

            <div className="h-[300px] w-full relative">
              <canvas ref={chartRef} />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col transition-colors duration-200 h-[400px]">
            <div className="flex justify-between items-center mb-6 flex-shrink-0">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("recent_activity")}</h2>
              <div className={`flex items-center gap-2 px-2 py-1 ${wsConnected ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600'} rounded-full text-xs font-medium`}>
                <div className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                {wsConnected ? t("live") : t('desconected')}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
              {activities.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500 py-12 h-full">
                  <Activity className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
                  <p className="text-sm font-medium">{t('no_activity_yet')}</p>
                  <p className="text-xs mt-1">{t('events will appear here')}</p>
                </div>
              ) : (
                activities.map((activity) => (
                  <ActivityItem key={activity.id} data={activity} />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t('real_time')}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('last_updated')} {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              {t('monitoring')}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 p-6 rounded-xl shadow-sm text-center transition-colors duration-200">
              <div className="flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400 text-sm mb-2 font-medium">
                <Users className="w-4 h-4" />
                {t('active_users')}
              </div>
              <h3 className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {activities.length > 0 ? Math.floor(Math.random() * 10) + 1 : 0}
              </h3>
              <p className="text-xs text-purple-400 dark:text-purple-500/80">{t('based_on_recent_events')}</p>
            </div>

            <RealTimeCard title="Pageviews/min" value={activities.length * 2} subText="" icon={Globe} />
            <RealTimeCard title={`${t('Events')}/min`} value={activities.length} subText="" icon={Zap} />
            <RealTimeCard title={`${t('top_city')}`} value="SP" subText={`${t('estimated')}`} icon={MapPin} />
          </div>
        </div>
      </div>
    </div>
  );
}