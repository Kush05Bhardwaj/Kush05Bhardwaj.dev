import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  position: string;
  description?: string;
  responsibilities: string[];
  technologies: string[];
  startDate: Date;
  endDate?: Date;
  isCurrentJob: boolean;
  location?: string;
  companyUrl?: string;
  logo?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema: Schema = new Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    responsibilities: [String],
    technologies: [String],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    isCurrentJob: {
      type: Boolean,
      default: false,
    },
    location: String,
    companyUrl: String,
    logo: String,
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
ExperienceSchema.index({ order: 1, startDate: -1 });

const Experience: Model<IExperience> =
  mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);

export default Experience;
