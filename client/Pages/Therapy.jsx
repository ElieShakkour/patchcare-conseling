
import video from '../UTILS/Images/robinwilliamsmentalhealth.mp4';
import { useSpring, animated } from 'react-spring';
import React, { useState,useEffect } from 'react';
import { getLocalStorageUser } from '../UTILS/localStorageUtils';
import volunteerImg from '../UTILS/Images/therapy.jpg'

const Therapy = () => {
  const [animateFindTherapist, setAnimateFindTherapist] = useState(false);
  const [inViewport, setInViewport] = useState(false);

console.log(getLocalStorageUser(),'user')
  useEffect(() => {
    
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });
    const teamSection = document.getElementById("team-section");
    if (teamSection) {
      observer.observe(teamSection);
    }
  }, []);


const mission = `At PatchCare, our primary mission is to make mental health support accessible, 
empathetic, and transformative. Inspired by the enduring legacy of Robin Williams and his personal
 struggles with mental health, we are dedicated to providing a safe haven for individuals seeking solace, guidance, and healing.

Our vision revolves around connecting individuals with specialized, volunteer mental health
 professionals who offer compassionate counseling and group therapy sessions. We understand
  that mental health is a fundamental aspect of overall well-being, and we are committed to
   reducing the stigma surrounding mental health issues.

PatchCare is not just a platform; it's a sanctuary where emotional wounds
 are mended, hope is restored, and lives are transformed. Join us in our collective
  journey toward mental health awareness, resilience, and growth.

Let us be your partner on the path to mental health recovery
 and well-being. Together, we can make a difference, one counseling session, one therapy group, one healing journey at a time.`


 const teamAnimation = useSpring({
  transform: inViewport ? "translateX(0)" : "translateX(-100%)",
  opacity: inViewport ? 1 : 0,
  config: { duration: 1000 }, 
});

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setInViewport(true);
    }else{setInViewport(false)}
  });
};

  return (

    
    <div>
      <video width="100%" autoPlay controls muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{ textAlign: 'center', padding: '60px' }}>
        <h2 style={{ color: '#0D5D65', fontSize: '43px' }}>Our Mental Health Mission at PatchCare</h2>
        <p style={{ fontSize: '24px' }}>{mission}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop:30}}>
      <div style={{ flex: 1, textAlign: 'center' }}>
      <h2 style={{ color: '#0D5D65', fontSize: '43px' }}>Find a Suport Group</h2>
      <p style={{ fontSize: '24px'}}>
      Sometimes, the most profound healing and growth occur when we come together as a community.
       Discover a supportive network of individuals who understand your journey, share your experiences,
       and are ready to stand by your side. Our support groups provide a nurturing environment where you can connect, share, and grow.</p>
      <a href="/volunteersignup" style={{ color: 'blue', textDecoration: 'underline' }}>Find a support group</a>.
    </div>
  
  </div>
  <div id="team-section" >
  <animated.div style={teamAnimation}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop:30,}}>
      <div style={{ flex: 1, textAlign: 'center' }}>
      <h2 style={{ color: '#0D5D65', fontSize: '43px' }}>Find a therapist</h2>
      <p style={{ fontSize: '24px' }}>
      If you're ready to take the first step towards improving your mental health and well-being, we're here to help.
       Discover experienced and compassionate therapists who are dedicated to
       supporting you on your journey to emotional wellness. If you're seeking individual counseling, 
        our network of mental health professionals is here to guide you.  </p>
      <a href="/volunteersignup" style={{ color: 'blue', textDecoration: 'underline' }}>Find a therapist</a>.
    </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
      <img src={volunteerImg} alt="Team Image" style={{ width: '600px', height: '500px',paddingLeft:60, borderRadius:"50%" ,objectFit: "cover" }} />
    </div>
 
  </div>
  </animated.div>
  </div>
    </div>

  );
};

export default Therapy;
