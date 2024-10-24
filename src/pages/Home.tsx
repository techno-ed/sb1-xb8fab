import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import { Teacher } from '../types';
import toast from 'react-hot-toast';

export const Home = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/teachers');
        setTeachers(response.data);
      } catch (error) {
        toast.error('Failed to fetch teachers');
      }
    };

    fetchTeachers();
  }, []);

  const toggleFavorite = async (teacherId: string) => {
    try {
      await axios.post(`http://localhost:3000/api/favorites/${teacherId}`);
      setFavorites(prev => 
        prev.includes(teacherId) 
          ? prev.filter(id => id !== teacherId)
          : [...prev, teacherId]
      );
      toast.success('Favorite updated');
    } catch (error) {
      toast.error('Failed to update favorite');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="relative h-48">
                <img
                  src={teacher.imageUrl}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(teacher.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      favorites.includes(teacher.id)
                        ? 'text-red-500 fill-current'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
              <div className="px-4 py-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {teacher.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{teacher.subject}</p>
                <p className="mt-2 text-sm text-gray-600">
                  {teacher.description}
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {teacher.experience} years experience
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};