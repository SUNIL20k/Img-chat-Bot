import { useEffect, useState } from "react"
import logo from "./images/ai-img-removebg-preview.png"

const Sidebar=({ handleClear })=>{
    const [name,setName] = useState([])
    async function Fetch(){
            const response = await fetch("https://ai-bot-cbfb8-default-rtdb.firebaseio.com/ai-bot.json");
            const data = await response.json();
            const array=[]
        for(let key in data){
            if(data.hasOwnProperty(key)){
                array.push(data[key])
                console.log(array)
            }
        }
        setName(array)
      }  
    
    useEffect(()=>{
        Fetch();
    },[])
    // const handleDelete = async (index) => {
    //   setName(name.filter((name) => name.index !== index));
    //   console.log(index)
    // };
    const handleDelete = async (id) => {
      const updatedNames = name.filter((item) => item.id !== id);
      setName(updatedNames);
      await fetch(`https://ai-bot-cbfb8-default-rtdb.firebaseio.com/ai-bot/${id}.json`, {
          method: 'DELETE',
      });
      console.log(`Item with ID ${id} deleted from the database.`);
  };
  
     

    return <div className="left-side">
        <div className="chitti-left">
              <div className="pro1">
                <img src={logo} className="profile"></img>
              </div>
              <button className="new-btn" onClick={() => {handleClear();}}><i class="bi bi-plus-lg"></i>   <span className="new-btn1">    New Chat</span></button>
                   
                  <p className="recent">Recent</p>
                <div className="history-box">
                  {
                    name.map((item,index)=>(
                       <p key={index} className="history"><i class="bi bi-chat-left"></i> {item.ImgName}  <button onClick={() => handleDelete(item.id)}>Delete</button></p>
                    ))
                  }
                </div>

              <button className="setting"><i class="bi bi-gear"></i><span className="new-btn2">  settings</span></button>
        </div>
    </div>
}
export default Sidebar