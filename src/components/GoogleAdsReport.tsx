import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Type definitions for API integration
interface MetricData {
  clicks: number;
  impressions: number;
  ctr: number;
  avgCpc: number;
  conversions: number;
  conversionRate: number;
  cost: number;
  roas: number;
}

interface CampaignData {
  name: string;
  spend: number;
  impressions: number;
  ctr: number;
  conversions: number;
  roas: number;
}

const GoogleAdsReport: React.FC = () => {
  // Static sample data - will be replaced with API calls
  const [reportData] = useState<MetricData>({
    clicks: 12547,
    impressions: 487532,
    ctr: 2.57,
    avgCpc: 1.23,
    conversions: 1847,
    conversionRate: 14.72,
    cost: 15433.61,
    roas: 4.8
  });

  const [campaignData] = useState<CampaignData[]>([
    { name: "Brand Campaign - Search", spend: 5240.23, impressions: 145632, ctr: 3.2, conversions: 542, roas: 5.2 },
    { name: "Shopping - Electronics", spend: 3987.45, impressions: 187543, ctr: 2.1, conversions: 423, roas: 4.6 },
    { name: "Display - Retargeting", spend: 2876.12, impressions: 98765, ctr: 1.8, conversions: 287, roas: 3.9 },
    { name: "Video - YouTube Ads", spend: 1945.87, impressions: 45678, ctr: 2.8, conversions: 198, roas: 4.2 },
    { name: "Search - Competitors", spend: 1383.94, impressions: 35421, ctr: 3.5, conversions: 156, roas: 5.8 }
  ]);

  const [analystNotes, setAnalystNotes] = useState(
    "Strong performance this month with ROAS exceeding target by 20%. Brand campaigns continue to deliver the highest conversion rates. Recommend increasing budget allocation to top-performing search campaigns while optimizing display creative for better engagement."
  );

  const [dateRange, setDateRange] = useState("November 1-30, 2024");
  const [clientName, setClientName] = useState("TechCorp Solutions");
  const [accountId, setAccountId] = useState("123-456-7890");

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number): string => {
    return `${num.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Report Header */}
      <div className="report-header p-8 print-full-width">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              {/* Company Logo Placeholder - API Integration Point */}
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">AS</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-report-header">
                  Google Ads Account Performance Summary
                </h1>
                <p className="text-report-subtext mt-1">
                  Comprehensive advertising performance analysis
                </p>
              </div>
            </div>
            <div className="text-right text-sm text-report-subtext">
              <p>Generated: {new Date().toLocaleDateString()}</p>
              <p>Report ID: RPT-{Date.now()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <label className="block text-report-subtext mb-1">Date Range</label>
              <input 
                type="text" 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-2 border border-border rounded bg-card"
                id="report_date_range" // API integration marker
              />
            </div>
            <div>
              <label className="block text-report-subtext mb-1">Client Name</label>
              <input 
                type="text" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2 border border-border rounded bg-card"
                id="client_name" // API integration marker
              />
            </div>
            <div>
              <label className="block text-report-subtext mb-1">Account ID</label>
              <input 
                type="text" 
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full p-2 border border-border rounded bg-card"
                id="account_id" // API integration marker
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* Performance Overview Metrics */}
        <section className="report-card p-6">
          <h2 className="text-xl font-semibold text-report-header mb-6">Performance Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="metric-card text-center">
              <div className="text-2xl font-bold text-primary" id="metric_clicks">
                {formatNumber(reportData.clicks)}
              </div>
              <div className="text-sm text-report-subtext mt-1">Total Clicks</div>
            </div>
            <div className="metric-card text-center">
              <div className="text-2xl font-bold text-chart-secondary" id="metric_impressions">
                {formatNumber(reportData.impressions)}
              </div>
              <div className="text-sm text-report-subtext mt-1">Impressions</div>
            </div>
            <div className="metric-card text-center">
              <div className="text-2xl font-bold text-success" id="metric_ctr">
                {formatPercentage(reportData.ctr)}
              </div>
              <div className="text-sm text-report-subtext mt-1">CTR</div>
            </div>
            <div className="metric-card text-center">
              <div className="text-2xl font-bold text-warning" id="metric_avg_cpc">
                {formatCurrency(reportData.avgCpc)}
              </div>
              <div className="text-sm text-report-subtext mt-1">Avg CPC</div>
            </div>
            <div className="metric-card text-center">
              <div className="text-2xl font-bold text-chart-tertiary" id="metric_conversions">
                {formatNumber(reportData.conversions)}
              </div>
              <div className="text-sm text-report-subtext mt-1">Conversions</div>
            </div>
            <div className="metric-card text-center">
              <div className="text-2xl font-bold text-info" id="metric_conversion_rate">
                {formatPercentage(reportData.conversionRate)}
              </div>
              <div className="text-sm text-report-subtext mt-1">Conversion Rate</div>
            </div>
            <div className="metric-card text-center">
              <div className="text-2xl font-bold text-destructive" id="metric_cost">
                {formatCurrency(reportData.cost)}
              </div>
              <div className="text-sm text-report-subtext mt-1">Total Cost</div>
            </div>
            <div className="metric-card text-center">
              <div className="text-2xl font-bold text-success" id="metric_roas">
                {reportData.roas.toFixed(1)}x
              </div>
              <div className="text-sm text-report-subtext mt-1">ROAS</div>
            </div>
          </div>
        </section>

        {/* Trends & Charts */}
        <section className="report-card p-6 page-break">
          <h2 className="text-xl font-semibold text-report-header mb-6">Performance Trends</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Daily Spend vs Conversions</h3>
              <div className="chart-placeholder h-64" id="chart_daily_trends">
                {/* API Integration Point: Replace with dynamic chart */}
                <div className="text-center">
                  <div className="text-muted-foreground mb-2">📈 Line Chart</div>
                  <div className="text-sm text-muted-foreground">
                    Daily performance trend visualization
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Top Campaign Metrics</h3>
              <div className="chart-placeholder h-64" id="chart_campaign_metrics">
                {/* API Integration Point: Replace with dynamic chart */}
                <div className="text-center">
                  <div className="text-muted-foreground mb-2">📊 Bar Chart</div>
                  <div className="text-sm text-muted-foreground">
                    CTR, CPC, Conversions comparison
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Performance Table */}
        <section className="report-card p-6">
          <h2 className="text-xl font-semibold text-report-header mb-6">Top Campaigns Performance</h2>
          <div className="overflow-x-auto">
            <table className="data-table" id="campaign_performance_table">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th className="text-right">Spend</th>
                  <th className="text-right">Impressions</th>
                  <th className="text-right">CTR</th>
                  <th className="text-right">Conversions</th>
                  <th className="text-right">ROAS</th>
                </tr>
              </thead>
              <tbody id="campaign_data_rows">
                {/* API Integration Point: Replace with dynamic data */}
                {campaignData.map((campaign, index) => (
                  <tr key={index}>
                    <td className="font-medium">{campaign.name}</td>
                    <td className="text-right">{formatCurrency(campaign.spend)}</td>
                    <td className="text-right">{formatNumber(campaign.impressions)}</td>
                    <td className="text-right">{formatPercentage(campaign.ctr)}</td>
                    <td className="text-right">{formatNumber(campaign.conversions)}</td>
                    <td className="text-right font-semibold text-success">
                      {campaign.roas.toFixed(1)}x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Analyst Notes - Editable Section */}
        <section className="report-card p-6">
          <h2 className="text-xl font-semibold text-report-header mb-6">Analyst Notes</h2>
          <div 
            className="editable-content"
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={(e) => setAnalystNotes(e.currentTarget.textContent || '')}
            id="analyst_notes" // API integration marker
          >
            {analystNotes}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Click to edit analyst commentary and strategic observations
          </p>
        </section>

        {/* Summary and Recommendations */}
        <section className="report-card p-6 page-break">
          <h2 className="text-xl font-semibold text-report-header mb-6">Summary & Recommendations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="metric-card border-l-4 border-l-success">
              <h3 className="font-semibold text-success mb-2">Key Wins</h3>
              <ul className="text-sm space-y-1" id="key_wins">
                <li>• ROAS exceeded target by 20%</li>
                <li>• Brand campaigns achieved 5.2x ROAS</li>
                <li>• Conversion rate improved 15% MoM</li>
              </ul>
            </div>
            
            <div className="metric-card border-l-4 border-l-info">
              <h3 className="font-semibold text-info mb-2">Key Learnings</h3>
              <ul className="text-sm space-y-1" id="key_learnings">
                <li>• Search campaigns outperform display 2:1</li>
                <li>• Mobile traffic converts 25% better</li>
                <li>• Video ads show strong engagement</li>
              </ul>
            </div>
            
            <div className="metric-card border-l-4 border-l-warning">
              <h3 className="font-semibold text-warning mb-2">Improvement Areas</h3>
              <ul className="text-sm space-y-1" id="improvement_areas">
                <li>• Optimize display creative assets</li>
                <li>• Expand high-performing keywords</li>
                <li>• Test new audience segments</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <h3 className="font-semibold text-accent mb-2">🎯 Next Steps & Strategic Actions</h3>
            <div className="text-sm space-y-1" id="next_steps">
              <p>• Increase budget allocation to Brand and Competitor search campaigns (+30%)</p>
              <p>• Launch A/B test for new video ad creative concepts</p>
              <p>• Implement enhanced conversion tracking for better attribution</p>
              <p>• Schedule weekly performance reviews for optimization opportunities</p>
            </div>
          </div>
        </section>

        {/* Export Controls */}
        <section className="flex justify-center space-x-4 no-print">
          <Button onClick={() => window.print()} className="px-6">
            Export to PDF
          </Button>
          <Button variant="outline" className="px-6">
            Export to Google Docs
          </Button>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Powered by AdSpyder</span>
            <span>•</span>
            <a href="#" className="hover:text-primary">contact@adspyder.com</a>
            <span>•</span>
            <a href="#" className="hover:text-primary">www.adspyder.com</a>
          </div>
          <div>
            Page 1 of 1 • Generated {new Date().toLocaleDateString()}
          </div>
        </div>
      </footer>

      {/* API Integration Script Template */}
      <script type="text/javascript" dangerouslySetInnerHTML={{
        __html: `
        /* 
        // API Integration Template - Uncomment and modify for dynamic data loading
        
        // Example: Fetch performance metrics
        async function loadPerformanceData() {
          try {
            const response = await fetch('/api/google-ads/performance', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_TOKEN'
              }
            });
            const data = await response.json();
            
            // Update metric displays
            document.getElementById('metric_clicks').textContent = data.clicks.toLocaleString();
            document.getElementById('metric_impressions').textContent = data.impressions.toLocaleString();
            document.getElementById('metric_ctr').textContent = data.ctr.toFixed(2) + '%';
            // ... update other metrics
            
          } catch (error) {
            console.error('Failed to load performance data:', error);
          }
        }
        
        // Example: Fetch campaign data
        async function loadCampaignData() {
          try {
            const response = await fetch('/api/google-ads/campaigns');
            const campaigns = await response.json();
            
            const tableBody = document.getElementById('campaign_data_rows');
            tableBody.innerHTML = campaigns.map(campaign => \`
              <tr>
                <td class="font-medium">\${campaign.name}</td>
                <td class="text-right">$\${campaign.spend.toFixed(2)}</td>
                <td class="text-right">\${campaign.impressions.toLocaleString()}</td>
                <td class="text-right">\${campaign.ctr.toFixed(2)}%</td>
                <td class="text-right">\${campaign.conversions}</td>
                <td class="text-right font-semibold text-success">\${campaign.roas.toFixed(1)}x</td>
              </tr>
            \`).join('');
            
          } catch (error) {
            console.error('Failed to load campaign data:', error);
          }
        }
        
        // Example: Load chart data
        async function loadChartData() {
          try {
            const response = await fetch('/api/google-ads/charts');
            const chartData = await response.json();
            
            // Initialize chart library (Chart.js, D3, etc.)
            // Replace chart placeholders with actual charts
            
          } catch (error) {
            console.error('Failed to load chart data:', error);
          }
        }
        
        // Initialize all data loading on page load
        document.addEventListener('DOMContentLoaded', function() {
          loadPerformanceData();
          loadCampaignData();
          loadChartData();
        });
        */
        `
      }} />
    </div>
  );
};

export default GoogleAdsReport;