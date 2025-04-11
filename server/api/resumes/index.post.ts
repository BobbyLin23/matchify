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

    const [data] = await db.insert(resume).values({
      title: 'New Resume',
      language: 'en',
      userId: session.user.id,
    }).returning()

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
