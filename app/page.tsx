import { getDashboardData } from "@/lib/get-dashboard-data";
import { summarizeDashboard } from "@/lib/metrics";

const formatPercent = (value: number) => `${value.toFixed(1)}%`;

const DeliveryBadge = ({ variance }: { variance: number }) => {
  if (variance > 20) {
    return <span className="badge red">Over estimate</span>;
  }
  if (variance < -20) {
    return <span className="badge yellow">Under estimate</span>;
  }
  return <span className="badge green">On target</span>;
};

export default async function Page() {
  const { data, isLive } = await getDashboardData();
  const summary = summarizeDashboard(data);

  return (
    <main>
      <section className="header">
        <h1>EPM Dashboard</h1>
        <p>
          One view for PR reviews, QC pass rates, and delivery accuracy over the last 3 months.
        </p>
        <div className="note">
          {isLive
            ? "Live data is connected to GitHub, ClickUp, and Harvest."
            : "Showing sample data. Add API keys to enable live metrics."}
        </div>
      </section>

      <section className="card-grid">
        <div className="card">
          <div className="label">PR Reviews Logged</div>
          <div className="metric">{summary.reviews.total}</div>
          <p>
            {summary.reviews.smallFixes} small fixes · {summary.reviews.totalRewrites} total
            rewrites
          </p>
        </div>
        <div className="card">
          <div className="label">Avg. Review Comments</div>
          <div className="metric">{summary.reviews.averageComments}</div>
          <p>Evidence of constructive feedback per review.</p>
        </div>
        <div className="card">
          <div className="label">QC First-time Pass Rate</div>
          <div className="metric">{formatPercent(summary.qc.passRate)}</div>
          <p>{summary.qc.passedFirstTime} passed first time.</p>
        </div>
        <div className="card">
          <div className="label">Delivery Accuracy</div>
          <div className="metric">{formatPercent(summary.delivery.accuracyRate)}</div>
          <p>{summary.delivery.withinMargin} tasks within ±20%.</p>
        </div>
      </section>

      <section className="section">
        <h2>Paired PR Reviews</h2>
        <table className="table">
          <thead>
            <tr>
              <th>PR</th>
              <th>Type</th>
              <th>Paired With</th>
              <th>Comments</th>
              <th>Own PR?</th>
            </tr>
          </thead>
          <tbody>
            {data.reviews.map((review) => (
              <tr key={review.id}>
                <td>
                  <a className="link" href={review.prUrl} target="_blank" rel="noreferrer">
                    {review.prTitle}
                  </a>
                </td>
                <td>{review.reviewType}</td>
                <td>{review.pairedWith}</td>
                <td>{review.commentCount}</td>
                <td>{review.ownPr ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>QC Pass Log</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Client</th>
              <th>First Time Pass</th>
              <th>On Time</th>
              <th>Amends</th>
            </tr>
          </thead>
          <tbody>
            {data.qcTasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <a className="link" href={task.taskUrl} target="_blank" rel="noreferrer">
                    {task.taskTitle}
                  </a>
                </td>
                <td>{task.client}</td>
                <td>{task.firstTimePass ? "Yes" : "No"}</td>
                <td>{task.onTime ? "Yes" : "No"}</td>
                <td>{task.amends}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>Delivery Accuracy</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Estimate</th>
              <th>Actual</th>
              <th>Variance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.delivery.map((task) => (
              <tr key={task.id}>
                <td>
                  <a className="link" href={task.taskUrl} target="_blank" rel="noreferrer">
                    {task.taskTitle}
                  </a>
                </td>
                <td>{task.estimateHours}h</td>
                <td>{task.actualHours}h</td>
                <td>{formatPercent(task.variancePercent)}</td>
                <td>
                  <DeliveryBadge variance={task.variancePercent} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>Live Integration Checklist</h2>
        <ul>
          <li>GitHub: add GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO</li>
          <li>ClickUp: add CLICKUP_TOKEN, CLICKUP_LIST_ID</li>
          <li>Harvest: add HARVEST_TOKEN, HARVEST_ACCOUNT_ID</li>
        </ul>
      </section>

      <div className="footer">
        Tip: keep the dashboard open during your appraisal to show live evidence and click
        through to supporting PRs and tasks.
      </div>
    </main>
  );
}
