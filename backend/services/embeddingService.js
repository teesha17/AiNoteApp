import { pipeline } from "@xenova/transformers";

let model;

async function loadModel() {
  if (!model) {
    model = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
}

export async function getEmbedding(text) {
  await loadModel();
  const output = await model(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}
