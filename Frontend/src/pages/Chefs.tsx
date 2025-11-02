import { Award } from 'lucide-react';

const Chefs = () => {
  const chefs = [
    {
      name: 'Chef Marco Rossi',
      image: 'https://images.pexels.com/photos/5779092/pexels-photo-5779092.jpeg?auto=compress&cs=tinysrgb&w=400',
      experience: '20 Years',
      specialty: 'Italian Cuisine',
      bio: 'Trained in Rome, Marco brings authentic Italian flavors to every dish.',
    },
    {
      name: 'Chef Yuki Tanaka',
      image: 'https://images.pexels.com/photos/6539869/pexels-photo-6539869.jpeg?auto=compress&cs=tinysrgb&w=400',
      experience: '15 Years',
      specialty: 'Japanese Cuisine',
      bio: 'Master of sushi and traditional Japanese cooking techniques.',
    },
    {
      name: 'Chef Marie Dubois',
      image: 'https://images.pexels.com/photos/4253320/pexels-photo-4253320.jpeg?auto=compress&cs=tinysrgb&w=400',
      experience: '18 Years',
      specialty: 'French Cuisine',
      bio: 'Paris-trained chef specializing in classic French gastronomy.',
    },
    {
      name: 'Chef Carlos Martinez',
      image: 'https://images.pexels.com/photos/8629131/pexels-photo-8629131.jpeg?auto=compress&cs=tinysrgb&w=400',
      experience: '12 Years',
      specialty: 'Spanish Cuisine',
      bio: 'Expert in tapas and traditional Spanish cooking methods.',
    },
    {
      name: 'Chef Priya Sharma',
      image: 'https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=400',
      experience: '16 Years',
      specialty: 'Indian Cuisine',
      bio: 'Brings the authentic flavors and spices of India to our menu.',
    },
    {
      name: 'Chef David Chen',
      image: 'https://images.pexels.com/photos/8629140/pexels-photo-8629140.jpeg?auto=compress&cs=tinysrgb&w=400',
      experience: '14 Years',
      specialty: 'Chinese Cuisine',
      bio: 'Specializes in Cantonese and Szechuan culinary traditions.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Chefs</h1>
            <p className="text-xl md:text-2xl">Meet the culinary experts behind our success</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Master Chefs</h2>
            <p className="text-xl text-gray-600">
              Our talented team brings decades of culinary expertise from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chefs.map((chef, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-80 overflow-hidden">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{chef.name}</h3>
                  <div className="flex items-center space-x-2 text-orange-600 mb-3">
                    <Award className="h-5 w-5" />
                    <span className="font-semibold">{chef.experience} Experience</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    Specialty: {chef.specialty}
                  </p>
                  <p className="text-gray-600">{chef.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Experience World-Class Cuisine
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let our expert chefs create an unforgettable dining experience for you
          </p>
        </div>
      </section>
    </div>
  );
};

export default Chefs;
