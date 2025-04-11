// utils/drizzle-serializer.ts
export function serializeDrizzleData<T>(data: T): T {
  if (!data)
    return data

  if (typeof data === 'object') {
    if (data instanceof Date) {
      return data.toISOString() as any
    }

    if (Array.isArray(data)) {
      return data.map(serializeDrizzleData) as any
    }

    const result = {} as any
    for (const key in data) {
      result[key] = serializeDrizzleData(data[key])
    }
    return result
  }

  return data
}

export function deserializeDrizzleData<T>(data: any): T {
  if (!data)
    return data

  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      return data.map(deserializeDrizzleData) as any
    }

    const result = {} as any
    for (const key in data) {
      const value = data[key]
      // 检测ISO日期字符串
      if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
        result[key] = new Date(value)
      }
      else {
        result[key] = deserializeDrizzleData(value)
      }
    }
    return result
  }

  return data
}
