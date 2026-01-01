import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  RefreshCw,
  Loader2,
  LineChart,
  PieChart,
  TrendingUp,
  Settings2,
  IdCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import { fetchCurrentUser, updateCurrentUser } from "@/api/functions";

const translations = {
  en: {
    pageTitle: "Trading Account Center",
    pageSubtitle: "Monitor capital, exposure, and risk alignment before entering the market.",
    sections: {
      identity: "Account identity",
      trading: "Trading account overview",
      capital: "Capital allocation & risk",
      positions: "Positions snapshot",
      preferences: "Platform preferences"
    },
    identity: {
      accountId: "Account ID",
      status: "Status",
      email: "Email",
      accountType: "Account type"
    },
    accountTypes: {
      demo: "Demo",
      live: "Live"
    },
    status: {
      active: "Active",
      suspended: "Suspended",
      pending: "Pending review",
      unknown: "Unknown"
    },
    trading: {
      baseCurrency: "Base currency",
      balance: "Balance",
      equity: "Equity",
      margin: "Available margin",
      leverage: "Leverage",
      createdAt: "Opened on"
    },
    capital: {
      total: "Total capital",
      allocated: "Allocated capital",
      free: "Free capital",
      allocationMethod: "Allocation method",
      maxRisk: "Max risk per trade",
      allocationLabels: {
        fixed: "Fixed",
        percentage: "Percentage"
      }
    },
    positions: {
      open: "Open positions",
      unrealized: "Unrealized PnL",
      exposure: "Exposure",
      risk: "Risk status",
      riskLabels: {
        safe: "Safe",
        warning: "Warning",
        high: "High"
      },
      riskDescriptions: {
        safe: "Exposure within planned tolerance.",
        warning: "Exposure approaching limits.",
        high: "Risk parameters exceeded."
      }
    },
    preferences: {
      language: "Language",
      timezone: "Timezone",
      notifications: "Notifications",
      tradeAlerts: "Execution alerts",
      tradeAlertsDescription: "Notify me when orders fill or margin requirements shift.",
      platformUpdates: "Platform notices",
      platformUpdatesDescription: "Operational updates and scheduled maintenance.",
      save: "Save changes",
      saving: "Saving...",
      updated: "Preferences updated",
      noChanges: "No changes to save",
      refresh: "Refresh snapshot"
    },
    loading: {
      title: "Preparing account metrics",
      description: "Fetching trading profile and risk parameters..."
    },
    error: {
      title: "Unable to load account",
      description: "We couldn’t retrieve your trading profile right now.",
      retry: "Retry"
    },
    messages: {
      updateSuccess: "Preferences saved",
      updateError: "Update failed",
      refreshSuccess: "Snapshot refreshed",
      refreshError: "Refresh failed"
    }
  },
  ar: {
    pageTitle: "مركز الحساب التداولي",
    pageSubtitle: "راقب رأس المال والمخاطر قبل الدخول إلى السوق.",
    sections: {
      identity: "هوية الحساب",
      trading: "نظرة عامة على الحساب",
      capital: "توزيع رأس المال والمخاطر",
      positions: "ملخص الصفقات",
      preferences: "تفضيلات المنصة"
    },
    identity: {
      accountId: "معرّف الحساب",
      status: "الحالة",
      email: "البريد الإلكتروني",
      accountType: "نوع الحساب"
    },
    accountTypes: {
      demo: "تجريبي",
      live: "حقيقي"
    },
    status: {
      active: "مفعل",
      suspended: "موقوف",
      pending: "قيد المراجعة",
      unknown: "غير معروف"
    },
    trading: {
      baseCurrency: "العملة الأساسية",
      balance: "الرصيد",
      equity: "حقوق الملكية",
      margin: "الهامش المتاح",
      leverage: "الرافعة",
      createdAt: "تاريخ الفتح"
    },
    capital: {
      total: "إجمالي رأس المال",
      allocated: "الرأس المال المخصص",
      free: "الرأس المال المتاح",
      allocationMethod: "طريقة التوزيع",
      maxRisk: "أقصى مخاطرة لكل صفقة",
      allocationLabels: {
        fixed: "ثابت",
        percentage: "نسبي"
      }
    },
    positions: {
      open: "الصفقات المفتوحة",
      unrealized: "أرباح/خسائر غير محققة",
      exposure: "نسبة التعرض",
      risk: "حالة المخاطرة",
      riskLabels: {
        safe: "آمن",
        warning: "تحذير",
        high: "مرتفع"
      },
      riskDescriptions: {
        safe: "التعرض ضمن الحدود المخطط لها.",
        warning: "التعرض يقترب من الحدود القصوى.",
        high: "تم تجاوز معايير المخاطر."
      }
    },
    preferences: {
      language: "اللغة",
      timezone: "المنطقة الزمنية",
      notifications: "التنبيهات",
      tradeAlerts: "تنبيهات التنفيذ",
      tradeAlertsDescription: "أعلمني عند تنفيذ الأوامر أو تغير الهامش.",
      platformUpdates: "تنبيهات المنصة",
      platformUpdatesDescription: "تحديثات التشغيل والصيانة المجدولة.",
      save: "حفظ التغييرات",
      saving: "جاري الحفظ...",
      updated: "تم حفظ التفضيلات",
      noChanges: "لا توجد تغييرات للحفظ",
      refresh: "تحديث البيانات"
    },
    loading: {
      title: "جاري إعداد بيانات الحساب",
      description: "يتم جلب ملف التداول ومعايير المخاطر..."
    },
    error: {
      title: "تعذر تحميل الحساب",
      description: "تعذر استرجاع ملف التداول الآن.",
      retry: "إعادة المحاولة"
    },
    messages: {
      updateSuccess: "تم حفظ التفضيلات",
      updateError: "فشل التحديث",
      refreshSuccess: "تم تحديث البيانات",
      refreshError: "تعذر التحديث"
    }
  }
};

