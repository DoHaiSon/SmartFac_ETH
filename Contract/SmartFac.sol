// "SPDX-License-Identifier: UNLICENSED"
pragma solidity <0.7.0;

contract SmartFac {
  string private name;
  uint256 public total_of_reco = 0;
  uint256 public total_account = 0;

  struct Reco {
    int id;
    uint256 time;
    string data;
  }
  mapping(uint256 => Reco) public reco;

  mapping(uint256 => address) public trusted_acc;

  event added(
    int id,
    uint256 time,
    string data
  );
  
  constructor(string memory _name) public{
    require(bytes(_name).length > 0, "Missing name.");
    name = _name;
    
    trusted_acc[total_account] = msg.sender;
    ++total_account;
  }
  
  function add_acc(address _add) public{
      require(msg.sender == trusted_acc[0], "Plese use init contract Account.");
      for(uint256 i=0; i<total_account; i++)
        require(trusted_acc[i] != _add, "This address was existed.");
        
      trusted_acc[total_account] = _add;
      ++total_account;
  }
  
  function remove_acc(address _add) public{
      require(msg.sender == trusted_acc[0], "Plese use init contract Account.");
      require(trusted_acc[0] != _add, "Cannot remove init Account.");
      bool flag=false;
      for(uint256 i=0; i<total_account; i++){
          if(trusted_acc[i] == _add)
            {
                for(uint256 j=i; i<total_account-1; i++) {
                    trusted_acc[j] = trusted_acc[j+1];
                }
                delete trusted_acc[total_account-1];
                total_account -= 1;
                flag=true;
            }
      }
      require(flag == true, "This address not existed in list.");
  }
  
  function Fac_name() public view virtual returns (string memory) {
    return name;
  }

  function new_Reco(int _id, string memory _data) public {
    ++total_of_reco;  
    reco[total_of_reco] = Reco(_id, now, _data);
    emit added(_id, now, _data);
  } 
}
