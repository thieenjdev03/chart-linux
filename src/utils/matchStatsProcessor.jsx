// utils/matchStatsProcessor.js

export const calculateMatchStats = (matches) => {
    const stats = {};

    matches.forEach(match => {
        const [score1, score2] = match.score.split(' - ').map(Number);

        // Initialize teams if they don't exist
        if (!stats[match.team1]) {
            stats[match.team1] = { wins: 0, losses: 0, draws: 0 };
        }
        if (!stats[match.team2]) {
            stats[match.team2] = { wins: 0, losses: 0, draws: 0 };
        }

        if (score1 > score2) {
            stats[match.team1].wins += 1;
            stats[match.team2].losses += 1;
        } else if (score1 < score2) {
            stats[match.team1].losses += 1;
            stats[match.team2].wins += 1;
        } else {
            stats[match.team1].draws += 1;
            stats[match.team2].draws += 1;
        }
    });

    return stats;
};
