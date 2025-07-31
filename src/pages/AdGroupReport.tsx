import React, { useState } from 'react';

// Type definitions for Ad Group Performance Report
interface AdGroupMetrics {
  totalAdGroups: number;
  totalSpend: number;
  totalClicks: number;
  totalConversions: number;
  avgCtr: number;
  avgCpc: number;
  avgRoas: number;
  totalImpressions: number;
  budgetGoal: number;
  spendPacing: number;
}

interface AdGroupData {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Removed';
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cost: number;
  conversions: number;
  roas: number;
}

interface TopKeyword {
  keyword: string;
  matchType: string;
  adGroupId: string;
  clicks: number;
  cpc: number;
  conversions: number;
  cost: number;
}

interface AdCreative {
  id: string;
  adGroupId: string;
  headline: string;
  description: string;
  cta: string;
  impressions: number;
  clicks: number;
  ctr: number;
}

const AdGroupReport: React.FC = () => {
  // Static sample data for the ad group report
  const [adGroupMetrics] = useState<AdGroupMetrics>({
    totalAdGroups: 12,
    totalSpend: 15847.32,
    totalClicks: 8934,
    totalConversions: 1247,
    avgCtr: 3.42,
    avgCpc: 1.77,
    avgRoas: 4.2,
    totalImpressions: 261045,
    budgetGoal: 20000,
    spendPacing: 79.2
  });

  const [adGroupData] = useState<AdGroupData[]>([
    { id: "AG001", name: "Premium Product Targeting", status: "Active", impressions: 45678, clicks: 1589, ctr: 3.48, cpc: 1.85, cost: 2940.65, conversions: 234, roas: 5.2 },
    { id: "AG002", name: "Budget-Friendly Options", status: "Active", impressions: 38945, clicks: 1356, ctr: 3.48, cpc: 1.45, cost: 1966.20, conversions: 189, roas: 3.8 },
    { id: "AG003", name: "Seasonal Collections", status: "Active", impressions: 52341, clicks: 1823, ctr: 3.48, cpc: 2.10, cost: 3828.30, conversions: 312, roas: 4.6 },
    { id: "AG004", name: "Brand Keywords", status: "Active", impressions: 29876, clicks: 1234, ctr: 4.13, cpc: 1.25, cost: 1542.50, conversions: 198, roas: 6.1 },
    { id: "AG005", name: "Competitor Terms", status: "Paused", impressions: 15432, clicks: 567, ctr: 3.67, cpc: 2.45, cost: 1389.15, conversions: 67, roas: 2.8 }
  ]);

  const [topKeywords] = useState<TopKeyword[]>([
    { keyword: "premium running shoes", matchType: "Exact", adGroupId: "AG001", clicks: 234, cpc: 1.85, conversions: 34, cost: 432.90 },
    { keyword: "affordable sneakers", matchType: "Phrase", adGroupId: "AG002", clicks: 189, cpc: 1.45, conversions: 28, cost: 274.05 },
    { keyword: "summer athletic wear", matchType: "Broad", adGroupId: "AG003", clicks: 312, cpc: 2.10, conversions: 45, cost: 655.20 },
    { keyword: "nike running", matchType: "Exact", adGroupId: "AG004", clicks: 198, cpc: 1.25, conversions: 32, cost: 247.50 }
  ]);

  const [adCreatives] = useState<AdCreative[]>([
    { id: "AD001", adGroupId: "AG001", headline: "Premium Running Shoes - Free Shipping", description: "Discover our premium collection with advanced cushioning technology", cta: "Shop Now", impressions: 15226, clicks: 529, ctr: 3.47 },
    { id: "AD002", adGroupId: "AG002", headline: "Quality Sneakers Under $100", description: "Affordable athletic footwear without compromising on quality", cta: "Browse Collection", impressions: 12982, clicks: 452, ctr: 3.48 },
    { id: "AD003", adGroupId: "AG003", headline: "Summer Athletic Collection 2024", description: "Stay cool and comfortable with our latest summer gear", cta: "Explore Now", impressions: 17447, clicks: 607, ctr: 3.48 }
  ]);

  const [reportTitle] = useState('Google Ads Ad Group Performance Report');
  const [accountName] = useState('[Account Name]');
  const [campaignName] = useState('Summer 2024 Product Campaign');
  const [dateRange] = useState('July 1, 2024 - July 31, 2024');
  const [reportId] = useState('AGR-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [generatedDate] = useState(new Date().toLocaleDateString());

  const [analystNotes, setAnalystNotes] = useState(
    "Ad group performance shows strong results with Premium Product Targeting leading in ROAS at 5.2x. Brand Keywords demonstrate excellent efficiency with lowest CPC at $1.25. Recommend pausing Competitor Terms ad group and reallocating budget to top-performing Premium and Brand ad groups. Consider expanding exact match keywords in high-performing ad groups to capture additional qualified traffic."
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'var(--accent-green)';
      case 'Paused': return 'var(--warning)';
      case 'Removed': return 'var(--destructive)';
      default: return 'var(--text-secondary)';
    }
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
                <button 
                  className="btn btn-primary" 
                  onClick={exportToPDF} 
                  style={{ marginRight: '12px' }}
                  type="button"
                >
                  Export PDF
                </button>
                <button 
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => window.location.reload()}
                >
                  Refresh Data
                </button>
              </div>
            </div>

            <h1 className="dashboard-title" id="report_title">{reportTitle}</h1>
            
            <div className="dashboard-date">
              <strong>Account:</strong> <span id="account_name">{accountName}</span> | 
              <strong>Campaign:</strong> <span id="campaign_name">{campaignName}</span> | 
              <strong>Period:</strong> <span id="date_range">{dateRange}</span>
            </div>
            <div className="dashboard-date" style={{ marginTop: '8px' }}>
              <strong>Report ID:</strong> <span id="report_id">{reportId}</span> | 
              <strong>Generated:</strong> <span id="generated_date">{generatedDate}</span>
            </div>
          </div>
        </header>

        {/* Ad Group Overview Section */}
        <section className="page-break-avoid">
          <h2 style={{ fontSize: 'var(--font-heading-md)', fontWeight: '600', marginBottom: 'var(--section-spacing)', color: 'var(--text-primary)' }}>
            Google Ads Ad Group Overview
          </h2>
          
          {/* Overview KPI Grid */}
          <div className="kpi-dashboard-grid" style={{ marginBottom: 'var(--section-spacing)' }}>
            <div className="dashboard-kpi">
              <div className="kpi-value" id="kpi_total_ad_groups">{adGroupMetrics.totalAdGroups}</div>
              <div className="kpi-label">Total Ad Groups</div>
              <div className="kpi-change positive">↗ +2 this month</div>
            </div>
            
            <div className="dashboard-kpi">
              <div className="kpi-value" id="kpi_total_spend">{formatCurrency(adGroupMetrics.totalSpend)}</div>
              <div className="kpi-label">Total Spend</div>
              <div className="kpi-change positive">↗ +12.4%</div>
            </div>
            
            <div className="dashboard-kpi">
              <div className="kpi-value" id="kpi_total_clicks">{formatNumber(adGroupMetrics.totalClicks)}</div>
              <div className="kpi-label">Total Clicks</div>
              <div className="kpi-change positive">↗ +8.7%</div>
            </div>
            
            <div className="dashboard-kpi">
              <div className="kpi-value" id="kpi_total_conversions">{formatNumber(adGroupMetrics.totalConversions)}</div>
              <div className="kpi-label">Total Conversions</div>
              <div className="kpi-change positive">↗ +15.3%</div>
            </div>

            <div className="dashboard-kpi">
              <div className="kpi-value" id="kpi_avg_ctr">{formatPercentage(adGroupMetrics.avgCtr)}</div>
              <div className="kpi-label">Avg CTR</div>
              <div className="kpi-change positive">↗ +0.3%</div>
            </div>
            
            <div className="dashboard-kpi">
              <div className="kpi-value" id="kpi_avg_cpc">{formatCurrency(adGroupMetrics.avgCpc)}</div>
              <div className="kpi-label">Avg CPC</div>
              <div className="kpi-change negative">↘ -0.08%</div>
            </div>
            
            <div className="dashboard-kpi">
              <div className="kpi-value" id="kpi_avg_roas">{adGroupMetrics.avgRoas}x</div>
              <div className="kpi-label">Avg ROAS</div>
              <div className="kpi-change positive">↗ +18.2%</div>
            </div>

            <div className="dashboard-kpi">
              <div className="kpi-value" id="kpi_spend_pacing">{formatPercentage(adGroupMetrics.spendPacing)}</div>
              <div className="kpi-label">Budget Pacing</div>
              <div className="kpi-change positive">On Track</div>
            </div>
          </div>

          {/* Budget Progress Visualization */}
          <div className="dashboard-chart-card">
            <div className="chart-card-header">
              <h3 className="chart-card-title">💰 Budget Pacing Progress</h3>
              <p className="chart-card-subtitle">Spend progress against monthly budget goal</p>
            </div>
            <div className="chart-card-content">
              <div style={{ marginBottom: 'var(--element-spacing)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: 'var(--font-body-md)', color: 'var(--text-secondary)' }}>Current Spend</span>
                  <span style={{ fontSize: 'var(--font-body-md)', fontWeight: '600', color: 'var(--text-primary)' }} id="current_spend">
                    {formatCurrency(adGroupMetrics.totalSpend)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: 'var(--font-body-md)', color: 'var(--text-secondary)' }}>Budget Goal</span>
                  <span style={{ fontSize: 'var(--font-body-md)', fontWeight: '600', color: 'var(--text-primary)' }} id="budget_goal">
                    {formatCurrency(adGroupMetrics.budgetGoal)}
                  </span>
                </div>
                
                {/* Budget Progress Bar */}
                <div style={{ 
                  width: '100%', 
                  height: '12px', 
                  background: 'var(--background-secondary)', 
                  borderRadius: 'var(--border-radius-button)',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${adGroupMetrics.spendPacing}%`,
                    height: '100%',
                    background: adGroupMetrics.spendPacing > 90 ? 'var(--warning)' : 'var(--accent-blue)'
                  }} id="pacing_progress_bar"></div>
                </div>
                <div style={{ fontSize: 'var(--font-small)', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '8px' }}>
                  <span id="pacing_percentage">{adGroupMetrics.spendPacing.toFixed(1)}%</span> of monthly budget used
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Group Comparison Charts - Page Break Before */}
        <section className="page-break-before">
          <h2 style={{ fontSize: 'var(--font-heading-md)', fontWeight: '600', marginBottom: 'var(--section-spacing)', color: 'var(--text-primary)' }}>
            Ad Group Comparison Charts
          </h2>
          
          <div className="chart-dashboard-grid">
            <div className="dashboard-chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">📊 Performance Comparison</h3>
                <p className="chart-card-subtitle">Spend, conversions, and ROAS by ad group</p>
              </div>
              <div className="chart-card-content">
                {/* <!-- API Field: Ad Group Performance Chart --> */}
                <div className="whatagraph-chart-placeholder" id="ad_group_performance_chart" data-chart-type="column">
                  <div className="chart-icon-large">📊</div>
                  <div className="chart-description">
                    <div className="chart-main-text">Ad Group Performance Comparison</div>
                    <div className="chart-sub-text">Multi-metric comparison across all ad groups</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">💰 Spend Distribution</h3>
                <p className="chart-card-subtitle">Budget allocation across ad groups</p>
              </div>
              <div className="chart-card-content">
                {/* <!-- API Field: Spend Distribution Chart --> */}
                <div className="pie-chart-placeholder" id="spend_distribution_chart" data-chart-type="pie">
                  <div className="pie-visual">
                    <div style={{ color: 'var(--text-primary)', fontWeight: '600', textAlign: 'center' }}>
                      <div>Spend</div>
                      <div>Distribution</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Group Data Table Section */}
        <section className="page-break-avoid">
          <h2 style={{ fontSize: 'var(--font-heading-md)', fontWeight: '600', marginBottom: 'var(--section-spacing)', color: 'var(--text-primary)' }}>
            Ad Group Performance Data Table
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="dashboard-table" id="ad_group_performance_table">
              <thead>
                <tr>
                  <th>Ad Group Name</th>
                  <th>Status</th>
                  <th>Impressions</th>
                  <th>Clicks</th>
                  <th>CTR</th>
                  <th>CPC</th>
                  <th>Cost</th>
                  <th>Conversions</th>
                  <th>ROAS</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- API Field: Ad Group Performance Rows --> */}
                {adGroupData.map((adGroup, index) => (
                  <tr key={adGroup.id} data-ad-group-id={adGroup.id}>
                    <td style={{ fontWeight: '600' }}>{adGroup.name}</td>
                    <td>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: 'var(--border-radius-button)', 
                        fontSize: 'var(--font-small)',
                        backgroundColor: adGroup.status === 'Active' ? '#dcfce7' : '#fef3c7',
                        color: getStatusColor(adGroup.status),
                        fontWeight: '500'
                      }}>
                        {adGroup.status}
                      </span>
                    </td>
                    <td>{formatNumber(adGroup.impressions)}</td>
                    <td>{formatNumber(adGroup.clicks)}</td>
                    <td>{formatPercentage(adGroup.ctr)}</td>
                    <td>{formatCurrency(adGroup.cpc)}</td>
                    <td>{formatCurrency(adGroup.cost)}</td>
                    <td>{formatNumber(adGroup.conversions)}</td>
                    <td style={{ 
                      fontWeight: '600', 
                      color: adGroup.roas >= 4 ? 'var(--accent-green)' : adGroup.roas >= 2 ? 'var(--text-primary)' : 'var(--warning)'
                    }}>
                      {adGroup.roas}x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Performance Timeline Section */}
        <section className="page-break-avoid">
          <h2 style={{ fontSize: 'var(--font-heading-md)', fontWeight: '600', marginBottom: 'var(--section-spacing)', color: 'var(--text-primary)' }}>
            Performance Timeline
          </h2>
          
          <div className="dashboard-chart-card">
            <div className="chart-card-header">
              <h3 className="chart-card-title">📈 Ad Group Performance Trends</h3>
              <p className="chart-card-subtitle">30-day performance timeline by ad group</p>
            </div>
            <div className="chart-card-content">
              {/* <!-- API Field: Timeline Chart Data --> */}
              <div className="whatagraph-chart-placeholder" id="performance_timeline_chart" data-chart-type="line">
                <div className="chart-icon-large">📈</div>
                <div className="chart-description">
                  <div className="chart-main-text">Performance Timeline Chart</div>
                  <div className="chart-sub-text">Daily trends for clicks, conversions, and spend</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Keywords by Ad Group Section - Page Break Before */}
        <section className="page-break-before">
          <h2 style={{ fontSize: 'var(--font-heading-md)', fontWeight: '600', marginBottom: 'var(--section-spacing)', color: 'var(--text-primary)' }}>
            Top Keywords by Ad Group
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--element-spacing)' }}>
            {/* Keywords Table */}
            <div className="dashboard-summary-card">
              <h3 className="summary-card-title">🔑 Top Performing Keywords</h3>
              <div style={{ overflowX: 'auto', marginTop: 'var(--element-spacing)' }}>
                <table className="dashboard-table" id="top_keywords_table">
                  <thead>
                    <tr>
                      <th>Keyword</th>
                      <th>Match Type</th>
                      <th>Ad Group</th>
                      <th>Clicks</th>
                      <th>CPC</th>
                      <th>Conversions</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <!-- API Field: Top Keywords Data --> */}
                    {topKeywords.map((keyword, index) => (
                      <tr key={index} data-keyword-id={`keyword_${index}`}>
                        <td style={{ fontWeight: '600' }}>{keyword.keyword}</td>
                        <td>
                          <span style={{ 
                            padding: '2px 6px', 
                            borderRadius: 'var(--border-radius-button)', 
                            fontSize: 'var(--font-small)',
                            backgroundColor: 'var(--background-secondary)',
                            color: 'var(--text-primary)'
                          }}>
                            {keyword.matchType}
                          </span>
                        </td>
                        <td>{adGroupData.find(ag => ag.id === keyword.adGroupId)?.name || 'Unknown'}</td>
                        <td>{formatNumber(keyword.clicks)}</td>
                        <td>{formatCurrency(keyword.cpc)}</td>
                        <td>{formatNumber(keyword.conversions)}</td>
                        <td>{formatCurrency(keyword.cost)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Creative Summary Section */}
        <section className="page-break-avoid">
          <h2 style={{ fontSize: 'var(--font-heading-md)', fontWeight: '600', marginBottom: 'var(--section-spacing)', color: 'var(--text-primary)' }}>
            Ad Creative Summary
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--element-spacing)' }}>
            {/* <!-- API Field: Ad Creative Cards --> */}
            {adCreatives.map((creative, index) => (
              <div key={creative.id} className="dashboard-summary-card" data-creative-id={creative.id}>
                <div style={{ 
                  height: '100px', 
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
                  Ad Preview
                </div>
                
                <h3 className="summary-card-title">{creative.headline}</h3>
                <p style={{ fontSize: 'var(--font-small)', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  {creative.description}
                </p>
                <div style={{ 
                  display: 'inline-block',
                  padding: '4px 8px',
                  background: 'var(--accent-blue)',
                  color: 'white',
                  borderRadius: 'var(--border-radius-button)',
                  fontSize: 'var(--font-small)',
                  fontWeight: '600',
                  marginBottom: '12px'
                }}>
                  {creative.cta}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: 'var(--font-small)' }}>
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
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Analyst Commentary Section */}
        <section className="page-break-avoid">
          <h2 style={{ fontSize: 'var(--font-heading-md)', fontWeight: '600', marginBottom: 'var(--section-spacing)', color: 'var(--text-primary)' }}>
            Insights & Analyst Observations
          </h2>
          
          <div className="dashboard-summary-card">
            <h3 className="summary-card-title">📝 Strategic Analysis</h3>
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
            <strong>Powered by AdSpyder</strong> | Google Ads Performance Analytics
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

export default AdGroupReport;

/* 
API Integration JavaScript Template:

// Example of how to inject API data into the ad group report
const updateAdGroupReportData = (apiData) => {
  // Update overview metrics
  document.getElementById('kpi_total_ad_groups').textContent = apiData.totalAdGroups;
  document.getElementById('kpi_total_spend').textContent = formatCurrency(apiData.totalSpend);
  document.getElementById('kpi_avg_roas').textContent = apiData.avgRoas + 'x';
  
  // Update budget pacing
  document.getElementById('current_spend').textContent = formatCurrency(apiData.totalSpend);
  document.getElementById('pacing_percentage').textContent = apiData.spendPacing.toFixed(1) + '%';
  
  // Update chart data
  document.getElementById('ad_group_performance_chart').setAttribute('data-chart-data', JSON.stringify(apiData.performanceData));
  document.getElementById('spend_distribution_chart').setAttribute('data-chart-data', JSON.stringify(apiData.spendDistribution));
  document.getElementById('performance_timeline_chart').setAttribute('data-chart-data', JSON.stringify(apiData.timelineData));
  
  // Update tables
  const adGroupTable = document.getElementById('ad_group_performance_table');
  const keywordsTable = document.getElementById('top_keywords_table');
  // Update table rows with apiData.adGroups and apiData.topKeywords
  
  // Update creative cards
  apiData.adCreatives.forEach(creative => {
    document.getElementById(`creative_impressions_${creative.id}`).textContent = formatNumber(creative.impressions);
    document.getElementById(`creative_clicks_${creative.id}`).textContent = formatNumber(creative.clicks);
    document.getElementById(`creative_ctr_${creative.id}`).textContent = formatPercentage(creative.ctr);
  });
};

// Fetch function example
const fetchAdGroupData = async () => {
  try {
    const response = await fetch('/api/google-ads/ad-groups', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    updateAdGroupReportData(data);
  } catch (error) {
    console.error('Failed to fetch ad group data:', error);
  }
};
*/