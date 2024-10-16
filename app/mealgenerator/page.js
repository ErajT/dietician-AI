
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation'; // Use next/navigation for App directory

// export default function MealPlanForm() {
//   const [calories, setCalories] = useState('');
//   const [excludeIngredients, setExcludeIngredients] = useState('');
//   const [diet, setDiet] = useState('');
//   const [timeFrame, setTimeFrame] = useState('day');
//   const router = useRouter();

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Navigate to the meal planner page with form data
//     router.push(`/mealgenerator/planner?calories=${calories}&excludeIngredients=${excludeIngredients}&diet=${diet}&timeFrame=${timeFrame}`);
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Generate Meal Plan</h1>
//       <form onSubmit={handleSubmit}>
//         <div style={styles.formGroup}>
//           <label>Calories:</label>
//           <input
//             type="number"
//             value={calories}
//             onChange={(e) => setCalories(e.target.value)}
//             placeholder="Calories limit"
//           />
//         </div>
//         <div style={styles.formGroup}>
//           <label>Exclude Ingredients:</label>
//           <input
//             type="text"
//             value={excludeIngredients}
//             onChange={(e) => setExcludeIngredients(e.target.value)}
//             placeholder="Ingredients to exclude"
//           />
//         </div>
//         <div style={styles.formGroup}>
//           <label>Diet:</label>
//           <input
//             type="text"
//             value={diet}
//             onChange={(e) => setDiet(e.target.value)}
//             placeholder="e.g. vegan, keto"
//           />
//         </div>
//         <div style={styles.formGroup}>
//           <label>Time Frame:</label>
//           <select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
//             <option value="day">Day</option>
//             <option value="week">Week</option>
//           </select>
//         </div>
//         <button type="submit">Generate Meal Plan</button>
//       </form>
//     </div>
//   );
// }

// const styles = {
//   container: { padding: '20px', textAlign: 'center' },
//   formGroup: { marginBottom: '10px' },
// };















// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const MealGeneratorPage = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     age: '',
//     gender: '',
//     height: '',
//     weight: '',
//     goalWeight: '',
//     activityLevel: '',
//     dietType: '',
//     allergies: '',
//     dislikedFoods: '',
//     healthConditions: '',
//     mealsPerDay: 4,
//     mealTimes: ['', '', '', ''],
//     caloricGoal: '',
//     budget: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // On form submit, navigate to planner page with query params
//       router.push(
//         `/mealgenerator/planner?page=1&age=${formData.age}&gender=${formData.gender}&height=${formData.height}&weight=${formData.weight}&goalWeight=${formData.goalWeight}&activityLevel=${formData.activityLevel}&dietType=${formData.dietType}&allergies=${formData.allergies}&dislikedFoods=${formData.dislikedFoods}&healthConditions=${formData.healthConditions}&mealsPerDay=${formData.mealsPerDay}&mealTimes=${formData.mealTimes.join(',')}&caloricGoal=${formData.caloricGoal}&budget=${formData.budget}`
//       );
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Meal Generator</h1>
//       <form onSubmit={handleSubmit}>
//         {/* Age */}
//         <div>
//           <label>Age:</label>
//           <input
//             type="number"
//             value={formData.age}
//             onChange={(e) => setFormData({ ...formData, age: e.target.value })}
//             required
//           />
//         </div>

//         {/* Gender */}
//         <div>
//           <label>Gender:</label>
//           <select
//             value={formData.gender}
//             onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//             required
//           >
//             <option value="">Select</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         {/* Height */}
//         <div>
//           <label>Height (cm):</label>
//           <input
//             type="number"
//             value={formData.height}
//             onChange={(e) => setFormData({ ...formData, height: e.target.value })}
//             required
//           />
//         </div>

//         {/* Weight */}
//         <div>
//           <label>Weight (kg):</label>
//           <input
//             type="number"
//             value={formData.weight}
//             onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
//             required
//           />
//         </div>

//         {/* Goal Weight */}
//         <div>
//           <label>Goal Weight (kg):</label>
//           <input
//             type="number"
//             value={formData.goalWeight}
//             onChange={(e) => setFormData({ ...formData, goalWeight: e.target.value })}
//             required
//           />
//         </div>

//         {/* Activity Level */}
//         <div>
//           <label>Activity Level:</label>
//           <select
//             value={formData.activityLevel}
//             onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
//             required
//           >
//             <option value="">Select</option>
//             <option value="sedentary">Sedentary</option>
//             <option value="lightly active">Lightly Active</option>
//             <option value="moderately active">Moderately Active</option>
//             <option value="very active">Very Active</option>
//           </select>
//         </div>

//         {/* Diet Type */}
//         <div>
//           <label>Diet Type:</label>
//           <input
//             type="text"
//             value={formData.dietType}
//             onChange={(e) => setFormData({ ...formData, dietType: e.target.value })}
//             required
//           />
//         </div>

//         {/* Allergies */}
//         <div>
//           <label>Allergies:</label>
//           <input
//             type="text"
//             value={formData.allergies}
//             onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
//           />
//         </div>

//         {/* Disliked Foods */}
//         <div>
//           <label>Disliked Foods:</label>
//           <input
//             type="text"
//             value={formData.dislikedFoods}
//             onChange={(e) => setFormData({ ...formData, dislikedFoods: e.target.value })}
//           />
//         </div>

//         {/* Health Conditions */}
//         <div>
//           <label>Health Conditions:</label>
//           <input
//             type="text"
//             value={formData.healthConditions}
//             onChange={(e) => setFormData({ ...formData, healthConditions: e.target.value })}
//           />
//         </div>

//         {/* Meals Per Day */}
//         <div>
//           <label>Meals Per Day:</label>
//           <input
//             type="number"
//             value={formData.mealsPerDay}
//             onChange={(e) => setFormData({ ...formData, mealsPerDay: e.target.value })}
//             required
//           />
//         </div>

//         {/* Meal Times */}
//         <div>
//           <label>Meal Times:</label>
//           {formData.mealTimes.map((time, index) => (
//             <input
//               key={index}
//               type="time"
//               value={time}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   mealTimes: formData.mealTimes.map((t, i) => (i === index ? e.target.value : t)),
//                 })
//               }
//             />
//           ))}
//         </div>

//         {/* Caloric Goal */}
//         <div>
//           <label>Caloric Goal:</label>
//           <select
//             value={formData.caloricGoal}
//             onChange={(e) => setFormData({ ...formData, caloricGoal: e.target.value })}
//             required
//           >
//             <option value="">Select</option>
//             <option value="maintenance">Maintenance</option>
//             <option value="weight loss">Weight Loss</option>
//             <option value="weight gain">Weight Gain</option>
//           </select>
//         </div>

//         {/* Budget */}
//         <div>
//           <label>Budget:</label>
//           <select
//             value={formData.budget}
//             onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
//             required
//           >
//             <option value="">Select</option>
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <button type="submit">Generate Meal Plan</button>
//       </form>
//     </div>
//   );
// };

// export default MealGeneratorPage;

















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
