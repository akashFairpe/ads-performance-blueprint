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

  // Header editable fields
  const [dateRange, setDateRange] = useState("November 1-30, 2024");
  const [clientName, setClientName] = useState("TechCorp Solutions");
  const [accountId, setAccountId] = useState("123-456-7890");
  const [reportTitle, setReportTitle] = useState("Google Ads Account Performance Summary");
  const [reportSubtitle, setReportSubtitle] = useState("Comprehensive advertising performance analysis");
  const [companyLogo, setCompanyLogo] = useState("AS");
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [brandColor, setBrandColor] = useState("#3b82f6");
  const [generatedDate, setGeneratedDate] = useState(new Date().toLocaleDateString());
  const [reportId, setReportId] = useState(`RPT-${Date.now()}`);

  // Summary sections
  const [keyWins, setKeyWins] = useState([
    "ROAS exceeded target by 20%",
    "Brand campaigns achieved 5.2x ROAS", 
    "Conversion rate improved 15% MoM"
  ]);
  const [keyLearnings, setKeyLearnings] = useState([
    "Search campaigns outperform display 2:1",
    "Mobile traffic converts 25% better",
    "Video ads show strong engagement"
  ]);
  const [improvementAreas, setImprovementAreas] = useState([
    "Optimize display creative assets",
    "Expand high-performing keywords",
    "Test new audience segments"
  ]);
  const [nextSteps, setNextSteps] = useState(
    "• Increase budget allocation to Brand and Competitor search campaigns (+30%)\n• Launch A/B test for new video ad creative concepts\n• Implement enhanced conversion tracking for better attribution\n• Schedule weekly performance reviews for optimization opportunities"
  );

  // API Integration Functions
  const fetchReportData = async () => {
    try {
      const response = await fetch('/api/google-ads/performance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GOOGLE_ADS_API_TOKEN}`
        }
      });
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Failed to load performance data:', error);
    }
  };

  const fetchCampaignData = async () => {
    try {
      const response = await fetch('/api/google-ads/campaigns');
      const campaigns = await response.json();
      setCampaignData(campaigns);
    } catch (error) {
      console.error('Failed to load campaign data:', error);
    }
  };

  // Logo upload handler with validation
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // File size validation (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file size must be less than 2MB');
      return;
    }

    // File type validation
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, SVG)');
      return;
    }

    // Create image element to check dimensions
    const img = new Image();
    img.onload = () => {
      // Dimension validation (recommended: square, max 512x512)
      if (img.width > 512 || img.height > 512) {
        alert('Logo dimensions should be maximum 512x512 pixels for best results');
        return;
      }

      // If validation passes, create data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    };
    
    img.src = URL.createObjectURL(file);
  };

  const removeLogo = () => {
    setLogoImage(null);
  };

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
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Modern Dashboard Header */}
        <div className="dashboard-header">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-6">
              {/* Company Logo - Enhanced Upload */}
              <div className="relative group">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-gray-200/50 hover:border-blue-400 transition-all duration-300 cursor-pointer shadow-lg interactive-hover"
                  style={{ backgroundColor: logoImage ? 'transparent' : brandColor }}
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  {logoImage ? (
                    <img 
                      src={logoImage} 
                      alt="Company Logo" 
                      className="w-full h-full object-contain"
                      id="company_logo_image"
                    />
                  ) : (
                    <span className="text-white font-bold text-xl" id="company_logo_text">
                      {companyLogo}
                    </span>
                  )}
                  
                  {/* Upload overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                    <span className="text-white text-xs font-medium">
                      {logoImage ? 'Change' : 'Upload'}
                    </span>
                  </div>
                </div>
                
                {/* Hidden file input */}
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                
                {/* Remove logo button */}
                {logoImage && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLogo();
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform no-print"
                  >
                    ×
                  </button>
                )}
              </div>
              
              {/* Fallback text logo editor (when no image) */}
              {!logoImage && (
                <div className="text-xs text-muted-foreground no-print">
                  <input
                    type="text"
                    value={companyLogo}
                    onChange={(e) => setCompanyLogo(e.target.value)}
                    className="w-12 text-center p-1 border border-border rounded bg-card"
                    placeholder="Logo"
                    maxLength={3}
                  />
                  <p className="mt-1">Text logo</p>
                </div>
              )}
              
              <div>
                <h1 
                  className="text-4xl font-bold dashboard-editable-field mb-2"
                  style={{ color: brandColor }}
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) => setReportTitle(e.currentTarget.textContent || '')}
                  id="report_title"
                >
                  {reportTitle}
                </h1>
                <p 
                  className="text-gray-600 text-lg dashboard-editable-field"
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) => setReportSubtitle(e.currentTarget.textContent || '')}
                  id="report_subtitle"
                >
                  {reportSubtitle}
                </p>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="no-print">
                <label className="text-sm font-medium text-gray-600">Brand Color:</label>
                <input
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="brand-color-picker ml-2"
                  id="brand_color_picker"
                />
              </div>
              <p className="text-sm text-gray-600">Generated: 
                <span 
                  className="dashboard-editable-field ml-1"
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) => setGeneratedDate(e.currentTarget.textContent || '')}
                  id="generated_date"
                >
                  {generatedDate}
                </span>
              </p>
              <p className="text-sm text-gray-600">Report ID: 
                <span 
                  className="dashboard-editable-field ml-1"
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) => setReportId(e.currentTarget.textContent || '')}
                  id="report_id"
                >
                  {reportId}
                </span>
              </p>
            </div>
          </div>
          
          {/* Logo Upload Guidelines */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-6 text-sm no-print mb-6">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              📋 Logo Upload Guidelines
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-blue-700">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Maximum file size: 2MB
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Recommended: 512x512 pixels
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Formats: PNG, JPG, SVG
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Auto-resized for display
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">📅 Date Range</label>
              <input 
                type="text" 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                id="report_date_range" // API integration marker
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">👤 Client Name</label>
              <input 
                type="text" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                id="client_name" // API integration marker
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">🔢 Account ID</label>
              <input 
                type="text" 
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl bg-white/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                id="account_id" // API integration marker
              />
            </div>
          </div>
        </div>

        {/* Dashboard KPI Overview */}
        <section className="page-break-avoid">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">📊 Performance Overview</h2>
          </div>
          <div className="kpi-dashboard-grid">
            <div className="dashboard-kpi glow-effect">
              <div className="kpi-icon">👆</div>
              <div className="kpi-value" id="metric_clicks">
                {formatNumber(reportData.clicks)}
              </div>
              <div className="kpi-label">Total Clicks</div>
              <div className="kpi-change positive">+12.5%</div>
            </div>
            <div className="dashboard-kpi glow-effect">
              <div className="kpi-icon">👁️</div>
              <div className="kpi-value" id="metric_impressions">
                {formatNumber(reportData.impressions)}
              </div>
              <div className="kpi-label">Impressions</div>
              <div className="kpi-change positive">+8.3%</div>
            </div>
            <div className="dashboard-kpi glow-effect">
              <div className="kpi-icon">🎯</div>
              <div className="kpi-value" id="metric_ctr">
                {formatPercentage(reportData.ctr)}
              </div>
              <div className="kpi-label">CTR</div>
              <div className="kpi-change positive">+15.2%</div>
            </div>
            <div className="dashboard-kpi glow-effect">
              <div className="kpi-icon">💰</div>
              <div className="kpi-value" id="metric_avg_cpc">
                {formatCurrency(reportData.avgCpc)}
              </div>
              <div className="kpi-label">Avg CPC</div>
              <div className="kpi-change negative">-5.7%</div>
            </div>
            <div className="dashboard-kpi glow-effect">
              <div className="kpi-icon">🔄</div>
              <div className="kpi-value" id="metric_conversions">
                {formatNumber(reportData.conversions)}
              </div>
              <div className="kpi-label">Conversions</div>
              <div className="kpi-change positive">+22.1%</div>
            </div>
            <div className="dashboard-kpi glow-effect">
              <div className="kpi-icon">📈</div>
              <div className="kpi-value" id="metric_conversion_rate">
                {formatPercentage(reportData.conversionRate)}
              </div>
              <div className="kpi-label">Conversion Rate</div>
              <div className="kpi-change positive">+18.4%</div>
            </div>
            <div className="dashboard-kpi glow-effect">
              <div className="kpi-icon">💸</div>
              <div className="kpi-value" id="metric_cost">
                {formatCurrency(reportData.cost)}
              </div>
              <div className="kpi-label">Total Cost</div>
              <div className="kpi-change positive">+6.2%</div>
            </div>
            <div className="dashboard-kpi glow-effect">
              <div className="kpi-icon">⚡</div>
              <div className="kpi-value" id="metric_roas">
                {reportData.roas.toFixed(1)}x
              </div>
              <div className="kpi-label">ROAS</div>
              <div className="kpi-change positive">+25.8%</div>
            </div>
          </div>
        </section>

        {/* Enhanced Charts Section */}
        <section className="page-break-avoid">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-teal-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">📈 Performance Analytics</h2>
          </div>
          <div className="chart-dashboard-grid">
            <div className="dashboard-chart-card glow-effect">
              <div className="chart-card-header">
                <h3 className="chart-card-title">
                  📊 Daily Spend vs Conversions
                </h3>
                <p className="chart-card-subtitle">Track spending efficiency and conversion trends over time</p>
              </div>
              <div className="chart-card-content">
                <div className="whatagraph-chart-placeholder" id="chart_daily_trends">
                  <div className="chart-icon-large">📈</div>
                  <div className="chart-description">
                    <div className="chart-main-text">Line Chart: Daily Performance Trends</div>
                    <div className="chart-sub-text">Data will be injected via API integration</div>
                    <div className="chart-sub-text">Shows spend efficiency and conversion patterns</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-chart-card glow-effect">
              <div className="chart-card-header">
                <h3 className="chart-card-title">
                  🎯 Campaign Metrics Comparison
                </h3>
                <p className="chart-card-subtitle">Compare CTR, CPC, and conversion performance across campaigns</p>
              </div>
              <div className="chart-card-content">
                <div className="whatagraph-chart-placeholder" id="chart_campaign_metrics">
                  <div className="chart-icon-large">📊</div>
                  <div className="chart-description">
                    <div className="chart-main-text">Bar Chart: Campaign Performance</div>
                    <div className="chart-sub-text">Multi-metric comparison visualization</div>
                    <div className="chart-sub-text">CTR, CPC, Conversions analysis</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Performance Table */}
        <section className="report-card p-6 page-break-avoid">
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
        <section className="report-card p-6 page-break-avoid">
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
        <section className="report-card p-6 page-break page-break-avoid">
          <h2 className="text-xl font-semibold text-report-header mb-6">Summary & Recommendations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="metric-card border-l-4 border-l-success">
              <h3 className="font-semibold text-success mb-2">Key Wins</h3>
              <div 
                className="editable-list text-sm"
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  const content = e.currentTarget.textContent || '';
                  setKeyWins(content.split('\n').filter(line => line.trim()));
                }}
                id="key_wins"
              >
                {keyWins.map(win => `• ${win}`).join('\n')}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Click to edit</p>
            </div>
            
            <div className="metric-card border-l-4 border-l-info">
              <h3 className="font-semibold text-info mb-2">Key Learnings</h3>
              <div 
                className="editable-list text-sm"
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  const content = e.currentTarget.textContent || '';
                  setKeyLearnings(content.split('\n').filter(line => line.trim()));
                }}
                id="key_learnings"
              >
                {keyLearnings.map(learning => `• ${learning}`).join('\n')}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Click to edit</p>
            </div>
            
            <div className="metric-card border-l-4 border-l-warning">
              <h3 className="font-semibold text-warning mb-2">Improvement Areas</h3>
              <div 
                className="editable-list text-sm"
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  const content = e.currentTarget.textContent || '';
                  setImprovementAreas(content.split('\n').filter(line => line.trim()));
                }}
                id="improvement_areas"
              >
                {improvementAreas.map(area => `• ${area}`).join('\n')}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Click to edit</p>
            </div>
          </div>
          
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <h3 className="font-semibold text-accent mb-2">🎯 Next Steps & Strategic Actions</h3>
            <div 
              className="editable-content text-sm"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) => setNextSteps(e.currentTarget.textContent || '')}
              id="next_steps"
            >
              {nextSteps}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Click to edit strategic actions</p>
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

      {/* Load data on component mount */}
      <script type="text/javascript" dangerouslySetInnerHTML={{
        __html: `
        // API Integration - Ready for implementation
        window.reportAPI = {
          // Load performance metrics from Google Ads API
          async loadPerformanceData() {
            try {
              const response = await fetch('/api/google-ads/performance', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + (process.env.GOOGLE_ADS_API_TOKEN || 'YOUR_API_TOKEN')
                }
              });
              
              if (!response.ok) throw new Error('Failed to fetch performance data');
              return await response.json();
              
            } catch (error) {
              console.error('API Error - Performance data:', error);
              return null;
            }
          },

          // Load campaign data from Google Ads API  
          async loadCampaignData() {
            try {
              const response = await fetch('/api/google-ads/campaigns', {
                headers: {
                  'Authorization': 'Bearer ' + (process.env.GOOGLE_ADS_API_TOKEN || 'YOUR_API_TOKEN')
                }
              });
              
              if (!response.ok) throw new Error('Failed to fetch campaign data');
              return await response.json();
              
            } catch (error) {
              console.error('API Error - Campaign data:', error);
              return null;
            }
          },

          // Load chart/trend data
          async loadChartData() {
            try {
              const response = await fetch('/api/google-ads/charts', {
                headers: {
                  'Authorization': 'Bearer ' + (process.env.GOOGLE_ADS_API_TOKEN || 'YOUR_API_TOKEN')
                }
              });
              
              if (!response.ok) throw new Error('Failed to fetch chart data');
              return await response.json();
              
            } catch (error) {
              console.error('API Error - Chart data:', error);
              return null;
            }
          },

          // Save report data (for editable content)
          async saveReportData(reportData) {
            try {
              const response = await fetch('/api/reports/save', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + (process.env.API_TOKEN || 'YOUR_API_TOKEN')
                },
                body: JSON.stringify(reportData)
              });
              
              if (!response.ok) throw new Error('Failed to save report');
              return await response.json();
              
            } catch (error) {
              console.error('API Error - Save report:', error);
              return null;
            }
          }
        };
        `
      }} />
    </div>
  );
};

export default GoogleAdsReport;