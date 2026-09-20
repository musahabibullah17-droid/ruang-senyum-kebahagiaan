import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-dashboard">
      <AdminHeader />
      <div className="page-layout">
        <AdminSidebar />
        <main className="main-content">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
