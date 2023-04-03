// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CrowdFunding is Ownable {
    address public newOwner;

    function transferOwnership(address _newOwner) public onlyOwner override {
        require(_newOwner != address(0), "New owner cannot be zero address");
        newOwner = _newOwner;
    }

    function acceptOwnership() public {
        require(msg.sender == newOwner, "Only the new owner can accept ownership");
        emit OwnershipTransferred(owner(), newOwner);
        _transferOwnership(newOwner);
        newOwner = address(0);
    }

    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(address => uint256[]) public userDonations;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public onlyOwner returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = msg.sender;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        userDonations[msg.sender].push(_id);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function getUserDonatedCampaigns(address _user) public view returns (Campaign[] memory) {
        uint256[] memory campaignIds = userDonations[_user];
        Campaign[] memory userDonatedCampaigns = new Campaign[](campaignIds.length);

        for(uint i = 0; i < campaignIds.length; i++) {
            Campaign storage item = campaigns[campaignIds[i]];
            userDonatedCampaigns[i] = item;
        }

        return userDonatedCampaigns;
    }
}