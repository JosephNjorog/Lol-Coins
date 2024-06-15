import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Token "mo:token";

actor Airdrop {

    // State variables
    var token: Token.Token;
    var totalAirdropAmount: Nat;
    var tokensPerParticipant: Nat;
    var maxParticipants: Nat;
    var participantsCount: Nat = 0;
    var hasClaimed: Trie.Trie<Principal, Bool> = Trie.empty();

    // Event equivalent (not directly supported in Motoko, but you can use logging or other methods)
    // You can use a function to log or handle the events as needed.

    public type Event = {
        participant: Principal;
        amount: Nat;
    };

    var events: [Event] = [];

    // Constructor equivalent
    public func init(
        _token: Token.Token,
        _totalAirdropAmount: Nat,
        _tokensPerParticipant: Nat,
        _maxParticipants: Nat
    ) : async Airdrop {
        token := _token;
        totalAirdropAmount := _totalAirdropAmount;
        tokensPerParticipant := _tokensPerParticipant;
        maxParticipants := _maxParticipants;
    };

    // claimAirdrop function
    public func claimAirdrop() : async () {
        let caller = Principal.toText(Principal.fromActor(this));
        assert(Trie.find(hasClaimed, caller) == null, "Airdrop already claimed");
        assert(participantsCount < maxParticipants, "Max participants reached");
        assert(await token.balanceOf(this) >= tokensPerParticipant, "Not enough tokens in contract");

        hasClaimed := Trie.put(hasClaimed, caller, true);
        participantsCount += 1;
        await token.transfer(Principal.fromText(caller), tokensPerParticipant);

        // Log the event
        events := Array.append<Event>(events, [{participant = Principal.fromText(caller); amount = tokensPerParticipant}]);
    };

    // withdrawRemainingTokens function
    public func withdrawRemainingTokens() : async () {
        let owner = Principal.fromActor(this);  // Assuming the owner is the canister controller
        let remainingTokens = await token.balanceOf(this);
        await token.transfer(owner, remainingTokens);
    };

    // Function to get events (for demonstration purposes)
    public query func getEvents() : async [Event] {
        return events;
    };
};
