import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { ArrowRight } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => (
  <Link href={`/product/${product.slug}`} className="group block">
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="glass-card overflow-hidden"
    >
      <div className="aspect-[4/3] bg-secondary overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
      </div>
      <div className="p-4">
        <p className="text-[8px] uppercase tracking-[0.25em] text-primary mb-1">
          {product.category}
        </p>
        <h3 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors mb-1">
          {product.name}
        </h3>
        <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground/60">
            {product.material}
          </span>
          <span className="text-primary text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            Details <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  </Link>
);

export default ProductCard;
