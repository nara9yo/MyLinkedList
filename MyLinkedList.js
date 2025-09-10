/**
 * LinkedList의 노드 클래스
 * - data: 노드에 저장될 데이터
 * - next: 다음 노드를 가리키는 포인터
 */
class Node {
    constructor(data) {
        this.data = data;  // 노드 데이터 저장
        this.next = null;  // 다음 노드 포인터 초기화
    }
}

/**
 * 제네릭 MyLinkedList 클래스
 * - Iterator 인터페이스 구현으로 for-each 순회 지원
 * - 동적 크기 조정 가능
 * - 제네릭 타입 지원
 */
class MyLinkedList {
    constructor() {
        this.head = null;  // 첫 번째 노드 포인터
        this.size = 0;     // 리스트 크기
    }

    /**
     * 마지막 노드에 데이터 추가
     * @param {T} data - 추가할 데이터
     * 
     * 알고리즘:
     * 1. 새 노드 생성
     * 2. 리스트가 비어있으면 head에 연결
     * 3. 비어있지 않으면 마지막 노드까지 순회
     * 4. 마지막 노드의 next에 새 노드 연결
     * 5. 크기 증가
     */
    add(data) {
        const newNode = new Node(data);  // 새 노드 생성
        
        if (this.head === null) {
            // 리스트가 비어있는 경우
            this.head = newNode;
        } else {
            // 마지막 노드까지 순회
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;  // 마지막 노드에 새 노드 연결
        }
        this.size++;  // 크기 증가
    }

    /**
     * i번째 노드의 데이터 반환
     * @param {number} index - 인덱스 (0부터 시작)
     * @returns {T} 해당 인덱스의 데이터
     * 
     * 알고리즘:
     * 1. 인덱스 유효성 검사
     * 2. head부터 시작하여 index만큼 순회
     * 3. 해당 노드의 데이터 반환
     */
    get(index) {
        // 인덱스 범위 검사
        if (index < 0 || index >= this.size) {
            throw new Error('인덱스가 범위를 벗어났습니다');
        }
        
        // 해당 인덱스까지 순회
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.data;  // 데이터 반환
    }

    /**
     * i번째 노드 삭제
     * @param {number} index - 삭제할 인덱스
     * @returns {T} 삭제된 데이터
     * 
     * 알고리즘:
     * 1. 인덱스 유효성 검사
     * 2. 첫 번째 노드인 경우: head를 다음 노드로 변경
     * 3. 중간/마지막 노드인 경우: 이전 노드의 next를 다음 노드로 연결
     * 4. 크기 감소 후 삭제된 데이터 반환
     */
    delete(index) {
        // 인덱스 범위 검사
        if (index < 0 || index >= this.size) {
            throw new Error('인덱스가 범위를 벗어났습니다');
        }

        let deletedData;
        
        if (index === 0) {
            // 첫 번째 노드 삭제
            deletedData = this.head.data;
            this.head = this.head.next;  // head를 다음 노드로 변경
        } else {
            // 중간 또는 마지막 노드 삭제
            let current = this.head;
            // 삭제할 노드의 이전 노드까지 순회
            for (let i = 0; i < index - 1; i++) {
                current = current.next;
            }
            deletedData = current.next.data;
            current.next = current.next.next;  // 이전 노드를 다음 노드에 연결
        }
        
        this.size--;  // 크기 감소
        return deletedData;  // 삭제된 데이터 반환
    }

    /**
     * 리스트 크기 반환
     * @returns {number} 리스트 크기
     */
    getSize() {
        return this.size;  // 현재 리스트 크기 반환
    }

    /**
     * 리스트가 비어있는지 확인
     * @returns {boolean} 비어있으면 true
     */
    isEmpty() {
        return this.size === 0;  // 크기가 0이면 비어있음
    }

    /**
     * Iterator 인터페이스 구현
     * - for-each 순회를 위해 Symbol.iterator 메서드 제공
     * - ES6 Iterator 프로토콜 준수
     * 
     * 사용법: for (const data of myLinkedList) { ... }
     */
    [Symbol.iterator]() {
        let current = this.head;  // 현재 노드 포인터
        
        return {
            next() {
                if (current === null) {
                    return { done: true };  // 순회 완료
                }
                
                const value = current.data;  // 현재 데이터 저장
                current = current.next;      // 다음 노드로 이동
                return { value, done: false };  // 데이터와 계속 진행 플래그 반환
            }
        };
    }

    /**
     * 리스트를 배열로 변환 (디버깅용)
     * @returns {Array} 리스트의 모든 데이터를 담은 배열
     * 
     * 용도:
     * - 디버깅 및 로깅
     * - 시각화 데이터 제공
     */
    toArray() {
        const result = [];
        for (const data of this) {  // Iterator 사용
            result.push(data);
        }
        return result;
    }

    /**
     * 리스트 내용을 문자열로 변환 (디버깅용)
     * @returns {string} 리스트의 문자열 표현
     * 
     * 형식: [data1 -> data2 -> data3]
     */
    toString() {
        return `[${this.toArray().join(' -> ')}]`;
    }
}

