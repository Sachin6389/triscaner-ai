import React, { useState, useEffect } from "react";
import axios from "axios";

function Ct() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [type, setType] = useState("brain");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Remove image when type changes
  useEffect(() => {
    setImage(null);
    setPreview(null);
    setResult(null);
  }, [type]);

  // Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  // Reset
  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
  };

  // API
  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image");

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      setResult(null);

      let url = "";
      if (type === "brain") url = "http://localhost:5000/predict/brainStroke";
      if (type === "chest") url = "http://localhost:5000/predict/chest";
      if (type === "kidney") url = "http://localhost:5000/predict/kidney";

      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);

    } catch (error) {
      console.error(error);
      alert("Error while predicting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        CT Scan Analysis
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl">

        {/* TYPE */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {["brain", "chest", "kidney"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`py-2 rounded ${
                type === t ? "bg-green-600 text-white" : "border"
              }`}
            >
              {t === "brain" && "🧠 Brain"}
              {t === "chest" && "🫁 Chest"}
              {t === "kidney" && "🧊 Kidney"}
            </button>
          ))}
        </div>

        {/* UPLOAD */}
        <h1 className="text-xl font-semibold text-green-900 mb-4">
          Upload CT Scan of {type} 
        </h1>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* PREVIEW */}
        {preview && (
          <img src={preview} alt="preview" className="mt-4 rounded border" />
        )}

        {/* BUTTONS */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          <button
            onClick={handleReset}
            className="w-full bg-red-500 text-white py-2 rounded"
          >
            Reset
          </button>
        </div>
         {loading && (
          <div className="mt-4 text-center text-gray-600">
            Processing image... ⏳
          </div>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded">

            <h2 className="font-bold text-green-700 mb-2">Result</h2>

            <p><strong>Prediction:</strong> {result.top_prediction}</p>
            <p><strong>Confidence:</strong> {result.confidence}%</p>
            {result.top_prediction !== "Normal " && result.top_prediction !== "Non-Stone" && (
              <p className="text-red-500 font-semibold mb-3">
                ⚠️ Possible condition detected. Consult a doctor.
              </p>
            )}

            {/* ✅ PROGRESS BARS */}
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
            
           

            {/* Symptoms */}
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

            {/* Hospitals */}
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

export default Ct;