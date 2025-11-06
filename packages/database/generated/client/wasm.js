
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.TeacherScalarFieldEnum = {
  id: 'id',
  username: 'username',
  email: 'email',
  name: 'name',
  password: 'password',
  avatar: 'avatar',
  phoneNumber: 'phoneNumber',
  department: 'department',
  title: 'title',
  isActive: 'isActive',
  lastLoginAt: 'lastLoginAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.StudentScalarFieldEnum = {
  id: 'id',
  participantId: 'participantId',
  name: 'name',
  email: 'email',
  phoneNumber: 'phoneNumber',
  grade: 'grade',
  class: 'class',
  studentId: 'studentId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.PaperScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  category: 'category',
  timeLimit: 'timeLimit',
  allowRetake: 'allowRetake',
  showResultsImmediately: 'showResultsImmediately',
  randomizeQuestions: 'randomizeQuestions',
  teacherId: 'teacherId',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.QuestionScalarFieldEnum = {
  id: 'id',
  paperId: 'paperId',
  title: 'title',
  type: 'type',
  description: 'description',
  explanation: 'explanation',
  order: 'order',
  required: 'required',
  points: 'points',
  displayCondition: 'displayCondition',
  options: 'options',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.ExamScalarFieldEnum = {
  id: 'id',
  paperId: 'paperId',
  title: 'title',
  description: 'description',
  startTime: 'startTime',
  endTime: 'endTime',
  timeLimit: 'timeLimit',
  accessCode: 'accessCode',
  allowedStudents: 'allowedStudents',
  maxAttempts: 'maxAttempts',
  requireCamera: 'requireCamera',
  requireMicrophone: 'requireMicrophone',
  enableAIAnalysis: 'enableAIAnalysis',
  status: 'status',
  teacherId: 'teacherId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  scheduledDeletionAt: 'scheduledDeletionAt'
};

exports.Prisma.ExamResultScalarFieldEnum = {
  id: 'id',
  examId: 'examId',
  studentId: 'studentId',
  participantId: 'participantId',
  participantName: 'participantName',
  startedAt: 'startedAt',
  submittedAt: 'submittedAt',
  timeSpent: 'timeSpent',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  totalScore: 'totalScore',
  maxScore: 'maxScore',
  percentage: 'percentage',
  isCompleted: 'isCompleted',
  isValid: 'isValid',
  aiSessionId: 'aiSessionId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.AnswerScalarFieldEnum = {
  id: 'id',
  examResultId: 'examResultId',
  questionId: 'questionId',
  selectedOptions: 'selectedOptions',
  textAnswer: 'textAnswer',
  isCorrect: 'isCorrect',
  points: 'points',
  questionDisplayedAt: 'questionDisplayedAt',
  firstInteractionAt: 'firstInteractionAt',
  lastModifiedAt: 'lastModifiedAt',
  answeredAt: 'answeredAt',
  totalViewTime: 'totalViewTime',
  interactionCount: 'interactionCount',
  hesitationScore: 'hesitationScore'
};

exports.Prisma.AiSessionScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  examResultId: 'examResultId',
  status: 'status',
  startTime: 'startTime',
  endTime: 'endTime',
  clientInfo: 'clientInfo',
  streamInfo: 'streamInfo',
  checkpointFilePath: 'checkpointFilePath',
  checkpointCount: 'checkpointCount',
  fileSize: 'fileSize',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AiAnalysisAggregateScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  examResultId: 'examResultId',
  avgValence: 'avgValence',
  avgArousal: 'avgArousal',
  dominantEmotion: 'dominantEmotion',
  emotionDistribution: 'emotionDistribution',
  avgAttention: 'avgAttention',
  attentionVariability: 'attentionVariability',
  distractionEvents: 'distractionEvents',
  engagementScore: 'engagementScore',
  consistencyScore: 'consistencyScore',
  avgHeartRate: 'avgHeartRate',
  heartRateVariability: 'heartRateVariability',
  stressIndicators: 'stressIndicators',
  dataQuality: 'dataQuality',
  analysisConfidence: 'analysisConfidence',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AiAnomalyScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  type: 'type',
  severity: 'severity',
  timestamp: 'timestamp',
  duration: 'duration',
  confidence: 'confidence',
  description: 'description',
  metadata: 'metadata',
  createdAt: 'createdAt'
};

exports.Prisma.AiCheckpointScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  timestamp: 'timestamp',
  eventType: 'eventType',
  metadata: 'metadata'
};

exports.Prisma.SystemLogScalarFieldEnum = {
  id: 'id',
  level: 'level',
  service: 'service',
  category: 'category',
  message: 'message',
  metadata: 'metadata',
  timestamp: 'timestamp',
  userId: 'userId',
  sessionId: 'sessionId',
  requestId: 'requestId',
  ipAddress: 'ipAddress'
};

exports.Prisma.SystemConfigScalarFieldEnum = {
  id: 'id',
  key: 'key',
  value: 'value',
  description: 'description',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  action: 'action',
  resource: 'resource',
  resourceId: 'resourceId',
  oldValues: 'oldValues',
  newValues: 'newValues',
  changes: 'changes',
  userId: 'userId',
  sessionId: 'sessionId',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  timestamp: 'timestamp'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.QuestionType = exports.$Enums.QuestionType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TEXT: 'TEXT',
  ESSAY: 'ESSAY'
};

exports.ExamStatus = exports.$Enums.ExamStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  SUCCESS: 'SUCCESS',
  ARCHIVED: 'ARCHIVED',
  DELETED: 'DELETED'
};

exports.AiSessionStatus = exports.$Enums.AiSessionStatus = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

exports.AnomalyType = exports.$Enums.AnomalyType = {
  MULTIPLE_FACES: 'MULTIPLE_FACES',
  NO_FACE_DETECTED: 'NO_FACE_DETECTED',
  UNUSUAL_MOVEMENT: 'UNUSUAL_MOVEMENT',
  ATTENTION_DROP: 'ATTENTION_DROP',
  EMOTIONAL_SPIKE: 'EMOTIONAL_SPIKE',
  TECHNICAL_ISSUE: 'TECHNICAL_ISSUE'
};

exports.AnomalySeverity = exports.$Enums.AnomalySeverity = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

exports.CheckpointType = exports.$Enums.CheckpointType = {
  SESSION_START: 'SESSION_START',
  SESSION_END: 'SESSION_END',
  EXAM_START: 'EXAM_START',
  EXAM_END: 'EXAM_END',
  QUESTION_ANSWERED: 'QUESTION_ANSWERED',
  CALIBRATION: 'CALIBRATION',
  QUALITY_CHECK: 'QUALITY_CHECK'
};

exports.LogLevel = exports.$Enums.LogLevel = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  FATAL: 'FATAL'
};

exports.AuditAction = exports.$Enums.AuditAction = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  RESTORE: 'RESTORE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  EXPORT: 'EXPORT',
  IMPORT: 'IMPORT'
};

exports.Prisma.ModelName = {
  Teacher: 'Teacher',
  Student: 'Student',
  Paper: 'Paper',
  Question: 'Question',
  Exam: 'Exam',
  ExamResult: 'ExamResult',
  Answer: 'Answer',
  AiSession: 'AiSession',
  AiAnalysisAggregate: 'AiAnalysisAggregate',
  AiAnomaly: 'AiAnomaly',
  AiCheckpoint: 'AiCheckpoint',
  SystemLog: 'SystemLog',
  SystemConfig: 'SystemConfig',
  AuditLog: 'AuditLog'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
