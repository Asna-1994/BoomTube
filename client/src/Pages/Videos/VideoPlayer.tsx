

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Video } from "../DashBoard/Dashboard";
// import Header from "../../Components/Header/Header";
// import { getYouTubeEmbedUrl } from "../../utils/helper";
// import axiosInstance from "../../Instance/axiosInstance";
// import toast from "react-hot-toast";

// interface Comment {
//     _id: string;
//   content: string;
//   userId: {
//     _id: string;
//     firstName: string;
//     lastName : string;
//   };
//   videoId : string;
//   createdAt: Date;
// }
// const VideoPlayer: React.FC = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const video: Video | undefined = state?.video;

//   const [comments, setComments] = useState<Comment[]>([]);
//   const [newComment, setNewComment] = useState("");
//   const [giftAmount, setGiftAmount] = useState(10);
//   const [walletBalance, setWalletBalance] = useState(0);
// const fetchComments = async() => {
//   const response = await axiosInstance.get(`/comments/${video?._id}`)
// }


//   useEffect(() => {
//     if (video) {
//       fetch(`/api/comments/${video._id}`)
//         .then(res => res.json())
//         .then(setComments);

//       fetch("/api/user/wallet")
//         .then(res => res.json())
//         .then(data => setWalletBalance(data.balance));
//     }
//   }, [video]);

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;
// try{
//     const res = await axiosInstance.post(`/comments/${video?._id}`, {content :  newComment })
  

//     if (res.data.success) {
//       const data = res.data.comment
//       toast.success('comment added')
//       setComments([data, ...comments]);
//       setNewComment("");
//     }else{
//       toast.error(res.data.message)
//     }
// }
// catch(err :any){
// toast.error(err?.response.data.message || 'Something went wrong')
// }

//   };

//   const handleGift = async () => {
//     if (!video) return;
//     if (walletBalance < giftAmount) {
//       alert("Insufficient balance!");
//       return;
//     }

//     const res = await fetch("/api/gift", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ videoId: video._id, amount: giftAmount }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert(data.message);
//       setWalletBalance(prev => prev - giftAmount);
//     } else {
//       alert(data.message || "Gift failed");
//     }
//   };

//   if (!video) {
//     return (
//       <div className="p-4 text-center">
//         <p className="text-red-500 mb-4">Video data not available.</p>
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//           onClick={() => navigate("/dashboard")}
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
// <div>
//       <Header/>

//     <div className="min-h-screen bg-gray-100 p-6">

//       <div className="max-w-4xl mx-auto">
//         <div className=" rounded-lg shadow-md p-6 mb-6">
//           <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
//           <p className="text-gray-400 mb-1">
//             By <span className="font-medium">{video.creator.firstName} {video.creator.lastName}</span>
//           </p>
//           <p className="text-sm text-gray-500 mb-4">
//             Uploaded on {new Date(video.createdAt).toLocaleDateString()}
//           </p>

//           {video.type === "short" && video.videoFile?.url ? (
//             <video
//               src={video.videoFile.url}
//               controls
//               autoPlay
//               className="w-full rounded"
//             />
//           ) : (
//             <iframe
//               src={getYouTubeEmbedUrl(video.videoUrl!)}
//               className="w-full h-96 rounded"
//               allowFullScreen
//               title={video.title}
//             />
//           )}
//         </div>

//         {/* Gift the Creator */}
//         <div className=" rounded-lg shadow-md p-4 mb-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <label className="font-medium mr-2">Gift the Creator:</label>
//               <select
//                 value={giftAmount}
//                 onChange={(e) => setGiftAmount(parseInt(e.target.value))}
//                 className="text-black px-2 py-1 rounded"
//               >
//                 <option value={10}>₹10</option>
//                 <option value={50}>₹50</option>
//                 <option value={100}>₹100</option>
//               </select>
//             </div>
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-gray-300">
//                 Wallet: ₹{walletBalance}
//               </span>
//               <button
//                 onClick={handleGift}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//               >
//                 Gift
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Comments Section */}
//         <div className=" rounded-lg shadow-md p-4">
//           <h3 className="text-xl font-semibold mb-4">Comments</h3>

//           <textarea
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             className="w-full text-black p-2 rounded mb-2"
//             rows={3}
//             placeholder="Add a comment..."
//           />

