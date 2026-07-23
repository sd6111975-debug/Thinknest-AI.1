import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// =====================================================
// BASIC HELPERS
// =====================================================

function cleanText(text) {
  return String(text || "")
    .trim()
    .replace(/\s+/g, " ");
}

function lower(text) {
  return cleanText(text).toLowerCase();
}

function containsAny(text, words) {
  const value = lower(text);

  return words.some((word) =>
    value.includes(word.toLowerCase())
  );
}

function extractTopic(message, patterns) {
  let topic = message;

  patterns.forEach((pattern) => {
    topic = topic.replace(pattern, "");
  });

  topic = topic
    .replace(/^\s*(on|about|regarding|for)\s+/i, "")
    .replace(/[?.!]+$/, "")
    .trim();

  return topic || "the given topic";
}

function wordCount(text) {
  return cleanText(text)
    .split(/\s+/)
    .filter(Boolean).length;
}

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ThinkNest AI",
    aiAvailable: true,
    engine: "ThinkNest Local Intelligence Engine",
    apiRequired: false,
  });
});

// =====================================================
// BRAINSTORM MODE
// =====================================================

function brainstormResponse(message, history) {
  const text = lower(message);

  // -----------------------------
  // STARTUP / BUSINESS
  // -----------------------------

  if (
    containsAny(text, [
      "startup idea",
      "business idea",
      "start a business",
      "business",
      "startup",
      "company idea",
      "product idea",
    ])
  ) {
    return `# 🚀 ThinkNest Startup Brainstorm

Based on your request:

> ${message}

Here is a practical way to develop the idea.

## 1. Identify the Problem

The first question is:

**What real problem are you solving?**

A strong startup should solve a problem that people actually experience.

## 2. Identify the Users

Your potential users could include:

- Students
- Parents
- Teachers
- Small businesses
- Professionals
- Everyday consumers

The exact audience depends on the problem you are solving.

## 3. Build the MVP

Start with the smallest useful version.

Your MVP should include:

- One clear purpose
- One main feature
- Simple interface
- Easy onboarding

## 4. Test the Idea

Show the prototype to real users.

Ask:

- Is this useful?
- Is it easy to use?
- What would you change?
- Would you use it again?

## 5. Improve

Use the feedback to improve the product.

### 💡 My recommendation

Don't try to build everything at once.

Use this cycle:

**Problem → Solution → Prototype → Test → Improve**

If you tell me your exact startup idea, I can help you develop the **features, target audience, business model, technology stack, and MVP roadmap**.`;
  }

  // -----------------------------
  // REAL-WORLD PROBLEM
  // -----------------------------

  if (
    containsAny(text, [
      "real world problem",
      "real-world problem",
      "solve a problem",
      "problem solving",
      "how can i solve",
      "solution for",
    ])
  ) {
    return `# 🧠 Real-World Problem Analysis

You described:

> ${message}

Let's solve this systematically.

## 🔍 Step 1 — Define the Problem

First, clearly identify what is happening and who is affected.

## 🎯 Step 2 — Find the Root Cause

The visible problem may not be the actual cause.

Ask:

- Why is this happening?
- When does it happen?
- Who is affected?
- What makes it difficult to solve?

## 💡 Step 3 — Generate Solutions

Create several possible solutions instead of immediately choosing one.

Consider:

1. A simple low-cost solution
2. A technology-based solution
3. A long-term solution

## ⚙️ Step 4 — Choose the Best Solution

Compare solutions based on:

- Cost
- Time
- Difficulty
- Impact
- Scalability

## 🚀 Step 5 — Build a Prototype

Create the smallest version that can be tested.

### Best approach

**Understand → Analyze → Ideate → Prototype → Test → Improve**

If you give me the **specific problem**, I can break it down and suggest a practical solution.`;
  }

  // -----------------------------
  // IDEA DEVELOPMENT
  // -----------------------------

  if (
    containsAny(text, [
      "idea",
      "concept",
      "what should i make",
      "what can i build",
      "project idea",
    ])
  ) {
    return `# 💡 Idea Development

Your idea:

> ${message}

Let's develop it.

## 🌟 Core Concept

The idea should have one clear purpose.

## 👥 Target Users

Identify who will benefit from it.

## 🛠️ Main Features

Start with 3-5 important features.

## ⭐ Unique Feature

Add one feature that makes your project different.

## 🚀 MVP

Build the simplest working version first.

## 📈 Future Improvements

After the MVP works, you can add:

- More features
- Better design
- Personalization
- Automation
- AI capabilities

### ThinkNest Recommendation

Focus on solving one problem extremely well before adding unnecessary features.`;
  }

  // -----------------------------
  // DEFAULT BRAINSTORM
  // -----------------------------

  return `# 🧠 ThinkNest Brainstorm

I understand your idea as:

> ${message}

Let's think about it from three perspectives.

### 💡 Possibility

What could this idea become?

### ⚙️ Practicality

Can it realistically be built with your available time, skills, budget, and technology?

### 🎯 Impact

Who would benefit from it and what problem would it solve?

### 🚀 Recommended Next Step

Start by defining:

**Problem → Target User → Solution → MVP → Testing**

Give me more details about your idea and I can help you develop it into a practical solution.`;
}

