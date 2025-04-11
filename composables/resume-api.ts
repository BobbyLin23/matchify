import type { Resume } from '~/types'

export function useResumeAPI() {
  const loading = ref(false)
  const error = ref('')

  // 重置错误信息
  const resetError = () => {
    error.value = ''
  }

  // 显示错误信息
  const handleError = (err: any) => {
    console.error(err)
    error.value = err?.statusMessage || err?.message || '操作失败，请稍后重试'
  }

  // 获取简历列表
  async function getResumes() {
    loading.value = true
    resetError()

    try {
      const { data } = await useFetch<Resume[]>('/api/resumes', {
        transform: (data) => {
          return data.map(resume => ({
            ...resume,
            createdAt: new Date(resume.createdAt),
            updatedAt: new Date(resume.updatedAt),
          }))
        },
      })

      return data
    }
    catch (err) {
      handleError(err)
      return null
    }
    finally {
      loading.value = false
    }
  }

  // 获取单个简历
  async function getResume(id: string) {
    loading.value = true
    resetError()

    try {
      const { data } = await useFetch<Resume>(`/api/resumes/${id}`, {
        transform: resume => ({
          ...resume,
          createdAt: new Date(resume.createdAt),
          updatedAt: new Date(resume.updatedAt),
        }),
      })

      return data
    }
    catch (err) {
      handleError(err)
      return null
    }
    finally {
      loading.value = false
    }
  }

  // 创建简历
  async function createResume() {
    loading.value = true
    resetError()

    try {
      const { data } = await useFetch<Resume>('/api/resumes', {
        method: 'POST',
      })

      return data
    }
    catch (err) {
      handleError(err)
      return null
    }
    finally {
      loading.value = false
    }
  }

  // 更新简历
  async function updateResume(id: string, resumeData: Partial<Resume>) {
    loading.value = true
    resetError()

    try {
      const { data } = await useFetch<Resume>(`/api/resumes/${id}`, {
        method: 'PUT',
        body: resumeData,
      })

      return data
    }
    catch (err) {
      handleError(err)
      return null
    }
    finally {
      loading.value = false
    }
  }

  // 删除简历
  async function deleteResume(id: string) {
    loading.value = true
    resetError()

    try {
      const { data } = await useFetch<{ success: boolean, data: Resume }>(`/api/resumes/${id}`, {
        method: 'DELETE',
      })

      return data
    }
    catch (err) {
      handleError(err)
      return null
    }
    finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    getResumes,
    getResume,
    createResume,
    updateResume,
    deleteResume,
  }
}
