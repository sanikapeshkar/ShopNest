import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import './Dashboard.css';
import data from "../../dummyData/ProductListData";
import Header from '../../components/Header/Header';
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header/>
      <main className="dashboard-main">
        <ProductList products={data} />
      </main>
      {/* footer */}
    </div>
  );
};

export default Dashboard;
