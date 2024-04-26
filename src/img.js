import { useState } from "react";
import Sidebar from "./sidebar"
import Imgbody from "./imgbody"
const Body=()=>{
    const [searches, setSearches] = useState([]);

    const clearImages = () => {
        setSearches([]);
        console.log("history clear")
    };

    return <div className="body">
        <Sidebar handleClear={ clearImages } />
        <Imgbody search={searches} handleDel={ clearImages }/>
    </div>
}
export default Body