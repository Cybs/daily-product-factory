/**
 * QuickFix - 即时问题解决方案 - 应用程序逻辑
 */

// 应用状态
const appState = {
    currentFeature: null,
    data: JSON.parse(localStorage.getItem('QuickFix_-_即时问题解决方案_data') || '{}'),
    save() {
        localStorage.setItem('QuickFix_-_即时问题解决方案_data', JSON.stringify(this.data));
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initFeatureCards();
    loadSavedData();
});

// 初始化功能卡片
defaults initFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const featureId = parseInt(card.dataset.feature);
            activateFeature(featureId);
        });
    });
}

// 加载保存的数据
function loadSavedData() {
    // 恢复之前的状态
    console.log('应用数据已加载');
}

// 显示主功能区域
function showMainFeature() {
    document.getElementById('mainFeature').scrollIntoView({ behavior: 'smooth' });
    // 默认激活第一个功能
    if (appState.currentFeature === null) {
        activateFeature(0);
    }
}

// 激活功能
function activateFeature(id) {
    appState.currentFeature = id;
    
    // 更新卡片状态
    document.querySelectorAll('.feature-card').forEach((card, idx) => {
        card.classList.toggle('active', idx === id);
    });
    
    // 渲染功能界面
    renderFeature(id);
}

// 渲染功能界面
function renderFeature(id) {
    const workspace = document.getElementById('workspace');
    
    switch(id) {
        case 0:
                workspace.innerHTML = `
            <div class="workspace-content">
                <h3>1. 问题诊断</h3>
                <p>此功能提供 1. 问题诊断 的核心能力。</p>
                <button class="btn-primary" onclick="feature0Action()">执行</button>
            </div>
        `;
                break;
            case 1:
                workspace.innerHTML = `
            <div class="workspace-content">
                <h3>2. 一键修复</h3>
                <p>此功能提供 2. 一键修复 的核心能力。</p>
                <button class="btn-primary" onclick="feature1Action()">执行</button>
            </div>
        `;
                break;
            case 2:
                workspace.innerHTML = `
            <div class="workspace-content">
                <h3>3. 步骤引导</h3>
                <p>此功能提供 3. 步骤引导 的核心能力。</p>
                <button class="btn-primary" onclick="feature2Action()">执行</button>
            </div>
        `;
                break;
            case 3:
                workspace.innerHTML = `
            <div class="workspace-content">
                <h3>4. 结果验证</h3>
                <p>此功能提供 4. 结果验证 的核心能力。</p>
                <button class="btn-primary" onclick="feature3Action()">执行</button>
            </div>
        `;
                break;
        default:
            workspace.innerHTML = '<div class="workspace-content"><p>功能开发中...</p></div>';
    }
}

// 1. 问题诊断
function feature0Action() {
    showNotification('1. 问题诊断 功能已激活');
}

// 2. 一键修复
function feature1Action() {
    showNotification('2. 一键修复 功能已激活');
}

// 3. 步骤引导
function feature2Action() {
    showNotification('3. 步骤引导 功能已激活');
}

// 4. 结果验证
function feature3Action() {
    showNotification('4. 结果验证 功能已激活');
}

// 工具函数
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#667eea'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);