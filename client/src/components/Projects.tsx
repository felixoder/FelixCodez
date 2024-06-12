import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Link } from 'react-router-dom';
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


const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/project/get-projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data.projects);
        } else {
          throw new Error("Failed to fetch Projects");
        }
      } catch (err) {
        console.log("🚀 ~ fetchProjects ~ err:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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

  return (
    <MaxWidthWrapper>
      <div className="py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          Projects of <span className="text-green-600">Debayan</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link key={project._id} to={`/projects/${project.slug}`} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 h-full flex flex-col">
                <img src={project.banner} alt={project.name_project} className="w-full h-48 object-cover" />
                <div className="p-6 flex-grow flex flex-col">
                  <h2 className="text-2xl font-semibold mb-2">{project.name_project}</h2>
                  <p className="text-gray-600 mb-4 flex-grow truncate">{project.details}</p>
                  <p className="text-gray-600 mb-4">
                    Tech Used ~ <span className="text-green-600 text-sm">{project.techstack}</span>
                  </p>
                  <div className="flex space-x-4 mt-auto">
                    <a
                      href={project.githublink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex-1 text-center"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.livelink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 flex-1 text-center"
                    >
                      Live Demo
                    </a>
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

export default Projects;
