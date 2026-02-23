/**
 * Mock menu data for development.
 *
 * In production, this data comes from GET /api/v1/menus.
 * This file is used as a fallback during development when the API is not available.
 *
 * Import this in Shell's main.tsx to seed the menuStore before the app renders.
 */
import type { MenuGroup } from '@nashta/shared-types';

export const MOCK_MENUS: MenuGroup[] = [
  {
    title: 'Menu',
    items: [
      {
        id: 'beranda',
        label: 'Beranda',
        icon: 'LayoutDashboard',
        path: '/',
      },
      {
        id: 'cs',
        label: 'Customer Service',
        icon: 'Users',
        path: '/cs',
        defaultOpen: true,
        children: [
          { id: 'cs-pendaftaran', label: 'Pendaftaran Jamaah', icon: 'FileText', path: '/docs' },
        ],
      },
      {
        id: 'paket',
        label: 'Manajemen Paket',
        icon: 'Package',
        path: '/paket',
        children: [
          { id: 'paket-kelola', label: 'Kelola Paket', icon: 'Package', path: '/kelola-paket' },
          { id: 'paket-aktifasi', label: 'Aktifasi Paket', icon: 'Package', path: '/aktifasi-paket' },
        ],
      },
      {
        id: 'inventaris',
        label: 'Inventaris',
        icon: 'ClipboardList',
        path: '/inventaris',
        children: [
          { id: 'inv-pr', label: 'Purchase Request', icon: 'FileText', path: '/purchase-request' },
          { id: 'inv-po', label: 'Purchase Order', icon: 'ShoppingCart', path: '/purchase-order' },
          { id: 'inv-ro', label: 'Receipt Order', icon: 'Truck', path: '/receipt-order' },
        ],
      },
    ],
  },
  {
    title: 'Lainnya',
    items: [
      { id: 'pengaturan', label: 'Pengaturan', icon: 'Settings', path: '/pengaturan' },
      { id: 'bantuan', label: 'Bantuan', icon: 'HelpCircle', path: '/bantuan' },
    ],
  },
];
