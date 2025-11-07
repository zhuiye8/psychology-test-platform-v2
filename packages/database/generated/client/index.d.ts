
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Teacher
 * 
 */
export type Teacher = $Result.DefaultSelection<Prisma.$TeacherPayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Paper
 * 
 */
export type Paper = $Result.DefaultSelection<Prisma.$PaperPayload>
/**
 * Model Question
 * 
 */
export type Question = $Result.DefaultSelection<Prisma.$QuestionPayload>
/**
 * Model Exam
 * 
 */
export type Exam = $Result.DefaultSelection<Prisma.$ExamPayload>
/**
 * Model ExamResult
 * 
 */
export type ExamResult = $Result.DefaultSelection<Prisma.$ExamResultPayload>
/**
 * Model Answer
 * 
 */
export type Answer = $Result.DefaultSelection<Prisma.$AnswerPayload>
/**
 * Model AiSession
 * 
 */
export type AiSession = $Result.DefaultSelection<Prisma.$AiSessionPayload>
/**
 * Model AiAnalysisAggregate
 * 
 */
export type AiAnalysisAggregate = $Result.DefaultSelection<Prisma.$AiAnalysisAggregatePayload>
/**
 * Model AiAnomaly
 * 
 */
export type AiAnomaly = $Result.DefaultSelection<Prisma.$AiAnomalyPayload>
/**
 * Model AiCheckpoint
 * 
 */
export type AiCheckpoint = $Result.DefaultSelection<Prisma.$AiCheckpointPayload>
/**
 * Model SystemLog
 * 
 */
export type SystemLog = $Result.DefaultSelection<Prisma.$SystemLogPayload>
/**
 * Model SystemConfig
 * 
 */
export type SystemConfig = $Result.DefaultSelection<Prisma.$SystemConfigPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const QuestionType: {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TEXT: 'TEXT',
  ESSAY: 'ESSAY'
};

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType]


export const ExamStatus: {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  SUCCESS: 'SUCCESS',
  ARCHIVED: 'ARCHIVED',
  DELETED: 'DELETED'
};

export type ExamStatus = (typeof ExamStatus)[keyof typeof ExamStatus]


export const AiSessionStatus: {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type AiSessionStatus = (typeof AiSessionStatus)[keyof typeof AiSessionStatus]


export const AnomalyType: {
  MULTIPLE_FACES: 'MULTIPLE_FACES',
  NO_FACE_DETECTED: 'NO_FACE_DETECTED',
  UNUSUAL_MOVEMENT: 'UNUSUAL_MOVEMENT',
  ATTENTION_DROP: 'ATTENTION_DROP',
  EMOTIONAL_SPIKE: 'EMOTIONAL_SPIKE',
  TECHNICAL_ISSUE: 'TECHNICAL_ISSUE'
};

export type AnomalyType = (typeof AnomalyType)[keyof typeof AnomalyType]


export const AnomalySeverity: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export type AnomalySeverity = (typeof AnomalySeverity)[keyof typeof AnomalySeverity]


export const CheckpointType: {
  SESSION_START: 'SESSION_START',
  SESSION_END: 'SESSION_END',
  EXAM_START: 'EXAM_START',
  EXAM_END: 'EXAM_END',
  QUESTION_ANSWERED: 'QUESTION_ANSWERED',
  CALIBRATION: 'CALIBRATION',
  QUALITY_CHECK: 'QUALITY_CHECK'
};

export type CheckpointType = (typeof CheckpointType)[keyof typeof CheckpointType]


export const LogLevel: {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  FATAL: 'FATAL'
};

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel]


export const AuditAction: {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  RESTORE: 'RESTORE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  EXPORT: 'EXPORT',
  IMPORT: 'IMPORT'
};

export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction]

}

export type QuestionType = $Enums.QuestionType

export const QuestionType: typeof $Enums.QuestionType

export type ExamStatus = $Enums.ExamStatus

export const ExamStatus: typeof $Enums.ExamStatus

export type AiSessionStatus = $Enums.AiSessionStatus

export const AiSessionStatus: typeof $Enums.AiSessionStatus

export type AnomalyType = $Enums.AnomalyType

export const AnomalyType: typeof $Enums.AnomalyType

export type AnomalySeverity = $Enums.AnomalySeverity

export const AnomalySeverity: typeof $Enums.AnomalySeverity

export type CheckpointType = $Enums.CheckpointType

export const CheckpointType: typeof $Enums.CheckpointType

export type LogLevel = $Enums.LogLevel

export const LogLevel: typeof $Enums.LogLevel

export type AuditAction = $Enums.AuditAction

export const AuditAction: typeof $Enums.AuditAction

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Teachers
 * const teachers = await prisma.teacher.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Teachers
   * const teachers = await prisma.teacher.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.teacher`: Exposes CRUD operations for the **Teacher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teachers
    * const teachers = await prisma.teacher.findMany()
    * ```
    */
  get teacher(): Prisma.TeacherDelegate<ExtArgs>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs>;

  /**
   * `prisma.paper`: Exposes CRUD operations for the **Paper** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Papers
    * const papers = await prisma.paper.findMany()
    * ```
    */
  get paper(): Prisma.PaperDelegate<ExtArgs>;

  /**
   * `prisma.question`: Exposes CRUD operations for the **Question** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Questions
    * const questions = await prisma.question.findMany()
    * ```
    */
  get question(): Prisma.QuestionDelegate<ExtArgs>;

  /**
   * `prisma.exam`: Exposes CRUD operations for the **Exam** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exams
    * const exams = await prisma.exam.findMany()
    * ```
    */
  get exam(): Prisma.ExamDelegate<ExtArgs>;

  /**
   * `prisma.examResult`: Exposes CRUD operations for the **ExamResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExamResults
    * const examResults = await prisma.examResult.findMany()
    * ```
    */
  get examResult(): Prisma.ExamResultDelegate<ExtArgs>;

  /**
   * `prisma.answer`: Exposes CRUD operations for the **Answer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Answers
    * const answers = await prisma.answer.findMany()
    * ```
    */
  get answer(): Prisma.AnswerDelegate<ExtArgs>;

  /**
   * `prisma.aiSession`: Exposes CRUD operations for the **AiSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiSessions
    * const aiSessions = await prisma.aiSession.findMany()
    * ```
    */
  get aiSession(): Prisma.AiSessionDelegate<ExtArgs>;

  /**
   * `prisma.aiAnalysisAggregate`: Exposes CRUD operations for the **AiAnalysisAggregate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiAnalysisAggregates
    * const aiAnalysisAggregates = await prisma.aiAnalysisAggregate.findMany()
    * ```
    */
  get aiAnalysisAggregate(): Prisma.AiAnalysisAggregateDelegate<ExtArgs>;

  /**
   * `prisma.aiAnomaly`: Exposes CRUD operations for the **AiAnomaly** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiAnomalies
    * const aiAnomalies = await prisma.aiAnomaly.findMany()
    * ```
    */
  get aiAnomaly(): Prisma.AiAnomalyDelegate<ExtArgs>;

  /**
   * `prisma.aiCheckpoint`: Exposes CRUD operations for the **AiCheckpoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiCheckpoints
    * const aiCheckpoints = await prisma.aiCheckpoint.findMany()
    * ```
    */
  get aiCheckpoint(): Prisma.AiCheckpointDelegate<ExtArgs>;

  /**
   * `prisma.systemLog`: Exposes CRUD operations for the **SystemLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemLogs
    * const systemLogs = await prisma.systemLog.findMany()
    * ```
    */
  get systemLog(): Prisma.SystemLogDelegate<ExtArgs>;

  /**
   * `prisma.systemConfig`: Exposes CRUD operations for the **SystemConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemConfigs
    * const systemConfigs = await prisma.systemConfig.findMany()
    * ```
    */
  get systemConfig(): Prisma.SystemConfigDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "teacher" | "student" | "paper" | "question" | "exam" | "examResult" | "answer" | "aiSession" | "aiAnalysisAggregate" | "aiAnomaly" | "aiCheckpoint" | "systemLog" | "systemConfig" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Teacher: {
        payload: Prisma.$TeacherPayload<ExtArgs>
        fields: Prisma.TeacherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeacherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeacherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findFirst: {
            args: Prisma.TeacherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeacherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findMany: {
            args: Prisma.TeacherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          create: {
            args: Prisma.TeacherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          createMany: {
            args: Prisma.TeacherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeacherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          delete: {
            args: Prisma.TeacherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          update: {
            args: Prisma.TeacherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          deleteMany: {
            args: Prisma.TeacherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeacherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeacherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          aggregate: {
            args: Prisma.TeacherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeacher>
          }
          groupBy: {
            args: Prisma.TeacherGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeacherGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeacherCountArgs<ExtArgs>
            result: $Utils.Optional<TeacherCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Paper: {
        payload: Prisma.$PaperPayload<ExtArgs>
        fields: Prisma.PaperFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaperFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaperFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>
          }
          findFirst: {
            args: Prisma.PaperFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaperFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>
          }
          findMany: {
            args: Prisma.PaperFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>[]
          }
          create: {
            args: Prisma.PaperCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>
          }
          createMany: {
            args: Prisma.PaperCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaperCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>[]
          }
          delete: {
            args: Prisma.PaperDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>
          }
          update: {
            args: Prisma.PaperUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>
          }
          deleteMany: {
            args: Prisma.PaperDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaperUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaperUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaperPayload>
          }
          aggregate: {
            args: Prisma.PaperAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaper>
          }
          groupBy: {
            args: Prisma.PaperGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaperGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaperCountArgs<ExtArgs>
            result: $Utils.Optional<PaperCountAggregateOutputType> | number
          }
        }
      }
      Question: {
        payload: Prisma.$QuestionPayload<ExtArgs>
        fields: Prisma.QuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findFirst: {
            args: Prisma.QuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findMany: {
            args: Prisma.QuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          create: {
            args: Prisma.QuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          createMany: {
            args: Prisma.QuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          delete: {
            args: Prisma.QuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          update: {
            args: Prisma.QuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          aggregate: {
            args: Prisma.QuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion>
          }
          groupBy: {
            args: Prisma.QuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionCountAggregateOutputType> | number
          }
        }
      }
      Exam: {
        payload: Prisma.$ExamPayload<ExtArgs>
        fields: Prisma.ExamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>
          }
          findFirst: {
            args: Prisma.ExamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>
          }
          findMany: {
            args: Prisma.ExamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>[]
          }
          create: {
            args: Prisma.ExamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>
          }
          createMany: {
            args: Prisma.ExamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>[]
          }
          delete: {
            args: Prisma.ExamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>
          }
          update: {
            args: Prisma.ExamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>
          }
          deleteMany: {
            args: Prisma.ExamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamPayload>
          }
          aggregate: {
            args: Prisma.ExamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExam>
          }
          groupBy: {
            args: Prisma.ExamGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExamGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExamCountArgs<ExtArgs>
            result: $Utils.Optional<ExamCountAggregateOutputType> | number
          }
        }
      }
      ExamResult: {
        payload: Prisma.$ExamResultPayload<ExtArgs>
        fields: Prisma.ExamResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExamResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExamResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResultPayload>
          }
          findFirst: {
            args: Prisma.ExamResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExamResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResultPayload>
          }
          findMany: {
            args: Prisma.ExamResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResultPayload>[]
          }
          create: {
            args: Prisma.ExamResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResultPayload>
          }
          createMany: {
            args: Prisma.ExamResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExamResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResultPayload>[]
          }
          delete: {
            args: Prisma.ExamResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResultPayload>
          }
          update: {
            args: Prisma.ExamResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResultPayload>
          }
          deleteMany: {
            args: Prisma.ExamResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExamResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExamResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamResultPayload>
          }
          aggregate: {
            args: Prisma.ExamResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExamResult>
          }
          groupBy: {
            args: Prisma.ExamResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExamResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExamResultCountArgs<ExtArgs>
            result: $Utils.Optional<ExamResultCountAggregateOutputType> | number
          }
        }
      }
      Answer: {
        payload: Prisma.$AnswerPayload<ExtArgs>
        fields: Prisma.AnswerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          findFirst: {
            args: Prisma.AnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          findMany: {
            args: Prisma.AnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>[]
          }
          create: {
            args: Prisma.AnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          createMany: {
            args: Prisma.AnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnswerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>[]
          }
          delete: {
            args: Prisma.AnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          update: {
            args: Prisma.AnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          deleteMany: {
            args: Prisma.AnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          aggregate: {
            args: Prisma.AnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnswer>
          }
          groupBy: {
            args: Prisma.AnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnswerGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnswerCountArgs<ExtArgs>
            result: $Utils.Optional<AnswerCountAggregateOutputType> | number
          }
        }
      }
      AiSession: {
        payload: Prisma.$AiSessionPayload<ExtArgs>
        fields: Prisma.AiSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSessionPayload>
          }
          findFirst: {
            args: Prisma.AiSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSessionPayload>
          }
          findMany: {
            args: Prisma.AiSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSessionPayload>[]
          }
          create: {
            args: Prisma.AiSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSessionPayload>
          }
          createMany: {
            args: Prisma.AiSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSessionPayload>[]
          }
          delete: {
            args: Prisma.AiSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSessionPayload>
          }
          update: {
            args: Prisma.AiSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSessionPayload>
          }
          deleteMany: {
            args: Prisma.AiSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AiSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiSessionPayload>
          }
          aggregate: {
            args: Prisma.AiSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiSession>
          }
          groupBy: {
            args: Prisma.AiSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiSessionCountArgs<ExtArgs>
            result: $Utils.Optional<AiSessionCountAggregateOutputType> | number
          }
        }
      }
      AiAnalysisAggregate: {
        payload: Prisma.$AiAnalysisAggregatePayload<ExtArgs>
        fields: Prisma.AiAnalysisAggregateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiAnalysisAggregateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnalysisAggregatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiAnalysisAggregateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnalysisAggregatePayload>
          }
          findFirst: {
            args: Prisma.AiAnalysisAggregateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnalysisAggregatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiAnalysisAggregateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnalysisAggregatePayload>
          }
          findMany: {
            args: Prisma.AiAnalysisAggregateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnalysisAggregatePayload>[]
          }
          create: {
            args: Prisma.AiAnalysisAggregateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnalysisAggregatePayload>
          }
          createMany: {
            args: Prisma.AiAnalysisAggregateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiAnalysisAggregateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnalysisAggregatePayload>[]
          }
          delete: {
            args: Prisma.AiAnalysisAggregateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnalysisAggregatePayload>
          }
          update: {
            args: Prisma.AiAnalysisAggregateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnalysisAggregatePayload>
          }
          deleteMany: {
            args: Prisma.AiAnalysisAggregateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiAnalysisAggregateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AiAnalysisAggregateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnalysisAggregatePayload>
          }
          aggregate: {
            args: Prisma.AiAnalysisAggregateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiAnalysisAggregate>
          }
          groupBy: {
            args: Prisma.AiAnalysisAggregateGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiAnalysisAggregateGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiAnalysisAggregateCountArgs<ExtArgs>
            result: $Utils.Optional<AiAnalysisAggregateCountAggregateOutputType> | number
          }
        }
      }
      AiAnomaly: {
        payload: Prisma.$AiAnomalyPayload<ExtArgs>
        fields: Prisma.AiAnomalyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiAnomalyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnomalyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiAnomalyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnomalyPayload>
          }
          findFirst: {
            args: Prisma.AiAnomalyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnomalyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiAnomalyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnomalyPayload>
          }
          findMany: {
            args: Prisma.AiAnomalyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnomalyPayload>[]
          }
          create: {
            args: Prisma.AiAnomalyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnomalyPayload>
          }
          createMany: {
            args: Prisma.AiAnomalyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiAnomalyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnomalyPayload>[]
          }
          delete: {
            args: Prisma.AiAnomalyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnomalyPayload>
          }
          update: {
            args: Prisma.AiAnomalyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnomalyPayload>
          }
          deleteMany: {
            args: Prisma.AiAnomalyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiAnomalyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AiAnomalyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiAnomalyPayload>
          }
          aggregate: {
            args: Prisma.AiAnomalyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiAnomaly>
          }
          groupBy: {
            args: Prisma.AiAnomalyGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiAnomalyGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiAnomalyCountArgs<ExtArgs>
            result: $Utils.Optional<AiAnomalyCountAggregateOutputType> | number
          }
        }
      }
      AiCheckpoint: {
        payload: Prisma.$AiCheckpointPayload<ExtArgs>
        fields: Prisma.AiCheckpointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiCheckpointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiCheckpointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiCheckpointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiCheckpointPayload>
          }
          findFirst: {
            args: Prisma.AiCheckpointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiCheckpointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiCheckpointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiCheckpointPayload>
          }
          findMany: {
            args: Prisma.AiCheckpointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiCheckpointPayload>[]
          }
          create: {
            args: Prisma.AiCheckpointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiCheckpointPayload>
          }
          createMany: {
            args: Prisma.AiCheckpointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiCheckpointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiCheckpointPayload>[]
          }
          delete: {
            args: Prisma.AiCheckpointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiCheckpointPayload>
          }
          update: {
            args: Prisma.AiCheckpointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiCheckpointPayload>
          }
          deleteMany: {
            args: Prisma.AiCheckpointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiCheckpointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AiCheckpointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiCheckpointPayload>
          }
          aggregate: {
            args: Prisma.AiCheckpointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiCheckpoint>
          }
          groupBy: {
            args: Prisma.AiCheckpointGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiCheckpointGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiCheckpointCountArgs<ExtArgs>
            result: $Utils.Optional<AiCheckpointCountAggregateOutputType> | number
          }
        }
      }
      SystemLog: {
        payload: Prisma.$SystemLogPayload<ExtArgs>
        fields: Prisma.SystemLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          findFirst: {
            args: Prisma.SystemLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          findMany: {
            args: Prisma.SystemLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>[]
          }
          create: {
            args: Prisma.SystemLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          createMany: {
            args: Prisma.SystemLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>[]
          }
          delete: {
            args: Prisma.SystemLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          update: {
            args: Prisma.SystemLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          deleteMany: {
            args: Prisma.SystemLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SystemLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemLogPayload>
          }
          aggregate: {
            args: Prisma.SystemLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemLog>
          }
          groupBy: {
            args: Prisma.SystemLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemLogCountArgs<ExtArgs>
            result: $Utils.Optional<SystemLogCountAggregateOutputType> | number
          }
        }
      }
      SystemConfig: {
        payload: Prisma.$SystemConfigPayload<ExtArgs>
        fields: Prisma.SystemConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          findFirst: {
            args: Prisma.SystemConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          findMany: {
            args: Prisma.SystemConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          create: {
            args: Prisma.SystemConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          createMany: {
            args: Prisma.SystemConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          delete: {
            args: Prisma.SystemConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          update: {
            args: Prisma.SystemConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          deleteMany: {
            args: Prisma.SystemConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SystemConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          aggregate: {
            args: Prisma.SystemConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemConfig>
          }
          groupBy: {
            args: Prisma.SystemConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemConfigCountArgs<ExtArgs>
            result: $Utils.Optional<SystemConfigCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TeacherCountOutputType
   */

  export type TeacherCountOutputType = {
    papers: number
    exams: number
  }

  export type TeacherCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    papers?: boolean | TeacherCountOutputTypeCountPapersArgs
    exams?: boolean | TeacherCountOutputTypeCountExamsArgs
  }

  // Custom InputTypes
  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherCountOutputType
     */
    select?: TeacherCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountPapersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaperWhereInput
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountExamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamWhereInput
  }


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    examResults: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    examResults?: boolean | StudentCountOutputTypeCountExamResultsArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountExamResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamResultWhereInput
  }


  /**
   * Count Type PaperCountOutputType
   */

  export type PaperCountOutputType = {
    questions: number
    exams: number
  }

  export type PaperCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | PaperCountOutputTypeCountQuestionsArgs
    exams?: boolean | PaperCountOutputTypeCountExamsArgs
  }

  // Custom InputTypes
  /**
   * PaperCountOutputType without action
   */
  export type PaperCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaperCountOutputType
     */
    select?: PaperCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PaperCountOutputType without action
   */
  export type PaperCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
  }

  /**
   * PaperCountOutputType without action
   */
  export type PaperCountOutputTypeCountExamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamWhereInput
  }


  /**
   * Count Type QuestionCountOutputType
   */

  export type QuestionCountOutputType = {
    answers: number
  }

  export type QuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | QuestionCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionCountOutputType
     */
    select?: QuestionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnswerWhereInput
  }


  /**
   * Count Type ExamCountOutputType
   */

  export type ExamCountOutputType = {
    examResults: number
  }

  export type ExamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    examResults?: boolean | ExamCountOutputTypeCountExamResultsArgs
  }

  // Custom InputTypes
  /**
   * ExamCountOutputType without action
   */
  export type ExamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamCountOutputType
     */
    select?: ExamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExamCountOutputType without action
   */
  export type ExamCountOutputTypeCountExamResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamResultWhereInput
  }


  /**
   * Count Type ExamResultCountOutputType
   */

  export type ExamResultCountOutputType = {
    answers: number
  }

  export type ExamResultCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | ExamResultCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * ExamResultCountOutputType without action
   */
  export type ExamResultCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResultCountOutputType
     */
    select?: ExamResultCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExamResultCountOutputType without action
   */
  export type ExamResultCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnswerWhereInput
  }


  /**
   * Count Type AiSessionCountOutputType
   */

  export type AiSessionCountOutputType = {
    anomalies: number
    checkpoints: number
  }

  export type AiSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    anomalies?: boolean | AiSessionCountOutputTypeCountAnomaliesArgs
    checkpoints?: boolean | AiSessionCountOutputTypeCountCheckpointsArgs
  }

  // Custom InputTypes
  /**
   * AiSessionCountOutputType without action
   */
  export type AiSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSessionCountOutputType
     */
    select?: AiSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AiSessionCountOutputType without action
   */
  export type AiSessionCountOutputTypeCountAnomaliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiAnomalyWhereInput
  }

  /**
   * AiSessionCountOutputType without action
   */
  export type AiSessionCountOutputTypeCountCheckpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiCheckpointWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Teacher
   */

  export type AggregateTeacher = {
    _count: TeacherCountAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  export type TeacherMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    name: string | null
    password: string | null
    avatar: string | null
    phoneNumber: string | null
    department: string | null
    title: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type TeacherMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    name: string | null
    password: string | null
    avatar: string | null
    phoneNumber: string | null
    department: string | null
    title: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type TeacherCountAggregateOutputType = {
    id: number
    username: number
    email: number
    name: number
    password: number
    avatar: number
    phoneNumber: number
    department: number
    title: number
    isActive: number
    lastLoginAt: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type TeacherMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    name?: true
    password?: true
    avatar?: true
    phoneNumber?: true
    department?: true
    title?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type TeacherMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    name?: true
    password?: true
    avatar?: true
    phoneNumber?: true
    department?: true
    title?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type TeacherCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    name?: true
    password?: true
    avatar?: true
    phoneNumber?: true
    department?: true
    title?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type TeacherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teacher to aggregate.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teachers
    **/
    _count?: true | TeacherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeacherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeacherMaxAggregateInputType
  }

  export type GetTeacherAggregateType<T extends TeacherAggregateArgs> = {
        [P in keyof T & keyof AggregateTeacher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeacher[P]>
      : GetScalarType<T[P], AggregateTeacher[P]>
  }




  export type TeacherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherWhereInput
    orderBy?: TeacherOrderByWithAggregationInput | TeacherOrderByWithAggregationInput[]
    by: TeacherScalarFieldEnum[] | TeacherScalarFieldEnum
    having?: TeacherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeacherCountAggregateInputType | true
    _min?: TeacherMinAggregateInputType
    _max?: TeacherMaxAggregateInputType
  }

  export type TeacherGroupByOutputType = {
    id: string
    username: string
    email: string
    name: string
    password: string
    avatar: string | null
    phoneNumber: string | null
    department: string | null
    title: string | null
    isActive: boolean
    lastLoginAt: Date | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: TeacherCountAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  type GetTeacherGroupByPayload<T extends TeacherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeacherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeacherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeacherGroupByOutputType[P]>
            : GetScalarType<T[P], TeacherGroupByOutputType[P]>
        }
      >
    >


  export type TeacherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    avatar?: boolean
    phoneNumber?: boolean
    department?: boolean
    title?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    papers?: boolean | Teacher$papersArgs<ExtArgs>
    exams?: boolean | Teacher$examsArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    avatar?: boolean
    phoneNumber?: boolean
    department?: boolean
    title?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    avatar?: boolean
    phoneNumber?: boolean
    department?: boolean
    title?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type TeacherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    papers?: boolean | Teacher$papersArgs<ExtArgs>
    exams?: boolean | Teacher$examsArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeacherIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TeacherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Teacher"
    objects: {
      papers: Prisma.$PaperPayload<ExtArgs>[]
      exams: Prisma.$ExamPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      name: string
      password: string
      avatar: string | null
      phoneNumber: string | null
      department: string | null
      title: string | null
      isActive: boolean
      lastLoginAt: Date | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["teacher"]>
    composites: {}
  }

  type TeacherGetPayload<S extends boolean | null | undefined | TeacherDefaultArgs> = $Result.GetResult<Prisma.$TeacherPayload, S>

  type TeacherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TeacherFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TeacherCountAggregateInputType | true
    }

  export interface TeacherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Teacher'], meta: { name: 'Teacher' } }
    /**
     * Find zero or one Teacher that matches the filter.
     * @param {TeacherFindUniqueArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeacherFindUniqueArgs>(args: SelectSubset<T, TeacherFindUniqueArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Teacher that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TeacherFindUniqueOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeacherFindUniqueOrThrowArgs>(args: SelectSubset<T, TeacherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Teacher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeacherFindFirstArgs>(args?: SelectSubset<T, TeacherFindFirstArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Teacher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeacherFindFirstOrThrowArgs>(args?: SelectSubset<T, TeacherFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Teachers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teachers
     * const teachers = await prisma.teacher.findMany()
     * 
     * // Get first 10 Teachers
     * const teachers = await prisma.teacher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teacherWithIdOnly = await prisma.teacher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeacherFindManyArgs>(args?: SelectSubset<T, TeacherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Teacher.
     * @param {TeacherCreateArgs} args - Arguments to create a Teacher.
     * @example
     * // Create one Teacher
     * const Teacher = await prisma.teacher.create({
     *   data: {
     *     // ... data to create a Teacher
     *   }
     * })
     * 
     */
    create<T extends TeacherCreateArgs>(args: SelectSubset<T, TeacherCreateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Teachers.
     * @param {TeacherCreateManyArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeacherCreateManyArgs>(args?: SelectSubset<T, TeacherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teachers and returns the data saved in the database.
     * @param {TeacherCreateManyAndReturnArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeacherCreateManyAndReturnArgs>(args?: SelectSubset<T, TeacherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Teacher.
     * @param {TeacherDeleteArgs} args - Arguments to delete one Teacher.
     * @example
     * // Delete one Teacher
     * const Teacher = await prisma.teacher.delete({
     *   where: {
     *     // ... filter to delete one Teacher
     *   }
     * })
     * 
     */
    delete<T extends TeacherDeleteArgs>(args: SelectSubset<T, TeacherDeleteArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Teacher.
     * @param {TeacherUpdateArgs} args - Arguments to update one Teacher.
     * @example
     * // Update one Teacher
     * const teacher = await prisma.teacher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeacherUpdateArgs>(args: SelectSubset<T, TeacherUpdateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Teachers.
     * @param {TeacherDeleteManyArgs} args - Arguments to filter Teachers to delete.
     * @example
     * // Delete a few Teachers
     * const { count } = await prisma.teacher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeacherDeleteManyArgs>(args?: SelectSubset<T, TeacherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeacherUpdateManyArgs>(args: SelectSubset<T, TeacherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Teacher.
     * @param {TeacherUpsertArgs} args - Arguments to update or create a Teacher.
     * @example
     * // Update or create a Teacher
     * const teacher = await prisma.teacher.upsert({
     *   create: {
     *     // ... data to create a Teacher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Teacher we want to update
     *   }
     * })
     */
    upsert<T extends TeacherUpsertArgs>(args: SelectSubset<T, TeacherUpsertArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherCountArgs} args - Arguments to filter Teachers to count.
     * @example
     * // Count the number of Teachers
     * const count = await prisma.teacher.count({
     *   where: {
     *     // ... the filter for the Teachers we want to count
     *   }
     * })
    **/
    count<T extends TeacherCountArgs>(
      args?: Subset<T, TeacherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeacherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeacherAggregateArgs>(args: Subset<T, TeacherAggregateArgs>): Prisma.PrismaPromise<GetTeacherAggregateType<T>>

    /**
     * Group by Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeacherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeacherGroupByArgs['orderBy'] }
        : { orderBy?: TeacherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeacherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeacherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Teacher model
   */
  readonly fields: TeacherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Teacher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeacherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    papers<T extends Teacher$papersArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$papersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "findMany"> | Null>
    exams<T extends Teacher$examsArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$examsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Teacher model
   */ 
  interface TeacherFieldRefs {
    readonly id: FieldRef<"Teacher", 'String'>
    readonly username: FieldRef<"Teacher", 'String'>
    readonly email: FieldRef<"Teacher", 'String'>
    readonly name: FieldRef<"Teacher", 'String'>
    readonly password: FieldRef<"Teacher", 'String'>
    readonly avatar: FieldRef<"Teacher", 'String'>
    readonly phoneNumber: FieldRef<"Teacher", 'String'>
    readonly department: FieldRef<"Teacher", 'String'>
    readonly title: FieldRef<"Teacher", 'String'>
    readonly isActive: FieldRef<"Teacher", 'Boolean'>
    readonly lastLoginAt: FieldRef<"Teacher", 'DateTime'>
    readonly createdAt: FieldRef<"Teacher", 'DateTime'>
    readonly updatedAt: FieldRef<"Teacher", 'DateTime'>
    readonly deletedAt: FieldRef<"Teacher", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Teacher findUnique
   */
  export type TeacherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findUniqueOrThrow
   */
  export type TeacherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findFirst
   */
  export type TeacherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findFirstOrThrow
   */
  export type TeacherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findMany
   */
  export type TeacherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teachers to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher create
   */
  export type TeacherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to create a Teacher.
     */
    data: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
  }

  /**
   * Teacher createMany
   */
  export type TeacherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher createManyAndReturn
   */
  export type TeacherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher update
   */
  export type TeacherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to update a Teacher.
     */
    data: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
    /**
     * Choose, which Teacher to update.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher updateMany
   */
  export type TeacherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
  }

  /**
   * Teacher upsert
   */
  export type TeacherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The filter to search for the Teacher to update in case it exists.
     */
    where: TeacherWhereUniqueInput
    /**
     * In case the Teacher found by the `where` argument doesn't exist, create a new Teacher with this data.
     */
    create: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
    /**
     * In case the Teacher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
  }

  /**
   * Teacher delete
   */
  export type TeacherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter which Teacher to delete.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher deleteMany
   */
  export type TeacherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teachers to delete
     */
    where?: TeacherWhereInput
  }

  /**
   * Teacher.papers
   */
  export type Teacher$papersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    where?: PaperWhereInput
    orderBy?: PaperOrderByWithRelationInput | PaperOrderByWithRelationInput[]
    cursor?: PaperWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaperScalarFieldEnum | PaperScalarFieldEnum[]
  }

  /**
   * Teacher.exams
   */
  export type Teacher$examsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    where?: ExamWhereInput
    orderBy?: ExamOrderByWithRelationInput | ExamOrderByWithRelationInput[]
    cursor?: ExamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExamScalarFieldEnum | ExamScalarFieldEnum[]
  }

  /**
   * Teacher without action
   */
  export type TeacherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentMinAggregateOutputType = {
    id: string | null
    participantId: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
    grade: string | null
    class: string | null
    studentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type StudentMaxAggregateOutputType = {
    id: string | null
    participantId: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
    grade: string | null
    class: string | null
    studentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    participantId: number
    name: number
    email: number
    phoneNumber: number
    grade: number
    class: number
    studentId: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type StudentMinAggregateInputType = {
    id?: true
    participantId?: true
    name?: true
    email?: true
    phoneNumber?: true
    grade?: true
    class?: true
    studentId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    participantId?: true
    name?: true
    email?: true
    phoneNumber?: true
    grade?: true
    class?: true
    studentId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    participantId?: true
    name?: true
    email?: true
    phoneNumber?: true
    grade?: true
    class?: true
    studentId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: string
    participantId: string
    name: string
    email: string | null
    phoneNumber: string | null
    grade: string | null
    class: string | null
    studentId: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    participantId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    grade?: boolean
    class?: boolean
    studentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    examResults?: boolean | Student$examResultsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    participantId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    grade?: boolean
    class?: boolean
    studentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    participantId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    grade?: boolean
    class?: boolean
    studentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    examResults?: boolean | Student$examResultsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      examResults: Prisma.$ExamResultPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      participantId: string
      name: string
      email: string | null
      phoneNumber: string | null
      grade: string | null
      class: string | null
      studentId: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    examResults<T extends Student$examResultsArgs<ExtArgs> = {}>(args?: Subset<T, Student$examResultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */ 
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'String'>
    readonly participantId: FieldRef<"Student", 'String'>
    readonly name: FieldRef<"Student", 'String'>
    readonly email: FieldRef<"Student", 'String'>
    readonly phoneNumber: FieldRef<"Student", 'String'>
    readonly grade: FieldRef<"Student", 'String'>
    readonly class: FieldRef<"Student", 'String'>
    readonly studentId: FieldRef<"Student", 'String'>
    readonly createdAt: FieldRef<"Student", 'DateTime'>
    readonly updatedAt: FieldRef<"Student", 'DateTime'>
    readonly deletedAt: FieldRef<"Student", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
  }

  /**
   * Student.examResults
   */
  export type Student$examResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: ExamResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResultInclude<ExtArgs> | null
    where?: ExamResultWhereInput
    orderBy?: ExamResultOrderByWithRelationInput | ExamResultOrderByWithRelationInput[]
    cursor?: ExamResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExamResultScalarFieldEnum | ExamResultScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Paper
   */

  export type AggregatePaper = {
    _count: PaperCountAggregateOutputType | null
    _avg: PaperAvgAggregateOutputType | null
    _sum: PaperSumAggregateOutputType | null
    _min: PaperMinAggregateOutputType | null
    _max: PaperMaxAggregateOutputType | null
  }

  export type PaperAvgAggregateOutputType = {
    timeLimit: number | null
  }

  export type PaperSumAggregateOutputType = {
    timeLimit: number | null
  }

  export type PaperMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    category: string | null
    timeLimit: number | null
    allowRetake: boolean | null
    showResultsImmediately: boolean | null
    randomizeQuestions: boolean | null
    teacherId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type PaperMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    category: string | null
    timeLimit: number | null
    allowRetake: boolean | null
    showResultsImmediately: boolean | null
    randomizeQuestions: boolean | null
    teacherId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type PaperCountAggregateOutputType = {
    id: number
    title: number
    description: number
    category: number
    timeLimit: number
    allowRetake: number
    showResultsImmediately: number
    randomizeQuestions: number
    teacherId: number
    isActive: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type PaperAvgAggregateInputType = {
    timeLimit?: true
  }

  export type PaperSumAggregateInputType = {
    timeLimit?: true
  }

  export type PaperMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    timeLimit?: true
    allowRetake?: true
    showResultsImmediately?: true
    randomizeQuestions?: true
    teacherId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type PaperMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    timeLimit?: true
    allowRetake?: true
    showResultsImmediately?: true
    randomizeQuestions?: true
    teacherId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type PaperCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    timeLimit?: true
    allowRetake?: true
    showResultsImmediately?: true
    randomizeQuestions?: true
    teacherId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type PaperAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Paper to aggregate.
     */
    where?: PaperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Papers to fetch.
     */
    orderBy?: PaperOrderByWithRelationInput | PaperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Papers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Papers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Papers
    **/
    _count?: true | PaperCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaperAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaperSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaperMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaperMaxAggregateInputType
  }

  export type GetPaperAggregateType<T extends PaperAggregateArgs> = {
        [P in keyof T & keyof AggregatePaper]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaper[P]>
      : GetScalarType<T[P], AggregatePaper[P]>
  }




  export type PaperGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaperWhereInput
    orderBy?: PaperOrderByWithAggregationInput | PaperOrderByWithAggregationInput[]
    by: PaperScalarFieldEnum[] | PaperScalarFieldEnum
    having?: PaperScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaperCountAggregateInputType | true
    _avg?: PaperAvgAggregateInputType
    _sum?: PaperSumAggregateInputType
    _min?: PaperMinAggregateInputType
    _max?: PaperMaxAggregateInputType
  }

  export type PaperGroupByOutputType = {
    id: string
    title: string
    description: string | null
    category: string | null
    timeLimit: number | null
    allowRetake: boolean
    showResultsImmediately: boolean
    randomizeQuestions: boolean
    teacherId: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: PaperCountAggregateOutputType | null
    _avg: PaperAvgAggregateOutputType | null
    _sum: PaperSumAggregateOutputType | null
    _min: PaperMinAggregateOutputType | null
    _max: PaperMaxAggregateOutputType | null
  }

  type GetPaperGroupByPayload<T extends PaperGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaperGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaperGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaperGroupByOutputType[P]>
            : GetScalarType<T[P], PaperGroupByOutputType[P]>
        }
      >
    >


  export type PaperSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    timeLimit?: boolean
    allowRetake?: boolean
    showResultsImmediately?: boolean
    randomizeQuestions?: boolean
    teacherId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    questions?: boolean | Paper$questionsArgs<ExtArgs>
    exams?: boolean | Paper$examsArgs<ExtArgs>
    _count?: boolean | PaperCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paper"]>

  export type PaperSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    timeLimit?: boolean
    allowRetake?: boolean
    showResultsImmediately?: boolean
    randomizeQuestions?: boolean
    teacherId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paper"]>

  export type PaperSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    timeLimit?: boolean
    allowRetake?: boolean
    showResultsImmediately?: boolean
    randomizeQuestions?: boolean
    teacherId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type PaperInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    questions?: boolean | Paper$questionsArgs<ExtArgs>
    exams?: boolean | Paper$examsArgs<ExtArgs>
    _count?: boolean | PaperCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PaperIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }

  export type $PaperPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Paper"
    objects: {
      teacher: Prisma.$TeacherPayload<ExtArgs>
      questions: Prisma.$QuestionPayload<ExtArgs>[]
      exams: Prisma.$ExamPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      category: string | null
      timeLimit: number | null
      allowRetake: boolean
      showResultsImmediately: boolean
      randomizeQuestions: boolean
      teacherId: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["paper"]>
    composites: {}
  }

  type PaperGetPayload<S extends boolean | null | undefined | PaperDefaultArgs> = $Result.GetResult<Prisma.$PaperPayload, S>

  type PaperCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaperFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaperCountAggregateInputType | true
    }

  export interface PaperDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Paper'], meta: { name: 'Paper' } }
    /**
     * Find zero or one Paper that matches the filter.
     * @param {PaperFindUniqueArgs} args - Arguments to find a Paper
     * @example
     * // Get one Paper
     * const paper = await prisma.paper.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaperFindUniqueArgs>(args: SelectSubset<T, PaperFindUniqueArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Paper that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaperFindUniqueOrThrowArgs} args - Arguments to find a Paper
     * @example
     * // Get one Paper
     * const paper = await prisma.paper.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaperFindUniqueOrThrowArgs>(args: SelectSubset<T, PaperFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Paper that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperFindFirstArgs} args - Arguments to find a Paper
     * @example
     * // Get one Paper
     * const paper = await prisma.paper.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaperFindFirstArgs>(args?: SelectSubset<T, PaperFindFirstArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Paper that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperFindFirstOrThrowArgs} args - Arguments to find a Paper
     * @example
     * // Get one Paper
     * const paper = await prisma.paper.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaperFindFirstOrThrowArgs>(args?: SelectSubset<T, PaperFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Papers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Papers
     * const papers = await prisma.paper.findMany()
     * 
     * // Get first 10 Papers
     * const papers = await prisma.paper.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paperWithIdOnly = await prisma.paper.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaperFindManyArgs>(args?: SelectSubset<T, PaperFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Paper.
     * @param {PaperCreateArgs} args - Arguments to create a Paper.
     * @example
     * // Create one Paper
     * const Paper = await prisma.paper.create({
     *   data: {
     *     // ... data to create a Paper
     *   }
     * })
     * 
     */
    create<T extends PaperCreateArgs>(args: SelectSubset<T, PaperCreateArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Papers.
     * @param {PaperCreateManyArgs} args - Arguments to create many Papers.
     * @example
     * // Create many Papers
     * const paper = await prisma.paper.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaperCreateManyArgs>(args?: SelectSubset<T, PaperCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Papers and returns the data saved in the database.
     * @param {PaperCreateManyAndReturnArgs} args - Arguments to create many Papers.
     * @example
     * // Create many Papers
     * const paper = await prisma.paper.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Papers and only return the `id`
     * const paperWithIdOnly = await prisma.paper.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaperCreateManyAndReturnArgs>(args?: SelectSubset<T, PaperCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Paper.
     * @param {PaperDeleteArgs} args - Arguments to delete one Paper.
     * @example
     * // Delete one Paper
     * const Paper = await prisma.paper.delete({
     *   where: {
     *     // ... filter to delete one Paper
     *   }
     * })
     * 
     */
    delete<T extends PaperDeleteArgs>(args: SelectSubset<T, PaperDeleteArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Paper.
     * @param {PaperUpdateArgs} args - Arguments to update one Paper.
     * @example
     * // Update one Paper
     * const paper = await prisma.paper.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaperUpdateArgs>(args: SelectSubset<T, PaperUpdateArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Papers.
     * @param {PaperDeleteManyArgs} args - Arguments to filter Papers to delete.
     * @example
     * // Delete a few Papers
     * const { count } = await prisma.paper.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaperDeleteManyArgs>(args?: SelectSubset<T, PaperDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Papers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Papers
     * const paper = await prisma.paper.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaperUpdateManyArgs>(args: SelectSubset<T, PaperUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Paper.
     * @param {PaperUpsertArgs} args - Arguments to update or create a Paper.
     * @example
     * // Update or create a Paper
     * const paper = await prisma.paper.upsert({
     *   create: {
     *     // ... data to create a Paper
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Paper we want to update
     *   }
     * })
     */
    upsert<T extends PaperUpsertArgs>(args: SelectSubset<T, PaperUpsertArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Papers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperCountArgs} args - Arguments to filter Papers to count.
     * @example
     * // Count the number of Papers
     * const count = await prisma.paper.count({
     *   where: {
     *     // ... the filter for the Papers we want to count
     *   }
     * })
    **/
    count<T extends PaperCountArgs>(
      args?: Subset<T, PaperCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaperCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Paper.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaperAggregateArgs>(args: Subset<T, PaperAggregateArgs>): Prisma.PrismaPromise<GetPaperAggregateType<T>>

    /**
     * Group by Paper.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaperGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaperGroupByArgs['orderBy'] }
        : { orderBy?: PaperGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaperGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaperGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Paper model
   */
  readonly fields: PaperFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Paper.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaperClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends TeacherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeacherDefaultArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    questions<T extends Paper$questionsArgs<ExtArgs> = {}>(args?: Subset<T, Paper$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany"> | Null>
    exams<T extends Paper$examsArgs<ExtArgs> = {}>(args?: Subset<T, Paper$examsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Paper model
   */ 
  interface PaperFieldRefs {
    readonly id: FieldRef<"Paper", 'String'>
    readonly title: FieldRef<"Paper", 'String'>
    readonly description: FieldRef<"Paper", 'String'>
    readonly category: FieldRef<"Paper", 'String'>
    readonly timeLimit: FieldRef<"Paper", 'Int'>
    readonly allowRetake: FieldRef<"Paper", 'Boolean'>
    readonly showResultsImmediately: FieldRef<"Paper", 'Boolean'>
    readonly randomizeQuestions: FieldRef<"Paper", 'Boolean'>
    readonly teacherId: FieldRef<"Paper", 'String'>
    readonly isActive: FieldRef<"Paper", 'Boolean'>
    readonly createdAt: FieldRef<"Paper", 'DateTime'>
    readonly updatedAt: FieldRef<"Paper", 'DateTime'>
    readonly deletedAt: FieldRef<"Paper", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Paper findUnique
   */
  export type PaperFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * Filter, which Paper to fetch.
     */
    where: PaperWhereUniqueInput
  }

  /**
   * Paper findUniqueOrThrow
   */
  export type PaperFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * Filter, which Paper to fetch.
     */
    where: PaperWhereUniqueInput
  }

  /**
   * Paper findFirst
   */
  export type PaperFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * Filter, which Paper to fetch.
     */
    where?: PaperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Papers to fetch.
     */
    orderBy?: PaperOrderByWithRelationInput | PaperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Papers.
     */
    cursor?: PaperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Papers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Papers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Papers.
     */
    distinct?: PaperScalarFieldEnum | PaperScalarFieldEnum[]
  }

  /**
   * Paper findFirstOrThrow
   */
  export type PaperFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * Filter, which Paper to fetch.
     */
    where?: PaperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Papers to fetch.
     */
    orderBy?: PaperOrderByWithRelationInput | PaperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Papers.
     */
    cursor?: PaperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Papers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Papers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Papers.
     */
    distinct?: PaperScalarFieldEnum | PaperScalarFieldEnum[]
  }

  /**
   * Paper findMany
   */
  export type PaperFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * Filter, which Papers to fetch.
     */
    where?: PaperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Papers to fetch.
     */
    orderBy?: PaperOrderByWithRelationInput | PaperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Papers.
     */
    cursor?: PaperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Papers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Papers.
     */
    skip?: number
    distinct?: PaperScalarFieldEnum | PaperScalarFieldEnum[]
  }

  /**
   * Paper create
   */
  export type PaperCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * The data needed to create a Paper.
     */
    data: XOR<PaperCreateInput, PaperUncheckedCreateInput>
  }

  /**
   * Paper createMany
   */
  export type PaperCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Papers.
     */
    data: PaperCreateManyInput | PaperCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Paper createManyAndReturn
   */
  export type PaperCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Papers.
     */
    data: PaperCreateManyInput | PaperCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Paper update
   */
  export type PaperUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * The data needed to update a Paper.
     */
    data: XOR<PaperUpdateInput, PaperUncheckedUpdateInput>
    /**
     * Choose, which Paper to update.
     */
    where: PaperWhereUniqueInput
  }

  /**
   * Paper updateMany
   */
  export type PaperUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Papers.
     */
    data: XOR<PaperUpdateManyMutationInput, PaperUncheckedUpdateManyInput>
    /**
     * Filter which Papers to update
     */
    where?: PaperWhereInput
  }

  /**
   * Paper upsert
   */
  export type PaperUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * The filter to search for the Paper to update in case it exists.
     */
    where: PaperWhereUniqueInput
    /**
     * In case the Paper found by the `where` argument doesn't exist, create a new Paper with this data.
     */
    create: XOR<PaperCreateInput, PaperUncheckedCreateInput>
    /**
     * In case the Paper was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaperUpdateInput, PaperUncheckedUpdateInput>
  }

  /**
   * Paper delete
   */
  export type PaperDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
    /**
     * Filter which Paper to delete.
     */
    where: PaperWhereUniqueInput
  }

  /**
   * Paper deleteMany
   */
  export type PaperDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Papers to delete
     */
    where?: PaperWhereInput
  }

  /**
   * Paper.questions
   */
  export type Paper$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    cursor?: QuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Paper.exams
   */
  export type Paper$examsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    where?: ExamWhereInput
    orderBy?: ExamOrderByWithRelationInput | ExamOrderByWithRelationInput[]
    cursor?: ExamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExamScalarFieldEnum | ExamScalarFieldEnum[]
  }

  /**
   * Paper without action
   */
  export type PaperDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paper
     */
    select?: PaperSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaperInclude<ExtArgs> | null
  }


  /**
   * Model Question
   */

  export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  export type QuestionAvgAggregateOutputType = {
    order: number | null
    points: number | null
  }

  export type QuestionSumAggregateOutputType = {
    order: number | null
    points: number | null
  }

  export type QuestionMinAggregateOutputType = {
    id: string | null
    paperId: string | null
    title: string | null
    type: $Enums.QuestionType | null
    description: string | null
    dimension: string | null
    explanation: string | null
    order: number | null
    required: boolean | null
    points: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type QuestionMaxAggregateOutputType = {
    id: string | null
    paperId: string | null
    title: string | null
    type: $Enums.QuestionType | null
    description: string | null
    dimension: string | null
    explanation: string | null
    order: number | null
    required: boolean | null
    points: number | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type QuestionCountAggregateOutputType = {
    id: number
    paperId: number
    title: number
    type: number
    description: number
    dimension: number
    explanation: number
    order: number
    required: number
    points: number
    displayCondition: number
    options: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type QuestionAvgAggregateInputType = {
    order?: true
    points?: true
  }

  export type QuestionSumAggregateInputType = {
    order?: true
    points?: true
  }

  export type QuestionMinAggregateInputType = {
    id?: true
    paperId?: true
    title?: true
    type?: true
    description?: true
    dimension?: true
    explanation?: true
    order?: true
    required?: true
    points?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type QuestionMaxAggregateInputType = {
    id?: true
    paperId?: true
    title?: true
    type?: true
    description?: true
    dimension?: true
    explanation?: true
    order?: true
    required?: true
    points?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type QuestionCountAggregateInputType = {
    id?: true
    paperId?: true
    title?: true
    type?: true
    description?: true
    dimension?: true
    explanation?: true
    order?: true
    required?: true
    points?: true
    displayCondition?: true
    options?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type QuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Question to aggregate.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Questions
    **/
    _count?: true | QuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionMaxAggregateInputType
  }

  export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion[P]>
      : GetScalarType<T[P], AggregateQuestion[P]>
  }




  export type QuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithAggregationInput | QuestionOrderByWithAggregationInput[]
    by: QuestionScalarFieldEnum[] | QuestionScalarFieldEnum
    having?: QuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionCountAggregateInputType | true
    _avg?: QuestionAvgAggregateInputType
    _sum?: QuestionSumAggregateInputType
    _min?: QuestionMinAggregateInputType
    _max?: QuestionMaxAggregateInputType
  }

  export type QuestionGroupByOutputType = {
    id: string
    paperId: string
    title: string
    type: $Enums.QuestionType
    description: string | null
    dimension: string | null
    explanation: string | null
    order: number
    required: boolean
    points: number
    displayCondition: JsonValue | null
    options: JsonValue | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paperId?: boolean
    title?: boolean
    type?: boolean
    description?: boolean
    dimension?: boolean
    explanation?: boolean
    order?: boolean
    required?: boolean
    points?: boolean
    displayCondition?: boolean
    options?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    paper?: boolean | PaperDefaultArgs<ExtArgs>
    answers?: boolean | Question$answersArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paperId?: boolean
    title?: boolean
    type?: boolean
    description?: boolean
    dimension?: boolean
    explanation?: boolean
    order?: boolean
    required?: boolean
    points?: boolean
    displayCondition?: boolean
    options?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    paper?: boolean | PaperDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectScalar = {
    id?: boolean
    paperId?: boolean
    title?: boolean
    type?: boolean
    description?: boolean
    dimension?: boolean
    explanation?: boolean
    order?: boolean
    required?: boolean
    points?: boolean
    displayCondition?: boolean
    options?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type QuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paper?: boolean | PaperDefaultArgs<ExtArgs>
    answers?: boolean | Question$answersArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paper?: boolean | PaperDefaultArgs<ExtArgs>
  }

  export type $QuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Question"
    objects: {
      paper: Prisma.$PaperPayload<ExtArgs>
      answers: Prisma.$AnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      paperId: string
      title: string
      type: $Enums.QuestionType
      description: string | null
      dimension: string | null
      explanation: string | null
      order: number
      required: boolean
      points: number
      displayCondition: Prisma.JsonValue | null
      options: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["question"]>
    composites: {}
  }

  type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = $Result.GetResult<Prisma.$QuestionPayload, S>

  type QuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QuestionCountAggregateInputType | true
    }

  export interface QuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Question'], meta: { name: 'Question' } }
    /**
     * Find zero or one Question that matches the filter.
     * @param {QuestionFindUniqueArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionFindUniqueArgs>(args: SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Question that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QuestionFindUniqueOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Question that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionFindFirstArgs>(args?: SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Question that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Questions
     * const questions = await prisma.question.findMany()
     * 
     * // Get first 10 Questions
     * const questions = await prisma.question.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionWithIdOnly = await prisma.question.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionFindManyArgs>(args?: SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Question.
     * @param {QuestionCreateArgs} args - Arguments to create a Question.
     * @example
     * // Create one Question
     * const Question = await prisma.question.create({
     *   data: {
     *     // ... data to create a Question
     *   }
     * })
     * 
     */
    create<T extends QuestionCreateArgs>(args: SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Questions.
     * @param {QuestionCreateManyArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionCreateManyArgs>(args?: SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Questions and returns the data saved in the database.
     * @param {QuestionCreateManyAndReturnArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Question.
     * @param {QuestionDeleteArgs} args - Arguments to delete one Question.
     * @example
     * // Delete one Question
     * const Question = await prisma.question.delete({
     *   where: {
     *     // ... filter to delete one Question
     *   }
     * })
     * 
     */
    delete<T extends QuestionDeleteArgs>(args: SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Question.
     * @param {QuestionUpdateArgs} args - Arguments to update one Question.
     * @example
     * // Update one Question
     * const question = await prisma.question.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionUpdateArgs>(args: SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Questions.
     * @param {QuestionDeleteManyArgs} args - Arguments to filter Questions to delete.
     * @example
     * // Delete a few Questions
     * const { count } = await prisma.question.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionDeleteManyArgs>(args?: SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionUpdateManyArgs>(args: SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Question.
     * @param {QuestionUpsertArgs} args - Arguments to update or create a Question.
     * @example
     * // Update or create a Question
     * const question = await prisma.question.upsert({
     *   create: {
     *     // ... data to create a Question
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question we want to update
     *   }
     * })
     */
    upsert<T extends QuestionUpsertArgs>(args: SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionCountArgs} args - Arguments to filter Questions to count.
     * @example
     * // Count the number of Questions
     * const count = await prisma.question.count({
     *   where: {
     *     // ... the filter for the Questions we want to count
     *   }
     * })
    **/
    count<T extends QuestionCountArgs>(
      args?: Subset<T, QuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionAggregateArgs>(args: Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>

    /**
     * Group by Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Question model
   */
  readonly fields: QuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Question.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    paper<T extends PaperDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PaperDefaultArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    answers<T extends Question$answersArgs<ExtArgs> = {}>(args?: Subset<T, Question$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Question model
   */ 
  interface QuestionFieldRefs {
    readonly id: FieldRef<"Question", 'String'>
    readonly paperId: FieldRef<"Question", 'String'>
    readonly title: FieldRef<"Question", 'String'>
    readonly type: FieldRef<"Question", 'QuestionType'>
    readonly description: FieldRef<"Question", 'String'>
    readonly dimension: FieldRef<"Question", 'String'>
    readonly explanation: FieldRef<"Question", 'String'>
    readonly order: FieldRef<"Question", 'Int'>
    readonly required: FieldRef<"Question", 'Boolean'>
    readonly points: FieldRef<"Question", 'Int'>
    readonly displayCondition: FieldRef<"Question", 'Json'>
    readonly options: FieldRef<"Question", 'Json'>
    readonly createdAt: FieldRef<"Question", 'DateTime'>
    readonly updatedAt: FieldRef<"Question", 'DateTime'>
    readonly deletedAt: FieldRef<"Question", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Question findUnique
   */
  export type QuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findUniqueOrThrow
   */
  export type QuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findFirst
   */
  export type QuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findFirstOrThrow
   */
  export type QuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findMany
   */
  export type QuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Questions to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question create
   */
  export type QuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a Question.
     */
    data: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
  }

  /**
   * Question createMany
   */
  export type QuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question createManyAndReturn
   */
  export type QuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question update
   */
  export type QuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a Question.
     */
    data: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
    /**
     * Choose, which Question to update.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question updateMany
   */
  export type QuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
  }

  /**
   * Question upsert
   */
  export type QuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the Question to update in case it exists.
     */
    where: QuestionWhereUniqueInput
    /**
     * In case the Question found by the `where` argument doesn't exist, create a new Question with this data.
     */
    create: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
    /**
     * In case the Question was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
  }

  /**
   * Question delete
   */
  export type QuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter which Question to delete.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question deleteMany
   */
  export type QuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Questions to delete
     */
    where?: QuestionWhereInput
  }

  /**
   * Question.answers
   */
  export type Question$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    where?: AnswerWhereInput
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    cursor?: AnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
  }

  /**
   * Question without action
   */
  export type QuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
  }


  /**
   * Model Exam
   */

  export type AggregateExam = {
    _count: ExamCountAggregateOutputType | null
    _avg: ExamAvgAggregateOutputType | null
    _sum: ExamSumAggregateOutputType | null
    _min: ExamMinAggregateOutputType | null
    _max: ExamMaxAggregateOutputType | null
  }

  export type ExamAvgAggregateOutputType = {
    timeLimit: number | null
    maxAttempts: number | null
  }

  export type ExamSumAggregateOutputType = {
    timeLimit: number | null
    maxAttempts: number | null
  }

  export type ExamMinAggregateOutputType = {
    id: string | null
    paperId: string | null
    title: string | null
    description: string | null
    startTime: Date | null
    endTime: Date | null
    timeLimit: number | null
    accessCode: string | null
    maxAttempts: number | null
    requireCamera: boolean | null
    requireMicrophone: boolean | null
    enableAIAnalysis: boolean | null
    status: $Enums.ExamStatus | null
    snapshotCreatedAt: Date | null
    teacherId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    scheduledDeletionAt: Date | null
  }

  export type ExamMaxAggregateOutputType = {
    id: string | null
    paperId: string | null
    title: string | null
    description: string | null
    startTime: Date | null
    endTime: Date | null
    timeLimit: number | null
    accessCode: string | null
    maxAttempts: number | null
    requireCamera: boolean | null
    requireMicrophone: boolean | null
    enableAIAnalysis: boolean | null
    status: $Enums.ExamStatus | null
    snapshotCreatedAt: Date | null
    teacherId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    scheduledDeletionAt: Date | null
  }

  export type ExamCountAggregateOutputType = {
    id: number
    paperId: number
    title: number
    description: number
    startTime: number
    endTime: number
    timeLimit: number
    accessCode: number
    allowedStudents: number
    maxAttempts: number
    requireCamera: number
    requireMicrophone: number
    enableAIAnalysis: number
    status: number
    paperSnapshot: number
    questionsSnapshot: number
    snapshotCreatedAt: number
    teacherId: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    scheduledDeletionAt: number
    _all: number
  }


  export type ExamAvgAggregateInputType = {
    timeLimit?: true
    maxAttempts?: true
  }

  export type ExamSumAggregateInputType = {
    timeLimit?: true
    maxAttempts?: true
  }

  export type ExamMinAggregateInputType = {
    id?: true
    paperId?: true
    title?: true
    description?: true
    startTime?: true
    endTime?: true
    timeLimit?: true
    accessCode?: true
    maxAttempts?: true
    requireCamera?: true
    requireMicrophone?: true
    enableAIAnalysis?: true
    status?: true
    snapshotCreatedAt?: true
    teacherId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    scheduledDeletionAt?: true
  }

  export type ExamMaxAggregateInputType = {
    id?: true
    paperId?: true
    title?: true
    description?: true
    startTime?: true
    endTime?: true
    timeLimit?: true
    accessCode?: true
    maxAttempts?: true
    requireCamera?: true
    requireMicrophone?: true
    enableAIAnalysis?: true
    status?: true
    snapshotCreatedAt?: true
    teacherId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    scheduledDeletionAt?: true
  }

  export type ExamCountAggregateInputType = {
    id?: true
    paperId?: true
    title?: true
    description?: true
    startTime?: true
    endTime?: true
    timeLimit?: true
    accessCode?: true
    allowedStudents?: true
    maxAttempts?: true
    requireCamera?: true
    requireMicrophone?: true
    enableAIAnalysis?: true
    status?: true
    paperSnapshot?: true
    questionsSnapshot?: true
    snapshotCreatedAt?: true
    teacherId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    scheduledDeletionAt?: true
    _all?: true
  }

  export type ExamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exam to aggregate.
     */
    where?: ExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exams to fetch.
     */
    orderBy?: ExamOrderByWithRelationInput | ExamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exams
    **/
    _count?: true | ExamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExamMaxAggregateInputType
  }

  export type GetExamAggregateType<T extends ExamAggregateArgs> = {
        [P in keyof T & keyof AggregateExam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExam[P]>
      : GetScalarType<T[P], AggregateExam[P]>
  }




  export type ExamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamWhereInput
    orderBy?: ExamOrderByWithAggregationInput | ExamOrderByWithAggregationInput[]
    by: ExamScalarFieldEnum[] | ExamScalarFieldEnum
    having?: ExamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExamCountAggregateInputType | true
    _avg?: ExamAvgAggregateInputType
    _sum?: ExamSumAggregateInputType
    _min?: ExamMinAggregateInputType
    _max?: ExamMaxAggregateInputType
  }

  export type ExamGroupByOutputType = {
    id: string
    paperId: string
    title: string
    description: string | null
    startTime: Date
    endTime: Date
    timeLimit: number | null
    accessCode: string | null
    allowedStudents: JsonValue | null
    maxAttempts: number
    requireCamera: boolean
    requireMicrophone: boolean
    enableAIAnalysis: boolean
    status: $Enums.ExamStatus
    paperSnapshot: JsonValue | null
    questionsSnapshot: JsonValue | null
    snapshotCreatedAt: Date | null
    teacherId: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    scheduledDeletionAt: Date | null
    _count: ExamCountAggregateOutputType | null
    _avg: ExamAvgAggregateOutputType | null
    _sum: ExamSumAggregateOutputType | null
    _min: ExamMinAggregateOutputType | null
    _max: ExamMaxAggregateOutputType | null
  }

  type GetExamGroupByPayload<T extends ExamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExamGroupByOutputType[P]>
            : GetScalarType<T[P], ExamGroupByOutputType[P]>
        }
      >
    >


  export type ExamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paperId?: boolean
    title?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    timeLimit?: boolean
    accessCode?: boolean
    allowedStudents?: boolean
    maxAttempts?: boolean
    requireCamera?: boolean
    requireMicrophone?: boolean
    enableAIAnalysis?: boolean
    status?: boolean
    paperSnapshot?: boolean
    questionsSnapshot?: boolean
    snapshotCreatedAt?: boolean
    teacherId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    scheduledDeletionAt?: boolean
    paper?: boolean | PaperDefaultArgs<ExtArgs>
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    examResults?: boolean | Exam$examResultsArgs<ExtArgs>
    _count?: boolean | ExamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exam"]>

  export type ExamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paperId?: boolean
    title?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    timeLimit?: boolean
    accessCode?: boolean
    allowedStudents?: boolean
    maxAttempts?: boolean
    requireCamera?: boolean
    requireMicrophone?: boolean
    enableAIAnalysis?: boolean
    status?: boolean
    paperSnapshot?: boolean
    questionsSnapshot?: boolean
    snapshotCreatedAt?: boolean
    teacherId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    scheduledDeletionAt?: boolean
    paper?: boolean | PaperDefaultArgs<ExtArgs>
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exam"]>

  export type ExamSelectScalar = {
    id?: boolean
    paperId?: boolean
    title?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    timeLimit?: boolean
    accessCode?: boolean
    allowedStudents?: boolean
    maxAttempts?: boolean
    requireCamera?: boolean
    requireMicrophone?: boolean
    enableAIAnalysis?: boolean
    status?: boolean
    paperSnapshot?: boolean
    questionsSnapshot?: boolean
    snapshotCreatedAt?: boolean
    teacherId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    scheduledDeletionAt?: boolean
  }

  export type ExamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paper?: boolean | PaperDefaultArgs<ExtArgs>
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    examResults?: boolean | Exam$examResultsArgs<ExtArgs>
    _count?: boolean | ExamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paper?: boolean | PaperDefaultArgs<ExtArgs>
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }

  export type $ExamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Exam"
    objects: {
      paper: Prisma.$PaperPayload<ExtArgs>
      teacher: Prisma.$TeacherPayload<ExtArgs>
      examResults: Prisma.$ExamResultPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      paperId: string
      title: string
      description: string | null
      startTime: Date
      endTime: Date
      timeLimit: number | null
      accessCode: string | null
      allowedStudents: Prisma.JsonValue | null
      maxAttempts: number
      requireCamera: boolean
      requireMicrophone: boolean
      enableAIAnalysis: boolean
      status: $Enums.ExamStatus
      paperSnapshot: Prisma.JsonValue | null
      questionsSnapshot: Prisma.JsonValue | null
      snapshotCreatedAt: Date | null
      teacherId: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
      scheduledDeletionAt: Date | null
    }, ExtArgs["result"]["exam"]>
    composites: {}
  }

  type ExamGetPayload<S extends boolean | null | undefined | ExamDefaultArgs> = $Result.GetResult<Prisma.$ExamPayload, S>

  type ExamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExamFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExamCountAggregateInputType | true
    }

  export interface ExamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Exam'], meta: { name: 'Exam' } }
    /**
     * Find zero or one Exam that matches the filter.
     * @param {ExamFindUniqueArgs} args - Arguments to find a Exam
     * @example
     * // Get one Exam
     * const exam = await prisma.exam.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExamFindUniqueArgs>(args: SelectSubset<T, ExamFindUniqueArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Exam that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExamFindUniqueOrThrowArgs} args - Arguments to find a Exam
     * @example
     * // Get one Exam
     * const exam = await prisma.exam.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExamFindUniqueOrThrowArgs>(args: SelectSubset<T, ExamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Exam that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamFindFirstArgs} args - Arguments to find a Exam
     * @example
     * // Get one Exam
     * const exam = await prisma.exam.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExamFindFirstArgs>(args?: SelectSubset<T, ExamFindFirstArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Exam that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamFindFirstOrThrowArgs} args - Arguments to find a Exam
     * @example
     * // Get one Exam
     * const exam = await prisma.exam.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExamFindFirstOrThrowArgs>(args?: SelectSubset<T, ExamFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Exams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exams
     * const exams = await prisma.exam.findMany()
     * 
     * // Get first 10 Exams
     * const exams = await prisma.exam.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const examWithIdOnly = await prisma.exam.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExamFindManyArgs>(args?: SelectSubset<T, ExamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Exam.
     * @param {ExamCreateArgs} args - Arguments to create a Exam.
     * @example
     * // Create one Exam
     * const Exam = await prisma.exam.create({
     *   data: {
     *     // ... data to create a Exam
     *   }
     * })
     * 
     */
    create<T extends ExamCreateArgs>(args: SelectSubset<T, ExamCreateArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Exams.
     * @param {ExamCreateManyArgs} args - Arguments to create many Exams.
     * @example
     * // Create many Exams
     * const exam = await prisma.exam.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExamCreateManyArgs>(args?: SelectSubset<T, ExamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Exams and returns the data saved in the database.
     * @param {ExamCreateManyAndReturnArgs} args - Arguments to create many Exams.
     * @example
     * // Create many Exams
     * const exam = await prisma.exam.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Exams and only return the `id`
     * const examWithIdOnly = await prisma.exam.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExamCreateManyAndReturnArgs>(args?: SelectSubset<T, ExamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Exam.
     * @param {ExamDeleteArgs} args - Arguments to delete one Exam.
     * @example
     * // Delete one Exam
     * const Exam = await prisma.exam.delete({
     *   where: {
     *     // ... filter to delete one Exam
     *   }
     * })
     * 
     */
    delete<T extends ExamDeleteArgs>(args: SelectSubset<T, ExamDeleteArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Exam.
     * @param {ExamUpdateArgs} args - Arguments to update one Exam.
     * @example
     * // Update one Exam
     * const exam = await prisma.exam.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExamUpdateArgs>(args: SelectSubset<T, ExamUpdateArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Exams.
     * @param {ExamDeleteManyArgs} args - Arguments to filter Exams to delete.
     * @example
     * // Delete a few Exams
     * const { count } = await prisma.exam.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExamDeleteManyArgs>(args?: SelectSubset<T, ExamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exams
     * const exam = await prisma.exam.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExamUpdateManyArgs>(args: SelectSubset<T, ExamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Exam.
     * @param {ExamUpsertArgs} args - Arguments to update or create a Exam.
     * @example
     * // Update or create a Exam
     * const exam = await prisma.exam.upsert({
     *   create: {
     *     // ... data to create a Exam
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exam we want to update
     *   }
     * })
     */
    upsert<T extends ExamUpsertArgs>(args: SelectSubset<T, ExamUpsertArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Exams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamCountArgs} args - Arguments to filter Exams to count.
     * @example
     * // Count the number of Exams
     * const count = await prisma.exam.count({
     *   where: {
     *     // ... the filter for the Exams we want to count
     *   }
     * })
    **/
    count<T extends ExamCountArgs>(
      args?: Subset<T, ExamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExamAggregateArgs>(args: Subset<T, ExamAggregateArgs>): Prisma.PrismaPromise<GetExamAggregateType<T>>

    /**
     * Group by Exam.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExamGroupByArgs['orderBy'] }
        : { orderBy?: ExamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Exam model
   */
  readonly fields: ExamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exam.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    paper<T extends PaperDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PaperDefaultArgs<ExtArgs>>): Prisma__PaperClient<$Result.GetResult<Prisma.$PaperPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    teacher<T extends TeacherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeacherDefaultArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    examResults<T extends Exam$examResultsArgs<ExtArgs> = {}>(args?: Subset<T, Exam$examResultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Exam model
   */ 
  interface ExamFieldRefs {
    readonly id: FieldRef<"Exam", 'String'>
    readonly paperId: FieldRef<"Exam", 'String'>
    readonly title: FieldRef<"Exam", 'String'>
    readonly description: FieldRef<"Exam", 'String'>
    readonly startTime: FieldRef<"Exam", 'DateTime'>
    readonly endTime: FieldRef<"Exam", 'DateTime'>
    readonly timeLimit: FieldRef<"Exam", 'Int'>
    readonly accessCode: FieldRef<"Exam", 'String'>
    readonly allowedStudents: FieldRef<"Exam", 'Json'>
    readonly maxAttempts: FieldRef<"Exam", 'Int'>
    readonly requireCamera: FieldRef<"Exam", 'Boolean'>
    readonly requireMicrophone: FieldRef<"Exam", 'Boolean'>
    readonly enableAIAnalysis: FieldRef<"Exam", 'Boolean'>
    readonly status: FieldRef<"Exam", 'ExamStatus'>
    readonly paperSnapshot: FieldRef<"Exam", 'Json'>
    readonly questionsSnapshot: FieldRef<"Exam", 'Json'>
    readonly snapshotCreatedAt: FieldRef<"Exam", 'DateTime'>
    readonly teacherId: FieldRef<"Exam", 'String'>
    readonly createdAt: FieldRef<"Exam", 'DateTime'>
    readonly updatedAt: FieldRef<"Exam", 'DateTime'>
    readonly deletedAt: FieldRef<"Exam", 'DateTime'>
    readonly scheduledDeletionAt: FieldRef<"Exam", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Exam findUnique
   */
  export type ExamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * Filter, which Exam to fetch.
     */
    where: ExamWhereUniqueInput
  }

  /**
   * Exam findUniqueOrThrow
   */
  export type ExamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * Filter, which Exam to fetch.
     */
    where: ExamWhereUniqueInput
  }

  /**
   * Exam findFirst
   */
  export type ExamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * Filter, which Exam to fetch.
     */
    where?: ExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exams to fetch.
     */
    orderBy?: ExamOrderByWithRelationInput | ExamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exams.
     */
    cursor?: ExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exams.
     */
    distinct?: ExamScalarFieldEnum | ExamScalarFieldEnum[]
  }

  /**
   * Exam findFirstOrThrow
   */
  export type ExamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * Filter, which Exam to fetch.
     */
    where?: ExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exams to fetch.
     */
    orderBy?: ExamOrderByWithRelationInput | ExamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exams.
     */
    cursor?: ExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exams.
     */
    distinct?: ExamScalarFieldEnum | ExamScalarFieldEnum[]
  }

  /**
   * Exam findMany
   */
  export type ExamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * Filter, which Exams to fetch.
     */
    where?: ExamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exams to fetch.
     */
    orderBy?: ExamOrderByWithRelationInput | ExamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exams.
     */
    cursor?: ExamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exams.
     */
    skip?: number
    distinct?: ExamScalarFieldEnum | ExamScalarFieldEnum[]
  }

  /**
   * Exam create
   */
  export type ExamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * The data needed to create a Exam.
     */
    data: XOR<ExamCreateInput, ExamUncheckedCreateInput>
  }

  /**
   * Exam createMany
   */
  export type ExamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exams.
     */
    data: ExamCreateManyInput | ExamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Exam createManyAndReturn
   */
  export type ExamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Exams.
     */
    data: ExamCreateManyInput | ExamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exam update
   */
  export type ExamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * The data needed to update a Exam.
     */
    data: XOR<ExamUpdateInput, ExamUncheckedUpdateInput>
    /**
     * Choose, which Exam to update.
     */
    where: ExamWhereUniqueInput
  }

  /**
   * Exam updateMany
   */
  export type ExamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exams.
     */
    data: XOR<ExamUpdateManyMutationInput, ExamUncheckedUpdateManyInput>
    /**
     * Filter which Exams to update
     */
    where?: ExamWhereInput
  }

  /**
   * Exam upsert
   */
  export type ExamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * The filter to search for the Exam to update in case it exists.
     */
    where: ExamWhereUniqueInput
    /**
     * In case the Exam found by the `where` argument doesn't exist, create a new Exam with this data.
     */
    create: XOR<ExamCreateInput, ExamUncheckedCreateInput>
    /**
     * In case the Exam was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExamUpdateInput, ExamUncheckedUpdateInput>
  }

  /**
   * Exam delete
   */
  export type ExamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
    /**
     * Filter which Exam to delete.
     */
    where: ExamWhereUniqueInput
  }

  /**
   * Exam deleteMany
   */
  export type ExamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exams to delete
     */
    where?: ExamWhereInput
  }

  /**
   * Exam.examResults
   */
  export type Exam$examResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: ExamResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResultInclude<ExtArgs> | null
    where?: ExamResultWhereInput
    orderBy?: ExamResultOrderByWithRelationInput | ExamResultOrderByWithRelationInput[]
    cursor?: ExamResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExamResultScalarFieldEnum | ExamResultScalarFieldEnum[]
  }

  /**
   * Exam without action
   */
  export type ExamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exam
     */
    select?: ExamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamInclude<ExtArgs> | null
  }


  /**
   * Model ExamResult
   */

  export type AggregateExamResult = {
    _count: ExamResultCountAggregateOutputType | null
    _avg: ExamResultAvgAggregateOutputType | null
    _sum: ExamResultSumAggregateOutputType | null
    _min: ExamResultMinAggregateOutputType | null
    _max: ExamResultMaxAggregateOutputType | null
  }

  export type ExamResultAvgAggregateOutputType = {
    timeSpent: number | null
    totalScore: number | null
    maxScore: number | null
    percentage: number | null
  }

  export type ExamResultSumAggregateOutputType = {
    timeSpent: number | null
    totalScore: number | null
    maxScore: number | null
    percentage: number | null
  }

  export type ExamResultMinAggregateOutputType = {
    id: string | null
    examId: string | null
    studentId: string | null
    participantId: string | null
    participantName: string | null
    startedAt: Date | null
    submittedAt: Date | null
    timeSpent: number | null
    ipAddress: string | null
    userAgent: string | null
    totalScore: number | null
    maxScore: number | null
    percentage: number | null
    isCompleted: boolean | null
    isValid: boolean | null
    aiSessionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ExamResultMaxAggregateOutputType = {
    id: string | null
    examId: string | null
    studentId: string | null
    participantId: string | null
    participantName: string | null
    startedAt: Date | null
    submittedAt: Date | null
    timeSpent: number | null
    ipAddress: string | null
    userAgent: string | null
    totalScore: number | null
    maxScore: number | null
    percentage: number | null
    isCompleted: boolean | null
    isValid: boolean | null
    aiSessionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ExamResultCountAggregateOutputType = {
    id: number
    examId: number
    studentId: number
    participantId: number
    participantName: number
    startedAt: number
    submittedAt: number
    timeSpent: number
    ipAddress: number
    userAgent: number
    totalScore: number
    maxScore: number
    percentage: number
    isCompleted: number
    isValid: number
    aiSessionId: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type ExamResultAvgAggregateInputType = {
    timeSpent?: true
    totalScore?: true
    maxScore?: true
    percentage?: true
  }

  export type ExamResultSumAggregateInputType = {
    timeSpent?: true
    totalScore?: true
    maxScore?: true
    percentage?: true
  }

  export type ExamResultMinAggregateInputType = {
    id?: true
    examId?: true
    studentId?: true
    participantId?: true
    participantName?: true
    startedAt?: true
    submittedAt?: true
    timeSpent?: true
    ipAddress?: true
    userAgent?: true
    totalScore?: true
    maxScore?: true
    percentage?: true
    isCompleted?: true
    isValid?: true
    aiSessionId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ExamResultMaxAggregateInputType = {
    id?: true
    examId?: true
    studentId?: true
    participantId?: true
    participantName?: true
    startedAt?: true
    submittedAt?: true
    timeSpent?: true
    ipAddress?: true
    userAgent?: true
    totalScore?: true
    maxScore?: true
    percentage?: true
    isCompleted?: true
    isValid?: true
    aiSessionId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ExamResultCountAggregateInputType = {
    id?: true
    examId?: true
    studentId?: true
    participantId?: true
    participantName?: true
    startedAt?: true
    submittedAt?: true
    timeSpent?: true
    ipAddress?: true
    userAgent?: true
    totalScore?: true
    maxScore?: true
    percentage?: true
    isCompleted?: true
    isValid?: true
    aiSessionId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type ExamResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExamResult to aggregate.
     */
    where?: ExamResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamResults to fetch.
     */
    orderBy?: ExamResultOrderByWithRelationInput | ExamResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExamResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExamResults
    **/
    _count?: true | ExamResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExamResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExamResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExamResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExamResultMaxAggregateInputType
  }

  export type GetExamResultAggregateType<T extends ExamResultAggregateArgs> = {
        [P in keyof T & keyof AggregateExamResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExamResult[P]>
      : GetScalarType<T[P], AggregateExamResult[P]>
  }




  export type ExamResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamResultWhereInput
    orderBy?: ExamResultOrderByWithAggregationInput | ExamResultOrderByWithAggregationInput[]
    by: ExamResultScalarFieldEnum[] | ExamResultScalarFieldEnum
    having?: ExamResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExamResultCountAggregateInputType | true
    _avg?: ExamResultAvgAggregateInputType
    _sum?: ExamResultSumAggregateInputType
    _min?: ExamResultMinAggregateInputType
    _max?: ExamResultMaxAggregateInputType
  }

  export type ExamResultGroupByOutputType = {
    id: string
    examId: string
    studentId: string | null
    participantId: string
    participantName: string
    startedAt: Date
    submittedAt: Date | null
    timeSpent: number | null
    ipAddress: string | null
    userAgent: string | null
    totalScore: number
    maxScore: number
    percentage: number
    isCompleted: boolean
    isValid: boolean
    aiSessionId: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: ExamResultCountAggregateOutputType | null
    _avg: ExamResultAvgAggregateOutputType | null
    _sum: ExamResultSumAggregateOutputType | null
    _min: ExamResultMinAggregateOutputType | null
    _max: ExamResultMaxAggregateOutputType | null
  }

  type GetExamResultGroupByPayload<T extends ExamResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExamResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExamResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExamResultGroupByOutputType[P]>
            : GetScalarType<T[P], ExamResultGroupByOutputType[P]>
        }
      >
    >


  export type ExamResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    examId?: boolean
    studentId?: boolean
    participantId?: boolean
    participantName?: boolean
    startedAt?: boolean
    submittedAt?: boolean
    timeSpent?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    totalScore?: boolean
    maxScore?: boolean
    percentage?: boolean
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    exam?: boolean | ExamDefaultArgs<ExtArgs>
    student?: boolean | ExamResult$studentArgs<ExtArgs>
    answers?: boolean | ExamResult$answersArgs<ExtArgs>
    aiAnalysisData?: boolean | ExamResult$aiAnalysisDataArgs<ExtArgs>
    aiSession?: boolean | ExamResult$aiSessionArgs<ExtArgs>
    _count?: boolean | ExamResultCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["examResult"]>

  export type ExamResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    examId?: boolean
    studentId?: boolean
    participantId?: boolean
    participantName?: boolean
    startedAt?: boolean
    submittedAt?: boolean
    timeSpent?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    totalScore?: boolean
    maxScore?: boolean
    percentage?: boolean
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    exam?: boolean | ExamDefaultArgs<ExtArgs>
    student?: boolean | ExamResult$studentArgs<ExtArgs>
  }, ExtArgs["result"]["examResult"]>

  export type ExamResultSelectScalar = {
    id?: boolean
    examId?: boolean
    studentId?: boolean
    participantId?: boolean
    participantName?: boolean
    startedAt?: boolean
    submittedAt?: boolean
    timeSpent?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    totalScore?: boolean
    maxScore?: boolean
    percentage?: boolean
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type ExamResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exam?: boolean | ExamDefaultArgs<ExtArgs>
    student?: boolean | ExamResult$studentArgs<ExtArgs>
    answers?: boolean | ExamResult$answersArgs<ExtArgs>
    aiAnalysisData?: boolean | ExamResult$aiAnalysisDataArgs<ExtArgs>
    aiSession?: boolean | ExamResult$aiSessionArgs<ExtArgs>
    _count?: boolean | ExamResultCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExamResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exam?: boolean | ExamDefaultArgs<ExtArgs>
    student?: boolean | ExamResult$studentArgs<ExtArgs>
  }

  export type $ExamResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExamResult"
    objects: {
      exam: Prisma.$ExamPayload<ExtArgs>
      student: Prisma.$StudentPayload<ExtArgs> | null
      answers: Prisma.$AnswerPayload<ExtArgs>[]
      aiAnalysisData: Prisma.$AiAnalysisAggregatePayload<ExtArgs> | null
      aiSession: Prisma.$AiSessionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      examId: string
      studentId: string | null
      participantId: string
      participantName: string
      startedAt: Date
      submittedAt: Date | null
      timeSpent: number | null
      ipAddress: string | null
      userAgent: string | null
      totalScore: number
      maxScore: number
      percentage: number
      isCompleted: boolean
      isValid: boolean
      aiSessionId: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["examResult"]>
    composites: {}
  }

  type ExamResultGetPayload<S extends boolean | null | undefined | ExamResultDefaultArgs> = $Result.GetResult<Prisma.$ExamResultPayload, S>

  type ExamResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExamResultFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExamResultCountAggregateInputType | true
    }

  export interface ExamResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExamResult'], meta: { name: 'ExamResult' } }
    /**
     * Find zero or one ExamResult that matches the filter.
     * @param {ExamResultFindUniqueArgs} args - Arguments to find a ExamResult
     * @example
     * // Get one ExamResult
     * const examResult = await prisma.examResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExamResultFindUniqueArgs>(args: SelectSubset<T, ExamResultFindUniqueArgs<ExtArgs>>): Prisma__ExamResultClient<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ExamResult that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExamResultFindUniqueOrThrowArgs} args - Arguments to find a ExamResult
     * @example
     * // Get one ExamResult
     * const examResult = await prisma.examResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExamResultFindUniqueOrThrowArgs>(args: SelectSubset<T, ExamResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExamResultClient<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ExamResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamResultFindFirstArgs} args - Arguments to find a ExamResult
     * @example
     * // Get one ExamResult
     * const examResult = await prisma.examResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExamResultFindFirstArgs>(args?: SelectSubset<T, ExamResultFindFirstArgs<ExtArgs>>): Prisma__ExamResultClient<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ExamResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamResultFindFirstOrThrowArgs} args - Arguments to find a ExamResult
     * @example
     * // Get one ExamResult
     * const examResult = await prisma.examResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExamResultFindFirstOrThrowArgs>(args?: SelectSubset<T, ExamResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExamResultClient<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ExamResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExamResults
     * const examResults = await prisma.examResult.findMany()
     * 
     * // Get first 10 ExamResults
     * const examResults = await prisma.examResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const examResultWithIdOnly = await prisma.examResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExamResultFindManyArgs>(args?: SelectSubset<T, ExamResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ExamResult.
     * @param {ExamResultCreateArgs} args - Arguments to create a ExamResult.
     * @example
     * // Create one ExamResult
     * const ExamResult = await prisma.examResult.create({
     *   data: {
     *     // ... data to create a ExamResult
     *   }
     * })
     * 
     */
    create<T extends ExamResultCreateArgs>(args: SelectSubset<T, ExamResultCreateArgs<ExtArgs>>): Prisma__ExamResultClient<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ExamResults.
     * @param {ExamResultCreateManyArgs} args - Arguments to create many ExamResults.
     * @example
     * // Create many ExamResults
     * const examResult = await prisma.examResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExamResultCreateManyArgs>(args?: SelectSubset<T, ExamResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExamResults and returns the data saved in the database.
     * @param {ExamResultCreateManyAndReturnArgs} args - Arguments to create many ExamResults.
     * @example
     * // Create many ExamResults
     * const examResult = await prisma.examResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExamResults and only return the `id`
     * const examResultWithIdOnly = await prisma.examResult.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExamResultCreateManyAndReturnArgs>(args?: SelectSubset<T, ExamResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ExamResult.
     * @param {ExamResultDeleteArgs} args - Arguments to delete one ExamResult.
     * @example
     * // Delete one ExamResult
     * const ExamResult = await prisma.examResult.delete({
     *   where: {
     *     // ... filter to delete one ExamResult
     *   }
     * })
     * 
     */
    delete<T extends ExamResultDeleteArgs>(args: SelectSubset<T, ExamResultDeleteArgs<ExtArgs>>): Prisma__ExamResultClient<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ExamResult.
     * @param {ExamResultUpdateArgs} args - Arguments to update one ExamResult.
     * @example
     * // Update one ExamResult
     * const examResult = await prisma.examResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExamResultUpdateArgs>(args: SelectSubset<T, ExamResultUpdateArgs<ExtArgs>>): Prisma__ExamResultClient<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ExamResults.
     * @param {ExamResultDeleteManyArgs} args - Arguments to filter ExamResults to delete.
     * @example
     * // Delete a few ExamResults
     * const { count } = await prisma.examResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExamResultDeleteManyArgs>(args?: SelectSubset<T, ExamResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExamResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExamResults
     * const examResult = await prisma.examResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExamResultUpdateManyArgs>(args: SelectSubset<T, ExamResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExamResult.
     * @param {ExamResultUpsertArgs} args - Arguments to update or create a ExamResult.
     * @example
     * // Update or create a ExamResult
     * const examResult = await prisma.examResult.upsert({
     *   create: {
     *     // ... data to create a ExamResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExamResult we want to update
     *   }
     * })
     */
    upsert<T extends ExamResultUpsertArgs>(args: SelectSubset<T, ExamResultUpsertArgs<ExtArgs>>): Prisma__ExamResultClient<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ExamResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamResultCountArgs} args - Arguments to filter ExamResults to count.
     * @example
     * // Count the number of ExamResults
     * const count = await prisma.examResult.count({
     *   where: {
     *     // ... the filter for the ExamResults we want to count
     *   }
     * })
    **/
    count<T extends ExamResultCountArgs>(
      args?: Subset<T, ExamResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExamResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExamResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExamResultAggregateArgs>(args: Subset<T, ExamResultAggregateArgs>): Prisma.PrismaPromise<GetExamResultAggregateType<T>>

    /**
     * Group by ExamResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExamResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExamResultGroupByArgs['orderBy'] }
        : { orderBy?: ExamResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExamResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExamResult model
   */
  readonly fields: ExamResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExamResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExamResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exam<T extends ExamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExamDefaultArgs<ExtArgs>>): Prisma__ExamClient<$Result.GetResult<Prisma.$ExamPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    student<T extends ExamResult$studentArgs<ExtArgs> = {}>(args?: Subset<T, ExamResult$studentArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    answers<T extends ExamResult$answersArgs<ExtArgs> = {}>(args?: Subset<T, ExamResult$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findMany"> | Null>
    aiAnalysisData<T extends ExamResult$aiAnalysisDataArgs<ExtArgs> = {}>(args?: Subset<T, ExamResult$aiAnalysisDataArgs<ExtArgs>>): Prisma__AiAnalysisAggregateClient<$Result.GetResult<Prisma.$AiAnalysisAggregatePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    aiSession<T extends ExamResult$aiSessionArgs<ExtArgs> = {}>(args?: Subset<T, ExamResult$aiSessionArgs<ExtArgs>>): Prisma__AiSessionClient<$Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExamResult model
   */ 
  interface ExamResultFieldRefs {
    readonly id: FieldRef<"ExamResult", 'String'>
    readonly examId: FieldRef<"ExamResult", 'String'>
    readonly studentId: FieldRef<"ExamResult", 'String'>
    readonly participantId: FieldRef<"ExamResult", 'String'>
    readonly participantName: FieldRef<"ExamResult", 'String'>
    readonly startedAt: FieldRef<"ExamResult", 'DateTime'>
    readonly submittedAt: FieldRef<"ExamResult", 'DateTime'>
    readonly timeSpent: FieldRef<"ExamResult", 'Int'>
    readonly ipAddress: FieldRef<"ExamResult", 'String'>
    readonly userAgent: FieldRef<"ExamResult", 'String'>
    readonly totalScore: FieldRef<"ExamResult", 'Float'>
    readonly maxScore: FieldRef<"ExamResult", 'Float'>
    readonly percentage: FieldRef<"ExamResult", 'Float'>
    readonly isCompleted: FieldRef<"ExamResult", 'Boolean'>
    readonly isValid: FieldRef<"ExamResult", 'Boolean'>
    readonly aiSessionId: FieldRef<"ExamResult", 'String'>
    readonly createdAt: FieldRef<"ExamResult", 'DateTime'>
    readonly updatedAt: FieldRef<"ExamResult", 'DateTime'>
    readonly deletedAt: FieldRef<"ExamResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExamResult findUnique
   */
  export type ExamResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: ExamResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResultInclude<ExtArgs> | null
    /**
     * Filter, which ExamResult to fetch.
     */
    where: ExamResultWhereUniqueInput
  }

  /**
   * ExamResult findUniqueOrThrow
   */
  export type ExamResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: ExamResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResultInclude<ExtArgs> | null
    /**
     * Filter, which ExamResult to fetch.
     */
    where: ExamResultWhereUniqueInput
  }

  /**
   * ExamResult findFirst
   */
  export type ExamResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: ExamResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResultInclude<ExtArgs> | null
    /**
     * Filter, which ExamResult to fetch.
     */
    where?: ExamResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamResults to fetch.
     */
    orderBy?: ExamResultOrderByWithRelationInput | ExamResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExamResults.
     */
    cursor?: ExamResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExamResults.
     */
    distinct?: ExamResultScalarFieldEnum | ExamResultScalarFieldEnum[]
  }

  /**
   * ExamResult findFirstOrThrow
   */
  export type ExamResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: ExamResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResultInclude<ExtArgs> | null
    /**
     * Filter, which ExamResult to fetch.
     */
    where?: ExamResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamResults to fetch.
     */
    orderBy?: ExamResultOrderByWithRelationInput | ExamResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExamResults.
     */
    cursor?: ExamResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExamResults.
     */
    distinct?: ExamResultScalarFieldEnum | ExamResultScalarFieldEnum[]
  }

  /**
   * ExamResult findMany
   */
  export type ExamResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: ExamResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResultInclude<ExtArgs> | null
    /**
     * Filter, which ExamResults to fetch.
     */
    where?: ExamResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamResults to fetch.
     */
    orderBy?: ExamResultOrderByWithRelationInput | ExamResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExamResults.
     */
    cursor?: ExamResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamResults.
     */
    skip?: number
    distinct?: ExamResultScalarFieldEnum | ExamResultScalarFieldEnum[]
  }

  /**
   * ExamResult create
   */
  export type ExamResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: ExamResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResultInclude<ExtArgs> | null
    /**
     * The data needed to create a ExamResult.
     */
    data: XOR<ExamResultCreateInput, ExamResultUncheckedCreateInput>
  }

  /**
   * ExamResult createMany
   */
  export type ExamResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExamResults.
     */
    data: ExamResultCreateManyInput | ExamResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExamResult createManyAndReturn
   */
  export type ExamResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: ExamResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ExamResults.
     */
    data: ExamResultCreateManyInput | ExamResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExamResult update
   */
  export type ExamResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: ExamResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResultInclude<ExtArgs> | null
    /**
     * The data needed to update a ExamResult.
     */
    data: XOR<ExamResultUpdateInput, ExamResultUncheckedUpdateInput>
    /**
     * Choose, which ExamResult to update.
     */
    where: ExamResultWhereUniqueInput
  }

  /**
   * ExamResult updateMany
   */
  export type ExamResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExamResults.
     */
    data: XOR<ExamResultUpdateManyMutationInput, ExamResultUncheckedUpdateManyInput>
    /**
     * Filter which ExamResults to update
     */
    where?: ExamResultWhereInput
  }

  /**
   * ExamResult upsert
   */
  export type ExamResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: ExamResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResultInclude<ExtArgs> | null
    /**
     * The filter to search for the ExamResult to update in case it exists.
     */
    where: ExamResultWhereUniqueInput
    /**
     * In case the ExamResult found by the `where` argument doesn't exist, create a new ExamResult with this data.
     */
    create: XOR<ExamResultCreateInput, ExamResultUncheckedCreateInput>
    /**
     * In case the ExamResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExamResultUpdateInput, ExamResultUncheckedUpdateInput>
  }

  /**
   * ExamResult delete
   */
  export type ExamResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: ExamResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResultInclude<ExtArgs> | null
    /**
     * Filter which ExamResult to delete.
     */
    where: ExamResultWhereUniqueInput
  }

  /**
   * ExamResult deleteMany
   */
  export type ExamResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExamResults to delete
     */
    where?: ExamResultWhereInput
  }

  /**
   * ExamResult.student
   */
  export type ExamResult$studentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
  }

  /**
   * ExamResult.answers
   */
  export type ExamResult$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    where?: AnswerWhereInput
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    cursor?: AnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
  }

  /**
   * ExamResult.aiAnalysisData
   */
  export type ExamResult$aiAnalysisDataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnalysisAggregate
     */
    select?: AiAnalysisAggregateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnalysisAggregateInclude<ExtArgs> | null
    where?: AiAnalysisAggregateWhereInput
  }

  /**
   * ExamResult.aiSession
   */
  export type ExamResult$aiSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSession
     */
    select?: AiSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSessionInclude<ExtArgs> | null
    where?: AiSessionWhereInput
  }

  /**
   * ExamResult without action
   */
  export type ExamResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: ExamResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResultInclude<ExtArgs> | null
  }


  /**
   * Model Answer
   */

  export type AggregateAnswer = {
    _count: AnswerCountAggregateOutputType | null
    _avg: AnswerAvgAggregateOutputType | null
    _sum: AnswerSumAggregateOutputType | null
    _min: AnswerMinAggregateOutputType | null
    _max: AnswerMaxAggregateOutputType | null
  }

  export type AnswerAvgAggregateOutputType = {
    points: number | null
    maxPoints: number | null
    totalViewTime: number | null
    interactionCount: number | null
    hesitationScore: number | null
  }

  export type AnswerSumAggregateOutputType = {
    points: number | null
    maxPoints: number | null
    totalViewTime: number | null
    interactionCount: number | null
    hesitationScore: number | null
  }

  export type AnswerMinAggregateOutputType = {
    id: string | null
    examResultId: string | null
    questionId: string | null
    textAnswer: string | null
    points: number | null
    maxPoints: number | null
    questionDisplayedAt: Date | null
    firstInteractionAt: Date | null
    lastModifiedAt: Date | null
    answeredAt: Date | null
    totalViewTime: number | null
    interactionCount: number | null
    hesitationScore: number | null
  }

  export type AnswerMaxAggregateOutputType = {
    id: string | null
    examResultId: string | null
    questionId: string | null
    textAnswer: string | null
    points: number | null
    maxPoints: number | null
    questionDisplayedAt: Date | null
    firstInteractionAt: Date | null
    lastModifiedAt: Date | null
    answeredAt: Date | null
    totalViewTime: number | null
    interactionCount: number | null
    hesitationScore: number | null
  }

  export type AnswerCountAggregateOutputType = {
    id: number
    examResultId: number
    questionId: number
    selectedOptions: number
    textAnswer: number
    points: number
    maxPoints: number
    questionDisplayedAt: number
    firstInteractionAt: number
    lastModifiedAt: number
    answeredAt: number
    totalViewTime: number
    interactionCount: number
    hesitationScore: number
    _all: number
  }


  export type AnswerAvgAggregateInputType = {
    points?: true
    maxPoints?: true
    totalViewTime?: true
    interactionCount?: true
    hesitationScore?: true
  }

  export type AnswerSumAggregateInputType = {
    points?: true
    maxPoints?: true
    totalViewTime?: true
    interactionCount?: true
    hesitationScore?: true
  }

  export type AnswerMinAggregateInputType = {
    id?: true
    examResultId?: true
    questionId?: true
    textAnswer?: true
    points?: true
    maxPoints?: true
    questionDisplayedAt?: true
    firstInteractionAt?: true
    lastModifiedAt?: true
    answeredAt?: true
    totalViewTime?: true
    interactionCount?: true
    hesitationScore?: true
  }

  export type AnswerMaxAggregateInputType = {
    id?: true
    examResultId?: true
    questionId?: true
    textAnswer?: true
    points?: true
    maxPoints?: true
    questionDisplayedAt?: true
    firstInteractionAt?: true
    lastModifiedAt?: true
    answeredAt?: true
    totalViewTime?: true
    interactionCount?: true
    hesitationScore?: true
  }

  export type AnswerCountAggregateInputType = {
    id?: true
    examResultId?: true
    questionId?: true
    selectedOptions?: true
    textAnswer?: true
    points?: true
    maxPoints?: true
    questionDisplayedAt?: true
    firstInteractionAt?: true
    lastModifiedAt?: true
    answeredAt?: true
    totalViewTime?: true
    interactionCount?: true
    hesitationScore?: true
    _all?: true
  }

  export type AnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Answer to aggregate.
     */
    where?: AnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Answers
    **/
    _count?: true | AnswerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnswerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnswerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnswerMaxAggregateInputType
  }

  export type GetAnswerAggregateType<T extends AnswerAggregateArgs> = {
        [P in keyof T & keyof AggregateAnswer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnswer[P]>
      : GetScalarType<T[P], AggregateAnswer[P]>
  }




  export type AnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnswerWhereInput
    orderBy?: AnswerOrderByWithAggregationInput | AnswerOrderByWithAggregationInput[]
    by: AnswerScalarFieldEnum[] | AnswerScalarFieldEnum
    having?: AnswerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnswerCountAggregateInputType | true
    _avg?: AnswerAvgAggregateInputType
    _sum?: AnswerSumAggregateInputType
    _min?: AnswerMinAggregateInputType
    _max?: AnswerMaxAggregateInputType
  }

  export type AnswerGroupByOutputType = {
    id: string
    examResultId: string
    questionId: string
    selectedOptions: JsonValue | null
    textAnswer: string | null
    points: number
    maxPoints: number
    questionDisplayedAt: Date | null
    firstInteractionAt: Date | null
    lastModifiedAt: Date | null
    answeredAt: Date
    totalViewTime: number | null
    interactionCount: number
    hesitationScore: number | null
    _count: AnswerCountAggregateOutputType | null
    _avg: AnswerAvgAggregateOutputType | null
    _sum: AnswerSumAggregateOutputType | null
    _min: AnswerMinAggregateOutputType | null
    _max: AnswerMaxAggregateOutputType | null
  }

  type GetAnswerGroupByPayload<T extends AnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnswerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnswerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnswerGroupByOutputType[P]>
            : GetScalarType<T[P], AnswerGroupByOutputType[P]>
        }
      >
    >


  export type AnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    examResultId?: boolean
    questionId?: boolean
    selectedOptions?: boolean
    textAnswer?: boolean
    points?: boolean
    maxPoints?: boolean
    questionDisplayedAt?: boolean
    firstInteractionAt?: boolean
    lastModifiedAt?: boolean
    answeredAt?: boolean
    totalViewTime?: boolean
    interactionCount?: boolean
    hesitationScore?: boolean
    examResult?: boolean | ExamResultDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["answer"]>

  export type AnswerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    examResultId?: boolean
    questionId?: boolean
    selectedOptions?: boolean
    textAnswer?: boolean
    points?: boolean
    maxPoints?: boolean
    questionDisplayedAt?: boolean
    firstInteractionAt?: boolean
    lastModifiedAt?: boolean
    answeredAt?: boolean
    totalViewTime?: boolean
    interactionCount?: boolean
    hesitationScore?: boolean
    examResult?: boolean | ExamResultDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["answer"]>

  export type AnswerSelectScalar = {
    id?: boolean
    examResultId?: boolean
    questionId?: boolean
    selectedOptions?: boolean
    textAnswer?: boolean
    points?: boolean
    maxPoints?: boolean
    questionDisplayedAt?: boolean
    firstInteractionAt?: boolean
    lastModifiedAt?: boolean
    answeredAt?: boolean
    totalViewTime?: boolean
    interactionCount?: boolean
    hesitationScore?: boolean
  }

  export type AnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    examResult?: boolean | ExamResultDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }
  export type AnswerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    examResult?: boolean | ExamResultDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type $AnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Answer"
    objects: {
      examResult: Prisma.$ExamResultPayload<ExtArgs>
      question: Prisma.$QuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      examResultId: string
      questionId: string
      selectedOptions: Prisma.JsonValue | null
      textAnswer: string | null
      points: number
      maxPoints: number
      questionDisplayedAt: Date | null
      firstInteractionAt: Date | null
      lastModifiedAt: Date | null
      answeredAt: Date
      totalViewTime: number | null
      interactionCount: number
      hesitationScore: number | null
    }, ExtArgs["result"]["answer"]>
    composites: {}
  }

  type AnswerGetPayload<S extends boolean | null | undefined | AnswerDefaultArgs> = $Result.GetResult<Prisma.$AnswerPayload, S>

  type AnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AnswerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AnswerCountAggregateInputType | true
    }

  export interface AnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Answer'], meta: { name: 'Answer' } }
    /**
     * Find zero or one Answer that matches the filter.
     * @param {AnswerFindUniqueArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnswerFindUniqueArgs>(args: SelectSubset<T, AnswerFindUniqueArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Answer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AnswerFindUniqueOrThrowArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, AnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Answer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerFindFirstArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnswerFindFirstArgs>(args?: SelectSubset<T, AnswerFindFirstArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Answer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerFindFirstOrThrowArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, AnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Answers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Answers
     * const answers = await prisma.answer.findMany()
     * 
     * // Get first 10 Answers
     * const answers = await prisma.answer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const answerWithIdOnly = await prisma.answer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnswerFindManyArgs>(args?: SelectSubset<T, AnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Answer.
     * @param {AnswerCreateArgs} args - Arguments to create a Answer.
     * @example
     * // Create one Answer
     * const Answer = await prisma.answer.create({
     *   data: {
     *     // ... data to create a Answer
     *   }
     * })
     * 
     */
    create<T extends AnswerCreateArgs>(args: SelectSubset<T, AnswerCreateArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Answers.
     * @param {AnswerCreateManyArgs} args - Arguments to create many Answers.
     * @example
     * // Create many Answers
     * const answer = await prisma.answer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnswerCreateManyArgs>(args?: SelectSubset<T, AnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Answers and returns the data saved in the database.
     * @param {AnswerCreateManyAndReturnArgs} args - Arguments to create many Answers.
     * @example
     * // Create many Answers
     * const answer = await prisma.answer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Answers and only return the `id`
     * const answerWithIdOnly = await prisma.answer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnswerCreateManyAndReturnArgs>(args?: SelectSubset<T, AnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Answer.
     * @param {AnswerDeleteArgs} args - Arguments to delete one Answer.
     * @example
     * // Delete one Answer
     * const Answer = await prisma.answer.delete({
     *   where: {
     *     // ... filter to delete one Answer
     *   }
     * })
     * 
     */
    delete<T extends AnswerDeleteArgs>(args: SelectSubset<T, AnswerDeleteArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Answer.
     * @param {AnswerUpdateArgs} args - Arguments to update one Answer.
     * @example
     * // Update one Answer
     * const answer = await prisma.answer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnswerUpdateArgs>(args: SelectSubset<T, AnswerUpdateArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Answers.
     * @param {AnswerDeleteManyArgs} args - Arguments to filter Answers to delete.
     * @example
     * // Delete a few Answers
     * const { count } = await prisma.answer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnswerDeleteManyArgs>(args?: SelectSubset<T, AnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Answers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Answers
     * const answer = await prisma.answer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnswerUpdateManyArgs>(args: SelectSubset<T, AnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Answer.
     * @param {AnswerUpsertArgs} args - Arguments to update or create a Answer.
     * @example
     * // Update or create a Answer
     * const answer = await prisma.answer.upsert({
     *   create: {
     *     // ... data to create a Answer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Answer we want to update
     *   }
     * })
     */
    upsert<T extends AnswerUpsertArgs>(args: SelectSubset<T, AnswerUpsertArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Answers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerCountArgs} args - Arguments to filter Answers to count.
     * @example
     * // Count the number of Answers
     * const count = await prisma.answer.count({
     *   where: {
     *     // ... the filter for the Answers we want to count
     *   }
     * })
    **/
    count<T extends AnswerCountArgs>(
      args?: Subset<T, AnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnswerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Answer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnswerAggregateArgs>(args: Subset<T, AnswerAggregateArgs>): Prisma.PrismaPromise<GetAnswerAggregateType<T>>

    /**
     * Group by Answer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnswerGroupByArgs['orderBy'] }
        : { orderBy?: AnswerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Answer model
   */
  readonly fields: AnswerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Answer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    examResult<T extends ExamResultDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExamResultDefaultArgs<ExtArgs>>): Prisma__ExamResultClient<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Answer model
   */ 
  interface AnswerFieldRefs {
    readonly id: FieldRef<"Answer", 'String'>
    readonly examResultId: FieldRef<"Answer", 'String'>
    readonly questionId: FieldRef<"Answer", 'String'>
    readonly selectedOptions: FieldRef<"Answer", 'Json'>
    readonly textAnswer: FieldRef<"Answer", 'String'>
    readonly points: FieldRef<"Answer", 'Float'>
    readonly maxPoints: FieldRef<"Answer", 'Float'>
    readonly questionDisplayedAt: FieldRef<"Answer", 'DateTime'>
    readonly firstInteractionAt: FieldRef<"Answer", 'DateTime'>
    readonly lastModifiedAt: FieldRef<"Answer", 'DateTime'>
    readonly answeredAt: FieldRef<"Answer", 'DateTime'>
    readonly totalViewTime: FieldRef<"Answer", 'Int'>
    readonly interactionCount: FieldRef<"Answer", 'Int'>
    readonly hesitationScore: FieldRef<"Answer", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Answer findUnique
   */
  export type AnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answer to fetch.
     */
    where: AnswerWhereUniqueInput
  }

  /**
   * Answer findUniqueOrThrow
   */
  export type AnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answer to fetch.
     */
    where: AnswerWhereUniqueInput
  }

  /**
   * Answer findFirst
   */
  export type AnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answer to fetch.
     */
    where?: AnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Answers.
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Answers.
     */
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
  }

  /**
   * Answer findFirstOrThrow
   */
  export type AnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answer to fetch.
     */
    where?: AnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Answers.
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Answers.
     */
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
  }

  /**
   * Answer findMany
   */
  export type AnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answers to fetch.
     */
    where?: AnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Answers.
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
  }

  /**
   * Answer create
   */
  export type AnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * The data needed to create a Answer.
     */
    data: XOR<AnswerCreateInput, AnswerUncheckedCreateInput>
  }

  /**
   * Answer createMany
   */
  export type AnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Answers.
     */
    data: AnswerCreateManyInput | AnswerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Answer createManyAndReturn
   */
  export type AnswerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Answers.
     */
    data: AnswerCreateManyInput | AnswerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Answer update
   */
  export type AnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * The data needed to update a Answer.
     */
    data: XOR<AnswerUpdateInput, AnswerUncheckedUpdateInput>
    /**
     * Choose, which Answer to update.
     */
    where: AnswerWhereUniqueInput
  }

  /**
   * Answer updateMany
   */
  export type AnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Answers.
     */
    data: XOR<AnswerUpdateManyMutationInput, AnswerUncheckedUpdateManyInput>
    /**
     * Filter which Answers to update
     */
    where?: AnswerWhereInput
  }

  /**
   * Answer upsert
   */
  export type AnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * The filter to search for the Answer to update in case it exists.
     */
    where: AnswerWhereUniqueInput
    /**
     * In case the Answer found by the `where` argument doesn't exist, create a new Answer with this data.
     */
    create: XOR<AnswerCreateInput, AnswerUncheckedCreateInput>
    /**
     * In case the Answer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnswerUpdateInput, AnswerUncheckedUpdateInput>
  }

  /**
   * Answer delete
   */
  export type AnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter which Answer to delete.
     */
    where: AnswerWhereUniqueInput
  }

  /**
   * Answer deleteMany
   */
  export type AnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Answers to delete
     */
    where?: AnswerWhereInput
  }

  /**
   * Answer without action
   */
  export type AnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
  }


  /**
   * Model AiSession
   */

  export type AggregateAiSession = {
    _count: AiSessionCountAggregateOutputType | null
    _avg: AiSessionAvgAggregateOutputType | null
    _sum: AiSessionSumAggregateOutputType | null
    _min: AiSessionMinAggregateOutputType | null
    _max: AiSessionMaxAggregateOutputType | null
  }

  export type AiSessionAvgAggregateOutputType = {
    checkpointCount: number | null
    fileSize: number | null
  }

  export type AiSessionSumAggregateOutputType = {
    checkpointCount: number | null
    fileSize: number | null
  }

  export type AiSessionMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    examResultId: string | null
    status: $Enums.AiSessionStatus | null
    startTime: Date | null
    endTime: Date | null
    checkpointFilePath: string | null
    checkpointCount: number | null
    fileSize: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiSessionMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    examResultId: string | null
    status: $Enums.AiSessionStatus | null
    startTime: Date | null
    endTime: Date | null
    checkpointFilePath: string | null
    checkpointCount: number | null
    fileSize: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiSessionCountAggregateOutputType = {
    id: number
    sessionId: number
    examResultId: number
    status: number
    startTime: number
    endTime: number
    clientInfo: number
    streamInfo: number
    checkpointFilePath: number
    checkpointCount: number
    fileSize: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AiSessionAvgAggregateInputType = {
    checkpointCount?: true
    fileSize?: true
  }

  export type AiSessionSumAggregateInputType = {
    checkpointCount?: true
    fileSize?: true
  }

  export type AiSessionMinAggregateInputType = {
    id?: true
    sessionId?: true
    examResultId?: true
    status?: true
    startTime?: true
    endTime?: true
    checkpointFilePath?: true
    checkpointCount?: true
    fileSize?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiSessionMaxAggregateInputType = {
    id?: true
    sessionId?: true
    examResultId?: true
    status?: true
    startTime?: true
    endTime?: true
    checkpointFilePath?: true
    checkpointCount?: true
    fileSize?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiSessionCountAggregateInputType = {
    id?: true
    sessionId?: true
    examResultId?: true
    status?: true
    startTime?: true
    endTime?: true
    clientInfo?: true
    streamInfo?: true
    checkpointFilePath?: true
    checkpointCount?: true
    fileSize?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AiSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiSession to aggregate.
     */
    where?: AiSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiSessions to fetch.
     */
    orderBy?: AiSessionOrderByWithRelationInput | AiSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiSessions
    **/
    _count?: true | AiSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AiSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AiSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiSessionMaxAggregateInputType
  }

  export type GetAiSessionAggregateType<T extends AiSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAiSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiSession[P]>
      : GetScalarType<T[P], AggregateAiSession[P]>
  }




  export type AiSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiSessionWhereInput
    orderBy?: AiSessionOrderByWithAggregationInput | AiSessionOrderByWithAggregationInput[]
    by: AiSessionScalarFieldEnum[] | AiSessionScalarFieldEnum
    having?: AiSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiSessionCountAggregateInputType | true
    _avg?: AiSessionAvgAggregateInputType
    _sum?: AiSessionSumAggregateInputType
    _min?: AiSessionMinAggregateInputType
    _max?: AiSessionMaxAggregateInputType
  }

  export type AiSessionGroupByOutputType = {
    id: string
    sessionId: string
    examResultId: string | null
    status: $Enums.AiSessionStatus
    startTime: Date
    endTime: Date | null
    clientInfo: JsonValue | null
    streamInfo: JsonValue | null
    checkpointFilePath: string | null
    checkpointCount: number
    fileSize: number | null
    createdAt: Date
    updatedAt: Date
    _count: AiSessionCountAggregateOutputType | null
    _avg: AiSessionAvgAggregateOutputType | null
    _sum: AiSessionSumAggregateOutputType | null
    _min: AiSessionMinAggregateOutputType | null
    _max: AiSessionMaxAggregateOutputType | null
  }

  type GetAiSessionGroupByPayload<T extends AiSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiSessionGroupByOutputType[P]>
            : GetScalarType<T[P], AiSessionGroupByOutputType[P]>
        }
      >
    >


  export type AiSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    examResultId?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    clientInfo?: boolean
    streamInfo?: boolean
    checkpointFilePath?: boolean
    checkpointCount?: boolean
    fileSize?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    examResult?: boolean | AiSession$examResultArgs<ExtArgs>
    aggregate?: boolean | AiSession$aggregateArgs<ExtArgs>
    anomalies?: boolean | AiSession$anomaliesArgs<ExtArgs>
    checkpoints?: boolean | AiSession$checkpointsArgs<ExtArgs>
    _count?: boolean | AiSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiSession"]>

  export type AiSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    examResultId?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    clientInfo?: boolean
    streamInfo?: boolean
    checkpointFilePath?: boolean
    checkpointCount?: boolean
    fileSize?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    examResult?: boolean | AiSession$examResultArgs<ExtArgs>
  }, ExtArgs["result"]["aiSession"]>

  export type AiSessionSelectScalar = {
    id?: boolean
    sessionId?: boolean
    examResultId?: boolean
    status?: boolean
    startTime?: boolean
    endTime?: boolean
    clientInfo?: boolean
    streamInfo?: boolean
    checkpointFilePath?: boolean
    checkpointCount?: boolean
    fileSize?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AiSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    examResult?: boolean | AiSession$examResultArgs<ExtArgs>
    aggregate?: boolean | AiSession$aggregateArgs<ExtArgs>
    anomalies?: boolean | AiSession$anomaliesArgs<ExtArgs>
    checkpoints?: boolean | AiSession$checkpointsArgs<ExtArgs>
    _count?: boolean | AiSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AiSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    examResult?: boolean | AiSession$examResultArgs<ExtArgs>
  }

  export type $AiSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiSession"
    objects: {
      examResult: Prisma.$ExamResultPayload<ExtArgs> | null
      aggregate: Prisma.$AiAnalysisAggregatePayload<ExtArgs> | null
      anomalies: Prisma.$AiAnomalyPayload<ExtArgs>[]
      checkpoints: Prisma.$AiCheckpointPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      examResultId: string | null
      status: $Enums.AiSessionStatus
      startTime: Date
      endTime: Date | null
      clientInfo: Prisma.JsonValue | null
      streamInfo: Prisma.JsonValue | null
      checkpointFilePath: string | null
      checkpointCount: number
      fileSize: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aiSession"]>
    composites: {}
  }

  type AiSessionGetPayload<S extends boolean | null | undefined | AiSessionDefaultArgs> = $Result.GetResult<Prisma.$AiSessionPayload, S>

  type AiSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AiSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AiSessionCountAggregateInputType | true
    }

  export interface AiSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiSession'], meta: { name: 'AiSession' } }
    /**
     * Find zero or one AiSession that matches the filter.
     * @param {AiSessionFindUniqueArgs} args - Arguments to find a AiSession
     * @example
     * // Get one AiSession
     * const aiSession = await prisma.aiSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiSessionFindUniqueArgs>(args: SelectSubset<T, AiSessionFindUniqueArgs<ExtArgs>>): Prisma__AiSessionClient<$Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AiSession that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AiSessionFindUniqueOrThrowArgs} args - Arguments to find a AiSession
     * @example
     * // Get one AiSession
     * const aiSession = await prisma.aiSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, AiSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiSessionClient<$Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AiSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiSessionFindFirstArgs} args - Arguments to find a AiSession
     * @example
     * // Get one AiSession
     * const aiSession = await prisma.aiSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiSessionFindFirstArgs>(args?: SelectSubset<T, AiSessionFindFirstArgs<ExtArgs>>): Prisma__AiSessionClient<$Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AiSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiSessionFindFirstOrThrowArgs} args - Arguments to find a AiSession
     * @example
     * // Get one AiSession
     * const aiSession = await prisma.aiSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, AiSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiSessionClient<$Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AiSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiSessions
     * const aiSessions = await prisma.aiSession.findMany()
     * 
     * // Get first 10 AiSessions
     * const aiSessions = await prisma.aiSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiSessionWithIdOnly = await prisma.aiSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiSessionFindManyArgs>(args?: SelectSubset<T, AiSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AiSession.
     * @param {AiSessionCreateArgs} args - Arguments to create a AiSession.
     * @example
     * // Create one AiSession
     * const AiSession = await prisma.aiSession.create({
     *   data: {
     *     // ... data to create a AiSession
     *   }
     * })
     * 
     */
    create<T extends AiSessionCreateArgs>(args: SelectSubset<T, AiSessionCreateArgs<ExtArgs>>): Prisma__AiSessionClient<$Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AiSessions.
     * @param {AiSessionCreateManyArgs} args - Arguments to create many AiSessions.
     * @example
     * // Create many AiSessions
     * const aiSession = await prisma.aiSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiSessionCreateManyArgs>(args?: SelectSubset<T, AiSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiSessions and returns the data saved in the database.
     * @param {AiSessionCreateManyAndReturnArgs} args - Arguments to create many AiSessions.
     * @example
     * // Create many AiSessions
     * const aiSession = await prisma.aiSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiSessions and only return the `id`
     * const aiSessionWithIdOnly = await prisma.aiSession.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, AiSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AiSession.
     * @param {AiSessionDeleteArgs} args - Arguments to delete one AiSession.
     * @example
     * // Delete one AiSession
     * const AiSession = await prisma.aiSession.delete({
     *   where: {
     *     // ... filter to delete one AiSession
     *   }
     * })
     * 
     */
    delete<T extends AiSessionDeleteArgs>(args: SelectSubset<T, AiSessionDeleteArgs<ExtArgs>>): Prisma__AiSessionClient<$Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AiSession.
     * @param {AiSessionUpdateArgs} args - Arguments to update one AiSession.
     * @example
     * // Update one AiSession
     * const aiSession = await prisma.aiSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiSessionUpdateArgs>(args: SelectSubset<T, AiSessionUpdateArgs<ExtArgs>>): Prisma__AiSessionClient<$Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AiSessions.
     * @param {AiSessionDeleteManyArgs} args - Arguments to filter AiSessions to delete.
     * @example
     * // Delete a few AiSessions
     * const { count } = await prisma.aiSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiSessionDeleteManyArgs>(args?: SelectSubset<T, AiSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiSessions
     * const aiSession = await prisma.aiSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiSessionUpdateManyArgs>(args: SelectSubset<T, AiSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AiSession.
     * @param {AiSessionUpsertArgs} args - Arguments to update or create a AiSession.
     * @example
     * // Update or create a AiSession
     * const aiSession = await prisma.aiSession.upsert({
     *   create: {
     *     // ... data to create a AiSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiSession we want to update
     *   }
     * })
     */
    upsert<T extends AiSessionUpsertArgs>(args: SelectSubset<T, AiSessionUpsertArgs<ExtArgs>>): Prisma__AiSessionClient<$Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AiSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiSessionCountArgs} args - Arguments to filter AiSessions to count.
     * @example
     * // Count the number of AiSessions
     * const count = await prisma.aiSession.count({
     *   where: {
     *     // ... the filter for the AiSessions we want to count
     *   }
     * })
    **/
    count<T extends AiSessionCountArgs>(
      args?: Subset<T, AiSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiSessionAggregateArgs>(args: Subset<T, AiSessionAggregateArgs>): Prisma.PrismaPromise<GetAiSessionAggregateType<T>>

    /**
     * Group by AiSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiSessionGroupByArgs['orderBy'] }
        : { orderBy?: AiSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiSession model
   */
  readonly fields: AiSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    examResult<T extends AiSession$examResultArgs<ExtArgs> = {}>(args?: Subset<T, AiSession$examResultArgs<ExtArgs>>): Prisma__ExamResultClient<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    aggregate<T extends AiSession$aggregateArgs<ExtArgs> = {}>(args?: Subset<T, AiSession$aggregateArgs<ExtArgs>>): Prisma__AiAnalysisAggregateClient<$Result.GetResult<Prisma.$AiAnalysisAggregatePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    anomalies<T extends AiSession$anomaliesArgs<ExtArgs> = {}>(args?: Subset<T, AiSession$anomaliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiAnomalyPayload<ExtArgs>, T, "findMany"> | Null>
    checkpoints<T extends AiSession$checkpointsArgs<ExtArgs> = {}>(args?: Subset<T, AiSession$checkpointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiCheckpointPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiSession model
   */ 
  interface AiSessionFieldRefs {
    readonly id: FieldRef<"AiSession", 'String'>
    readonly sessionId: FieldRef<"AiSession", 'String'>
    readonly examResultId: FieldRef<"AiSession", 'String'>
    readonly status: FieldRef<"AiSession", 'AiSessionStatus'>
    readonly startTime: FieldRef<"AiSession", 'DateTime'>
    readonly endTime: FieldRef<"AiSession", 'DateTime'>
    readonly clientInfo: FieldRef<"AiSession", 'Json'>
    readonly streamInfo: FieldRef<"AiSession", 'Json'>
    readonly checkpointFilePath: FieldRef<"AiSession", 'String'>
    readonly checkpointCount: FieldRef<"AiSession", 'Int'>
    readonly fileSize: FieldRef<"AiSession", 'Int'>
    readonly createdAt: FieldRef<"AiSession", 'DateTime'>
    readonly updatedAt: FieldRef<"AiSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiSession findUnique
   */
  export type AiSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSession
     */
    select?: AiSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSessionInclude<ExtArgs> | null
    /**
     * Filter, which AiSession to fetch.
     */
    where: AiSessionWhereUniqueInput
  }

  /**
   * AiSession findUniqueOrThrow
   */
  export type AiSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSession
     */
    select?: AiSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSessionInclude<ExtArgs> | null
    /**
     * Filter, which AiSession to fetch.
     */
    where: AiSessionWhereUniqueInput
  }

  /**
   * AiSession findFirst
   */
  export type AiSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSession
     */
    select?: AiSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSessionInclude<ExtArgs> | null
    /**
     * Filter, which AiSession to fetch.
     */
    where?: AiSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiSessions to fetch.
     */
    orderBy?: AiSessionOrderByWithRelationInput | AiSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiSessions.
     */
    cursor?: AiSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiSessions.
     */
    distinct?: AiSessionScalarFieldEnum | AiSessionScalarFieldEnum[]
  }

  /**
   * AiSession findFirstOrThrow
   */
  export type AiSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSession
     */
    select?: AiSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSessionInclude<ExtArgs> | null
    /**
     * Filter, which AiSession to fetch.
     */
    where?: AiSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiSessions to fetch.
     */
    orderBy?: AiSessionOrderByWithRelationInput | AiSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiSessions.
     */
    cursor?: AiSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiSessions.
     */
    distinct?: AiSessionScalarFieldEnum | AiSessionScalarFieldEnum[]
  }

  /**
   * AiSession findMany
   */
  export type AiSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSession
     */
    select?: AiSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSessionInclude<ExtArgs> | null
    /**
     * Filter, which AiSessions to fetch.
     */
    where?: AiSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiSessions to fetch.
     */
    orderBy?: AiSessionOrderByWithRelationInput | AiSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiSessions.
     */
    cursor?: AiSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiSessions.
     */
    skip?: number
    distinct?: AiSessionScalarFieldEnum | AiSessionScalarFieldEnum[]
  }

  /**
   * AiSession create
   */
  export type AiSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSession
     */
    select?: AiSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a AiSession.
     */
    data: XOR<AiSessionCreateInput, AiSessionUncheckedCreateInput>
  }

  /**
   * AiSession createMany
   */
  export type AiSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiSessions.
     */
    data: AiSessionCreateManyInput | AiSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiSession createManyAndReturn
   */
  export type AiSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSession
     */
    select?: AiSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AiSessions.
     */
    data: AiSessionCreateManyInput | AiSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AiSession update
   */
  export type AiSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSession
     */
    select?: AiSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a AiSession.
     */
    data: XOR<AiSessionUpdateInput, AiSessionUncheckedUpdateInput>
    /**
     * Choose, which AiSession to update.
     */
    where: AiSessionWhereUniqueInput
  }

  /**
   * AiSession updateMany
   */
  export type AiSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiSessions.
     */
    data: XOR<AiSessionUpdateManyMutationInput, AiSessionUncheckedUpdateManyInput>
    /**
     * Filter which AiSessions to update
     */
    where?: AiSessionWhereInput
  }

  /**
   * AiSession upsert
   */
  export type AiSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSession
     */
    select?: AiSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the AiSession to update in case it exists.
     */
    where: AiSessionWhereUniqueInput
    /**
     * In case the AiSession found by the `where` argument doesn't exist, create a new AiSession with this data.
     */
    create: XOR<AiSessionCreateInput, AiSessionUncheckedCreateInput>
    /**
     * In case the AiSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiSessionUpdateInput, AiSessionUncheckedUpdateInput>
  }

  /**
   * AiSession delete
   */
  export type AiSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSession
     */
    select?: AiSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSessionInclude<ExtArgs> | null
    /**
     * Filter which AiSession to delete.
     */
    where: AiSessionWhereUniqueInput
  }

  /**
   * AiSession deleteMany
   */
  export type AiSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiSessions to delete
     */
    where?: AiSessionWhereInput
  }

  /**
   * AiSession.examResult
   */
  export type AiSession$examResultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: ExamResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamResultInclude<ExtArgs> | null
    where?: ExamResultWhereInput
  }

  /**
   * AiSession.aggregate
   */
  export type AiSession$aggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnalysisAggregate
     */
    select?: AiAnalysisAggregateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnalysisAggregateInclude<ExtArgs> | null
    where?: AiAnalysisAggregateWhereInput
  }

  /**
   * AiSession.anomalies
   */
  export type AiSession$anomaliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnomaly
     */
    select?: AiAnomalySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnomalyInclude<ExtArgs> | null
    where?: AiAnomalyWhereInput
    orderBy?: AiAnomalyOrderByWithRelationInput | AiAnomalyOrderByWithRelationInput[]
    cursor?: AiAnomalyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiAnomalyScalarFieldEnum | AiAnomalyScalarFieldEnum[]
  }

  /**
   * AiSession.checkpoints
   */
  export type AiSession$checkpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiCheckpoint
     */
    select?: AiCheckpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiCheckpointInclude<ExtArgs> | null
    where?: AiCheckpointWhereInput
    orderBy?: AiCheckpointOrderByWithRelationInput | AiCheckpointOrderByWithRelationInput[]
    cursor?: AiCheckpointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiCheckpointScalarFieldEnum | AiCheckpointScalarFieldEnum[]
  }

  /**
   * AiSession without action
   */
  export type AiSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiSession
     */
    select?: AiSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiSessionInclude<ExtArgs> | null
  }


  /**
   * Model AiAnalysisAggregate
   */

  export type AggregateAiAnalysisAggregate = {
    _count: AiAnalysisAggregateCountAggregateOutputType | null
    _avg: AiAnalysisAggregateAvgAggregateOutputType | null
    _sum: AiAnalysisAggregateSumAggregateOutputType | null
    _min: AiAnalysisAggregateMinAggregateOutputType | null
    _max: AiAnalysisAggregateMaxAggregateOutputType | null
  }

  export type AiAnalysisAggregateAvgAggregateOutputType = {
    avgValence: number | null
    avgArousal: number | null
    avgAttention: number | null
    attentionVariability: number | null
    distractionEvents: number | null
    engagementScore: number | null
    consistencyScore: number | null
    avgHeartRate: number | null
    heartRateVariability: number | null
    dataQuality: number | null
    analysisConfidence: number | null
  }

  export type AiAnalysisAggregateSumAggregateOutputType = {
    avgValence: number | null
    avgArousal: number | null
    avgAttention: number | null
    attentionVariability: number | null
    distractionEvents: number | null
    engagementScore: number | null
    consistencyScore: number | null
    avgHeartRate: number | null
    heartRateVariability: number | null
    dataQuality: number | null
    analysisConfidence: number | null
  }

  export type AiAnalysisAggregateMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    examResultId: string | null
    avgValence: number | null
    avgArousal: number | null
    dominantEmotion: string | null
    avgAttention: number | null
    attentionVariability: number | null
    distractionEvents: number | null
    engagementScore: number | null
    consistencyScore: number | null
    avgHeartRate: number | null
    heartRateVariability: number | null
    dataQuality: number | null
    analysisConfidence: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiAnalysisAggregateMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    examResultId: string | null
    avgValence: number | null
    avgArousal: number | null
    dominantEmotion: string | null
    avgAttention: number | null
    attentionVariability: number | null
    distractionEvents: number | null
    engagementScore: number | null
    consistencyScore: number | null
    avgHeartRate: number | null
    heartRateVariability: number | null
    dataQuality: number | null
    analysisConfidence: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiAnalysisAggregateCountAggregateOutputType = {
    id: number
    sessionId: number
    examResultId: number
    avgValence: number
    avgArousal: number
    dominantEmotion: number
    emotionDistribution: number
    avgAttention: number
    attentionVariability: number
    distractionEvents: number
    engagementScore: number
    consistencyScore: number
    avgHeartRate: number
    heartRateVariability: number
    stressIndicators: number
    dataQuality: number
    analysisConfidence: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AiAnalysisAggregateAvgAggregateInputType = {
    avgValence?: true
    avgArousal?: true
    avgAttention?: true
    attentionVariability?: true
    distractionEvents?: true
    engagementScore?: true
    consistencyScore?: true
    avgHeartRate?: true
    heartRateVariability?: true
    dataQuality?: true
    analysisConfidence?: true
  }

  export type AiAnalysisAggregateSumAggregateInputType = {
    avgValence?: true
    avgArousal?: true
    avgAttention?: true
    attentionVariability?: true
    distractionEvents?: true
    engagementScore?: true
    consistencyScore?: true
    avgHeartRate?: true
    heartRateVariability?: true
    dataQuality?: true
    analysisConfidence?: true
  }

  export type AiAnalysisAggregateMinAggregateInputType = {
    id?: true
    sessionId?: true
    examResultId?: true
    avgValence?: true
    avgArousal?: true
    dominantEmotion?: true
    avgAttention?: true
    attentionVariability?: true
    distractionEvents?: true
    engagementScore?: true
    consistencyScore?: true
    avgHeartRate?: true
    heartRateVariability?: true
    dataQuality?: true
    analysisConfidence?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiAnalysisAggregateMaxAggregateInputType = {
    id?: true
    sessionId?: true
    examResultId?: true
    avgValence?: true
    avgArousal?: true
    dominantEmotion?: true
    avgAttention?: true
    attentionVariability?: true
    distractionEvents?: true
    engagementScore?: true
    consistencyScore?: true
    avgHeartRate?: true
    heartRateVariability?: true
    dataQuality?: true
    analysisConfidence?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiAnalysisAggregateCountAggregateInputType = {
    id?: true
    sessionId?: true
    examResultId?: true
    avgValence?: true
    avgArousal?: true
    dominantEmotion?: true
    emotionDistribution?: true
    avgAttention?: true
    attentionVariability?: true
    distractionEvents?: true
    engagementScore?: true
    consistencyScore?: true
    avgHeartRate?: true
    heartRateVariability?: true
    stressIndicators?: true
    dataQuality?: true
    analysisConfidence?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AiAnalysisAggregateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiAnalysisAggregate to aggregate.
     */
    where?: AiAnalysisAggregateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiAnalysisAggregates to fetch.
     */
    orderBy?: AiAnalysisAggregateOrderByWithRelationInput | AiAnalysisAggregateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiAnalysisAggregateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiAnalysisAggregates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiAnalysisAggregates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiAnalysisAggregates
    **/
    _count?: true | AiAnalysisAggregateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AiAnalysisAggregateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AiAnalysisAggregateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiAnalysisAggregateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiAnalysisAggregateMaxAggregateInputType
  }

  export type GetAiAnalysisAggregateAggregateType<T extends AiAnalysisAggregateAggregateArgs> = {
        [P in keyof T & keyof AggregateAiAnalysisAggregate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiAnalysisAggregate[P]>
      : GetScalarType<T[P], AggregateAiAnalysisAggregate[P]>
  }




  export type AiAnalysisAggregateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiAnalysisAggregateWhereInput
    orderBy?: AiAnalysisAggregateOrderByWithAggregationInput | AiAnalysisAggregateOrderByWithAggregationInput[]
    by: AiAnalysisAggregateScalarFieldEnum[] | AiAnalysisAggregateScalarFieldEnum
    having?: AiAnalysisAggregateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiAnalysisAggregateCountAggregateInputType | true
    _avg?: AiAnalysisAggregateAvgAggregateInputType
    _sum?: AiAnalysisAggregateSumAggregateInputType
    _min?: AiAnalysisAggregateMinAggregateInputType
    _max?: AiAnalysisAggregateMaxAggregateInputType
  }

  export type AiAnalysisAggregateGroupByOutputType = {
    id: string
    sessionId: string
    examResultId: string
    avgValence: number | null
    avgArousal: number | null
    dominantEmotion: string | null
    emotionDistribution: JsonValue | null
    avgAttention: number | null
    attentionVariability: number | null
    distractionEvents: number
    engagementScore: number | null
    consistencyScore: number | null
    avgHeartRate: number | null
    heartRateVariability: number | null
    stressIndicators: JsonValue | null
    dataQuality: number
    analysisConfidence: number
    createdAt: Date
    updatedAt: Date
    _count: AiAnalysisAggregateCountAggregateOutputType | null
    _avg: AiAnalysisAggregateAvgAggregateOutputType | null
    _sum: AiAnalysisAggregateSumAggregateOutputType | null
    _min: AiAnalysisAggregateMinAggregateOutputType | null
    _max: AiAnalysisAggregateMaxAggregateOutputType | null
  }

  type GetAiAnalysisAggregateGroupByPayload<T extends AiAnalysisAggregateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiAnalysisAggregateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiAnalysisAggregateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiAnalysisAggregateGroupByOutputType[P]>
            : GetScalarType<T[P], AiAnalysisAggregateGroupByOutputType[P]>
        }
      >
    >


  export type AiAnalysisAggregateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    examResultId?: boolean
    avgValence?: boolean
    avgArousal?: boolean
    dominantEmotion?: boolean
    emotionDistribution?: boolean
    avgAttention?: boolean
    attentionVariability?: boolean
    distractionEvents?: boolean
    engagementScore?: boolean
    consistencyScore?: boolean
    avgHeartRate?: boolean
    heartRateVariability?: boolean
    stressIndicators?: boolean
    dataQuality?: boolean
    analysisConfidence?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    session?: boolean | AiSessionDefaultArgs<ExtArgs>
    examResult?: boolean | ExamResultDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiAnalysisAggregate"]>

  export type AiAnalysisAggregateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    examResultId?: boolean
    avgValence?: boolean
    avgArousal?: boolean
    dominantEmotion?: boolean
    emotionDistribution?: boolean
    avgAttention?: boolean
    attentionVariability?: boolean
    distractionEvents?: boolean
    engagementScore?: boolean
    consistencyScore?: boolean
    avgHeartRate?: boolean
    heartRateVariability?: boolean
    stressIndicators?: boolean
    dataQuality?: boolean
    analysisConfidence?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    session?: boolean | AiSessionDefaultArgs<ExtArgs>
    examResult?: boolean | ExamResultDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiAnalysisAggregate"]>

  export type AiAnalysisAggregateSelectScalar = {
    id?: boolean
    sessionId?: boolean
    examResultId?: boolean
    avgValence?: boolean
    avgArousal?: boolean
    dominantEmotion?: boolean
    emotionDistribution?: boolean
    avgAttention?: boolean
    attentionVariability?: boolean
    distractionEvents?: boolean
    engagementScore?: boolean
    consistencyScore?: boolean
    avgHeartRate?: boolean
    heartRateVariability?: boolean
    stressIndicators?: boolean
    dataQuality?: boolean
    analysisConfidence?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AiAnalysisAggregateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AiSessionDefaultArgs<ExtArgs>
    examResult?: boolean | ExamResultDefaultArgs<ExtArgs>
  }
  export type AiAnalysisAggregateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AiSessionDefaultArgs<ExtArgs>
    examResult?: boolean | ExamResultDefaultArgs<ExtArgs>
  }

  export type $AiAnalysisAggregatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiAnalysisAggregate"
    objects: {
      session: Prisma.$AiSessionPayload<ExtArgs>
      examResult: Prisma.$ExamResultPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      examResultId: string
      avgValence: number | null
      avgArousal: number | null
      dominantEmotion: string | null
      emotionDistribution: Prisma.JsonValue | null
      avgAttention: number | null
      attentionVariability: number | null
      distractionEvents: number
      engagementScore: number | null
      consistencyScore: number | null
      avgHeartRate: number | null
      heartRateVariability: number | null
      stressIndicators: Prisma.JsonValue | null
      dataQuality: number
      analysisConfidence: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aiAnalysisAggregate"]>
    composites: {}
  }

  type AiAnalysisAggregateGetPayload<S extends boolean | null | undefined | AiAnalysisAggregateDefaultArgs> = $Result.GetResult<Prisma.$AiAnalysisAggregatePayload, S>

  type AiAnalysisAggregateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AiAnalysisAggregateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AiAnalysisAggregateCountAggregateInputType | true
    }

  export interface AiAnalysisAggregateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiAnalysisAggregate'], meta: { name: 'AiAnalysisAggregate' } }
    /**
     * Find zero or one AiAnalysisAggregate that matches the filter.
     * @param {AiAnalysisAggregateFindUniqueArgs} args - Arguments to find a AiAnalysisAggregate
     * @example
     * // Get one AiAnalysisAggregate
     * const aiAnalysisAggregate = await prisma.aiAnalysisAggregate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiAnalysisAggregateFindUniqueArgs>(args: SelectSubset<T, AiAnalysisAggregateFindUniqueArgs<ExtArgs>>): Prisma__AiAnalysisAggregateClient<$Result.GetResult<Prisma.$AiAnalysisAggregatePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AiAnalysisAggregate that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AiAnalysisAggregateFindUniqueOrThrowArgs} args - Arguments to find a AiAnalysisAggregate
     * @example
     * // Get one AiAnalysisAggregate
     * const aiAnalysisAggregate = await prisma.aiAnalysisAggregate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiAnalysisAggregateFindUniqueOrThrowArgs>(args: SelectSubset<T, AiAnalysisAggregateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiAnalysisAggregateClient<$Result.GetResult<Prisma.$AiAnalysisAggregatePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AiAnalysisAggregate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiAnalysisAggregateFindFirstArgs} args - Arguments to find a AiAnalysisAggregate
     * @example
     * // Get one AiAnalysisAggregate
     * const aiAnalysisAggregate = await prisma.aiAnalysisAggregate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiAnalysisAggregateFindFirstArgs>(args?: SelectSubset<T, AiAnalysisAggregateFindFirstArgs<ExtArgs>>): Prisma__AiAnalysisAggregateClient<$Result.GetResult<Prisma.$AiAnalysisAggregatePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AiAnalysisAggregate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiAnalysisAggregateFindFirstOrThrowArgs} args - Arguments to find a AiAnalysisAggregate
     * @example
     * // Get one AiAnalysisAggregate
     * const aiAnalysisAggregate = await prisma.aiAnalysisAggregate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiAnalysisAggregateFindFirstOrThrowArgs>(args?: SelectSubset<T, AiAnalysisAggregateFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiAnalysisAggregateClient<$Result.GetResult<Prisma.$AiAnalysisAggregatePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AiAnalysisAggregates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiAnalysisAggregateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiAnalysisAggregates
     * const aiAnalysisAggregates = await prisma.aiAnalysisAggregate.findMany()
     * 
     * // Get first 10 AiAnalysisAggregates
     * const aiAnalysisAggregates = await prisma.aiAnalysisAggregate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiAnalysisAggregateWithIdOnly = await prisma.aiAnalysisAggregate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiAnalysisAggregateFindManyArgs>(args?: SelectSubset<T, AiAnalysisAggregateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiAnalysisAggregatePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AiAnalysisAggregate.
     * @param {AiAnalysisAggregateCreateArgs} args - Arguments to create a AiAnalysisAggregate.
     * @example
     * // Create one AiAnalysisAggregate
     * const AiAnalysisAggregate = await prisma.aiAnalysisAggregate.create({
     *   data: {
     *     // ... data to create a AiAnalysisAggregate
     *   }
     * })
     * 
     */
    create<T extends AiAnalysisAggregateCreateArgs>(args: SelectSubset<T, AiAnalysisAggregateCreateArgs<ExtArgs>>): Prisma__AiAnalysisAggregateClient<$Result.GetResult<Prisma.$AiAnalysisAggregatePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AiAnalysisAggregates.
     * @param {AiAnalysisAggregateCreateManyArgs} args - Arguments to create many AiAnalysisAggregates.
     * @example
     * // Create many AiAnalysisAggregates
     * const aiAnalysisAggregate = await prisma.aiAnalysisAggregate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiAnalysisAggregateCreateManyArgs>(args?: SelectSubset<T, AiAnalysisAggregateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiAnalysisAggregates and returns the data saved in the database.
     * @param {AiAnalysisAggregateCreateManyAndReturnArgs} args - Arguments to create many AiAnalysisAggregates.
     * @example
     * // Create many AiAnalysisAggregates
     * const aiAnalysisAggregate = await prisma.aiAnalysisAggregate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiAnalysisAggregates and only return the `id`
     * const aiAnalysisAggregateWithIdOnly = await prisma.aiAnalysisAggregate.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiAnalysisAggregateCreateManyAndReturnArgs>(args?: SelectSubset<T, AiAnalysisAggregateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiAnalysisAggregatePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AiAnalysisAggregate.
     * @param {AiAnalysisAggregateDeleteArgs} args - Arguments to delete one AiAnalysisAggregate.
     * @example
     * // Delete one AiAnalysisAggregate
     * const AiAnalysisAggregate = await prisma.aiAnalysisAggregate.delete({
     *   where: {
     *     // ... filter to delete one AiAnalysisAggregate
     *   }
     * })
     * 
     */
    delete<T extends AiAnalysisAggregateDeleteArgs>(args: SelectSubset<T, AiAnalysisAggregateDeleteArgs<ExtArgs>>): Prisma__AiAnalysisAggregateClient<$Result.GetResult<Prisma.$AiAnalysisAggregatePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AiAnalysisAggregate.
     * @param {AiAnalysisAggregateUpdateArgs} args - Arguments to update one AiAnalysisAggregate.
     * @example
     * // Update one AiAnalysisAggregate
     * const aiAnalysisAggregate = await prisma.aiAnalysisAggregate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiAnalysisAggregateUpdateArgs>(args: SelectSubset<T, AiAnalysisAggregateUpdateArgs<ExtArgs>>): Prisma__AiAnalysisAggregateClient<$Result.GetResult<Prisma.$AiAnalysisAggregatePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AiAnalysisAggregates.
     * @param {AiAnalysisAggregateDeleteManyArgs} args - Arguments to filter AiAnalysisAggregates to delete.
     * @example
     * // Delete a few AiAnalysisAggregates
     * const { count } = await prisma.aiAnalysisAggregate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiAnalysisAggregateDeleteManyArgs>(args?: SelectSubset<T, AiAnalysisAggregateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiAnalysisAggregates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiAnalysisAggregateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiAnalysisAggregates
     * const aiAnalysisAggregate = await prisma.aiAnalysisAggregate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiAnalysisAggregateUpdateManyArgs>(args: SelectSubset<T, AiAnalysisAggregateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AiAnalysisAggregate.
     * @param {AiAnalysisAggregateUpsertArgs} args - Arguments to update or create a AiAnalysisAggregate.
     * @example
     * // Update or create a AiAnalysisAggregate
     * const aiAnalysisAggregate = await prisma.aiAnalysisAggregate.upsert({
     *   create: {
     *     // ... data to create a AiAnalysisAggregate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiAnalysisAggregate we want to update
     *   }
     * })
     */
    upsert<T extends AiAnalysisAggregateUpsertArgs>(args: SelectSubset<T, AiAnalysisAggregateUpsertArgs<ExtArgs>>): Prisma__AiAnalysisAggregateClient<$Result.GetResult<Prisma.$AiAnalysisAggregatePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AiAnalysisAggregates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiAnalysisAggregateCountArgs} args - Arguments to filter AiAnalysisAggregates to count.
     * @example
     * // Count the number of AiAnalysisAggregates
     * const count = await prisma.aiAnalysisAggregate.count({
     *   where: {
     *     // ... the filter for the AiAnalysisAggregates we want to count
     *   }
     * })
    **/
    count<T extends AiAnalysisAggregateCountArgs>(
      args?: Subset<T, AiAnalysisAggregateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiAnalysisAggregateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiAnalysisAggregate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiAnalysisAggregateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiAnalysisAggregateAggregateArgs>(args: Subset<T, AiAnalysisAggregateAggregateArgs>): Prisma.PrismaPromise<GetAiAnalysisAggregateAggregateType<T>>

    /**
     * Group by AiAnalysisAggregate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiAnalysisAggregateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiAnalysisAggregateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiAnalysisAggregateGroupByArgs['orderBy'] }
        : { orderBy?: AiAnalysisAggregateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiAnalysisAggregateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiAnalysisAggregateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiAnalysisAggregate model
   */
  readonly fields: AiAnalysisAggregateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiAnalysisAggregate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiAnalysisAggregateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends AiSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AiSessionDefaultArgs<ExtArgs>>): Prisma__AiSessionClient<$Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    examResult<T extends ExamResultDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExamResultDefaultArgs<ExtArgs>>): Prisma__ExamResultClient<$Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiAnalysisAggregate model
   */ 
  interface AiAnalysisAggregateFieldRefs {
    readonly id: FieldRef<"AiAnalysisAggregate", 'String'>
    readonly sessionId: FieldRef<"AiAnalysisAggregate", 'String'>
    readonly examResultId: FieldRef<"AiAnalysisAggregate", 'String'>
    readonly avgValence: FieldRef<"AiAnalysisAggregate", 'Float'>
    readonly avgArousal: FieldRef<"AiAnalysisAggregate", 'Float'>
    readonly dominantEmotion: FieldRef<"AiAnalysisAggregate", 'String'>
    readonly emotionDistribution: FieldRef<"AiAnalysisAggregate", 'Json'>
    readonly avgAttention: FieldRef<"AiAnalysisAggregate", 'Float'>
    readonly attentionVariability: FieldRef<"AiAnalysisAggregate", 'Float'>
    readonly distractionEvents: FieldRef<"AiAnalysisAggregate", 'Int'>
    readonly engagementScore: FieldRef<"AiAnalysisAggregate", 'Float'>
    readonly consistencyScore: FieldRef<"AiAnalysisAggregate", 'Float'>
    readonly avgHeartRate: FieldRef<"AiAnalysisAggregate", 'Float'>
    readonly heartRateVariability: FieldRef<"AiAnalysisAggregate", 'Float'>
    readonly stressIndicators: FieldRef<"AiAnalysisAggregate", 'Json'>
    readonly dataQuality: FieldRef<"AiAnalysisAggregate", 'Float'>
    readonly analysisConfidence: FieldRef<"AiAnalysisAggregate", 'Float'>
    readonly createdAt: FieldRef<"AiAnalysisAggregate", 'DateTime'>
    readonly updatedAt: FieldRef<"AiAnalysisAggregate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiAnalysisAggregate findUnique
   */
  export type AiAnalysisAggregateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnalysisAggregate
     */
    select?: AiAnalysisAggregateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnalysisAggregateInclude<ExtArgs> | null
    /**
     * Filter, which AiAnalysisAggregate to fetch.
     */
    where: AiAnalysisAggregateWhereUniqueInput
  }

  /**
   * AiAnalysisAggregate findUniqueOrThrow
   */
  export type AiAnalysisAggregateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnalysisAggregate
     */
    select?: AiAnalysisAggregateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnalysisAggregateInclude<ExtArgs> | null
    /**
     * Filter, which AiAnalysisAggregate to fetch.
     */
    where: AiAnalysisAggregateWhereUniqueInput
  }

  /**
   * AiAnalysisAggregate findFirst
   */
  export type AiAnalysisAggregateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnalysisAggregate
     */
    select?: AiAnalysisAggregateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnalysisAggregateInclude<ExtArgs> | null
    /**
     * Filter, which AiAnalysisAggregate to fetch.
     */
    where?: AiAnalysisAggregateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiAnalysisAggregates to fetch.
     */
    orderBy?: AiAnalysisAggregateOrderByWithRelationInput | AiAnalysisAggregateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiAnalysisAggregates.
     */
    cursor?: AiAnalysisAggregateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiAnalysisAggregates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiAnalysisAggregates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiAnalysisAggregates.
     */
    distinct?: AiAnalysisAggregateScalarFieldEnum | AiAnalysisAggregateScalarFieldEnum[]
  }

  /**
   * AiAnalysisAggregate findFirstOrThrow
   */
  export type AiAnalysisAggregateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnalysisAggregate
     */
    select?: AiAnalysisAggregateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnalysisAggregateInclude<ExtArgs> | null
    /**
     * Filter, which AiAnalysisAggregate to fetch.
     */
    where?: AiAnalysisAggregateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiAnalysisAggregates to fetch.
     */
    orderBy?: AiAnalysisAggregateOrderByWithRelationInput | AiAnalysisAggregateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiAnalysisAggregates.
     */
    cursor?: AiAnalysisAggregateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiAnalysisAggregates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiAnalysisAggregates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiAnalysisAggregates.
     */
    distinct?: AiAnalysisAggregateScalarFieldEnum | AiAnalysisAggregateScalarFieldEnum[]
  }

  /**
   * AiAnalysisAggregate findMany
   */
  export type AiAnalysisAggregateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnalysisAggregate
     */
    select?: AiAnalysisAggregateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnalysisAggregateInclude<ExtArgs> | null
    /**
     * Filter, which AiAnalysisAggregates to fetch.
     */
    where?: AiAnalysisAggregateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiAnalysisAggregates to fetch.
     */
    orderBy?: AiAnalysisAggregateOrderByWithRelationInput | AiAnalysisAggregateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiAnalysisAggregates.
     */
    cursor?: AiAnalysisAggregateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiAnalysisAggregates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiAnalysisAggregates.
     */
    skip?: number
    distinct?: AiAnalysisAggregateScalarFieldEnum | AiAnalysisAggregateScalarFieldEnum[]
  }

  /**
   * AiAnalysisAggregate create
   */
  export type AiAnalysisAggregateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnalysisAggregate
     */
    select?: AiAnalysisAggregateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnalysisAggregateInclude<ExtArgs> | null
    /**
     * The data needed to create a AiAnalysisAggregate.
     */
    data: XOR<AiAnalysisAggregateCreateInput, AiAnalysisAggregateUncheckedCreateInput>
  }

  /**
   * AiAnalysisAggregate createMany
   */
  export type AiAnalysisAggregateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiAnalysisAggregates.
     */
    data: AiAnalysisAggregateCreateManyInput | AiAnalysisAggregateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiAnalysisAggregate createManyAndReturn
   */
  export type AiAnalysisAggregateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnalysisAggregate
     */
    select?: AiAnalysisAggregateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AiAnalysisAggregates.
     */
    data: AiAnalysisAggregateCreateManyInput | AiAnalysisAggregateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnalysisAggregateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AiAnalysisAggregate update
   */
  export type AiAnalysisAggregateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnalysisAggregate
     */
    select?: AiAnalysisAggregateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnalysisAggregateInclude<ExtArgs> | null
    /**
     * The data needed to update a AiAnalysisAggregate.
     */
    data: XOR<AiAnalysisAggregateUpdateInput, AiAnalysisAggregateUncheckedUpdateInput>
    /**
     * Choose, which AiAnalysisAggregate to update.
     */
    where: AiAnalysisAggregateWhereUniqueInput
  }

  /**
   * AiAnalysisAggregate updateMany
   */
  export type AiAnalysisAggregateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiAnalysisAggregates.
     */
    data: XOR<AiAnalysisAggregateUpdateManyMutationInput, AiAnalysisAggregateUncheckedUpdateManyInput>
    /**
     * Filter which AiAnalysisAggregates to update
     */
    where?: AiAnalysisAggregateWhereInput
  }

  /**
   * AiAnalysisAggregate upsert
   */
  export type AiAnalysisAggregateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnalysisAggregate
     */
    select?: AiAnalysisAggregateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnalysisAggregateInclude<ExtArgs> | null
    /**
     * The filter to search for the AiAnalysisAggregate to update in case it exists.
     */
    where: AiAnalysisAggregateWhereUniqueInput
    /**
     * In case the AiAnalysisAggregate found by the `where` argument doesn't exist, create a new AiAnalysisAggregate with this data.
     */
    create: XOR<AiAnalysisAggregateCreateInput, AiAnalysisAggregateUncheckedCreateInput>
    /**
     * In case the AiAnalysisAggregate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiAnalysisAggregateUpdateInput, AiAnalysisAggregateUncheckedUpdateInput>
  }

  /**
   * AiAnalysisAggregate delete
   */
  export type AiAnalysisAggregateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnalysisAggregate
     */
    select?: AiAnalysisAggregateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnalysisAggregateInclude<ExtArgs> | null
    /**
     * Filter which AiAnalysisAggregate to delete.
     */
    where: AiAnalysisAggregateWhereUniqueInput
  }

  /**
   * AiAnalysisAggregate deleteMany
   */
  export type AiAnalysisAggregateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiAnalysisAggregates to delete
     */
    where?: AiAnalysisAggregateWhereInput
  }

  /**
   * AiAnalysisAggregate without action
   */
  export type AiAnalysisAggregateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnalysisAggregate
     */
    select?: AiAnalysisAggregateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnalysisAggregateInclude<ExtArgs> | null
  }


  /**
   * Model AiAnomaly
   */

  export type AggregateAiAnomaly = {
    _count: AiAnomalyCountAggregateOutputType | null
    _avg: AiAnomalyAvgAggregateOutputType | null
    _sum: AiAnomalySumAggregateOutputType | null
    _min: AiAnomalyMinAggregateOutputType | null
    _max: AiAnomalyMaxAggregateOutputType | null
  }

  export type AiAnomalyAvgAggregateOutputType = {
    duration: number | null
    confidence: number | null
  }

  export type AiAnomalySumAggregateOutputType = {
    duration: number | null
    confidence: number | null
  }

  export type AiAnomalyMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    type: $Enums.AnomalyType | null
    severity: $Enums.AnomalySeverity | null
    timestamp: Date | null
    duration: number | null
    confidence: number | null
    description: string | null
    createdAt: Date | null
  }

  export type AiAnomalyMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    type: $Enums.AnomalyType | null
    severity: $Enums.AnomalySeverity | null
    timestamp: Date | null
    duration: number | null
    confidence: number | null
    description: string | null
    createdAt: Date | null
  }

  export type AiAnomalyCountAggregateOutputType = {
    id: number
    sessionId: number
    type: number
    severity: number
    timestamp: number
    duration: number
    confidence: number
    description: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type AiAnomalyAvgAggregateInputType = {
    duration?: true
    confidence?: true
  }

  export type AiAnomalySumAggregateInputType = {
    duration?: true
    confidence?: true
  }

  export type AiAnomalyMinAggregateInputType = {
    id?: true
    sessionId?: true
    type?: true
    severity?: true
    timestamp?: true
    duration?: true
    confidence?: true
    description?: true
    createdAt?: true
  }

  export type AiAnomalyMaxAggregateInputType = {
    id?: true
    sessionId?: true
    type?: true
    severity?: true
    timestamp?: true
    duration?: true
    confidence?: true
    description?: true
    createdAt?: true
  }

  export type AiAnomalyCountAggregateInputType = {
    id?: true
    sessionId?: true
    type?: true
    severity?: true
    timestamp?: true
    duration?: true
    confidence?: true
    description?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type AiAnomalyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiAnomaly to aggregate.
     */
    where?: AiAnomalyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiAnomalies to fetch.
     */
    orderBy?: AiAnomalyOrderByWithRelationInput | AiAnomalyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiAnomalyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiAnomalies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiAnomalies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiAnomalies
    **/
    _count?: true | AiAnomalyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AiAnomalyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AiAnomalySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiAnomalyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiAnomalyMaxAggregateInputType
  }

  export type GetAiAnomalyAggregateType<T extends AiAnomalyAggregateArgs> = {
        [P in keyof T & keyof AggregateAiAnomaly]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiAnomaly[P]>
      : GetScalarType<T[P], AggregateAiAnomaly[P]>
  }




  export type AiAnomalyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiAnomalyWhereInput
    orderBy?: AiAnomalyOrderByWithAggregationInput | AiAnomalyOrderByWithAggregationInput[]
    by: AiAnomalyScalarFieldEnum[] | AiAnomalyScalarFieldEnum
    having?: AiAnomalyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiAnomalyCountAggregateInputType | true
    _avg?: AiAnomalyAvgAggregateInputType
    _sum?: AiAnomalySumAggregateInputType
    _min?: AiAnomalyMinAggregateInputType
    _max?: AiAnomalyMaxAggregateInputType
  }

  export type AiAnomalyGroupByOutputType = {
    id: string
    sessionId: string
    type: $Enums.AnomalyType
    severity: $Enums.AnomalySeverity
    timestamp: Date
    duration: number | null
    confidence: number
    description: string
    metadata: JsonValue | null
    createdAt: Date
    _count: AiAnomalyCountAggregateOutputType | null
    _avg: AiAnomalyAvgAggregateOutputType | null
    _sum: AiAnomalySumAggregateOutputType | null
    _min: AiAnomalyMinAggregateOutputType | null
    _max: AiAnomalyMaxAggregateOutputType | null
  }

  type GetAiAnomalyGroupByPayload<T extends AiAnomalyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiAnomalyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiAnomalyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiAnomalyGroupByOutputType[P]>
            : GetScalarType<T[P], AiAnomalyGroupByOutputType[P]>
        }
      >
    >


  export type AiAnomalySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    type?: boolean
    severity?: boolean
    timestamp?: boolean
    duration?: boolean
    confidence?: boolean
    description?: boolean
    metadata?: boolean
    createdAt?: boolean
    session?: boolean | AiSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiAnomaly"]>

  export type AiAnomalySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    type?: boolean
    severity?: boolean
    timestamp?: boolean
    duration?: boolean
    confidence?: boolean
    description?: boolean
    metadata?: boolean
    createdAt?: boolean
    session?: boolean | AiSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiAnomaly"]>

  export type AiAnomalySelectScalar = {
    id?: boolean
    sessionId?: boolean
    type?: boolean
    severity?: boolean
    timestamp?: boolean
    duration?: boolean
    confidence?: boolean
    description?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type AiAnomalyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AiSessionDefaultArgs<ExtArgs>
  }
  export type AiAnomalyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AiSessionDefaultArgs<ExtArgs>
  }

  export type $AiAnomalyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiAnomaly"
    objects: {
      session: Prisma.$AiSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      type: $Enums.AnomalyType
      severity: $Enums.AnomalySeverity
      timestamp: Date
      duration: number | null
      confidence: number
      description: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["aiAnomaly"]>
    composites: {}
  }

  type AiAnomalyGetPayload<S extends boolean | null | undefined | AiAnomalyDefaultArgs> = $Result.GetResult<Prisma.$AiAnomalyPayload, S>

  type AiAnomalyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AiAnomalyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AiAnomalyCountAggregateInputType | true
    }

  export interface AiAnomalyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiAnomaly'], meta: { name: 'AiAnomaly' } }
    /**
     * Find zero or one AiAnomaly that matches the filter.
     * @param {AiAnomalyFindUniqueArgs} args - Arguments to find a AiAnomaly
     * @example
     * // Get one AiAnomaly
     * const aiAnomaly = await prisma.aiAnomaly.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiAnomalyFindUniqueArgs>(args: SelectSubset<T, AiAnomalyFindUniqueArgs<ExtArgs>>): Prisma__AiAnomalyClient<$Result.GetResult<Prisma.$AiAnomalyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AiAnomaly that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AiAnomalyFindUniqueOrThrowArgs} args - Arguments to find a AiAnomaly
     * @example
     * // Get one AiAnomaly
     * const aiAnomaly = await prisma.aiAnomaly.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiAnomalyFindUniqueOrThrowArgs>(args: SelectSubset<T, AiAnomalyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiAnomalyClient<$Result.GetResult<Prisma.$AiAnomalyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AiAnomaly that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiAnomalyFindFirstArgs} args - Arguments to find a AiAnomaly
     * @example
     * // Get one AiAnomaly
     * const aiAnomaly = await prisma.aiAnomaly.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiAnomalyFindFirstArgs>(args?: SelectSubset<T, AiAnomalyFindFirstArgs<ExtArgs>>): Prisma__AiAnomalyClient<$Result.GetResult<Prisma.$AiAnomalyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AiAnomaly that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiAnomalyFindFirstOrThrowArgs} args - Arguments to find a AiAnomaly
     * @example
     * // Get one AiAnomaly
     * const aiAnomaly = await prisma.aiAnomaly.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiAnomalyFindFirstOrThrowArgs>(args?: SelectSubset<T, AiAnomalyFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiAnomalyClient<$Result.GetResult<Prisma.$AiAnomalyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AiAnomalies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiAnomalyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiAnomalies
     * const aiAnomalies = await prisma.aiAnomaly.findMany()
     * 
     * // Get first 10 AiAnomalies
     * const aiAnomalies = await prisma.aiAnomaly.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiAnomalyWithIdOnly = await prisma.aiAnomaly.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiAnomalyFindManyArgs>(args?: SelectSubset<T, AiAnomalyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiAnomalyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AiAnomaly.
     * @param {AiAnomalyCreateArgs} args - Arguments to create a AiAnomaly.
     * @example
     * // Create one AiAnomaly
     * const AiAnomaly = await prisma.aiAnomaly.create({
     *   data: {
     *     // ... data to create a AiAnomaly
     *   }
     * })
     * 
     */
    create<T extends AiAnomalyCreateArgs>(args: SelectSubset<T, AiAnomalyCreateArgs<ExtArgs>>): Prisma__AiAnomalyClient<$Result.GetResult<Prisma.$AiAnomalyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AiAnomalies.
     * @param {AiAnomalyCreateManyArgs} args - Arguments to create many AiAnomalies.
     * @example
     * // Create many AiAnomalies
     * const aiAnomaly = await prisma.aiAnomaly.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiAnomalyCreateManyArgs>(args?: SelectSubset<T, AiAnomalyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiAnomalies and returns the data saved in the database.
     * @param {AiAnomalyCreateManyAndReturnArgs} args - Arguments to create many AiAnomalies.
     * @example
     * // Create many AiAnomalies
     * const aiAnomaly = await prisma.aiAnomaly.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiAnomalies and only return the `id`
     * const aiAnomalyWithIdOnly = await prisma.aiAnomaly.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiAnomalyCreateManyAndReturnArgs>(args?: SelectSubset<T, AiAnomalyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiAnomalyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AiAnomaly.
     * @param {AiAnomalyDeleteArgs} args - Arguments to delete one AiAnomaly.
     * @example
     * // Delete one AiAnomaly
     * const AiAnomaly = await prisma.aiAnomaly.delete({
     *   where: {
     *     // ... filter to delete one AiAnomaly
     *   }
     * })
     * 
     */
    delete<T extends AiAnomalyDeleteArgs>(args: SelectSubset<T, AiAnomalyDeleteArgs<ExtArgs>>): Prisma__AiAnomalyClient<$Result.GetResult<Prisma.$AiAnomalyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AiAnomaly.
     * @param {AiAnomalyUpdateArgs} args - Arguments to update one AiAnomaly.
     * @example
     * // Update one AiAnomaly
     * const aiAnomaly = await prisma.aiAnomaly.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiAnomalyUpdateArgs>(args: SelectSubset<T, AiAnomalyUpdateArgs<ExtArgs>>): Prisma__AiAnomalyClient<$Result.GetResult<Prisma.$AiAnomalyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AiAnomalies.
     * @param {AiAnomalyDeleteManyArgs} args - Arguments to filter AiAnomalies to delete.
     * @example
     * // Delete a few AiAnomalies
     * const { count } = await prisma.aiAnomaly.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiAnomalyDeleteManyArgs>(args?: SelectSubset<T, AiAnomalyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiAnomalies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiAnomalyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiAnomalies
     * const aiAnomaly = await prisma.aiAnomaly.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiAnomalyUpdateManyArgs>(args: SelectSubset<T, AiAnomalyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AiAnomaly.
     * @param {AiAnomalyUpsertArgs} args - Arguments to update or create a AiAnomaly.
     * @example
     * // Update or create a AiAnomaly
     * const aiAnomaly = await prisma.aiAnomaly.upsert({
     *   create: {
     *     // ... data to create a AiAnomaly
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiAnomaly we want to update
     *   }
     * })
     */
    upsert<T extends AiAnomalyUpsertArgs>(args: SelectSubset<T, AiAnomalyUpsertArgs<ExtArgs>>): Prisma__AiAnomalyClient<$Result.GetResult<Prisma.$AiAnomalyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AiAnomalies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiAnomalyCountArgs} args - Arguments to filter AiAnomalies to count.
     * @example
     * // Count the number of AiAnomalies
     * const count = await prisma.aiAnomaly.count({
     *   where: {
     *     // ... the filter for the AiAnomalies we want to count
     *   }
     * })
    **/
    count<T extends AiAnomalyCountArgs>(
      args?: Subset<T, AiAnomalyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiAnomalyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiAnomaly.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiAnomalyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiAnomalyAggregateArgs>(args: Subset<T, AiAnomalyAggregateArgs>): Prisma.PrismaPromise<GetAiAnomalyAggregateType<T>>

    /**
     * Group by AiAnomaly.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiAnomalyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiAnomalyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiAnomalyGroupByArgs['orderBy'] }
        : { orderBy?: AiAnomalyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiAnomalyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiAnomalyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiAnomaly model
   */
  readonly fields: AiAnomalyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiAnomaly.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiAnomalyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends AiSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AiSessionDefaultArgs<ExtArgs>>): Prisma__AiSessionClient<$Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiAnomaly model
   */ 
  interface AiAnomalyFieldRefs {
    readonly id: FieldRef<"AiAnomaly", 'String'>
    readonly sessionId: FieldRef<"AiAnomaly", 'String'>
    readonly type: FieldRef<"AiAnomaly", 'AnomalyType'>
    readonly severity: FieldRef<"AiAnomaly", 'AnomalySeverity'>
    readonly timestamp: FieldRef<"AiAnomaly", 'DateTime'>
    readonly duration: FieldRef<"AiAnomaly", 'Int'>
    readonly confidence: FieldRef<"AiAnomaly", 'Float'>
    readonly description: FieldRef<"AiAnomaly", 'String'>
    readonly metadata: FieldRef<"AiAnomaly", 'Json'>
    readonly createdAt: FieldRef<"AiAnomaly", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiAnomaly findUnique
   */
  export type AiAnomalyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnomaly
     */
    select?: AiAnomalySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnomalyInclude<ExtArgs> | null
    /**
     * Filter, which AiAnomaly to fetch.
     */
    where: AiAnomalyWhereUniqueInput
  }

  /**
   * AiAnomaly findUniqueOrThrow
   */
  export type AiAnomalyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnomaly
     */
    select?: AiAnomalySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnomalyInclude<ExtArgs> | null
    /**
     * Filter, which AiAnomaly to fetch.
     */
    where: AiAnomalyWhereUniqueInput
  }

  /**
   * AiAnomaly findFirst
   */
  export type AiAnomalyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnomaly
     */
    select?: AiAnomalySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnomalyInclude<ExtArgs> | null
    /**
     * Filter, which AiAnomaly to fetch.
     */
    where?: AiAnomalyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiAnomalies to fetch.
     */
    orderBy?: AiAnomalyOrderByWithRelationInput | AiAnomalyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiAnomalies.
     */
    cursor?: AiAnomalyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiAnomalies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiAnomalies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiAnomalies.
     */
    distinct?: AiAnomalyScalarFieldEnum | AiAnomalyScalarFieldEnum[]
  }

  /**
   * AiAnomaly findFirstOrThrow
   */
  export type AiAnomalyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnomaly
     */
    select?: AiAnomalySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnomalyInclude<ExtArgs> | null
    /**
     * Filter, which AiAnomaly to fetch.
     */
    where?: AiAnomalyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiAnomalies to fetch.
     */
    orderBy?: AiAnomalyOrderByWithRelationInput | AiAnomalyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiAnomalies.
     */
    cursor?: AiAnomalyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiAnomalies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiAnomalies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiAnomalies.
     */
    distinct?: AiAnomalyScalarFieldEnum | AiAnomalyScalarFieldEnum[]
  }

  /**
   * AiAnomaly findMany
   */
  export type AiAnomalyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnomaly
     */
    select?: AiAnomalySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnomalyInclude<ExtArgs> | null
    /**
     * Filter, which AiAnomalies to fetch.
     */
    where?: AiAnomalyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiAnomalies to fetch.
     */
    orderBy?: AiAnomalyOrderByWithRelationInput | AiAnomalyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiAnomalies.
     */
    cursor?: AiAnomalyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiAnomalies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiAnomalies.
     */
    skip?: number
    distinct?: AiAnomalyScalarFieldEnum | AiAnomalyScalarFieldEnum[]
  }

  /**
   * AiAnomaly create
   */
  export type AiAnomalyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnomaly
     */
    select?: AiAnomalySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnomalyInclude<ExtArgs> | null
    /**
     * The data needed to create a AiAnomaly.
     */
    data: XOR<AiAnomalyCreateInput, AiAnomalyUncheckedCreateInput>
  }

  /**
   * AiAnomaly createMany
   */
  export type AiAnomalyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiAnomalies.
     */
    data: AiAnomalyCreateManyInput | AiAnomalyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiAnomaly createManyAndReturn
   */
  export type AiAnomalyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnomaly
     */
    select?: AiAnomalySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AiAnomalies.
     */
    data: AiAnomalyCreateManyInput | AiAnomalyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnomalyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AiAnomaly update
   */
  export type AiAnomalyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnomaly
     */
    select?: AiAnomalySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnomalyInclude<ExtArgs> | null
    /**
     * The data needed to update a AiAnomaly.
     */
    data: XOR<AiAnomalyUpdateInput, AiAnomalyUncheckedUpdateInput>
    /**
     * Choose, which AiAnomaly to update.
     */
    where: AiAnomalyWhereUniqueInput
  }

  /**
   * AiAnomaly updateMany
   */
  export type AiAnomalyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiAnomalies.
     */
    data: XOR<AiAnomalyUpdateManyMutationInput, AiAnomalyUncheckedUpdateManyInput>
    /**
     * Filter which AiAnomalies to update
     */
    where?: AiAnomalyWhereInput
  }

  /**
   * AiAnomaly upsert
   */
  export type AiAnomalyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnomaly
     */
    select?: AiAnomalySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnomalyInclude<ExtArgs> | null
    /**
     * The filter to search for the AiAnomaly to update in case it exists.
     */
    where: AiAnomalyWhereUniqueInput
    /**
     * In case the AiAnomaly found by the `where` argument doesn't exist, create a new AiAnomaly with this data.
     */
    create: XOR<AiAnomalyCreateInput, AiAnomalyUncheckedCreateInput>
    /**
     * In case the AiAnomaly was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiAnomalyUpdateInput, AiAnomalyUncheckedUpdateInput>
  }

  /**
   * AiAnomaly delete
   */
  export type AiAnomalyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnomaly
     */
    select?: AiAnomalySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnomalyInclude<ExtArgs> | null
    /**
     * Filter which AiAnomaly to delete.
     */
    where: AiAnomalyWhereUniqueInput
  }

  /**
   * AiAnomaly deleteMany
   */
  export type AiAnomalyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiAnomalies to delete
     */
    where?: AiAnomalyWhereInput
  }

  /**
   * AiAnomaly without action
   */
  export type AiAnomalyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiAnomaly
     */
    select?: AiAnomalySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiAnomalyInclude<ExtArgs> | null
  }


  /**
   * Model AiCheckpoint
   */

  export type AggregateAiCheckpoint = {
    _count: AiCheckpointCountAggregateOutputType | null
    _min: AiCheckpointMinAggregateOutputType | null
    _max: AiCheckpointMaxAggregateOutputType | null
  }

  export type AiCheckpointMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    timestamp: Date | null
    eventType: $Enums.CheckpointType | null
  }

  export type AiCheckpointMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    timestamp: Date | null
    eventType: $Enums.CheckpointType | null
  }

  export type AiCheckpointCountAggregateOutputType = {
    id: number
    sessionId: number
    timestamp: number
    eventType: number
    metadata: number
    _all: number
  }


  export type AiCheckpointMinAggregateInputType = {
    id?: true
    sessionId?: true
    timestamp?: true
    eventType?: true
  }

  export type AiCheckpointMaxAggregateInputType = {
    id?: true
    sessionId?: true
    timestamp?: true
    eventType?: true
  }

  export type AiCheckpointCountAggregateInputType = {
    id?: true
    sessionId?: true
    timestamp?: true
    eventType?: true
    metadata?: true
    _all?: true
  }

  export type AiCheckpointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiCheckpoint to aggregate.
     */
    where?: AiCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiCheckpoints to fetch.
     */
    orderBy?: AiCheckpointOrderByWithRelationInput | AiCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiCheckpoints
    **/
    _count?: true | AiCheckpointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiCheckpointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiCheckpointMaxAggregateInputType
  }

  export type GetAiCheckpointAggregateType<T extends AiCheckpointAggregateArgs> = {
        [P in keyof T & keyof AggregateAiCheckpoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiCheckpoint[P]>
      : GetScalarType<T[P], AggregateAiCheckpoint[P]>
  }




  export type AiCheckpointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiCheckpointWhereInput
    orderBy?: AiCheckpointOrderByWithAggregationInput | AiCheckpointOrderByWithAggregationInput[]
    by: AiCheckpointScalarFieldEnum[] | AiCheckpointScalarFieldEnum
    having?: AiCheckpointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiCheckpointCountAggregateInputType | true
    _min?: AiCheckpointMinAggregateInputType
    _max?: AiCheckpointMaxAggregateInputType
  }

  export type AiCheckpointGroupByOutputType = {
    id: string
    sessionId: string
    timestamp: Date
    eventType: $Enums.CheckpointType
    metadata: JsonValue | null
    _count: AiCheckpointCountAggregateOutputType | null
    _min: AiCheckpointMinAggregateOutputType | null
    _max: AiCheckpointMaxAggregateOutputType | null
  }

  type GetAiCheckpointGroupByPayload<T extends AiCheckpointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiCheckpointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiCheckpointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiCheckpointGroupByOutputType[P]>
            : GetScalarType<T[P], AiCheckpointGroupByOutputType[P]>
        }
      >
    >


  export type AiCheckpointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    timestamp?: boolean
    eventType?: boolean
    metadata?: boolean
    session?: boolean | AiSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiCheckpoint"]>

  export type AiCheckpointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    timestamp?: boolean
    eventType?: boolean
    metadata?: boolean
    session?: boolean | AiSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiCheckpoint"]>

  export type AiCheckpointSelectScalar = {
    id?: boolean
    sessionId?: boolean
    timestamp?: boolean
    eventType?: boolean
    metadata?: boolean
  }

  export type AiCheckpointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AiSessionDefaultArgs<ExtArgs>
  }
  export type AiCheckpointIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AiSessionDefaultArgs<ExtArgs>
  }

  export type $AiCheckpointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiCheckpoint"
    objects: {
      session: Prisma.$AiSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      timestamp: Date
      eventType: $Enums.CheckpointType
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["aiCheckpoint"]>
    composites: {}
  }

  type AiCheckpointGetPayload<S extends boolean | null | undefined | AiCheckpointDefaultArgs> = $Result.GetResult<Prisma.$AiCheckpointPayload, S>

  type AiCheckpointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AiCheckpointFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AiCheckpointCountAggregateInputType | true
    }

  export interface AiCheckpointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiCheckpoint'], meta: { name: 'AiCheckpoint' } }
    /**
     * Find zero or one AiCheckpoint that matches the filter.
     * @param {AiCheckpointFindUniqueArgs} args - Arguments to find a AiCheckpoint
     * @example
     * // Get one AiCheckpoint
     * const aiCheckpoint = await prisma.aiCheckpoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiCheckpointFindUniqueArgs>(args: SelectSubset<T, AiCheckpointFindUniqueArgs<ExtArgs>>): Prisma__AiCheckpointClient<$Result.GetResult<Prisma.$AiCheckpointPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AiCheckpoint that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AiCheckpointFindUniqueOrThrowArgs} args - Arguments to find a AiCheckpoint
     * @example
     * // Get one AiCheckpoint
     * const aiCheckpoint = await prisma.aiCheckpoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiCheckpointFindUniqueOrThrowArgs>(args: SelectSubset<T, AiCheckpointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiCheckpointClient<$Result.GetResult<Prisma.$AiCheckpointPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AiCheckpoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiCheckpointFindFirstArgs} args - Arguments to find a AiCheckpoint
     * @example
     * // Get one AiCheckpoint
     * const aiCheckpoint = await prisma.aiCheckpoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiCheckpointFindFirstArgs>(args?: SelectSubset<T, AiCheckpointFindFirstArgs<ExtArgs>>): Prisma__AiCheckpointClient<$Result.GetResult<Prisma.$AiCheckpointPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AiCheckpoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiCheckpointFindFirstOrThrowArgs} args - Arguments to find a AiCheckpoint
     * @example
     * // Get one AiCheckpoint
     * const aiCheckpoint = await prisma.aiCheckpoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiCheckpointFindFirstOrThrowArgs>(args?: SelectSubset<T, AiCheckpointFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiCheckpointClient<$Result.GetResult<Prisma.$AiCheckpointPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AiCheckpoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiCheckpointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiCheckpoints
     * const aiCheckpoints = await prisma.aiCheckpoint.findMany()
     * 
     * // Get first 10 AiCheckpoints
     * const aiCheckpoints = await prisma.aiCheckpoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiCheckpointWithIdOnly = await prisma.aiCheckpoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiCheckpointFindManyArgs>(args?: SelectSubset<T, AiCheckpointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiCheckpointPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AiCheckpoint.
     * @param {AiCheckpointCreateArgs} args - Arguments to create a AiCheckpoint.
     * @example
     * // Create one AiCheckpoint
     * const AiCheckpoint = await prisma.aiCheckpoint.create({
     *   data: {
     *     // ... data to create a AiCheckpoint
     *   }
     * })
     * 
     */
    create<T extends AiCheckpointCreateArgs>(args: SelectSubset<T, AiCheckpointCreateArgs<ExtArgs>>): Prisma__AiCheckpointClient<$Result.GetResult<Prisma.$AiCheckpointPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AiCheckpoints.
     * @param {AiCheckpointCreateManyArgs} args - Arguments to create many AiCheckpoints.
     * @example
     * // Create many AiCheckpoints
     * const aiCheckpoint = await prisma.aiCheckpoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiCheckpointCreateManyArgs>(args?: SelectSubset<T, AiCheckpointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiCheckpoints and returns the data saved in the database.
     * @param {AiCheckpointCreateManyAndReturnArgs} args - Arguments to create many AiCheckpoints.
     * @example
     * // Create many AiCheckpoints
     * const aiCheckpoint = await prisma.aiCheckpoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiCheckpoints and only return the `id`
     * const aiCheckpointWithIdOnly = await prisma.aiCheckpoint.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiCheckpointCreateManyAndReturnArgs>(args?: SelectSubset<T, AiCheckpointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiCheckpointPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AiCheckpoint.
     * @param {AiCheckpointDeleteArgs} args - Arguments to delete one AiCheckpoint.
     * @example
     * // Delete one AiCheckpoint
     * const AiCheckpoint = await prisma.aiCheckpoint.delete({
     *   where: {
     *     // ... filter to delete one AiCheckpoint
     *   }
     * })
     * 
     */
    delete<T extends AiCheckpointDeleteArgs>(args: SelectSubset<T, AiCheckpointDeleteArgs<ExtArgs>>): Prisma__AiCheckpointClient<$Result.GetResult<Prisma.$AiCheckpointPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AiCheckpoint.
     * @param {AiCheckpointUpdateArgs} args - Arguments to update one AiCheckpoint.
     * @example
     * // Update one AiCheckpoint
     * const aiCheckpoint = await prisma.aiCheckpoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiCheckpointUpdateArgs>(args: SelectSubset<T, AiCheckpointUpdateArgs<ExtArgs>>): Prisma__AiCheckpointClient<$Result.GetResult<Prisma.$AiCheckpointPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AiCheckpoints.
     * @param {AiCheckpointDeleteManyArgs} args - Arguments to filter AiCheckpoints to delete.
     * @example
     * // Delete a few AiCheckpoints
     * const { count } = await prisma.aiCheckpoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiCheckpointDeleteManyArgs>(args?: SelectSubset<T, AiCheckpointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiCheckpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiCheckpointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiCheckpoints
     * const aiCheckpoint = await prisma.aiCheckpoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiCheckpointUpdateManyArgs>(args: SelectSubset<T, AiCheckpointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AiCheckpoint.
     * @param {AiCheckpointUpsertArgs} args - Arguments to update or create a AiCheckpoint.
     * @example
     * // Update or create a AiCheckpoint
     * const aiCheckpoint = await prisma.aiCheckpoint.upsert({
     *   create: {
     *     // ... data to create a AiCheckpoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiCheckpoint we want to update
     *   }
     * })
     */
    upsert<T extends AiCheckpointUpsertArgs>(args: SelectSubset<T, AiCheckpointUpsertArgs<ExtArgs>>): Prisma__AiCheckpointClient<$Result.GetResult<Prisma.$AiCheckpointPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AiCheckpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiCheckpointCountArgs} args - Arguments to filter AiCheckpoints to count.
     * @example
     * // Count the number of AiCheckpoints
     * const count = await prisma.aiCheckpoint.count({
     *   where: {
     *     // ... the filter for the AiCheckpoints we want to count
     *   }
     * })
    **/
    count<T extends AiCheckpointCountArgs>(
      args?: Subset<T, AiCheckpointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiCheckpointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiCheckpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiCheckpointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiCheckpointAggregateArgs>(args: Subset<T, AiCheckpointAggregateArgs>): Prisma.PrismaPromise<GetAiCheckpointAggregateType<T>>

    /**
     * Group by AiCheckpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiCheckpointGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiCheckpointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiCheckpointGroupByArgs['orderBy'] }
        : { orderBy?: AiCheckpointGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiCheckpointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiCheckpointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiCheckpoint model
   */
  readonly fields: AiCheckpointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiCheckpoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiCheckpointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends AiSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AiSessionDefaultArgs<ExtArgs>>): Prisma__AiSessionClient<$Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiCheckpoint model
   */ 
  interface AiCheckpointFieldRefs {
    readonly id: FieldRef<"AiCheckpoint", 'String'>
    readonly sessionId: FieldRef<"AiCheckpoint", 'String'>
    readonly timestamp: FieldRef<"AiCheckpoint", 'DateTime'>
    readonly eventType: FieldRef<"AiCheckpoint", 'CheckpointType'>
    readonly metadata: FieldRef<"AiCheckpoint", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * AiCheckpoint findUnique
   */
  export type AiCheckpointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiCheckpoint
     */
    select?: AiCheckpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which AiCheckpoint to fetch.
     */
    where: AiCheckpointWhereUniqueInput
  }

  /**
   * AiCheckpoint findUniqueOrThrow
   */
  export type AiCheckpointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiCheckpoint
     */
    select?: AiCheckpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which AiCheckpoint to fetch.
     */
    where: AiCheckpointWhereUniqueInput
  }

  /**
   * AiCheckpoint findFirst
   */
  export type AiCheckpointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiCheckpoint
     */
    select?: AiCheckpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which AiCheckpoint to fetch.
     */
    where?: AiCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiCheckpoints to fetch.
     */
    orderBy?: AiCheckpointOrderByWithRelationInput | AiCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiCheckpoints.
     */
    cursor?: AiCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiCheckpoints.
     */
    distinct?: AiCheckpointScalarFieldEnum | AiCheckpointScalarFieldEnum[]
  }

  /**
   * AiCheckpoint findFirstOrThrow
   */
  export type AiCheckpointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiCheckpoint
     */
    select?: AiCheckpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which AiCheckpoint to fetch.
     */
    where?: AiCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiCheckpoints to fetch.
     */
    orderBy?: AiCheckpointOrderByWithRelationInput | AiCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiCheckpoints.
     */
    cursor?: AiCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiCheckpoints.
     */
    distinct?: AiCheckpointScalarFieldEnum | AiCheckpointScalarFieldEnum[]
  }

  /**
   * AiCheckpoint findMany
   */
  export type AiCheckpointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiCheckpoint
     */
    select?: AiCheckpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which AiCheckpoints to fetch.
     */
    where?: AiCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiCheckpoints to fetch.
     */
    orderBy?: AiCheckpointOrderByWithRelationInput | AiCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiCheckpoints.
     */
    cursor?: AiCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiCheckpoints.
     */
    skip?: number
    distinct?: AiCheckpointScalarFieldEnum | AiCheckpointScalarFieldEnum[]
  }

  /**
   * AiCheckpoint create
   */
  export type AiCheckpointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiCheckpoint
     */
    select?: AiCheckpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiCheckpointInclude<ExtArgs> | null
    /**
     * The data needed to create a AiCheckpoint.
     */
    data: XOR<AiCheckpointCreateInput, AiCheckpointUncheckedCreateInput>
  }

  /**
   * AiCheckpoint createMany
   */
  export type AiCheckpointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiCheckpoints.
     */
    data: AiCheckpointCreateManyInput | AiCheckpointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiCheckpoint createManyAndReturn
   */
  export type AiCheckpointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiCheckpoint
     */
    select?: AiCheckpointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AiCheckpoints.
     */
    data: AiCheckpointCreateManyInput | AiCheckpointCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiCheckpointIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AiCheckpoint update
   */
  export type AiCheckpointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiCheckpoint
     */
    select?: AiCheckpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiCheckpointInclude<ExtArgs> | null
    /**
     * The data needed to update a AiCheckpoint.
     */
    data: XOR<AiCheckpointUpdateInput, AiCheckpointUncheckedUpdateInput>
    /**
     * Choose, which AiCheckpoint to update.
     */
    where: AiCheckpointWhereUniqueInput
  }

  /**
   * AiCheckpoint updateMany
   */
  export type AiCheckpointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiCheckpoints.
     */
    data: XOR<AiCheckpointUpdateManyMutationInput, AiCheckpointUncheckedUpdateManyInput>
    /**
     * Filter which AiCheckpoints to update
     */
    where?: AiCheckpointWhereInput
  }

  /**
   * AiCheckpoint upsert
   */
  export type AiCheckpointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiCheckpoint
     */
    select?: AiCheckpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiCheckpointInclude<ExtArgs> | null
    /**
     * The filter to search for the AiCheckpoint to update in case it exists.
     */
    where: AiCheckpointWhereUniqueInput
    /**
     * In case the AiCheckpoint found by the `where` argument doesn't exist, create a new AiCheckpoint with this data.
     */
    create: XOR<AiCheckpointCreateInput, AiCheckpointUncheckedCreateInput>
    /**
     * In case the AiCheckpoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiCheckpointUpdateInput, AiCheckpointUncheckedUpdateInput>
  }

  /**
   * AiCheckpoint delete
   */
  export type AiCheckpointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiCheckpoint
     */
    select?: AiCheckpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiCheckpointInclude<ExtArgs> | null
    /**
     * Filter which AiCheckpoint to delete.
     */
    where: AiCheckpointWhereUniqueInput
  }

  /**
   * AiCheckpoint deleteMany
   */
  export type AiCheckpointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiCheckpoints to delete
     */
    where?: AiCheckpointWhereInput
  }

  /**
   * AiCheckpoint without action
   */
  export type AiCheckpointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiCheckpoint
     */
    select?: AiCheckpointSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiCheckpointInclude<ExtArgs> | null
  }


  /**
   * Model SystemLog
   */

  export type AggregateSystemLog = {
    _count: SystemLogCountAggregateOutputType | null
    _min: SystemLogMinAggregateOutputType | null
    _max: SystemLogMaxAggregateOutputType | null
  }

  export type SystemLogMinAggregateOutputType = {
    id: string | null
    level: $Enums.LogLevel | null
    service: string | null
    category: string | null
    message: string | null
    timestamp: Date | null
    userId: string | null
    sessionId: string | null
    requestId: string | null
    ipAddress: string | null
  }

  export type SystemLogMaxAggregateOutputType = {
    id: string | null
    level: $Enums.LogLevel | null
    service: string | null
    category: string | null
    message: string | null
    timestamp: Date | null
    userId: string | null
    sessionId: string | null
    requestId: string | null
    ipAddress: string | null
  }

  export type SystemLogCountAggregateOutputType = {
    id: number
    level: number
    service: number
    category: number
    message: number
    metadata: number
    timestamp: number
    userId: number
    sessionId: number
    requestId: number
    ipAddress: number
    _all: number
  }


  export type SystemLogMinAggregateInputType = {
    id?: true
    level?: true
    service?: true
    category?: true
    message?: true
    timestamp?: true
    userId?: true
    sessionId?: true
    requestId?: true
    ipAddress?: true
  }

  export type SystemLogMaxAggregateInputType = {
    id?: true
    level?: true
    service?: true
    category?: true
    message?: true
    timestamp?: true
    userId?: true
    sessionId?: true
    requestId?: true
    ipAddress?: true
  }

  export type SystemLogCountAggregateInputType = {
    id?: true
    level?: true
    service?: true
    category?: true
    message?: true
    metadata?: true
    timestamp?: true
    userId?: true
    sessionId?: true
    requestId?: true
    ipAddress?: true
    _all?: true
  }

  export type SystemLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemLog to aggregate.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemLogs
    **/
    _count?: true | SystemLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemLogMaxAggregateInputType
  }

  export type GetSystemLogAggregateType<T extends SystemLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemLog[P]>
      : GetScalarType<T[P], AggregateSystemLog[P]>
  }




  export type SystemLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemLogWhereInput
    orderBy?: SystemLogOrderByWithAggregationInput | SystemLogOrderByWithAggregationInput[]
    by: SystemLogScalarFieldEnum[] | SystemLogScalarFieldEnum
    having?: SystemLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemLogCountAggregateInputType | true
    _min?: SystemLogMinAggregateInputType
    _max?: SystemLogMaxAggregateInputType
  }

  export type SystemLogGroupByOutputType = {
    id: string
    level: $Enums.LogLevel
    service: string
    category: string
    message: string
    metadata: JsonValue | null
    timestamp: Date
    userId: string | null
    sessionId: string | null
    requestId: string | null
    ipAddress: string | null
    _count: SystemLogCountAggregateOutputType | null
    _min: SystemLogMinAggregateOutputType | null
    _max: SystemLogMaxAggregateOutputType | null
  }

  type GetSystemLogGroupByPayload<T extends SystemLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemLogGroupByOutputType[P]>
            : GetScalarType<T[P], SystemLogGroupByOutputType[P]>
        }
      >
    >


  export type SystemLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    service?: boolean
    category?: boolean
    message?: boolean
    metadata?: boolean
    timestamp?: boolean
    userId?: boolean
    sessionId?: boolean
    requestId?: boolean
    ipAddress?: boolean
  }, ExtArgs["result"]["systemLog"]>

  export type SystemLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    service?: boolean
    category?: boolean
    message?: boolean
    metadata?: boolean
    timestamp?: boolean
    userId?: boolean
    sessionId?: boolean
    requestId?: boolean
    ipAddress?: boolean
  }, ExtArgs["result"]["systemLog"]>

  export type SystemLogSelectScalar = {
    id?: boolean
    level?: boolean
    service?: boolean
    category?: boolean
    message?: boolean
    metadata?: boolean
    timestamp?: boolean
    userId?: boolean
    sessionId?: boolean
    requestId?: boolean
    ipAddress?: boolean
  }


  export type $SystemLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      level: $Enums.LogLevel
      service: string
      category: string
      message: string
      metadata: Prisma.JsonValue | null
      timestamp: Date
      userId: string | null
      sessionId: string | null
      requestId: string | null
      ipAddress: string | null
    }, ExtArgs["result"]["systemLog"]>
    composites: {}
  }

  type SystemLogGetPayload<S extends boolean | null | undefined | SystemLogDefaultArgs> = $Result.GetResult<Prisma.$SystemLogPayload, S>

  type SystemLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SystemLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SystemLogCountAggregateInputType | true
    }

  export interface SystemLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemLog'], meta: { name: 'SystemLog' } }
    /**
     * Find zero or one SystemLog that matches the filter.
     * @param {SystemLogFindUniqueArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemLogFindUniqueArgs>(args: SelectSubset<T, SystemLogFindUniqueArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SystemLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SystemLogFindUniqueOrThrowArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SystemLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogFindFirstArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemLogFindFirstArgs>(args?: SelectSubset<T, SystemLogFindFirstArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SystemLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogFindFirstOrThrowArgs} args - Arguments to find a SystemLog
     * @example
     * // Get one SystemLog
     * const systemLog = await prisma.systemLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SystemLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemLogs
     * const systemLogs = await prisma.systemLog.findMany()
     * 
     * // Get first 10 SystemLogs
     * const systemLogs = await prisma.systemLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemLogWithIdOnly = await prisma.systemLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemLogFindManyArgs>(args?: SelectSubset<T, SystemLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SystemLog.
     * @param {SystemLogCreateArgs} args - Arguments to create a SystemLog.
     * @example
     * // Create one SystemLog
     * const SystemLog = await prisma.systemLog.create({
     *   data: {
     *     // ... data to create a SystemLog
     *   }
     * })
     * 
     */
    create<T extends SystemLogCreateArgs>(args: SelectSubset<T, SystemLogCreateArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SystemLogs.
     * @param {SystemLogCreateManyArgs} args - Arguments to create many SystemLogs.
     * @example
     * // Create many SystemLogs
     * const systemLog = await prisma.systemLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemLogCreateManyArgs>(args?: SelectSubset<T, SystemLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemLogs and returns the data saved in the database.
     * @param {SystemLogCreateManyAndReturnArgs} args - Arguments to create many SystemLogs.
     * @example
     * // Create many SystemLogs
     * const systemLog = await prisma.systemLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemLogs and only return the `id`
     * const systemLogWithIdOnly = await prisma.systemLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SystemLog.
     * @param {SystemLogDeleteArgs} args - Arguments to delete one SystemLog.
     * @example
     * // Delete one SystemLog
     * const SystemLog = await prisma.systemLog.delete({
     *   where: {
     *     // ... filter to delete one SystemLog
     *   }
     * })
     * 
     */
    delete<T extends SystemLogDeleteArgs>(args: SelectSubset<T, SystemLogDeleteArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SystemLog.
     * @param {SystemLogUpdateArgs} args - Arguments to update one SystemLog.
     * @example
     * // Update one SystemLog
     * const systemLog = await prisma.systemLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemLogUpdateArgs>(args: SelectSubset<T, SystemLogUpdateArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SystemLogs.
     * @param {SystemLogDeleteManyArgs} args - Arguments to filter SystemLogs to delete.
     * @example
     * // Delete a few SystemLogs
     * const { count } = await prisma.systemLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemLogDeleteManyArgs>(args?: SelectSubset<T, SystemLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemLogs
     * const systemLog = await prisma.systemLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemLogUpdateManyArgs>(args: SelectSubset<T, SystemLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SystemLog.
     * @param {SystemLogUpsertArgs} args - Arguments to update or create a SystemLog.
     * @example
     * // Update or create a SystemLog
     * const systemLog = await prisma.systemLog.upsert({
     *   create: {
     *     // ... data to create a SystemLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemLog we want to update
     *   }
     * })
     */
    upsert<T extends SystemLogUpsertArgs>(args: SelectSubset<T, SystemLogUpsertArgs<ExtArgs>>): Prisma__SystemLogClient<$Result.GetResult<Prisma.$SystemLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SystemLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogCountArgs} args - Arguments to filter SystemLogs to count.
     * @example
     * // Count the number of SystemLogs
     * const count = await prisma.systemLog.count({
     *   where: {
     *     // ... the filter for the SystemLogs we want to count
     *   }
     * })
    **/
    count<T extends SystemLogCountArgs>(
      args?: Subset<T, SystemLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemLogAggregateArgs>(args: Subset<T, SystemLogAggregateArgs>): Prisma.PrismaPromise<GetSystemLogAggregateType<T>>

    /**
     * Group by SystemLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemLogGroupByArgs['orderBy'] }
        : { orderBy?: SystemLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemLog model
   */
  readonly fields: SystemLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemLog model
   */ 
  interface SystemLogFieldRefs {
    readonly id: FieldRef<"SystemLog", 'String'>
    readonly level: FieldRef<"SystemLog", 'LogLevel'>
    readonly service: FieldRef<"SystemLog", 'String'>
    readonly category: FieldRef<"SystemLog", 'String'>
    readonly message: FieldRef<"SystemLog", 'String'>
    readonly metadata: FieldRef<"SystemLog", 'Json'>
    readonly timestamp: FieldRef<"SystemLog", 'DateTime'>
    readonly userId: FieldRef<"SystemLog", 'String'>
    readonly sessionId: FieldRef<"SystemLog", 'String'>
    readonly requestId: FieldRef<"SystemLog", 'String'>
    readonly ipAddress: FieldRef<"SystemLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SystemLog findUnique
   */
  export type SystemLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog findUniqueOrThrow
   */
  export type SystemLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog findFirst
   */
  export type SystemLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemLogs.
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemLogs.
     */
    distinct?: SystemLogScalarFieldEnum | SystemLogScalarFieldEnum[]
  }

  /**
   * SystemLog findFirstOrThrow
   */
  export type SystemLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Filter, which SystemLog to fetch.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemLogs.
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemLogs.
     */
    distinct?: SystemLogScalarFieldEnum | SystemLogScalarFieldEnum[]
  }

  /**
   * SystemLog findMany
   */
  export type SystemLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Filter, which SystemLogs to fetch.
     */
    where?: SystemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemLogs to fetch.
     */
    orderBy?: SystemLogOrderByWithRelationInput | SystemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemLogs.
     */
    cursor?: SystemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemLogs.
     */
    skip?: number
    distinct?: SystemLogScalarFieldEnum | SystemLogScalarFieldEnum[]
  }

  /**
   * SystemLog create
   */
  export type SystemLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * The data needed to create a SystemLog.
     */
    data: XOR<SystemLogCreateInput, SystemLogUncheckedCreateInput>
  }

  /**
   * SystemLog createMany
   */
  export type SystemLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemLogs.
     */
    data: SystemLogCreateManyInput | SystemLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemLog createManyAndReturn
   */
  export type SystemLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SystemLogs.
     */
    data: SystemLogCreateManyInput | SystemLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemLog update
   */
  export type SystemLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * The data needed to update a SystemLog.
     */
    data: XOR<SystemLogUpdateInput, SystemLogUncheckedUpdateInput>
    /**
     * Choose, which SystemLog to update.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog updateMany
   */
  export type SystemLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemLogs.
     */
    data: XOR<SystemLogUpdateManyMutationInput, SystemLogUncheckedUpdateManyInput>
    /**
     * Filter which SystemLogs to update
     */
    where?: SystemLogWhereInput
  }

  /**
   * SystemLog upsert
   */
  export type SystemLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * The filter to search for the SystemLog to update in case it exists.
     */
    where: SystemLogWhereUniqueInput
    /**
     * In case the SystemLog found by the `where` argument doesn't exist, create a new SystemLog with this data.
     */
    create: XOR<SystemLogCreateInput, SystemLogUncheckedCreateInput>
    /**
     * In case the SystemLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemLogUpdateInput, SystemLogUncheckedUpdateInput>
  }

  /**
   * SystemLog delete
   */
  export type SystemLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
    /**
     * Filter which SystemLog to delete.
     */
    where: SystemLogWhereUniqueInput
  }

  /**
   * SystemLog deleteMany
   */
  export type SystemLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemLogs to delete
     */
    where?: SystemLogWhereInput
  }

  /**
   * SystemLog without action
   */
  export type SystemLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemLog
     */
    select?: SystemLogSelect<ExtArgs> | null
  }


  /**
   * Model SystemConfig
   */

  export type AggregateSystemConfig = {
    _count: SystemConfigCountAggregateOutputType | null
    _min: SystemConfigMinAggregateOutputType | null
    _max: SystemConfigMaxAggregateOutputType | null
  }

  export type SystemConfigMinAggregateOutputType = {
    id: string | null
    key: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemConfigMaxAggregateOutputType = {
    id: string | null
    key: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemConfigCountAggregateOutputType = {
    id: number
    key: number
    value: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SystemConfigMinAggregateInputType = {
    id?: true
    key?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemConfigMaxAggregateInputType = {
    id?: true
    key?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemConfigCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SystemConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemConfig to aggregate.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemConfigs
    **/
    _count?: true | SystemConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemConfigMaxAggregateInputType
  }

  export type GetSystemConfigAggregateType<T extends SystemConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemConfig[P]>
      : GetScalarType<T[P], AggregateSystemConfig[P]>
  }




  export type SystemConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemConfigWhereInput
    orderBy?: SystemConfigOrderByWithAggregationInput | SystemConfigOrderByWithAggregationInput[]
    by: SystemConfigScalarFieldEnum[] | SystemConfigScalarFieldEnum
    having?: SystemConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemConfigCountAggregateInputType | true
    _min?: SystemConfigMinAggregateInputType
    _max?: SystemConfigMaxAggregateInputType
  }

  export type SystemConfigGroupByOutputType = {
    id: string
    key: string
    value: JsonValue
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: SystemConfigCountAggregateOutputType | null
    _min: SystemConfigMinAggregateOutputType | null
    _max: SystemConfigMaxAggregateOutputType | null
  }

  type GetSystemConfigGroupByPayload<T extends SystemConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemConfigGroupByOutputType[P]>
            : GetScalarType<T[P], SystemConfigGroupByOutputType[P]>
        }
      >
    >


  export type SystemConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $SystemConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: Prisma.JsonValue
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["systemConfig"]>
    composites: {}
  }

  type SystemConfigGetPayload<S extends boolean | null | undefined | SystemConfigDefaultArgs> = $Result.GetResult<Prisma.$SystemConfigPayload, S>

  type SystemConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SystemConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SystemConfigCountAggregateInputType | true
    }

  export interface SystemConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemConfig'], meta: { name: 'SystemConfig' } }
    /**
     * Find zero or one SystemConfig that matches the filter.
     * @param {SystemConfigFindUniqueArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemConfigFindUniqueArgs>(args: SelectSubset<T, SystemConfigFindUniqueArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SystemConfig that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SystemConfigFindUniqueOrThrowArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SystemConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindFirstArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemConfigFindFirstArgs>(args?: SelectSubset<T, SystemConfigFindFirstArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SystemConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindFirstOrThrowArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SystemConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemConfigs
     * const systemConfigs = await prisma.systemConfig.findMany()
     * 
     * // Get first 10 SystemConfigs
     * const systemConfigs = await prisma.systemConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemConfigFindManyArgs>(args?: SelectSubset<T, SystemConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SystemConfig.
     * @param {SystemConfigCreateArgs} args - Arguments to create a SystemConfig.
     * @example
     * // Create one SystemConfig
     * const SystemConfig = await prisma.systemConfig.create({
     *   data: {
     *     // ... data to create a SystemConfig
     *   }
     * })
     * 
     */
    create<T extends SystemConfigCreateArgs>(args: SelectSubset<T, SystemConfigCreateArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SystemConfigs.
     * @param {SystemConfigCreateManyArgs} args - Arguments to create many SystemConfigs.
     * @example
     * // Create many SystemConfigs
     * const systemConfig = await prisma.systemConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemConfigCreateManyArgs>(args?: SelectSubset<T, SystemConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemConfigs and returns the data saved in the database.
     * @param {SystemConfigCreateManyAndReturnArgs} args - Arguments to create many SystemConfigs.
     * @example
     * // Create many SystemConfigs
     * const systemConfig = await prisma.systemConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemConfigs and only return the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SystemConfig.
     * @param {SystemConfigDeleteArgs} args - Arguments to delete one SystemConfig.
     * @example
     * // Delete one SystemConfig
     * const SystemConfig = await prisma.systemConfig.delete({
     *   where: {
     *     // ... filter to delete one SystemConfig
     *   }
     * })
     * 
     */
    delete<T extends SystemConfigDeleteArgs>(args: SelectSubset<T, SystemConfigDeleteArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SystemConfig.
     * @param {SystemConfigUpdateArgs} args - Arguments to update one SystemConfig.
     * @example
     * // Update one SystemConfig
     * const systemConfig = await prisma.systemConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemConfigUpdateArgs>(args: SelectSubset<T, SystemConfigUpdateArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SystemConfigs.
     * @param {SystemConfigDeleteManyArgs} args - Arguments to filter SystemConfigs to delete.
     * @example
     * // Delete a few SystemConfigs
     * const { count } = await prisma.systemConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemConfigDeleteManyArgs>(args?: SelectSubset<T, SystemConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemConfigs
     * const systemConfig = await prisma.systemConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemConfigUpdateManyArgs>(args: SelectSubset<T, SystemConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SystemConfig.
     * @param {SystemConfigUpsertArgs} args - Arguments to update or create a SystemConfig.
     * @example
     * // Update or create a SystemConfig
     * const systemConfig = await prisma.systemConfig.upsert({
     *   create: {
     *     // ... data to create a SystemConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemConfig we want to update
     *   }
     * })
     */
    upsert<T extends SystemConfigUpsertArgs>(args: SelectSubset<T, SystemConfigUpsertArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SystemConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigCountArgs} args - Arguments to filter SystemConfigs to count.
     * @example
     * // Count the number of SystemConfigs
     * const count = await prisma.systemConfig.count({
     *   where: {
     *     // ... the filter for the SystemConfigs we want to count
     *   }
     * })
    **/
    count<T extends SystemConfigCountArgs>(
      args?: Subset<T, SystemConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemConfigAggregateArgs>(args: Subset<T, SystemConfigAggregateArgs>): Prisma.PrismaPromise<GetSystemConfigAggregateType<T>>

    /**
     * Group by SystemConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemConfigGroupByArgs['orderBy'] }
        : { orderBy?: SystemConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemConfig model
   */
  readonly fields: SystemConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemConfig model
   */ 
  interface SystemConfigFieldRefs {
    readonly id: FieldRef<"SystemConfig", 'String'>
    readonly key: FieldRef<"SystemConfig", 'String'>
    readonly value: FieldRef<"SystemConfig", 'Json'>
    readonly description: FieldRef<"SystemConfig", 'String'>
    readonly isActive: FieldRef<"SystemConfig", 'Boolean'>
    readonly createdAt: FieldRef<"SystemConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"SystemConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemConfig findUnique
   */
  export type SystemConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig findUniqueOrThrow
   */
  export type SystemConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig findFirst
   */
  export type SystemConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemConfigs.
     */
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig findFirstOrThrow
   */
  export type SystemConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemConfigs.
     */
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig findMany
   */
  export type SystemConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Filter, which SystemConfigs to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig create
   */
  export type SystemConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * The data needed to create a SystemConfig.
     */
    data: XOR<SystemConfigCreateInput, SystemConfigUncheckedCreateInput>
  }

  /**
   * SystemConfig createMany
   */
  export type SystemConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemConfigs.
     */
    data: SystemConfigCreateManyInput | SystemConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemConfig createManyAndReturn
   */
  export type SystemConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SystemConfigs.
     */
    data: SystemConfigCreateManyInput | SystemConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemConfig update
   */
  export type SystemConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * The data needed to update a SystemConfig.
     */
    data: XOR<SystemConfigUpdateInput, SystemConfigUncheckedUpdateInput>
    /**
     * Choose, which SystemConfig to update.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig updateMany
   */
  export type SystemConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemConfigs.
     */
    data: XOR<SystemConfigUpdateManyMutationInput, SystemConfigUncheckedUpdateManyInput>
    /**
     * Filter which SystemConfigs to update
     */
    where?: SystemConfigWhereInput
  }

  /**
   * SystemConfig upsert
   */
  export type SystemConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * The filter to search for the SystemConfig to update in case it exists.
     */
    where: SystemConfigWhereUniqueInput
    /**
     * In case the SystemConfig found by the `where` argument doesn't exist, create a new SystemConfig with this data.
     */
    create: XOR<SystemConfigCreateInput, SystemConfigUncheckedCreateInput>
    /**
     * In case the SystemConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemConfigUpdateInput, SystemConfigUncheckedUpdateInput>
  }

  /**
   * SystemConfig delete
   */
  export type SystemConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Filter which SystemConfig to delete.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig deleteMany
   */
  export type SystemConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemConfigs to delete
     */
    where?: SystemConfigWhereInput
  }

  /**
   * SystemConfig without action
   */
  export type SystemConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    action: $Enums.AuditAction | null
    resource: string | null
    resourceId: string | null
    userId: string | null
    sessionId: string | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    action: $Enums.AuditAction | null
    resource: string | null
    resourceId: string | null
    userId: string | null
    sessionId: string | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    action: number
    resource: number
    resourceId: number
    oldValues: number
    newValues: number
    changes: number
    userId: number
    sessionId: number
    ipAddress: number
    userAgent: number
    timestamp: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    action?: true
    resource?: true
    resourceId?: true
    userId?: true
    sessionId?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    action?: true
    resource?: true
    resourceId?: true
    userId?: true
    sessionId?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    action?: true
    resource?: true
    resourceId?: true
    oldValues?: true
    newValues?: true
    changes?: true
    userId?: true
    sessionId?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    action: $Enums.AuditAction
    resource: string
    resourceId: string
    oldValues: JsonValue | null
    newValues: JsonValue | null
    changes: JsonValue | null
    userId: string | null
    sessionId: string | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    oldValues?: boolean
    newValues?: boolean
    changes?: boolean
    userId?: boolean
    sessionId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    oldValues?: boolean
    newValues?: boolean
    changes?: boolean
    userId?: boolean
    sessionId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    oldValues?: boolean
    newValues?: boolean
    changes?: boolean
    userId?: boolean
    sessionId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
  }


  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: $Enums.AuditAction
      resource: string
      resourceId: string
      oldValues: Prisma.JsonValue | null
      newValues: Prisma.JsonValue | null
      changes: Prisma.JsonValue | null
      userId: string | null
      sessionId: string | null
      ipAddress: string | null
      userAgent: string | null
      timestamp: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'AuditAction'>
    readonly resource: FieldRef<"AuditLog", 'String'>
    readonly resourceId: FieldRef<"AuditLog", 'String'>
    readonly oldValues: FieldRef<"AuditLog", 'Json'>
    readonly newValues: FieldRef<"AuditLog", 'Json'>
    readonly changes: FieldRef<"AuditLog", 'Json'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly sessionId: FieldRef<"AuditLog", 'String'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TeacherScalarFieldEnum: {
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

  export type TeacherScalarFieldEnum = (typeof TeacherScalarFieldEnum)[keyof typeof TeacherScalarFieldEnum]


  export const StudentScalarFieldEnum: {
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

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const PaperScalarFieldEnum: {
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

  export type PaperScalarFieldEnum = (typeof PaperScalarFieldEnum)[keyof typeof PaperScalarFieldEnum]


  export const QuestionScalarFieldEnum: {
    id: 'id',
    paperId: 'paperId',
    title: 'title',
    type: 'type',
    description: 'description',
    dimension: 'dimension',
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

  export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum]


  export const ExamScalarFieldEnum: {
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
    paperSnapshot: 'paperSnapshot',
    questionsSnapshot: 'questionsSnapshot',
    snapshotCreatedAt: 'snapshotCreatedAt',
    teacherId: 'teacherId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    scheduledDeletionAt: 'scheduledDeletionAt'
  };

  export type ExamScalarFieldEnum = (typeof ExamScalarFieldEnum)[keyof typeof ExamScalarFieldEnum]


  export const ExamResultScalarFieldEnum: {
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

  export type ExamResultScalarFieldEnum = (typeof ExamResultScalarFieldEnum)[keyof typeof ExamResultScalarFieldEnum]


  export const AnswerScalarFieldEnum: {
    id: 'id',
    examResultId: 'examResultId',
    questionId: 'questionId',
    selectedOptions: 'selectedOptions',
    textAnswer: 'textAnswer',
    points: 'points',
    maxPoints: 'maxPoints',
    questionDisplayedAt: 'questionDisplayedAt',
    firstInteractionAt: 'firstInteractionAt',
    lastModifiedAt: 'lastModifiedAt',
    answeredAt: 'answeredAt',
    totalViewTime: 'totalViewTime',
    interactionCount: 'interactionCount',
    hesitationScore: 'hesitationScore'
  };

  export type AnswerScalarFieldEnum = (typeof AnswerScalarFieldEnum)[keyof typeof AnswerScalarFieldEnum]


  export const AiSessionScalarFieldEnum: {
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

  export type AiSessionScalarFieldEnum = (typeof AiSessionScalarFieldEnum)[keyof typeof AiSessionScalarFieldEnum]


  export const AiAnalysisAggregateScalarFieldEnum: {
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

  export type AiAnalysisAggregateScalarFieldEnum = (typeof AiAnalysisAggregateScalarFieldEnum)[keyof typeof AiAnalysisAggregateScalarFieldEnum]


  export const AiAnomalyScalarFieldEnum: {
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

  export type AiAnomalyScalarFieldEnum = (typeof AiAnomalyScalarFieldEnum)[keyof typeof AiAnomalyScalarFieldEnum]


  export const AiCheckpointScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    timestamp: 'timestamp',
    eventType: 'eventType',
    metadata: 'metadata'
  };

  export type AiCheckpointScalarFieldEnum = (typeof AiCheckpointScalarFieldEnum)[keyof typeof AiCheckpointScalarFieldEnum]


  export const SystemLogScalarFieldEnum: {
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

  export type SystemLogScalarFieldEnum = (typeof SystemLogScalarFieldEnum)[keyof typeof SystemLogScalarFieldEnum]


  export const SystemConfigScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SystemConfigScalarFieldEnum = (typeof SystemConfigScalarFieldEnum)[keyof typeof SystemConfigScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
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

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'QuestionType'
   */
  export type EnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType'>
    


  /**
   * Reference to a field of type 'QuestionType[]'
   */
  export type ListEnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'ExamStatus'
   */
  export type EnumExamStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExamStatus'>
    


  /**
   * Reference to a field of type 'ExamStatus[]'
   */
  export type ListEnumExamStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExamStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'AiSessionStatus'
   */
  export type EnumAiSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AiSessionStatus'>
    


  /**
   * Reference to a field of type 'AiSessionStatus[]'
   */
  export type ListEnumAiSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AiSessionStatus[]'>
    


  /**
   * Reference to a field of type 'AnomalyType'
   */
  export type EnumAnomalyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnomalyType'>
    


  /**
   * Reference to a field of type 'AnomalyType[]'
   */
  export type ListEnumAnomalyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnomalyType[]'>
    


  /**
   * Reference to a field of type 'AnomalySeverity'
   */
  export type EnumAnomalySeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnomalySeverity'>
    


  /**
   * Reference to a field of type 'AnomalySeverity[]'
   */
  export type ListEnumAnomalySeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnomalySeverity[]'>
    


  /**
   * Reference to a field of type 'CheckpointType'
   */
  export type EnumCheckpointTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CheckpointType'>
    


  /**
   * Reference to a field of type 'CheckpointType[]'
   */
  export type ListEnumCheckpointTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CheckpointType[]'>
    


  /**
   * Reference to a field of type 'LogLevel'
   */
  export type EnumLogLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogLevel'>
    


  /**
   * Reference to a field of type 'LogLevel[]'
   */
  export type ListEnumLogLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogLevel[]'>
    


  /**
   * Reference to a field of type 'AuditAction'
   */
  export type EnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction'>
    


  /**
   * Reference to a field of type 'AuditAction[]'
   */
  export type ListEnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction[]'>
    
  /**
   * Deep Input Types
   */


  export type TeacherWhereInput = {
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    id?: StringFilter<"Teacher"> | string
    username?: StringFilter<"Teacher"> | string
    email?: StringFilter<"Teacher"> | string
    name?: StringFilter<"Teacher"> | string
    password?: StringFilter<"Teacher"> | string
    avatar?: StringNullableFilter<"Teacher"> | string | null
    phoneNumber?: StringNullableFilter<"Teacher"> | string | null
    department?: StringNullableFilter<"Teacher"> | string | null
    title?: StringNullableFilter<"Teacher"> | string | null
    isActive?: BoolFilter<"Teacher"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"Teacher"> | Date | string | null
    createdAt?: DateTimeFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeFilter<"Teacher"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Teacher"> | Date | string | null
    papers?: PaperListRelationFilter
    exams?: ExamListRelationFilter
  }

  export type TeacherOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    papers?: PaperOrderByRelationAggregateInput
    exams?: ExamOrderByRelationAggregateInput
  }

  export type TeacherWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    name?: StringFilter<"Teacher"> | string
    password?: StringFilter<"Teacher"> | string
    avatar?: StringNullableFilter<"Teacher"> | string | null
    phoneNumber?: StringNullableFilter<"Teacher"> | string | null
    department?: StringNullableFilter<"Teacher"> | string | null
    title?: StringNullableFilter<"Teacher"> | string | null
    isActive?: BoolFilter<"Teacher"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"Teacher"> | Date | string | null
    createdAt?: DateTimeFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeFilter<"Teacher"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Teacher"> | Date | string | null
    papers?: PaperListRelationFilter
    exams?: ExamListRelationFilter
  }, "id" | "username" | "email">

  export type TeacherOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: TeacherCountOrderByAggregateInput
    _max?: TeacherMaxOrderByAggregateInput
    _min?: TeacherMinOrderByAggregateInput
  }

  export type TeacherScalarWhereWithAggregatesInput = {
    AND?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    OR?: TeacherScalarWhereWithAggregatesInput[]
    NOT?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Teacher"> | string
    username?: StringWithAggregatesFilter<"Teacher"> | string
    email?: StringWithAggregatesFilter<"Teacher"> | string
    name?: StringWithAggregatesFilter<"Teacher"> | string
    password?: StringWithAggregatesFilter<"Teacher"> | string
    avatar?: StringNullableWithAggregatesFilter<"Teacher"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"Teacher"> | string | null
    department?: StringNullableWithAggregatesFilter<"Teacher"> | string | null
    title?: StringNullableWithAggregatesFilter<"Teacher"> | string | null
    isActive?: BoolWithAggregatesFilter<"Teacher"> | boolean
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"Teacher"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Teacher"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Teacher"> | Date | string | null
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: StringFilter<"Student"> | string
    participantId?: StringFilter<"Student"> | string
    name?: StringFilter<"Student"> | string
    email?: StringNullableFilter<"Student"> | string | null
    phoneNumber?: StringNullableFilter<"Student"> | string | null
    grade?: StringNullableFilter<"Student"> | string | null
    class?: StringNullableFilter<"Student"> | string | null
    studentId?: StringNullableFilter<"Student"> | string | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Student"> | Date | string | null
    examResults?: ExamResultListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    participantId?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    grade?: SortOrderInput | SortOrder
    class?: SortOrderInput | SortOrder
    studentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    examResults?: ExamResultOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    participantId?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    name?: StringFilter<"Student"> | string
    email?: StringNullableFilter<"Student"> | string | null
    phoneNumber?: StringNullableFilter<"Student"> | string | null
    grade?: StringNullableFilter<"Student"> | string | null
    class?: StringNullableFilter<"Student"> | string | null
    studentId?: StringNullableFilter<"Student"> | string | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Student"> | Date | string | null
    examResults?: ExamResultListRelationFilter
  }, "id" | "participantId">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    participantId?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    grade?: SortOrderInput | SortOrder
    class?: SortOrderInput | SortOrder
    studentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: StudentCountOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Student"> | string
    participantId?: StringWithAggregatesFilter<"Student"> | string
    name?: StringWithAggregatesFilter<"Student"> | string
    email?: StringNullableWithAggregatesFilter<"Student"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"Student"> | string | null
    grade?: StringNullableWithAggregatesFilter<"Student"> | string | null
    class?: StringNullableWithAggregatesFilter<"Student"> | string | null
    studentId?: StringNullableWithAggregatesFilter<"Student"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Student"> | Date | string | null
  }

  export type PaperWhereInput = {
    AND?: PaperWhereInput | PaperWhereInput[]
    OR?: PaperWhereInput[]
    NOT?: PaperWhereInput | PaperWhereInput[]
    id?: StringFilter<"Paper"> | string
    title?: StringFilter<"Paper"> | string
    description?: StringNullableFilter<"Paper"> | string | null
    category?: StringNullableFilter<"Paper"> | string | null
    timeLimit?: IntNullableFilter<"Paper"> | number | null
    allowRetake?: BoolFilter<"Paper"> | boolean
    showResultsImmediately?: BoolFilter<"Paper"> | boolean
    randomizeQuestions?: BoolFilter<"Paper"> | boolean
    teacherId?: StringFilter<"Paper"> | string
    isActive?: BoolFilter<"Paper"> | boolean
    createdAt?: DateTimeFilter<"Paper"> | Date | string
    updatedAt?: DateTimeFilter<"Paper"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Paper"> | Date | string | null
    teacher?: XOR<TeacherRelationFilter, TeacherWhereInput>
    questions?: QuestionListRelationFilter
    exams?: ExamListRelationFilter
  }

  export type PaperOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    timeLimit?: SortOrderInput | SortOrder
    allowRetake?: SortOrder
    showResultsImmediately?: SortOrder
    randomizeQuestions?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    teacher?: TeacherOrderByWithRelationInput
    questions?: QuestionOrderByRelationAggregateInput
    exams?: ExamOrderByRelationAggregateInput
  }

  export type PaperWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaperWhereInput | PaperWhereInput[]
    OR?: PaperWhereInput[]
    NOT?: PaperWhereInput | PaperWhereInput[]
    title?: StringFilter<"Paper"> | string
    description?: StringNullableFilter<"Paper"> | string | null
    category?: StringNullableFilter<"Paper"> | string | null
    timeLimit?: IntNullableFilter<"Paper"> | number | null
    allowRetake?: BoolFilter<"Paper"> | boolean
    showResultsImmediately?: BoolFilter<"Paper"> | boolean
    randomizeQuestions?: BoolFilter<"Paper"> | boolean
    teacherId?: StringFilter<"Paper"> | string
    isActive?: BoolFilter<"Paper"> | boolean
    createdAt?: DateTimeFilter<"Paper"> | Date | string
    updatedAt?: DateTimeFilter<"Paper"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Paper"> | Date | string | null
    teacher?: XOR<TeacherRelationFilter, TeacherWhereInput>
    questions?: QuestionListRelationFilter
    exams?: ExamListRelationFilter
  }, "id">

  export type PaperOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    timeLimit?: SortOrderInput | SortOrder
    allowRetake?: SortOrder
    showResultsImmediately?: SortOrder
    randomizeQuestions?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: PaperCountOrderByAggregateInput
    _avg?: PaperAvgOrderByAggregateInput
    _max?: PaperMaxOrderByAggregateInput
    _min?: PaperMinOrderByAggregateInput
    _sum?: PaperSumOrderByAggregateInput
  }

  export type PaperScalarWhereWithAggregatesInput = {
    AND?: PaperScalarWhereWithAggregatesInput | PaperScalarWhereWithAggregatesInput[]
    OR?: PaperScalarWhereWithAggregatesInput[]
    NOT?: PaperScalarWhereWithAggregatesInput | PaperScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Paper"> | string
    title?: StringWithAggregatesFilter<"Paper"> | string
    description?: StringNullableWithAggregatesFilter<"Paper"> | string | null
    category?: StringNullableWithAggregatesFilter<"Paper"> | string | null
    timeLimit?: IntNullableWithAggregatesFilter<"Paper"> | number | null
    allowRetake?: BoolWithAggregatesFilter<"Paper"> | boolean
    showResultsImmediately?: BoolWithAggregatesFilter<"Paper"> | boolean
    randomizeQuestions?: BoolWithAggregatesFilter<"Paper"> | boolean
    teacherId?: StringWithAggregatesFilter<"Paper"> | string
    isActive?: BoolWithAggregatesFilter<"Paper"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Paper"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Paper"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Paper"> | Date | string | null
  }

  export type QuestionWhereInput = {
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    id?: StringFilter<"Question"> | string
    paperId?: StringFilter<"Question"> | string
    title?: StringFilter<"Question"> | string
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    description?: StringNullableFilter<"Question"> | string | null
    dimension?: StringNullableFilter<"Question"> | string | null
    explanation?: StringNullableFilter<"Question"> | string | null
    order?: IntFilter<"Question"> | number
    required?: BoolFilter<"Question"> | boolean
    points?: IntFilter<"Question"> | number
    displayCondition?: JsonNullableFilter<"Question">
    options?: JsonNullableFilter<"Question">
    createdAt?: DateTimeFilter<"Question"> | Date | string
    updatedAt?: DateTimeFilter<"Question"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Question"> | Date | string | null
    paper?: XOR<PaperRelationFilter, PaperWhereInput>
    answers?: AnswerListRelationFilter
  }

  export type QuestionOrderByWithRelationInput = {
    id?: SortOrder
    paperId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    dimension?: SortOrderInput | SortOrder
    explanation?: SortOrderInput | SortOrder
    order?: SortOrder
    required?: SortOrder
    points?: SortOrder
    displayCondition?: SortOrderInput | SortOrder
    options?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    paper?: PaperOrderByWithRelationInput
    answers?: AnswerOrderByRelationAggregateInput
  }

  export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    paperId?: StringFilter<"Question"> | string
    title?: StringFilter<"Question"> | string
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    description?: StringNullableFilter<"Question"> | string | null
    dimension?: StringNullableFilter<"Question"> | string | null
    explanation?: StringNullableFilter<"Question"> | string | null
    order?: IntFilter<"Question"> | number
    required?: BoolFilter<"Question"> | boolean
    points?: IntFilter<"Question"> | number
    displayCondition?: JsonNullableFilter<"Question">
    options?: JsonNullableFilter<"Question">
    createdAt?: DateTimeFilter<"Question"> | Date | string
    updatedAt?: DateTimeFilter<"Question"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Question"> | Date | string | null
    paper?: XOR<PaperRelationFilter, PaperWhereInput>
    answers?: AnswerListRelationFilter
  }, "id">

  export type QuestionOrderByWithAggregationInput = {
    id?: SortOrder
    paperId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    dimension?: SortOrderInput | SortOrder
    explanation?: SortOrderInput | SortOrder
    order?: SortOrder
    required?: SortOrder
    points?: SortOrder
    displayCondition?: SortOrderInput | SortOrder
    options?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: QuestionCountOrderByAggregateInput
    _avg?: QuestionAvgOrderByAggregateInput
    _max?: QuestionMaxOrderByAggregateInput
    _min?: QuestionMinOrderByAggregateInput
    _sum?: QuestionSumOrderByAggregateInput
  }

  export type QuestionScalarWhereWithAggregatesInput = {
    AND?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    OR?: QuestionScalarWhereWithAggregatesInput[]
    NOT?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Question"> | string
    paperId?: StringWithAggregatesFilter<"Question"> | string
    title?: StringWithAggregatesFilter<"Question"> | string
    type?: EnumQuestionTypeWithAggregatesFilter<"Question"> | $Enums.QuestionType
    description?: StringNullableWithAggregatesFilter<"Question"> | string | null
    dimension?: StringNullableWithAggregatesFilter<"Question"> | string | null
    explanation?: StringNullableWithAggregatesFilter<"Question"> | string | null
    order?: IntWithAggregatesFilter<"Question"> | number
    required?: BoolWithAggregatesFilter<"Question"> | boolean
    points?: IntWithAggregatesFilter<"Question"> | number
    displayCondition?: JsonNullableWithAggregatesFilter<"Question">
    options?: JsonNullableWithAggregatesFilter<"Question">
    createdAt?: DateTimeWithAggregatesFilter<"Question"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Question"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Question"> | Date | string | null
  }

  export type ExamWhereInput = {
    AND?: ExamWhereInput | ExamWhereInput[]
    OR?: ExamWhereInput[]
    NOT?: ExamWhereInput | ExamWhereInput[]
    id?: StringFilter<"Exam"> | string
    paperId?: StringFilter<"Exam"> | string
    title?: StringFilter<"Exam"> | string
    description?: StringNullableFilter<"Exam"> | string | null
    startTime?: DateTimeFilter<"Exam"> | Date | string
    endTime?: DateTimeFilter<"Exam"> | Date | string
    timeLimit?: IntNullableFilter<"Exam"> | number | null
    accessCode?: StringNullableFilter<"Exam"> | string | null
    allowedStudents?: JsonNullableFilter<"Exam">
    maxAttempts?: IntFilter<"Exam"> | number
    requireCamera?: BoolFilter<"Exam"> | boolean
    requireMicrophone?: BoolFilter<"Exam"> | boolean
    enableAIAnalysis?: BoolFilter<"Exam"> | boolean
    status?: EnumExamStatusFilter<"Exam"> | $Enums.ExamStatus
    paperSnapshot?: JsonNullableFilter<"Exam">
    questionsSnapshot?: JsonNullableFilter<"Exam">
    snapshotCreatedAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
    teacherId?: StringFilter<"Exam"> | string
    createdAt?: DateTimeFilter<"Exam"> | Date | string
    updatedAt?: DateTimeFilter<"Exam"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
    scheduledDeletionAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
    paper?: XOR<PaperRelationFilter, PaperWhereInput>
    teacher?: XOR<TeacherRelationFilter, TeacherWhereInput>
    examResults?: ExamResultListRelationFilter
  }

  export type ExamOrderByWithRelationInput = {
    id?: SortOrder
    paperId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timeLimit?: SortOrderInput | SortOrder
    accessCode?: SortOrderInput | SortOrder
    allowedStudents?: SortOrderInput | SortOrder
    maxAttempts?: SortOrder
    requireCamera?: SortOrder
    requireMicrophone?: SortOrder
    enableAIAnalysis?: SortOrder
    status?: SortOrder
    paperSnapshot?: SortOrderInput | SortOrder
    questionsSnapshot?: SortOrderInput | SortOrder
    snapshotCreatedAt?: SortOrderInput | SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    scheduledDeletionAt?: SortOrderInput | SortOrder
    paper?: PaperOrderByWithRelationInput
    teacher?: TeacherOrderByWithRelationInput
    examResults?: ExamResultOrderByRelationAggregateInput
  }

  export type ExamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExamWhereInput | ExamWhereInput[]
    OR?: ExamWhereInput[]
    NOT?: ExamWhereInput | ExamWhereInput[]
    paperId?: StringFilter<"Exam"> | string
    title?: StringFilter<"Exam"> | string
    description?: StringNullableFilter<"Exam"> | string | null
    startTime?: DateTimeFilter<"Exam"> | Date | string
    endTime?: DateTimeFilter<"Exam"> | Date | string
    timeLimit?: IntNullableFilter<"Exam"> | number | null
    accessCode?: StringNullableFilter<"Exam"> | string | null
    allowedStudents?: JsonNullableFilter<"Exam">
    maxAttempts?: IntFilter<"Exam"> | number
    requireCamera?: BoolFilter<"Exam"> | boolean
    requireMicrophone?: BoolFilter<"Exam"> | boolean
    enableAIAnalysis?: BoolFilter<"Exam"> | boolean
    status?: EnumExamStatusFilter<"Exam"> | $Enums.ExamStatus
    paperSnapshot?: JsonNullableFilter<"Exam">
    questionsSnapshot?: JsonNullableFilter<"Exam">
    snapshotCreatedAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
    teacherId?: StringFilter<"Exam"> | string
    createdAt?: DateTimeFilter<"Exam"> | Date | string
    updatedAt?: DateTimeFilter<"Exam"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
    scheduledDeletionAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
    paper?: XOR<PaperRelationFilter, PaperWhereInput>
    teacher?: XOR<TeacherRelationFilter, TeacherWhereInput>
    examResults?: ExamResultListRelationFilter
  }, "id">

  export type ExamOrderByWithAggregationInput = {
    id?: SortOrder
    paperId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timeLimit?: SortOrderInput | SortOrder
    accessCode?: SortOrderInput | SortOrder
    allowedStudents?: SortOrderInput | SortOrder
    maxAttempts?: SortOrder
    requireCamera?: SortOrder
    requireMicrophone?: SortOrder
    enableAIAnalysis?: SortOrder
    status?: SortOrder
    paperSnapshot?: SortOrderInput | SortOrder
    questionsSnapshot?: SortOrderInput | SortOrder
    snapshotCreatedAt?: SortOrderInput | SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    scheduledDeletionAt?: SortOrderInput | SortOrder
    _count?: ExamCountOrderByAggregateInput
    _avg?: ExamAvgOrderByAggregateInput
    _max?: ExamMaxOrderByAggregateInput
    _min?: ExamMinOrderByAggregateInput
    _sum?: ExamSumOrderByAggregateInput
  }

  export type ExamScalarWhereWithAggregatesInput = {
    AND?: ExamScalarWhereWithAggregatesInput | ExamScalarWhereWithAggregatesInput[]
    OR?: ExamScalarWhereWithAggregatesInput[]
    NOT?: ExamScalarWhereWithAggregatesInput | ExamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Exam"> | string
    paperId?: StringWithAggregatesFilter<"Exam"> | string
    title?: StringWithAggregatesFilter<"Exam"> | string
    description?: StringNullableWithAggregatesFilter<"Exam"> | string | null
    startTime?: DateTimeWithAggregatesFilter<"Exam"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Exam"> | Date | string
    timeLimit?: IntNullableWithAggregatesFilter<"Exam"> | number | null
    accessCode?: StringNullableWithAggregatesFilter<"Exam"> | string | null
    allowedStudents?: JsonNullableWithAggregatesFilter<"Exam">
    maxAttempts?: IntWithAggregatesFilter<"Exam"> | number
    requireCamera?: BoolWithAggregatesFilter<"Exam"> | boolean
    requireMicrophone?: BoolWithAggregatesFilter<"Exam"> | boolean
    enableAIAnalysis?: BoolWithAggregatesFilter<"Exam"> | boolean
    status?: EnumExamStatusWithAggregatesFilter<"Exam"> | $Enums.ExamStatus
    paperSnapshot?: JsonNullableWithAggregatesFilter<"Exam">
    questionsSnapshot?: JsonNullableWithAggregatesFilter<"Exam">
    snapshotCreatedAt?: DateTimeNullableWithAggregatesFilter<"Exam"> | Date | string | null
    teacherId?: StringWithAggregatesFilter<"Exam"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Exam"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Exam"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Exam"> | Date | string | null
    scheduledDeletionAt?: DateTimeNullableWithAggregatesFilter<"Exam"> | Date | string | null
  }

  export type ExamResultWhereInput = {
    AND?: ExamResultWhereInput | ExamResultWhereInput[]
    OR?: ExamResultWhereInput[]
    NOT?: ExamResultWhereInput | ExamResultWhereInput[]
    id?: StringFilter<"ExamResult"> | string
    examId?: StringFilter<"ExamResult"> | string
    studentId?: StringNullableFilter<"ExamResult"> | string | null
    participantId?: StringFilter<"ExamResult"> | string
    participantName?: StringFilter<"ExamResult"> | string
    startedAt?: DateTimeFilter<"ExamResult"> | Date | string
    submittedAt?: DateTimeNullableFilter<"ExamResult"> | Date | string | null
    timeSpent?: IntNullableFilter<"ExamResult"> | number | null
    ipAddress?: StringNullableFilter<"ExamResult"> | string | null
    userAgent?: StringNullableFilter<"ExamResult"> | string | null
    totalScore?: FloatFilter<"ExamResult"> | number
    maxScore?: FloatFilter<"ExamResult"> | number
    percentage?: FloatFilter<"ExamResult"> | number
    isCompleted?: BoolFilter<"ExamResult"> | boolean
    isValid?: BoolFilter<"ExamResult"> | boolean
    aiSessionId?: StringNullableFilter<"ExamResult"> | string | null
    createdAt?: DateTimeFilter<"ExamResult"> | Date | string
    updatedAt?: DateTimeFilter<"ExamResult"> | Date | string
    deletedAt?: DateTimeNullableFilter<"ExamResult"> | Date | string | null
    exam?: XOR<ExamRelationFilter, ExamWhereInput>
    student?: XOR<StudentNullableRelationFilter, StudentWhereInput> | null
    answers?: AnswerListRelationFilter
    aiAnalysisData?: XOR<AiAnalysisAggregateNullableRelationFilter, AiAnalysisAggregateWhereInput> | null
    aiSession?: XOR<AiSessionNullableRelationFilter, AiSessionWhereInput> | null
  }

  export type ExamResultOrderByWithRelationInput = {
    id?: SortOrder
    examId?: SortOrder
    studentId?: SortOrderInput | SortOrder
    participantId?: SortOrder
    participantName?: SortOrder
    startedAt?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    timeSpent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    percentage?: SortOrder
    isCompleted?: SortOrder
    isValid?: SortOrder
    aiSessionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    exam?: ExamOrderByWithRelationInput
    student?: StudentOrderByWithRelationInput
    answers?: AnswerOrderByRelationAggregateInput
    aiAnalysisData?: AiAnalysisAggregateOrderByWithRelationInput
    aiSession?: AiSessionOrderByWithRelationInput
  }

  export type ExamResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    aiSessionId?: string
    AND?: ExamResultWhereInput | ExamResultWhereInput[]
    OR?: ExamResultWhereInput[]
    NOT?: ExamResultWhereInput | ExamResultWhereInput[]
    examId?: StringFilter<"ExamResult"> | string
    studentId?: StringNullableFilter<"ExamResult"> | string | null
    participantId?: StringFilter<"ExamResult"> | string
    participantName?: StringFilter<"ExamResult"> | string
    startedAt?: DateTimeFilter<"ExamResult"> | Date | string
    submittedAt?: DateTimeNullableFilter<"ExamResult"> | Date | string | null
    timeSpent?: IntNullableFilter<"ExamResult"> | number | null
    ipAddress?: StringNullableFilter<"ExamResult"> | string | null
    userAgent?: StringNullableFilter<"ExamResult"> | string | null
    totalScore?: FloatFilter<"ExamResult"> | number
    maxScore?: FloatFilter<"ExamResult"> | number
    percentage?: FloatFilter<"ExamResult"> | number
    isCompleted?: BoolFilter<"ExamResult"> | boolean
    isValid?: BoolFilter<"ExamResult"> | boolean
    createdAt?: DateTimeFilter<"ExamResult"> | Date | string
    updatedAt?: DateTimeFilter<"ExamResult"> | Date | string
    deletedAt?: DateTimeNullableFilter<"ExamResult"> | Date | string | null
    exam?: XOR<ExamRelationFilter, ExamWhereInput>
    student?: XOR<StudentNullableRelationFilter, StudentWhereInput> | null
    answers?: AnswerListRelationFilter
    aiAnalysisData?: XOR<AiAnalysisAggregateNullableRelationFilter, AiAnalysisAggregateWhereInput> | null
    aiSession?: XOR<AiSessionNullableRelationFilter, AiSessionWhereInput> | null
  }, "id" | "aiSessionId">

  export type ExamResultOrderByWithAggregationInput = {
    id?: SortOrder
    examId?: SortOrder
    studentId?: SortOrderInput | SortOrder
    participantId?: SortOrder
    participantName?: SortOrder
    startedAt?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    timeSpent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    percentage?: SortOrder
    isCompleted?: SortOrder
    isValid?: SortOrder
    aiSessionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: ExamResultCountOrderByAggregateInput
    _avg?: ExamResultAvgOrderByAggregateInput
    _max?: ExamResultMaxOrderByAggregateInput
    _min?: ExamResultMinOrderByAggregateInput
    _sum?: ExamResultSumOrderByAggregateInput
  }

  export type ExamResultScalarWhereWithAggregatesInput = {
    AND?: ExamResultScalarWhereWithAggregatesInput | ExamResultScalarWhereWithAggregatesInput[]
    OR?: ExamResultScalarWhereWithAggregatesInput[]
    NOT?: ExamResultScalarWhereWithAggregatesInput | ExamResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExamResult"> | string
    examId?: StringWithAggregatesFilter<"ExamResult"> | string
    studentId?: StringNullableWithAggregatesFilter<"ExamResult"> | string | null
    participantId?: StringWithAggregatesFilter<"ExamResult"> | string
    participantName?: StringWithAggregatesFilter<"ExamResult"> | string
    startedAt?: DateTimeWithAggregatesFilter<"ExamResult"> | Date | string
    submittedAt?: DateTimeNullableWithAggregatesFilter<"ExamResult"> | Date | string | null
    timeSpent?: IntNullableWithAggregatesFilter<"ExamResult"> | number | null
    ipAddress?: StringNullableWithAggregatesFilter<"ExamResult"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"ExamResult"> | string | null
    totalScore?: FloatWithAggregatesFilter<"ExamResult"> | number
    maxScore?: FloatWithAggregatesFilter<"ExamResult"> | number
    percentage?: FloatWithAggregatesFilter<"ExamResult"> | number
    isCompleted?: BoolWithAggregatesFilter<"ExamResult"> | boolean
    isValid?: BoolWithAggregatesFilter<"ExamResult"> | boolean
    aiSessionId?: StringNullableWithAggregatesFilter<"ExamResult"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ExamResult"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExamResult"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"ExamResult"> | Date | string | null
  }

  export type AnswerWhereInput = {
    AND?: AnswerWhereInput | AnswerWhereInput[]
    OR?: AnswerWhereInput[]
    NOT?: AnswerWhereInput | AnswerWhereInput[]
    id?: StringFilter<"Answer"> | string
    examResultId?: StringFilter<"Answer"> | string
    questionId?: StringFilter<"Answer"> | string
    selectedOptions?: JsonNullableFilter<"Answer">
    textAnswer?: StringNullableFilter<"Answer"> | string | null
    points?: FloatFilter<"Answer"> | number
    maxPoints?: FloatFilter<"Answer"> | number
    questionDisplayedAt?: DateTimeNullableFilter<"Answer"> | Date | string | null
    firstInteractionAt?: DateTimeNullableFilter<"Answer"> | Date | string | null
    lastModifiedAt?: DateTimeNullableFilter<"Answer"> | Date | string | null
    answeredAt?: DateTimeFilter<"Answer"> | Date | string
    totalViewTime?: IntNullableFilter<"Answer"> | number | null
    interactionCount?: IntFilter<"Answer"> | number
    hesitationScore?: FloatNullableFilter<"Answer"> | number | null
    examResult?: XOR<ExamResultRelationFilter, ExamResultWhereInput>
    question?: XOR<QuestionRelationFilter, QuestionWhereInput>
  }

  export type AnswerOrderByWithRelationInput = {
    id?: SortOrder
    examResultId?: SortOrder
    questionId?: SortOrder
    selectedOptions?: SortOrderInput | SortOrder
    textAnswer?: SortOrderInput | SortOrder
    points?: SortOrder
    maxPoints?: SortOrder
    questionDisplayedAt?: SortOrderInput | SortOrder
    firstInteractionAt?: SortOrderInput | SortOrder
    lastModifiedAt?: SortOrderInput | SortOrder
    answeredAt?: SortOrder
    totalViewTime?: SortOrderInput | SortOrder
    interactionCount?: SortOrder
    hesitationScore?: SortOrderInput | SortOrder
    examResult?: ExamResultOrderByWithRelationInput
    question?: QuestionOrderByWithRelationInput
  }

  export type AnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    examResultId_questionId?: AnswerExamResultIdQuestionIdCompoundUniqueInput
    AND?: AnswerWhereInput | AnswerWhereInput[]
    OR?: AnswerWhereInput[]
    NOT?: AnswerWhereInput | AnswerWhereInput[]
    examResultId?: StringFilter<"Answer"> | string
    questionId?: StringFilter<"Answer"> | string
    selectedOptions?: JsonNullableFilter<"Answer">
    textAnswer?: StringNullableFilter<"Answer"> | string | null
    points?: FloatFilter<"Answer"> | number
    maxPoints?: FloatFilter<"Answer"> | number
    questionDisplayedAt?: DateTimeNullableFilter<"Answer"> | Date | string | null
    firstInteractionAt?: DateTimeNullableFilter<"Answer"> | Date | string | null
    lastModifiedAt?: DateTimeNullableFilter<"Answer"> | Date | string | null
    answeredAt?: DateTimeFilter<"Answer"> | Date | string
    totalViewTime?: IntNullableFilter<"Answer"> | number | null
    interactionCount?: IntFilter<"Answer"> | number
    hesitationScore?: FloatNullableFilter<"Answer"> | number | null
    examResult?: XOR<ExamResultRelationFilter, ExamResultWhereInput>
    question?: XOR<QuestionRelationFilter, QuestionWhereInput>
  }, "id" | "examResultId_questionId">

  export type AnswerOrderByWithAggregationInput = {
    id?: SortOrder
    examResultId?: SortOrder
    questionId?: SortOrder
    selectedOptions?: SortOrderInput | SortOrder
    textAnswer?: SortOrderInput | SortOrder
    points?: SortOrder
    maxPoints?: SortOrder
    questionDisplayedAt?: SortOrderInput | SortOrder
    firstInteractionAt?: SortOrderInput | SortOrder
    lastModifiedAt?: SortOrderInput | SortOrder
    answeredAt?: SortOrder
    totalViewTime?: SortOrderInput | SortOrder
    interactionCount?: SortOrder
    hesitationScore?: SortOrderInput | SortOrder
    _count?: AnswerCountOrderByAggregateInput
    _avg?: AnswerAvgOrderByAggregateInput
    _max?: AnswerMaxOrderByAggregateInput
    _min?: AnswerMinOrderByAggregateInput
    _sum?: AnswerSumOrderByAggregateInput
  }

  export type AnswerScalarWhereWithAggregatesInput = {
    AND?: AnswerScalarWhereWithAggregatesInput | AnswerScalarWhereWithAggregatesInput[]
    OR?: AnswerScalarWhereWithAggregatesInput[]
    NOT?: AnswerScalarWhereWithAggregatesInput | AnswerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Answer"> | string
    examResultId?: StringWithAggregatesFilter<"Answer"> | string
    questionId?: StringWithAggregatesFilter<"Answer"> | string
    selectedOptions?: JsonNullableWithAggregatesFilter<"Answer">
    textAnswer?: StringNullableWithAggregatesFilter<"Answer"> | string | null
    points?: FloatWithAggregatesFilter<"Answer"> | number
    maxPoints?: FloatWithAggregatesFilter<"Answer"> | number
    questionDisplayedAt?: DateTimeNullableWithAggregatesFilter<"Answer"> | Date | string | null
    firstInteractionAt?: DateTimeNullableWithAggregatesFilter<"Answer"> | Date | string | null
    lastModifiedAt?: DateTimeNullableWithAggregatesFilter<"Answer"> | Date | string | null
    answeredAt?: DateTimeWithAggregatesFilter<"Answer"> | Date | string
    totalViewTime?: IntNullableWithAggregatesFilter<"Answer"> | number | null
    interactionCount?: IntWithAggregatesFilter<"Answer"> | number
    hesitationScore?: FloatNullableWithAggregatesFilter<"Answer"> | number | null
  }

  export type AiSessionWhereInput = {
    AND?: AiSessionWhereInput | AiSessionWhereInput[]
    OR?: AiSessionWhereInput[]
    NOT?: AiSessionWhereInput | AiSessionWhereInput[]
    id?: StringFilter<"AiSession"> | string
    sessionId?: StringFilter<"AiSession"> | string
    examResultId?: StringNullableFilter<"AiSession"> | string | null
    status?: EnumAiSessionStatusFilter<"AiSession"> | $Enums.AiSessionStatus
    startTime?: DateTimeFilter<"AiSession"> | Date | string
    endTime?: DateTimeNullableFilter<"AiSession"> | Date | string | null
    clientInfo?: JsonNullableFilter<"AiSession">
    streamInfo?: JsonNullableFilter<"AiSession">
    checkpointFilePath?: StringNullableFilter<"AiSession"> | string | null
    checkpointCount?: IntFilter<"AiSession"> | number
    fileSize?: IntNullableFilter<"AiSession"> | number | null
    createdAt?: DateTimeFilter<"AiSession"> | Date | string
    updatedAt?: DateTimeFilter<"AiSession"> | Date | string
    examResult?: XOR<ExamResultNullableRelationFilter, ExamResultWhereInput> | null
    aggregate?: XOR<AiAnalysisAggregateNullableRelationFilter, AiAnalysisAggregateWhereInput> | null
    anomalies?: AiAnomalyListRelationFilter
    checkpoints?: AiCheckpointListRelationFilter
  }

  export type AiSessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    examResultId?: SortOrderInput | SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    clientInfo?: SortOrderInput | SortOrder
    streamInfo?: SortOrderInput | SortOrder
    checkpointFilePath?: SortOrderInput | SortOrder
    checkpointCount?: SortOrder
    fileSize?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    examResult?: ExamResultOrderByWithRelationInput
    aggregate?: AiAnalysisAggregateOrderByWithRelationInput
    anomalies?: AiAnomalyOrderByRelationAggregateInput
    checkpoints?: AiCheckpointOrderByRelationAggregateInput
  }

  export type AiSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId?: string
    examResultId?: string
    AND?: AiSessionWhereInput | AiSessionWhereInput[]
    OR?: AiSessionWhereInput[]
    NOT?: AiSessionWhereInput | AiSessionWhereInput[]
    status?: EnumAiSessionStatusFilter<"AiSession"> | $Enums.AiSessionStatus
    startTime?: DateTimeFilter<"AiSession"> | Date | string
    endTime?: DateTimeNullableFilter<"AiSession"> | Date | string | null
    clientInfo?: JsonNullableFilter<"AiSession">
    streamInfo?: JsonNullableFilter<"AiSession">
    checkpointFilePath?: StringNullableFilter<"AiSession"> | string | null
    checkpointCount?: IntFilter<"AiSession"> | number
    fileSize?: IntNullableFilter<"AiSession"> | number | null
    createdAt?: DateTimeFilter<"AiSession"> | Date | string
    updatedAt?: DateTimeFilter<"AiSession"> | Date | string
    examResult?: XOR<ExamResultNullableRelationFilter, ExamResultWhereInput> | null
    aggregate?: XOR<AiAnalysisAggregateNullableRelationFilter, AiAnalysisAggregateWhereInput> | null
    anomalies?: AiAnomalyListRelationFilter
    checkpoints?: AiCheckpointListRelationFilter
  }, "id" | "sessionId" | "examResultId">

  export type AiSessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    examResultId?: SortOrderInput | SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    clientInfo?: SortOrderInput | SortOrder
    streamInfo?: SortOrderInput | SortOrder
    checkpointFilePath?: SortOrderInput | SortOrder
    checkpointCount?: SortOrder
    fileSize?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AiSessionCountOrderByAggregateInput
    _avg?: AiSessionAvgOrderByAggregateInput
    _max?: AiSessionMaxOrderByAggregateInput
    _min?: AiSessionMinOrderByAggregateInput
    _sum?: AiSessionSumOrderByAggregateInput
  }

  export type AiSessionScalarWhereWithAggregatesInput = {
    AND?: AiSessionScalarWhereWithAggregatesInput | AiSessionScalarWhereWithAggregatesInput[]
    OR?: AiSessionScalarWhereWithAggregatesInput[]
    NOT?: AiSessionScalarWhereWithAggregatesInput | AiSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiSession"> | string
    sessionId?: StringWithAggregatesFilter<"AiSession"> | string
    examResultId?: StringNullableWithAggregatesFilter<"AiSession"> | string | null
    status?: EnumAiSessionStatusWithAggregatesFilter<"AiSession"> | $Enums.AiSessionStatus
    startTime?: DateTimeWithAggregatesFilter<"AiSession"> | Date | string
    endTime?: DateTimeNullableWithAggregatesFilter<"AiSession"> | Date | string | null
    clientInfo?: JsonNullableWithAggregatesFilter<"AiSession">
    streamInfo?: JsonNullableWithAggregatesFilter<"AiSession">
    checkpointFilePath?: StringNullableWithAggregatesFilter<"AiSession"> | string | null
    checkpointCount?: IntWithAggregatesFilter<"AiSession"> | number
    fileSize?: IntNullableWithAggregatesFilter<"AiSession"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"AiSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AiSession"> | Date | string
  }

  export type AiAnalysisAggregateWhereInput = {
    AND?: AiAnalysisAggregateWhereInput | AiAnalysisAggregateWhereInput[]
    OR?: AiAnalysisAggregateWhereInput[]
    NOT?: AiAnalysisAggregateWhereInput | AiAnalysisAggregateWhereInput[]
    id?: StringFilter<"AiAnalysisAggregate"> | string
    sessionId?: StringFilter<"AiAnalysisAggregate"> | string
    examResultId?: StringFilter<"AiAnalysisAggregate"> | string
    avgValence?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    avgArousal?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    dominantEmotion?: StringNullableFilter<"AiAnalysisAggregate"> | string | null
    emotionDistribution?: JsonNullableFilter<"AiAnalysisAggregate">
    avgAttention?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    attentionVariability?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    distractionEvents?: IntFilter<"AiAnalysisAggregate"> | number
    engagementScore?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    consistencyScore?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    avgHeartRate?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    heartRateVariability?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    stressIndicators?: JsonNullableFilter<"AiAnalysisAggregate">
    dataQuality?: FloatFilter<"AiAnalysisAggregate"> | number
    analysisConfidence?: FloatFilter<"AiAnalysisAggregate"> | number
    createdAt?: DateTimeFilter<"AiAnalysisAggregate"> | Date | string
    updatedAt?: DateTimeFilter<"AiAnalysisAggregate"> | Date | string
    session?: XOR<AiSessionRelationFilter, AiSessionWhereInput>
    examResult?: XOR<ExamResultRelationFilter, ExamResultWhereInput>
  }

  export type AiAnalysisAggregateOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    examResultId?: SortOrder
    avgValence?: SortOrderInput | SortOrder
    avgArousal?: SortOrderInput | SortOrder
    dominantEmotion?: SortOrderInput | SortOrder
    emotionDistribution?: SortOrderInput | SortOrder
    avgAttention?: SortOrderInput | SortOrder
    attentionVariability?: SortOrderInput | SortOrder
    distractionEvents?: SortOrder
    engagementScore?: SortOrderInput | SortOrder
    consistencyScore?: SortOrderInput | SortOrder
    avgHeartRate?: SortOrderInput | SortOrder
    heartRateVariability?: SortOrderInput | SortOrder
    stressIndicators?: SortOrderInput | SortOrder
    dataQuality?: SortOrder
    analysisConfidence?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    session?: AiSessionOrderByWithRelationInput
    examResult?: ExamResultOrderByWithRelationInput
  }

  export type AiAnalysisAggregateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId?: string
    examResultId?: string
    AND?: AiAnalysisAggregateWhereInput | AiAnalysisAggregateWhereInput[]
    OR?: AiAnalysisAggregateWhereInput[]
    NOT?: AiAnalysisAggregateWhereInput | AiAnalysisAggregateWhereInput[]
    avgValence?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    avgArousal?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    dominantEmotion?: StringNullableFilter<"AiAnalysisAggregate"> | string | null
    emotionDistribution?: JsonNullableFilter<"AiAnalysisAggregate">
    avgAttention?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    attentionVariability?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    distractionEvents?: IntFilter<"AiAnalysisAggregate"> | number
    engagementScore?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    consistencyScore?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    avgHeartRate?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    heartRateVariability?: FloatNullableFilter<"AiAnalysisAggregate"> | number | null
    stressIndicators?: JsonNullableFilter<"AiAnalysisAggregate">
    dataQuality?: FloatFilter<"AiAnalysisAggregate"> | number
    analysisConfidence?: FloatFilter<"AiAnalysisAggregate"> | number
    createdAt?: DateTimeFilter<"AiAnalysisAggregate"> | Date | string
    updatedAt?: DateTimeFilter<"AiAnalysisAggregate"> | Date | string
    session?: XOR<AiSessionRelationFilter, AiSessionWhereInput>
    examResult?: XOR<ExamResultRelationFilter, ExamResultWhereInput>
  }, "id" | "sessionId" | "examResultId">

  export type AiAnalysisAggregateOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    examResultId?: SortOrder
    avgValence?: SortOrderInput | SortOrder
    avgArousal?: SortOrderInput | SortOrder
    dominantEmotion?: SortOrderInput | SortOrder
    emotionDistribution?: SortOrderInput | SortOrder
    avgAttention?: SortOrderInput | SortOrder
    attentionVariability?: SortOrderInput | SortOrder
    distractionEvents?: SortOrder
    engagementScore?: SortOrderInput | SortOrder
    consistencyScore?: SortOrderInput | SortOrder
    avgHeartRate?: SortOrderInput | SortOrder
    heartRateVariability?: SortOrderInput | SortOrder
    stressIndicators?: SortOrderInput | SortOrder
    dataQuality?: SortOrder
    analysisConfidence?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AiAnalysisAggregateCountOrderByAggregateInput
    _avg?: AiAnalysisAggregateAvgOrderByAggregateInput
    _max?: AiAnalysisAggregateMaxOrderByAggregateInput
    _min?: AiAnalysisAggregateMinOrderByAggregateInput
    _sum?: AiAnalysisAggregateSumOrderByAggregateInput
  }

  export type AiAnalysisAggregateScalarWhereWithAggregatesInput = {
    AND?: AiAnalysisAggregateScalarWhereWithAggregatesInput | AiAnalysisAggregateScalarWhereWithAggregatesInput[]
    OR?: AiAnalysisAggregateScalarWhereWithAggregatesInput[]
    NOT?: AiAnalysisAggregateScalarWhereWithAggregatesInput | AiAnalysisAggregateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiAnalysisAggregate"> | string
    sessionId?: StringWithAggregatesFilter<"AiAnalysisAggregate"> | string
    examResultId?: StringWithAggregatesFilter<"AiAnalysisAggregate"> | string
    avgValence?: FloatNullableWithAggregatesFilter<"AiAnalysisAggregate"> | number | null
    avgArousal?: FloatNullableWithAggregatesFilter<"AiAnalysisAggregate"> | number | null
    dominantEmotion?: StringNullableWithAggregatesFilter<"AiAnalysisAggregate"> | string | null
    emotionDistribution?: JsonNullableWithAggregatesFilter<"AiAnalysisAggregate">
    avgAttention?: FloatNullableWithAggregatesFilter<"AiAnalysisAggregate"> | number | null
    attentionVariability?: FloatNullableWithAggregatesFilter<"AiAnalysisAggregate"> | number | null
    distractionEvents?: IntWithAggregatesFilter<"AiAnalysisAggregate"> | number
    engagementScore?: FloatNullableWithAggregatesFilter<"AiAnalysisAggregate"> | number | null
    consistencyScore?: FloatNullableWithAggregatesFilter<"AiAnalysisAggregate"> | number | null
    avgHeartRate?: FloatNullableWithAggregatesFilter<"AiAnalysisAggregate"> | number | null
    heartRateVariability?: FloatNullableWithAggregatesFilter<"AiAnalysisAggregate"> | number | null
    stressIndicators?: JsonNullableWithAggregatesFilter<"AiAnalysisAggregate">
    dataQuality?: FloatWithAggregatesFilter<"AiAnalysisAggregate"> | number
    analysisConfidence?: FloatWithAggregatesFilter<"AiAnalysisAggregate"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AiAnalysisAggregate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AiAnalysisAggregate"> | Date | string
  }

  export type AiAnomalyWhereInput = {
    AND?: AiAnomalyWhereInput | AiAnomalyWhereInput[]
    OR?: AiAnomalyWhereInput[]
    NOT?: AiAnomalyWhereInput | AiAnomalyWhereInput[]
    id?: StringFilter<"AiAnomaly"> | string
    sessionId?: StringFilter<"AiAnomaly"> | string
    type?: EnumAnomalyTypeFilter<"AiAnomaly"> | $Enums.AnomalyType
    severity?: EnumAnomalySeverityFilter<"AiAnomaly"> | $Enums.AnomalySeverity
    timestamp?: DateTimeFilter<"AiAnomaly"> | Date | string
    duration?: IntNullableFilter<"AiAnomaly"> | number | null
    confidence?: FloatFilter<"AiAnomaly"> | number
    description?: StringFilter<"AiAnomaly"> | string
    metadata?: JsonNullableFilter<"AiAnomaly">
    createdAt?: DateTimeFilter<"AiAnomaly"> | Date | string
    session?: XOR<AiSessionRelationFilter, AiSessionWhereInput>
  }

  export type AiAnomalyOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    timestamp?: SortOrder
    duration?: SortOrderInput | SortOrder
    confidence?: SortOrder
    description?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    session?: AiSessionOrderByWithRelationInput
  }

  export type AiAnomalyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AiAnomalyWhereInput | AiAnomalyWhereInput[]
    OR?: AiAnomalyWhereInput[]
    NOT?: AiAnomalyWhereInput | AiAnomalyWhereInput[]
    sessionId?: StringFilter<"AiAnomaly"> | string
    type?: EnumAnomalyTypeFilter<"AiAnomaly"> | $Enums.AnomalyType
    severity?: EnumAnomalySeverityFilter<"AiAnomaly"> | $Enums.AnomalySeverity
    timestamp?: DateTimeFilter<"AiAnomaly"> | Date | string
    duration?: IntNullableFilter<"AiAnomaly"> | number | null
    confidence?: FloatFilter<"AiAnomaly"> | number
    description?: StringFilter<"AiAnomaly"> | string
    metadata?: JsonNullableFilter<"AiAnomaly">
    createdAt?: DateTimeFilter<"AiAnomaly"> | Date | string
    session?: XOR<AiSessionRelationFilter, AiSessionWhereInput>
  }, "id">

  export type AiAnomalyOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    timestamp?: SortOrder
    duration?: SortOrderInput | SortOrder
    confidence?: SortOrder
    description?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AiAnomalyCountOrderByAggregateInput
    _avg?: AiAnomalyAvgOrderByAggregateInput
    _max?: AiAnomalyMaxOrderByAggregateInput
    _min?: AiAnomalyMinOrderByAggregateInput
    _sum?: AiAnomalySumOrderByAggregateInput
  }

  export type AiAnomalyScalarWhereWithAggregatesInput = {
    AND?: AiAnomalyScalarWhereWithAggregatesInput | AiAnomalyScalarWhereWithAggregatesInput[]
    OR?: AiAnomalyScalarWhereWithAggregatesInput[]
    NOT?: AiAnomalyScalarWhereWithAggregatesInput | AiAnomalyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiAnomaly"> | string
    sessionId?: StringWithAggregatesFilter<"AiAnomaly"> | string
    type?: EnumAnomalyTypeWithAggregatesFilter<"AiAnomaly"> | $Enums.AnomalyType
    severity?: EnumAnomalySeverityWithAggregatesFilter<"AiAnomaly"> | $Enums.AnomalySeverity
    timestamp?: DateTimeWithAggregatesFilter<"AiAnomaly"> | Date | string
    duration?: IntNullableWithAggregatesFilter<"AiAnomaly"> | number | null
    confidence?: FloatWithAggregatesFilter<"AiAnomaly"> | number
    description?: StringWithAggregatesFilter<"AiAnomaly"> | string
    metadata?: JsonNullableWithAggregatesFilter<"AiAnomaly">
    createdAt?: DateTimeWithAggregatesFilter<"AiAnomaly"> | Date | string
  }

  export type AiCheckpointWhereInput = {
    AND?: AiCheckpointWhereInput | AiCheckpointWhereInput[]
    OR?: AiCheckpointWhereInput[]
    NOT?: AiCheckpointWhereInput | AiCheckpointWhereInput[]
    id?: StringFilter<"AiCheckpoint"> | string
    sessionId?: StringFilter<"AiCheckpoint"> | string
    timestamp?: DateTimeFilter<"AiCheckpoint"> | Date | string
    eventType?: EnumCheckpointTypeFilter<"AiCheckpoint"> | $Enums.CheckpointType
    metadata?: JsonNullableFilter<"AiCheckpoint">
    session?: XOR<AiSessionRelationFilter, AiSessionWhereInput>
  }

  export type AiCheckpointOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    timestamp?: SortOrder
    eventType?: SortOrder
    metadata?: SortOrderInput | SortOrder
    session?: AiSessionOrderByWithRelationInput
  }

  export type AiCheckpointWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AiCheckpointWhereInput | AiCheckpointWhereInput[]
    OR?: AiCheckpointWhereInput[]
    NOT?: AiCheckpointWhereInput | AiCheckpointWhereInput[]
    sessionId?: StringFilter<"AiCheckpoint"> | string
    timestamp?: DateTimeFilter<"AiCheckpoint"> | Date | string
    eventType?: EnumCheckpointTypeFilter<"AiCheckpoint"> | $Enums.CheckpointType
    metadata?: JsonNullableFilter<"AiCheckpoint">
    session?: XOR<AiSessionRelationFilter, AiSessionWhereInput>
  }, "id">

  export type AiCheckpointOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    timestamp?: SortOrder
    eventType?: SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: AiCheckpointCountOrderByAggregateInput
    _max?: AiCheckpointMaxOrderByAggregateInput
    _min?: AiCheckpointMinOrderByAggregateInput
  }

  export type AiCheckpointScalarWhereWithAggregatesInput = {
    AND?: AiCheckpointScalarWhereWithAggregatesInput | AiCheckpointScalarWhereWithAggregatesInput[]
    OR?: AiCheckpointScalarWhereWithAggregatesInput[]
    NOT?: AiCheckpointScalarWhereWithAggregatesInput | AiCheckpointScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiCheckpoint"> | string
    sessionId?: StringWithAggregatesFilter<"AiCheckpoint"> | string
    timestamp?: DateTimeWithAggregatesFilter<"AiCheckpoint"> | Date | string
    eventType?: EnumCheckpointTypeWithAggregatesFilter<"AiCheckpoint"> | $Enums.CheckpointType
    metadata?: JsonNullableWithAggregatesFilter<"AiCheckpoint">
  }

  export type SystemLogWhereInput = {
    AND?: SystemLogWhereInput | SystemLogWhereInput[]
    OR?: SystemLogWhereInput[]
    NOT?: SystemLogWhereInput | SystemLogWhereInput[]
    id?: StringFilter<"SystemLog"> | string
    level?: EnumLogLevelFilter<"SystemLog"> | $Enums.LogLevel
    service?: StringFilter<"SystemLog"> | string
    category?: StringFilter<"SystemLog"> | string
    message?: StringFilter<"SystemLog"> | string
    metadata?: JsonNullableFilter<"SystemLog">
    timestamp?: DateTimeFilter<"SystemLog"> | Date | string
    userId?: StringNullableFilter<"SystemLog"> | string | null
    sessionId?: StringNullableFilter<"SystemLog"> | string | null
    requestId?: StringNullableFilter<"SystemLog"> | string | null
    ipAddress?: StringNullableFilter<"SystemLog"> | string | null
  }

  export type SystemLogOrderByWithRelationInput = {
    id?: SortOrder
    level?: SortOrder
    service?: SortOrder
    category?: SortOrder
    message?: SortOrder
    metadata?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    userId?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    requestId?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
  }

  export type SystemLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SystemLogWhereInput | SystemLogWhereInput[]
    OR?: SystemLogWhereInput[]
    NOT?: SystemLogWhereInput | SystemLogWhereInput[]
    level?: EnumLogLevelFilter<"SystemLog"> | $Enums.LogLevel
    service?: StringFilter<"SystemLog"> | string
    category?: StringFilter<"SystemLog"> | string
    message?: StringFilter<"SystemLog"> | string
    metadata?: JsonNullableFilter<"SystemLog">
    timestamp?: DateTimeFilter<"SystemLog"> | Date | string
    userId?: StringNullableFilter<"SystemLog"> | string | null
    sessionId?: StringNullableFilter<"SystemLog"> | string | null
    requestId?: StringNullableFilter<"SystemLog"> | string | null
    ipAddress?: StringNullableFilter<"SystemLog"> | string | null
  }, "id">

  export type SystemLogOrderByWithAggregationInput = {
    id?: SortOrder
    level?: SortOrder
    service?: SortOrder
    category?: SortOrder
    message?: SortOrder
    metadata?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    userId?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    requestId?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    _count?: SystemLogCountOrderByAggregateInput
    _max?: SystemLogMaxOrderByAggregateInput
    _min?: SystemLogMinOrderByAggregateInput
  }

  export type SystemLogScalarWhereWithAggregatesInput = {
    AND?: SystemLogScalarWhereWithAggregatesInput | SystemLogScalarWhereWithAggregatesInput[]
    OR?: SystemLogScalarWhereWithAggregatesInput[]
    NOT?: SystemLogScalarWhereWithAggregatesInput | SystemLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemLog"> | string
    level?: EnumLogLevelWithAggregatesFilter<"SystemLog"> | $Enums.LogLevel
    service?: StringWithAggregatesFilter<"SystemLog"> | string
    category?: StringWithAggregatesFilter<"SystemLog"> | string
    message?: StringWithAggregatesFilter<"SystemLog"> | string
    metadata?: JsonNullableWithAggregatesFilter<"SystemLog">
    timestamp?: DateTimeWithAggregatesFilter<"SystemLog"> | Date | string
    userId?: StringNullableWithAggregatesFilter<"SystemLog"> | string | null
    sessionId?: StringNullableWithAggregatesFilter<"SystemLog"> | string | null
    requestId?: StringNullableWithAggregatesFilter<"SystemLog"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"SystemLog"> | string | null
  }

  export type SystemConfigWhereInput = {
    AND?: SystemConfigWhereInput | SystemConfigWhereInput[]
    OR?: SystemConfigWhereInput[]
    NOT?: SystemConfigWhereInput | SystemConfigWhereInput[]
    id?: StringFilter<"SystemConfig"> | string
    key?: StringFilter<"SystemConfig"> | string
    value?: JsonFilter<"SystemConfig">
    description?: StringNullableFilter<"SystemConfig"> | string | null
    isActive?: BoolFilter<"SystemConfig"> | boolean
    createdAt?: DateTimeFilter<"SystemConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SystemConfig"> | Date | string
  }

  export type SystemConfigOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SystemConfigWhereInput | SystemConfigWhereInput[]
    OR?: SystemConfigWhereInput[]
    NOT?: SystemConfigWhereInput | SystemConfigWhereInput[]
    value?: JsonFilter<"SystemConfig">
    description?: StringNullableFilter<"SystemConfig"> | string | null
    isActive?: BoolFilter<"SystemConfig"> | boolean
    createdAt?: DateTimeFilter<"SystemConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SystemConfig"> | Date | string
  }, "id" | "key">

  export type SystemConfigOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SystemConfigCountOrderByAggregateInput
    _max?: SystemConfigMaxOrderByAggregateInput
    _min?: SystemConfigMinOrderByAggregateInput
  }

  export type SystemConfigScalarWhereWithAggregatesInput = {
    AND?: SystemConfigScalarWhereWithAggregatesInput | SystemConfigScalarWhereWithAggregatesInput[]
    OR?: SystemConfigScalarWhereWithAggregatesInput[]
    NOT?: SystemConfigScalarWhereWithAggregatesInput | SystemConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemConfig"> | string
    key?: StringWithAggregatesFilter<"SystemConfig"> | string
    value?: JsonWithAggregatesFilter<"SystemConfig">
    description?: StringNullableWithAggregatesFilter<"SystemConfig"> | string | null
    isActive?: BoolWithAggregatesFilter<"SystemConfig"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"SystemConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SystemConfig"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction
    resource?: StringFilter<"AuditLog"> | string
    resourceId?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    changes?: JsonNullableFilter<"AuditLog">
    userId?: StringNullableFilter<"AuditLog"> | string | null
    sessionId?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    changes?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    action?: EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction
    resource?: StringFilter<"AuditLog"> | string
    resourceId?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    changes?: JsonNullableFilter<"AuditLog">
    userId?: StringNullableFilter<"AuditLog"> | string | null
    sessionId?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    changes?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: EnumAuditActionWithAggregatesFilter<"AuditLog"> | $Enums.AuditAction
    resource?: StringWithAggregatesFilter<"AuditLog"> | string
    resourceId?: StringWithAggregatesFilter<"AuditLog"> | string
    oldValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    newValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    changes?: JsonNullableWithAggregatesFilter<"AuditLog">
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    sessionId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type TeacherCreateInput = {
    id?: string
    username: string
    email: string
    name: string
    password: string
    avatar?: string | null
    phoneNumber?: string | null
    department?: string | null
    title?: string | null
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    papers?: PaperCreateNestedManyWithoutTeacherInput
    exams?: ExamCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    name: string
    password: string
    avatar?: string | null
    phoneNumber?: string | null
    department?: string | null
    title?: string | null
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    papers?: PaperUncheckedCreateNestedManyWithoutTeacherInput
    exams?: ExamUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    papers?: PaperUpdateManyWithoutTeacherNestedInput
    exams?: ExamUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    papers?: PaperUncheckedUpdateManyWithoutTeacherNestedInput
    exams?: ExamUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherCreateManyInput = {
    id?: string
    username: string
    email: string
    name: string
    password: string
    avatar?: string | null
    phoneNumber?: string | null
    department?: string | null
    title?: string | null
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type TeacherUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TeacherUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StudentCreateInput = {
    id?: string
    participantId: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    grade?: string | null
    class?: string | null
    studentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    examResults?: ExamResultCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: string
    participantId: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    grade?: string | null
    class?: string | null
    studentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    examResults?: ExamResultUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    class?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examResults?: ExamResultUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    class?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examResults?: ExamResultUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: string
    participantId: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    grade?: string | null
    class?: string | null
    studentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type StudentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    class?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    class?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PaperCreateInput = {
    id?: string
    title: string
    description?: string | null
    category?: string | null
    timeLimit?: number | null
    allowRetake?: boolean
    showResultsImmediately?: boolean
    randomizeQuestions?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    teacher: TeacherCreateNestedOneWithoutPapersInput
    questions?: QuestionCreateNestedManyWithoutPaperInput
    exams?: ExamCreateNestedManyWithoutPaperInput
  }

  export type PaperUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    category?: string | null
    timeLimit?: number | null
    allowRetake?: boolean
    showResultsImmediately?: boolean
    randomizeQuestions?: boolean
    teacherId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    questions?: QuestionUncheckedCreateNestedManyWithoutPaperInput
    exams?: ExamUncheckedCreateNestedManyWithoutPaperInput
  }

  export type PaperUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResultsImmediately?: BoolFieldUpdateOperationsInput | boolean
    randomizeQuestions?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teacher?: TeacherUpdateOneRequiredWithoutPapersNestedInput
    questions?: QuestionUpdateManyWithoutPaperNestedInput
    exams?: ExamUpdateManyWithoutPaperNestedInput
  }

  export type PaperUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResultsImmediately?: BoolFieldUpdateOperationsInput | boolean
    randomizeQuestions?: BoolFieldUpdateOperationsInput | boolean
    teacherId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    questions?: QuestionUncheckedUpdateManyWithoutPaperNestedInput
    exams?: ExamUncheckedUpdateManyWithoutPaperNestedInput
  }

  export type PaperCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    category?: string | null
    timeLimit?: number | null
    allowRetake?: boolean
    showResultsImmediately?: boolean
    randomizeQuestions?: boolean
    teacherId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PaperUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResultsImmediately?: BoolFieldUpdateOperationsInput | boolean
    randomizeQuestions?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PaperUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResultsImmediately?: BoolFieldUpdateOperationsInput | boolean
    randomizeQuestions?: BoolFieldUpdateOperationsInput | boolean
    teacherId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QuestionCreateInput = {
    id?: string
    title: string
    type: $Enums.QuestionType
    description?: string | null
    dimension?: string | null
    explanation?: string | null
    order: number
    required?: boolean
    points?: number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    paper: PaperCreateNestedOneWithoutQuestionsInput
    answers?: AnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateInput = {
    id?: string
    paperId: string
    title: string
    type: $Enums.QuestionType
    description?: string | null
    dimension?: string | null
    explanation?: string | null
    order: number
    required?: boolean
    points?: number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    answers?: AnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dimension?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    points?: IntFieldUpdateOperationsInput | number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper?: PaperUpdateOneRequiredWithoutQuestionsNestedInput
    answers?: AnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dimension?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    points?: IntFieldUpdateOperationsInput | number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: AnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionCreateManyInput = {
    id?: string
    paperId: string
    title: string
    type: $Enums.QuestionType
    description?: string | null
    dimension?: string | null
    explanation?: string | null
    order: number
    required?: boolean
    points?: number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type QuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dimension?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    points?: IntFieldUpdateOperationsInput | number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dimension?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    points?: IntFieldUpdateOperationsInput | number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExamCreateInput = {
    id?: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    timeLimit?: number | null
    accessCode?: string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: number
    requireCamera?: boolean
    requireMicrophone?: boolean
    enableAIAnalysis?: boolean
    status?: $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    scheduledDeletionAt?: Date | string | null
    paper: PaperCreateNestedOneWithoutExamsInput
    teacher: TeacherCreateNestedOneWithoutExamsInput
    examResults?: ExamResultCreateNestedManyWithoutExamInput
  }

  export type ExamUncheckedCreateInput = {
    id?: string
    paperId: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    timeLimit?: number | null
    accessCode?: string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: number
    requireCamera?: boolean
    requireMicrophone?: boolean
    enableAIAnalysis?: boolean
    status?: $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: Date | string | null
    teacherId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    scheduledDeletionAt?: Date | string | null
    examResults?: ExamResultUncheckedCreateNestedManyWithoutExamInput
  }

  export type ExamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: IntFieldUpdateOperationsInput | number
    requireCamera?: BoolFieldUpdateOperationsInput | boolean
    requireMicrophone?: BoolFieldUpdateOperationsInput | boolean
    enableAIAnalysis?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledDeletionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper?: PaperUpdateOneRequiredWithoutExamsNestedInput
    teacher?: TeacherUpdateOneRequiredWithoutExamsNestedInput
    examResults?: ExamResultUpdateManyWithoutExamNestedInput
  }

  export type ExamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: IntFieldUpdateOperationsInput | number
    requireCamera?: BoolFieldUpdateOperationsInput | boolean
    requireMicrophone?: BoolFieldUpdateOperationsInput | boolean
    enableAIAnalysis?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teacherId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledDeletionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examResults?: ExamResultUncheckedUpdateManyWithoutExamNestedInput
  }

  export type ExamCreateManyInput = {
    id?: string
    paperId: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    timeLimit?: number | null
    accessCode?: string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: number
    requireCamera?: boolean
    requireMicrophone?: boolean
    enableAIAnalysis?: boolean
    status?: $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: Date | string | null
    teacherId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    scheduledDeletionAt?: Date | string | null
  }

  export type ExamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: IntFieldUpdateOperationsInput | number
    requireCamera?: BoolFieldUpdateOperationsInput | boolean
    requireMicrophone?: BoolFieldUpdateOperationsInput | boolean
    enableAIAnalysis?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledDeletionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: IntFieldUpdateOperationsInput | number
    requireCamera?: BoolFieldUpdateOperationsInput | boolean
    requireMicrophone?: BoolFieldUpdateOperationsInput | boolean
    enableAIAnalysis?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teacherId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledDeletionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExamResultCreateInput = {
    id?: string
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    exam: ExamCreateNestedOneWithoutExamResultsInput
    student?: StudentCreateNestedOneWithoutExamResultsInput
    answers?: AnswerCreateNestedManyWithoutExamResultInput
    aiAnalysisData?: AiAnalysisAggregateCreateNestedOneWithoutExamResultInput
    aiSession?: AiSessionCreateNestedOneWithoutExamResultInput
  }

  export type ExamResultUncheckedCreateInput = {
    id?: string
    examId: string
    studentId?: string | null
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    answers?: AnswerUncheckedCreateNestedManyWithoutExamResultInput
    aiAnalysisData?: AiAnalysisAggregateUncheckedCreateNestedOneWithoutExamResultInput
    aiSession?: AiSessionUncheckedCreateNestedOneWithoutExamResultInput
  }

  export type ExamResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exam?: ExamUpdateOneRequiredWithoutExamResultsNestedInput
    student?: StudentUpdateOneWithoutExamResultsNestedInput
    answers?: AnswerUpdateManyWithoutExamResultNestedInput
    aiAnalysisData?: AiAnalysisAggregateUpdateOneWithoutExamResultNestedInput
    aiSession?: AiSessionUpdateOneWithoutExamResultNestedInput
  }

  export type ExamResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: AnswerUncheckedUpdateManyWithoutExamResultNestedInput
    aiAnalysisData?: AiAnalysisAggregateUncheckedUpdateOneWithoutExamResultNestedInput
    aiSession?: AiSessionUncheckedUpdateOneWithoutExamResultNestedInput
  }

  export type ExamResultCreateManyInput = {
    id?: string
    examId: string
    studentId?: string | null
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ExamResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExamResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnswerCreateInput = {
    id?: string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: string | null
    points?: number
    maxPoints?: number
    questionDisplayedAt?: Date | string | null
    firstInteractionAt?: Date | string | null
    lastModifiedAt?: Date | string | null
    answeredAt?: Date | string
    totalViewTime?: number | null
    interactionCount?: number
    hesitationScore?: number | null
    examResult: ExamResultCreateNestedOneWithoutAnswersInput
    question: QuestionCreateNestedOneWithoutAnswersInput
  }

  export type AnswerUncheckedCreateInput = {
    id?: string
    examResultId: string
    questionId: string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: string | null
    points?: number
    maxPoints?: number
    questionDisplayedAt?: Date | string | null
    firstInteractionAt?: Date | string | null
    lastModifiedAt?: Date | string | null
    answeredAt?: Date | string
    totalViewTime?: number | null
    interactionCount?: number
    hesitationScore?: number | null
  }

  export type AnswerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    points?: FloatFieldUpdateOperationsInput | number
    maxPoints?: FloatFieldUpdateOperationsInput | number
    questionDisplayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastModifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalViewTime?: NullableIntFieldUpdateOperationsInput | number | null
    interactionCount?: IntFieldUpdateOperationsInput | number
    hesitationScore?: NullableFloatFieldUpdateOperationsInput | number | null
    examResult?: ExamResultUpdateOneRequiredWithoutAnswersNestedInput
    question?: QuestionUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type AnswerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    examResultId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    points?: FloatFieldUpdateOperationsInput | number
    maxPoints?: FloatFieldUpdateOperationsInput | number
    questionDisplayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastModifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalViewTime?: NullableIntFieldUpdateOperationsInput | number | null
    interactionCount?: IntFieldUpdateOperationsInput | number
    hesitationScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AnswerCreateManyInput = {
    id?: string
    examResultId: string
    questionId: string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: string | null
    points?: number
    maxPoints?: number
    questionDisplayedAt?: Date | string | null
    firstInteractionAt?: Date | string | null
    lastModifiedAt?: Date | string | null
    answeredAt?: Date | string
    totalViewTime?: number | null
    interactionCount?: number
    hesitationScore?: number | null
  }

  export type AnswerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    points?: FloatFieldUpdateOperationsInput | number
    maxPoints?: FloatFieldUpdateOperationsInput | number
    questionDisplayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastModifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalViewTime?: NullableIntFieldUpdateOperationsInput | number | null
    interactionCount?: IntFieldUpdateOperationsInput | number
    hesitationScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AnswerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    examResultId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    points?: FloatFieldUpdateOperationsInput | number
    maxPoints?: FloatFieldUpdateOperationsInput | number
    questionDisplayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastModifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalViewTime?: NullableIntFieldUpdateOperationsInput | number | null
    interactionCount?: IntFieldUpdateOperationsInput | number
    hesitationScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AiSessionCreateInput = {
    id: string
    sessionId: string
    status?: $Enums.AiSessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: string | null
    checkpointCount?: number
    fileSize?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    examResult?: ExamResultCreateNestedOneWithoutAiSessionInput
    aggregate?: AiAnalysisAggregateCreateNestedOneWithoutSessionInput
    anomalies?: AiAnomalyCreateNestedManyWithoutSessionInput
    checkpoints?: AiCheckpointCreateNestedManyWithoutSessionInput
  }

  export type AiSessionUncheckedCreateInput = {
    id: string
    sessionId: string
    examResultId?: string | null
    status?: $Enums.AiSessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: string | null
    checkpointCount?: number
    fileSize?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aggregate?: AiAnalysisAggregateUncheckedCreateNestedOneWithoutSessionInput
    anomalies?: AiAnomalyUncheckedCreateNestedManyWithoutSessionInput
    checkpoints?: AiCheckpointUncheckedCreateNestedManyWithoutSessionInput
  }

  export type AiSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    status?: EnumAiSessionStatusFieldUpdateOperationsInput | $Enums.AiSessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointCount?: IntFieldUpdateOperationsInput | number
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examResult?: ExamResultUpdateOneWithoutAiSessionNestedInput
    aggregate?: AiAnalysisAggregateUpdateOneWithoutSessionNestedInput
    anomalies?: AiAnomalyUpdateManyWithoutSessionNestedInput
    checkpoints?: AiCheckpointUpdateManyWithoutSessionNestedInput
  }

  export type AiSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    examResultId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAiSessionStatusFieldUpdateOperationsInput | $Enums.AiSessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointCount?: IntFieldUpdateOperationsInput | number
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aggregate?: AiAnalysisAggregateUncheckedUpdateOneWithoutSessionNestedInput
    anomalies?: AiAnomalyUncheckedUpdateManyWithoutSessionNestedInput
    checkpoints?: AiCheckpointUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type AiSessionCreateManyInput = {
    id: string
    sessionId: string
    examResultId?: string | null
    status?: $Enums.AiSessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: string | null
    checkpointCount?: number
    fileSize?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    status?: EnumAiSessionStatusFieldUpdateOperationsInput | $Enums.AiSessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointCount?: IntFieldUpdateOperationsInput | number
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    examResultId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAiSessionStatusFieldUpdateOperationsInput | $Enums.AiSessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointCount?: IntFieldUpdateOperationsInput | number
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiAnalysisAggregateCreateInput = {
    id?: string
    avgValence?: number | null
    avgArousal?: number | null
    dominantEmotion?: string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: number | null
    attentionVariability?: number | null
    distractionEvents?: number
    engagementScore?: number | null
    consistencyScore?: number | null
    avgHeartRate?: number | null
    heartRateVariability?: number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: number
    analysisConfidence?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    session: AiSessionCreateNestedOneWithoutAggregateInput
    examResult: ExamResultCreateNestedOneWithoutAiAnalysisDataInput
  }

  export type AiAnalysisAggregateUncheckedCreateInput = {
    id?: string
    sessionId: string
    examResultId: string
    avgValence?: number | null
    avgArousal?: number | null
    dominantEmotion?: string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: number | null
    attentionVariability?: number | null
    distractionEvents?: number
    engagementScore?: number | null
    consistencyScore?: number | null
    avgHeartRate?: number | null
    heartRateVariability?: number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: number
    analysisConfidence?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiAnalysisAggregateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    avgValence?: NullableFloatFieldUpdateOperationsInput | number | null
    avgArousal?: NullableFloatFieldUpdateOperationsInput | number | null
    dominantEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: NullableFloatFieldUpdateOperationsInput | number | null
    attentionVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    distractionEvents?: IntFieldUpdateOperationsInput | number
    engagementScore?: NullableFloatFieldUpdateOperationsInput | number | null
    consistencyScore?: NullableFloatFieldUpdateOperationsInput | number | null
    avgHeartRate?: NullableFloatFieldUpdateOperationsInput | number | null
    heartRateVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: FloatFieldUpdateOperationsInput | number
    analysisConfidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: AiSessionUpdateOneRequiredWithoutAggregateNestedInput
    examResult?: ExamResultUpdateOneRequiredWithoutAiAnalysisDataNestedInput
  }

  export type AiAnalysisAggregateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    examResultId?: StringFieldUpdateOperationsInput | string
    avgValence?: NullableFloatFieldUpdateOperationsInput | number | null
    avgArousal?: NullableFloatFieldUpdateOperationsInput | number | null
    dominantEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: NullableFloatFieldUpdateOperationsInput | number | null
    attentionVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    distractionEvents?: IntFieldUpdateOperationsInput | number
    engagementScore?: NullableFloatFieldUpdateOperationsInput | number | null
    consistencyScore?: NullableFloatFieldUpdateOperationsInput | number | null
    avgHeartRate?: NullableFloatFieldUpdateOperationsInput | number | null
    heartRateVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: FloatFieldUpdateOperationsInput | number
    analysisConfidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiAnalysisAggregateCreateManyInput = {
    id?: string
    sessionId: string
    examResultId: string
    avgValence?: number | null
    avgArousal?: number | null
    dominantEmotion?: string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: number | null
    attentionVariability?: number | null
    distractionEvents?: number
    engagementScore?: number | null
    consistencyScore?: number | null
    avgHeartRate?: number | null
    heartRateVariability?: number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: number
    analysisConfidence?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiAnalysisAggregateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    avgValence?: NullableFloatFieldUpdateOperationsInput | number | null
    avgArousal?: NullableFloatFieldUpdateOperationsInput | number | null
    dominantEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: NullableFloatFieldUpdateOperationsInput | number | null
    attentionVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    distractionEvents?: IntFieldUpdateOperationsInput | number
    engagementScore?: NullableFloatFieldUpdateOperationsInput | number | null
    consistencyScore?: NullableFloatFieldUpdateOperationsInput | number | null
    avgHeartRate?: NullableFloatFieldUpdateOperationsInput | number | null
    heartRateVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: FloatFieldUpdateOperationsInput | number
    analysisConfidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiAnalysisAggregateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    examResultId?: StringFieldUpdateOperationsInput | string
    avgValence?: NullableFloatFieldUpdateOperationsInput | number | null
    avgArousal?: NullableFloatFieldUpdateOperationsInput | number | null
    dominantEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: NullableFloatFieldUpdateOperationsInput | number | null
    attentionVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    distractionEvents?: IntFieldUpdateOperationsInput | number
    engagementScore?: NullableFloatFieldUpdateOperationsInput | number | null
    consistencyScore?: NullableFloatFieldUpdateOperationsInput | number | null
    avgHeartRate?: NullableFloatFieldUpdateOperationsInput | number | null
    heartRateVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: FloatFieldUpdateOperationsInput | number
    analysisConfidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiAnomalyCreateInput = {
    id?: string
    type: $Enums.AnomalyType
    severity: $Enums.AnomalySeverity
    timestamp: Date | string
    duration?: number | null
    confidence?: number
    description: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    session: AiSessionCreateNestedOneWithoutAnomaliesInput
  }

  export type AiAnomalyUncheckedCreateInput = {
    id?: string
    sessionId: string
    type: $Enums.AnomalyType
    severity: $Enums.AnomalySeverity
    timestamp: Date | string
    duration?: number | null
    confidence?: number
    description: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AiAnomalyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnomalyTypeFieldUpdateOperationsInput | $Enums.AnomalyType
    severity?: EnumAnomalySeverityFieldUpdateOperationsInput | $Enums.AnomalySeverity
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    confidence?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: AiSessionUpdateOneRequiredWithoutAnomaliesNestedInput
  }

  export type AiAnomalyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    type?: EnumAnomalyTypeFieldUpdateOperationsInput | $Enums.AnomalyType
    severity?: EnumAnomalySeverityFieldUpdateOperationsInput | $Enums.AnomalySeverity
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    confidence?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiAnomalyCreateManyInput = {
    id?: string
    sessionId: string
    type: $Enums.AnomalyType
    severity: $Enums.AnomalySeverity
    timestamp: Date | string
    duration?: number | null
    confidence?: number
    description: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AiAnomalyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnomalyTypeFieldUpdateOperationsInput | $Enums.AnomalyType
    severity?: EnumAnomalySeverityFieldUpdateOperationsInput | $Enums.AnomalySeverity
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    confidence?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiAnomalyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    type?: EnumAnomalyTypeFieldUpdateOperationsInput | $Enums.AnomalyType
    severity?: EnumAnomalySeverityFieldUpdateOperationsInput | $Enums.AnomalySeverity
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    confidence?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiCheckpointCreateInput = {
    id?: string
    timestamp: Date | string
    eventType: $Enums.CheckpointType
    metadata?: NullableJsonNullValueInput | InputJsonValue
    session: AiSessionCreateNestedOneWithoutCheckpointsInput
  }

  export type AiCheckpointUncheckedCreateInput = {
    id?: string
    sessionId: string
    timestamp: Date | string
    eventType: $Enums.CheckpointType
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AiCheckpointUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: EnumCheckpointTypeFieldUpdateOperationsInput | $Enums.CheckpointType
    metadata?: NullableJsonNullValueInput | InputJsonValue
    session?: AiSessionUpdateOneRequiredWithoutCheckpointsNestedInput
  }

  export type AiCheckpointUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: EnumCheckpointTypeFieldUpdateOperationsInput | $Enums.CheckpointType
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AiCheckpointCreateManyInput = {
    id?: string
    sessionId: string
    timestamp: Date | string
    eventType: $Enums.CheckpointType
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AiCheckpointUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: EnumCheckpointTypeFieldUpdateOperationsInput | $Enums.CheckpointType
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AiCheckpointUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: EnumCheckpointTypeFieldUpdateOperationsInput | $Enums.CheckpointType
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SystemLogCreateInput = {
    id?: string
    level: $Enums.LogLevel
    service: string
    category: string
    message: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    userId?: string | null
    sessionId?: string | null
    requestId?: string | null
    ipAddress?: string | null
  }

  export type SystemLogUncheckedCreateInput = {
    id?: string
    level: $Enums.LogLevel
    service: string
    category: string
    message: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    userId?: string | null
    sessionId?: string | null
    requestId?: string | null
    ipAddress?: string | null
  }

  export type SystemLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    service?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SystemLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    service?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SystemLogCreateManyInput = {
    id?: string
    level: $Enums.LogLevel
    service: string
    category: string
    message: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    userId?: string | null
    sessionId?: string | null
    requestId?: string | null
    ipAddress?: string | null
  }

  export type SystemLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    service?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SystemLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    service?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SystemConfigCreateInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemConfigUncheckedCreateInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigCreateManyInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: $Enums.AuditAction
    resource: string
    resourceId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    userId?: string | null
    sessionId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    action: $Enums.AuditAction
    resource: string
    resourceId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    userId?: string | null
    sessionId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    action: $Enums.AuditAction
    resource: string
    resourceId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    userId?: string | null
    sessionId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PaperListRelationFilter = {
    every?: PaperWhereInput
    some?: PaperWhereInput
    none?: PaperWhereInput
  }

  export type ExamListRelationFilter = {
    every?: ExamWhereInput
    some?: ExamWhereInput
    none?: ExamWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PaperOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeacherCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    phoneNumber?: SortOrder
    department?: SortOrder
    title?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type TeacherMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    phoneNumber?: SortOrder
    department?: SortOrder
    title?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type TeacherMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    phoneNumber?: SortOrder
    department?: SortOrder
    title?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ExamResultListRelationFilter = {
    every?: ExamResultWhereInput
    some?: ExamResultWhereInput
    none?: ExamResultWhereInput
  }

  export type ExamResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    participantId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    grade?: SortOrder
    class?: SortOrder
    studentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    participantId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    grade?: SortOrder
    class?: SortOrder
    studentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    participantId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    grade?: SortOrder
    class?: SortOrder
    studentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TeacherRelationFilter = {
    is?: TeacherWhereInput
    isNot?: TeacherWhereInput
  }

  export type QuestionListRelationFilter = {
    every?: QuestionWhereInput
    some?: QuestionWhereInput
    none?: QuestionWhereInput
  }

  export type QuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaperCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    timeLimit?: SortOrder
    allowRetake?: SortOrder
    showResultsImmediately?: SortOrder
    randomizeQuestions?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PaperAvgOrderByAggregateInput = {
    timeLimit?: SortOrder
  }

  export type PaperMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    timeLimit?: SortOrder
    allowRetake?: SortOrder
    showResultsImmediately?: SortOrder
    randomizeQuestions?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PaperMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    timeLimit?: SortOrder
    allowRetake?: SortOrder
    showResultsImmediately?: SortOrder
    randomizeQuestions?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PaperSumOrderByAggregateInput = {
    timeLimit?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PaperRelationFilter = {
    is?: PaperWhereInput
    isNot?: PaperWhereInput
  }

  export type AnswerListRelationFilter = {
    every?: AnswerWhereInput
    some?: AnswerWhereInput
    none?: AnswerWhereInput
  }

  export type AnswerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuestionCountOrderByAggregateInput = {
    id?: SortOrder
    paperId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    description?: SortOrder
    dimension?: SortOrder
    explanation?: SortOrder
    order?: SortOrder
    required?: SortOrder
    points?: SortOrder
    displayCondition?: SortOrder
    options?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type QuestionAvgOrderByAggregateInput = {
    order?: SortOrder
    points?: SortOrder
  }

  export type QuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    paperId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    description?: SortOrder
    dimension?: SortOrder
    explanation?: SortOrder
    order?: SortOrder
    required?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type QuestionMinOrderByAggregateInput = {
    id?: SortOrder
    paperId?: SortOrder
    title?: SortOrder
    type?: SortOrder
    description?: SortOrder
    dimension?: SortOrder
    explanation?: SortOrder
    order?: SortOrder
    required?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type QuestionSumOrderByAggregateInput = {
    order?: SortOrder
    points?: SortOrder
  }

  export type EnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumExamStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamStatus | EnumExamStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExamStatus[] | ListEnumExamStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExamStatus[] | ListEnumExamStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExamStatusFilter<$PrismaModel> | $Enums.ExamStatus
  }

  export type ExamCountOrderByAggregateInput = {
    id?: SortOrder
    paperId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timeLimit?: SortOrder
    accessCode?: SortOrder
    allowedStudents?: SortOrder
    maxAttempts?: SortOrder
    requireCamera?: SortOrder
    requireMicrophone?: SortOrder
    enableAIAnalysis?: SortOrder
    status?: SortOrder
    paperSnapshot?: SortOrder
    questionsSnapshot?: SortOrder
    snapshotCreatedAt?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    scheduledDeletionAt?: SortOrder
  }

  export type ExamAvgOrderByAggregateInput = {
    timeLimit?: SortOrder
    maxAttempts?: SortOrder
  }

  export type ExamMaxOrderByAggregateInput = {
    id?: SortOrder
    paperId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timeLimit?: SortOrder
    accessCode?: SortOrder
    maxAttempts?: SortOrder
    requireCamera?: SortOrder
    requireMicrophone?: SortOrder
    enableAIAnalysis?: SortOrder
    status?: SortOrder
    snapshotCreatedAt?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    scheduledDeletionAt?: SortOrder
  }

  export type ExamMinOrderByAggregateInput = {
    id?: SortOrder
    paperId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timeLimit?: SortOrder
    accessCode?: SortOrder
    maxAttempts?: SortOrder
    requireCamera?: SortOrder
    requireMicrophone?: SortOrder
    enableAIAnalysis?: SortOrder
    status?: SortOrder
    snapshotCreatedAt?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    scheduledDeletionAt?: SortOrder
  }

  export type ExamSumOrderByAggregateInput = {
    timeLimit?: SortOrder
    maxAttempts?: SortOrder
  }

  export type EnumExamStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamStatus | EnumExamStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExamStatus[] | ListEnumExamStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExamStatus[] | ListEnumExamStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExamStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExamStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExamStatusFilter<$PrismaModel>
    _max?: NestedEnumExamStatusFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ExamRelationFilter = {
    is?: ExamWhereInput
    isNot?: ExamWhereInput
  }

  export type StudentNullableRelationFilter = {
    is?: StudentWhereInput | null
    isNot?: StudentWhereInput | null
  }

  export type AiAnalysisAggregateNullableRelationFilter = {
    is?: AiAnalysisAggregateWhereInput | null
    isNot?: AiAnalysisAggregateWhereInput | null
  }

  export type AiSessionNullableRelationFilter = {
    is?: AiSessionWhereInput | null
    isNot?: AiSessionWhereInput | null
  }

  export type ExamResultCountOrderByAggregateInput = {
    id?: SortOrder
    examId?: SortOrder
    studentId?: SortOrder
    participantId?: SortOrder
    participantName?: SortOrder
    startedAt?: SortOrder
    submittedAt?: SortOrder
    timeSpent?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    percentage?: SortOrder
    isCompleted?: SortOrder
    isValid?: SortOrder
    aiSessionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ExamResultAvgOrderByAggregateInput = {
    timeSpent?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    percentage?: SortOrder
  }

  export type ExamResultMaxOrderByAggregateInput = {
    id?: SortOrder
    examId?: SortOrder
    studentId?: SortOrder
    participantId?: SortOrder
    participantName?: SortOrder
    startedAt?: SortOrder
    submittedAt?: SortOrder
    timeSpent?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    percentage?: SortOrder
    isCompleted?: SortOrder
    isValid?: SortOrder
    aiSessionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ExamResultMinOrderByAggregateInput = {
    id?: SortOrder
    examId?: SortOrder
    studentId?: SortOrder
    participantId?: SortOrder
    participantName?: SortOrder
    startedAt?: SortOrder
    submittedAt?: SortOrder
    timeSpent?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    percentage?: SortOrder
    isCompleted?: SortOrder
    isValid?: SortOrder
    aiSessionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ExamResultSumOrderByAggregateInput = {
    timeSpent?: SortOrder
    totalScore?: SortOrder
    maxScore?: SortOrder
    percentage?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ExamResultRelationFilter = {
    is?: ExamResultWhereInput
    isNot?: ExamResultWhereInput
  }

  export type QuestionRelationFilter = {
    is?: QuestionWhereInput
    isNot?: QuestionWhereInput
  }

  export type AnswerExamResultIdQuestionIdCompoundUniqueInput = {
    examResultId: string
    questionId: string
  }

  export type AnswerCountOrderByAggregateInput = {
    id?: SortOrder
    examResultId?: SortOrder
    questionId?: SortOrder
    selectedOptions?: SortOrder
    textAnswer?: SortOrder
    points?: SortOrder
    maxPoints?: SortOrder
    questionDisplayedAt?: SortOrder
    firstInteractionAt?: SortOrder
    lastModifiedAt?: SortOrder
    answeredAt?: SortOrder
    totalViewTime?: SortOrder
    interactionCount?: SortOrder
    hesitationScore?: SortOrder
  }

  export type AnswerAvgOrderByAggregateInput = {
    points?: SortOrder
    maxPoints?: SortOrder
    totalViewTime?: SortOrder
    interactionCount?: SortOrder
    hesitationScore?: SortOrder
  }

  export type AnswerMaxOrderByAggregateInput = {
    id?: SortOrder
    examResultId?: SortOrder
    questionId?: SortOrder
    textAnswer?: SortOrder
    points?: SortOrder
    maxPoints?: SortOrder
    questionDisplayedAt?: SortOrder
    firstInteractionAt?: SortOrder
    lastModifiedAt?: SortOrder
    answeredAt?: SortOrder
    totalViewTime?: SortOrder
    interactionCount?: SortOrder
    hesitationScore?: SortOrder
  }

  export type AnswerMinOrderByAggregateInput = {
    id?: SortOrder
    examResultId?: SortOrder
    questionId?: SortOrder
    textAnswer?: SortOrder
    points?: SortOrder
    maxPoints?: SortOrder
    questionDisplayedAt?: SortOrder
    firstInteractionAt?: SortOrder
    lastModifiedAt?: SortOrder
    answeredAt?: SortOrder
    totalViewTime?: SortOrder
    interactionCount?: SortOrder
    hesitationScore?: SortOrder
  }

  export type AnswerSumOrderByAggregateInput = {
    points?: SortOrder
    maxPoints?: SortOrder
    totalViewTime?: SortOrder
    interactionCount?: SortOrder
    hesitationScore?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumAiSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AiSessionStatus | EnumAiSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AiSessionStatus[] | ListEnumAiSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AiSessionStatus[] | ListEnumAiSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAiSessionStatusFilter<$PrismaModel> | $Enums.AiSessionStatus
  }

  export type ExamResultNullableRelationFilter = {
    is?: ExamResultWhereInput | null
    isNot?: ExamResultWhereInput | null
  }

  export type AiAnomalyListRelationFilter = {
    every?: AiAnomalyWhereInput
    some?: AiAnomalyWhereInput
    none?: AiAnomalyWhereInput
  }

  export type AiCheckpointListRelationFilter = {
    every?: AiCheckpointWhereInput
    some?: AiCheckpointWhereInput
    none?: AiCheckpointWhereInput
  }

  export type AiAnomalyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AiCheckpointOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AiSessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    examResultId?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    clientInfo?: SortOrder
    streamInfo?: SortOrder
    checkpointFilePath?: SortOrder
    checkpointCount?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiSessionAvgOrderByAggregateInput = {
    checkpointCount?: SortOrder
    fileSize?: SortOrder
  }

  export type AiSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    examResultId?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    checkpointFilePath?: SortOrder
    checkpointCount?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiSessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    examResultId?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    checkpointFilePath?: SortOrder
    checkpointCount?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiSessionSumOrderByAggregateInput = {
    checkpointCount?: SortOrder
    fileSize?: SortOrder
  }

  export type EnumAiSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AiSessionStatus | EnumAiSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AiSessionStatus[] | ListEnumAiSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AiSessionStatus[] | ListEnumAiSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAiSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.AiSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAiSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumAiSessionStatusFilter<$PrismaModel>
  }

  export type AiSessionRelationFilter = {
    is?: AiSessionWhereInput
    isNot?: AiSessionWhereInput
  }

  export type AiAnalysisAggregateCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    examResultId?: SortOrder
    avgValence?: SortOrder
    avgArousal?: SortOrder
    dominantEmotion?: SortOrder
    emotionDistribution?: SortOrder
    avgAttention?: SortOrder
    attentionVariability?: SortOrder
    distractionEvents?: SortOrder
    engagementScore?: SortOrder
    consistencyScore?: SortOrder
    avgHeartRate?: SortOrder
    heartRateVariability?: SortOrder
    stressIndicators?: SortOrder
    dataQuality?: SortOrder
    analysisConfidence?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiAnalysisAggregateAvgOrderByAggregateInput = {
    avgValence?: SortOrder
    avgArousal?: SortOrder
    avgAttention?: SortOrder
    attentionVariability?: SortOrder
    distractionEvents?: SortOrder
    engagementScore?: SortOrder
    consistencyScore?: SortOrder
    avgHeartRate?: SortOrder
    heartRateVariability?: SortOrder
    dataQuality?: SortOrder
    analysisConfidence?: SortOrder
  }

  export type AiAnalysisAggregateMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    examResultId?: SortOrder
    avgValence?: SortOrder
    avgArousal?: SortOrder
    dominantEmotion?: SortOrder
    avgAttention?: SortOrder
    attentionVariability?: SortOrder
    distractionEvents?: SortOrder
    engagementScore?: SortOrder
    consistencyScore?: SortOrder
    avgHeartRate?: SortOrder
    heartRateVariability?: SortOrder
    dataQuality?: SortOrder
    analysisConfidence?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiAnalysisAggregateMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    examResultId?: SortOrder
    avgValence?: SortOrder
    avgArousal?: SortOrder
    dominantEmotion?: SortOrder
    avgAttention?: SortOrder
    attentionVariability?: SortOrder
    distractionEvents?: SortOrder
    engagementScore?: SortOrder
    consistencyScore?: SortOrder
    avgHeartRate?: SortOrder
    heartRateVariability?: SortOrder
    dataQuality?: SortOrder
    analysisConfidence?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiAnalysisAggregateSumOrderByAggregateInput = {
    avgValence?: SortOrder
    avgArousal?: SortOrder
    avgAttention?: SortOrder
    attentionVariability?: SortOrder
    distractionEvents?: SortOrder
    engagementScore?: SortOrder
    consistencyScore?: SortOrder
    avgHeartRate?: SortOrder
    heartRateVariability?: SortOrder
    dataQuality?: SortOrder
    analysisConfidence?: SortOrder
  }

  export type EnumAnomalyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AnomalyType | EnumAnomalyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnomalyType[] | ListEnumAnomalyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnomalyType[] | ListEnumAnomalyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnomalyTypeFilter<$PrismaModel> | $Enums.AnomalyType
  }

  export type EnumAnomalySeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.AnomalySeverity | EnumAnomalySeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AnomalySeverity[] | ListEnumAnomalySeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnomalySeverity[] | ListEnumAnomalySeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAnomalySeverityFilter<$PrismaModel> | $Enums.AnomalySeverity
  }

  export type AiAnomalyCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    timestamp?: SortOrder
    duration?: SortOrder
    confidence?: SortOrder
    description?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AiAnomalyAvgOrderByAggregateInput = {
    duration?: SortOrder
    confidence?: SortOrder
  }

  export type AiAnomalyMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    timestamp?: SortOrder
    duration?: SortOrder
    confidence?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type AiAnomalyMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    timestamp?: SortOrder
    duration?: SortOrder
    confidence?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type AiAnomalySumOrderByAggregateInput = {
    duration?: SortOrder
    confidence?: SortOrder
  }

  export type EnumAnomalyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnomalyType | EnumAnomalyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnomalyType[] | ListEnumAnomalyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnomalyType[] | ListEnumAnomalyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnomalyTypeWithAggregatesFilter<$PrismaModel> | $Enums.AnomalyType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnomalyTypeFilter<$PrismaModel>
    _max?: NestedEnumAnomalyTypeFilter<$PrismaModel>
  }

  export type EnumAnomalySeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnomalySeverity | EnumAnomalySeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AnomalySeverity[] | ListEnumAnomalySeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnomalySeverity[] | ListEnumAnomalySeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAnomalySeverityWithAggregatesFilter<$PrismaModel> | $Enums.AnomalySeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnomalySeverityFilter<$PrismaModel>
    _max?: NestedEnumAnomalySeverityFilter<$PrismaModel>
  }

  export type EnumCheckpointTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CheckpointType | EnumCheckpointTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CheckpointType[] | ListEnumCheckpointTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CheckpointType[] | ListEnumCheckpointTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCheckpointTypeFilter<$PrismaModel> | $Enums.CheckpointType
  }

  export type AiCheckpointCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    timestamp?: SortOrder
    eventType?: SortOrder
    metadata?: SortOrder
  }

  export type AiCheckpointMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    timestamp?: SortOrder
    eventType?: SortOrder
  }

  export type AiCheckpointMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    timestamp?: SortOrder
    eventType?: SortOrder
  }

  export type EnumCheckpointTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CheckpointType | EnumCheckpointTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CheckpointType[] | ListEnumCheckpointTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CheckpointType[] | ListEnumCheckpointTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCheckpointTypeWithAggregatesFilter<$PrismaModel> | $Enums.CheckpointType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCheckpointTypeFilter<$PrismaModel>
    _max?: NestedEnumCheckpointTypeFilter<$PrismaModel>
  }

  export type EnumLogLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelFilter<$PrismaModel> | $Enums.LogLevel
  }

  export type SystemLogCountOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    service?: SortOrder
    category?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    timestamp?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    requestId?: SortOrder
    ipAddress?: SortOrder
  }

  export type SystemLogMaxOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    service?: SortOrder
    category?: SortOrder
    message?: SortOrder
    timestamp?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    requestId?: SortOrder
    ipAddress?: SortOrder
  }

  export type SystemLogMinOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    service?: SortOrder
    category?: SortOrder
    message?: SortOrder
    timestamp?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    requestId?: SortOrder
    ipAddress?: SortOrder
  }

  export type EnumLogLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelWithAggregatesFilter<$PrismaModel> | $Enums.LogLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLogLevelFilter<$PrismaModel>
    _max?: NestedEnumLogLevelFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SystemConfigCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionFilter<$PrismaModel> | $Enums.AuditAction
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    oldValues?: SortOrder
    newValues?: SortOrder
    changes?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type EnumAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.AuditAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditActionFilter<$PrismaModel>
    _max?: NestedEnumAuditActionFilter<$PrismaModel>
  }

  export type PaperCreateNestedManyWithoutTeacherInput = {
    create?: XOR<PaperCreateWithoutTeacherInput, PaperUncheckedCreateWithoutTeacherInput> | PaperCreateWithoutTeacherInput[] | PaperUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: PaperCreateOrConnectWithoutTeacherInput | PaperCreateOrConnectWithoutTeacherInput[]
    createMany?: PaperCreateManyTeacherInputEnvelope
    connect?: PaperWhereUniqueInput | PaperWhereUniqueInput[]
  }

  export type ExamCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ExamCreateWithoutTeacherInput, ExamUncheckedCreateWithoutTeacherInput> | ExamCreateWithoutTeacherInput[] | ExamUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ExamCreateOrConnectWithoutTeacherInput | ExamCreateOrConnectWithoutTeacherInput[]
    createMany?: ExamCreateManyTeacherInputEnvelope
    connect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
  }

  export type PaperUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<PaperCreateWithoutTeacherInput, PaperUncheckedCreateWithoutTeacherInput> | PaperCreateWithoutTeacherInput[] | PaperUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: PaperCreateOrConnectWithoutTeacherInput | PaperCreateOrConnectWithoutTeacherInput[]
    createMany?: PaperCreateManyTeacherInputEnvelope
    connect?: PaperWhereUniqueInput | PaperWhereUniqueInput[]
  }

  export type ExamUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ExamCreateWithoutTeacherInput, ExamUncheckedCreateWithoutTeacherInput> | ExamCreateWithoutTeacherInput[] | ExamUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ExamCreateOrConnectWithoutTeacherInput | ExamCreateOrConnectWithoutTeacherInput[]
    createMany?: ExamCreateManyTeacherInputEnvelope
    connect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PaperUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<PaperCreateWithoutTeacherInput, PaperUncheckedCreateWithoutTeacherInput> | PaperCreateWithoutTeacherInput[] | PaperUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: PaperCreateOrConnectWithoutTeacherInput | PaperCreateOrConnectWithoutTeacherInput[]
    upsert?: PaperUpsertWithWhereUniqueWithoutTeacherInput | PaperUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: PaperCreateManyTeacherInputEnvelope
    set?: PaperWhereUniqueInput | PaperWhereUniqueInput[]
    disconnect?: PaperWhereUniqueInput | PaperWhereUniqueInput[]
    delete?: PaperWhereUniqueInput | PaperWhereUniqueInput[]
    connect?: PaperWhereUniqueInput | PaperWhereUniqueInput[]
    update?: PaperUpdateWithWhereUniqueWithoutTeacherInput | PaperUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: PaperUpdateManyWithWhereWithoutTeacherInput | PaperUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: PaperScalarWhereInput | PaperScalarWhereInput[]
  }

  export type ExamUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ExamCreateWithoutTeacherInput, ExamUncheckedCreateWithoutTeacherInput> | ExamCreateWithoutTeacherInput[] | ExamUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ExamCreateOrConnectWithoutTeacherInput | ExamCreateOrConnectWithoutTeacherInput[]
    upsert?: ExamUpsertWithWhereUniqueWithoutTeacherInput | ExamUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ExamCreateManyTeacherInputEnvelope
    set?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    disconnect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    delete?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    connect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    update?: ExamUpdateWithWhereUniqueWithoutTeacherInput | ExamUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ExamUpdateManyWithWhereWithoutTeacherInput | ExamUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ExamScalarWhereInput | ExamScalarWhereInput[]
  }

  export type PaperUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<PaperCreateWithoutTeacherInput, PaperUncheckedCreateWithoutTeacherInput> | PaperCreateWithoutTeacherInput[] | PaperUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: PaperCreateOrConnectWithoutTeacherInput | PaperCreateOrConnectWithoutTeacherInput[]
    upsert?: PaperUpsertWithWhereUniqueWithoutTeacherInput | PaperUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: PaperCreateManyTeacherInputEnvelope
    set?: PaperWhereUniqueInput | PaperWhereUniqueInput[]
    disconnect?: PaperWhereUniqueInput | PaperWhereUniqueInput[]
    delete?: PaperWhereUniqueInput | PaperWhereUniqueInput[]
    connect?: PaperWhereUniqueInput | PaperWhereUniqueInput[]
    update?: PaperUpdateWithWhereUniqueWithoutTeacherInput | PaperUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: PaperUpdateManyWithWhereWithoutTeacherInput | PaperUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: PaperScalarWhereInput | PaperScalarWhereInput[]
  }

  export type ExamUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ExamCreateWithoutTeacherInput, ExamUncheckedCreateWithoutTeacherInput> | ExamCreateWithoutTeacherInput[] | ExamUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ExamCreateOrConnectWithoutTeacherInput | ExamCreateOrConnectWithoutTeacherInput[]
    upsert?: ExamUpsertWithWhereUniqueWithoutTeacherInput | ExamUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ExamCreateManyTeacherInputEnvelope
    set?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    disconnect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    delete?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    connect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    update?: ExamUpdateWithWhereUniqueWithoutTeacherInput | ExamUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ExamUpdateManyWithWhereWithoutTeacherInput | ExamUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ExamScalarWhereInput | ExamScalarWhereInput[]
  }

  export type ExamResultCreateNestedManyWithoutStudentInput = {
    create?: XOR<ExamResultCreateWithoutStudentInput, ExamResultUncheckedCreateWithoutStudentInput> | ExamResultCreateWithoutStudentInput[] | ExamResultUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ExamResultCreateOrConnectWithoutStudentInput | ExamResultCreateOrConnectWithoutStudentInput[]
    createMany?: ExamResultCreateManyStudentInputEnvelope
    connect?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
  }

  export type ExamResultUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ExamResultCreateWithoutStudentInput, ExamResultUncheckedCreateWithoutStudentInput> | ExamResultCreateWithoutStudentInput[] | ExamResultUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ExamResultCreateOrConnectWithoutStudentInput | ExamResultCreateOrConnectWithoutStudentInput[]
    createMany?: ExamResultCreateManyStudentInputEnvelope
    connect?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
  }

  export type ExamResultUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ExamResultCreateWithoutStudentInput, ExamResultUncheckedCreateWithoutStudentInput> | ExamResultCreateWithoutStudentInput[] | ExamResultUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ExamResultCreateOrConnectWithoutStudentInput | ExamResultCreateOrConnectWithoutStudentInput[]
    upsert?: ExamResultUpsertWithWhereUniqueWithoutStudentInput | ExamResultUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ExamResultCreateManyStudentInputEnvelope
    set?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    disconnect?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    delete?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    connect?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    update?: ExamResultUpdateWithWhereUniqueWithoutStudentInput | ExamResultUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ExamResultUpdateManyWithWhereWithoutStudentInput | ExamResultUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ExamResultScalarWhereInput | ExamResultScalarWhereInput[]
  }

  export type ExamResultUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ExamResultCreateWithoutStudentInput, ExamResultUncheckedCreateWithoutStudentInput> | ExamResultCreateWithoutStudentInput[] | ExamResultUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ExamResultCreateOrConnectWithoutStudentInput | ExamResultCreateOrConnectWithoutStudentInput[]
    upsert?: ExamResultUpsertWithWhereUniqueWithoutStudentInput | ExamResultUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ExamResultCreateManyStudentInputEnvelope
    set?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    disconnect?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    delete?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    connect?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    update?: ExamResultUpdateWithWhereUniqueWithoutStudentInput | ExamResultUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ExamResultUpdateManyWithWhereWithoutStudentInput | ExamResultUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ExamResultScalarWhereInput | ExamResultScalarWhereInput[]
  }

  export type TeacherCreateNestedOneWithoutPapersInput = {
    create?: XOR<TeacherCreateWithoutPapersInput, TeacherUncheckedCreateWithoutPapersInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutPapersInput
    connect?: TeacherWhereUniqueInput
  }

  export type QuestionCreateNestedManyWithoutPaperInput = {
    create?: XOR<QuestionCreateWithoutPaperInput, QuestionUncheckedCreateWithoutPaperInput> | QuestionCreateWithoutPaperInput[] | QuestionUncheckedCreateWithoutPaperInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutPaperInput | QuestionCreateOrConnectWithoutPaperInput[]
    createMany?: QuestionCreateManyPaperInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type ExamCreateNestedManyWithoutPaperInput = {
    create?: XOR<ExamCreateWithoutPaperInput, ExamUncheckedCreateWithoutPaperInput> | ExamCreateWithoutPaperInput[] | ExamUncheckedCreateWithoutPaperInput[]
    connectOrCreate?: ExamCreateOrConnectWithoutPaperInput | ExamCreateOrConnectWithoutPaperInput[]
    createMany?: ExamCreateManyPaperInputEnvelope
    connect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
  }

  export type QuestionUncheckedCreateNestedManyWithoutPaperInput = {
    create?: XOR<QuestionCreateWithoutPaperInput, QuestionUncheckedCreateWithoutPaperInput> | QuestionCreateWithoutPaperInput[] | QuestionUncheckedCreateWithoutPaperInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutPaperInput | QuestionCreateOrConnectWithoutPaperInput[]
    createMany?: QuestionCreateManyPaperInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type ExamUncheckedCreateNestedManyWithoutPaperInput = {
    create?: XOR<ExamCreateWithoutPaperInput, ExamUncheckedCreateWithoutPaperInput> | ExamCreateWithoutPaperInput[] | ExamUncheckedCreateWithoutPaperInput[]
    connectOrCreate?: ExamCreateOrConnectWithoutPaperInput | ExamCreateOrConnectWithoutPaperInput[]
    createMany?: ExamCreateManyPaperInputEnvelope
    connect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TeacherUpdateOneRequiredWithoutPapersNestedInput = {
    create?: XOR<TeacherCreateWithoutPapersInput, TeacherUncheckedCreateWithoutPapersInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutPapersInput
    upsert?: TeacherUpsertWithoutPapersInput
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutPapersInput, TeacherUpdateWithoutPapersInput>, TeacherUncheckedUpdateWithoutPapersInput>
  }

  export type QuestionUpdateManyWithoutPaperNestedInput = {
    create?: XOR<QuestionCreateWithoutPaperInput, QuestionUncheckedCreateWithoutPaperInput> | QuestionCreateWithoutPaperInput[] | QuestionUncheckedCreateWithoutPaperInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutPaperInput | QuestionCreateOrConnectWithoutPaperInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutPaperInput | QuestionUpsertWithWhereUniqueWithoutPaperInput[]
    createMany?: QuestionCreateManyPaperInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutPaperInput | QuestionUpdateWithWhereUniqueWithoutPaperInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutPaperInput | QuestionUpdateManyWithWhereWithoutPaperInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type ExamUpdateManyWithoutPaperNestedInput = {
    create?: XOR<ExamCreateWithoutPaperInput, ExamUncheckedCreateWithoutPaperInput> | ExamCreateWithoutPaperInput[] | ExamUncheckedCreateWithoutPaperInput[]
    connectOrCreate?: ExamCreateOrConnectWithoutPaperInput | ExamCreateOrConnectWithoutPaperInput[]
    upsert?: ExamUpsertWithWhereUniqueWithoutPaperInput | ExamUpsertWithWhereUniqueWithoutPaperInput[]
    createMany?: ExamCreateManyPaperInputEnvelope
    set?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    disconnect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    delete?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    connect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    update?: ExamUpdateWithWhereUniqueWithoutPaperInput | ExamUpdateWithWhereUniqueWithoutPaperInput[]
    updateMany?: ExamUpdateManyWithWhereWithoutPaperInput | ExamUpdateManyWithWhereWithoutPaperInput[]
    deleteMany?: ExamScalarWhereInput | ExamScalarWhereInput[]
  }

  export type QuestionUncheckedUpdateManyWithoutPaperNestedInput = {
    create?: XOR<QuestionCreateWithoutPaperInput, QuestionUncheckedCreateWithoutPaperInput> | QuestionCreateWithoutPaperInput[] | QuestionUncheckedCreateWithoutPaperInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutPaperInput | QuestionCreateOrConnectWithoutPaperInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutPaperInput | QuestionUpsertWithWhereUniqueWithoutPaperInput[]
    createMany?: QuestionCreateManyPaperInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutPaperInput | QuestionUpdateWithWhereUniqueWithoutPaperInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutPaperInput | QuestionUpdateManyWithWhereWithoutPaperInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type ExamUncheckedUpdateManyWithoutPaperNestedInput = {
    create?: XOR<ExamCreateWithoutPaperInput, ExamUncheckedCreateWithoutPaperInput> | ExamCreateWithoutPaperInput[] | ExamUncheckedCreateWithoutPaperInput[]
    connectOrCreate?: ExamCreateOrConnectWithoutPaperInput | ExamCreateOrConnectWithoutPaperInput[]
    upsert?: ExamUpsertWithWhereUniqueWithoutPaperInput | ExamUpsertWithWhereUniqueWithoutPaperInput[]
    createMany?: ExamCreateManyPaperInputEnvelope
    set?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    disconnect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    delete?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    connect?: ExamWhereUniqueInput | ExamWhereUniqueInput[]
    update?: ExamUpdateWithWhereUniqueWithoutPaperInput | ExamUpdateWithWhereUniqueWithoutPaperInput[]
    updateMany?: ExamUpdateManyWithWhereWithoutPaperInput | ExamUpdateManyWithWhereWithoutPaperInput[]
    deleteMany?: ExamScalarWhereInput | ExamScalarWhereInput[]
  }

  export type PaperCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<PaperCreateWithoutQuestionsInput, PaperUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: PaperCreateOrConnectWithoutQuestionsInput
    connect?: PaperWhereUniqueInput
  }

  export type AnswerCreateNestedManyWithoutQuestionInput = {
    create?: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput> | AnswerCreateWithoutQuestionInput[] | AnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput | AnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: AnswerCreateManyQuestionInputEnvelope
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
  }

  export type AnswerUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput> | AnswerCreateWithoutQuestionInput[] | AnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput | AnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: AnswerCreateManyQuestionInputEnvelope
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
  }

  export type EnumQuestionTypeFieldUpdateOperationsInput = {
    set?: $Enums.QuestionType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PaperUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<PaperCreateWithoutQuestionsInput, PaperUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: PaperCreateOrConnectWithoutQuestionsInput
    upsert?: PaperUpsertWithoutQuestionsInput
    connect?: PaperWhereUniqueInput
    update?: XOR<XOR<PaperUpdateToOneWithWhereWithoutQuestionsInput, PaperUpdateWithoutQuestionsInput>, PaperUncheckedUpdateWithoutQuestionsInput>
  }

  export type AnswerUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput> | AnswerCreateWithoutQuestionInput[] | AnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput | AnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: AnswerUpsertWithWhereUniqueWithoutQuestionInput | AnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: AnswerCreateManyQuestionInputEnvelope
    set?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    disconnect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    delete?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    update?: AnswerUpdateWithWhereUniqueWithoutQuestionInput | AnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: AnswerUpdateManyWithWhereWithoutQuestionInput | AnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
  }

  export type AnswerUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput> | AnswerCreateWithoutQuestionInput[] | AnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput | AnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: AnswerUpsertWithWhereUniqueWithoutQuestionInput | AnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: AnswerCreateManyQuestionInputEnvelope
    set?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    disconnect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    delete?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    update?: AnswerUpdateWithWhereUniqueWithoutQuestionInput | AnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: AnswerUpdateManyWithWhereWithoutQuestionInput | AnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
  }

  export type PaperCreateNestedOneWithoutExamsInput = {
    create?: XOR<PaperCreateWithoutExamsInput, PaperUncheckedCreateWithoutExamsInput>
    connectOrCreate?: PaperCreateOrConnectWithoutExamsInput
    connect?: PaperWhereUniqueInput
  }

  export type TeacherCreateNestedOneWithoutExamsInput = {
    create?: XOR<TeacherCreateWithoutExamsInput, TeacherUncheckedCreateWithoutExamsInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutExamsInput
    connect?: TeacherWhereUniqueInput
  }

  export type ExamResultCreateNestedManyWithoutExamInput = {
    create?: XOR<ExamResultCreateWithoutExamInput, ExamResultUncheckedCreateWithoutExamInput> | ExamResultCreateWithoutExamInput[] | ExamResultUncheckedCreateWithoutExamInput[]
    connectOrCreate?: ExamResultCreateOrConnectWithoutExamInput | ExamResultCreateOrConnectWithoutExamInput[]
    createMany?: ExamResultCreateManyExamInputEnvelope
    connect?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
  }

  export type ExamResultUncheckedCreateNestedManyWithoutExamInput = {
    create?: XOR<ExamResultCreateWithoutExamInput, ExamResultUncheckedCreateWithoutExamInput> | ExamResultCreateWithoutExamInput[] | ExamResultUncheckedCreateWithoutExamInput[]
    connectOrCreate?: ExamResultCreateOrConnectWithoutExamInput | ExamResultCreateOrConnectWithoutExamInput[]
    createMany?: ExamResultCreateManyExamInputEnvelope
    connect?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
  }

  export type EnumExamStatusFieldUpdateOperationsInput = {
    set?: $Enums.ExamStatus
  }

  export type PaperUpdateOneRequiredWithoutExamsNestedInput = {
    create?: XOR<PaperCreateWithoutExamsInput, PaperUncheckedCreateWithoutExamsInput>
    connectOrCreate?: PaperCreateOrConnectWithoutExamsInput
    upsert?: PaperUpsertWithoutExamsInput
    connect?: PaperWhereUniqueInput
    update?: XOR<XOR<PaperUpdateToOneWithWhereWithoutExamsInput, PaperUpdateWithoutExamsInput>, PaperUncheckedUpdateWithoutExamsInput>
  }

  export type TeacherUpdateOneRequiredWithoutExamsNestedInput = {
    create?: XOR<TeacherCreateWithoutExamsInput, TeacherUncheckedCreateWithoutExamsInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutExamsInput
    upsert?: TeacherUpsertWithoutExamsInput
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutExamsInput, TeacherUpdateWithoutExamsInput>, TeacherUncheckedUpdateWithoutExamsInput>
  }

  export type ExamResultUpdateManyWithoutExamNestedInput = {
    create?: XOR<ExamResultCreateWithoutExamInput, ExamResultUncheckedCreateWithoutExamInput> | ExamResultCreateWithoutExamInput[] | ExamResultUncheckedCreateWithoutExamInput[]
    connectOrCreate?: ExamResultCreateOrConnectWithoutExamInput | ExamResultCreateOrConnectWithoutExamInput[]
    upsert?: ExamResultUpsertWithWhereUniqueWithoutExamInput | ExamResultUpsertWithWhereUniqueWithoutExamInput[]
    createMany?: ExamResultCreateManyExamInputEnvelope
    set?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    disconnect?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    delete?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    connect?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    update?: ExamResultUpdateWithWhereUniqueWithoutExamInput | ExamResultUpdateWithWhereUniqueWithoutExamInput[]
    updateMany?: ExamResultUpdateManyWithWhereWithoutExamInput | ExamResultUpdateManyWithWhereWithoutExamInput[]
    deleteMany?: ExamResultScalarWhereInput | ExamResultScalarWhereInput[]
  }

  export type ExamResultUncheckedUpdateManyWithoutExamNestedInput = {
    create?: XOR<ExamResultCreateWithoutExamInput, ExamResultUncheckedCreateWithoutExamInput> | ExamResultCreateWithoutExamInput[] | ExamResultUncheckedCreateWithoutExamInput[]
    connectOrCreate?: ExamResultCreateOrConnectWithoutExamInput | ExamResultCreateOrConnectWithoutExamInput[]
    upsert?: ExamResultUpsertWithWhereUniqueWithoutExamInput | ExamResultUpsertWithWhereUniqueWithoutExamInput[]
    createMany?: ExamResultCreateManyExamInputEnvelope
    set?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    disconnect?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    delete?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    connect?: ExamResultWhereUniqueInput | ExamResultWhereUniqueInput[]
    update?: ExamResultUpdateWithWhereUniqueWithoutExamInput | ExamResultUpdateWithWhereUniqueWithoutExamInput[]
    updateMany?: ExamResultUpdateManyWithWhereWithoutExamInput | ExamResultUpdateManyWithWhereWithoutExamInput[]
    deleteMany?: ExamResultScalarWhereInput | ExamResultScalarWhereInput[]
  }

  export type ExamCreateNestedOneWithoutExamResultsInput = {
    create?: XOR<ExamCreateWithoutExamResultsInput, ExamUncheckedCreateWithoutExamResultsInput>
    connectOrCreate?: ExamCreateOrConnectWithoutExamResultsInput
    connect?: ExamWhereUniqueInput
  }

  export type StudentCreateNestedOneWithoutExamResultsInput = {
    create?: XOR<StudentCreateWithoutExamResultsInput, StudentUncheckedCreateWithoutExamResultsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutExamResultsInput
    connect?: StudentWhereUniqueInput
  }

  export type AnswerCreateNestedManyWithoutExamResultInput = {
    create?: XOR<AnswerCreateWithoutExamResultInput, AnswerUncheckedCreateWithoutExamResultInput> | AnswerCreateWithoutExamResultInput[] | AnswerUncheckedCreateWithoutExamResultInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutExamResultInput | AnswerCreateOrConnectWithoutExamResultInput[]
    createMany?: AnswerCreateManyExamResultInputEnvelope
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
  }

  export type AiAnalysisAggregateCreateNestedOneWithoutExamResultInput = {
    create?: XOR<AiAnalysisAggregateCreateWithoutExamResultInput, AiAnalysisAggregateUncheckedCreateWithoutExamResultInput>
    connectOrCreate?: AiAnalysisAggregateCreateOrConnectWithoutExamResultInput
    connect?: AiAnalysisAggregateWhereUniqueInput
  }

  export type AiSessionCreateNestedOneWithoutExamResultInput = {
    create?: XOR<AiSessionCreateWithoutExamResultInput, AiSessionUncheckedCreateWithoutExamResultInput>
    connectOrCreate?: AiSessionCreateOrConnectWithoutExamResultInput
    connect?: AiSessionWhereUniqueInput
  }

  export type AnswerUncheckedCreateNestedManyWithoutExamResultInput = {
    create?: XOR<AnswerCreateWithoutExamResultInput, AnswerUncheckedCreateWithoutExamResultInput> | AnswerCreateWithoutExamResultInput[] | AnswerUncheckedCreateWithoutExamResultInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutExamResultInput | AnswerCreateOrConnectWithoutExamResultInput[]
    createMany?: AnswerCreateManyExamResultInputEnvelope
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
  }

  export type AiAnalysisAggregateUncheckedCreateNestedOneWithoutExamResultInput = {
    create?: XOR<AiAnalysisAggregateCreateWithoutExamResultInput, AiAnalysisAggregateUncheckedCreateWithoutExamResultInput>
    connectOrCreate?: AiAnalysisAggregateCreateOrConnectWithoutExamResultInput
    connect?: AiAnalysisAggregateWhereUniqueInput
  }

  export type AiSessionUncheckedCreateNestedOneWithoutExamResultInput = {
    create?: XOR<AiSessionCreateWithoutExamResultInput, AiSessionUncheckedCreateWithoutExamResultInput>
    connectOrCreate?: AiSessionCreateOrConnectWithoutExamResultInput
    connect?: AiSessionWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ExamUpdateOneRequiredWithoutExamResultsNestedInput = {
    create?: XOR<ExamCreateWithoutExamResultsInput, ExamUncheckedCreateWithoutExamResultsInput>
    connectOrCreate?: ExamCreateOrConnectWithoutExamResultsInput
    upsert?: ExamUpsertWithoutExamResultsInput
    connect?: ExamWhereUniqueInput
    update?: XOR<XOR<ExamUpdateToOneWithWhereWithoutExamResultsInput, ExamUpdateWithoutExamResultsInput>, ExamUncheckedUpdateWithoutExamResultsInput>
  }

  export type StudentUpdateOneWithoutExamResultsNestedInput = {
    create?: XOR<StudentCreateWithoutExamResultsInput, StudentUncheckedCreateWithoutExamResultsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutExamResultsInput
    upsert?: StudentUpsertWithoutExamResultsInput
    disconnect?: StudentWhereInput | boolean
    delete?: StudentWhereInput | boolean
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutExamResultsInput, StudentUpdateWithoutExamResultsInput>, StudentUncheckedUpdateWithoutExamResultsInput>
  }

  export type AnswerUpdateManyWithoutExamResultNestedInput = {
    create?: XOR<AnswerCreateWithoutExamResultInput, AnswerUncheckedCreateWithoutExamResultInput> | AnswerCreateWithoutExamResultInput[] | AnswerUncheckedCreateWithoutExamResultInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutExamResultInput | AnswerCreateOrConnectWithoutExamResultInput[]
    upsert?: AnswerUpsertWithWhereUniqueWithoutExamResultInput | AnswerUpsertWithWhereUniqueWithoutExamResultInput[]
    createMany?: AnswerCreateManyExamResultInputEnvelope
    set?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    disconnect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    delete?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    update?: AnswerUpdateWithWhereUniqueWithoutExamResultInput | AnswerUpdateWithWhereUniqueWithoutExamResultInput[]
    updateMany?: AnswerUpdateManyWithWhereWithoutExamResultInput | AnswerUpdateManyWithWhereWithoutExamResultInput[]
    deleteMany?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
  }

  export type AiAnalysisAggregateUpdateOneWithoutExamResultNestedInput = {
    create?: XOR<AiAnalysisAggregateCreateWithoutExamResultInput, AiAnalysisAggregateUncheckedCreateWithoutExamResultInput>
    connectOrCreate?: AiAnalysisAggregateCreateOrConnectWithoutExamResultInput
    upsert?: AiAnalysisAggregateUpsertWithoutExamResultInput
    disconnect?: AiAnalysisAggregateWhereInput | boolean
    delete?: AiAnalysisAggregateWhereInput | boolean
    connect?: AiAnalysisAggregateWhereUniqueInput
    update?: XOR<XOR<AiAnalysisAggregateUpdateToOneWithWhereWithoutExamResultInput, AiAnalysisAggregateUpdateWithoutExamResultInput>, AiAnalysisAggregateUncheckedUpdateWithoutExamResultInput>
  }

  export type AiSessionUpdateOneWithoutExamResultNestedInput = {
    create?: XOR<AiSessionCreateWithoutExamResultInput, AiSessionUncheckedCreateWithoutExamResultInput>
    connectOrCreate?: AiSessionCreateOrConnectWithoutExamResultInput
    upsert?: AiSessionUpsertWithoutExamResultInput
    disconnect?: AiSessionWhereInput | boolean
    delete?: AiSessionWhereInput | boolean
    connect?: AiSessionWhereUniqueInput
    update?: XOR<XOR<AiSessionUpdateToOneWithWhereWithoutExamResultInput, AiSessionUpdateWithoutExamResultInput>, AiSessionUncheckedUpdateWithoutExamResultInput>
  }

  export type AnswerUncheckedUpdateManyWithoutExamResultNestedInput = {
    create?: XOR<AnswerCreateWithoutExamResultInput, AnswerUncheckedCreateWithoutExamResultInput> | AnswerCreateWithoutExamResultInput[] | AnswerUncheckedCreateWithoutExamResultInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutExamResultInput | AnswerCreateOrConnectWithoutExamResultInput[]
    upsert?: AnswerUpsertWithWhereUniqueWithoutExamResultInput | AnswerUpsertWithWhereUniqueWithoutExamResultInput[]
    createMany?: AnswerCreateManyExamResultInputEnvelope
    set?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    disconnect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    delete?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    update?: AnswerUpdateWithWhereUniqueWithoutExamResultInput | AnswerUpdateWithWhereUniqueWithoutExamResultInput[]
    updateMany?: AnswerUpdateManyWithWhereWithoutExamResultInput | AnswerUpdateManyWithWhereWithoutExamResultInput[]
    deleteMany?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
  }

  export type AiAnalysisAggregateUncheckedUpdateOneWithoutExamResultNestedInput = {
    create?: XOR<AiAnalysisAggregateCreateWithoutExamResultInput, AiAnalysisAggregateUncheckedCreateWithoutExamResultInput>
    connectOrCreate?: AiAnalysisAggregateCreateOrConnectWithoutExamResultInput
    upsert?: AiAnalysisAggregateUpsertWithoutExamResultInput
    disconnect?: AiAnalysisAggregateWhereInput | boolean
    delete?: AiAnalysisAggregateWhereInput | boolean
    connect?: AiAnalysisAggregateWhereUniqueInput
    update?: XOR<XOR<AiAnalysisAggregateUpdateToOneWithWhereWithoutExamResultInput, AiAnalysisAggregateUpdateWithoutExamResultInput>, AiAnalysisAggregateUncheckedUpdateWithoutExamResultInput>
  }

  export type AiSessionUncheckedUpdateOneWithoutExamResultNestedInput = {
    create?: XOR<AiSessionCreateWithoutExamResultInput, AiSessionUncheckedCreateWithoutExamResultInput>
    connectOrCreate?: AiSessionCreateOrConnectWithoutExamResultInput
    upsert?: AiSessionUpsertWithoutExamResultInput
    disconnect?: AiSessionWhereInput | boolean
    delete?: AiSessionWhereInput | boolean
    connect?: AiSessionWhereUniqueInput
    update?: XOR<XOR<AiSessionUpdateToOneWithWhereWithoutExamResultInput, AiSessionUpdateWithoutExamResultInput>, AiSessionUncheckedUpdateWithoutExamResultInput>
  }

  export type ExamResultCreateNestedOneWithoutAnswersInput = {
    create?: XOR<ExamResultCreateWithoutAnswersInput, ExamResultUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: ExamResultCreateOrConnectWithoutAnswersInput
    connect?: ExamResultWhereUniqueInput
  }

  export type QuestionCreateNestedOneWithoutAnswersInput = {
    create?: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutAnswersInput
    connect?: QuestionWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ExamResultUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<ExamResultCreateWithoutAnswersInput, ExamResultUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: ExamResultCreateOrConnectWithoutAnswersInput
    upsert?: ExamResultUpsertWithoutAnswersInput
    connect?: ExamResultWhereUniqueInput
    update?: XOR<XOR<ExamResultUpdateToOneWithWhereWithoutAnswersInput, ExamResultUpdateWithoutAnswersInput>, ExamResultUncheckedUpdateWithoutAnswersInput>
  }

  export type QuestionUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutAnswersInput
    upsert?: QuestionUpsertWithoutAnswersInput
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutAnswersInput, QuestionUpdateWithoutAnswersInput>, QuestionUncheckedUpdateWithoutAnswersInput>
  }

  export type ExamResultCreateNestedOneWithoutAiSessionInput = {
    create?: XOR<ExamResultCreateWithoutAiSessionInput, ExamResultUncheckedCreateWithoutAiSessionInput>
    connectOrCreate?: ExamResultCreateOrConnectWithoutAiSessionInput
    connect?: ExamResultWhereUniqueInput
  }

  export type AiAnalysisAggregateCreateNestedOneWithoutSessionInput = {
    create?: XOR<AiAnalysisAggregateCreateWithoutSessionInput, AiAnalysisAggregateUncheckedCreateWithoutSessionInput>
    connectOrCreate?: AiAnalysisAggregateCreateOrConnectWithoutSessionInput
    connect?: AiAnalysisAggregateWhereUniqueInput
  }

  export type AiAnomalyCreateNestedManyWithoutSessionInput = {
    create?: XOR<AiAnomalyCreateWithoutSessionInput, AiAnomalyUncheckedCreateWithoutSessionInput> | AiAnomalyCreateWithoutSessionInput[] | AiAnomalyUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiAnomalyCreateOrConnectWithoutSessionInput | AiAnomalyCreateOrConnectWithoutSessionInput[]
    createMany?: AiAnomalyCreateManySessionInputEnvelope
    connect?: AiAnomalyWhereUniqueInput | AiAnomalyWhereUniqueInput[]
  }

  export type AiCheckpointCreateNestedManyWithoutSessionInput = {
    create?: XOR<AiCheckpointCreateWithoutSessionInput, AiCheckpointUncheckedCreateWithoutSessionInput> | AiCheckpointCreateWithoutSessionInput[] | AiCheckpointUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiCheckpointCreateOrConnectWithoutSessionInput | AiCheckpointCreateOrConnectWithoutSessionInput[]
    createMany?: AiCheckpointCreateManySessionInputEnvelope
    connect?: AiCheckpointWhereUniqueInput | AiCheckpointWhereUniqueInput[]
  }

  export type AiAnalysisAggregateUncheckedCreateNestedOneWithoutSessionInput = {
    create?: XOR<AiAnalysisAggregateCreateWithoutSessionInput, AiAnalysisAggregateUncheckedCreateWithoutSessionInput>
    connectOrCreate?: AiAnalysisAggregateCreateOrConnectWithoutSessionInput
    connect?: AiAnalysisAggregateWhereUniqueInput
  }

  export type AiAnomalyUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<AiAnomalyCreateWithoutSessionInput, AiAnomalyUncheckedCreateWithoutSessionInput> | AiAnomalyCreateWithoutSessionInput[] | AiAnomalyUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiAnomalyCreateOrConnectWithoutSessionInput | AiAnomalyCreateOrConnectWithoutSessionInput[]
    createMany?: AiAnomalyCreateManySessionInputEnvelope
    connect?: AiAnomalyWhereUniqueInput | AiAnomalyWhereUniqueInput[]
  }

  export type AiCheckpointUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<AiCheckpointCreateWithoutSessionInput, AiCheckpointUncheckedCreateWithoutSessionInput> | AiCheckpointCreateWithoutSessionInput[] | AiCheckpointUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiCheckpointCreateOrConnectWithoutSessionInput | AiCheckpointCreateOrConnectWithoutSessionInput[]
    createMany?: AiCheckpointCreateManySessionInputEnvelope
    connect?: AiCheckpointWhereUniqueInput | AiCheckpointWhereUniqueInput[]
  }

  export type EnumAiSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.AiSessionStatus
  }

  export type ExamResultUpdateOneWithoutAiSessionNestedInput = {
    create?: XOR<ExamResultCreateWithoutAiSessionInput, ExamResultUncheckedCreateWithoutAiSessionInput>
    connectOrCreate?: ExamResultCreateOrConnectWithoutAiSessionInput
    upsert?: ExamResultUpsertWithoutAiSessionInput
    disconnect?: ExamResultWhereInput | boolean
    delete?: ExamResultWhereInput | boolean
    connect?: ExamResultWhereUniqueInput
    update?: XOR<XOR<ExamResultUpdateToOneWithWhereWithoutAiSessionInput, ExamResultUpdateWithoutAiSessionInput>, ExamResultUncheckedUpdateWithoutAiSessionInput>
  }

  export type AiAnalysisAggregateUpdateOneWithoutSessionNestedInput = {
    create?: XOR<AiAnalysisAggregateCreateWithoutSessionInput, AiAnalysisAggregateUncheckedCreateWithoutSessionInput>
    connectOrCreate?: AiAnalysisAggregateCreateOrConnectWithoutSessionInput
    upsert?: AiAnalysisAggregateUpsertWithoutSessionInput
    disconnect?: AiAnalysisAggregateWhereInput | boolean
    delete?: AiAnalysisAggregateWhereInput | boolean
    connect?: AiAnalysisAggregateWhereUniqueInput
    update?: XOR<XOR<AiAnalysisAggregateUpdateToOneWithWhereWithoutSessionInput, AiAnalysisAggregateUpdateWithoutSessionInput>, AiAnalysisAggregateUncheckedUpdateWithoutSessionInput>
  }

  export type AiAnomalyUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AiAnomalyCreateWithoutSessionInput, AiAnomalyUncheckedCreateWithoutSessionInput> | AiAnomalyCreateWithoutSessionInput[] | AiAnomalyUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiAnomalyCreateOrConnectWithoutSessionInput | AiAnomalyCreateOrConnectWithoutSessionInput[]
    upsert?: AiAnomalyUpsertWithWhereUniqueWithoutSessionInput | AiAnomalyUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AiAnomalyCreateManySessionInputEnvelope
    set?: AiAnomalyWhereUniqueInput | AiAnomalyWhereUniqueInput[]
    disconnect?: AiAnomalyWhereUniqueInput | AiAnomalyWhereUniqueInput[]
    delete?: AiAnomalyWhereUniqueInput | AiAnomalyWhereUniqueInput[]
    connect?: AiAnomalyWhereUniqueInput | AiAnomalyWhereUniqueInput[]
    update?: AiAnomalyUpdateWithWhereUniqueWithoutSessionInput | AiAnomalyUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AiAnomalyUpdateManyWithWhereWithoutSessionInput | AiAnomalyUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AiAnomalyScalarWhereInput | AiAnomalyScalarWhereInput[]
  }

  export type AiCheckpointUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AiCheckpointCreateWithoutSessionInput, AiCheckpointUncheckedCreateWithoutSessionInput> | AiCheckpointCreateWithoutSessionInput[] | AiCheckpointUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiCheckpointCreateOrConnectWithoutSessionInput | AiCheckpointCreateOrConnectWithoutSessionInput[]
    upsert?: AiCheckpointUpsertWithWhereUniqueWithoutSessionInput | AiCheckpointUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AiCheckpointCreateManySessionInputEnvelope
    set?: AiCheckpointWhereUniqueInput | AiCheckpointWhereUniqueInput[]
    disconnect?: AiCheckpointWhereUniqueInput | AiCheckpointWhereUniqueInput[]
    delete?: AiCheckpointWhereUniqueInput | AiCheckpointWhereUniqueInput[]
    connect?: AiCheckpointWhereUniqueInput | AiCheckpointWhereUniqueInput[]
    update?: AiCheckpointUpdateWithWhereUniqueWithoutSessionInput | AiCheckpointUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AiCheckpointUpdateManyWithWhereWithoutSessionInput | AiCheckpointUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AiCheckpointScalarWhereInput | AiCheckpointScalarWhereInput[]
  }

  export type AiAnalysisAggregateUncheckedUpdateOneWithoutSessionNestedInput = {
    create?: XOR<AiAnalysisAggregateCreateWithoutSessionInput, AiAnalysisAggregateUncheckedCreateWithoutSessionInput>
    connectOrCreate?: AiAnalysisAggregateCreateOrConnectWithoutSessionInput
    upsert?: AiAnalysisAggregateUpsertWithoutSessionInput
    disconnect?: AiAnalysisAggregateWhereInput | boolean
    delete?: AiAnalysisAggregateWhereInput | boolean
    connect?: AiAnalysisAggregateWhereUniqueInput
    update?: XOR<XOR<AiAnalysisAggregateUpdateToOneWithWhereWithoutSessionInput, AiAnalysisAggregateUpdateWithoutSessionInput>, AiAnalysisAggregateUncheckedUpdateWithoutSessionInput>
  }

  export type AiAnomalyUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AiAnomalyCreateWithoutSessionInput, AiAnomalyUncheckedCreateWithoutSessionInput> | AiAnomalyCreateWithoutSessionInput[] | AiAnomalyUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiAnomalyCreateOrConnectWithoutSessionInput | AiAnomalyCreateOrConnectWithoutSessionInput[]
    upsert?: AiAnomalyUpsertWithWhereUniqueWithoutSessionInput | AiAnomalyUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AiAnomalyCreateManySessionInputEnvelope
    set?: AiAnomalyWhereUniqueInput | AiAnomalyWhereUniqueInput[]
    disconnect?: AiAnomalyWhereUniqueInput | AiAnomalyWhereUniqueInput[]
    delete?: AiAnomalyWhereUniqueInput | AiAnomalyWhereUniqueInput[]
    connect?: AiAnomalyWhereUniqueInput | AiAnomalyWhereUniqueInput[]
    update?: AiAnomalyUpdateWithWhereUniqueWithoutSessionInput | AiAnomalyUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AiAnomalyUpdateManyWithWhereWithoutSessionInput | AiAnomalyUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AiAnomalyScalarWhereInput | AiAnomalyScalarWhereInput[]
  }

  export type AiCheckpointUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AiCheckpointCreateWithoutSessionInput, AiCheckpointUncheckedCreateWithoutSessionInput> | AiCheckpointCreateWithoutSessionInput[] | AiCheckpointUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AiCheckpointCreateOrConnectWithoutSessionInput | AiCheckpointCreateOrConnectWithoutSessionInput[]
    upsert?: AiCheckpointUpsertWithWhereUniqueWithoutSessionInput | AiCheckpointUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AiCheckpointCreateManySessionInputEnvelope
    set?: AiCheckpointWhereUniqueInput | AiCheckpointWhereUniqueInput[]
    disconnect?: AiCheckpointWhereUniqueInput | AiCheckpointWhereUniqueInput[]
    delete?: AiCheckpointWhereUniqueInput | AiCheckpointWhereUniqueInput[]
    connect?: AiCheckpointWhereUniqueInput | AiCheckpointWhereUniqueInput[]
    update?: AiCheckpointUpdateWithWhereUniqueWithoutSessionInput | AiCheckpointUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AiCheckpointUpdateManyWithWhereWithoutSessionInput | AiCheckpointUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AiCheckpointScalarWhereInput | AiCheckpointScalarWhereInput[]
  }

  export type AiSessionCreateNestedOneWithoutAggregateInput = {
    create?: XOR<AiSessionCreateWithoutAggregateInput, AiSessionUncheckedCreateWithoutAggregateInput>
    connectOrCreate?: AiSessionCreateOrConnectWithoutAggregateInput
    connect?: AiSessionWhereUniqueInput
  }

  export type ExamResultCreateNestedOneWithoutAiAnalysisDataInput = {
    create?: XOR<ExamResultCreateWithoutAiAnalysisDataInput, ExamResultUncheckedCreateWithoutAiAnalysisDataInput>
    connectOrCreate?: ExamResultCreateOrConnectWithoutAiAnalysisDataInput
    connect?: ExamResultWhereUniqueInput
  }

  export type AiSessionUpdateOneRequiredWithoutAggregateNestedInput = {
    create?: XOR<AiSessionCreateWithoutAggregateInput, AiSessionUncheckedCreateWithoutAggregateInput>
    connectOrCreate?: AiSessionCreateOrConnectWithoutAggregateInput
    upsert?: AiSessionUpsertWithoutAggregateInput
    connect?: AiSessionWhereUniqueInput
    update?: XOR<XOR<AiSessionUpdateToOneWithWhereWithoutAggregateInput, AiSessionUpdateWithoutAggregateInput>, AiSessionUncheckedUpdateWithoutAggregateInput>
  }

  export type ExamResultUpdateOneRequiredWithoutAiAnalysisDataNestedInput = {
    create?: XOR<ExamResultCreateWithoutAiAnalysisDataInput, ExamResultUncheckedCreateWithoutAiAnalysisDataInput>
    connectOrCreate?: ExamResultCreateOrConnectWithoutAiAnalysisDataInput
    upsert?: ExamResultUpsertWithoutAiAnalysisDataInput
    connect?: ExamResultWhereUniqueInput
    update?: XOR<XOR<ExamResultUpdateToOneWithWhereWithoutAiAnalysisDataInput, ExamResultUpdateWithoutAiAnalysisDataInput>, ExamResultUncheckedUpdateWithoutAiAnalysisDataInput>
  }

  export type AiSessionCreateNestedOneWithoutAnomaliesInput = {
    create?: XOR<AiSessionCreateWithoutAnomaliesInput, AiSessionUncheckedCreateWithoutAnomaliesInput>
    connectOrCreate?: AiSessionCreateOrConnectWithoutAnomaliesInput
    connect?: AiSessionWhereUniqueInput
  }

  export type EnumAnomalyTypeFieldUpdateOperationsInput = {
    set?: $Enums.AnomalyType
  }

  export type EnumAnomalySeverityFieldUpdateOperationsInput = {
    set?: $Enums.AnomalySeverity
  }

  export type AiSessionUpdateOneRequiredWithoutAnomaliesNestedInput = {
    create?: XOR<AiSessionCreateWithoutAnomaliesInput, AiSessionUncheckedCreateWithoutAnomaliesInput>
    connectOrCreate?: AiSessionCreateOrConnectWithoutAnomaliesInput
    upsert?: AiSessionUpsertWithoutAnomaliesInput
    connect?: AiSessionWhereUniqueInput
    update?: XOR<XOR<AiSessionUpdateToOneWithWhereWithoutAnomaliesInput, AiSessionUpdateWithoutAnomaliesInput>, AiSessionUncheckedUpdateWithoutAnomaliesInput>
  }

  export type AiSessionCreateNestedOneWithoutCheckpointsInput = {
    create?: XOR<AiSessionCreateWithoutCheckpointsInput, AiSessionUncheckedCreateWithoutCheckpointsInput>
    connectOrCreate?: AiSessionCreateOrConnectWithoutCheckpointsInput
    connect?: AiSessionWhereUniqueInput
  }

  export type EnumCheckpointTypeFieldUpdateOperationsInput = {
    set?: $Enums.CheckpointType
  }

  export type AiSessionUpdateOneRequiredWithoutCheckpointsNestedInput = {
    create?: XOR<AiSessionCreateWithoutCheckpointsInput, AiSessionUncheckedCreateWithoutCheckpointsInput>
    connectOrCreate?: AiSessionCreateOrConnectWithoutCheckpointsInput
    upsert?: AiSessionUpsertWithoutCheckpointsInput
    connect?: AiSessionWhereUniqueInput
    update?: XOR<XOR<AiSessionUpdateToOneWithWhereWithoutCheckpointsInput, AiSessionUpdateWithoutCheckpointsInput>, AiSessionUncheckedUpdateWithoutCheckpointsInput>
  }

  export type EnumLogLevelFieldUpdateOperationsInput = {
    set?: $Enums.LogLevel
  }

  export type EnumAuditActionFieldUpdateOperationsInput = {
    set?: $Enums.AuditAction
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType
  }

  export type NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumExamStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamStatus | EnumExamStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExamStatus[] | ListEnumExamStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExamStatus[] | ListEnumExamStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExamStatusFilter<$PrismaModel> | $Enums.ExamStatus
  }

  export type NestedEnumExamStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExamStatus | EnumExamStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExamStatus[] | ListEnumExamStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExamStatus[] | ListEnumExamStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExamStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExamStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExamStatusFilter<$PrismaModel>
    _max?: NestedEnumExamStatusFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumAiSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AiSessionStatus | EnumAiSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AiSessionStatus[] | ListEnumAiSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AiSessionStatus[] | ListEnumAiSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAiSessionStatusFilter<$PrismaModel> | $Enums.AiSessionStatus
  }

  export type NestedEnumAiSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AiSessionStatus | EnumAiSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AiSessionStatus[] | ListEnumAiSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AiSessionStatus[] | ListEnumAiSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAiSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.AiSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAiSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumAiSessionStatusFilter<$PrismaModel>
  }

  export type NestedEnumAnomalyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AnomalyType | EnumAnomalyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnomalyType[] | ListEnumAnomalyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnomalyType[] | ListEnumAnomalyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnomalyTypeFilter<$PrismaModel> | $Enums.AnomalyType
  }

  export type NestedEnumAnomalySeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.AnomalySeverity | EnumAnomalySeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AnomalySeverity[] | ListEnumAnomalySeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnomalySeverity[] | ListEnumAnomalySeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAnomalySeverityFilter<$PrismaModel> | $Enums.AnomalySeverity
  }

  export type NestedEnumAnomalyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnomalyType | EnumAnomalyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnomalyType[] | ListEnumAnomalyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnomalyType[] | ListEnumAnomalyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnomalyTypeWithAggregatesFilter<$PrismaModel> | $Enums.AnomalyType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnomalyTypeFilter<$PrismaModel>
    _max?: NestedEnumAnomalyTypeFilter<$PrismaModel>
  }

  export type NestedEnumAnomalySeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnomalySeverity | EnumAnomalySeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AnomalySeverity[] | ListEnumAnomalySeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnomalySeverity[] | ListEnumAnomalySeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAnomalySeverityWithAggregatesFilter<$PrismaModel> | $Enums.AnomalySeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnomalySeverityFilter<$PrismaModel>
    _max?: NestedEnumAnomalySeverityFilter<$PrismaModel>
  }

  export type NestedEnumCheckpointTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CheckpointType | EnumCheckpointTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CheckpointType[] | ListEnumCheckpointTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CheckpointType[] | ListEnumCheckpointTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCheckpointTypeFilter<$PrismaModel> | $Enums.CheckpointType
  }

  export type NestedEnumCheckpointTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CheckpointType | EnumCheckpointTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CheckpointType[] | ListEnumCheckpointTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CheckpointType[] | ListEnumCheckpointTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCheckpointTypeWithAggregatesFilter<$PrismaModel> | $Enums.CheckpointType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCheckpointTypeFilter<$PrismaModel>
    _max?: NestedEnumCheckpointTypeFilter<$PrismaModel>
  }

  export type NestedEnumLogLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelFilter<$PrismaModel> | $Enums.LogLevel
  }

  export type NestedEnumLogLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelWithAggregatesFilter<$PrismaModel> | $Enums.LogLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLogLevelFilter<$PrismaModel>
    _max?: NestedEnumLogLevelFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionFilter<$PrismaModel> | $Enums.AuditAction
  }

  export type NestedEnumAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.AuditAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditActionFilter<$PrismaModel>
    _max?: NestedEnumAuditActionFilter<$PrismaModel>
  }

  export type PaperCreateWithoutTeacherInput = {
    id?: string
    title: string
    description?: string | null
    category?: string | null
    timeLimit?: number | null
    allowRetake?: boolean
    showResultsImmediately?: boolean
    randomizeQuestions?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    questions?: QuestionCreateNestedManyWithoutPaperInput
    exams?: ExamCreateNestedManyWithoutPaperInput
  }

  export type PaperUncheckedCreateWithoutTeacherInput = {
    id?: string
    title: string
    description?: string | null
    category?: string | null
    timeLimit?: number | null
    allowRetake?: boolean
    showResultsImmediately?: boolean
    randomizeQuestions?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    questions?: QuestionUncheckedCreateNestedManyWithoutPaperInput
    exams?: ExamUncheckedCreateNestedManyWithoutPaperInput
  }

  export type PaperCreateOrConnectWithoutTeacherInput = {
    where: PaperWhereUniqueInput
    create: XOR<PaperCreateWithoutTeacherInput, PaperUncheckedCreateWithoutTeacherInput>
  }

  export type PaperCreateManyTeacherInputEnvelope = {
    data: PaperCreateManyTeacherInput | PaperCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type ExamCreateWithoutTeacherInput = {
    id?: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    timeLimit?: number | null
    accessCode?: string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: number
    requireCamera?: boolean
    requireMicrophone?: boolean
    enableAIAnalysis?: boolean
    status?: $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    scheduledDeletionAt?: Date | string | null
    paper: PaperCreateNestedOneWithoutExamsInput
    examResults?: ExamResultCreateNestedManyWithoutExamInput
  }

  export type ExamUncheckedCreateWithoutTeacherInput = {
    id?: string
    paperId: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    timeLimit?: number | null
    accessCode?: string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: number
    requireCamera?: boolean
    requireMicrophone?: boolean
    enableAIAnalysis?: boolean
    status?: $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    scheduledDeletionAt?: Date | string | null
    examResults?: ExamResultUncheckedCreateNestedManyWithoutExamInput
  }

  export type ExamCreateOrConnectWithoutTeacherInput = {
    where: ExamWhereUniqueInput
    create: XOR<ExamCreateWithoutTeacherInput, ExamUncheckedCreateWithoutTeacherInput>
  }

  export type ExamCreateManyTeacherInputEnvelope = {
    data: ExamCreateManyTeacherInput | ExamCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type PaperUpsertWithWhereUniqueWithoutTeacherInput = {
    where: PaperWhereUniqueInput
    update: XOR<PaperUpdateWithoutTeacherInput, PaperUncheckedUpdateWithoutTeacherInput>
    create: XOR<PaperCreateWithoutTeacherInput, PaperUncheckedCreateWithoutTeacherInput>
  }

  export type PaperUpdateWithWhereUniqueWithoutTeacherInput = {
    where: PaperWhereUniqueInput
    data: XOR<PaperUpdateWithoutTeacherInput, PaperUncheckedUpdateWithoutTeacherInput>
  }

  export type PaperUpdateManyWithWhereWithoutTeacherInput = {
    where: PaperScalarWhereInput
    data: XOR<PaperUpdateManyMutationInput, PaperUncheckedUpdateManyWithoutTeacherInput>
  }

  export type PaperScalarWhereInput = {
    AND?: PaperScalarWhereInput | PaperScalarWhereInput[]
    OR?: PaperScalarWhereInput[]
    NOT?: PaperScalarWhereInput | PaperScalarWhereInput[]
    id?: StringFilter<"Paper"> | string
    title?: StringFilter<"Paper"> | string
    description?: StringNullableFilter<"Paper"> | string | null
    category?: StringNullableFilter<"Paper"> | string | null
    timeLimit?: IntNullableFilter<"Paper"> | number | null
    allowRetake?: BoolFilter<"Paper"> | boolean
    showResultsImmediately?: BoolFilter<"Paper"> | boolean
    randomizeQuestions?: BoolFilter<"Paper"> | boolean
    teacherId?: StringFilter<"Paper"> | string
    isActive?: BoolFilter<"Paper"> | boolean
    createdAt?: DateTimeFilter<"Paper"> | Date | string
    updatedAt?: DateTimeFilter<"Paper"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Paper"> | Date | string | null
  }

  export type ExamUpsertWithWhereUniqueWithoutTeacherInput = {
    where: ExamWhereUniqueInput
    update: XOR<ExamUpdateWithoutTeacherInput, ExamUncheckedUpdateWithoutTeacherInput>
    create: XOR<ExamCreateWithoutTeacherInput, ExamUncheckedCreateWithoutTeacherInput>
  }

  export type ExamUpdateWithWhereUniqueWithoutTeacherInput = {
    where: ExamWhereUniqueInput
    data: XOR<ExamUpdateWithoutTeacherInput, ExamUncheckedUpdateWithoutTeacherInput>
  }

  export type ExamUpdateManyWithWhereWithoutTeacherInput = {
    where: ExamScalarWhereInput
    data: XOR<ExamUpdateManyMutationInput, ExamUncheckedUpdateManyWithoutTeacherInput>
  }

  export type ExamScalarWhereInput = {
    AND?: ExamScalarWhereInput | ExamScalarWhereInput[]
    OR?: ExamScalarWhereInput[]
    NOT?: ExamScalarWhereInput | ExamScalarWhereInput[]
    id?: StringFilter<"Exam"> | string
    paperId?: StringFilter<"Exam"> | string
    title?: StringFilter<"Exam"> | string
    description?: StringNullableFilter<"Exam"> | string | null
    startTime?: DateTimeFilter<"Exam"> | Date | string
    endTime?: DateTimeFilter<"Exam"> | Date | string
    timeLimit?: IntNullableFilter<"Exam"> | number | null
    accessCode?: StringNullableFilter<"Exam"> | string | null
    allowedStudents?: JsonNullableFilter<"Exam">
    maxAttempts?: IntFilter<"Exam"> | number
    requireCamera?: BoolFilter<"Exam"> | boolean
    requireMicrophone?: BoolFilter<"Exam"> | boolean
    enableAIAnalysis?: BoolFilter<"Exam"> | boolean
    status?: EnumExamStatusFilter<"Exam"> | $Enums.ExamStatus
    paperSnapshot?: JsonNullableFilter<"Exam">
    questionsSnapshot?: JsonNullableFilter<"Exam">
    snapshotCreatedAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
    teacherId?: StringFilter<"Exam"> | string
    createdAt?: DateTimeFilter<"Exam"> | Date | string
    updatedAt?: DateTimeFilter<"Exam"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
    scheduledDeletionAt?: DateTimeNullableFilter<"Exam"> | Date | string | null
  }

  export type ExamResultCreateWithoutStudentInput = {
    id?: string
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    exam: ExamCreateNestedOneWithoutExamResultsInput
    answers?: AnswerCreateNestedManyWithoutExamResultInput
    aiAnalysisData?: AiAnalysisAggregateCreateNestedOneWithoutExamResultInput
    aiSession?: AiSessionCreateNestedOneWithoutExamResultInput
  }

  export type ExamResultUncheckedCreateWithoutStudentInput = {
    id?: string
    examId: string
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    answers?: AnswerUncheckedCreateNestedManyWithoutExamResultInput
    aiAnalysisData?: AiAnalysisAggregateUncheckedCreateNestedOneWithoutExamResultInput
    aiSession?: AiSessionUncheckedCreateNestedOneWithoutExamResultInput
  }

  export type ExamResultCreateOrConnectWithoutStudentInput = {
    where: ExamResultWhereUniqueInput
    create: XOR<ExamResultCreateWithoutStudentInput, ExamResultUncheckedCreateWithoutStudentInput>
  }

  export type ExamResultCreateManyStudentInputEnvelope = {
    data: ExamResultCreateManyStudentInput | ExamResultCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ExamResultUpsertWithWhereUniqueWithoutStudentInput = {
    where: ExamResultWhereUniqueInput
    update: XOR<ExamResultUpdateWithoutStudentInput, ExamResultUncheckedUpdateWithoutStudentInput>
    create: XOR<ExamResultCreateWithoutStudentInput, ExamResultUncheckedCreateWithoutStudentInput>
  }

  export type ExamResultUpdateWithWhereUniqueWithoutStudentInput = {
    where: ExamResultWhereUniqueInput
    data: XOR<ExamResultUpdateWithoutStudentInput, ExamResultUncheckedUpdateWithoutStudentInput>
  }

  export type ExamResultUpdateManyWithWhereWithoutStudentInput = {
    where: ExamResultScalarWhereInput
    data: XOR<ExamResultUpdateManyMutationInput, ExamResultUncheckedUpdateManyWithoutStudentInput>
  }

  export type ExamResultScalarWhereInput = {
    AND?: ExamResultScalarWhereInput | ExamResultScalarWhereInput[]
    OR?: ExamResultScalarWhereInput[]
    NOT?: ExamResultScalarWhereInput | ExamResultScalarWhereInput[]
    id?: StringFilter<"ExamResult"> | string
    examId?: StringFilter<"ExamResult"> | string
    studentId?: StringNullableFilter<"ExamResult"> | string | null
    participantId?: StringFilter<"ExamResult"> | string
    participantName?: StringFilter<"ExamResult"> | string
    startedAt?: DateTimeFilter<"ExamResult"> | Date | string
    submittedAt?: DateTimeNullableFilter<"ExamResult"> | Date | string | null
    timeSpent?: IntNullableFilter<"ExamResult"> | number | null
    ipAddress?: StringNullableFilter<"ExamResult"> | string | null
    userAgent?: StringNullableFilter<"ExamResult"> | string | null
    totalScore?: FloatFilter<"ExamResult"> | number
    maxScore?: FloatFilter<"ExamResult"> | number
    percentage?: FloatFilter<"ExamResult"> | number
    isCompleted?: BoolFilter<"ExamResult"> | boolean
    isValid?: BoolFilter<"ExamResult"> | boolean
    aiSessionId?: StringNullableFilter<"ExamResult"> | string | null
    createdAt?: DateTimeFilter<"ExamResult"> | Date | string
    updatedAt?: DateTimeFilter<"ExamResult"> | Date | string
    deletedAt?: DateTimeNullableFilter<"ExamResult"> | Date | string | null
  }

  export type TeacherCreateWithoutPapersInput = {
    id?: string
    username: string
    email: string
    name: string
    password: string
    avatar?: string | null
    phoneNumber?: string | null
    department?: string | null
    title?: string | null
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    exams?: ExamCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutPapersInput = {
    id?: string
    username: string
    email: string
    name: string
    password: string
    avatar?: string | null
    phoneNumber?: string | null
    department?: string | null
    title?: string | null
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    exams?: ExamUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutPapersInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutPapersInput, TeacherUncheckedCreateWithoutPapersInput>
  }

  export type QuestionCreateWithoutPaperInput = {
    id?: string
    title: string
    type: $Enums.QuestionType
    description?: string | null
    dimension?: string | null
    explanation?: string | null
    order: number
    required?: boolean
    points?: number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    answers?: AnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutPaperInput = {
    id?: string
    title: string
    type: $Enums.QuestionType
    description?: string | null
    dimension?: string | null
    explanation?: string | null
    order: number
    required?: boolean
    points?: number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    answers?: AnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutPaperInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutPaperInput, QuestionUncheckedCreateWithoutPaperInput>
  }

  export type QuestionCreateManyPaperInputEnvelope = {
    data: QuestionCreateManyPaperInput | QuestionCreateManyPaperInput[]
    skipDuplicates?: boolean
  }

  export type ExamCreateWithoutPaperInput = {
    id?: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    timeLimit?: number | null
    accessCode?: string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: number
    requireCamera?: boolean
    requireMicrophone?: boolean
    enableAIAnalysis?: boolean
    status?: $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    scheduledDeletionAt?: Date | string | null
    teacher: TeacherCreateNestedOneWithoutExamsInput
    examResults?: ExamResultCreateNestedManyWithoutExamInput
  }

  export type ExamUncheckedCreateWithoutPaperInput = {
    id?: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    timeLimit?: number | null
    accessCode?: string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: number
    requireCamera?: boolean
    requireMicrophone?: boolean
    enableAIAnalysis?: boolean
    status?: $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: Date | string | null
    teacherId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    scheduledDeletionAt?: Date | string | null
    examResults?: ExamResultUncheckedCreateNestedManyWithoutExamInput
  }

  export type ExamCreateOrConnectWithoutPaperInput = {
    where: ExamWhereUniqueInput
    create: XOR<ExamCreateWithoutPaperInput, ExamUncheckedCreateWithoutPaperInput>
  }

  export type ExamCreateManyPaperInputEnvelope = {
    data: ExamCreateManyPaperInput | ExamCreateManyPaperInput[]
    skipDuplicates?: boolean
  }

  export type TeacherUpsertWithoutPapersInput = {
    update: XOR<TeacherUpdateWithoutPapersInput, TeacherUncheckedUpdateWithoutPapersInput>
    create: XOR<TeacherCreateWithoutPapersInput, TeacherUncheckedCreateWithoutPapersInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutPapersInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutPapersInput, TeacherUncheckedUpdateWithoutPapersInput>
  }

  export type TeacherUpdateWithoutPapersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exams?: ExamUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutPapersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exams?: ExamUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type QuestionUpsertWithWhereUniqueWithoutPaperInput = {
    where: QuestionWhereUniqueInput
    update: XOR<QuestionUpdateWithoutPaperInput, QuestionUncheckedUpdateWithoutPaperInput>
    create: XOR<QuestionCreateWithoutPaperInput, QuestionUncheckedCreateWithoutPaperInput>
  }

  export type QuestionUpdateWithWhereUniqueWithoutPaperInput = {
    where: QuestionWhereUniqueInput
    data: XOR<QuestionUpdateWithoutPaperInput, QuestionUncheckedUpdateWithoutPaperInput>
  }

  export type QuestionUpdateManyWithWhereWithoutPaperInput = {
    where: QuestionScalarWhereInput
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyWithoutPaperInput>
  }

  export type QuestionScalarWhereInput = {
    AND?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    OR?: QuestionScalarWhereInput[]
    NOT?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    id?: StringFilter<"Question"> | string
    paperId?: StringFilter<"Question"> | string
    title?: StringFilter<"Question"> | string
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    description?: StringNullableFilter<"Question"> | string | null
    dimension?: StringNullableFilter<"Question"> | string | null
    explanation?: StringNullableFilter<"Question"> | string | null
    order?: IntFilter<"Question"> | number
    required?: BoolFilter<"Question"> | boolean
    points?: IntFilter<"Question"> | number
    displayCondition?: JsonNullableFilter<"Question">
    options?: JsonNullableFilter<"Question">
    createdAt?: DateTimeFilter<"Question"> | Date | string
    updatedAt?: DateTimeFilter<"Question"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Question"> | Date | string | null
  }

  export type ExamUpsertWithWhereUniqueWithoutPaperInput = {
    where: ExamWhereUniqueInput
    update: XOR<ExamUpdateWithoutPaperInput, ExamUncheckedUpdateWithoutPaperInput>
    create: XOR<ExamCreateWithoutPaperInput, ExamUncheckedCreateWithoutPaperInput>
  }

  export type ExamUpdateWithWhereUniqueWithoutPaperInput = {
    where: ExamWhereUniqueInput
    data: XOR<ExamUpdateWithoutPaperInput, ExamUncheckedUpdateWithoutPaperInput>
  }

  export type ExamUpdateManyWithWhereWithoutPaperInput = {
    where: ExamScalarWhereInput
    data: XOR<ExamUpdateManyMutationInput, ExamUncheckedUpdateManyWithoutPaperInput>
  }

  export type PaperCreateWithoutQuestionsInput = {
    id?: string
    title: string
    description?: string | null
    category?: string | null
    timeLimit?: number | null
    allowRetake?: boolean
    showResultsImmediately?: boolean
    randomizeQuestions?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    teacher: TeacherCreateNestedOneWithoutPapersInput
    exams?: ExamCreateNestedManyWithoutPaperInput
  }

  export type PaperUncheckedCreateWithoutQuestionsInput = {
    id?: string
    title: string
    description?: string | null
    category?: string | null
    timeLimit?: number | null
    allowRetake?: boolean
    showResultsImmediately?: boolean
    randomizeQuestions?: boolean
    teacherId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    exams?: ExamUncheckedCreateNestedManyWithoutPaperInput
  }

  export type PaperCreateOrConnectWithoutQuestionsInput = {
    where: PaperWhereUniqueInput
    create: XOR<PaperCreateWithoutQuestionsInput, PaperUncheckedCreateWithoutQuestionsInput>
  }

  export type AnswerCreateWithoutQuestionInput = {
    id?: string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: string | null
    points?: number
    maxPoints?: number
    questionDisplayedAt?: Date | string | null
    firstInteractionAt?: Date | string | null
    lastModifiedAt?: Date | string | null
    answeredAt?: Date | string
    totalViewTime?: number | null
    interactionCount?: number
    hesitationScore?: number | null
    examResult: ExamResultCreateNestedOneWithoutAnswersInput
  }

  export type AnswerUncheckedCreateWithoutQuestionInput = {
    id?: string
    examResultId: string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: string | null
    points?: number
    maxPoints?: number
    questionDisplayedAt?: Date | string | null
    firstInteractionAt?: Date | string | null
    lastModifiedAt?: Date | string | null
    answeredAt?: Date | string
    totalViewTime?: number | null
    interactionCount?: number
    hesitationScore?: number | null
  }

  export type AnswerCreateOrConnectWithoutQuestionInput = {
    where: AnswerWhereUniqueInput
    create: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
  }

  export type AnswerCreateManyQuestionInputEnvelope = {
    data: AnswerCreateManyQuestionInput | AnswerCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type PaperUpsertWithoutQuestionsInput = {
    update: XOR<PaperUpdateWithoutQuestionsInput, PaperUncheckedUpdateWithoutQuestionsInput>
    create: XOR<PaperCreateWithoutQuestionsInput, PaperUncheckedCreateWithoutQuestionsInput>
    where?: PaperWhereInput
  }

  export type PaperUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: PaperWhereInput
    data: XOR<PaperUpdateWithoutQuestionsInput, PaperUncheckedUpdateWithoutQuestionsInput>
  }

  export type PaperUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResultsImmediately?: BoolFieldUpdateOperationsInput | boolean
    randomizeQuestions?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teacher?: TeacherUpdateOneRequiredWithoutPapersNestedInput
    exams?: ExamUpdateManyWithoutPaperNestedInput
  }

  export type PaperUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResultsImmediately?: BoolFieldUpdateOperationsInput | boolean
    randomizeQuestions?: BoolFieldUpdateOperationsInput | boolean
    teacherId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exams?: ExamUncheckedUpdateManyWithoutPaperNestedInput
  }

  export type AnswerUpsertWithWhereUniqueWithoutQuestionInput = {
    where: AnswerWhereUniqueInput
    update: XOR<AnswerUpdateWithoutQuestionInput, AnswerUncheckedUpdateWithoutQuestionInput>
    create: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
  }

  export type AnswerUpdateWithWhereUniqueWithoutQuestionInput = {
    where: AnswerWhereUniqueInput
    data: XOR<AnswerUpdateWithoutQuestionInput, AnswerUncheckedUpdateWithoutQuestionInput>
  }

  export type AnswerUpdateManyWithWhereWithoutQuestionInput = {
    where: AnswerScalarWhereInput
    data: XOR<AnswerUpdateManyMutationInput, AnswerUncheckedUpdateManyWithoutQuestionInput>
  }

  export type AnswerScalarWhereInput = {
    AND?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
    OR?: AnswerScalarWhereInput[]
    NOT?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
    id?: StringFilter<"Answer"> | string
    examResultId?: StringFilter<"Answer"> | string
    questionId?: StringFilter<"Answer"> | string
    selectedOptions?: JsonNullableFilter<"Answer">
    textAnswer?: StringNullableFilter<"Answer"> | string | null
    points?: FloatFilter<"Answer"> | number
    maxPoints?: FloatFilter<"Answer"> | number
    questionDisplayedAt?: DateTimeNullableFilter<"Answer"> | Date | string | null
    firstInteractionAt?: DateTimeNullableFilter<"Answer"> | Date | string | null
    lastModifiedAt?: DateTimeNullableFilter<"Answer"> | Date | string | null
    answeredAt?: DateTimeFilter<"Answer"> | Date | string
    totalViewTime?: IntNullableFilter<"Answer"> | number | null
    interactionCount?: IntFilter<"Answer"> | number
    hesitationScore?: FloatNullableFilter<"Answer"> | number | null
  }

  export type PaperCreateWithoutExamsInput = {
    id?: string
    title: string
    description?: string | null
    category?: string | null
    timeLimit?: number | null
    allowRetake?: boolean
    showResultsImmediately?: boolean
    randomizeQuestions?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    teacher: TeacherCreateNestedOneWithoutPapersInput
    questions?: QuestionCreateNestedManyWithoutPaperInput
  }

  export type PaperUncheckedCreateWithoutExamsInput = {
    id?: string
    title: string
    description?: string | null
    category?: string | null
    timeLimit?: number | null
    allowRetake?: boolean
    showResultsImmediately?: boolean
    randomizeQuestions?: boolean
    teacherId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    questions?: QuestionUncheckedCreateNestedManyWithoutPaperInput
  }

  export type PaperCreateOrConnectWithoutExamsInput = {
    where: PaperWhereUniqueInput
    create: XOR<PaperCreateWithoutExamsInput, PaperUncheckedCreateWithoutExamsInput>
  }

  export type TeacherCreateWithoutExamsInput = {
    id?: string
    username: string
    email: string
    name: string
    password: string
    avatar?: string | null
    phoneNumber?: string | null
    department?: string | null
    title?: string | null
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    papers?: PaperCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutExamsInput = {
    id?: string
    username: string
    email: string
    name: string
    password: string
    avatar?: string | null
    phoneNumber?: string | null
    department?: string | null
    title?: string | null
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    papers?: PaperUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutExamsInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutExamsInput, TeacherUncheckedCreateWithoutExamsInput>
  }

  export type ExamResultCreateWithoutExamInput = {
    id?: string
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    student?: StudentCreateNestedOneWithoutExamResultsInput
    answers?: AnswerCreateNestedManyWithoutExamResultInput
    aiAnalysisData?: AiAnalysisAggregateCreateNestedOneWithoutExamResultInput
    aiSession?: AiSessionCreateNestedOneWithoutExamResultInput
  }

  export type ExamResultUncheckedCreateWithoutExamInput = {
    id?: string
    studentId?: string | null
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    answers?: AnswerUncheckedCreateNestedManyWithoutExamResultInput
    aiAnalysisData?: AiAnalysisAggregateUncheckedCreateNestedOneWithoutExamResultInput
    aiSession?: AiSessionUncheckedCreateNestedOneWithoutExamResultInput
  }

  export type ExamResultCreateOrConnectWithoutExamInput = {
    where: ExamResultWhereUniqueInput
    create: XOR<ExamResultCreateWithoutExamInput, ExamResultUncheckedCreateWithoutExamInput>
  }

  export type ExamResultCreateManyExamInputEnvelope = {
    data: ExamResultCreateManyExamInput | ExamResultCreateManyExamInput[]
    skipDuplicates?: boolean
  }

  export type PaperUpsertWithoutExamsInput = {
    update: XOR<PaperUpdateWithoutExamsInput, PaperUncheckedUpdateWithoutExamsInput>
    create: XOR<PaperCreateWithoutExamsInput, PaperUncheckedCreateWithoutExamsInput>
    where?: PaperWhereInput
  }

  export type PaperUpdateToOneWithWhereWithoutExamsInput = {
    where?: PaperWhereInput
    data: XOR<PaperUpdateWithoutExamsInput, PaperUncheckedUpdateWithoutExamsInput>
  }

  export type PaperUpdateWithoutExamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResultsImmediately?: BoolFieldUpdateOperationsInput | boolean
    randomizeQuestions?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teacher?: TeacherUpdateOneRequiredWithoutPapersNestedInput
    questions?: QuestionUpdateManyWithoutPaperNestedInput
  }

  export type PaperUncheckedUpdateWithoutExamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResultsImmediately?: BoolFieldUpdateOperationsInput | boolean
    randomizeQuestions?: BoolFieldUpdateOperationsInput | boolean
    teacherId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    questions?: QuestionUncheckedUpdateManyWithoutPaperNestedInput
  }

  export type TeacherUpsertWithoutExamsInput = {
    update: XOR<TeacherUpdateWithoutExamsInput, TeacherUncheckedUpdateWithoutExamsInput>
    create: XOR<TeacherCreateWithoutExamsInput, TeacherUncheckedCreateWithoutExamsInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutExamsInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutExamsInput, TeacherUncheckedUpdateWithoutExamsInput>
  }

  export type TeacherUpdateWithoutExamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    papers?: PaperUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutExamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    papers?: PaperUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type ExamResultUpsertWithWhereUniqueWithoutExamInput = {
    where: ExamResultWhereUniqueInput
    update: XOR<ExamResultUpdateWithoutExamInput, ExamResultUncheckedUpdateWithoutExamInput>
    create: XOR<ExamResultCreateWithoutExamInput, ExamResultUncheckedCreateWithoutExamInput>
  }

  export type ExamResultUpdateWithWhereUniqueWithoutExamInput = {
    where: ExamResultWhereUniqueInput
    data: XOR<ExamResultUpdateWithoutExamInput, ExamResultUncheckedUpdateWithoutExamInput>
  }

  export type ExamResultUpdateManyWithWhereWithoutExamInput = {
    where: ExamResultScalarWhereInput
    data: XOR<ExamResultUpdateManyMutationInput, ExamResultUncheckedUpdateManyWithoutExamInput>
  }

  export type ExamCreateWithoutExamResultsInput = {
    id?: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    timeLimit?: number | null
    accessCode?: string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: number
    requireCamera?: boolean
    requireMicrophone?: boolean
    enableAIAnalysis?: boolean
    status?: $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    scheduledDeletionAt?: Date | string | null
    paper: PaperCreateNestedOneWithoutExamsInput
    teacher: TeacherCreateNestedOneWithoutExamsInput
  }

  export type ExamUncheckedCreateWithoutExamResultsInput = {
    id?: string
    paperId: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    timeLimit?: number | null
    accessCode?: string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: number
    requireCamera?: boolean
    requireMicrophone?: boolean
    enableAIAnalysis?: boolean
    status?: $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: Date | string | null
    teacherId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    scheduledDeletionAt?: Date | string | null
  }

  export type ExamCreateOrConnectWithoutExamResultsInput = {
    where: ExamWhereUniqueInput
    create: XOR<ExamCreateWithoutExamResultsInput, ExamUncheckedCreateWithoutExamResultsInput>
  }

  export type StudentCreateWithoutExamResultsInput = {
    id?: string
    participantId: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    grade?: string | null
    class?: string | null
    studentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type StudentUncheckedCreateWithoutExamResultsInput = {
    id?: string
    participantId: string
    name: string
    email?: string | null
    phoneNumber?: string | null
    grade?: string | null
    class?: string | null
    studentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type StudentCreateOrConnectWithoutExamResultsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutExamResultsInput, StudentUncheckedCreateWithoutExamResultsInput>
  }

  export type AnswerCreateWithoutExamResultInput = {
    id?: string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: string | null
    points?: number
    maxPoints?: number
    questionDisplayedAt?: Date | string | null
    firstInteractionAt?: Date | string | null
    lastModifiedAt?: Date | string | null
    answeredAt?: Date | string
    totalViewTime?: number | null
    interactionCount?: number
    hesitationScore?: number | null
    question: QuestionCreateNestedOneWithoutAnswersInput
  }

  export type AnswerUncheckedCreateWithoutExamResultInput = {
    id?: string
    questionId: string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: string | null
    points?: number
    maxPoints?: number
    questionDisplayedAt?: Date | string | null
    firstInteractionAt?: Date | string | null
    lastModifiedAt?: Date | string | null
    answeredAt?: Date | string
    totalViewTime?: number | null
    interactionCount?: number
    hesitationScore?: number | null
  }

  export type AnswerCreateOrConnectWithoutExamResultInput = {
    where: AnswerWhereUniqueInput
    create: XOR<AnswerCreateWithoutExamResultInput, AnswerUncheckedCreateWithoutExamResultInput>
  }

  export type AnswerCreateManyExamResultInputEnvelope = {
    data: AnswerCreateManyExamResultInput | AnswerCreateManyExamResultInput[]
    skipDuplicates?: boolean
  }

  export type AiAnalysisAggregateCreateWithoutExamResultInput = {
    id?: string
    avgValence?: number | null
    avgArousal?: number | null
    dominantEmotion?: string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: number | null
    attentionVariability?: number | null
    distractionEvents?: number
    engagementScore?: number | null
    consistencyScore?: number | null
    avgHeartRate?: number | null
    heartRateVariability?: number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: number
    analysisConfidence?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    session: AiSessionCreateNestedOneWithoutAggregateInput
  }

  export type AiAnalysisAggregateUncheckedCreateWithoutExamResultInput = {
    id?: string
    sessionId: string
    avgValence?: number | null
    avgArousal?: number | null
    dominantEmotion?: string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: number | null
    attentionVariability?: number | null
    distractionEvents?: number
    engagementScore?: number | null
    consistencyScore?: number | null
    avgHeartRate?: number | null
    heartRateVariability?: number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: number
    analysisConfidence?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiAnalysisAggregateCreateOrConnectWithoutExamResultInput = {
    where: AiAnalysisAggregateWhereUniqueInput
    create: XOR<AiAnalysisAggregateCreateWithoutExamResultInput, AiAnalysisAggregateUncheckedCreateWithoutExamResultInput>
  }

  export type AiSessionCreateWithoutExamResultInput = {
    id: string
    sessionId: string
    status?: $Enums.AiSessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: string | null
    checkpointCount?: number
    fileSize?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aggregate?: AiAnalysisAggregateCreateNestedOneWithoutSessionInput
    anomalies?: AiAnomalyCreateNestedManyWithoutSessionInput
    checkpoints?: AiCheckpointCreateNestedManyWithoutSessionInput
  }

  export type AiSessionUncheckedCreateWithoutExamResultInput = {
    id: string
    sessionId: string
    status?: $Enums.AiSessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: string | null
    checkpointCount?: number
    fileSize?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aggregate?: AiAnalysisAggregateUncheckedCreateNestedOneWithoutSessionInput
    anomalies?: AiAnomalyUncheckedCreateNestedManyWithoutSessionInput
    checkpoints?: AiCheckpointUncheckedCreateNestedManyWithoutSessionInput
  }

  export type AiSessionCreateOrConnectWithoutExamResultInput = {
    where: AiSessionWhereUniqueInput
    create: XOR<AiSessionCreateWithoutExamResultInput, AiSessionUncheckedCreateWithoutExamResultInput>
  }

  export type ExamUpsertWithoutExamResultsInput = {
    update: XOR<ExamUpdateWithoutExamResultsInput, ExamUncheckedUpdateWithoutExamResultsInput>
    create: XOR<ExamCreateWithoutExamResultsInput, ExamUncheckedCreateWithoutExamResultsInput>
    where?: ExamWhereInput
  }

  export type ExamUpdateToOneWithWhereWithoutExamResultsInput = {
    where?: ExamWhereInput
    data: XOR<ExamUpdateWithoutExamResultsInput, ExamUncheckedUpdateWithoutExamResultsInput>
  }

  export type ExamUpdateWithoutExamResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: IntFieldUpdateOperationsInput | number
    requireCamera?: BoolFieldUpdateOperationsInput | boolean
    requireMicrophone?: BoolFieldUpdateOperationsInput | boolean
    enableAIAnalysis?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledDeletionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper?: PaperUpdateOneRequiredWithoutExamsNestedInput
    teacher?: TeacherUpdateOneRequiredWithoutExamsNestedInput
  }

  export type ExamUncheckedUpdateWithoutExamResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: IntFieldUpdateOperationsInput | number
    requireCamera?: BoolFieldUpdateOperationsInput | boolean
    requireMicrophone?: BoolFieldUpdateOperationsInput | boolean
    enableAIAnalysis?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teacherId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledDeletionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StudentUpsertWithoutExamResultsInput = {
    update: XOR<StudentUpdateWithoutExamResultsInput, StudentUncheckedUpdateWithoutExamResultsInput>
    create: XOR<StudentCreateWithoutExamResultsInput, StudentUncheckedCreateWithoutExamResultsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutExamResultsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutExamResultsInput, StudentUncheckedUpdateWithoutExamResultsInput>
  }

  export type StudentUpdateWithoutExamResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    class?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StudentUncheckedUpdateWithoutExamResultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    grade?: NullableStringFieldUpdateOperationsInput | string | null
    class?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnswerUpsertWithWhereUniqueWithoutExamResultInput = {
    where: AnswerWhereUniqueInput
    update: XOR<AnswerUpdateWithoutExamResultInput, AnswerUncheckedUpdateWithoutExamResultInput>
    create: XOR<AnswerCreateWithoutExamResultInput, AnswerUncheckedCreateWithoutExamResultInput>
  }

  export type AnswerUpdateWithWhereUniqueWithoutExamResultInput = {
    where: AnswerWhereUniqueInput
    data: XOR<AnswerUpdateWithoutExamResultInput, AnswerUncheckedUpdateWithoutExamResultInput>
  }

  export type AnswerUpdateManyWithWhereWithoutExamResultInput = {
    where: AnswerScalarWhereInput
    data: XOR<AnswerUpdateManyMutationInput, AnswerUncheckedUpdateManyWithoutExamResultInput>
  }

  export type AiAnalysisAggregateUpsertWithoutExamResultInput = {
    update: XOR<AiAnalysisAggregateUpdateWithoutExamResultInput, AiAnalysisAggregateUncheckedUpdateWithoutExamResultInput>
    create: XOR<AiAnalysisAggregateCreateWithoutExamResultInput, AiAnalysisAggregateUncheckedCreateWithoutExamResultInput>
    where?: AiAnalysisAggregateWhereInput
  }

  export type AiAnalysisAggregateUpdateToOneWithWhereWithoutExamResultInput = {
    where?: AiAnalysisAggregateWhereInput
    data: XOR<AiAnalysisAggregateUpdateWithoutExamResultInput, AiAnalysisAggregateUncheckedUpdateWithoutExamResultInput>
  }

  export type AiAnalysisAggregateUpdateWithoutExamResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    avgValence?: NullableFloatFieldUpdateOperationsInput | number | null
    avgArousal?: NullableFloatFieldUpdateOperationsInput | number | null
    dominantEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: NullableFloatFieldUpdateOperationsInput | number | null
    attentionVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    distractionEvents?: IntFieldUpdateOperationsInput | number
    engagementScore?: NullableFloatFieldUpdateOperationsInput | number | null
    consistencyScore?: NullableFloatFieldUpdateOperationsInput | number | null
    avgHeartRate?: NullableFloatFieldUpdateOperationsInput | number | null
    heartRateVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: FloatFieldUpdateOperationsInput | number
    analysisConfidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: AiSessionUpdateOneRequiredWithoutAggregateNestedInput
  }

  export type AiAnalysisAggregateUncheckedUpdateWithoutExamResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    avgValence?: NullableFloatFieldUpdateOperationsInput | number | null
    avgArousal?: NullableFloatFieldUpdateOperationsInput | number | null
    dominantEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: NullableFloatFieldUpdateOperationsInput | number | null
    attentionVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    distractionEvents?: IntFieldUpdateOperationsInput | number
    engagementScore?: NullableFloatFieldUpdateOperationsInput | number | null
    consistencyScore?: NullableFloatFieldUpdateOperationsInput | number | null
    avgHeartRate?: NullableFloatFieldUpdateOperationsInput | number | null
    heartRateVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: FloatFieldUpdateOperationsInput | number
    analysisConfidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiSessionUpsertWithoutExamResultInput = {
    update: XOR<AiSessionUpdateWithoutExamResultInput, AiSessionUncheckedUpdateWithoutExamResultInput>
    create: XOR<AiSessionCreateWithoutExamResultInput, AiSessionUncheckedCreateWithoutExamResultInput>
    where?: AiSessionWhereInput
  }

  export type AiSessionUpdateToOneWithWhereWithoutExamResultInput = {
    where?: AiSessionWhereInput
    data: XOR<AiSessionUpdateWithoutExamResultInput, AiSessionUncheckedUpdateWithoutExamResultInput>
  }

  export type AiSessionUpdateWithoutExamResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    status?: EnumAiSessionStatusFieldUpdateOperationsInput | $Enums.AiSessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointCount?: IntFieldUpdateOperationsInput | number
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aggregate?: AiAnalysisAggregateUpdateOneWithoutSessionNestedInput
    anomalies?: AiAnomalyUpdateManyWithoutSessionNestedInput
    checkpoints?: AiCheckpointUpdateManyWithoutSessionNestedInput
  }

  export type AiSessionUncheckedUpdateWithoutExamResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    status?: EnumAiSessionStatusFieldUpdateOperationsInput | $Enums.AiSessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointCount?: IntFieldUpdateOperationsInput | number
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aggregate?: AiAnalysisAggregateUncheckedUpdateOneWithoutSessionNestedInput
    anomalies?: AiAnomalyUncheckedUpdateManyWithoutSessionNestedInput
    checkpoints?: AiCheckpointUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type ExamResultCreateWithoutAnswersInput = {
    id?: string
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    exam: ExamCreateNestedOneWithoutExamResultsInput
    student?: StudentCreateNestedOneWithoutExamResultsInput
    aiAnalysisData?: AiAnalysisAggregateCreateNestedOneWithoutExamResultInput
    aiSession?: AiSessionCreateNestedOneWithoutExamResultInput
  }

  export type ExamResultUncheckedCreateWithoutAnswersInput = {
    id?: string
    examId: string
    studentId?: string | null
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    aiAnalysisData?: AiAnalysisAggregateUncheckedCreateNestedOneWithoutExamResultInput
    aiSession?: AiSessionUncheckedCreateNestedOneWithoutExamResultInput
  }

  export type ExamResultCreateOrConnectWithoutAnswersInput = {
    where: ExamResultWhereUniqueInput
    create: XOR<ExamResultCreateWithoutAnswersInput, ExamResultUncheckedCreateWithoutAnswersInput>
  }

  export type QuestionCreateWithoutAnswersInput = {
    id?: string
    title: string
    type: $Enums.QuestionType
    description?: string | null
    dimension?: string | null
    explanation?: string | null
    order: number
    required?: boolean
    points?: number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    paper: PaperCreateNestedOneWithoutQuestionsInput
  }

  export type QuestionUncheckedCreateWithoutAnswersInput = {
    id?: string
    paperId: string
    title: string
    type: $Enums.QuestionType
    description?: string | null
    dimension?: string | null
    explanation?: string | null
    order: number
    required?: boolean
    points?: number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type QuestionCreateOrConnectWithoutAnswersInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
  }

  export type ExamResultUpsertWithoutAnswersInput = {
    update: XOR<ExamResultUpdateWithoutAnswersInput, ExamResultUncheckedUpdateWithoutAnswersInput>
    create: XOR<ExamResultCreateWithoutAnswersInput, ExamResultUncheckedCreateWithoutAnswersInput>
    where?: ExamResultWhereInput
  }

  export type ExamResultUpdateToOneWithWhereWithoutAnswersInput = {
    where?: ExamResultWhereInput
    data: XOR<ExamResultUpdateWithoutAnswersInput, ExamResultUncheckedUpdateWithoutAnswersInput>
  }

  export type ExamResultUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exam?: ExamUpdateOneRequiredWithoutExamResultsNestedInput
    student?: StudentUpdateOneWithoutExamResultsNestedInput
    aiAnalysisData?: AiAnalysisAggregateUpdateOneWithoutExamResultNestedInput
    aiSession?: AiSessionUpdateOneWithoutExamResultNestedInput
  }

  export type ExamResultUncheckedUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiAnalysisData?: AiAnalysisAggregateUncheckedUpdateOneWithoutExamResultNestedInput
    aiSession?: AiSessionUncheckedUpdateOneWithoutExamResultNestedInput
  }

  export type QuestionUpsertWithoutAnswersInput = {
    update: XOR<QuestionUpdateWithoutAnswersInput, QuestionUncheckedUpdateWithoutAnswersInput>
    create: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutAnswersInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutAnswersInput, QuestionUncheckedUpdateWithoutAnswersInput>
  }

  export type QuestionUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dimension?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    points?: IntFieldUpdateOperationsInput | number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper?: PaperUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type QuestionUncheckedUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dimension?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    points?: IntFieldUpdateOperationsInput | number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExamResultCreateWithoutAiSessionInput = {
    id?: string
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    exam: ExamCreateNestedOneWithoutExamResultsInput
    student?: StudentCreateNestedOneWithoutExamResultsInput
    answers?: AnswerCreateNestedManyWithoutExamResultInput
    aiAnalysisData?: AiAnalysisAggregateCreateNestedOneWithoutExamResultInput
  }

  export type ExamResultUncheckedCreateWithoutAiSessionInput = {
    id?: string
    examId: string
    studentId?: string | null
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    answers?: AnswerUncheckedCreateNestedManyWithoutExamResultInput
    aiAnalysisData?: AiAnalysisAggregateUncheckedCreateNestedOneWithoutExamResultInput
  }

  export type ExamResultCreateOrConnectWithoutAiSessionInput = {
    where: ExamResultWhereUniqueInput
    create: XOR<ExamResultCreateWithoutAiSessionInput, ExamResultUncheckedCreateWithoutAiSessionInput>
  }

  export type AiAnalysisAggregateCreateWithoutSessionInput = {
    id?: string
    avgValence?: number | null
    avgArousal?: number | null
    dominantEmotion?: string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: number | null
    attentionVariability?: number | null
    distractionEvents?: number
    engagementScore?: number | null
    consistencyScore?: number | null
    avgHeartRate?: number | null
    heartRateVariability?: number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: number
    analysisConfidence?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    examResult: ExamResultCreateNestedOneWithoutAiAnalysisDataInput
  }

  export type AiAnalysisAggregateUncheckedCreateWithoutSessionInput = {
    id?: string
    examResultId: string
    avgValence?: number | null
    avgArousal?: number | null
    dominantEmotion?: string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: number | null
    attentionVariability?: number | null
    distractionEvents?: number
    engagementScore?: number | null
    consistencyScore?: number | null
    avgHeartRate?: number | null
    heartRateVariability?: number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: number
    analysisConfidence?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiAnalysisAggregateCreateOrConnectWithoutSessionInput = {
    where: AiAnalysisAggregateWhereUniqueInput
    create: XOR<AiAnalysisAggregateCreateWithoutSessionInput, AiAnalysisAggregateUncheckedCreateWithoutSessionInput>
  }

  export type AiAnomalyCreateWithoutSessionInput = {
    id?: string
    type: $Enums.AnomalyType
    severity: $Enums.AnomalySeverity
    timestamp: Date | string
    duration?: number | null
    confidence?: number
    description: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AiAnomalyUncheckedCreateWithoutSessionInput = {
    id?: string
    type: $Enums.AnomalyType
    severity: $Enums.AnomalySeverity
    timestamp: Date | string
    duration?: number | null
    confidence?: number
    description: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AiAnomalyCreateOrConnectWithoutSessionInput = {
    where: AiAnomalyWhereUniqueInput
    create: XOR<AiAnomalyCreateWithoutSessionInput, AiAnomalyUncheckedCreateWithoutSessionInput>
  }

  export type AiAnomalyCreateManySessionInputEnvelope = {
    data: AiAnomalyCreateManySessionInput | AiAnomalyCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type AiCheckpointCreateWithoutSessionInput = {
    id?: string
    timestamp: Date | string
    eventType: $Enums.CheckpointType
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AiCheckpointUncheckedCreateWithoutSessionInput = {
    id?: string
    timestamp: Date | string
    eventType: $Enums.CheckpointType
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AiCheckpointCreateOrConnectWithoutSessionInput = {
    where: AiCheckpointWhereUniqueInput
    create: XOR<AiCheckpointCreateWithoutSessionInput, AiCheckpointUncheckedCreateWithoutSessionInput>
  }

  export type AiCheckpointCreateManySessionInputEnvelope = {
    data: AiCheckpointCreateManySessionInput | AiCheckpointCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type ExamResultUpsertWithoutAiSessionInput = {
    update: XOR<ExamResultUpdateWithoutAiSessionInput, ExamResultUncheckedUpdateWithoutAiSessionInput>
    create: XOR<ExamResultCreateWithoutAiSessionInput, ExamResultUncheckedCreateWithoutAiSessionInput>
    where?: ExamResultWhereInput
  }

  export type ExamResultUpdateToOneWithWhereWithoutAiSessionInput = {
    where?: ExamResultWhereInput
    data: XOR<ExamResultUpdateWithoutAiSessionInput, ExamResultUncheckedUpdateWithoutAiSessionInput>
  }

  export type ExamResultUpdateWithoutAiSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exam?: ExamUpdateOneRequiredWithoutExamResultsNestedInput
    student?: StudentUpdateOneWithoutExamResultsNestedInput
    answers?: AnswerUpdateManyWithoutExamResultNestedInput
    aiAnalysisData?: AiAnalysisAggregateUpdateOneWithoutExamResultNestedInput
  }

  export type ExamResultUncheckedUpdateWithoutAiSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: AnswerUncheckedUpdateManyWithoutExamResultNestedInput
    aiAnalysisData?: AiAnalysisAggregateUncheckedUpdateOneWithoutExamResultNestedInput
  }

  export type AiAnalysisAggregateUpsertWithoutSessionInput = {
    update: XOR<AiAnalysisAggregateUpdateWithoutSessionInput, AiAnalysisAggregateUncheckedUpdateWithoutSessionInput>
    create: XOR<AiAnalysisAggregateCreateWithoutSessionInput, AiAnalysisAggregateUncheckedCreateWithoutSessionInput>
    where?: AiAnalysisAggregateWhereInput
  }

  export type AiAnalysisAggregateUpdateToOneWithWhereWithoutSessionInput = {
    where?: AiAnalysisAggregateWhereInput
    data: XOR<AiAnalysisAggregateUpdateWithoutSessionInput, AiAnalysisAggregateUncheckedUpdateWithoutSessionInput>
  }

  export type AiAnalysisAggregateUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    avgValence?: NullableFloatFieldUpdateOperationsInput | number | null
    avgArousal?: NullableFloatFieldUpdateOperationsInput | number | null
    dominantEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: NullableFloatFieldUpdateOperationsInput | number | null
    attentionVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    distractionEvents?: IntFieldUpdateOperationsInput | number
    engagementScore?: NullableFloatFieldUpdateOperationsInput | number | null
    consistencyScore?: NullableFloatFieldUpdateOperationsInput | number | null
    avgHeartRate?: NullableFloatFieldUpdateOperationsInput | number | null
    heartRateVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: FloatFieldUpdateOperationsInput | number
    analysisConfidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examResult?: ExamResultUpdateOneRequiredWithoutAiAnalysisDataNestedInput
  }

  export type AiAnalysisAggregateUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    examResultId?: StringFieldUpdateOperationsInput | string
    avgValence?: NullableFloatFieldUpdateOperationsInput | number | null
    avgArousal?: NullableFloatFieldUpdateOperationsInput | number | null
    dominantEmotion?: NullableStringFieldUpdateOperationsInput | string | null
    emotionDistribution?: NullableJsonNullValueInput | InputJsonValue
    avgAttention?: NullableFloatFieldUpdateOperationsInput | number | null
    attentionVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    distractionEvents?: IntFieldUpdateOperationsInput | number
    engagementScore?: NullableFloatFieldUpdateOperationsInput | number | null
    consistencyScore?: NullableFloatFieldUpdateOperationsInput | number | null
    avgHeartRate?: NullableFloatFieldUpdateOperationsInput | number | null
    heartRateVariability?: NullableFloatFieldUpdateOperationsInput | number | null
    stressIndicators?: NullableJsonNullValueInput | InputJsonValue
    dataQuality?: FloatFieldUpdateOperationsInput | number
    analysisConfidence?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiAnomalyUpsertWithWhereUniqueWithoutSessionInput = {
    where: AiAnomalyWhereUniqueInput
    update: XOR<AiAnomalyUpdateWithoutSessionInput, AiAnomalyUncheckedUpdateWithoutSessionInput>
    create: XOR<AiAnomalyCreateWithoutSessionInput, AiAnomalyUncheckedCreateWithoutSessionInput>
  }

  export type AiAnomalyUpdateWithWhereUniqueWithoutSessionInput = {
    where: AiAnomalyWhereUniqueInput
    data: XOR<AiAnomalyUpdateWithoutSessionInput, AiAnomalyUncheckedUpdateWithoutSessionInput>
  }

  export type AiAnomalyUpdateManyWithWhereWithoutSessionInput = {
    where: AiAnomalyScalarWhereInput
    data: XOR<AiAnomalyUpdateManyMutationInput, AiAnomalyUncheckedUpdateManyWithoutSessionInput>
  }

  export type AiAnomalyScalarWhereInput = {
    AND?: AiAnomalyScalarWhereInput | AiAnomalyScalarWhereInput[]
    OR?: AiAnomalyScalarWhereInput[]
    NOT?: AiAnomalyScalarWhereInput | AiAnomalyScalarWhereInput[]
    id?: StringFilter<"AiAnomaly"> | string
    sessionId?: StringFilter<"AiAnomaly"> | string
    type?: EnumAnomalyTypeFilter<"AiAnomaly"> | $Enums.AnomalyType
    severity?: EnumAnomalySeverityFilter<"AiAnomaly"> | $Enums.AnomalySeverity
    timestamp?: DateTimeFilter<"AiAnomaly"> | Date | string
    duration?: IntNullableFilter<"AiAnomaly"> | number | null
    confidence?: FloatFilter<"AiAnomaly"> | number
    description?: StringFilter<"AiAnomaly"> | string
    metadata?: JsonNullableFilter<"AiAnomaly">
    createdAt?: DateTimeFilter<"AiAnomaly"> | Date | string
  }

  export type AiCheckpointUpsertWithWhereUniqueWithoutSessionInput = {
    where: AiCheckpointWhereUniqueInput
    update: XOR<AiCheckpointUpdateWithoutSessionInput, AiCheckpointUncheckedUpdateWithoutSessionInput>
    create: XOR<AiCheckpointCreateWithoutSessionInput, AiCheckpointUncheckedCreateWithoutSessionInput>
  }

  export type AiCheckpointUpdateWithWhereUniqueWithoutSessionInput = {
    where: AiCheckpointWhereUniqueInput
    data: XOR<AiCheckpointUpdateWithoutSessionInput, AiCheckpointUncheckedUpdateWithoutSessionInput>
  }

  export type AiCheckpointUpdateManyWithWhereWithoutSessionInput = {
    where: AiCheckpointScalarWhereInput
    data: XOR<AiCheckpointUpdateManyMutationInput, AiCheckpointUncheckedUpdateManyWithoutSessionInput>
  }

  export type AiCheckpointScalarWhereInput = {
    AND?: AiCheckpointScalarWhereInput | AiCheckpointScalarWhereInput[]
    OR?: AiCheckpointScalarWhereInput[]
    NOT?: AiCheckpointScalarWhereInput | AiCheckpointScalarWhereInput[]
    id?: StringFilter<"AiCheckpoint"> | string
    sessionId?: StringFilter<"AiCheckpoint"> | string
    timestamp?: DateTimeFilter<"AiCheckpoint"> | Date | string
    eventType?: EnumCheckpointTypeFilter<"AiCheckpoint"> | $Enums.CheckpointType
    metadata?: JsonNullableFilter<"AiCheckpoint">
  }

  export type AiSessionCreateWithoutAggregateInput = {
    id: string
    sessionId: string
    status?: $Enums.AiSessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: string | null
    checkpointCount?: number
    fileSize?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    examResult?: ExamResultCreateNestedOneWithoutAiSessionInput
    anomalies?: AiAnomalyCreateNestedManyWithoutSessionInput
    checkpoints?: AiCheckpointCreateNestedManyWithoutSessionInput
  }

  export type AiSessionUncheckedCreateWithoutAggregateInput = {
    id: string
    sessionId: string
    examResultId?: string | null
    status?: $Enums.AiSessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: string | null
    checkpointCount?: number
    fileSize?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    anomalies?: AiAnomalyUncheckedCreateNestedManyWithoutSessionInput
    checkpoints?: AiCheckpointUncheckedCreateNestedManyWithoutSessionInput
  }

  export type AiSessionCreateOrConnectWithoutAggregateInput = {
    where: AiSessionWhereUniqueInput
    create: XOR<AiSessionCreateWithoutAggregateInput, AiSessionUncheckedCreateWithoutAggregateInput>
  }

  export type ExamResultCreateWithoutAiAnalysisDataInput = {
    id?: string
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    exam: ExamCreateNestedOneWithoutExamResultsInput
    student?: StudentCreateNestedOneWithoutExamResultsInput
    answers?: AnswerCreateNestedManyWithoutExamResultInput
    aiSession?: AiSessionCreateNestedOneWithoutExamResultInput
  }

  export type ExamResultUncheckedCreateWithoutAiAnalysisDataInput = {
    id?: string
    examId: string
    studentId?: string | null
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    answers?: AnswerUncheckedCreateNestedManyWithoutExamResultInput
    aiSession?: AiSessionUncheckedCreateNestedOneWithoutExamResultInput
  }

  export type ExamResultCreateOrConnectWithoutAiAnalysisDataInput = {
    where: ExamResultWhereUniqueInput
    create: XOR<ExamResultCreateWithoutAiAnalysisDataInput, ExamResultUncheckedCreateWithoutAiAnalysisDataInput>
  }

  export type AiSessionUpsertWithoutAggregateInput = {
    update: XOR<AiSessionUpdateWithoutAggregateInput, AiSessionUncheckedUpdateWithoutAggregateInput>
    create: XOR<AiSessionCreateWithoutAggregateInput, AiSessionUncheckedCreateWithoutAggregateInput>
    where?: AiSessionWhereInput
  }

  export type AiSessionUpdateToOneWithWhereWithoutAggregateInput = {
    where?: AiSessionWhereInput
    data: XOR<AiSessionUpdateWithoutAggregateInput, AiSessionUncheckedUpdateWithoutAggregateInput>
  }

  export type AiSessionUpdateWithoutAggregateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    status?: EnumAiSessionStatusFieldUpdateOperationsInput | $Enums.AiSessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointCount?: IntFieldUpdateOperationsInput | number
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examResult?: ExamResultUpdateOneWithoutAiSessionNestedInput
    anomalies?: AiAnomalyUpdateManyWithoutSessionNestedInput
    checkpoints?: AiCheckpointUpdateManyWithoutSessionNestedInput
  }

  export type AiSessionUncheckedUpdateWithoutAggregateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    examResultId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAiSessionStatusFieldUpdateOperationsInput | $Enums.AiSessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointCount?: IntFieldUpdateOperationsInput | number
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    anomalies?: AiAnomalyUncheckedUpdateManyWithoutSessionNestedInput
    checkpoints?: AiCheckpointUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type ExamResultUpsertWithoutAiAnalysisDataInput = {
    update: XOR<ExamResultUpdateWithoutAiAnalysisDataInput, ExamResultUncheckedUpdateWithoutAiAnalysisDataInput>
    create: XOR<ExamResultCreateWithoutAiAnalysisDataInput, ExamResultUncheckedCreateWithoutAiAnalysisDataInput>
    where?: ExamResultWhereInput
  }

  export type ExamResultUpdateToOneWithWhereWithoutAiAnalysisDataInput = {
    where?: ExamResultWhereInput
    data: XOR<ExamResultUpdateWithoutAiAnalysisDataInput, ExamResultUncheckedUpdateWithoutAiAnalysisDataInput>
  }

  export type ExamResultUpdateWithoutAiAnalysisDataInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exam?: ExamUpdateOneRequiredWithoutExamResultsNestedInput
    student?: StudentUpdateOneWithoutExamResultsNestedInput
    answers?: AnswerUpdateManyWithoutExamResultNestedInput
    aiSession?: AiSessionUpdateOneWithoutExamResultNestedInput
  }

  export type ExamResultUncheckedUpdateWithoutAiAnalysisDataInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: AnswerUncheckedUpdateManyWithoutExamResultNestedInput
    aiSession?: AiSessionUncheckedUpdateOneWithoutExamResultNestedInput
  }

  export type AiSessionCreateWithoutAnomaliesInput = {
    id: string
    sessionId: string
    status?: $Enums.AiSessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: string | null
    checkpointCount?: number
    fileSize?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    examResult?: ExamResultCreateNestedOneWithoutAiSessionInput
    aggregate?: AiAnalysisAggregateCreateNestedOneWithoutSessionInput
    checkpoints?: AiCheckpointCreateNestedManyWithoutSessionInput
  }

  export type AiSessionUncheckedCreateWithoutAnomaliesInput = {
    id: string
    sessionId: string
    examResultId?: string | null
    status?: $Enums.AiSessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: string | null
    checkpointCount?: number
    fileSize?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aggregate?: AiAnalysisAggregateUncheckedCreateNestedOneWithoutSessionInput
    checkpoints?: AiCheckpointUncheckedCreateNestedManyWithoutSessionInput
  }

  export type AiSessionCreateOrConnectWithoutAnomaliesInput = {
    where: AiSessionWhereUniqueInput
    create: XOR<AiSessionCreateWithoutAnomaliesInput, AiSessionUncheckedCreateWithoutAnomaliesInput>
  }

  export type AiSessionUpsertWithoutAnomaliesInput = {
    update: XOR<AiSessionUpdateWithoutAnomaliesInput, AiSessionUncheckedUpdateWithoutAnomaliesInput>
    create: XOR<AiSessionCreateWithoutAnomaliesInput, AiSessionUncheckedCreateWithoutAnomaliesInput>
    where?: AiSessionWhereInput
  }

  export type AiSessionUpdateToOneWithWhereWithoutAnomaliesInput = {
    where?: AiSessionWhereInput
    data: XOR<AiSessionUpdateWithoutAnomaliesInput, AiSessionUncheckedUpdateWithoutAnomaliesInput>
  }

  export type AiSessionUpdateWithoutAnomaliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    status?: EnumAiSessionStatusFieldUpdateOperationsInput | $Enums.AiSessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointCount?: IntFieldUpdateOperationsInput | number
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examResult?: ExamResultUpdateOneWithoutAiSessionNestedInput
    aggregate?: AiAnalysisAggregateUpdateOneWithoutSessionNestedInput
    checkpoints?: AiCheckpointUpdateManyWithoutSessionNestedInput
  }

  export type AiSessionUncheckedUpdateWithoutAnomaliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    examResultId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAiSessionStatusFieldUpdateOperationsInput | $Enums.AiSessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointCount?: IntFieldUpdateOperationsInput | number
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aggregate?: AiAnalysisAggregateUncheckedUpdateOneWithoutSessionNestedInput
    checkpoints?: AiCheckpointUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type AiSessionCreateWithoutCheckpointsInput = {
    id: string
    sessionId: string
    status?: $Enums.AiSessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: string | null
    checkpointCount?: number
    fileSize?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    examResult?: ExamResultCreateNestedOneWithoutAiSessionInput
    aggregate?: AiAnalysisAggregateCreateNestedOneWithoutSessionInput
    anomalies?: AiAnomalyCreateNestedManyWithoutSessionInput
  }

  export type AiSessionUncheckedCreateWithoutCheckpointsInput = {
    id: string
    sessionId: string
    examResultId?: string | null
    status?: $Enums.AiSessionStatus
    startTime?: Date | string
    endTime?: Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: string | null
    checkpointCount?: number
    fileSize?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    aggregate?: AiAnalysisAggregateUncheckedCreateNestedOneWithoutSessionInput
    anomalies?: AiAnomalyUncheckedCreateNestedManyWithoutSessionInput
  }

  export type AiSessionCreateOrConnectWithoutCheckpointsInput = {
    where: AiSessionWhereUniqueInput
    create: XOR<AiSessionCreateWithoutCheckpointsInput, AiSessionUncheckedCreateWithoutCheckpointsInput>
  }

  export type AiSessionUpsertWithoutCheckpointsInput = {
    update: XOR<AiSessionUpdateWithoutCheckpointsInput, AiSessionUncheckedUpdateWithoutCheckpointsInput>
    create: XOR<AiSessionCreateWithoutCheckpointsInput, AiSessionUncheckedCreateWithoutCheckpointsInput>
    where?: AiSessionWhereInput
  }

  export type AiSessionUpdateToOneWithWhereWithoutCheckpointsInput = {
    where?: AiSessionWhereInput
    data: XOR<AiSessionUpdateWithoutCheckpointsInput, AiSessionUncheckedUpdateWithoutCheckpointsInput>
  }

  export type AiSessionUpdateWithoutCheckpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    status?: EnumAiSessionStatusFieldUpdateOperationsInput | $Enums.AiSessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointCount?: IntFieldUpdateOperationsInput | number
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examResult?: ExamResultUpdateOneWithoutAiSessionNestedInput
    aggregate?: AiAnalysisAggregateUpdateOneWithoutSessionNestedInput
    anomalies?: AiAnomalyUpdateManyWithoutSessionNestedInput
  }

  export type AiSessionUncheckedUpdateWithoutCheckpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    examResultId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAiSessionStatusFieldUpdateOperationsInput | $Enums.AiSessionStatus
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientInfo?: NullableJsonNullValueInput | InputJsonValue
    streamInfo?: NullableJsonNullValueInput | InputJsonValue
    checkpointFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointCount?: IntFieldUpdateOperationsInput | number
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aggregate?: AiAnalysisAggregateUncheckedUpdateOneWithoutSessionNestedInput
    anomalies?: AiAnomalyUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type PaperCreateManyTeacherInput = {
    id?: string
    title: string
    description?: string | null
    category?: string | null
    timeLimit?: number | null
    allowRetake?: boolean
    showResultsImmediately?: boolean
    randomizeQuestions?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ExamCreateManyTeacherInput = {
    id?: string
    paperId: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    timeLimit?: number | null
    accessCode?: string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: number
    requireCamera?: boolean
    requireMicrophone?: boolean
    enableAIAnalysis?: boolean
    status?: $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    scheduledDeletionAt?: Date | string | null
  }

  export type PaperUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResultsImmediately?: BoolFieldUpdateOperationsInput | boolean
    randomizeQuestions?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    questions?: QuestionUpdateManyWithoutPaperNestedInput
    exams?: ExamUpdateManyWithoutPaperNestedInput
  }

  export type PaperUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResultsImmediately?: BoolFieldUpdateOperationsInput | boolean
    randomizeQuestions?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    questions?: QuestionUncheckedUpdateManyWithoutPaperNestedInput
    exams?: ExamUncheckedUpdateManyWithoutPaperNestedInput
  }

  export type PaperUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResultsImmediately?: BoolFieldUpdateOperationsInput | boolean
    randomizeQuestions?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExamUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: IntFieldUpdateOperationsInput | number
    requireCamera?: BoolFieldUpdateOperationsInput | boolean
    requireMicrophone?: BoolFieldUpdateOperationsInput | boolean
    enableAIAnalysis?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledDeletionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paper?: PaperUpdateOneRequiredWithoutExamsNestedInput
    examResults?: ExamResultUpdateManyWithoutExamNestedInput
  }

  export type ExamUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: IntFieldUpdateOperationsInput | number
    requireCamera?: BoolFieldUpdateOperationsInput | boolean
    requireMicrophone?: BoolFieldUpdateOperationsInput | boolean
    enableAIAnalysis?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledDeletionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examResults?: ExamResultUncheckedUpdateManyWithoutExamNestedInput
  }

  export type ExamUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    paperId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: IntFieldUpdateOperationsInput | number
    requireCamera?: BoolFieldUpdateOperationsInput | boolean
    requireMicrophone?: BoolFieldUpdateOperationsInput | boolean
    enableAIAnalysis?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledDeletionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExamResultCreateManyStudentInput = {
    id?: string
    examId: string
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ExamResultUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exam?: ExamUpdateOneRequiredWithoutExamResultsNestedInput
    answers?: AnswerUpdateManyWithoutExamResultNestedInput
    aiAnalysisData?: AiAnalysisAggregateUpdateOneWithoutExamResultNestedInput
    aiSession?: AiSessionUpdateOneWithoutExamResultNestedInput
  }

  export type ExamResultUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: AnswerUncheckedUpdateManyWithoutExamResultNestedInput
    aiAnalysisData?: AiAnalysisAggregateUncheckedUpdateOneWithoutExamResultNestedInput
    aiSession?: AiSessionUncheckedUpdateOneWithoutExamResultNestedInput
  }

  export type ExamResultUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    examId?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QuestionCreateManyPaperInput = {
    id?: string
    title: string
    type: $Enums.QuestionType
    description?: string | null
    dimension?: string | null
    explanation?: string | null
    order: number
    required?: boolean
    points?: number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ExamCreateManyPaperInput = {
    id?: string
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    timeLimit?: number | null
    accessCode?: string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: number
    requireCamera?: boolean
    requireMicrophone?: boolean
    enableAIAnalysis?: boolean
    status?: $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: Date | string | null
    teacherId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    scheduledDeletionAt?: Date | string | null
  }

  export type QuestionUpdateWithoutPaperInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dimension?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    points?: IntFieldUpdateOperationsInput | number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: AnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutPaperInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dimension?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    points?: IntFieldUpdateOperationsInput | number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: AnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateManyWithoutPaperInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dimension?: NullableStringFieldUpdateOperationsInput | string | null
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    points?: IntFieldUpdateOperationsInput | number
    displayCondition?: NullableJsonNullValueInput | InputJsonValue
    options?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExamUpdateWithoutPaperInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: IntFieldUpdateOperationsInput | number
    requireCamera?: BoolFieldUpdateOperationsInput | boolean
    requireMicrophone?: BoolFieldUpdateOperationsInput | boolean
    enableAIAnalysis?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledDeletionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teacher?: TeacherUpdateOneRequiredWithoutExamsNestedInput
    examResults?: ExamResultUpdateManyWithoutExamNestedInput
  }

  export type ExamUncheckedUpdateWithoutPaperInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: IntFieldUpdateOperationsInput | number
    requireCamera?: BoolFieldUpdateOperationsInput | boolean
    requireMicrophone?: BoolFieldUpdateOperationsInput | boolean
    enableAIAnalysis?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teacherId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledDeletionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    examResults?: ExamResultUncheckedUpdateManyWithoutExamNestedInput
  }

  export type ExamUncheckedUpdateManyWithoutPaperInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    allowedStudents?: NullableJsonNullValueInput | InputJsonValue
    maxAttempts?: IntFieldUpdateOperationsInput | number
    requireCamera?: BoolFieldUpdateOperationsInput | boolean
    requireMicrophone?: BoolFieldUpdateOperationsInput | boolean
    enableAIAnalysis?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumExamStatusFieldUpdateOperationsInput | $Enums.ExamStatus
    paperSnapshot?: NullableJsonNullValueInput | InputJsonValue
    questionsSnapshot?: NullableJsonNullValueInput | InputJsonValue
    snapshotCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teacherId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledDeletionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnswerCreateManyQuestionInput = {
    id?: string
    examResultId: string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: string | null
    points?: number
    maxPoints?: number
    questionDisplayedAt?: Date | string | null
    firstInteractionAt?: Date | string | null
    lastModifiedAt?: Date | string | null
    answeredAt?: Date | string
    totalViewTime?: number | null
    interactionCount?: number
    hesitationScore?: number | null
  }

  export type AnswerUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    points?: FloatFieldUpdateOperationsInput | number
    maxPoints?: FloatFieldUpdateOperationsInput | number
    questionDisplayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastModifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalViewTime?: NullableIntFieldUpdateOperationsInput | number | null
    interactionCount?: IntFieldUpdateOperationsInput | number
    hesitationScore?: NullableFloatFieldUpdateOperationsInput | number | null
    examResult?: ExamResultUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type AnswerUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    examResultId?: StringFieldUpdateOperationsInput | string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    points?: FloatFieldUpdateOperationsInput | number
    maxPoints?: FloatFieldUpdateOperationsInput | number
    questionDisplayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastModifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalViewTime?: NullableIntFieldUpdateOperationsInput | number | null
    interactionCount?: IntFieldUpdateOperationsInput | number
    hesitationScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AnswerUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    examResultId?: StringFieldUpdateOperationsInput | string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    points?: FloatFieldUpdateOperationsInput | number
    maxPoints?: FloatFieldUpdateOperationsInput | number
    questionDisplayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastModifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalViewTime?: NullableIntFieldUpdateOperationsInput | number | null
    interactionCount?: IntFieldUpdateOperationsInput | number
    hesitationScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ExamResultCreateManyExamInput = {
    id?: string
    studentId?: string | null
    participantId: string
    participantName: string
    startedAt: Date | string
    submittedAt?: Date | string | null
    timeSpent?: number | null
    ipAddress?: string | null
    userAgent?: string | null
    totalScore?: number
    maxScore?: number
    percentage?: number
    isCompleted?: boolean
    isValid?: boolean
    aiSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ExamResultUpdateWithoutExamInput = {
    id?: StringFieldUpdateOperationsInput | string
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    student?: StudentUpdateOneWithoutExamResultsNestedInput
    answers?: AnswerUpdateManyWithoutExamResultNestedInput
    aiAnalysisData?: AiAnalysisAggregateUpdateOneWithoutExamResultNestedInput
    aiSession?: AiSessionUpdateOneWithoutExamResultNestedInput
  }

  export type ExamResultUncheckedUpdateWithoutExamInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: AnswerUncheckedUpdateManyWithoutExamResultNestedInput
    aiAnalysisData?: AiAnalysisAggregateUncheckedUpdateOneWithoutExamResultNestedInput
    aiSession?: AiSessionUncheckedUpdateOneWithoutExamResultNestedInput
  }

  export type ExamResultUncheckedUpdateManyWithoutExamInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    participantId?: StringFieldUpdateOperationsInput | string
    participantName?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    totalScore?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    percentage?: FloatFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isValid?: BoolFieldUpdateOperationsInput | boolean
    aiSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnswerCreateManyExamResultInput = {
    id?: string
    questionId: string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: string | null
    points?: number
    maxPoints?: number
    questionDisplayedAt?: Date | string | null
    firstInteractionAt?: Date | string | null
    lastModifiedAt?: Date | string | null
    answeredAt?: Date | string
    totalViewTime?: number | null
    interactionCount?: number
    hesitationScore?: number | null
  }

  export type AnswerUpdateWithoutExamResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    points?: FloatFieldUpdateOperationsInput | number
    maxPoints?: FloatFieldUpdateOperationsInput | number
    questionDisplayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastModifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalViewTime?: NullableIntFieldUpdateOperationsInput | number | null
    interactionCount?: IntFieldUpdateOperationsInput | number
    hesitationScore?: NullableFloatFieldUpdateOperationsInput | number | null
    question?: QuestionUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type AnswerUncheckedUpdateWithoutExamResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    points?: FloatFieldUpdateOperationsInput | number
    maxPoints?: FloatFieldUpdateOperationsInput | number
    questionDisplayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastModifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalViewTime?: NullableIntFieldUpdateOperationsInput | number | null
    interactionCount?: IntFieldUpdateOperationsInput | number
    hesitationScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AnswerUncheckedUpdateManyWithoutExamResultInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    selectedOptions?: NullableJsonNullValueInput | InputJsonValue
    textAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    points?: FloatFieldUpdateOperationsInput | number
    maxPoints?: FloatFieldUpdateOperationsInput | number
    questionDisplayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastModifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalViewTime?: NullableIntFieldUpdateOperationsInput | number | null
    interactionCount?: IntFieldUpdateOperationsInput | number
    hesitationScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AiAnomalyCreateManySessionInput = {
    id?: string
    type: $Enums.AnomalyType
    severity: $Enums.AnomalySeverity
    timestamp: Date | string
    duration?: number | null
    confidence?: number
    description: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AiCheckpointCreateManySessionInput = {
    id?: string
    timestamp: Date | string
    eventType: $Enums.CheckpointType
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AiAnomalyUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnomalyTypeFieldUpdateOperationsInput | $Enums.AnomalyType
    severity?: EnumAnomalySeverityFieldUpdateOperationsInput | $Enums.AnomalySeverity
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    confidence?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiAnomalyUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnomalyTypeFieldUpdateOperationsInput | $Enums.AnomalyType
    severity?: EnumAnomalySeverityFieldUpdateOperationsInput | $Enums.AnomalySeverity
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    confidence?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiAnomalyUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnomalyTypeFieldUpdateOperationsInput | $Enums.AnomalyType
    severity?: EnumAnomalySeverityFieldUpdateOperationsInput | $Enums.AnomalySeverity
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    confidence?: FloatFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiCheckpointUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: EnumCheckpointTypeFieldUpdateOperationsInput | $Enums.CheckpointType
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AiCheckpointUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: EnumCheckpointTypeFieldUpdateOperationsInput | $Enums.CheckpointType
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AiCheckpointUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: EnumCheckpointTypeFieldUpdateOperationsInput | $Enums.CheckpointType
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use TeacherCountOutputTypeDefaultArgs instead
     */
    export type TeacherCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TeacherCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentCountOutputTypeDefaultArgs instead
     */
    export type StudentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaperCountOutputTypeDefaultArgs instead
     */
    export type PaperCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaperCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuestionCountOutputTypeDefaultArgs instead
     */
    export type QuestionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuestionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExamCountOutputTypeDefaultArgs instead
     */
    export type ExamCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExamCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExamResultCountOutputTypeDefaultArgs instead
     */
    export type ExamResultCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExamResultCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AiSessionCountOutputTypeDefaultArgs instead
     */
    export type AiSessionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AiSessionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TeacherDefaultArgs instead
     */
    export type TeacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TeacherDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentDefaultArgs instead
     */
    export type StudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaperDefaultArgs instead
     */
    export type PaperArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaperDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QuestionDefaultArgs instead
     */
    export type QuestionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QuestionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExamDefaultArgs instead
     */
    export type ExamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExamDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExamResultDefaultArgs instead
     */
    export type ExamResultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExamResultDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AnswerDefaultArgs instead
     */
    export type AnswerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AnswerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AiSessionDefaultArgs instead
     */
    export type AiSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AiSessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AiAnalysisAggregateDefaultArgs instead
     */
    export type AiAnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AiAnalysisAggregateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AiAnomalyDefaultArgs instead
     */
    export type AiAnomalyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AiAnomalyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AiCheckpointDefaultArgs instead
     */
    export type AiCheckpointArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AiCheckpointDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SystemLogDefaultArgs instead
     */
    export type SystemLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SystemLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SystemConfigDefaultArgs instead
     */
    export type SystemConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SystemConfigDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}