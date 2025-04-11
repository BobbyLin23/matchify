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

    const [deleted] = await db.delete(resume)
      .where(
        and(
          eq(resume.id, id),
          eq(resume.userId, session.user.id),
        ),
      )
      .returning()

    if (!deleted) {
      return createError({
        statusCode: 404,
        statusMessage: 'Resume not found or not authorized to delete',
      })
    }

    return { success: true, data: deleted }
  }
  catch (e) {
    console.error(e)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
