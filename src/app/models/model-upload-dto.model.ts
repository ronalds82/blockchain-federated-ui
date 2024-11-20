import { ModelStatus } from "../enums/model-status.enum";

export interface ModelUploadDto {
  modelId: string;
  status: ModelStatus;
  timestamp: string;
}
  