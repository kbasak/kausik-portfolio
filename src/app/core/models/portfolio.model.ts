// PORTFOLIO DATA MODELS
// These interfaces define the SHAPE of all data in the app.
// Every component that uses portfolio data will reference these.
// =============================================================

export interface PersonalInfo {
    name: string;
    title: string;
    tagline: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    profilePhoto: string;       // path to image in assets/
    resumeLink: string;         // path to PDF resume in assets/
}

export interface Skill {
    name: string;
    category: 'primary' | 'secondary' | 'tools';   // union type — only these 3 values allowed
}

export interface SkillGroup {
    groupName: string;          // e.g. "Backend", "Frontend", "DevOps"
    icon: string;               // emoji icon for visual flair
    category: 'backend' | 'frontend' | 'testing' | 'database' | 'cloud' | 'tools';  // for badge color
    skills: string[];           // array of skill name strings
}

export interface Experience {
    company: string;
    role: string;
    duration: string;           // e.g. "August 2024 – Present"
    location: string;
    highlights: string[];       // array of bullet point strings
    techStack: string[];        // technologies used in this role
    isCurrent: boolean;         // whether this is the current job
}

export interface Project {
    name: string;
    client: string;             // the client/organization
    description: string;
    highlights: string[];       // key things you did
    techStack: string[];
    domain: string;             // e.g. "Banking", "Healthcare"
}

export interface Education {
    degree: string;
    institution: string;
    duration: string;
    cgpa: string;
    location: string;
}

export interface Certification {
    name: string;
    issuer: string;
    year?: string;              // optional (?) means this field isn't required
}

export interface Achievement {
    title: string;
    description: string;
    icon: string;               // emoji
}

// This is the ROOT model — one object that holds EVERYTHING
export interface PortfolioData {
    personal: PersonalInfo;
    skillGroups: SkillGroup[];
    experience: Experience[];
    projects: Project[];
    education: Education;
    certifications: Certification[];
    achievements: Achievement[];
}
