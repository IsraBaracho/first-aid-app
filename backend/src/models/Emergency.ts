export interface Step {
    title: string;
    description: string;
}

export interface Emergency {
    id: string;
    slug: string;
    title: string;
    tags: string[];
    description: string;
    cta: string | null;
    steps: Step[];
}


// DTOs -> Data Transfer Objects

export interface EmergencyDTO {
    title: string;
    steps: Step[];
    slug?: string;
    tags?: string[];
    description?: string;
    cta?: string | null;
}

export interface UpdateEmergencyDTO {
    title: string;
    steps: Step[];
    slug?: string;
    tags?: string[];
    description?: string;
    cta?: string | null;
}