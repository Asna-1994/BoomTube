
export interface Video {
  _id: string;
  title: string;
  description?: string;
  type: 'short' | 'long';
  videoUrl?:  string ;
  videoFile? : {
      url :string  | '';
      publicId : string | ''
    }
  price: number;
  creator: {
    _id: string;
    firstName: string;
    lastName  : string;
  };
  createdAt: Date;
  isPurchased?: boolean;

}




import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import useVideo from "../../CustomHooks/useVideo";




const VideoFeedPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((s: RootState) => s.auth);
  const {
    videos,

    lastVideoRef,
    isLoading,
    buyVideo,
    watchVideo,
  } = useVideo();

useEffect(() => {
  if (!isAuthenticated) navigate("/login");
}, [isAuthenticated]);


  const handleAction = (video: Video) => {
    if (video.price > 0 && !video.isPurchased) {
      buyVideo(video._id);
    } else {
      watchVideo(video);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-3xl mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Your Video Feed</h1>

        {isLoading &&   <div className="min-h-screen flex justify-center items-center">
            <div className="animate-pulse text-gray-400 text-lg">Loading article...</div>
          </div>}
       

        {!isLoading && videos.length === 0 && (
          <div className="p-6 bg-white rounded shadow text-center">
            No videos found.
          </div>
        )}

        <div className="space-y-6">
          {videos.map((video, idx) => {
            const isLast = idx === videos.length - 1;
            return (
              <div
                key={video._id}
                ref={isLast ? lastVideoRef : null}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="p-4">
                  {/* Creator Info */}
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                      {video.creator.firstName[0]}
                      {video.creator.lastName[0]}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">
                        {video.creator.firstName} {video.creator.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(video.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Video Preview */}
                  {video.type === "short" && video.videoFile?.url ? (
                    <video
                      src={video.videoFile.url}
                      autoPlay
                      muted
                      loop
                      className="w-full h-64 object-cover rounded"
                    />
                  ) : (
                    <img
                      src='https://gettravel.com/wp-content/uploads/2018/04/Video-Placeholder.jpg'
                      alt={video.title}
                      className="w-full h-64 object-cover rounded"
                    />
                  )}

                  {/* Title & Description */}
                  <h2 className="mt-4 text-xl font-semibold">{video.title}</h2>
                  {video.description && (
                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {video.description}
                    </p>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => handleAction(video)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {video.price > 0 && !video.isPurchased
                      ? `Buy for ₹${video.price}`
                      : "Watch"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

    </div>
  );
};

export default VideoFeedPage;

