import LoginForm from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-navy-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Masuk untuk mengelola website donasi
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
