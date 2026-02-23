import { useAuthStore } from '@nashta/shared-types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@nashta/ui-kit';
import { Activity, Users, ShoppingBag, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: 'Rp 45.2M', change: '+12.5%', icon: TrendingUp, color: 'text-success' },
  { label: 'Active Users', value: '2,847', change: '+5.2%', icon: Users, color: 'text-info' },
  { label: 'Orders', value: '1,234', change: '+8.1%', icon: ShoppingBag, color: 'text-primary-600' },
  { label: 'Conversion', value: '3.24%', change: '+0.5%', icon: Activity, color: 'text-warning' },
];

export function Dashboard() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900">
          Selamat Datang, {user?.name || 'User'} 👋
        </h2>
        <p className="text-neutral-500 mt-1">Berikut ringkasan aktivitas hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-500">{stat.label}</p>
                <p className="text-2xl font-bold text-neutral-900 mt-1">{stat.value}</p>
                <p className={`text-sm font-medium mt-1 ${stat.color}`}>{stat.change}</p>
              </div>
              <div className={`p-2 rounded-lg bg-neutral-100 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>5 transaksi terakhir hari ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <ShoppingBag className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Order #{1000 + i}</p>
                    <p className="text-xs text-neutral-500">2 menit lalu</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-neutral-900">
                  Rp {(Math.random() * 500 + 100).toFixed(0)}K
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
