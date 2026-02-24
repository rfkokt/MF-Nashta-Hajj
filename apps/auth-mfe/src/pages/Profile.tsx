import { type FormEvent, type ChangeEvent, useState, useEffect } from 'react';
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@nashta/ui-kit';
import { useAuthStore, MFE_EVENTS, dispatchMfeEvent } from '@nashta/shared-types';
import type { AuthEventPayload } from '@nashta/shared-types';
import { User as UserIcon, Save, Camera, Shield, Mail, BadgeCheck } from 'lucide-react';

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Sync form when user data changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      // Simulate API call (replace with actual apiClient.put when backend is ready)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (name && email) {
        // Update the store with new data
        const updatedUser = { ...user!, name, email };
        useAuthStore.getState().setAuth(accessToken!, updatedUser);

        // Dispatch token refreshed event so Shell/other MFEs pick up the change
        const payload: AuthEventPayload = {
          userId: updatedUser.id,
          accessToken: accessToken!,
          expiresAt: Date.now() + 15 * 60 * 1000,
        };
        dispatchMfeEvent(MFE_EVENTS.AUTH.TOKEN_REFRESHED, payload);

        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError('Nama dan email harus diisi.');
      }
    } catch {
      setError('Gagal memperbarui profil. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 px-4">
        <Card variant="elevated" className="max-w-md w-full text-center shadow-xl">
          <CardContent className="py-8">
            <p className="text-neutral-500">Silakan login terlebih dahulu.</p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => (window.location.href = '/auth/login')}
            >
              Ke Halaman Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Profil Saya
          </h1>
          <p className="text-neutral-500 mt-2">Kelola informasi akun Anda</p>
        </div>

        {/* Avatar Card */}
        <Card variant="elevated" className="shadow-xl">
          <CardContent className="py-8">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <img
                  src={
                    user.avatar || `https://api.dicebear.com/7.x/open-peeps/svg?seed=${user.name}`
                  }
                  alt={`Avatar ${user.name}`}
                  className="h-24 w-24 rounded-full bg-neutral-200 border-4 border-white shadow-lg"
                />
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md opacity-0 group-hover:opacity-100"
                  aria-label="Change avatar"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-xl font-bold text-neutral-900 mt-4">{user.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <BadgeCheck className="h-4 w-4 text-primary-600" />
                <span className="text-sm text-neutral-500 capitalize">{user.role}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Info Card */}
        <Card variant="elevated" className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-primary-600" />
              Informasi Akun
            </CardTitle>
            <CardDescription>Perbarui nama dan email Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div
                  className="p-3 rounded-lg bg-error/10 text-error text-sm border border-error/20"
                  role="alert"
                >
                  {error}
                </div>
              )}
              {success && (
                <div
                  className="p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm border border-emerald-200"
                  role="status"
                >
                  ✅ Profil berhasil diperbarui!
                </div>
              )}

              <Input
                label="Nama Lengkap"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                required
                autoComplete="name"
              />

              <Input
                label="Email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />

              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                <Save className="h-4 w-4" />
                Simpan Perubahan
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Info Card (read-only) */}
        <Card variant="elevated" className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary-600" />
              Keamanan
            </CardTitle>
            <CardDescription>Informasi keamanan akun Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-neutral-500" />
                  <div>
                    <p className="text-sm font-medium text-neutral-700">Email</p>
                    <p className="text-sm text-neutral-500">{user.email}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  Terverifikasi
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50">
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-neutral-500" />
                  <div>
                    <p className="text-sm font-medium text-neutral-700">Password</p>
                    <p className="text-sm text-neutral-500">••••••••</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Ubah
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
