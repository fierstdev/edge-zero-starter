'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@payloadcms/ui';
import { isEditorOnly } from '../access/roles';

export const RoleStyles: React.FC = () => {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) return null;
  
  // Check if they are ONLY an editor, not an admin
  const isEditor = isEditorOnly(user);
  
  if (!isEditor) return null;

  return (
    <style dangerouslySetInnerHTML={{ __html: `
      /* Hide Payload 3.0 Add/Remove/Duplicate/Drag blocks controls */
      [class*="blocks-field__drawer-toggler"],
      [class*="blocks-field__add-block"],
      [class*="collapsible__drag"],
      [class*="array-actions__button"] {
        display: none !important;
      }
    ` }} />
  );
};
