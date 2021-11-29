import { useEffect, useState } from "react";
import "./Style.css";

function Compelete() {
  let [complete, setCompleteTask] = useState([]);
  console.log(complete);
  useEffect(() => {
    //getting data from localStorage
    let arr = [];
    if (localStorage.getItem("completeTask") != null)
      arr = JSON.parse(localStorage.getItem("completeTask"));
    setCompleteTask(arr);
  }, []);
   let changeTime=(timeString)=>{
    
    // Append any date. Use your birthday.
    const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
      .toLocaleTimeString('en-US',
        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
      );
      return timeString12hr
   }
  return (
    <>  
      {//conditional reandring
       complete.length==0?<h1>No Compeleted Task</h1> :<> {complete.map((e) => {
        return (
          <div>
            <div className="compContent"> {e.content}</div>
            <p>Compeleted Time {changeTime(e.time)}</p>
          </div>
        );
      }) } <button className="clearAll" onClick={()=>{
        localStorage.removeItem("completeTask")
        let arr = [];
        if (localStorage.getItem("completeTask") != null)
          arr = JSON.parse(localStorage.getItem("completeTask"));
        setCompleteTask(arr);
      }}>Clear all</button></>}
    </>
  );
}
export default Compelete;
