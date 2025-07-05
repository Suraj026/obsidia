import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export default function NewsAdmin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const postNews = async () => {
    if (!title || !description) return alert("Fill all fields");

    try {
      await addDoc(collection(db, "news"), {
        title,
        description,
        timestamp: serverTimestamp(),
      });
      alert("✅ News posted!");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("❌ Failed to post news:", err);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg max-w-md mx-auto mt-6">
      <h2 className="text-lg font-bold mb-2">📰 Post Game News</h2>
      <input
        className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
        placeholder="Description"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={postNews}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Post News
      </button>
    </div>
  );
}
