import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-primary-500 to-secondary-300 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Mental Health Support?</h2>
          <p className="text-xl text-white opacity-90 max-w-3xl mx-auto mb-10">
            Join us in building a healthier, more innovative society through accessible mental health and personal growth solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              size="lg" 
              variant="secondary"
              className="px-8 py-6 rounded-full bg-white text-primary-600 font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Request Investment Information
            </Button>
            <Button
              size="lg"
              variant="outline" 
              className="px-8 py-6 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:bg-opacity-10 transition-all"
            >
              Schedule a Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
