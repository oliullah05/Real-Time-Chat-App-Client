/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from '../shared/LandingIntro'
import { useRegisterMutation } from '../../redux/features/auth/authApi'
import { toast } from 'sonner'


function Register() {

    const [register, { isLoading }] = useRegisterMutation()
    const [error, setError] = useState("")
    const [profilePhoto, setProfilePhoto] = useState("")
    const [isImgUploadLoading, setIsImageUploadLoading] = useState(false)
    const navigate = useNavigate()
    const handleProfilePhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (!file || file.length === 0) return;
        setIsImageUploadLoading(true)
        const form = new FormData();
        form.set("image", file[0]);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
                method: "POST",
                body: form
            });

            if (!res.ok) {
                setIsImageUploadLoading(false)
                toast.error('Image upload failed');
            }

            const data = await res.json();
            if (data?.data?.display_url) {
                toast.success("Image upload successfully")
                setProfilePhoto(data?.data?.display_url);
            }
            setIsImageUploadLoading(false)
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };




    const registerUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        const form = (e.target) as HTMLFormElement;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 6) {
            return setError("Password must be at least 6 characters long.")
        }

        const payload = { name, email, password, profilePhoto }
        try {
            const res: any = await register(payload)
            if (res?.data?.success) {
                toast.success(res.data.message)
                navigate("/")
            }
            // console.log(res.error.data.success,88);
            if (res?.error?.data?.success == false) {
                // console.log(false);
                setError(res.error.data.message)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Please Register!</h2>
                        <form onSubmit={registerUser}>

                            <div className="mb-4">

                                <div className={`form-control w-full mt-4`}>
                                    <label htmlFor='name' className="label">
                                        <span className={"label-text text-base-content "}>Name</span>
                                    </label>
                                    <input name='name' required id='name' placeholder='' className="input  input-bordered w-full " />
                                </div>

                                <div className={`form-control w-full mt-4`}>
                                    <label htmlFor='profilePhoto' className="label">
                                        <span className={"label-text text-base-content "}>Profile Photo</span>
                                    </label>
                                    {isImgUploadLoading ? <span className="loading loading-dots loading-lg"></span> : <input onChange={handleProfilePhotoUpload} multiple={false} accept="image/*" name='profilePhoto' id='profilePhoto' type="file" className="file-input file-input-bordered w-full " />}
                                </div>


                                <div className={`form-control w-full mt-4`}>
                                    <label htmlFor='email' className="label">
                                        <span className={"label-text text-base-content "}>Email</span>
                                    </label>
                                    <input name='email' required id='email' placeholder='' className="input  input-bordered w-full " />
                                </div>

                                <div className={`form-control w-full mt-4`}>
                                    <label htmlFor='password' className="label">
                                        <span className={"label-text text-base-content"}>Password</span>
                                    </label>
                                    <input name='password' required id='password' placeholder='' className="input  input-bordered w-full " />
                                </div>

                            </div>



                            {error && <p className={`text-center  text-error mt-8`}>{error}</p>}

                            <button disabled={isLoading || isImgUploadLoading} type="submit" className={"btn mt-2 w-full btn-primary"}>{isLoading || isImgUploadLoading ? "Loading..." : "Register"}</button>

                            <div className='text-center mt-4'>Alrady have an account? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register