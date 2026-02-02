import { DashboardData } from "./types";

export const mockDashboardData: DashboardData = {
  reviews: [
    {
      id: "pr-001",
      prTitle: "feat(ui): add CTA and icon updates",
      prUrl: "https://github.com/acme/repo/pull/42",
      repo: "acme/repo",
      reviewType: "Small Fix",
      pairedWith: "Lewis Davy",
      commentCount: 3,
      ownPr: true
    },
    {
      id: "pr-002",
      prTitle: "feat(cart): refresh cart summary",
      prUrl: "https://github.com/acme/repo/pull/57",
      repo: "acme/repo",
      reviewType: "Small Fix",
      pairedWith: "Lewis Davy",
      commentCount: 1,
      ownPr: true
    },
    {
      id: "pr-003",
      prTitle: "refactor: slider section rewrite",
      prUrl: "https://github.com/acme/repo/pull/61",
      repo: "acme/repo",
      reviewType: "Total Rewrite",
      pairedWith: "Ryan Patel",
      commentCount: 7,
      ownPr: false
    }
  ],
  qcTasks: [
    {
      id: "qc-001",
      taskTitle: "Announcement bar fixes",
      taskUrl: "https://app.clickup.com/t/8698cem9",
      client: "Brindisa",
      firstTimePass: true,
      onTime: true,
      amends: "Quick Fix"
    },
    {
      id: "qc-002",
      taskTitle: "Mobile cart QA",
      taskUrl: "https://app.clickup.com/t/8699aql3",
      client: "Wrexham",
      firstTimePass: false,
      onTime: false,
      amends: "More work needed"
    },
    {
      id: "qc-003",
      taskTitle: "Product gallery tweaks",
      taskUrl: "https://app.clickup.com/t/8699c1p2",
      client: "Pretty Green",
      firstTimePass: true,
      onTime: true,
      amends: "Minor copy updates"
    }
  ],
  delivery: [
    {
      id: "del-001",
      taskTitle: "Homepage hero refresh",
      taskUrl: "https://app.clickup.com/t/8699v7m5",
      estimateHours: 6,
      actualHours: 5.5,
      variancePercent: -8
    },
    {
      id: "del-002",
      taskTitle: "Search filters",
      taskUrl: "https://app.clickup.com/t/8699x7a1",
      estimateHours: 10,
      actualHours: 12.5,
      variancePercent: 25
    },
    {
      id: "del-003",
      taskTitle: "Checkout polish",
      taskUrl: "https://app.clickup.com/t/8699cv6e",
      estimateHours: 4,
      actualHours: 3.5,
      variancePercent: -12.5
    }
  ]
};
