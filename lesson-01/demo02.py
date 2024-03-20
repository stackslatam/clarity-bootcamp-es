from mnemonic import Mnemonic

# Generate a mnemonic
mnemo = Mnemonic("english")
# Generate a 256-bit mnemonic
mnemonic = mnemo.generate(256) 

print("=> Mnemonic:", mnemonic)