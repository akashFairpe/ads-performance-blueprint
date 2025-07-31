import React, { useState } from 'react';

const GoogleAdsCampaignReport = () => {
  // Header customization state
  const [reportTitle, setReportTitle] = useState('Google Ads Campaign Performance Report');
  const [dateRange, setDateRange] = useState('Jan 1, 2024 - Jan 31, 2024');
  const [clientName, setClientName] = useState('[Client Name]');
  const [accountId, setAccountId] = useState('[Account ID]');
  const [reportId, setReportId] = useState('RPT-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [generatedDate, setGeneratedDate] = useState(new Date().toLocaleDateString());

  // Sample campaign data with API markers
  const campaignData = [
    {
      id: 'camp_1',
      name: 'Brand Awareness Q1',
      status: 'Active',
      clicks: 12450,
      impressions: 245600,
      ctr: 5.07,
      avgCpc: 1.25,
      conversions: 156,
      conversionRate: 1.25,
      cost: 15562.50,
      roas: 3.2
    },
    {
      id: 'camp_2', 
      name: 'Product Launch Campaign',
      status: 'Active',
      clicks: 8920,
      impressions: 198400,
      ctr: 4.49,
      avgCpc: 1.45,
      conversions: 124,
      conversionRate: 1.39,
      cost: 12934.00,
      roas: 2.8
    },
    {
      id: 'camp_3',
      name: 'Retargeting - High Value',
      status: 'Active', 
      clicks: 5670,
      impressions: 89200,
      ctr: 6.35,
      avgCpc: 1.89,
      conversions: 89,
      conversionRate: 1.57,
      cost: 10716.30,
      roas: 4.1
    },
    {
      id: 'camp_4',
      name: 'Holiday Shopping Promo',
      status: 'Paused',
      clicks: 3240,
      impressions: 67800,
      ctr: 4.78,
      avgCpc: 1.67,
      conversions: 45,
      conversionRate: 1.39,
      cost: 5410.80,
      roas: 2.2
    }
  ];

  // Insight commentary states
  const [executiveSummary, setExecutiveSummary] = useState(
    "Our campaign portfolio demonstrates strong performance with average ROAS of 3.1x. Brand Awareness Q1 and Retargeting campaigns are exceeding benchmarks, while Product Launch requires optimization focus. Holiday campaigns have been paused for strategic realignment."
  );

  const [recommendations, setRecommendations] = useState([
    "Increase budget allocation to Retargeting - High Value campaign by 25%",
    "Pause underperforming keywords in Product Launch Campaign",
    "Implement dayparting optimization for Brand Awareness campaigns",
    "Test new ad copy variations for improved CTR",
    "Resume Holiday Shopping with refined targeting parameters"
  ]);

  // Format helper functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(2)}%`;
  };

  const exportToPDF = () => {
    window.print();
  };

  // API helper function placeholders
  const fetchCampaignData = async () => {
    // Placeholder for API integration
    console.log('Fetching campaign data...');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Report Header */}
        <header className="dashboard-header">
          <div className="dashboard-header-content">
            <h1 
              className="dashboard-title"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setReportTitle(e.target.textContent || '')}
            >
              {reportTitle}
            </h1>
            <div 
              className="dashboard-subtitle"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setDateRange(e.target.textContent || '')}
            >
              Analysis Period: {dateRange}
            </div>
            <div className="dashboard-date">
              <strong>Client:</strong> 
              <span 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setClientName(e.target.textContent || '')}
              >
                {clientName}
              </span> | 
              <strong>Account:</strong> 
              <span 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setAccountId(e.target.textContent || '')}
              >
                {accountId}
              </span> | 
              <strong>Report ID:</strong> {reportId} | 
              <strong>Generated:</strong> {generatedDate}
            </div>
            <div style={{ marginTop: '16px' }}>
              <button className="btn btn-primary" onClick={exportToPDF} style={{ marginRight: '12px' }}>
                Export PDF
              </button>
              <button className="btn btn-secondary" onClick={fetchCampaignData}>
                Refresh Data
              </button>
            </div>
          </div>
        </header>

        {/* Campaign Overview KPIs */}
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px', color: 'var(--report-header)' }}>
            Campaign Portfolio Overview
          </h2>
          <div className="kpi-dashboard-grid">
            <div className="dashboard-kpi">
              <div className="kpi-icon">🎯</div>
              <div className="kpi-value">4</div>
              <div className="kpi-label">Active Campaigns</div>
              <div className="kpi-change positive">↗ +1 this month</div>
            </div>
            
            <div className="dashboard-kpi">
              <div className="kpi-icon">💰</div>
              <div className="kpi-value">{formatCurrency(campaignData.reduce((sum, camp) => sum + camp.cost, 0))}</div>
              <div className="kpi-label">Total Spend</div>
              <div className="kpi-change negative">↘ -5.2%</div>
            </div>
            
            <div className="dashboard-kpi">
              <div className="kpi-icon">🔄</div>
              <div className="kpi-value">{campaignData.reduce((sum, camp) => sum + camp.conversions, 0)}</div>
              <div className="kpi-label">Total Conversions</div>
              <div className="kpi-change positive">↗ +14.8%</div>
            </div>
            
            <div className="dashboard-kpi">
              <div className="kpi-icon">📈</div>
              <div className="kpi-value">{(campaignData.reduce((sum, camp) => sum + camp.roas, 0) / campaignData.length).toFixed(1)}x</div>
              <div className="kpi-label">Avg ROAS</div>
              <div className="kpi-change positive">↗ +8.7%</div>
            </div>
          </div>
        </section>

        {/* Individual Campaign Cards */}
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px', color: 'var(--report-header)' }}>
            Campaign Performance Details
          </h2>
          <div className="campaign-dashboard-grid">
            {campaignData.map((campaign) => (
              <div key={campaign.id} className="dashboard-campaign-card">
                <div className="campaign-card-header">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--report-header)', margin: 0 }}>
                      {campaign.name}
                    </h3>
                    <span className={`campaign-status-badge ${campaign.status === 'Active' ? 'status-active' : 'status-paused'}`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                    Campaign ID: {campaign.id} | Cost: {formatCurrency(campaign.cost)}
                  </div>
                </div>
                
                <div className="campaign-card-content">
                  <div className="campaign-metrics-grid">
                    <div className="mini-dashboard-metric">
                      <div className="mini-metric-value">{formatNumber(campaign.clicks)}</div>
                      <div className="mini-metric-label">Clicks</div>
                    </div>
                    
                    <div className="mini-dashboard-metric">
                      <div className="mini-metric-value">{formatNumber(campaign.impressions)}</div>
                      <div className="mini-metric-label">Impressions</div>
                    </div>
                    
                    <div className="mini-dashboard-metric">
                      <div className="mini-metric-value">{formatPercentage(campaign.ctr)}</div>
                      <div className="mini-metric-label">CTR</div>
                    </div>
                    
                    <div className="mini-dashboard-metric">
                      <div className="mini-metric-value" style={{ 
                        color: campaign.roas >= 3 ? 'var(--dashboard-success)' : 'var(--dashboard-warning)' 
                      }}>
                        {campaign.roas}x
                      </div>
                      <div className="mini-metric-label">ROAS</div>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(249, 250, 251, 0.8)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '4px' }}>
                      Performance Trend
                    </div>
                    <div className="whatagraph-chart-placeholder" id={`chart_${campaign.id}_trend`} style={{ height: '80px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                        30-day trend for {campaign.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Performance Analytics Charts */}
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px', color: 'var(--report-header)' }}>
            Campaign Analytics
          </h2>
          <div className="chart-dashboard-grid">
            <div className="dashboard-chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">
                  📊 ROAS Comparison
                </h3>
                <p className="chart-card-subtitle">Return on ad spend by campaign</p>
              </div>
              <div className="chart-card-content">
                <div className="whatagraph-chart-placeholder" id="chart_roas_comparison">
                  <div className="chart-icon-large">📊</div>
                  <div className="chart-description">
                    <div className="chart-main-text">ROAS Comparison Chart</div>
                    <div className="chart-sub-text">Compare return on investment across campaigns</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">
                  💰 Budget Allocation
                </h3>
                <p className="chart-card-subtitle">Spend distribution pie chart</p>
              </div>
              <div className="chart-card-content">
                <div className="pie-chart-placeholder" id="chart_budget_allocation">
                  <div className="pie-visual">
                    <div style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>
                      <div>Budget</div>
                      <div>Allocation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Performance Table */}
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px', color: 'var(--report-header)' }}>
            Detailed Campaign Metrics
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="dashboard-table" id="detailed_campaign_table">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>Status</th>
                  <th>Impressions</th>
                  <th>Clicks</th>
                  <th>CTR</th>
                  <th>Avg CPC</th>
                  <th>Conversions</th>
                  <th>Conv. Rate</th>
                  <th>Cost</th>
                  <th>ROAS</th>
                </tr>
              </thead>
              <tbody>
                {campaignData.map((campaign) => (
                  <tr key={campaign.id}>
                    <td style={{ fontWeight: '600' }}>{campaign.name}</td>
                    <td>
                      <span className={`campaign-status-badge ${campaign.status === 'Active' ? 'status-active' : 'status-paused'}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td>{formatNumber(campaign.impressions)}</td>
                    <td>{formatNumber(campaign.clicks)}</td>
                    <td>{formatPercentage(campaign.ctr)}</td>
                    <td>{formatCurrency(campaign.avgCpc)}</td>
                    <td>{formatNumber(campaign.conversions)}</td>
                    <td>{formatPercentage(campaign.conversionRate)}</td>
                    <td>{formatCurrency(campaign.cost)}</td>
                    <td style={{ 
                      fontWeight: '700',
                      color: campaign.roas >= 3 ? 'var(--dashboard-success)' : 'var(--dashboard-warning)' 
                    }}>
                      {campaign.roas}x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Insights and Recommendations */}
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px', color: 'var(--report-header)' }}>
            Campaign Insights & Strategy
          </h2>
          <div className="summary-dashboard-grid">
            <div className="dashboard-summary-card">
              <h3 className="summary-card-title">
                📋 Executive Summary
              </h3>
              <div 
                className="dashboard-editable-content"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setExecutiveSummary(e.target.textContent || '')}
              >
                {executiveSummary}
              </div>
            </div>

            <div className="dashboard-summary-card">
              <h3 className="summary-card-title">
                🎯 Strategic Recommendations
              </h3>
              <div className="summary-card-list">
                {recommendations.map((rec, index) => (
                  <div key={index} className="summary-card-item">
                    <div className="summary-bullet"></div>
                    <div>{rec}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="action-dashboard-card">
              <h3 className="summary-card-title">
                ⚡ Quick Actions
              </h3>
              <div style={{ marginTop: '16px' }}>
                <button className="btn btn-primary" style={{ width: '100%', marginBottom: '8px' }}>
                  Optimize Budgets
                </button>
                <button className="btn btn-outline" style={{ width: '100%', marginBottom: '8px' }}>
                  Pause Low Performers
                </button>
                <button className="btn btn-secondary" style={{ width: '100%' }}>
                  Schedule Review
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ 
          textAlign: 'center', 
          marginTop: '48px', 
          padding: '24px', 
          borderTop: '1px solid var(--border)',
          color: 'var(--muted-foreground)',
          fontSize: '0.875rem'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <strong>Powered by AdSpyder</strong> | Advanced Campaign Analytics
          </div>
          <div>
            Report ID: {reportId} | Generated: {generatedDate}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GoogleAdsCampaignReport;
