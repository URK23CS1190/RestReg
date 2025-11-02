import { Award, Users, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
            <p className="text-xl md:text-2xl">Discover our story and passion for great food</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our History</h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2009, Savory Restaurant began with a simple mission: to bring people
                together through exceptional food and warm hospitality.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Over the past 15 years, we've grown from a single location to 8 thriving branches
                across the country, serving thousands of satisfied customers daily.
              </p>
              <p className="text-lg text-gray-600">
                Our commitment to quality ingredients, expert preparation, and outstanding service
                has earned us numerous awards and the loyalty of food lovers everywhere.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Restaurant"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">15 Years</h3>
              <p className="text-gray-600">Of Culinary Excellence</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">8 Branches</h3>
              <p className="text-gray-600">Across The Country</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">25 Chefs</h3>
              <p className="text-gray-600">Expert Culinary Team</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on the quality of our ingredients or preparation
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Service</h3>
              <p className="text-gray-600">
                Every guest receives warm, attentive, and professional service
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously evolve our menu with creative new dishes
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community</h3>
              <p className="text-gray-600">
                We're proud to be part of the communities we serve
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
