export function cosineSimilarity(a, b) {
  return a.reduce((sum, val, i) => sum + val * b[i], 0) /
    (Math.sqrt(a.reduce((s, v) => s + v*v, 0)) *
     Math.sqrt(b.reduce((s, v) => s + v*v, 0)));
}
