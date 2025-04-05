import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.staticmb.com/mbcontent/images/crop/uploads/2023/10/Bring-in-the-Warm-Whites_0_1200.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Elevate Your Living Space</h1>
          <p className="text-lg mb-6">
            Discover premium furniture with unbeatable prices.
          </p>
          <Link
            to="/shop"
            className="bg-yellow-500 px-6 py-3 text-lg font-medium rounded-lg hover:bg-yellow-600 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            name: "Sofas",
            img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ-dt5-3hyF5jMdpwGuTElQNZ8S5QxfeszNSdwYdnCNpjmDxhORegXETTYqMLA4K7BANdwlvahkHK3vtUMo_b46yFThEkylUd0Y0Rc70oJs",
          },
          {
            name: "Mattresses",
            img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR9Hjd-2H9qyN0Z-AVb1W7AkID1rngB8qa-lNZJB1A_fOUBqeiWsLPXWmLdyc5FjIZauS3TqEOwqkG6_7GML1HXluqT4_7cXmnisWz9BkHA",
          },
          {
            name: "Dining",
            img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR2Rpem2rj_xUGzF9wsEHZUHjT4hd9z_NHOSrPP5b_Mjs4se-HZYzVoBYaK_YiZB_ZgOA0F5bqtAvb6KA8Jj12yibjeol-Z",
          },
          {
            name: "Lamps",
            img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRzu6rXfqO0NrOHrxeYdHpRxhUx9IFPonGyyRK3MsFbvy9KuHHmtvcsi-vZs5P8aN0j9OmhK8NMIF-DM32uHps5D12b5PpB-QOf3KGVSjQ",
          },
        ].map((category, index) => (
          <Link
            key={index}
            to={`/shop`}
            className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            <img
              src={category.img}
              alt={category.name}
              className="w-full h-60 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition">
              {category.name}
            </div>
          </Link>
        ))}
      </div>

      {/* Store Section */}
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Visit Your Nearest Store</h2>
        <Link to="/shop">
          <img
            src="https://ii1.pepperfry.com/assets/40dd8d8b-a972-41e8-b3b1-12d785a54a3e.jpg"
            alt="Store"
            className="mx-auto rounded-lg shadow-lg w-full max-w-3xl"
          />
        </Link>
        <div className="mt-6">
          <Link to="/shop">
            <img
              src="https://ii1.pepperfry.com/assets/5dac6346-1b36-490d-97d1-7c9b6b183917.jpg"
              alt="Additional Store Image"
              className="mx-auto rounded-lg shadow-lg w-full max-w-3xl"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
