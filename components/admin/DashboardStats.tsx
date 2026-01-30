'use client';

import { Users, FileText, Eye, TrendingUp } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';

const stats = [
    {
        label: 'Total Users',
        value: '12,345',
        icon: Users,
        trend: '+12%',
        trendUp: true,
        color: 'bg-blue-600'
    },
    {
        label: 'Total Posts',
        value: '432',
        icon: FileText,
        trend: '+5%',
        trendUp: true,
        color: 'bg-indigo-600'
    },
    {
        label: 'Total Views',
        value: '89.2K',
        icon: Eye,
        trend: '+24%',
        trendUp: true,
        color: 'bg-emerald-600'
    },
    {
        label: 'Engagement Rate',
        value: '6.4%',
        icon: TrendingUp,
        trend: '-2%',
        trendUp: false,
        color: 'bg-amber-600'
    },
];

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
}
