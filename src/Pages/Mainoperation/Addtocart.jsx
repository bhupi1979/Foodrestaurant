import React, { useEffect, useState } from 'react'
import { cartdatainsert, cartdataupdate, fetchCategories,  submaincategorydata } from '../Adminpanelnew/Api';
import Loader from '../../Comman/Loader';
import { toast } from 'react-toastify/unstyled';
import { useLocation, useNavigate } from 'react-router-dom';
import { Printbill } from './Printbill';
import { Printqt } from './Printqt';



export default function Addtocart() {
const [categories, setCategories] = useState([])
const [subcategrydata,setsubcategorydata]=useState([])
const [cartdata,setcartdata]=useState([])
const [loading,setLoading]=useState(false)
const navigate=useNavigate()
const location=useLocation()
const {findcartdata,table}=location.state||{}
const [userdetail,setuserdetail]=useState({username:"",
        mobilenumber:"",
        address:"",
        locality:"",
        gstnumber:"",
        paymentmode:"",
        paymentsettlement:""})
const [showdetail,setshowdetail]=useState(false)
  
  useEffect(() => {
    if((table===undefined||table===null||table==="")&&!sessionStorage.getItem('adminpass'))
    {
       
      window.location.href="/startpage"
    }
    if(!sessionStorage.getItem('username'))
      window.location.href="/login"
   if(sessionStorage.getItem('adminpass'))
          navigate('/adminpanel')
    loadCategories();
  if(findcartdata)
  { //alert(findcartdata.orders[0].name)
    setcartdata(findcartdata.orders)
  }
  // else{
  //   alert(table)
  // }
  }, []);

  const loadCategories = async () => {
   try {
      const res = await fetchCategories();
      if (res.data.status) setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    } 
  }
  
    const oncategorychange = async (e) => {
      let id=e.target.value
      try {
        const res = await submaincategorydata(id);
        if (res.data.status) setsubcategorydata(res.data.data);
      } catch (err) {
        console.error(err);
      }         
      }
    
    
  //oreder handling
     
const handleorder = (subcat) => {
  setcartdata((prev) => {
    const existing = prev.find((item) => item.id === subcat._id)
    if (!existing) {
      // add new item
      return [
        ...prev,
        {
          id: subcat._id,
          name: subcat.subcategoryname,
          qty: 1,
          price: subcat.price,
          total: subcat.price,
        },
      ]
    } else {
      // update quantity immutably
      return prev.map((item) =>
        item.id === subcat._id
          ? { ...item, qty: item.qty + 1, total: item.price * (item.qty + 1) }
          : item
      )
    }
  })
}
//handle click on cart
const handleordercart=(e,subcat)=>{
  let id=e.target.value
  //alert(id)
  switch (id)
     {
      case  "+":
setcartdata((prev) => {
  return prev.map((item) =>
        item.id === subcat.id
          ? { ...item, qty: item.qty + 1, total: item.price * (item.qty + 1) }
          : item
      )
})
break;
case "-" :
  setcartdata((prev) => {
  return prev.map((item) =>
        (item.id === subcat.id) &&(item.qty>1)
          ? { ...item, qty: item.qty - 1, total: item.price * (item.qty - 1) }
          : item
      )
})
break;
case "x":
  setcartdata((prev)=> prev.filter((item)=>item.id!==subcat.id))
  break;
     }
}
/**********startiing of QT generation */
const generateqt = async (e) => {
  if (!cartdata || cartdata.length === 0) {
    alert("Enter some value in cart for order");
    return;
  }

  const qrorbill = e.target.value === "bill" ? "bill" : "qt";

  setLoading(true);

  try {
    if (!findcartdata) {
      // New order

      const obj = { mode: table, status1: qrorbill, orders: cartdata,...userdetail
      //   username:userdetail.username,
      //   mobilenumber:userdetail.mobilenumber,
      //   address:userdetail.address,
      //   locality:userdetail.locality,
      //   gstnumber:userdetail.gstnumber,
      //   paymentmode:userdetail.paymentmode,
      //   paymentsettlement:userdetail.paymentsettlement
      //  };
      }
      await cartdatainsert(obj);
      toast("cartdata added successfully!");
      qrorbill === "bill" ? Printbill(obj) : Printqt(obj);
    } 
    // else if (findcartdata.status1 === "bill") {
    //   // Old bill → insert fresh order
    //   const newObj = { mode: table, status1: qrorbill, orders: cartdata };
    //   await cartdatainsert(newObj);
    //   toast("New order started after bill!");
    //   qrorbill === "bill" ? Printbill(newObj) : Printqt(newObj);
    // } 
    else {
      // Update ongoing QT
      const updatedObj = { ...findcartdata, status1: qrorbill, orders: cartdata,...userdetail };
      await cartdataupdate(findcartdata._id, updatedObj);
      toast("cartdata updated successfully!");
      qrorbill === "bill" ? Printbill(updatedObj) : Printqt(updatedObj);
    }

    setcartdata([]);
    navigate("/Startpage");
  } catch (err) {
    toast("Error while saving order! " + err);
  } finally {
    setLoading(false);
  }
};
const handlechange=(e)=>{
const {name,value}=e.target
setuserdetail((prev)=>({...prev,[name]:value}))
}
const handlesettle=(e)=>{
  if(e.target.value=='show')
setshowdetail(true)
  else
    setshowdetail(false)
}
  return (
    <>
    {loading&&<Loader/>}
    <div className="container-fluid">
          <h1 className=' bg-danger text-white text-uppercase'> BILLING SECTION</h1> <span className='d-block float-end'><button className='btn btn-info' onClick={()=>{navigate("/Startpage")}} >GO-Back</button></span>

        <div className="row">
            <div className="col-lg-4">
              <select className="form-select mb-4"
              onChange={oncategorychange}
              >
                <option value="">-- Select-Category--</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryname}
              </option>
            ))}
                </select>  
                {/* sub category data from mainctgory id */}
                {subcategrydata.map((cat) => (
              <button key={cat._id} value={cat._id} className='btn btn-warning mx-2 my-2' onClick={()=>handleorder(cat)}>
                {cat.subcategoryname}
              </button>
            ))}
            </div>
            <div className="col-lg-8">
  <h1 className='bg-info text-black-50 text-uppercase'>The Cart Items</h1>
  <h3 className='bg-secondary text-warning'>THE MODE: <b className='text-white'>{table}</b> </h3>

   <div className="container-fluid">
      <div className="row">
        <div className="col-lg-9">
{/* the cart secont start here */}
<table className="table table-success table-striped table-hover text-center w-100 mx-auto table-responsive p-4" border='1'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>price</th>
            <th>Total</th>
            <th>ACTION</th>
            </tr>
        </thead>
        <tbody>
            {cartdata.map((cat,i) => (
             <tr key={i}>
            <td>{cat.name}</td>
            <td> <button className='btn btn-info me-2' value={'-'}onClick={(e)=>handleordercart(e,cat)}>-</button><b>{cat.qty}</b><button className='ms-2 btn btn-info' value="+" onClick={(e)=>handleordercart(e,cat)}>+</button></td>
            <td>  {cat.price}</td>
            <td>{cat.total}</td>
            <td><button className='btn btn-danger' value={'x'}onClick={(e)=>handleordercart(e,cat)}>X</button></td>
            </tr>
            ))}
            

        </tbody>
        </table>
        <button className='btn btn-primary me-4' value={cartdata} onClick={generateqt}>GenerateQT</button><button className='btn btn-danger'  value={'bill'} onClick={generateqt}>Bill-n-Settle</button>
            
