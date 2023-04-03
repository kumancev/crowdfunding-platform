// import { ethers } from "hardhat";
// import { expect } from "chai";
// import { CrowdFunding } from "../typechain-types";

// describe("CrowdFunding", () => {
//   let crowdFunding: CrowdFunding;

//   beforeEach(async () => {
//     const CrowdFundingFactory = await ethers.getContractFactory("CrowdFunding");
//     crowdFunding = (await CrowdFundingFactory.deploy()) as CrowdFunding;
//     await crowdFunding.deployed();
//   });

//   it("should create a campaign successfully", async () => {
//     const title = "Test Campaign";
//     const description = "Test Description";
//     const target = 100;
//     const deadline = Math.floor(Date.now() / 1000) + 86400; // Set deadline to tomorrow
//     const image = "Test Image";

//     const createCampaignTx = await crowdFunding.createCampaign(
//       title,
//       description,
//       target,
//       deadline,
//       image
//     );
//     await createCampaignTx.wait();
//     const [signer] = await ethers.getSigners();

//     const campaign = await crowdFunding.campaigns(0);
//     expect(campaign.owner).to.equal(signer);
//     expect(campaign.title).to.equal(title);
//     expect(campaign.description).to.equal(description);
//     expect(campaign.target).to.equal(target);
//     expect(campaign.deadline).to.equal(deadline);
//     expect(campaign.amountCollected).to.equal(0);
//     expect(campaign.image).to.equal(image);
//   });

//   it("should not create a campaign with invalid deadline", async () => {
//     const title = "Test Campaign";
//     const description = "Test Description";
//     const target = 100;
//     const deadline = Math.floor(Date.now() / 1000) - 86400; // Set deadline to yesterday
//     const image = "Test Image";

//     await expect(
//       crowdFunding.createCampaign(title, description, target, deadline, image)
//     ).to.be.revertedWith("The deadline should be a date in the future.");
//   });

  // it('should donate to a campaign successfully', async () => {
  //   const title = 'Test Campaign';
  //   const description = 'Test Description';
  //   const target = 100;
  //   const deadline = Math.floor(Date.now() / 1000) + 86400; // Set deadline to tomorrow
  //   const image = 'Test Image';

  //   const createCampaignTx = await crowdFunding.createCampaign(title, description, target, deadline, image);
  //   await createCampaignTx.wait();

  //   const donateToCampaignTx = await crowdFunding.donateToCampaign(0, {
  //     value: 50,
  //   });
  //   await donateToCampaignTx.wait();

  //   const campaign = await crowdFunding.campaigns(0);
  //   expect(campaign.amountCollected).to.equal(50);
  //   expect(campaign.donators.length).to.equal(1);
  //   expect(campaign.donators[0]).to.equal(await ethers.getSigner(0).getAddress());
  //   expect(campaign.donations.length).to.equal(1);
  //   expect(campaign.donations[0]).to.equal(50);
  // });
// });

// it('should get the list of donators and their donations for a campaign', async () => {
//   const title = 'Test Campaign';
//   const description = 'Test Description';
//   const target = 100;
//   const deadline = Math.floor(Date.now() / 1000) + 86400; // Set deadline to tomorrow
//   const image = 'Test Image';

//   const createCampaignTx = await crowdFunding.createCampaign(title, description, target, deadline, image);
//   await createCampaignTx.wait();

//   const donate
