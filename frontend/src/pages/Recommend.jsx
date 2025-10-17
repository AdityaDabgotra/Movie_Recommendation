import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../App.css';
function Recommend() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recommendations } = location.state || { recommendations: [] };
  console.log(recommendations);

  function goback(){
    navigate('/');
  }
  return (
    <div>
      <h1>Recommended Movies 🎬</h1>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((movie, index) => (
            <li key={index}>{index+1}) {movie.title}</li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available.</p>
      )}
      <button onClick={goback} className="btn">GO Back</button>
    </div>
  );
}

export default Recommend;
