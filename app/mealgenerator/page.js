'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MealGeneratorPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    dietType: '',
    mealsPerDay: 3
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to planner page with query params
    router.push(`/mealgenerator/planner?page=1&age=${formData.age}&gender=${formData.gender}&dietType=${formData.dietType}&mealsPerDay=${formData.mealsPerDay}`);
  };

  return (
    <div>
      <h1>Meal Generator</h1>
      <form onSubmit={handleSubmit}>
        {/* Age */}
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label>Gender:</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Diet Type */}
        <div>
          <label>Diet Type:</label>
          <input
            type="text"
            value={formData.dietType}
            onChange={(e) => setFormData({ ...formData, dietType: e.target.value })}
            required
          />
        </div>

        {/* Meals Per Day */}
        <div>
          <label>Meals Per Day:</label>
          <input
            type="number"
            value={formData.mealsPerDay}
            onChange={(e) => setFormData({ ...formData, mealsPerDay: e.target.value })}
            required
          />
        </div>

        <button type="submit">Generate Meal Plan</button>
      </form>
    </div>
  );
};

export default MealGeneratorPage;
