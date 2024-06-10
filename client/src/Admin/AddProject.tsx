import React, { ChangeEvent, useEffect, useState } from 'react';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Modal from '../components/Modal';


interface FormData {
  name_project: string;
  banner: string;
  details: string;
  techstack: string;
  livelink?: string;
  githublink: string;
}

type Project = {
  _id: string;
  name_project: string;
  description: string;
  banner: string;
  githubLink: string;
  livelink: string;
  details: string;
  slug: string;
  techstack: string;
};

interface User {
  isAdmin: boolean;
  profilePicture: string;
}

const AddProject: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ name_project: '', banner: '', details: '', techstack: '', livelink: '', githublink: '' });
  console.log(formData)
  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User | null;
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/project/get-projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data.projects);
        } else {
          throw new Error('Failed to fetch Projects');
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
      };

      const res = await fetch('/api/project/create-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const project = await res.json();
      if (!res.ok) {
        toast.error(project.message);
      } else {
        toast.success('Project is uploaded successfully');
        navigate(`/projects/${project.slug}`);
      }
    } catch (err) {
      toast.error('Oops! The Project was not uploaded');
    }
  };

  const handleDelete = (projectId: string) => {
    setShowModal(true);
    setProjectToDelete(projectId);
  };

  const confirmDelete = async () => {
    if (projectToDelete) {
      try {
        const res = await fetch(`/api/project/delete-project/${projectToDelete}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setProjects(projects.filter((project) => project._id !== projectToDelete));
          toast.success('Project deleted successfully');
        } else {
          toast.error('Failed to delete project');
        }
      } catch (err) {
        toast.error('An error occurred while deleting the project');
      } finally {
        setShowModal(false);
        setProjectToDelete(null);
      }
    }
  };

  return (
    <MaxWidthWrapper className="flex mx-auto">
      <Toaster />
      <Modal show={showModal} onClose={() => setShowModal(false)} onConfirm={confirmDelete} />
      <div className="w-full max-w-4xl mx-auto mt-10 mb-10">
        <h1 className="text-center font-bold text-xl mb-8">
          <span className="text-green-600 font-bold mr-2 text-xl">Add</span>Projects
        </h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name of the Project</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name_project"
              type="text"
              placeholder="Enter the name of the Project"
              value={formData.name_project}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Link of the Banner of the Project</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="banner"
              type="url"
              placeholder="https://text-banner.com"
              value={formData.banner}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Details of the Project</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="details"
              placeholder="This project is made with ...."
              value={formData.details}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tech-Stack Used</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="techstack"
              type="text"
              placeholder="React Next etc."
              value={formData.techstack}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Live Link</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="livelink"
              type="url"
              placeholder="https://debayanghosh.com"
              value={formData.livelink}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Github Link</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="githublink"
              type="url"
              placeholder="https://github.com/felixoder/portfolio"
              value={formData.githublink}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <h2 className="text-2xl font-semibold mb-4">Existing Projects</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {projects.map((project) => (
             <Link key={project._id} to={`/projects/${project.slug}`} className="block">
            <div key={project._id} className="block">


             
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 h-full flex flex-col">
                <img src={project.banner} alt={project.name_project} className="w-full h-32 object-cover" />
                <div className="p-3 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold mb-1 line-clamp-1">{project.name_project}</h3>
                  <p className="text-gray-600 text-sm mb-2 flex-grow line-clamp-2">{project.details}</p>
                  <div className="flex space-x-2 mt-auto">
                    {currentUser && currentUser.isAdmin && (
                      <>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md hover:bg-gray-700 flex-1 text-center"
                        >
                          Delete
                        </button>
                        <Link
                          to={`/edit-project/${project._id}`}
                          className="bg-green-600 text-white text-xs px-2 py-1 rounded-md hover:bg-green-500 flex-1 text-center"
                        >
                          Edit
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
            </div>
            </Link>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default AddProject;
