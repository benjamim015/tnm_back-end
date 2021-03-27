declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    PG_PORT: string;
    PG_USERNAME: string;
    PG_PASSWORD: string;
    DATABASE_URL: string;
  }
}