const languageOptions = [
  { value: "en", label: { en: "English", ar: "الإنجليزية" } },
  { value: "ar", label: { en: "Arabic", ar: "العربية" } }
];

const timezoneOptions = ["UTC", "Asia/Dubai", "Asia/Riyadh", "Europe/London", "America/New_York"];

const defaultAccountSnapshot = {
  identity: {
    accountId: "NT-000000",
    status: "pending",
    email: "--",
    accountType: "demo"
  },
  trading: {
    baseCurrency: "USDT",
    balance: 0,
    equity: 0,
    availableMargin: 0,
    leverage: "1:50",
    createdAt: null
  },
  capital: {
    total: 0,
    allocated: 0,
    free: 0,
    allocationMethod: "fixed",
    maxRiskPerTrade: 0.02
  },
  positions: {
    openCount: 0,
    unrealizedPnl: 0,
    exposurePercent: 0.18,
    riskStatus: "safe"
  },
  preferences: {
    language: "en",
    timezone: "UTC",
    notifications: {
      tradeAlerts: true,
      platformUpdates: true
    }
  }
};

const toNumber = (value, fallback = 0) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
};

const toBoolean = (value, fallback = false) => {
  if (value === undefined || value === null) {
    return fallback;
  }
  return Boolean(value);
};

const normalizeRatio = (value, fallback = 0) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  if (numeric > 1) {
    return numeric / 100;
  }
  if (numeric < 0) {
    return fallback;
  }
  return numeric;
};

const clonePreferences = (preferences) =>
  JSON.parse(JSON.stringify(preferences ?? defaultAccountSnapshot.preferences));

