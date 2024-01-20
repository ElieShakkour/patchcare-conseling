import React, { useEffect, useState } from "react";
import patchDrawing from '../UTILS/Images/patchDrawing.jpg';
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import ApisService from '../services/ApisService';
import { toast } from "react-toastify";
import { animated, useSpring } from 'react-spring';
import volunteerImg from '../UTILS/Images/volunteerImg.jpg'




const Welcome = ({isUserVolunteer }) => {
  const [user, setUser] = useState("");
  const [disease, setDisease] = useState("");
  const [diseaseInfo, setDiseaseInfo] = useState(""); 
  const [isVolunteer,setIsVolunteer] = useState(false);
  const [inViewport, setInViewport] = useState(false);



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

  useEffect(() => {

    setUser(getLocalStorageUser());
    setIsVolunteer(isUserVolunteer);

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });
    const teamSection = document.getElementById("team-section");
    if (teamSection) {
      observer.observe(teamSection);
    }
  }, []);


  const aboutUs = `At PatchCare Counseling, we are inspired by the compassionate
    spirit of the beloved character Dr. Patch Adams, portrayed by the legendary actor
    Robin Williams in the heartwarming movie "Patch Adams." Dr. Adams believed that healthcare is not just about treating symptoms;
    it's about treating the whole person with empathy, understanding, and a smile.`;

  const ourMission = `Our mission is to provide counseling services
    that go beyond traditional medical treatments. We aim to support your
    emotional and mental well-being, creating a nurturing space where you can express your concerns, fears, and hopes. We believe that laughter,
    understanding, and a strong patient-counselor relationship are crucial components of the healing process.`;

  const searchDisease = async (e) => {
    e.preventDefault();
    try {
      const result = await ApisService.getDisease(disease);
      setDiseaseInfo(result.data);
    } catch (error) {
      setDiseaseInfo(" ");
      toast.error("No disease found");
    }
  };
  
  return (
    <>
    <div style={{ textAlign: 'center', padding: '70px' }}>
      <img src={patchDrawing} alt="Patch Drawing" height={600} width={1400} />

      <div style={{ textAlign: 'center', padding: '60px' }}>
        <h2 style={{ color: '#0D5D65', fontSize: '43px' }}>About Us</h2>
        <p style={{ fontSize: '24px' }}>{aboutUs}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2 style={{ color: '#0D5D65', fontSize: '43px' }}>Our Mission</h2>
        <p style={{ fontSize: '24px' }}>{ourMission}</p>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "70px" }}
        id="team-section" 
      >
       {!isUserVolunteer&&
        <animated.div style={teamAnimation}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop:30}}>
      <div style={{ flex: 1, textAlign: 'center' }}>
      <h2 style={{ color: '#0D5D65', fontSize: '43px' }}>Meet Our Compassionate Team</h2>
      <p style={{ fontSize: '24px' }}>
      At PatchCare Counseling, our team of dedicated professionals is driven by a profound passion for compassionate healthcare. We believe that every patient deserves not just medical treatment but also a warm, empathetic smile. Our diverse group of volunteers, including medical practitioners and therapists, is committed to providing the best care and support for our patients.
      </p>
     <p style={{ fontSize: '24px' }}>
      If you share our passion and want to make a difference, consider joining our team as a volunteer. Your commitment can help us continue our mission of providing holistic care. To volunteer, <a href="/volunteersignup" style={{ color: 'blue', textDecoration: 'underline' }}>click here</a>.
    </p>
    </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
      <img src={volunteerImg} alt="Team Image" style={{ width: '600px', height: '500px',paddingLeft:100 }} />
    </div>
  </div>

        </animated.div>
}
      </div>


      <div style={{ textAlign: 'center', padding: '60px' }}>
        <h2 style={{ color: '#0D5D65', fontSize: '43px' }}>Search a Disease</h2>
      </div>
      

      <form onSubmit={searchDisease}>
        <TextField
          id="search-bar"
          className="text"
          onInput={(e) => { setDisease(e.target.value); }}
          label="Enter a disease name"
          variant="outlined"
          placeholder="Search..."
          size="small"
          style={{
            width: '1000px',
            height: '50px',
            fontSize: '18px',
            padding: '10px',
          }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </form>

      {diseaseInfo && (
        <div style={{ background: '#E6E6E6', padding: '20px', marginTop: '20px' }}>
          <p>{diseaseInfo}</p>
        </div>
      )}
    </div>

<div>

</div>
    </>
  );
};

export default Welcome;
