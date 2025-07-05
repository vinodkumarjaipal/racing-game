export function generateTrack() {
    const segments = [];
    for (let i = 0; i < 100; i++) {
        segments.push({
            curve: Math.random() * 0.2,
            hasObstacle: Math.random() > 0.7
        });
    }
    return segments;
}