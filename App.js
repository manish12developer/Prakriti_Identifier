import React, { useState } from 'react';
import './App.css';

const questions = [
  {
    section: 'Physical Traits',
    questions: [
      { q: 'Skin type', options: ['Dry', 'Oily', 'Balanced'] },
      { q: 'Body build', options: ['Thin', 'Muscular', 'Heavy'] },
      { q: 'Hair type', options: ['Dry', 'Oily', 'Thick', 'Thin'] },
    ]
  },
  {
    section: 'Mental & Emotional',
    questions: [
      { q: 'Mindset', options: ['Calm', 'Intense', 'Restless'] },
      { q: 'Memory', options: ['Good memory', 'Forgetful'] },
    ]
  },
  {
    section: 'Lifestyle',
    questions: [
      { q: 'Diet preference', options: ['Hot', 'Cold', 'Spicy', 'Sweet'] },
      { q: 'Sleep pattern', options: ['Deep', 'Light', 'Disturbed'] },
    ]
  }
];

const optionToPrakriti = {
  Dry: 'Vata',
  Thin: 'Vata',
  Restless: 'Vata',
  Cold: 'Vata',
  Light: 'Vata',
  Forgetful: 'Vata',

  Muscular: 'Pitta',
  Intense: 'Pitta',
  Spicy: 'Pitta',
  Hot: 'Pitta',
  Oily: 'Pitta',

  Heavy: 'Kapha',
  Calm: 'Kapha',
  Sweet: 'Kapha',
  Deep: 'Kapha',
  Balanced: 'Kapha',
  Thick: 'Kapha',
  'Good memory': 'Kapha',
};

function App() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [prakritiResult, setPrakritiResult] = useState('');
  const [error, setError] = useState('');

  const totalQuestions = questions.reduce((sum, sec) => sum + sec.questions.length, 0);

  const handleChange = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
    setError('');
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < totalQuestions) {
      setError('⚠️ Please answer all questions before submitting.');
      return;
    }

    const counts = { Vata: 0, Pitta: 0, Kapha: 0 };

    Object.values(answers).forEach(ans => {
      const dosha = optionToPrakriti[ans];
      if (dosha) counts[dosha]++;
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const dominant = sorted[0][0];

    setPrakritiResult(dominant);
    setSubmitted(true);
    setError('');
  };

  return (
    <div className="app">
      <h1>Prakriti Questionnaire</h1>

      {!submitted && (
        <>
          {questions.map((group, i) => (
            <div key={i} className="section">
              <h2>{group.section}</h2>
              {group.questions.map((item, j) => (
                <div key={j} className="question">
                  <p>{item.q}</p>
                  {item.options.map((opt, k) => (
                    <label key={k}>
                      <input
                        type="radio"
                        name={item.q}
                        value={opt}
                        checked={answers[item.q] === opt}
                        onChange={() => handleChange(item.q, opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit Answers</button>
          {error && <p className="error-message">{error}</p>}
        </>
      )}

      {submitted && (
        <div className="result">
          <h2>Your Selected Prakriti Type: <span style={{ color: "#007b77" }}>{prakritiResult}</span></h2>
          <h3>Your Selections:</h3>
          {Object.entries(answers).map(([q, a], i) => (
            <p key={i}><strong>{q}:</strong> {a}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;