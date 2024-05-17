import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const ref = useRef()
    const passwordRef = useRef()

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)
    }
    
    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        // alert("copying item is "+text)
        toast('Copy to clipboard !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        //   console.log(ref.current.src)
        let eyeImg = ref.current.src.includes("icons/eyecross.png")
        if (eyeImg) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }
    }

    const savePassword = async () => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){
            //if any such id exists in the db,delete it
            await fetch("http://localhost:3000/",{method:"DELETE",headers:{"content-Type":"application/json"},body:JSON.stringify({id:form.id})})

            setpasswordArray([...passwordArray, {...form,id:uuidv4()}])
            await fetch("http://localhost:3000/",{method:"POST",headers:{"content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
            setform({site:"",username:"",password:""})

            toast('Password saved !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(...passwordArray, form)
        }
        else{
            toast('Error! Not saved ')
        }

    }
    const deletePassword = async (id) => {
        console.log("Deleting password with id ",id)
        let c = confirm("Do you want to delete this password?")
        if(c){
            setpasswordArray(passwordArray.filter(item=>item.id!==id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))

            let res = await fetch("http://localhost:3000/",{method:"DELETE",headers:{"content-Type":"application/json"},body:JSON.stringify({id})})
            

        }
        toast('Deleting your password !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        
    }

    const editPassword = (id) => {
        console.log("Editing password with id",id)
        setform({...passwordArray.filter(i=>i.id===id)[0],id:id})
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
       
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (<>

        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition="Bounce"
        />
        {/* Same as */ }
        <ToastContainer />


        <div className='flex flex-col items-center md:w-[70%] min-h-[81vh] mx-auto gap-4 p-4'>
            <div className='flex flex-col items-center'>
                <div className="logo font-bold text-lg cursor-pointer">
                    <span className='text-green-400'>&lt;</span>
                    Pass
                    <span className='text-green-400'>OP/&gt;</span>

                </div>
                <div className='text-green-900'>Your personal password Manager</div>
            </div>
            <input value={form.site} onChange={handleChange} className='w-full rounded-full p-4 py-1 border' placeholder='Enter your url' type="text" name="site" id="site" />
            <div className='w-full md:space-x-2 md:flex md:space-y-0 space-y-3'>
                <input value={form.username} onChange={handleChange} className='w-full md:w-4/5 p-4 py-1 border rounded-full' placeholder='Enter your username' type="text" name="username" id="username" />
                <div className='relative'>
                    <input ref={passwordRef} value={form.password} onChange={handleChange} className='w-full md:1/5 p-4 py-1 border rounded-full' placeholder='password' type="password" name="password" id="password" />
                    <span className='absolute top-1 right-[8px] cursor-pointer' onClick={showPassword}><img ref={ref} width={26} src="/icons/eye.png" alt="eye" /></span>
                </div>
            </div>
            <div className='border rounded-full flex items-center border-black px-2 py-1 bg-green-500 text-gray-100 font-semibold'>
                <lord-icon
                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                    trigger="hover">
                </lord-icon>
                <button onClick={savePassword}>Add password</button>
            </div>

            <h2 className='self-start font-bold px-2'>Your passwords</h2>
            {passwordArray.length === 0 && <div>No password to show</div>}
            {passwordArray.length != 0 && <table className="table-auto w-full bg-green-100 rounded-md overflow-hidden">
                <thead>
                    <tr className='bg-green-400'>
                        <th className='py-2 border border-white'>Site</th>
                        <th className='py-2 border border-white'>Username</th>
                        <th className='py-2 border border-white'>Password</th>
                        <th className='py-2 border border-white'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {passwordArray.map((item,index) => {
                        return <tr key={index}>

                            <td className='py-1 text-center border border-white gap-1 '><a href={item.site} target='_blank '> {item.site} </a>
                                <span onClick={()=>{copyText(item.site)}}><lord-icon
                                    src="https://cdn.lordicon.com/zrtfxghu.json"
                                    trigger="hover"
                                    style={{ "width": "20px", "height": "20px", "paddingTop": "4px" }}>
                                </lord-icon></span>

                            </td>

                            <td className='py-1 text-center border border-white gap-1'> <span className="">{item.username}</span>
                                <span onClick={()=>{copyText(item.username)}}><lord-icon
                                    src="https://cdn.lordicon.com/zrtfxghu.json"
                                    trigger="hover"
                                    style={{ "width": "20px", "height": "20px", "paddingTop": "4px" }}>
                                </lord-icon></span>
                            </td>
                            <td className='py-1 text-center border border-white gap-1'><span>{"*".repeat(item.password.length)}</span>
                                <span onClick={()=>{copyText(item.password)}}><lord-icon
                                    src="https://cdn.lordicon.com/zrtfxghu.json"
                                    trigger="hover"
                                    style={{ "width": "20px", "height": "20px", "paddingTop": "4px" }}>
                                </lord-icon></span>
                            </td>


                            <td className='py-1 text-center border border-white '>
                                <span onClick={()=>{editPassword(item.id)}} className='px-1'><lord-icon
                                    src="https://cdn.lordicon.com/pflszboa.json"
                                    trigger="hover"
                                    style={{ "width": "20px", "height": "20px", "paddingTop": "4px" }}>
                                </lord-icon></span>
                                <span onClick={()=>{deletePassword(item.id)}}><lord-icon
                                    src="https://cdn.lordicon.com/skkahier.json"
                                    trigger="hover"
                                    style={{ "width": "20px", "height": "20px", "paddingTop": "4px" }}>
                                </lord-icon></span>

                            </td>
                        </tr>
                    })}

                </tbody>
            </table>}

        </div>

        </> )
}

export default Manager
