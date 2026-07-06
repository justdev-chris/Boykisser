// js/main.js – Core logic
document.addEventListener('DOMContentLoaded', () => {
    const kissCountEl = document.getElementById('kissCount');
    const catImage = document.getElementById('catImage');
    const clickArea = document.getElementById('clickArea');
    const kissBtn = document.getElementById('kissBtn');
    const resetBtn = document.getElementById('resetBtn');
    const upgradesToggle = document.getElementById('upgradesToggle');
    const upgradeList = document.getElementById('upgradeList');

    // ─── STATE ──────────────────────────────────────────────────────
    let state = {
        kisses: 0,
        kps: 0,
        multi: 1,
        blush: 0,
        kissCost: 20,
        multiCost: 30,
        blushCost: 50
    };

    // ─── DOM REFS ──────────────────────────────────────────────────
    const kpsDisplay = document.getElementById('kpsDisplay');
    const multiDisplay = document.getElementById('multiDisplay');
    const blushDisplay = document.getElementById('blushDisplay');
    const upgradeKps = document.getElementById('upgradeKps');
    const upgradeMulti = document.getElementById('upgradeMulti');
    const upgradeBlush = document.getElementById('upgradeBlush');

    // ─── UPDATE UI ─────────────────────────────────────────────────
    function updateUI() {
        kissCountEl.textContent = Math.floor(state.kisses);
        kpsDisplay.textContent = state.kps;
        multiDisplay.textContent = state.multi + 'x';
        blushDisplay.textContent = state.blush;
        upgradeKps.textContent = `+1 (${Math.floor(state.kissCost)})`;
        upgradeMulti.textContent = `+0.5x (${Math.floor(state.multiCost)})`;
        upgradeBlush.textContent = `+1 (${Math.floor(state.blushCost)})`;
        localStorage.setItem('boykisser_save', JSON.stringify(state));
    }

    // ─── SAVE / LOAD ──────────────────────────────────────────────
    function loadSave() {
        const raw = localStorage.getItem('boykisser_save');
        if (raw) {
            try {
                const saved = JSON.parse(raw);
                Object.assign(state, saved);
            } catch (e) { /* ignore */ }
        }
        updateUI();
    }

    // ─── KISS ──────────────────────────────────────────────────────
    function giveKiss() {
        const gain = 1 * state.multi + state.blush * 0.2;
        state.kisses += gain;
        updateUI();
        if (typeof playRandomMedia === 'function') playRandomMedia();
        catImage.style.transform = 'scale(0.9)';
        setTimeout(() => catImage.style.transform = 'scale(1)', 150);
        // Achievement check
        if (typeof checkAchievements === 'function') checkAchievements(state.kisses);
    }

    // ─── UPGRADES ──────────────────────────────────────────────────
    function buyKps() {
        if (state.kisses < state.kissCost) return;
        state.kisses -= state.kissCost;
        state.kps += 1;
        state.kissCost = Math.floor(state.kissCost * 1.8);
        updateUI();
    }

    function buyMulti() {
        if (state.kisses < state.multiCost) return;
        state.kisses -= state.multiCost;
        state.multi += 0.5;
        state.multiCost = Math.floor(state.multiCost * 2.2);
        updateUI();
    }

    function buyBlush() {
        if (state.kisses < state.blushCost) return;
        state.kisses -= state.blushCost;
        state.blush += 1;
        state.blushCost = Math.floor(state.blushCost * 2.5);
        updateUI();
    }

    function resetGame() {
        if (confirm('Reset all your kisses?')) {
            state.kisses = 0;
            state.kps = 0;
            state.multi = 1;
            state.blush = 0;
            state.kissCost = 20;
            state.multiCost = 30;
            state.blushCost = 50;
            updateUI();
        }
    }

    // ─── PASSIVE KISSES ───────────────────────────────────────────
    setInterval(() => {
        if (state.kps > 0) {
            state.kisses += state.kps;
            updateUI();
        }
    }, 1000);

    // ─── EVENT BINDING ────────────────────────────────────────────
    clickArea.addEventListener('click', giveKiss);
    kissBtn.addEventListener('click', giveKiss);
    upgradeKps.addEventListener('click', buyKps);
    upgradeMulti.addEventListener('click', buyMulti);
    upgradeBlush.addEventListener('click', buyBlush);
    resetBtn.addEventListener('click', resetGame);

    upgradesToggle.addEventListener('click', () => {
        const isVisible = upgradeList.style.display === 'block';
        upgradeList.style.display = isVisible ? 'none' : 'block';
        upgradesToggle.textContent = isVisible ? '⬆ Upgrades' : '⬇ Upgrades';
    });

    // ─── START ─────────────────────────────────────────────────────
    loadSave();
    updateUI();
});
