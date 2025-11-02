import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, Users as UsersIcon, MapPin, User, Mail, Phone } from 'lucide-react';
import { toast } from 'react-toastify';

interface Reservation {
  id: string;
  customer_name: string;
  phone: string;
  date: string;
  time: string;
  num_people: number;
  location: string;
  status: string;
  created_at: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'reservations' | 'users' | 'chefs'>('reservations');

  useEffect(() => {
    if (!user || user.role !== 'Admin') {
      toast.error('Unauthorized access');
      navigate('/');
      return;
    }

    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    setLoading(true);

    const { data: reservationsData } = await supabase
      .from('reservations')
      .select('*')
      .order('date', { ascending: false });

    const { data: usersData } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (reservationsData) setReservations(reservationsData);
    if (usersData) setUsers(usersData);

    setLoading(false);
  };

  const customers = users.filter(u => u.role === 'Customer');
  const chefs = users.filter(u => u.role === 'Chef');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage reservations and users</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('reservations')}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === 'reservations'
                    ? 'border-b-2 border-orange-600 text-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Reservations ({reservations.length})
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-b-2 border-orange-600 text-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Customers ({customers.length})
              </button>
              <button
                onClick={() => setActiveTab('chefs')}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === 'chefs'
                    ? 'border-b-2 border-orange-600 text-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Chefs ({chefs.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading data...</p>
              </div>
            ) : (
              <>
                {activeTab === 'reservations' && (
                  <div className="overflow-x-auto">
                    {reservations.length === 0 ? (
                      <p className="text-center text-gray-600 py-8">No reservations found</p>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date & Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Guests
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {reservations.map((reservation) => (
                            <tr key={reservation.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <User className="h-5 w-5 text-gray-400 mr-2" />
                                  <span className="text-sm font-medium text-gray-900">
                                    {reservation.customer_name}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm text-gray-900">{reservation.phone}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                                    <span className="text-sm text-gray-900">{reservation.date}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                                    <span className="text-sm text-gray-900">{reservation.time}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <UsersIcon className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm text-gray-900">{reservation.num_people}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm text-gray-900">{reservation.location}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    reservation.status === 'confirmed'
                                      ? 'bg-green-100 text-green-800'
                                      : reservation.status === 'cancelled'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}
                                >
                                  {reservation.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {activeTab === 'users' && (
                  <div className="overflow-x-auto">
                    {customers.length === 0 ? (
                      <p className="text-center text-gray-600 py-8">No customers found</p>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Registered
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {customers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <User className="h-5 w-5 text-gray-400 mr-2" />
                                  <span className="text-sm font-medium text-gray-900">{customer.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm text-gray-900">{customer.email}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm text-gray-900">{customer.phone}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(customer.created_at).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {activeTab === 'chefs' && (
                  <div className="overflow-x-auto">
                    {chefs.length === 0 ? (
                      <p className="text-center text-gray-600 py-8">No chefs found</p>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Registered
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {chefs.map((chef) => (
                            <tr key={chef.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <User className="h-5 w-5 text-gray-400 mr-2" />
                                  <span className="text-sm font-medium text-gray-900">{chef.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm text-gray-900">{chef.email}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-sm text-gray-900">{chef.phone}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(chef.created_at).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
