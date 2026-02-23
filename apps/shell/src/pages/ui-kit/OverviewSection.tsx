import React from 'react';
import { Card, CardContent, Badge } from '@nashta/ui-kit';
import { discoveredComponents } from '../../utils/component-discovery';
import { SectionHeader } from './shared';

export function OverviewSection({ sectionMap }: { sectionMap: Record<string, React.FC> }) {
  return (
    <>
      <SectionHeader title="🎨 Shared UI Kit" description="Galeri komponen @nashta/ui-kit — pilih komponen dari sidebar untuk melihat preview." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {discoveredComponents.map((c) => {
          const hasDoc = c.slug in sectionMap;
          return (
            <Card key={c.name}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{c.name}</h3>
                  {hasDoc ? (
                    <Badge variant="success">✓ Documented</Badge>
                  ) : (
                    <Badge variant="warning">📝 Undocumented</Badge>
                  )}
                </div>
                <p className="text-xs text-neutral-500">
                  {hasDoc ? 'Klik dari sidebar untuk melihat docs' : 'Belum ada dokumentasi'}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
