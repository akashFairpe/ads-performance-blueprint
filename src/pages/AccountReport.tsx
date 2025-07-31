import React, { useState } from 'react';
import BrandingSystem, { BrandingConfig } from '../components/BrandingSystem';

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

const AccountReport: React.FC = () => {
  // Static sample data - will be replaced with API calls
  const [reportData, setReportData] = useState<MetricData>({
    clicks: 12547,
    impressions: 487532,
    ctr: 2.57,
    avgCpc: 1.23,
    conversions: 1847,
    conversionRate: 14.72,
    cost: 15433.61,
    roas: 4.8
  });

  const [campaignData, setCampaignData] = useState<CampaignData[]>([
    { name: "Brand Campaign - Search", spend: 5240.23, impressions: 145632, ctr: 3.2, conversions: 542, roas: 5.2 },
    { name: "Shopping - Electronics", spend: 3987.45, impressions: 187543, ctr: 2.1, conversions: 423, roas: 4.6 },
    { name: "Display - Retargeting", spend: 2876.12, impressions: 98765, ctr: 1.8, conversions: 287, roas: 3.9 },
    { name: "Video - YouTube Ads", spend: 1945.87, impressions: 45678, ctr: 2.8, conversions: 198, roas: 4.2 },
    { name: "Search - Competitors", spend: 1383.94, impressions: 35421, ctr: 3.5, conversions: 156, roas: 5.8 }
  ]);

  const [analystNotes, setAnalystNotes] = useState(
    "Strong performance this month with ROAS exceeding target by 20%. Brand campaigns continue to deliver the highest conversion rates. Recommend increasing budget allocation to top-performing search campaigns while optimizing display creative for better engagement."
  );

  const [recommendations, setRecommendations] = useState([
    "Increase budget allocation to Brand Campaign - Search (+30% budget)",
    "Optimize Shopping campaign product feed for better performance",
    "A/B test new creative variants for Display campaigns",
    "Expand keyword targeting for high-converting search terms",
    "Implement automated bidding strategies for efficiency"
  ]);

  const [reportTitle, setReportTitle] = useState('Google Ads Account Performance Report');
  const [dateRange, setDateRange] = useState('Jan 1, 2024 - Jan 31, 2024');
  const [clientName, setClientName] = useState('[Client Name]');
  const [accountId, setAccountId] = useState('[Account ID]');
  const [reportId, setReportId] = useState('RPT-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [generatedDate, setGeneratedDate] = useState(new Date().toLocaleDateString());

  // Branding configuration
  const [branding, setBranding] = useState<BrandingConfig>({
    logo: '',
    primaryColor: '#3B82F6',
    fontFamily: 'Inter',
    companyName: 'Your Company',
    footerText: 'Powered by AdSpyder'
  });

  // API Integration Helper Functions (for future implementation)
  const fetchAccountData = async () => {
    // Example API call structure
    /*
    try {
      const response = await fetch('/api/google-ads/account-summary', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setReportData(data.metrics);
      setCampaignData(data.campaigns);
    } catch (error) {
      console.error('Failed to fetch account data:', error);
    }
    */
  };

  const exportToPDF = () => {
    window.print();
  };

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

  return (
    <div className="dashboard-container" style={{ fontFamily: `var(--font-family-brand, ${branding.fontFamily})` }}>
      <div className="dashboard-wrapper">
        
        {/* Branding System */}
        <BrandingSystem 
          onBrandingChange={setBranding}
          initialBranding={branding}
        />

        {/* Report Header - Page Break Before */}
        <header className="dashboard-header page-break-before">
          <div className="dashboard-header-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--section-spacing)' }}>
              <div>
                {/* Company Logo Display */}
                {branding.logo && (
                  <img 
                    src={branding.logo} 
                    alt="Company Logo"
                    style={{ 
                      height: '40px', 
                      maxWidth: '150px', 
                      objectFit: 'contain',
                      marginBottom: 'var(--element-spacing)' 
                    }}
                    id="company_logo"
                  />
                )}
                {!branding.logo && (
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
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--element-spacing)'
                  }}>
                    {branding.companyName}
                  </div>
                )}
              </div>
              
              <div className="no-print" style={{ display: 'flex', gap: '12px' }}>
                <button 
                  className="btn btn-primary" 
                  onClick={exportToPDF} 
                  type="button"
                >
                  Export PDF
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={fetchAccountData}
                  type="button"
                >
                  Refresh Data
                </button>
              </div>
            </div>

            <h1 
              className="dashboard-title"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setReportTitle(e.target.textContent || '')}
              id="report_title"
            >
              {reportTitle}
            </h1>
            <div 
              className="dashboard-subtitle"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setDateRange(e.target.textContent || '')}
              id="date_range"
            >
              Performance Period: {dateRange}
            </div>
            <div className="dashboard-date">
              <strong>Client:</strong> 
              <span 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setClientName(e.target.textContent || '')}
                id="client_name"
              >
                {clientName}
              </span> | 
              <strong>Account ID:</strong> 
              <span 
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setAccountId(e.target.textContent || '')}
                id="account_id"
              >
                {accountId}
              </span> | 
              <strong>Report ID:</strong> <span id="report_id">{reportId}</span> | 
              <strong>Generated:</strong> <span id="generated_date">{generatedDate}</span>
            </div>
          </div>
        </header>

        {/* ... keep existing code (KPI Dashboard) */}
        
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px', color: 'var(--report-header)' }}>
            Key Performance Indicators
          </h2>
          <div className="kpi-dashboard-grid">
            <div className="dashboard-kpi">
              <div className="kpi-value" id="kpi_total_clicks">{formatNumber(reportData.clicks)}</div>
              <div className="kpi-label">Total Clicks</div>
              <div className="kpi-change positive">↗ +12.4%</div>
            </div>
            
            <div className="dashboard-kpi">
              <div className="kpi-value" id="kpi_total_impressions">{formatNumber(reportData.impressions)}</div>
              <div className="kpi-label">Impressions</div>
              <div className="kpi-change positive">↗ +8.7%</div>
            </div>
            
            <div className="dashboard-kpi">
              <div className="kpi-value" id="kpi_total_cost">{formatCurrency(reportData.cost)}</div>
              <div className="kpi-label">Total Cost</div>
              <div className="kpi-change negative">↘ -3.2%</div>
            </div>
            
            <div className="dashboard-kpi">
              <div className="kpi-value" id="kpi_roas">{reportData.roas}x</div>
              <div className="kpi-label">ROAS</div>
              <div className="kpi-change positive">↗ +18.9%</div>
            </div>
          </div>
        </section>

        {/* ... keep existing code (Charts Dashboard) */}
        
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px', color: 'var(--report-header)' }}>
            Performance Analytics
          </h2>
          <div className="chart-dashboard-grid">
            <div className="dashboard-chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">
                  📈 Performance Trends
                </h3>
                <p className="chart-card-subtitle">30-day trend analysis</p>
              </div>
              <div className="chart-card-content">
                <div className="whatagraph-chart-placeholder" id="chart_performance_trends">
                  <div className="chart-icon-large">📈</div>
                  <div className="chart-description">
                    <div className="chart-main-text">Performance Trends Chart</div>
                    <div className="chart-sub-text">30-day clicks, impressions, and cost trends</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">
                  🔄 Conversion Funnel
                </h3>
                <p className="chart-card-subtitle">User journey analysis</p>
              </div>
              <div className="chart-card-content">
                <div className="funnel-chart-placeholder" id="chart_conversion_funnel">
                  <div className="funnel-stage">Impressions: {formatNumber(reportData.impressions)}</div>
                  <div className="funnel-stage">Clicks: {formatNumber(reportData.clicks)}</div>
                  <div className="funnel-stage">Conversions: {formatNumber(reportData.conversions)}</div>
                </div>
              </div>
            </div>

            <div className="dashboard-chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">
                  🥧 Campaign Spend Distribution
                </h3>
                <p className="chart-card-subtitle">Budget allocation breakdown</p>
              </div>
              <div className="chart-card-content">
                <div className="pie-chart-placeholder" id="chart_spend_distribution">
                  <div className="pie-visual">
                    <div style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>
                      <div>Campaign</div>
                      <div>Spend Mix</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">
                  🎯 Campaign Performance
                </h3>
                <p className="chart-card-subtitle">ROAS by campaign comparison</p>
              </div>
              <div className="chart-card-content">
                <div className="whatagraph-chart-placeholder" id="chart_campaign_comparison">
                  <div className="chart-icon-large">📊</div>
                  <div className="chart-description">
                    <div className="chart-main-text">Campaign ROAS Comparison</div>
                    <div className="chart-sub-text">Performance by campaign type</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ... keep existing code (Campaign Performance Table) */}
        
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px', color: 'var(--report-header)' }}>
            Top Performing Campaigns
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="dashboard-table" id="campaign_performance_table">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>Spend</th>
                  <th>Impressions</th>
                  <th>CTR</th>
                  <th>Conversions</th>
                  <th>ROAS</th>
                </tr>
              </thead>
              <tbody>
                {campaignData.map((campaign, index) => (
                  <tr key={index}>
                    <td>{campaign.name}</td>
                    <td>{formatCurrency(campaign.spend)}</td>
                    <td>{formatNumber(campaign.impressions)}</td>
                    <td>{formatPercentage(campaign.ctr)}</td>
                    <td>{formatNumber(campaign.conversions)}</td>
                    <td style={{ fontWeight: '600', color: campaign.roas >= 4 ? 'var(--dashboard-success)' : 'var(--dashboard-warning)' }}>
                      {campaign.roas}x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ... keep existing code (Analysis and Recommendations) */}
        
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px', color: 'var(--report-header)' }}>
            Analysis & Recommendations
          </h2>
          <div className="summary-dashboard-grid">
            <div className="dashboard-summary-card">
              <h3 className="summary-card-title">
                📝 Analyst Notes
              </h3>
              <div 
                className="dashboard-editable-content"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setAnalystNotes(e.target.textContent || '')}
              >
                {analystNotes}
              </div>
            </div>

            <div className="dashboard-summary-card">
              <h3 className="summary-card-title">
                💡 Key Recommendations
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
                🚀 Next Actions
              </h3>
              <div style={{ marginTop: '16px' }}>
                <button className="btn btn-primary" style={{ width: '100%', marginBottom: '8px' }}>
                  Schedule Campaign Review
                </button>
                <button className="btn btn-outline" style={{ width: '100%' }}>
                  Export Detailed Report
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Customizable Footer - Page Break Before */}
        <footer className="page-break-before" style={{ 
          textAlign: 'center', 
          marginTop: '48px', 
          padding: '24px', 
          borderTop: '1px solid var(--border)',
          color: 'var(--muted-foreground)',
          fontSize: '0.875rem'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <span 
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setBranding({...branding, footerText: e.target.textContent || ''})}
              id="footer_text"
              style={{ fontWeight: '600' }}
            >
              {branding.footerText}
            </span> | Professional Google Ads Analytics
          </div>
          <div>
            Report generated on <span id="footer_generated_date">{generatedDate}</span> | 
            ID: <span id="footer_report_id">{reportId}</span>
          </div>
          <div style={{ fontSize: '0.75rem', marginTop: '8px', opacity: 0.7 }}>
            Page <span className="page-number"></span>
          </div>
        </footer>

        {/* CSS for print page numbering */}
        <style>{`
          @media print {
            .page-break-before { page-break-before: always; }
            .page-break-avoid { page-break-inside: avoid; }
            .no-print { display: none !important; }
            
            @page {
              counter-increment: page;
              margin: 1in;
            }
            
            .page-number:after {
              content: counter(page);
            }
          }
          
          /* API Integration Script Template */
          /*
          // Example API integration for dynamic data population
          async function fetchAccountData() {
            try {
              const response = await fetch('/api/google-ads/account-summary', {
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer ' + accessToken,
                  'Content-Type': 'application/json'
                }
              });
              const data = await response.json();
              
              // Update KPI values
              document.getElementById('kpi_total_clicks').textContent = formatNumber(data.clicks);
              document.getElementById('kpi_total_impressions').textContent = formatNumber(data.impressions);
              document.getElementById('kpi_total_cost').textContent = formatCurrency(data.cost);
              document.getElementById('kpi_roas').textContent = data.roas + 'x';
              
              // Update campaign table
              const tableBody = document.querySelector('#campaign_performance_table tbody');
              tableBody.innerHTML = '';
              data.campaigns.forEach(campaign => {
                const row = document.createElement('tr');
                row.innerHTML = \`
                  <td>\${campaign.name}</td>
                  <td>\${formatCurrency(campaign.spend)}</td>
                  <td>\${formatNumber(campaign.impressions)}</td>
                  <td>\${formatPercentage(campaign.ctr)}</td>
                  <td>\${formatNumber(campaign.conversions)}</td>
                  <td style="font-weight: 600; color: \${campaign.roas >= 4 ? 'var(--dashboard-success)' : 'var(--dashboard-warning)'}">\${campaign.roas}x</td>
                \`;
                tableBody.appendChild(row);
              });
              
            } catch (error) {
              console.error('Failed to fetch account data:', error);
            }
          }
          */
        `}</style>
      </div>
    </div>
  );
};

export default AccountReport;