//           <button
//             onClick={handleAddComment}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
//           >
//             Submit
//           </button>

//           {comments.length > 0 ? (
//             <ul className="space-y-4">
//               {comments.map((c) => (
//                 <li key={c._id} className="border-t border-gray-700 pt-2">
//                   <p className="font-medium">{c.userId.firstName}</p>
//                   <p>{c.content}</p>
//                   <p className="text-xs text-gray-500">
//                     {new Date(c.createdAt).toLocaleString()}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-400">No comments yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default VideoPlayer;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Video } from "../DashBoard/Dashboard";
import Header from "../../Components/Header/Header";
import { getYouTubeEmbedUrl } from "../../utils/helper";
import axiosInstance from "../../Instance/axiosInstance";
import toast from "react-hot-toast";
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Redux/slices/authSlice";

interface Comment {
  _id: string;
  content: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  videoId: string;
  createdAt: Date;
}

const VideoPlayer: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const video: Video | undefined = state?.video;
    const {  user } = useSelector((s: RootState) => s.auth);

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [giftAmount, setGiftAmount] = useState(10);
  const [walletBalance, setWalletBalance] = useState(user?.wallet);
  const [loading, setLoading] = useState(false);

const dispatch = useDispatch()


  useEffect(() => {
    if (video) {
      loadComments();
    }
  }, [video]);

  const loadComments = async () => {
    try {
      const res = await axiosInstance.get(`/comments/${video?._id}`);
      setComments(res.data.comments || []);
    } catch {
      toast.error("Failed to load comments.");
    }
  };



  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const res = await axiosInstance.post(`/comments/${video?._id}`, {
        content: newComment,
      });

      if (res.data.success) {
        toast.success("Comment added");
        setComments([res.data.comment, ...comments]);
        setNewComment("");
      } else {
        toast.error(res.data.message || "Could not add comment");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error posting comment");
    } finally {
      setLoading(false);
    }
  };

  const handleGift = async () => {
    if (!video) return;

    if (walletBalance && walletBalance < giftAmount) {
      toast.error("Insufficient wallet balance");
      return;
    }

    try {
      const res = await axiosInstance.post(`/gifts/${video._id}`, {amount: giftAmount });

      if (res.data?.success) {
        toast.success(`Gift sended to ${video.creator.firstName} for video ${video.title}`);
        console.log('user in gift send',  res.data)
        const  user  = res.data.sender
      dispatch(updateUser({user}))
      setWalletBalance(user.wallet)
      } else {
        toast.error("Gift failed");
      }
    } catch {
      toast.error("Error sending gift");
    }
  };

  if (!video) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-4">Video data not available.</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/dashboard")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Video Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{video.title}</h1>
          <p className="text-gray-600 mb-2">
            By <span className="font-medium">{video.creator.firstName} {video.creator.lastName}</span>
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Uploaded on {new Date(video.createdAt).toLocaleDateString()}
          </p>

          {video.type === "short" && video.videoFile?.url ? (
            <video src={video.videoFile.url} controls className="w-full rounded-lg" />
          ) : (
            <iframe
              src={getYouTubeEmbedUrl(video.videoUrl!)}
              className="w-full h-96 rounded-lg"
              allowFullScreen
              title={video.title}
            />
          )}
        </div>

        {/* Gift Creator */}
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div className="space-x-2">
            <label className="font-semibold text-gray-700">Gift the Creator:</label>
            {[10, 50, 100].map((amount) => (
              <button
                key={amount}
                onClick={() => setGiftAmount(amount)}
                className={`px-3 py-1 rounded ${
                  giftAmount === amount
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                ₹{amount}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Wallet: ₹{walletBalance}</span>
            <button
              onClick={handleGift}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Send Gift
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="w-full p-3 text-gray-800 rounded border border-gray-300 mb-3 focus:outline-none focus:ring"
            placeholder="Write a comment..."
          />

          <button
            onClick={handleAddComment}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          <div className="mt-6 space-y-4">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c._id} className="border-t pt-3">
                  <div className="flex justify-between">
                      <p className="font-medium text-gray-800">{c.userId.firstName} {c.userId.lastName}</p>
                     <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
                    </div>
                
                  <p className="text-gray-700">{c.content}</p>
               
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;




