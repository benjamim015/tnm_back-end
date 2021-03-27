declare namespace NodeJS {
  export interface ProcessEnv {
    API_PORT: string;
    PG_PORT: string;
    PG_USERNAME: string;
    PG_PASSWORD: string;
  }
}
