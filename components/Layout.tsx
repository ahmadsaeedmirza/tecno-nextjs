import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;
