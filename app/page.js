"use client";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'aos/dist/aos.css';
import AOS from 'aos';
{/* <MovingImage src="https://www.pngall.com/wp-content/uploads/5/Diet-PNG.png" alt="Moving" /> */}
  //  https://www.pngmart.com/files/1/Salad-PNG-File.png
const quotes = [
  "Eat healthy, stay healthy.",
  "Your body deserves the best.",
  "Healthy eating, happy living.",
  "Fuel your body, fuel your life.",
  "Live well, eat well."
];

const images = [
  'https://simplehealthfacts.com/media/2021/07/44-healthy-foods-to-eat-that-you-should-include-in-your-diet.jpg',
  'http://res.mindbodygreen.com/img/crp/WomanChillingINGardenEarlyMorning-850x400.jpg',
  'https://www.bria.com.ph/wp-content/uploads/2023/06/Healthy-living.png',
  'https://kyolic.com/wp-content/uploads/2020/11/healthy-life-blog-image.jpg',
  'https://www.drweil.com/wp-content/uploads/2017/01/health-wellness_balanced-living_healthy-living_whats-the-best-indoor-light_1440x1080_500378277.jpeg'
];

const Page = styled.div`
  background-color: #B7DDB0;
  font-family: 'Lobster', cursive;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: #073B3A;
  padding: 20px 40px;
  color: white;
  font-size: 1.5em;
`;

const NavLinks = styled.div`
  a {
    color: white;
    text-decoration: none;
    padding: 8px 16px;

    &:hover {
      background-color: #575757;
      border-radius: 5px;
    }
  }
`;

const Slider = styled.div`
  position: relative;
  max-width: 100%;
  height: 85vh;
  overflow: hidden;
`;

const Slide = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out, filter 0.5s ease-in-out;
  filter: blur(0);

  &.active {
    opacity: 1;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  }

  &:hover {
    filter: blur(8px);
  }
`;

const Quote = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  font-size: 2.5em;
  font-family: 'Lobster', cursive;
  padding: 0 20px;
`;

const VideoWrapper = styled.div`
  flex: 1;
  padding-right: 20px;

  video {
    width: 100%;
    height: 450px;
    object-fit: cover;
    border-radius: 20px;
  }
`;

const Section = styled.div`
  display: flex;
  padding: 40px;
  background-color: #073B3A;
  background-image: linear-gradient(135deg, #073B3A 25%, #0E6251 75%);
  margin-top: 90px;
  margin-bottom: 50px;
  // border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  align-items: center;
  gap: 15px;
  height: 90vh;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" preserveAspectRatio="none"><path d="M0,200 Q400,100 800,200 L800,0 L0,0 Z" fill="%230D544F" opacity="0.5"/></svg>');
    background-size: cover;
    z-index: 0;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  animation: slideIn 1.5s forwards;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const RightImage = styled.img`
  width: 100%;
  height: auto;
  position: relative;
  z-index: 1;
`;

const CardsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 40px;
  background-color: #B7DDB0;
  margin-top: 50px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* 2 cards per row for smaller screens */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 card per row for very small screens */
  }
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  &[data-aos='fade-right']:nth-child(odd),
  &[data-aos='fade-left']:nth-child(even) {
    transform: translateX(0);
  }

  &:hover {
    transform: translateY(-10px); /* Lift the card on hover */
  }

  &:hover video {
    filter: blur(8px); /* Apply blur effect to video on hover */
  }

  &:hover .info {
    opacity: 1;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: filter 0.5s ease-in-out; /* Smooth transition for blur effect */
`;

const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background-color: #073B3A;
  color: white;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  text-align: center;
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 30px;
  color: #073B3A;
  font-family: 'Pacifico', cursive;
  margin-top: 90px; /* Adds space above the heading */
  transition: transform 0.3s, opacity 0.3s;
  opacity: 0;
  transform: translateY(20px);

  &.aos-animate {
    opacity: 1;
    transform: translateY(0);
  }
