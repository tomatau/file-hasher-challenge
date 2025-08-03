import * as fs from 'node:fs'
import * as crypto from 'node:crypto'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fixturesDir = path.join(__dirname, '../fixtures')

if (!fs.existsSync(fixturesDir)) {
  fs.mkdirSync(fixturesDir, { recursive: true })
}

export function createFixture(
  fileName: string,
  sizeInMB: number
): Promise<{ filePath: string; hash: string }> {
  const filePath = path.join(fixturesDir, fileName)
  const buffer = crypto.randomBytes(sizeInMB * 1024 * 1024)

  fs.writeFileSync(filePath, buffer)

  const hash = crypto.createHash('sha256')
  const stream = fs.createReadStream(filePath)

  return new Promise((resolve, reject) => {
    stream.on('data', chunk => hash.update(chunk))
    stream.on('end', () => resolve({ hash: hash.digest('hex'), filePath }))
    stream.on('error', reject)
  })
}
