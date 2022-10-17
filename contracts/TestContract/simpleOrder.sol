// SPDX-License-Identifier: GPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

library Common {
    /// @dev struct 정의: "주문"
	struct Order {
		uint256 routeCount;  // 주문의 총 Route 개수
        uint256 code;  // 주문의 현재 운송코드
        bool flag;  // 주문 중복 체크 변수
	}
}

contract simpleOrder {
    address[] public customerEoa;
    address private _whitelist;

    mapping(bytes32 => Common.Order) private _orders;

    event OrderCreated(string orderId, address indexed shipper);
    event OrderUpdated(string orderId, uint256 code);

    constructor(address whitelist) {
        _whitelist = whitelist;
    }

    function toBytes32(string memory str) internal pure returns (bytes32 result) {
        bytes memory buf = bytes(str);
        if (buf.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(str, 32))
        }
    }
    
    function createOrder(string memory strOrderId, uint256 routeCount, uint256 code) public {
        bytes32 orderId = toBytes32(strOrderId);
        require(_orders[orderId].routeCount == 0 && _orders[orderId].flag == false, "order already created");
        _orders[orderId].routeCount = routeCount;
        _orders[orderId].flag = true;
        _orders[orderId].code = code;

        emit OrderCreated(strOrderId, msg.sender);
    }

    function updateOrder(string memory strOrderId, uint256 code) public {
        bytes32 orderId = toBytes32(strOrderId);
        require(_orders[orderId].flag == true, "order is not exists");
        _orders[orderId].routeCount = _orders[orderId].routeCount + 1;
        _orders[orderId].code = code;

        emit OrderUpdated(strOrderId, code);
    }

    function getOrderRouteCount(string memory strOrderId) public view returns(uint256 result) {
        bytes32 orderId = toBytes32(strOrderId);
        result = _orders[orderId].routeCount;
    }

    function getOrderCode(string memory strOrderId) public view returns(uint256 result) {
        bytes32 orderId = toBytes32(strOrderId);
        result = _orders[orderId].code;
    }

    function getOrders(string memory strOrderId) public view returns(Common.Order memory) {
        bytes32 orderId = toBytes32(strOrderId);
        return _orders[orderId];
    }
}