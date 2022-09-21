
export const getStatusFromRst = async (latitude:Number,longitude:Number) => {
    try{
    console.log("getting ....." ,latitude,longitude);
    const reqbody = {"latitude":latitude,"longitude":longitude}
    const requestOptions = {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(reqbody)
    }
   
    console.log("REQUEST OPTIONS :::" , requestOptions);
    const response = await fetch('http://192.168.108.164:5000/api/emplocation',requestOptions)
    const json = await response.json();
    console.log(json);
   // setInsideRestaurent(json.msg)
   return json.msg;
   
  }catch(error){
    console.log("Exception has ocuured" , error);
  }
}