const diveLinker = new DiveLinker("dive");

function initDiveLinker(projectId) {
    diveLinker.setProject(projectId);
    diveLinker.start();

    console.log("DIVE Linker Initialized");
    
    // 等待 DIVE 初始化後開始抓取數值
    setTimeout(() => {
        // 設置一個定時器來定期抓取數值
        const fetchDataInterval = setInterval(() => {
            const outputList = diveLinker.getOutputList();

            // 抓取 ID 為 f81af3ccb6f94d629e6f932665fb8891 和 86c6797233d4497ab21fd516a98e24a4 的值
            const value1 = getValueFromOutputList(outputList, 'f81af3ccb6f94d629e6f932665fb8891');
            const value2 = getValueFromOutputList(outputList, '86c6797233d4497ab21fd516a98e24a4');

            console.log(`ID f81af3ccb6f94d629e6f932665fb8891 的值為: ${value1}`);
            console.log(`ID 86c6797233d4497ab21fd516a98e24a4 的值為: ${value2}`);

            // 如果希望抓到特定值後停止抓取，可以在這裡添加條件
            if (value1 === 1 || value2 === 1) {
                clearInterval(fetchDataInterval); // 停止抓取
            }

        }, 1000); // 每秒抓取一次
    }, 3000); // 延遲 3 秒後開始抓取數值
}

// 輔助函數：根據 ID 從輸出列表中找到對應的值
function getValueFromOutputList(outputList, targetId) {
    if (outputList && Array.isArray(outputList)) {
        for (let output of outputList) {
            if (output.id === targetId) {
                return output.value;  // 返回對應 ID 的值
            }
        }
    }
    return null;  // 如果沒找到，返回 null
}

// 點擊事件的處理
function setupDiveLinkEvent(linkElement, projectId) {
    linkElement.addEventListener('click', function (e) {
        e.stopPropagation(); // 防止事件冒泡
        console.log('DIVE link clicked for page', linkElement.dataset.page);  // 假設有 data-page 屬性
        
        try {
            const diveFrame = document.getElementById('dive-frame');
            if (diveFrame) {
                document.getElementById('dive-container').style.display = 'flex';
                diveFrame.classList.remove('hidden');
                initDiveLinker(projectId); // 初始化 DIVE
            } else {
                console.error("無法找到 dive-frame 元素");
            }
        } catch (error) {
            console.error("DIVE 無法初始化:", error);
        }
    });
}
