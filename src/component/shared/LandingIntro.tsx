import logo from "../../assets/chat-app-logo.jpg"
import login from "../../assets/login.png"

function LandingIntro() {

    return (
      <div className="hero min-h-full rounded-l-xl bg-base-200">
        <div className="hero-content py-12">
          <div className="max-w-md">
  
            <h1 className='text-3xl text-center font-bold '>
                <img src={logo} className="w-12 inline-block mr-2 mask mask-circle" alt="dashwind-logo" />
                Main Features
                </h1>
  


            <div className="text-center mt-12">
                <img src={login} alt="Dashwind Admin Template" className="w-48 inline-block"></img></div>
  
         
            <h1 className="text-2xl mt-8 font-bold">Real Time Chat Application</h1>
            <p className="py-2 mt-4">✓ <span className="font-semibold">Light/dark</span> mode toggle</p>
            <p className="py-2 ">✓ <span className="font-semibold">Redux toolkit</span> and other utility libraries configured</p>
            <p className="py-2">✓ <span className="font-semibold">Calendar, Modal, Sidebar </span> components</p>
            <p className="py-2  ">✓ User-friendly <span className="font-semibold">documentation</span></p>
            <p className="py-2  mb-4">✓ <span className="font-semibold">Daisy UI</span> components, <span className="font-semibold">Tailwind CSS</span> support</p>
  
          </div>
  
        </div>
      </div>
    )
  
  }
  
  export default LandingIntro