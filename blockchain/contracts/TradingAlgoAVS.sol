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
    }

    uint256 private nextStrategyId;
    mapping(uint256 => Strategy) public strategies;

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

    function createStrategy(
        string memory _strategyUid,
        uint256 _subscriptionFee,
        string memory _subscriptionPeriod,
        uint256 _roi,
        uint256 _profitability,
        uint256 _risk
    ) public {
        // ✅ Debug 1: 確認輸入參數
        console.log("Creating strategy with UID: %s", _strategyUid);
        console.log("Subscription Fee: %s", _subscriptionFee);
        console.log("Subscription Period: %s", _subscriptionPeriod);
        console.log("ROI: %s", _roi);
        console.log("Profitability: %s", _profitability);
        console.log("Risk: %s", _risk);
        console.log("Sender Address: %s", msg.sender);

        require(
            keccak256(abi.encodePacked(_subscriptionPeriod)) == keccak256(abi.encodePacked("day")) ||
            keccak256(abi.encodePacked(_subscriptionPeriod)) == keccak256(abi.encodePacked("week")) ||
            keccak256(abi.encodePacked(_subscriptionPeriod)) == keccak256(abi.encodePacked("month")),
            "Invalid subscription period"
        );

        // ✅ Debug 2: 進入策略存儲前
        console.log("Passed subscription period validation");

        strategies[nextStrategyId] = Strategy(
            nextStrategyId,
            msg.sender, // 存提供者的 address
            _subscriptionFee,
            _subscriptionPeriod,
            _strategyUid,
            _roi,
            _profitability,
            _risk,
            true
        );

        // ✅ Debug 3: 存儲策略後，準備發送事件
        console.log("Strategy stored with ID: %s", nextStrategyId);

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

        // ✅ Debug 4: 策略成功建立
        console.log("Strategy creation completed!");
        nextStrategyId++; // 更新策略 ID
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
}
