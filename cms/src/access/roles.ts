// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
export function hasAdminLevelAccess(user: any): boolean {
  return Boolean(user?.roles?.includes('owner') || user?.roles?.includes('admin'));
}

export function isEditorOnly(user: any): boolean {
  return Boolean(user?.roles?.includes('editor') && !hasAdminLevelAccess(user));
}
