
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../redux/features/auth/authApi'
import LandingIntro from '../shared/LandingIntro'
import { toast } from 'sonner'



function Login() {
    const [login, { isLoading }] = useLoginMutation()
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const loginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        const form = (e.target) as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;
        const payload = { email, password }

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await login(payload)
            if (res?.data?.success) {
                toast.success(res?.data?.message)
                navigate("/")
            }
            // console.log(res.error.data.success,88);
            if (res?.error?.data?.success == false) {
                // console.log(false);
                setError(res.error.data.message)
            }
        }
        catch (err) {
            // console.log(err,788888);
        }

    }
    // console.log(error);

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                        <form onSubmit={loginUser}>

                            <div className="mb-4">

                                <div className={`form-control w-full mt-4`}>
                                    <label htmlFor='email' className="label">
                                        <span className={"label-text text-base-content "}>Email</span>
                                    </label>
                                    <input defaultValue={"mdolihasan@gmail.com"} required name='email' id='email' placeholder='' className="input  input-bordered w-full " />
                                </div>

                                <div className={`form-control w-full mt-4`}>
                                    <label htmlFor='password' className="label">
                                        <span className={"label-text text-base-content "}>Password</span>
                                    </label>
                                    <input defaultValue={"111111"} required name='password' id='password' placeholder='' className="input  input-bordered w-full " />
                                </div>

                            </div>

                            <div className='text-right text-primary'>
                                <Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span>
                                </Link>
                            </div>

                            {error && <p className={`text-center  text-error mt-8`}>{error}</p>}

                            <button disabled={isLoading} type="submit" className={"btn mt-2 w-full btn-primary"}>{isLoading ? "loading..." : "Login"}</button>

                            <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login