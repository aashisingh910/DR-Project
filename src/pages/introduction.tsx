import { motion } from "framer-motion";
import { Eye, Activity, AlertTriangle, HeartPulse, Brain } from "lucide-react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
const DRIntroductionPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-rose-50 text-gray-800 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight"
        >
          Diabetic Retinopathy: A Silent Threat to Vision
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl text-lg md:text-xl mt-6 text-gray-600"
        >
          Affecting millions globally, Diabetic Retinopathy (DR) is one of the most
          dangerous complications of diabetes — silently damaging vision until it’s too late.
        </motion.p>

        <motion.div
          className="absolute inset-0 bg-gradient-radial from-blue-200/20 via-transparent to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </section>

      {/* FACTS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Eye, label: "Global Diabetes Patients with DR", value: 35 },
            { icon: AlertTriangle, label: "Vision-Threatening Cases", value: 12 },
            { icon: HeartPulse, label: "Preventable with Early Detection", value: 90 },
            { icon: Activity, label: "Working-Age Adults Affected", value: 75 },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-100 to-pink-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <stat.icon className="w-12 h-12 mx-auto text-blue-700 mb-4" />
              <h3 className="text-4xl font-bold text-blue-900">
                <CountUp end={stat.value} duration={3} />%
              </h3>
              <p className="mt-3 text-gray-700 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY EARLY DETECTION MATTERS */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-pink-50">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-blue-800"
          >
            Why Early Detection Matters
          </motion.h2>

          <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            In its early phases, DR can progress silently — often without noticeable symptoms —
            stealing sight before one even realizes it. But early identification can halt or delay
            its progression, saving both vision and quality of life.
          </p>

          <motion.div
            className="mt-16 grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {[
              {
                title: "Silent Progression",
                desc: "DR can begin without any warning signs — by the time symptoms appear, damage may already be severe.",
              },
              {
                title: "Vision Preservation",
                desc: "Early screening and laser or anti-VEGF treatments can prevent 90% of vision loss cases.",
              },
              {
                title: "Societal Impact",
                desc: "Loss of vision among working adults leads to reduced productivity and increased economic burden.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white/80 p-8 rounded-2xl shadow-md border border-blue-100"
              >
                <Brain className="w-10 h-10 text-pink-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-blue-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-base">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-pink-500 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-6"
        >
          Let’s Fight Diabetic Retinopathy Together
        </motion.h2>
        <p className="text-lg mb-10 max-w-2xl mx-auto text-white/90">
          Awareness, early detection, and timely treatment can preserve vision and change lives.
        </p>



<motion.div
  whileHover={{ scale: 1.1 }}
  transition={{ type: "spring", stiffness: 200 }}
>
  <Link
    to="/learnMore"
    className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-pink-100 hover:text-pink-700 transition-all text-lg inline-block"
  >
    Learn More About DR Prevention
  </Link>
</motion.div>

      </section>
    </div>
  );
};

export default DRIntroductionPage;
