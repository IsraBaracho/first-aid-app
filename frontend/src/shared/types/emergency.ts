export interface Step {
  id?: string;
  title: string;
  description: string;
  order?: number;
}

export interface Emergency {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  description: string;
  cta: string | null;
  steps: Step[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEmergencyDTO {
  title: string;
  steps: Step[];
  slug?: string;
  tags?: string[];
  description?: string;
  cta?: string | null;
}

export interface UpdateEmergencyDTO {
  title?: string;
  slug?: string;
  tags?: string[];
  description?: string;
  cta?: string | null;
  steps?: Step[];
}
