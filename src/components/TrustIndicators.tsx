import { motion } from "framer-motion";
import { Shield, Users, Car, Award } from "lucide-react";

const stats = [
  {
    icon: Car,
    value: "50,000+",
    label: "Cars Available",
    description: "Verified vehicles across India"
  },
  {
    icon: Users,
    value: "2,00,000+",
    label: "Happy Customers",
    description: "Trust us for their car needs"
  },
  {
    icon: Shield,
    value: "1,000+",
    label: "Verified Dealers",
    description: "Trusted partners nationwide"
  },
  {
    icon: Award,
    value: "4.8/5",
    label: "Customer Rating",
    description: "Based on 25,000+ reviews"
  }
];

export const TrustIndicators = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Trusted by Millions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join India's largest community of car buyers and sellers. 
            Experience the trust that comes with verified dealers and quality assurance.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                
                {/* Animated circle */}
                <motion.div
                  className="absolute inset-0 w-16 h-16 mx-auto border-2 border-primary/20 rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              <motion.h3
                className="text-3xl font-bold text-primary mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.h3>
              
              <h4 className="font-semibold text-lg mb-2">{stat.label}</h4>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center gap-8 mt-12 pt-8 border-t"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-5 h-5 text-success" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="w-5 h-5 text-success" />
            <span>ISO Certified</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-5 h-5 text-success" />
            <span>24/7 Support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};