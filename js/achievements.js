// js/achievements.js – Simple achievement tracking
let achievementsUnlocked = [];

function checkAchievements(kisses) {
    const checks = [
        { id: 'first_kiss', name: 'First Kiss', condition: kisses >= 1 },
        { id: 'kiss_100', name: '100 Kisses', condition: kisses >= 100 },
        { id: 'kiss_1000', name: '1000 Kisses', condition: kisses >= 1000 },
        { id: 'kiss_10000', name: '10,000 Kisses', condition: kisses >= 10000 }
    ];

    for (const chk of checks) {
        if (chk.condition && !achievementsUnlocked.includes(chk.id)) {
            achievementsUnlocked.push(chk.id);
            console.log(`🏆 Achievement: ${chk.name}`);
            // Show a simple alert or DOM popup
            const popup = document.createElement('div');
            popup.textContent = `🏆 ${chk.name}`;
            popup.style.cssText = `
                position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
                background: #2d1b2d; color: #ffb3d9; padding: 12px 24px;
                border-radius: 30px; border: 1px solid #6a3a5a;
                font-weight: bold; z-index: 999; box-shadow: 0 0 20px rgba(255,100,200,0.3);
                animation: popIn 0.3s ease-out;
            `;
            document.body.appendChild(popup);
            setTimeout(() => popup.remove(), 3000);
        }
    }
}

// Inject pop animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes popIn {
        0% { opacity: 0; transform: translateX(-50%) scale(0.8); }
        100% { opacity: 1; transform: translateX(-50%) scale(1); }
    }
`;
document.head.appendChild(style);
