from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)
MODEL_FILE = os.path.join(os.path.dirname(__file__), "model.pkl")
MOVIES_CSV = os.path.join(os.path.dirname(__file__), "movies.csv")

# ---------------- Load or Train Model ----------------
if os.path.exists(MODEL_FILE):
    with open(MODEL_FILE, "rb") as f:
        data = pickle.load(f)
        movies = data["movies"]
        vectorizer = data["vectorizer"]
        genre_matrix = data["genre_matrix"]
else:
    movies = pd.read_csv(MOVIES_CSV)
    movies['genres'] = movies['genres'].fillna('').str.replace('|', ' ', regex=False)
    vectorizer = CountVectorizer(stop_words='english')
    genre_matrix = vectorizer.fit_transform(movies['genres'])
    with open(MODEL_FILE, "wb") as f:
        pickle.dump({"movies": movies, "vectorizer": vectorizer, "genre_matrix": genre_matrix}, f)

# ---------------- Recommendation Logic ----------------
def recommend_movies(user_genres, top_n=5):
    user_genres = user_genres.replace(',', ' ')
    user_vector = vectorizer.transform([user_genres])
    similarity = cosine_similarity(user_vector, genre_matrix).flatten()

    top_indices = similarity.argsort()[-top_n:][::-1]
    recommendations = movies.iloc[top_indices][['movieId', 'title', 'genres']]

    return recommendations.to_dict(orient="records")

# ---------------- API Routes ----------------
@app.route("/")
def home():
    return jsonify({"message": "Movie Recommender API is running!"})

@app.route("/recommend", methods=["GET"])
def recommend():
    user_genres = request.args.get("genres")
    top_n = int(request.args.get("top_n", 5))

    if not user_genres:
        return jsonify({"error": "Please provide genres in the query (e.g. ?genres=Action,Comedy)"}), 400

    recommendations = recommend_movies(user_genres, top_n)
    return jsonify(recommendations)

# ---------------- Run Server ----------------
if __name__ == "__main__":
    app.run(debug=True)