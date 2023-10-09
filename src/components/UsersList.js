import axios from 'axios';
import React,{ useEffect, useState }  from 'react'

const UsersList = () => {
    const [userData, setUserData]=useState(null);

    const fetchUsersData = async () => {
        const resp =await axios.get("/getUsers");

        if (resp.data.users.length>0){
            setUserData(resp.data.users);
        }
    }

    const handleEdit =async (user)=>{
        try {
            const userName =prompt("enter new name");
            const userEmail =prompt("enter new email");
            
            if (!userName || !userEmail) {
                console.log("please enter both name and email")
            }
            else {
                const resp =await axios.put(`/editUser/${user._id}`,{
                    name:userName,
                    email:userEmail,
                });
                console.log(resp)
            }
 
        } catch (err){
            console.log(err.response.data.message);
        }
    }

    const handleDelete =async (userId)=>{
        try{
            const resp=await axios.delete(`/deleteUser/${userId}`);
         
            if(resp.data.success){
                console.log("user deleted sucessfully");
            }
        }catch(err){
            console.log(err.response.data.message);
        }
    }
    useEffect (()=>{
        fetchUsersData();  
    }, [userData]);
  return (
    <>
    <section className='text-gray-600 body-font '>
        <div className='container px-5 py-24 mx-auto'>
            <div className='flex flex-col text-center w-full mb-8'>
                <h1 className='sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900'>All users</h1>
            </div>
            <div className='lg:w-2/3 w-full mx-auto overflow-auto'>
                <table className='table-auto w-full text-left whitespace-nowrap'>
                    <thead>

                        <tr>
                            <th className='px-r py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>
                                Name
                            </th>
                            <th className='px-4 py-3 title-font tracking-wide font-medium text-gray-900 text-sm bg-gray-100 '>
                                Email
                            </th>
                            <th className='px-4 py-3 title-font tracking-wide font-medium text-gray-900 text-sm bg-gray-100 '>
                                Edit
                            </th>

                            <th className='px-4 py-3 title-font tracking-wide font-medium text-gray-900 text-sm bg-gray-100 '>
                             Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                {userData && userData.map((user)=>(
                           <tr key={user._id}>
                           <td className='px-4 py-3'>{user.name}</td>
                           <td className='px-4 py-3'>{user.email}</td>
                           <td className='px-4 py-3'>
                               <button className='
                               hover:text-green-500' onClick={()=>handleEdit}>Edit</button>
                           </td>
   
                           <td className='px-4 py-3 text-lg text-gray-900'>
                               <button className=' hover:text-red-500' onClick={()=> handleDelete}>Edit</button>
                           </td>
                       </tr>
                ))}
      
             </tbody>
                   
                </table>
            </div>
        </div>
    </section>
    </>
  )
}

export default UsersList