{/* the cart section ends here */}
        </div>
        <div className="col-lg-3">
          {/* the form i hserer */}
          <button className='btn btn-warning' value={showdetail?"hide":'show'}onClick={handlesettle}>{showdetail?'Hide':'Settle-Payment'}</button>
         {showdetail && <form className='w-100 border-1 border-dark border p-1' style={{fontSize:'12px'}}>
  <div className="mb-3">
    <label  className="form-label">Enter Name</label>
    <input type="text" className="form-control" name="username" value={userdetail.username||""} onChange={handlechange} />
   </div>
  <div className="mb-3">
    <label  className="form-label">Enter Mobile Number</label>
    <input type="text" className="form-control" name="mobilenumber" value={userdetail.mobilenumber||""} onChange={handlechange} />
   </div>
  <div className="mb-3">
    <label  className="form-label">Enter Address</label>
    <input type="text" className="form-control" name="address" value={userdetail.address||""} onChange={handlechange} />
   </div>
   <div className="mb-3">
    <label  className="form-label"> Enter Locality</label>
    <input type="text" className="form-control" name="locality" value={userdetail.locality||""} onChange={handlechange} />
   </div>
   <div className="mb-3">
    <label  className="form-label">Enter GST-Number</label>
    <input type="text" className="form-control" name="gstnumber" value={userdetail.gstnumber||""}  onChange={handlechange}/>
   </div>
   {/* radio button start here */}
   <div style={{backgroundColor:'#fcc'}} >
     <label  className="form-label">Select Payment Mode</label>
   <div className="form-check border border-1 ">
     <input className="form-check-input " type="radio" name="paymentmode" value="cash" onChange={handlechange} />
  <label className="form-check-label" >
    CASH
  </label>
</div>
<div className="form-check border border-1">
  <input className="form-check-input " type="radio" name="paymentmode" value="card" onChange={handlechange}/>
  <label className="form-check-label" >
    CARD
  </label>
</div>
<div className="form-check border border-1">
  <input className="form-check-input " type="radio" name="paymentmode" value="upi" onChange={handlechange}/>
  <label className="form-check-label" >
    UPI
  </label>
</div>
</div>
{/* payment settlement */}
<div style={{backgroundColor:'#fcc'}} >
     <label  className="form-label">Select Payment Settlement</label>
   <div className="form-check border border-1">
     <input className="form-check-input" type="radio" name="paymentsettlement" value="full" onChange={handlechange}/>
  <label className="form-check-label" >
    Full-Payment
  </label>
</div>
<div className="form-check border border-1 ">
  <input className="form-check-input " type="radio" name="paymentsettlement" value="part" onChange={handlechange}/>
  <label className="form-check-label" >
    Part-Payment
  </label>
</div>
<div className="form-check border border-1 ">
  <input className="form-check-input " type="radio" name="paymentsettlement" value="due" onChange={handlechange}/>
  <label className="form-check-label" >
    Payment-DUE
  </label>
</div>
</div>
</form>}
        </div>
        {/* end of form here */}
      </div>
   </div>
  


   </div> 
            {/* col-lg-10 ends here */}
        </div>
    </div>
    </>
  )
}
