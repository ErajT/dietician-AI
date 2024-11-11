// "use client"; // Make sure this is at the top of the file
// import React, { useState, useEffect } from 'react';
// import Spline from '@splinetool/react-spline';
// import VideoLoading from './components/VideoLoading'; // Ensure this path is correct

// const ExercisePlanner = () => {
//   const [isModalOpen, setIsModalOpen] = useState(true);
//   const [muscle, setMuscle] = useState('');
//   const [exercises, setExercises] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showHeading, setShowHeading] = useState(false);

//   useEffect(() => {
//     document.body.style.background = isModalOpen ? '#cee2d2' : '#cee2d2';
//     setTimeout(() => setShowHeading(true), 1000);
//   }, [isModalOpen]);

//   const muscleOptions = [
//     { name: 'Abdominals', value: 'abdominals', image: '/images/abdominals.jpg' },
//     { name: 'Abductors', value: 'abductors', image: '/images/abductors.jpg' },
//     { name: 'Adductors', value: 'adductors', image: '/images/adductors.jpg' },
//     { name: 'Biceps', value: 'biceps', image: '/images/biceps.jpg' },
//     { name: 'Calves', value: 'calves', image: '/images/calves.jpg' },
//     { name: 'Chest', value: 'chest', image: '/images/chest.jpg' },
//     { name: 'Forearms', value: 'forearms', image: '/images/forearms.jpg' },
//     { name: 'Glutes', value: 'glutes', image: '/images/glutes.jpg' },
//     { name: 'Hamstrings', value: 'hamstrings', image: '/images/hamstrings.jpg' },
//     { name: 'Lats', value: 'lats', image: '/images/lats.jpg' },
//     { name: 'Lower Back', value: 'lower_back', image: '/images/lower_back.jpg' },
//     { name: 'Middle Back', value: 'middle_back', image: '/images/middle_back.jpg' },
//     { name: 'Neck', value: 'neck', image: '/images/neck.jpg' },
//     { name: 'Quadriceps', value: 'quadriceps', image: '/images/quadriceps.jpg' },
//     { name: 'Traps', value: 'traps', image: '/images/traps.jpg' },
//     { name: 'Triceps', value: 'triceps', image: '/images/triceps.jpg' }
//   ];

//   const handleMuscleSelect = async (muscleValue) => {
//     setMuscle(muscleValue);
//     setIsModalOpen(false);
//     setLoading(true);
//     setError('');

//     try {
//       const res = await fetch("/api/exerciseplanner", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ muscle: muscleValue }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to fetch data from the API");
//       }

//       const data = await res.json();
//       setExercises(data.exercises);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

  

//   const handleExerciseClick = (exercise) => {
//     const url = `exerciseplanner/details?exercise=${encodeURIComponent(
//       JSON.stringify(exercise)
//     )}&videoId=${encodeURIComponent(exercise.videoId)}`;
//     window.location.href = url;
//   };

//   // Replace with the actual URL of your loading video
//   const loadingVideoUrl = '/exercise.mp4'; 

//   return (
//     <div style={styles.container}>
//       <div style={styles.content}>
//         {showHeading && (
//           <h1 style={styles.title}>Exercise Planner</h1>
//         )}

//         {isModalOpen && (
//           <div style={styles.modal}>
//             <h2 style={styles.modalTitle}>Select a Muscle Group</h2>
//             <div style={styles.muscleOptions}>
//               {muscleOptions.map((muscle, index) => (
//                 <div style={styles.flipCard} key={index}>
//                   <div className="flip-card-inner" style={styles.flipCardInner} onClick={() => handleMuscleSelect(muscle.value)}>
//                     <div className="flip-card-front" style={styles.flipCardFront} onClick={() => handleMuscleSelect(muscle.value)}>
//                       <img src={muscle.image} alt={muscle.name} style={styles.muscleImageBlur} />
//                       <span style={styles.cardText}>{muscle.name}</span>
//                     </div>
//                     <div className="flip-card-back" style={styles.flipCardBack}>
//                       <img src={muscle.image} alt={muscle.name} style={styles.muscleImage} />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Use VideoLoading component when loading */}
//         {loading && <VideoLoading videoUrl={loadingVideoUrl} comment="Loading exercises..." />}

//         {error && <div style={styles.error}>{error}</div>}

