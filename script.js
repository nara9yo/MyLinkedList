// ========================================
// 전역 변수 선언
// ========================================
let myLinkedList;  // LinkedList 인스턴스
let queue;         // Queue 인스턴스
let stack;         // Stack 인스턴스

// DOM 요소 참조 변수들
let linkedListVisual;  // LinkedList 시각화 영역
let queueVisual;       // Queue 시각화 영역
let stackVisual;       // Stack 시각화 영역
let linkedListSize;    // LinkedList 크기 표시
let linkedListArray;   // LinkedList 배열 표시
let queueSize;         // Queue 크기 표시
let queueArray;        // Queue 배열 표시
let stackSize;         // Stack 크기 표시
let stackArray;        // Stack 배열 표시
let logOutput;         // 로그 출력 영역
let iteratorOutput;    // Iterator 데모 출력 영역

// ========================================
// 앱 초기화 함수
// ========================================
/**
 * 애플리케이션 초기화
 * - 클래스 인스턴스 생성
 * - DOM 요소 참조 설정
 * - 초기 시각화 업데이트
 * - 환영 메시지 출력
 */
function initializeApp() {
    // 1. 클래스 인스턴스 생성
    myLinkedList = new MyLinkedList();
    queue = new Queue();
    stack = new Stack();
    
    // 2. DOM 요소들 초기화
    linkedListVisual = document.getElementById('linkedListVisual');
    queueVisual = document.getElementById('queueVisual');
    stackVisual = document.getElementById('stackVisual');
    linkedListSize = document.getElementById('linkedListSize');
    linkedListArray = document.getElementById('linkedListArray');
    queueSize = document.getElementById('queueSize');
    queueArray = document.getElementById('queueArray');
    stackSize = document.getElementById('stackSize');
    stackArray = document.getElementById('stackArray');
    logOutput = document.getElementById('logOutput');
    iteratorOutput = document.getElementById('iteratorOutput');
    
    // 3. 초기 시각화 업데이트
    updateLinkedListVisual();
    updateQueueVisual();
    updateStackVisual();
    
    // 4. 환영 메시지 출력
    log('MyLinkedList 시각화 도구가 시작되었습니다.');
    log('LinkedList, Queue, Stack을 자유롭게 조작해보세요!');
}

// ========================================
// 유틸리티 함수
// ========================================
/**
 * 로그 메시지 출력
 * @param {string} message - 출력할 메시지
 * 
 * 동작:
 * - 타임스탬프와 함께 로그 출력
 * - 자동 스크롤로 최신 메시지 표시
 * - logOutput이 없으면 콘솔에 출력
 */
function log(message) {
    if (!logOutput) {
        console.log(message);  // DOM 요소가 없으면 콘솔 출력
        return;
    }
    const timestamp = new Date().toLocaleTimeString();  // 현재 시간
    logOutput.innerHTML += `[${timestamp}] ${message}<br>`;  // 로그 추가
    logOutput.scrollTop = logOutput.scrollHeight;  // 자동 스크롤
}

// ========================================
// LinkedList 조작 함수들
// ========================================
/**
 * LinkedList에 데이터 추가
 * 
 * 동작:
 * 1. 초기화 상태 확인
 * 2. 입력값 유효성 검사
 * 3. LinkedList에 데이터 추가
 * 4. 입력 필드 초기화
 * 5. 시각화 업데이트
 * 6. 로그 출력
 */
