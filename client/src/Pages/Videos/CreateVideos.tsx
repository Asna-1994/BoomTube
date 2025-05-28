import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';

import Header from '../../Components/Header/Header';
import { uploadVideo } from '../../services/videoService';



const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  type: Yup.string().oneOf(['short', 'long']).required('Select a video type'),
  
 videoFile: Yup.mixed()
    .nullable()
    .notRequired()
    .when('type', {
      is: 'short',
      then: (schema) =>
        schema
          .required('Short-form video file is required')
          .test('fileSize', 'File must be under 10MB', (fileList:any) => {
            // Check if fileList exists and has files
            if (!fileList || fileList.length === 0) return false;
            const file = fileList[0];
            return file.size <= 10 * 1024 * 1024;
          })
          .test('fileType', 'Only MP4 files are allowed', (fileList:any) => {
            // Check if fileList exists and has files
            if (!fileList || fileList.length === 0) return false;
            const file = fileList[0];
            return file.type === 'video/mp4';
          }),
    }),

  videoUrl: Yup.string().when('type', {
    is: 'long',
    then: (schema) =>
      schema.required('Video URL is required').url('Enter a valid URL'),
    otherwise: (schema) => schema.notRequired(),
  }),

  price: Yup.number().when('type', {
    is: 'long',
    then: (schema) =>
      schema.required('Price is required').min(0, 'Price cannot be negative'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const CreateVideo = () => {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const type = watch('type');

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('type', data.type);

    if (data.type === 'short') {
      formData.append('videoFile', data.videoFile[0]);
    } else {
      formData.append('videoUrl', data.videoUrl);
      formData.append('price', data.price.toString());
    }

    try {
      const res = await uploadVideo(formData);
      if (res.data.success) {
        toast.success('Video uploaded successfully!');
        reset();
        setVideoPreview(null);
      } else {
        toast.error(res.data.message || 'Upload failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  const handleFilePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-semibold mb-6">Upload a New Video</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input {...register('title')} className="w-full border px-3 py-2 rounded" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea {...register('description')} className="w-full border px-3 py-2 rounded" rows={3} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Video Type */}
          <div>
            <label className="block mb-1 font-medium">Video Type</label>
            <select {...register('type')} className="w-full border px-3 py-2 rounded">
              <option value="">Select Type</option>
              <option value="short">Short-Form</option>
              <option value="long">Long-Form</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>

          {/* Conditional Fields */}
          {type === 'short' && (
            <div>
              <label className="block mb-1 font-medium">Upload Video (.mp4, &lt;10MB)</label>
              <input
                type="file"
                accept="video/mp4"
                {...register('videoFile')}
                onChange={handleFilePreview}
                className="w-full"
              />
              {errors.videoFile && <p className="text-red-500 text-sm">{errors.videoFile.message}</p>}
              {videoPreview && (
                <video src={videoPreview} controls className="mt-2 max-w-full h-48 rounded" />
              )}
            </div>
          )}

          {type === 'long' && (
            <>
              <div>
                <label className="block mb-1 font-medium">Video URL</label>
                <input {...register('videoUrl')} className="w-full border px-3 py-2 rounded" />
                {errors.videoUrl && <p className="text-red-500 text-sm">{errors.videoUrl.message}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium">Price (₹)</label>
                <input type="number" {...register('price')} className="w-full border px-3 py-2 rounded" />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
              </div>
            </>
          )}

          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Upload Video
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateVideo;
