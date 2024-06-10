import React, { ChangeEvent, useEffect, useState } from 'react';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

interface FormData {
    name_project: string;
    banner: string;
    details: string;
    techstack: string;
    livelink?: string;
    githublink: string;
}

const EditProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name_project: '',
    banner: '',
    details: '',
    techstack: '',
    livelink: '',
    githublink: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/project/get-projects?projectId=${projectId}`);
        if (res.ok) {
          const data = await res.json();
          // Assuming the API returns the project details under 'projects'
          const projectDetails = data.projects[0];
          setFormData({
            name_project: projectDetails.name_project,
            banner: projectDetails.banner,
            details: projectDetails.details,
            techstack: projectDetails.techstack,
            livelink: projectDetails.livelink || '', // Providing default value if livelink is undefined
            githublink: projectDetails.githublink
          });
        } else {
          throw new Error('Failed to fetch project');
        }
      } catch (err) {
        toast.error('Error fetching project details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProject();
  }, [projectId]);
  

  
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/project/update-project/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const project = await res.json();
      if (!res.ok) {
        toast.error(project.message);
      } else {
        toast.success('Project updated successfully');
        navigate(`/projects/${project.slug}`);
      }
    } catch (err) {
      toast.error('Oops! The project was not updated');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MaxWidthWrapper className="flex mx-auto">
      <Toaster />
      <div className="w-full max-w-4xl mx-auto mt-10 mb-10">
        <h1 className="text-center font-bold text-xl mb-8">
          <span className="text-green-600 font-bold mr-2 text-xl">Edit</span> Project
        </h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name_project">
              Name of the Project
            </label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="banner">
              Link of the Banner of the Project
            </label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
              Details of the Project
            </label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="techstack">
              Tech-Stack Used
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="techstack"
              type="text"
              placeholder="React, Next etc."
              value={formData.techstack}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="livelink">
              Live Link
            </label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="githublink">
              Github Link
            </label>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </MaxWidthWrapper>
  );
};

export default EditProject;