//         {!isModalOpen && !loading && exercises.length > 0 && (
//           <div style={styles.exerciseContainer}>
//             <h2 style={styles.exerciseHeader}>Exercises for {muscle}</h2>
//             <div style={styles.exerciseGrid}>
//               {exercises.map((exercise, index) => (
//                 <div
//                   key={index}
//                   style={styles.exerciseCard}
//                   onClick={() => handleExerciseClick(exercise)}
//                 >
//                   <h3 style={{ color: '#e0f7f3' }}>Name: {exercise.name}</h3>
//                   <p style={styles.exerciseInfo}>Type: {exercise.type}</p>
//                   <p style={styles.exerciseInfo}>Muscle: {exercise.muscle}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {isModalOpen && (
//         <div style={styles.splineContainer}>
//           <Spline scene="https://prod.spline.design/ShOzWqWhrYaktz74/scene.splinecode" />
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
  
//   container: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     minHeight: '100vh',
//     padding: '40px',
//     backgroundColor: '#e0f7f3',
//     overflow: 'hidden',
//     // backgroundImage: `url('/images/1.avif')`,
//     // backgroundSize: 'cover',
   
//   },

  
//   content: {
//     flex: 1,
//     maxWidth: '60%',
//     paddingRight: '20px',
//   },
//   title: {
//     fontSize: '4rem',
//     fontWeight: 'bold',
//     color: '#2b6777',
//     marginBottom: '40px',
//     textAlign: 'center',
//     width: '100%',
//     marginTop: '130px',
//     position:'relative',
//     left:320,
//     fontFamily:'Poppins ',

//   },
//   modal: {
//     padding: '20px',
//     maxWidth: '1000px',
//     width: '100%',
//   },
//   modalTitle: {
//     fontSize: '2rem',
//     color: '#2b6777',
//     marginBottom: '30px',
//   },
//   muscleOptions: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//     gap: '30px',
//   },
//   flipCard: {
//     perspective: '1000px',
//   },
//   flipCardInner: {
//     position: 'relative',
//     width: '200px',
//     height: '200px',
//     textAlign: 'center',
//     transition: 'transform 0.8s',
//     transformStyle: 'preserve-3d',
//   },
//   flipCardFront: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     backfaceVisibility: 'hidden',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//     borderRadius: '15px',
//     cursor: 'pointer', // Cursor indicates clickable
//   },
//   flipCardBack: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#102820',
//     color: '#fff',
//     borderRadius: '15px',
//     backfaceVisibility: 'hidden',
//     transform: 'rotateY(180deg)',
//   },
//   muscleImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: '15px',
//     objectFit: 'cover',
//   },
//   muscleImageBlur: {
//     width: '100%',
//     height: '100%',
//     borderRadius: '15px',
//     objectFit: 'cover',
//     filter: 'blur(2px)',
//   },
//   cardText: {
//     position: 'absolute',
//     color: '#ffffff',
//     fontSize: '1.4rem',
//     textAlign: 'center',
    
    
//   },
//   // exerciseContainer: {
   
//   //     margin: 0, // Remove margin
 
//   //     borderRadius: '0', // Remove border radius to cover the entire area
//   //     // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: A light background for contrast
//   //     color: '#102820',
//   //     width: '100vw', // Set width to 100%
//   //     height: '1500px', // Set height to cover the full viewport height
//   //     // display: 'flex', // Use flexbox to center content if needed
//   //     // flexDirection: 'column',
//   //     // alignItems: 'center', // Center align items
//   //     // justifyContent: 'flex-start', // Start from the top
//   //     backgroundImage: `url('/images/pic.jpg')`, // Set your background image here
//   //     backgroundSize: 'cover', // Ensure the image covers the entire container
      
//   //     backgroundRepeat: 'no-repeat', // Prevent repeating of the image
//   //     marginTop:'0px',
//   //     position:'relative',
//   //     left:0,
    
  


//   //  },
//   exerciseContainer: {
//     margin: 0,
//     borderRadius: '0',
//     color: 'white',
//     width: '1410px',
//     height: '100%',
//     backgroundImage: `url('/images/finally.jpg')`, // Set your background image here
//     backgroundSize: 'cover',
//     position:'relative',
//     left:'10px',
//     margin:'10px',
    
       
//   },
//   // '@keyframes backgroundPan': {
//   //   '0%': { backgroundPosition: '0% 50%' },
//   //   '50%': { backgroundPosition: '100% 50%' },
//   //   '100%': { backgroundPosition: '0% 50%' },
//   // },
   
//   exerciseHeader: {
//     fontSize: '2.8rem',
//     color: '#2b6777',
//     marginBottom: '80px',
//     marginTop:'50px',
//     position:'relative',
//     left:500,

