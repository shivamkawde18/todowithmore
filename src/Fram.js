import "./Style.css";
import { useEffect, useState } from "react";
import My from "./My";
import Compelete from "./Compelete";
function Fram() {
  let [textBox, setTextBox] = useState(false);
  let [taskDes, setTaskDes] = useState();
  let [list, setList] = useState([]); 
  let [comFlag, setComFlag] = useState(false);
  let [rerender, setRerender] = useState(0);
  let [color, setColor] = useState();
  let initalState = null;
  if (localStorage.getItem("state") != null)
    initalState = parseInt(localStorage.getItem("state"));
  let [comRerender, setComRerender] = useState(initalState ? initalState : 0);
  let [sno, setSno] = useState(initalState + 1);

  console.log(list);
  //a function is used from performing sync state change
  let a = () => {
    setComRerender(comRerender + 1);
  };
  useEffect(() => {
    //getting data from localStorage
    let a = localStorage.getItem("task");
    if (a != null) {
      console.log(a);
      let res;
      res = JSON.parse(a);
      console.log(res[res.length - 1]);
      if (res.length != 0)
        localStorage.setItem("state", res[res.length - 1].sno);
      setList(res);
    }
  }, [comRerender, rerender]);

  return (
    <>
      <div className="mainDiv">
        <h1>Todo List</h1>
        {comFlag ? (
          <Compelete />
        ) : (
          <My list={list} setList={setList} a={a}></My>
        )}

        {textBox ? (
          <>
            <select
              className="selectFlag"
              onChange={(e) => {
                console.log(e.currentTarget.value);
                setColor(e.currentTarget.value);
              }}
            >
              <option>Choose Flag</option>
              <option>red</option>
              <option>black</option>
              <option>green</option>
            </select>
            <input
              className="smallInput"
              type="text"
              onKeyUp={(e) => {
                setTaskDes(e.currentTarget.value);
              }}
            />{" "}
            <button
              onClick={() => {
                let data = localStorage.getItem("task");

                let arr = [];
                if (data != null) {
                  arr = JSON.parse(data);
                  //creating object
                  let obj = {
                    sno: sno,
                    content: taskDes,
                    check: null,
                    color: color,
                    time: new Date().toLocaleTimeString(),
                  };
                  //pushing object in array
                  arr.push(obj);
                  console.log(arr);
                  localStorage.setItem("task", JSON.stringify(arr));
                }
                else {
                  let obj = {
                    sno: sno,
                    content: taskDes,
                    check: null,
                    color: color,
                    time: new Date().toLocaleTimeString(),
                  };
                  arr.push(obj);
                  localStorage.setItem("task", JSON.stringify(arr));
                }
                setTextBox(false);
                setSno(sno + 1);
                setRerender(rerender + 1);
              }}
              className="smallBtn"
            >
              add
            </button>
            <button
              className="cancelTextBox"
              onClick={() => {
                setTextBox(false);
              }}
            >
              X
            </button>
          </>
        ) : (
          ""
        )}

        {textBox ? (
          ""
        ) : (
          <button
            className="mainBtn"
            onClick={() => {
              setTextBox(true);
            }}
          >
            add task
          </button>
        )}

        <button
          className="completedTask"
          onClick={() => {
            setComFlag(true);
          }}
        >
          Compelete Task
        </button>
        {comFlag ? (
          <button
            className="alltask"
            onClick={() => {
              setComFlag(false);
            }}
          >
            All Task
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default Fram;
