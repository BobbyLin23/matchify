import { eq } from 'drizzle-orm'
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

    const data = await db.select().from(resume).where(eq(resume.userId, session.user.id)).limit(10)

    return data
  }
  catch (e) {
    console.error(e)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
