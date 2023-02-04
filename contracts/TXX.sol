

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/security/Pausable.sol";
// import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// contract TX is ERC721URIStorage, Ownable, Pausable, ReentrancyGuard {
//     using Counters for Counters.Counter;
//     Counters.Counter private _tokenId;
//     Counters.Counter private _totalMinted;
//     using Strings for uint256;

//     mapping(address => uint8) private mintedAddress;
//     mapping(string => uint8) private URIMapping;
//     uint256 public TOKEN_PRICE = 0.05 ether;
//     uint256 public LIMIT_PER_ADDRESS = 10;
//     // total number of tokenIds minted
//     uint256 public tokenIds;
//     // _paused is used to pause the contract in case of an emergency
//     bool public _paused;
//     using Strings for uint256;
//     /**
//      * @dev _baseTokenURI for computing {tokenURI}. If set, the resulting URI for each
//      * token will be the concatenation of the `baseURI` and the `tokenId`.
//      */
//     string _baseTokenURI;

//     // max number of LW3Punks
//     uint256 public MAX_SUPPLY = 100;

//     modifier onlyWhenNotPaused() {
//         require(!_paused, "Contract currently paused");
//         _;
//     }

//     constructor(string memory baseURI) ERC721("TX Arts", "TXA") {
//         _baseTokenURI = baseURI;
//     }

//     function setPrice(uint256 price) external onlyOwner {
//         TOKEN_PRICE = price;
//     }

//     function setLimit(uint256 limit) external onlyOwner {
//         LIMIT_PER_ADDRESS = limit;
//     }

//     function setMaxSupply(uint256 max_supply) external onlyOwner {
//         MAX_SUPPLY = max_supply;
//     }

//     function mintNFT (
//         string memory tokensURI
//     ) external payable returns (uint256) {
//         require(TOKEN_PRICE <= msg.value, "Ether paid is incorrect");
//         require(
//             mintedAddress[msg.sender] < LIMIT_PER_ADDRESS,
//             "You have exceeded minting limit"
//         );
//         require(
//             _totalMinted.current() + 1 <= MAX_SUPPLY,
//             "You have exceeded Max Supply"
//         );
//         require(URIMapping[tokensURI] == 0, "This NFT has already been minted");
//         URIMapping[tokensURI] += 1;
//         mintedAddress[msg.sender] += 1;
//         _tokenId.increment();
//         _totalMinted.increment();

//         uint256 newItemId = _tokenId.current();
//         _mint(msg.sender, newItemId);
//         _setTokenURI(newItemId, tokensURI);

//         return newItemId;
//     }

//     /**
//      * @dev _baseURI overides the Openzeppelin's ERC721 implementation which by default
//      * returned an empty string for the baseURI
//      */
//     function _baseURI() internal view virtual override returns (string memory) {
//         return _baseTokenURI;
//     }

//     /**
//      * @dev tokenURI overides the Openzeppelin's ERC721 implementation for tokenURI function
//      * This function returns the URI from where we can extract the metadata for a given tokenId
//      */
//     function tokenURI(
//         uint256 tokenId
//     ) public view virtual override returns (string memory) {
//         require(
//             _exists(tokenId),
//             "ERC721Metadata: URI query for nonexistent token"
//         );

//         string memory baseURI = _baseURI();
//         // Here it checks if the length of the baseURI is greater than 0, if it is return the baseURI and attach
//         // the tokenId and `.json` to it so that it knows the location of the metadata json file for a given
//         // tokenId stored on IPFS
//         // If baseURI is empty return an empty string
//         return
//             bytes(baseURI).length > 0
//                 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
//                 : "";
//     }

//     //@dev setPaused makes the contract paused or unpaused
//     function pause() public onlyOwner {
//         _pause();
//     }

//     function unpause() public onlyOwner {
//         _unpause();
//     }

//     function setPaused(bool val) public onlyOwner {
//         _paused = val;
//     }

//     function withdraw() public onlyOwner {
//         address _owner = owner();
//         uint256 amount = address(this).balance;
//         (bool sent, ) = _owner.call{value: amount}("");
//         require(sent, "Failed to send Ether");
//     }

//     // Function to receive Ether. msg.data must be empty
//     receive() external payable {}

//     // Fallback function is called when msg.data is not empty
//     fallback() external payable {}
// }
