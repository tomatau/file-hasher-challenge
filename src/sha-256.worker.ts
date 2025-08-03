self.onmessage = async ({ data: { file } }) => {
  self.postMessage({
    type: 'progress',
    payload: { message: 'hello, world!', received: file },
  })
}
