import { useEffect, useRef } from "react";
import { dummyMessageData } from "./message.const";
import { toast } from "sonner";
interface TMessage {
    id: string;
    message: string;
    type: string;
    fileName: string
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    conversationId: string;
    senderId: string;
}
const MessageInbox = () => {

    // return (
    //     <section className="min-h-[76.5vh] max-h-[76.5vh] overflow-y-auto overflow-hidden custom-scrollbar mt-4 ">

    //        <div className="  mt-5">
    //        {
    //             dummyMessageData.slice(0, 10).map((data: TMessage, index) => 
    //             <section className={` flex  ${index % 2 == 0 ? "justify-end " : " justify-start"}`} >
    //                 {/* ${index%2===0?"text-left":"text-right"} */}
    //                 {<div className={`max-w-[70%] `}>
    //                     <p className={` 
    //                         ${data.message.length < 113 ? "w-max" : ""} px-4 py-2 my-5 rounded-lg   ${index % 2 == 0 ? " bg-[#CDCDCD] " : " bg-[#FFFFFF]"}
    //                         `}


    //                         >{data.message}</p>
    //                 </div>

    //                 }
    //             </section>
    //             )
    //         }
    //        </div>

    //     </section>
    // );



    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
    };

    useEffect(() => {
        scrollToBottom();

    }, []);





    // for downloading all files

    const downloadFileAtURL = (url: string, fileName: string) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onload = () => {
                    const dataURL = reader.result as string;
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.href = dataURL;
                    a.download = fileName as string;
                    a.click();
                    window.URL.revokeObjectURL(dataURL);
                    document.body.removeChild(a);
                };
                reader.readAsDataURL(blob);
            })
            .catch(() => toast.error('Download failed'));
    };



    // better downloding all file function if needed

    //  const downloadFileAtURL = (fileUrl: string,fileName:string) => {
    //         fetch(fileUrl)
    //             .then(response => {

    //                 if (!response.ok) {
    //                     toast.error('Downloading error..');
    //                 }
    //                 return response.blob();
    //             })
    //             .then(blob => {
    //                 const url = window.URL.createObjectURL(new Blob([blob]));
    //                 const link = document.createElement('a');
    //                 link.href = url;
    //                 link.setAttribute('download', fileName); // Set your file name here
    //                 document.body.appendChild(link);
    //                 link.click();
    //                 link!.parentNode!.removeChild(link);
    //                  // Clean up the URL object
    //                  window.URL.revokeObjectURL(url);
    //             })
    //             .catch(error => toast.error('Error downloading file:'));
    //     };



    return (

        <section className="min-h-[76.5vh] max-h-[76.5vh] overflow-y-auto overflow-hidden custom-scrollbar mt-4 ">

            <div className="  mt-5">


                {
                    dummyMessageData.map((data: TMessage, index: number) =>
                        <section className={` flex  ${index % 2 == 0 ? "justify-end " : " justify-start"}`} >
                            {/* ${index%2===0?"text-left":"text-right"} */}




                            {/* for text message*/}
                            {/* {
                                data.type === "text" && <div className={`max-w-[70%] `}>
                                    <p className={` 
                                ${data.message.length < 113 ? "w-max" : ""} px-4 py-2 my-5 rounded-lg   ${index % 2 == 0 ? " bg-[#CDCDCD] " : " bg-[#FFFFFF] "}
                                `}
                                    >{data.message}</p>
                                </div>

                            } */}
                            {/*   text message end */}





                            {/* for image */}

                            {/* 
                            {
                            data.type === "image" && <div className={`max-w-[70%] `}>
                                <img className={` glass
                                 px-4 py-2 my-5 rounded-lg  
                                `} src={data.message} ></img>
                            </div>
                            } */}


                            {/* for image end */}











                            {/* for audio  */}

                            {/* {data.type === "audio" && <div className={`max-w-[70%] `}>
                                <audio className={` 
                                 px-4 py-2 my-5 rounded-lg   ${index % 2 == 0 ? " bg-[#CDCDCD]" : " bg-[#FFFFFF]"}
                                `} src={data.message} controls></audio>
                            </div>

                            } */}

                            {/* audio end

                            {/* for video  */}

                            {/* {
                            data.type === "video" && <div className={`max-w-[70%] `}>
                                <video className={` w-96
                                 px-4 py-2 my-5 rounded-lg   ${index % 2 == 0 ? " bg-[#CDCDCD]" : " bg-[#FFFFFF]"}
                                `} src={data.message} controls></video>
                            </div>
                            } */}

                            {/* video end */}


                            {/* for document */}

                            {(data.type === "document" ||
                                data.type === "code" ||
                                data.type == "web" ||
                                data.type === "data" ||
                                data.type === "script")
                                && data.id == "4" && <div>
                                    {/* <FaFileAlt /> */}
                                    {/* http://res.cloudinary.com/dvmtzwxci/raw/upload/v1718423938/ugn6sqmhi3hqmchk88mn.zip */}
                                    <button className="p- btn btn-primary" onClick={() => downloadFileAtURL(data.message, data.fileName)}>Download Rar</button>
                                    {/* <button className="p-5 btn" onClick={downloadFile}>Download  2</button> */}
                                </div>}
                            {/* for document */}


                        </section>
                    )
                }







                <div className="" ref={messagesEndRef} > </div>
            </div>

        </section>

    );
};

export default MessageInbox;