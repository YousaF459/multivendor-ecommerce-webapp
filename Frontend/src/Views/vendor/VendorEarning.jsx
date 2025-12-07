import VendorSidebar from "./VendorSidebar";
import { Link } from "react-router-dom";
import axiosAPI from "../../Axios/axiossetup";
import VendorData from '../Plugin/VendorData'
import { useEffect, useState } from "react";
import useUserData from "../Plugin/UserData";
import moment from "moment";
import {Line,Bar} from 'react-chartjs-2'
import { Chart } from "chart.js/auto";

function VendorEarning(){

    const[earningStats,setEarningsStats]=useState()
    const[earningStatsTracker,setEarningStatsTracker]=useState([])
    const[earningChart,setEarningChart]=useState([])
    const vendorid=VendorData()
   

    useEffect(()=>{

        axiosAPI.get(`vendor-earning/${vendorid}/`)
        .then((res)=>{
            setEarningsStats(res.data[0])
    })

        axiosAPI.get(`vendor-monthly-earning/${vendorid}/`)
        .then((res)=>{
            setEarningStatsTracker(res.data)
            setEarningChart(res.data)
            
    })
 
    },[vendorid])


    const monthNames = [
  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


    const months=earningChart?.map(item => item.month)
    const revenue=earningChart?.map(item => item.total_earning)
    


    const revenue_data={
        labels:months,
        datasets:[
            {
                label:"Total Sales Revenue",
                data:revenue,
                fill:true,
                backgroundColor:'green',
                borderColor:'green'
            }
        ]
    }






    return(
        <div className="container-fluid" id="main">
  <div className="row row-offcanvas row-offcanvas-left h-100">
    {/* Add Sidebar Here */}
        <VendorSidebar/>
    <div className="col-md-9 col-lg-10 main mt-4">
      {!vendorid && (
  <div className="alert alert-warning text-center fw-semibold mt-3">
    You must be logged in to view this section.
  </div>
)}
      <div className="row mb-3">
        <div className="col-xl-6 col-lg-6 mb-2">
          <div className="card card-inverse card-success">
            <div className="card-block bg-success p-3">
              <div className="rotate">
                <i className="bi bi-currency-dollar fa-5x" />
              </div>
              <h6 className="text-uppercase">Total Sales</h6>
              <h1 className="display-1">${earningStats?.total_revenue}</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 mb-2">
          <div className="card card-inverse card-danger">
            <div className="card-block bg-danger p-3">
              <div className="rotate">
                <i className="bi bi-currency-dollar fa-5x" />
              </div>
              <h6 className="text-uppercase">Monthly Earning</h6>
              <h1 className="display-1">${earningStats?.monthly_revenue}</h1>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row  container">
        <div className="col-lg-12">
          <h4 className="mt-3 mb-4">Revenue Tracker</h4>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Orders</th>
                <th scope="col">Revenue</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>


            {earningStatsTracker?.map((es,esindex)=>(


                <tr key={esindex}>

                <th scope="row">{monthNames[es?.month]}</th>
                <td>{es?.sales_count}</td>
                <td>${es?.total_earning}</td>
                <td>
                  <a href="" className="btn btn-primary mb-1">
                    <i className="fas fa-eye" />
                  </a>
                </td>
              </tr>

            ))} 
              
          
            </tbody>
          </table>
        </div>
        <div className="container">
          <div className="row ">
            <div className="col">
              <h4 className="mt-4">Revenue Analytics</h4>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-md-12 py-1">
              <div className="card">
                <div className="card-body">
                  <Bar data={revenue_data}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default VendorEarning;