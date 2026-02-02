import { config, hasLiveIntegrations } from "./config";
import { mockDashboardData } from "./mock-data";
import { DashboardData } from "./types";

const fetchGithubReviews = async (): Promise<DashboardData["reviews"]> => {
  if (!config.githubToken || !config.githubOwner || !config.githubRepo) {
    return mockDashboardData.reviews;
  }

  const url = new URL(
    `https://api.github.com/repos/${config.githubOwner}/${config.githubRepo}/pulls`
  );
  url.searchParams.set("state", "all");
  url.searchParams.set("per_page", "50");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.githubToken}`,
      Accept: "application/vnd.github+json"
    }
  });

  if (!response.ok) {
    return mockDashboardData.reviews;
  }

  const pulls = (await response.json()) as Array<{
    id: number;
    title: string;
    html_url: string;
  }>;

  return pulls.slice(0, 3).map((pr) => ({
    id: `pr-${pr.id}`,
    prTitle: pr.title,
    prUrl: pr.html_url,
    reviewType: "Small Fix",
    pairedWith: "Paired reviewer",
    commentCount: 0,
    ownPr: true
  }));
};

const fetchClickupQc = async (): Promise<DashboardData["qcTasks"]> => {
  if (!config.clickupToken || !config.clickupListId) {
    return mockDashboardData.qcTasks;
  }

  const response = await fetch(
    `https://api.clickup.com/api/v2/list/${config.clickupListId}/task`,
    {
      headers: {
        Authorization: config.clickupToken
      }
    }
  );

  if (!response.ok) {
    return mockDashboardData.qcTasks;
  }

  const payload = (await response.json()) as {
    tasks: Array<{
      id: string;
      name: string;
      url: string;
      custom_fields: Array<{ id: string; name: string; value: string | number | boolean }>;
    }>;
  };

  return payload.tasks.slice(0, 3).map((task) => ({
    id: task.id,
    taskTitle: task.name,
    taskUrl: task.url,
    client: "Client",
    firstTimePass: true,
    onTime: true,
    amends: ""
  }));
};

const fetchHarvestDelivery = async (): Promise<DashboardData["delivery"]> => {
  if (!config.harvestToken || !config.harvestAccountId) {
    return mockDashboardData.delivery;
  }

  const response = await fetch("https://api.harvestapp.com/v2/time_entries", {
    headers: {
      Authorization: `Bearer ${config.harvestToken}`,
      "Harvest-Account-Id": config.harvestAccountId
    }
  });

  if (!response.ok) {
    return mockDashboardData.delivery;
  }

  const payload = (await response.json()) as {
    time_entries: Array<{ id: number; hours: number; notes: string }>;
  };

  return payload.time_entries.slice(0, 3).map((entry) => ({
    id: `harvest-${entry.id}`,
    taskTitle: entry.notes || "Harvest entry",
    taskUrl: "https://id.getharvest.com",
    estimateHours: 8,
    actualHours: entry.hours,
    variancePercent: Number((((entry.hours - 8) / 8) * 100).toFixed(1))
  }));
};

export const getDashboardData = async (): Promise<{
  data: DashboardData;
  isLive: boolean;
}> => {
  if (!hasLiveIntegrations) {
    return { data: mockDashboardData, isLive: false };
  }

  const [reviews, qcTasks, delivery] = await Promise.all([
    fetchGithubReviews(),
    fetchClickupQc(),
    fetchHarvestDelivery()
  ]);

  return {
    data: {
      reviews,
      qcTasks,
      delivery
    },
    isLive: true
  };
};
