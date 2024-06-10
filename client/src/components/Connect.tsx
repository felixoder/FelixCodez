import React, { ChangeEvent, useState } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { CameraIcon, CodeIcon, MessageCircleIcon, NetworkIcon, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast,{Toaster} from 'react-hot-toast'
import SuccessModal from './SuccessModal'

interface FormData {
    email: string;
    message: string;
   
  }
 

const Connect = () => {
    const [formData, setFormData] = useState<FormData>({ email: '', message: '' });
    const [successModalOpen, setSuccessModalOpen] = useState(false); // State to manage success modal visibility
    console.log(formData)
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    




      const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
          const messageData = {
            ...formData,
          };
    
          const res = await fetch('/api/message/send-message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
          });
    
          const project = await res.json();
          if (!res.ok) {
            toast.error(project.message);
          } else {
            toast.success('Message is uploaded successfully');
            setSuccessModalOpen(true);
            setFormData({ email: '', message: '' });
          }
        } catch (err) {
          toast.error('Oops! The Message was not uploaded');
        }
      };
  
      return (
        <MaxWidthWrapper>
          <Toaster />
          <div className="flex flex-col justify-center items-center md:grid grid-cols-2">
            <div className="hidden md:block">
              <img src="/pointing-right.png" alt="" />
            </div>
            <div className="block md:hidden">
              <img src="/pointing-down.png" className="w-40 h-50" alt="" />
            </div>
            <div className="w-full max-w-md mx-auto  mb-10">
              <h1 className="text-center font-bold text-xl">
                Waiting for you <span className="text-green-600 font-semibold">send Message</span>
              </h1>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Your Email</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Pass Your message!</label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="message"
                    placeholder="Can you create a SAAS app"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Success Modal */}
          <SuccessModal
            show={successModalOpen}
            onClose={() => setSuccessModalOpen(false)}
            
          />
          <div className="flex justify-center items-center gap-3">
            <Send className="text-green-600" />
            <h1 className="text-center font-bold text-3xl">Still You can Connect me with </h1>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center">
            <Link to="https://github.com/felixoder" target='__blank' className="flex gap-2">
              <CodeIcon />
              <h1 className="text-md font-semibold">
                <span className="text-green-600 font-bold underline" >Github</span> - Fork me Huh!
              </h1>
            </Link>
            <Link to="https://x.com/DebayanGho59742" target='__blank' className="flex gap-2">
              <MessageCircleIcon />
              <h1 className="text-md font-semibold">
                <span className="text-green-600 font-bold underline">Twitter</span> - let's Retweet!
              </h1>
            </Link>
            <Link to="https://www.linkedin.com/in/debayan-ghosh-1671b4224/" target='__blank' className="flex gap-2">
              <NetworkIcon />
              <h1 className="text-md font-semibold">
                <span className="text-green-600 font-bold underline">Linkdln</span> - Connect!
              </h1>
            </Link>
            <Link to="https://www.instagram.com/felix__12_7/" target='__blank' className="flex gap-2">
              <CameraIcon />
              <h1 className="text-md font-semibold">
                <span className="text-green-600 font-bold underline">Instagram</span> - Share in public
              </h1>
            </Link>
          </div>
        </MaxWidthWrapper>
      );
    };


    
    export default Connect;




