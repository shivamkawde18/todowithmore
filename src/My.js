import "./Style.css";
function My(props) 
{

    let changeTime=(timeString)=>{
    
        // Append any date. Use your birthday.
        const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
          .toLocaleTimeString('en-US',
            {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
          );
          return timeString12hr
       }



  return (
    <div className="taskList">
      {props.list.map((e) => {
        console.log(e.check);
        return (
          <div className="content">
              <div className="flag" style={{backgroundColor:`${e.color}`}} ></div>
            <input
              className="input"
              type="checkbox"
              checked={e.check}
              onClick={()=>{
                  props.a()
              }}
              onChange={(ee) => {
                let arr = JSON.parse(localStorage.getItem("task"));

                let tempArr = [];

                for (let i = 0; i < arr.length; i++) {
                  if (arr[i].sno == e.sno) {
                    if (arr[i].check == true) 
                       {
                            arr[i].check = null;
                       }
                    else{
                        arr[i].check = true;
                    }
                    tempArr.push(arr[i]);
                  } else tempArr.push(arr[i]);
                }
                localStorage.setItem("task", JSON.stringify(tempArr));


              
                

                let a = localStorage.getItem("task");

                if (a != null) {
                
                  let res;
            
                  res = JSON.parse(a);
            
        
                  if (res.length != 0)
                    localStorage.setItem("state", res[res.length - 1].sno);
                  props.setList(res);

                }

              





            
                let completeArr = [];
                let temparr=[]
            if (localStorage.getItem("completeTask") != null){
                  completeArr = JSON.parse(
                    localStorage.getItem("completeTask")
                  );
                                               
                  console.log(completeArr)
                  for(let i=0;i<completeArr.length;i++)
                  {
                    console.log(e.sno)
                    if(completeArr[i].sno==e.sno)
                     console.log("jii")
                    else{
                    temparr.push(completeArr[i])
                    e.time=new Date().toLocaleTimeString()
                    temparr.push(e)    
                }
                  }
                  
                  console.log(e)
                }

             else{
                e.time=new Date().toLocaleTimeString()
                temparr.push(e);
             
             }console.log(temparr)
    
          
        

          

           

                localStorage.setItem(
                  "completeTask",
                  JSON.stringify(temparr)
                );

                props.a();
              }}
            />
            <div
              className="para"
              contentEditable="true"
              onKeyUp={(ee) => {
                console.log(ee.currentTarget.innerText);
                console.log(e);
                let arr = [];
                arr = JSON.parse(localStorage.getItem("task"));
                let temarr = [];
                console.log(arr);
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i].sno == e.sno) {
                    arr[i].content = ee.currentTarget.innerText;
                  }
                  temarr.push(arr[i]);
                }
                console.log(temarr);
                localStorage.setItem("task", JSON.stringify(temarr));
              }}
            >
              {e.content}
            </div>
            <button
              className="deleteBtn"
              onClick={() => {
                let str = localStorage.getItem("task");
                console.log(str);
                let arr = JSON.parse(str);

                console.log(arr);
                console.log(e.sno);

                // let tem = "";
                // let arr = [];
                // let flag = false;
                let tempArr = [];

                for (let i = 0; i < arr.length; i++) {
                  if (arr[i].sno != e.sno) tempArr.push(arr[i]);
                }

               // localStorage.clear();
                localStorage.setItem("task", JSON.stringify(tempArr));

                props.a();
              }}
            >
              X
            </button>
            <p>Starting Time -{ changeTime(e.time)}</p>
            <br />

           
          </div>
        );
      })}
    </div>
  );
}
export default My;