function addToLinkedList() {
    // 1. 초기화 상태 확인
    if (!myLinkedList) {
        alert('앱이 아직 초기화되지 않았습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    // 2. 입력값 가져오기
    const input = document.getElementById('linkedListInput');
    const data = input.value.trim();
    
    // 3. 입력값 유효성 검사
    if (data === '') {
        alert('데이터를 입력해주세요.');
        return;
    }
    
    try {
        // 4. LinkedList에 데이터 추가
        myLinkedList.add(data);
        input.value = '';  // 입력 필드 초기화
        updateLinkedListVisual();  // 시각화 업데이트
        log(`LinkedList에 "${data}" 추가됨`);  // 로그 출력
    } catch (error) {
        alert('오류: ' + error.message);
        log(`오류: ${error.message}`);
    }
}

function getFromLinkedList() {
    if (!myLinkedList) {
        alert('앱이 아직 초기화되지 않았습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    const input = document.getElementById('linkedListIndex');
    const index = parseInt(input.value);
    
    if (isNaN(index)) {
        alert('유효한 인덱스를 입력해주세요.');
        return;
    }
    
    try {
        const data = myLinkedList.get(index);
        alert(`인덱스 ${index}의 데이터: ${data}`);
        log(`LinkedList[${index}] = "${data}"`);
    } catch (error) {
        alert('오류: ' + error.message);
        log(`오류: ${error.message}`);
    }
}

function deleteFromLinkedList() {
    if (!myLinkedList) {
        alert('앱이 아직 초기화되지 않았습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    const input = document.getElementById('linkedListIndex');
    const index = parseInt(input.value);
    
    if (isNaN(index)) {
        alert('유효한 인덱스를 입력해주세요.');
        return;
    }
    
    try {
        const data = myLinkedList.delete(index);
        input.value = '';
        updateLinkedListVisual();
        log(`LinkedList[${index}]에서 "${data}" 삭제됨`);
    } catch (error) {
        alert('오류: ' + error.message);
        log(`오류: ${error.message}`);
    }
}

// Queue 관련 함수들
function enqueue() {
    if (!queue) {
        alert('앱이 아직 초기화되지 않았습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    const input = document.getElementById('queueInput');
    const data = input.value.trim();
    
    if (data === '') {
        alert('데이터를 입력해주세요.');
        return;
    }
    
    try {
        queue.enqueue(data);
        input.value = '';
        updateQueueVisual();
        log(`Queue에 "${data}" enqueue됨`);
    } catch (error) {
        alert('오류: ' + error.message);
        log(`오류: ${error.message}`);
    }
}

function dequeue() {
    if (!queue) {
        alert('앱이 아직 초기화되지 않았습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    try {
        const data = queue.dequeue();
        updateQueueVisual();
        log(`Queue에서 "${data}" dequeue됨`);
    } catch (error) {
        alert('오류: ' + error.message);
        log(`오류: ${error.message}`);
    }
}

function front() {
    if (!queue) {
        alert('앱이 아직 초기화되지 않았습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    try {
        const data = queue.front();
        alert(`Queue의 front: ${data}`);
        log(`Queue의 front: "${data}"`);
    } catch (error) {
        alert('오류: ' + error.message);
        log(`오류: ${error.message}`);
    }
}

// Stack 관련 함수들
function push() {
    if (!stack) {
        alert('앱이 아직 초기화되지 않았습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    const input = document.getElementById('stackInput');
    const data = input.value.trim();
    
    if (data === '') {
        alert('데이터를 입력해주세요.');
        return;
    }
    
    try {
        stack.push(data);
        input.value = '';
        updateStackVisual();
        log(`Stack에 "${data}" push됨`);
    } catch (error) {
        alert('오류: ' + error.message);
        log(`오류: ${error.message}`);
    }
}

function pop() {
    if (!stack) {
        alert('앱이 아직 초기화되지 않았습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    try {
        const data = stack.pop();
        updateStackVisual();
        log(`Stack에서 "${data}" pop됨`);
    } catch (error) {
        alert('오류: ' + error.message);
        log(`오류: ${error.message}`);
    }
}

function getStackTop() {
    if (!stack) {
        alert('앱이 아직 초기화되지 않았습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    try {
        const data = stack.top();
        alert(`Stack의 top: ${data}`);
        log(`Stack의 top: "${data}"`);
    } catch (error) {
        alert('오류: ' + error.message);
        log(`오류: ${error.message}`);
    }
}

// ========================================
// 시각화 업데이트 함수들
// ========================================
/**
 * LinkedList 시각화 업데이트
 * 
 * 동작:
 * 1. DOM 요소 존재 확인
 * 2. 빈 리스트인 경우 빈 메시지 표시
 * 3. 노드들을 순회하며 HTML 생성
 * 4. 크기와 배열 정보 업데이트
 */
function updateLinkedListVisual() {
    // 1. DOM 요소 존재 확인
    if (!myLinkedList || !linkedListVisual || !linkedListSize || !linkedListArray) {
        return;
    }
    
    if (myLinkedList.isEmpty()) {
        // 2. 빈 리스트인 경우
        linkedListVisual.innerHTML = '<div class="empty-message">리스트가 비어있습니다</div>';
    } else {
        // 3. 노드들을 순회하며 HTML 생성
        let html = '';
        let current = myLinkedList.head;
        let index = 0;
        
        while (current !== null) {
            html += `
                <div class="node">
                    <div class="data">${current.data}</div>
                    <div class="next">next</div>
                    ${current.next !== null ? '<div class="arrow">→</div>' : ''}
                </div>
            `;
            current = current.next;
            index++;
        }
        
        linkedListVisual.innerHTML = html;
    }
    
    // 4. 크기와 배열 정보 업데이트
    linkedListSize.textContent = myLinkedList.getSize();
    linkedListArray.textContent = JSON.stringify(myLinkedList.toArray());
}

function updateQueueVisual() {
    if (!queue || !queueVisual || !queueSize || !queueArray) {
        return;
    }
    
    if (queue.isEmpty()) {
        queueVisual.innerHTML = '<div class="empty-message">큐가 비어있습니다</div>';
    } else {
        const array = queue.toArray();
        let html = '';
        
        // Queue의 특성상 rear가 왼쪽, front가 오른쪽에 와야 하므로 역순으로 표시
        for (let i = array.length - 1; i >= 0; i--) {
            const item = array[i];
            const isFront = (i === 0);  // 원래 배열의 첫 번째 요소가 front
            const isRear = (i === array.length - 1);  // 원래 배열의 마지막 요소가 rear
            html += `<div class="item ${isFront ? 'front-item' : ''} ${isRear ? 'rear-item' : ''}">${item}</div>`;
        }
        
        queueVisual.innerHTML = html;
    }
    
    queueSize.textContent = queue.size();
    queueArray.textContent = JSON.stringify(queue.toArray());
}

function updateStackVisual() {
    if (!stack || !stackVisual || !stackSize || !stackArray) {
        return;
    }
    
    if (stack.isEmpty()) {
        stackVisual.innerHTML = '<div class="empty-message">스택이 비어있습니다</div>';
    } else {
        const array = stack.toArray();
        let html = '';
        
        // Stack의 특성상 top이 맨 위에 와야 하므로 역순으로 표시
        for (let i = array.length - 1; i >= 0; i--) {
            const item = array[i];
            const isTop = (i === array.length - 1);
            html += `<div class="item ${isTop ? 'top-item' : ''}">${item}</div>`;
        }
        
        stackVisual.innerHTML = html;
    }
    
    stackSize.textContent = stack.size();
    stackArray.textContent = JSON.stringify(stack.toArray());
}

// Iterator 데모 함수
function runIteratorDemo() {
    if (!myLinkedList || !iteratorOutput) {
        alert('앱이 아직 초기화되지 않았습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    if (myLinkedList.isEmpty()) {
        iteratorOutput.innerHTML = 'LinkedList가 비어있습니다. 먼저 데이터를 추가해주세요.';
        return;
    }
    
    let result = 'Iterator 데모 결과:\n';
    let index = 0;
    
    for (const data of myLinkedList) {
        result += `[${index}] ${data}\n`;
        index++;
    }
    
    iteratorOutput.innerHTML = result.replace(/\n/g, '<br>');
    log('Iterator 데모 실행됨');
}

// 로그 지우기 함수
function clearLog() {
    if (logOutput) {
        logOutput.innerHTML = '';
    }
}

// 엔터키 이벤트 리스너
document.addEventListener('DOMContentLoaded', function() {
    // 앱 초기화
    initializeApp();
    
    // ========================================
    // 키보드 이벤트 리스너 설정
    // ========================================
    /**
     * 엔터키 이벤트 리스너 통합 설정
     * - 각 입력 필드별로 적절한 함수 실행
     * - Shift + Enter: 삭제, Enter: 조회/추가
     */
    const inputConfigs = [
        { id: 'linkedListInput', action: addToLinkedList },
        { id: 'queueInput', action: enqueue },
        { id: 'stackInput', action: push },
        { 
            id: 'linkedListIndex', 
            action: (e) => e.shiftKey ? deleteFromLinkedList() : getFromLinkedList()
        }
    ];
    
    // 각 입력 필드에 이벤트 리스너 등록
    inputConfigs.forEach(config => {
        const element = document.getElementById(config.id);
        if (element) {
            element.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    config.action(e);
                }
            });
        }
    });
});

// 데모 데이터 추가 함수 (개발용)
function addDemoData() {
    if (!myLinkedList || !queue || !stack) {
        alert('앱이 아직 초기화되지 않았습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    // LinkedList 데모 데이터
    myLinkedList.add('A');
    myLinkedList.add('B');
    myLinkedList.add('C');
    updateLinkedListVisual();
    
    // Queue 데모 데이터
    queue.enqueue('1');
    queue.enqueue('2');
    queue.enqueue('3');
    updateQueueVisual();
    
    // Stack 데모 데이터
    stack.push('X');
    stack.push('Y');
    stack.push('Z');
    updateStackVisual();
    
    log('데모 데이터가 추가되었습니다.');
}

// 키보드 단축키
document.addEventListener('keydown', function(e) {
    // Ctrl + D: 데모 데이터 추가
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        addDemoData();
    }
    
    // Ctrl + L: 로그 지우기
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        clearLog();
    }
});