const normalizeAccountData = (user = {}) => {
  const snapshot = JSON.parse(JSON.stringify(defaultAccountSnapshot));
  const account = user.tradingAccount || user.account || {};

  snapshot.identity.accountId =
    user.accountId || account.accountId || user.id || snapshot.identity.accountId;
  snapshot.identity.status = (account.status || user.status || snapshot.identity.status)
    .toString()
    .toLowerCase();
  snapshot.identity.email = user.email || account.email || snapshot.identity.email;
  snapshot.identity.accountType = (account.type || user.accountType || snapshot.identity.accountType)
    .toString()
    .toLowerCase();

  snapshot.trading.baseCurrency = (account.baseCurrency || user.baseCurrency || snapshot.trading.baseCurrency)
    .toString()
    .toUpperCase();
  snapshot.trading.balance = toNumber(account.balance ?? user.balance, snapshot.trading.balance);
  snapshot.trading.equity = toNumber(account.equity ?? user.equity, snapshot.trading.equity);
  snapshot.trading.availableMargin = toNumber(
    account.availableMargin ?? account.freeMargin ?? user.availableMargin,
    snapshot.trading.availableMargin
  );
  snapshot.trading.leverage = account.leverage || user.leverage || snapshot.trading.leverage;
  snapshot.trading.createdAt = account.createdAt || account.openedAt || user.createdAt || snapshot.trading.createdAt;

  const capital = account.capital || user.capital || {};
  snapshot.capital.total = toNumber(capital.total ?? user.totalCapital, snapshot.capital.total);
  snapshot.capital.allocated = toNumber(capital.allocated ?? user.allocatedCapital, snapshot.capital.allocated);
  const free = toNumber(capital.free, snapshot.capital.total - snapshot.capital.allocated);
  snapshot.capital.free = Math.max(0, Number.isFinite(free) ? free : snapshot.capital.free);
  snapshot.capital.allocationMethod = (capital.method || user.allocationMethod || snapshot.capital.allocationMethod)
    .toString()
    .toLowerCase();
  snapshot.capital.maxRiskPerTrade = normalizeRatio(
    capital.maxRiskPerTrade ?? user.maxRiskPerTrade,
    snapshot.capital.maxRiskPerTrade
  );

  const positions = account.positions || user.positions || {};
  snapshot.positions.openCount = Math.max(
    0,
    Math.round(toNumber(positions.openCount ?? positions.open, snapshot.positions.openCount))
  );
  snapshot.positions.unrealizedPnl = toNumber(
    positions.unrealizedPnl ?? user.unrealizedPnl,
    snapshot.positions.unrealizedPnl
  );
  const exposureRaw = positions.exposurePercent ?? positions.exposure ?? user.exposurePercent;
  snapshot.positions.exposurePercent = normalizeRatio(exposureRaw, snapshot.positions.exposurePercent);
  snapshot.positions.riskStatus = (positions.riskStatus || user.riskStatus || snapshot.positions.riskStatus)
    .toString()
    .toLowerCase();

  const preferences = user.preferences || account.preferences || {};
  snapshot.preferences.language = preferences.language || user.language || snapshot.preferences.language;
  snapshot.preferences.timezone = preferences.timezone || user.timezone || snapshot.preferences.timezone;

  const notifications = preferences.notifications || user.notifications || {};
  snapshot.preferences.notifications.tradeAlerts = toBoolean(
    notifications.tradeAlerts ?? notifications.trade,
    snapshot.preferences.notifications.tradeAlerts
  );
  snapshot.preferences.notifications.platformUpdates = toBoolean(
    notifications.platformUpdates ?? notifications.system ?? notifications.platform,
    snapshot.preferences.notifications.platformUpdates
  );

  return snapshot;
};

const formatCurrency = (value, currency, language) => {
  const locale = language === "ar" ? "ar-SA" : "en-US";
  const safeCurrency = (currency || "USD").toUpperCase();
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: safeCurrency,
      currencyDisplay: "code",
      maximumFractionDigits: 2
    }).format(value);
  } catch {
    return `${safeCurrency} ${value?.toFixed?.(2) ?? value}`;
  }
};

const formatPercent = (value, language) => {
  const locale = language === "ar" ? "ar-SA" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);
};

