import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import StockWidget from "@/components/widgets/StockWidget";
import StockChartWidget from "@/components/widgets/StockChartWidget";
import { SearchCombobox } from "@/components/ui/search-combobox";
import { useStockSearch } from "@/hooks/use-stock-search";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ALPHA_VANTAGE_API_KEY, API_ENDPOINTS } from "@/utils/apiConfig";
import { ArrowDownRight, ArrowUpRight, AlertCircle, TrendingUp } from "lucide-react";
import { POPULAR_STOCKS, generateMockQuote } from "@/utils/stockData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
}

const Stocks = () => {
  const [selectedStock, setSelectedStock] = useLocalStorage<string>("selectedStock", POPULAR_STOCKS[0].value);
  const [searchQuery, setSearchQuery] = useState("");
  const { options, loading, handleSubmit } = useStockSearch(searchQuery);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  const { data: quoteData, isLoading: quoteLoading } = useQuery<StockQuote>({
    queryKey: ['stockQuote', selectedStock],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.stocks}?function=GLOBAL_QUOTE&symbol=${selectedStock}&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        if (!response.ok) throw new Error('Failed to fetch quote');
        const data = await response.json();

        // Check for API limit error
        if (data.Note || data['Error Message']) {
          throw new Error(data.Note || data['Error Message']);
        }

        const quote = data['Global Quote'];
        setIsUsingMockData(false);
        
        return {
          symbol: quote['01. symbol'],
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['09. change']),
          changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
          volume: parseInt(quote['06. volume']),
          high: parseFloat(quote['03. high']),
          low: parseFloat(quote['04. low']),
          open: parseFloat(quote['02. open']),
          prevClose: parseFloat(quote['08. previous close'])
        };
      } catch (error) {
        setIsUsingMockData(true);
        // Return mock data as fallback
        return generateMockQuote(selectedStock);
      }
    },
    refetchInterval: 60000 // Refresh every minute
  });

  const isPositive = quoteData && quoteData.change >= 0;

  return (
    <MainLayout>
      <div className="space-y-8 p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Stock Market Dashboard</h1>
            <p className="text-muted-foreground">Track and analyze your favorite stocks in real-time</p>
          </div>
          <TrendingUp className="h-8 w-8 text-primary" />
        </div>

        <div className="max-w-md">
          <SearchCombobox
            options={options}
            value={selectedStock}
            onValueChange={setSelectedStock}
            onInputChange={setSearchQuery}
            onSubmit={handleSubmit}
            placeholder="Enter stock symbol or company name"
            emptyMessage="No stocks found"
            loading={loading}
          />
        </div>

        {isUsingMockData && (
          <Alert className="mb-6 border-yellow-500/50 bg-yellow-500/10">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-500">
              Using demo data. Real-time stock data is currently unavailable.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Key Metrics */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              {quoteLoading ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-8 bg-muted rounded" />
                  <div className="h-6 w-3/4 bg-muted rounded" />
                </div>
              ) : quoteData ? (
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold tracking-tight">
                      ${quoteData.price.toFixed(2)}
                    </div>
                    <div className={`flex items-center gap-1 text-lg font-medium ${
                      isPositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {isPositive ? (
                        <ArrowUpRight className="h-5 w-5" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5" />
                      )}
                      <span>{Math.abs(quoteData.changePercent).toFixed(2)}%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="space-y-1">
                      <div className="text-muted-foreground font-medium">Open</div>
                      <div className="font-semibold">${quoteData.open.toFixed(2)}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-muted-foreground font-medium">Previous Close</div>
                      <div className="font-semibold">${quoteData.prevClose.toFixed(2)}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-muted-foreground font-medium">High</div>
                      <div className="font-semibold">${quoteData.high.toFixed(2)}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-muted-foreground font-medium">Low</div>
                      <div className="font-semibold">${quoteData.low.toFixed(2)}</div>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <div className="text-muted-foreground font-medium">Volume</div>
                      <div className="font-semibold">
                        {quoteData.volume.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Chart */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6">
                <StockChartWidget symbol={selectedStock} />
              </CardContent>
            </Card>
          </div>

          {/* Watchlist */}
          <div className="lg:col-span-4">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-xl">Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <StockWidget 
                  className="bg-transparent shadow-none border-0"
                  selectedStock={selectedStock}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Stocks;
