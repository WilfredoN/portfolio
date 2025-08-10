import { Feedback } from "@features/feedback/types/feedback";
import { FeedbackResponse } from ".";
import { Skill } from "@features/feedback/types/skill";


export const mapFeedback = (data: unknown[]): Feedback[] => data.map((feedback) => ({
  ...feedback,
  skills: feedback.feedback_skills.flatMap((fs) => fs.skills)
}))

