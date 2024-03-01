import axios, { AxiosHeaders } from "axios";
import React, { useEffect, useState } from "react";
const Table = () => {
  const [data, setData] = useState([]);
  const [name,setName] = useState(null)
  const [email,setEmail] = useState(null)
  const [phone,setPhone] = useState(null)
  const [address,setAddress] = useState(null)
  const [className,setClassName] = useState(null)
  const [fathersName,setFathersName] =useState(null)
  const [uname,usetName] = useState("")
  const [uemail,usetEmail] = useState("")
  const [uphone,usetPhone] = useState("")
  const [uaddress,usetAddress] = useState("")
  const [uclassName,usetClassName] = useState("")
  const [ufathersName,usetFathersName] =useState('')
  const [editId,setEditId] = useState(-1)

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/Students")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if data array is empty
    if (data.length === 0) {
      // If it's empty, set id to 1
      const id = 1;
      axios.post("/api/Student", { id: id, name: name, email: email, phone: phone, address: address, className: className, fathersName: fathersName })
        .then((res) => location.reload())
        .catch((err) => console.log(err));
    } else {
      // If it's not empty, calculate id based on the last element's id
      const id = data[data.length - 1].id + 1;
      axios.post("/api/Student", { id: id, name: name, email: email, phone: phone, address:address, className:className, fathersName:fathersName })
        .then((res) => location.reload())
        .catch((err) => console.log(err));
    }
  }
  
const handleEdit = (id) => {
    axios
      .get(`http://localhost:8080/api/Student/${id}`)
      .then((res) => {
        usetName(res.data[0].name) 
        usetEmail(res.data[0].email) 
        usetPhone(res.data[0].phone)
        usetAddress(res.data[0].address)
        usetClassName(res.data[0].className)
        usetFathersName(res.data[0].fathersName)})
      .catch((err) => console.log(err));
  setEditId(id)
    
}
const handleUpdate=() =>{
  axios.put(`http://localhost:8080/api/Student/${editId}`,{id: editId , name: uname, email: uemail, phone: uphone, address:uaddress, className:uclassName, fathersName:ufathersName})
   .then((res)=>{location.reload()
setEditId(-1)})
.catch(err=>console.log(err))
}
const handleDelete =(id)=>{
    axios.delete(`http://localhost:8080/api/Student/${id}`)
 .then(res => {location.reload()})
 .catch(err=>console.log(err))
}
  return (
    <div className="container">
      <div className="form-div">
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Your Name"  onChange={e => setName(e.target.value)}/><br />
            <input type="text" placeholder="Enter Your Email" onChange={e => setEmail(e.target.value)}/><br/>
            <input type="text" placeholder="Enter Your Phone" onChange={e => setPhone(e.target.value)}/><br/>
            <input type="text" placeholder="Enter Your Address" onChange={e => setAddress(e.target.value)}/><br/>
            <input type="text" placeholder="Enter Your Class" onChange={e => setClassName(e.target.value)}/><br/>
            <input type="text" placeholder="Enter Your Father's Name" onChange={e => setFathersName(e.target.value)}/><br/>
            <button type="submit">Add Student</button>
          </form>
        </div>
        <table>
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Class</th>
              <th>Father's Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
                
                  user.id === editId ? 
                <tr>
                    {/* <td>{user.id}</td> */}
                   <td> <input type="text"  value={uname} onChange={e => usetName(e.target.value)}/></td>
                   <td>
                     <input type='email' value={uemail} onChange={e => usetEmail(e.target.value)}/>
                   </td>
                   <td>
                     <input type="Number" value={uphone} onChange={e => usetPhone(e.target.value)}/>
                    </td>
                    <td><input type="text" value={uaddress} onChange={e => usetAddress(e.target.value)}/></td>
                    <td><input type="text" value={uclassName} onChange={e => usetClassName(e.target.value)}/></td>
                    <td><input type="text" value={ufathersName} onChange={e => usetFathersName(e.target.value)}/></td>
                    
                    <td><button onClick={handleUpdate}>Update</button></td>
                </tr> :
                <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.className}</td>
                <td>{user.fathersName}</td>
                <td>
                  <button onClick={()=> handleEdit(user.id)}>Edit</button>
                  <button onClick={()=>handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
