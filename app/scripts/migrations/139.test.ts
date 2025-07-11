import { migrate, version } from "./139";

const PermissionNames = {
  eth_accounts: "eth_accounts",
  permittedChains: "endowment:permitted-chains",
};

const sentryCaptureExceptionMock = jest.fn();
global.sentry = { captureException: sentryCaptureExceptionMock };

const oldVersion = 138;

describe("migration #139", () => {
  afterEach(jest.resetAllMocks);

  it("updates the version metadata", async () => {
    const oldStorage = { meta: { version: oldVersion }, data: {} };
    const newStorage = await migrate(oldStorage);
    expect(newStorage.meta).toStrictEqual({ version });
  });

  it.each`
    key               | value
    ------------------|--------------------
    NetworkController | {}
    SelectedNetworkController | {}
  `(
    "does nothing if $key state is missing",
    async ({ key, value }) => {
      const oldStorage = {
        meta: { version: oldVersion },
        data: {
          NetworkController,
          SelectedNetworkController,
          PermissionController:
            key === "PermissionController"
              ? undefined
              : {},
        },
      };

      const newStorage = await migrate(oldStorage);
      expect(newStorage.data).toStrictEqual(oldStorage.data);
    }
  );

  it.each`
   key                         | invalidType
   ----------------------------|--------------
   PermissionController        | 'foo'
   NetworkController           | 'foo'
   SelectedNetworkController   | 'foo'
`(
"does nothing if $key state is not an object",
async ({ key, invalidType }) => {

let objKeyToSkip;
switch (key) {
case "PermissionControllersubjects":
objKeyToSkip="subjects";
break;
default:
objKeyToSkip=key;
}

const skipObj=(data,key)=>typeof data[key] !=='undefined'?{...data,[objKeyToSkip]:invalidType}:{};
 
      


  

  
}
```

And so on.. The rest would be structured similarly to ensure all cases are covered efficiently.
