import React from 'react';
import { useLocation } from 'react-router';
import { discoveredComponents } from '../utils/component-discovery';

// Section imports
import { ButtonSection } from './ui-kit/ButtonSection';
import { InputSection } from './ui-kit/InputSection';
import { CardSection } from './ui-kit/CardSection';
import { BadgeSection } from './ui-kit/BadgeSection';
import { SkeletonSection } from './ui-kit/SkeletonSection';
import { ModalSection } from './ui-kit/ModalSection';
import { ToastSection } from './ui-kit/ToastSection';
import { ErrorFallbackSection } from './ui-kit/ErrorFallbackSection';
import { TutorialSection } from './ui-kit/TutorialSection';
import { FormFieldSection } from './ui-kit/FormFieldSection';
import { OverviewSection } from './ui-kit/OverviewSection';
import { UndocumentedSection } from './ui-kit/UndocumentedSection';

/* ─── Section Map (documented components) ─── */
export const SECTION_MAP: Record<string, React.FC> = {
  button: ButtonSection,
  input: InputSection,
  card: CardSection,
  badge: BadgeSection,
  skeleton: SkeletonSection,
  modal: ModalSection,
  toast: ToastSection,
  errorfallback: ErrorFallbackSection,
  formfield: FormFieldSection,
  tutorial: TutorialSection,
};

/* ═══════════════════════════════════════════════
   Main Page — auto-discovers components from file system
   ═══════════════════════════════════════════════ */
export function UIKitPage() {
  const location = useLocation();
  // Extract component name from /ui-kit/button → "button"
  const segments = location.pathname.split('/');
  const componentName = segments[segments.indexOf('ui-kit') + 1] || '';

  // Check if documented → show docs, else show placeholder
  if (componentName && componentName in SECTION_MAP) {
    const Section = SECTION_MAP[componentName];
    return <div className="w-full"><Section /></div>;
  }

  if (componentName && componentName !== '') {
    // Component exists in sidebar (discovered) but no docs yet
    const displayName = discoveredComponents.find(c => c.slug === componentName)?.name || componentName;
    return <div className="w-full"><UndocumentedSection name={displayName} /></div>;
  }

  return (
    <div className="w-full">
      <OverviewSection sectionMap={SECTION_MAP} />
    </div>
  );
}

export default UIKitPage;
