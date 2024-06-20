import React, { useRef } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { BsFillSendFill } from "react-icons/bs";
import { FaPaperclip } from "react-icons/fa6";
import { toast } from "sonner";
const MessageInput: React.FC = () => {


    // upload file functions
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const determineFileType = (file: File) => {
        const extension = file.name.split('.').pop()?.toLowerCase();

        const fileTypeMap: { [key: string]: string } = {
            'txt': 'document',
            'rar': 'archive',
            'zip': 'archive',
            'tar': 'archive',
            '7z': 'archive',
            'doc': 'document',
            'docx': 'document',
            'rtf': 'document',
            'pdf': 'document',
            'jpeg': 'image',
            'jpg': 'image',
            'png': 'image',
            'gif': 'image',
            'heif': 'image',
            'webp': 'image',
            'aac': 'audio',
            'mp3': 'audio',
            'wav': 'audio',
            'amv': 'video',
            'mpeg': 'video',
            'mp4': 'video',
            'flv': 'video',
            'avi': 'video',
            'webm': 'video',
            'c': 'code',
            'cpp': 'code',
            'h': 'code',
            'hpp': 'code',
            'java': 'code',
            'py': 'code',
            'js': 'code',
            'ts': 'code',
            'html': 'web',
            'htm': 'web',
            'asp': 'web',
            'css': 'web',
            'scss': 'web',
            'xhtml': 'web',
            'xml': 'web',
            'json': 'web',
            // Add other file types as needed
        };

        return fileTypeMap[extension || ''] || 'unknown';
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const data = new FormData();
            data.append("file", files[0]);
            data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
            data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

            // Determine the resource type based on the file type
            const fileType = files[0].type;
            let resourceType = 'auto'; // Default to auto, which lets Cloudinary decide

            if (fileType.startsWith('image/')) {
                resourceType = 'image';
            } else if (fileType.startsWith('video/')) {
                resourceType = 'video';
            } else {
                resourceType = 'raw';
            }

            try {
                const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`, {
                    method: "POST",
                    body: data
                });

                const cloudData = await res.json();
                if (cloudData.url) {
                    const fileUrl = cloudData.url;
                    const fileType = determineFileType(files[0]);

                    // Save the URL and type to your database
                    // await saveFileDataToDatabase(fileUrl, fileType);

                    console.log({ fileUrl, fileType });
                    toast.success("File Upload Successfully");
                } else {
                    toast.error(cloudData.error.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };





    // upload voice messages functions
    const handleAudioUpload = async (audioFile: File) => {
        if (audioFile) {
            const data = new FormData();
            data.append("file", audioFile);
            data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
            data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

            // Determine the resource type based on the file type

            try {
                const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`, {
                    method: "POST",
                    body: data
                });

                const cloudData = await res.json();
                if (cloudData.url) {
                    console.log(cloudData.url)
                    toast.success("Voice Upload Successfully");
                } else {
                    toast.error(cloudData.error.message);
                }
            } catch (error) {
                console.log(error);
            }
        }

    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addAudioElement = (blob: any) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);

        // Upload the audio file when recording is complete
        handleAudioUpload(blob);
    };

                                                                                    // all extra work
    // const handleDownload = async (url: string) => {
    //     try {
    //       const response = await fetch(url);
    //       const blob = await response.blob();

    //       // Create a link element
    //       const link = document.createElement('a');
    //       link.href = URL.createObjectURL(blob);
    //       link.download = "downloaded_file.zip";
    //       document.body.appendChild(link);
    //       link.click();
    //       document.body.removeChild(link);
    //       toast.success("File Downloaded Successfully");
    //     } catch (error) {
    //       console.error('Error downloading file:', error);
    //       toast.error("Failed to download file");
    //     }
    //   };

    // const downloadFileAtURL = (url) => {
    //     const fileName = "any.pdf";
    //     fetch(url)
    //         .then(response => response.blob())
    //         .then(blob => {
    //             const reader = new FileReader();
    //             reader.onload = () => {
    //                 const a = document.createElement('a');
    //                 a.style.display = 'none';
    //                 document.body.appendChild(a);
    //                 a.href = reader.result;
    //                 a.download = fileName;
    //                 a.click();
    //                 window.URL.revokeObjectURL(reader.result);
    //                 document.body.removeChild(a);
    //             };
    //             reader.readAsDataURL(blob);
    //         })
    //         .catch(error => console.error('Download failed', error));
    // };

                                                                    // final function

                                                                    

    // const downloadFile = () => {
    //     const fileUrl = "https://www.dropbox.com/scl/fi/2ymocgzv2gbrwt8yryrxx/Oli-Nid.pdf?rlkey=u88jbg8berdb0njxosx99aum2&st=6u4ary5c&dl=0";

    //     fetch(fileUrl)
    //         .then(response => {
    //             console.log({ response });
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.blob();
    //         })
    //         .then(blob => {
    //             const url = window.URL.createObjectURL(new Blob([blob]));
    //             const link = document.createElement('a');
    //             link.href = url;
    //             link.setAttribute('download', 'download.pdf'); // Set your desired file name here
    //             document.body.appendChild(link);
    //             link.click();
    //             link.parentNode.removeChild(link);
    //              // Clean up the URL object
    //              window.URL.revokeObjectURL(url);
    //         })
    //         .catch(error => console.error('Error downloading file:', error));
    // };
    return (
        <section className="py-2 relative">
            <input
                type="text"
                placeholder="Write a message"
                className="h-[4rem] focus:outline-none rounded-md p-6 w-full bg-[#FFFFFF]"
            />

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />

            <button
                type="button"
                className="absolute inset-y-0 right-1 flex items-center px-2 text-gray-500"
            >
                <div className="flex gap-3">
                    <FaPaperclip
                        className="w-10 h-10 px-2 py-3 text-[#212529e3] rounded-lg bg-[#e6e6e6c0]"
                        onClick={handleFileIconClick}
                    />
                    {/* <FaMicrophone
                        className="w-10 h-10 px-2 py-3 text-[#212529e3] rounded-lg bg-[#e6e6e6c0]"
                    /> */}
                    <AudioRecorder
                        onRecordingComplete={addAudioElement}
                        audioTrackConstraints={{
                            noiseSuppression: true,
                            echoCancellation: true,
                        }}
                        showVisualizer
                        // downloadOnSavePress={true}
                        downloadFileExtension="webm"
                    // className="w-10 h-10 px-2 py-3 text-[#212529e3] rounded-lg bg-[#e6e6e6c0]"
                    />
                    <BsFillSendFill
                        className="w-10 h-10 px-2 py-3 text-white rounded-lg bg-[#269A54]"
                    />
                </div>
            </button>
            {/* <iframe
                        src={`http://res.cloudinary.com/dvmtzwxci/raw/upload/v1718421621/epiexjyild7npgsfuszu.pdf`}
                      className="bg-red-200" 
                    /> */}


            <div>
                {/* <FaFileAlt /> */}
                {/* http://res.cloudinary.com/dvmtzwxci/raw/upload/v1718423938/ugn6sqmhi3hqmchk88mn.zip */}
                {/* <button className="p-5 btn" onClick={()=>downloadFileAtURL("http://res.cloudinary.com/dvmtzwxci/raw/upload/v1718430078/np98pdltouyf6jhmeqvt.html")}>Download Rar</button> */}
                {/* <button className="p-5 btn" onClick={downloadFile}>Download  2</button> */}
            </div>








            {/*  
.txt
http://res.cloudinary.com/dvmtzwxci/raw/upload/v1718422439/c2knrzl2ggpdlx1z3leq.txt

.audio
https://res.cloudinary.com/dvmtzwxci/video/upload/v1718879351/audio_s4byt7.webm

.video
https://youtu.be/Ag3zMEJtHAA?si=vfWYe4IRMPYoV9aZ
.pdf
http://res.cloudinary.com/dvmtzwxci/raw/upload/v1718425987/y5rbvnteyavm7awbpki1.pdf

.json
http://res.cloudinary.com/dvmtzwxci/raw/upload/v1718428358/j9jmahrrlkivppbgufjm.json

.js
http://res.cloudinary.com/dvmtzwxci/raw/upload/v1718428530/rfxvshhgqb0p6ijm959m.js

.html
http://res.cloudinary.com/dvmtzwxci/raw/upload/v1718430078/np98pdltouyf6jhmeqvt.html

.docx
http://res.cloudinary.com/dvmtzwxci/raw/upload/v1718430239/h6ejsrnmz7gkvhznogqr.docx

.rtf
http://res.cloudinary.com/dvmtzwxci/raw/upload/v1718430539/okahdpxhm3uvtbbzyghi.rtf

.rar
http://res.cloudinary.com/dvmtzwxci/raw/upload/v1718430876/xe5nc36zutaufdxy75lj.zip
*/}
            {/* <iframe
                        src={`http://res.cloudinary.com/dvmtzwxci/raw/upload/v1718422439/c2knrzl2ggpdlx1z3leq.txt`}
                      className="bg-red-200 w-full" 
                      
                    /> */}
        </section>
    );
};

export default MessageInput;


