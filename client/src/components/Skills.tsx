import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Loader } from 'lucide-react';

type Skill = {
  name_skill: string;
  banner: string;
  experience_level: string;
};

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('/api/skill/get-skills');
        if (res.ok) {
          const data = await res.json();
          setSkills(data.skills);
        } else {
          throw new Error("Failed to fetch Skills");
        }
      } catch (err) {
        throw new Error("Failed to fetch Skills");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
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
      <h1 className='text-center font-bold mt-10 text-3xl'>Huh! Wanna Know <span className='text-green-600 font-bold'>My Skills</span></h1>
      <div className="flex flex-col items-center md:flex-row md:justify-between mt-10 mb-10">
        {/* Pointing-down image for small devices */}
        <img src="/pointing-down.png" className="block md:hidden h-50 w-40 mt-4 order-1 md:order-2" alt="Pointing down" />
        
        {/* Skills cards */}
        <div className="order-2 md:order-1  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  ">
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
        
        {/* Remove image for medium and above devices */}
        <div className="hidden md:block h-full w-full md:w-auto ">
          <img src="/pointing-right.png" className="w-90 h-90" alt="Remove" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Skills;
