import React, { useState } from "react";
import axios from "axios";

function Mri() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  // API
  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image");

    const formData = new FormData();

    // ✅ FIX: backend expects "image"
    formData.append("image", image);

    try {
      setLoading(true);
      setResult(null);

      const response = await axios.post(
        "http://localhost:5000/predict/brain",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      

      setResult(response.data);

    } catch (error) {
      console.error(error);
      alert("Error while predicting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6 sm:py-10">

      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          Brain MRI Analysis
        </h1>
        <p className="text-gray-600 mt-2">
          Upload MRI image for AI-based classification
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">

        {/* Upload */}
        <h1 className="text-xl font-semibold text-green-900 mb-4">
          Upload MRI Scan of brain
        </h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />

        {/* Preview */}
        {preview && (
          <img src={preview} alt="preview" className="mb-4 rounded border" />
        )}

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Analyzing..." : "Analyze MRI"}
        </button>

        {/* Loading */}
        {loading && (
          <div className="mt-4 text-center text-gray-600">
            Processing image... ⏳
          </div>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded">

            <h2 className="text-lg font-semibold text-green-700 mb-2">
              Result
            </h2>

            {/* ✅ FIXED */}
            <p><strong>Prediction:</strong> {result.top_prediction}</p>

            <p><strong>Confidence:</strong> {result.confidence}%</p>
            {result.top_prediction !== "Normal " && (
              <p className="text-red-500 font-semibold mb-3">
                ⚠️ Possible condition detected. Consult a doctor.
              </p>
            )}





            {/* ✅ All Predictions */}
            {result.all_predictions && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Confidence Distribution:</h3>

                {Object.entries(result.all_predictions).map(([label, value]) => (
                  <div key={label} className="mb-2">

                    <div className="flex justify-between text-sm">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>

                    <div className="w-full bg-gray-300 rounded h-2">
                      <div
                        className="bg-green-600 h-2 rounded"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>

                  </div>
                ))}
              </div>
            )}
            {/* ✅ Symptoms */}
            {result.symptoms?.length > 0 && (
              <div className="mt-3">
                <h3 className="font-semibold">Symptoms:</h3>
                <ul>
                  {result.symptoms.map((s, i) => (
                    <li key={i}>• {s}</li>
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

export default Mri;