export function getUUID() {
  const buffer = new ArrayBuffer(24);
  const bigint64 = new BigUint64Array(buffer);

  const uuid = crypto.getRandomValues(bigint64);

  return uuid[0] + "-" + uuid[1] + "-" + uuid[2];
}