// =====================================================
// STUDY MODE
// =====================================================

function studyResponse(message) {
  const text = lower(message);

  // PHOTOSYNTHESIS

  if (
    containsAny(text, [
      "photosynthesis",
      "how plants make food",
    ])
  ) {
    return `# 🌱 Photosynthesis

Photosynthesis is the process by which green plants make their own food using sunlight.

## What plants need

Plants use:

- ☀️ Sunlight
- 💧 Water
- 💨 Carbon dioxide
- 🍃 Chlorophyll

## What plants produce

The process produces:

- 🍬 Glucose — used as food
- 💨 Oxygen — released into the atmosphere

### Simple equation

**Carbon dioxide + Water + Sunlight → Glucose + Oxygen**

### In simple words

Plants take carbon dioxide from the air and water from the soil. Chlorophyll captures sunlight, which provides the energy needed to make glucose.

The oxygen produced during this process is released into the atmosphere.

### 🌍 Why is it important?

Photosynthesis is important because it provides food for plants and releases oxygen that many living organisms need to survive.`;
  }

  // NEWTON LAWS

  if (
    containsAny(text, [
      "newton's first law",
      "newton first law",
    ])
  ) {
    return `# ⚙️ Newton's First Law of Motion

Newton's First Law states that:

**An object remains at rest or continues moving with constant velocity unless acted upon by an external unbalanced force.**

This is also called the **Law of Inertia**.

### Example

A book lying on a table remains at rest until someone pushes it.

Similarly, when a moving bus suddenly stops, passengers tend to move forward because their bodies want to continue moving.

### Key idea

Objects resist changes in their state of motion.

This resistance is called **inertia**.`;
  }

  if (
    containsAny(text, [
      "newton's second law",
      "newton second law",
    ])
  ) {
    return `# ⚙️ Newton's Second Law of Motion

Newton's Second Law explains how force affects the motion of an object.

The formula is:

**F = ma**

Where:

- **F** = Force
- **m** = Mass
- **a** = Acceleration

### Example

If you push an empty shopping cart, it accelerates easily.

If the cart is heavily loaded, you need more force to produce the same acceleration.

### Key idea

More force → More acceleration

More mass → Less acceleration for the same force`;
  }

  // WATER CYCLE

  if (
    containsAny(text, [
      "water cycle",
      "water cycle explain",
    ])
  ) {
    return `# 💧 The Water Cycle

The water cycle describes the continuous movement of water between Earth's surface and atmosphere.

## 1. Evaporation

Sunlight heats water in oceans, rivers, and lakes. The water changes into water vapor.

## 2. Condensation

Water vapor rises, cools, and forms tiny water droplets that create clouds.

## 3. Precipitation

When water droplets become heavy, they fall as:

- Rain
- Snow
- Hail

## 4. Collection

Water collects in rivers, lakes, oceans, and underground sources.

Then the cycle begins again.

### In short

**Evaporation → Condensation → Precipitation → Collection**`;
  }

  // GRAVITY

  if (
    containsAny(text, [
      "gravity",
      "gravitational force",
    ])
  ) {
    return `# 🌍 Gravity

Gravity is the force that attracts objects toward one another.

On Earth, gravity pulls objects toward the center of the planet.

### Example

When you drop a ball, it falls toward the ground because Earth's gravity pulls it downward.

### Why is gravity important?

Gravity:

- Keeps us on Earth
- Keeps the Moon in orbit around Earth
- Keeps planets in orbit around the Sun
- Causes objects to fall

Without gravity, life as we know it would not exist.`;
  }

  // MATH

  if (
    containsAny(text, [
      "solve",
      "calculate",
      "equation",
      "math problem",
    ])
  ) {
    return `# 🧮 Let's Solve the Problem

You asked:

> ${message}

I can help you solve it step-by-step.

### Step 1

Identify the information given in the question.

### Step 2

Determine which mathematical concept or formula is required.

### Step 3

Substitute the values into the formula.

### Step 4

Perform the calculation carefully.

### Step 5

Check the final answer.

📌 **Send me the complete mathematical question**, and I can work through the exact problem with you.`;
  }

  // DEFAULT STUDY

  return `# 📚 Study Assistant

You asked about:

> ${message}

Let's understand the topic clearly.

## Step 1 — Understand the Definition

First, identify what the concept means.

## Step 2 — Understand How It Works

Break the concept into smaller parts.

## Step 3 — Look at an Example

Connect the concept to a real-world situation.

## Step 4 — Remember the Key Point

Summarize the most important information in one or two sentences.

If you send me the **exact question or textbook topic**, I can explain it at your level with examples and step-by-step reasoning.`;
}

