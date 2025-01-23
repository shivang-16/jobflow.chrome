import apiClient from "../apiClient/apiClient"

export const scrapeJobPage = async(job_link: string, portal: string) => {
  try {
    const data = apiClient.get(`/api/job/scrape?job_link=${job_link}&portal=${portal}`)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    return (error as Error).message
  }
}

export const saveJob = async(data: any) => {
  console.log(data, "here is data")
  try {
    const response = await apiClient.post('/api/user/job/create', data)
    return response.data
  } catch (error) {
    return (error as Error).message
  }
}

export const getJobData = async(page=1, portal='', title='') => {
  try {
    const response = await apiClient.get(`/api/job/get?page=${page}&portal=${portal}&title=${title}`)
    return response.data
  } catch (error: unknown) {
    return (error as Error).message
  }
}