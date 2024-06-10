import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { Loader } from 'lucide-react';


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

const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

const TechStackItem: React.FC<{ tech: string }> = ({ tech }) => {
  const color = stringToColor(tech);
  const textColor = parseInt(color.replace('hsl(', '').split(',')[0]) > 180 ? 'text-gray-900' : 'text-white';

  return (
    <span
      style={{ backgroundColor: color }}
      className={`px-4 py-2 rounded-full text-sm font-medium shadow-md transform hover:scale-105 transition duration-300 ${textColor}`}
    >
      {tech}
    </span>
  );
};

const ProjectPage: React.FC = () => {
  interface User {
    isAdmin: boolean;
    profilePicture: string;
  }

  const currentUser = useSelector((state: RootState) => state.user.currentUser) as User | null;
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/project/get-projects?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data.projects[0]);
        } else {
          throw new Error('Failed to fetch project');
        }
      } catch (err) {
        console.error('Error fetching project details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-12 h-12 text-green-600" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-gray-700">
        Project not found
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <img
          src={project.banner}
          alt={project.name_project}
          className="w-full h-64 object-cover object-center"
        />
        <div className="p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            {project.name_project}
          </h1>
          <p className="text-gray-600 text-lg mb-6">{project.details}</p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.techstack.split(' ').map((tech, index) => (
                <TechStackItem key={index} tech={tech} />
              ))}
            </div>
          </div>

          <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
            <a
              href={project.livelink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 text-center"
            >
              View Live Project
            </a>
            <a
              href={project.githublink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full sm:w-auto bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 text-center"
            >
              View on GitHub
            </a>
            {currentUser && currentUser.isAdmin && (
              <a
                href={`/edit-project/${project._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 text-center"
              >
                Edit
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
