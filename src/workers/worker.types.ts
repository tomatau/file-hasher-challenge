export type PayloadWorking = {
  status: 'working'
  payload: {
    file: File
    progress: number
  }
}

export type PayloadDone = {
  status: 'done'
  payload: {
    hash: string
    file: File
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
