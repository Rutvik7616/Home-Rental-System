const mongoose=require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:true,
        },
        lastname:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        profileImagePath:{
            type:String,
            default:""
        },
       tripList:{
        try:Array,
        default:[],
       },
       wishList:{
        try:Array,
        default:[],
       },
       propertyList:{
        try:Array,
        default:[],
       },
       reservationList:{
        try:Array,
        default:[],
       },
 
    },
    {timestamps:true}

)
const User=mongoose.model("User",userSchema);
module.exports=User