// =====================================================
// CODING MODE
// =====================================================

function codingResponse(message) {
  const text = lower(message);

  // REACT

  if (
    containsAny(text, [
      "react",
      "jsx",
      "react component",
    ])
  ) {
    return `# ⚛️ React Development Help

You're working with React.

A good React debugging process is:

## 1. Check the Browser Console

Look for red errors.

## 2. Check the Terminal

Vite and Node.js errors usually appear there.

## 3. Check Imports

Make sure the file paths are correct.

## 4. Check Component Structure

A React component should return valid JSX.

## 5. Check State

Make sure state is updated correctly.

## 6. Check API Requests

Verify:

- URL
- Method
- Headers
- Request body
- Backend status

### ThinkNest Architecture

For your project:

**React Frontend**
↓
**ChatWindow.jsx**
↓
**Fetch Request**
↓
**server.js**
↓
**Local AI Engine**

If you send me the exact error and code, I can identify the specific problem.`;
  }

  // API / FETCH

  if (
    containsAny(text, [
      "failed to fetch",
      "fetch error",
      "cannot connect",
      "connection refused",
    ])
  ) {
    return `# 🔧 Failed to Fetch — Debugging

A **Failed to Fetch** error usually means your frontend cannot reach your backend.

Check these steps:

### 1. Is the backend running?

Run:

\`\`\`bash
node src/components/server/server.js
\`\`\`

### 2. Is the backend using port 3001?

Your frontend should call:

\`\`\`
http://localhost:3001/api/chat
\`\`\`

### 3. Test the health endpoint

Open:

\`\`\`
http://localhost:3001/api/health
\`\`\`

You should receive a JSON response.

### 4. Check CORS

Your Express server should include:

\`\`\`js
app.use(cors());
\`\`\`

### 5. Restart both servers

Stop both servers and restart them.

**Frontend:**

\`\`\`bash
npm run dev
\`\`\`

**Backend:**

\`\`\`bash
node src/components/server/server.js
\`\`\``;
  }

  // JAVASCRIPT

  if (
    containsAny(text, [
      "javascript",
      "javascript code",
      "js code",
    ])
  ) {
    return `# 💻 JavaScript Help

You're asking about JavaScript.

JavaScript is commonly used for:

- Web applications
- Frontend interfaces
- Backend servers
- APIs
- Interactive websites

A good way to solve a JavaScript problem is:

1. Understand the expected output.
2. Check the input.
3. Identify the error.
4. Trace the execution.
5. Fix the root cause.
6. Test the result.

Send me the exact JavaScript code or error and I can help debug it.`;
  }

  // PYTHON

  if (
    containsAny(text, [
      "python code",
      "python programming",
    ])
  ) {
    return `# 🐍 Python Programming

Python is a popular programming language used for:

- AI
- Machine learning
- Automation
- Web development
- Data analysis
- Game development

When solving a Python problem:

1. Understand the input.
2. Define the expected output.
3. Break the problem into functions.
4. Write the code.
5. Test edge cases.

Send me your Python code or problem and I'll help you solve it.`;
  }

  // DEFAULT CODING

  return `# 💻 ThinkNest Coding Assistant

I understand that you're working on:

> ${message}

Let's solve it systematically.

### 1. Identify the Problem

What should the program do?

### 2. Find the Cause

What is preventing it from working?

### 3. Apply the Fix

Change the smallest amount of code necessary.

### 4. Test

Run the program again.

### 5. Improve

Clean up the solution once it works.

Paste your **code and exact error message**, and I can help you identify the problem.`;
}

