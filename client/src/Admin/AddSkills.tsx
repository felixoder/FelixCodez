import React, { ChangeEvent, useState } from 'react'
import MaxWidthWrapper from '../components/MaxWidthWrapper'
import toast, {Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
interface FormData {
    name_skill: string;
    banner: string;
    experience_level: string
   
  }
const AddSkills: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ name_skill: '', banner: '', experience_level: ''});
    const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement  | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const skillData = {...formData};

      const res = await fetch('/api/skill/add-skill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillData),
      });
      const skill = await res.json();
      if (!res.ok) {
        toast.error(skill.message);
      } else {
        toast.success('Skill is uploaded successfully');
        navigate('/skills')
        
      }


    } catch (e) {
      toast.error('Check it again')
      
    }

  }

  return (

    <MaxWidthWrapper>
      <Toaster/>
<div className="w-full max-w-md mx-auto mt-10 mb-10">
        <h1 className="text-center font-bold text-xl mb-8">
          <span className="text-green-600 font-bold mr-2 text-xl">Add</span>Skills
        </h1>
<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name of the Skills</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name_skill"
              type="text"
              placeholder="Enter the name of the Skill You have learnt"
              value={formData.name_skill}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image Link</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="banner"
              type="url"
              placeholder="https://skill.png"
              value={formData.banner}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Experience Level</label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="experience_level" value={formData.experience_level}
              onChange={handleChange}
            >
              <option value="" disabled selected>Select your experience level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
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
        </div>
    </MaxWidthWrapper>
  )
}

export default AddSkills