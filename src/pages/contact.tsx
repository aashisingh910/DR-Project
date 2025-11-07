import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Youtube,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import DRImage from "@/assets/hero-medical.jpg";

const ContactUs = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white py-20 px-6 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto"
      >
        {/* === Header === */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            We’d love to hear from you — reach out for support, partnerships, or collaboration.
          </p>
        </div>

        {/* === Contact Form + Image === */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          {/* === Contact Form === */}
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/10"
          >
            <h2 className="text-2xl font-semibold text-cyan-300 mb-6">
              Send Us a Message
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-cyan-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-3 px-6 rounded-full font-semibold hover:opacity-90 transition-all"
              >
                Send Message
              </button>
            </div>
          </motion.form>

          {/* === Retina Image (Right Side) === */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex justify-center"
          >
            <img
              src={DRImage}
              alt="Diabetic Retinopathy Comparison"
              className="rounded-2xl shadow-lg border border-white/10 w-full max-w-md object-cover"
            />
          </motion.div>
        </div>

        {/* === Our Offices === */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="grid lg:grid-cols-3 gap-12 mb-20"
        >
          {/* Office 1 */}
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-lg border border-white/10">
            <MapPin className="text-pink-400 mb-3" />
            <p className="font-semibold">Lodha Amara, Kolshet Road</p>
            <p className="text-gray-400 mb-3">Thane, Mumbai, Maharashtra</p>
            <iframe
              className="w-full h-40 rounded-xl border border-gray-700"
              src="https://www.google.com/maps?q=Lodha+Amara,+Kolshet+Road,+Thane,+Mumbai,+Maharashtra&output=embed"
            ></iframe>
          </div>

          {/* Office 2 */}
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-lg border border-white/10">
            <MapPin className="text-pink-400 mb-3" />
            <p className="font-semibold">Babina</p>
            <p className="text-gray-400 mb-3">Jhansi, Uttar Pradesh</p>
            <iframe
              className="w-full h-40 rounded-xl border border-gray-700"
              src="https://www.google.com/maps?q=Babina,+Jhansi,+Uttar+Pradesh&output=embed"
            ></iframe>
          </div>

          {/* Office 3 */}
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-lg border border-white/10">
            <MapPin className="text-pink-400 mb-3" />
            <p className="font-semibold">Darpan Colony, Thatipur</p>
            <p className="text-gray-400 mb-3">Gwalior, Madhya Pradesh</p>
            <iframe
              className="w-full h-40 rounded-xl border border-gray-700"
              src="https://www.google.com/maps?q=Darpan+Colony,+Thatipur,+Gwalior,+Madhya+Pradesh&output=embed"
            ></iframe>
          </div>
        </motion.div>

        {/* === Contact Info === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center mb-10"
        >
          <h3 className="text-xl font-semibold text-cyan-400">
            Contact Our Teams
          </h3>
          <p className="mt-3 text-gray-300">
            💬 Customer Support:{" "}
            <a
              href="mailto:contact@diabetic-retinopathy-AI.com"
              className="text-pink-400 hover:underline"
            >
              contact@diabetic-retinopathy-AI.com
            </a>
          </p>
          <p className="text-gray-300">
            💼 Sales Team:{" "}
            <a
              href="mailto:sales@diabetic-retinopathy-AI.com"
              className="text-pink-400 hover:underline"
            >
              sales@diabetic-retinopathy-AI.com
            </a>
          </p>
        </motion.div>

        {/* === Social Media Links === */}
        <motion.div
          className="flex justify-center gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition"
          >
            <Youtube size={28} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <Twitter size={28} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <Facebook size={28} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <Instagram size={28} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition"
          >
            <Linkedin size={28} />
          </a>
        </motion.div>

        {/* === Our Presence Section === */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">
            🌍 Our Global Presence
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            We are expanding across major healthcare and research hubs to improve
            diabetic eye care accessibility. Our presence spans India and global
            collaborations focusing on early diagnosis and AI-based retinal screening.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