//   },
 
//   exerciseGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(2, 1fr)', // Two columns
//     gap: '10px 0px',// Smaller gap between cards
//     justifyContent: 'center',
//     margin:'250px',
//   },
//   exerciseCard: {
//     backgroundColor: '#2b6777',
//     padding: '15px',
//     borderRadius: '15px',
//     boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
//     cursor: 'pointer',
//     transition: 'transform 0.3s, background-color 0.3s',
//     textAlign: 'center',
//     color: '#2b6777',
//     maxWidth: '370px', // Set a maximum width for each card
//     position:'relative',
//     left:'80px',
    
//     margin: '5px 0px',
//     top: '-120px',
    

   
  
    
//   },
//   exerciseInfo: {
//     fontSize: '1.2rem',
//     color: '#e0f7f3',

   
//   },
//   splineContainer: {
//     width: '35%',
//     height: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'fixed',
//     right: '40px',
//   },
//   spinner: {
//     fontSize: '1.5rem',
//     color: '#102820',
//     marginTop: '20px',
//   },
//   error: {
//     color: 'red',
//     marginTop: '20px',
//   },
// };

// // Adding hover effect using CSS
// const flipCardStyle = `
//   .flip-card-inner:hover {
//     transform: rotateY(180deg);
//   }
// `;

// export default ExercisePlanner;


