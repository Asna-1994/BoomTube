import axiosInstance from "../Instance/axiosInstance";



export const getAllVideos = async(page : number, limit : number) => {
    try{
        const response = await axiosInstance.get(`/videos/feeds?page=${page}&limit=${limit}`)
        return response
    }
    catch(err : any){
        console.log(err)
        throw new Error(err.response?.data?.message || `Error while fetching articles`)
    }

}



export const uploadVideo = async(data :FormData ) => {
    try{
        const response = await axiosInstance.post('/videos/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response
    }
    catch(err : any){
        console.log(err)
        throw new Error(err.response?.data?.message || `Error while publishing article`)
    }

}


