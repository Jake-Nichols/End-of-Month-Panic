export const config = {
  githubToken: process.env.GITHUB_TOKEN ?? "",
  clickupToken: process.env.CLICKUP_TOKEN ?? "",
  harvestToken: process.env.HARVEST_TOKEN ?? "",
  harvestAccountId: process.env.HARVEST_ACCOUNT_ID ?? "",
  clickupListId: process.env.CLICKUP_LIST_ID ?? "",
  githubOwner: process.env.GITHUB_OWNER ?? "",
  githubRepo: process.env.GITHUB_REPO ?? ""
};

export const hasLiveIntegrations =
  Boolean(config.githubToken) &&
  Boolean(config.clickupToken) &&
  Boolean(config.harvestToken) &&
  Boolean(config.harvestAccountId);
