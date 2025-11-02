import { Link } from 'react-router-dom';
import { Clock, MapPin, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to Savory
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Experience the finest culinary delights in an elegant atmosphere
            </p>
            <Link
              to="/reservation"
              className="inline-block px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors text-lg"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">
              We provide exceptional service and unforgettable dining experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Quality Food</h3>
              <p className="text-gray-600">
                Fresh ingredients and expert preparation in every dish
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Fast Service</h3>
              <p className="text-gray-600">
                Prompt and professional service without compromising quality
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Multiple Locations</h3>
              <p className="text-gray-600">
                Convenient locations across the city for your dining pleasure
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                For over 15 years, Savory has been serving the finest cuisine to our valued customers.
                Our passion for food and dedication to excellence has made us a favorite dining destination.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With 8 locations across the country, we continue to bring authentic flavors and
                memorable experiences to food lovers everywhere.
              </p>
              <Link
                to="/about"
                className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Restaurant interior"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Dine With Us?</h2>
          <p className="text-xl mb-8">
            Reserve your table now and enjoy an unforgettable culinary experience
          </p>
          <Link
            to="/reservation"
            className="inline-block px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Make a Reservation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
