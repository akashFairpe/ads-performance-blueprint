import React, { useState } from 'react';

// Type definitions for Campaign Performance Report
interface CampaignMetrics {
  budgetSpent: number;
  budgetRemaining: number;
  totalBudget: number;
  impressions: number;
  clicks: number;
  conversions: number;
  conversionRate: number;
  ctr: number;
  avgCpc: number;
  roas: number;
  cost: number;
}

interface AudienceInsight {
  segment: string;
  percentage: number;
  clicks: number;
  conversions: number;
  ctr: number;
}

interface CreativePerformance {
  id: string;
  title: string;
  type: string;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  spend: number;
}

interface DeviceMetric {
  device: string;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  conversionRate: number;
}

const CampaignReport: React.FC = () => {
  // Static sample data for the campaign report
  const [campaignMetrics] = useState<CampaignMetrics>({
    budgetSpent: 8547.23,
    budgetRemaining: 1452.77,
    totalBudget: 10000,
    impressions: 245678,
    clicks: 8547,
    conversions: 1847,
    conversionRate: 21.6,
    ctr: 3.48,
    avgCpc: 1.00,
    roas: 5.8,
    cost: 8547.23
  });

  const [audienceInsights] = useState<AudienceInsight[]>([
    { segment: "Female 25-34", percentage: 32, clicks: 2735, conversions: 591, ctr: 3.8 },
    { segment: "Male 25-34", percentage: 28, clicks: 2393, conversions: 516, ctr: 3.4 },
    { segment: "Female 35-44", percentage: 22, clicks: 1880, conversions: 406, ctr: 3.2 },
    { segment: "Male 35-44", percentage: 18, clicks: 1539, conversions: 334, ctr: 3.0 }
  ]);

  const [deviceMetrics] = useState<DeviceMetric[]>([
    { device: "Desktop", impressions: 122839, clicks: 4273, conversions: 923, ctr: 3.48, conversionRate: 21.6 },
    { device: "Mobile", impressions: 98271, clicks: 3418, conversions: 738, ctr: 3.48, conversionRate: 21.6 },
    { device: "Tablet", impressions: 24568, clicks: 856, conversions: 186, ctr: 3.48, conversionRate: 21.7 }
  ]);

  const [creativePerformance] = useState<CreativePerformance[]>([
    { id: "CR001", title: "Summer Sale Banner", type: "Display", impressions: 45678, clicks: 1589, ctr: 3.48, conversions: 343, spend: 1589.45 },
    { id: "CR002", title: "Product Showcase Video", type: "Video", impressions: 38945, clicks: 1356, ctr: 3.48, conversions: 292, spend: 1356.78 },
    { id: "CR003", title: "Feature Highlight Ad", type: "Search", impressions: 52341, clicks: 1823, ctr: 3.48, conversions: 394, spend: 1823.12 }
  ]);

  const [reportTitle] = useState('Campaign Performance Report');
  const [campaignName] = useState('Summer 2024 Product Launch');
  const [dateRange] = useState('July 1, 2024 - July 31, 2024');
  const [clientName] = useState('[Client Name]');
  const [reportId] = useState('CPR-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [generatedDate] = useState(new Date().toLocaleDateString());

  const [analystNotes, setAnalystNotes] = useState(
    "This campaign has exceeded performance expectations with a 21.6% conversion rate, significantly above the industry benchmark of 15%. The Summer Sale Banner creative demonstrates the strongest performance with highest CTR and conversion volume. Recommend scaling budget allocation to top-performing creatives and expanding audience targeting to similar demographic segments."
  );

  // Utility functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
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

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        
        {/* Report Header - Page Break Before */}
        <header className="dashboard-header page-break-before">
          <div className="dashboard-header-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--section-spacing)' }}>
              <div>
                {/* <!-- API Field: Company Logo --> */}
                <div className="company-logo-placeholder" id="company_logo">
                  <div style={{ 
                    width: '120px', 
                    height: '40px', 
                    background: 'var(--background-secondary)', 
                    border: '2px dashed var(--border)', 
                    borderRadius: 'var(--border-radius-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--font-small)',
                    color: 'var(--text-secondary)'
                  }}>
                    Company Logo
                  </div>
                </div>
              </div>
              
              <div className="no-print">
                <button className="btn btn-primary" onClick={exportToPDF} style={{ marginRight: '12px' }}>
                  Export PDF
                </button>
                <button className="btn btn-secondary">
                  Share Report
                </button>
              </div>
            </div>

            <h1 className="dashboard-title" id="report_title">{reportTitle}</h1>
            <h2 className="dashboard-subtitle" id="campaign_name">{campaignName}</h2>
            
            <div className="dashboard-date">
              <strong>Reporting Period:</strong> <span id="date_range">{dateRange}</span> | 
              <strong>Client:</strong> <span id="client_name">{clientName}</span> | 
              <strong>Report ID:</strong> <span id="report_id">{reportId}</span> | 
              <strong>Generated:</strong> <span id="generated_date">{generatedDate}</span>
            </div>
          </div>
        </header>

        {/* Campaign Overview Section */}
        <section className="page-break-avoid">
          <h2 style={{ fontSize: 'var(--font-heading-md)', fontWeight: '600', marginBottom: 'var(--section-spacing)', color: 'var(--text-primary)' }}>
            Campaign Overview
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--section-spacing)', marginBottom: 'var(--section-spacing)' }}>
            
            {/* Budget Progress */}
            <div className="dashboard-chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">💰 Budget Performance</h3>
                <p className="chart-card-subtitle">Spend tracking and remaining budget</p>
              </div>
              <div className="chart-card-content">
                <div style={{ marginBottom: 'var(--element-spacing)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: 'var(--font-body-md)', color: 'var(--text-secondary)' }}>Spent</span>
                    <span style={{ fontSize: 'var(--font-body-md)', fontWeight: '600', color: 'var(--text-primary)' }} id="budget_spent">
                      {formatCurrency(campaignMetrics.budgetSpent)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: 'var(--font-body-md)', color: 'var(--text-secondary)' }}>Remaining</span>
                    <span style={{ fontSize: 'var(--font-body-md)', fontWeight: '600', color: 'var(--text-primary)' }} id="budget_remaining">
                      {formatCurrency(campaignMetrics.budgetRemaining)}
                    </span>
                  </div>
                  
                  {/* Budget Progress Bar */}
                  <div style={{ 
                    width: '100%', 
                    height: '8px', 
                    background: 'var(--background-secondary)', 
                    borderRadius: 'var(--border-radius-button)',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${(campaignMetrics.budgetSpent / campaignMetrics.totalBudget) * 100}%`,
                      height: '100%',
                      background: 'var(--accent-blue)',
                      transition: 'width 0.3s ease'
                    }} id="budget_progress_bar"></div>
                  </div>
                  <div style={{ fontSize: 'var(--font-small)', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '8px' }}>
                    <span id="budget_percentage">{((campaignMetrics.budgetSpent / campaignMetrics.totalBudget) * 100).toFixed(1)}%</span> of total budget used
                  </div>
                </div>
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="dashboard-chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">🔄 Conversion Funnel</h3>
                <p className="chart-card-subtitle">Campaign stage performance</p>
              </div>
              <div className="chart-card-content">
                <div className="funnel-chart-placeholder" id="conversion_funnel_chart">
                  <div className="funnel-stage" style={{ 
                    width: '100%', 
                    background: 'var(--accent-blue)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: 'var(--border-radius-card)',
                    margin: '4px 0',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    <span id="funnel_impressions">Impressions: {formatNumber(campaignMetrics.impressions)}</span>
                  </div>
                  <div className="funnel-stage" style={{ 
                    width: '85%', 
                    background: 'var(--accent-purple)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: 'var(--border-radius-card)',
                    margin: '4px 0',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    <span id="funnel_clicks">Clicks: {formatNumber(campaignMetrics.clicks)}</span>
                  </div>
                  <div className="funnel-stage" style={{ 
                    width: '70%', 
                    background: 'var(--accent-green)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: 'var(--border-radius-card)',
                    margin: '4px 0',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    <span id="funnel_conversions">Conversions: {formatNumber(campaignMetrics.conversions)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="kpi-dashboard-grid">
            <div className="dashboard-kpi">
              <div className="kpi-icon">🎯</div>
              <div className="kpi-value" id="kpi_conversion_rate">{formatPercentage(campaignMetrics.conversionRate)}</div>
              <div className="kpi-label">Conversion Rate</div>
              <div className="kpi-change positive">↗ +4.2%</div>
            </div>
            
            <div className="dashboard-kpi">
              <div className="kpi-icon">👆</div>
              <div className="kpi-value" id="kpi_ctr">{formatPercentage(campaignMetrics.ctr)}</div>
              <div className="kpi-label">Click-Through Rate</div>
              <div className="kpi-change positive">↗ +2.1%</div>
            </div>
            
            <div className="dashboard-kpi">
              <div className="kpi-icon">💵</div>
              <div className="kpi-value" id="kpi_avg_cpc">{formatCurrency(campaignMetrics.avgCpc)}</div>
              <div className="kpi-label">Avg. CPC</div>
              <div className="kpi-change negative">↘ -0.15%</div>
            </div>
            
            <div className="dashboard-kpi">
              <div className="kpi-icon">📊</div>
              <div className="kpi-value" id="kpi_roas">{campaignMetrics.roas}x</div>
              <div className="kpi-label">ROAS</div>
              <div className="kpi-change positive">↗ +12.4%</div>
            </div>
          </div>
        </section>

        {/* Performance Trends Section - Page Break Before */}
        <section className="page-break-before">
          <h2 style={{ fontSize: 'var(--font-heading-md)', fontWeight: '600', marginBottom: 'var(--section-spacing)', color: 'var(--text-primary)' }}>
            Performance Trends
          </h2>
          
          <div className="chart-dashboard-grid">
            <div className="dashboard-chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">📈 Campaign Performance Over Time</h3>
                <p className="chart-card-subtitle">Daily metrics throughout the reporting period</p>
              </div>
              <div className="chart-card-content">
                {/* <!-- API Field: Time Series Chart Data --> */}
                <div className="whatagraph-chart-placeholder" id="performance_trends_chart" data-chart-type="timeseries">
                  <div className="chart-icon-large">📈</div>
                  <div className="chart-description">
                    <div className="chart-main-text">Time Series Performance Chart</div>
                    <div className="chart-sub-text">Daily spend, clicks, and conversions over time</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">📊 Comparative Campaign Analysis</h3>
                <p className="chart-card-subtitle">Performance comparison across campaigns</p>
              </div>
              <div className="chart-card-content">
                {/* <!-- API Field: Comparative Chart Data --> */}
                <div className="whatagraph-chart-placeholder" id="comparative_analysis_chart" data-chart-type="comparison">
                  <div className="chart-icon-large">📊</div>
                  <div className="chart-description">
                    <div className="chart-main-text">Multi-Campaign Comparison</div>
                    <div className="chart-sub-text">Spend vs. Performance metrics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Audience & Device Insights Section */}
        <section className="page-break-avoid">
          <h2 style={{ fontSize: 'var(--font-heading-md)', fontWeight: '600', marginBottom: 'var(--section-spacing)', color: 'var(--text-primary)' }}>
            Audience & Device Insights
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--section-spacing)' }}>
            
            {/* Demographics Chart */}
            <div className="dashboard-chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">👥 Demographic Breakdown</h3>
                <p className="chart-card-subtitle">Performance by age and gender segments</p>
              </div>
              <div className="chart-card-content">
                {/* <!-- API Field: Demographics Chart --> */}
                <div className="pie-chart-placeholder" id="demographics_chart" data-chart-type="demographics">
                  <div className="pie-visual">
                    <div style={{ color: 'var(--text-primary)', fontWeight: '600', textAlign: 'center' }}>
                      <div>Audience</div>
                      <div>Segments</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Device Performance */}
            <div className="dashboard-chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">📱 Device Distribution</h3>
                <p className="chart-card-subtitle">Performance across device types</p>
              </div>
              <div className="chart-card-content">
                {/* <!-- API Field: Device Chart --> */}
                <div className="whatagraph-chart-placeholder" id="device_performance_chart" data-chart-type="device">
                  <div className="chart-icon-large">📱</div>
                  <div className="chart-description">
                    <div className="chart-main-text">Device Performance Chart</div>
                    <div className="chart-sub-text">Desktop, mobile, and tablet metrics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Audience & Device Insights Tables */}
          <div style={{ marginTop: 'var(--section-spacing)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--section-spacing)' }}>
            
            {/* Audience Table */}
            <div>
              <h3 style={{ fontSize: 'var(--font-heading-sm)', fontWeight: '600', marginBottom: 'var(--element-spacing)', color: 'var(--text-primary)' }}>
                Audience Performance Metrics
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="dashboard-table" id="audience_insights_table">
                  <thead>
                    <tr>
                      <th>Segment</th>
                      <th>Share</th>
                      <th>Clicks</th>
                      <th>Conv.</th>
                      <th>CTR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <!-- API Field: Audience Data Rows --> */}
                    {audienceInsights.map((insight, index) => (
                      <tr key={index} data-audience-id={`audience_${index}`}>
                        <td>{insight.segment}</td>
                        <td>{formatPercentage(insight.percentage)}</td>
                        <td>{formatNumber(insight.clicks)}</td>
                        <td>{formatNumber(insight.conversions)}</td>
                        <td style={{ fontWeight: '600', color: insight.ctr >= 3.5 ? 'var(--accent-green)' : 'var(--text-primary)' }}>
                          {formatPercentage(insight.ctr)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Device Table */}
            <div>
              <h3 style={{ fontSize: 'var(--font-heading-sm)', fontWeight: '600', marginBottom: 'var(--element-spacing)', color: 'var(--text-primary)' }}>
                Device Performance Metrics
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="dashboard-table" id="device_metrics_table">
                  <thead>
                    <tr>
                      <th>Device</th>
                      <th>Impressions</th>
                      <th>Clicks</th>
                      <th>Conv.</th>
                      <th>CTR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <!-- API Field: Device Data Rows --> */}
                    {deviceMetrics.map((device, index) => (
                      <tr key={index} data-device-id={`device_${index}`}>
                        <td style={{ fontWeight: '600' }}>{device.device}</td>
                        <td>{formatNumber(device.impressions)}</td>
                        <td>{formatNumber(device.clicks)}</td>
                        <td>{formatNumber(device.conversions)}</td>
                        <td style={{ fontWeight: '600', color: device.ctr >= 3.5 ? 'var(--accent-green)' : 'var(--text-primary)' }}>
                          {formatPercentage(device.ctr)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Table Section - Page Break Before */}
        <section className="page-break-before">
          <h2 style={{ fontSize: 'var(--font-heading-md)', fontWeight: '600', marginBottom: 'var(--section-spacing)', color: 'var(--text-primary)' }}>
            Campaign Performance Table
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="dashboard-table" id="campaign_performance_table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Budget</th>
                  <th>Spend</th>
                  <th>CPC</th>
                  <th>CTR</th>
                  <th>Conversions</th>
                  <th>ROAS</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- API Field: Campaign Performance Rows --> */}
                <tr data-campaign-id="main_campaign">
                  <td style={{ fontWeight: '600' }}>{campaignName}</td>
                  <td>{formatCurrency(campaignMetrics.totalBudget)}</td>
                  <td>{formatCurrency(campaignMetrics.budgetSpent)}</td>
                  <td>{formatCurrency(campaignMetrics.avgCpc)}</td>
                  <td>{formatPercentage(campaignMetrics.ctr)}</td>
                  <td>{formatNumber(campaignMetrics.conversions)}</td>
                  <td style={{ fontWeight: '600', color: campaignMetrics.roas >= 4 ? 'var(--accent-green)' : 'var(--text-primary)' }}>
                    {campaignMetrics.roas}x
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Creative Summary Section */}
        <section className="page-break-avoid">
          <h2 style={{ fontSize: 'var(--font-heading-md)', fontWeight: '600', marginBottom: 'var(--section-spacing)', color: 'var(--text-primary)' }}>
            Creative Performance Summary
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--element-spacing)' }}>
            {/* <!-- API Field: Creative Performance Cards --> */}
            {creativePerformance.map((creative, index) => (
              <div key={creative.id} className="dashboard-summary-card" data-creative-id={creative.id}>
                <div style={{ 
                  height: '120px', 
                  background: 'var(--background-secondary)', 
                  border: '2px dashed var(--border)', 
                  borderRadius: 'var(--border-radius-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                  fontSize: 'var(--font-small)',
                  color: 'var(--text-secondary)'
                }}>
                  Creative Preview
                </div>
                
                <h3 className="summary-card-title">{creative.title}</h3>
                <p style={{ fontSize: 'var(--font-small)', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  {creative.type} Creative
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: 'var(--font-small)' }}>
                  <div>
                    <strong>Impressions:</strong><br />
                    <span id={`creative_impressions_${creative.id}`}>{formatNumber(creative.impressions)}</span>
                  </div>
                  <div>
                    <strong>Clicks:</strong><br />
                    <span id={`creative_clicks_${creative.id}`}>{formatNumber(creative.clicks)}</span>
                  </div>
                  <div>
                    <strong>CTR:</strong><br />
                    <span id={`creative_ctr_${creative.id}`}>{formatPercentage(creative.ctr)}</span>
                  </div>
                  <div>
                    <strong>Conversions:</strong><br />
                    <span id={`creative_conversions_${creative.id}`}>{formatNumber(creative.conversions)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Commentary Section */}
        <section className="page-break-avoid">
          <h2 style={{ fontSize: 'var(--font-heading-md)', fontWeight: '600', marginBottom: 'var(--section-spacing)', color: 'var(--text-primary)' }}>
            Analyst Commentary & Recommendations
          </h2>
          
          <div className="dashboard-summary-card">
            <h3 className="summary-card-title">📝 Performance Analysis</h3>
            <div 
              className="dashboard-editable-content"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setAnalystNotes(e.target.textContent || '')}
              style={{ 
                minHeight: '120px',
                padding: 'var(--card-padding)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--border-radius-card)',
                backgroundColor: 'var(--background-secondary)',
                fontSize: 'var(--font-body-md)',
                lineHeight: '1.6'
              }}
              id="analyst_commentary"
            >
              {analystNotes}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="page-break-before" style={{ 
          textAlign: 'center', 
          marginTop: '48px', 
          padding: 'var(--section-spacing)', 
          borderTop: '1px solid var(--border)',
          color: 'var(--text-secondary)',
          fontSize: 'var(--font-small)'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <strong>Powered by Campaign Analytics Suite</strong> | Professional Performance Reporting
          </div>
          <div>
            Report generated on <span id="footer_generated_date">{generatedDate}</span> | Report ID: <span id="footer_report_id">{reportId}</span>
          </div>
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: 'var(--element-spacing)' }}>
            {/* Social/Contact placeholders */}
            <div style={{ width: '24px', height: '24px', background: 'var(--background-secondary)', borderRadius: '50%' }}></div>
            <div style={{ width: '24px', height: '24px', background: 'var(--background-secondary)', borderRadius: '50%' }}></div>
            <div style={{ width: '24px', height: '24px', background: 'var(--background-secondary)', borderRadius: '50%' }}></div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CampaignReport;

/* 
API Integration JavaScript Template:

// Example of how to inject API data into the report
const updateReportData = (apiData) => {
  // Update campaign metrics
  document.getElementById('budget_spent').textContent = formatCurrency(apiData.budgetSpent);
  document.getElementById('budget_remaining').textContent = formatCurrency(apiData.budgetRemaining);
  document.getElementById('kpi_conversion_rate').textContent = formatPercentage(apiData.conversionRate);
  
  // Update chart data
  document.getElementById('performance_trends_chart').setAttribute('data-chart-data', JSON.stringify(apiData.trendsData));
  document.getElementById('demographics_chart').setAttribute('data-chart-data', JSON.stringify(apiData.demographicsData));
  
  // Update tables
  const audienceTable = document.getElementById('audience_insights_table');
  // Update audience table rows with apiData.audienceInsights
  
  // Update creative cards
  apiData.creativePerformance.forEach(creative => {
    document.getElementById(`creative_impressions_${creative.id}`).textContent = formatNumber(creative.impressions);
    document.getElementById(`creative_clicks_${creative.id}`).textContent = formatNumber(creative.clicks);
  });
};
*/