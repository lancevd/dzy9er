import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  // Your other tables...

  subscriptions: defineTable({
    userId: v.id("users"),
    status: v.string(), // e.g., "active", "canceled", "past_due"
    priceId: v.string(), // Reference to the pricing plan
    planCode: v.optional(v.string()), // Optional plan code for special plans
    polarCustomer: v.string(), // Customer ID from Polar
    polarSubscriptionId: v.string(), // Subscription ID from Polar
    productId: v.optional(v.string()), // Optional product ID
    currentPeriodEnd: v.optional(v.number()), // Timestamp for the end of the current billing period
    trialEndsAt: v.optional(v.number()), // Timestamp for the end of the trial period
    cancelAt: v.optional(v.number()), // Timestamp for when the subscription is set to cancel
    canceledAt: v.optional(v.number()), // Timestamp for when the subscription was canceled
    seats: v.optional(v.number()), // Number of seats if applicable
    metadata: v.optional(v.any()), // Additional metadata as needed
    creditsBalance: v.number(), // Current credit balance for the subscription
    credistGrantPeriod: v.number(),
    creditsRolloverLimit: v.number(),
    lastGrantCursor: v.optional(v.string()), // Cursor for the last credit grant
  })
    .index("by_userId", ["userId"])
    .index("by_polarSubscriptionId", ["polarSubscriptionId"])
    .index("by_status", ["status"]),

  credit_ledger: defineTable({
    userId: v.id("users"),
    subscriptionId: v.id("subscriptions"),
    amount: v.number(), // Positive for credits added, negative for credits used
    type: v.string(), // e.g., "grant", "consume", "adjust"
    reason: v.optional(v.string()), // Optional description or reason for the transaction
    idempotencyKey: v.optional(v.string()), // To prevent duplicate entries
    meta: v.optional(v.any()), // Additional metadata as needed
  }),

  projects: defineTable({
    userId: v.id("users"),
    projectNumber: v.number(), // Autp-incrementing Sequential number per user
    name: v.string(),
    description: v.optional(v.string()),
    styleGuide: v.optional(v.string()),
    sketchesData: v.any(),
    viewportData: v.optional(v.any()), // New field for viewport data
    generatedDesignData: v.optional(v.any()), // New field for generated design data
    thumbnail: v.optional(v.string()), // URL or path to the thumbnail image
    moodboardImages: v.optional(v.array(v.string())),
    inspirationImages: v.optional(v.array(v.string())),
    lastModified: v.number(),
    createdAt: v.number(),
    isPublic: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())),
  }).index("by_userId", ["userId"]),

  project_counters: defineTable({
    userId: v.id("users"),
    nextProjectNumber: v.number(),
  }).index("by_userId", ["userId"]),
});

export default schema;