// =====================================================
// WRITING MODE
// =====================================================

function writingResponse(message) {
  const text = lower(message);

  // -----------------------------
  // ESSAY
  // -----------------------------

  if (
    containsAny(text, [
      "write an essay",
      "write essay",
      "essay on",
      "essay about",
      "give me an essay",
      "create an essay",
    ])
  ) {
    const topic = extractTopic(message, [
      /write an essay on/gi,
      /write an essay about/gi,
      /write essay on/gi,
      /write essay about/gi,
      /essay on/gi,
      /essay about/gi,
      /give me an essay on/gi,
      /give me an essay about/gi,
      /create an essay on/gi,
      /create an essay about/gi,
    ]);

    return `# ${topic}

## Introduction

${topic} is an important subject that has a significant impact on our lives and society. It is a topic that deserves our attention because it affects the way people live, think, and interact with the world around them.

## Importance of ${topic}

There are many reasons why ${topic} is important. It influences individuals and communities in different ways. Understanding its importance helps us become more aware and encourages us to make responsible decisions.

## Main Points

One of the most important aspects of ${topic} is its effect on our everyday lives. The choices we make and the actions we take can influence the people around us and the environment.

Another important point is the need for awareness. When people understand a subject properly, they are more likely to take positive action. Education and knowledge can help us identify challenges and find better solutions.

Everyone has a role to play. Even small efforts can create meaningful changes when individuals work together. Young people can also contribute by learning about the topic and encouraging others to become more responsible.

## Conclusion

In conclusion, ${topic} is an important subject that deserves attention and understanding. By becoming aware of its importance and taking responsible actions, we can contribute to positive changes in our society and create a better future for everyone.

### ✨ ThinkNest AI Writing Tools

You can now ask me to:

- Make this essay **100 words**
- Make it **150 words**
- Make it **200 words**
- Make it suitable for **Class 8**
- Make it more **impressive**
- Make it **shorter**
- Add **more points**
- Convert it into a **speech**`;
  }

  // -----------------------------
  // SPEECH
  // -----------------------------

  if (
    containsAny(text, [
      "write a speech",
      "speech on",
      "speech about",
    ])
  ) {
    const topic = extractTopic(message, [
      /write a speech on/gi,
      /write a speech about/gi,
      /speech on/gi,
      /speech about/gi,
    ]);

    return `# Speech on ${topic}

Good morning respected teachers and my dear friends.

Today, I would like to speak about **${topic}**.

${topic} is an important subject that affects our lives in many ways. Understanding this topic helps us become more responsible and aware members of society.

We should understand its importance and think about how our actions can make a positive difference. Every individual has a role to play, and even small efforts can lead to meaningful changes when we work together.

As students, we can contribute by learning more, spreading awareness, and encouraging others to take positive actions.

In conclusion, ${topic} is not just a subject to study. It is something that can influence our future. Let us understand its importance and do our part to create a better world.

Thank you, and have a wonderful day.`;
  }

  // -----------------------------
  // ARTICLE
  // -----------------------------

  if (
    containsAny(text, [
      "write an article",
      "article on",
      "article about",
    ])
  ) {
    const topic = extractTopic(message, [
      /write an article on/gi,
      /write an article about/gi,
      /article on/gi,
      /article about/gi,
    ]);

    return `# ${topic}

**By ThinkNest AI**

${topic} is a subject that has become increasingly important in today's world.

It affects individuals, communities, and society in different ways. Understanding the topic allows us to make informed decisions and recognize both its benefits and challenges.

One of the most important aspects of ${topic} is its impact on everyday life. The way we respond to this subject can influence our future.

Awareness and education are essential. When people understand the challenges involved, they can work together to develop practical solutions.

The responsibility does not belong to one person alone. Everyone can contribute through small but meaningful actions.

### Conclusion

${topic} is an important issue that deserves our attention. By learning more and taking responsible action, we can contribute to a better future.`;
  }

  // -----------------------------
  // LETTER
  // -----------------------------

  if (
    containsAny(text, [
      "write a letter",
      "letter to",
      "write an application",
      "application to",
    ])
  ) {
    return `# Formal Letter / Application

**To,**  
The Principal  
[School Name]

**Subject: ${message}**

Respected Sir/Madam,

I am writing this letter to respectfully bring the above-mentioned matter to your attention.

I kindly request you to consider my request and take the necessary action. I would be grateful for your understanding and support.

I hope you will consider my request positively.

Thank you.

Yours sincerely,  
**[Your Name]**  
**Class: [Your Class]**  
**Date: [Date]**`;
  }

  // -----------------------------
  // STORY
  // -----------------------------

  if (
    containsAny(text, [
      "write a story",
      "create a story",
      "short story",
      "story about",
    ])
  ) {
    return `# The Idea That Changed Everything

One morning, a young student had an unusual idea.

At first, nobody believed that the idea could become something useful. There were many difficulties, and several attempts failed.

However, instead of giving up, the student decided to learn from every mistake.

Day after day, the idea slowly improved.

One evening, after weeks of hard work, the project finally worked.

The student realized something important: success does not always come from having the perfect idea. Sometimes, it comes from continuing to improve an imperfect idea.

From that day onward, the student understood that every great achievement begins with a small step.

### Moral

**Never be afraid to start small. Learn from your mistakes and keep improving.**`;
  }

  // -----------------------------
  // SUMMARY
  // -----------------------------

  if (
    containsAny(text, [
      "summarize",
      "summary",
      "summarise",
    ])
  ) {
    return `# 📝 Summary Assistant

I can summarize text into:

### Short Summary
2-3 sentences containing only the main idea.

### Detailed Summary
A clear explanation containing the important points.

### Key Points
- Main idea
- Important fact
- Important conclusion

Paste the text you want summarized, and I can create the summary.`;
  }

  // -----------------------------
  // DEFAULT
  // -----------------------------

  return `# ✍️ ThinkNest Writing Assistant

I can directly create content for you.

Try asking:

- "Write an essay on artificial intelligence."
- "Write a 150-word essay on trees."
- "Write a speech about climate change."
- "Write an article about technology."
- "Write a letter to my principal."
- "Write a short story about a futuristic city."

Tell me exactly what you want me to write, and I'll create it for you.`;
}

