if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

main().then(()=>{
  console.log("connection successfull")
}).catch(err=>{
    console.log(err)
})

async function main(){
  await  mongoose.connect(dbUrl)
};

const initDB=async ()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({...obj,owner:'6a94251b2be10b6a19a55fb1'}))
  await  Listing.insertMany(initData.data);
  console.log("data initialized")
}

initDB();