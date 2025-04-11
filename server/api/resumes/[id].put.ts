import { and, eq } from 'drizzle-orm'
import { db } from '~/db'
import { resume } from '~/db/schemas'
import { auth } from '~/lib/auth'

export default defineEventHandler(async (event) => {
  try {
    const session = await auth.api.getSession({
      headers: event.headers,
    })

    if (!session) {
      return createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const id = getRouterParam(event, 'id')

    if (!id) {
      return createError({
        statusCode: 400,
        statusMessage: 'Resume ID is required',
      })
    }

    const body = await readBody(event)

    if (!body) {
      return createError({
        statusCode: 400,
        statusMessage: 'Request body is required',
      })
    }

    // 从请求体中过滤掉不允许更新的字段
    const { userId, id: resumeId, ...updateData } = body

    const [updated] = await db.update(resume)
      .set(updateData)
      .where(
        and(
          eq(resume.id, id),
          eq(resume.userId, session.user.id),
        ),
      )
      .returning()

    if (!updated) {
      return createError({
        statusCode: 404,
        statusMessage: 'Resume not found or not authorized to update',
      })
    }

    return updated
  }
  catch (e) {
    console.error(e)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
