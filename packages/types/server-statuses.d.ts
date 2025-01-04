export type ServerStatusResponse = 'ok' | 'failing';

export type ServerStatus<S = ServerStatusResponse> = {
  status: S;
};

export type DbStatus = ServerStatus;
