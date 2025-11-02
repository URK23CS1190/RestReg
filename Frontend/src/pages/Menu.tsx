const Menu = () => {
  const menuItems = [
    {
      category: 'Italian',
      dishes: [
        {
          name: 'Margherita Pizza',
          description: 'Fresh mozzarella, tomatoes, and basil',
          price: '$18',
          image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Carbonara Pasta',
          description: 'Creamy pasta with bacon and parmesan',
          price: '$22',
          image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Risotto al Funghi',
          description: 'Creamy mushroom risotto',
          price: '$24',
          image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
      ],
    },
    {
      category: 'Japanese',
      dishes: [
        {
          name: 'Sushi Platter',
          description: 'Assorted fresh sushi and sashimi',
          price: '$35',
          image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Ramen Bowl',
          description: 'Traditional pork ramen with soft-boiled egg',
          price: '$19',
          image: 'https://images.pexels.com/photos/1907228/pexels-photo-1907228.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Tempura Set',
          description: 'Crispy vegetable and shrimp tempura',
          price: '$26',
          image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
      ],
    },
    {
      category: 'French',
      dishes: [
        {
          name: 'Coq au Vin',
          description: 'Chicken braised in red wine with mushrooms',
          price: '$32',
          image: 'https://images.pexels.com/photos/262973/pexels-photo-262973.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Beef Bourguignon',
          description: 'Slow-cooked beef in burgundy wine sauce',
          price: '$38',
          image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Crème Brûlée',
          description: 'Classic vanilla custard with caramelized sugar',
          price: '$12',
          image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
      ],
    },
    {
      category: 'Indian',
      dishes: [
        {
          name: 'Butter Chicken',
          description: 'Tender chicken in creamy tomato sauce',
          price: '$21',
          image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Biryani',
          description: 'Fragrant basmati rice with spiced lamb',
          price: '$25',
          image: 'https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          name: 'Palak Paneer',
          description: 'Cottage cheese in creamy spinach curry',
          price: '$19',
          image: 'https://images.pexels.com/photos/6210876/pexels-photo-6210876.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Menu</h1>
            <p className="text-xl md:text-2xl">Explore cuisines from around the world</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {menuItems.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                {category.category} Cuisine
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.dishes.map((dish, dishIndex) => (
                  <div
                    key={dishIndex}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="h-56 overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{dish.name}</h3>
                        <span className="text-xl font-bold text-orange-600">{dish.price}</span>
                      </div>
                      <p className="text-gray-600">{dish.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Menu;