const formatDate = (value, language) => {
  if (!value) {
    return "--";
  }
  try {
    const locale = language === "ar" ? "ar-SA" : "en-US";
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(value));
  } catch {
    return "--";
  }
};

const getStatusMeta = (status, t) => {
  const normalized = status?.toLowerCase?.() || "unknown";
  switch (normalized) {
    case "active":
      return {
        label: t.status.active,
        className: "bg-emerald-500/10 text-emerald-300 border border-emerald-400/30"
      };
    case "suspended":
      return {
        label: t.status.suspended,
        className: "bg-red-500/10 text-red-300 border border-red-400/30"
      };
    case "pending":
      return {
        label: t.status.pending,
        className: "bg-amber-500/10 text-amber-300 border border-amber-400/30"
      };
    default:
      return {
        label: t.status.unknown,
        className: "bg-slate-500/10 text-slate-200 border border-slate-400/30"
      };
  }
};

const getRiskMeta = (status, t) => {
  const normalized = status?.toLowerCase?.() || "safe";
  switch (normalized) {
    case "high":
      return {
        label: t.positions.riskLabels.high,
        description: t.positions.riskDescriptions.high,
        className: "bg-red-500/10 text-red-200 border border-red-500/30"
      };
    case "warning":
      return {
        label: t.positions.riskLabels.warning,
        description: t.positions.riskDescriptions.warning,
        className: "bg-amber-500/10 text-amber-200 border border-amber-500/30"
      };
    default:
      return {
        label: t.positions.riskLabels.safe,
        description: t.positions.riskDescriptions.safe,
        className: "bg-emerald-500/10 text-emerald-200 border border-emerald-500/30"
      };
  }
};

const buildPreferencePayload = (initialPrefs, currentPrefs) => {
  const payload = {};

  if (initialPrefs.language !== currentPrefs.language) {
    payload.language = currentPrefs.language;
  }

  if (initialPrefs.timezone !== currentPrefs.timezone) {
    payload.timezone = currentPrefs.timezone;
  }

  const notificationsChanged =
    initialPrefs.notifications.tradeAlerts !== currentPrefs.notifications.tradeAlerts ||
    initialPrefs.notifications.platformUpdates !== currentPrefs.notifications.platformUpdates;

  if (notificationsChanged) {
    payload.preferences = {
      ...currentPrefs,
      notifications: {
        tradeAlerts: currentPrefs.notifications.tradeAlerts,
        platformUpdates: currentPrefs.notifications.platformUpdates
      }
    };
  }

  return payload;
};

const MetricItem = ({ label, value, hint }) => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
    <p className="text-xs uppercase tracking-widest text-slate-400">{label}</p>
    <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
  </div>
);

MetricItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  hint: PropTypes.node
};

const LoadingView = ({ language }) => {
  const t = translations[language] || translations.en;
  return (
    <div className="min-h-screen bg-slate-950" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-6">
        <div>
          <div className="h-8 w-64 rounded bg-slate-800 animate-pulse" />
          <div className="mt-3 h-5 w-96 rounded bg-slate-900 animate-pulse" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-56 rounded-2xl bg-slate-900/60" />
          <Skeleton className="h-56 rounded-2xl bg-slate-900/60" />
        </div>
        <Skeleton className="h-64 rounded-2xl bg-slate-900/60" />
        <p className="text-sm text-slate-400">{t.loading.description}</p>
      </div>
    </div>
  );
};

LoadingView.propTypes = {
  language: PropTypes.oneOf(["en", "ar"]).isRequired
};

