
import { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import LandingIntro from './LandingIntro'

const loading = false
function Login() {

    const loginUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

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
                                    <input name='email' id='email' placeholder='' className="input  input-bordered w-full " />
                                </div>

                                <div className={`form-control w-full mt-4`}>
                                    <label htmlFor='password' className="label">
                                        <span className={"label-text text-base-content "}>Password</span>
                                    </label>
                                    <input name='password' id='password' placeholder='' className="input  input-bordered w-full " />
                                </div>

                            </div>

                            <div className='text-right text-primary'>
                                <Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span>
                                </Link>
                            </div>

                            <p className={`text-center  text-error mt-8`}>{""}</p>

                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>

                            <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login