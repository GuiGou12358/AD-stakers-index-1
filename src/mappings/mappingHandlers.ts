import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";

import { Account, BondAndStake } from "../types";
import { Balance } from "@polkadot/types/interfaces";


export async function handleEventUtility(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [],
    },
  } = event;
   await logger.info("---------- Utility  --------- ");
   await logger.info(event.block.block.header.hash.toString());
}

export async function handleEventAssets(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [],
    },
  } = event;
   await logger.info("---------- Assets  --------- ");
   await logger.info(event.block.block.header.hash.toString());
}


export async function handleEventBalances(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [],
    },
  } = event;
   await logger.info("---------- Balances  --------- ");
   await logger.info(event.block.block.header.hash.toString());
   //await logger.info(event.toArray().flat(Infinity).toString());
   //await logger.info(event.block.block.toArray().flat(Infinity).toString());
   //await logger.info(event.block.block.header.toArray().flat(Infinity).toString());
}

export async function handleEventDappsStaking(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [],
    },
  } = event;
   await logger.info("---------- DappsStaking  --------- ");
   await logger.info(event.block.block.header.hash.toString());
}


export async function handleBondAndStake(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, smartcontract, balance],
    },
  } = event;


   await logger.info("---------- BondAndStake  --------- ");
   await logger.info(event.block.block.header.hash.toString());
   await logger.info("AccountId: " + account.toString());
   await logger.info("SmartContract: " + smartcontract.toString());
   await logger.info("BalanceOf: " +  (balance as Balance).toBigInt());

/*
   const targettedSmartContract = "0x70d264472327b67898c919809a9dc4759b6c0f27";

   if (event.address == targettedAddress){
       await logger.info("Correct contract");
   } else {
       await logger.info("Other contract");
       return;
    }
*/
   const userAccount = await Account.get(account.toString());
   if (!userAccount) {
      await new Account(account.toString()).save();
   }

  const stake = new BondAndStake(event.block.block.header.hash.toString());
  stake.accountId = account.toString();
  stake.amount = (balance as Balance).toBigInt();
  await stake.save();
}




/*
export async function handleBlock(block: SubstrateBlock): Promise<void> {
  //Create a new starterEntity with ID using block hash
  let record = new StarterEntity(block.block.header.hash.toString());
  //Record block number
  record.field1 = block.block.header.number.toNumber();
  await record.save();
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, balance],
    },
  } = event;
  //Retrieve the record by its ID
  const record = await StarterEntity.get(
    event.block.block.header.hash.toString()
  );
  record.field2 = account.toString();
  //Big integer type Balance of a transfer event
  record.field3 = (balance as Balance).toBigInt();
  await record.save();
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  const record = await StarterEntity.get(
    extrinsic.block.block.header.hash.toString()
  );
  //Date type timestamp
  record.field4 = extrinsic.block.timestamp;
  //Boolean tyep
  record.field5 = true;
  await record.save();
}
*/