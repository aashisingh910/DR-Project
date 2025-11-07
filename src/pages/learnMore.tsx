import { motion } from "framer-motion";
import { Eye, Activity, HeartPulse, ShieldCheck, AlertTriangle, Brain } from "lucide-react";
import CountUp from "react-countup";

const DRLearnMorePage = () => {
  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-pink-50 text-gray-800 overflow-hidden">
      {/* HERO SECTION */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-4"
        >
          Diabetic Retinopathy Global Overview
        </motion.h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Understand the <span className="font-semibold text-blue-700">occurrence, risk factors,</span> and 
          <span className="font-semibold text-pink-600"> prevention</span> strategies for Diabetic Retinopathy (DR).
        </p>
      </section>

      {/* GLOBAL OCCURRENCE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-blue-800 mb-12"
          >
            Global Occurrence of Diabetic Retinopathy
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              { icon: Eye, value: 35, label: "of diabetics worldwide develop DR" },
              { icon: AlertTriangle, value: 12, label: "suffer vision-threatening DR" },
              { icon: HeartPulse, value: 463, label: "million adults have diabetes" },
              { icon: Activity, value: 2045, label: "expected rise by year (million)" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-gradient-to-br from-blue-100 to-pink-100 rounded-2xl shadow-lg border border-blue-200"
              >
                <item.icon className="w-12 h-12 mx-auto text-blue-800 mb-3" />
                <h3 className="text-4xl font-bold text-blue-900">
                  <CountUp end={item.value} duration={2.5} />{i < 2 ? "%" : ""}
                </h3>
                <p className="mt-2 text-gray-700">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.img
            src="src/assets/DR12.png"
            alt="Global Diabetes Map"
            className="mx-auto mt-16 rounded-2xl shadow-lg border border-blue-100 w-full max-w-3xl"
            whileHover={{ scale: 1.02 }}
          />
        </div>
      </section>

      {/* RISK FACTORS SECTION */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-10">Major Risk Factors</h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-12 text-lg">
            Diabetic Retinopathy develops over time due to prolonged exposure of the retina to 
            high blood sugar levels. The following factors increase the likelihood of DR:
          </p>

          <div className="grid md:grid-cols-3 gap-10 text-left">
            {[
              {
                title: "🔹 Poor Blood Sugar Control",
                desc: "High glucose levels damage retinal blood vessels, causing leakage or blockage.",
              },
              {
                title: "🔹 High Blood Pressure & Cholesterol",
                desc: "These worsen vascular damage and accelerate disease progression.",
              },
              {
                title: "🔹 Duration of Diabetes",
                desc: "Risk increases sharply after 10+ years of diabetes.",
              },
              {
                title: "🔹 Smoking & Lifestyle",
                desc: "Smoking and sedentary habits reduce oxygen supply to the retina.",
              },
              {
                title: "🔹 Pregnancy",
                desc: "Hormonal changes can temporarily worsen DR risk.",
              },
              {
                title: "🔹 Genetic Predisposition",
                desc: "Family history of DR increases susceptibility.",
              },
            ].map((factor, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{factor.title}</h3>
                <p className="text-gray-700">{factor.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVENTION STRATEGIES */}
      <section className="py-24 bg-gradient-to-br from-blue-100 to-pink-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-8">
            Prevention and Management
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-14 text-lg">
            While DR cannot always be avoided, it can be delayed or managed effectively with
            consistent care and lifestyle changes.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
            {[
              {
                icon: ShieldCheck,
                title: "Regular Eye Screenings",
                desc: "Get an annual retinal examination even without visible symptoms.",
              },
              {
                icon: HeartPulse,
                title: "Maintain Blood Sugar Levels",
                desc: "Keep HbA1c levels below 7% with diet, exercise, and medication.",
              },
              {
                icon: Activity,
                title: "Exercise & Diet",
                desc: "Adopt a healthy diet, stay active, and avoid smoking/alcohol.",
              },
              {
                icon: Eye,
                title: "Monitor Vision Changes",
                desc: "Report any blurriness or vision loss immediately to your ophthalmologist.",
              },
              {
                icon: AlertTriangle,
                title: "Timely Medical Intervention",
                desc: "Laser photocoagulation or anti-VEGF therapy can prevent blindness in advanced cases.",
              },
              {
                icon: Brain,
                title: "AI-based Screening",
                desc: "Use AI tools for early detection and automated analysis of fundus images.",
              },
            ].map((tip, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-white/80 p-8 rounded-2xl shadow-md border border-blue-200"
              >
                <tip.icon className="w-10 h-10 text-blue-700 mb-4" />
                <h3 className="text-xl font-semibold text-blue-900 mb-2">{tip.title}</h3>
                <p className="text-gray-700">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-pink-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Vision Saved is Life Enhanced</h2>
        <p className="max-w-2xl mx-auto text-white/90 text-lg mb-10">
          Join the mission to prevent blindness from Diabetic Retinopathy.
          Awareness, regular screening, and timely treatment can make all the difference.
        </p>
        <motion.a
          href="/analysis"
          whileHover={{ scale: 1.1 }}
          className="bg-white text-blue-700 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-pink-100 transition-all"
        >
          Explore AI Detection
        </motion.a>
      </section>
    </main>
  );
};

export default DRLearnMorePage;
