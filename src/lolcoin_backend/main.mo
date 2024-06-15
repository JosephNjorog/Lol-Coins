import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Option "mo:base/Option";
import HashMap "mo:base/HashMap";
import List "mo:base/List";

actor LOLcoin {
    type Coin = {
        owner: Text;
        amount: Nat;
        lockedUntil: Time;
        vestingSchedule: ?VestingSchedule;
    };

    type VestingSchedule = {
        startTime: Time;
        cliffDuration: Time;
        totalDuration: Time;
        interval: Time;
        released: Nat;
        totalAmount: Nat;
    };

    stable var balances = HashMap.HashMap<Text, Coin>(100, Text.equal, Text.hash);
    stable var paused: Bool = false;

    private func callerIsAdmin(): Bool {
        return msg.caller == Principal.fromText("your_admin_principal_here");
    }

    public shared(msg) func airdrop(recipients: [Text], amount: Nat): async Bool {
        if (!callerIsAdmin() or paused) {
            return false;
        }
        for (recipient in recipients.vals()) {
            let balance = switch (balances.get(recipient)) {
                case (?coin) coin;
                case null { owner = recipient; amount = 0; lockedUntil = Time.fromSeconds(0); vestingSchedule = null };
            };
            balance.amount += amount;
            balances.put(recipient, balance);
        }
        return true;
    }

    public shared(msg) func mint(to: Text, amount: Nat, lockedUntil: Time, vestingSchedule: ?VestingSchedule): async Bool {
        if (!callerIsAdmin() or paused) {
            return false;
        }
        let balance = switch (balances.get(to)) {
            case (?coin) coin;
            case null { owner = to; amount = 0; lockedUntil = Time.fromSeconds(0); vestingSchedule = null };
        };
        balance.amount += amount;
        balance.lockedUntil = lockedUntil;
        balance.vestingSchedule = vestingSchedule;
        balances.put(to, balance);
        return true;
    }

    public shared(msg) func burn(from: Text, amount: Nat): async Bool {
        if (!callerIsAdmin() or paused) {
            return false;
        }
        let balance = switch (balances.get(from)) {
            case (?coin) coin;
            case null { owner = from; amount = 0; lockedUntil = Time.fromSeconds(0); vestingSchedule = null };
        };
        if (balance.amount < amount) {
            return false;
        }
        balance.amount -= amount;
        balances.put(from, balance);
        return true;
    }

    public shared(msg) func transfer(to: Text, amount: Nat): async Bool {
        if (paused) {
            return false;
        }
        let from = msg.caller.toText();
        if (from == to) {
            return false;
        }
        let fromBalance = switch (balances.get(from)) {
            case (?coin) coin;
            case null { owner = from; amount = 0; lockedUntil = Time.fromSeconds(0); vestingSchedule = null };
        };
        if (fromBalance.amount < amount) {
            return false;
        }
        let toBalance = switch (balances.get(to)) {
            case (?coin) coin;
            case null { owner = to; amount = 0; lockedUntil = Time.fromSeconds(0); vestingSchedule = null };
        };
        fromBalance.amount -= amount;
        toBalance.amount += amount;
        balances.put(from, fromBalance);
        balances.put(to, toBalance);
        return true;
    }

    public shared(msg) func pauseTransfers(): async Bool {
        if (!callerIsAdmin()) {
            return false;
        }
        paused = true;
        return true;
    }

    public shared(msg) func unpauseTransfers(): async Bool {
        if (!callerIsAdmin()) {
            return false;
        }
        paused = false;
        return true;
    }

    public shared(msg) func lockTokens(to: Text, until: Time): async Bool {
        if (!callerIsAdmin()) {
            return false;
        }
        let balance = switch (balances.get(to)) {
            case (?coin) coin;
            case null { owner = to; amount = 0; lockedUntil = Time.fromSeconds(0); vestingSchedule = null };
        };
        balance.lockedUntil = until;
        balances.put(to, balance);
        return true;
    }

    public shared(msg) func setVestingSchedule(to: Text, schedule: ?VestingSchedule): async Bool {
        if (!callerIsAdmin()) {
            return false;
        }
        let balance = switch (balances.get(to)) {
            case (?coin) coin;
            case null { owner = to; amount = 0; lockedUntil = Time.fromSeconds(0); vestingSchedule = null };
        };
        balance.vestingSchedule = schedule;
        balances.put(to, balance);
        return true;
    }

    public shared(msg) func vote(proposalId: Nat, support: Bool): async Bool {
        return true;
    }

    public shared(msg) func claimReward(): async Bool {
        return true;
    }

    public shared(msg) func grantAccess(address: Text): async Bool {
        return true;
    }

    public shared(msg) func swapTokens(from: Text, to: Text, amount: Nat): async Bool {
        return true;
    }

    public query func getTokenMetadata(): async Text {
        return "LOLcoin (LOL)";
    }

    public query func balanceOf(owner: Text): async Coin {
        switch (balances.get(owner)) {
            case (?coin) coin;
            case null { owner = owner; amount = 0; lockedUntil = Time.fromSeconds(0); vestingSchedule = null };
        }
    }
}
