import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function ReviewsPage() {
  const reviews = [
    {
      name: "Ahmed Khan",
      image: "https://i.pravatar.cc/150?img=12",
      text: "Absolutely amazing experience! The instructors were professional and the dive was unforgettable.",
    },
    {
      name: "Sara Ali",
      image: "https://i.pravatar.cc/150?img=32",
      text: "Best diving center in UAE. Everything was smooth and very well organized.",
    },
    {
      name: "John Smith",
      image: "https://i.pravatar.cc/150?img=45",
      text: "Loved the underwater photography session. Highly recommended!",
    },
    {
      name: "Noor",
      image: "https://i.pravatar.cc/150?img=56",
      text: "Very safe and beginner friendly. I got certified easily!",
    },
    {
      name: "Ali Hassan",
      image: "https://i.pravatar.cc/150?img=22",
      text: "One of the best experiences of my life. Highly professional team.",
    },
    {
      name: "Emily Watson",
      image: "https://i.pravatar.cc/150?img=65",
      text: "Super fun and safe diving experience. Will definitely come again!",
    },
  ];

  return (
    <section className="relative min-h-screen py-24 px-6 font-habara overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b2c45] via-[#123a5a] to-[#18476D]" />

      {/* GLOW */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Customer <span className="text-cyan-300">Experiences</span>
          </h1>

          <p className="text-white/60 max-w-2xl mx-auto">
            Real feedback from divers who trusted us with their journey.
          </p>
        </div>

        {/* REVIEWS */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:border-cyan-300/50 transition-all duration-500"
            >

              {/* USER */}
              <div className="flex items-center gap-4 mb-4">

                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-300"
                />

                <div>
                  <h4 className="font-semibold text-white text-sm">
                    {review.name}
                  </h4>

                  {/* STARS */}
                  <div className="flex gap-1 text-cyan-300 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>

              </div>

              {/* TEXT */}
              <p className="text-white/70 text-sm leading-relaxed">
                "{review.text}"
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}