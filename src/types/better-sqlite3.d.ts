// Type declarations for better-sqlite3
declare module 'better-sqlite3' {
  interface Database {
    exec(sql: string): void
    close(): void
    prepare(sql: string): any
  }
  
  interface DatabaseConstructor {
    new (path: string, options?: any): Database
  }
  
  const Database: DatabaseConstructor
  export default Database
}

