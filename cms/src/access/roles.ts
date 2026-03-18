export function hasAdminLevelAccess(user: any): boolean {
  return Boolean(user?.roles?.includes('owner') || user?.roles?.includes('admin'));
}

export function isEditorOnly(user: any): boolean {
  return Boolean(user?.roles?.includes('editor') && !hasAdminLevelAccess(user));
}
