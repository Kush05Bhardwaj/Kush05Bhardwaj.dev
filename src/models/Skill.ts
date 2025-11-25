import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'cloud' | 'mobile' | 'other';
  proficiency: number;
  icon?: string;
  color?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['frontend', 'backend', 'database', 'tools', 'cloud', 'mobile', 'other'],
    },
    proficiency: {
      type: Number,
      min: 1,
      max: 100,
      default: 50,
    },
    icon: String,
    color: String,
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better performance
SkillSchema.index({ category: 1, order: 1 });

// Check if model already exists (for hot reloading in development)
const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;
