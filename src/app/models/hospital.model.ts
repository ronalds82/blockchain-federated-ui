import { Role } from "../enums/role.enum";
import { ModelUploadDto } from "./model-upload-dto.model";
import { Vote } from "./vote.model";

export interface Hospital {
  id: number;
  name?: string;
  role?: Role;
}

export interface HospitalDetails extends Hospital {
  uploads?: ModelUploadDto[];
  votes?: Vote[];
  hasVoted?: boolean;
}