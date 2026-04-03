"use client";

import { useState } from "react";
import {
  DashboardHeader,
  TimeFilter,
} from "@/components/admin/DashboardHeader";
import { StatsCardsGrid } from "@/components/admin/StatsCards";
import { OrderStatusRow } from "@/components/admin/OrderStatusRow";
import { SalesChart } from "@/components/admin/SalesChart";
import { UserStatisticsChart } from "@/components/admin/UserStatisticsChart";
import { TopStoresGrid } from "@/components/admin/TopStoresGrid";
import { TopItemsList } from "@/components/admin/TopItemsList";
import { TopPeopleList } from "@/components/admin/TopPeopleList";
import {
  statsCards,
  orderStatusData,
  salesChartData,
  userStatsData,
  topSellingStores,
  mostPopularStores,
  topSellingItems,
  mostRatedItems,
  topDeliverymen,
  topCustomers,
} from "@/data/dashboardData";

const Index = () => {
  const [timeFilter, setTimeFilter] = useState("This Week");

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <DashboardHeader />
        <TimeFilter activeFilter={timeFilter} onFilterChange={setTimeFilter} />
      </div>

      {/* Stats Cards */}
      {/* <StatsCardsGrid stats={statsCards} /> */}

      {/* Order Status Row */}
      {/* <OrderStatusRow items={orderStatusData} /> */}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesChart data={salesChartData} totalSales={0} saleCount={2026} />
        <UserStatisticsChart data={userStatsData} />
      </div>

      {/* Top Sections Row 1 */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TopStoresGrid
          title="Top Selling Stores"
          stores={topSellingStores}
          type="grid"
        />
        <TopStoresGrid
          title="Most Popular Stores"
          stores={mostPopularStores}
          type="list"
        />
        <TopItemsList
          title="Top Selling Items"
          items={topSellingItems}
          valueType="sold"
        />
      </div> */}

      {/* Top Sections Row 2 */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TopItemsList
          title="Most Rated Items"
          items={mostRatedItems}
          valueType="rating"
        />
        <TopPeopleList
          title="Top Deliveryman"
          people={topDeliverymen}
          type="deliveryman"
        />
        <TopPeopleList
          title="Top Customers"
          people={topCustomers}
          type="customer"
        />
      </div> */}

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground py-4 border-t">
        © Nigar. 2021-2026 Nigar.
        <span className="ml-4">Business setup</span>
        <span className="ml-4">Profile</span>
        <span className="ml-4">Home</span>
        <span className="ml-4 text-primary">Software Version : 3.6</span>
      </footer>
    </div>
  );
};

export default Index;
