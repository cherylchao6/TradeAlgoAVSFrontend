// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "hardhat/console.sol";

contract TradingAlgoAVS {
    struct Strategy {
        uint256 id;
        address provider; // 策略提供者的錢包地址
        uint256 subscriptionFee; // 訂閱費用
        string subscriptionPeriod; // "day", "week", "month"
        string strategyUid; // 後端給的唯一策略 ID
        uint256 roi; // 投資回報率
        uint256 profitability; // 獲利能力
        uint256 risk; // 風險數值
        bool active; // 是否啟用
        uint256 subscriberCount; // 訂閱人數
    }

    uint256 private nextStrategyId;
    mapping(uint256 => Strategy) public strategies;
    mapping(uint256 => mapping(address => bool)) public subscriptions; // 記錄誰訂閱了哪個策略

    event StrategyCreated(
        uint256 indexed strategyId,
        address indexed provider,
        uint256 subscriptionFee,
        string subscriptionPeriod,
        string strategyUid,
        uint256 roi,
        uint256 profitability,
        uint256 risk
    );

    event SubscribedToStrategy(
        uint256 indexed strategyId,
        address indexed subscriber
    );

    function createStrategy(
        string memory _strategyUid,
        uint256 _subscriptionFee,
        string memory _subscriptionPeriod,
        uint256 _roi,
        uint256 _profitability,
        uint256 _risk
    ) public {
        require(
            keccak256(abi.encodePacked(_subscriptionPeriod)) == keccak256(abi.encodePacked("day")) ||
            keccak256(abi.encodePacked(_subscriptionPeriod)) == keccak256(abi.encodePacked("week")) ||
            keccak256(abi.encodePacked(_subscriptionPeriod)) == keccak256(abi.encodePacked("month")),
            "Invalid subscription period"
        );

        strategies[nextStrategyId] = Strategy(
            nextStrategyId,
            msg.sender, // 存提供者的 address
            _subscriptionFee,
            _subscriptionPeriod,
            _strategyUid,
            _roi,
            _profitability,
            _risk,
            true,
            0 // 訂閱人數從 0 開始
        );

        emit StrategyCreated(
            nextStrategyId,
            msg.sender,
            _subscriptionFee,
            _subscriptionPeriod,
            _strategyUid,
            _roi,
            _profitability,
            _risk
        );

        console.log("Strategy creation completed!");
        nextStrategyId++; // 更新策略 ID
    }

    function subscribeToStrategy(uint256 _id) public {
        require(strategies[_id].active, "Strategy is not active");
        require(!subscriptions[_id][msg.sender], "Already subscribed");

        subscriptions[_id][msg.sender] = true;
        strategies[_id].subscriberCount++; // 增加訂閱人數

        emit SubscribedToStrategy(_id, msg.sender);
    }

    function getStrategy(uint256 _id) public view returns (Strategy memory) {
        return strategies[_id];
    }

    function getAllStrategies() public view returns (Strategy[] memory) {
        Strategy[] memory allStrategies = new Strategy[](nextStrategyId);
        for (uint256 i = 0; i < nextStrategyId; i++) {
            allStrategies[i] = strategies[i];
        }
        return allStrategies;
    }

    function getMyStrategies() public view returns (Strategy[] memory) {
        uint256 count = 0;
        // **Count strategies created by msg.sender**
        for (uint256 i = 0; i < nextStrategyId; i++) {
            if (strategies[i].provider == msg.sender) {
                count++;
            }
        }

        // **Create an array with the correct size**
        Strategy[] memory myStrategies = new Strategy[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextStrategyId; i++) {
            if (strategies[i].provider == msg.sender) {
                myStrategies[index] = strategies[i];
                index++;
            }
        }
        return myStrategies;
    }
}