"use client"; // Make sure this is at the top of the file
import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import VideoLoading from './components/VideoLoading'; // Ensure this path is correct
// import styled from 'styled-components';
import Navbar from '../components/Navbar';
import styled, { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Jelligun';
    src: url('/Jelligun-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: bold;
  }
  * {
    font-family: 'Jelligun', sans-serif;
  }
`;
const ExercisePlanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [muscle, setMuscle] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    document.body.style.background = isModalOpen ? '#cee2d2' : '#cee2d2';
    setTimeout(() => setShowHeading(true), 1000);
  }, [isModalOpen]);

  const muscleOptions = [
    { name: 'Abdominals', value: 'abdominals', image: '/images/abdominals.jpg' },
    { name: 'Adductors', value: 'adductors', image: '/images/adductors.jpg' },
    { name: 'Biceps', value: 'biceps', image: '/images/biceps.jpg' },
    { name: 'Calves', value: 'calves', image: '/images/calves.jpg' },
    { name: 'Chest', value: 'chest', image: '/images/chest.jpg' },
    { name: 'Forearms', value: 'forearms', image: '/images/forearms.jpg' },
    { name: 'Glutes', value: 'glutes', image: '/images/glutes.jpg' },
    { name: 'Hamstrings', value: 'hamstrings', image: '/images/hamstrings.jpg' },
    { name: 'Lats', value: 'lats', image: '/images/lats.jpg' },
    { name: 'Lower Back', value: 'lower_back', image: '/images/lower_back.jpg' },
    { name: 'Middle Back', value: 'middle_back', image: '/images/middle_back.jpg' },
    { name: 'Neck', value: 'neck', image: '/images/neck.jpg' },
    { name: 'Quadriceps', value: 'quadriceps', image: '/images/quadriceps.jpg' },
    { name: 'Traps', value: 'traps', image: '/images/traps.jpg' },
    { name: 'Triceps', value: 'triceps', image: '/images/triceps.jpg' }
  ];

  const handleMuscleSelect = async (muscleValue) => {
    setMuscle(muscleValue);
    setIsModalOpen(false);
    setLoading(true);
    setError('');

    try {
      const res = await fetch("/api/exerciseplanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ muscle: muscleValue }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data from the API");
      }

      const data = await res.json();
      setExercises(data.exercises);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExerciseClick = (exercise) => {
    const url = `exerciseplanner/details?exercise=${encodeURIComponent(
      JSON.stringify(exercise)
    )}&videoId=${encodeURIComponent(exercise.videoId)}`;
    window.location.href = url;
  };

  const loadingVideoUrl = '/exercise.mp4'; 

  return (
    <Container>
      <GlobalStyles/>
      {/* Other components go here */}
      <Content>
      <Navbar />
        {showHeading && <Title>Exercise Planner</Title>}

        {isModalOpen && (
          <Modal>
            <ModalTitle>Select a Muscle Group</ModalTitle>
            <MuscleOptions>
              {muscleOptions.map((muscle, index) => (
                <FlipCard key={index}>
                  <FlipCardInner onClick={() => handleMuscleSelect(muscle.value)}>
                    <FlipCardFront onClick={() => handleMuscleSelect(muscle.value)}>
                      <MuscleImageBlur src={muscle.image} alt={muscle.name} />
                      <CardText>{muscle.name}</CardText>
                    </FlipCardFront>
                    <FlipCardBack>
                      <MuscleImage src={muscle.image} alt={muscle.name} />
                    </FlipCardBack>
                  </FlipCardInner>
                </FlipCard>
              ))}
            </MuscleOptions>
          </Modal>
        )}

        {loading && <VideoLoading videoUrl={loadingVideoUrl} comment="Loading exercises..." />}
        {error && <Error>{error}</Error>}

        {!isModalOpen && !loading && exercises.length > 0 && (
          <ExerciseContainer>
            <ExerciseHeader>Exercises for {muscle}</ExerciseHeader>
            <ExerciseGrid>
              {exercises.map((exercise, index) => (
                <ExerciseCard
                  key={index}
                  onClick={() => handleExerciseClick(exercise)}
                >
                  <ExerciseName>Name: {exercise.name}</ExerciseName>
                  <ExerciseInfo>Type: {exercise.type}</ExerciseInfo>
                  <ExerciseInfo>Muscle: {exercise.muscle}</ExerciseInfo>
                </ExerciseCard>
              ))}
            </ExerciseGrid>
          </ExerciseContainer>
        )}
      </Content>

      {isModalOpen && (
        <SplineContainer>
          <Spline scene="https://prod.spline.design/ShOzWqWhrYaktz74/scene.splinecode" />
        </SplineContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 100vh;
  padding: 40px;
  background-color: #e0f7f3;
  overflow: hidden;
  // min-width:100%
`;

const Content = styled.div`
  flex: 1;
  max-width: 60%;
  padding-right: 20px;
`;

const Title = styled.h1`
  font-size: 8rem;
  font-family: 'Jelligun', sans-serif; 
  font-weight: bold;
  color: #2b6777;
  margin-bottom: 30px;
  text-align: center;
  width: 100%;
  margin-top: 40px;
  position: relative;
  left: 300px;
  // font-family: 'Poppins';
`;

const Modal = styled.div`
  padding: 20px;
  max-width: 1000px;
  width: 100%;
`;

const ModalTitle = styled.h2`
  font-size: 4rem;
  color: #2b6777;
  margin-bottom: 30px;
  font-weight :bold;
`;

const MuscleOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
`;

const FlipCard = styled.div`
  perspective: 1000px;
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;

const FlipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 15px;
  cursor: pointer;
`;

const FlipCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #102820;
  color: #fff;
  border-radius: 15px;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const MuscleImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  object-fit: cover;
`;

const MuscleImageBlur = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  object-fit: cover;
  filter: blur(2px);
`;

const CardText = styled.span`
  position: absolute;
  color: #ffffff;
  font-size: 1.4rem;
  text-align: center;
`;

const ExerciseContainer = styled.div`
  margin: 0;
  border-radius: 0;
  color: white;
  width: 100vw;
  height: 100%;
  // background-image: url('/images/finally.jpg');
  background-size: cover;
  position: relative;
  left: 10px;
  margin: 10px;
`;

const ExerciseHeader = styled.h2`
  font-size: 2.8rem;
  color: #2b6777;
  margin-bottom: 80px;
  margin-top: 50px;
  position: relative;
  left: 500px;
`;

const ExerciseGrid = styled.div`
  display: flex;
  flex-wrap: wrap;                  // Allow items to wrap onto the next line
  justify-content: space-around;   // Distribute space between items
  width: 90vw;                     // Set the width to 100vw
  padding: 15px;                  // Optional padding for spacing
  margin-right: 20px;
  box-sizing: border-box;           // Include padding in width calculation
`;

const ExerciseCard = styled.div`

  flex: 0 1 calc(30.33% - 20px);    // Adjust the percentage as needed for the item width
  margin-bottom: 30px;               // Space between rows
  margin-right: 20px;
  box-sizing: border-box;            // Include margin in width calculation
  background-color: #2b6777;
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ExerciseName = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  color: #ffffff;
`;

const ExerciseInfo = styled.p`
  margin: 5px 0;
  color: #ffffff;
`;

const Error = styled.p`
  color: red;
  font-size: 1.2rem;
  text-align: center;
`;

const SplineContainer = styled.div`
  width: 40%;
  position: relative;
  bottom: 0px;
  position: fixed;
  right: 0;
  height: 100vh;
  margin-left: 20px;
  margin-bottom:-80px;

,
`;

export default ExercisePlanner;

