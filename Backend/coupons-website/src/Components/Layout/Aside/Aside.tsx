import React, { useEffect, useState } from 'react';
import './Aside.css';
import store from '../../../Redux/Store';
import { LoginReponseModel } from '../../../Models/LoginResponseModel';
import { NavLink } from 'react-router-dom';

const Aside = () => {
  const [userDetails, setUserDetails] = useState<LoginReponseModel>(store.getState().auth.user);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setUserDetails(store.getState().auth.user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="aside">
      <h3>תפריט</h3>
      {userDetails.token ? (
        <>
          {userDetails.clientType === 'ADMIN' && (
            <>
              <NavLink to="/admin/companies">חברות</NavLink>
              <NavLink to="/admin/customers">לקוחות</NavLink>
            </>
          )}
          {userDetails.clientType === 'COMPANY' && (
            <>
              <NavLink to="/company/coupons">קופונים</NavLink>
            </>
          )}
          {userDetails.clientType === 'CUSTOMER' && (
            <>
              <NavLink to="/customer/all-coupons">כל הקופונים</NavLink>
              <NavLink to="/customer/my-coupons">הקופונים שלי</NavLink>
            </>
          )}
        </>
      ) : (
        <p>נא להתחבר כדי לראות את התוכן.</p>
      )}
    </div>
  );
};

export default Aside;