// =====================================================
// PROJECT PLANNER MODE
// =====================================================

function projectResponse(message) {
  const text = lower(message);

  if (
    containsAny(text, [
      "website",
      "web app",
      "website project",
    ])
  ) {
    return `# 🚀 Website Project Plan

Project:

> ${message}

## Phase 1 — Planning

Define:

- Target users
- Main problem
- Core features
- Technology stack

## Phase 2 — UI/UX

Create:

- Homepage
- Navigation
- Main feature
- Responsive design
- Mobile layout

## Phase 3 — Development

Build the core functionality first.

Recommended structure:

**Frontend**
→ React / Vite

**Backend**
→ Node.js / Express

**Database**
→ Add only if necessary

## Phase 4 — Testing

Test:

- Buttons
- Forms
- API requests
- Mobile responsiveness
- Error handling

## Phase 5 — Polish

Add:

- Animations
- Loading states
- Better spacing
- Visual hierarchy
- Error messages

## Phase 6 — Presentation

Prepare:

1. Problem
2. Solution
3. Features
4. Technology
5. Live Demo
6. Future Scope

### ⚡ Priority

If time is limited:

**Working Feature > Reliability > UI > Extra Features**`;
  }

  return `# 🚀 Project Plan

Project request:

> ${message}

## 1. Define

Clearly identify the problem and goal.

## 2. Plan

List the essential features.

## 3. Build

Create the MVP with the most important functionality.

## 4. Test

Check the project for errors.

## 5. Polish

Improve the design and user experience.

## 6. Present

Prepare a clear demonstration.

### Recommended workflow

**Idea → Research → Plan → Build → Test → Improve → Present**

If you tell me your **deadline, team size, budget, and technology**, I can create a more specific roadmap.`;
}

// =====================================================
// CREATIVE MODE
// =====================================================