export default function Profile({ language }) {
  const t = translations[language] || translations.en;
  const { toast } = useToast();

  const [accountData, setAccountData] = useState(defaultAccountSnapshot);
  const [preferences, setPreferences] = useState(clonePreferences(defaultAccountSnapshot.preferences));
  const [initialPreferences, setInitialPreferences] = useState(
    clonePreferences(defaultAccountSnapshot.preferences)
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const loadAccount = useCallback(async ({ silent = false } = {}) => {
    if (silent) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
      setLoadError(null);
    }

    try {
      const userData = await fetchCurrentUser();
      const normalized = normalizeAccountData(userData);
      setAccountData(normalized);
      setPreferences(clonePreferences(normalized.preferences));
      setInitialPreferences(clonePreferences(normalized.preferences));
      return true;
    } catch (err) {
      if (!silent) {
        setLoadError(err);
      }
      return false;
    } finally {
      if (silent) {
        setIsRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadAccount();
  }, [loadAccount]);

  const hasChanges = useMemo(() => {
    return JSON.stringify(preferences) !== JSON.stringify(initialPreferences);
  }, [preferences, initialPreferences]);

  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNotificationToggle = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    const payload = buildPreferencePayload(initialPreferences, preferences);
    if (!Object.keys(payload).length) {
      toast({ title: t.preferences.noChanges });
      return;
    }

    try {
      setSaving(true);
      await updateCurrentUser(payload);
      setInitialPreferences(clonePreferences(preferences));
      setAccountData((prev) => ({ ...prev, preferences: clonePreferences(preferences) }));
      toast({ title: t.messages.updateSuccess });
    } catch (err) {
      toast({ variant: "destructive", title: t.messages.updateError, description: err?.message });
    } finally {
      setSaving(false);
    }
  };

  const handleRefresh = async () => {
    const success = await loadAccount({ silent: true });
    toast({
      title: success ? t.messages.refreshSuccess : t.messages.refreshError,
      variant: success ? "default" : "destructive"
    });
  };

  if (loading) {
    return <LoadingView language={language} />;
  }

  const isUnauthorized =
    loadError?.status === 401 || loadError?.status === 403 || loadError?.code === "UNAUTHORIZED";
  if (isUnauthorized) {
    return <UserNotRegisteredError />;
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-slate-950" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="max-w-3xl mx-auto px-6 py-24">
          <Card className="border border-red-500/40 bg-red-500/5">
            <CardHeader>
              <CardTitle className="text-red-200">{t.error.title}</CardTitle>
              <CardDescription className="text-red-300/80">{t.error.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => loadAccount()}>{t.error.retry}</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const statusMeta = getStatusMeta(accountData.identity.status, t);
  const riskMeta = getRiskMeta(accountData.positions.riskStatus, t);
  const accountTypeLabel =
    t.accountTypes[accountData.identity.accountType] || accountData.identity.accountType;
  const allocationLabel =
    t.capital.allocationLabels[accountData.capital.allocationMethod] ||
    accountData.capital.allocationMethod;

  return (
    <div className="min-h-screen bg-slate-950 pb-20 text-slate-100" dir={language === "ar" ? "rtl" : "ltr"}>
      <header className="border-b border-slate-900 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {t.pageTitle}
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-400">
                {t.pageSubtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                <span className="ml-2">{t.preferences.refresh}</span>
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || saving}
                className="bg-blue-600 hover:bg-blue-500"
              >
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {saving ? t.preferences.saving : t.preferences.save}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="-mt-8 space-y-8 px-6">
        <section className="mx-auto max-w-6xl">
          <Card className="border border-slate-800 bg-slate-900/60 backdrop-blur">
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-600/20 p-3 text-blue-300">
                  <IdCard className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-white">
                    {t.sections.identity}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {accountData.identity.accountId}
                  </CardDescription>
                </div>
              </div>
              <Badge className={statusMeta.className}>{statusMeta.label}</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricItem label={t.identity.accountId} value={accountData.identity.accountId} />
                <MetricItem label={t.identity.email} value={accountData.identity.email} />
                <MetricItem label={t.identity.accountType} value={accountTypeLabel} />
                <MetricItem
                  label={t.trading.createdAt}
                  value={formatDate(accountData.trading.createdAt, language)}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <Card className="border border-slate-800 bg-slate-900/60">
            <CardHeader className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="flex items-center gap-2 text-white">
                  <LineChart className="h-5 w-5 text-blue-300" />
                  {t.sections.trading}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {t.trading.baseCurrency}: {accountData.trading.baseCurrency}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <MetricItem
                  label={t.trading.balance}
                  value={formatCurrency(accountData.trading.balance, accountData.trading.baseCurrency, language)}
                />
                <MetricItem
                  label={t.trading.equity}
                  value={formatCurrency(accountData.trading.equity, accountData.trading.baseCurrency, language)}
                />
                <MetricItem
                  label={t.trading.margin}
                  value={formatCurrency(
                    accountData.trading.availableMargin,
                    accountData.trading.baseCurrency,
                    language
                  )}
                />
                <MetricItem label={t.trading.leverage} value={accountData.trading.leverage} />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-800 bg-slate-900/60">
            <CardHeader className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="flex items-center gap-2 text-white">
                  <PieChart className="h-5 w-5 text-emerald-300" />
                  {t.sections.capital}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {allocationLabel}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <MetricItem
                  label={t.capital.total}
                  value={formatCurrency(accountData.capital.total, accountData.trading.baseCurrency, language)}
                />
                <MetricItem
                  label={t.capital.allocated}
                  value={formatCurrency(accountData.capital.allocated, accountData.trading.baseCurrency, language)}
                />
                <MetricItem
                  label={t.capital.free}
                  value={formatCurrency(accountData.capital.free, accountData.trading.baseCurrency, language)}
                />
                <MetricItem
                  label={t.capital.maxRisk}
                  value={formatPercent(accountData.capital.maxRiskPerTrade, language)}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <Card className="border border-slate-800 bg-slate-900/60">
            <CardHeader className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="h-5 w-5 text-amber-300" />
                  {t.sections.positions}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {riskMeta.description}
                </CardDescription>
              </div>
              <Badge className={riskMeta.className}>{riskMeta.label}</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <MetricItem label={t.positions.open} value={accountData.positions.openCount} />
                <MetricItem
                  label={t.positions.unrealized}
                  value={formatCurrency(
                    accountData.positions.unrealizedPnl,
                    accountData.trading.baseCurrency,
                    language
                  )}
                />
                <MetricItem
                  label={t.positions.exposure}
                  value={formatPercent(accountData.positions.exposurePercent, language)}
                />
                <MetricItem label={t.positions.risk} value={riskMeta.label} />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-800 bg-slate-900/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Settings2 className="h-5 w-5 text-sky-300" />
                {t.sections.preferences}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {t.preferences.notifications}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language-select">{t.preferences.language}</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => handlePreferenceChange("language", value)}
                  >
                    <SelectTrigger id="language-select" className="border-slate-700 bg-slate-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-slate-800 bg-slate-900 text-slate-100">
                      {languageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone-select">{t.preferences.timezone}</Label>
                  <Select
                    value={preferences.timezone}
                    onValueChange={(value) => handlePreferenceChange("timezone", value)}
                  >
                    <SelectTrigger id="timezone-select" className="border-slate-700 bg-slate-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-slate-800 bg-slate-900 text-slate-100">
                      {timezoneOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div>
                    <p className="text-sm font-medium text-white">{t.preferences.tradeAlerts}</p>
                    <p className="text-xs text-slate-500">{t.preferences.tradeAlertsDescription}</p>
                  </div>
                  <Switch
                    checked={preferences.notifications.tradeAlerts}
                    onCheckedChange={(value) => handleNotificationToggle("tradeAlerts", value)}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div>
                    <p className="text-sm font-medium text-white">{t.preferences.platformUpdates}</p>
                    <p className="text-xs text-slate-500">{t.preferences.platformUpdatesDescription}</p>
                  </div>
                  <Switch
                    checked={preferences.notifications.platformUpdates}
                    onCheckedChange={(value) => handleNotificationToggle("platformUpdates", value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

Profile.propTypes = {
  language: PropTypes.oneOf(["en", "ar"]).isRequired
};
