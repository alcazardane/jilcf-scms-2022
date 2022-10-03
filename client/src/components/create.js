import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   position: "",
   level: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ 
      userID: "", 
      password: "", 
      level: "",
      track: "",
      strand: "",
      secAdv: "",
      name: "",
      profilePic: "",
    });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>

       <div className="form-group">
         <label htmlFor="userID">userID</label>
         <input
           type="text"
           className="form-control"
           id="userID"
           value={form.userID}
           onChange={(e) => updateForm({ userID: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="password">password</label>
         <input
           type="text"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       
       <div className="form-group">
         <label htmlFor="level">level</label>
         <input
           type="text"
           className="form-control"
           id="level"
           value={form.level}
           onChange={(e) => updateForm({ level: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="track">track</label>
         <input
           type="text"
           className="form-control"
           id="track"
           value={form.track}
           onChange={(e) => updateForm({ track: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="strand">strand</label>
         <input
           type="text"
           className="form-control"
           id="strand"
           value={form.strand}
           onChange={(e) => updateForm({ strand: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="secAdv">secAdv</label>
         <input
           type="text"
           className="form-control"
           id="secAdv"
           value={form.secAdv}
           onChange={(e) => updateForm({ secAdv: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="name">name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="profilePic">profilePic</label>
         <input
           type="text"
           className="form-control"
           id="profilePic"
           value={form.profilePic}
           onChange={(e) => updateForm({ profilePic: e.target.value })}
         />
       </div>
       
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}