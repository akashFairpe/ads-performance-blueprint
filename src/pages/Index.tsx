import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Google Ads Reports Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Performance Report</CardTitle>
              <CardDescription>
                Comprehensive overview of your Google Ads account performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/account-report">
                <Button className="w-full">View Account Report</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Report</CardTitle>
              <CardDescription>
                Detailed analysis of individual campaign performance and optimization recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/campaign-report">
                <Button className="w-full">View Campaign Report</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
