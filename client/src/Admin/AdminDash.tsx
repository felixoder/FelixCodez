import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import MessageModal from '../components/MessageModal';

type Project = {
  _id: string;
  name_project: string;
  description: string;
  banner: string;
  githublink: string;
  livelink: string;
  details: string;
  slug: string;
  techstack: string;
};

type Skill = {
  name_skill: string;
  banner: string;
  experience_level: string;
};
type Message = {
  _id:string,
  email: string,
  message: string
}

const AdminDash: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [messages,setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes, messageRes] = await Promise.all([
          fetch('/api/project/get-projects'),
          fetch('/api/skill/get-skills'),
          fetch('/api/message/get-message')
        ]);

        if (projectsRes.ok && skillsRes.ok && messageRes.ok) {
          const projectsData = await projectsRes.json();
          const skillsData = await skillsRes.json();
          const messageData = await messageRes.json();
          setProjects(projectsData.projects);
          setSkills(skillsData.skills);
          setMessages(messageData.message)
        } else {
          throw new Error("Failed to fetch Projects or Skills or Message");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <MaxWidthWrapper>
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin w-12 h-12 text-green-600" />
        </div>
      </MaxWidthWrapper>
    );
  }

  const handleDelete = (projectId: string) => {
    setShowModal(true);
    setMessageToDelete(projectId);
  };

  const confirmDelete = async () => {
    if (messageToDelete) {
      try {
        const res = await fetch(`/api/message/delete-message/${messageToDelete}`, {
          method: 'DELETE',
        });
        setLoading(true)

        if (res.ok) {
          setLoading(true)
          setMessages(messages.filter((message) => message._id !== messageToDelete));
          toast.success('Project deleted successfully');
          setLoading(false)
        } else {
          setLoading(false)
          toast.error('Failed to delete project');
        }
      } catch (err) {
        toast.error('An error occurred while deleting the project');
      } finally {
        setShowModal(false);
        setMessageToDelete(null);
      }
    }
  };

  return (
    <div>
      <Toaster/>
      <MessageModal show={showModal} onClose={() => setShowModal(false)} onConfirm={confirmDelete} />
      <h1 className="text-center font-bold text-2xl">
        Hello, <span className="text-green-600 font-semibold">Debayan</span>
      </h1>

      <MaxWidthWrapper>
   
        <div>
          <h1 className='text-center font-bold text-3xl mt-5 underline'>My <span className='text-green-600 font-bold'>Projects</span></h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10">
            {projects.map((project) => (
              <Link key={project._id} to={`/projects/${project.slug}`} className="block">
                <div key={project._id} className="block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 h-full flex flex-col">
                    <img src={project.banner} alt={project.name_project} className="w-full h-32 object-cover" />
                    <div className="p-3 flex-grow flex flex-col">
                      <h3 className="text-lg font-semibold mb-1 line-clamp-1">{project.name_project}</h3>
                      <p className="text-gray-600 text-sm mb-2 flex-grow line-clamp-2">{project.details}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h1 className='text-center font-bold text-3xl mt-5 underline'>My <span className='text-green-600 font-bold'>Skills</span></h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10">
            {skills.map((skill) => (
              <div key={skill.name_skill} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 w-full sm:w-auto lg:h-[210px] lg:w-[200px]">
                <img src={skill.banner} alt={skill.name_skill} className="w-full h-32 object-cover" />
                <div className="p-4 flex-grow flex flex-col">
                  <h2 className="text-lg font-semibold mb-2">{skill.name_skill}</h2>
                  <p className="text-gray-600 mb-4">
                    <span className="text-green-600 text-sm">{skill.experience_level}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className='text-center font-bold text-3xl mt-5 underline'>Pending <span className='text-green-600 font-bold'>Messages</span></h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-1 mt-10">
          {messages.map((message, index) => (
          <div key={index} className="flex items-center mt-4 border-b border-gray-300 pb-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center border border-black">
              <img src="/users/user-1.png" alt="User Avatar" className="h-full w-full rounded-full object-cover" />
            </div>
            <div className="ml-4">
              <p className="text-gray-800 font-bold">{message.email}</p>
              <p className="text-gray-600">{message.message}</p>
              <button
                          onClick={() => handleDelete(message._id)}
                          className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md hover:bg-gray-700 flex-1 text-center w-[50px]"
                        >
                          Read
                        </button>
            </div>
          </div>
        ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default AdminDash;
