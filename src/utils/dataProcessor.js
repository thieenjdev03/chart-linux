// utils/dataProcessor.js
export const processMatchData = (matches) => {
    const result = {};
    matches.forEach(match => {
        const [score1, score2] = match.score.split(' - ').map(Number);

        if (!result[match.team1]) {
            result[match.team1] = { scores: [], total: 0 };
        }
        result[match.team1].scores.push(score1);
        result[match.team1].total += score1;

        if (!result[match.team2]) {
            result[match.team2] = { scores: [], total: 0 };
        }
        result[match.team2].scores.push(score2);
        result[match.team2].total += score2;
    });

    return result;
};
