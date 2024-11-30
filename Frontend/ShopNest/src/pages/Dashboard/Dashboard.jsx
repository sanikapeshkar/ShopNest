import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import './Dashboard.css';
import data from "../../dummyData/ProductListData"
const Dashboard = () => {
  return (
    <div className="dashboard">
        {/* header */}
      <main className="dashboard-main">
        <ProductList products={data} />
      </main>
      {/* footer */}
    </div>
  );
};

export default Dashboard;
