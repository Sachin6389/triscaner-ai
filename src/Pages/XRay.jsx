import React, { useState, useEffect } from "react";
import axios from "axios";

function XRay() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ CHANGE THIS BASE URL WHEN NEEDED
  const API_BASE = import.meta.env.VITE_API_URL; 
  console.log(API_BASE);
  


  // 🔥 Cleanup preview memory
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // 📁 Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  // 🔄 Reset
  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
  };

  // 🚀 API Call
  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      setResult(null);

      const response = await axios.post(
        `${API_BASE}/predict/bone`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          
        }
      );
      console.log( response);

      console.log("✅ API RESPONSE:", response.data);

      const data = response.data;

      // ✅ Strict validation
      if (!data || data.error) {
        alert(data?.error || "Invalid response from server");
        println("❌ API ERROR DETAILS:", data);
        return;
      }

      if (!data.top_prediction) {
        alert("Server response missing prediction");
        return;
      }

      setResult(data);

    } catch (error) {
      console.error("❌ API ERROR:", error);

      if (error.response) {
        alert(error.response.data?.error || "Server error");
      } else if (error.request) {
        alert("Server not responding");
      } else {
        alert(error.message || "Something went wrong");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6 sm:py-10">

      {/* 🧠 Title */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700">
          X-Ray Scan Analysis
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Upload an X-ray image and get AI-powered results
        </p>
      </div>

      {/* 📦 Card */}
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 w-full max-w-md sm:max-w-xl md:max-w-2xl">

        {/* 📤 Upload */}
        <h1 className="text-xl font-semibold text-green-900 mb-4">
          Upload X-Ray Image
        </h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 w-full"
        />

        {/* 🖼 Preview */}
        {preview && (
          <div className="mb-4 flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-64 object-contain rounded-lg border"
            />
          </div>
        )}

        {/* ▶️ Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={loading || !image}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Get Result"}
          </button>

          <button
            onClick={handleReset}
            className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500"
          >
            Reset
          </button>
        </div>

        {/* ⏳ Loading */}
        {loading && (
          <div className="mt-4 text-center text-gray-600">
            Processing image... ⏳
          </div>
        )}

        {/* 📊 Result */}
        {result && !result.error && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">

            <h2 className="text-lg font-semibold text-green-700 mb-3">
              Result:
            </h2>

            {/* 🧾 Prediction */}
            <p>
              <strong>Prediction:</strong>{" "}
              <span
                className={
                  result.top_prediction === "Fractured"
                    ? "text-red-600 font-bold"
                    : "text-green-600 font-bold"
                }
              >
                {result.top_prediction}
              </span>
            </p>

            {/* 📈 Confidence */}
            <p className="mb-3">
              <strong>Confidence:</strong>{" "}
              {Number(result.confidence || 0).toFixed(2)}%
            </p>

            {/* ⚠️ Warning */}
            {result.top_prediction === "Fractured" && (
              <p className="text-red-500 font-semibold mb-3">
                ⚠️ Possible fracture detected. Consult a doctor.
              </p>
            )}

            {/* 🏆 Top Predictions */}
            {Array.isArray(result.top_k_predictions) && (
              <div className="mb-3">
                <h3 className="font-semibold">Top Predictions:</h3>
                {result.top_k_predictions.map((item, i) => (
                  <p key={i}>
                    {item.class}: {Number(item.confidence || 0).toFixed(2)}%
                  </p>
                ))}
              </div>
            )}

            {/* 📊 All Predictions */}
            {result.all_predictions && (
              <div>
                <h3 className="font-semibold">All Probabilities:</h3>

                {Object.entries(result.all_predictions).map(([key, value]) => (
                  <div key={key} className="mb-2">
                    <div className="flex justify-between text-sm">
                      <span>{key}</span>
                      <span>{Number(value || 0).toFixed(2)}%</span>
                    </div>

                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className={
                          key === "Fractured"
                            ? "bg-red-500 h-2 rounded-full"
                            : "bg-green-500 h-2 rounded-full"
                        }
                        style={{
                          width: `${Math.min(100, Number(value) || 0)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 🏥 Extra Info */}
            {result.symptoms?.length > 0 && (
              <div className="mt-3">
                <h3 className="font-semibold text-red-600">Symptoms:</h3>
                <ul className="list-disc ml-5">
                  {result.symptoms.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.hospitals?.length > 0 && (
              <div className="mt-3">
                <h3 className="font-semibold">Hospitals:</h3>
                <ul>
                  {result.hospitals.map((h, i) => (
                    <li key={i}>🏥 {h}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default XRay;