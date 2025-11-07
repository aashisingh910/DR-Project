import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, BarChart3, TrendingUp, Globe2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroVideo from "@/assets/SSYouTube.online_Animation Diabetic Retinopathy_720p.mp4";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* === Background Video with Cinematic Fade + Zoom === */}
      <motion.video
        key="hero-video"
        autoPlay
        loop
        muted
        playsInline
        src={heroVideo}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      ></motion.video>


      {/* === Overlay Gradient === */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-primary/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* === Content Wrapper === */}
      <motion.div
        className="relative z-10 container mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* === Left Section (Text + Buttons) === */}
        <div className="max-w-2xl space-y-6">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
          >
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Driven Diabetic Retinopathy Detection
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white"
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1, duration: 1.8, ease: "easeOut" }}
          >
            Advanced AI {""}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Diabetic Retinopathy Detection
            </span>{" "}
            & Care
          </motion.h1>

          {/* Highlight Fact */}
          <motion.p
            className="text-lg text-blue-100 italic font-semibold leading-relaxed"
            animate={{
              scale: [1, 1.05, 1],
              textShadow: [
                "0px 0px 0px rgba(255,255,255,0)",
                "0px 0px 20px rgba(255,192,203,0.5)",
                "0px 0px 0px rgba(255,255,255,0)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            “1 in 3 people with diabetic patients are in the risk of vision loss.”
          </motion.p>

          <p className="text-gray-300 leading-relaxed max-w-xl">
            Our AI-assisted analysis empowers ophthalmologists with clinical-grade image diagnostics,
            ensuring early detection and preventive insights.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              variant="hero"
              size="xl"
              className="group"
              onClick={() => navigate("/classify")}
            >
              Start Analysis
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* === Right Section (Global Insights Graph / Stats) === */}
        <motion.div
          className="mt-12 lg:mt-0 lg:ml-16 space-y-6 text-white max-w-md"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.25, delayChildren: 1.5 },
            },
          }}
        >

          {/* Heading */} 
          <motion.h2
            className="text-3xl font-extrabold text-center text-cyan-300 mb-4"
            animate={{
              textShadow: [
                "0px 0px 10px rgba(0,255,255,0.5)",
                "0px 0px 20px rgba(0,255,255,0.8)",
                "0px 0px 10px rgba(0,255,255,0.5)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
             Global Insights on Diabetic Retinopathy
          </motion.h2>

          {/* Insight Cards */}
          {[
            {
              icon: <BarChart3 className="w-6 h-6 text-pink-400" />,
              title: "Market Size (2024)",
              value: "$6.04 Billion",
            },
            {
              icon: <TrendingUp className="w-6 h-6 text-green-400" />,
              title: "CAGR (2025–2035)",
              value: "16.76%",
            },
            {
              icon: <Sparkles className="w-6 h-6 text-yellow-300" />,
              title: "Forecast (2035)",
              value: "$28.44 Billion",
            },
            {
              icon: <Globe2 className="w-6 h-6 text-blue-400" />,
              title: "Asia-Pacific",
              value: "Fastest Growth Region",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 },
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(255,255,255,0.2)",
              }}
            >
              <div className="p-2 bg-white/10 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <p className="text-lg font-semibold text-cyan-200">
                  {item.title}
                </p>
                <p className="text-white/90 text-sm">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
