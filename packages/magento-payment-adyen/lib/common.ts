export function refresh() {
  if (typeof window !== undefined) {
    window.location.reload();
  }
}