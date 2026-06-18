'use client';

import StoryCard from "../ui/storyCard";

export default function CommunityPage() {

  const discussions = [
    {
      _id: "1",
      title: "Tips for Selling Handmade Jewelry",
      author: "Sarah Artisan",
      description:
        "Learn how to price handmade jewelry, attract customers, and grow your craft business.",
      image: "/images/jewelry.jpg",
      likes: 24,
    },
    {
      _id: "2",
      title: "How I Started My Pottery Business",
      author: "Michael Crafts",
      description:
        "My journey from creating pottery at home to building a handmade brand.",
      image: "/images/pottery.jpg",
      likes: 18,
    },
    {
      _id: "3",
      title: "Best Packaging Ideas for Handmade Products",
      author: "Grace Handmade",
      description:
        "Creative packaging ideas that make handmade products stand out.",
      image: "/images/package.jpg",
      likes: 30,
    },
  ];


  return (

    <main className="min-h-screen bg-[#FAF7F2]">


      {/* Hero */}
      <section className="bg-[#E8D8C4] py-20">

        <div className="max-w-7xl mx-auto px-6">

          <p className="text-[#7A8B5A] uppercase tracking-wider font-semibold">
            Handcrafted Community
          </p>


          <h1 className="text-5xl font-bold text-[#2A2A2A] mt-4 mb-6">
            Connect, Share & Grow Together
          </h1>


          <p className="max-w-2xl text-lg text-[#2A2A2A]">
            Join artisans and handmade enthusiasts from around the world.
            Share ideas, learn new skills, and celebrate creativity.
          </p>


          <button
            onClick={() =>
              document
                .getElementById("join-community")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="mt-8 bg-[#C96C4A] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Join the Community
          </button>


        </div>

      </section>




      {/* Community Highlights */}
      <section className="max-w-7xl mx-auto px-6 py-16">


        <h2 className="text-3xl font-bold text-[#2A2A2A] mb-8">
          Community Highlights
        </h2>


        <div className="grid md:grid-cols-3 gap-6">


          <div className="bg-white p-6 rounded-xl border border-[#E8D8C4]">

            <h3 className="text-xl font-semibold text-[#2A2A2A] mb-3">
              Discussions
            </h3>

            <p className="text-gray-600">
              Ask questions, share experiences, and learn from fellow artisans.
            </p>

          </div>



          <div className="bg-white p-6 rounded-xl border border-[#E8D8C4]">

            <h3 className="text-xl font-semibold text-[#2A2A2A] mb-3">
              Featured Artisans
            </h3>

            <p className="text-gray-600">
              Discover inspiring creators and their handmade journeys.
            </p>

          </div>




          <div className="bg-white p-6 rounded-xl border border-[#E8D8C4]">

            <h3 className="text-xl font-semibold text-[#2A2A2A] mb-3">
              Events & Workshops
            </h3>

            <p className="text-gray-600">
              Participate in online workshops and creative community events.
            </p>

          </div>


        </div>


      </section>





      {/* Recent Discussions */}
      <section className="max-w-7xl mx-auto px-6 pb-16">


        <h2 className="text-3xl font-bold text-[#2A2A2A] mb-8">
          Recent Discussions
        </h2>



        <div className="grid md:grid-cols-3 gap-6">


          {discussions.map((discussion) => (

            <StoryCard
              key={discussion._id}
              story={discussion}
            />

          ))}


        </div>


      </section>






      {/* Join Community Form */}
      <section
        id="join-community"
        className="max-w-3xl mx-auto px-6 pb-20"
      >


        <div className="bg-white p-8 rounded-xl border border-[#E8D8C4]">


          <h2 className="text-3xl font-bold text-[#2A2A2A] mb-3">
            Join Our Community
          </h2>


          <p className="text-gray-600 mb-6">
            Connect with artisans, share your creativity and grow together.
          </p>



          <form className="space-y-5">


            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-[#E8D8C4] rounded-lg"
            />



            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-[#E8D8C4] rounded-lg"
            />



            <select className="w-full p-3 border border-[#E8D8C4] rounded-lg">

              <option>
                Select Craft
              </option>

              <option>
                Jewelry
              </option>

              <option>
                Pottery
              </option>

              <option>
                Fashion
              </option>

              <option>
                Art & Design
              </option>

            </select>




            <textarea
              rows={4}
              placeholder="Tell us about yourself..."
              className="w-full p-3 border border-[#E8D8C4] rounded-lg"
            />




            <button
              type="submit"
              className="bg-[#C96C4A] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Join Now
            </button>



          </form>



        </div>


      </section>



    </main>

  );

}