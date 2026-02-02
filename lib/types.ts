export type ReviewType = "Small Fix" | "Total Rewrite";

export type PrReviewLog = {
  id: string;
  prTitle: string;
  prUrl: string;
  reviewType: ReviewType;
  pairedWith: string;
  commentCount: number;
  ownPr: boolean;
};

export type QcTaskLog = {
  id: string;
  taskTitle: string;
  taskUrl: string;
  client: string;
  firstTimePass: boolean;
  onTime: boolean;
  amends: string;
};

export type DeliveryLog = {
  id: string;
  taskTitle: string;
  taskUrl: string;
  estimateHours: number;
  actualHours: number;
  variancePercent: number;
};

export type DashboardData = {
  reviews: PrReviewLog[];
  qcTasks: QcTaskLog[];
  delivery: DeliveryLog[];
};
