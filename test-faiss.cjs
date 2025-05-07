// Try to import faiss-node
const faiss = require('faiss-node');
console.log('FAISS exports:', Object.keys(faiss));

// Let's see what's available in the package
for (const key of Object.keys(faiss)) {
  console.log(`${key}:`, typeof faiss[key]);
}