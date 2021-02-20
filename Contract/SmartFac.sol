// "SPDX-License-Identifier: UNLICENSED"
pragma solidity <0.7.0;

contract SmartFac {
  string private name;
  uint256 public total_of_reco = 0;
  uint256 private total_account = 0;

  struct Reco {
    int id;
    uint256 time;
    string data;
  }
  mapping(uint256 => Reco) public reco;

  struct Trusted_acc {
      address add;
      // add something else here
  }
  mapping(uint256 => Trusted_acc) public trusted_acc;

  event added(
    int id,
    uint256 time,
    string data
  );
  
  constructor(string memory _name) public{
    require(bytes(_name).length > 0, "Missing name.");
    name = _name;
    trusted_acc[total_account].add = msg.sender;
    ++total_account;
  }
  
  function Fac_name() public view virtual returns (string memory) {
    return name;
  }

  function newReco(int _id, string memory _data) public {
    ++total_of_reco;  
    reco[total_of_reco] = Reco(_id, now, _data);
    emit added(_id, now, _data);
  } 
}
