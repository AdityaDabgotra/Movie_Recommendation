import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import InputForm from "../components/InputForm.jsx";
import UserLikes from "../components/UserLikes.jsx";
import axios from 'axios';

function Home() {
  const [likes, setLikes] = useState([]);
  const navigate = useNavigate();

  const addLike = (like) => {
    setLikes(prev => [...prev, like]);
  };

  const sendData = async () => {
    if (likes.length === 0) {
      alert("Please add some likes first!");
      return;
    }
    const para = likes.join(',');
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/recommend?genres=${para}&top_n=5`);
      navigate('/recommend', { state: { recommendations: response.data } });

    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to get recommendations.");
    }
  };

  return (
    <div className="recommend-page">
      <h1>Movie Recommendations 🎥</h1>
      <InputForm addLike={addLike} />
      <UserLikes likes={likes} />
      <button onClick={sendData} className="btn">Recommend Movie</button>
    </div>
  );
}

export default Home;
