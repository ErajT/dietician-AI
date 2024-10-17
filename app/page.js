// "use client";
// import React, { useState, useEffect } from 'react';
// import styled, { keyframes } from 'styled-components';
// import 'aos/dist/aos.css';
// import AOS from 'aos';

// const quotes = [
//   "Eat healthy, stay healthy.",
//   "Your body deserves the best.",
//   "Healthy eating, happy living.",
//   "Fuel your body, fuel your life.",
//   "Live well, eat well."
// ];

// const images = [
//   'https://simplehealthfacts.com/media/2021/07/44-healthy-foods-to-eat-that-you-should-include-in-your-diet.jpg',
//   'https://images.pexels.com/photos/3756042/pexels-photo-3756042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//   'https://images.pexels.com/photos/6327159/pexels-photo-6327159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//   'https://kyolic.com/wp-content/uploads/2020/11/healthy-life-blog-image.jpg',
//   'https://www.drweil.com/wp-content/uploads/2017/01/health-wellness_balanced-living_healthy-living_whats-the-best-indoor-light_1440x1080_500378277.jpeg'
// ];

// const Page = styled.div`
//   background-color: #cee2d2;
//   font-family: 'Lobster', cursive;
// `;

// const Navbar = styled.nav`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   // background-color: #073B3A;
//   // padding: 20px 40px;
//   color: white;
//   font-size: 1.5em;
//   height:70px;
// `;

// const NavLinks = styled.div`
//   a {
//     color: white;
//     text-decoration: none;
//     padding: 8px 16px;

//     &:hover {
//       background-color: #575757;
//       border-radius: 5px;
//     }
//   }
// `;
// const Logo = styled.img`
//   height: 95px;
// `;

// const Slider = styled.div`
//   position: relative;
//   max-width: 100%;
//   height: 85vh;
//   overflow: hidden;
// `;

// const Slide = styled.div`
//   position: absolute;
//   top: 0px;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-size: cover;
//   background-position: center;
//   opacity: 0;
//   transition: opacity 1s ease-in-out, filter 0.5s ease-in-out;
//   filter: blur(0);

//   &.active {
//     opacity: 1;
//   }

//   &:before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
//   }

//   &:hover {
//     filter: blur(8px);
//   }
// `;

// const Quote = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   color: white;
//   text-align: center;
//   font-size: 2.5em;
//   font-family: 'Lobster', cursive;
//   padding: 0 20px;
// `;

// const VideoWrapper = styled.div`
//   flex: 1;
//   padding-right: 20px;
//   padding-left: 50px;

//   video {
//     width: 100%;
//     height: 450px;
//     object-fit: cover;
//     border-radius: 20px;
//   }
// `;

// const Section = styled.div`
//   display: flex;
//   padding: 40px;
//   background-color: #073B3A;
//   background-image: linear-gradient(135deg, #073B3A 25%, #0E6251 75%);
//   margin-top: 90px;
//   margin-bottom: 50px;
//   // border-radius: 100px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   align-items: center;
//   gap: 15px;
//   height: 110vh;
//   position: relative;
//   overflow: hidden;
//   // margin-right: 50px;
//   // margin-left: 50px;
  

//   &:before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     // background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" preserveAspectRatio="none"><path d="M0,200 Q400,100 800,200 L800,0 L0,0 Z" fill="%230D544F" opacity="0.5"/></svg>');
//     background-size: cover;
//     z-index: 0;
//   }
// `;

// const ImageWrapper = styled.div`
//   flex: 1;
//   padding-left: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   z-index: 1;
//   animation: slideIn 1.5s forwards;

//   @keyframes slideIn {
//     from {
//       transform: translateX(100%);
//       opacity: 0;
//     }
//     to {
//       transform: translateX(0);
//       opacity: 1;
//     }
//   }
// `;

// const RightImage = styled.img`
//   width: 100%;
//   height: auto;
//   position: relative;
//   z-index: 1;
// `;

// const CardsSection = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 20px;
//   padding: 40px;
//   background-color: #B7DDB0;
//   margin-top: 50px;

//   @media (max-width: 1024px) {
//     grid-template-columns: repeat(2, 1fr); /* 2 cards per row for smaller screens */
//   }

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr; /* 1 card per row for very small screens */
//   }
// `;

// const Card = styled.div`
//   position: relative;
//   overflow: hidden;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s ease-in-out;
//   &[data-aos='fade-right']:nth-child(odd),
//   &[data-aos='fade-left']:nth-child(even) {
//     transform: translateX(0);
//   }

//   &:hover {
//     transform: translateY(-10px); /* Lift the card on hover */
//   }

//   &:hover video {
//     filter: blur(8px); /* Apply blur effect to video on hover */
//   }

//   &:hover .info {
//     opacity: 1;
//   }
// `;

// const Video = styled.video`
//   width: 100%;
//   height: 300px;
//   object-fit: cover;
//   transition: filter 0.5s ease-in-out; /* Smooth transition for blur effect */
// `;

