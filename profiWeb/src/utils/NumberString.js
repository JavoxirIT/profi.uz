export function NumberStr(num) {
  if (!num) {
    return null;
  }
  return num.replace(/[\s+.,%()]/g, "");
}
