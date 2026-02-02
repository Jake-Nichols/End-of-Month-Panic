import { DashboardData, DeliveryLog, QcTaskLog, ReviewType } from "./types";

export type ReviewSummary = {
  total: number;
  smallFixes: number;
  totalRewrites: number;
  averageComments: number;
};

export type QcSummary = {
  total: number;
  passedFirstTime: number;
  passRate: number;
  onTimeRate: number;
};

export type DeliverySummary = {
  total: number;
  withinMargin: number;
  accuracyRate: number;
  overEstimate: number;
  underEstimate: number;
};

const countByReviewType = (reviews: DashboardData["reviews"], type: ReviewType) =>
  reviews.filter((review) => review.reviewType === type).length;

export const summarizeReviews = (data: DashboardData): ReviewSummary => {
  const total = data.reviews.length;
  const totalRewrites = countByReviewType(data.reviews, "Total Rewrite");
  const smallFixes = countByReviewType(data.reviews, "Small Fix");
  const averageComments =
    total === 0
      ? 0
      : Number(
          (
            data.reviews.reduce((sum, review) => sum + review.commentCount, 0) / total
          ).toFixed(1)
        );

  return {
    total,
    smallFixes,
    totalRewrites,
    averageComments
  };
};

const calculateRate = (matched: number, total: number) =>
  total === 0 ? 0 : Number(((matched / total) * 100).toFixed(1));

export const summarizeQc = (tasks: QcTaskLog[]): QcSummary => {
  const total = tasks.length;
  const passedFirstTime = tasks.filter((task) => task.firstTimePass).length;
  const onTime = tasks.filter((task) => task.onTime).length;

  return {
    total,
    passedFirstTime,
    passRate: calculateRate(passedFirstTime, total),
    onTimeRate: calculateRate(onTime, total)
  };
};

const withinMargin = (task: DeliveryLog, marginPercent: number) =>
  Math.abs(task.variancePercent) <= marginPercent;

export const summarizeDelivery = (
  tasks: DeliveryLog[],
  marginPercent = 20
): DeliverySummary => {
  const total = tasks.length;
  const withinMarginCount = tasks.filter((task) => withinMargin(task, marginPercent)).length;
  const overEstimate = tasks.filter((task) => task.variancePercent > marginPercent).length;
  const underEstimate = tasks.filter((task) => task.variancePercent < -marginPercent).length;

  return {
    total,
    withinMargin: withinMarginCount,
    accuracyRate: calculateRate(withinMarginCount, total),
    overEstimate,
    underEstimate
  };
};

export const summarizeDashboard = (data: DashboardData) => ({
  reviews: summarizeReviews(data),
  qc: summarizeQc(data.qcTasks),
  delivery: summarizeDelivery(data.delivery)
});
