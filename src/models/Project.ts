import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  shortDescription?: string;
  technologies: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: 'web' | 'mobile' | 'desktop' | 'api' | 'other';
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: String,
    technologies: [
      {
        type: String,
        required: true,
      },
    ],
    images: [String],
    liveUrl: String,
    githubUrl: String,
    category: {
      type: String,
      enum: ['web', 'mobile', 'desktop', 'api', 'other'],
      default: 'web',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'planned'],
      default: 'completed',
    },
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
ProjectSchema.index({ featured: -1, order: 1, createdAt: -1 });

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
