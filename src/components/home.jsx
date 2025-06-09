import Carousel from './carousel';
import home1 from '../assets/images/home1.webp'
import Footer from './Footer'
import Navbar from './Navbar';
import axios from 'axios';
import { useEffect , useState} from 'react';
import Sidebar from './side';


const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user profile on mount if token exists
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('https://hope00.pythonanywhere.com/api/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching profile:', error);
          localStorage.removeItem('token'); // Clear invalid token
        }
      }
    };
    fetchProfile();
  }, []);

   const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <br />
      <Navbar user={user} setUser={setUser} />
      <br />
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} user={user} />
      <Carousel/>
      
      <h2>These are some of the products that we offer </h2>
      <img src={home1} alt="" className=''/>
     
      <Footer/>

     
     
    </div>
  )
}

export default Home