/**
 * Queue 클래스 (MyLinkedList 기반)
 * - FIFO (First In, First Out) 구조
 * - MyLinkedList를 내부적으로 사용하여 구현
 * - enqueue: 뒤쪽에 추가, dequeue: 앞쪽에서 제거
 */
class Queue {
    constructor() {
        this.list = new MyLinkedList();  // 내부 LinkedList 인스턴스
    }

    /**
     * 큐의 뒤쪽에 데이터 추가 (enqueue)
     * @param {T} data - 추가할 데이터
     * 
     * 동작:
     * - LinkedList의 add() 메서드 사용
     * - O(1) 시간복잡도 (마지막에 추가)
     */
    enqueue(data) {
        this.list.add(data);  // LinkedList에 데이터 추가
    }

    /**
     * 큐의 앞쪽에서 데이터 제거 및 반환 (dequeue)
     * @returns {T} 제거된 데이터
     * 
     * 동작:
     * - 첫 번째 요소(index 0) 삭제
     * - 큐가 비어있으면 예외 발생
     */
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('큐가 비어있습니다');
        }
        return this.list.delete(0);  // 첫 번째 요소 삭제
    }

    /**
     * 큐의 앞쪽 데이터 확인 (제거하지 않음)
     * @returns {T} 앞쪽 데이터
     * 
     * 용도:
     * - 다음에 제거될 데이터 미리보기
     * - 큐가 비어있으면 예외 발생
     */
    front() {
        if (this.isEmpty()) {
            throw new Error('큐가 비어있습니다');
        }
        return this.list.get(0);  // 첫 번째 요소 반환
    }

    /**
     * 큐가 비어있는지 확인
     * @returns {boolean} 비어있으면 true
     */
    isEmpty() {
        return this.list.isEmpty();  // LinkedList의 isEmpty() 사용
    }

    /**
     * 큐의 크기 반환
     * @returns {number} 큐의 크기
     */
    size() {
        return this.list.getSize();  // LinkedList의 getSize() 사용
    }

    /**
     * 큐를 배열로 변환
     * @returns {Array} 큐의 모든 데이터를 담은 배열
     * 
     * 용도:
     * - 시각화 데이터 제공
     * - 디버깅 및 로깅
     */
    toArray() {
        return this.list.toArray();  // LinkedList의 toArray() 사용
    }
}

/**
 * Stack 클래스 (MyLinkedList 기반)
 * - LIFO (Last In, First Out) 구조
 * - MyLinkedList를 내부적으로 사용하여 구현
 * - push: 맨 위에 추가, pop: 맨 위에서 제거
 */
class Stack {
    constructor() {
        this.list = new MyLinkedList();  // 내부 LinkedList 인스턴스
    }

    /**
     * 스택의 맨 위에 데이터 추가 (push)
     * @param {T} data - 추가할 데이터
     * 
     * 동작:
     * - LinkedList의 add() 메서드 사용
     * - O(1) 시간복잡도 (마지막에 추가)
     */
    push(data) {
        this.list.add(data);  // LinkedList에 데이터 추가
    }

    /**
     * 스택의 맨 위에서 데이터 제거 및 반환 (pop)
     * @returns {T} 제거된 데이터
     * 
     * 동작:
     * - 마지막 요소(크기-1 인덱스) 삭제
     * - 스택이 비어있으면 예외 발생
     */
    pop() {
        if (this.isEmpty()) {
            throw new Error('스택이 비어있습니다');
        }
        return this.list.delete(this.list.getSize() - 1);  // 마지막 요소 삭제
    }

    /**
     * 스택의 맨 위 데이터 확인 (제거하지 않음)
     * @returns {T} 맨 위 데이터
     * 
     * 용도:
     * - 다음에 제거될 데이터 미리보기
     * - 스택이 비어있으면 예외 발생
     */
    top() {
        if (this.isEmpty()) {
            throw new Error('스택이 비어있습니다');
        }
        return this.list.get(this.list.getSize() - 1);  // 마지막 요소 반환
    }

    /**
     * 스택이 비어있는지 확인
     * @returns {boolean} 비어있으면 true
     */
    isEmpty() {
        return this.list.isEmpty();  // LinkedList의 isEmpty() 사용
    }

    /**
     * 스택의 크기 반환
     * @returns {number} 스택의 크기
     */
    size() {
        return this.list.getSize();  // LinkedList의 getSize() 사용
    }

    /**
     * 스택을 배열로 변환
     * @returns {Array} 스택의 모든 데이터를 담은 배열
     * 
     * 용도:
     * - 시각화 데이터 제공
     * - 디버깅 및 로깅
     */
    toArray() {
        return this.list.toArray();  // LinkedList의 toArray() 사용
    }
}

// 모듈 내보내기 (Node.js 환경에서 사용할 경우)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MyLinkedList, Queue, Stack, Node };
}