// const Info = styled.div`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   padding: 20px;
//   background-color: #073B3A;
//   color: white;
//   opacity: 0;
//   transition: opacity 0.5s ease-in-out;
//   text-align: center;
// `;

// const breathing = keyframes`
//   0%, 100% { transform: scale(1); }
//   50% { transform: scale(1.2); }
// `;

// // Styled component for each letter of the Heading
// const BreathingLetter = styled.span`
//   display: inline-block;
//   animation: ${breathing} 1s ease-in-out infinite;
//   animation-delay: ${({ delay }) => delay}s;
//   color: #073B3A;
//   font-family: 'Pacifico', cursive;
// `;

// // Component to create the heading with each letter animated and words separated
// const BreathingHeading = ({ text }) => (
//   <h2 style={{ textAlign: 'center',marginBottom: '30px', fontSize: '3em',marginTop: '90px' }}>
//     {text.split(' ').map((word, wordIndex) => (
//       <span key={wordIndex} style={{ marginRight: '0.5em' }}>
//         {word.split('').map((letter, letterIndex) => (
//           <BreathingLetter key={letterIndex} delay={(wordIndex + letterIndex) * 0.2}>
//             {letter}
//           </BreathingLetter>
//         ))}
//       </span>
//     ))}
//   </h2>
// );

// const SecondSection = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between; /* This will place one image on the left and one on the right */
//   background-color: #79b791;
//   position: relative;
//   height: 100vh;
//   overflow: hidden;
//   // margin-top: 80px;
//   padding: 0 100px; /* Adds some padding for spacing around the images */
//   //  margin-right: 50px;
//   // margin-left: 50px;
//   // border-radius: 100px;

//   &:before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-size: cover;
//     z-index: 0;
//   }
// `;

// const CenterImage = styled.img`
//   position: relative;
//   z-index: 1;
//   max-width: 550px;
//   // animation: pulse 5s infinite;
//   height:70vh;
//   // border-radius: 50%; /* Making the image circular */

//   @keyframes pulse {
//     0% {
//       transform: scale(1);
//     }
//     50% {
//       transform: scale(1.1);
//     }
//     100% {
//       transform: scale(1);
//     }
//   }
// `;

// const MovingImage = styled.img`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   width: 150px; /* Adjust size as needed */
//   z-index: 9999;
//   animation: moveAround 20s infinite linear;

//   @keyframes moveAround {
//     0% {
//       transform: translate(-50%, -50%);
//     }
//     25% {
//       transform: translate(40vw, -40vh); /* Move to top-right */
//     }
//     50% {
//       transform: translate(-40vw, 40vh); /* Move to bottom-left */
//     }
//     75% {
//       transform: translate(40vw, 40vh); /* Move to bottom-right */
//     }
//     100% {
//       transform: translate(-50%, -50%); /* Return to center */
//     }
//   }
// `;


// const CarouselSection = styled.div`
//   perspective: 1000px;
//   height: 500px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 50px;
//   background-color: #f5f5f5;
// `;

// const Carousel = styled.div`
//   width: 100%;
//   max-width: 800px;
//   height: 400px;
//   position: relative;
//   transform-style: preserve-3d;
//   transform: translateZ(-300px) rotateY(calc(var(--current-index) * -90deg));
//   transition: transform 1s;
// `;

// const CarouselItem = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background-size: cover;
//   background-position: center;
//   transform: rotateY(calc(var(--index) * 90deg)) translateZ(300px);
//   backface-visibility: hidden;
// `;

// const CarouselControl = styled.button`
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   background: none;
//   border: none;
//   font-size: 2rem;
//   cursor: pointer;
//   z-index: 100;

//   &:focus {
//     outline: none;
//   }
// `;

// const PrevButton = styled(CarouselControl)`
//   left: 10px;
// `;

// const NextButton = styled(CarouselControl)`
//   right: 10px;
// `;

// const images1 = [
//   'https://simple-veganista.com/wp-content/uploads/2012/09/healthy-chopped-vegetable-salad-recipe-3.jpg',
//   'https://getonmyplate.com/wp-content/uploads/2022/06/caesar-salad-no-anchovies-7-1200x1800.jpg',
//   'https://simple-veganista.com/wp-content/uploads/2012/09/healthy-chopped-vegetable-salad-recipe-3.jpg',
//   'https://getonmyplate.com/wp-content/uploads/2022/06/caesar-salad-no-anchovies-7-1200x1800.jpg',
// ];

// export default function Home() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     AOS.init({
//       duration: 3000,
//       easing: 'ease-in-out',
//       offset: 100,
//       once: false,
//     });
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleNext = () => {
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % images1.length);
//   };

//   const handlePrev = () => {
//     setCurrentSlide((prevSlide) => (prevSlide - 1 + images1.length) % images1.length);
//   };



//   return (
//     <Page>
//       {/* Navbar */}
//       <Navbar>
//       {/* Replace text with the logo image */}
//       <Logo src="Logo.png" alt="DietApp Logo" />
//       <NavLinks>
//         <a href="#">Home</a>
//         <a href="#">Features</a>
//         <a href="#">Contact</a>
//       </NavLinks>
//     </Navbar>

