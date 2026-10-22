export interface CareerEntry {
  period: string;
  title: string;
  role: string;
}

export const career: CareerEntry[] = [
  {
    period: "2018.08 — 2018.09",
    title: "AWS Japan / コロプラ / 楽天 インターン",
    role: "クラウド、サーバーサイド、フロントエンドを各社で短期間経験",
  },
  {
    period: "2020.03",
    title: "北見工業大学 情報システム工学科 卒業",
    role: "",
  },
  {
    period: "2020.04 — 2022.10",
    title: "Amazon Web Services Japan",
    role: "Cloud Support Engineer (CSE) — ストレージサービスを中心とした技術支援",
  },
  {
    period: "2022.10 — 2023.11",
    title: "個人事業",
    role: "YouTube チャンネル運営 — 企画、制作、分析を一人で担当",
  },
  {
    period: "2024.01 — 現在",
    title: "株式会社プレックス",
    role: "開発本部 コーポレートチーム マネージャー — 社内システム、データ基盤、業務改善",
  },
];

export const skillGroups = [
  {
    label: "Languages",
    items: ["TypeScript", "Ruby", "Python", "SQL"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind CSS"],
  },
  {
    label: "Backend / Data",
    items: ["Ruby on Rails", "PostgreSQL", "BigQuery", "dbt", "Airbyte", "Cube.js"],
  },
  {
    label: "Infra",
    items: ["AWS", "GCP", "Terraform", "GitHub Actions", "Helmfile"],
  },
  {
    label: "AI",
    items: ["Gemini API", "Mastra", "AI SDK"],
  },
  {
    label: "Management",
    items: ["チームリード", "採用", "人事評価", "メンター"],
  },
];
