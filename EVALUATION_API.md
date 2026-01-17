# Dyslexia Evaluation API & Frontend Integration Guide

This endpoint aggregates data from both the **Word Reading Test (Test 1)** and the **Adaptive Dictation Test (Test 2)** to provide a comprehensive dyslexia risk assessment using a logistic regression model.

## Endpoint Definition

- **URL**: `/evaluate_dyslexia`
- **Method**: `POST`
- **Content-Type**: `application/json`

### Request Body
The body must contain the full history of user responses from both tests.

```json
{
  "test1_data": [
    {
      "audio": "bed",
      "selected": "ded",
      "correct": false,
      "reaction_time": 1.5
    },
    ...
  ],
  "test2_data": [
    {
      "text_word": "dog", 
      "options": ["dog", "bog"],
      "selected": "dog",
      "correct": true,
      "reaction_time": 0.9
    },
    ...
  ]
}
```

### Response Body
Returns the prediction and the derived features used for the assessment.

```json
{
  "risk_level": "LOW RISK",         // "LOW RISK" or "HIGH RISK"
  "dyslexia_probability": 0.334,    // 0.0 to 1.0
  "features": {
    "avg_word_time_ms": 1356.5,
    "reading_speed_wpm": 44.2,
    "word_error_rate": 0.15,
    "phoneme_accuracy": 0.85,
    "confusable_error_rate": 0.18   // Error rate on words with b/d/p/q
    // ... other internal metrics
  }
}
```

---

## Frontend Implementation Guide

To successfully use this evaluation system, the frontend must act as a data collector across the entire session.

### Step 1: State Management
Maintain a global state (e.g., Redux, Context API, or a top-level object) to store the results of each test phase.

```javascript
// Example State Structure
const sessionData = {
  test1_responses: [],
  test2_responses: []
};
```

### Step 2: Collecting Test 1 Data (Word Reading)
As the user completes each trial in Test 1, verify you are capturing the following fields for every response:
- `audio`: The word text associated with the audio.
- `selected`: The option selected by the user.
- `correct`: Boolean (`true` / `false`).
- `reaction_time`: Time taken in **seconds** (float).

**After Test 1 Finishes:**
Store the collected array into `sessionData.test1_responses`.

### Step 3: Collecting Test 2 Data (Adaptive Dictation)
Similarly for Test 2, capture the response objects. 
*Note: Test 2 might rely on generated "text_word" or "audio_word", ensure the key `text_word` or `audio` containing the target word is present.*

**After Test 2 Finishes:**
Store the collected array into `sessionData.test2_responses`.

### Step 4: Final Evaluation Call
Once both tests are complete, make the final API call to get the assessment.

```javascript
async function getDyslexiaAssessment() {
  const payload = {
    test1_data: sessionData.test1_responses,
    test2_data: sessionData.test2_responses
  };

  try {
    const response = await fetch('http://localhost:5000/evaluate_dyslexia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    
    if (result.error) {
      console.error("Evaluation Error:", result.error);
      return;
    }

    displayResults(result);

  } catch (error) {
    console.error("Network Error:", error);
  }
}
```

### Step 5: Displaying Results
Use the response to show a user-friendly report.

- **Risk Level**: Display prominently (e.g., Green for Low Risk, Red/Orange for High Risk).
- **Probability**: formatted as a percentage.
- **Insights**: You can use the `features` object to show specific areas of struggle:
    - *High `confusable_error_rate`* -> "User struggles with similar looking letters (b/d/p/q)."
    - *Low `reading_speed_wpm`* -> "Reading speed is slower than average."
