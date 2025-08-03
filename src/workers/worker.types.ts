export type PayloadWorking = {
  status: 'working'
  payload: {
    received: File
  }
}

export type PayloadDone = {
  status: 'done'
  payload: {
    hash: string
    received: File
  }
}

export type PayloadError = {
  status: 'error'
  payload: {
    error: Error
  }
}

export type Payload = PayloadWorking | PayloadError | PayloadDone

export type WorkerStatus = 'idle' | Payload['status']
