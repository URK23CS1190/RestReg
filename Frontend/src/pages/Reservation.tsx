import { useState } from 'react';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Reservation = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    date: '',
    time: '',
    numPeople: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);

  const locations = [
    'Main Street - Downtown',
    'Park Avenue - Midtown',
    'Broadway - Theater District',
    'Riverside - Waterfront',
    'Madison Square - Shopping District',
    'Fifth Avenue - Luxury District',
    'Brooklyn Heights',
    'Queens Boulevard',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName || !formData.phone || !formData.date || !formData.time || !formData.numPeople || !formData.location) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const reservationData = {
        customer_name: formData.customerName,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        num_people: parseInt(formData.numPeople),
        location: formData.location,
        user_id: user?.id || null,
        status: 'pending',
      };

      const { error } = await supabase
        .from('reservations')
        .insert([reservationData]);

      if (error) {
        toast.error('Reservation failed. Please try again.');
        setLoading(false);
        return;
      }

      toast.success('Reservation Successful!');
      setLoading(false);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Make a Reservation</h1>
            <p className="text-xl md:text-2xl">Book your table and experience fine dining</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Reserve Your Table
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Date</span>
                    </div>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Time</span>
                    </div>
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="numPeople" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Number of People</span>
                  </div>
                </label>
                <input
                  type="number"
                  id="numPeople"
                  name="numPeople"
                  value={formData.numPeople}
                  onChange={handleChange}
                  min="1"
                  max="20"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter number of guests"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Location</span>
                  </div>
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select a location</option>
                  {locations.map((loc, index) => (
                    <option key={index} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Reserving...' : 'Reserve Table'}
              </button>
            </form>
          </div>

          <div className="mt-8 bg-orange-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Important Information</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Please arrive 10 minutes before your reservation time</li>
              <li>• Reservations are held for 15 minutes past the scheduled time</li>
              <li>• For parties larger than 8 people, please call us directly</li>
              <li>• Cancellations must be made at least 2 hours in advance</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservation;
