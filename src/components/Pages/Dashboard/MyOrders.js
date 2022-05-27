import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../Firebase/Firebase.init';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch(`http://localhost:5000/purchase?customer=${user?.email}`, {
        method:'GET',
        headers:{
          'authorization' : `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then((res) => {
          if(res.status === 401 || res.status === 403){
            signOut(auth);
            localStorage.removeItem('accessToken');
            navigate('/');
          }
         return res.json();
        })
        .then((data) =>{ 
          setOrders(data)
        });
    }, [user, navigate]);


    return (
        <div>
      <h1 className="text-3xl mt-10">My Order products: {orders.length}</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>My Email</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                orders.map((order, index) => <tr index={index} key={order._id} order={order}>
                    <th>{index + 1}</th>
                    <td>{order.date} </td>
                    <td>{order.customer}</td>
                    <td>{order.productName}</td>
                    <td>{order.price}</td>
                    <td>{order.purchaseValue}</td>
                    <td>
                        <button className="btn btn-sm">Delete</button>
                    </td>
                  </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default MyOrders;