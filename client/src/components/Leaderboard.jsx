// client/src/components/Leaderboard.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { FaTrophy, FaCalendarAlt } from 'react-icons/fa'; // Updated FaUserCircle to FaCalendarAlt

// Helper component for the individual rank card
const RankCard = ({ rank, user }) => {
    // Destructure the new field, and remove the unused fields (e.g., userId, bestResultId)
    const { username, maxScore, testDate } = user; 
    
    // Function to format the date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
        };
        // Ensure testDate is treated as a Date object
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Define styles based on rank
    let rankColor = 'text-gray-600';
    let trophyColor = 'text-gray-400';
    let cardStyle = 'bg-white border-gray-200';

    if (rank === 1) {
        rankColor = 'text-yellow-600';
        trophyColor = 'text-yellow-500';
        cardStyle = 'bg-yellow-50 border-yellow-300 shadow-lg scale-[1.03]';
    } else if (rank === 2) {
        rankColor = 'text-gray-500';
        trophyColor = 'text-gray-500';
        cardStyle = 'bg-gray-100 border-gray-300 shadow-md';
    } else if (rank === 3) {
        rankColor = 'text-orange-500';
        trophyColor = 'text-orange-400';
        cardStyle = 'bg-orange-50 border-orange-300 shadow-sm';
    }
    
    return (
        <div 
            className={`flex items-center p-4 mb-3 rounded-lg border-2 transition-all duration-300 ${cardStyle}`}
        >
            {/* 1. Rank Number and Trophy */}
            <div className={`text-3xl font-extrabold mr-4 w-10 flex-shrink-0 ${rankColor}`}>
                {rank}
            </div>
            <FaTrophy className={`text-2xl mr-4 ${trophyColor} flex-shrink-0`} />

            {/* 2. User Details (Username) and 3. Date */}
            <div className="flex-grow">
                <p className="text-lg font-semibold text-gray-800 truncate">{username}</p>
                {/* Replaced User ID with Date and Time of Test */}
                <p className="text-sm text-gray-500 flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    Tested: {formatDate(testDate)}
                </p>
            </div>

            {/* 4. Score */}
            <div className="flex-shrink-0 text-right">
                <p className="text-2xl font-bold text-green-600">{Math.floor(maxScore)}</p>
                <p className="text-xs text-gray-500">Score</p>
            </div>
        </div>
    );
};


const Leaderboard = () => {
    // Select state from Redux
    const { leaderboard, leaderboardLoading, leaderboardError } = useSelector(
        (state) => state.result
    );

    if (leaderboardLoading) {
        return <div className="text-center p-6 text-blue-600">Loading Leaderboard...</div>;
    }

    if (leaderboardError) {
        return (
            <div className="text-center p-6 text-red-600 bg-red-100 rounded-lg">
                Error loading leaderboard: {leaderboardError}
            </div>
        );
    }
    
    if (leaderboard.length === 0) {
        return (
            <div className="text-center p-6 text-gray-500 bg-gray-100 rounded-lg">
                No test results available yet to form a leaderboard.
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-blue-600">
            <h3 className="text-3xl font-extrabold text-center text-gray-800 mb-6 flex items-center justify-center">
                <FaTrophy className="text-yellow-500 mr-3 text-3xl"/> 
                Top Scorers Leaderboard
            </h3>

            {leaderboard.map((user, index) => (
                // userId is still needed here for the React 'key' prop
                <RankCard key={user.userId} rank={index + 1} user={user} /> 
            ))}
            
            <p className="text-center text-sm text-gray-400 mt-4">
                Scores are based on the highest score achieved by each unique user.
            </p>
        </div>
    );
};

export default Leaderboard;




// // client/src/components/Leaderboard.jsx

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { FaTrophy, FaUserCircle } from 'react-icons/fa'; // Icons for visual appeal

// // Helper component for the individual rank card
// const RankCard = ({ rank, user }) => {
//     const { username, maxScore } = user;
    
//     // Define styles based on rank
//     let rankColor = 'text-gray-600';
//     let trophyColor = 'text-gray-400';
//     let cardStyle = 'bg-white border-gray-200';

//     if (rank === 1) {
//         rankColor = 'text-yellow-600';
//         trophyColor = 'text-yellow-500';
//         cardStyle = 'bg-yellow-50 border-yellow-300 shadow-lg scale-[1.03]';
//     } else if (rank === 2) {
//         rankColor = 'text-gray-500';
//         trophyColor = 'text-gray-500';
//         cardStyle = 'bg-gray-100 border-gray-300 shadow-md';
//     } else if (rank === 3) {
//         rankColor = 'text-orange-500';
//         trophyColor = 'text-orange-400';
//         cardStyle = 'bg-orange-50 border-orange-300 shadow-sm';
//     }
    
//     return (
//         <div 
//             className={`flex items-center p-4 mb-3 rounded-lg border-2 transition-all duration-300 ${cardStyle}`}
//         >
//             {/* Rank Number and Trophy */}
//             <div className={`text-3xl font-extrabold mr-4 w-10 flex-shrink-0 ${rankColor}`}>
//                 {rank}
//             </div>
//             <FaTrophy className={`text-2xl mr-4 ${trophyColor} flex-shrink-0`} />

//             {/* User Details */}
//             <div className="flex-grow">
//                 <p className="text-lg font-semibold text-gray-800 truncate">{username}</p>
//                 <p className="text-sm text-gray-500">User ID: {user.userId.substring(0, 8)}...</p>
//             </div>

//             {/* Score */}
//             <div className="flex-shrink-0 text-right">
//                 <p className="text-2xl font-bold text-green-600">{Math.floor(maxScore)}</p>
//                 <p className="text-xs text-gray-500">Best Score</p>
//             </div>
//         </div>
//     );
// };


// const Leaderboard = () => {
//     // Select state from Redux
//     const { leaderboard, leaderboardLoading, leaderboardError } = useSelector(
//         (state) => state.result
//     );

//     if (leaderboardLoading) {
//         return <div className="text-center p-6 text-blue-600">Loading Leaderboard...</div>;
//     }

//     if (leaderboardError) {
//         return (
//             <div className="text-center p-6 text-red-600 bg-red-100 rounded-lg">
//                 Error loading leaderboard: {leaderboardError}
//             </div>
//         );
//     }
    
//     if (leaderboard.length === 0) {
//         return (
//             <div className="text-center p-6 text-gray-500 bg-gray-100 rounded-lg">
//                 No test results available yet to form a leaderboard.
//             </div>
//         );
//     }

//     return (
//         <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-blue-600">
//             <h3 className="text-3xl font-extrabold text-center text-gray-800 mb-6 flex items-center justify-center">
//                 <FaTrophy className="text-yellow-500 mr-3 text-3xl"/> 
//                 Top Scorers Leaderboard
//             </h3>

//             {leaderboard.map((user, index) => (
//                 <RankCard key={user.userId} rank={index + 1} user={user} />
//             ))}
            
//             <p className="text-center text-sm text-gray-400 mt-4">
//                 Scores are based on the highest score achieved by each unique user.
//             </p>
//         </div>
//     );
// };

// export default Leaderboard;