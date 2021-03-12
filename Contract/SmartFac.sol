// "SPDX-License-Identifier: UNLICENSED"
pragma solidity >=0.6.0;

contract SmartFac {
  string private name;
  address private initaddress;
  uint256 public total_of_reco = 0;
  uint256 public total_account = 0;

  struct Reco {
    uint256 id;
    uint256 time;
    string data;
  }
  mapping(uint256 => Reco) public reco;

  mapping(address => bool) private trusted_acc;

  event added(
    uint256 id,
    uint256 time,
    string data
  );
  
  constructor(string memory _name) public{
    require(bytes(_name).length > 0, "Missing name.");
    name = _name;
    trusted_acc[msg.sender] = true;
    initaddress = msg.sender;
    ++total_account;
  }
  
  function add_acc(address _add) public{
      require(msg.sender == initaddress, "Plese use init contract Account.");
      require(! trusted_acc[_add], "This address was existed.");
      trusted_acc[_add] = true;
      ++total_account;
  }
  
  function remove_acc(address _rm) public{
      require(msg.sender == initaddress, "Plese use init contract Account.");
      require(initaddress != _rm, "Cannot remove init Account.");
      delete trusted_acc[_rm];
  }
  
  function Fac_name() public view virtual returns (string memory) {
    return name;
  }
  
  function new_Reco(uint256 _id, uint256 _time, string memory _data) public {
    require(trusted_acc[msg.sender], "This address not in trusted list.");
    ++total_of_reco;  
    reco[total_of_reco] = Reco(_id, _time, _data);
    emit added(_id, _time, _data);
  } 
}