`;
const SecondSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* This will place one image on the left and one on the right */
  background-color: #79b791;
  position: relative;
  height: 90vh;
  overflow: hidden;
  margin-top: 80px;
  padding: 0 60px; /* Adds some padding for spacing around the images */

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    z-index: 0;
  }
`;

const CenterImage = styled.img`
  position: relative;
  z-index: 1;
  max-width: 550px;
  // animation: pulse 5s infinite;
  height:70vh;
  // border-radius: 50%; /* Making the image circular */

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const MovingImage = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 150px; /* Adjust size as needed */
  z-index: 9999;
  animation: moveAround 20s infinite linear;

  @keyframes moveAround {
    0% {
      transform: translate(-50%, -50%);
    }
    25% {
      transform: translate(40vw, -40vh); /* Move to top-right */
    }
    50% {
      transform: translate(-40vw, 40vh); /* Move to bottom-left */
    }
    75% {
      transform: translate(40vw, 40vh); /* Move to bottom-right */
    }
    100% {
      transform: translate(-50%, -50%); /* Return to center */
    }
  }
`;

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

 useEffect(() => {
    AOS.init({
      duration: 3000,
      easing: 'ease-in-out',
      offset: 100,
      once: false,
    });
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);


  return (
    <Page>
      {/* Navbar */}
      <Navbar>
        <div>DietApp</div>
        <NavLinks>
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Contact</a>
        </NavLinks>
      </Navbar>

      {/* Slider */}
      <Slider>
        {images.map((image, index) => (
          <Slide
            key={index}
            className={index === currentSlide ? "active" : ""}
            style={{ backgroundImage: `url(${image})` }}
          >
            <Quote>{quotes[index]}</Quote>
          </Slide>
        ))}
      </Slider>

      {/* Second Section */}

<SecondSection>
<CenterImage src="/S.png" alt="Left Image" /> 
<CenterImage src="/F.png" alt="Right Image" /> 
</SecondSection>

      <Heading data-aos="fade-up">What services we provide</Heading>
      <CardsSection>
  <Card data-aos="fade-up" data-aos-duration="1000">
    <Video autoPlay muted loop playsInline>
      <source src="/Aesthetic%20Healthy%20Diet.mp4" type="video/mp4" />
    </Video>
    <Info className="info">
      <h3>Card 1</h3>
      <p>Brief description for Card 1.</p>
    </Info>
  </Card>

  <Card data-aos="fade-down" data-aos-duration="1000">
    <Video autoPlay muted loop playsInline>
      <source src="/Red%20And%20Black.mp4" type="video/mp4" />
    </Video>
    <Info className="info">
      <h3>Card 2</h3>
      <p>Brief description for Card 2.</p>
    </Info>
  </Card>

  <Card data-aos="fade-left" data-aos-duration="1000">
    <Video autoPlay muted loop playsInline>
      <source src="/Colorful%20Modern%20Healthy.mp4" type="video/mp4" />
    </Video>
    <Info className="info">
      <h3>Card 3</h3>
      <p>Brief description for Card 3.</p>
    </Info>
  </Card>

  <Card data-aos="fade-right" data-aos-duration="1000">
    <Video autoPlay muted loop playsInline>
      <source src="/White%20Modern%20Video.mp4" type="video/mp4" />
    </Video>
    <Info className="info">
      <h3>Card 4</h3>
      <p>Brief description for Card 4.</p>
    </Info>
  </Card>
</CardsSection>

  <Section>
        <VideoWrapper>
          <video autoPlay muted loop playsInline>
            <source src="/White%20Green%20Pos.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </VideoWrapper>

        <ImageWrapper>
        <RightImage src="/i.png" alt="Healthy lifestyle image" />
        </ImageWrapper>
      </Section>
      <audio autoPlay loop>
        <source src="/ofenbach.mp3" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </Page>
  );
}