//       {/* Slider */}
//       <Slider>
//         {images.map((image, index) => (
//           <Slide
//             key={index}
//             className={index === currentSlide ? "active" : ""}
//             style={{ backgroundImage: `url(${image})` }}
//           >
//             <Quote>{quotes[index]}</Quote>
//           </Slide>
//         ))}
//       </Slider>

//       {/* Second Section */}

// <SecondSection>
// <CenterImage src="/S.png" alt="Left Image" /> 
// <CenterImage src="/F.png" alt="Right Image" /> 
// </SecondSection>

// <BreathingHeading text="What services we provide" />
//       <CardsSection>
//   <Card data-aos="fade-up" data-aos-duration="1000">
//     <Video autoPlay muted loop playsInline>
//       <source src="/Aesthetic%20Healthy%20Diet.mp4" type="video/mp4" />
//     </Video>
//     <Info className="info">
//       <h3>Card 1</h3>
//       <p>Brief description for Card 1.</p>
//     </Info>
//   </Card>

//   <Card data-aos="fade-down" data-aos-duration="1000">
//     <Video autoPlay muted loop playsInline>
//       <source src="/Red%20And%20Black.mp4" type="video/mp4" />
//     </Video>
//     <Info className="info">
//       <h3>Card 2</h3>
//       <p>Brief description for Card 2.</p>
//     </Info>
//   </Card>

//   <Card data-aos="fade-left" data-aos-duration="1000">
//     <Video autoPlay muted loop playsInline>
//       <source src="/Colorful%20Modern%20Healthy.mp4" type="video/mp4" />
//     </Video>
//     <Info className="info">
//       <h3>Card 3</h3>
//       <p>Brief description for Card 3.</p>
//     </Info>
//   </Card>

//   <Card data-aos="fade-right" data-aos-duration="1000">
//     <Video autoPlay muted loop playsInline>
//       <source src="/White%20Modern%20Video.mp4" type="video/mp4" />
//     </Video>
//     <Info className="info">
//       <h3>Card 4</h3>
//       <p>Brief description for Card 4.</p>
//     </Info>
//   </Card>
// </CardsSection>

//   <Section>
//         <VideoWrapper>
//           <video autoPlay muted loop playsInline>
//             <source src="/White%20Green%20Pos.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </VideoWrapper>

//         <ImageWrapper>
//         <RightImage src="/i.png" alt="Healthy lifestyle image" />
//         </ImageWrapper>
//       </Section>

//       {/* <CarouselSection>
//       <PrevButton onClick={handlePrev}>&lt;</PrevButton>
//       <Carousel style={{ '--current-slide': currentSlide }}>
//         {images1.map((image, index) => (
//           <CarouselItem
//             key={index}
//             style={{ '--index': index, backgroundImage: `url(${image})` }}
//           />
//         ))}
//       </Carousel>
//       <NextButton onClick={handleNext}>&gt;</NextButton>
//     </CarouselSection> */}
//       {/* <audio autoPlay loop>
//         <source src="/ofenbach.mp3" type="audio/mpeg" />
//         Your browser does not support the audio tag.
//       </audio> */}
//     </Page>
//   );
// }


"use client";
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const imageRef = useRef(null);


  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            setActiveSection(parseInt(index));
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    
    <MainContainer>      
      
      <ImageWrapper ref={imageRef} position={activeSection}>
        <SaladImage src="B.png" alt="Salad" />
      </ImageWrapper>

      <Section style={{ backgroundColor: '#f5f5f5' }} data-index="0">
        <TextWrapper>
        <Typography variant="h2">
        RESTORE BALANCE, <br />
          EMBRACE LIFE
      </Typography>
        </TextWrapper>
      </Section>
      {/* Section 2 */}
      <Section backgroundColor="#e0e0e0" data-index="1">
        Section 2 - Image in the Center
      </Section>
      {/* Section 3 */}
      <Section backgroundColor="#c0c0c0" data-index="2">
        Section 3 - Image on the Left
      </Section>
    </MainContainer>
  );
};

// Main container to handle the sections
const MainContainer = styled.div`
  width: 100%;
  height: 300vh;
  overflow-x: hidden;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: fixed;
  top: 60%;
  left: ${(props) => (props.position === 0 ? '70%' : props.position === 1 ? '80%' : '10%')};
  transform: ${(props) =>
    props.position === 0
      ? 'translate(-80%, -50%)'
      : props.position === 1
      ? 'translate(-50%, -50%)'
      : 'translate(-10%, -50%)'};
  transition: left 1s ease, transform 1s ease;
  pointer-events: none; /* Prevents blocking interactions */
`;

// Image of the salad
const SaladImage = styled.img`
  width: 60vw;
`;

// Text for the first section
const TextWrapper = styled.div`
  position: absolute;
  top: 10vh;
  font-family: Typography, sans-serif;
  font-size: 70px;
  text-align: center;
`;

// Section styling
const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background-color: ${(props) => props.backgroundColor};
`;

export default LandingPage;
