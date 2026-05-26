import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core"

// Better Auth tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  role: text("role").notNull().default("teacher"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
})

// App-specific tables
export const articles = pgTable("articles", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  category: text("category"),
  status: text("status").notNull().default("draft"),
  authorId: text("author_id").references(() => user.id),
  featured: boolean("featured").notNull().default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const quizzes = pgTable("quizzes", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  category: text("category"),
  difficulty: text("difficulty"),
  timeLimitMinutes: integer("time_limit_minutes"),
  passScore: integer("pass_score"),
  totalQuestions: integer("total_questions"),
  isDiagnostic: boolean("is_diagnostic").notNull().default(false),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const questions = pgTable("questions", {
  id: text("id").primaryKey(),
  quizId: text("quiz_id").notNull().references(() => quizzes.id),
  text: text("text").notNull(),
  type: text("type").notNull().default("multiple_choice"),
  options: text("options").array(),
  correctAnswerIndex: integer("correct_answer_index"),
  explanation: text("explanation"),
  order: integer("order").notNull().default(0),
  difficulty: text("difficulty"),
})

export const quizAttempts = pgTable("quiz_attempts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id),
  quizId: text("quiz_id").notNull().references(() => quizzes.id),
  score: integer("score"),
  maxScore: integer("max_score"),
  percentage: integer("percentage"),
  passed: boolean("passed"),
  certificateTier: text("certificate_tier"),
  answers: text("answers"),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
  timeSpentSeconds: integer("time_spent_seconds"),
  retryCount: integer("retry_count").notNull().default(0),
})

export const resources = pgTable("resources", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  fileUrl: text("file_url"),
  category: text("category"),
  downloadCount: integer("download_count").notNull().default(0),
  uploadedBy: text("uploaded_by").references(() => user.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})
