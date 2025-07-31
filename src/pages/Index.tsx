import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <header className="dashboard-header">
          <div className="dashboard-header-content">
            <h1 className="dashboard-title">Google Ads Report Suite</h1>
            <p className="dashboard-subtitle">Professional reporting tools for Google Ads performance analysis</p>
          </div>
        </header>

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px', color: 'var(--report-header)' }}>
            Available Reports
          </h2>
          
          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
            <div className="dashboard-summary-card">
              <h3 className="summary-card-title">
                📊 Account Performance Report
              </h3>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: '16px' }}>
                Comprehensive overview of your Google Ads account performance with KPIs, charts, and insights.
              </p>
              <Link 
                to="/account-report" 
                className="btn btn-primary"
                style={{ width: '100%', textDecoration: 'none', display: 'block', textAlign: 'center' }}
              >
                View Account Report
              </Link>
            </div>

            <div className="dashboard-summary-card">
              <h3 className="summary-card-title">
                🎯 Campaign Performance Report
              </h3>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: '16px' }}>
                Detailed analysis of individual campaign performance with metrics and recommendations.
              </p>
              <Link 
                to="/campaign-report" 
                className="btn btn-primary"
                style={{ width: '100%', textDecoration: 'none', display: 'block', textAlign: 'center' }}
              >
                View Campaign Report
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
