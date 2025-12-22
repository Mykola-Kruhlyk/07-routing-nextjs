export const TAGS = ["Work", "Personal", "Important", "Ideas", "Todo"] as const;
export type Tag = (typeof TAGS)[number];
