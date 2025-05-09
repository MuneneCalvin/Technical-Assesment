export interface DataSource {

  id: string;
  name: string;
  url: string;
  version?: string;
  isActive?: boolean;
  refreshInterval?: number;
  parsingOptions?: {
    useStreaming?: boolean;
    structureType?: 'array' | 'object';
    dataPath?: string;
  };

  fieldMappings?: {
    id?: string;
    name?: string;
    location?: {
      city?: string;
      country?: string;
    };
    availability?: string;
    price?: {
      nightly?: string;
      segment?: string;
    };
  };
}


export interface DataSourceIngestionStatus {
  sourceId: string;
  lastSuccess?: Date;
  lastAttempt: Date;
  status: 'pending' | 'in-progress' | 'success' | 'failed';
  recordsProcessed?: number;
  error?: {
    message: string;
    code?: string;
    stack?: string;
  };
  metrics?: {
    downloadTimeMs?: number;
    parseTimeMs?: number;
    dbWriteTimeMs?: number;
    totalTimeMs?: number;
  };
}

export interface DataSourceIngestionResult {
  success: boolean;
  sourceId: string;
  recordsProcessed: number;
  newRecords: number;
  updatedRecords: number;
  skippedRecords: number;
  errors?: Array<{
    recordId?: string;
    error: string;
  }>;
  warnings?: string[];
  durationMs: number;
}