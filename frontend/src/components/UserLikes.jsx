import '../App.css'
function UserLikes({ likes }) {
    return (
      <div className="likes-list">
        <h3>Your Likes:</h3>
        <ul>
          {likes.length === 0 ? (
            <li>No likes added yet.</li>
          ) : (
            likes.map((like, index) => <li key={index}>{like}</li>)
          )}
        </ul>
      </div>
    )
  }
  
  export default UserLikes  