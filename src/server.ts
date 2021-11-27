import {serverHttp} from "./http";
import "./websocket";

serverHttp.listen(3000, ()=>{
    console.log("SERVER running on port: 3000")
});