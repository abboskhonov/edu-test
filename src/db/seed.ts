import { db } from "../lib/db"
import { articles, quizzes, questions, resources } from "./schema"

async function seed() {
  console.log("Seeding database...")

  // Seed articles
  await db.insert(articles).values([
    {
      id: "article-1",
      title: "Process Writing in the EFL Classroom",
      slug: "process-writing-efl",
      excerpt: "A comprehensive guide to implementing process-oriented writing instruction for English language learners.",
      content: "# Process Writing in the EFL Classroom\n\nProcess writing is a pedagogical approach...",
      category: "ESL/EFL",
      status: "published",
      featured: true,
      publishedAt: new Date(),
    },
    {
      id: "article-2",
      title: "Designing Effective Writing Rubrics",
      slug: "effective-writing-rubrics",
      excerpt: "How to build holistic and analytic rubrics that improve student feedback quality.",
      content: "# Designing Effective Writing Rubrics\n\nRubrics are essential tools...",
      category: "Assessment",
      status: "published",
      featured: true,
      publishedAt: new Date(),
    },
    {
      id: "article-3",
      title: "Scaffolding Academic Writing Skills",
      slug: "scaffolding-academic-writing",
      excerpt: "Graduated support techniques to help students develop complex academic writing competencies.",
      content: "# Scaffolding Academic Writing Skills\n\nScaffolding is a critical technique...",
      category: "Research Writing",
      status: "published",
      featured: true,
      publishedAt: new Date(),
    },
  ]).onConflictDoNothing()

  // Seed quizzes
  await db.insert(quizzes).values([
    {
      id: "quiz-1",
      title: "Writing Instruction Knowledge",
      slug: "writing-instruction",
      description: "Process writing, peer feedback, genre-based approaches.",
      category: "Writing Instruction",
      difficulty: "Intermediate",
      timeLimitMinutes: 20,
      passScore: 60,
      totalQuestions: 15,
      active: true,
    },
    {
      id: "quiz-2",
      title: "Grammar Teaching Methods",
      slug: "grammar-teaching",
      description: "Inductive teaching, error correction, focus on form.",
      category: "Grammar",
      difficulty: "Advanced",
      timeLimitMinutes: 25,
      passScore: 60,
      totalQuestions: 20,
      active: true,
    },
    {
      id: "quiz-3",
      title: "ESL/EFL Writing Pedagogy",
      slug: "esl-efl",
      description: "Academic register, cohesion, scaffolding techniques.",
      category: "ESL/EFL",
      difficulty: "Intermediate",
      timeLimitMinutes: 20,
      passScore: 60,
      totalQuestions: 15,
      active: true,
    },
  ]).onConflictDoNothing()

  // Seed sample questions for quiz-1
  await db.insert(questions).values([
    {
      id: "q-1-1",
      quizId: "quiz-1",
      text: "In the process writing approach, which stage comes immediately BEFORE drafting?",
      type: "multiple_choice",
      options: ["Brainstorming/Pre-writing", "Peer review", "Editing", "Publishing"],
      correctAnswerIndex: 0,
      explanation: "Pre-writing/brainstorming is the stage where students generate ideas before drafting.",
      order: 1,
      difficulty: "Beginner",
    },
    {
      id: "q-1-2",
      quizId: "quiz-1",
      text: "What is the primary purpose of peer feedback in process writing?",
      type: "multiple_choice",
      options: ["To replace teacher grading", "To build audience awareness and revision skills", "To save teacher time", "To identify grammar errors only"],
      correctAnswerIndex: 1,
      explanation: "Peer feedback helps students develop audience awareness and critical revision skills.",
      order: 2,
      difficulty: "Intermediate",
    },
  ]).onConflictDoNothing()

  // Seed resources
  await db.insert(resources).values([
    {
      id: "res-1",
      title: "Process Writing Lesson Plan Template",
      description: "A complete lesson plan for teaching process writing over 5 sessions.",
      category: "Lesson Plans",
      downloadCount: 0,
    },
    {
      id: "res-2",
      title: "Holistic vs Analytic Rubric Comparison",
      description: "Side-by-side comparison with examples for academic essays.",
      category: "Rubrics",
      downloadCount: 0,
    },
  ]).onConflictDoNothing()

  console.log("Seeding complete!")
}

seed().catch(console.error)
