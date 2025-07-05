import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

export default function NewsChatPanel() {
  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "chatMessages"),
      orderBy("timestamp", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setChatMessages(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "news"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setNewsList(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;
    await addDoc(collection(db, "chatMessages"), {
      sender: user?.displayName || "Anonymous",
      text: message.trim(),
      timestamp: serverTimestamp(),
    });
    setMessage("");
  };

  const readAloud = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl p-4 max-h-[500px] overflow-y-auto text-sm shadow-md transition-colors duration-300">
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab("chat")}
          className={`px-3 py-1 rounded ${
            activeTab === "chat"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-600"
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab("news")}
          className={`px-3 py-1 rounded ${
            activeTab === "news"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-600"
          }`}
        >
          News
        </button>
      </div>

      {/* Chat Section */}
      {activeTab === "chat" ? (
        <div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className="bg-gray-100 dark:bg-gray-700 p-2 rounded cursor-pointer"
                onClick={() => readAloud(`${msg.sender} says ${msg.text}`)}
              >
                <strong>{msg.sender}: </strong> {msg.text}
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow bg-gray-200 dark:bg-gray-900 p-2 rounded text-black dark:text-white"
              placeholder="Enter message"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        // News Section
        <div>
          {newsList.length === 0 ? (
            <p className="text-gray-500 text-center">No news available yet.</p>
          ) : (
            newsList.map((news) => (
              <div
                key={news.id}
                className="bg-gray-100 dark:bg-gray-700 p-2 rounded mb-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setSelectedNews(news)}
              >
                <strong className="text-black dark:text-white">
                  {news.title}
                </strong>
                {news.timestamp && (
                  <div className="text-xs text-gray-500 dark:text-gray-300">
                    {new Date(news.timestamp.toDate()).toLocaleString()}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded max-w-lg shadow-xl transition-colors">
            <h2 className="text-xl font-bold mb-2">{selectedNews.title}</h2>
            <p>{selectedNews.description}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => readAloud(selectedNews.description)}
                className="bg-blue-500 px-4 py-2 rounded text-white"
              >
                🔊 Read
              </button>
              <button
                onClick={() => setSelectedNews(null)}
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
