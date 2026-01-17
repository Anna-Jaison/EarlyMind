# EarlyMindModel Backend API Documentation

This API powers the reading assessment frontend. It provides baseline word pairs and adaptive next-trial generation with audio support.

## Base URL
```
http://localhost:5000
```

## Endpoints

### 1. Get Baseline Pairs
Fetches the initial set of word pairs to establish a baseline.

- **URL**: `/baseline`
- **Method**: `GET`
- **Response**: Array of trial objects.

#### Response Example
```json
[
  {
    "audio": "bed",
    "audio_word": "bed",
    "audio_url": "http://localhost:5000/static/audio/bed.mp3",
    "options": ["bed", "ded"],
    "correct_index": 0
  },
  {
    "audio": "dog",
    "audio_word": "dog",
    "audio_url": "http://localhost:5000/static/audio/dog.mp3",
    "options": ["dog", "bog"],
    "correct_index": 0
  }
]
```

---

### 2. Get Next Trial
Submits the history of user responses to analyze performance and generate the next adaptive trial.

- **URL**: `/next-trial`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**: JSON object containing an array of `responses`.

#### Request Body Schema
| Field | Type | Description |
|---|---|---|
| `responses` | Array | List of previous trial results. |

**Response Item Schema:**
| Field | Type | Description |
|---|---|---|
| `audio` | String | The word presented (e.g., "bed"). |
| `selected` | String | The option the user selected (e.g., "ded"). |
| `correct` | Boolean | Whether the selection was correct. |
| `reaction_time` | Float | Time taken in seconds. |

#### Request Example
```json
{
  "responses": [
    {
      "audio": "bed",
      "selected": "ded",
      "correct": false,
      "reaction_time": 1.2
    },
    {
      "audio": "dog",
      "selected": "dog",
      "correct": true,
      "reaction_time": 0.8
    }
  ]
}
```

#### Response Example
```json
{
  "next_trial": {
    "audio_word": "dad",
    "audio_url": "http://localhost:5000/static/audio/dad.mp3",
    "options": ["dad", "bad"],
    "correct_index": 0
  },
  "analysis": {
    "assessment": "suspected phonological (b/d risk)",
    "stats": {
      "accuracy": 0.5,
      "avg_rt": 1.0
    }
  }
}
```


---

### 3. Dysgraphia Screening
Uploads a handwriting image for dysgraphia risk analysis.

- **URL**: `/dysgraphia`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Body**: Form data with a single file field.

#### Request Body Schema
| Field | Type | Description |
|---|---|---|
| `image` | File | The handwriting image file (jpg, png, etc.). |

#### Response Example
```json
{
  "median_letter_height": 34.0,
  "spacing_cv": 0.0,
  "size_cv": 0.173,
  "ocr_score": 100.0,
  "risk_score": 0.0,
  "verdict": "LOW RISK",
  "word_boxes": [
    {"x": 94, "y": 154, "w": 168, "h": 55},
    {"x": 272, "y": 154, "w": 186, "h": 55}
  ]
}
```

#### Response Fields
| Field | Type | Description |
|---|---|---|
| `risk_score` | Float | Calculated risk score based on metrics (0-10+). |
| `verdict` | String | "LOW RISK", "MODERATE RISK", or "HIGH RISK". |
| `spacing_cv` | Float | Coefficient of variation for word spacing. High values indicate irregular spacing. |
| `size_cv` | Float | Coefficient of variation for letter size. High values indicate irregular sizes. |
| `median_letter_height` | Float | Median height of detected letters in pixels. |
| `ocr_score` | Float | OCR confidence score (0-100). Lower scores imply illegibility. |
| `word_boxes` | Array | List of detected word bounding boxes `{x, y, w, h}` for visualization. |

---

## Audio Handling
- Each trial object includes an `audio_url`.
- This URL points to an MP3 file generated on-demand by the server.
- **Usage**: You can directly set this as the `src` attribute of an HTML `<audio>` element.

```html
<audio controls autoplay>
  <source src="http://localhost:5000/static/audio/bed.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
```

## CORS
CORS is enabled for all routes, allowing requests from any frontend origin (`*`).