function creativeResponse(message) {
  const text = lower(message);

  if (
    containsAny(text, [
      "logo",
      "branding",
      "brand",
    ])
  ) {
    return `# 🎨 Creative Branding Concept

Based on:

> ${message}

## Brand Direction

Create a modern, memorable identity that communicates the main purpose of the project.

### Visual Style

- Clean typography
- Strong visual symbol
- Consistent color palette
- Modern gradients
- Simple iconography

### Logo Concept

Use a simple symbol that represents the project's core idea.

### Brand Personality

The brand should feel:

- Innovative
- Friendly
- Intelligent
- Modern
- Trustworthy

### UI Direction

Use consistent:

- Colors
- Typography
- Spacing
- Buttons
- Icons

The most important goal is **visual consistency**.`;
  }

  if (
    containsAny(text, [
      "ui",
      "ux",
      "design",
      "interface",
    ])
  ) {
    return `# 🎨 UI/UX Concept

Your design request:

> ${message}

## Visual Direction

### Background

Use a clean dark background with subtle gradients.

### Primary Focus

The most important action should be visually obvious.

### Navigation

Keep navigation simple and predictable.

### Cards

Use cards to organize related information.

### Animation

Use subtle animations for:

- Page transitions
- Button interactions
- Loading states
- Hover effects

### User Experience

The user should always understand:

**Where am I?**

**What can I do?**

**What happens next?**

### ThinkNest Recommendation

Prioritize usability first, then add visual effects.`;
  }

  if (
    containsAny(text, [
      "image prompt",
      "ai image",
      "generate an image",
      "image generation",
    ])
  ) {
    return `# 🖼️ AI Image Prompt

Based on your request:

> ${message}

### Suggested Prompt

"Create a highly detailed, cinematic visual representing ${message}. Use dramatic lighting, realistic materials, atmospheric depth, professional composition, strong visual storytelling, high detail, and a modern cinematic aesthetic."

### Suggested Style

- Cinematic
- Photorealistic
- High detail
- Dynamic lighting
- Professional composition

You can adapt the prompt for different AI image generators.`;
  }

  return `# 🎨 Creative Studio

Your creative request:

> ${message}

Let's develop it into something unique.

### 🌟 Concept

Define the central idea.

### 🎨 Visual Identity

Choose colors, shapes, typography, and atmosphere.

### 🧠 Experience

Think about what the audience should feel.

### ⭐ Unique Element

Add one memorable feature that makes the concept different.

### 🚀 Final Direction

Turn the idea into a polished, practical creation.

Tell me whether you're creating a **story, design, logo, UI, brand, game, product, or visual concept**, and I'll help develop it.`;
}

// =====================================================
// MAIN AI ENGINE
// =====================================================

function generateAIResponse(message, mode, history) {
  switch (mode) {
    case "Brainstorm":
      return brainstormResponse(
        message,
        history
      );

    case "Study":
      return studyResponse(message);

    case "Coding":
      return codingResponse(message);

    case "Writing":
      return writingResponse(message);

    case "Project Planner":
      return projectResponse(message);

    case "Creative":
      return creativeResponse(message);

    default:
      return brainstormResponse(
        message,
        history
      );
  }
}

// =====================================================
// CHAT API
// =====================================================

app.post("/api/chat", (req, res) => {
  try {
    const {
      message,
      mode = "Brainstorm",
      history = [],
    } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Please enter a message.",
      });
    }

    console.log(
      `\n[ThinkNest AI] Mode: ${mode}`
    );

    console.log(
      `[ThinkNest AI] Message: ${message}`
    );

    const reply = generateAIResponse(
      cleanText(message),
      mode,
      history
    );

    res.json({
      reply,
      mode,
      source: "ThinkNest Local Intelligence Engine",
      historyLength: history.length,
    });
  } catch (error) {
    console.error(
      "[ThinkNest AI Error]",
      error
    );

    res.status(500).json({
      error:
        "ThinkNest AI encountered an unexpected error.",
    });
  }
});

// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {
  console.log("");
  console.log(
    "========================================"
  );
  console.log(
    "🧠 THINKNEST AI LOCAL INTELLIGENCE"
  );
  console.log(
    "========================================"
  );
  console.log(
    `🚀 Server: http://localhost:${PORT}`
  );
  console.log(
    `❤️ Health: http://localhost:${PORT}/api/health`
  );
  console.log(
    "🤖 Engine: Local ThinkNest Intelligence"
  );
  console.log(
    "🔑 API Key: Not Required"
  );
  console.log(
    "========================================"
  );
  console.log("");
  console.log(
    "ThinkNest AI is ready! 🚀"
  );
  console.log("");
});