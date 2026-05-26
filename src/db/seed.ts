import { db } from "../lib/db"
import { articles, quizzes, questions, resources } from "./schema"

async function seed() {
  console.log("Seeding database...")

  // ─── ARTICLES ───
  await db.insert(articles).values([
    {
      id: "article-1",
      title: "Process Writing in the EFL Classroom",
      slug: "process-writing-efl",
      excerpt: "A comprehensive guide to implementing process-oriented writing instruction for English language learners, from brainstorming to final revision.",
      content: `Process writing is a pedagogical approach that treats writing as a recursive, multi-stage activity rather than a single-shot product. In EFL contexts, this approach is particularly powerful because it gives language learners time and structure to develop their ideas while simultaneously developing linguistic competence.

## The Five Stages

1. **Pre-writing / Brainstorming**: Students generate ideas through freewriting, clustering, or discussion. In EFL classrooms, this can be done in the L1 to reduce cognitive load.

2. **Drafting**: Students produce a first version without worrying about perfect grammar. The focus is on getting ideas down.

3. **Peer Review**: Students exchange drafts and provide structured feedback. This builds audience awareness and critical reading skills.

4. **Revision**: Based on feedback, students restructure content, add examples, clarify arguments. Revision focuses on global concerns (ideas, organization) before local concerns (grammar, spelling).

5. **Editing & Publishing**: Final polish and sharing with a real audience — class blog, school journal, or pen pal exchange.

## Why It Works for EFL

Process writing reduces anxiety because students know they will have multiple chances to improve. It also mirrors real-world writing more closely than timed essay exams. Research by Zamel (1983) and later Ferris & Hedgcock (2014) consistently shows that process-oriented instruction produces longer, more complex, and more coherent texts from L2 writers.

## Practical Tips

- Use graphic organizers to scaffold planning.
- Provide sentence starters for peer feedback ("I liked...", "I wondered...", "Have you considered...").
- Allow students to revise the same piece 2-3 times.
- Celebrate progress, not just final grades.`,
      category: "ESL/EFL",
      status: "published",
      featured: true,
      publishedAt: new Date("2024-10-15"),
    },
    {
      id: "article-2",
      title: "Designing Effective Writing Rubrics",
      slug: "effective-writing-rubrics",
      excerpt: "How to build holistic and analytic rubrics that improve student feedback quality, reduce grading bias, and build metacognitive awareness.",
      content: `Rubrics are scoring guides that articulate the expectations for an assignment by listing criteria and describing levels of quality. Well-designed rubrics can transform writing assessment from a mysterious, subjective process into a transparent learning tool.

## Holistic vs. Analytic Rubrics

**Holistic rubrics** assign a single score based on overall impression. They are faster to use and encourage teachers to consider the text as a whole. However, they provide limited diagnostic information.

**Analytic rubrics** break writing into components (ideas, organization, language use, mechanics) and score each separately. They take longer but give students precise information about strengths and weaknesses.

## Key Principles for Rubric Design

1. **Align with learning objectives**: Every criterion should connect to something you explicitly taught.
2. **Use student-friendly language**: Avoid jargon. A student should understand the rubric without a dictionary.
3. **Distinguish levels clearly**: The difference between "Proficient" and "Developing" should be observable, not vague.
4. **Include process criteria**: If you taught peer review, include "Incorporates peer feedback" as a criterion.
5. **Pilot and revise**: Use the rubric on sample papers, then adjust descriptors that don't discriminate well.

## Making Rubrics Teaching Tools

Don't just hand rubrics out at grading time. Use them before writing (to set expectations), during writing (for self-assessment), and after writing (for revision planning). When students internalize the criteria, they become more autonomous writers.`,
      category: "Assessment",
      status: "published",
      featured: true,
      publishedAt: new Date("2024-11-02"),
    },
    {
      id: "article-3",
      title: "Scaffolding Academic Writing Skills",
      slug: "scaffolding-academic-writing",
      excerpt: "Graduated support techniques to help students develop complex academic writing competencies over time, not overnight.",
      content: `Scaffolding is temporary support that helps learners accomplish tasks they cannot yet do independently. In academic writing, scaffolding bridges the gap between where students are and where they need to be.

## Types of Scaffolding in Writing Instruction

**Structural scaffolds**: Templates, sentence frames, graphic organizers, and paragraph models. Example: "The purpose of this study was to... The methodology involved..."

**Procedural scaffolds**: Checklists, process guides, and step-by-step instructions. Example: A revision checklist with specific questions about thesis clarity.

**Material scaffolds**: Access to dictionaries, corpora, and model texts. Example: Providing three exemplary introductions for students to analyze.

**Social scaffolds**: Collaborative writing, peer review, and teacher conferences. Example: Writing a paragraph together as a class before individual work.

## The Gradual Release Model

1. **I do**: Teacher models the writing strategy (think-aloud while drafting).
2. **We do**: Class writes collaboratively with heavy scaffolding.
3. **You do together**: Students write in pairs with moderate scaffolding.
4. **You do alone**: Independent writing with minimal scaffolding.

## Fading Support

The goal is to remove scaffolding as students gain competence. Watch for signs of readiness: students asking questions that go beyond the scaffold, students modifying templates creatively, students expressing frustration with restrictive frames. These are signals to reduce support.`,
      category: "Research Writing",
      status: "published",
      featured: true,
      publishedAt: new Date("2024-09-20"),
    },
    {
      id: "article-4",
      title: "Inductive vs Deductive Grammar Teaching",
      slug: "inductive-deductive-grammar",
      excerpt: "Comparing two fundamental approaches to grammar instruction and when to use each for maximum student benefit.",
      content: `The debate between inductive and deductive grammar teaching has persisted for decades. The reality is that both approaches have value, and effective teachers know when to use each.

## Deductive Teaching

In the deductive approach, the teacher presents the rule first, then provides examples and practice exercises.

**When it works**: With older learners, with explicit grammar goals, when time is limited, with rules that are straightforward and exception-free.

**Advantages**: Efficient, predictable, easy to assess.
**Disadvantages**: Passive learning, may not lead to deep understanding or transfer.

## Inductive Teaching

In the inductive approach, students analyze examples and discover the rule themselves.

**When it works**: With curious learners, with patterns that are discoverable, when fostering learner autonomy, with complex rules that are better understood through exploration.

**Advantages**: Deep processing, engagement, transfer to new contexts.
**Disadvantages**: Time-consuming, some students may miss the pattern, requires careful material design.

## A Blended Approach

Most effective grammar instruction combines both. For example:
1. Present examples (inductive exploration)
2. Elicit the pattern from students
3. Formalize the rule (deductive confirmation)
4. Provide controlled practice
5. Provide communicative practice
6. Monitor and give feedback

## Focus on Form vs. Focus on FormS

Long (1991) distinguished between:
- **Focus on FormS**: Isolated grammar lessons (deductive)
- **Focus on Form**: Brief attention to grammar during meaning-focused activities (inductive, incidental)

Research generally supports Focus on Form for acquisition, while Focus on FormS has a place for explicit knowledge and test preparation.`,
      category: "Grammar",
      status: "published",
      featured: false,
      publishedAt: new Date("2024-12-01"),
    },
    {
      id: "article-5",
      title: "AI Writing Tools in the Classroom: Ethics and Practice",
      slug: "ai-tools-classroom",
      excerpt: "How to ethically and effectively integrate AI writing assistants like Grammarly and ChatGPT into writing pedagogy.",
      content: `AI writing tools are here to stay. The question is not whether to allow them, but how to teach students to use them critically and responsibly.

## Types of AI Tools

**Grammar checkers** (Grammarly, LanguageTool): Surface-level correction of spelling, grammar, and style. Useful for proofreading but can undermine confidence if over-relied upon.

**Generative AI** (ChatGPT, Claude): Can produce entire texts, brainstorm ideas, rephrase sentences. Powerful but raises serious academic integrity concerns.

**Paraphrasing tools**: Help students express ideas in their own words. Can be useful for vocabulary expansion or can facilitate plagiarism if misused.

## Ethical Guidelines for Classroom Use

1. **Transparency**: Be explicit about what tools are permitted for which assignments. A blanket ban is unenforceable and ignores legitimate uses.

2. **Process over product**: If students submit process work (outlines, drafts, revision logs), generative AI use becomes visible and accountable.

3. **Teach critical evaluation**: Have students compare AI-generated text with human writing. What makes human writing better? More authentic? More creative?

4. **Emphasize voice and agency**: AI writes in generic patterns. Teach students to develop a distinctive voice that no algorithm can replicate.

5. **Academic integrity conversations**: Discuss why citation matters, why original thought matters, and why shortcuts ultimately harm learning.

## Practical Classroom Activities

- "AI vs Human" challenge: Students identify which of two paragraphs was written by AI.
- Prompt engineering workshop: Students craft prompts and evaluate the outputs critically.
- Revision race: Students improve an AI-generated paragraph to make it more specific, vivid, and personal.`,
      category: "Digital Literacy",
      status: "published",
      featured: false,
      publishedAt: new Date("2025-01-10"),
    },
    {
      id: "article-6",
      title: "Peer Feedback That Actually Works",
      slug: "peer-feedback-techniques",
      excerpt: "Structured peer review techniques that drive real improvement rather than superficial compliments.",
      content: `Peer feedback often fails because students don't know how to give it, don't trust it, or don't know what to do with it. Here's how to make peer review a powerful revision tool.

## Why Peer Feedback Fails

1. **Vague praise**: "Good job!" provides no actionable information.
2. **Focus on grammar**: Students fixate on spelling errors rather than global issues.
3. **Power dynamics**: Students hesitate to criticize friends or dominant peers.
4. **No follow-through**: Feedback is given but never used for revision.

## Making Peer Feedback Effective

**1. Model the process**: Show students what helpful vs. unhelpful feedback looks like. Use anonymous sample comments and have the class evaluate them.

**2. Use structured protocols**: Don't ask "What do you think?" Ask specific questions:
- What is the writer's main claim?
- Where is the evidence strongest? Weakest?
- Where did you get confused?
- What question would you ask the writer?

**3. Separate feedback stages**: First round on content/argument. Second round on organization. Third round on language. Never all at once.

**4. Train reviewers, not just writers**: Dedicate class time to teaching the skill of giving feedback. It is a literacy skill in itself.

**5. Create accountability**: Have writers summarize the feedback they received and explain their revision plan. This shows whether they understood and valued the feedback.

## Digital Tools for Peer Review

Google Docs comments, Canvas peer review, and dedicated tools like Eli Review allow asynchronous feedback, revision tracking, and instructor visibility into the process. Choose tools that make the process visible, not just the product.`,
      category: "Methodology",
      status: "published",
      featured: false,
      publishedAt: new Date("2024-11-18"),
    },
    {
      id: "article-7",
      title: "Teaching Academic Register to EFL Students",
      slug: "academic-register-efl",
      excerpt: "Helping students understand and use the conventions of formal academic writing in a second language.",
      content: `Academic register is the set of linguistic conventions that signal "this is formal scholarly writing." EFL students often struggle because these conventions differ dramatically from conversational English and from their L1 academic traditions.

## What Is Academic Register?

Academic register includes:
- **Lexical choices**: Avoiding contractions, colloquialisms, and emotional language; using discipline-specific terminology.
- **Grammatical features**: Passive voice, nominalization (turning verbs into nouns), complex noun phrases, hedging language.
- **Discourse patterns**: Explicit thesis statements, topic sentences, transitions, and evidence-based argumentation.
- **Citation practices**: Integrating sources, distinguishing one's voice from others'.

## Teaching Strategies

**1. Contrastive analysis**: Have students compare academic and informal versions of the same content. What changed? Why?

**2. Corpus-based activities**: Use academic word lists (AWL, AVL) and concordancers to show how target vocabulary is used in context.

**3. Genre analysis**: Examine real academic articles in the student's field. Identify moves (Swales' CARS model) and rhetorical patterns.

**4. Scaffolded practice**: Sentence combining exercises, paragraph templates, and guided summaries build register awareness incrementally.

**5. Error analysis with explanation**: When students use informal register, explain the social meaning — not just the grammatical correction. "This sounds conversational; an academic reader expects more distance."

## Common Challenges

- **Over-formality**: Students produce awkward, stilted prose trying to sound "academic."
- **L1 transfer**: Students import academic conventions from their first language that differ from English norms.
- **Voice erosion**: In learning register, students may lose their authentic voice. Teach that clarity and precision are more important than complexity.`,
      category: "ESL/EFL",
      status: "published",
      featured: false,
      publishedAt: new Date("2024-10-28"),
    },
    {
      id: "article-8",
      title: "The Thesis Statement: A Writing Teacher's Guide",
      slug: "thesis-statement-guide",
      excerpt: "How to teach students to write clear, arguable, and specific thesis statements that guide the entire essay.",
      content: `The thesis statement is the anchor of academic writing. Yet it remains one of the most difficult skills to teach and learn. This guide breaks down the thesis into teachable components.

## What a Thesis Statement Is (and Is Not)

A thesis statement is:
- An arguable claim, not a fact
- Specific enough to be defended in the allotted space
- A guide for the reader — it previews the essay's structure
- Usually one to two sentences at the end of the introduction

A thesis statement is NOT:
- A topic announcement ("This essay is about pollution")
- A question
- A list of everything the essay will cover
- So broad it cannot be supported

## The Three-Part Thesis Structure

A strong thesis typically contains:
1. **Topic**: What are you writing about?
2. **Claim**: What is your position or argument?
3. **Reasons**: Why do you believe this? (Often 2-3 supporting points)

Example: "Schools should extend recess time (claim) because physical activity improves concentration (reason 1), reduces behavioral problems (reason 2), and supports social-emotional development (reason 3)."

## Teaching Sequence

1. **Analyze examples**: Show strong, weak, and mediocre thesis statements. Have students rank and justify.
2. **Thesis repair workshop**: Give students vague or overly broad thesis statements to revise.
3. **Peer testing**: Students exchange thesis statements. Can the peer predict the essay's content? If not, the thesis needs revision.
4. **Thesis evolution**: Allow (or require) students to revise their thesis after drafting the body. Real writing often refines the initial claim.

## Common Student Errors

- **The book report thesis**: Summarizes instead of argues.
- **The scattershot thesis**: Mentions too many unrelated points.
- **The obvious thesis**: States something no reasonable person would disagree with.
- **The hidden thesis**: Buried in paragraph three with no signposting.

## Assessment

Don't just grade the final thesis. Grade the process:
- Initial draft thesis
- Peer feedback on thesis clarity
- Revised thesis
- Alignment between thesis and body paragraphs`,
      category: "Research Writing",
      status: "published",
      featured: false,
      publishedAt: new Date("2024-12-15"),
    },
    {
      id: "article-9",
      title: "Formative vs Summative Writing Assessment",
      slug: "formative-summative-assessment",
      excerpt: "Understanding the difference and designing a balanced assessment system that supports growth.",
      content: `Assessment in writing classrooms often over-emphasizes summative evaluation (the final grade) at the expense of formative feedback (the learning process). A balanced approach improves both learning outcomes and student motivation.

## Summative Assessment

**Purpose**: To evaluate learning at the end of an instructional period.
**Examples**: Final essays, portfolio grades, standardized tests, end-of-term exams.
**Characteristics**: High stakes, evaluative, judgmental, typically graded.
**When it works**: For certification, placement, program evaluation, and accountability.

## Formative Assessment

**Purpose**: To monitor learning and provide ongoing feedback for improvement.
**Examples**: Draft conferences, peer review, self-assessment checklists, in-class writing samples, exit tickets.
**Characteristics**: Low stakes, descriptive, diagnostic, often ungraded or minimally graded.
**When it works**: During the learning process, when students can still act on feedback.

## The Assessment Balance

A healthy writing course includes both, in roughly this ratio:
- 70% formative (process work, drafts, revisions, participation)
- 30% summative (final polished pieces, portfolio)

## Formative Assessment Techniques

**1. Draft conferences**: 5-minute individual conversations about one specific aspect of the draft.

**2. Targeted peer review**: Focus peer feedback on one criterion at a time (today: evidence; tomorrow: organization).

**3. Self-assessment**: Students evaluate their own drafts against criteria before submitting. This develops metacognition.

**4. Process portfolios**: Collections of all drafts, revisions, and reflections. The portfolio shows growth, not just final products.

**5. Minimally graded writing**: Frequent short writes (exit tickets, reflections, journal entries) that are checked for completion or given brief feedback, not detailed grades.

## Grading for Growth

Consider alternative grading models:
- **Contract grading**: Students earn grades by meeting process benchmarks (attending conferences, completing revisions, submitting on time).
- **Portfolio grading**: Grade the portfolio, not individual assignments. This encourages risk-taking.
- **Revision for credit**: Allow students to revise and resubmit for a higher grade. This makes summative assessment functionally formative.

## The Research Base

Black and Wiliam's (1998) meta-analysis showed that formative assessment produces learning gains larger than most other educational interventions. In writing specifically, feedback that is timely, specific, and actionable produces the strongest revisions (Ferris, 2003).`,
      category: "Assessment",
      status: "published",
      featured: false,
      publishedAt: new Date("2025-01-05"),
    },
    {
      id: "article-10",
      title: "Collaborative Writing with Google Docs",
      slug: "google-docs-collaborative",
      excerpt: "Leveraging real-time collaboration tools to teach writing as a social process.",
      content: `Google Docs transforms writing from a solitary activity into a social one. When used intentionally, it can teach collaboration, revision, and digital literacy alongside traditional writing skills.

## Pedagogical Benefits

**1. Real-time collaboration**: Multiple students can write simultaneously, seeing each other's contributions as they happen. This mirrors professional writing teams.

**2. Transparent revision history**: Every edit is tracked. Teachers and students can see how a text evolved, who contributed what, and when major changes occurred.

**3. Embedded feedback**: Comments, suggestions, and in-text notes allow feedback without disrupting the writing flow.

**4. Accessibility**: Cloud-based access means students can write and revise from any device, reducing barriers.

## Classroom Activities

**Round-robin essays**: Each student writes one paragraph, then passes to the next. The final piece is edited by the group.

**Wikified research**: Small groups build a shared document on a research topic, each responsible for a different section.

**Live peer editing**: Project a student's draft on the board. The class suggests edits in real time using suggestion mode.

**Revision archaeology**: Students examine the version history of their own draft and write a reflection on their revision choices.

## Managing Challenges

**Free-riding**: Assign specific roles (researcher, drafter, editor, fact-checker) and require students to tag their contributions.

**Conflict**: Teach digital collaboration norms: assume good intent, address issues directly, use comments for constructive critique.

**Technical issues**: Always have a backup plan (download as Word, email copies) and teach students to use version history as a safety net.

## Assessment

Assess both product and process:
- Quality of the final text (group grade)
- Individual contributions (tracked in version history)
- Reflection on collaboration experience
- Response to peer suggestions`,
      category: "Digital Literacy",
      status: "published",
      featured: false,
      publishedAt: new Date("2024-11-25"),
    },
  ]).onConflictDoNothing()

  // ─── QUIZZES ───
  await db.insert(quizzes).values([
    {
      id: "quiz-1",
      title: "Writing Instruction Knowledge",
      slug: "writing-instruction",
      description: "Process writing, peer feedback, genre-based approaches, and writing pedagogy fundamentals.",
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
      description: "Inductive teaching, error correction, focus on form, and grammar pedagogy.",
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
      description: "Academic register, cohesion, scaffolding techniques, and second language writing.",
      category: "ESL/EFL",
      difficulty: "Intermediate",
      timeLimitMinutes: 20,
      passScore: 60,
      totalQuestions: 15,
      active: true,
    },
    {
      id: "quiz-4",
      title: "Research & Academic Writing",
      slug: "research-writing",
      description: "Literature review, citation formats, thesis statements, and research methodology.",
      category: "Research & Academic",
      difficulty: "Advanced",
      timeLimitMinutes: 30,
      passScore: 60,
      totalQuestions: 25,
      active: true,
    },
    {
      id: "quiz-5",
      title: "Digital Tools for Writing",
      slug: "digital-tools",
      description: "Collaborative tools, AI ethics, Grammarly usage, and digital literacy in writing instruction.",
      category: "Digital Tools",
      difficulty: "Beginner",
      timeLimitMinutes: 15,
      passScore: 60,
      totalQuestions: 12,
      active: true,
    },
    {
      id: "quiz-6",
      title: "Assessment & Rubrics",
      slug: "assessment-rubrics",
      description: "Holistic vs analytic rubrics, formative assessment, portfolio evaluation, and grading strategies.",
      category: "Assessment & Rubrics",
      difficulty: "Intermediate",
      timeLimitMinutes: 20,
      passScore: 60,
      totalQuestions: 18,
      active: true,
    },
    {
      id: "quiz-diag",
      title: "Diagnostic Test",
      slug: "diagnostic",
      description: "A comprehensive diagnostic assessment to identify your strengths and growth areas across all domains.",
      category: "Diagnostic",
      difficulty: "Mixed",
      timeLimitMinutes: 40,
      passScore: 0,
      totalQuestions: 30,
      isDiagnostic: true,
      active: true,
    },
  ]).onConflictDoNothing()

  // ─── QUIZ 1: Writing Instruction ───
  await db.insert(questions).values([
    {
      id: "q1-01", quizId: "quiz-1",
      text: "In the process writing approach, which stage comes immediately BEFORE drafting?",
      type: "multiple_choice",
      options: ["Brainstorming / Pre-writing", "Peer review", "Editing", "Publishing"],
      correctAnswerIndex: 0,
      explanation: "Pre-writing / brainstorming is the stage where students generate ideas before drafting. This stage is critical for idea generation and planning.",
      order: 1, difficulty: "Beginner",
    },
    {
      id: "q1-02", quizId: "quiz-1",
      text: "What is the PRIMARY purpose of peer feedback in process writing?",
      type: "multiple_choice",
      options: ["To replace teacher grading", "To build audience awareness and revision skills", "To save teacher time", "To identify grammar errors only"],
      correctAnswerIndex: 1,
      explanation: "Peer feedback helps students develop audience awareness and critical revision skills. It teaches them to read as writers and write for readers.",
      order: 2, difficulty: "Intermediate",
    },
    {
      id: "q1-03", quizId: "quiz-1",
      text: "The genre-based approach to writing instruction emphasizes:",
      type: "multiple_choice",
      options: ["Free expression without constraints", "Learning the conventions and structures of specific text types", "Grammar drills before writing", "Timed essay practice"],
      correctAnswerIndex: 1,
      explanation: "Genre-based approach focuses on teaching students the conventions, structures, and purposes of specific text types (essays, reports, narratives, etc.).",
      order: 3, difficulty: "Intermediate",
    },
    {
      id: "q1-04", quizId: "quiz-1",
      text: "Which of the following is a characteristic of the writing process approach?",
      type: "multiple_choice",
      options: ["Emphasis on the final product only", "Single draft submissions", "Recursive stages with multiple revisions", "Grammar-first instruction"],
      correctAnswerIndex: 2,
      explanation: "Process writing is recursive — students move back and forth between stages, revising multiple times before producing a final version.",
      order: 4, difficulty: "Beginner",
    },
    {
      id: "q1-05", quizId: "quiz-1",
      text: "In peer feedback, the 'I liked... / I wondered... / Have you considered...' framework is an example of:",
      type: "multiple_choice",
      options: ["Holistic rubric", "Structured feedback protocol", "Grammar checklist", "Self-assessment tool"],
      correctAnswerIndex: 1,
      explanation: "This is a structured feedback protocol that scaffolds peer review by giving students specific sentence starters for constructive comments.",
      order: 5, difficulty: "Beginner",
    },
    {
      id: "q1-06", quizId: "quiz-1",
      text: "Writer's workshop model typically includes all EXCEPT:",
      type: "multiple_choice",
      options: ["Mini-lesson", "Independent writing time", "Teacher-led dictation", "Author's chair sharing"],
      correctAnswerIndex: 2,
      explanation: "Writer's workshop consists of mini-lessons, independent writing time, conferences, and sharing — not teacher dictation.",
      order: 6, difficulty: "Intermediate",
    },
    {
      id: "q1-07", quizId: "quiz-1",
      text: "What does 'writing to learn' mean in educational contexts?",
      type: "multiple_choice",
      options: ["Writing to earn a grade", "Using writing as a tool for thinking and understanding", "Writing only for publication", "Learning to write correctly"],
      correctAnswerIndex: 1,
      explanation: "Writing to learn uses writing as a cognitive tool to process information, clarify thinking, and make connections — not just to demonstrate learning.",
      order: 7, difficulty: "Intermediate",
    },
    {
      id: "q1-08", quizId: "quiz-1",
      text: "Which stage of process writing focuses on global concerns (ideas, organization) rather than local concerns (grammar, spelling)?",
      type: "multiple_choice",
      options: ["Editing", "Proofreading", "Revision", "Publishing"],
      correctAnswerIndex: 2,
      explanation: "Revision focuses on global concerns — rethinking ideas, restructuring paragraphs, adding evidence. Editing and proofreading handle local concerns.",
      order: 8, difficulty: "Beginner",
    },
    {
      id: "q1-09", quizId: "quiz-1",
      text: "The 'gradual release of responsibility' model in writing instruction means:",
      type: "multiple_choice",
      options: ["The teacher does all the work first", "Students work independently from day one", "Support is faded as students gain competence", "Responsibility is randomly assigned"],
      correctAnswerIndex: 2,
      explanation: "Gradual release means the teacher starts with heavy scaffolding (I do, we do) and gradually removes support as students become independent (you do).",
      order: 9, difficulty: "Intermediate",
    },
    {
      id: "q1-10", quizId: "quiz-1",
      text: "A writer's notebook is primarily used for:",
      type: "multiple_choice",
      options: ["Submitting final drafts", "Storing teacher feedback", "Collecting ideas, observations, and writing experiments", "Taking grammar quizzes"],
      correctAnswerIndex: 2,
      explanation: "Writer's notebooks are informal spaces for gathering ideas, trying out writing techniques, and practicing — not for polished work.",
      order: 10, difficulty: "Beginner",
    },
    {
      id: "q1-11", quizId: "quiz-1",
      text: "Which statement best describes the relationship between reading and writing instruction?",
      type: "multiple_choice",
      options: ["They are entirely separate skills", "Reading improves writing, but writing does not improve reading", "They are reciprocal processes that reinforce each other", "Writing instruction should come before reading instruction"],
      correctAnswerIndex: 2,
      explanation: "Research consistently shows reading and writing are reciprocal. Reading provides models and vocabulary; writing deepens comprehension and critical thinking.",
      order: 11, difficulty: "Intermediate",
    },
    {
      id: "q1-12", quizId: "quiz-1",
      text: "In a genre study unit, students typically:",
      type: "multiple_choice",
      options: ["Write in any genre they choose", "Study mentor texts, identify genre features, and then write in that genre", "Focus only on grammar within a genre", "Read about genres without writing"],
      correctAnswerIndex: 1,
      explanation: "Genre study involves immersion in mentor texts, analysis of genre features, guided practice, and independent writing in that genre.",
      order: 12, difficulty: "Intermediate",
    },
    {
      id: "q1-13", quizId: "quiz-1",
      text: "What is 'conferencing' in the context of writing workshop?",
      type: "multiple_choice",
      options: ["A large group lecture", "One-on-one or small group conversations about a student's writing", "Peer editing in pairs", "A parent-teacher meeting"],
      correctAnswerIndex: 1,
      explanation: "Writing conferences are brief, focused conversations between teacher and student (or peer) about a specific aspect of the student's draft.",
      order: 13, difficulty: "Beginner",
    },
    {
      id: "q1-14", quizId: "quiz-1",
      text: "The primary goal of freewriting in the pre-writing stage is to:",
      type: "multiple_choice",
      options: ["Produce a polished first draft", "Generate ideas without self-censorship", "Correct grammar errors", "Meet a word count requirement"],
      correctAnswerIndex: 1,
      explanation: "Freewriting is a brainstorming technique where students write continuously without worrying about correctness — the goal is idea generation.",
      order: 14, difficulty: "Beginner",
    },
    {
      id: "q1-15", quizId: "quiz-1",
      text: "Which of the following best represents a 'growth mindset' approach to teaching writing?",
      type: "multiple_choice",
      options: ["Labeling students as 'good writers' or 'bad writers'", "Believing writing ability is fixed and innate", "Emphasizing effort, practice, and revision as paths to improvement", "Grading only final products without revision opportunities"],
      correctAnswerIndex: 2,
      explanation: "A growth mindset (Dweck) in writing means believing all students can improve through effort, strategy, and feedback — and designing instruction accordingly.",
      order: 15, difficulty: "Intermediate",
    },
  ]).onConflictDoNothing()

  // ─── QUIZ 2: Grammar Teaching Methods ───
  await db.insert(questions).values([
    {
      id: "q2-01", quizId: "quiz-2",
      text: "Inductive grammar teaching works by:",
      type: "multiple_choice",
      options: ["The teacher presenting the rule first", "Students analyzing examples to discover the rule themselves", "Students memorizing rules from a textbook", "The teacher correcting every error immediately"],
      correctAnswerIndex: 1,
      explanation: "In inductive teaching, students examine authentic examples and discover grammatical patterns through guided analysis.",
      order: 1, difficulty: "Beginner",
    },
    {
      id: "q2-02", quizId: "quiz-2",
      text: "Which error correction strategy is MOST appropriate for a communicative classroom?",
      type: "multiple_choice",
      options: ["Interrupting the student mid-sentence to correct", "Recasting the error naturally in conversation", "Publicly listing all errors on the board", "Stopping the activity for a grammar lecture"],
      correctAnswerIndex: 1,
      explanation: "Recasting (repeating the student's utterance with the error corrected, without explicit interruption) maintains communication flow while providing implicit feedback.",
      order: 2, difficulty: "Intermediate",
    },
    {
      id: "q2-03", quizId: "quiz-2",
      text: "The difference between 'Focus on Form' and 'Focus on FormS' is:",
      type: "multiple_choice",
      options: ["Focus on Form is for beginners; Focus on FormS is for advanced learners", "Focus on Form is isolated grammar lessons; Focus on FormS is embedded in meaning-focused activities", "Focus on Form is brief attention to grammar during communicative activities; Focus on FormS is isolated grammar instruction", "There is no difference between them"],
      correctAnswerIndex: 2,
      explanation: "Focus on Form (Long, 1991) refers to brief attention to grammar during meaning-focused activities. Focus on FormS (with capital S) refers to isolated, decontextualized grammar lessons.",
      order: 3, difficulty: "Advanced",
    },
    {
      id: "q2-04", quizId: "quiz-2",
      text: "A 'consciousness-raising' grammar activity aims to:",
      type: "multiple_choice",
      options: ["Make students produce perfect grammar immediately", "Draw students' attention to a grammatical feature so they notice it in input", "Punish students for grammar mistakes", "Replace communicative activities entirely"],
      correctAnswerIndex: 1,
      explanation: "Consciousness-raising (Rutherford & Sharwood Smith) helps learners notice grammatical features in the input, which is a prerequisite for acquisition.",
      order: 4, difficulty: "Advanced",
    },
    {
      id: "q2-05", quizId: "quiz-2",
      text: "Which approach would be most effective for teaching the present perfect to intermediate learners?",
      type: "multiple_choice",
      options: ["Lecture on the rule for 30 minutes", "Showing a timeline and then having students complete gap-fill exercises in context", "Memorization of irregular past participles only", "Translation exercises from L1 to L2"],
      correctAnswerIndex: 1,
      explanation: "A combination of visual representation (timeline) and meaningful practice (contextual gap-fill) supports both understanding and proceduralization of the form.",
      order: 5, difficulty: "Intermediate",
    },
    {
      id: "q2-06", quizId: "quiz-2",
      text: "The 'output hypothesis' (Swain) suggests that:",
      type: "multiple_choice",
      options: ["Students should only listen, not write or speak", "Producing language (speaking/writing) pushes learners to process language more deeply than comprehension alone", "Grammar output is not important for acquisition", "Students should output grammar perfectly from the first attempt"],
      correctAnswerIndex: 1,
      explanation: "Swain's output hypothesis claims that producing language forces learners to notice gaps in their knowledge, test hypotheses, and reflect on their language use.",
      order: 6, difficulty: "Advanced",
    },
    {
      id: "q2-07", quizId: "quiz-2",
      text: "Which of these is an example of implicit grammar teaching?",
      type: "multiple_choice",
      options: ["Explicit rule explanation on the whiteboard", "Students reading extensively and implicitly acquiring patterns", "Grammar translation exercises", "Conjugation drills"],
      correctAnswerIndex: 1,
      explanation: "Implicit teaching occurs when learners acquire grammar naturally through exposure to meaningful input, without explicit rule instruction.",
      order: 7, difficulty: "Intermediate",
    },
    {
      id: "q2-08", quizId: "quiz-2",
      text: "When should a teacher correct a student's grammar error?",
      type: "multiple_choice",
      options: ["Immediately, every time", "Never, to avoid discouraging the student", "Strategically, considering the activity goal, the error type, and the student's readiness", "Only in homework, never in class"],
      correctAnswerIndex: 2,
      explanation: "Strategic error correction considers whether the activity is focused on accuracy or fluency, whether the error impedes communication, and whether the student is developmentally ready for the correction.",
      order: 8, difficulty: "Intermediate",
    },
    {
      id: "q2-09", quizId: "quiz-2",
      text: "A 'dictogloss' activity is an example of:",
      type: "multiple_choice",
      options: ["Phonetics drill", "Integrated grammar and listening activity that promotes collaborative reconstruction", "Vocabulary memorization technique", "Pronunciation exercise"],
      correctAnswerIndex: 1,
      explanation: "Dictogloss (Wajnryb) involves students listening to a text and collaboratively reconstructing it, which draws attention to grammatical structures in a communicative context.",
      order: 9, difficulty: "Advanced",
    },
    {
      id: "q2-10", quizId: "quiz-2",
      text: "Which of the following represents a 'noticing' activity?",
      type: "multiple_choice",
      options: ["Free writing without any guidance", "Having students highlight all instances of a target structure in an authentic text", "A grammar test", "A conversation class with no grammar focus"],
      correctAnswerIndex: 1,
      explanation: "Noticing activities (Schmidt) direct learners' attention to specific grammatical features in the input, a necessary step for acquisition.",
      order: 10, difficulty: "Intermediate",
    },
    {
      id: "q2-11", quizId: "quiz-2",
      text: "The 'presentation-practice-production' (PPP) model is:",
      type: "multiple_choice",
      options: ["A communicative approach with no grammar focus", "A deductive model where the teacher presents the rule, students practice it, then use it freely", "An inductive discovery model", "A writing-only methodology"],
      correctAnswerIndex: 1,
      explanation: "PPP is a traditional deductive model: Present (teacher explains rule) → Practice (controlled exercises) → Production (free use). It is effective for explicit knowledge but limited for acquisition.",
      order: 11, difficulty: "Beginner",
    },
    {
      id: "q2-12", quizId: "quiz-2",
      text: "What is the primary purpose of a 'grammar dictation' (dictogloss) in writing classes?",
      type: "multiple_choice",
      options: ["To test spelling accuracy", "To draw attention to grammatical form while maintaining focus on meaning", "To assess reading comprehension", "To teach new vocabulary"],
      correctAnswerIndex: 1,
      explanation: "Grammar dictation integrates form and meaning. Students must attend to grammar to accurately reconstruct the text while the primary focus remains on communication.",
      order: 12, difficulty: "Advanced",
    },
    {
      id: "q2-13", quizId: "quiz-2",
      text: "A teacher uses a 'delayed error correction' technique. This means:",
      type: "multiple_choice",
      options: ["The teacher never corrects errors", "The teacher waits until after the activity to address errors collectively", "The teacher corrects immediately", "The teacher sends errors home for parents to correct"],
      correctAnswerIndex: 1,
      explanation: "Delayed correction (often used in fluency activities) involves the teacher noting errors during the activity and addressing them afterward, preserving communicative flow.",
      order: 13, difficulty: "Beginner",
    },
    {
      id: "q2-14", quizId: "quiz-2",
      text: "Which research finding about grammar instruction is most widely supported?",
      type: "multiple_choice",
      options: ["Explicit grammar teaching is always superior to implicit teaching", "Implicit teaching alone leads to native-like accuracy", "A combination of explicit and implicit approaches, with attention to developmental readiness, produces the best outcomes", "Grammar should never be explicitly taught"],
      correctAnswerIndex: 2,
      explanation: "Research (Ellis, 2006; Norris & Ortega, 2000) supports a balanced approach: explicit instruction for declarative knowledge, implicit exposure and meaningful practice for proceduralization.",
      order: 14, difficulty: "Advanced",
    },
    {
      id: "q2-15", quizId: "quiz-2",
      text: "The 'noticing hypothesis' (Schmidt) claims that:",
      type: "multiple_choice",
      options: ["Students notice every grammatical feature they encounter", "Conscious attention to linguistic features in the input is necessary for learning", "Noticing is not important for grammar acquisition", "Only explicit instruction leads to noticing"],
      correctAnswerIndex: 1,
      explanation: "Schmidt argued that learners must consciously notice grammatical features in the input for them to become intake. Mere exposure is insufficient without attention.",
      order: 15, difficulty: "Advanced",
    },
    {
      id: "q2-16", quizId: "quiz-2",
      text: "Which activity best exemplifies 'focus on form' in a writing class?",
      type: "multiple_choice",
      options: ["A 45-minute grammar lecture", "A teacher briefly drawing attention to past tense use while students are peer editing a narrative", "A grammar test at the end of the term", "Translating sentences from L1"],
      correctAnswerIndex: 1,
      explanation: "Focus on form involves brief, unobtrusive attention to grammar during meaning-focused activities — in this case, noticing past tense while the primary focus is on narrative revision.",
      order: 16, difficulty: "Advanced",
    },
    {
      id: "q2-17", quizId: "quiz-2",
      text: "When teaching the passive voice, which contextualized approach is most effective?",
      type: "multiple_choice",
      options: ["Memorizing the formula: BE + past participle", "Using a science experiment description where the process (not the agent) is the focus", "Listing all irregular past participles", "Translating active sentences to passive without context"],
      correctAnswerIndex: 1,
      explanation: "Teaching the passive in a meaningful context (like scientific writing, where the process matters more than who did it) helps students understand WHY the passive is used, not just HOW.",
      order: 17, difficulty: "Intermediate",
    },
    {
      id: "q2-18", quizId: "quiz-2",
      text: "A 'grammar clinic' in a writing class refers to:",
      type: "multiple_choice",
      options: ["A medical facility", "A dedicated time/space for students to address specific grammar issues identified in their writing", "A punishment for grammar errors", "A test preparation session"],
      correctAnswerIndex: 1,
      explanation: "Grammar clinics are targeted, small-group or individual sessions that address specific grammatical issues students struggle with in their writing.",
      order: 18, difficulty: "Beginner",
    },
    {
      id: "q2-19", quizId: "quiz-2",
      text: "Which of the following is an example of 'input flooding'?",
      type: "multiple_choice",
      options: ["The teacher correcting every error", "Providing texts that contain many examples of a target structure", "Having students write without any grammar focus", "Using only grammar exercises"],
      correctAnswerIndex: 1,
      explanation: "Input flooding involves providing abundant exposure to a target grammatical structure in context, increasing the likelihood learners will notice and acquire it.",
      order: 19, difficulty: "Advanced",
    },
    {
      id: "q2-20", quizId: "quiz-2",
      text: "In a communicative classroom, the best time to address a student's grammar error is:",
      type: "multiple_choice",
      options: ["Immediately, to prevent fossilization", "After the communicative activity, when the focus shifts to accuracy", "Never, to preserve self-esteem", "Only in written work, never in speaking"],
      correctAnswerIndex: 1,
      explanation: "In communicative activities, the goal is fluency and message conveyance. Grammar issues are best addressed in a separate accuracy-focused phase or in delayed feedback.",
      order: 20, difficulty: "Intermediate",
    },
  ]).onConflictDoNothing()

  // ─── QUIZ 3: ESL/EFL Writing Pedagogy ───
  await db.insert(questions).values([
    {
      id: "q3-01", quizId: "quiz-3",
      text: "Academic writing register refers to:",
      type: "multiple_choice",
      options: ["The font size used in academic papers", "The set of linguistic conventions that signal formal scholarly writing", "The teacher's attendance register", "The course registration system"],
      correctAnswerIndex: 1,
      explanation: "Academic register is the collection of lexical, grammatical, and discourse conventions that distinguish formal scholarly writing from informal or conversational language.",
      order: 1, difficulty: "Beginner",
    },
    {
      id: "q3-02", quizId: "quiz-3",
      text: "Cohesion in academic writing refers to:",
      type: "multiple_choice",
      options: ["The use of complex vocabulary", "The grammatical and lexical links that connect sentences and paragraphs", "The length of the essay", "The number of citations"],
      correctAnswerIndex: 1,
      explanation: "Cohesion (Halliday & Hasan) refers to the linguistic ties — reference, substitution, ellipsis, conjunction, lexical cohesion — that make a text hang together.",
      order: 2, difficulty: "Beginner",
    },
    {
      id: "q3-03", quizId: "quiz-3",
      text: "In EFL writing classes, scaffolding techniques are used to:",
      type: "multiple_choice",
      options: ["Build physical structures", "Provide temporary support that helps students accomplish tasks they cannot yet do independently", "Replace the teacher entirely", "Test students' knowledge"],
      correctAnswerIndex: 1,
      explanation: "Scaffolding (Vygotsky/Wood, Bruner, Ross) is temporary support — templates, graphic organizers, sentence frames — that is removed as students gain competence.",
      order: 3, difficulty: "Beginner",
    },
    {
      id: "q3-04", quizId: "quiz-3",
      text: "Which technique is most effective for helping EFL students with cohesion problems?",
      type: "multiple_choice",
      options: ["Memorizing transition word lists without context", "Teaching students to use cohesive devices in context and to check for logical flow between sentences", "Focusing only on grammar accuracy", "Increasing essay length requirements"],
      correctAnswerIndex: 1,
      explanation: "Cohesive devices (however, therefore, in addition) must be taught in context, and students must learn to evaluate whether their text flows logically.",
      order: 4, difficulty: "Intermediate",
    },
    {
      id: "q3-05", quizId: "quiz-3",
      text: "A common cohesion problem in EFL student writing is:",
      type: "multiple_choice",
      options: ["Using too many transition words", "Overuse of pronouns without clear referents", "Writing only simple sentences", "Using too many citations"],
      correctAnswerIndex: 1,
      explanation: "EFL writers often use pronouns (it, this, they) without establishing clear antecedents, creating ambiguity for the reader.",
      order: 5, difficulty: "Intermediate",
    },
    {
      id: "q3-06", quizId: "quiz-3",
      text: "The 'zone of proximal development' (ZPD) in writing instruction refers to:",
      type: "multiple_choice",
      options: ["The physical classroom space", "The gap between what a student can do alone and what they can do with assistance", "The age range of students in a class", "The difference between native and non-native writers"],
      correctAnswerIndex: 1,
      explanation: "ZPD (Vygotsky) is the space between independent performance and assisted performance. Effective instruction targets this zone — not what students can already do, not what is currently impossible.",
      order: 6, difficulty: "Advanced",
    },
    {
      id: "q3-07", quizId: "quiz-3",
      text: "Which strategy best supports EFL students in developing academic vocabulary?",
      type: "multiple_choice",
      options: ["Memorizing dictionary definitions", "Using the Academic Word List (AWL) in context through reading and writing tasks", "Translating every unknown word to L1", "Focusing only on high-frequency words"],
      correctAnswerIndex: 1,
      explanation: "The AWL (Coxhead) identifies the most frequent academic words. Teaching them through contextualized reading and writing tasks supports both recognition and productive use.",
      order: 7, difficulty: "Intermediate",
    },
    {
      id: "q3-08", quizId: "quiz-3",
      text: "Contrastive rhetoric suggests that:",
      type: "multiple_choice",
      options: ["All languages use the same writing conventions", "Students' first language rhetorical patterns may influence their English writing organization", "Rhetoric is not important in writing instruction", "EFL students should forget their L1 entirely"],
      correctAnswerIndex: 1,
      explanation: "Contrastive rhetoric (Kaplan, Connor) examines how L1 rhetorical traditions (e.g., indirect vs. direct argumentation) may transfer to L2 writing.",
      order: 8, difficulty: "Advanced",
    },
    {
      id: "q3-09", quizId: "quiz-3",
      text: "In teaching EFL academic writing, which approach to L1 use is most supported by research?",
      type: "multiple_choice",
      options: ["Total L1 prohibition", "Strategic L1 use for planning, brainstorming, and understanding complex concepts", "Writing the entire essay in L1 first", "Never mentioning the L1"],
      correctAnswerIndex: 1,
      explanation: "Research supports strategic L1 use: brainstorming in L1 reduces cognitive load, and discussing complex concepts in L1 aids understanding. The goal is transfer, not suppression.",
      order: 9, difficulty: "Intermediate",
    },
    {
      id: "q3-10", quizId: "quiz-3",
      text: "Which of the following is a characteristic of 'writer-based prose' vs 'reader-based prose'?",
      type: "multiple_choice",
      options: ["Writer-based prose considers the audience carefully; reader-based prose is self-focused", "Writer-based prose is self-focused and assumes shared knowledge; reader-based prose explicitly guides the reader", "There is no difference", "Writer-based prose is always better"],
      correctAnswerIndex: 1,
      explanation: "Flower (1979) distinguished writer-based prose (writer as primary audience, implicit assumptions) from reader-based prose (explicit guidance for an external reader). EFL students often need help moving from writer-based to reader-based prose.",
      order: 10, difficulty: "Advanced",
    },
    {
      id: "q3-11", quizId: "quiz-3",
      text: "A graphic organizer used in pre-writing helps EFL students by:",
      type: "multiple_choice",
      options: ["Replacing the need to write", "Providing a visual structure that reduces linguistic demands during planning", "Eliminating the need for revision", "Automatically correcting grammar"],
      correctAnswerIndex: 1,
      explanation: "Graphic organizers reduce the cognitive load of planning by providing a visual scaffold. Students can organize ideas before worrying about linguistic expression.",
      order: 11, difficulty: "Beginner",
    },
    {
      id: "q3-12", quizId: "quiz-3",
      text: "Which is the most effective feedback strategy for EFL writers?",
      type: "multiple_choice",
      options: ["Correcting every error in the text", "Providing focused feedback on 2-3 specific issues with clear examples and revision strategies", "Giving only holistic grades without comments", "Rewriting the text for the student"],
      correctAnswerIndex: 1,
      explanation: "Focused feedback (Ferris, 2003) on a limited number of issues is more effective than comprehensive correction, which can overwhelm students and is rarely retained.",
      order: 12, difficulty: "Intermediate",
    },
    {
      id: "q3-13", quizId: "quiz-3",
      text: "Interlanguage in second language writing refers to:",
      type: "multiple_choice",
      options: ["The space between two languages on a page", "The systematic, rule-governed linguistic system that L2 learners create as they develop", "A translation tool", "The teacher's intervention"],
      correctAnswerIndex: 1,
      explanation: "Interlanguage (Selinker) is the systematic, rule-governed linguistic system learners construct as they move from L1 to L2 competence. Errors are often developmental, not random.",
      order: 13, difficulty: "Advanced",
    },
    {
      id: "q3-14", quizId: "quiz-3",
      text: "When teaching academic writing to EFL students, hedging language (e.g., 'may', 'could', 'it is possible that') is important because:",
      type: "multiple_choice",
      options: ["It makes writing shorter", "It reflects the tentative nature of academic claims and shows respect for disciplinary norms", "It confuses the reader", "It replaces the need for evidence"],
      correctAnswerIndex: 1,
      explanation: "Hedging is a key feature of academic register. It allows writers to make claims while acknowledging uncertainty — a fundamental convention of scholarly discourse.",
      order: 14, difficulty: "Intermediate",
    },
    {
      id: "q3-15", quizId: "quiz-3",
      text: "Which of the following best describes 'transfer' in second language writing?",
      type: "multiple_choice",
      options: ["The physical transfer of students between classes", "The influence of L1 knowledge, strategies, and rhetorical patterns on L2 writing", "Moving from one essay draft to another", "Copying from a source text"],
      correctAnswerIndex: 1,
      explanation: "Transfer can be positive (L1 knowledge that helps L2 writing) or negative (L1 patterns that interfere). Effective teaching anticipates and addresses negative transfer.",
      order: 15, difficulty: "Intermediate",
    },
  ]).onConflictDoNothing()

  // ─── QUIZ 4: Research & Academic Writing ───
  await db.insert(questions).values([
    {
      id: "q4-01", quizId: "quiz-4",
      text: "In a literature review, which structure is most commonly used in social sciences?",
      type: "multiple_choice",
      options: ["Chronological only", "Thematic or topical organization", "Alphabetical by author surname", "Random order"],
      correctAnswerIndex: 1,
      explanation: "Literature reviews in social sciences typically organize sources thematically by topic, methodology, or theoretical approach — not chronologically or alphabetically.",
      order: 1, difficulty: "Intermediate",
    },
    {
      id: "q4-02", quizId: "quiz-4",
      text: "The primary difference between APA and MLA citation format is:",
      type: "multiple_choice",
      options: ["There is no difference", "APA emphasizes the date of publication; MLA emphasizes the author and page number", "APA is for humanities; MLA is for sciences", "MLA requires DOIs; APA does not"],
      correctAnswerIndex: 1,
      explanation: "APA (social sciences) foregrounds the publication date in in-text citations (Smith, 2020). MLA (humanities) foregrounds the author and page number (Smith 45).",
      order: 2, difficulty: "Beginner",
    },
    {
      id: "q4-03", quizId: "quiz-4",
      text: "A strong thesis statement typically consists of how many main parts?",
      type: "multiple_choice",
      options: ["One part: the topic", "Two parts: topic and opinion", "Three parts: topic, claim, and reasons", "Five parts: introduction, body, conclusion, citations, appendix"],
      correctAnswerIndex: 2,
      explanation: "A robust thesis statement includes: (1) the topic, (2) the claim/position, and (3) the supporting reasons or roadmap for the essay.",
      order: 3, difficulty: "Beginner",
    },
    {
      id: "q4-04", quizId: "quiz-4",
      text: "Which section of a research paper presents the methods used to collect and analyze data?",
      type: "multiple_choice",
      options: ["Introduction", "Literature Review", "Methodology", "Discussion"],
      correctAnswerIndex: 2,
      explanation: "The Methodology section describes participants, materials, procedures, and analytical techniques — allowing other researchers to replicate or evaluate the study.",
      order: 4, difficulty: "Beginner",
    },
    {
      id: "q4-05", quizId: "quiz-4",
      text: "In academic writing, a 'signpost' refers to:",
      type: "multiple_choice",
      options: ["A physical sign in the classroom", "A transitional phrase that guides the reader through the argument structure", "A reference to a road map", "A citation format"],
      correctAnswerIndex: 1,
      explanation: "Signposting (e.g., 'First...', 'In contrast...', 'This leads to the question of...') explicitly guides readers through the writer's reasoning process.",
      order: 5, difficulty: "Intermediate",
    },
    {
      id: "q4-06", quizId: "quiz-4",
      text: "Paraphrasing in academic writing means:",
      type: "multiple_choice",
      options: ["Changing a few words in the original text", "Restating an idea in your own words and sentence structure while maintaining the original meaning", "Copying the text with quotation marks", "Summarizing the entire source in one sentence"],
      correctAnswerIndex: 1,
      explanation: "True paraphrasing requires both lexical changes (different words) and syntactic changes (different sentence structure) while preserving the original meaning. It still requires citation.",
      order: 6, difficulty: "Beginner",
    },
    {
      id: "q4-07", quizId: "quiz-4",
      text: "Which of the following is an example of plagiarism?",
      type: "multiple_choice",
      options: ["Citing a source in your bibliography", "Copying text from a source without quotation marks or citation", "Paraphrasing a source and including a citation", "Using common knowledge without citation"],
      correctAnswerIndex: 1,
      explanation: "Plagiarism is using someone else's words or ideas without proper attribution. Copying text without quotation marks AND citation is a clear form of plagiarism.",
      order: 7, difficulty: "Beginner",
    },
    {
      id: "q4-08", quizId: "quiz-4",
      text: "The 'IMRaD' structure stands for:",
      type: "multiple_choice",
      options: ["Introduction, Methods, Results, and Discussion", "Ideas, Methods, Research, and Data", "Introduction, Model, Results, and Deduction", "Initial, Middle, and Discussion"],
      correctAnswerIndex: 0,
      explanation: "IMRaD (Introduction, Methods, Results, and Discussion) is the standard organizational structure for empirical research papers in most scientific disciplines.",
      order: 8, difficulty: "Beginner",
    },
    {
      id: "q4-09", quizId: "quiz-4",
      text: "A 'research gap' in a literature review refers to:",
      type: "multiple_choice",
      options: ["A missing page in the library", "An area that has not been sufficiently studied or an unanswered question in the existing literature", "A space between two citations", "A break in the researcher's schedule"],
      correctAnswerIndex: 1,
      explanation: "The research gap identifies what is missing, contradictory, or underexplored in existing literature — and justifies why your study is needed.",
      order: 9, difficulty: "Intermediate",
    },
    {
      id: "q4-10", quizId: "quiz-4",
      text: "Which of the following is the best definition of 'synthesis' in literature review writing?",
      type: "multiple_choice",
      options: ["Listing sources one after another", "Combining and comparing ideas from multiple sources to develop a coherent argument", "Copying paragraphs from each source", "Only using one source per paragraph"],
      correctAnswerIndex: 1,
      explanation: "Synthesis involves integrating multiple sources, identifying patterns, agreements, and disagreements, and building an argument that transcends individual studies.",
      order: 10, difficulty: "Intermediate",
    },
    {
      id: "q4-11", quizId: "quiz-4",
      text: "In APA 7th edition, a student paper requires:",
      type: "multiple_choice",
      options: ["An abstract and running head", "A title page, body, and references list", "Only the references list", "A table of contents"],
      correctAnswerIndex: 1,
      explanation: "APA 7th edition student papers require a title page (with title, author name, affiliation, course, instructor, due date), the body of the paper, and a references list. Running heads are no longer required for student papers.",
      order: 11, difficulty: "Intermediate",
    },
    {
      id: "q4-12", quizId: "quiz-4",
      text: "A 'primary source' in research is:",
      type: "multiple_choice",
      options: ["A textbook summarizing research", "The original study or firsthand account of an event or phenomenon", "A Wikipedia article", "A book review"],
      correctAnswerIndex: 1,
      explanation: "Primary sources are original documents or firsthand evidence: research articles, diaries, interviews, historical documents. Secondary sources interpret or summarize primary sources.",
      order: 12, difficulty: "Beginner",
    },
    {
      id: "q4-13", quizId: "quiz-4",
      text: "The 'discussion' section of a research paper should NOT include:",
      type: "multiple_choice",
      options: ["Interpretation of results", "Comparison with previous research", "Introduction of new data not presented in results", "Limitations of the study"],
      correctAnswerIndex: 2,
      explanation: "The Discussion interprets results already presented. Introducing new data here violates the IMRaD structure and confuses readers. New data belongs in Results.",
      order: 13, difficulty: "Intermediate",
    },
    {
      id: "q4-14", quizId: "quiz-4",
      text: "Which of the following best describes 'hedging' in academic writing?",
      type: "multiple_choice",
      options: ["Using aggressive language to make a point", "Using cautious language to avoid overstating claims", "Avoiding citations entirely", "Writing only in the active voice"],
      correctAnswerIndex: 1,
      explanation: "Hedging (e.g., 'suggests', 'may indicate', 'it is possible that') allows writers to make claims while acknowledging uncertainty — a hallmark of academic discourse.",
      order: 14, difficulty: "Intermediate",
    },
    {
      id: "q4-15", quizId: "quiz-4",
      text: "A 'working bibliography' is:",
      type: "multiple_choice",
      options: ["The final list of sources in the published paper", "A preliminary list of potential sources gathered during the research process", "A list of books the author has read for pleasure", "A required reading list from the instructor"],
      correctAnswerIndex: 1,
      explanation: "A working bibliography is a developing list of sources discovered during research. It is refined into the final references list after evaluating relevance and quality.",
      order: 15, difficulty: "Beginner",
    },
    {
      id: "q4-16", quizId: "quiz-4",
      text: "Which of the following is an example of a 'discourse marker' in academic writing?",
      type: "multiple_choice",
      options: ["A citation format", "A transitional phrase like 'however' or 'furthermore'", "A research methodology", "A statistical test"],
      correctAnswerIndex: 1,
      explanation: "Discourse markers (transitional words/phrases) signal logical relationships between ideas: contrast (however), addition (furthermore), causation (therefore), sequence (first, second).",
      order: 16, difficulty: "Beginner",
    },
    {
      id: "q4-17", quizId: "quiz-4",
      text: "The main purpose of an abstract is to:",
      type: "multiple_choice",
      options: ["List all sources used", "Provide a brief summary of the entire paper so readers can decide whether to read further", "Introduce the author", "Replace the need for a full paper"],
      correctAnswerIndex: 1,
      explanation: "An abstract (150-250 words) summarizes the research problem, methods, key findings, and implications — serving as a standalone summary for indexing and reader decision-making.",
      order: 17, difficulty: "Beginner",
    },
    {
      id: "q4-18", quizId: "quiz-4",
      text: "In academic writing, 'nominalization' refers to:",
      type: "multiple_choice",
      options: ["Adding names to citations", "Converting verbs or adjectives into nouns", "Naming your research method", "Listing nominal variables"],
      correctAnswerIndex: 1,
      explanation: "Nominalization (e.g., 'decide' → 'decision', 'analyze' → 'analysis') is a hallmark of academic register that creates information density and objectivity.",
      order: 18, difficulty: "Advanced",
    },
    {
      id: "q4-19", quizId: "quiz-4",
      text: "Which of the following is the strongest research question?",
      type: "multiple_choice",
      options: ["Is writing important?", "How does peer feedback affect the quality of revisions in EFL academic writing?", "What is an essay?", "Why do students hate writing?"],
      correctAnswerIndex: 1,
      explanation: "A strong research question is specific, researchable, and significant. It identifies variables (peer feedback, revision quality), a population (EFL writers), and implies methodology.",
      order: 19, difficulty: "Intermediate",
    },
    {
      id: "q4-20", quizId: "quiz-4",
      text: "A 'limitation' section in a research paper is important because:",
      type: "multiple_choice",
      options: ["It shows the researcher failed", "It demonstrates methodological rigor by acknowledging constraints that may affect generalizability", "It is required by law", "It makes the paper shorter"],
      correctAnswerIndex: 1,
      explanation: "Acknowledging limitations (sample size, context, instruments) shows scholarly honesty and helps readers assess the applicability of findings to their own contexts.",
      order: 20, difficulty: "Intermediate",
    },
    {
      id: "q4-21", quizId: "quiz-4",
      text: "Which voice is generally preferred in scientific academic writing?",
      type: "multiple_choice",
      options: ["First person active (I did...)", "Second person (You should...)", "Third person or passive voice", "Informal conversational voice"],
      correctAnswerIndex: 2,
      explanation: "Scientific writing traditionally favors passive voice or third person to emphasize the research process and findings rather than the researcher. However, APA 7 now accepts first person when appropriate.",
      order: 21, difficulty: "Beginner",
    },
    {
      id: "q4-22", quizId: "quiz-4",
      text: "The difference between a reference list and a bibliography is:",
      type: "multiple_choice",
      options: ["There is no difference", "A reference list includes only sources cited; a bibliography may include sources consulted but not cited", "A bibliography is shorter", "A reference list includes annotations"],
      correctAnswerIndex: 1,
      explanation: "A reference list contains only sources directly cited in the paper. A bibliography (common in Chicago style) may include sources that informed the research but were not explicitly cited.",
      order: 22, difficulty: "Intermediate",
    },
    {
      id: "q4-23", quizId: "quiz-4",
      text: "In qualitative research, 'triangulation' refers to:",
      type: "multiple_choice",
      options: ["A geometric shape", "Using multiple data sources or methods to enhance credibility and validity", "Surveying three groups", "Testing hypotheses three times"],
      correctAnswerIndex: 1,
      explanation: "Triangulation (Denzin, Lincoln & Guba) uses multiple methods, sources, or investigators to cross-verify findings and enhance trustworthiness in qualitative research.",
      order: 23, difficulty: "Advanced",
    },
    {
      id: "q4-24", quizId: "quiz-4",
      text: "Which element should appear FIRST in an APA reference for a journal article?",
      type: "multiple_choice",
      options: ["The article title", "The journal name", "The author names", "The DOI"],
      correctAnswerIndex: 2,
      explanation: "APA references begin with author surnames and initials, followed by the publication year in parentheses. The article title and journal name follow.",
      order: 24, difficulty: "Beginner",
    },
    {
      id: "q4-25", quizId: "quiz-4",
      text: "A 'call for papers' in a conference announcement means:",
      type: "multiple_choice",
      options: ["The organizers are asking for monetary donations", "Researchers are invited to submit proposals or abstracts for presentation consideration", "The journal is closing", "Students must write papers for homework"],
      correctAnswerIndex: 1,
      explanation: "A call for papers (CFP) invites scholars to submit research proposals, abstracts, or full papers for peer review and potential acceptance at a conference or in a journal special issue.",
      order: 25, difficulty: "Beginner",
    },
  ]).onConflictDoNothing()

  // ─── QUIZ 5: Digital Tools for Writing ───
  await db.insert(questions).values([
    {
      id: "q5-01", quizId: "quiz-5",
      text: "Grammarly primarily helps with which writing component?",
      type: "multiple_choice",
      options: ["Generating original ideas", "Checking grammar, spelling, and style", "Formatting citations", "Conducting research"],
      correctAnswerIndex: 1,
      explanation: "Grammarly is an AI-powered writing assistant that checks grammar, spelling, punctuation, word choice, and style. It does not generate ideas, format citations, or conduct research.",
      order: 1, difficulty: "Beginner",
    },
    {
      id: "q5-02", quizId: "quiz-5",
      text: "Google Docs enables collaborative writing by:",
      type: "multiple_choice",
      options: ["Allowing only one person to edit at a time", "Enabling real-time simultaneous editing with comment and suggestion features", "Sending documents via email attachments", "Printing shared copies"],
      correctAnswerIndex: 1,
      explanation: "Google Docs allows multiple users to edit the same document simultaneously, with real-time cursor visibility, comments, suggestions, and version history.",
      order: 2, difficulty: "Beginner",
    },
    {
      id: "q5-03", quizId: "quiz-5",
      text: "Which is an ETHICAL way to use AI writing tools in the classroom?",
      type: "multiple_choice",
      options: ["Having AI write the entire essay for the student", "Using AI to brainstorm ideas and then writing and revising the essay independently", "Submitting AI-generated text as one's own work", "Replacing all writing instruction with AI tools"],
      correctAnswerIndex: 1,
      explanation: "Ethical use of AI in writing means using it as a brainstorming or editing tool while maintaining authorship, transparency, and independent critical thinking.",
      order: 3, difficulty: "Beginner",
    },
    {
      id: "q5-04", quizId: "quiz-5",
      text: "Version history in Google Docs is useful because:",
      type: "multiple_choice",
      options: ["It deletes old versions automatically", "It allows users to see who made what changes and restore previous versions", "It prevents collaboration", "It increases file size"],
      correctAnswerIndex: 1,
      explanation: "Version history tracks every edit with timestamps and author attribution. It enables accountability, collaboration analysis, and recovery from unwanted changes.",
      order: 4, difficulty: "Beginner",
    },
    {
      id: "q5-05", quizId: "quiz-5",
      text: "A 'corpus' in digital writing tools refers to:",
      type: "multiple_choice",
      options: ["A physical library", "A large, structured collection of texts used for linguistic analysis", "A type of word processor", "A citation manager"],
      correctAnswerIndex: 1,
      explanation: "A corpus (plural: corpora) is a large collection of authentic texts. Tools like AntConc or COCA allow users to analyze word frequency, collocation, and usage patterns.",
      order: 5, difficulty: "Intermediate",
    },
    {
      id: "q5-06", quizId: "quiz-5",
      text: "Which tool would be most helpful for managing academic citations?",
      type: "multiple_choice",
      options: ["Microsoft Paint", "Zotero, Mendeley, or EndNote", "Grammarly", "Google Translate"],
      correctAnswerIndex: 1,
      explanation: "Reference managers (Zotero, Mendeley, EndNote) store, organize, and format citations. They can automatically generate bibliographies in APA, MLA, Chicago, and other styles.",
      order: 6, difficulty: "Beginner",
    },
    {
      id: "q5-07", quizId: "quiz-5",
      text: "In Google Docs, 'suggestion mode' allows collaborators to:",
      type: "multiple_choice",
      options: ["Lock the document", "Propose edits that the owner can accept or reject", "Delete the document", "Print the document"],
      correctAnswerIndex: 1,
      explanation: "Suggestion mode (vs. editing mode) allows collaborators to propose changes without altering the original text. The document owner reviews and accepts or rejects each suggestion.",
      order: 7, difficulty: "Beginner",
    },
    {
      id: "q5-08", quizId: "quiz-5",
      text: "What is the primary risk of over-relying on grammar-checking software?",
      type: "multiple_choice",
      options: ["It makes writing too creative", "Students may not develop independent proofreading skills and may accept incorrect suggestions", "It slows down writing too much", "It makes files too large"],
      correctAnswerIndex: 1,
      explanation: "Grammar checkers are not perfect. They sometimes flag correct constructions or suggest incorrect alternatives. Over-reliance prevents the development of autonomous editing skills.",
      order: 8, difficulty: "Intermediate",
    },
    {
      id: "q5-09", quizId: "quiz-5",
      text: "A 'learning management system' (LMS) like Canvas or Moodle can support writing instruction by:",
      type: "multiple_choice",
      options: ["Replacing the teacher", "Providing platforms for assignment submission, peer review, feedback, and grade tracking", "Automatically writing student essays", "Preventing plagiarism"],
      correctAnswerIndex: 1,
      explanation: "LMS platforms organize the logistics of writing instruction: assignment distribution, submission, peer review workflows, rubric-based grading, and progress tracking.",
      order: 9, difficulty: "Beginner",
    },
    {
      id: "q5-10", quizId: "quiz-5",
      text: "Which of the following is a benefit of using digital portfolios for writing assessment?",
      type: "multiple_choice",
      options: ["They cannot be shared", "They allow students to showcase growth over time with multimedia elements", "They are always lost when devices break", "They eliminate the need for feedback"],
      correctAnswerIndex: 1,
      explanation: "Digital portfolios (Google Sites, WordPress, Seesaw) showcase growth over time, allow multimedia integration, and are easily shared with teachers, parents, and future employers.",
      order: 10, difficulty: "Beginner",
    },
    {
      id: "q5-11", quizId: "quiz-5",
      text: "When using ChatGPT in a writing class, the most important teacher action is:",
      type: "multiple_choice",
      options: ["Banning it completely", "Teaching students critical evaluation of AI-generated content and maintaining transparent use policies", "Using it to grade essays", "Replacing all writing assignments with AI prompts"],
      correctAnswerIndex: 1,
      explanation: "Banning is ineffective. The best approach is education: teach students to evaluate AI outputs, establish transparent policies, and design assignments that value process and critical thinking over product.",
      order: 11, difficulty: "Intermediate",
    },
    {
      id: "q5-12", quizId: "quiz-5",
      text: "A 'concordancer' is a digital tool that:",
      type: "multiple_choice",
      options: ["Checks grammar automatically", "Shows how words and phrases are used in context within a corpus", "Formats citations", "Translates between languages"],
      correctAnswerIndex: 1,
      explanation: "Concordancers display search results (concordance lines) showing a target word/phrase in its authentic contexts, helping learners understand usage patterns and collocations.",
      order: 12, difficulty: "Advanced",
    },
  ]).onConflictDoNothing()

  // ─── QUIZ 6: Assessment & Rubrics ───
  await db.insert(questions).values([
    {
      id: "q6-01", quizId: "quiz-6",
      text: "The main difference between a holistic rubric and an analytic rubric is:",
      type: "multiple_choice",
      options: ["Holistic rubrics are more detailed", "Holistic rubrics assign a single overall score; analytic rubrics score each criterion separately", "Analytic rubrics are faster to use", "There is no difference"],
      correctAnswerIndex: 1,
      explanation: "Holistic rubrics give one score based on overall impression. Analytic rubrics break writing into components (ideas, organization, language, mechanics) with separate scores for each.",
      order: 1, difficulty: "Beginner",
    },
    {
      id: "q6-02", quizId: "quiz-6",
      text: "Formative assessment differs from summative assessment in that formative assessment:",
      type: "multiple_choice",
      options: ["Occurs at the end of instruction to assign grades", "Provides ongoing feedback during the learning process to improve performance", "Is always high-stakes", "Does not involve feedback"],
      correctAnswerIndex: 1,
      explanation: "Formative assessment occurs during learning to monitor progress and provide feedback. Summative assessment occurs at the end to evaluate achievement. Formative is diagnostic; summative is evaluative.",
      order: 2, difficulty: "Beginner",
    },
    {
      id: "q6-03", quizId: "quiz-6",
      text: "A portfolio assessment is valuable because it:",
      type: "multiple_choice",
      options: ["Only includes final drafts", "Shows student growth, process, and range over time", "Is easier to grade than single essays", "Eliminates the need for teacher feedback"],
      correctAnswerIndex: 1,
      explanation: "Portfolios document growth over time by including drafts, revisions, reflections, and a range of genres. They assess process as well as product.",
      order: 3, difficulty: "Beginner",
    },
    {
      id: "q6-04", quizId: "quiz-6",
      text: "In writing assessment, 'inter-rater reliability' refers to:",
      type: "multiple_choice",
      options: ["The speed of grading", "The degree of agreement between two or more raters scoring the same paper", "The number of students in a class", "The length of the essay"],
      correctAnswerIndex: 1,
      explanation: "Inter-rater reliability measures consistency between graders. Low reliability means scores depend more on who grades than on the writing quality. Training and rubrics improve reliability.",
      order: 4, difficulty: "Intermediate",
    },
    {
      id: "q6-05", quizId: "quiz-6",
      text: "Which of the following is a strength of self-assessment in writing?",
      type: "multiple_choice",
      options: ["It replaces teacher assessment entirely", "It develops metacognitive awareness and encourages students to internalize criteria", "It is always accurate", "It requires no training"],
      correctAnswerIndex: 1,
      explanation: "Self-assessment builds metacognition — students learn to evaluate their own work against standards. This is a transferable skill that supports lifelong writing development.",
      order: 5, difficulty: "Intermediate",
    },
    {
      id: "q6-06", quizId: "quiz-6",
      text: "A 'single-point rubric' shows:",
      type: "multiple_choice",
      options: ["Only one possible score", "Proficiency criteria in the center, with space for notes on what exceeds or needs improvement", "A list of all possible errors", "The average class score"],
      correctAnswerIndex: 1,
      explanation: "Single-point rubrics (Gonzalez) describe proficient performance in the center column. Teachers note what exceeds proficiency and what needs work in side columns. They are simpler and more flexible than multi-level rubrics.",
      order: 6, difficulty: "Intermediate",
    },
    {
      id: "q6-07", quizId: "quiz-6",
      text: "Which assessment practice best supports a 'growth mindset' in writing?",
      type: "multiple_choice",
      options: ["Grading only final products with no revision opportunities", "Allowing revision and resubmission for a higher grade, with feedback focused on effort and strategy", "Comparing students to each other publicly", "Using only standardized tests"],
      correctAnswerIndex: 1,
      explanation: "Revision for credit, process portfolios, and feedback on effort/strategy (not just innate ability) communicate that writing ability is developed, not fixed.",
      order: 7, difficulty: "Intermediate",
    },
    {
      id: "q6-08", quizId: "quiz-6",
      text: "Analytic rubrics are particularly useful when:",
      type: "multiple_choice",
      options: ["You need to grade very quickly", "You want to provide specific diagnostic feedback about strengths and weaknesses in different areas", "The assignment has only one criterion", "Students do not need feedback"],
      correctAnswerIndex: 1,
      explanation: "Analytic rubrics excel at diagnostic feedback. They tell students exactly which aspects of their writing are strong (e.g., organization) and which need work (e.g., evidence).",
      order: 8, difficulty: "Beginner",
    },
    {
      id: "q6-09", quizId: "quiz-6",
      text: "Which is NOT a characteristic of effective feedback on student writing?",
      type: "multiple_choice",
      options: ["Timely", "Specific and actionable", "Vague and general", "Focused on a manageable number of issues"],
      correctAnswerIndex: 2,
      explanation: "Effective feedback is timely, specific, actionable, and focused. 'Good job!' or 'Needs work' are vague and do not tell the student what to do next.",
      order: 9, difficulty: "Beginner",
    },
    {
      id: "q6-10", quizId: "quiz-6",
      text: "A 'benchmark paper' in assessment refers to:",
      type: "multiple_choice",
      options: ["The highest-scoring paper in the class", "A sample paper that exemplifies a specific score point on a rubric, used for rater training", "A paper written by the teacher", "The first draft"],
      correctAnswerIndex: 1,
      explanation: "Benchmark papers (or anchor papers) are exemplars that demonstrate each level of performance on a rubric. They are essential for training graders and maintaining inter-rater reliability.",
      order: 10, difficulty: "Intermediate",
    },
    {
      id: "q6-11", quizId: "quiz-6",
      text: "In writing assessment, 'consequential validity' refers to:",
      type: "multiple_choice",
      options: ["The physical consequences of writing", "The positive or negative effects that an assessment has on teaching and learning", "The grammar accuracy of the test", "The number of students who pass"],
      correctAnswerIndex: 1,
      explanation: "Consequential validity (Messick) examines whether the assessment produces beneficial or harmful effects on instruction. Does it encourage good teaching or narrow the curriculum?",
      order: 11, difficulty: "Advanced",
    },
    {
      id: "q6-12", quizId: "quiz-6",
      text: "Which strategy helps ensure that rubric criteria are clear and useful?",
      type: "multiple_choice",
      options: ["Using abstract language like 'good organization'", "Piloting the rubric on sample papers and revising descriptors that don't discriminate well", "Never sharing the rubric with students", "Having only one rater use the rubric"],
      correctAnswerIndex: 1,
      explanation: "Rubrics should be piloted on real student work. If all papers receive the same score on a criterion, or if raters disagree, the descriptor needs revision.",
      order: 12, difficulty: "Intermediate",
    },
    {
      id: "q6-13", quizId: "quiz-6",
      text: "A 'process portfolio' differs from a 'showcase portfolio' in that it:",
      type: "multiple_choice",
      options: ["Only includes final polished work", "Includes drafts, revisions, reflections, and evidence of the writing process", "Is graded more harshly", "Cannot be shared digitally"],
      correctAnswerIndex: 1,
      explanation: "Process portfolios document the journey: early drafts, peer feedback, revisions, reflections. Showcase portfolios display only the best final products.",
      order: 13, difficulty: "Beginner",
    },
    {
      id: "q6-14", quizId: "quiz-6",
      text: "Which of the following best describes 'norm-referenced' assessment?",
      type: "multiple_choice",
      options: ["Comparing students to a fixed standard", "Comparing students to each other to determine relative standing", "Assessing only grammar", "Using only self-assessment"],
      correctAnswerIndex: 1,
      explanation: "Norm-referenced assessment ranks students against each other (grading on a curve). Criterion-referenced assessment compares each student to fixed standards.",
      order: 14, difficulty: "Intermediate",
    },
    {
      id: "q6-15", quizId: "quiz-6",
      text: "When designing a rubric for peer review, it is important to:",
      type: "multiple_choice",
      options: ["Include as many criteria as possible", "Use language that peer reviewers can understand and apply consistently", "Focus only on grammar", "Keep the rubric secret from students"],
      correctAnswerIndex: 1,
      explanation: "Peer review rubrics must use student-friendly language and focus on observable features. If students cannot understand or apply the criteria, peer feedback will be superficial.",
      order: 15, difficulty: "Beginner",
    },
    {
      id: "q6-16", quizId: "quiz-6",
      text: "A teacher who grades only final products without any formative feedback is likely violating which principle of effective writing assessment?",
      type: "multiple_choice",
      options: ["Reliability", "Validity", "The principle that assessment should support learning, not just measure it", "All of the above"],
      correctAnswerIndex: 2,
      explanation: "Effective assessment serves learning. Grading without feedback provides a score but no opportunity for improvement — undermining the instructional purpose of assessment.",
      order: 16, difficulty: "Intermediate",
    },
    {
      id: "q6-17", quizId: "quiz-6",
      text: "Which tool is most appropriate for calculating inter-rater reliability?",
      type: "multiple_choice",
      options: ["A thesaurus", "Cohen's kappa or Pearson correlation", "A dictionary", "A word processor"],
      correctAnswerIndex: 1,
      explanation: "Cohen's kappa measures agreement between two raters correcting for chance agreement. Pearson correlation can also assess score consistency across raters.",
      order: 17, difficulty: "Advanced",
    },
    {
      id: "q6-18", quizId: "quiz-6",
      text: "'Assessment for learning' (formative) is distinguished from 'assessment of learning' (summative) by its focus on:",
      type: "multiple_choice",
      options: ["Final grades", "Ranking students", "Improving student performance through feedback and adjustment", "Punishing poor performance"],
      correctAnswerIndex: 2,
      explanation: "Assessment for learning (Black & Wiliam) uses feedback to modify teaching and learning activities. Assessment of learning evaluates achievement at a point in time.",
      order: 18, difficulty: "Beginner",
    },
  ]).onConflictDoNothing()

  // ─── RESOURCES ───
  await db.insert(resources).values([
    { id: "res-1", title: "Process Writing Lesson Plan Template", description: "A complete 5-session lesson plan for teaching process writing in EFL classrooms.", category: "Lesson Plans", fileType: "PDF", fileUrl: "/uploads/process-writing-lesson-plan.pdf", downloadCount: 124 },
    { id: "res-2", title: "Holistic vs Analytic Rubric Comparison", description: "Side-by-side comparison with examples for academic essays, plus a blank template.", category: "Rubrics", fileType: "PDF", fileUrl: "/uploads/rubric-comparison.pdf", downloadCount: 89 },
    { id: "res-3", title: "Academic Writing Scaffolding Toolkit", description: "Graphic organizers, sentence frames, and paragraph templates for academic writing.", category: "Worksheets", fileType: "PDF", fileUrl: "/uploads/scaffolding-toolkit.pdf", downloadCount: 201 },
    { id: "res-4", title: "Persuasive Essay Writing Prompts", description: "30 thought-provoking prompts for argumentative writing with planning guides.", category: "Writing Prompts", fileType: "PDF", fileUrl: "/uploads/persuasive-prompts.pdf", downloadCount: 156 },
    { id: "res-5", title: "APA 7th Edition Quick Reference", description: "One-page quick reference for in-text citations and reference list formatting.", category: "Citation Guides", fileType: "PDF", fileUrl: "/uploads/apa-quick-reference.pdf", downloadCount: 342 },
    { id: "res-6", title: "Peer Review Checklist", description: "Structured peer review form with specific questions for content, organization, and language.", category: "Assessment Templates", fileType: "PDF", fileUrl: "/uploads/peer-review-checklist.pdf", downloadCount: 178 },
    { id: "res-7", title: "Collaborative Writing Activities", description: "10 classroom activities using Google Docs for group writing projects.", category: "Classroom Activities", fileType: "PDF", fileUrl: "/uploads/collaborative-activities.pdf", downloadCount: 95 },
    { id: "res-8", title: "Grammar in Context Workbook", description: "15 lessons connecting grammar points to authentic writing contexts.", category: "Grammar Guides", fileType: "PDF", fileUrl: "/uploads/grammar-context-workbook.pdf", downloadCount: 210 },
    { id: "res-9", title: "EFL Writing Portfolio Template", description: "Digital portfolio structure with reflection prompts and self-assessment rubrics.", category: "Assessment Templates", fileType: "DOCX", fileUrl: "/uploads/portfolio-template.docx", downloadCount: 67 },
    { id: "res-10", title: "Academic Word List Flashcards", description: "570 word families from the AWL with definitions, example sentences, and collocations.", category: "Worksheets", fileType: "PDF", fileUrl: "/uploads/awl-flashcards.pdf", downloadCount: 445 },
  ]).onConflictDoNothing()

  console.log("Seeding complete!")
}

seed().catch(console.error)
