import React, { useState } from 'react'
import { reportdata } from './Api';
import Reportdisplay from './Reportdisplayall';
import Loader from '../../Comman/Loader';
import Reportsgrandtotal from './Reportsgrandtotal';
import { useLocation } from 'react-router-dom';

export default function Reports() {
    const [startdate,setstartdate]=useState("")
    const [enddate, setenddate]=useState("")
    const [fetchreportdata,setfetchreportdata]=useState([])
    const [loading,setLoading]=useState(false)
    const location=useLocation()
const {rep}=location.state||{}
console.log(rep)
    const getreport= async()=>{
         if(startdate==""||startdate==null)
           {alert("please select start date")
            return
           }
           if(enddate==""||enddate==null)
            {alert("please select end  date")
            return
           }
         if(enddate<startdate)
            {alert("startdate cannot be less than end date")
                return
            }
                setLoading(true);
                try {
                  const res = await reportdata(startdate,enddate);
                  console.log(res.data.data)
                  if (res.data.status) setfetchreportdata(res.data.data);
                } catch (err) {
                  console.error(err);
                } finally {
                  setLoading(false)
                  setstartdate("")
                  setenddate("")
                }
              
            
    }
      return (
    <> {loading && <Loader />}
        <div className="container">
        <h4 className='d-inline-block'>SELECT {rep} SALE BETWEEN START DATE AND END DATE</h4> <span className='d-inline-block'><button className='btn btn-secondary' onClick={()=>{window.location.href='/startpage'}}>GotoStartpage</button></span>
<div className="row bg-info my-2">
    <div className="mb-3 text-start p-4 col-lg-6">
    <label className="form-label ">Enter start date</label>
    <input type="date" className="form-control" name="startdate" value={startdate||""} onChange={(e)=>{setstartdate(e.target.value)}} />
     </div>
     <div className="mb-3 text-start p-4 col-lg-6">
    <label className="form-label ">Enter End date</label>
    <input type="date" className="form-control" name="enddate" value={enddate||""} onChange={(e)=>{setenddate(e.target.value)}} />
     </div>
     <button className='btn btn-warning w-50 mx-auto p-1 mb-3' onClick={getreport}>Get Report</button>
</div>
    </div>
        {/* conntain end shere */}
        {/* fetching data starts here */}
        {/* <Reportdisplay fetchreportdisplaydata={fetchreportdata}/> */}
        <Reportsgrandtotal fetchreportdisplaydata={fetchreportdata} reportvalue={rep}/>
        </>
  )
}
