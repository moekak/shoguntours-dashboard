import EcommerceMetrics from '../../components/ecommerce/EcommerceMetrics';
import MonthlySalesChart from '../../components/ecommerce/MonthlySalesChart';
import StatisticsChart from '../../components/ecommerce/StatisticsChart';
import MonthlyTarget from '../../components/ecommerce/MonthlyTarget';
import RecentOrders from '../../components/ecommerce/RecentOrders';
import DemographicCard from '../../components/ecommerce/DemographicCard';
import PageMeta from '../../components/common/PageMeta';
import { useDashboard } from '../../hooks/useDashboard';
import { useEffect } from 'react';

export default function Home() {
    const { data } = useDashboard();
    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <>
            <PageMeta
                title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
                description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-7">
                    <EcommerceMetrics data={data} />
                    <MonthlySalesChart data={data} />
                </div>

                <div className="col-span-5 xl:col-span-5">
                    <MonthlyTarget data={data} />
                </div>

                <div className="col-span-12">
                    <StatisticsChart data={data} />
                </div>

                <div className="col-span-12 xl:col-span-5">
                    <DemographicCard />
                </div>

                <div className="col-span-12 xl:col-span-7">
                    <RecentOrders />
                </div>
            </div>
        </>
    );
}
