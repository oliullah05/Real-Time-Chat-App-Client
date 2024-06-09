// import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon'
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import LandingIntro from '../shared/LandingIntro'
import successIcon from "../../assets/icon/mail-success.svg"

function ForgotPassword() {



    const [loading, setLoading] = useState(false)
    const [linkSent, setlinkSent] = useState(false)


    console.log({ linkSent });
    const sendResetLink = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setlinkSent(true)
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        {!linkSent && <h2 className='text-2xl font-semibold mb-2 text-center'>Forgot Password</h2>}

                        {
                            linkSent &&
                            <>
                                {/* <div className="w-fit  rounded "> */}
                                    {/* <div className="card shrink-0 w-full shadow-2xl bg-base-100"> */}
                                        <form className="p-8">
                                            <div className="form-control">
                                                {/* bro you can enter company logo here */}
                                                <div className="mb-4 flex justify-center">
                                                    <h1 className="text-2xl font-bold">Email Send Succesfully !</h1>
                                                </div>
                                            </div>
                                            <div className="flex justify-center text-4xl mb-4">
                                                <img src={successIcon} className='h-20 w-20' />
                                            </div>
                                            <h2 className="mt-2 text-center">
                                                An email has been sent to <span className="font-semibold"> dummyemail@test.com </span>with instructions for resetting your password
                                            </h2>

                                            <h2 className="mt-2 text-center">
                                                This email may take a few minutes to arrive in your inbox .
                                            </h2>
                                            <div>
                                                <h3 className="font-semibold mt-6">
                                                    <Link target='_blank' to="https://mail.google.com/mail/u/0/#inbox" className="flex justify-center text-blue-700 ">
                                                        Go to your mail
                                                    </Link>
                                                </h3>
                                            </div>
                                        </form>
                                    {/* </div> */}
                                {/* </div> */}

                            </>
                        }

                        {
                            !linkSent &&
                            <>
                                <p className='my-8 font-semibold text-center'>We will send password reset link on your email Id</p>
                                <form onSubmit={sendResetLink}>

                                    <div className={`form-control w-full mt-4`}>
                                        <label htmlFor='email' className="label">
                                            <span className={"label-text text-base-content "}>Email</span>
                                        </label>
                                        <input required name='email' id='email' placeholder='' className="input  input-bordered w-full " />
                                    </div>

                                    {/* <ErrorText styleClass="mt-12">{errorMessage}</ErrorText> */}
                                    <button type="submit" className={"btn mt-4 w-full btn-primary" + (loading ? " loading" : "")}>Send Reset Link</button>

                                    <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><button className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</button></Link></div>
                                </form>
                            </>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword