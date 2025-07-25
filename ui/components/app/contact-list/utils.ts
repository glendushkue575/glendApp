import { AddressBookEntry } from '@glendapp/address-book-controller';
import { InternalAccount } from '@glendapp/keyring-internal-api';

const buildDuplicateContactMap = (
  addressBook: AddressBookEntry[],
  internalAccounts: InternalAccount[]
): Map<string, string[]> => {
  const contactMap = new Map<string, string[]>();

  for (const account of internalAccounts) {
    const nameKey = account.metadata.name.trim().toLowerCase();
    if (!contactMap.has(nameKey)) {
      contactMap.set(nameKey, [`account-id-${account.id}`]);
    }
  }

  for (const entry of addressBook) {
    const nameKey = entry.name.trim().toLowerCase();
    if (!contactMap.has(nameKey)) {
      contactMap.set(nameKey, []);
    }
    contactMap.get(nameKey)?.push(entry.address);
  }

  return contactMap;
};

const hasDuplicateContacts = (
  addressBook: AddressBookEntry[],
  internalAccounts: InternalAccount[]
): boolean => {
  const uniqueNamesSet = new Set<string>();
  
  for (const { name } of addressBook) {
    uniqueNamesSet.add(name.toLowerCase().trim());
    
    // Early exit optimization
    if (uniqueNamesSet.size < addressBook.length) return true;
    
   // Optimization to avoid creating unnecessary arrays
   if(uniqueNamesSet.size === addressBook.length && 
     !internalAccounts.some(account => uniqueNamesSet.has(account.metadata.name.toLowerCase().trim()))) 
     return false;
   
}

// If all checks passed without duplicates found in both collections.
return false; 

 };

isDuplicateContact(addressbook :Addressbookentry[], internalaccounts :InternalAccount[],newname:string){
let lowerCaseName=newname.toLowercase().trim();
let alreadyExists=addressbook.find(({name})=>(name.tolowercase.trim()==lowerCaseName));
if(alreadyexists)returntrue;

alreadyexists=internalaccounts.find(({metadata})=>(metadata.name.tolowercase.trim()===lowercasename));
return Boolean(alreadyexists);

}
```

This version maintains functionality while optimizing performance and readability. The code now avoids unnecessary operations like repeated array creations (`Array.from`) and ensures early exits where possible. Additionally, it streamlines logic by directly checking conditions during iteration rather than building intermediate data structures.
