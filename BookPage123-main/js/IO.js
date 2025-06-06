const diveLinker = new DiveLinker("dive");

window.onload = function() {
    // 啟動 DiveLinker
    diveLinker.start();

    // 定期抓取輸出列表
    setInterval(() => {
        const outputList = diveLinker.getOutputList();
        
        // 取得特定 ID 的值
        const value1 = getValueFromOutputList(outputList, 'f81af3ccb6f94d629e6f932665fb8891');
        const value2 = getValueFromOutputList(outputList, '86c6797233d4497ab21fd516a98e24a4');

        console.log(`ID f81af3ccb6f94d629e6f932665fb8891 的值為: ${value1}`);
        console.log(`ID 86c6797233d4497ab21fd516a98e24a4 的值為: ${value2}`);

        // 如果值等於1，標記該關卡為完成
        if (value1 == 1) {
            completeLevel(1, '15');  // 第一冊第 15 關完成
        }
        if (value2 == 1) {
            completeLevel(1, '23');  // 第一冊第 23 關完成
        }
    }, 1000);  // 每 1 秒抓取一次
};

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
