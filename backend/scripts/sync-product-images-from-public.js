/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "..", "config.env") });

const Product = require("../models/productModel");

function parseArgs(argv) {
  const args = {
    dryRun: false,
    slug: undefined,
  };

  for (const arg of argv.slice(2)) {
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg.startsWith("--slug=")) args.slug = arg.slice("--slug=".length);
  }

  return args;
}

function buildImageIndex(productsDir) {
  const allowedExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
  const files = fs.readdirSync(productsDir);

  /** @type {Map<string, string>} */
  const byStem = new Map();

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!allowedExt.has(ext)) continue;

    const stem = path.basename(file, ext).toLowerCase();
    // Prefer webp/png over jpeg if multiple exist.
    const current = byStem.get(stem);
    if (!current) {
      byStem.set(stem, file);
      continue;
    }

    const rank = (f) => {
      const e = path.extname(f).toLowerCase();
      if (e === ".webp") return 1;
      if (e === ".png") return 2;
      if (e === ".jpg" || e === ".jpeg") return 3;
      if (e === ".gif") return 4;
      return 99;
    };

    if (rank(file) < rank(current)) {
      byStem.set(stem, file);
    }
  }

  return byStem;
}

async function main() {
  const { dryRun, slug } = parseArgs(process.argv);

  const productsDir = path.join(__dirname, "..", "..", "public", "products");
  if (!fs.existsSync(productsDir)) {
    throw new Error(`Products directory not found: ${productsDir}`);
  }

  const db = process.env.DATABASE;
  if (!db) {
    throw new Error("Missing DATABASE in backend/config.env");
  }

  await mongoose.connect(db);

  const imageIndex = buildImageIndex(productsDir);

  const filter = slug ? { slug } : {};
  const products = await Product.find(filter).select("slug name imageCover");

  let matched = 0;
  let updated = 0;

  for (const product of products) {
    const key = String(product.slug || "").toLowerCase();
    const file = imageIndex.get(key);
    if (!file) continue;

    matched += 1;

    if (product.imageCover === file) continue;

    console.log(
      `[sync] ${product.slug}: ${product.imageCover || "(none)"} -> ${file}`,
    );

    if (!dryRun) {
      product.imageCover = file;
      await product.save({ validateBeforeSave: false });
      updated += 1;
    }
  }

  console.log(
    JSON.stringify(
      {
        scope: slug ? { slug } : "all",
        totalProducts: products.length,
        matched,
        updated: dryRun ? 0 : updated,
        dryRun,
      },
      null,
      2,
    ),
  );

  await mongoose.disconnect();
}

main().catch(async (e) => {
  console.error(e);
  try {
    await mongoose.disconnect();
  } catch {
    // ignore
  }
  process.exitCode = 1;
});
