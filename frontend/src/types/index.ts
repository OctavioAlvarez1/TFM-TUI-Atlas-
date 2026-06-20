// Atlas type definitions
export interface KpiMetric {
  label: string;
  value: string;
  change: string;
}

export interface DashboardStat {
  label: string;
  value: string;
}

export interface DonutItem {
  label: string;
  pct: string;
}

export interface Step {
  num: string;
  title: string;
  desc: string;
}

export interface DataSource {
  name: string;
  type: string;
}
