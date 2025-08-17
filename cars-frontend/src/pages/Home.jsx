import React , {useState, useEffect} from 'react'
import BottomNav from '../components/shared/BottomNav';
import Greetings from '../components/home/Greetings';
import MiniCart from '../components/home/MiniCard';
import { BsCashStack } from "react-icons/bs";
import { RiProgress2Line } from "react-icons/ri";
import RecentOrders from '../components/home/RecentOrders';
import PopularCars from '../components/home/PopularCars';
import { api } from '../https';

const Home = () => {
  // fetch Orders 
  const [allInvoices, setAllInvoices] = useState([]);
  const [inProgressInvoices, setInProgressInvoices] = useState([]);

  // filters
  const [frequency, setFrequency] = useState('1');
  const [orderStatus, setOrderStatus] = useState('Completed');
  const [shift, setShift] = useState('all');

  const [inProgressStatus, setInProgressStatus] = useState('In Progress');


  useEffect(() => {

    const getInvoices = async () => {

      try {

        const res = await api.post('/api/order/fetch',
          {
            frequency,
            orderStatus,
            shift
          });

        setAllInvoices(res.data)
        console.log(res.data)

      } catch (error) {
        console.log(error)
      }
    };

    getInvoices();
  }, [frequency, orderStatus, shift]);



  useEffect(() => {
    const getInProgress = async () => {

      try {

        const res = await api.post('/api/order/fetch',
          {
            frequency,
            orderStatus: inProgressStatus,
            shift,

            sort: '-createdAt'
          });

        setInProgressInvoices(res.data)
        console.log(res.data)

      } catch (error) {
        console.log(error)
      }
    };

    getInProgress();
  }, [frequency, orderStatus, shift]
  );

    return (
      <section className ='bg-[#f5f5f5] h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden flex gap-3'>
        
        {/**left side */}
        <div className ='flex-[3] bg-white shadow-xl h-[calc(100vh-5rem)]'>
            <Greetings />

            <div className ='flex items-center w-full gap-3 px-8 mt-2'>
              <MiniCart title='Total Earning' icon={<BsCashStack />} 
                  number={inProgressInvoices.reduce((acc, invoice) => acc + invoice.bills.totalWithTax, 0).toFixed(2)} />
              <MiniCart title='Total Payed' icon={<RiProgress2Line />} 
                  number={inProgressInvoices.reduce((acc, invo) => acc + invo.bills.payed, 0).toFixed(2)} />
            </div>

            <RecentOrders />
        </div>


        {/* right side*/}
        <div className ='flex-[1] bg-white'>
            <PopularCars />
        </div>

        <BottomNav />
      </section>
    );
};


export default Home ;